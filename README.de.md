<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <strong>Deutsch</strong> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
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
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp-server/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp-server/main/.github/banner-light.svg">
    <img alt="osint-mcp-server" src="https://raw.githubusercontent.com/badchars/osint-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">OSINT & Aufklärungsintelligenz für KI-Agenten.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; vereint in einem einzigen MCP-Server.<br>
  Ihr KI-Agent erhält <b>umfassendes OSINT auf Abruf</b>, nicht 12 Browser-Tabs und manuelle Korrelation.
</p>

<br>

<p align="center">
  <a href="#das-problem">Das Problem</a> &bull;
  <a href="#wie-es-sich-unterscheidet">Wie es sich unterscheidet</a> &bull;
  <a href="#schnellstart">Schnellstart</a> &bull;
  <a href="#was-die-ki-tun-kann">Was die KI tun kann</a> &bull;
  <a href="#tools-referenz-37-tools">Tools (37)</a> &bull;
  <a href="#datenquellen-12">Datenquellen</a> &bull;
  <a href="#architektur">Architektur</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/osint-mcp-server"><img src="https://img.shields.io/npm/v/osint-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-37-06b6d4" alt="37 Tools">
  <img src="https://img.shields.io/badge/sources-12-0ea5e9" alt="12 Sources">
  <img src="https://img.shields.io/badge/free%20tools-21-22c55e" alt="21 Free Tools">
</p>

---

## Das Problem

Die OSINT-Erfassung ist der erste Schritt jedes Penetrationstests, jeder Bug-Bounty-Jagd und jeder Bedrohungsbewertung. Die benötigten Daten sind über ein Dutzend Plattformen verstreut &mdash; jede mit ihrer eigenen API, ihrer eigenen Authentifizierung, ihren eigenen Ratenbegrenzungen und ihrem eigenen Ausgabeformat. Heute öffnen Sie Shodan in einem Tab, VirusTotal in einem anderen, führen `dig` in einem Terminal aus, kopieren von WHOIS, wechseln zu crt.sh für Zertifikate und verbringen dann 30 Minuten damit, alles manuell zu korrelieren.

```
Traditioneller OSINT-Workflow:
  DNS-Einträge auflösen            →  dig / nslookup CLI
  WHOIS-Registrierung prüfen       →  whois CLI oder Web-Tool
  Subdomains aufzählen             →  crt.sh + SecurityTrails + VirusTotal (3 verschiedene UIs)
  Nach offenen Ports/Diensten      →  Shodan Web-Oberfläche
  Domain-Reputation prüfen         →  VirusTotal Web-Oberfläche
  IP-Infrastruktur kartieren       →  Censys + BGP-Lookups
  Archivierte Seiten finden        →  Wayback Machine Web-UI
  E-Mail-Sicherheit überprüfen     →  Manuelle MX/SPF/DMARC-Lookups
  Alles korrelieren                →  Kopieren-Einfügen in Tabellenkalkulation
  ─────────────────────────────────
  Gesamt: 45+ Minuten pro Ziel, meistens mit Kontextwechseln
```

