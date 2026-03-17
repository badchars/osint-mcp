import { z } from "zod";
import type { ToolDef } from "../types/index.js";
import { json } from "../types/index.js";
import { requireApiKey } from "../utils/require-key.js";

// ─── Provider Imports ───

import { dnsLookup, dnsReverse, dnsEmailSecurity, dnsSpfChain, dnsSrvDiscover, dnsWildcardCheck } from "../dns/index.js";
import { whoisDomain, whoisIp } from "../whois/index.js";
import { crtshSearch } from "../crtsh/index.js";
import { shodanHost, shodanSearch, shodanDnsResolve, shodanExploits } from "../shodan/index.js";
import { vtDomain, vtIp, vtSubdomains, vtUrl } from "../virustotal/index.js";
import { stSubdomains, stDnsHistory, stWhois } from "../securitytrails/index.js";
import { censysHosts, censysHostDetails, censysCertificates } from "../censys/index.js";
import { geoipLookup, geoipBatch } from "../geoip/index.js";
import { bgpAsn, bgpIp, bgpPrefix } from "../bgp/index.js";
import { waybackUrls, waybackSnapshots } from "../wayback/index.js";
import { hackertargetHostsearch, hackertargetReverseIp, hackertargetAslookup } from "../hackertarget/index.js";
import { m365Tenant, m365UserRealm } from "../m365/index.js";
import { checkSources } from "../meta/sources.js";
import { domainRecon } from "../meta/recon.js";

// ═══════════════════════════════════════════════════════════════
// DNS (6 tools)
// ═══════════════════════════════════════════════════════════════

const dnsLookupTool: ToolDef = {
  name: "dns_lookup",
  description: "Resolve DNS records for a domain. Supports A, AAAA, MX, TXT, NS, SOA, CNAME, SRV record types.",
  schema: {
    domain: z.string().describe("Domain name to query"),
    type: z.enum(["A", "AAAA", "MX", "TXT", "NS", "SOA", "CNAME", "SRV"]).describe("DNS record type"),
  },
  execute: async (args) => json(await dnsLookup(args.domain as string, args.type as string)),
};

const dnsReverseTool: ToolDef = {
  name: "dns_reverse",
  description: "Perform reverse DNS (PTR) lookup for an IP address. Returns associated hostnames.",
  schema: {
    ip: z.string().describe("IP address for reverse lookup"),
  },
  execute: async (args) => json(await dnsReverse(args.ip as string)),
};

const dnsEmailSecurityTool: ToolDef = {
  name: "dns_email_security",
  description: "Analyze email security posture: SPF, DMARC, DKIM records with risk assessment and recommendations. Checks common DKIM selectors (google, selector1, selector2, k1, etc.).",
  schema: {
    domain: z.string().describe("Domain to analyze"),
    dkim_selectors: z.array(z.string()).optional().describe("Custom DKIM selectors to check (default: common selectors)"),
  },
  execute: async (args) =>
    json(await dnsEmailSecurity(args.domain as string, args.dkim_selectors as string[] | undefined)),
};

const dnsSpfChainTool: ToolDef = {
  name: "dns_spf_chain",
  description: "Recursively resolve SPF include chain. Shows all included domains, IP ranges, detected services (Google Workspace, Microsoft 365, SendGrid, etc.), and RFC 7208 lookup limit compliance.",
  schema: {
    domain: z.string().describe("Domain to trace SPF chain for"),
    max_depth: z.number().optional().describe("Maximum recursion depth (default: 10)"),
  },
  execute: async (args) =>
    json(await dnsSpfChain(args.domain as string, args.max_depth as number | undefined)),
};

const dnsSrvDiscoverTool: ToolDef = {
  name: "dns_srv_discover",
  description: "Discover SRV records and common service CNAMEs for a domain. Probes for SIP, XMPP, Autodiscover, LDAP, Kerberos, CalDAV, CardDAV, and checks CNAMEs for autodiscover, lyncdiscover, OWA, ADFS, etc.",
  schema: {
    domain: z.string().describe("Domain to probe"),
  },
  execute: async (args) => json(await dnsSrvDiscover(args.domain as string)),
};

const dnsWildcardCheckTool: ToolDef = {
  name: "dns_wildcard_check",
  description: "Check if a domain has wildcard DNS configured by resolving a random subdomain.",
  schema: {
    domain: z.string().describe("Domain to check for wildcard DNS"),
  },
  execute: async (args) => json(await dnsWildcardCheck(args.domain as string)),
};

