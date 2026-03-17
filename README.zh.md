<p align="center">
  <a href="README.md">English</a> |
  <strong>简体中文</strong> |
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

<h3 align="center">为 AI 智能体提供开源情报与侦察能力。</h3>

<p align="center">
  Shodan、VirusTotal、Censys、SecurityTrails、DNS、WHOIS、BGP、Wayback Machine &mdash; 统一集成到一个 MCP 服务器中。<br>
  让您的 AI 智能体按需获取<b>全方位开源情报</b>，而非在 12 个浏览器标签页间手动关联。
</p>

<br>

<p align="center">
  <a href="#问题">问题</a> &bull;
  <a href="#有何不同">有何不同</a> &bull;
  <a href="#快速开始">快速开始</a> &bull;
  <a href="#ai-能做什么">AI 能做什么</a> &bull;
  <a href="#工具参考37-个工具">工具 (37)</a> &bull;
  <a href="#数据源12-个">数据源</a> &bull;
  <a href="#架构">架构</a>
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

## 问题

开源情报（OSINT）收集是每次渗透测试、漏洞赏金和威胁评估的第一步。所需数据分散在十几个平台上 &mdash; 每个平台有各自的 API、各自的认证方式、各自的速率限制、各自的输出格式。如今，你需要在一个标签页打开 Shodan，另一个标签页打开 VirusTotal，在终端运行 `dig`，从 WHOIS 复制粘贴，再切换到 crt.sh 查证书，然后花 30 分钟手动关联所有信息。

```
传统 OSINT 工作流：
  解析 DNS 记录                  →  dig / nslookup 命令行
  查询 WHOIS 注册信息            →  whois 命令行或网页工具
  枚举子域名                     →  crt.sh + SecurityTrails + VirusTotal（3 个不同界面）
  扫描开放端口/服务              →  Shodan 网页界面
  检查域名信誉                   →  VirusTotal 网页界面
  映射 IP 基础设施               →  Censys + BGP 查询
  查找归档页面                   →  Wayback Machine 网页界面
  检查邮件安全                   →  手动 MX/SPF/DMARC 查询
  关联所有信息                   →  复制粘贴到电子表格
  ─────────────────────────────────
  总计：每个目标 45 分钟以上，大部分时间在切换上下文
```