**osint-mcp-server** gibt Ihrem KI-Agenten 37 Tools über 12 Datenquellen via [Model Context Protocol](https://modelcontextprotocol.io). Der Agent fragt alle Quellen parallel ab, korreliert Daten, identifiziert Risiken und präsentiert ein einheitliches Intelligence-Bild &mdash; in einer einzigen Konversation.

```
Mit osint-mcp-server:
  Sie: "Mache eine vollständige Aufklärung von target.com"

  Agent: → DNS: 4 A-Einträge, 3 MX (Google Workspace), 2 NS
         → WHOIS: Registriert 2019, läuft 2025 ab, GoDaddy
         → crt.sh: 47 eindeutige Subdomains aus CT-Logs
         → HackerTarget: 23 Hosts mit IPs
         → E-Mail: SPF Soft-Fail (~all), DMARC p=none, kein DKIM
         → Shodan: 3 IPs, 12 offene Ports, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Saubere Reputation, 0 Erkennungen
         → "target.com hat 47 Subdomains, schwache E-Mail-Sicherheit
            (SPF Soft-Fail, DMARC nur Überwachung), und eine IP
            mit Apache 2.4.49 mit bekannter Path-Traversal-CVE.
            Priorität: Apache patchen, SPF auf -all upgraden, DMARC auf p=reject setzen."
```

---

## Wie es sich unterscheidet

Bestehende OSINT-Tools geben Ihnen Rohdaten von jeweils einer Quelle. osint-mcp-server gibt Ihrem KI-Agenten die Fähigkeit, **über alle Quellen gleichzeitig zu schlussfolgern**.

<table>
<thead>
<tr>
<th></th>
<th>Traditionelles OSINT</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Schnittstelle</b></td>
<td>12 verschiedene Web-UIs, CLIs und APIs</td>
<td>MCP &mdash; KI-Agent ruft Tools im Gespräch auf</td>
</tr>
<tr>
<td><b>Datenquellen</b></td>
<td>Eine Plattform nach der anderen</td>
<td>12 Quellen parallel abgefragt</td>
</tr>
<tr>
<td><b>Subdomain-Enum</b></td>
<td>crt.sh ODER SecurityTrails ODER VirusTotal</td>
<td>Agent vereint alle drei + HackerTarget, dedupliziert</td>
</tr>
<tr>
<td><b>Korrelation</b></td>
<td>Manuelles Kopieren-Einfügen zwischen Tabs</td>
<td>Agent referenziert übergreifend: "Diese IP von Shodan erscheint auch in Censys mit abgelaufenem Zertifikat"</td>
</tr>
<tr>
<td><b>E-Mail-Sicherheit</b></td>
<td>Separate SPF/DMARC/DKIM-Lookups</td>
<td>Kombinierte Analyse mit Risikobewertung und umsetzbaren Empfehlungen</td>
</tr>
<tr>
<td><b>Infrastruktur</b></td>
<td>GeoIP + BGP + WHOIS separat</td>
<td>Agent kartiert vollständige Infrastruktur: ASN, Präfixe, Geolokation, Besitz</td>
</tr>
<tr>
<td><b>API-Schlüssel</b></td>
<td>Für fast alles erforderlich</td>
<td>21 Tools funktionieren kostenlos, 16 weitere mit optionalen API-Schlüsseln</td>
</tr>
<tr>
<td><b>Einrichtung</b></td>
<td>Jedes Tool installieren, jede Konfiguration verwalten</td>
<td><code>npx osint-mcp-server</code> &mdash; ein Befehl, keine Konfiguration</td>
</tr>
</tbody>
</table>

---

## Schnellstart

### Option 1: npx (keine Installation)

```bash
npx osint-mcp-server
```

21 öffentliche OSINT-Tools funktionieren sofort. Keine API-Schlüssel erforderlich.

### Option 2: Klonen

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### Umgebungsvariablen (optional)

```bash
# Premium OSINT-Quellen — alle optional
export SHODAN_API_KEY=your-key           # Aktiviert 4 Shodan-Tools
export VT_API_KEY=your-key               # Aktiviert 4 VirusTotal-Tools
export ST_API_KEY=your-key               # Aktiviert 3 SecurityTrails-Tools
export CENSYS_API_ID=your-id             # Aktiviert 3 Censys-Tools
export CENSYS_API_SECRET=your-secret     # Erforderlich mit CENSYS_API_ID
```

Alle Premium-API-Schlüssel sind optional. Ohne sie erhalten Sie immer noch 21 Tools für DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget und Microsoft 365 Tenant-Discovery.

### Mit Ihrem KI-Agenten verbinden

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Mit npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# Mit lokalem Klon
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Hinzufügen zu `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "osint": {
      "command": "npx",
      "args": ["-y", "osint-mcp-server"],
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
<summary><b>Cursor / Windsurf / andere MCP-Clients</b></summary>

Gleiches JSON-Konfigurationsformat. Verweisen Sie den Befehl auf `npx osint-mcp-server` oder Ihren lokalen Installationspfad.

</details>

### Abfragen starten

```
Sie: "Was kannst du über example.com herausfinden?"
```

Das war's. Der Agent übernimmt DNS, WHOIS, Subdomains, E-Mail-Sicherheit und mehr automatisch.

---

## Was die KI tun kann

### Domain-Aufklärung

```
Sie: "Mache eine vollständige Aufklärung von target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: A-Einträge zeigen auf 3 IPs (AWS us-east-1)
       → WHOIS: Registriert 2018 über Namecheap, läuft 2026 ab
       → crt.sh: 62 Subdomains entdeckt
       → HackerTarget: 31 Hosts mit aufgelösten IPs
       → E-Mail: SPF Hard-Fail, DMARC p=reject, DKIM gefunden (selector1)
       → "target.com ist gut für E-Mail-Sicherheit konfiguriert.
          62 Subdomains gefunden — bemerkenswert: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Infrastruktur läuft auf AWS (us-east-1)."
```

### Angriffsflächen-Kartierung

```
Sie: "Kartiere die Angriffsfläche für 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Offene Ports: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx Reverse-Proxy auf 8080
          Reverse-DNS: web1.target.com
          3 bekannte CVEs von Shodan markiert"
```

### Subdomain-Enumeration (Mehrere Quellen)

```
Sie: "Finde alle Subdomains von target.com mit jeder verfügbaren Quelle"

Agent: → crtsh_search {domain: "target.com"}              → 62 Subdomains
       → st_subdomains {domain: "target.com"}              → 84 Subdomains
       → vt_subdomains {domain: "target.com"}              → 41 Subdomains
       → hackertarget_hostsearch {domain: "target.com"}    → 31 Hosts
       → dns_wildcard_check {domain: "target.com"}         → Keine Wildcard
       → "127 eindeutige Subdomains nach Deduplizierung über 4 Quellen.
          Bemerkenswerte Funde: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD-Expositionsrisiko),
          old-admin.target.com (potenzielles Legacy-System)"
