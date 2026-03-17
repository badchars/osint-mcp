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
  <strong>Polski</strong> |
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

<h3 align="center">Wywiad OSINT i rekonesans dla agentów AI.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; zjednoczone w jeden serwer MCP.<br>
  Twój agent AI otrzymuje <b>pełnozakresowy OSINT na żądanie</b>, a nie 12 zakładek przeglądarki i ręczną korelację.
</p>

<br>

<p align="center">
  <a href="#problem">Problem</a> &bull;
  <a href="#czym-się-różni">Czym się różni</a> &bull;
  <a href="#szybki-start">Szybki start</a> &bull;
  <a href="#co-może-ai">Co może AI</a> &bull;
  <a href="#narzędzia-37-narzędzi">Narzędzia (37)</a> &bull;
  <a href="#źródła-danych-12">Źródła danych</a> &bull;
  <a href="#architektura">Architektura</a>
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

Zbieranie informacji OSINT to pierwszy krok każdego testu penetracyjnego, bug bounty i oceny zagrożeń. Dane, których potrzebujesz, są rozproszone po kilkunastu platformach &mdash; każda ma własne API, własną autoryzację, własne limity zapytań, własny format wyjściowy. Dzisiaj otwierasz Shodan w jednej zakładce, VirusTotal w drugiej, uruchamiasz `dig` w terminalu, kopiujesz z WHOIS, przechodzisz do crt.sh po certyfikaty, a następnie spędzasz 30 minut ręcznie korelując wszystko.

```
Tradycyjny przepływ pracy OSINT:
  rozwiąż rekordy DNS               →  dig / nslookup CLI
  sprawdź rejestrację WHOIS         →  whois CLI lub narzędzie webowe
  wylicz subdomeny                  →  crt.sh + SecurityTrails + VirusTotal (3 różne UI)
  skanuj otwarte porty/usługi       →  interfejs webowy Shodan
  sprawdź reputację domeny          →  interfejs webowy VirusTotal
  zmapuj infrastrukturę IP          →  Censys + wyszukiwania BGP
  znajdź zarchiwizowane strony      →  interfejs webowy Wayback Machine
  sprawdź bezpieczeństwo email      →  ręczne wyszukiwania MX/SPF/DMARC
  skoreluj wszystko                 →  kopiuj-wklej do arkusza kalkulacyjnego
  ─────────────────────────────────────
  Razem: 45+ minut na cel, większość to przełączanie kontekstów
```

