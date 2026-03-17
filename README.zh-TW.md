<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <strong>繁體中文</strong> |
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

<h3 align="center">為 AI 代理提供 OSINT 與偵察情報。</h3>

<p align="center">
  Shodan、VirusTotal、Censys、SecurityTrails、DNS、WHOIS、BGP、Wayback Machine &mdash; 整合到單一 MCP 伺服器。<br>
  您的 AI 代理將獲得 <b>全面的 OSINT 隨選服務</b>,而不是 12 個瀏覽器分頁和手動關聯分析。
</p>

<br>

<p align="center">
  <a href="#問題所在">問題所在</a> &bull;
  <a href="#差異之處">差異之處</a> &bull;
  <a href="#快速開始">快速開始</a> &bull;
  <a href="#ai-可以執行的任務">AI 可以執行的任務</a> &bull;
  <a href="#工具參考37-個工具">工具 (37)</a> &bull;
  <a href="#資料來源12-個">資料來源</a> &bull;
  <a href="#架構">架構</a>
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

## 問題所在

OSINT 收集是每次滲透測試、漏洞賞金獵人和威脅評估的第一步。您所需的資料分散在十幾個平台上 &mdash; 每個都有自己的 API、自己的認證方式、自己的速率限制、自己的輸出格式。如今您需要在一個分頁中開啟 Shodan,在另一個分頁中開啟 VirusTotal,在終端機中執行 `dig`,從 WHOIS 複製貼上,切換到 crt.sh 查詢憑證,然後花 30 分鐘手動關聯所有內容。

```
傳統 OSINT 工作流程:
  解析 DNS 記錄               →  dig / nslookup CLI
  檢查 WHOIS 註冊資訊         →  whois CLI 或網頁工具
  枚舉子網域                  →  crt.sh + SecurityTrails + VirusTotal (3 個不同介面)
  掃描開放埠/服務             →  Shodan 網頁介面
  檢查網域信譽                →  VirusTotal 網頁介面
  映射 IP 基礎設施            →  Censys + BGP 查詢
  尋找存檔頁面                →  Wayback Machine 網頁介面
  檢查電子郵件安全性          →  手動 MX/SPF/DMARC 查詢
  關聯所有資訊                →  複製貼上到試算表
  ─────────────────────────────────
  總計:每個目標 45 分鐘以上,大部分時間在切換上下文
```

