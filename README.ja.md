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
  <strong>日本語</strong> |
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

<h3 align="center">AIエージェントのためのOSINTおよび偵察インテリジェンス</h3>

<p align="center">
  Shodan、VirusTotal、Censys、SecurityTrails、DNS、WHOIS、BGP、Wayback Machine — 単一のMCPサーバーに統合。<br>
  あなたのAIエージェントは<b>オンデマンドで全範囲のOSINT</b>を取得できます。12個のブラウザタブと手動での相関作業は不要です。
</p>

<br>

<p align="center">
  <a href="#問題">問題</a> &bull;
  <a href="#どこが違うのか">どこが違うのか</a> &bull;
  <a href="#クイックスタート">クイックスタート</a> &bull;
  <a href="#aiができること">AIができること</a> &bull;
  <a href="#ツールリファレンス37ツール">ツール (37)</a> &bull;
  <a href="#データソース12">データソース</a> &bull;
  <a href="#アーキテクチャ">アーキテクチャ</a>
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

## 問題

OSINTの収集は、すべてのペネトレーションテスト、バグバウンティ、脅威評価の最初のステップです。必要なデータは12個のプラットフォームに分散しており、それぞれが独自のAPI、独自の認証、独自のレート制限、独自の出力フォーマットを持っています。現在は、Shodanをタブで開き、VirusTotal を別のタブで開き、ターミナルで `dig` を実行し、WHOISからコピー＆ペーストし、証明書のためにcrt.shに切り替え、その後30分かけてすべてを手動で相関させています。

```
従来のOSINTワークフロー:
  DNSレコードを解決            →  dig / nslookup CLI
  WHOIS登録を確認             →  whois CLIまたはWebツール
  サブドメインを列挙           →  crt.sh + SecurityTrails + VirusTotal (3つの異なるUI)
  オープンポート/サービスをスキャン  →  Shodan Webインターフェース
  ドメインの評判を確認          →  VirusTotal Webインターフェース
  IPインフラストラクチャをマップ   →  Censys + BGPルックアップ
  アーカイブされたページを検索    →  Wayback Machine Web UI
  メールセキュリティを確認       →  手動でのMX/SPF/DMARC検索
  すべてを相関させる           →  スプレッドシートにコピー＆ペースト
  ─────────────────────────────────
  合計: ターゲット1つあたり45分以上、その大部分はコンテキストの切り替え
```

