<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">OSINT & reconnaissance intelligence for AI agents.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; unified into a single MCP server.<br>
  Your AI agent gets <b>full-spectrum OSINT on demand</b>, not 12 browser tabs and manual correlation.
</p>

<br>

<p align="center">
  <a href="#the-problem">The Problem</a> &bull;
  <a href="#how-its-different">How It's Different</a> &bull;
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#what-the-ai-can-do">What The AI Can Do</a> &bull;
  <a href="#tools-reference-37-tools">Tools (37)</a> &bull;
  <a href="#data-sources-12">Data Sources</a> &bull;
  <a href="#architecture">Architecture</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/osint-mcp"><img src="https://img.shields.io/npm/v/osint-mcp.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-37-06b6d4" alt="37 Tools">
  <img src="https://img.shields.io/badge/sources-12-0ea5e9" alt="12 Sources">
  <img src="https://img.shields.io/badge/free%20tools-21-22c55e" alt="21 Free Tools">
</p>

---

## The Problem

OSINT collection is the first step of every penetration test, bug bounty, and threat assessment. The data you need is scattered across a dozen platforms &mdash; each with its own API, its own auth, its own rate limits, its own output format. Today you open Shodan in one tab, VirusTotal in another, run `dig` in a terminal, copy-paste from WHOIS, switch to crt.sh for certificates, and then spend 30 minutes manually correlating everything.

```
Traditional OSINT workflow:
  resolve DNS records            →  dig / nslookup CLI
  check WHOIS registration       →  whois CLI or web tool
  enumerate subdomains           →  crt.sh + SecurityTrails + VirusTotal (3 different UIs)
  scan for open ports/services   →  Shodan web interface
  check domain reputation        →  VirusTotal web interface
  map IP infrastructure          →  Censys + BGP lookups
  find archived pages            →  Wayback Machine web UI
  check email security           →  manual MX/SPF/DMARC lookups
  correlate everything           →  copy-paste into a spreadsheet
  ─────────────────────────────────
  Total: 45+ minutes per target, most of it switching contexts
```