**osint-mcp-server** 透過[模型上下文協定](https://modelcontextprotocol.io)為您的 AI 代理提供跨 12 個資料來源的 37 個工具。代理平行查詢所有來源,關聯資料,識別風險,並呈現統一的情報圖像 &mdash; 在單一對話中完成。

```
使用 osint-mcp-server:
  您: "對 target.com 進行完整偵察"

  代理: → DNS: 4 筆 A 記錄, 3 筆 MX (Google Workspace), 2 筆 NS
       → WHOIS: 2019 年註冊, 2025 年到期, GoDaddy
       → crt.sh: 從 CT 日誌發現 47 個唯一子網域
       → HackerTarget: 23 個主機含 IP
       → 電子郵件: SPF 軟失敗 (~all), DMARC p=none, 無 DKIM
       → Shodan: 3 個 IP, 12 個開放埠, Apache 2.4.49 (CVE-2021-41773)
       → VirusTotal: 信譽良好, 0 個偵測
       → "target.com 有 47 個子網域,電子郵件安全性弱
          (SPF 軟失敗, DMARC 僅監控),一個 IP
          執行 Apache 2.4.49,存在已知路徑遍歷 CVE。
          優先事項:修補 Apache,將 SPF 升級到 -all,將 DMARC 設為 p=reject。"
```

---

## 差異之處

現有的 OSINT 工具一次只提供一個來源的原始資料。osint-mcp-server 讓您的 AI 代理能夠**同時跨所有來源進行推理**。

<table>
<thead>
<tr>
<th></th>
<th>傳統 OSINT</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>介面</b></td>
<td>12 個不同的網頁介面、CLI 和 API</td>
<td>MCP &mdash; AI 代理透過對話呼叫工具</td>
</tr>
<tr>
<td><b>資料來源</b></td>
<td>一次一個平台</td>
<td>12 個來源平行查詢</td>
</tr>
<tr>
<td><b>子網域枚舉</b></td>
<td>crt.sh 或 SecurityTrails 或 VirusTotal</td>
<td>代理合併所有三者 + HackerTarget,去重</td>
</tr>
<tr>
<td><b>關聯</b></td>
<td>在分頁間手動複製貼上</td>
<td>代理交叉參照:"Shodan 的這個 IP 也出現在 Censys 中,憑證已過期"</td>
</tr>
<tr>
<td><b>電子郵件安全性</b></td>
<td>分別查詢 SPF/DMARC/DKIM</td>
<td>結合分析,提供風險評分和可行建議</td>
</tr>
<tr>
<td><b>基礎設施</b></td>
<td>GeoIP + BGP + WHOIS 分別查詢</td>
<td>代理映射完整基礎設施:ASN、前綴、地理位置、所有權</td>
</tr>
<tr>
<td><b>API 金鑰</b></td>
<td>幾乎所有功能都需要</td>
<td>21 個工具免費運作,另外 16 個可選 API 金鑰</td>
</tr>
<tr>
<td><b>設定</b></td>
<td>安裝每個工具,管理每個配置</td>
<td><code>npx osint-mcp-server</code> &mdash; 一個命令,零配置</td>
</tr>
</tbody>
</table>

---

## 快速開始

### 選項 1: npx (無需安裝)

```bash
npx osint-mcp-server
```

21 個公開 OSINT 工具立即運作。無需 API 金鑰。

### 選項 2: 複製儲存庫

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### 環境變數 (可選)

```bash
# 進階 OSINT 來源 — 全部可選
export SHODAN_API_KEY=your-key           # 啟用 4 個 Shodan 工具
export VT_API_KEY=your-key               # 啟用 4 個 VirusTotal 工具
export ST_API_KEY=your-key               # 啟用 3 個 SecurityTrails 工具
export CENSYS_API_ID=your-id             # 啟用 3 個 Censys 工具
export CENSYS_API_SECRET=your-secret     # CENSYS_API_ID 必需
```

所有進階 API 金鑰都是可選的。即使沒有它們,您仍可獲得 21 個工具,涵蓋 DNS、WHOIS、crt.sh、GeoIP、BGP、Wayback Machine、HackerTarget 和 Microsoft 365 租戶探索。

### 連接到您的 AI 代理

<details open>
<summary><b>Claude Code</b></summary>

```bash
# 使用 npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# 使用本地複製
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

新增到 `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / 其他 MCP 客戶端</b></summary>

相同的 JSON 配置格式。將命令指向 `npx osint-mcp-server` 或您的本地安裝路徑。

</details>

### 開始查詢

```
您: "你能找到關於 example.com 的什麼資訊?"
```

就這樣。代理會自動處理 DNS、WHOIS、子網域、電子郵件安全性等。

---

## AI 可以執行的任務

### 網域偵察

```
您: "對 target.com 進行完整偵察"

代理: → osint_domain_recon {domain: "target.com"}
     → DNS: A 記錄指向 3 個 IP (AWS us-east-1)
     → WHOIS: 2018 年透過 Namecheap 註冊, 2026 年到期
     → crt.sh: 發現 62 個子網域
     → HackerTarget: 31 個主機含解析 IP
     → 電子郵件: SPF 硬失敗, DMARC p=reject, 找到 DKIM (selector1)
     → "target.com 的電子郵件安全性配置良好。
        發現 62 個子網域 — 值得注意的: staging.target.com,
        admin-portal.target.com, api-v2.target.com.
        基礎設施位於 AWS (us-east-1)。"
```

### 攻擊面映射

```
您: "映射 203.0.113.50 的攻擊面"

代理: → shodan_host {ip: "203.0.113.50"}
     → geoip_lookup {ip: "203.0.113.50"}
     → bgp_ip {ip: "203.0.113.50"}
     → whois_ip {ip: "203.0.113.50"}
     → dns_reverse {ip: "203.0.113.50"}
     → "203.0.113.50 (Hetzner, DE, AS24940)
        開放埠: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
        Apache 2.4.51, OpenSSH 8.9, 8080 上的 nginx 反向代理
        反向 DNS: web1.target.com
        Shodan 標記 3 個已知 CVE"
```

### 子網域枚舉 (多來源)

```
您: "使用所有可用來源尋找 target.com 的所有子網域"

代理: → crtsh_search {domain: "target.com"}              → 62 個子網域
     → st_subdomains {domain: "target.com"}              → 84 個子網域
     → vt_subdomains {domain: "target.com"}              → 41 個子網域
     → hackertarget_hostsearch {domain: "target.com"}    → 31 個主機
     → dns_wildcard_check {domain: "target.com"}         → 無萬用字元
     → "跨 4 個來源去重後共 127 個唯一子網域。
        值得注意的發現: staging.target.com, dev-api.target.com,
        jenkins.target.com (CI/CD 暴露風險),
        old-admin.target.com (潛在舊系統)"
```

### 電子郵件安全性稽核

```
您: "分析 target.com 的電子郵件安全性態勢"

代理: → dns_email_security {domain: "target.com"}
     → dns_spf_chain {domain: "target.com"}
     → m365_tenant {domain: "target.com"}
     → "電子郵件安全性: 高風險
        SPF: ~all (軟失敗 — 可偽造)
        DMARC: p=none (僅監控 — 未執行)
        DKIM: 找到 selector1 (2048-bit, 良好)
        SPF 鏈: 7 個 include, 2 個服務 (Google Workspace, SendGrid)
        M365: 非 Microsoft 租戶
        建議:
        1. 將 SPF 從 ~all 升級到 -all
        2. 將 DMARC 從 p=none 改為 p=quarantine,然後改為 p=reject
        3. 新增 rua= 到 DMARC 以獲取彙總報告"
```

### 歷史情報

```
您: "target.com 在 3 年前執行什麼?"

代理: → wayback_urls {domain: "target.com", limit: 500}
     → st_dns_history {domain: "target.com", type: "a"}
     → wayback_snapshots {url: "https://target.com/robots.txt"}
     → "DNS 歷史: target.com 在 2023 年從 198.51.100.1 (DigitalOcean)
        遷移到 203.0.113.50 (AWS)。
        Wayback 找到 342 個唯一 URL,包括:
        - /admin/ (2024 年移除,曾可存取)
        - /api/v1/docs (Swagger UI,仍有快取)
        - /wp-content/ (曾是 WordPress,已遷移)
        舊的 robots.txt 禁止 /internal/ 和 /debug/"
```

---

## 工具參考(37 個工具)

<details open>
<summary><b>DNS (6) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `dns_lookup` | 解析 A、AAAA、MX、TXT、NS、SOA、CNAME、SRV 記錄 |
| `dns_reverse` | IP 位址的反向 DNS (PTR) 查詢 |
| `dns_email_security` | SPF + DMARC + DKIM 分析,含風險評分和建議 |
| `dns_spf_chain` | 遞迴 SPF include 鏈解析,含服務偵測 |
| `dns_srv_discover` | SRV + CNAME 服務探索 (Autodiscover、LDAP、SIP、Kerberos 等) |
| `dns_wildcard_check` | 透過隨機子網域探測偵測萬用字元 DNS |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `whois_domain` | RDAP 網域查詢 &mdash; 註冊商、日期、名稱伺服器、聯絡資訊 |
| `whois_ip` | RDAP IP 查詢 &mdash; 網路名稱、CIDR、國家、實體 |

</details>

<details>
<summary><b>憑證透明度 (1) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `crtsh_search` | 透過 crt.sh 搜尋 CT 日誌 &mdash; 子網域探索 + 憑證詳細資訊 |

</details>

<details>
<summary><b>Shodan (4) &mdash; 需要 SHODAN_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `shodan_host` | IP 詳細資訊:開放埠、服務、橫幅、弱點、OS、ASN |
| `shodan_search` | 搜尋 Shodan 查詢語言 (例如 `apache port:443 country:US`) |
| `shodan_dns_resolve` | 透過 Shodan 批次主機名稱轉 IP 解析 |
| `shodan_exploits` | 搜尋公開利用資料庫 (PoC、Metasploit 模組) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; 需要 VT_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `vt_domain` | 網域信譽、偵測統計、類別、DNS 記錄 |
| `vt_ip` | IP 信譽、偵測統計、ASN、網路 |
| `vt_subdomains` | 透過 VirusTotal 枚舉子網域 |
| `vt_url` | URL 掃描 + 惡意軟體/網路釣魚分析 |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; 需要 ST_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `st_subdomains` | 子網域枚舉 (回傳 FQDN) |
| `st_dns_history` | 歷史 DNS 記錄,含首次/最後見到日期 |
| `st_whois` | 增強型 WHOIS,含註冊人/管理員/技術聯絡資訊 |

</details>

<details>
<summary><b>Censys (3) &mdash; 需要 CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Tool | Description |
|------|-------------|
| `censys_hosts` | 主機搜尋 &mdash; IP、服務、埠、位置、ASN |
| `censys_host_details` | 單一主機完整詳細資訊,含所有服務 |
| `censys_certificates` | 憑證搜尋,依網域、指紋、簽發者 |

</details>

<details>
<summary><b>GeoIP (2) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `geoip_lookup` | IP 地理位置:國家、城市、ISP、ASN、代理/主機/VPN 偵測 |
| `geoip_batch` | 批次 IP 地理位置 (一次最多 100 個 IP) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `bgp_asn` | ASN 詳細資訊 + 所有宣告的 IPv4/IPv6 前綴 |
| `bgp_ip` | IP 前綴/ASN 路由查詢,含 RIR 分配 |
| `bgp_prefix` | 前綴詳細資訊 + 宣告 ASN |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `wayback_urls` | 存檔 URL 探索 &mdash; 尋找舊端點、隱藏路徑、已移除內容 |
| `wayback_snapshots` | 快照歷史,含時間戳記和直接存檔連結 |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `hackertarget_hostsearch` | 主機/子網域探索,含解析 IP |
| `hackertarget_reverseip` | 反向 IP 查詢 &mdash; 尋找 IP 上的所有網域 |
| `hackertarget_aslookup` | ASN 資訊查詢 |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `m365_tenant` | 探索 M365 租戶 ID、區域和 OpenID 配置 |
| `m365_userrealm` | 偵測驗證類型 (受控/聯盟)、聯盟品牌、驗證端點 |

</details>

<details>
<summary><b>中繼資料 (2) &mdash; 無需 API 金鑰</b></summary>

| Tool | Description |
|------|-------------|
| `osint_list_sources` | 列出所有 OSINT 來源、API 金鑰狀態和工具計數 |
| `osint_domain_recon` | 結合所有免費來源的快速偵察 (DNS + WHOIS + crt.sh + HackerTarget + 電子郵件安全性) |

</details>

---

## 資料來源(12 個)

| Source | Auth | Rate Limit | What it provides |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | None | None | A、AAAA、MX、TXT、NS、SOA、CNAME、SRV、PTR 記錄 |
| [RDAP](https://rdap.org/) | None | 1 req/s | 網域與 IP WHOIS 資料 (註冊商、日期、聯絡資訊、CIDR) |
| [crt.sh](https://crt.sh/) | None | 0.5 req/s | 憑證透明度日誌、子網域探索 |
| [ip-api.com](http://ip-api.com/) | None | 45 req/min | IP 地理位置、ISP、ASN、代理/VPN/主機偵測 |
| [BGPView](https://bgpview.io/) | None | 0.5 req/s | ASN 詳細資訊、宣告前綴、IP 路由資訊 |
| [HackerTarget](https://hackertarget.com/) | None | 2 req/s | 主機搜尋、反向 IP、ASN 查詢 (免費每日 50 次) |
| [Wayback Machine](https://web.archive.org/) | None | 1 req/s | 存檔 URL、快照歷史、歷史內容 |
| [Microsoft 365](https://login.microsoftonline.com/) | None | None | 租戶探索、聯盟偵測、驗證類型 |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | 全網際網路埠/服務/橫幅掃描 |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | 網域/IP/URL 信譽、惡意軟體偵測 |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | DNS 歷史、子網域枚舉、增強型 WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | 主機搜尋、憑證透明度、服務探索 |

---

## 架構

```
src/
├── index.ts                    進入點、環境配置、MCP stdio
├── types/
│   └── index.ts                ToolDef、ToolContext、ToolResult
├── protocol/
│   ├── tools.ts                37 個工具定義 (Zod 架構)
│   └── mcp-server.ts           MCP 伺服器 + stdio 傳輸
├── dns/
│   └── index.ts                6 個函式 — lookup、reverse、email、SPF chain、SRV、wildcard
├── whois/
│   └── index.ts                2 個函式 — domain RDAP、IP RDAP
├── crtsh/
│   └── index.ts                CT 日誌搜尋,含去重 + 快取
├── shodan/
│   └── index.ts                Host、search、DNS resolve、exploits
├── virustotal/
│   └── index.ts                Domain、IP、subdomains、URL scan
├── securitytrails/
│   └── index.ts                Subdomains、DNS history、WHOIS
├── censys/
│   └── index.ts                Host search、host details、certificates
├── geoip/
│   └── index.ts                單一 + 批次 IP 地理位置
├── bgp/
│   └── index.ts                ASN、IP prefix、prefix details
├── wayback/
│   └── index.ts                URL search + snapshot history
├── hackertarget/
│   └── index.ts                Host search、reverse IP、ASN
├── m365/
│   └── index.ts                Tenant discovery、user realm/federation
├── meta/
│   ├── sources.ts              來源可用性檢查
│   └── recon.ts                結合免費來源的網域偵察
└── utils/
    ├── rate-limiter.ts          基於佇列的速率限制器
    ├── cache.ts                 通用 TTL 快取
    └── require-key.ts           API 金鑰驗證輔助函式
```

**設計決策:**

- **12 個提供者,1 個伺服器** &mdash; 每個 OSINT 來源都是獨立模組。代理根據查詢選擇要使用的工具。
- **21 個免費工具** &mdash; DNS、WHOIS、crt.sh、BGP、GeoIP、Wayback、HackerTarget 和 M365 無需任何 API 金鑰即可運作。進階來源是附加功能。
- **平行查詢** &mdash; `osint_domain_recon` 透過 `Promise.allSettled` 呼叫 8 個來源。如果一個來源逾時,其他仍會回傳資料。
- **每個提供者的速率限制器** &mdash; 每個資料來源都有自己的 `RateLimiter` 實例,校準到該 API 的限制。沒有共享瓶頸。
- **TTL 快取** &mdash; crt.sh (15分鐘)、BGP (30分鐘)、Shodan (5分鐘)、VirusTotal (10分鐘) 結果會被快取,以避免在多工具工作流程中重複 API 呼叫。
- **優雅降級** &mdash; 缺少 API 金鑰不會導致伺服器崩潰。工具會回傳描述性錯誤訊息:"設定 SHODAN_API_KEY 以啟用 Shodan 工具。"
- **SPF 鏈分析** &mdash; 遞迴 include 解析,含循環偵測、服務識別 (Google Workspace、Microsoft 365、SendGrid 等) 和 RFC 7208 查詢限制檢查。
- **2 個相依性** &mdash; `@modelcontextprotocol/sdk` 和 `zod`。所有 HTTP 透過原生 `fetch`。所有 DNS 透過 `node:dns/promises`。

---

## 限制

- 適用免費層速率限制: HackerTarget (50/天)、ip-api.com (45/分鐘)、VirusTotal 社群版 (4/分鐘)
- crt.sh 對大型網域可能較慢 (套用 30 秒逾時)
- ip-api.com 免費層需要 HTTP (非 HTTPS)
- Wayback Machine CDX API 對非常熱門的網域可能逾時
- 透過 RDAP 的 WHOIS 可能無法涵蓋所有 TLD (某些註冊商尚不支援 RDAP)
- 已在 macOS / Linux 測試 (未在 Windows 測試)

---

## MCP Security Suite 的一部分

| Project | Domain | Tools |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 基於瀏覽器的安全性測試 | 39 個工具、Firefox、注入測試 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 雲端安全性 (AWS/Azure/GCP) | 38 個工具、60+ 檢查 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 安全性態勢 | 39 個工具、45 個檢查 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 弱點情報 | 23 個工具、5 個來源 |
| **osint-mcp-server** | **OSINT 與偵察** | **37 個工具、12 個來源** |

---

<p align="center">
<b>僅限授權的安全性測試和評估。</b><br>
在對任何目標執行偵察之前,請務必確保您擁有適當的授權。
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Built with Bun + TypeScript
</p>
