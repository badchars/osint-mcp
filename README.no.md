<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <strong>Norsk</strong> |
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

<h3 align="center">OSINT og rekognoseringsdata for AI-agenter.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; forent i en enkelt MCP-server.<br>
  Din AI-agent får <b>fullspektrum OSINT på forespørsel</b>, ikke 12 nettleserfaner og manuell korrelering.
</p>

<br>

<p align="center">
  <a href="#problemet">Problemet</a> &bull;
  <a href="#hvordan-det-er-forskjellig">Hvordan Det Er Forskjellig</a> &bull;
  <a href="#hurtigstart">Hurtigstart</a> &bull;
  <a href="#hva-ai-en-kan-gjøre">Hva AI-en Kan Gjøre</a> &bull;
  <a href="#verktøyreferanse-37-verktøy">Verktøy (37)</a> &bull;
  <a href="#datakilder-12">Datakilder</a> &bull;
  <a href="#arkitektur">Arkitektur</a>
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

## Problemet

OSINT-innsamling er det første trinnet i enhver penetrasjonstest, bug bounty og trusselsvurdering. Dataene du trenger er spredt over dusinvis av plattformer &mdash; hver med sitt eget API, sin egen autentisering, sine egne hastighetsbegrensninger, sitt eget utdataformat. I dag åpner du Shodan i én fane, VirusTotal i en annen, kjører `dig` i en terminal, kopierer-limer fra WHOIS, bytter til crt.sh for sertifikater, og bruker deretter 30 minutter på manuelt å korrelere alt.

```
Tradisjonell OSINT-arbeidsflyt:
  løse DNS-oppføringer             →  dig / nslookup CLI
  sjekke WHOIS-registrering        →  whois CLI eller nettverktøy
  telle opp underdomener           →  crt.sh + SecurityTrails + VirusTotal (3 forskjellige grensesnitt)
  skanne for åpne porter/tjenester →  Shodan nettgrensesnitt
  sjekke domeneomdømme             →  VirusTotal nettgrensesnitt
  kartlegge IP-infrastruktur       →  Censys + BGP-oppslag
  finne arkiverte sider            →  Wayback Machine nettgrensesnitt
  sjekke e-postsikkerhet          →  manuelle MX/SPF/DMARC-oppslag
  korrelere alt                    →  kopier-lim inn i et regneark
  ─────────────────────────────────
  Totalt: 45+ minutter per mål, mesteparten av det å bytte kontekst
```

