import dns from "node:dns/promises";
import crypto from "node:crypto";

// ─── Types ───

interface DnsRecord {
  type: string;
  value: string;
  priority?: number;
  weight?: number;
  port?: number;
  ttl?: number;
}

interface EmailSecurityResult {
  domain: string;
  spf: { found: boolean; record?: string; policy?: string; includes?: string[]; risk: string };
  dmarc: { found: boolean; record?: string; policy?: string; subdomain_policy?: string; rua?: string; risk: string };
  dkim: { selector: string; found: boolean; record?: string; keySize?: string }[];
  overallRisk: "low" | "medium" | "high" | "critical";
  recommendations: string[];
}

interface SpfChainNode {
  domain: string;
  depth: number;
  mechanisms: string[];
  includes: string[];
  ipRanges: string[];
}

interface SpfChainResult {
  domain: string;
  chainDepth: number;
  totalLookups: number;
  lookupLimit: number;
  chain: SpfChainNode[];
  allIpRanges: string[];
  services: string[];
  exceedsLimit: boolean;
}

interface SrvRecord {
  name: string;
  target: string;
  port: number;
  priority: number;
  weight: number;
}

interface CnameRecord {
  name: string;
  target: string;
}

interface SrvDiscoverResult {
  domain: string;
  srvRecords: SrvRecord[];
  cnameRecords: CnameRecord[];
}

interface WildcardCheckResult {
  domain: string;
  wildcard: boolean;
  testSubdomain: string;
  resolvedIps?: string[];
}

// ─── DNS Lookup ───

export async function dnsLookup(domain: string, type: string): Promise<DnsRecord[]> {
  const records: DnsRecord[] = [];

  switch (type.toUpperCase()) {
    case "A": {
      const ips = await dns.resolve4(domain);
      for (const ip of ips) records.push({ type: "A", value: ip });
      break;
    }
    case "AAAA": {
      const ips = await dns.resolve6(domain);
      for (const ip of ips) records.push({ type: "AAAA", value: ip });
      break;
    }
    case "MX": {
      const mxs = await dns.resolveMx(domain);
      for (const mx of mxs) records.push({ type: "MX", value: mx.exchange, priority: mx.priority });
      break;
    }
    case "TXT": {
      const txts = await dns.resolveTxt(domain);
      for (const txt of txts) records.push({ type: "TXT", value: txt.join("") });
      break;
    }
    case "NS": {
      const nss = await dns.resolveNs(domain);
      for (const ns of nss) records.push({ type: "NS", value: ns });
      break;
    }
    case "SOA": {
      const soa = await dns.resolveSoa(domain);
      records.push({
        type: "SOA",
        value: `${soa.nsname} ${soa.hostmaster} ${soa.serial} ${soa.refresh} ${soa.retry} ${soa.expire} ${soa.minttl}`,
      });
      break;
    }
    case "CNAME": {
      const cname = await dns.resolveCname(domain);
      for (const c of cname) records.push({ type: "CNAME", value: c });
      break;
    }
    case "SRV": {
      const srvs = await dns.resolveSrv(domain);
      for (const s of srvs) {
        records.push({ type: "SRV", value: s.name, priority: s.priority, weight: s.weight, port: s.port });
      }
      break;
    }
    default:
      throw new Error(`Unsupported DNS record type: ${type}`);
  }

  return records;
}

// ─── Reverse DNS ───

export async function dnsReverse(ip: string): Promise<string[]> {
  return dns.reverse(ip);
}

// ─── Email Security Analysis ───

const DEFAULT_DKIM_SELECTORS = ["default", "google", "selector1", "selector2", "k1", "mandrill", "mailjet", "dkim", "s1", "s2"];

