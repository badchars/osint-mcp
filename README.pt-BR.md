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
  <a href="README.no.md">Norsk</a> |
  <strong>Português (Brasil)</strong> |
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

<h3 align="center">Inteligência OSINT e reconhecimento para agentes de IA.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; unificados em um único servidor MCP.<br>
  Seu agente de IA obtém <b>OSINT de espectro completo sob demanda</b>, não 12 abas de navegador e correlação manual.
</p>

<br>

<p align="center">
  <a href="#o-problema">O Problema</a> &bull;
  <a href="#como-é-diferente">Como É Diferente</a> &bull;
  <a href="#início-rápido">Início Rápido</a> &bull;
  <a href="#o-que-a-ia-pode-fazer">O Que A IA Pode Fazer</a> &bull;
  <a href="#referência-de-ferramentas-37-ferramentas">Ferramentas (37)</a> &bull;
  <a href="#fontes-de-dados-12">Fontes de Dados</a> &bull;
  <a href="#arquitetura">Arquitetura</a>
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

## O Problema

A coleta de OSINT é o primeiro passo de cada teste de penetração, bug bounty e avaliação de ameaças. Os dados que você precisa estão espalhados por uma dúzia de plataformas &mdash; cada uma com sua própria API, sua própria autenticação, seus próprios limites de taxa, seu próprio formato de saída. Hoje você abre o Shodan em uma aba, o VirusTotal em outra, executa `dig` em um terminal, copia e cola do WHOIS, muda para o crt.sh para certificados e depois passa 30 minutos correlacionando tudo manualmente.

```
Fluxo de trabalho OSINT tradicional:
  resolver registros DNS            →  dig / nslookup CLI
  verificar registro WHOIS          →  whois CLI ou ferramenta web
  enumerar subdomínios              →  crt.sh + SecurityTrails + VirusTotal (3 UIs diferentes)
  escanear portas/serviços abertos  →  interface web do Shodan
  verificar reputação de domínio    →  interface web do VirusTotal
  mapear infraestrutura de IP       →  Censys + consultas BGP
  encontrar páginas arquivadas      →  UI web do Wayback Machine
  verificar segurança de e-mail     →  consultas manuais de MX/SPF/DMARC
  correlacionar tudo                →  copiar e colar em uma planilha
  ─────────────────────────────────
  Total: 45+ minutos por alvo, a maior parte trocando de contexto
```

