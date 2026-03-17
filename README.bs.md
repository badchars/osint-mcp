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
  <strong>Bosanski</strong> |
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

<h3 align="center">OSINT i obavještajno izviđanje za AI agente.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; ujedinjeno u jedan MCP server.<br>
  Vaš AI agent dobija <b>potpuni OSINT spektar na zahtjev</b>, ne 12 tabova u pretraživaču i ručnu korelaciju.
</p>

<br>

<p align="center">
  <a href="#problem">Problem</a> &bull;
  <a href="#po-čemu-se-razlikuje">Po čemu se razlikuje</a> &bull;
  <a href="#brzi-start">Brzi start</a> &bull;
  <a href="#što-ai-može-raditi">Što AI može raditi</a> &bull;
  <a href="#pregled-alata-37-alata">Alati (37)</a> &bull;
  <a href="#izvori-podataka-12">Izvori podataka</a> &bull;
  <a href="#arhitektura">Arhitektura</a>
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

## Problem

Prikupljanje OSINT-a je prvi korak svakog penetracijskog testa, bug bounty programa i procjene prijetnji. Podaci koji su vam potrebni razasuti su po tucetu platformi &mdash; svaka sa svojim API-jem, svojom autentifikacijom, svojim ograničenjima brzine, svojim formatom izlaza. Danas otvarate Shodan u jednom tabu, VirusTotal u drugom, pokrećete `dig` u terminalu, kopirate-zalijepite iz WHOIS-a, prebacujete se na crt.sh za certifikate, a zatim provodite 30 minuta ručno korelirajući sve.

```
Tradicionalni OSINT tok rada:
  razriješiti DNS zapise           →  dig / nslookup CLI
  provjeriti WHOIS registraciju    →  whois CLI ili web alat
  enumerirati poddomene            →  crt.sh + SecurityTrails + VirusTotal (3 različita korisničка sučelja)
  skenirati otvorene portove       →  Shodan web sučelje
  provjeriti reputaciju domene     →  VirusTotal web sučelje
  mapirati IP infrastrukturu       →  Censys + BGP pretrage
  pronaći arhivirane stranice      →  Wayback Machine web UI
  provjeriti sigurnost e-pošte     →  ručne MX/SPF/DMARC pretrage
  korelirati sve                   →  kopiraj-zalijepi u tabelu
  ─────────────────────────────────
  Ukupno: 45+ minuta po meti, većina toga prebacivanje konteksta
```