```

### E-Mail-Sicherheitsaudit

```
Sie: "Analysiere die E-Mail-Sicherheitslage von target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "E-Mail-Sicherheit: HOHES RISIKO
          SPF: ~all (Soft-Fail — fälschbar)
          DMARC: p=none (nur Überwachung — nicht durchgesetzt)
          DKIM: Gefunden für selector1 (2048-Bit, gut)
          SPF-Kette: 7 Includes, 2 Dienste (Google Workspace, SendGrid)
          M365: Kein Microsoft-Tenant
          Empfehlungen:
          1. SPF von ~all auf -all upgraden
          2. DMARC von p=none auf p=quarantine, dann p=reject ändern
          3. rua= zu DMARC für aggregierte Berichte hinzufügen"
```

### Historische Intelligenz

```
Sie: "Was lief auf target.com vor 3 Jahren?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS-Historie: target.com wechselte von 198.51.100.1 (DigitalOcean)
          zu 203.0.113.50 (AWS) in 2023.
          Wayback fand 342 eindeutige URLs inkl.:
          - /admin/ (2024 entfernt, war zugreifbar)
          - /api/v1/docs (Swagger UI, immer noch gecacht)
          - /wp-content/ (war WordPress, migriert)
          Alte robots.txt sperrte /internal/ und /debug/"
