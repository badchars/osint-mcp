import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";

const limiter = new RateLimiter(2000);
const cache = new TTLCache<CrtshResult>(15 * 60 * 1000); // 15 min

// ─── Types ───

interface CrtshCert {
  issuer: string;
  commonName: string;
  nameValue: string;
  notBefore: string;
  notAfter: string;
  id: number;
}

interface CrtshResult {
  domain: string;
  totalCerts: number;
  uniqueSubdomains: string[];
  certificates: CrtshCert[];
}

// ─── CT Log Search ───

export async function crtshSearch(domain: string, excludeExpired = false): Promise<CrtshResult> {
  const cacheKey = `${domain}:${excludeExpired}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  await limiter.acquire();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const url = `https://crt.sh/?q=%25.${encodeURIComponent(domain)}&output=json`;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`crt.sh returned ${res.status}`);

    const data: any[] = await res.json();
    const now = Date.now();

    // Deduplicate subdomains
    const subdomainSet = new Set<string>();
    const certificates: CrtshCert[] = [];

    for (const entry of data) {
      const nameValue: string = entry.name_value ?? "";
      const notAfter = entry.not_after ? new Date(entry.not_after).getTime() : Infinity;

      if (excludeExpired && notAfter < now) continue;

      // name_value can contain multiple domains separated by \n
      const names = nameValue.split("\n").map((n: string) => n.trim().toLowerCase()).filter(Boolean);
      for (const name of names) {
        if (!name.startsWith("*")) subdomainSet.add(name);
        else subdomainSet.add(name); // Keep wildcards too
      }

      certificates.push({
        issuer: entry.issuer_name ?? "",
        commonName: entry.common_name ?? "",
        nameValue,
        notBefore: entry.not_before ?? "",
        notAfter: entry.not_after ?? "",
        id: entry.id ?? 0,
      });
    }

    // Sort subdomains and limit certificates shown
    const uniqueSubdomains = [...subdomainSet].sort();

    const result: CrtshResult = {
      domain,
      totalCerts: data.length,
      uniqueSubdomains,
      certificates: certificates.slice(0, 50), // Limit to avoid huge responses
    };

    cache.set(cacheKey, result);
    return result;
  } finally {
    clearTimeout(timeout);
  }
}
