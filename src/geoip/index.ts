import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(1400); // 45 req/min

// ─── Types ───

interface GeoIpResult {
  query: string;
  status: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
}

// ─── Single IP Lookup ───

export async function geoipLookup(ip: string): Promise<GeoIpResult> {
  await limiter.acquire();
  // ip-api.com free tier requires HTTP (not HTTPS)
  const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,query,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting`);
  if (!res.ok) throw new Error(`ip-api.com returned ${res.status}`);
  const data = await res.json();
  if (data.status === "fail") throw new Error(`ip-api.com: ${data.message}`);
  return data;
}

// ─── Batch IP Lookup (up to 100) ───

export async function geoipBatch(ips: string[]): Promise<GeoIpResult[]> {
  if (ips.length === 0) return [];
  const batch = ips.slice(0, 100);

  await limiter.acquire();
  const res = await fetch("http://ip-api.com/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      batch.map((ip) => ({
        query: ip,
        fields: "status,message,query,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting",
      })),
    ),
  });
  if (!res.ok) throw new Error(`ip-api.com batch returned ${res.status}`);
  return res.json();
}
