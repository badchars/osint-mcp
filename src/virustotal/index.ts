import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";

const limiter = new RateLimiter(15000); // 4 req/min community
const cache = new TTLCache<any>(10 * 60 * 1000); // 10 min

const VT_BASE = "https://www.virustotal.com/api/v3";

// ─── Types ───

interface VtAnalysisStats {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
}

interface VtDomainResult {
  domain: string;
  reputation: number;
  analysisStats: VtAnalysisStats;
  categories: Record<string, string>;
  registrar?: string;
  creationDate?: number;
  lastAnalysisDate?: number;
  dnsRecords?: { type: string; value: string }[];
}

interface VtIpResult {
  ip: string;
  reputation: number;
  analysisStats: VtAnalysisStats;
  country?: string;
  asn?: number;
  asOwner?: string;
  network?: string;
}

interface VtSubdomainsResult {
  domain: string;
  subdomains: string[];
  total: number;
}

interface VtUrlResult {
  url: string;
  analysisId?: string;
  analysisStats?: VtAnalysisStats;
  status: string;
}

// ─── Helpers ───

async function vtFetch(path: string, apiKey: string): Promise<any> {
  await limiter.acquire();
  const res = await fetch(`${VT_BASE}${path}`, {
    headers: { "x-apikey": apiKey },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`VirusTotal API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Domain Analysis ───

export async function vtDomain(domain: string, apiKey: string): Promise<VtDomainResult> {
  const cacheKey = `vt:domain:${domain}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const data = await vtFetch(`/domains/${encodeURIComponent(domain)}`, apiKey);
  if (!data) throw new Error(`Domain ${domain} not found on VirusTotal`);

  const attrs = data.data?.attributes ?? {};
  const result: VtDomainResult = {
    domain,
    reputation: attrs.reputation ?? 0,
    analysisStats: attrs.last_analysis_stats ?? { malicious: 0, suspicious: 0, undetected: 0, harmless: 0 },
    categories: attrs.categories ?? {},
    registrar: attrs.registrar,
    creationDate: attrs.creation_date,
    lastAnalysisDate: attrs.last_analysis_date,
    dnsRecords: attrs.last_dns_records?.map((r: any) => ({ type: r.type, value: r.value })),
  };

  cache.set(cacheKey, result);
  return result;
}

// ─── IP Analysis ───

export async function vtIp(ip: string, apiKey: string): Promise<VtIpResult> {
  const cacheKey = `vt:ip:${ip}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const data = await vtFetch(`/ip_addresses/${encodeURIComponent(ip)}`, apiKey);
  if (!data) throw new Error(`IP ${ip} not found on VirusTotal`);

  const attrs = data.data?.attributes ?? {};
  const result: VtIpResult = {
    ip,
    reputation: attrs.reputation ?? 0,
    analysisStats: attrs.last_analysis_stats ?? { malicious: 0, suspicious: 0, undetected: 0, harmless: 0 },
    country: attrs.country,
    asn: attrs.asn,
    asOwner: attrs.as_owner,
    network: attrs.network,
  };

  cache.set(cacheKey, result);
  return result;
}

// ─── Subdomain Enumeration ───

export async function vtSubdomains(domain: string, apiKey: string, limit = 40): Promise<VtSubdomainsResult> {
  const data = await vtFetch(`/domains/${encodeURIComponent(domain)}/subdomains?limit=${limit}`, apiKey);
  if (!data) return { domain, subdomains: [], total: 0 };

  const subdomains: string[] = (data.data ?? []).map((d: any) => d.id);
  return { domain, subdomains, total: subdomains.length };
}

// ─── URL Analysis ───

export async function vtUrl(url: string, apiKey: string): Promise<VtUrlResult> {
  // Submit URL for analysis
  await limiter.acquire();
  const submitRes = await fetch(`${VT_BASE}/urls`, {
    method: "POST",
    headers: { "x-apikey": apiKey, "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}`,
  });

  if (!submitRes.ok) throw new Error(`VirusTotal URL submit failed: ${submitRes.status}`);
  const submitData = await submitRes.json();
  const analysisId = submitData.data?.id;

  if (!analysisId) {
    return { url, status: "submitted", analysisId: undefined };
  }

  // Try to get analysis results (may not be ready yet)
  try {
    const analysisData = await vtFetch(`/analyses/${analysisId}`, apiKey);
    if (analysisData?.data?.attributes?.status === "completed") {
      return {
        url,
        analysisId,
        analysisStats: analysisData.data.attributes.stats,
        status: "completed",
      };
    }
    return { url, analysisId, status: analysisData?.data?.attributes?.status ?? "queued" };
  } catch {
    return { url, analysisId, status: "queued" };
  }
}
