<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <strong>Italiano</strong> |
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

<h3 align="center">Intelligence OSINT e ricognizione per agenti AI.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; unificati in un unico server MCP.<br>
  Il tuo agente AI ottiene <b>OSINT a spettro completo su richiesta</b>, non 12 schede del browser e correlazione manuale.
</p>

<br>

<p align="center">
  <a href="#il-problema">Il Problema</a> &bull;
  <a href="#come-è-diverso">Come È Diverso</a> &bull;
  <a href="#avvio-rapido">Avvio Rapido</a> &bull;
  <a href="#cosa-può-fare-lai">Cosa Può Fare l'AI</a> &bull;
  <a href="#riferimento-strumenti-37-strumenti">Strumenti (37)</a> &bull;
  <a href="#fonti-di-dati-12">Fonti di Dati</a> &bull;
  <a href="#architettura">Architettura</a>
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

## Il Problema

La raccolta OSINT è il primo passo di ogni test di penetrazione, bug bounty e valutazione delle minacce. I dati di cui hai bisogno sono sparsi su una dozzina di piattaforme &mdash; ciascuna con la propria API, la propria autenticazione, i propri limiti di velocità, il proprio formato di output. Oggi apri Shodan in una scheda, VirusTotal in un'altra, esegui `dig` in un terminale, copi e incolli da WHOIS, passi a crt.sh per i certificati, e poi passi 30 minuti a correlare manualmente tutto.

```
Flusso di lavoro OSINT tradizionale:
  risolvere record DNS              →  dig / nslookup CLI
  controllare registrazione WHOIS   →  whois CLI o strumento web
  enumerare sottodomini             →  crt.sh + SecurityTrails + VirusTotal (3 UI diverse)
  scansionare porte/servizi aperti  →  interfaccia web Shodan
  controllare reputazione dominio   →  interfaccia web VirusTotal
  mappare infrastruttura IP         →  Censys + ricerche BGP
  trovare pagine archiviate         →  UI web Wayback Machine
  controllare sicurezza email       →  ricerche manuali MX/SPF/DMARC/DKIM
  correlare tutto                   →  copia-incolla in un foglio di calcolo
  ─────────────────────────────────────
  Totale: 45+ minuti per target, la maggior parte cambiando contesto
```