**osint-mcp** daje vašem AI agentu 37 alata preko 12 izvora podataka putem [Model Context Protocol](https://modelcontextprotocol.io). Agent upituje sve izvore paralelno, korelira podatke, identificira rizike i predstavlja jedinstvenu obavještajnu sliku &mdash; u jednom razgovoru.

```
Sa osint-mcp:
  Vi: "Uradi potpuno izviđanje na target.com"

  Agent: → DNS: 4 A zapisa, 3 MX (Google Workspace), 2 NS
         → WHOIS: Registrovano 2019, ističe 2025, GoDaddy
         → crt.sh: 47 jedinstvenih poddomena iz CT logova
         → HackerTarget: 23 hosta sa IP adresama
         → E-pošta: SPF soft-fail (~all), DMARC p=none, nema DKIM
         → Shodan: 3 IP-a, 12 otvorenih portova, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Čista reputacija, 0 detekcija
         → "target.com ima 47 poddomena, slabu sigurnost e-pošte
            (SPF soft-fail, DMARC samo praćenje), i jedan IP
            koji pokreće Apache 2.4.49 sa poznatim path traversal CVE-om.
            Prioritet: zakrpati Apache, unaprijediti SPF na -all, postaviti DMARC na p=reject."
```

---

## Po čemu se razlikuje

Postojeći OSINT alati daju vam sirove podatke jedan izvor u isto vrijeme. osint-mcp daje vašem AI agentu mogućnost da **rasuđuje preko svih izvora istovremeno**.

<table>
<thead>
<tr>
<th></th>
<th>Tradicionalni OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Sučelje</b></td>
<td>12 različitih web UI-ja, CLI-jeva i API-ja</td>
<td>MCP &mdash; AI agent poziva alate kroz razgovor</td>
</tr>
<tr>
<td><b>Izvori podataka</b></td>
<td>Jedna platforma u isto vrijeme</td>
<td>12 izvora upitovano paralelno</td>
</tr>
<tr>
<td><b>Enumeracija poddomena</b></td>
<td>crt.sh ILI SecurityTrails ILI VirusTotal</td>
<td>Agent spaja sva tri + HackerTarget, deduplikuje</td>
</tr>
<tr>
<td><b>Korelacija</b></td>
<td>Ručno kopiraj-zalijepi između tabova</td>
<td>Agent unakrsno referencira: "Ovaj IP iz Shodana takođe se pojavljuje u Censysu sa isteklim certifikatom"</td>
</tr>
<tr>
<td><b>Sigurnost e-pošte</b></td>
<td>Odvojene SPF/DMARC/DKIM pretrage</td>
<td>Kombinovana analiza sa ocjenom rizika i preporukama koje se mogu primijeniti</td>
</tr>
<tr>
<td><b>Infrastruktura</b></td>
<td>GeoIP + BGP + WHOIS odvojeno</td>
<td>Agent mapira potpunu infrastrukturu: ASN, prefikse, geolokaciju, vlasništvo</td>
</tr>
<tr>
<td><b>API ključevi</b></td>
<td>Potrebni za skoro sve</td>
<td>21 alat radi besplatno, 16 više sa opcionalnim API ključevima</td>
</tr>
<tr>
<td><b>Postavljanje</b></td>
<td>Instaliraj svaki alat, upravljaj svakom konfiguracijom</td>
<td><code>npx osint-mcp</code> &mdash; jedna komanda, nula konfiguracije</td>
</tr>
</tbody>
</table>

---

## Brzi start

### Opcija 1: npx (bez instalacije)

```bash
npx osint-mcp
```

21 javni OSINT alat radi odmah. Nisu potrebni API ključevi.

### Opcija 2: Kloniraj

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Varijable okruženja (opciono)

```bash
# Premium OSINT izvori — sve opciono
export SHODAN_API_KEY=your-key           # Omogućava 4 Shodan alata
export VT_API_KEY=your-key               # Omogućava 4 VirusTotal alata
export ST_API_KEY=your-key               # Omogućava 3 SecurityTrails alata
export CENSYS_API_ID=your-id             # Omogućava 3 Censys alata
export CENSYS_API_SECRET=your-secret     # Potrebno sa CENSYS_API_ID
```

Svi premium API ključevi su opcioni. Bez njih, i dalje dobijate 21 alat koji pokrivaju DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget i Microsoft 365 otkrivanje zakupaca.

### Povežite se sa vašim AI agentom

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Sa npx
claude mcp add osint-mcp -- npx osint-mcp

# Sa lokalnim klonom
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Dodajte u `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / drugi MCP klijenti</b></summary>

Isti JSON format konfiguracije. Usmjerite komandu na `npx osint-mcp` ili vašu lokalnu instalacijsku putanju.

</details>

### Započnite upite

```
Vi: "Što možeš pronaći o example.com?"
```

To je to. Agent automatski obrađuje DNS, WHOIS, poddomene, sigurnost e-pošte i više.

---

## Što AI može raditi

### Izviđanje domene

```
Vi: "Uradi potpuno izviđanje na target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: A zapisi pokazuju na 3 IP-a (AWS us-east-1)
       → WHOIS: Registrovano 2018 putem Namecheap, ističe 2026
       → crt.sh: 62 poddomene otkrivene
       → HackerTarget: 31 host sa razriješenim IP-ovima
       → E-pošta: SPF hard-fail, DMARC p=reject, DKIM pronađen (selector1)
       → "target.com je dobro konfigurisan za sigurnost e-pošte.
          62 poddomene pronađene — značajne: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastruktura je na AWS (us-east-1)."
```

### Mapiranje napadne površine

```
Vi: "Mapiraj napadnu površinu za 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Otvoreni portovi: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy na 8080
          Reverse DNS: web1.target.com
          3 poznata CVE-a označena od strane Shodana"
```

### Enumeracija poddomena (Više izvora)

```
Vi: "Pronađi sve poddomene od target.com koristeći sve dostupne izvore"

Agent: → crtsh_search {domain: "target.com"}              → 62 poddomene
       → st_subdomains {domain: "target.com"}              → 84 poddomene
       → vt_subdomains {domain: "target.com"}              → 41 poddomena
       → hackertarget_hostsearch {domain: "target.com"}    → 31 host
       → dns_wildcard_check {domain: "target.com"}         → Nema wildcard
       → "127 jedinstvenih poddomena nakon dedup preko 4 izvora.
          Značajni nalazi: staging.target.com, dev-api.target.com,
          jenkins.target.com (rizik izloženosti CI/CD),
          old-admin.target.com (potencijalni zastarjeli sistem)"
```

### Audit sigurnosti e-pošte

```
Vi: "Analiziraj sigurnosnu poziciju e-pošte od target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Sigurnost e-pošte: VISOK RIZIK
          SPF: ~all (soft fail — može se lažirati)
          DMARC: p=none (samo praćenje — ne provodi se)
          DKIM: Pronađen za selector1 (2048-bit, dobro)
          SPF lanac: 7 includes, 2 servisa (Google Workspace, SendGrid)
          M365: Nije Microsoft zakupac
          Preporuke:
          1. Unaprijedi SPF sa ~all na -all
          2. Promijeni DMARC sa p=none na p=quarantine, zatim p=reject
          3. Dodaj rua= u DMARC za zbirna izvještaja"
```

### Historijske informacije

```
Vi: "Što je target.com pokretao prije 3 godine?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS historija: target.com se preselio sa 198.51.100.1 (DigitalOcean)
          na 203.0.113.50 (AWS) 2023.
          Wayback pronašao 342 jedinstvena URL-a uključujući:
          - /admin/ (uklonjen 2024, bio dostupan)
          - /api/v1/docs (Swagger UI, još uvijek keširano)
          - /wp-content/ (bio WordPress, migriran)
          Stari robots.txt zabranjivao /internal/ i /debug/"
```

---

## Pregled alata (37 alata)

<details open>
<summary><b>DNS (6) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `dns_lookup` | Razriješi A, AAAA, MX, TXT, NS, SOA, CNAME, SRV zapise |
| `dns_reverse` | Reverse DNS (PTR) pretraga za IP adresu |
| `dns_email_security` | SPF + DMARC + DKIM analiza sa ocjenom rizika i preporukama |
| `dns_spf_chain` | Rekurzivno razrješavanje SPF include lanca sa detekcijom servisa |
| `dns_srv_discover` | SRV + CNAME otkrivanje servisa (Autodiscover, LDAP, SIP, Kerberos, itd.) |
| `dns_wildcard_check` | Detekcija wildcard DNS-a putem probe nasumične poddomene |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `whois_domain` | RDAP pretraga domene &mdash; registrar, datumi, nameserveri, kontakti |
| `whois_ip` | RDAP pretraga IP-a &mdash; ime mreže, CIDR, zemlja, entiteti |

</details>

<details>
<summary><b>Transparentnost certifikata (1) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `crtsh_search` | Pretraži CT logove putem crt.sh &mdash; otkrivanje poddomena + detalji certifikata |

</details>

<details>
<summary><b>Shodan (4) &mdash; Potreban SHODAN_API_KEY</b></summary>

| Alat | Opis |
|------|------|
| `shodan_host` | Detalji IP-a: otvoreni portovi, servisi, banneri, ranjivosti, OS, ASN |
| `shodan_search` | Pretraži Shodan jezik upita (npr. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Masovno razrješavanje hostname-u-IP putem Shodana |
| `shodan_exploits` | Pretraži javnu bazu exploit-a (PoC, Metasploit moduli) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Potreban VT_API_KEY</b></summary>

| Alat | Opis |
|------|------|
| `vt_domain` | Reputacija domene, statistike detekcije, kategorije, DNS zapisi |
| `vt_ip` | Reputacija IP-a, statistike detekcije, ASN, mreža |
| `vt_subdomains` | Enumeracija poddomena putem VirusTotal |
| `vt_url` | Skeniranje URL-a + analiza malware-a/phishing-a |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Potreban ST_API_KEY</b></summary>

| Alat | Opis |
|------|------|
| `st_subdomains` | Enumeracija poddomena (vraća FQDN-ove) |
| `st_dns_history` | Historijski DNS zapisi sa datumima prvog/posljednjeg viđanja |
| `st_whois` | Poboljšani WHOIS sa registrantom/admin/tehničkim kontaktima |

</details>

<details>
<summary><b>Censys (3) &mdash; Potreban CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Alat | Opis |
|------|------|
| `censys_hosts` | Pretraga hosta &mdash; IP-ovi, servisi, portovi, lokacija, ASN |
| `censys_host_details` | Potpuni detalji jednog hosta sa svim servisima |
| `censys_certificates` | Pretraga certifikata po domeni, fingerprint-u, izdavaču |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `geoip_lookup` | IP geolokacija: zemlja, grad, ISP, ASN, detekcija proxy/hosting/VPN |
| `geoip_batch` | Masovna IP geolokacija (do 100 IP-ova odjednom) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `bgp_asn` | ASN detalji + svi najavijeni IPv4/IPv6 prefiksi |
| `bgp_ip` | IP prefiks/ASN routing pretraga sa RIR alokacijom |
| `bgp_prefix` | Detalji prefiksa + najaviujući ASN-ovi |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `wayback_urls` | Otkrivanje arhiviranih URL-ova &mdash; pronađi stare endpointe, skrivene putanje, uklonjeni sadržaj |
| `wayback_snapshots` | Historija snapshot-a sa vremenskim oznakama i direktnim arhivskim linkovima |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `hackertarget_hostsearch` | Host/poddomena otkrivanje sa razriješenim IP-ovima |
| `hackertarget_reverseip` | Reverse IP pretraga &mdash; pronađi sve domene na IP-u |
| `hackertarget_aslookup` | ASN informacije pretraga |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `m365_tenant` | Otkrij M365 ID zakupca, regiju i OpenID konfiguraciju |
| `m365_userrealm` | Detektuj tip autentifikacije (Managed/Federated), federation brand, auth endpointe |

</details>

<details>
<summary><b>Meta (2) &mdash; Nije potreban API ključ</b></summary>

| Alat | Opis |
|------|------|
| `osint_list_sources` | Lista svih OSINT izvora, status API ključa i broj alata |
| `osint_domain_recon` | Brzo izviđanje koje kombinuje sve besplatne izvore (DNS + WHOIS + crt.sh + HackerTarget + sigurnost e-pošte) |

</details>

---

## Izvori podataka (12)

| Izvor | Autentifikacija | Ograničenje brzine | Što pruža |
|-------|-----------------|-------------------|-----------|
| [DNS](https://nodejs.org/api/dns.html) | Nema | Nema | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR zapisi |
| [RDAP](https://rdap.org/) | Nema | 1 zahtjev/s | Podaci domene i IP WHOIS (registrar, datumi, kontakti, CIDR) |
| [crt.sh](https://crt.sh/) | Nema | 0.5 zahtjev/s | Certificate Transparency logovi, otkrivanje poddomena |
| [ip-api.com](http://ip-api.com/) | Nema | 45 zahtjev/min | IP geolokacija, ISP, ASN, detekcija proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Nema | 0.5 zahtjev/s | ASN detalji, najavijeni prefiksi, info IP routing-a |
| [HackerTarget](https://hackertarget.com/) | Nema | 2 zahtjev/s | Pretraga hosta, reverse IP, ASN pretraga (50/dan besplatno) |
| [Wayback Machine](https://web.archive.org/) | Nema | 1 zahtjev/s | Arhivirani URL-ovi, historija snapshot-a, historijski sadržaj |
| [Microsoft 365](https://login.microsoftonline.com/) | Nema | Nema | Otkrivanje zakupca, detekcija federacije, tip autentifikacije |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 zahtjev/s | Skeniranje port/servis/banner širom Interneta |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 zahtjev/min | Reputacija domena/IP/URL, detekcija malware-a |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 zahtjev/s | DNS historija, enumeracija poddomena, poboljšani WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 zahtjev/s | Pretraga hosta, transparentnost certifikata, otkrivanje servisa |

---

## Arhitektura

```
src/
├── index.ts                    Ulazna tačka, env config, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 definicija alata (Zod šeme)
│   └── mcp-server.ts           MCP server + stdio transport
├── dns/
│   └── index.ts                6 funkcija — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 funkcije — domain RDAP, IP RDAP
├── crtsh/
│   └── index.ts                CT log pretraga sa dedup + caching
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

**Dizajnerske odluke:**

- **12 provajdera, 1 server** &mdash; Svaki OSINT izvor je nezavisan modul. Agent bira koje alate koristiti na osnovu upita.
- **21 besplatan alat** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget i M365 rade bez ikakvih API ključeva. Premium izvori su aditivni.
- **Paralelni upiti** &mdash; `osint_domain_recon` poziva 8 izvora putem `Promise.allSettled`. Ako jedan izvor istekne, ostali i dalje vraćaju podatke.
- **Ograničivači brzine po provajderu** &mdash; Svaki izvor podataka ima svoju `RateLimiter` instancu kalibriranu za ograničenja tog API-ja. Nema zajedničkog uskog grla.
- **TTL caching** &mdash; crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) rezultati se keširaju da bi se izbjegli redundantni API pozivi tokom multi-tool tokova rada.
- **Graciozna degradacija** &mdash; Nedostajući API ključevi ne ruše server. Alati vraćaju opisne poruke o greškama: "Postavite SHODAN_API_KEY da omogućite Shodan alate."
- **Analiza SPF lanca** &mdash; Rekurzivno razrješavanje include sa detekcijom petlje, identifikacijom servisa (Google Workspace, Microsoft 365, SendGrid, itd.) i provjerom RFC 7208 lookup limita.
- **2 zavisnosti** &mdash; `@modelcontextprotocol/sdk` i `zod`. Sav HTTP putem native `fetch`. Sav DNS putem `node:dns/promises`.

