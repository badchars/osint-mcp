<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <strong>Español</strong> |
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

<h3 align="center">Inteligencia OSINT y reconocimiento para agentes de IA.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; unificados en un solo servidor MCP.<br>
  Tu agente de IA obtiene <b>OSINT de espectro completo bajo demanda</b>, no 12 pestañas del navegador y correlación manual.
</p>

<br>

<p align="center">
  <a href="#el-problema">El Problema</a> &bull;
  <a href="#cómo-es-diferente">Cómo es Diferente</a> &bull;
  <a href="#inicio-rápido">Inicio Rápido</a> &bull;
  <a href="#qué-puede-hacer-la-ia">Qué Puede Hacer la IA</a> &bull;
  <a href="#referencia-de-herramientas-37-herramientas">Herramientas (37)</a> &bull;
  <a href="#fuentes-de-datos-12">Fuentes de Datos</a> &bull;
  <a href="#arquitectura">Arquitectura</a>
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

## El Problema

La recopilación OSINT es el primer paso de cada prueba de penetración, bug bounty y evaluación de amenazas. Los datos que necesitas están dispersos en una docena de plataformas &mdash; cada una con su propia API, su propia autenticación, sus propios límites de velocidad, su propio formato de salida. Hoy abres Shodan en una pestaña, VirusTotal en otra, ejecutas `dig` en una terminal, copias y pegas desde WHOIS, cambias a crt.sh para certificados, y luego pasas 30 minutos correlacionando todo manualmente.

```
Flujo de trabajo OSINT tradicional:
  resolver registros DNS            →  CLI dig / nslookup
  verificar registro WHOIS          →  CLI whois o herramienta web
  enumerar subdominios              →  crt.sh + SecurityTrails + VirusTotal (3 UI diferentes)
  escanear puertos/servicios        →  interfaz web de Shodan
  verificar reputación de dominio   →  interfaz web de VirusTotal
  mapear infraestructura IP         →  Censys + búsquedas BGP
  encontrar páginas archivadas      →  UI web de Wayback Machine
  verificar seguridad de correo     →  búsquedas manuales MX/SPF/DMARC
  correlacionar todo                →  copiar-pegar en una hoja de cálculo
  ─────────────────────────────────────
  Total: 45+ minutos por objetivo, la mayoría cambiando de contexto
```