**osint-mcp-server** fornisce al tuo agente AI 37 strumenti su 12 fonti di dati tramite il [Model Context Protocol](https://modelcontextprotocol.io). L'agente interroga tutte le fonti in parallelo, correla i dati, identifica i rischi e presenta un quadro di intelligence unificato &mdash; in una singola conversazione.

```
Con osint-mcp-server:
  Tu: "Fai una ricognizione completa su target.com"

  Agente: → DNS: 4 record A, 3 MX (Google Workspace), 2 NS
          → WHOIS: Registrato 2019, scade 2025, GoDaddy
          → crt.sh: 47 sottodomini unici dai log CT
          → HackerTarget: 23 host con IP
          → Email: SPF soft-fail (~all), DMARC p=none, no DKIM
          → Shodan: 3 IP, 12 porte aperte, Apache 2.4.49 (CVE-2021-41773)
          → VirusTotal: Reputazione pulita, 0 rilevamenti
          → "target.com ha 47 sottodomini, sicurezza email debole
             (SPF soft-fail, DMARC solo monitoraggio), e un IP
             con Apache 2.4.49 con CVE di path traversal nota.
             Priorità: patch Apache, aggiornare SPF a -all, impostare DMARC a p=reject."
```

---

## Come È Diverso

Gli strumenti OSINT esistenti ti forniscono dati grezzi una fonte alla volta. osint-mcp-server fornisce al tuo agente AI la capacità di **ragionare su tutte le fonti simultaneamente**.

<table>
<thead>
<tr>
<th></th>
<th>OSINT Tradizionale</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interfaccia</b></td>
<td>12 diverse UI web, CLI e API</td>
<td>MCP &mdash; l'agente AI chiama strumenti in modo conversazionale</td>
</tr>
<tr>
<td><b>Fonti di dati</b></td>
<td>Una piattaforma alla volta</td>
<td>12 fonti interrogate in parallelo</td>
</tr>
<tr>
<td><b>Enum sottodomini</b></td>
<td>crt.sh O SecurityTrails O VirusTotal</td>
<td>L'agente unisce tutti e tre + HackerTarget, deduplica</td>
</tr>
<tr>
<td><b>Correlazione</b></td>
<td>Copia-incolla manuale tra schede</td>
<td>L'agente incrocia i riferimenti: "Questo IP da Shodan appare anche in Censys con certificato scaduto"</td>
</tr>
<tr>
<td><b>Sicurezza email</b></td>
<td>Ricerche SPF/DMARC/DKIM separate</td>
<td>Analisi combinata con punteggio di rischio e raccomandazioni azionabili</td>
</tr>
<tr>
<td><b>Infrastruttura</b></td>
<td>GeoIP + BGP + WHOIS separatamente</td>
<td>L'agente mappa l'infrastruttura completa: ASN, prefissi, geolocalizzazione, proprietà</td>
</tr>
<tr>
<td><b>Chiavi API</b></td>
<td>Richieste per quasi tutto</td>
<td>21 strumenti gratuiti, 16 in più con chiavi API opzionali</td>
</tr>
<tr>
<td><b>Configurazione</b></td>
<td>Installa ogni strumento, gestisci ogni config</td>
<td><code>npx osint-mcp-server</code> &mdash; un comando, zero configurazione</td>
</tr>
</tbody>
</table>

---

## Avvio Rapido

### Opzione 1: npx (senza installazione)

```bash
npx osint-mcp-server
```

21 strumenti OSINT pubblici funzionano immediatamente. Nessuna chiave API richiesta.

### Opzione 2: Clone

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### Variabili d'ambiente (opzionali)

```bash
# Fonti OSINT premium — tutte opzionali
export SHODAN_API_KEY=your-key           # Abilita 4 strumenti Shodan
export VT_API_KEY=your-key               # Abilita 4 strumenti VirusTotal
export ST_API_KEY=your-key               # Abilita 3 strumenti SecurityTrails
export CENSYS_API_ID=your-id             # Abilita 3 strumenti Censys
export CENSYS_API_SECRET=your-secret     # Richiesto con CENSYS_API_ID
```

Tutte le chiavi API premium sono opzionali. Senza di esse, ottieni comunque 21 strumenti che coprono DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget e scoperta tenant Microsoft 365.

### Connetti al tuo agente AI

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Con npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# Con clone locale
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Aggiungi a `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / altri client MCP</b></summary>

Stesso formato di configurazione JSON. Punta il comando su `npx osint-mcp-server` o il percorso della tua installazione locale.

</details>

### Inizia a interrogare

```
Tu: "Cosa puoi trovare su example.com?"
```

Questo è tutto. L'agente gestisce DNS, WHOIS, sottodomini, sicurezza email e altro automaticamente.

---

## Cosa Può Fare l'AI

### Ricognizione del Dominio

```
Tu: "Fai una ricognizione completa su target.com"

Agente: → osint_domain_recon {domain: "target.com"}
        → DNS: I record A puntano a 3 IP (AWS us-east-1)
        → WHOIS: Registrato 2018 tramite Namecheap, scade 2026
        → crt.sh: 62 sottodomini scoperti
        → HackerTarget: 31 host con IP risolti
        → Email: SPF hard-fail, DMARC p=reject, DKIM trovato (selector1)
        → "target.com è ben configurato per la sicurezza email.
           62 sottodomini trovati — notevoli: staging.target.com,
           admin-portal.target.com, api-v2.target.com.
           L'infrastruttura è su AWS (us-east-1)."
```

### Mappatura della Superficie di Attacco

```
Tu: "Mappa la superficie di attacco per 203.0.113.50"

Agente: → shodan_host {ip: "203.0.113.50"}
        → geoip_lookup {ip: "203.0.113.50"}
        → bgp_ip {ip: "203.0.113.50"}
        → whois_ip {ip: "203.0.113.50"}
        → dns_reverse {ip: "203.0.113.50"}
        → "203.0.113.50 (Hetzner, DE, AS24940)
           Porte aperte: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
           Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy su 8080
           DNS inverso: web1.target.com
           3 CVE note segnalate da Shodan"
```

### Enumerazione Sottodomini (Multi-Fonte)

```
Tu: "Trova tutti i sottodomini di target.com usando ogni fonte disponibile"

Agente: → crtsh_search {domain: "target.com"}              → 62 sottodomini
        → st_subdomains {domain: "target.com"}              → 84 sottodomini
        → vt_subdomains {domain: "target.com"}              → 41 sottodomini
        → hackertarget_hostsearch {domain: "target.com"}    → 31 host
        → dns_wildcard_check {domain: "target.com"}         → No wildcard
        → "127 sottodomini unici dopo dedup su 4 fonti.
           Risultati notevoli: staging.target.com, dev-api.target.com,
           jenkins.target.com (rischio esposizione CI/CD),
           old-admin.target.com (potenziale sistema legacy)"
```

### Audit Sicurezza Email

```
Tu: "Analizza la postura di sicurezza email di target.com"

Agente: → dns_email_security {domain: "target.com"}
        → dns_spf_chain {domain: "target.com"}
        → m365_tenant {domain: "target.com"}
        → "Sicurezza Email: ALTO RISCHIO
           SPF: ~all (soft fail — falsificabile)
           DMARC: p=none (solo monitoraggio — non applicato)
           DKIM: Trovato per selector1 (2048-bit, buono)
           Catena SPF: 7 include, 2 servizi (Google Workspace, SendGrid)
           M365: Non è un tenant Microsoft
           Raccomandazioni:
           1. Aggiornare SPF da ~all a -all
           2. Cambiare DMARC da p=none a p=quarantine, poi p=reject
           3. Aggiungere rua= a DMARC per report aggregati"
```

### Intelligence Storica

```
Tu: "Cosa utilizzava target.com 3 anni fa?"

Agente: → wayback_urls {domain: "target.com", limit: 500}
        → st_dns_history {domain: "target.com", type: "a"}
        → wayback_snapshots {url: "https://target.com/robots.txt"}
        → "Storico DNS: target.com spostato da 198.51.100.1 (DigitalOcean)
           a 203.0.113.50 (AWS) nel 2023.
           Wayback ha trovato 342 URL unici inclusi:
           - /admin/ (rimosso nel 2024, era accessibile)
           - /api/v1/docs (Swagger UI, ancora in cache)
           - /wp-content/ (era WordPress, migrato)
           Vecchio robots.txt disallowava /internal/ e /debug/"
```

---

## Riferimento Strumenti (37 strumenti)

<details open>
<summary><b>DNS (6) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `dns_lookup` | Risolvi record A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Ricerca DNS inversa (PTR) per un indirizzo IP |
| `dns_email_security` | Analisi SPF + DMARC + DKIM con punteggio di rischio e raccomandazioni |
| `dns_spf_chain` | Risoluzione ricorsiva della catena SPF include con rilevamento servizi |
| `dns_srv_discover` | Scoperta servizi SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, ecc.) |
| `dns_wildcard_check` | Rilevamento DNS wildcard tramite probe sottodominio casuale |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `whois_domain` | Ricerca RDAP dominio &mdash; registrar, date, nameserver, contatti |
| `whois_ip` | Ricerca RDAP IP &mdash; nome rete, CIDR, paese, entità |

</details>

<details>
<summary><b>Trasparenza Certificati (1) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `crtsh_search` | Ricerca log CT tramite crt.sh &mdash; scoperta sottodomini + dettagli certificati |

</details>

<details>
<summary><b>Shodan (4) &mdash; Richiede SHODAN_API_KEY</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `shodan_host` | Dettagli IP: porte aperte, servizi, banner, vulnerabilità, OS, ASN |
| `shodan_search` | Ricerca linguaggio query Shodan (es. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Risoluzione hostname-a-IP in batch tramite Shodan |
| `shodan_exploits` | Ricerca database exploit pubblico (PoC, moduli Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Richiede VT_API_KEY</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `vt_domain` | Reputazione dominio, statistiche rilevamento, categorie, record DNS |
| `vt_ip` | Reputazione IP, statistiche rilevamento, ASN, rete |
| `vt_subdomains` | Enumerazione sottodomini tramite VirusTotal |
| `vt_url` | Scansione URL + analisi malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Richiede ST_API_KEY</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `st_subdomains` | Enumerazione sottodomini (restituisce FQDN) |
| `st_dns_history` | Record DNS storici con date primo/ultimo visto |
| `st_whois` | WHOIS migliorato con contatti registrante/admin/tecnico |

</details>

<details>
<summary><b>Censys (3) &mdash; Richiede CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `censys_hosts` | Ricerca host &mdash; IP, servizi, porte, posizione, ASN |
| `censys_host_details` | Dettagli completi singolo host con tutti i servizi |
| `censys_certificates` | Ricerca certificati per dominio, fingerprint, emittente |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `geoip_lookup` | Geolocalizzazione IP: paese, città, ISP, ASN, rilevamento proxy/hosting/VPN |
| `geoip_batch` | Geolocalizzazione IP in batch (fino a 100 IP alla volta) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `bgp_asn` | Dettagli ASN + tutti i prefissi IPv4/IPv6 annunciati |
| `bgp_ip` | Ricerca routing prefisso/ASN IP con allocazione RIR |
| `bgp_prefix` | Dettagli prefisso + ASN annuncianti |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `wayback_urls` | Scoperta URL archiviati &mdash; trova vecchi endpoint, percorsi nascosti, contenuto rimosso |
| `wayback_snapshots` | Storico snapshot con timestamp e link archivio diretti |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `hackertarget_hostsearch` | Scoperta host/sottodomini con IP risolti |
| `hackertarget_reverseip` | Ricerca IP inversa &mdash; trova tutti i domini su un IP |
| `hackertarget_aslookup` | Ricerca informazioni ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `m365_tenant` | Scopri ID tenant M365, regione e configurazione OpenID |
| `m365_userrealm` | Rileva tipo auth (Managed/Federated), brand federazione, endpoint auth |

</details>

<details>
<summary><b>Meta (2) &mdash; Senza chiave API</b></summary>

| Strumento | Descrizione |
|------|-------------|
| `osint_list_sources` | Elenca tutte le fonti OSINT, stato chiavi API e conteggi strumenti |
| `osint_domain_recon` | Ricognizione rapida combinando tutte le fonti gratuite (DNS + WHOIS + crt.sh + HackerTarget + sicurezza email) |

</details>

---

## Fonti di Dati (12)

| Fonte | Auth | Limite Velocità | Cosa fornisce |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Nessuna | Nessuno | Record A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Nessuna | 1 req/s | Dati WHOIS dominio e IP (registrar, date, contatti, CIDR) |
| [crt.sh](https://crt.sh/) | Nessuna | 0.5 req/s | Log trasparenza certificati, scoperta sottodomini |
| [ip-api.com](http://ip-api.com/) | Nessuna | 45 req/min | Geolocalizzazione IP, ISP, ASN, rilevamento proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Nessuna | 0.5 req/s | Dettagli ASN, prefissi annunciati, info routing IP |
| [HackerTarget](https://hackertarget.com/) | Nessuna | 2 req/s | Ricerca host, IP inverso, ricerca ASN (50/giorno gratis) |
| [Wayback Machine](https://web.archive.org/) | Nessuna | 1 req/s | URL archiviati, storico snapshot, contenuto storico |
| [Microsoft 365](https://login.microsoftonline.com/) | Nessuna | Nessuno | Scoperta tenant, rilevamento federazione, tipo auth |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Scansione porta/servizio/banner su Internet |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Reputazione dominio/IP/URL, rilevamento malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | Storico DNS, enumerazione sottodomini, WHOIS migliorato |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Ricerca host, trasparenza certificati, scoperta servizi |

---

## Architettura

```
src/
├── index.ts                    Punto di ingresso, config env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 definizioni strumenti (schemi Zod)
│   └── mcp-server.ts           Server MCP + trasporto stdio
├── dns/
│   └── index.ts                6 funzioni — lookup, reverse, email, catena SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 funzioni — RDAP dominio, RDAP IP
├── crtsh/
│   └── index.ts                Ricerca log CT con dedup + caching
├── shodan/
│   └── index.ts                Host, ricerca, risoluzione DNS, exploit
├── virustotal/
│   └── index.ts                Dominio, IP, sottodomini, scansione URL
├── securitytrails/
│   └── index.ts                Sottodomini, storico DNS, WHOIS
├── censys/
│   └── index.ts                Ricerca host, dettagli host, certificati
├── geoip/
│   └── index.ts                Geolocalizzazione IP singola + batch
├── bgp/
│   └── index.ts                ASN, prefisso IP, dettagli prefisso
├── wayback/
│   └── index.ts                Ricerca URL + storico snapshot
├── hackertarget/
│   └── index.ts                Ricerca host, IP inverso, ASN
├── m365/
│   └── index.ts                Scoperta tenant, realm utente/federazione
├── meta/
│   ├── sources.ts              Controllo disponibilità fonte
│   └── recon.ts                Ricognizione dominio combinata fonti gratuite
└── utils/
    ├── rate-limiter.ts          Limitatore velocità basato su coda
    ├── cache.ts                 Cache TTL generica
    └── require-key.ts           Helper validazione chiave API
```

**Decisioni di design:**

- **12 provider, 1 server** &mdash; Ogni fonte OSINT è un modulo indipendente. L'agente sceglie quali strumenti usare in base alla query.
- **21 strumenti gratuiti** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget e M365 funzionano senza chiavi API. Le fonti premium sono aggiuntive.
- **Query parallele** &mdash; `osint_domain_recon` chiama 8 fonti tramite `Promise.allSettled`. Se una fonte va in timeout, le altre restituiscono comunque dati.
- **Limitatori velocità per provider** &mdash; Ogni fonte dati ha la propria istanza `RateLimiter` calibrata sui limiti di quell'API. Nessun collo di bottiglia condiviso.
- **Caching TTL** &mdash; I risultati di crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) sono memorizzati in cache per evitare chiamate API ridondanti durante flussi multi-strumento.
- **Degradazione graduale** &mdash; Le chiavi API mancanti non bloccano il server. Gli strumenti restituiscono messaggi di errore descrittivi: "Imposta SHODAN_API_KEY per abilitare strumenti Shodan."
- **Analisi catena SPF** &mdash; Risoluzione include ricorsiva con rilevamento loop, identificazione servizi (Google Workspace, Microsoft 365, SendGrid, ecc.) e controllo limite ricerche RFC 7208.
- **2 dipendenze** &mdash; `@modelcontextprotocol/sdk` e `zod`. Tutto HTTP tramite `fetch` nativo. Tutto DNS tramite `node:dns/promises`.

---

## Limitazioni

- Si applicano limiti velocità tier gratuito: HackerTarget (50/giorno), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh può essere lento per domini grandi (timeout 30s applicato)
- ip-api.com richiede HTTP (non HTTPS) per tier gratuito
- L'API CDX di Wayback Machine può andare in timeout per domini molto popolari
- WHOIS tramite RDAP potrebbe non coprire tutti i TLD (alcuni registrar non supportano ancora RDAP)
- macOS / Linux testati (Windows non testato)

---

## Parte della MCP Security Suite

| Progetto | Dominio | Strumenti |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Test di sicurezza basato su browser | 39 strumenti, Firefox, test injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Sicurezza cloud (AWS/Azure/GCP) | 38 strumenti, 60+ controlli |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura sicurezza GitHub | 39 strumenti, 45 controlli |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Intelligence vulnerabilità | 23 strumenti, 5 fonti |
| **osint-mcp-server** | **OSINT e ricognizione** | **37 strumenti, 12 fonti** |

---

<p align="center">
<b>Solo per test di sicurezza e valutazioni autorizzati.</b><br>
Assicurati sempre di avere l'autorizzazione adeguata prima di eseguire ricognizioni su qualsiasi target.
</p>

<p align="center">
  <a href="LICENSE">Licenza MIT</a> &bull; Realizzato con Bun + TypeScript
</p>
