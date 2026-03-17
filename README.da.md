<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <strong>Dansk</strong> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.el.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.hi.md">हिन्दी</a>
</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">OSINT og rekognosceringsintelligens til AI-agenter.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; samlet i en enkelt MCP-server.<br>
  Din AI-agent får <b>fuldt spektrum OSINT efter behov</b>, ikke 12 browserfaner og manuel korrelation.
</p>

<br>

<p align="center">
  <a href="#problemet">Problemet</a> &bull;
  <a href="#hvordan-det-er-anderledes">Hvordan Det Er Anderledes</a> &bull;
  <a href="#hurtig-start">Hurtig Start</a> &bull;
  <a href="#hvad-ai-en-kan-gøre">Hvad AI'en Kan Gøre</a> &bull;
  <a href="#værktøjsreference-37-værktøjer">Værktøjer (37)</a> &bull;
  <a href="#datakilder-12">Datakilder</a> &bull;
  <a href="#arkitektur">Arkitektur</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/osint-mcp"><img src="https://img.shields.io/npm/v/osint-mcp.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-37-06b6d4" alt="37 Værktøjer">
  <img src="https://img.shields.io/badge/sources-12-0ea5e9" alt="12 Kilder">
  <img src="https://img.shields.io/badge/free%20tools-21-22c55e" alt="21 Gratis Værktøjer">
</p>

---

## Problemet

OSINT-indsamling er det første skridt i enhver penetrationstest, bug bounty og trusselsvurdering. De data, du har brug for, er spredt over et dusin platforme &mdash; hver med sin egen API, sin egen autentificering, sine egne hastighedsbegrænsninger, sit eget outputformat. I dag åbner du Shodan i én fane, VirusTotal i en anden, kører `dig` i en terminal, kopierer fra WHOIS, skifter til crt.sh for certifikater, og bruger derefter 30 minutter på manuelt at korrelere det hele.

```
Traditionel OSINT-arbejdsgang:
  opløs DNS-poster                →  dig / nslookup CLI
  tjek WHOIS-registrering         →  whois CLI eller webværktøj
  oplist underdomæner             →  crt.sh + SecurityTrails + VirusTotal (3 forskellige UI'er)
  scan for åbne porte/tjenester   →  Shodan webgrænseflade
  tjek domæneomdømme              →  VirusTotal webgrænseflade
  kortlæg IP-infrastruktur        →  Censys + BGP-opslag
  find arkiverede sider           →  Wayback Machine web UI
  tjek e-mailsikkerhed            →  manuelle MX/SPF/DMARC-opslag
  korrelér alt                    →  kopier-indsæt i et regneark
  ─────────────────────────────────
  Total: 45+ minutter pr. mål, det meste kontekstskift
```