export async function dnsEmailSecurity(domain: string, dkimSelectors?: string[]): Promise<EmailSecurityResult> {
  const selectors = dkimSelectors ?? DEFAULT_DKIM_SELECTORS;
  const recommendations: string[] = [];

  // SPF
  let spf: EmailSecurityResult["spf"] = { found: false, risk: "high" };
  try {
    const txts = await dns.resolveTxt(domain);
    const spfRecord = txts.map((t) => t.join("")).find((t) => t.startsWith("v=spf1"));
    if (spfRecord) {
      const includes = [...spfRecord.matchAll(/include:(\S+)/g)].map((m) => m[1]);
      let policy = "neutral";
      if (spfRecord.includes("-all")) policy = "hard_fail";
      else if (spfRecord.includes("~all")) policy = "soft_fail";
      else if (spfRecord.includes("+all")) policy = "pass_all";
      else if (spfRecord.includes("?all")) policy = "neutral";

      let risk = "low";
      if (policy === "pass_all") risk = "critical";
      else if (policy === "soft_fail") risk = "medium";
      else if (policy === "neutral") risk = "medium";

      if (policy === "soft_fail") recommendations.push("Upgrade SPF from ~all (soft fail) to -all (hard fail)");
      if (policy === "pass_all") recommendations.push("SPF +all allows any IP to send email — change to -all immediately");

      spf = { found: true, record: spfRecord, policy, includes, risk };
    } else {
      recommendations.push("No SPF record found — add v=spf1 with authorized senders");
      spf = { found: false, risk: "critical" };
    }
  } catch {
    spf = { found: false, risk: "high" };
  }

  // DMARC
  let dmarc: EmailSecurityResult["dmarc"] = { found: false, risk: "critical" };
  try {
    const txts = await dns.resolveTxt(`_dmarc.${domain}`);
    const dmarcRecord = txts.map((t) => t.join("")).find((t) => t.startsWith("v=DMARC1"));
    if (dmarcRecord) {
      const pMatch = dmarcRecord.match(/;\s*p=(\w+)/);
      const spMatch = dmarcRecord.match(/;\s*sp=(\w+)/);
      const ruaMatch = dmarcRecord.match(/;\s*rua=mailto:([^\s;]+)/);
      const policy = pMatch?.[1] ?? "none";
      const subdomainPolicy = spMatch?.[1];
      const rua = ruaMatch?.[1];

      let risk = "low";
      if (policy === "none") {
        risk = "high";
        recommendations.push("DMARC policy is p=none (monitoring only) — upgrade to p=quarantine then p=reject");
      } else if (policy === "quarantine") {
        risk = "medium";
      }

      dmarc = { found: true, record: dmarcRecord, policy, subdomain_policy: subdomainPolicy, rua, risk };
    } else {
      recommendations.push("No DMARC record found — add _dmarc TXT record with at least p=quarantine");
      dmarc = { found: false, risk: "critical" };
    }
  } catch {
    recommendations.push("No DMARC record found — add _dmarc TXT record with at least p=quarantine");
    dmarc = { found: false, risk: "critical" };
  }

  // DKIM
  const dkimResults: EmailSecurityResult["dkim"] = [];
  for (const selector of selectors) {
    try {
      const txts = await dns.resolveTxt(`${selector}._domainkey.${domain}`);
      const record = txts.map((t) => t.join("")).join("");
      let keySize: string | undefined;
      const pMatch = record.match(/p=([A-Za-z0-9+/=]+)/);
      if (pMatch) {
        const keyBytes = Math.ceil((pMatch[1].length * 3) / 4);
        const bits = keyBytes * 8;
        keySize = `${bits}-bit`;
        if (bits <= 1024) {
          recommendations.push(`DKIM selector "${selector}" uses ${bits}-bit key — upgrade to 2048-bit minimum`);
        }
      }
      dkimResults.push({ selector, found: true, record, keySize });
    } catch {
      // Also try CNAME (common for Microsoft 365 DKIM)
      try {
        const cnames = await dns.resolveCname(`${selector}._domainkey.${domain}`);
        dkimResults.push({ selector, found: true, record: `CNAME → ${cnames[0]}` });
      } catch {
        dkimResults.push({ selector, found: false });
      }
    }
  }

  if (!dkimResults.some((d) => d.found)) {
    recommendations.push("No DKIM records found for any common selector — configure DKIM signing");
  }

  // Overall risk
  const risks = [spf.risk, dmarc.risk];
  let overallRisk: EmailSecurityResult["overallRisk"] = "low";
  if (risks.includes("critical")) overallRisk = "critical";
  else if (risks.includes("high")) overallRisk = "high";
  else if (risks.includes("medium")) overallRisk = "medium";

  return { domain, spf, dmarc, dkim: dkimResults, overallRisk, recommendations };
}

// ─── SPF Chain Resolution ───

const SPF_SERVICE_PATTERNS: Record<string, string> = {
  "spf.protection.outlook.com": "Microsoft 365",
  "_spf.google.com": "Google Workspace",
  "spf.messagelabs.com": "Symantec/Broadcom",
  "sendgrid.net": "SendGrid",
  "spf.sendinblue.com": "Sendinblue/Brevo",
  "amazonses.com": "Amazon SES",
  "spf.mandrillapp.com": "Mandrill/Mailchimp",
  "mailgun.org": "Mailgun",
  "spf.mtasv.net": "Postmark",
  "mta.salesforce.com": "Salesforce",
  "mktomail.com": "Marketo",
  "hubspotemail.net": "HubSpot",
  "zendesk.com": "Zendesk",
  "freshdesk.com": "Freshdesk",
  "eloqua.com": "Oracle Eloqua",
};

