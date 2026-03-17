import type { ToolContext } from "../types/index.js";

interface SourceInfo {
  name: string;
  url: string;
  authRequired: boolean;
  configured: boolean;
  envVar?: string;
  toolCount: number;
}

export async function checkSources(ctx: ToolContext): Promise<SourceInfo[]> {
  return [
    { name: "DNS", url: "native (dns/promises)", authRequired: false, configured: true, toolCount: 6 },
    { name: "WHOIS (RDAP)", url: "rdap.org", authRequired: false, configured: true, toolCount: 2 },
    { name: "crt.sh", url: "crt.sh", authRequired: false, configured: true, toolCount: 1 },
    { name: "GeoIP", url: "ip-api.com", authRequired: false, configured: true, toolCount: 2 },
    { name: "BGP/ASN", url: "bgpview.io", authRequired: false, configured: true, toolCount: 3 },
    { name: "HackerTarget", url: "hackertarget.com", authRequired: false, configured: true, toolCount: 3 },
    { name: "Wayback Machine", url: "web.archive.org", authRequired: false, configured: true, toolCount: 2 },
    { name: "Microsoft 365", url: "login.microsoftonline.com", authRequired: false, configured: true, toolCount: 2 },
    {
      name: "Shodan",
      url: "api.shodan.io",
      authRequired: true,
      configured: !!ctx.config.shodanApiKey,
      envVar: "SHODAN_API_KEY",
      toolCount: 4,
    },
    {
      name: "VirusTotal",
      url: "virustotal.com/api/v3",
      authRequired: true,
      configured: !!ctx.config.vtApiKey,
      envVar: "VT_API_KEY",
      toolCount: 4,
    },
    {
      name: "SecurityTrails",
      url: "api.securitytrails.com",
      authRequired: true,
      configured: !!ctx.config.stApiKey,
      envVar: "ST_API_KEY",
      toolCount: 3,
    },
    {
      name: "Censys",
      url: "search.censys.io",
      authRequired: true,
      configured: !!(ctx.config.censysApiId && ctx.config.censysApiSecret),
      envVar: "CENSYS_API_ID + CENSYS_API_SECRET",
      toolCount: 3,
    },
  ];
}