**osint-mcp-server** 通过 [Model Context Protocol](https://modelcontextprotocol.io) 为您的 AI 智能体提供跨 12 个数据源的 37 个工具。智能体并行查询所有数据源、关联数据、识别风险，并在单次对话中呈现统一的情报全景。

```
使用 osint-mcp-server：
  你："对 target.com 做一次全面侦察"

  智能体：→ DNS：4 条 A 记录、3 条 MX（Google Workspace）、2 条 NS
          → WHOIS：2019 年注册，2025 年到期，GoDaddy
          → crt.sh：从 CT 日志发现 47 个唯一子域名
          → HackerTarget：23 个带 IP 的主机
          → 邮件安全：SPF 软失败（~all）、DMARC p=none、无 DKIM
          → Shodan：3 个 IP、12 个开放端口、Apache 2.4.49（CVE-2021-41773）
          → VirusTotal：信誉良好，0 个检测
          → "target.com 有 47 个子域名，邮件安全薄弱
             （SPF 软失败、DMARC 仅监控），一个 IP 运行着
             存在已知路径遍历 CVE 的 Apache 2.4.49。
             优先级：修补 Apache、将 SPF 升级为 -all、
             将 DMARC 设为 p=reject。"
```

---

## 有何不同

现有 OSINT 工具每次只从单一来源提供原始数据。osint-mcp-server 让您的 AI 智能体能够**跨所有数据源同时推理分析**。

<table>
<thead>
<tr>
<th></th>
<th>传统 OSINT</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>交互方式</b></td>
<td>12 种不同的网页界面、命令行和 API</td>
<td>MCP &mdash; AI 智能体通过对话调用工具</td>
</tr>
<tr>
<td><b>数据源</b></td>
<td>一次只能使用一个平台</td>
<td>12 个数据源并行查询</td>
</tr>
<tr>
<td><b>子域名枚举</b></td>
<td>crt.sh 或 SecurityTrails 或 VirusTotal</td>
<td>智能体合并三者加 HackerTarget，自动去重</td>
</tr>
<tr>
<td><b>关联分析</b></td>
<td>在标签页间手动复制粘贴</td>
<td>智能体交叉引用："Shodan 中的这个 IP 在 Censys 中也出现了，且证书已过期"</td>
</tr>
<tr>
<td><b>邮件安全</b></td>
<td>分别查询 SPF/DMARC/DKIM</td>
<td>综合分析并给出风险评分和可操作建议</td>
</tr>
<tr>
<td><b>基础设施</b></td>
<td>分别查询 GeoIP + BGP + WHOIS</td>
<td>智能体映射完整基础设施：ASN、前缀、地理位置、归属</td>
</tr>
<tr>
<td><b>API 密钥</b></td>
<td>几乎所有功能都需要</td>
<td>21 个工具免费使用，16 个通过可选 API 密钥解锁</td>
</tr>
<tr>
<td><b>安装配置</b></td>
<td>逐一安装每个工具，逐一管理配置</td>
<td><code>npx osint-mcp-server</code> &mdash; 一条命令，零配置</td>
</tr>
</tbody>
</table>

---

## 快速开始

### 方式一：npx（免安装）

```bash
npx osint-mcp-server
```

21 个公共 OSINT 工具即刻可用，无需 API 密钥。

### 方式二：克隆仓库

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### 环境变量（可选）

```bash
# 付费 OSINT 数据源 — 全部可选
export SHODAN_API_KEY=your-key           # 启用 4 个 Shodan 工具
export VT_API_KEY=your-key               # 启用 4 个 VirusTotal 工具
export ST_API_KEY=your-key               # 启用 3 个 SecurityTrails 工具
export CENSYS_API_ID=your-id             # 启用 3 个 Censys 工具
export CENSYS_API_SECRET=your-secret     # 需与 CENSYS_API_ID 配合使用
```

所有付费 API 密钥均为可选。不配置任何密钥，您仍可使用 21 个工具，覆盖 DNS、WHOIS、crt.sh、GeoIP、BGP、Wayback Machine、HackerTarget 和 Microsoft 365 租户发现。

### 连接到 AI 智能体

<details open>
<summary><b>Claude Code</b></summary>

```bash
# 使用 npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# 使用本地克隆
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

添加至 `~/Library/Application Support/Claude/claude_desktop_config.json`：

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
<summary><b>Cursor / Windsurf / 其他 MCP 客户端</b></summary>

JSON 配置格式相同。将命令指向 `npx osint-mcp-server` 或您的本地安装路径。

</details>

### 开始查询

```
你："能查到 example.com 的哪些信息？"
```

就这么简单。智能体会自动处理 DNS、WHOIS、子域名、邮件安全等查询。

---

## AI 能做什么

### 域名侦察

```
你："对 target.com 做全面侦察"

智能体：→ osint_domain_recon {domain: "target.com"}
        → DNS：A 记录指向 3 个 IP（AWS us-east-1）
        → WHOIS：2018 年通过 Namecheap 注册，2026 年到期
        → crt.sh：发现 62 个子域名
        → HackerTarget：31 个已解析 IP 的主机
        → 邮件安全：SPF 硬失败、DMARC p=reject、DKIM 已配置（selector1）
        → "target.com 的邮件安全配置良好。
           发现 62 个子域名——值得关注的有：staging.target.com、
           admin-portal.target.com、api-v2.target.com。
           基础设施部署在 AWS（us-east-1）。"
```

### 攻击面映射

```
你："映射 203.0.113.50 的攻击面"

智能体：→ shodan_host {ip: "203.0.113.50"}
        → geoip_lookup {ip: "203.0.113.50"}
        → bgp_ip {ip: "203.0.113.50"}
        → whois_ip {ip: "203.0.113.50"}
        → dns_reverse {ip: "203.0.113.50"}
        → "203.0.113.50（Hetzner，德国，AS24940）
           开放端口：22/SSH、80/HTTP、443/HTTPS、8080/HTTP-Proxy
           Apache 2.4.51、OpenSSH 8.9、8080 上的 nginx 反向代理
           反向 DNS：web1.target.com
           Shodan 标记了 3 个已知 CVE"
```

### 子域名枚举（多源聚合）

```
你："用所有可用数据源查找 target.com 的全部子域名"

智能体：→ crtsh_search {domain: "target.com"}              → 62 个子域名
        → st_subdomains {domain: "target.com"}              → 84 个子域名
        → vt_subdomains {domain: "target.com"}              → 41 个子域名
        → hackertarget_hostsearch {domain: "target.com"}    → 31 个主机
        → dns_wildcard_check {domain: "target.com"}         → 无泛解析
        → "跨 4 个数据源去重后共发现 127 个唯一子域名。
           值得关注的发现：staging.target.com、dev-api.target.com、
           jenkins.target.com（CI/CD 暴露风险）、
           old-admin.target.com（可能为遗留系统）"
```

### 邮件安全审计

```
你："分析 target.com 的邮件安全态势"

智能体：→ dns_email_security {domain: "target.com"}
        → dns_spf_chain {domain: "target.com"}
        → m365_tenant {domain: "target.com"}
        → "邮件安全：高风险
           SPF：~all（软失败——可被伪造）
           DMARC：p=none（仅监控——未执行策略）
           DKIM：selector1 已配置（2048 位，良好）
           SPF 链：7 个 include、2 个服务（Google Workspace、SendGrid）
           M365：非 Microsoft 租户
           建议：
           1. 将 SPF 从 ~all 升级为 -all
           2. 将 DMARC 从 p=none 改为 p=quarantine，再改为 p=reject
           3. 为 DMARC 添加 rua= 以接收聚合报告"
```

### 历史情报

```
你："target.com 三年前运行的是什么？"

智能体：→ wayback_urls {domain: "target.com", limit: 500}
        → st_dns_history {domain: "target.com", type: "a"}
        → wayback_snapshots {url: "https://target.com/robots.txt"}
        → "DNS 历史：target.com 于 2023 年从 198.51.100.1（DigitalOcean）
           迁移至 203.0.113.50（AWS）。
           Wayback 发现 342 个唯一 URL，包括：
           - /admin/（2024 年移除，此前可访问）
           - /api/v1/docs（Swagger UI，仍有缓存）
           - /wp-content/（曾是 WordPress，已迁移）
           旧版 robots.txt 禁止了 /internal/ 和 /debug/"
```

---

## 工具参考（37 个工具）

<details open>
<summary><b>DNS（6 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `dns_lookup` | 解析 A、AAAA、MX、TXT、NS、SOA、CNAME、SRV 记录 |
| `dns_reverse` | IP 地址的反向 DNS（PTR）查询 |
| `dns_email_security` | SPF + DMARC + DKIM 分析，含风险评分和修复建议 |
| `dns_spf_chain` | 递归 SPF include 链解析，含服务识别 |
| `dns_srv_discover` | SRV + CNAME 服务发现（Autodiscover、LDAP、SIP、Kerberos 等） |
| `dns_wildcard_check` | 通过随机子域名探测检测泛解析 DNS |

</details>

<details>
<summary><b>WHOIS / RDAP（2 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `whois_domain` | RDAP 域名查询 &mdash; 注册商、日期、域名服务器、联系人 |
| `whois_ip` | RDAP IP 查询 &mdash; 网络名称、CIDR、国家、实体 |

</details>

<details>
<summary><b>证书透明度（1 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `crtsh_search` | 通过 crt.sh 搜索 CT 日志 &mdash; 子域名发现 + 证书详情 |

</details>

<details>
<summary><b>Shodan（4 个）&mdash; 需要 SHODAN_API_KEY</b></summary>

| 工具 | 描述 |
|------|------|
| `shodan_host` | IP 详情：开放端口、服务、Banner、漏洞、操作系统、ASN |
| `shodan_search` | Shodan 查询语言搜索（如 `apache port:443 country:US`） |
| `shodan_dns_resolve` | 通过 Shodan 批量主机名转 IP 解析 |
| `shodan_exploits` | 搜索公开漏洞利用数据库（PoC、Metasploit 模块） |

</details>

<details>
<summary><b>VirusTotal（4 个）&mdash; 需要 VT_API_KEY</b></summary>

| 工具 | 描述 |
|------|------|
| `vt_domain` | 域名信誉、检测统计、分类、DNS 记录 |
| `vt_ip` | IP 信誉、检测统计、ASN、网络 |
| `vt_subdomains` | 通过 VirusTotal 枚举子域名 |
| `vt_url` | URL 扫描 + 恶意软件/钓鱼分析 |

</details>

<details>
<summary><b>SecurityTrails（3 个）&mdash; 需要 ST_API_KEY</b></summary>

| 工具 | 描述 |
|------|------|
| `st_subdomains` | 子域名枚举（返回完整域名） |
| `st_dns_history` | 历史 DNS 记录，含首次/末次发现日期 |
| `st_whois` | 增强版 WHOIS，含注册人/管理/技术联系人 |

</details>

<details>
<summary><b>Censys（3 个）&mdash; 需要 CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| 工具 | 描述 |
|------|------|
| `censys_hosts` | 主机搜索 &mdash; IP、服务、端口、位置、ASN |
| `censys_host_details` | 单主机完整详情及所有服务 |
| `censys_certificates` | 按域名、指纹、颁发者搜索证书 |

</details>

<details>
<summary><b>GeoIP（2 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `geoip_lookup` | IP 地理定位：国家、城市、ISP、ASN、代理/托管/VPN 检测 |
| `geoip_batch` | 批量 IP 地理定位（单次最多 100 个 IP） |

</details>

<details>
<summary><b>BGP / ASN（3 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `bgp_asn` | ASN 详情 + 所有已宣告的 IPv4/IPv6 前缀 |
| `bgp_ip` | IP 前缀/ASN 路由查询，含 RIR 分配信息 |
| `bgp_prefix` | 前缀详情 + 宣告该前缀的 ASN |

</details>

<details>
<summary><b>Wayback Machine（2 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `wayback_urls` | 归档 URL 发现 &mdash; 查找旧端点、隐藏路径、已删除内容 |
| `wayback_snapshots` | 快照历史，含时间戳和直接归档链接 |

</details>

<details>
<summary><b>HackerTarget（3 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `hackertarget_hostsearch` | 主机/子域名发现，含已解析 IP |
| `hackertarget_reverseip` | 反向 IP 查询 &mdash; 查找同一 IP 上的所有域名 |
| `hackertarget_aslookup` | ASN 信息查询 |

</details>

<details>
<summary><b>Microsoft 365（2 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `m365_tenant` | 发现 M365 租户 ID、区域和 OpenID 配置 |
| `m365_userrealm` | 检测认证类型（托管/联合）、联合品牌、认证端点 |

</details>

<details>
<summary><b>元工具（2 个）&mdash; 无需 API 密钥</b></summary>

| 工具 | 描述 |
|------|------|
| `osint_list_sources` | 列出所有 OSINT 数据源、API 密钥状态和工具数量 |
| `osint_domain_recon` | 快速侦察，整合所有免费数据源（DNS + WHOIS + crt.sh + HackerTarget + 邮件安全） |

</details>

---

## 数据源（12 个）

| 数据源 | 认证 | 速率限制 | 提供的数据 |
|--------|------|----------|-----------|
| [DNS](https://nodejs.org/api/dns.html) | 无 | 无 | A、AAAA、MX、TXT、NS、SOA、CNAME、SRV、PTR 记录 |
| [RDAP](https://rdap.org/) | 无 | 1 次/秒 | 域名和 IP 的 WHOIS 数据（注册商、日期、联系人、CIDR） |
| [crt.sh](https://crt.sh/) | 无 | 0.5 次/秒 | 证书透明度日志、子域名发现 |
| [ip-api.com](http://ip-api.com/) | 无 | 45 次/分 | IP 地理定位、ISP、ASN、代理/VPN/托管检测 |
| [BGPView](https://bgpview.io/) | 无 | 0.5 次/秒 | ASN 详情、已宣告前缀、IP 路由信息 |
| [HackerTarget](https://hackertarget.com/) | 无 | 2 次/秒 | 主机搜索、反向 IP、ASN 查询（免费每日 50 次） |
| [Wayback Machine](https://web.archive.org/) | 无 | 1 次/秒 | 归档 URL、快照历史、历史内容 |
| [Microsoft 365](https://login.microsoftonline.com/) | 无 | 无 | 租户发现、联合身份检测、认证类型 |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 次/秒 | 全网端口/服务/Banner 扫描 |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 次/分 | 域名/IP/URL 信誉、恶意软件检测 |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 次/秒 | DNS 历史、子域名枚举、增强版 WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 次/秒 | 主机搜索、证书透明度、服务发现 |

---

## 架构

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

**设计决策：**

- **12 个数据提供方，1 个服务器** &mdash; 每个 OSINT 数据源都是独立模块。智能体根据查询自行选择使用哪些工具。
- **21 个免费工具** &mdash; DNS、WHOIS、crt.sh、BGP、GeoIP、Wayback、HackerTarget 和 M365 无需任何 API 密钥即可使用。付费数据源为增量补充。
- **并行查询** &mdash; `osint_domain_recon` 通过 `Promise.allSettled` 调用 8 个数据源。即使某个数据源超时，其余仍能返回数据。
- **按提供方独立限速** &mdash; 每个数据源拥有独立的 `RateLimiter` 实例，按其 API 限制精确校准。无共享瓶颈。
- **TTL 缓存** &mdash; crt.sh（15 分钟）、BGP（30 分钟）、Shodan（5 分钟）、VirusTotal（10 分钟）的结果会被缓存，避免多工具工作流中的重复 API 调用。
- **优雅降级** &mdash; 缺少 API 密钥不会导致服务器崩溃。工具返回描述性错误信息："设置 SHODAN_API_KEY 以启用 Shodan 工具。"
- **SPF 链分析** &mdash; 递归 include 解析，具备环路检测、服务识别（Google Workspace、Microsoft 365、SendGrid 等）和 RFC 7208 查询次数限制检查。
- **仅 2 个依赖** &mdash; `@modelcontextprotocol/sdk` 和 `zod`。所有 HTTP 使用原生 `fetch`，所有 DNS 使用 `node:dns/promises`。

---

## 限制

- 免费层速率限制适用：HackerTarget（50 次/天）、ip-api.com（45 次/分钟）、VirusTotal 社区版（4 次/分钟）
- crt.sh 对大型域名查询可能较慢（已设置 30 秒超时）
- ip-api.com 免费层要求使用 HTTP（非 HTTPS）
- Wayback Machine CDX API 对高流量域名可能超时
- 通过 RDAP 获取的 WHOIS 可能无法覆盖所有 TLD（部分注册商尚未支持 RDAP）
- 已在 macOS / Linux 测试（Windows 未测试）

---

## MCP 安全套件

| 项目 | 领域 | 工具 |
|------|------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 基于浏览器的安全测试 | 39 个工具，Firefox，注入测试 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 云安全（AWS/Azure/GCP） | 38 个工具，60+ 项检查 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 安全态势 | 39 个工具，45 项检查 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 漏洞情报 | 23 个工具，5 个数据源 |
| **osint-mcp-server** | **开源情报与侦察** | **37 个工具，12 个数据源** |

---

<p align="center">
<b>仅用于授权的安全测试和评估。</b><br>
在对任何目标执行侦察之前，请务必确保已获得适当授权。
</p>

<p align="center">
  <a href="LICENSE">MIT 许可证</a> &bull; 基于 Bun + TypeScript 构建
</p>