**osint-mcp** gives your AI agent 37 tools across 12 data sources via the [Model Context Protocol](https://modelcontextprotocol.io). The agent queries all sources in parallel, correlates data, identifies risks, and presents a unified intelligence picture &mdash; in a single conversation.

```
With osint-mcp:
  You: "Do a full recon on target.com"

  Agent: → DNS: 4 A records, 3 MX (Google Workspace), 2 NS
         → WHOIS: Registered 2019, expires 2025, GoDaddy
         → crt.sh: 47 unique subdomains from CT logs
         → HackerTarget: 23 hosts with IPs
         → Email: SPF soft-fail (~all), DMARC p=none, no DKIM
         → Shodan: 3 IPs, 12 open ports, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Clean reputation, 0 detections
         → "target.com has 47 subdomains, weak email security
            (SPF soft-fail, DMARC monitoring only), and one IP
            running Apache 2.4.49 with a known path traversal CVE.
            Priority: patch Apache, upgrade SPF to -all, set DMARC to p=reject."
```

---

## How It's Different

Existing OSINT tools give you raw data one source at a time. osint-mcp gives your AI agent the ability to **reason across all sources simultaneously**.

<table>
<thead>
<tr>
<th></th>
<th>Traditional OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interface</b></td>
<td>12 different web UIs, CLIs, and APIs</td>
<td>MCP &mdash; AI agent calls tools conversationally</td>
</tr>
<tr>
<td><b>Data sources</b></td>
<td>One platform at a time</td>
<td>12 sources queried in parallel</td>
</tr>
<tr>
<td><b>Subdomain enum</b></td>
<td>crt.sh OR SecurityTrails OR VirusTotal</td>
<td>Agent merges all three + HackerTarget, deduplicates</td>
</tr>
<tr>
<td><b>Correlation</b></td>
<td>Manual copy-paste between tabs</td>
<td>Agent cross-references: "This IP from Shodan also appears in Censys with expired cert"</td>
</tr>
<tr>
<td><b>Email security</b></td>
<td>Separate SPF/DMARC/DKIM lookups</td>
<td>Combined analysis with risk score and actionable recommendations</td>
</tr>
<tr>
<td><b>Infrastructure</b></td>
<td>GeoIP + BGP + WHOIS separately</td>
<td>Agent maps full infrastructure: ASN, prefixes, geolocation, ownership</td>
</tr>
<tr>
<td><b>API keys</b></td>
<td>Required for almost everything</td>
<td>21 tools work free, 16 more with optional API keys</td>
</tr>
<tr>
<td><b>Setup</b></td>
<td>Install each tool, manage each config</td>
<td><code>npx osint-mcp</code> &mdash; one command, zero config</td>
</tr>
</tbody>
</table>

---

## Quick Start

### Option 1: npx (no install)

```bash
npx osint-mcp
```

21 public OSINT tools work immediately. No API keys required.

### Option 2: Clone

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Environment variables (optional)

```bash
# Premium OSINT sources — all optional
export SHODAN_API_KEY=your-key           # Enables 4 Shodan tools
export VT_API_KEY=your-key               # Enables 4 VirusTotal tools
export ST_API_KEY=your-key               # Enables 3 SecurityTrails tools
export CENSYS_API_ID=your-id             # Enables 3 Censys tools
export CENSYS_API_SECRET=your-secret     # Required with CENSYS_API_ID
```

All premium API keys are optional. Without them, you still get 21 tools covering DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget, and Microsoft 365 tenant discovery.

### Connect to your AI agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
# With npx
claude mcp add osint-mcp -- npx osint-mcp

# With local clone
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "osint": {
      "command": "npx",
      "args": ["-y", "osint-mcp"],
      "env": {
        "SHODAN_API_KEY": "optional",
        "VT_API_KEY": "optional",
        "ST_API_KEY": "optional",
        "CENSYS_API_ID": "optional",
        "CENSYS_API_SECRET": "optional"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Cursor / Windsurf / other MCP clients</b></summary>

Same JSON config format. Point the command to `npx osint-mcp` or your local installation path.

</details>

### Start querying

```
You: "What can you find about example.com?"
```

That's it. The agent handles DNS, WHOIS, subdomains, email security, and more automatically.

---

## What The AI Can Do

### Domain Reconnaissance

```
You: "Do a full recon on target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: A records point to 3 IPs (AWS us-east-1)
       → WHOIS: Registered 2018 via Namecheap, expires 2026
       → crt.sh: 62 subdomains discovered
       → HackerTarget: 31 hosts with resolved IPs
       → Email: SPF hard-fail, DMARC p=reject, DKIM found (selector1)
       → "target.com is well-configured for email security.
          62 subdomains found — notable: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastructure is on AWS (us-east-1)."
```

### Attack Surface Mapping

```
You: "Map the attack surface for 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Open ports: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy on 8080
          Reverse DNS: web1.target.com
          3 known CVEs flagged by Shodan"
```

### Subdomain Enumeration (Multi-Source)

```
You: "Find all subdomains of target.com using every source available"

Agent: → crtsh_search {domain: "target.com"}              → 62 subdomains
       → st_subdomains {domain: "target.com"}              → 84 subdomains
       → vt_subdomains {domain: "target.com"}              → 41 subdomains
       → hackertarget_hostsearch {domain: "target.com"}    → 31 hosts
       → dns_wildcard_check {domain: "target.com"}         → No wildcard
       → "127 unique subdomains after dedup across 4 sources.
          Notable findings: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD exposure risk),
          old-admin.target.com (potential legacy system)"
```

### Email Security Audit

```
You: "Analyze the email security posture of target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Email Security: HIGH RISK
          SPF: ~all (soft fail — spoofable)
          DMARC: p=none (monitoring only — not enforcing)
          DKIM: Found for selector1 (2048-bit, good)
          SPF chain: 7 includes, 2 services (Google Workspace, SendGrid)
          M365: Not a Microsoft tenant
          Recommendations:
          1. Upgrade SPF from ~all to -all
          2. Change DMARC from p=none to p=quarantine, then p=reject
          3. Add rua= to DMARC for aggregate reporting"
```

### Historical Intelligence

```
You: "What was target.com running 3 years ago?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS history: target.com moved from 198.51.100.1 (DigitalOcean)
          to 203.0.113.50 (AWS) in 2023.
          Wayback found 342 unique URLs including:
          - /admin/ (removed in 2024, was accessible)
          - /api/v1/docs (Swagger UI, still cached)
          - /wp-content/ (was WordPress, migrated)
          Old robots.txt disallowed /internal/ and /debug/"
```

---

## Tools Reference (37 tools)

<details open>
<summary><b>DNS (6) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `dns_lookup` | Resolve A, AAAA, MX, TXT, NS, SOA, CNAME, SRV records |
| `dns_reverse` | Reverse DNS (PTR) lookup for an IP address |
| `dns_email_security` | SPF + DMARC + DKIM analysis with risk scoring and recommendations |
| `dns_spf_chain` | Recursive SPF include chain resolution with service detection |
| `dns_srv_discover` | SRV + CNAME service discovery (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Wildcard DNS detection via random subdomain probe |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `whois_domain` | RDAP domain lookup &mdash; registrar, dates, nameservers, contacts |
| `whois_ip` | RDAP IP lookup &mdash; network name, CIDR, country, entities |

</details>

<details>
<summary><b>Certificate Transparency (1) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `crtsh_search` | Search CT logs via crt.sh &mdash; subdomain discovery + certificate details |

</details>

<details>
<summary><b>Shodan (4) &mdash; Requires SHODAN_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `shodan_host` | IP details: open ports, services, banners, vulnerabilities, OS, ASN |
| `shodan_search` | Search Shodan query language (e.g. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Bulk hostname-to-IP resolution via Shodan |
| `shodan_exploits` | Search public exploit database (PoC, Metasploit modules) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Requires VT_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `vt_domain` | Domain reputation, detection stats, categories, DNS records |
| `vt_ip` | IP reputation, detection stats, ASN, network |
| `vt_subdomains` | Subdomain enumeration via VirusTotal |
| `vt_url` | URL scan + malware/phishing analysis |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Requires ST_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `st_subdomains` | Subdomain enumeration (returns FQDNs) |
| `st_dns_history` | Historical DNS records with first/last seen dates |
| `st_whois` | Enhanced WHOIS with registrant/admin/technical contacts |

</details>

<details>
<summary><b>Censys (3) &mdash; Requires CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Tool | Description |
|------|-------------|
| `censys_hosts` | Host search &mdash; IPs, services, ports, location, ASN |
| `censys_host_details` | Single host full details with all services |
| `censys_certificates` | Certificate search by domain, fingerprint, issuer |

</details>

<details>
<summary><b>GeoIP (2) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `geoip_lookup` | IP geolocation: country, city, ISP, ASN, proxy/hosting/VPN detection |
| `geoip_batch` | Batch IP geolocation (up to 100 IPs at once) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `bgp_asn` | ASN details + all announced IPv4/IPv6 prefixes |
| `bgp_ip` | IP prefix/ASN routing lookup with RIR allocation |
| `bgp_prefix` | Prefix details + announcing ASNs |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `wayback_urls` | Archived URL discovery &mdash; find old endpoints, hidden paths, removed content |
| `wayback_snapshots` | Snapshot history with timestamps and direct archive links |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `hackertarget_hostsearch` | Host/subdomain discovery with resolved IPs |
| `hackertarget_reverseip` | Reverse IP lookup &mdash; find all domains on an IP |
| `hackertarget_aslookup` | ASN information lookup |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `m365_tenant` | Discover M365 tenant ID, region, and OpenID configuration |
| `m365_userrealm` | Detect auth type (Managed/Federated), federation brand, auth endpoints |

</details>

<details>
<summary><b>Meta (2) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `osint_list_sources` | List all OSINT sources, API key status, and tool counts |
| `osint_domain_recon` | Quick recon combining all free sources (DNS + WHOIS + crt.sh + HackerTarget + email security) |

</details>

---

## Data Sources (12)

| Source | Auth | Rate Limit | What it provides |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | None | None | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR records |
| [RDAP](https://rdap.org/) | None | 1 req/s | Domain & IP WHOIS data (registrar, dates, contacts, CIDR) |
| [crt.sh](https://crt.sh/) | None | 0.5 req/s | Certificate Transparency logs, subdomain discovery |
| [ip-api.com](http://ip-api.com/) | None | 45 req/min | IP geolocation, ISP, ASN, proxy/VPN/hosting detection |
| [BGPView](https://bgpview.io/) | None | 0.5 req/s | ASN details, announced prefixes, IP routing info |
| [HackerTarget](https://hackertarget.com/) | None | 2 req/s | Host search, reverse IP, ASN lookup (50/day free) |
| [Wayback Machine](https://web.archive.org/) | None | 1 req/s | Archived URLs, snapshot history, historical content |
| [Microsoft 365](https://login.microsoftonline.com/) | None | None | Tenant discovery, federation detection, auth type |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Internet-wide port/service/banner scanning |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Domain/IP/URL reputation, malware detection |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | DNS history, subdomain enumeration, enhanced WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Host search, certificate transparency, service discovery |

---

## Architecture

```
src/
├── index.ts                    Entry point, env config, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 tool definitions (Zod schemas)
│   └── mcp-server.ts           MCP server + stdio transport
├── dns/
│   └── index.ts                6 functions — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 functions — domain RDAP, IP RDAP
├── crtsh/
│   └── index.ts                CT log search with dedup + caching
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domain, IP, subdomains, URL scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS history, WHOIS
├── censys/
│   └── index.ts                Host search, host details, certificates
├── geoip/
│   └── index.ts                Single + batch IP geolocation
├── bgp/
│   └── index.ts                ASN, IP prefix, prefix details
├── wayback/
│   └── index.ts                URL search + snapshot history
├── hackertarget/
│   └── index.ts                Host search, reverse IP, ASN
├── m365/
│   └── index.ts                Tenant discovery, user realm/federation
├── meta/
│   ├── sources.ts              Source availability check
│   └── recon.ts                Combined free-source domain recon
└── utils/
    ├── rate-limiter.ts          Queue-based rate limiter
    ├── cache.ts                 Generic TTL cache
    └── require-key.ts           API key validation helper
```

**Design decisions:**

- **12 providers, 1 server** &mdash; Every OSINT source is an independent module. The agent picks which tools to use based on the query.
- **21 free tools** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget, and M365 work without any API keys. Premium sources are additive.
- **Parallel queries** &mdash; `osint_domain_recon` calls 8 sources via `Promise.allSettled`. If one source times out, the rest still return data.
- **Per-provider rate limiters** &mdash; Each data source has its own `RateLimiter` instance calibrated to that API's limits. No shared bottleneck.
- **TTL caching** &mdash; crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) results are cached to avoid redundant API calls during multi-tool workflows.
- **Graceful degradation** &mdash; Missing API keys don't crash the server. Tools return descriptive error messages: "Set SHODAN_API_KEY to enable Shodan tools."
- **SPF chain analysis** &mdash; Recursive include resolution with loop detection, service identification (Google Workspace, Microsoft 365, SendGrid, etc.), and RFC 7208 lookup limit checking.
- **2 dependencies** &mdash; `@modelcontextprotocol/sdk` and `zod`. All HTTP via native `fetch`. All DNS via `node:dns/promises`.

---

## Limitations

- Free-tier rate limits apply: HackerTarget (50/day), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh can be slow for large domains (30s timeout applied)
- ip-api.com requires HTTP (not HTTPS) for free tier
- Wayback Machine CDX API can timeout for very popular domains
- WHOIS via RDAP may not cover all TLDs (some registrars don't support RDAP yet)
- macOS / Linux tested (Windows not tested)

---

## Part of the MCP Security Suite

| Project | Domain | Tools |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browser-based security testing | 39 tools, Firefox, injection testing |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud security (AWS/Azure/GCP) | 38 tools, 60+ checks |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub security posture | 39 tools, 45 checks |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Vulnerability intelligence | 23 tools, 5 sources |
| **osint-mcp** | **OSINT & reconnaissance** | **37 tools, 12 sources** |

---

<p align="center">
<b>For authorized security testing and assessment only.</b><br>
Always ensure you have proper authorization before performing reconnaissance on any target.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Built with Bun + TypeScript
</p>