**osint-mcp** giver din AI-agent 37 værktøjer på tværs af 12 datakilder via [Model Context Protocol](https://modelcontextprotocol.io). Agenten forespørger alle kilder parallelt, korrelerer data, identificerer risici og præsenterer et samlet efterretningsbillede &mdash; i en enkelt samtale.

```
Med osint-mcp:
  Du: "Lav en fuld rekognoscering på target.com"

  Agent: → DNS: 4 A-poster, 3 MX (Google Workspace), 2 NS
         → WHOIS: Registreret 2019, udløber 2025, GoDaddy
         → crt.sh: 47 unikke underdomæner fra CT-logs
         → HackerTarget: 23 værter med IP'er
         → E-mail: SPF soft-fail (~all), DMARC p=none, ingen DKIM
         → Shodan: 3 IP'er, 12 åbne porte, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Rent omdømme, 0 detektioner
         → "target.com har 47 underdomæner, svag e-mailsikkerhed
            (SPF soft-fail, DMARC kun overvågning), og én IP
            kører Apache 2.4.49 med en kendt path traversal CVE.
            Prioritet: patch Apache, opgrader SPF til -all, sæt DMARC til p=reject."
```

---

## Hvordan Det Er Anderledes

Eksisterende OSINT-værktøjer giver dig rå data én kilde ad gangen. osint-mcp giver din AI-agent evnen til at **ræsonnere på tværs af alle kilder samtidigt**.

<table>
<thead>
<tr>
<th></th>
<th>Traditionel OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Grænseflade</b></td>
<td>12 forskellige web-UI'er, CLI'er og API'er</td>
<td>MCP &mdash; AI-agent kalder værktøjer samtalebaseret</td>
</tr>
<tr>
<td><b>Datakilder</b></td>
<td>Én platform ad gangen</td>
<td>12 kilder forespurgt parallelt</td>
</tr>
<tr>
<td><b>Underdomæneoplistning</b></td>
<td>crt.sh ELLER SecurityTrails ELLER VirusTotal</td>
<td>Agent sammenlægger alle tre + HackerTarget, deduplikerer</td>
</tr>
<tr>
<td><b>Korrelation</b></td>
<td>Manuel kopier-indsæt mellem faner</td>
<td>Agent krydshenviser: "Denne IP fra Shodan vises også i Censys med udløbet certifikat"</td>
</tr>
<tr>
<td><b>E-mailsikkerhed</b></td>
<td>Separate SPF/DMARC/DKIM-opslag</td>
<td>Kombineret analyse med risikoscore og handlingsrettede anbefalinger</td>
</tr>
<tr>
<td><b>Infrastruktur</b></td>
<td>GeoIP + BGP + WHOIS separat</td>
<td>Agent kortlægger fuld infrastruktur: ASN, præfikser, geolokation, ejerskab</td>
</tr>
<tr>
<td><b>API-nøgler</b></td>
<td>Krævet til næsten alt</td>
<td>21 værktøjer virker gratis, 16 flere med valgfrie API-nøgler</td>
</tr>
<tr>
<td><b>Opsætning</b></td>
<td>Installer hvert værktøj, håndter hver konfiguration</td>
<td><code>npx osint-mcp</code> &mdash; én kommando, nul konfiguration</td>
</tr>
</tbody>
</table>

---

## Hurtig Start

### Mulighed 1: npx (ingen installation)

```bash
npx osint-mcp
```

21 offentlige OSINT-værktøjer virker med det samme. Ingen API-nøgler påkrævet.

### Mulighed 2: Klon

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Miljøvariabler (valgfrit)

```bash
# Premium OSINT-kilder — alle valgfrie
export SHODAN_API_KEY=your-key           # Aktiverer 4 Shodan-værktøjer
export VT_API_KEY=your-key               # Aktiverer 4 VirusTotal-værktøjer
export ST_API_KEY=your-key               # Aktiverer 3 SecurityTrails-værktøjer
export CENSYS_API_ID=your-id             # Aktiverer 3 Censys-værktøjer
export CENSYS_API_SECRET=your-secret     # Påkrævet sammen med CENSYS_API_ID
```

Alle premium API-nøgler er valgfrie. Uden dem får du stadig 21 værktøjer, der dækker DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget og Microsoft 365 tenant-opdagelse.

### Forbind til din AI-agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Med npx
claude mcp add osint-mcp -- npx osint-mcp

# Med lokal klon
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Tilføj til `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / andre MCP-klienter</b></summary>

Samme JSON-konfigurationsformat. Peg kommandoen til `npx osint-mcp` eller din lokale installationssti.

</details>

### Begynd at forespørge

```
Du: "Hvad kan du finde om example.com?"
```

Det er det. Agenten håndterer DNS, WHOIS, underdomæner, e-mailsikkerhed og mere automatisk.

---

## Hvad AI'en Kan Gøre

### Domænerekognoscering

```
Du: "Lav en fuld rekognoscering på target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: A-poster peger på 3 IP'er (AWS us-east-1)
       → WHOIS: Registreret 2018 via Namecheap, udløber 2026
       → crt.sh: 62 underdomæner opdaget
       → HackerTarget: 31 værter med opløste IP'er
       → E-mail: SPF hard-fail, DMARC p=reject, DKIM fundet (selector1)
       → "target.com er velkonfigureret til e-mailsikkerhed.
          62 underdomæner fundet — bemærkelsesværdige: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastruktur er på AWS (us-east-1)."
```

### Angrebsfladekortlægning

```
Du: "Kortlæg angrebsfladen for 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Åbne porte: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy på 8080
          Reverse DNS: web1.target.com
          3 kendte CVE'er markeret af Shodan"
```

### Underdomæneoplistning (Multi-Kilde)

```
Du: "Find alle underdomæner til target.com ved brug af alle tilgængelige kilder"

Agent: → crtsh_search {domain: "target.com"}              → 62 underdomæner
       → st_subdomains {domain: "target.com"}              → 84 underdomæner
       → vt_subdomains {domain: "target.com"}              → 41 underdomæner
       → hackertarget_hostsearch {domain: "target.com"}    → 31 værter
       → dns_wildcard_check {domain: "target.com"}         → Ingen wildcard
       → "127 unikke underdomæner efter dedup på tværs af 4 kilder.
          Bemærkelsesværdige fund: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD eksponeringsrisiko),
          old-admin.target.com (potentielt legacy-system)"
