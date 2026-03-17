<p align="center">

**[English](README.md) · [Türkçe](README.tr.md) · Français · [中文](README.zh.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md)**

</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Renseignement OSINT et reconnaissance pour les agents IA.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; unifiés dans un seul serveur MCP.<br>
  Votre agent IA obtient un <b>renseignement OSINT complet à la demande</b>, au lieu de 12 onglets de navigateur et une corrélation manuelle.
</p>

<br>

<p align="center">
  <a href="#le-problème">Le Problème</a> &bull;
  <a href="#en-quoi-cest-différent">En Quoi C'est Différent</a> &bull;
  <a href="#démarrage-rapide">Démarrage Rapide</a> &bull;
  <a href="#ce-que-lia-peut-faire">Ce Que l'IA Peut Faire</a> &bull;
  <a href="#référence-des-outils-37-outils">Outils (37)</a> &bull;
  <a href="#sources-de-données-12">Sources de Données</a> &bull;
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

## Le Problème

La collecte OSINT est la première étape de chaque test d'intrusion, programme de bug bounty et évaluation de menaces. Les données dont vous avez besoin sont dispersées sur une douzaine de plateformes &mdash; chacune avec sa propre API, sa propre authentification, ses propres limites de débit, son propre format de sortie. Aujourd'hui, vous ouvrez Shodan dans un onglet, VirusTotal dans un autre, lancez `dig` dans un terminal, copiez-collez depuis WHOIS, basculez vers crt.sh pour les certificats, puis passez 30 minutes à tout corréler manuellement.

```
Flux de travail OSINT traditionnel :
  résoudre les enregistrements DNS     →  CLI dig / nslookup
  vérifier l'enregistrement WHOIS      →  CLI whois ou outil web
  énumérer les sous-domaines           →  crt.sh + SecurityTrails + VirusTotal (3 interfaces différentes)
  scanner les ports/services ouverts   →  interface web Shodan
  vérifier la réputation du domaine    →  interface web VirusTotal
  cartographier l'infrastructure IP    →  Censys + recherches BGP
  rechercher les pages archivées       →  interface web Wayback Machine
  vérifier la sécurité email           →  recherches manuelles MX/SPF/DMARC
  corréler l'ensemble                  →  copier-coller dans un tableur
  ─────────────────────────────────────
  Total : 45+ minutes par cible, en grande partie à basculer entre les contextes
```