// ═══════════════════════════════════════════════════════════════
// WHOIS (2 tools)
// ═══════════════════════════════════════════════════════════════

const whoisDomainTool: ToolDef = {
  name: "whois_domain",
  description: "RDAP/WHOIS lookup for a domain. Returns registrar, registration/expiration dates, nameservers, and contact entities.",
  schema: {
    domain: z.string().describe("Domain name to look up"),
  },
  execute: async (args) => json(await whoisDomain(args.domain as string)),
};

const whoisIpTool: ToolDef = {
  name: "whois_ip",
  description: "RDAP/WHOIS lookup for an IP address. Returns network name, CIDR range, country, and responsible entities.",
  schema: {
    ip: z.string().describe("IP address to look up"),
  },
  execute: async (args) => json(await whoisIp(args.ip as string)),
};

// ═══════════════════════════════════════════════════════════════
// crt.sh (1 tool)
// ═══════════════════════════════════════════════════════════════

const crtshSearchTool: ToolDef = {
  name: "crtsh_search",
  description: "Search Certificate Transparency logs via crt.sh. Returns unique subdomains and certificate details (issuer, validity, SANs).",
  schema: {
    domain: z.string().describe("Domain to search CT logs for"),
    exclude_expired: z.boolean().optional().describe("Exclude expired certificates (default: false)"),
  },
  execute: async (args) =>
    json(await crtshSearch(args.domain as string, args.exclude_expired as boolean | undefined)),
};

// ═══════════════════════════════════════════════════════════════
// Shodan (4 tools) — requires SHODAN_API_KEY
// ═══════════════════════════════════════════════════════════════

const shodanHostTool: ToolDef = {
  name: "shodan_host",
  description: "Get Shodan host details for an IP: open ports, services, banners, vulns, OS, ASN, geolocation. Requires SHODAN_API_KEY.",
  schema: {
    ip: z.string().describe("IP address to look up"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.shodanApiKey, "Shodan", "SHODAN_API_KEY");
    return json(await shodanHost(args.ip as string, key));
  },
};

const shodanSearchTool: ToolDef = {
  name: "shodan_search",
  description: "Search Shodan for hosts matching a query (e.g. 'apache port:443 country:US'). Requires SHODAN_API_KEY.",
  schema: {
    query: z.string().describe("Shodan search query"),
    page: z.number().optional().describe("Results page number (default: 1)"),
    facets: z.string().optional().describe("Facets to include (e.g. 'country,org')"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.shodanApiKey, "Shodan", "SHODAN_API_KEY");
    return json(await shodanSearch(args.query as string, key, args.page as number | undefined, args.facets as string | undefined));
  },
};

const shodanDnsResolveTool: ToolDef = {
  name: "shodan_dns_resolve",
  description: "Resolve hostnames to IPs using Shodan's DNS resolver. Requires SHODAN_API_KEY.",
  schema: {
    hostnames: z.array(z.string()).describe("Hostnames to resolve"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.shodanApiKey, "Shodan", "SHODAN_API_KEY");
    return json(await shodanDnsResolve(args.hostnames as string[], key));
  },
};

const shodanExploitsTool: ToolDef = {
  name: "shodan_exploits",
  description: "Search Shodan's exploit database for public exploits matching a query. Requires SHODAN_API_KEY.",
  schema: {
    query: z.string().describe("Exploit search query (e.g. 'apache 2.4' or CVE ID)"),
    type: z.string().optional().describe("Filter by exploit type (e.g. 'exploit', 'metasploit')"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.shodanApiKey, "Shodan", "SHODAN_API_KEY");
    return json(await shodanExploits(args.query as string, key, args.type as string | undefined));
  },
};

// ═══════════════════════════════════════════════════════════════
// VirusTotal (4 tools) — requires VT_API_KEY
// ═══════════════════════════════════════════════════════════════

const vtDomainTool: ToolDef = {
  name: "vt_domain",
  description: "VirusTotal domain analysis: reputation score, detection stats, categories, registrar, DNS records. Requires VT_API_KEY.",
  schema: {
    domain: z.string().describe("Domain to analyze"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.vtApiKey, "VirusTotal", "VT_API_KEY");
    return json(await vtDomain(args.domain as string, key));
  },
};

const vtIpTool: ToolDef = {
  name: "vt_ip",
  description: "VirusTotal IP analysis: reputation, detection stats, country, ASN, network. Requires VT_API_KEY.",
  schema: {
    ip: z.string().describe("IP address to analyze"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.vtApiKey, "VirusTotal", "VT_API_KEY");
    return json(await vtIp(args.ip as string, key));
  },
};

