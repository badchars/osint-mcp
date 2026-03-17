import { dnsLookup, dnsEmailSecurity } from "../dns/index.js";
import { whoisDomain } from "../whois/index.js";
import { crtshSearch } from "../crtsh/index.js";
import { hackertargetHostsearch } from "../hackertarget/index.js";

// ─── Types ───

interface DomainReconResult {
  domain: string;
  dns: {
    a: string[];
    mx: { exchange: string; priority?: number }[];
    ns: string[];
    txt: string[];
  };
  whois?: {
    registrar?: string;
    registrationDate?: string;
    expirationDate?: string;
    nameservers: string[];
  };
  subdomains: string[];
  subdomainSources: { crtsh: number; hackertarget: number };
  emailSecurity?: {
    overallRisk: string;
    spfPolicy?: string;
    dmarcPolicy?: string;
    dkimFound: boolean;
    recommendations: string[];
  };
  errors: string[];
}

// ─── Quick Domain Recon ───

export async function domainRecon(domain: string): Promise<DomainReconResult> {
  const errors: string[] = [];

  // Run all free sources in parallel
  const [aResult, mxResult, nsResult, txtResult, whoisResult, crtshResult, htResult, emailResult] =
    await Promise.allSettled([
      dnsLookup(domain, "A"),
      dnsLookup(domain, "MX"),
      dnsLookup(domain, "NS"),
      dnsLookup(domain, "TXT"),
      whoisDomain(domain),
      crtshSearch(domain),
      hackertargetHostsearch(domain),
      dnsEmailSecurity(domain),
    ]);

  // DNS
  const a = aResult.status === "fulfilled" ? aResult.value.map((r) => r.value) : (errors.push(`DNS A: ${(aResult as PromiseRejectedResult).reason}`), []);
  const mx = mxResult.status === "fulfilled" ? mxResult.value.map((r) => ({ exchange: r.value, priority: r.priority })) : (errors.push(`DNS MX: ${(mxResult as PromiseRejectedResult).reason}`), []);
  const ns = nsResult.status === "fulfilled" ? nsResult.value.map((r) => r.value) : (errors.push(`DNS NS: ${(nsResult as PromiseRejectedResult).reason}`), []);
  const txt = txtResult.status === "fulfilled" ? txtResult.value.map((r) => r.value) : [];

  // WHOIS
  let whois: DomainReconResult["whois"];
  if (whoisResult.status === "fulfilled") {
    const w = whoisResult.value;
    whois = {
      registrar: w.registrar,
      registrationDate: w.registrationDate,
      expirationDate: w.expirationDate,
      nameservers: w.nameservers,
    };
  } else {
    errors.push(`WHOIS: ${whoisResult.reason}`);
  }

  // Subdomains (deduplicated from crt.sh + HackerTarget)
  const subdomainSet = new Set<string>();
  let crtshCount = 0;
  let htCount = 0;

  if (crtshResult.status === "fulfilled") {
    crtshCount = crtshResult.value.uniqueSubdomains.length;
    for (const s of crtshResult.value.uniqueSubdomains) subdomainSet.add(s.toLowerCase());
  } else {
    errors.push(`crt.sh: ${crtshResult.reason}`);
  }

  if (htResult.status === "fulfilled") {
    htCount = htResult.value.length;
    for (const h of htResult.value) {
      if (h.hostname) subdomainSet.add(h.hostname.toLowerCase());
    }
  } else {
    errors.push(`HackerTarget: ${htResult.reason}`);
  }

  // Email Security
  let emailSecurity: DomainReconResult["emailSecurity"];
  if (emailResult.status === "fulfilled") {
    const e = emailResult.value;
    emailSecurity = {
      overallRisk: e.overallRisk,
      spfPolicy: e.spf.policy,
      dmarcPolicy: e.dmarc.policy,
      dkimFound: e.dkim.some((d) => d.found),
      recommendations: e.recommendations,
    };
  }

  return {
    domain,
    dns: { a, mx, ns, txt },
    whois,
    subdomains: [...subdomainSet].sort(),
    subdomainSources: { crtsh: crtshCount, hackertarget: htCount },
    emailSecurity,
    errors,
  };
}