**osint-mcp** gir din AI-agent 37 verktøy på tvers av 12 datakilder via [Model Context Protocol](https://modelcontextprotocol.io). Agenten spør alle kilder parallelt, korrelerer data, identifiserer risikoer og presenterer et enhetlig etterretningsbilde &mdash; i én enkelt samtale.

```
Med osint-mcp:
  Du: "Gjør en fullstendig rekognosering på target.com"

  Agent: → DNS: 4 A-oppføringer, 3 MX (Google Workspace), 2 NS
         → WHOIS: Registrert 2019, utløper 2025, GoDaddy
         → crt.sh: 47 unike underdomener fra CT-logger
         → HackerTarget: 23 verter med IP-er
         → E-post: SPF soft-fail (~all), DMARC p=none, ingen DKIM
         → Shodan: 3 IP-er, 12 åpne porter, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Rent omdømme, 0 deteksjoner
         → "target.com har 47 underdomener, svak e-postsikkerhet
            (SPF soft-fail, DMARC kun overvåkning), og én IP
            som kjører Apache 2.4.49 med en kjent sårbarhet for sti-gjennomgang.
            Prioritet: patch Apache, oppgrader SPF til -all, sett DMARC til p=reject."
```

---

## Hvordan Det Er Forskjellig

Eksisterende OSINT-verktøy gir deg rådata én kilde om gangen. osint-mcp gir din AI-agent muligheten til å **resonnere på tvers av alle kilder samtidig**.

<table>
<thead>
<tr>
<th></th>
<th>Tradisjonell OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Grensesnitt</b></td>
<td>12 forskjellige nettgrensesnitt, CLI-er og API-er</td>
<td>MCP &mdash; AI-agent kaller verktøy i samtaleform</td>
</tr>
<tr>
<td><b>Datakilder</b></td>
<td>Én plattform om gangen</td>
<td>12 kilder spurt parallelt</td>
</tr>
<tr>
<td><b>Underdomene-opptelling</b></td>
<td>crt.sh ELLER SecurityTrails ELLER VirusTotal</td>
<td>Agent slår sammen alle tre + HackerTarget, dedupliserer</td>
</tr>
<tr>
<td><b>Korrelering</b></td>
<td>Manuell kopier-lim mellom faner</td>
<td>Agent kryssrefererer: "Denne IP-en fra Shodan vises også i Censys med utløpt sertifikat"</td>
</tr>
<tr>
<td><b>E-postsikkerhet</b></td>
<td>Separate SPF/DMARC/DKIM-oppslag</td>
<td>Kombinert analyse med risikoscore og handlingsrettede anbefalinger</td>
</tr>
<tr>
<td><b>Infrastruktur</b></td>
<td>GeoIP + BGP + WHOIS separat</td>
<td>Agent kartlegger full infrastruktur: ASN, prefikser, geolokasjon, eierskap</td>
</tr>
<tr>
<td><b>API-nøkler</b></td>
<td>Påkrevd for nesten alt</td>
<td>21 verktøy fungerer gratis, 16 til med valgfrie API-nøkler</td>
</tr>
<tr>
<td><b>Oppsett</b></td>
<td>Installer hvert verktøy, administrer hver konfigurasjon</td>
<td><code>npx osint-mcp</code> &mdash; én kommando, null konfigurasjon</td>
</tr>
</tbody>
</table>

---

## Hurtigstart

### Alternativ 1: npx (ingen installasjon)

```bash
npx osint-mcp
```

21 offentlige OSINT-verktøy fungerer umiddelbart. Ingen API-nøkler påkrevd.

### Alternativ 2: Klon

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Miljøvariabler (valgfritt)

```bash
# Premium OSINT-kilder — alle valgfrie
export SHODAN_API_KEY=your-key           # Aktiverer 4 Shodan-verktøy
export VT_API_KEY=your-key               # Aktiverer 4 VirusTotal-verktøy
export ST_API_KEY=your-key               # Aktiverer 3 SecurityTrails-verktøy
export CENSYS_API_ID=your-id             # Aktiverer 3 Censys-verktøy
export CENSYS_API_SECRET=your-secret     # Påkrevd med CENSYS_API_ID
```

Alle premium API-nøkler er valgfrie. Uten dem får du fortsatt 21 verktøy som dekker DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget og Microsoft 365 tenant-oppdagelse.

### Koble til din AI-agent

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

Legg til i `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

Samme JSON-konfigurasjonsformat. Pek kommandoen til `npx osint-mcp` eller din lokale installasjonsbane.

</details>

### Start spørring

```
Du: "Hva kan du finne om example.com?"
```

Det er det. Agenten håndterer DNS, WHOIS, underdomener, e-postsikkerhet og mer automatisk.

---

## Hva AI-en Kan Gjøre

### Domenekognosering

```
Du: "Gjør en fullstendig rekognosering på target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: A-oppføringer peker til 3 IP-er (AWS us-east-1)
       → WHOIS: Registrert 2018 via Namecheap, utløper 2026
       → crt.sh: 62 underdomener oppdaget
       → HackerTarget: 31 verter med løste IP-er
       → E-post: SPF hard-fail, DMARC p=reject, DKIM funnet (selector1)
       → "target.com er godt konfigurert for e-postsikkerhet.
          62 underdomener funnet — bemerkelsesverdig: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastruktur er på AWS (us-east-1)."
```

### Kartlegging av Angrepflate

```
Du: "Kartlegg angrepsflaten for 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Åpne porter: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy på 8080
          Omvendt DNS: web1.target.com
          3 kjente CVE-er flagget av Shodan"
```

### Underdomene-opptelling (Multi-kilde)

```
Du: "Finn alle underdomener av target.com ved å bruke alle tilgjengelige kilder"

Agent: → crtsh_search {domain: "target.com"}              → 62 underdomener
       → st_subdomains {domain: "target.com"}              → 84 underdomener
       → vt_subdomains {domain: "target.com"}              → 41 underdomener
       → hackertarget_hostsearch {domain: "target.com"}    → 31 verter
       → dns_wildcard_check {domain: "target.com"}         → Ingen wildcard
       → "127 unike underdomener etter dedup på tvers av 4 kilder.
          Bemerkelsesverdige funn: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD-eksponeringsrisiko),
          old-admin.target.com (potensielt legacy-system)"