const vtSubdomainsTool: ToolDef = {
  name: "vt_subdomains",
  description: "Enumerate subdomains for a domain via VirusTotal. Requires VT_API_KEY.",
  schema: {
    domain: z.string().describe("Domain to enumerate subdomains for"),
    limit: z.number().optional().describe("Maximum subdomains to return (default: 40)"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.vtApiKey, "VirusTotal", "VT_API_KEY");
    return json(await vtSubdomains(args.domain as string, key, args.limit as number | undefined));
  },
};

const vtUrlTool: ToolDef = {
  name: "vt_url",
  description: "Submit a URL to VirusTotal for scanning and get analysis results (malicious/suspicious/harmless). Requires VT_API_KEY.",
  schema: {
    url: z.string().describe("URL to scan"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.vtApiKey, "VirusTotal", "VT_API_KEY");
    return json(await vtUrl(args.url as string, key));
  },
};

// ═══════════════════════════════════════════════════════════════
// SecurityTrails (3 tools) — requires ST_API_KEY
// ═══════════════════════════════════════════════════════════════

const stSubdomainsTool: ToolDef = {
  name: "st_subdomains",
  description: "Enumerate subdomains for a domain via SecurityTrails. Returns FQDNs. Requires ST_API_KEY.",
  schema: {
    domain: z.string().describe("Domain to enumerate subdomains for"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.stApiKey, "SecurityTrails", "ST_API_KEY");
    return json(await stSubdomains(args.domain as string, key));
  },
};

const stDnsHistoryTool: ToolDef = {
  name: "st_dns_history",
  description: "Get historical DNS records for a domain via SecurityTrails. Shows first/last seen dates, values, and organizations. Requires ST_API_KEY.",
  schema: {
    domain: z.string().describe("Domain to get DNS history for"),
    type: z.enum(["a", "aaaa", "mx", "ns", "soa", "txt"]).describe("DNS record type"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.stApiKey, "SecurityTrails", "ST_API_KEY");
    return json(await stDnsHistory(args.domain as string, args.type as string, key));
  },
};

const stWhoisTool: ToolDef = {
  name: "st_whois",
  description: "Enhanced WHOIS lookup via SecurityTrails with registrant/admin/technical contacts. Requires ST_API_KEY.",
  schema: {
    domain: z.string().describe("Domain to look up"),
  },
  execute: async (args, ctx) => {
    const key = requireApiKey(ctx.config.stApiKey, "SecurityTrails", "ST_API_KEY");
    return json(await stWhois(args.domain as string, key));
  },
};

// ═══════════════════════════════════════════════════════════════
// Censys (3 tools) — requires CENSYS_API_ID + CENSYS_API_SECRET
// ═══════════════════════════════════════════════════════════════

const censysHostsTool: ToolDef = {
  name: "censys_hosts",
  description: "Search Censys for hosts matching a query. Returns IPs, services, ports, location, ASN. Requires CENSYS_API_ID + CENSYS_API_SECRET.",
  schema: {
    query: z.string().describe("Censys search query"),
    per_page: z.number().optional().describe("Results per page (max 100, default: 25)"),
  },
  execute: async (args, ctx) => {
    const id = requireApiKey(ctx.config.censysApiId, "Censys", "CENSYS_API_ID");
    const secret = requireApiKey(ctx.config.censysApiSecret, "Censys", "CENSYS_API_SECRET");
    return json(await censysHosts(args.query as string, { id, secret }, args.per_page as number | undefined));
  },
};

const censysHostDetailsTool: ToolDef = {
  name: "censys_host_details",
  description: "Get detailed Censys host information for a single IP: all services, certificates, OS, location, ASN. Requires CENSYS_API_ID + CENSYS_API_SECRET.",
  schema: {
    ip: z.string().describe("IP address to look up"),
  },
  execute: async (args, ctx) => {
    const id = requireApiKey(ctx.config.censysApiId, "Censys", "CENSYS_API_ID");
    const secret = requireApiKey(ctx.config.censysApiSecret, "Censys", "CENSYS_API_SECRET");
    return json(await censysHostDetails(args.ip as string, { id, secret }));
  },
};

