import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(500); // 2 req/s

// ─── Types ───

interface HostEntry {
  hostname: string;
  ip: string;
}

interface AslookupResult {
  query: string;
  raw: string;
  entries: { asn: string; ip: string; owner: string }[];
}

// ─── Helpers ───

async function htFetch(endpoint: string, query: string): Promise<string> {
  await limiter.acquire();
  const res = await fetch(`https://api.hackertarget.com/${endpoint}/?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`HackerTarget returned ${res.status}`);
  const text = await res.text();
  if (text.startsWith("error")) throw new Error(`HackerTarget: ${text}`);
  if (text.includes("API count exceeded")) throw new Error("HackerTarget daily API limit exceeded (50/day free tier)");
  return text.trim();
}

// ─── Host Search ───

export async function hackertargetHostsearch(domain: string): Promise<HostEntry[]> {
  const text = await htFetch("hostsearch", domain);
  if (!text) return [];

  return text.split("\n").filter(Boolean).map((line) => {
    const [hostname, ip] = line.split(",");
    return { hostname: hostname?.trim() ?? "", ip: ip?.trim() ?? "" };
  });
}

// ─── Reverse IP ───

export async function hackertargetReverseIp(ip: string): Promise<string[]> {
  const text = await htFetch("reverseiplookup", ip);
  if (!text) return [];
  return text.split("\n").filter(Boolean).map((l) => l.trim());
}

// ─── ASN Lookup ───

export async function hackertargetAslookup(query: string): Promise<AslookupResult> {
  const text = await htFetch("aslookup", query);
  const lines = text.split("\n").filter(Boolean);
  const entries: AslookupResult["entries"] = [];

  for (const line of lines) {
    const parts = line.split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
    if (parts.length >= 3) {
      entries.push({ asn: parts[0], ip: parts[1], owner: parts[2] });
    }
  }

  return { query, raw: text, entries };
}