```

### E-postsikkerhetsrevisjon

```
Du: "Analyser e-postsikkerhetsposituren til target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "E-postsikkerhet: HØY RISIKO
          SPF: ~all (soft fail — kan forfalskes)
          DMARC: p=none (kun overvåkning — håndhever ikke)
          DKIM: Funnet for selector1 (2048-bit, bra)
          SPF-kjede: 7 inkluderinger, 2 tjenester (Google Workspace, SendGrid)
          M365: Ikke en Microsoft-tenant
          Anbefalinger:
          1. Oppgrader SPF fra ~all til -all
          2. Endre DMARC fra p=none til p=quarantine, deretter p=reject
          3. Legg til rua= i DMARC for aggregert rapportering"
```

### Historisk Etterretning

```
Du: "Hva kjørte target.com for 3 år siden?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS-historikk: target.com flyttet fra 198.51.100.1 (DigitalOcean)
          til 203.0.113.50 (AWS) i 2023.
          Wayback fant 342 unike URL-er inkludert:
          - /admin/ (fjernet i 2024, var tilgjengelig)
          - /api/v1/docs (Swagger UI, fortsatt bufret)
          - /wp-content/ (var WordPress, migrert)
          Gammel robots.txt nektet /internal/ og /debug/"
```

---

## Verktøyreferanse (37 verktøy)

<details open>
<summary><b>DNS (6) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `dns_lookup` | Løs A, AAAA, MX, TXT, NS, SOA, CNAME, SRV-oppføringer |
| `dns_reverse` | Omvendt DNS (PTR)-oppslag for en IP-adresse |
| `dns_email_security` | SPF + DMARC + DKIM-analyse med risikoscoring og anbefalinger |
| `dns_spf_chain` | Rekursiv SPF include-kjederesolusjon med tjenestedeteksjon |
| `dns_srv_discover` | SRV + CNAME-tjenesteoppdagelse (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Wildcard DNS-deteksjon via tilfeldig underdomene-probe |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `whois_domain` | RDAP-domeneoppslag &mdash; registrar, datoer, navneservere, kontakter |
| `whois_ip` | RDAP IP-oppslag &mdash; nettverksnavn, CIDR, land, enheter |

</details>

<details>
<summary><b>Sertifikattransparens (1) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `crtsh_search` | Søk i CT-logger via crt.sh &mdash; underdomene-oppdagelse + sertifikatdetaljer |

</details>

<details>
<summary><b>Shodan (4) &mdash; Krever SHODAN_API_KEY</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `shodan_host` | IP-detaljer: åpne porter, tjenester, bannere, sårbarheter, OS, ASN |
| `shodan_search` | Søk i Shodan-spørrespråk (f.eks. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Massevertsnavn-til-IP-resolusjon via Shodan |
| `shodan_exploits` | Søk i offentlig exploit-database (PoC, Metasploit-moduler) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Krever VT_API_KEY</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `vt_domain` | Domeneomdømme, deteksjonsstatistikk, kategorier, DNS-oppføringer |
| `vt_ip` | IP-omdømme, deteksjonsstatistikk, ASN, nettverk |
| `vt_subdomains` | Underdomene-opptelling via VirusTotal |
| `vt_url` | URL-skanning + skadelig programvare/phishing-analyse |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Krever ST_API_KEY</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `st_subdomains` | Underdomene-opptelling (returnerer FQDN-er) |
| `st_dns_history` | Historiske DNS-oppføringer med først/sist sett-datoer |
| `st_whois` | Forbedret WHOIS med registrant/admin/tekniske kontakter |

</details>

<details>
<summary><b>Censys (3) &mdash; Krever CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `censys_hosts` | Vertssøk &mdash; IP-er, tjenester, porter, lokasjon, ASN |
| `censys_host_details` | Enkeltvert full detaljer med alle tjenester |
| `censys_certificates` | Sertifikatsøk etter domene, fingeravtrykk, utsteder |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `geoip_lookup` | IP-geolokasjon: land, by, ISP, ASN, proxy/hosting/VPN-deteksjon |
| `geoip_batch` | Batch IP-geolokasjon (opptil 100 IP-er om gangen) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `bgp_asn` | ASN-detaljer + alle annonserte IPv4/IPv6-prefikser |
| `bgp_ip` | IP-prefiks/ASN-rutingsoppslag med RIR-allokering |
| `bgp_prefix` | Prefiksdetaljer + annonserende ASN-er |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `wayback_urls` | Arkivert URL-oppdagelse &mdash; finn gamle endepunkter, skjulte stier, fjernet innhold |
| `wayback_snapshots` | Snapshot-historikk med tidsstempler og direkte arkivlenker |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `hackertarget_hostsearch` | Vert/underdomene-oppdagelse med løste IP-er |
| `hackertarget_reverseip` | Omvendt IP-oppslag &mdash; finn alle domener på en IP |
| `hackertarget_aslookup` | ASN-informasjonsoppslag |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `m365_tenant` | Oppdag M365-tenant-ID, region og OpenID-konfigurasjon |
| `m365_userrealm` | Detekter autentiseringstype (Managed/Federated), føderasjonsmerke, autentiserings-endepunkter |

</details>

<details>
<summary><b>Meta (2) &mdash; Ingen API-nøkkel</b></summary>

| Verktøy | Beskrivelse |
|------|-------------|
| `osint_list_sources` | List alle OSINT-kilder, API-nøkkelstatus og verktøyantall |
| `osint_domain_recon` | Rask rekognosering som kombinerer alle gratis kilder (DNS + WHOIS + crt.sh + HackerTarget + e-postsikkerhet) |

</details>

---

## Datakilder (12)

| Kilde | Autentisering | Hastighetsbegrensning | Hva den gir |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Ingen | Ingen | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR-oppføringer |
| [RDAP](https://rdap.org/) | Ingen | 1 req/s | Domene- og IP-WHOIS-data (registrar, datoer, kontakter, CIDR) |
| [crt.sh](https://crt.sh/) | Ingen | 0.5 req/s | Sertifikattransparens-logger, underdomene-oppdagelse |
| [ip-api.com](http://ip-api.com/) | Ingen | 45 req/min | IP-geolokasjon, ISP, ASN, proxy/VPN/hosting-deteksjon |
| [BGPView](https://bgpview.io/) | Ingen | 0.5 req/s | ASN-detaljer, annonserte prefikser, IP-rutingsinformasjon |
| [HackerTarget](https://hackertarget.com/) | Ingen | 2 req/s | Vertssøk, omvendt IP, ASN-oppslag (50/dag gratis) |
| [Wayback Machine](https://web.archive.org/) | Ingen | 1 req/s | Arkiverte URL-er, snapshot-historikk, historisk innhold |
| [Microsoft 365](https://login.microsoftonline.com/) | Ingen | Ingen | Tenant-oppdagelse, føderasjonsdeteksjon, autentiseringstype |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Internett-bred port/tjeneste/banner-skanning |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Domene/IP/URL-omdømme, deteksjon av skadelig programvare |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | DNS-historikk, underdomene-opptelling, forbedret WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Vertssøk, sertifikattransparens, tjenesteoppdagelse |

---

## Arkitektur

```
src/
├── index.ts                    Inngangspunkt, env-konfigurasjon, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 verktøydefinisjoner (Zod-skjemaer)
│   └── mcp-server.ts           MCP-server + stdio-transport
├── dns/
│   └── index.ts                6 funksjoner — oppslag, omvendt, e-post, SPF-kjede, SRV, wildcard
├── whois/
│   └── index.ts                2 funksjoner — domene RDAP, IP RDAP
├── crtsh/
│   └── index.ts                CT-loggsøk med dedup + caching
├── shodan/
│   └── index.ts                Vert, søk, DNS-resolusjon, exploits
├── virustotal/
│   └── index.ts                Domene, IP, underdomener, URL-skanning
├── securitytrails/
│   └── index.ts                Underdomener, DNS-historikk, WHOIS
├── censys/
│   └── index.ts                Vertssøk, vertsdetaljer, sertifikater
├── geoip/
│   └── index.ts                Enkelt + batch IP-geolokasjon
├── bgp/
│   └── index.ts                ASN, IP-prefiks, prefiksdetaljer
├── wayback/
│   └── index.ts                URL-søk + snapshot-historikk
├── hackertarget/
│   └── index.ts                Vertssøk, omvendt IP, ASN
├── m365/
│   └── index.ts                Tenant-oppdagelse, brukerrike/føderasjon
├── meta/
│   ├── sources.ts              Kilde-tilgjengelighetskontroll
│   └── recon.ts                Kombinert gratis-kilde-domenekognosering
└── utils/
    ├── rate-limiter.ts          Købasert hastighetsbegrenser
    ├── cache.ts                 Generisk TTL-cache
    └── require-key.ts           API-nøkkelvalideringshjelpeverktøy