**osint-mcp** dá ao seu agente de IA 37 ferramentas em 12 fontes de dados através do [Model Context Protocol](https://modelcontextprotocol.io). O agente consulta todas as fontes em paralelo, correlaciona dados, identifica riscos e apresenta um quadro de inteligência unificado &mdash; em uma única conversa.

```
Com osint-mcp:
  Você: "Faça um reconhecimento completo em target.com"

  Agente: → DNS: 4 registros A, 3 MX (Google Workspace), 2 NS
          → WHOIS: Registrado em 2019, expira em 2025, GoDaddy
          → crt.sh: 47 subdomínios únicos dos logs de CT
          → HackerTarget: 23 hosts com IPs
          → Email: SPF soft-fail (~all), DMARC p=none, sem DKIM
          → Shodan: 3 IPs, 12 portas abertas, Apache 2.4.49 (CVE-2021-41773)
          → VirusTotal: Reputação limpa, 0 detecções
          → "target.com tem 47 subdomínios, segurança de e-mail fraca
             (SPF soft-fail, DMARC apenas monitorando), e um IP
             rodando Apache 2.4.49 com uma CVE conhecida de path traversal.
             Prioridade: corrigir Apache, atualizar SPF para -all, configurar DMARC para p=reject."
```

---

## Como É Diferente

Ferramentas OSINT existentes fornecem dados brutos de uma fonte por vez. osint-mcp dá ao seu agente de IA a capacidade de **raciocinar sobre todas as fontes simultaneamente**.

<table>
<thead>
<tr>
<th></th>
<th>OSINT Tradicional</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interface</b></td>
<td>12 UIs web diferentes, CLIs e APIs</td>
<td>MCP &mdash; Agente de IA chama ferramentas conversacionalmente</td>
</tr>
<tr>
<td><b>Fontes de dados</b></td>
<td>Uma plataforma por vez</td>
<td>12 fontes consultadas em paralelo</td>
</tr>
<tr>
<td><b>Enum de subdomínios</b></td>
<td>crt.sh OU SecurityTrails OU VirusTotal</td>
<td>Agente mescla todos os três + HackerTarget, deduplica</td>
</tr>
<tr>
<td><b>Correlação</b></td>
<td>Cópia e cola manual entre abas</td>
<td>Agente faz referências cruzadas: "Este IP do Shodan também aparece no Censys com certificado expirado"</td>
</tr>
<tr>
<td><b>Segurança de e-mail</b></td>
<td>Consultas separadas de SPF/DMARC/DKIM</td>
<td>Análise combinada com pontuação de risco e recomendações acionáveis</td>
</tr>
<tr>
<td><b>Infraestrutura</b></td>
<td>GeoIP + BGP + WHOIS separadamente</td>
<td>Agente mapeia infraestrutura completa: ASN, prefixos, geolocalização, propriedade</td>
</tr>
<tr>
<td><b>Chaves de API</b></td>
<td>Necessárias para quase tudo</td>
<td>21 ferramentas funcionam gratuitamente, 16 mais com chaves de API opcionais</td>
</tr>
<tr>
<td><b>Configuração</b></td>
<td>Instalar cada ferramenta, gerenciar cada config</td>
<td><code>npx osint-mcp</code> &mdash; um comando, zero configuração</td>
</tr>
</tbody>
</table>

---

## Início Rápido

### Opção 1: npx (sem instalação)

```bash
npx osint-mcp
```

21 ferramentas OSINT públicas funcionam imediatamente. Nenhuma chave de API necessária.

### Opção 2: Clonar

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Variáveis de ambiente (opcional)

```bash
# Fontes OSINT premium — todas opcionais
export SHODAN_API_KEY=sua-chave           # Habilita 4 ferramentas do Shodan
export VT_API_KEY=sua-chave               # Habilita 4 ferramentas do VirusTotal
export ST_API_KEY=sua-chave               # Habilita 3 ferramentas do SecurityTrails
export CENSYS_API_ID=seu-id               # Habilita 3 ferramentas do Censys
export CENSYS_API_SECRET=seu-secret       # Necessário com CENSYS_API_ID
```

Todas as chaves de API premium são opcionais. Sem elas, você ainda tem 21 ferramentas cobrindo DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget e descoberta de tenant do Microsoft 365.

### Conectar ao seu agente de IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Com npx
claude mcp add osint-mcp -- npx osint-mcp

# Com clone local
claude mcp add osint-mcp -- bun run /caminho/para/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Adicione ao `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / outros clientes MCP</b></summary>

Mesmo formato de configuração JSON. Aponte o comando para `npx osint-mcp` ou seu caminho de instalação local.

</details>

### Comece a consultar

```
Você: "O que você pode encontrar sobre example.com?"
```

Pronto. O agente lida com DNS, WHOIS, subdomínios, segurança de e-mail e muito mais automaticamente.

---

## O Que A IA Pode Fazer

### Reconhecimento de Domínio

```
Você: "Faça um reconhecimento completo em target.com"

Agente: → osint_domain_recon {domain: "target.com"}
        → DNS: Registros A apontam para 3 IPs (AWS us-east-1)
        → WHOIS: Registrado em 2018 via Namecheap, expira em 2026
        → crt.sh: 62 subdomínios descobertos
        → HackerTarget: 31 hosts com IPs resolvidos
        → Email: SPF hard-fail, DMARC p=reject, DKIM encontrado (selector1)
        → "target.com está bem configurado para segurança de e-mail.
           62 subdomínios encontrados — notáveis: staging.target.com,
           admin-portal.target.com, api-v2.target.com.
           A infraestrutura está na AWS (us-east-1)."
```

### Mapeamento de Superfície de Ataque

```
Você: "Mapeie a superfície de ataque para 203.0.113.50"

Agente: → shodan_host {ip: "203.0.113.50"}
        → geoip_lookup {ip: "203.0.113.50"}
        → bgp_ip {ip: "203.0.113.50"}
        → whois_ip {ip: "203.0.113.50"}
        → dns_reverse {ip: "203.0.113.50"}
        → "203.0.113.50 (Hetzner, DE, AS24940)
           Portas abertas: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
           Apache 2.4.51, OpenSSH 8.9, proxy reverso nginx na 8080
           DNS reverso: web1.target.com
           3 CVEs conhecidas sinalizadas pelo Shodan"
```

### Enumeração de Subdomínios (Múltiplas Fontes)

```
Você: "Encontre todos os subdomínios de target.com usando todas as fontes disponíveis"

Agente: → crtsh_search {domain: "target.com"}              → 62 subdomínios
        → st_subdomains {domain: "target.com"}              → 84 subdomínios
        → vt_subdomains {domain: "target.com"}              → 41 subdomínios
        → hackertarget_hostsearch {domain: "target.com"}    → 31 hosts
        → dns_wildcard_check {domain: "target.com"}         → Sem wildcard
        → "127 subdomínios únicos após deduplicação entre 4 fontes.
           Descobertas notáveis: staging.target.com, dev-api.target.com,
           jenkins.target.com (risco de exposição de CI/CD),
           old-admin.target.com (potencial sistema legado)"
```

### Auditoria de Segurança de E-mail

```
Você: "Analise a postura de segurança de e-mail de target.com"

Agente: → dns_email_security {domain: "target.com"}
        → dns_spf_chain {domain: "target.com"}
        → m365_tenant {domain: "target.com"}
        → "Segurança de E-mail: ALTO RISCO
           SPF: ~all (soft fail — falsificável)
           DMARC: p=none (apenas monitorando — não forçando)
           DKIM: Encontrado para selector1 (2048-bit, bom)
           Cadeia SPF: 7 includes, 2 serviços (Google Workspace, SendGrid)
           M365: Não é um tenant Microsoft
           Recomendações:
           1. Atualizar SPF de ~all para -all
           2. Alterar DMARC de p=none para p=quarantine, depois p=reject
           3. Adicionar rua= ao DMARC para relatórios agregados"
```

### Inteligência Histórica

```
Você: "O que target.com estava rodando há 3 anos?"

Agente: → wayback_urls {domain: "target.com", limit: 500}
        → st_dns_history {domain: "target.com", type: "a"}
        → wayback_snapshots {url: "https://target.com/robots.txt"}
        → "Histórico DNS: target.com mudou de 198.51.100.1 (DigitalOcean)
           para 203.0.113.50 (AWS) em 2023.
           Wayback encontrou 342 URLs únicas incluindo:
           - /admin/ (removido em 2024, estava acessível)
           - /api/v1/docs (Swagger UI, ainda em cache)
           - /wp-content/ (era WordPress, migrado)
           Antigo robots.txt desautorizava /internal/ e /debug/"
```

---

## Referência de Ferramentas (37 ferramentas)

<details open>
<summary><b>DNS (6) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `dns_lookup` | Resolver registros A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Consulta de DNS reverso (PTR) para um endereço IP |
| `dns_email_security` | Análise de SPF + DMARC + DKIM com pontuação de risco e recomendações |
| `dns_spf_chain` | Resolução recursiva da cadeia de includes do SPF com detecção de serviços |
| `dns_srv_discover` | Descoberta de serviços SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, etc.) |
| `dns_wildcard_check` | Detecção de DNS wildcard via sonda de subdomínio aleatório |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `whois_domain` | Consulta RDAP de domínio &mdash; registrador, datas, nameservers, contatos |
| `whois_ip` | Consulta RDAP de IP &mdash; nome de rede, CIDR, país, entidades |

</details>

<details>
<summary><b>Transparência de Certificados (1) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `crtsh_search` | Buscar logs de CT via crt.sh &mdash; descoberta de subdomínios + detalhes de certificados |

</details>

<details>
<summary><b>Shodan (4) &mdash; Requer SHODAN_API_KEY</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `shodan_host` | Detalhes de IP: portas abertas, serviços, banners, vulnerabilidades, OS, ASN |
| `shodan_search` | Buscar linguagem de consulta do Shodan (ex. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Resolução em massa de hostname para IP via Shodan |
| `shodan_exploits` | Buscar banco de dados público de exploits (PoC, módulos Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Requer VT_API_KEY</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `vt_domain` | Reputação de domínio, estatísticas de detecção, categorias, registros DNS |
| `vt_ip` | Reputação de IP, estatísticas de detecção, ASN, rede |
| `vt_subdomains` | Enumeração de subdomínios via VirusTotal |
| `vt_url` | Escaneamento de URL + análise de malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Requer ST_API_KEY</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `st_subdomains` | Enumeração de subdomínios (retorna FQDNs) |
| `st_dns_history` | Registros DNS históricos com datas de primeira/última visualização |
| `st_whois` | WHOIS aprimorado com contatos de registrante/admin/técnico |

</details>

<details>
<summary><b>Censys (3) &mdash; Requer CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `censys_hosts` | Busca de host &mdash; IPs, serviços, portas, localização, ASN |
| `censys_host_details` | Detalhes completos de um único host com todos os serviços |
| `censys_certificates` | Busca de certificados por domínio, impressão digital, emissor |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `geoip_lookup` | Geolocalização de IP: país, cidade, ISP, ASN, detecção de proxy/hospedagem/VPN |
| `geoip_batch` | Geolocalização de IPs em massa (até 100 IPs de uma vez) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `bgp_asn` | Detalhes de ASN + todos os prefixos IPv4/IPv6 anunciados |
| `bgp_ip` | Consulta de roteamento de prefixo/ASN de IP com alocação RIR |
| `bgp_prefix` | Detalhes de prefixo + ASNs que anunciam |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `wayback_urls` | Descoberta de URLs arquivadas &mdash; encontrar endpoints antigos, caminhos ocultos, conteúdo removido |
| `wayback_snapshots` | Histórico de snapshots com timestamps e links diretos para arquivo |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `hackertarget_hostsearch` | Descoberta de host/subdomínio com IPs resolvidos |
| `hackertarget_reverseip` | Consulta de IP reverso &mdash; encontrar todos os domínios em um IP |
| `hackertarget_aslookup` | Consulta de informações de ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `m365_tenant` | Descobrir ID de tenant M365, região e configuração OpenID |
| `m365_userrealm` | Detectar tipo de autenticação (Gerenciada/Federada), marca de federação, endpoints de autenticação |

</details>

<details>
<summary><b>Meta (2) &mdash; Sem chave de API</b></summary>

| Ferramenta | Descrição |
|------|-------------|
| `osint_list_sources` | Listar todas as fontes OSINT, status de chave de API e contagens de ferramentas |
| `osint_domain_recon` | Reconhecimento rápido combinando todas as fontes gratuitas (DNS + WHOIS + crt.sh + HackerTarget + segurança de e-mail) |

</details>

---

## Fontes de Dados (12)

| Fonte | Autenticação | Limite de Taxa | O que fornece |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Nenhuma | Nenhum | Registros A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Nenhuma | 1 req/s | Dados WHOIS de domínio e IP (registrador, datas, contatos, CIDR) |
| [crt.sh](https://crt.sh/) | Nenhuma | 0,5 req/s | Logs de Transparência de Certificados, descoberta de subdomínios |
| [ip-api.com](http://ip-api.com/) | Nenhuma | 45 req/min | Geolocalização de IP, ISP, ASN, detecção de proxy/VPN/hospedagem |
| [BGPView](https://bgpview.io/) | Nenhuma | 0,5 req/s | Detalhes de ASN, prefixos anunciados, informações de roteamento IP |
| [HackerTarget](https://hackertarget.com/) | Nenhuma | 2 req/s | Busca de host, IP reverso, consulta de ASN (50/dia gratuito) |
| [Wayback Machine](https://web.archive.org/) | Nenhuma | 1 req/s | URLs arquivadas, histórico de snapshots, conteúdo histórico |
| [Microsoft 365](https://login.microsoftonline.com/) | Nenhuma | Nenhum | Descoberta de tenant, detecção de federação, tipo de autenticação |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Escaneamento de portas/serviços/banners em toda a Internet |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | Reputação de domínio/IP/URL, detecção de malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | Histórico DNS, enumeração de subdomínios, WHOIS aprimorado |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Busca de host, transparência de certificados, descoberta de serviços |

---

## Arquitetura

```
src/
├── index.ts                    Ponto de entrada, config de env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 definições de ferramentas (schemas Zod)
│   └── mcp-server.ts           Servidor MCP + transporte stdio
├── dns/
│   └── index.ts                6 funções — lookup, reverse, email, cadeia SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 funções — RDAP de domínio, RDAP de IP
├── crtsh/
│   └── index.ts                Busca de log de CT com dedup + cache
├── shodan/
│   └── index.ts                Host, busca, resolução DNS, exploits
├── virustotal/
│   └── index.ts                Domínio, IP, subdomínios, escaneamento de URL
├── securitytrails/
│   └── index.ts                Subdomínios, histórico DNS, WHOIS
├── censys/
│   └── index.ts                Busca de host, detalhes de host, certificados
├── geoip/
│   └── index.ts                Geolocalização única + em massa de IP
├── bgp/
│   └── index.ts                ASN, prefixo IP, detalhes de prefixo
├── wayback/
│   └── index.ts                Busca de URL + histórico de snapshots
├── hackertarget/
│   └── index.ts                Busca de host, IP reverso, ASN
├── m365/
│   └── index.ts                Descoberta de tenant, realm de usuário/federação
├── meta/
│   ├── sources.ts              Verificação de disponibilidade de fonte
│   └── recon.ts                Reconhecimento de domínio combinado de fontes gratuitas
└── utils/
    ├── rate-limiter.ts          Limitador de taxa baseado em fila
    ├── cache.ts                 Cache TTL genérico
    └── require-key.ts           Helper de validação de chave de API
```

**Decisões de design:**

- **12 provedores, 1 servidor** &mdash; Cada fonte OSINT é um módulo independente. O agente escolhe quais ferramentas usar com base na consulta.
- **21 ferramentas gratuitas** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget e M365 funcionam sem nenhuma chave de API. Fontes premium são aditivas.
- **Consultas paralelas** &mdash; `osint_domain_recon` chama 8 fontes via `Promise.allSettled`. Se uma fonte expirar, as outras ainda retornam dados.
- **Limitadores de taxa por provedor** &mdash; Cada fonte de dados tem sua própria instância de `RateLimiter` calibrada para os limites daquela API. Sem gargalo compartilhado.
- **Cache TTL** &mdash; Resultados de crt.sh (15min), BGP (30min), Shodan (5min), VirusTotal (10min) são armazenados em cache para evitar chamadas de API redundantes durante fluxos de trabalho com múltiplas ferramentas.
- **Degradação graciosa** &mdash; Chaves de API ausentes não quebram o servidor. Ferramentas retornam mensagens de erro descritivas: "Configure SHODAN_API_KEY para habilitar ferramentas do Shodan."
- **Análise de cadeia SPF** &mdash; Resolução recursiva de includes com detecção de loop, identificação de serviços (Google Workspace, Microsoft 365, SendGrid, etc.) e verificação de limite de consultas RFC 7208.
- **2 dependências** &mdash; `@modelcontextprotocol/sdk` e `zod`. Todo HTTP via `fetch` nativo. Todo DNS via `node:dns/promises`.

---

## Limitações

- Limites de taxa de tier gratuito se aplicam: HackerTarget (50/dia), ip-api.com (45/min), VirusTotal community (4/min)
- crt.sh pode ser lento para domínios grandes (timeout de 30s aplicado)
- ip-api.com requer HTTP (não HTTPS) para tier gratuito
- API CDX do Wayback Machine pode expirar para domínios muito populares
- WHOIS via RDAP pode não cobrir todos os TLDs (alguns registradores ainda não suportam RDAP)
- macOS / Linux testados (Windows não testado)

---

## Parte da Suíte de Segurança MCP

| Projeto | Domínio | Ferramentas |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Testes de segurança baseados em navegador | 39 ferramentas, Firefox, testes de injeção |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Segurança em nuvem (AWS/Azure/GCP) | 38 ferramentas, 60+ verificações |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura de segurança do GitHub | 39 ferramentas, 45 verificações |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Inteligência de vulnerabilidades | 23 ferramentas, 5 fontes |
| **osint-mcp** | **OSINT e reconhecimento** | **37 ferramentas, 12 fontes** |

---

<p align="center">
<b>Apenas para testes e avaliações de segurança autorizados.</b><br>
Sempre certifique-se de ter autorização adequada antes de realizar reconhecimento em qualquer alvo.
</p>

<p align="center">
  <a href="LICENSE">Licença MIT</a> &bull; Construído com Bun + TypeScript
</p>