```

### E-mailsikkerhedsrevision

```
Du: "Analyser e-mailsikkerhedsstillingen for target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "E-mailsikkerhed: HØJ RISIKO
          SPF: ~all (soft fail — kan forfalskes)
          DMARC: p=none (kun overvågning — håndhæver ikke)
          DKIM: Fundet for selector1 (2048-bit, godt)
          SPF-kæde: 7 inkluderinger, 2 tjenester (Google Workspace, SendGrid)
          M365: Ikke en Microsoft-tenant
          Anbefalinger:
          1. Opgrader SPF fra ~all til -all
          2. Skift DMARC fra p=none til p=quarantine, derefter p=reject
          3. Tilføj rua= til DMARC for aggregeret rapportering"
```

### Historisk Efterretning

```
Du: "Hvad kørte target.com for 3 år siden?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS-historik: target.com flyttede fra 198.51.100.1 (DigitalOcean)
          til 203.0.113.50 (AWS) i 2023.
          Wayback fandt 342 unikke URL'er inklusive:
          - /admin/ (fjernet i 2024, var tilgængelig)
          - /api/v1/docs (Swagger UI, stadig cachet)
          - /wp-content/ (var WordPress, migreret)
          Gammel robots.txt forbød /internal/ og /debug/"
```

---

## Værktøjsreference (37 værktøjer)

<details open>
<summary><b>DNS (6) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `dns_lookup` | Opløs A, AAAA, MX, TXT, NS, SOA, CNAME, SRV-poster |
| `dns_reverse` | Reverse DNS (PTR) opslag for en IP-adresse |
| `dns_email_security` | SPF + DMARC + DKIM-analyse med risikoscoring og anbefalinger |
| `dns_spf_chain` | Rekursiv SPF-inkluderingskædeopløsning med tjenestedetektering |
| `dns_srv_discover` | SRV + CNAME-tjenesteopdagelse (Autodiscover, LDAP, SIP, Kerberos, osv.) |
| `dns_wildcard_check` | Wildcard DNS-detektering via tilfældig underdomænesonde |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `whois_domain` | RDAP-domæneopslag &mdash; registrator, datoer, navneservere, kontakter |
| `whois_ip` | RDAP IP-opslag &mdash; netværksnavn, CIDR, land, enheder |

</details>

<details>
<summary><b>Certifikattransparens (1) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `crtsh_search` | Søg CT-logs via crt.sh &mdash; underdomæneopdagelse + certifikatdetaljer |

</details>

<details>
<summary><b>Shodan (4) &mdash; Kræver SHODAN_API_KEY</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `shodan_host` | IP-detaljer: åbne porte, tjenester, bannere, sårbarheder, OS, ASN |
| `shodan_search` | Søg Shodan-forespørgselssprog (f.eks. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Bulk værtsnavn-til-IP-opløsning via Shodan |
| `shodan_exploits` | Søg offentlig exploit-database (PoC, Metasploit-moduler) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Kræver VT_API_KEY</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `vt_domain` | Domæneomdømme, detektionsstatistikker, kategorier, DNS-poster |
| `vt_ip` | IP-omdømme, detektionsstatistikker, ASN, netværk |
| `vt_subdomains` | Underdomæneoplistning via VirusTotal |
| `vt_url` | URL-scan + malware/phishing-analyse |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Kræver ST_API_KEY</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `st_subdomains` | Underdomæneoplistning (returnerer FQDN'er) |
| `st_dns_history` | Historiske DNS-poster med første/sidste set-datoer |
| `st_whois` | Udvidet WHOIS med registrant/admin/tekniske kontakter |

</details>

<details>
<summary><b>Censys (3) &mdash; Kræver CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `censys_hosts` | Værtssøgning &mdash; IP'er, tjenester, porte, placering, ASN |
| `censys_host_details` | Enkelt vært fulde detaljer med alle tjenester |
| `censys_certificates` | Certifikatsøgning efter domæne, fingeraftryk, udsteder |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `geoip_lookup` | IP-geolokation: land, by, ISP, ASN, proxy/hosting/VPN-detektering |
| `geoip_batch` | Batch IP-geolokation (op til 100 IP'er ad gangen) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `bgp_asn` | ASN-detaljer + alle annoncerede IPv4/IPv6-præfikser |
| `bgp_ip` | IP-præfiks/ASN-ruteopslag med RIR-allokering |
| `bgp_prefix` | Præfiksdetaljer + annoncerende ASN'er |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `wayback_urls` | Arkiveret URL-opdagelse &mdash; find gamle endpoints, skjulte stier, fjernet indhold |
| `wayback_snapshots` | Snapshot-historik med tidsstempler og direkte arkivlinks |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `hackertarget_hostsearch` | Vært/underdomæneopdagelse med opløste IP'er |
| `hackertarget_reverseip` | Reverse IP-opslag &mdash; find alle domæner på en IP |
| `hackertarget_aslookup` | ASN-informationsopslag |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `m365_tenant` | Opdag M365-tenant-ID, region og OpenID-konfiguration |
| `m365_userrealm` | Detekter auth-type (Managed/Federated), føderationsbrand, auth-endpoints |

</details>

<details>
<summary><b>Meta (2) &mdash; Ingen API-nøgle</b></summary>

| Værktøj | Beskrivelse |
|------|-------------|
| `osint_list_sources` | List alle OSINT-kilder, API-nøglestatus og værktøjsantal |
| `osint_domain_recon` | Hurtig rekognoscering der kombinerer alle gratis kilder (DNS + WHOIS + crt.sh + HackerTarget + e-mailsikkerhed) |

</details>

---

## Datakilder (12)

| Kilde | Auth | Hastighedsbegrænsning | Hvad den leverer |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Ingen | Ingen | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR-poster |
| [RDAP](https://rdap.org/) | Ingen | 1 req/s | Domæne & IP WHOIS-data (registrator, datoer, kontakter, CIDR) |
| [crt.sh](https://crt.sh/) | Ingen | 0.5 req/s | Certifikattransparens-logs, underdomæneopdagelse |
| [ip-api.com](http://ip-api.com/) | Ingen | 45 req/min | IP-geolokation, ISP, ASN, proxy/VPN/hosting-detektering |
| [BGPView](https://bgpview.io/) | Ingen | 0.5 req/s | ASN-detaljer, annoncerede præfikser, IP-ruteinfo |
| [HackerTarget](https://hackertarget.com/) | Ingen | 2 req/s | Værtssøgning, reverse IP, ASN-opslag (50/dag gratis) |
| [Wayback Machine](https://web.archive.org/) | Ingen | 1 req/s | Arkiverede URL'er, snapshot-historik, historisk indhold |
| [Microsoft 365](https://login.microsoftonline.com/) | Ingen | Ingen | Tenant-opdagelse, føderationsdetektering, auth-type |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Internet-dækkende port/tjeneste/banner-scanning |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Domæne/IP/URL-omdømme, malware-detektering |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | DNS-historik, underdomæneoplistning, udvidet WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Værtssøgning, certifikattransparens, tjenesteopdagelse |

---

## Arkitektur

```
src/
├── index.ts                    Indgangspunkt, env-konfiguration, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 værktøjsdefinitioner (Zod-skemaer)
│   └── mcp-server.ts           MCP-server + stdio-transport
├── dns/
│   └── index.ts                6 funktioner — opslag, reverse, e-mail, SPF-kæde, SRV, wildcard
├── whois/
│   └── index.ts                2 funktioner — domæne RDAP, IP RDAP
├── crtsh/
│   └── index.ts                CT-log-søgning med dedup + caching
├── shodan/
│   └── index.ts                Vært, søgning, DNS-opløsning, exploits
├── virustotal/
│   └── index.ts                Domæne, IP, underdomæner, URL-scan
├── securitytrails/
│   └── index.ts                Underdomæner, DNS-historik, WHOIS
├── censys/
│   └── index.ts                Værtssøgning, værtsdetaljer, certifikater
├── geoip/
│   └── index.ts                Enkelt + batch IP-geolokation
├── bgp/
│   └── index.ts                ASN, IP-præfiks, præfiksdetaljer
├── wayback/
│   └── index.ts                URL-søgning + snapshot-historik
├── hackertarget/
│   └── index.ts                Værtssøgning, reverse IP, ASN
├── m365/
│   └── index.ts                Tenant-opdagelse, bruger-realm/føderation
├── meta/
│   ├── sources.ts              Kildetilgængelighedstjek
│   └── recon.ts                Kombineret gratis-kilde-domænerekognoscering
└── utils/
    ├── rate-limiter.ts          Købaseret hastighedsbegrænser
    ├── cache.ts                 Generisk TTL-cache
    └── require-key.ts           API-nøglevalideringshjælper