```

---

## Tools-Referenz (37 Tools)

<details open>
<summary><b>DNS (6) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `dns_lookup` | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV-Einträge auflösen |
| `dns_reverse` | Reverse-DNS (PTR) Lookup für eine IP-Adresse |
| `dns_email_security` | SPF + DMARC + DKIM-Analyse mit Risikobewertung und Empfehlungen |
| `dns_spf_chain` | Rekursive SPF-Include-Kettenauflösung mit Service-Erkennung |
| `dns_srv_discover` | SRV + CNAME Service-Discovery (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Wildcard-DNS-Erkennung via Zufalls-Subdomain-Probe |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `whois_domain` | RDAP-Domain-Lookup &mdash; Registrar, Daten, Nameserver, Kontakte |
| `whois_ip` | RDAP-IP-Lookup &mdash; Netzwerkname, CIDR, Land, Entitäten |

</details>

<details>
<summary><b>Zertifikatstransparenz (1) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `crtsh_search` | CT-Logs via crt.sh durchsuchen &mdash; Subdomain-Discovery + Zertifikatsdetails |

</details>

<details>
<summary><b>Shodan (4) &mdash; Benötigt SHODAN_API_KEY</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `shodan_host` | IP-Details: Offene Ports, Dienste, Banner, Schwachstellen, OS, ASN |
| `shodan_search` | Shodan-Abfragesprache durchsuchen (z.B. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Bulk-Hostname-zu-IP-Auflösung via Shodan |
| `shodan_exploits` | Öffentliche Exploit-Datenbank durchsuchen (PoC, Metasploit-Module) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Benötigt VT_API_KEY</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `vt_domain` | Domain-Reputation, Erkennungsstatistiken, Kategorien, DNS-Einträge |
| `vt_ip` | IP-Reputation, Erkennungsstatistiken, ASN, Netzwerk |
| `vt_subdomains` | Subdomain-Enumeration via VirusTotal |
| `vt_url` | URL-Scan + Malware/Phishing-Analyse |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Benötigt ST_API_KEY</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `st_subdomains` | Subdomain-Enumeration (gibt FQDNs zurück) |
| `st_dns_history` | Historische DNS-Einträge mit Erst-/Letzt-Gesehen-Daten |
| `st_whois` | Erweitertes WHOIS mit Registrant/Admin/Tech-Kontakten |

</details>

<details>
<summary><b>Censys (3) &mdash; Benötigt CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `censys_hosts` | Host-Suche &mdash; IPs, Dienste, Ports, Standort, ASN |
| `censys_host_details` | Einzelner Host mit vollständigen Details aller Dienste |
| `censys_certificates` | Zertifikatssuche nach Domain, Fingerprint, Aussteller |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `geoip_lookup` | IP-Geolokation: Land, Stadt, ISP, ASN, Proxy/Hosting/VPN-Erkennung |
| `geoip_batch` | Batch-IP-Geolokation (bis zu 100 IPs auf einmal) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `bgp_asn` | ASN-Details + alle angekündigten IPv4/IPv6-Präfixe |
| `bgp_ip` | IP-Präfix/ASN-Routing-Lookup mit RIR-Zuweisung |
| `bgp_prefix` | Präfix-Details + ankündigende ASNs |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `wayback_urls` | Archivierte URL-Discovery &mdash; alte Endpunkte, versteckte Pfade, entfernte Inhalte finden |
| `wayback_snapshots` | Snapshot-Historie mit Zeitstempeln und direkten Archiv-Links |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `hackertarget_hostsearch` | Host/Subdomain-Discovery mit aufgelösten IPs |
| `hackertarget_reverseip` | Reverse-IP-Lookup &mdash; alle Domains auf einer IP finden |
| `hackertarget_aslookup` | ASN-Informations-Lookup |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `m365_tenant` | M365-Tenant-ID, Region und OpenID-Konfiguration entdecken |
| `m365_userrealm` | Auth-Typ erkennen (Managed/Federated), Föderations-Brand, Auth-Endpunkte |

</details>

<details>
<summary><b>Meta (2) &mdash; Kein API-Schlüssel</b></summary>

| Tool | Beschreibung |
|------|-------------|
| `osint_list_sources` | Alle OSINT-Quellen, API-Schlüssel-Status und Tool-Anzahlen auflisten |
| `osint_domain_recon` | Schnellaufklärung mit allen kostenlosen Quellen kombiniert (DNS + WHOIS + crt.sh + HackerTarget + E-Mail-Sicherheit) |

</details>

---

## Datenquellen (12)

| Quelle | Auth | Ratenbegrenzung | Was sie liefert |
|--------|------|-----------------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Keine | Keine | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR-Einträge |
| [RDAP](https://rdap.org/) | Keine | 1 Req/s | Domain & IP WHOIS-Daten (Registrar, Daten, Kontakte, CIDR) |
| [crt.sh](https://crt.sh/) | Keine | 0,5 Req/s | Certificate Transparency Logs, Subdomain-Discovery |
| [ip-api.com](http://ip-api.com/) | Keine | 45 Req/min | IP-Geolokation, ISP, ASN, Proxy/VPN/Hosting-Erkennung |
| [BGPView](https://bgpview.io/) | Keine | 0,5 Req/s | ASN-Details, angekündigte Präfixe, IP-Routing-Info |
| [HackerTarget](https://hackertarget.com/) | Keine | 2 Req/s | Host-Suche, Reverse-IP, ASN-Lookup (50/Tag kostenlos) |
| [Wayback Machine](https://web.archive.org/) | Keine | 1 Req/s | Archivierte URLs, Snapshot-Historie, historischer Inhalt |
| [Microsoft 365](https://login.microsoftonline.com/) | Keine | Keine | Tenant-Discovery, Föderationserkennung, Auth-Typ |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 Req/s | Internet-weites Port/Service/Banner-Scanning |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 Req/min | Domain/IP/URL-Reputation, Malware-Erkennung |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 Req/s | DNS-Historie, Subdomain-Enumeration, erweitertes WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 Req/s | Host-Suche, Zertifikatstransparenz, Service-Discovery |

---

## Architektur

```
src/
├── index.ts                    Einstiegspunkt, Env-Konfiguration, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 Tool-Definitionen (Zod-Schemas)
│   └── mcp-server.ts           MCP-Server + stdio-Transport
├── dns/
│   └── index.ts                6 Funktionen — Lookup, Reverse, E-Mail, SPF-Kette, SRV, Wildcard
├── whois/
│   └── index.ts                2 Funktionen — Domain-RDAP, IP-RDAP
├── crtsh/
│   └── index.ts                CT-Log-Suche mit Deduplizierung + Caching
├── shodan/
│   └── index.ts                Host, Suche, DNS-Auflösung, Exploits
├── virustotal/
│   └── index.ts                Domain, IP, Subdomains, URL-Scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS-Historie, WHOIS
├── censys/
│   └── index.ts                Host-Suche, Host-Details, Zertifikate
├── geoip/
│   └── index.ts                Einzel- + Batch-IP-Geolokation
├── bgp/
│   └── index.ts                ASN, IP-Präfix, Präfix-Details
├── wayback/
│   └── index.ts                URL-Suche + Snapshot-Historie
├── hackertarget/
│   └── index.ts                Host-Suche, Reverse-IP, ASN
├── m365/
│   └── index.ts                Tenant-Discovery, User-Realm/Föderation
├── meta/
│   ├── sources.ts              Quellverfügbarkeitsprüfung
│   └── recon.ts                Kombinierte kostenlose Quellen-Domain-Aufklärung
└── utils/
    ├── rate-limiter.ts          Warteschlangenbasierter Ratenbegrenzer
    ├── cache.ts                 Generischer TTL-Cache
    └── require-key.ts           API-Schlüssel-Validierungshilfe
