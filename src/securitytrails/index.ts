import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(1000);

const ST_BASE = "https://api.securitytrails.com/v1";

// ─── Types ───

interface StSubdomainsResult {
  domain: string;
  subdomains: string[]; // FQDNs
  total: number;
}

interface StDnsHistoryRecord {
  values: string[];
  type: string;
  firstSeen: string;
  lastSeen: string;
  organizations?: string[];
}

interface StDnsHistoryResult {
  domain: string;
  type: string;
  records: StDnsHistoryRecord[];
  total: number;
}

interface StWhoisResult {
  domain: string;
  registrar?: string;
  createdDate?: string;
  updatedDate?: string;
  expiresDate?: string;
  nameservers: string[];
  contacts: { type: string; name?: string; organization?: string; email?: string; country?: string }[];
}

// ─── Helpers ───

async function stFetch(path: string, apiKey: string): Promise<any> {
  await limiter.acquire();
  const res = await fetch(`${ST_BASE}${path}`, {
    headers: { APIKEY: apiKey, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`SecurityTrails API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Subdomain Enumeration ───

export async function stSubdomains(domain: string, apiKey: string): Promise<StSubdomainsResult> {
  const data = await stFetch(`/domain/${encodeURIComponent(domain)}/subdomains`, apiKey);
  const subs: string[] = (data.subdomains ?? []).map((s: string) => `${s}.${domain}`);
  return { domain, subdomains: subs, total: subs.length };
}

// ─── DNS History ───

export async function stDnsHistory(domain: string, type: string, apiKey: string): Promise<StDnsHistoryResult> {
  const validTypes = ["a", "aaaa", "mx", "ns", "soa", "txt"];
  const t = type.toLowerCase();
  if (!validTypes.includes(t)) throw new Error(`Invalid DNS type: ${type}. Valid: ${validTypes.join(", ")}`);

  const data = await stFetch(`/history/${encodeURIComponent(domain)}/dns/${t}`, apiKey);
  const records: StDnsHistoryRecord[] = (data.records ?? []).map((r: any) => ({
    values: (r.values ?? []).map((v: any) => v.ip ?? v.host ?? v.value ?? String(v)),
    type: r.type ?? t,
    firstSeen: r.first_seen ?? "",
    lastSeen: r.last_seen ?? "",
    organizations: r.organizations,
  }));

  return { domain, type: t, records, total: records.length };
}

// ─── WHOIS ───

export async function stWhois(domain: string, apiKey: string): Promise<StWhoisResult> {
  const data = await stFetch(`/domain/${encodeURIComponent(domain)}/whois`, apiKey);
  const w = data ?? {};

  const contacts: StWhoisResult["contacts"] = [];
  for (const type of ["registrant", "admin", "technical"]) {
    const c = w[type];
    if (c) {
      contacts.push({
        type,
        name: c.name,
        organization: c.organization,
        email: c.email,
        country: c.country,
      });
    }
  }

  return {
    domain,
    registrar: w.registrar?.name,
    createdDate: w.created_date,
    updatedDate: w.updated_date,
    expiresDate: w.expires_date,
    nameservers: w.nameservers ?? [],
    contacts,
  };
}