**osint-mcp-server** proporciona a tu agente de IA 37 herramientas a través de 12 fuentes de datos mediante el [Model Context Protocol](https://modelcontextprotocol.io). El agente consulta todas las fuentes en paralelo, correlaciona datos, identifica riesgos y presenta una imagen de inteligencia unificada &mdash; en una sola conversación.

```
Con osint-mcp-server:
  Tú: "Haz un reconocimiento completo de target.com"

  Agente: → DNS: 4 registros A, 3 MX (Google Workspace), 2 NS
          → WHOIS: Registrado en 2019, expira en 2025, GoDaddy
          → crt.sh: 47 subdominios únicos de registros CT
          → HackerTarget: 23 hosts con IPs
          → Email: SPF soft-fail (~all), DMARC p=none, sin DKIM
          → Shodan: 3 IPs, 12 puertos abiertos, Apache 2.4.49 (CVE-2021-41773)
          → VirusTotal: Reputación limpia, 0 detecciones
          → "target.com tiene 47 subdominios, seguridad de correo débil
             (SPF soft-fail, DMARC solo monitoreo), y una IP
             ejecutando Apache 2.4.49 con un CVE conocido de path traversal.
             Prioridad: parchear Apache, actualizar SPF a -all, establecer DMARC a p=reject."
```

---

## Cómo es Diferente

Las herramientas OSINT existentes te proporcionan datos crudos de una fuente a la vez. osint-mcp-server le da a tu agente de IA la capacidad de **razonar a través de todas las fuentes simultáneamente**.

<table>
<thead>
<tr>
<th></th>
<th>OSINT Tradicional</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interfaz</b></td>
<td>12 UI web, CLIs y APIs diferentes</td>
<td>MCP &mdash; El agente de IA llama herramientas conversacionalmente</td>
</tr>
<tr>
<td><b>Fuentes de datos</b></td>
<td>Una plataforma a la vez</td>
<td>12 fuentes consultadas en paralelo</td>
</tr>
<tr>
<td><b>Enum de subdominios</b></td>
<td>crt.sh O SecurityTrails O VirusTotal</td>
<td>El agente fusiona las tres + HackerTarget, deduplica</td>
</tr>
<tr>
<td><b>Correlación</b></td>
<td>Copiar-pegar manual entre pestañas</td>
<td>El agente cruza referencias: "Esta IP de Shodan también aparece en Censys con cert expirado"</td>
</tr>
<tr>
<td><b>Seguridad de correo</b></td>
<td>Búsquedas separadas de SPF/DMARC/DKIM</td>
<td>Análisis combinado con puntuación de riesgo y recomendaciones accionables</td>
</tr>
<tr>
<td><b>Infraestructura</b></td>
<td>GeoIP + BGP + WHOIS por separado</td>
<td>El agente mapea la infraestructura completa: ASN, prefijos, geolocalización, propiedad</td>
</tr>
<tr>
<td><b>Claves API</b></td>
<td>Requeridas para casi todo</td>
<td>21 herramientas funcionan gratis, 16 más con claves API opcionales</td>
</tr>
<tr>
<td><b>Configuración</b></td>
<td>Instalar cada herramienta, gestionar cada config</td>
<td><code>npx osint-mcp-server</code> &mdash; un comando, cero configuración</td>
</tr>
</tbody>
</table>

---

## Inicio Rápido

### Opción 1: npx (sin instalación)

```bash
npx osint-mcp-server
```

21 herramientas OSINT públicas funcionan inmediatamente. No se requieren claves API.

### Opción 2: Clonar

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### Variables de entorno (opcionales)

```bash
# Fuentes OSINT premium — todas opcionales
export SHODAN_API_KEY=your-key           # Habilita 4 herramientas Shodan
export VT_API_KEY=your-key               # Habilita 4 herramientas VirusTotal
export ST_API_KEY=your-key               # Habilita 3 herramientas SecurityTrails
export CENSYS_API_ID=your-id             # Habilita 3 herramientas Censys
export CENSYS_API_SECRET=your-secret     # Requerido con CENSYS_API_ID
```

Todas las claves API premium son opcionales. Sin ellas, aún obtienes 21 herramientas que cubren DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget y descubrimiento de tenants de Microsoft 365.

### Conectar a tu agente de IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Con npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# Con clon local
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Agregar a `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / otros clientes MCP</b></summary>

Mismo formato de configuración JSON. Apunta el comando a `npx osint-mcp-server` o tu ruta de instalación local.

</details>

### Comenzar a consultar

```
Tú: "¿Qué puedes encontrar sobre example.com?"
```

Eso es todo. El agente maneja DNS, WHOIS, subdominios, seguridad de correo y más automáticamente.

---

## Qué Puede Hacer la IA

### Reconocimiento de Dominio

```
Tú: "Haz un reconocimiento completo de target.com"

Agente: → osint_domain_recon {domain: "target.com"}
        → DNS: Registros A apuntan a 3 IPs (AWS us-east-1)
        → WHOIS: Registrado en 2018 vía Namecheap, expira en 2026
        → crt.sh: 62 subdominios descubiertos
        → HackerTarget: 31 hosts con IPs resueltas
        → Email: SPF hard-fail, DMARC p=reject, DKIM encontrado (selector1)
        → "target.com está bien configurado para seguridad de correo.
           62 subdominios encontrados — notables: staging.target.com,
           admin-portal.target.com, api-v2.target.com.
           Infraestructura en AWS (us-east-1)."
```

### Mapeo de Superficie de Ataque

```
Tú: "Mapea la superficie de ataque para 203.0.113.50"

Agente: → shodan_host {ip: "203.0.113.50"}
        → geoip_lookup {ip: "203.0.113.50"}
        → bgp_ip {ip: "203.0.113.50"}
        → whois_ip {ip: "203.0.113.50"}
        → dns_reverse {ip: "203.0.113.50"}
        → "203.0.113.50 (Hetzner, DE, AS24940)
           Puertos abiertos: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
           Apache 2.4.51, OpenSSH 8.9, proxy reverso nginx en 8080
           DNS reverso: web1.target.com
           3 CVEs conocidos señalados por Shodan"
```

### Enumeración de Subdominios (Multi-Fuente)

```
Tú: "Encuentra todos los subdominios de target.com usando todas las fuentes disponibles"

Agente: → crtsh_search {domain: "target.com"}              → 62 subdominios
        → st_subdomains {domain: "target.com"}              → 84 subdominios
        → vt_subdomains {domain: "target.com"}              → 41 subdominios
        → hackertarget_hostsearch {domain: "target.com"}    → 31 hosts
        → dns_wildcard_check {domain: "target.com"}         → Sin wildcard
        → "127 subdominios únicos después de dedup en 4 fuentes.
           Hallazgos notables: staging.target.com, dev-api.target.com,
           jenkins.target.com (riesgo de exposición CI/CD),
           old-admin.target.com (potencial sistema legacy)"
```

### Auditoría de Seguridad de Correo

```
Tú: "Analiza la postura de seguridad de correo de target.com"

Agente: → dns_email_security {domain: "target.com"}
        → dns_spf_chain {domain: "target.com"}
        → m365_tenant {domain: "target.com"}
        → "Seguridad de Correo: RIESGO ALTO
           SPF: ~all (soft fail — falsificable)
           DMARC: p=none (solo monitoreo — no aplicando)
           DKIM: Encontrado para selector1 (2048-bit, bueno)
           Cadena SPF: 7 includes, 2 servicios (Google Workspace, SendGrid)
           M365: No es tenant de Microsoft
           Recomendaciones:
           1. Actualizar SPF de ~all a -all
           2. Cambiar DMARC de p=none a p=quarantine, luego p=reject
           3. Agregar rua= a DMARC para reportes agregados"
```

### Inteligencia Histórica

```
Tú: "¿Qué estaba ejecutando target.com hace 3 años?"

Agente: → wayback_urls {domain: "target.com", limit: 500}
        → st_dns_history {domain: "target.com", type: "a"}
        → wayback_snapshots {url: "https://target.com/robots.txt"}
        → "Historial DNS: target.com se movió de 198.51.100.1 (DigitalOcean)
           a 203.0.113.50 (AWS) en 2023.
           Wayback encontró 342 URLs únicas incluyendo:
           - /admin/ (eliminado en 2024, era accesible)
           - /api/v1/docs (Swagger UI, aún en caché)
           - /wp-content/ (era WordPress, migrado)
           El robots.txt antiguo no permitía /internal/ y /debug/"
```

---

## Referencia de Herramientas (37 herramientas)

<details open>
<summary><b>DNS (6) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `dns_lookup` | Resolver registros A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Búsqueda DNS reversa (PTR) para una dirección IP |
| `dns_email_security` | Análisis SPF + DMARC + DKIM con puntuación de riesgo y recomendaciones |
| `dns_spf_chain` | Resolución recursiva de cadena de inclusión SPF con detección de servicios |
| `dns_srv_discover` | Descubrimiento de servicios SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Detección de DNS wildcard mediante sondeo de subdominio aleatorio |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `whois_domain` | Búsqueda RDAP de dominio &mdash; registrador, fechas, nameservers, contactos |
| `whois_ip` | Búsqueda RDAP de IP &mdash; nombre de red, CIDR, país, entidades |

</details>

<details>
<summary><b>Transparencia de Certificados (1) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `crtsh_search` | Buscar registros CT vía crt.sh &mdash; descubrimiento de subdominios + detalles de certificados |

</details>

<details>
<summary><b>Shodan (4) &mdash; Requiere SHODAN_API_KEY</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `shodan_host` | Detalles de IP: puertos abiertos, servicios, banners, vulnerabilidades, OS, ASN |
| `shodan_search` | Buscar lenguaje de consulta Shodan (ej. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Resolución masiva de hostname-a-IP vía Shodan |
| `shodan_exploits` | Buscar base de datos de exploits públicos (PoC, módulos Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Requiere VT_API_KEY</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `vt_domain` | Reputación de dominio, estadísticas de detección, categorías, registros DNS |
| `vt_ip` | Reputación de IP, estadísticas de detección, ASN, red |
| `vt_subdomains` | Enumeración de subdominios vía VirusTotal |
| `vt_url` | Escaneo de URL + análisis de malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Requiere ST_API_KEY</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `st_subdomains` | Enumeración de subdominios (devuelve FQDNs) |
| `st_dns_history` | Registros DNS históricos con fechas de primera/última aparición |
| `st_whois` | WHOIS mejorado con contactos registrante/admin/técnicos |

</details>

<details>
<summary><b>Censys (3) &mdash; Requiere CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `censys_hosts` | Búsqueda de hosts &mdash; IPs, servicios, puertos, ubicación, ASN |
| `censys_host_details` | Detalles completos de un solo host con todos los servicios |
| `censys_certificates` | Búsqueda de certificados por dominio, huella, emisor |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `geoip_lookup` | Geolocalización de IP: país, ciudad, ISP, ASN, detección proxy/hosting/VPN |
| `geoip_batch` | Geolocalización de IP masiva (hasta 100 IPs a la vez) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `bgp_asn` | Detalles de ASN + todos los prefijos IPv4/IPv6 anunciados |
| `bgp_ip` | Búsqueda de enrutamiento de prefijo/ASN de IP con asignación RIR |
| `bgp_prefix` | Detalles de prefijo + ASNs anunciadores |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `wayback_urls` | Descubrimiento de URLs archivadas &mdash; encontrar endpoints antiguos, rutas ocultas, contenido eliminado |
| `wayback_snapshots` | Historial de snapshots con timestamps y enlaces directos al archivo |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `hackertarget_hostsearch` | Descubrimiento de hosts/subdominios con IPs resueltas |
| `hackertarget_reverseip` | Búsqueda de IP reversa &mdash; encontrar todos los dominios en una IP |
| `hackertarget_aslookup` | Búsqueda de información de ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `m365_tenant` | Descubrir ID de tenant M365, región y configuración OpenID |
| `m365_userrealm` | Detectar tipo de auth (Administrado/Federado), marca de federación, endpoints de auth |

</details>

<details>
<summary><b>Meta (2) &mdash; Sin clave API</b></summary>

| Herramienta | Descripción |
|------|-------------|
| `osint_list_sources` | Listar todas las fuentes OSINT, estado de clave API y conteos de herramientas |
| `osint_domain_recon` | Reconocimiento rápido combinando todas las fuentes gratuitas (DNS + WHOIS + crt.sh + HackerTarget + seguridad de correo) |

</details>

---

## Fuentes de Datos (12)

| Fuente | Auth | Límite de Velocidad | Qué proporciona |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Ninguna | Ninguno | Registros A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Ninguna | 1 req/s | Datos WHOIS de dominio e IP (registrador, fechas, contactos, CIDR) |
| [crt.sh](https://crt.sh/) | Ninguna | 0.5 req/s | Registros de Transparencia de Certificados, descubrimiento de subdominios |
| [ip-api.com](http://ip-api.com/) | Ninguna | 45 req/min | Geolocalización de IP, ISP, ASN, detección proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Ninguna | 0.5 req/s | Detalles de ASN, prefijos anunciados, info de enrutamiento IP |
| [HackerTarget](https://hackertarget.com/) | Ninguna | 2 req/s | Búsqueda de hosts, IP reversa, búsqueda ASN (50/día gratis) |
| [Wayback Machine](https://web.archive.org/) | Ninguna | 1 req/s | URLs archivadas, historial de snapshots, contenido histórico |
| [Microsoft 365](https://login.microsoftonline.com/) | Ninguna | Ninguno | Descubrimiento de tenant, detección de federación, tipo de auth |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Escaneo de puertos/servicios/banners a nivel de Internet |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Reputación de dominio/IP/URL, detección de malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | Historial DNS, enumeración de subdominios, WHOIS mejorado |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Búsqueda de hosts, transparencia de certificados, descubrimiento de servicios |

---

## Arquitectura

```
src/
├── index.ts                    Punto de entrada, config env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 definiciones de herramientas (esquemas Zod)
│   └── mcp-server.ts           Servidor MCP + transporte stdio
├── dns/
│   └── index.ts                6 funciones — lookup, reverse, email, cadena SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 funciones — RDAP de dominio, RDAP de IP
├── crtsh/
│   └── index.ts                Búsqueda de registros CT con dedup + caché
├── shodan/
│   └── index.ts                Host, búsqueda, resolución DNS, exploits
├── virustotal/
│   └── index.ts                Dominio, IP, subdominios, escaneo de URL
├── securitytrails/
│   └── index.ts                Subdominios, historial DNS, WHOIS
├── censys/
│   └── index.ts                Búsqueda de hosts, detalles de host, certificados
├── geoip/
│   └── index.ts                Geolocalización de IP individual + masiva
├── bgp/
│   └── index.ts                ASN, prefijo IP, detalles de prefijo
├── wayback/
│   └── index.ts                Búsqueda de URL + historial de snapshots
├── hackertarget/
│   └── index.ts                Búsqueda de hosts, IP reversa, ASN
├── m365/
│   └── index.ts                Descubrimiento de tenant, user realm/federación
├── meta/
│   ├── sources.ts              Verificación de disponibilidad de fuentes
│   └── recon.ts                Reconocimiento de dominio combinado de fuentes gratuitas
└── utils/
    ├── rate-limiter.ts          Limitador de velocidad basado en cola
    ├── cache.ts                 Caché TTL genérica
    └── require-key.ts           Helper de validación de clave API
```

**Decisiones de diseño:**

- **12 proveedores, 1 servidor** &mdash; Cada fuente OSINT es un módulo independiente. El agente elige qué herramientas usar según la consulta.
- **21 herramientas gratuitas** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget y M365 funcionan sin claves API. Las fuentes premium son aditivas.
- **Consultas paralelas** &mdash; `osint_domain_recon` llama a 8 fuentes vía `Promise.allSettled`. Si una fuente expira, el resto aún devuelve datos.
- **Limitadores de velocidad por proveedor** &mdash; Cada fuente de datos tiene su propia instancia de `RateLimiter` calibrada a los límites de esa API. Sin cuello de botella compartido.
- **Caché TTL** &mdash; Los resultados de crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) se almacenan en caché para evitar llamadas API redundantes durante flujos de trabajo multi-herramienta.
- **Degradación elegante** &mdash; Las claves API faltantes no rompen el servidor. Las herramientas devuelven mensajes de error descriptivos: "Establecer SHODAN_API_KEY para habilitar herramientas Shodan."
- **Análisis de cadena SPF** &mdash; Resolución recursiva de inclusión con detección de bucles, identificación de servicios (Google Workspace, Microsoft 365, SendGrid, etc.) y verificación de límite de búsqueda RFC 7208.
- **2 dependencias** &mdash; `@modelcontextprotocol/sdk` y `zod`. Todo HTTP vía `fetch` nativo. Todo DNS vía `node:dns/promises`.

---

## Limitaciones

- Aplican límites de velocidad de nivel gratuito: HackerTarget (50/día), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh puede ser lento para dominios grandes (timeout de 30s aplicado)
- ip-api.com requiere HTTP (no HTTPS) para nivel gratuito
- La API CDX de Wayback Machine puede expirar para dominios muy populares
- WHOIS vía RDAP puede no cubrir todos los TLDs (algunos registradores aún no soportan RDAP)
- Probado en macOS / Linux (Windows no probado)

---

## Parte de la Suite de Seguridad MCP

| Proyecto | Dominio | Herramientas |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Pruebas de seguridad basadas en navegador | 39 herramientas, Firefox, pruebas de inyección |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Seguridad en la nube (AWS/Azure/GCP) | 38 herramientas, 60+ verificaciones |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura de seguridad de GitHub | 39 herramientas, 45 verificaciones |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Inteligencia de vulnerabilidades | 23 herramientas, 5 fuentes |
| **osint-mcp-server** | **OSINT y reconocimiento** | **37 herramientas, 12 fuentes** |

---

<p align="center">
<b>Solo para pruebas y evaluaciones de seguridad autorizadas.</b><br>
Asegúrate siempre de tener autorización adecuada antes de realizar reconocimiento en cualquier objetivo.
</p>

<p align="center">
  <a href="LICENSE">Licencia MIT</a> &bull; Construido con Bun + TypeScript
</p>