```

**Designbeslutninger:**

- **12 udbydere, 1 server** &mdash; Hver OSINT-kilde er et uafhængigt modul. Agenten vælger hvilke værktøjer der skal bruges baseret på forespørgslen.
- **21 gratis værktøjer** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget og M365 virker uden nogen API-nøgler. Premium-kilder er additive.
- **Parallelle forespørgsler** &mdash; `osint_domain_recon` kalder 8 kilder via `Promise.allSettled`. Hvis én kilde får timeout, returnerer resten stadig data.
- **Per-udbyder hastighedsbegrænsere** &mdash; Hver datakilde har sin egen `RateLimiter`-instans kalibreret til den pågældende API's begrænsninger. Ingen delt flaskehals.
- **TTL-caching** &mdash; crt.sh (15 min), BGP (30 min), Shodan (5 min), VirusTotal (10 min) resultater caches for at undgå overflødige API-kald under multi-værktøjs-arbejdsgange.
- **Graceful degradation** &mdash; Manglende API-nøgler får ikke serveren til at crashe. Værktøjer returnerer beskrivende fejlmeddelelser: "Sæt SHODAN_API_KEY for at aktivere Shodan-værktøjer."
- **SPF-kædeanalyse** &mdash; Rekursiv inkluderingsopløsning med loop-detektering, tjenesteidentifikation (Google Workspace, Microsoft 365, SendGrid, osv.) og RFC 7208 opslags-limit-tjek.
- **2 afhængigheder** &mdash; `@modelcontextprotocol/sdk` og `zod`. Al HTTP via native `fetch`. Al DNS via `node:dns/promises`.

---

## Begrænsninger

- Gratis-tier hastighedsbegrænsninger gælder: HackerTarget (50/dag), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh kan være langsom for store domæner (30s timeout anvendt)
- ip-api.com kræver HTTP (ikke HTTPS) til gratis tier
- Wayback Machine CDX API kan få timeout for meget populære domæner
- WHOIS via RDAP dækker muligvis ikke alle TLD'er (nogle registratorer understøtter ikke RDAP endnu)
- macOS / Linux testet (Windows ikke testet)

---

## Del af MCP Security Suite

| Projekt | Domæne | Værktøjer |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browserbaseret sikkerhedstest | 39 værktøjer, Firefox, injektionstest |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud-sikkerhed (AWS/Azure/GCP) | 38 værktøjer, 60+ tjek |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub-sikkerhedsstilling | 39 værktøjer, 45 tjek |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Sårbarhedsintelligens | 23 værktøjer, 5 kilder |
| **osint-mcp** | **OSINT & rekognoscering** | **37 værktøjer, 12 kilder** |

---

<p align="center">
<b>Kun til autoriseret sikkerhedstest og vurdering.</b><br>
Sørg altid for, at du har korrekt autorisation, før du udfører rekognoscering på et mål.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Bygget med Bun + TypeScript
</p>