```

**Design-Entscheidungen:**

- **12 Anbieter, 1 Server** &mdash; Jede OSINT-Quelle ist ein unabhängiges Modul. Der Agent wählt basierend auf der Anfrage, welche Tools verwendet werden.
- **21 kostenlose Tools** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget und M365 funktionieren ohne API-Schlüssel. Premium-Quellen sind additiv.
- **Parallele Abfragen** &mdash; `osint_domain_recon` ruft 8 Quellen via `Promise.allSettled` auf. Wenn eine Quelle ein Timeout hat, geben die anderen dennoch Daten zurück.
- **Provider-spezifische Ratenbegrenzer** &mdash; Jede Datenquelle hat ihre eigene `RateLimiter`-Instanz, kalibriert auf die Limits dieser API. Kein gemeinsamer Flaschenhals.
- **TTL-Caching** &mdash; crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) Ergebnisse werden gecacht, um redundante API-Aufrufe während Multi-Tool-Workflows zu vermeiden.
- **Graceful Degradation** &mdash; Fehlende API-Schlüssel lassen den Server nicht abstürzen. Tools geben beschreibende Fehlermeldungen zurück: "SHODAN_API_KEY setzen, um Shodan-Tools zu aktivieren."
- **SPF-Kettenanalyse** &mdash; Rekursive Include-Auflösung mit Loop-Erkennung, Service-Identifikation (Google Workspace, Microsoft 365, SendGrid, etc.) und RFC 7208 Lookup-Limit-Prüfung.
- **2 Abhängigkeiten** &mdash; `@modelcontextprotocol/sdk` und `zod`. Alles HTTP via natives `fetch`. Alles DNS via `node:dns/promises`.

---

## Einschränkungen

- Free-Tier-Ratenbegrenzungen gelten: HackerTarget (50/Tag), ip-api.com (45/min), VirusTotal Community (4/min)
- crt.sh kann für große Domains langsam sein (30s Timeout angewendet)
- ip-api.com erfordert HTTP (nicht HTTPS) für Free-Tier
- Wayback Machine CDX API kann für sehr populäre Domains ein Timeout haben
- WHOIS via RDAP deckt möglicherweise nicht alle TLDs ab (einige Registrare unterstützen RDAP noch nicht)
- macOS / Linux getestet (Windows nicht getestet)

---

## Teil der MCP Security Suite

| Projekt | Domain | Tools |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browser-basiertes Sicherheitstesten | 39 Tools, Firefox, Injection-Testing |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud-Sicherheit (AWS/Azure/GCP) | 38 Tools, 60+ Checks |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub-Sicherheitslage | 39 Tools, 45 Checks |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Schwachstellen-Intelligenz | 23 Tools, 5 Quellen |
| **osint-mcp-server** | **OSINT & Aufklärung** | **37 Tools, 12 Quellen** |

---

<p align="center">
<b>Nur für autorisierte Sicherheitstests und Bewertungen.</b><br>
Stellen Sie immer sicher, dass Sie über die erforderliche Autorisierung verfügen, bevor Sie Aufklärung gegen ein Ziel durchführen.
</p>

<p align="center">
  <a href="LICENSE">MIT-Lizenz</a> &bull; Gebaut mit Bun + TypeScript
</p>
