import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(1000);

// ─── Types ───

interface WaybackUrl {
  url: string;
  timestamp: string;
  statusCode: string;
  mimeType: string;
}

interface WaybackUrlsResult {
  domain: string;
  totalUrls: number;
  urls: WaybackUrl[];
}

interface WaybackSnapshot {
  timestamp: string;
  url: string;
  statusCode: string;
  mimeType: string;
  archiveUrl: string;
}

interface WaybackSnapshotsResult {
  url: string;
  totalSnapshots: number;
  firstSeen?: string;
  lastSeen?: string;
  snapshots: WaybackSnapshot[];
}

// ─── URL Archive Search ───

export async function waybackUrls(
  domain: string,
  matchType?: string,
  filter?: string,
  limit = 1000,
): Promise<WaybackUrlsResult> {
  await limiter.acquire();

  const params = new URLSearchParams({
    url: `*.${domain}/*`,
    output: "json",
    fl: "original,timestamp,statuscode,mimetype",
    collapse: "urlkey",
    limit: String(limit),
  });
  if (matchType) params.set("matchType", matchType);
  if (filter) params.set("filter", filter);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`https://web.archive.org/cdx/search/cdx?${params}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Wayback CDX returned ${res.status}`);

    const data: string[][] = await res.json();
    // First row is header: ["original", "timestamp", "statuscode", "mimetype"]
    const rows = data.slice(1);

    const urls: WaybackUrl[] = rows.map((row) => ({
      url: row[0] ?? "",
      timestamp: row[1] ?? "",
      statusCode: row[2] ?? "",
      mimeType: row[3] ?? "",
    }));

    return { domain, totalUrls: urls.length, urls };
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Snapshot History ───

export async function waybackSnapshots(url: string, limit = 100): Promise<WaybackSnapshotsResult> {
  await limiter.acquire();

  const params = new URLSearchParams({
    url,
    output: "json",
    fl: "timestamp,original,statuscode,mimetype",
    limit: String(limit),
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(`https://web.archive.org/cdx/search/cdx?${params}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Wayback CDX returned ${res.status}`);

    const data: string[][] = await res.json();
    const rows = data.slice(1);

    const snapshots: WaybackSnapshot[] = rows.map((row) => ({
      timestamp: row[0] ?? "",
      url: row[1] ?? "",
      statusCode: row[2] ?? "",
      mimeType: row[3] ?? "",
      archiveUrl: `https://web.archive.org/web/${row[0]}/${row[1]}`,
    }));

    const firstSeen = snapshots.length > 0 ? snapshots[0].timestamp : undefined;
    const lastSeen = snapshots.length > 0 ? snapshots[snapshots.length - 1].timestamp : undefined;

    return { url, totalSnapshots: snapshots.length, firstSeen, lastSeen, snapshots };
  } finally {
    clearTimeout(timeout);
  }
}
