import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";

const limiter = new RateLimiter(2000);
const cache = new TTLCache<any>(30 * 60 * 1000); // 30 min

// ─── Types ───

interface BgpAsnResult {
  asn: number;
  name: string;
  description: string;
  countryCode: string;
  emailContacts: string[];
  abuseContacts: string[];
  website?: string;
  ipv4Prefixes: { prefix: string; name: string; description: string; countryCode: string }[];
  ipv6Prefixes: { prefix: string; name: string; description: string; countryCode: string }[];
}

interface BgpIpResult {
  ip: string;
  prefixes: { prefix: string; asn: number; name: string; description: string; countryCode: string }[];
  rir: string;
}

interface BgpPrefixResult {
  prefix: string;
  cidr: number;
  asns: { asn: number; name: string; description: string; countryCode: string }[];
  name: string;
  description: string;
  countryCode: string;
  rir: string;
}

// ─── Helpers ───

async function bgpFetch(path: string): Promise<any> {
  await limiter.acquire();
  const res = await fetch(`https://api.bgpview.io${path}`);
  if (!res.ok) throw new Error(`BGPView returned ${res.status}`);
  const json = await res.json();
  if (json.status !== "ok") throw new Error(`BGPView error: ${json.status_message ?? "unknown"}`);
  return json.data;
}

// ─── ASN Lookup ───

export async function bgpAsn(asn: number): Promise<BgpAsnResult> {
  const key = `asn:${asn}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const [info, prefixes] = await Promise.all([
    bgpFetch(`/asn/${asn}`),
    bgpFetch(`/asn/${asn}/prefixes`),
  ]);

  const result: BgpAsnResult = {
    asn: info.asn,
    name: info.name ?? "",
    description: info.description_short ?? info.description_full ?? "",
    countryCode: info.country_code ?? "",
    emailContacts: info.email_contacts ?? [],
    abuseContacts: info.abuse_contacts ?? [],
    website: info.website,
    ipv4Prefixes: (prefixes.ipv4_prefixes ?? []).map((p: any) => ({
      prefix: p.prefix, name: p.name, description: p.description, countryCode: p.country_code,
    })),
    ipv6Prefixes: (prefixes.ipv6_prefixes ?? []).map((p: any) => ({
      prefix: p.prefix, name: p.name, description: p.description, countryCode: p.country_code,
    })),
  };

  cache.set(key, result);
  return result;
}

// ─── IP Lookup ───

export async function bgpIp(ip: string): Promise<BgpIpResult> {
  const key = `ip:${ip}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const data = await bgpFetch(`/ip/${ip}`);

  const result: BgpIpResult = {
    ip,
    prefixes: (data.prefixes ?? []).map((p: any) => ({
      prefix: p.prefix, asn: p.asn?.asn, name: p.name, description: p.description, countryCode: p.country_code,
    })),
    rir: data.rir_allocation?.rir_name ?? "",
  };

  cache.set(key, result);
  return result;
}

// ─── Prefix Lookup ───

export async function bgpPrefix(prefix: string, cidr: number): Promise<BgpPrefixResult> {
  const key = `prefix:${prefix}/${cidr}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const data = await bgpFetch(`/prefix/${prefix}/${cidr}`);

  const result: BgpPrefixResult = {
    prefix: data.prefix,
    cidr: data.cidr,
    asns: (data.asns ?? []).map((a: any) => ({
      asn: a.asn, name: a.name, description: a.description, countryCode: a.country_code,
    })),
    name: data.name ?? "",
    description: data.description_short ?? "",
    countryCode: data.country_code ?? "",
    rir: data.rir_allocation?.rir_name ?? "",
  };

  cache.set(key, result);
  return result;
}