**osint-mcp** daje twojemu agentowi AI 37 narzędzi z 12 źródeł danych przez [Model Context Protocol](https://modelcontextprotocol.io). Agent odpytuje wszystkie źródła równolegle, koreluje dane, identyfikuje zagrożenia i przedstawia zunifikowany obraz wywiadu &mdash; w jednej rozmowie.

```
Z osint-mcp:
  Ty: "Zrób pełny rekonesans target.com"

  Agent: → DNS: 4 rekordy A, 3 MX (Google Workspace), 2 NS
         → WHOIS: Zarejestrowane 2019, wygasa 2025, GoDaddy
         → crt.sh: 47 unikalnych subdomen z logów CT
         → HackerTarget: 23 hosty z IP
         → Email: SPF soft-fail (~all), DMARC p=none, brak DKIM
         → Shodan: 3 IP, 12 otwartych portów, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Czysta reputacja, 0 detekcji
         → "target.com ma 47 subdomen, słabe zabezpieczenie email
            (SPF soft-fail, DMARC tylko monitoring), i jedno IP
            z Apache 2.4.49 ze znanym CVE path traversal.
            Priorytet: załataj Apache, ulepsz SPF do -all, ustaw DMARC na p=reject."
```

---

## Czym się różni

Istniejące narzędzia OSINT dają surowe dane z jednego źródła na raz. osint-mcp daje twojemu agentowi AI możliwość **rozumowania na wszystkich źródłach jednocześnie**.

<table>
<thead>
<tr>
<th></th>
<th>Tradycyjny OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interfejs</b></td>
<td>12 różnych webowych UI, CLI i API</td>
<td>MCP &mdash; agent AI wywołuje narzędzia konwersacyjnie</td>
</tr>
<tr>
<td><b>Źródła danych</b></td>
<td>Jedna platforma na raz</td>
<td>12 źródeł odpytywanych równolegle</td>
</tr>
<tr>
<td><b>Wyliczenie subdomen</b></td>
<td>crt.sh LUB SecurityTrails LUB VirusTotal</td>
<td>Agent łączy wszystkie trzy + HackerTarget, deduplikuje</td>
</tr>
<tr>
<td><b>Korelacja</b></td>
<td>Ręczne kopiowanie-wklejanie między zakładkami</td>
<td>Agent krzyżowo odnosi: "To IP z Shodan pojawia się też w Censys z wygasłym certyfikatem"</td>
</tr>
<tr>
<td><b>Bezpieczeństwo email</b></td>
<td>Oddzielne wyszukiwania SPF/DMARC/DKIM</td>
<td>Połączona analiza z oceną ryzyka i praktycznymi rekomendacjami</td>
</tr>
<tr>
<td><b>Infrastruktura</b></td>
<td>GeoIP + BGP + WHOIS oddzielnie</td>
<td>Agent mapuje pełną infrastrukturę: ASN, prefiksy, geolokalizację, własność</td>
</tr>
<tr>
<td><b>Klucze API</b></td>
<td>Wymagane prawie wszędzie</td>
<td>21 narzędzi działa za darmo, 16 więcej z opcjonalnymi kluczami API</td>
</tr>
<tr>
<td><b>Konfiguracja</b></td>
<td>Zainstaluj każde narzędzie, zarządzaj każdą konfiguracją</td>
<td><code>npx osint-mcp</code> &mdash; jedna komenda, zerowa konfiguracja</td>
</tr>
</tbody>
</table>

---

## Szybki start

### Opcja 1: npx (bez instalacji)

```bash
npx osint-mcp
```

21 publicznych narzędzi OSINT działa od razu. Nie są wymagane klucze API.

### Opcja 2: Klonowanie

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Zmienne środowiskowe (opcjonalne)

```bash
# Źródła premium OSINT — wszystkie opcjonalne
export SHODAN_API_KEY=twoj-klucz           # Aktywuje 4 narzędzia Shodan
export VT_API_KEY=twoj-klucz               # Aktywuje 4 narzędzia VirusTotal
export ST_API_KEY=twoj-klucz               # Aktywuje 3 narzędzia SecurityTrails
export CENSYS_API_ID=twoj-id               # Aktywuje 3 narzędzia Censys
export CENSYS_API_SECRET=twoj-sekret       # Wymagane z CENSYS_API_ID
```

Wszystkie klucze API premium są opcjonalne. Bez nich nadal masz 21 narzędzi obejmujących DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget i wykrywanie dzierżawy Microsoft 365.

### Połącz z agentem AI

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Z npx
claude mcp add osint-mcp -- npx osint-mcp

# Z lokalnego klonu
claude mcp add osint-mcp -- bun run /sciezka/do/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Dodaj do `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "osint": {
      "command": "npx",
      "args": ["-y", "osint-mcp"],
      "env": {
        "SHODAN_API_KEY": "opcjonalne",
        "VT_API_KEY": "opcjonalne",
        "ST_API_KEY": "opcjonalne",
        "CENSYS_API_ID": "opcjonalne",
        "CENSYS_API_SECRET": "opcjonalne"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Cursor / Windsurf / inne klienty MCP</b></summary>

Taki sam format konfiguracji JSON. Wskaż komendę na `npx osint-mcp` lub ścieżkę lokalnej instalacji.

</details>

### Zacznij zapytywać

```
Ty: "Co możesz znaleźć o example.com?"
```

To wszystko. Agent obsługuje DNS, WHOIS, subdomeny, bezpieczeństwo email i więcej automatycznie.

---

## Co może AI

### Rekonesans domeny

```
Ty: "Zrób pełny rekonesans target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: Rekordy A wskazują na 3 IP (AWS us-east-1)
       → WHOIS: Zarejestrowane 2018 przez Namecheap, wygasa 2026
       → crt.sh: 62 odkryte subdomeny
       → HackerTarget: 31 hostów z rozwiązanymi IP
       → Email: SPF hard-fail, DMARC p=reject, DKIM znaleziony (selector1)
       → "target.com jest dobrze skonfigurowany pod kątem bezpieczeństwa email.
          Znaleziono 62 subdomeny — godne uwagi: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastruktura jest na AWS (us-east-1)."
```

### Mapowanie powierzchni ataku

```
Ty: "Zmapuj powierzchnię ataku dla 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Otwarte porty: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy na 8080
          Reverse DNS: web1.target.com
          3 znane CVE oflagowane przez Shodan"
```

### Wyliczanie subdomen (wieloźródłowe)

```
Ty: "Znajdź wszystkie subdomeny target.com używając każdego dostępnego źródła"

Agent: → crtsh_search {domain: "target.com"}              → 62 subdomeny
       → st_subdomains {domain: "target.com"}              → 84 subdomeny
       → vt_subdomains {domain: "target.com"}              → 41 subdomen
       → hackertarget_hostsearch {domain: "target.com"}    → 31 hostów
       → dns_wildcard_check {domain: "target.com"}         → Brak wildcard
       → "127 unikalnych subdomen po deduplikacji z 4 źródeł.
          Godne uwagi: staging.target.com, dev-api.target.com,
          jenkins.target.com (ryzyko eksponowania CI/CD),
          old-admin.target.com (potencjalny legacy system)"
```

### Audyt bezpieczeństwa email

```
Ty: "Przeanalizuj postawę bezpieczeństwa email target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Bezpieczeństwo Email: WYSOKIE RYZYKO
          SPF: ~all (soft fail — możliwy do spoofingu)
          DMARC: p=none (tylko monitoring — nie wymusza)
          DKIM: Znaleziony dla selector1 (2048-bit, dobry)
          Łańcuch SPF: 7 includes, 2 usługi (Google Workspace, SendGrid)
          M365: Nie jest dzierżawą Microsoft
          Rekomendacje:
          1. Ulepsz SPF z ~all do -all
          2. Zmień DMARC z p=none na p=quarantine, potem p=reject
          3. Dodaj rua= do DMARC dla raportowania zbiorczego"
```

### Wywiad historyczny

```
Ty: "Co działało na target.com 3 lata temu?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "Historia DNS: target.com przeniósł się z 198.51.100.1 (DigitalOcean)
          na 203.0.113.50 (AWS) w 2023.
          Wayback znalazł 342 unikalne URL-e w tym:
          - /admin/ (usunięty w 2024, był dostępny)
          - /api/v1/docs (Swagger UI, nadal w cache)
          - /wp-content/ (był WordPress, zmigrowano)
          Stary robots.txt zabraniał /internal/ i /debug/"
```

---

## Narzędzia (37 narzędzi)

<details open>
<summary><b>DNS (6) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `dns_lookup` | Rozwiąż rekordy A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Reverse DNS (PTR) lookup dla adresu IP |
| `dns_email_security` | Analiza SPF + DMARC + DKIM z oceną ryzyka i rekomendacjami |
| `dns_spf_chain` | Rekursywne rozwiązywanie łańcucha SPF include z detekcją usług |
| `dns_srv_discover` | Wykrywanie usług SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, itp.) |
| `dns_wildcard_check` | Detekcja wildcard DNS przez probe losowej subdomeny |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `whois_domain` | RDAP domain lookup &mdash; rejestrator, daty, serwery nazw, kontakty |
| `whois_ip` | RDAP IP lookup &mdash; nazwa sieci, CIDR, kraj, encje |

</details>

<details>
<summary><b>Przejrzystość certyfikatów (1) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `crtsh_search` | Wyszukiwanie logów CT przez crt.sh &mdash; odkrywanie subdomen + szczegóły certyfikatów |

</details>

<details>
<summary><b>Shodan (4) &mdash; Wymaga SHODAN_API_KEY</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `shodan_host` | Szczegóły IP: otwarte porty, usługi, banery, podatności, OS, ASN |
| `shodan_search` | Wyszukiwanie języka zapytań Shodan (np. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Masowe rozwiązywanie hostname-na-IP przez Shodan |
| `shodan_exploits` | Wyszukiwanie publicznej bazy exploitów (PoC, moduły Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Wymaga VT_API_KEY</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `vt_domain` | Reputacja domeny, statystyki detekcji, kategorie, rekordy DNS |
| `vt_ip` | Reputacja IP, statystyki detekcji, ASN, sieć |
| `vt_subdomains` | Wyliczanie subdomen przez VirusTotal |
| `vt_url` | Skanowanie URL + analiza malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Wymaga ST_API_KEY</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `st_subdomains` | Wyliczanie subdomen (zwraca FQDN) |
| `st_dns_history` | Historyczne rekordy DNS z datami pierwszego/ostatniego wykrycia |
| `st_whois` | Rozszerzony WHOIS z kontaktami rejestrującego/administratora/technicznymi |

</details>

<details>
<summary><b>Censys (3) &mdash; Wymaga CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `censys_hosts` | Wyszukiwanie hostów &mdash; IP, usługi, porty, lokalizacja, ASN |
| `censys_host_details` | Pełne szczegóły pojedynczego hosta ze wszystkimi usługami |
| `censys_certificates` | Wyszukiwanie certyfikatów po domenie, odcisku, wystawcy |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `geoip_lookup` | Geolokalizacja IP: kraj, miasto, ISP, ASN, detekcja proxy/hosting/VPN |
| `geoip_batch` | Geolokalizacja zbiorcza IP (do 100 IP naraz) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `bgp_asn` | Szczegóły ASN + wszystkie ogłoszone prefiksy IPv4/IPv6 |
| `bgp_ip` | Lookup routingu prefiksu/ASN IP z alokacją RIR |
| `bgp_prefix` | Szczegóły prefiksu + ogłaszające ASN |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `wayback_urls` | Odkrywanie zarchiwizowanych URL &mdash; znajdź stare endpointy, ukryte ścieżki, usunięte treści |
| `wayback_snapshots` | Historia snapshotów z timestampami i bezpośrednimi linkami do archiwum |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `hackertarget_hostsearch` | Odkrywanie hostów/subdomen z rozwiązanymi IP |
| `hackertarget_reverseip` | Reverse IP lookup &mdash; znajdź wszystkie domeny na IP |
| `hackertarget_aslookup` | Lookup informacji ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `m365_tenant` | Odkryj ID dzierżawy M365, region i konfigurację OpenID |
| `m365_userrealm` | Wykryj typ auth (Managed/Federated), brand federacji, endpointy auth |

</details>

<details>
<summary><b>Meta (2) &mdash; Bez klucza API</b></summary>

| Narzędzie | Opis |
|------|-------------|
| `osint_list_sources` | Lista wszystkich źródeł OSINT, status klucza API i liczby narzędzi |
| `osint_domain_recon` | Szybki rekonesans łączący wszystkie darmowe źródła (DNS + WHOIS + crt.sh + HackerTarget + bezpieczeństwo email) |

</details>

---

## Źródła danych (12)

| Źródło | Autoryzacja | Limit zapytań | Co dostarcza |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Brak | Brak | Rekordy A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Brak | 1 zap/s | Dane WHOIS dla domen i IP (rejestrator, daty, kontakty, CIDR) |
| [crt.sh](https://crt.sh/) | Brak | 0.5 zap/s | Logi przejrzystości certyfikatów, odkrywanie subdomen |
| [ip-api.com](http://ip-api.com/) | Brak | 45 zap/min | Geolokalizacja IP, ISP, ASN, detekcja proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Brak | 0.5 zap/s | Szczegóły ASN, ogłoszone prefiksy, info routingu IP |
| [HackerTarget](https://hackertarget.com/) | Brak | 2 zap/s | Wyszukiwanie hostów, reverse IP, lookup ASN (50/dzień darmowo) |
| [Wayback Machine](https://web.archive.org/) | Brak | 1 zap/s | Zarchiwizowane URL, historia snapshotów, historyczne treści |
| [Microsoft 365](https://login.microsoftonline.com/) | Brak | Brak | Odkrywanie dzierżawy, detekcja federacji, typ auth |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 zap/s | Skanowanie portów/usług/banerów w całym internecie |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 zap/min | Reputacja domeny/IP/URL, detekcja malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 zap/s | Historia DNS, wyliczanie subdomen, rozszerzony WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 zap/s | Wyszukiwanie hostów, przejrzystość certyfikatów, odkrywanie usług |

---

## Architektura

```
src/
├── index.ts                    Punkt wejścia, konfiguracja env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 definicji narzędzi (schematy Zod)
│   └── mcp-server.ts           Serwer MCP + transport stdio
├── dns/
│   └── index.ts                6 funkcji — lookup, reverse, email, łańcuch SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 funkcje — domena RDAP, IP RDAP
├── crtsh/
│   └── index.ts                Wyszukiwanie logów CT z deduplikacją + cachowaniem
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domena, IP, subdomeny, skanowanie URL
├── securitytrails/
│   └── index.ts                Subdomeny, historia DNS, WHOIS
├── censys/
│   └── index.ts                Wyszukiwanie hostów, szczegóły hosta, certyfikaty
├── geoip/
│   └── index.ts                Pojedyncza + zbiorcza geolokalizacja IP
├── bgp/
│   └── index.ts                ASN, prefiks IP, szczegóły prefiksu
├── wayback/
│   └── index.ts                Wyszukiwanie URL + historia snapshotów
├── hackertarget/
│   └── index.ts                Wyszukiwanie hostów, reverse IP, ASN
├── m365/
│   └── index.ts                Odkrywanie dzierżawy, user realm/federacja
├── meta/
│   ├── sources.ts              Sprawdzanie dostępności źródeł
│   └── recon.ts                Połączony rekonesans domeny z darmowych źródeł
└── utils/
    ├── rate-limiter.ts          Ogranicznik zapytań oparty na kolejce
    ├── cache.ts                 Ogólny cache TTL
    └── require-key.ts           Helper walidacji klucza API
```

**Decyzje projektowe:**

- **12 dostawców, 1 serwer** &mdash; Każde źródło OSINT to niezależny moduł. Agent wybiera które narzędzia użyć na podstawie zapytania.
- **21 darmowych narzędzi** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget i M365 działają bez jakichkolwiek kluczy API. Źródła premium są addytywne.
- **Zapytania równoległe** &mdash; `osint_domain_recon` wywołuje 8 źródeł przez `Promise.allSettled`. Jeśli jedno źródło timeout, reszta nadal zwraca dane.
- **Osobne ograniczniki zapytań na dostawcę** &mdash; Każde źródło danych ma własną instancję `RateLimiter` skalibrowaną do limitów tego API. Brak wspólnego wąskiego gardła.
- **Cachowanie TTL** &mdash; Wyniki crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) są cachowane aby uniknąć redundantnych wywołań API podczas wielonarzędziowych przepływów pracy.
- **Łagodna degradacja** &mdash; Brakujące klucze API nie crashują serwera. Narzędzia zwracają opisowe komunikaty błędów: "Ustaw SHODAN_API_KEY aby włączyć narzędzia Shodan."
- **Analiza łańcucha SPF** &mdash; Rekursywne rozwiązywanie include z detekcją pętli, identyfikacją usług (Google Workspace, Microsoft 365, SendGrid, itp.) i sprawdzaniem limitu lookup RFC 7208.
- **2 zależności** &mdash; `@modelcontextprotocol/sdk` i `zod`. Wszystkie HTTP przez natywny `fetch`. Wszystkie DNS przez `node:dns/promises`.

---

## Ograniczenia

- Obowiązują limity darmowych tierów: HackerTarget (50/dzień), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh może być wolny dla dużych domen (zastosowano timeout 30s)
- ip-api.com wymaga HTTP (nie HTTPS) dla darmowego tieru
- API CDX Wayback Machine może timeout dla bardzo popularnych domen
- WHOIS przez RDAP może nie pokrywać wszystkich TLD (niektóre rejestratory jeszcze nie wspierają RDAP)
- macOS / Linux przetestowane (Windows nie testowany)

---

## Część pakietu MCP Security Suite

| Projekt | Domena | Narzędzia |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Testy bezpieczeństwa oparte na przeglądarce | 39 narzędzi, Firefox, testowanie injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bezpieczeństwo chmury (AWS/Azure/GCP) | 38 narzędzi, 60+ kontroli |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postawa bezpieczeństwa GitHub | 39 narzędzi, 45 kontroli |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Wywiad podatności | 23 narzędzia, 5 źródeł |
| **osint-mcp** | **OSINT i rekonesans** | **37 narzędzi, 12 źródeł** |

---

<p align="center">
<b>Wyłącznie do autoryzowanych testów bezpieczeństwa i ocen.</b><br>
Zawsze upewnij się, że masz odpowiednią autoryzację przed przeprowadzaniem rekonesansu na jakimkolwiek celu.
</p>

<p align="center">
  <a href="LICENSE">Licencja MIT</a> &bull; Zbudowane z Bun + TypeScript
</p>