**osint-mcp** met à disposition de votre agent IA 37 outils couvrant 12 sources de données via le [Model Context Protocol](https://modelcontextprotocol.io). L'agent interroge toutes les sources en parallèle, corrèle les données, identifie les risques et présente une vue de renseignement unifiée &mdash; dans une seule conversation.

```
Avec osint-mcp :
  Vous : « Fais une reconnaissance complète de target.com »

  Agent : → DNS : 4 enregistrements A, 3 MX (Google Workspace), 2 NS
          → WHOIS : Enregistré en 2019, expire en 2025, GoDaddy
          → crt.sh : 47 sous-domaines uniques depuis les journaux CT
          → HackerTarget : 23 hôtes avec adresses IP
          → Email : SPF soft-fail (~all), DMARC p=none, pas de DKIM
          → Shodan : 3 IP, 12 ports ouverts, Apache 2.4.49 (CVE-2021-41773)
          → VirusTotal : Réputation propre, 0 détection
          → « target.com possède 47 sous-domaines, une sécurité email
             faible (SPF soft-fail, DMARC en mode surveillance uniquement),
             et une IP exécutant Apache 2.4.49 avec une CVE connue de
             traversée de chemin. Priorités : corriger Apache, renforcer
             le SPF à -all, configurer DMARC à p=reject. »
```

---

## En Quoi C'est Différent

Les outils OSINT existants vous fournissent des données brutes d'une source à la fois. osint-mcp donne à votre agent IA la capacité de **raisonner sur l'ensemble des sources simultanément**.

<table>
<thead>
<tr>
<th></th>
<th>OSINT traditionnel</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interface</b></td>
<td>12 interfaces web, CLI et API différentes</td>
<td>MCP &mdash; l'agent IA appelle les outils de manière conversationnelle</td>
</tr>
<tr>
<td><b>Sources de données</b></td>
<td>Une plateforme à la fois</td>
<td>12 sources interrogées en parallèle</td>
</tr>
<tr>
<td><b>Énumération de sous-domaines</b></td>
<td>crt.sh OU SecurityTrails OU VirusTotal</td>
<td>L'agent fusionne les trois + HackerTarget, et déduplique</td>
</tr>
<tr>
<td><b>Corrélation</b></td>
<td>Copier-coller manuel entre les onglets</td>
<td>L'agent effectue des recoupements : « Cette IP de Shodan apparaît aussi dans Censys avec un certificat expiré »</td>
</tr>
<tr>
<td><b>Sécurité email</b></td>
<td>Recherches SPF/DMARC/DKIM séparées</td>
<td>Analyse combinée avec score de risque et recommandations actionnables</td>
</tr>
<tr>
<td><b>Infrastructure</b></td>
<td>GeoIP + BGP + WHOIS séparément</td>
<td>L'agent cartographie l'infrastructure complète : ASN, préfixes, géolocalisation, propriété</td>
</tr>
<tr>
<td><b>Clés API</b></td>
<td>Requises pour pratiquement tout</td>
<td>21 outils fonctionnent gratuitement, 16 de plus avec des clés API optionnelles</td>
</tr>
<tr>
<td><b>Installation</b></td>
<td>Installer chaque outil, gérer chaque configuration</td>
<td><code>npx osint-mcp</code> &mdash; une commande, zéro configuration</td>
</tr>
</tbody>
</table>

---

## Démarrage Rapide

### Option 1 : npx (sans installation)

```bash
npx osint-mcp
```

21 outils OSINT publics fonctionnent immédiatement. Aucune clé API requise.

### Option 2 : Cloner le dépôt

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Variables d'environnement (optionnelles)

```bash
# Sources OSINT premium — toutes optionnelles
export SHODAN_API_KEY=your-key           # Active 4 outils Shodan
export VT_API_KEY=your-key               # Active 4 outils VirusTotal
export ST_API_KEY=your-key               # Active 3 outils SecurityTrails
export CENSYS_API_ID=your-id             # Active 3 outils Censys
export CENSYS_API_SECRET=your-secret     # Requis avec CENSYS_API_ID
```

Toutes les clés API premium sont optionnelles. Sans elles, vous disposez toujours de 21 outils couvrant DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget et la découverte de tenants Microsoft 365.

### Connexion à votre agent IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Avec npx
claude mcp add osint-mcp -- npx osint-mcp

# Avec un clone local
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Ajoutez dans `~/Library/Application Support/Claude/claude_desktop_config.json` :

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
<summary><b>Cursor / Windsurf / autres clients MCP</b></summary>

Même format de configuration JSON. Dirigez la commande vers `npx osint-mcp` ou le chemin de votre installation locale.

</details>

### Commencer les requêtes

```
Vous : « Que peux-tu trouver sur example.com ? »
```

C'est tout. L'agent gère automatiquement DNS, WHOIS, sous-domaines, sécurité email et bien plus.

---

## Ce Que l'IA Peut Faire

### Reconnaissance de Domaine

```
Vous : « Fais une reconnaissance complète de target.com »

Agent : → osint_domain_recon {domain: "target.com"}
        → DNS : les enregistrements A pointent vers 3 IP (AWS us-east-1)
        → WHOIS : Enregistré en 2018 via Namecheap, expire en 2026
        → crt.sh : 62 sous-domaines découverts
        → HackerTarget : 31 hôtes avec IP résolues
        → Email : SPF hard-fail, DMARC p=reject, DKIM trouvé (selector1)
        → « target.com est bien configuré pour la sécurité email.
           62 sous-domaines trouvés — notables : staging.target.com,
           admin-portal.target.com, api-v2.target.com.
           L'infrastructure est sur AWS (us-east-1). »
```

### Cartographie de Surface d'Attaque

```
Vous : « Cartographie la surface d'attaque de 203.0.113.50 »

Agent : → shodan_host {ip: "203.0.113.50"}
        → geoip_lookup {ip: "203.0.113.50"}
        → bgp_ip {ip: "203.0.113.50"}
        → whois_ip {ip: "203.0.113.50"}
        → dns_reverse {ip: "203.0.113.50"}
        → « 203.0.113.50 (Hetzner, DE, AS24940)
           Ports ouverts : 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
           Apache 2.4.51, OpenSSH 8.9, reverse proxy nginx sur 8080
           DNS inversé : web1.target.com
           3 CVE connues signalées par Shodan »
```

### Énumération de Sous-domaines (Multi-Sources)

```
Vous : « Trouve tous les sous-domaines de target.com en utilisant toutes les sources disponibles »

Agent : → crtsh_search {domain: "target.com"}              → 62 sous-domaines
        → st_subdomains {domain: "target.com"}              → 84 sous-domaines
        → vt_subdomains {domain: "target.com"}              → 41 sous-domaines
        → hackertarget_hostsearch {domain: "target.com"}    → 31 hôtes
        → dns_wildcard_check {domain: "target.com"}         → Pas de wildcard
        → « 127 sous-domaines uniques après déduplication sur 4 sources.
           Résultats notables : staging.target.com, dev-api.target.com,
           jenkins.target.com (risque d'exposition CI/CD),
           old-admin.target.com (système legacy potentiel) »
```

### Audit de Sécurité Email

```
Vous : « Analyse la posture de sécurité email de target.com »

Agent : → dns_email_security {domain: "target.com"}
        → dns_spf_chain {domain: "target.com"}
        → m365_tenant {domain: "target.com"}
        → « Sécurité email : RISQUE ÉLEVÉ
           SPF : ~all (soft fail — usurpation possible)
           DMARC : p=none (surveillance uniquement — pas d'application)
           DKIM : Trouvé pour selector1 (2048 bits, correct)
           Chaîne SPF : 7 includes, 2 services (Google Workspace, SendGrid)
           M365 : Pas un tenant Microsoft
           Recommandations :
           1. Renforcer le SPF de ~all à -all
           2. Changer DMARC de p=none à p=quarantine, puis p=reject
           3. Ajouter rua= à DMARC pour les rapports agrégés »
```

### Renseignement Historique

```
Vous : « Que faisait tourner target.com il y a 3 ans ? »

Agent : → wayback_urls {domain: "target.com", limit: 500}
        → st_dns_history {domain: "target.com", type: "a"}
        → wayback_snapshots {url: "https://target.com/robots.txt"}
        → « Historique DNS : target.com a migré de 198.51.100.1 (DigitalOcean)
           à 203.0.113.50 (AWS) en 2023.
           Wayback a trouvé 342 URL uniques dont :
           - /admin/ (supprimé en 2024, était accessible)
           - /api/v1/docs (Swagger UI, toujours en cache)
           - /wp-content/ (était WordPress, migré)
           L'ancien robots.txt interdisait /internal/ et /debug/ »
```

---

## Référence des Outils (37 outils)

<details open>
<summary><b>DNS (6) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `dns_lookup` | Résolution des enregistrements A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Résolution DNS inversée (PTR) pour une adresse IP |
| `dns_email_security` | Analyse SPF + DMARC + DKIM avec score de risque et recommandations |
| `dns_spf_chain` | Résolution récursive de la chaîne d'includes SPF avec détection de services |
| `dns_srv_discover` | Découverte de services SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Détection de DNS wildcard via sonde sur un sous-domaine aléatoire |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `whois_domain` | Recherche RDAP de domaine &mdash; registraire, dates, serveurs de noms, contacts |
| `whois_ip` | Recherche RDAP d'IP &mdash; nom réseau, CIDR, pays, entités |

</details>

<details>
<summary><b>Transparence des Certificats (1) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `crtsh_search` | Recherche dans les journaux CT via crt.sh &mdash; découverte de sous-domaines + détails des certificats |

</details>

<details>
<summary><b>Shodan (4) &mdash; Nécessite SHODAN_API_KEY</b></summary>

| Outil | Description |
|-------|-------------|
| `shodan_host` | Détails IP : ports ouverts, services, bannières, vulnérabilités, OS, ASN |
| `shodan_search` | Recherche en langage Shodan (ex. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Résolution en masse nom d'hôte vers IP via Shodan |
| `shodan_exploits` | Recherche dans la base d'exploits publics (PoC, modules Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Nécessite VT_API_KEY</b></summary>

| Outil | Description |
|-------|-------------|
| `vt_domain` | Réputation de domaine, statistiques de détection, catégories, enregistrements DNS |
| `vt_ip` | Réputation d'IP, statistiques de détection, ASN, réseau |
| `vt_subdomains` | Énumération de sous-domaines via VirusTotal |
| `vt_url` | Analyse d'URL + détection de malwares/hameçonnage |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Nécessite ST_API_KEY</b></summary>

| Outil | Description |
|-------|-------------|
| `st_subdomains` | Énumération de sous-domaines (retourne les FQDN) |
| `st_dns_history` | Historique des enregistrements DNS avec dates de première/dernière observation |
| `st_whois` | WHOIS enrichi avec contacts propriétaire/administrateur/technique |

</details>

<details>
<summary><b>Censys (3) &mdash; Nécessite CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Outil | Description |
|-------|-------------|
| `censys_hosts` | Recherche d'hôtes &mdash; IP, services, ports, localisation, ASN |
| `censys_host_details` | Détails complets d'un hôte avec tous les services |
| `censys_certificates` | Recherche de certificats par domaine, empreinte, émetteur |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `geoip_lookup` | Géolocalisation IP : pays, ville, FAI, ASN, détection proxy/hébergement/VPN |
| `geoip_batch` | Géolocalisation IP par lot (jusqu'à 100 IP simultanément) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `bgp_asn` | Détails ASN + tous les préfixes IPv4/IPv6 annoncés |
| `bgp_ip` | Recherche de routage préfixe/ASN d'une IP avec allocation RIR |
| `bgp_prefix` | Détails de préfixe + ASN annonçants |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `wayback_urls` | Découverte d'URL archivées &mdash; anciens endpoints, chemins cachés, contenu supprimé |
| `wayback_snapshots` | Historique des instantanés avec horodatages et liens directs vers l'archive |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `hackertarget_hostsearch` | Découverte d'hôtes/sous-domaines avec IP résolues |
| `hackertarget_reverseip` | Recherche IP inversée &mdash; trouver tous les domaines sur une IP |
| `hackertarget_aslookup` | Recherche d'informations ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `m365_tenant` | Découverte de tenant M365 : identifiant, région et configuration OpenID |
| `m365_userrealm` | Détection du type d'authentification (géré/fédéré), marque de fédération, endpoints d'auth |

</details>

<details>
<summary><b>Méta (2) &mdash; Sans clé API</b></summary>

| Outil | Description |
|-------|-------------|
| `osint_list_sources` | Liste de toutes les sources OSINT, statut des clés API et nombre d'outils |
| `osint_domain_recon` | Reconnaissance rapide combinant toutes les sources gratuites (DNS + WHOIS + crt.sh + HackerTarget + sécurité email) |

</details>

---

## Sources de Données (12)

| Source | Auth | Limite de débit | Ce qu'elle fournit |
|--------|------|-----------------|-------------------|
| [DNS](https://nodejs.org/api/dns.html) | Aucune | Aucune | Enregistrements A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Aucune | 1 req/s | Données WHOIS de domaine et IP (registraire, dates, contacts, CIDR) |
| [crt.sh](https://crt.sh/) | Aucune | 0,5 req/s | Journaux de transparence des certificats, découverte de sous-domaines |
| [ip-api.com](http://ip-api.com/) | Aucune | 45 req/min | Géolocalisation IP, FAI, ASN, détection proxy/VPN/hébergement |
| [BGPView](https://bgpview.io/) | Aucune | 0,5 req/s | Détails ASN, préfixes annoncés, informations de routage IP |
| [HackerTarget](https://hackertarget.com/) | Aucune | 2 req/s | Recherche d'hôtes, IP inversée, recherche ASN (50/jour gratuit) |
| [Wayback Machine](https://web.archive.org/) | Aucune | 1 req/s | URL archivées, historique des instantanés, contenu historique |
| [Microsoft 365](https://login.microsoftonline.com/) | Aucune | Aucune | Découverte de tenants, détection de fédération, type d'authentification |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Scan Internet global des ports/services/bannières |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Réputation domaine/IP/URL, détection de malwares |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | Historique DNS, énumération de sous-domaines, WHOIS enrichi |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Recherche d'hôtes, transparence des certificats, découverte de services |

---

## Architecture

```
src/
├── index.ts                    Point d'entrée, config env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 définitions d'outils (schémas Zod)
│   └── mcp-server.ts           Serveur MCP + transport stdio
├── dns/
│   └── index.ts                6 fonctions — lookup, reverse, email, chaîne SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 fonctions — domaine RDAP, IP RDAP
├── crtsh/
│   └── index.ts                Recherche CT logs avec déduplication + cache
├── shodan/
│   └── index.ts                Host, search, résolution DNS, exploits
├── virustotal/
│   └── index.ts                Domaine, IP, sous-domaines, scan URL
├── securitytrails/
│   └── index.ts                Sous-domaines, historique DNS, WHOIS
├── censys/
│   └── index.ts                Recherche d'hôtes, détails d'hôte, certificats
├── geoip/
│   └── index.ts                Géolocalisation IP unitaire + par lot
├── bgp/
│   └── index.ts                ASN, préfixe IP, détails de préfixe
├── wayback/
│   └── index.ts                Recherche d'URL + historique des instantanés
├── hackertarget/
│   └── index.ts                Recherche d'hôtes, IP inversée, ASN
├── m365/
│   └── index.ts                Découverte de tenant, realm utilisateur/fédération
├── meta/
│   ├── sources.ts              Vérification de disponibilité des sources
│   └── recon.ts                Reconnaissance combinée sur sources gratuites
└── utils/
    ├── rate-limiter.ts          Limiteur de débit basé sur une file d'attente
    ├── cache.ts                 Cache générique avec TTL
    └── require-key.ts           Fonction utilitaire de validation de clé API
```

**Décisions de conception :**

- **12 fournisseurs, 1 serveur** &mdash; Chaque source OSINT est un module indépendant. L'agent choisit les outils à utiliser en fonction de la requête.
- **21 outils gratuits** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget et M365 fonctionnent sans aucune clé API. Les sources premium sont additives.
- **Requêtes parallèles** &mdash; `osint_domain_recon` appelle 8 sources via `Promise.allSettled`. Si une source expire, les autres renvoient quand même leurs données.
- **Limiteurs de débit par fournisseur** &mdash; Chaque source de données possède sa propre instance de `RateLimiter` calibrée sur les limites de son API. Pas de goulot d'étranglement partagé.
- **Cache avec TTL** &mdash; Les résultats de crt.sh (15 min), BGP (30 min), Shodan (5 min), VirusTotal (10 min) sont mis en cache pour éviter les appels API redondants lors de flux multi-outils.
- **Dégradation gracieuse** &mdash; Les clés API manquantes ne font pas planter le serveur. Les outils renvoient des messages d'erreur descriptifs : « Définissez SHODAN_API_KEY pour activer les outils Shodan. »
- **Analyse de la chaîne SPF** &mdash; Résolution récursive des includes avec détection de boucles, identification des services (Google Workspace, Microsoft 365, SendGrid, etc.) et vérification de la limite de recherches selon la RFC 7208.
- **2 dépendances** &mdash; `@modelcontextprotocol/sdk` et `zod`. Tout le HTTP via le `fetch` natif. Tout le DNS via `node:dns/promises`.

---

## Limitations

- Les limites de débit des offres gratuites s'appliquent : HackerTarget (50/jour), ip-api.com (45/min), VirusTotal communautaire (4/min)
- crt.sh peut être lent pour les domaines volumineux (timeout de 30 secondes appliqué)
- ip-api.com nécessite HTTP (pas HTTPS) pour l'offre gratuite
- L'API CDX de Wayback Machine peut expirer pour les domaines très populaires
- Le WHOIS via RDAP ne couvre pas tous les TLD (certains registraires ne prennent pas encore en charge RDAP)
- Testé sur macOS / Linux (Windows non testé)

---

## Suite MCP de Sécurité

| Projet | Domaine | Outils |
|--------|---------|--------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Tests de sécurité via navigateur | 39 outils, Firefox, tests d'injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Sécurité cloud (AWS/Azure/GCP) | 38 outils, 60+ vérifications |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Posture de sécurité GitHub | 39 outils, 45 vérifications |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Renseignement sur les vulnérabilités | 23 outils, 5 sources |
| **osint-mcp** | **OSINT et reconnaissance** | **37 outils, 12 sources** |

---

<p align="center">
<b>Pour les tests de sécurité et évaluations autorisés uniquement.</b><br>
Assurez-vous toujours de disposer d'une autorisation appropriée avant d'effectuer une reconnaissance sur une cible.
</p>

<p align="center">
  <a href="LICENSE">Licence MIT</a> &bull; Construit avec Bun + TypeScript
</p>