const censysCertificatesTool: ToolDef = {
  name: "censys_certificates",
  description: "Search Censys certificate database. Returns certificate fingerprints, subjects, issuers, validity, and SANs. Requires CENSYS_API_ID + CENSYS_API_SECRET.",
  schema: {
    query: z.string().describe("Certificate search query (e.g. 'parsed.names: example.com')"),
    per_page: z.number().optional().describe("Results per page (max 100, default: 25)"),
  },
  execute: async (args, ctx) => {
    const id = requireApiKey(ctx.config.censysApiId, "Censys", "CENSYS_API_ID");
    const secret = requireApiKey(ctx.config.censysApiSecret, "Censys", "CENSYS_API_SECRET");
    return json(await censysCertificates(args.query as string, { id, secret }, args.per_page as number | undefined));
  },
};

// ═══════════════════════════════════════════════════════════════
// GeoIP (2 tools) — ip-api.com free tier
// ═══════════════════════════════════════════════════════════════

const geoipLookupTool: ToolDef = {
  name: "geoip_lookup",
  description: "Geolocate an IP address: country, city, ISP, ASN, proxy/hosting/mobile detection. Uses ip-api.com (free, no API key).",
  schema: {
    ip: z.string().describe("IP address to geolocate"),
  },
  execute: async (args) => json(await geoipLookup(args.ip as string)),
};

const geoipBatchTool: ToolDef = {
  name: "geoip_batch",
  description: "Batch geolocate up to 100 IP addresses at once. Uses ip-api.com (free, no API key).",
  schema: {
    ips: z.array(z.string()).describe("IP addresses to geolocate (max 100)"),
  },
  execute: async (args) => json(await geoipBatch(args.ips as string[])),
};

// ═══════════════════════════════════════════════════════════════
// BGP (3 tools) — bgpview.io free
// ═══════════════════════════════════════════════════════════════

const bgpAsnTool: ToolDef = {
  name: "bgp_asn",
  description: "Look up ASN details and announced IPv4/IPv6 prefixes via BGPView. Returns ASN name, description, contacts, and all announced prefixes.",
  schema: {
    asn: z.number().describe("Autonomous System Number (e.g. 13335)"),
  },
  execute: async (args) => json(await bgpAsn(args.asn as number)),
};

const bgpIpTool: ToolDef = {
  name: "bgp_ip",
  description: "Look up BGP routing information for an IP address. Returns matching prefixes, ASNs, and RIR allocation.",
  schema: {
    ip: z.string().describe("IP address to look up"),
  },
  execute: async (args) => json(await bgpIp(args.ip as string)),
};

const bgpPrefixTool: ToolDef = {
  name: "bgp_prefix",
  description: "Look up details for a specific IP prefix/CIDR. Returns announcing ASNs, name, country, and RIR.",
  schema: {
    prefix: z.string().describe("IP prefix (e.g. '1.1.1.0')"),
    cidr: z.number().describe("CIDR mask (e.g. 24)"),
  },
  execute: async (args) => json(await bgpPrefix(args.prefix as string, args.cidr as number)),
};

// ═══════════════════════════════════════════════════════════════
// Wayback Machine (2 tools) — CDX API free
// ═══════════════════════════════════════════════════════════════

const waybackUrlsTool: ToolDef = {
  name: "wayback_urls",
  description: "Search Wayback Machine for archived URLs of a domain. Returns unique URLs with timestamps, status codes, and MIME types. Useful for finding old endpoints, hidden paths, and removed content.",
  schema: {
    domain: z.string().describe("Domain to search archived URLs for"),
    match_type: z.string().optional().describe("CDX match type (exact, prefix, host, domain)"),
    filter: z.string().optional().describe("CDX filter (e.g. 'statuscode:200', 'mimetype:text/html')"),
    limit: z.number().optional().describe("Maximum URLs to return (default: 1000)"),
  },
  execute: async (args) =>
    json(await waybackUrls(
      args.domain as string,
      args.match_type as string | undefined,
      args.filter as string | undefined,
      args.limit as number | undefined,
    )),
};

const waybackSnapshotsTool: ToolDef = {
  name: "wayback_snapshots",
  description: "Get Wayback Machine snapshot history for a specific URL. Returns timestamps, status codes, and direct archive links. Shows first/last seen dates.",
  schema: {
    url: z.string().describe("URL to get snapshot history for"),
    limit: z.number().optional().describe("Maximum snapshots to return (default: 100)"),
  },
  execute: async (args) =>
    json(await waybackSnapshots(args.url as string, args.limit as number | undefined)),
};

// ═══════════════════════════════════════════════════════════════
// HackerTarget (3 tools) — free tier (50/day)
// ═══════════════════════════════════════════════════════════════