```

**Designbeslutninger:**

- **12 leverandører, 1 server** &mdash; Hver OSINT-kilde er en uavhengig modul. Agenten velger hvilke verktøy som skal brukes basert på spørringen.
- **21 gratis verktøy** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget og M365 fungerer uten API-nøkler. Premium-kilder er additive.
- **Parallelle spørringer** &mdash; `osint_domain_recon` kaller 8 kilder via `Promise.allSettled`. Hvis én kilde får tidsavbrudd, returnerer resten fortsatt data.
- **Per-leverandør hastighetsbegrensere** &mdash; Hver datakilde har sin egen `RateLimiter`-instans kalibrert til API-ens grenser. Ingen delt flaskehals.
- **TTL-caching** &mdash; crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) resultater bufres for å unngå overflødige API-kall under flerverktøy-arbeidsflyter.
- **Yndefull degradering** &mdash; Manglende API-nøkler krasjer ikke serveren. Verktøy returnerer beskrivende feilmeldinger: "Sett SHODAN_API_KEY for å aktivere Shodan-verktøy."
- **SPF-kjedeanalyse** &mdash; Rekursiv include-resolusjon med loop-deteksjon, tjenesteidentifikasjon (Google Workspace, Microsoft 365, SendGrid, etc.), og RFC 7208 oppslags-grensekontroll.
- **2 avhengigheter** &mdash; `@modelcontextprotocol/sdk` og `zod`. All HTTP via native `fetch`. All DNS via `node:dns/promises`.

---

## Begrensninger

- Gratis-lag-hastighetsbegrensninger gjelder: HackerTarget (50/dag), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh kan være langsom for store domener (30s timeout anvendt)
- ip-api.com krever HTTP (ikke HTTPS) for gratis lag
- Wayback Machine CDX API kan få tidsavbrudd for svært populære domener
- WHOIS via RDAP dekker kanskje ikke alle TLD-er (noen registrarer støtter ikke RDAP ennå)
- macOS / Linux testet (Windows ikke testet)

---

## Del av MCP Security Suite

| Prosjekt | Domene | Verktøy |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Nettleserbasert sikkerhetstesting | 39 verktøy, Firefox, injeksjonstesting |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Skybasert sikkerhet (AWS/Azure/GCP) | 38 verktøy, 60+ kontroller |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub-sikkerhetsposisjon | 39 verktøy, 45 kontroller |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Sårbarhetsetterretning | 23 verktøy, 5 kilder |
| **osint-mcp** | **OSINT & rekognosering** | **37 verktøy, 12 kilder** |

---

<p align="center">
<b>Kun for autorisert sikkerhetstesting og vurdering.</b><br>
Forsikre deg alltid om at du har riktig autorisasjon før du utfører rekognosering på noe mål.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Bygget med Bun + TypeScript
</p>