export async function dnsSpfChain(domain: string, maxDepth = 10): Promise<SpfChainResult> {
  const visited = new Set<string>();
  const chain: SpfChainNode[] = [];
  const allIpRanges: string[] = [];
  const services = new Set<string>();
  let totalLookups = 0;

  async function resolveSpf(d: string, depth: number): Promise<void> {
    if (depth > maxDepth || visited.has(d)) return;
    visited.add(d);
    totalLookups++;

    try {
      const txts = await dns.resolveTxt(d);
      const spfRecord = txts.map((t) => t.join("")).find((t) => t.startsWith("v=spf1"));
      if (!spfRecord) return;

      const mechanisms = spfRecord.split(/\s+/).filter((m) => m !== "v=spf1");
      const includes: string[] = [];
      const ipRanges: string[] = [];

      for (const mech of mechanisms) {
        if (mech.startsWith("include:")) {
          const target = mech.slice(8);
          includes.push(target);
          // Identify known services
          for (const [pattern, service] of Object.entries(SPF_SERVICE_PATTERNS)) {
            if (target.includes(pattern)) services.add(service);
          }
        } else if (mech.startsWith("ip4:") || mech.startsWith("ip6:")) {
          const range = mech.slice(4);
          ipRanges.push(range);
          allIpRanges.push(range);
        } else if (mech.startsWith("a:") || mech.startsWith("mx:")) {
          // Count as DNS lookup
          totalLookups++;
        }
      }

      chain.push({ domain: d, depth, mechanisms, includes, ipRanges });

      // Recurse into includes
      for (const inc of includes) {
        await resolveSpf(inc, depth + 1);
      }
    } catch {
      // Domain might not have TXT records
    }
  }

  await resolveSpf(domain, 0);

  const maxChainDepth = chain.reduce((max, n) => Math.max(max, n.depth), 0);

  return {
    domain,
    chainDepth: maxChainDepth,
    totalLookups,
    lookupLimit: 10, // RFC 7208
    chain,
    allIpRanges,
    services: [...services],
    exceedsLimit: totalLookups > 10,
  };
}

// ─── SRV Discovery ───

const SRV_PROBES = [
  "_sip._tls",
  "_sipfederationtls._tcp",
  "_autodiscover._tcp",
  "_xmpp-server._tcp",
  "_xmpp-client._tcp",
  "_imaps._tcp",
  "_submission._tcp",
  "_ldap._tcp",
  "_kerberos._tcp",
  "_kerberos._udp",
  "_caldavs._tcp",
  "_carddavs._tcp",
];

const CNAME_PROBES = [
  "autodiscover",
  "lyncdiscover",
  "enterpriseregistration",
  "enterpriseenrollment",
  "sip",
  "webmail",
  "mail",
  "owa",
  "adfs",
];

export async function dnsSrvDiscover(domain: string): Promise<SrvDiscoverResult> {
  const srvRecords: SrvRecord[] = [];
  const cnameRecords: CnameRecord[] = [];

  // SRV probes
  const srvPromises = SRV_PROBES.map(async (prefix) => {
    const fqdn = `${prefix}.${domain}`;
    try {
      const srvs = await dns.resolveSrv(fqdn);
      for (const s of srvs) {
        srvRecords.push({ name: fqdn, target: s.name, port: s.port, priority: s.priority, weight: s.weight });
      }
    } catch {
      // Not found
    }
  });

  // CNAME probes
  const cnamePromises = CNAME_PROBES.map(async (prefix) => {
    const fqdn = `${prefix}.${domain}`;
    try {
      const cnames = await dns.resolveCname(fqdn);
      for (const c of cnames) {
        cnameRecords.push({ name: fqdn, target: c });
      }
    } catch {
      // Not found — try A record to see if it exists
      try {
        const ips = await dns.resolve4(fqdn);
        if (ips.length > 0) {
          cnameRecords.push({ name: fqdn, target: ips.join(", ") });
        }
      } catch {
        // Not found
      }
    }
  });

  await Promise.all([...srvPromises, ...cnamePromises]);

  return { domain, srvRecords, cnameRecords };
}

// ─── Wildcard Check ───

export async function dnsWildcardCheck(domain: string): Promise<WildcardCheckResult> {
  const randomSub = crypto.randomBytes(8).toString("hex");
  const testSubdomain = `${randomSub}.${domain}`;

  try {
    const ips = await dns.resolve4(testSubdomain);
    return { domain, wildcard: true, testSubdomain, resolvedIps: ips };
  } catch {
    return { domain, wildcard: false, testSubdomain };
  }
}
