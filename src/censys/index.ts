import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(1000);

const CENSYS_BASE = "https://search.censys.io/api/v2";

// ─── Types ───

interface CensysAuth {
  id: string;
  secret: string;
}

interface CensysHost {
  ip: string;
  services: { port: number; serviceName: string; transportProtocol: string; certificate?: string }[];
  location?: { country?: string; city?: string; province?: string };
  autonomousSystem?: { asn: number; name: string; bgpPrefix: string };
  lastUpdatedAt?: string;
  operatingSystem?: { product?: string; version?: string };
}

interface CensysHostsResult {
  total: number;
  hosts: CensysHost[];
  query: string;
}

interface CensysCert {
  fingerprint: string;
  subject?: { commonName?: string; organization?: string };
  issuer?: { commonName?: string; organization?: string };
  validityStart?: string;
  validityEnd?: string;
  names: string[];
}

interface CensysCertsResult {
  total: number;
  certificates: CensysCert[];
  query: string;
}

// ─── Helpers ───

function authHeader(auth: CensysAuth): string {
  return "Basic " + btoa(`${auth.id}:${auth.secret}`);
}

async function censysFetch(method: string, path: string, auth: CensysAuth, body?: any): Promise<any> {
  await limiter.acquire();
  const opts: RequestInit = {
    method,
    headers: {
      Authorization: authHeader(auth),
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${CENSYS_BASE}${path}`, opts);
  if (!res.ok) throw new Error(`Censys API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Host Search ───

export async function censysHosts(query: string, auth: CensysAuth, perPage = 25): Promise<CensysHostsResult> {
  const data = await censysFetch("POST", "/hosts/search", auth, {
    q: query,
    per_page: Math.min(perPage, 100),
  });

  const result = data.result ?? {};
  const hosts: CensysHost[] = (result.hits ?? []).map((h: any) => ({
    ip: h.ip,
    services: (h.services ?? []).map((s: any) => ({
      port: s.port,
      serviceName: s.service_name ?? s.extended_service_name ?? "",
      transportProtocol: s.transport_protocol ?? "TCP",
      certificate: s.certificate,
    })),
    location: h.location
      ? { country: h.location.country, city: h.location.city, province: h.location.province }
      : undefined,
    autonomousSystem: h.autonomous_system
      ? { asn: h.autonomous_system.asn, name: h.autonomous_system.name, bgpPrefix: h.autonomous_system.bgp_prefix }
      : undefined,
    lastUpdatedAt: h.last_updated_at,
    operatingSystem: h.operating_system
      ? { product: h.operating_system.product, version: h.operating_system.version }
      : undefined,
  }));

  return { total: result.total ?? 0, hosts, query };
}

// ─── Host Details ───

export async function censysHostDetails(ip: string, auth: CensysAuth): Promise<CensysHost> {
  const data = await censysFetch("GET", `/hosts/${encodeURIComponent(ip)}`, auth);
  const h = data.result ?? {};

  return {
    ip: h.ip ?? ip,
    services: (h.services ?? []).map((s: any) => ({
      port: s.port,
      serviceName: s.service_name ?? s.extended_service_name ?? "",
      transportProtocol: s.transport_protocol ?? "TCP",
      certificate: s.tls?.certificates?.leaf_data?.fingerprint,
    })),
    location: h.location
      ? { country: h.location.country, city: h.location.city, province: h.location.province }
      : undefined,
    autonomousSystem: h.autonomous_system
      ? { asn: h.autonomous_system.asn, name: h.autonomous_system.name, bgpPrefix: h.autonomous_system.bgp_prefix }
      : undefined,
    lastUpdatedAt: h.last_updated_at,
    operatingSystem: h.operating_system
      ? { product: h.operating_system.product, version: h.operating_system.version }
      : undefined,
  };
}

// ─── Certificate Search ───

export async function censysCertificates(query: string, auth: CensysAuth, perPage = 25): Promise<CensysCertsResult> {
  const data = await censysFetch("POST", "/certificates/search", auth, {
    q: query,
    per_page: Math.min(perPage, 100),
  });

  const result = data.result ?? {};
  const certificates: CensysCert[] = (result.hits ?? []).map((c: any) => ({
    fingerprint: c.fingerprint_sha256 ?? c.fingerprint ?? "",
    subject: c.parsed?.subject
      ? { commonName: c.parsed.subject.common_name?.[0], organization: c.parsed.subject.organization?.[0] }
      : undefined,
    issuer: c.parsed?.issuer
      ? { commonName: c.parsed.issuer.common_name?.[0], organization: c.parsed.issuer.organization?.[0] }
      : undefined,
    validityStart: c.parsed?.validity?.start,
    validityEnd: c.parsed?.validity?.end,
    names: c.names ?? c.parsed?.names ?? [],
  }));

  return { total: result.total ?? 0, certificates, query };
}