**osint-mcp-server**は、[Model Context Protocol](https://modelcontextprotocol.io)を介して、12のデータソースにわたる37のツールをAIエージェントに提供します。エージェントはすべてのソースを並行してクエリし、データを相関させ、リスクを特定し、統一されたインテリジェンスの全体像を提示します — 単一の会話の中で。

```
osint-mcp-serverを使用した場合:
  You: "target.comの完全な偵察を行って"

  Agent: → DNS: 4つのAレコード、3つのMX (Google Workspace)、2つのNS
         → WHOIS: 2019年登録、2025年有効期限、GoDaddy
         → crt.sh: CTログから47個のユニークなサブドメイン
         → HackerTarget: 23個のホストとIP
         → Email: SPFソフトフェイル (~all)、DMARC p=none、DKIMなし
         → Shodan: 3つのIP、12個のオープンポート、Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: クリーンな評判、0個の検出
         → "target.comは47個のサブドメインを持ち、脆弱なメールセキュリティ
            (SPFソフトフェイル、DMARC監視のみ)、そして既知のパストラバーサル
            CVEを持つApache 2.4.49を実行している1つのIPがあります。
            優先事項: Apacheにパッチを適用、SPFを-allにアップグレード、
            DMARCをp=rejectに設定。"
```

---

## どこが違うのか

既存のOSINTツールは、一度に1つのソースから生データを提供します。osint-mcp-serverは、AIエージェントに**すべてのソースを同時に推論する能力**を提供します。

<table>
<thead>
<tr>
<th></th>
<th>従来のOSINT</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>インターフェース</b></td>
<td>12個の異なるWeb UI、CLI、API</td>
<td>MCP — AIエージェントが会話的にツールを呼び出し</td>
</tr>
<tr>
<td><b>データソース</b></td>
<td>一度に1つのプラットフォーム</td>
<td>12個のソースを並行してクエリ</td>
</tr>
<tr>
<td><b>サブドメイン列挙</b></td>
<td>crt.sh または SecurityTrails または VirusTotal</td>
<td>エージェントが3つすべて + HackerTargetをマージし、重複を除去</td>
</tr>
<tr>
<td><b>相関</b></td>
<td>タブ間での手動コピー＆ペースト</td>
<td>エージェントが相互参照: "ShodanのこのIPは、期限切れ証明書を持つCensysにも表示される"</td>
</tr>
<tr>
<td><b>メールセキュリティ</b></td>
<td>個別のSPF/DMARC/DKIM検索</td>
<td>リスクスコアと実行可能な推奨事項を含む統合分析</td>
</tr>
<tr>
<td><b>インフラストラクチャ</b></td>
<td>GeoIP + BGP + WHOISを個別に</td>
<td>エージェントが完全なインフラストラクチャをマップ: ASN、プレフィックス、地理位置情報、所有権</td>
</tr>
<tr>
<td><b>APIキー</b></td>
<td>ほぼすべてに必要</td>
<td>21個のツールが無料で動作、さらに16個がオプションのAPIキーで利用可能</td>
</tr>
<tr>
<td><b>セットアップ</b></td>
<td>各ツールをインストール、各設定を管理</td>
<td><code>npx osint-mcp-server</code> — 1つのコマンド、設定不要</td>
</tr>
</tbody>
</table>

---

## クイックスタート

### オプション1: npx (インストール不要)

```bash
npx osint-mcp-server
```

21個の公開OSINTツールがすぐに動作します。APIキーは不要です。

### オプション2: クローン

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### 環境変数 (オプション)

```bash
# プレミアムOSINTソース — すべてオプション
export SHODAN_API_KEY=your-key           # 4つのShodanツールを有効化
export VT_API_KEY=your-key               # 4つのVirusTotalツールを有効化
export ST_API_KEY=your-key               # 3つのSecurityTrailsツールを有効化
export CENSYS_API_ID=your-id             # 3つのCensysツールを有効化
export CENSYS_API_SECRET=your-secret     # CENSYS_API_IDと共に必要
```

すべてのプレミアムAPIキーはオプションです。それらがなくても、DNS、WHOIS、crt.sh、GeoIP、BGP、Wayback Machine、HackerTarget、Microsoft 365テナント検出をカバーする21個のツールが使用できます。

### AIエージェントに接続

<details open>
<summary><b>Claude Code</b></summary>

```bash
# npxを使用
claude mcp add osint-mcp-server -- npx osint-mcp-server

# ローカルクローンを使用
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json`に追加:

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
<summary><b>Cursor / Windsurf / その他のMCPクライアント</b></summary>

同じJSON設定フォーマットです。コマンドを`npx osint-mcp-server`またはローカルインストールパスに向けてください。

</details>

### クエリを開始

```
You: "example.comについて何が分かる?"
```

それだけです。エージェントはDNS、WHOIS、サブドメイン、メールセキュリティなどを自動的に処理します。

---

## AIができること

### ドメイン偵察

```
You: "target.comの完全な偵察を行って"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: Aレコードは3つのIPを指す (AWS us-east-1)
       → WHOIS: 2018年にNamecheap経由で登録、2026年有効期限
       → crt.sh: 62個のサブドメインを発見
       → HackerTarget: 31個のホストと解決されたIP
       → Email: SPFハードフェイル、DMARC p=reject、DKIM検出 (selector1)
       → "target.comはメールセキュリティが適切に設定されています。
          62個のサブドメインが見つかりました — 注目: staging.target.com、
          admin-portal.target.com、api-v2.target.com。
          インフラストラクチャはAWS (us-east-1) 上にあります。"
```

### 攻撃対象領域のマッピング

```
You: "203.0.113.50の攻撃対象領域をマップして"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner、DE、AS24940)
          オープンポート: 22/SSH、80/HTTP、443/HTTPS、8080/HTTP-Proxy
          Apache 2.4.51、OpenSSH 8.9、8080のnginxリバースプロキシ
          逆引きDNS: web1.target.com
          Shodanにより3つの既知のCVEがフラグ立て"
```

### サブドメイン列挙 (マルチソース)

```
You: "利用可能なすべてのソースを使用してtarget.comのすべてのサブドメインを検索して"

Agent: → crtsh_search {domain: "target.com"}              → 62個のサブドメイン
       → st_subdomains {domain: "target.com"}              → 84個のサブドメイン
       → vt_subdomains {domain: "target.com"}              → 41個のサブドメイン
       → hackertarget_hostsearch {domain: "target.com"}    → 31個のホスト
       → dns_wildcard_check {domain: "target.com"}         → ワイルドカードなし
       → "4つのソース全体で重複除去後、127個のユニークなサブドメイン。
          注目すべき発見: staging.target.com、dev-api.target.com、
          jenkins.target.com (CI/CD露出リスク)、
          old-admin.target.com (レガシーシステムの可能性)"
```

### メールセキュリティ監査

```
You: "target.comのメールセキュリティ態勢を分析して"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "メールセキュリティ: 高リスク
          SPF: ~all (ソフトフェイル — なりすまし可能)
          DMARC: p=none (監視のみ — 強制なし)
          DKIM: selector1で検出 (2048ビット、良好)
          SPFチェーン: 7個のinclude、2つのサービス (Google Workspace、SendGrid)
          M365: Microsoftテナントではない
          推奨事項:
          1. SPFを~allから-allにアップグレード
          2. DMARCをp=noneからp=quarantine、その後p=rejectに変更
          3. 集計レポート用にDMARCにrua=を追加"
```

### 歴史的インテリジェンス

```
You: "target.comは3年前に何を実行していた?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS履歴: target.comは2023年に198.51.100.1 (DigitalOcean)から
          203.0.113.50 (AWS)に移動。
          Waybackは342個のユニークなURLを発見、以下を含む:
          - /admin/ (2024年に削除、以前はアクセス可能)
          - /api/v1/docs (Swagger UI、まだキャッシュされている)
          - /wp-content/ (以前はWordPress、移行済み)
          古いrobots.txtは/internal/と/debug/を禁止"
```

---

## ツールリファレンス (37ツール)

<details open>
<summary><b>DNS (6) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `dns_lookup` | A、AAAA、MX、TXT、NS、SOA、CNAME、SRVレコードを解決 |
| `dns_reverse` | IPアドレスの逆引きDNS (PTR) ルックアップ |
| `dns_email_security` | リスクスコアと推奨事項を含むSPF + DMARC + DKIM分析 |
| `dns_spf_chain` | サービス検出を含む再帰的SPF includeチェーン解決 |
| `dns_srv_discover` | SRV + CNAMEサービス検出 (Autodiscover、LDAP、SIP、Kerberosなど) |
| `dns_wildcard_check` | ランダムなサブドメインプローブによるワイルドカードDNS検出 |

</details>

<details>
<summary><b>WHOIS / RDAP (2) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `whois_domain` | RDAPドメインルックアップ — レジストラ、日付、ネームサーバー、連絡先 |
| `whois_ip` | RDAP IPルックアップ — ネットワーク名、CIDR、国、エンティティ |

</details>

<details>
<summary><b>証明書の透明性 (1) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `crtsh_search` | crt.sh経由でCTログを検索 — サブドメイン検出 + 証明書詳細 |

</details>

<details>
<summary><b>Shodan (4) — SHODAN_API_KEYが必要</b></summary>

| ツール | 説明 |
|------|-------------|
| `shodan_host` | IP詳細: オープンポート、サービス、バナー、脆弱性、OS、ASN |
| `shodan_search` | Shodanクエリ言語を検索 (例: `apache port:443 country:US`) |
| `shodan_dns_resolve` | Shodan経由での一括ホスト名からIPへの解決 |
| `shodan_exploits` | 公開エクスプロイトデータベースを検索 (PoC、Metasploitモジュール) |

</details>

<details>
<summary><b>VirusTotal (4) — VT_API_KEYが必要</b></summary>

| ツール | 説明 |
|------|-------------|
| `vt_domain` | ドメインの評判、検出統計、カテゴリ、DNSレコード |
| `vt_ip` | IPの評判、検出統計、ASN、ネットワーク |
| `vt_subdomains` | VirusTotal経由でのサブドメイン列挙 |
| `vt_url` | URLスキャン + マルウェア/フィッシング分析 |

</details>

<details>
<summary><b>SecurityTrails (3) — ST_API_KEYが必要</b></summary>

| ツール | 説明 |
|------|-------------|
| `st_subdomains` | サブドメイン列挙 (FQDNを返す) |
| `st_dns_history` | 初回/最終確認日付を含む履歴DNSレコード |
| `st_whois` | 登録者/管理者/技術担当者を含む拡張WHOIS |

</details>

<details>
<summary><b>Censys (3) — CENSYS_API_ID + CENSYS_API_SECRETが必要</b></summary>

| ツール | 説明 |
|------|-------------|
| `censys_hosts` | ホスト検索 — IP、サービス、ポート、場所、ASN |
| `censys_host_details` | すべてのサービスを含む単一ホストの完全な詳細 |
| `censys_certificates` | ドメイン、フィンガープリント、発行者による証明書検索 |

</details>

<details>
<summary><b>GeoIP (2) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `geoip_lookup` | IP地理位置情報: 国、都市、ISP、ASN、プロキシ/ホスティング/VPN検出 |
| `geoip_batch` | 一括IP地理位置情報 (一度に最大100個のIP) |

</details>

<details>
<summary><b>BGP / ASN (3) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `bgp_asn` | ASN詳細 + すべてのアナウンスされたIPv4/IPv6プレフィックス |
| `bgp_ip` | RIR割り当てを含むIPプレフィックス/ASNルーティングルックアップ |
| `bgp_prefix` | プレフィックス詳細 + アナウンスするASN |

</details>

<details>
<summary><b>Wayback Machine (2) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `wayback_urls` | アーカイブされたURL検出 — 古いエンドポイント、隠しパス、削除されたコンテンツを検索 |
| `wayback_snapshots` | タイムスタンプと直接アーカイブリンクを含むスナップショット履歴 |

</details>

<details>
<summary><b>HackerTarget (3) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `hackertarget_hostsearch` | 解決されたIPを含むホスト/サブドメイン検出 |
| `hackertarget_reverseip` | 逆引きIPルックアップ — IP上のすべてのドメインを検索 |
| `hackertarget_aslookup` | ASN情報ルックアップ |

</details>

<details>
<summary><b>Microsoft 365 (2) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `m365_tenant` | M365テナントID、地域、OpenID設定を検出 |
| `m365_userrealm` | 認証タイプ (管理/フェデレーション)、フェデレーションブランド、認証エンドポイントを検出 |

</details>

<details>
<summary><b>メタ (2) — APIキー不要</b></summary>

| ツール | 説明 |
|------|-------------|
| `osint_list_sources` | すべてのOSINTソース、APIキーステータス、ツール数をリスト |
| `osint_domain_recon` | すべての無料ソースを組み合わせたクイック偵察 (DNS + WHOIS + crt.sh + HackerTarget + メールセキュリティ) |

</details>

---

## データソース (12)

| ソース | 認証 | レート制限 | 提供内容 |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | なし | なし | A、AAAA、MX、TXT、NS、SOA、CNAME、SRV、PTRレコード |
| [RDAP](https://rdap.org/) | なし | 1 req/s | ドメイン&IP WHOISデータ (レジストラ、日付、連絡先、CIDR) |
| [crt.sh](https://crt.sh/) | なし | 0.5 req/s | 証明書の透明性ログ、サブドメイン検出 |
| [ip-api.com](http://ip-api.com/) | なし | 45 req/min | IP地理位置情報、ISP、ASN、プロキシ/VPN/ホスティング検出 |
| [BGPView](https://bgpview.io/) | なし | 0.5 req/s | ASN詳細、アナウンスされたプレフィックス、IPルーティング情報 |
| [HackerTarget](https://hackertarget.com/) | なし | 2 req/s | ホスト検索、逆引きIP、ASNルックアップ (無料で50/日) |
| [Wayback Machine](https://web.archive.org/) | なし | 1 req/s | アーカイブされたURL、スナップショット履歴、履歴コンテンツ |
| [Microsoft 365](https://login.microsoftonline.com/) | なし | なし | テナント検出、フェデレーション検出、認証タイプ |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | インターネット全体のポート/サービス/バナースキャン |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | ドメイン/IP/URLの評判、マルウェア検出 |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | DNS履歴、サブドメイン列挙、拡張WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | ホスト検索、証明書の透明性、サービス検出 |

---

## アーキテクチャ

```
src/
├── index.ts                    エントリポイント、env設定、MCP stdio
├── types/
│   └── index.ts                ToolDef、ToolContext、ToolResult
├── protocol/
│   ├── tools.ts                37ツール定義 (Zodスキーマ)
│   └── mcp-server.ts           MCPサーバー + stdioトランスポート
├── dns/
│   └── index.ts                6つの関数 — lookup、reverse、email、SPFチェーン、SRV、wildcard
├── whois/
│   └── index.ts                2つの関数 — ドメインRDAP、IP RDAP
├── crtsh/
│   └── index.ts                重複除去 + キャッシング付きCTログ検索
├── shodan/
│   └── index.ts                Host、search、DNS resolve、exploits
├── virustotal/
│   └── index.ts                Domain、IP、subdomains、URLスキャン
├── securitytrails/
│   └── index.ts                Subdomains、DNS履歴、WHOIS
├── censys/
│   └── index.ts                ホスト検索、ホスト詳細、証明書
├── geoip/
│   └── index.ts                単一 + 一括IP地理位置情報
├── bgp/
│   └── index.ts                ASN、IPプレフィックス、プレフィックス詳細
├── wayback/
│   └── index.ts                URL検索 + スナップショット履歴
├── hackertarget/
│   └── index.ts                ホスト検索、逆引きIP、ASN
├── m365/
│   └── index.ts                テナント検出、ユーザー領域/フェデレーション
├── meta/
│   ├── sources.ts              ソース可用性チェック
│   └── recon.ts                無料ソースを組み合わせたドメイン偵察
└── utils/
    ├── rate-limiter.ts          キューベースのレート制限
    ├── cache.ts                 汎用TTLキャッシュ
    └── require-key.ts           APIキー検証ヘルパー
```

**設計上の決定:**

- **12のプロバイダー、1つのサーバー** — すべてのOSINTソースは独立したモジュールです。エージェントはクエリに基づいてどのツールを使用するかを選択します。
- **21の無料ツール** — DNS、WHOIS、crt.sh、BGP、GeoIP、Wayback、HackerTarget、M365はAPIキーなしで動作します。プレミアムソースは追加的です。
- **並列クエリ** — `osint_domain_recon`は`Promise.allSettled`経由で8つのソースを呼び出します。1つのソースがタイムアウトしても、残りはデータを返します。
- **プロバイダーごとのレート制限** — 各データソースは、そのAPIの制限に合わせて調整された独自の`RateLimiter`インスタンスを持っています。共有ボトルネックはありません。
- **TTLキャッシング** — crt.sh (15分)、BGP (30分)、Shodan (5分)、VirusTotal (10分)の結果は、マルチツールワークフロー中の冗長なAPI呼び出しを避けるためにキャッシュされます。
- **グレースフルデグラデーション** — 欠落しているAPIキーはサーバーをクラッシュさせません。ツールは説明的なエラーメッセージを返します: "Shodanツールを有効にするにはSHODAN_API_KEYを設定してください。"
- **SPFチェーン分析** — ループ検出、サービス識別 (Google Workspace、Microsoft 365、SendGridなど)、RFC 7208ルックアップ制限チェックを含む再帰的include解決。
- **2つの依存関係** — `@modelcontextprotocol/sdk`と`zod`のみ。すべてのHTTPはネイティブ`fetch`経由。すべてのDNSは`node:dns/promises`経由。

---

## 制限事項

- 無料ティアのレート制限が適用されます: HackerTarget (50/日)、ip-api.com (45/分)、VirusTotal コミュニティ (4/分)
- crt.shは大規模なドメインでは遅くなる可能性があります (30秒のタイムアウトが適用されます)
- ip-api.comは無料ティアにHTTP (HTTPSではない)が必要です
- Wayback Machine CDX APIは非常に人気のあるドメインでタイムアウトする可能性があります
- RDAP経由のWHOISはすべてのTLDをカバーしていない可能性があります (一部のレジストラはまだRDAPをサポートしていません)
- macOS / Linuxでテスト済み (Windowsは未テスト)

---

## MCPセキュリティスイートの一部

| プロジェクト | ドメイン | ツール |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ブラウザベースのセキュリティテスト | 39ツール、Firefox、インジェクションテスト |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | クラウドセキュリティ (AWS/Azure/GCP) | 38ツール、60以上のチェック |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHubセキュリティ態勢 | 39ツール、45チェック |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 脆弱性インテリジェンス | 23ツール、5ソース |
| **osint-mcp-server** | **OSINT & 偵察** | **37ツール、12ソース** |

---

<p align="center">
<b>許可されたセキュリティテストおよび評価のみを目的としています。</b><br>
ターゲットに対して偵察を実行する前に、常に適切な許可を得ていることを確認してください。
</p>

<p align="center">
  <a href="LICENSE">MITライセンス</a> &bull; Bun + TypeScriptで構築
</p>