const hackertargetHostsearchTool: ToolDef = {
  name: "hackertarget_hostsearch",
  description: "Find subdomains and their IPs for a domain via HackerTarget. Free tier: 50 queries/day.",
  schema: {
    domain: z.string().describe("Domain to search hosts for"),
  },
  execute: async (args) => json(await hackertargetHostsearch(args.domain as string)),
};

const hackertargetReverseIpTool: ToolDef = {
  name: "hackertarget_reverseip",
  description: "Reverse IP lookup via HackerTarget — find all domains hosted on an IP. Free tier: 50 queries/day.",
  schema: {
    ip: z.string().describe("IP address for reverse lookup"),
  },
  execute: async (args) => json(await hackertargetReverseIp(args.ip as string)),
};

const hackertargetAslookupTool: ToolDef = {
  name: "hackertarget_aslookup",
  description: "Look up ASN information for an IP or ASN via HackerTarget. Free tier: 50 queries/day.",
  schema: {
    query: z.string().describe("IP address or ASN to look up"),
  },
  execute: async (args) => json(await hackertargetAslookup(args.query as string)),
};

// ═══════════════════════════════════════════════════════════════
// Microsoft 365 (2 tools) — free, no key
// ═══════════════════════════════════════════════════════════════

const m365TenantTool: ToolDef = {
  name: "m365_tenant",
  description: "Discover Microsoft 365 tenant information for a domain. Returns tenant ID, region, and OpenID configuration endpoints.",
  schema: {
    domain: z.string().describe("Domain to check for M365 tenant"),
  },
  execute: async (args) => json(await m365Tenant(args.domain as string)),
};

const m365UserRealmTool: ToolDef = {
  name: "m365_userrealm",
  description: "Detect authentication type for a domain's Microsoft 365 tenant. Returns namespace type (Managed/Federated), federation brand name, and auth endpoints.",
  schema: {
    domain: z.string().describe("Domain to check user realm for"),
  },
  execute: async (args) => json(await m365UserRealm(args.domain as string)),
};

// ═══════════════════════════════════════════════════════════════
// Meta (2 tools)
// ═══════════════════════════════════════════════════════════════

const osintListSourcesTool: ToolDef = {
  name: "osint_list_sources",
  description: "List all OSINT data sources, their availability, API key requirements, and tool counts. Use this to check which sources are configured.",
  schema: {},
  execute: async (_args, ctx) => json(await checkSources(ctx)),
};

const osintDomainReconTool: ToolDef = {
  name: "osint_domain_recon",
  description: "Quick domain reconnaissance combining free sources: DNS (A/MX/NS/TXT), WHOIS, crt.sh subdomains, HackerTarget hosts, and email security analysis. No API keys required.",
  schema: {
    domain: z.string().describe("Domain to perform recon on"),
  },
  execute: async (args) => json(await domainRecon(args.domain as string)),
};

// ═══════════════════════════════════════════════════════════════
// All Tools Export
// ═══════════════════════════════════════════════════════════════

export const allTools: ToolDef[] = [
  // DNS (6)
  dnsLookupTool,
  dnsReverseTool,
  dnsEmailSecurityTool,
  dnsSpfChainTool,
  dnsSrvDiscoverTool,
  dnsWildcardCheckTool,
  // WHOIS (2)
  whoisDomainTool,
  whoisIpTool,
  // crt.sh (1)
  crtshSearchTool,
  // Shodan (4)
  shodanHostTool,
  shodanSearchTool,
  shodanDnsResolveTool,
  shodanExploitsTool,
  // VirusTotal (4)
  vtDomainTool,
  vtIpTool,
  vtSubdomainsTool,
  vtUrlTool,
  // SecurityTrails (3)
  stSubdomainsTool,
  stDnsHistoryTool,
  stWhoisTool,
  // Censys (3)
  censysHostsTool,
  censysHostDetailsTool,
  censysCertificatesTool,
  // GeoIP (2)
  geoipLookupTool,
  geoipBatchTool,
  // BGP (3)
  bgpAsnTool,
  bgpIpTool,
  bgpPrefixTool,
  // Wayback (2)
  waybackUrlsTool,
  waybackSnapshotsTool,
  // HackerTarget (3)
  hackertargetHostsearchTool,
  hackertargetReverseIpTool,
  hackertargetAslookupTool,
  // M365 (2)
  m365TenantTool,
  m365UserRealmTool,
  // Meta (2)
  osintListSourcesTool,
  osintDomainReconTool,
];
