import { RateLimiter } from "../utils/rate-limiter.js";

const limiter = new RateLimiter(1000);

// ─── Types ───

interface RdapDomainResult {
  domain: string;
  status: string[];
  registrar?: string;
  registrationDate?: string;
  expirationDate?: string;
  lastUpdated?: string;
  nameservers: string[];
  entities: { role: string; name?: string; email?: string; phone?: string }[];
  port43?: string;
}

interface RdapIpResult {
  ip: string;
  name?: string;
  type?: string;
  startAddress?: string;
  endAddress?: string;
  cidr?: string;
  country?: string;
  entities: { role: string; name?: string }[];
  port43?: string;
}

// ─── Domain WHOIS ───

export async function whoisDomain(domain: string): Promise<RdapDomainResult> {
  await limiter.acquire();
  const res = await fetch(`https://rdap.org/domain/${domain}`);
  if (!res.ok) throw new Error(`RDAP domain lookup failed: ${res.status} ${res.statusText}`);
  const data = await res.json();

  const nameservers: string[] = [];
  if (data.nameservers) {
    for (const ns of data.nameservers) {
      if (ns.ldhName) nameservers.push(ns.ldhName);
    }
  }

  const entities: RdapDomainResult["entities"] = [];
  if (data.entities) {
    for (const ent of data.entities) {
      const roles = ent.roles ?? [];
      const vcard = ent.vcardArray?.[1];
      let name: string | undefined;
      let email: string | undefined;
      let phone: string | undefined;

      if (vcard) {
        for (const field of vcard) {
          if (field[0] === "fn") name = field[3];
          if (field[0] === "email") email = field[3];
          if (field[0] === "tel") phone = field[3];
        }
      }

      for (const role of roles) {
        entities.push({ role, name, email, phone });
      }
    }
  }

  // Extract dates from events
  let registrationDate: string | undefined;
  let expirationDate: string | undefined;
  let lastUpdated: string | undefined;

  if (data.events) {
    for (const evt of data.events) {
      if (evt.eventAction === "registration") registrationDate = evt.eventDate;
      if (evt.eventAction === "expiration") expirationDate = evt.eventDate;
      if (evt.eventAction === "last changed") lastUpdated = evt.eventDate;
    }
  }

  // Extract registrar from entities
  let registrar: string | undefined;
  const registrarEntity = data.entities?.find((e: any) => e.roles?.includes("registrar"));
  if (registrarEntity?.vcardArray?.[1]) {
    const fn = registrarEntity.vcardArray[1].find((f: any) => f[0] === "fn");
    if (fn) registrar = fn[3];
  }

  return {
    domain: data.ldhName ?? domain,
    status: data.status ?? [],
    registrar,
    registrationDate,
    expirationDate,
    lastUpdated,
    nameservers,
    entities,
    port43: data.port43,
  };
}

// ─── IP WHOIS ───

export async function whoisIp(ip: string): Promise<RdapIpResult> {
  await limiter.acquire();
  const res = await fetch(`https://rdap.org/ip/${ip}`);
  if (!res.ok) throw new Error(`RDAP IP lookup failed: ${res.status} ${res.statusText}`);
  const data = await res.json();

  const entities: RdapIpResult["entities"] = [];
  if (data.entities) {
    for (const ent of data.entities) {
      const roles = ent.roles ?? [];
      const vcard = ent.vcardArray?.[1];
      let name: string | undefined;
      if (vcard) {
        const fn = vcard.find((f: any) => f[0] === "fn");
        if (fn) name = fn[3];
      }
      for (const role of roles) {
        entities.push({ role, name });
      }
    }
  }

  // Build CIDR from cidr0_cidrs
  let cidr: string | undefined;
  if (data.cidr0_cidrs?.[0]) {
    const c = data.cidr0_cidrs[0];
    cidr = `${c.v4prefix ?? c.v6prefix}/${c.length}`;
  }

  return {
    ip,
    name: data.name,
    type: data.type,
    startAddress: data.startAddress,
    endAddress: data.endAddress,
    cidr,
    country: data.country,
    entities,
    port43: data.port43,
  };
}