---

## Ograničenja

- Primjenjuju se besplatna ograničenja brzine: HackerTarget (50/dan), ip-api.com (45/min), VirusTotal zajednica (4/min)
- crt.sh može biti spor za velike domene (primijenjen timeout od 30s)
- ip-api.com zahtijeva HTTP (ne HTTPS) za besplatnu verziju
- Wayback Machine CDX API može isteći za veoma popularne domene
- WHOIS putem RDAP možda ne pokriva sve TLD-ove (neki registrari još ne podržavaju RDAP)
- macOS / Linux testirano (Windows nije testiran)

---

## Dio MCP Security Suite-a

| Projekat | Domena | Alati |
|----------|--------|-------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Testiranje sigurnosti baziranog na pretraživaču | 39 alata, Firefox, testiranje injekcija |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud sigurnost (AWS/Azure/GCP) | 38 alata, 60+ provjera |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub sigurnosna pozicija | 39 alata, 45 provjera |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Obavještavanje o ranjivostima | 23 alata, 5 izvora |
| **osint-mcp** | **OSINT i izviđanje** | **37 alata, 12 izvora** |

---

<p align="center">
<b>Samo za autorizovano testiranje i procjenu sigurnosti.</b><br>
Uvijek osigurajte da imate odgovarajuću autorizaciju prije izvođenja izviđanja na bilo kojoj meti.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Izgrađeno sa Bun + TypeScript
</p>
