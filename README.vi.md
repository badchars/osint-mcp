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
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.el.md">Ελληνικά</a> |
  <strong>Tiếng Việt</strong> |
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

<h3 align="center">Thông tin tình báo OSINT & trinh sát cho các AI agent.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; thống nhất trong một máy chủ MCP duy nhất.<br>
  AI agent của bạn nhận được <b>OSINT toàn phổ theo yêu cầu</b>, không phải 12 tab trình duyệt và tương quan thủ công.
</p>

<br>

<p align="center">
  <a href="#vấn-đề">Vấn đề</a> &bull;
  <a href="#điểm-khác-biệt">Điểm khác biệt</a> &bull;
  <a href="#bắt-đầu-nhanh">Bắt đầu nhanh</a> &bull;
  <a href="#ai-có-thể-làm-gì">AI có thể làm gì</a> &bull;
  <a href="#tài-liệu-công-cụ-37-công-cụ">Công cụ (37)</a> &bull;
  <a href="#nguồn-dữ-liệu-12">Nguồn dữ liệu</a> &bull;
  <a href="#kiến-trúc">Kiến trúc</a>
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

## Vấn đề

Thu thập OSINT là bước đầu tiên của mọi kiểm tra xâm nhập, bug bounty và đánh giá mối đe dọa. Dữ liệu bạn cần được phân tán trên hàng chục nền tảng &mdash; mỗi nền tảng có API riêng, xác thực riêng, giới hạn tốc độ riêng, định dạng đầu ra riêng. Hôm nay bạn mở Shodan trong một tab, VirusTotal trong tab khác, chạy `dig` trong terminal, sao chép-dán từ WHOIS, chuyển sang crt.sh để tìm chứng chỉ, và sau đó dành 30 phút để tương quan thủ công mọi thứ.

```
Quy trình OSINT truyền thống:
  phân giải bản ghi DNS          →  dig / nslookup CLI
  kiểm tra đăng ký WHOIS         →  whois CLI hoặc công cụ web
  liệt kê tên miền phụ           →  crt.sh + SecurityTrails + VirusTotal (3 giao diện khác nhau)
  quét cổng/dịch vụ mở           →  giao diện web Shodan
  kiểm tra danh tiếng tên miền   →  giao diện web VirusTotal
  ánh xạ cơ sở hạ tầng IP        →  Censys + tra cứu BGP
  tìm trang lưu trữ              →  giao diện web Wayback Machine
  kiểm tra bảo mật email         →  tra cứu MX/SPF/DMARC/DKIM thủ công
  tương quan mọi thứ             →  sao chép-dán vào bảng tính
  ─────────────────────────────────
  Tổng: 45+ phút mỗi mục tiêu, phần lớn là chuyển đổi ngữ cảnh
```

**osint-mcp** cung cấp cho AI agent của bạn 37 công cụ trên 12 nguồn dữ liệu qua [Model Context Protocol](https://modelcontextprotocol.io). Agent truy vấn tất cả các nguồn song song, tương quan dữ liệu, xác định rủi ro và trình bày bức tranh tình báo thống nhất &mdash; trong một cuộc trò chuyện duy nhất.

```
Với osint-mcp:
  Bạn: "Thực hiện trinh sát đầy đủ về target.com"

  Agent: → DNS: 4 bản ghi A, 3 MX (Google Workspace), 2 NS
         → WHOIS: Đăng ký 2019, hết hạn 2025, GoDaddy
         → crt.sh: 47 tên miền phụ duy nhất từ nhật ký CT
         → HackerTarget: 23 máy chủ với IP
         → Email: SPF soft-fail (~all), DMARC p=none, không có DKIM
         → Shodan: 3 IP, 12 cổng mở, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Danh tiếng sạch, 0 phát hiện
         → "target.com có 47 tên miền phụ, bảo mật email yếu
            (SPF soft-fail, DMARC chỉ giám sát), và một IP
            chạy Apache 2.4.49 với CVE path traversal đã biết.
            Ưu tiên: vá Apache, nâng cấp SPF lên -all, đặt DMARC thành p=reject."
```

---

## Điểm khác biệt

Các công cụ OSINT hiện có cung cấp cho bạn dữ liệu thô từng nguồn một. osint-mcp cung cấp cho AI agent của bạn khả năng **suy luận trên tất cả các nguồn đồng thời**.

<table>
<thead>
<tr>
<th></th>
<th>OSINT truyền thống</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Giao diện</b></td>
<td>12 giao diện web, CLI và API khác nhau</td>
<td>MCP &mdash; AI agent gọi công cụ theo kiểu hội thoại</td>
</tr>
<tr>
<td><b>Nguồn dữ liệu</b></td>
<td>Một nền tảng mỗi lần</td>
<td>12 nguồn truy vấn song song</td>
</tr>
<tr>
<td><b>Liệt kê tên miền phụ</b></td>
<td>crt.sh HOẶC SecurityTrails HOẶC VirusTotal</td>
<td>Agent hợp nhất cả ba + HackerTarget, loại bỏ trùng lặp</td>
</tr>
<tr>
<td><b>Tương quan</b></td>
<td>Sao chép-dán thủ công giữa các tab</td>
<td>Agent tham chiếu chéo: "IP này từ Shodan cũng xuất hiện trong Censys với chứng chỉ hết hạn"</td>
</tr>
<tr>
<td><b>Bảo mật email</b></td>
<td>Tra cứu SPF/DMARC/DKIM riêng biệt</td>
<td>Phân tích kết hợp với điểm rủi ro và khuyến nghị khả thi</td>
</tr>
<tr>
<td><b>Cơ sở hạ tầng</b></td>
<td>GeoIP + BGP + WHOIS riêng biệt</td>
<td>Agent ánh xạ toàn bộ cơ sở hạ tầng: ASN, tiền tố, định vị địa lý, quyền sở hữu</td>
</tr>
<tr>
<td><b>Khóa API</b></td>
<td>Bắt buộc cho hầu hết mọi thứ</td>
<td>21 công cụ hoạt động miễn phí, 16 công cụ với khóa API tùy chọn</td>
</tr>
<tr>
<td><b>Cài đặt</b></td>
<td>Cài đặt từng công cụ, quản lý từng cấu hình</td>
<td><code>npx osint-mcp</code> &mdash; một lệnh, không cần cấu hình</td>
</tr>
</tbody>
</table>

---

## Bắt đầu nhanh

### Tùy chọn 1: npx (không cài đặt)

```bash
npx osint-mcp
```

21 công cụ OSINT công khai hoạt động ngay lập tức. Không cần khóa API.

### Tùy chọn 2: Clone

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Biến môi trường (tùy chọn)

```bash
# Nguồn OSINT cao cấp — tất cả đều tùy chọn
export SHODAN_API_KEY=your-key           # Kích hoạt 4 công cụ Shodan
export VT_API_KEY=your-key               # Kích hoạt 4 công cụ VirusTotal
export ST_API_KEY=your-key               # Kích hoạt 3 công cụ SecurityTrails
export CENSYS_API_ID=your-id             # Kích hoạt 3 công cụ Censys
export CENSYS_API_SECRET=your-secret     # Bắt buộc với CENSYS_API_ID
```

Tất cả khóa API cao cấp đều tùy chọn. Không có chúng, bạn vẫn có 21 công cụ bao gồm DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget và khám phá tenant Microsoft 365.

### Kết nối với AI agent của bạn

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Với npx
claude mcp add osint-mcp -- npx osint-mcp

# Với clone cục bộ
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Thêm vào `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / các MCP client khác</b></summary>

Cùng định dạng cấu hình JSON. Trỏ lệnh đến `npx osint-mcp` hoặc đường dẫn cài đặt cục bộ của bạn.

</details>

### Bắt đầu truy vấn

```
Bạn: "Bạn có thể tìm thấy gì về example.com?"
```

Vậy là xong. Agent tự động xử lý DNS, WHOIS, tên miền phụ, bảo mật email và nhiều hơn nữa.

---

## AI có thể làm gì

### Trinh sát tên miền

```
Bạn: "Thực hiện trinh sát đầy đủ về target.com"

Agent: → osint_domain_recon {domain: "target.com"}
       → DNS: Bản ghi A trỏ đến 3 IP (AWS us-east-1)
       → WHOIS: Đăng ký 2018 qua Namecheap, hết hạn 2026
       → crt.sh: Phát hiện 62 tên miền phụ
       → HackerTarget: 31 máy chủ với IP đã phân giải
       → Email: SPF hard-fail, DMARC p=reject, tìm thấy DKIM (selector1)
       → "target.com được cấu hình tốt cho bảo mật email.
          Tìm thấy 62 tên miền phụ — đáng chú ý: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Cơ sở hạ tầng trên AWS (us-east-1)."
```

### Ánh xạ bề mặt tấn công

```
Bạn: "Ánh xạ bề mặt tấn công cho 203.0.113.50"

Agent: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Cổng mở: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy trên 8080
          Reverse DNS: web1.target.com
          3 CVE đã biết được Shodan gắn cờ"
```

### Liệt kê tên miền phụ (Đa nguồn)

```
Bạn: "Tìm tất cả tên miền phụ của target.com bằng mọi nguồn có sẵn"

Agent: → crtsh_search {domain: "target.com"}              → 62 tên miền phụ
       → st_subdomains {domain: "target.com"}              → 84 tên miền phụ
       → vt_subdomains {domain: "target.com"}              → 41 tên miền phụ
       → hackertarget_hostsearch {domain: "target.com"}    → 31 máy chủ
       → dns_wildcard_check {domain: "target.com"}         → Không có wildcard
       → "127 tên miền phụ duy nhất sau khi loại bỏ trùng lặp trên 4 nguồn.
          Phát hiện đáng chú ý: staging.target.com, dev-api.target.com,
          jenkins.target.com (rủi ro tiếp xúc CI/CD),
          old-admin.target.com (hệ thống cũ tiềm năng)"
```

### Kiểm toán bảo mật email

```
Bạn: "Phân tích tình trạng bảo mật email của target.com"

Agent: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Bảo mật Email: RỦI RO CAO
          SPF: ~all (soft fail — có thể giả mạo)
          DMARC: p=none (chỉ giám sát — không thực thi)
          DKIM: Tìm thấy cho selector1 (2048-bit, tốt)
          Chuỗi SPF: 7 include, 2 dịch vụ (Google Workspace, SendGrid)
          M365: Không phải tenant Microsoft
          Khuyến nghị:
          1. Nâng cấp SPF từ ~all lên -all
          2. Thay đổi DMARC từ p=none sang p=quarantine, sau đó p=reject
          3. Thêm rua= vào DMARC để báo cáo tổng hợp"
```

### Thông tin tình báo lịch sử

```
Bạn: "target.com đang chạy gì 3 năm trước?"

Agent: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "Lịch sử DNS: target.com chuyển từ 198.51.100.1 (DigitalOcean)
          sang 203.0.113.50 (AWS) vào năm 2023.
          Wayback tìm thấy 342 URL duy nhất bao gồm:
          - /admin/ (đã xóa năm 2024, trước đó có thể truy cập)
          - /api/v1/docs (Swagger UI, vẫn được lưu cache)
          - /wp-content/ (trước đây là WordPress, đã di chuyển)
          Robots.txt cũ không cho phép /internal/ và /debug/"
```

---

## Tài liệu công cụ (37 công cụ)

<details open>
<summary><b>DNS (6) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `dns_lookup` | Phân giải bản ghi A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Tra cứu DNS ngược (PTR) cho địa chỉ IP |
| `dns_email_security` | Phân tích SPF + DMARC + DKIM với chấm điểm rủi ro và khuyến nghị |
| `dns_spf_chain` | Phân giải chuỗi include SPF đệ quy với phát hiện dịch vụ |
| `dns_srv_discover` | Khám phá dịch vụ SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, v.v.) |
| `dns_wildcard_check` | Phát hiện DNS wildcard qua thăm dò tên miền phụ ngẫu nhiên |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `whois_domain` | Tra cứu tên miền RDAP &mdash; nhà đăng ký, ngày tháng, nameserver, liên hệ |
| `whois_ip` | Tra cứu IP RDAP &mdash; tên mạng, CIDR, quốc gia, thực thể |

</details>

<details>
<summary><b>Minh bạch chứng chỉ (1) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `crtsh_search` | Tìm kiếm nhật ký CT qua crt.sh &mdash; khám phá tên miền phụ + chi tiết chứng chỉ |

</details>

<details>
<summary><b>Shodan (4) &mdash; Yêu cầu SHODAN_API_KEY</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `shodan_host` | Chi tiết IP: cổng mở, dịch vụ, banner, lỗ hổng, OS, ASN |
| `shodan_search` | Tìm kiếm ngôn ngữ truy vấn Shodan (ví dụ: `apache port:443 country:US`) |
| `shodan_dns_resolve` | Phân giải hostname sang IP hàng loạt qua Shodan |
| `shodan_exploits` | Tìm kiếm cơ sở dữ liệu exploit công khai (PoC, mô-đun Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Yêu cầu VT_API_KEY</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `vt_domain` | Danh tiếng tên miền, thống kê phát hiện, danh mục, bản ghi DNS |
| `vt_ip` | Danh tiếng IP, thống kê phát hiện, ASN, mạng |
| `vt_subdomains` | Liệt kê tên miền phụ qua VirusTotal |
| `vt_url` | Quét URL + phân tích malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Yêu cầu ST_API_KEY</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `st_subdomains` | Liệt kê tên miền phụ (trả về FQDN) |
| `st_dns_history` | Bản ghi DNS lịch sử với ngày nhìn thấy đầu tiên/cuối cùng |
| `st_whois` | WHOIS nâng cao với liên hệ người đăng ký/quản trị/kỹ thuật |

</details>

<details>
<summary><b>Censys (3) &mdash; Yêu cầu CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `censys_hosts` | Tìm kiếm máy chủ &mdash; IP, dịch vụ, cổng, vị trí, ASN |
| `censys_host_details` | Chi tiết đầy đủ máy chủ đơn với tất cả dịch vụ |
| `censys_certificates` | Tìm kiếm chứng chỉ theo tên miền, dấu vân tay, nhà phát hành |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `geoip_lookup` | Định vị địa lý IP: quốc gia, thành phố, ISP, ASN, phát hiện proxy/hosting/VPN |
| `geoip_batch` | Định vị địa lý IP hàng loạt (tối đa 100 IP cùng lúc) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `bgp_asn` | Chi tiết ASN + tất cả tiền tố IPv4/IPv6 được công bố |
| `bgp_ip` | Tra cứu định tuyến tiền tố/ASN IP với phân bổ RIR |
| `bgp_prefix` | Chi tiết tiền tố + ASN công bố |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `wayback_urls` | Khám phá URL lưu trữ &mdash; tìm endpoint cũ, đường dẫn ẩn, nội dung đã xóa |
| `wayback_snapshots` | Lịch sử snapshot với timestamp và liên kết lưu trữ trực tiếp |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `hackertarget_hostsearch` | Khám phá máy chủ/tên miền phụ với IP đã phân giải |
| `hackertarget_reverseip` | Tra cứu IP ngược &mdash; tìm tất cả tên miền trên một IP |
| `hackertarget_aslookup` | Tra cứu thông tin ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `m365_tenant` | Khám phá ID tenant M365, khu vực và cấu hình OpenID |
| `m365_userrealm` | Phát hiện loại xác thực (Managed/Federated), thương hiệu federation, endpoint xác thực |

</details>

<details>
<summary><b>Meta (2) &mdash; Không cần khóa API</b></summary>

| Công cụ | Mô tả |
|------|-------------|
| `osint_list_sources` | Liệt kê tất cả nguồn OSINT, trạng thái khóa API và số lượng công cụ |
| `osint_domain_recon` | Trinh sát nhanh kết hợp tất cả nguồn miễn phí (DNS + WHOIS + crt.sh + HackerTarget + bảo mật email) |

</details>

---

## Nguồn dữ liệu (12)

| Nguồn | Xác thực | Giới hạn tốc độ | Cung cấp gì |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Không | Không | Bản ghi A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Không | 1 req/s | Dữ liệu WHOIS tên miền & IP (nhà đăng ký, ngày tháng, liên hệ, CIDR) |
| [crt.sh](https://crt.sh/) | Không | 0.5 req/s | Nhật ký Minh bạch chứng chỉ, khám phá tên miền phụ |
| [ip-api.com](http://ip-api.com/) | Không | 45 req/phút | Định vị địa lý IP, ISP, ASN, phát hiện proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Không | 0.5 req/s | Chi tiết ASN, tiền tố được công bố, thông tin định tuyến IP |
| [HackerTarget](https://hackertarget.com/) | Không | 2 req/s | Tìm kiếm máy chủ, IP ngược, tra cứu ASN (50/ngày miễn phí) |
| [Wayback Machine](https://web.archive.org/) | Không | 1 req/s | URL lưu trữ, lịch sử snapshot, nội dung lịch sử |
| [Microsoft 365](https://login.microsoftonline.com/) | Không | Không | Khám phá tenant, phát hiện federation, loại xác thực |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | Quét cổng/dịch vụ/banner trên toàn Internet |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/phút | Danh tiếng tên miền/IP/URL, phát hiện malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | Lịch sử DNS, liệt kê tên miền phụ, WHOIS nâng cao |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | Tìm kiếm máy chủ, minh bạch chứng chỉ, khám phá dịch vụ |

---

## Kiến trúc

```
src/
├── index.ts                    Điểm vào, cấu hình env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 định nghĩa công cụ (schema Zod)
│   └── mcp-server.ts           Máy chủ MCP + stdio transport
├── dns/
│   └── index.ts                6 hàm — lookup, reverse, email, chuỗi SPF, SRV, wildcard
├── whois/
│   └── index.ts                2 hàm — RDAP tên miền, RDAP IP
├── crtsh/
│   └── index.ts                Tìm kiếm nhật ký CT với dedup + caching
├── shodan/
│   └── index.ts                Máy chủ, tìm kiếm, phân giải DNS, exploit
├── virustotal/
│   └── index.ts                Tên miền, IP, tên miền phụ, quét URL
├── securitytrails/
│   └── index.ts                Tên miền phụ, lịch sử DNS, WHOIS
├── censys/
│   └── index.ts                Tìm kiếm máy chủ, chi tiết máy chủ, chứng chỉ
├── geoip/
│   └── index.ts                Định vị địa lý IP đơn + hàng loạt
├── bgp/
│   └── index.ts                ASN, tiền tố IP, chi tiết tiền tố
├── wayback/
│   └── index.ts                Tìm kiếm URL + lịch sử snapshot
├── hackertarget/
│   └── index.ts                Tìm kiếm máy chủ, IP ngược, ASN
├── m365/
│   └── index.ts                Khám phá tenant, user realm/federation
├── meta/
│   ├── sources.ts              Kiểm tra tính khả dụng nguồn
│   └── recon.ts                Trinh sát tên miền nguồn miễn phí kết hợp
└── utils/
    ├── rate-limiter.ts          Bộ giới hạn tốc độ dựa trên hàng đợi
    ├── cache.ts                 Cache TTL chung
    └── require-key.ts           Trình trợ giúp xác thực khóa API
```

**Quyết định thiết kế:**

- **12 nhà cung cấp, 1 máy chủ** &mdash; Mỗi nguồn OSINT là một mô-đun độc lập. Agent chọn công cụ nào sử dụng dựa trên truy vấn.
- **21 công cụ miễn phí** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget và M365 hoạt động không cần khóa API. Nguồn cao cấp là bổ sung.
- **Truy vấn song song** &mdash; `osint_domain_recon` gọi 8 nguồn qua `Promise.allSettled`. Nếu một nguồn hết thời gian, các nguồn còn lại vẫn trả về dữ liệu.
- **Bộ giới hạn tốc độ mỗi nhà cung cấp** &mdash; Mỗi nguồn dữ liệu có instance `RateLimiter` riêng được hiệu chỉnh theo giới hạn API của nguồn đó. Không có nút thắt chung.
- **Caching TTL** &mdash; Kết quả crt.sh (15phút), BGP (30phút), Shodan (5phút), VirusTotal (10phút) được cache để tránh gọi API dư thừa trong quy trình làm việc đa công cụ.
- **Giảm chất lượng khéo léo** &mdash; Thiếu khóa API không làm crash máy chủ. Công cụ trả về thông báo lỗi mô tả: "Đặt SHODAN_API_KEY để kích hoạt công cụ Shodan."
- **Phân tích chuỗi SPF** &mdash; Phân giải include đệ quy với phát hiện vòng lặp, xác định dịch vụ (Google Workspace, Microsoft 365, SendGrid, v.v.) và kiểm tra giới hạn tra cứu RFC 7208.
- **2 dependency** &mdash; `@modelcontextprotocol/sdk` và `zod`. Tất cả HTTP qua `fetch` native. Tất cả DNS qua `node:dns/promises`.

---

## Giới hạn

- Giới hạn tốc độ miễn phí áp dụng: HackerTarget (50/ngày), ip-api.com (45/phút), VirusTotal cộng đồng (4/phút)
- crt.sh có thể chậm đối với tên miền lớn (áp dụng timeout 30s)
- ip-api.com yêu cầu HTTP (không phải HTTPS) cho tier miễn phí
- API CDX của Wayback Machine có thể timeout đối với tên miền rất phổ biến
- WHOIS qua RDAP có thể không bao gồm tất cả TLD (một số nhà đăng ký chưa hỗ trợ RDAP)
- Đã kiểm tra trên macOS / Linux (chưa kiểm tra Windows)

---

## Là một phần của MCP Security Suite

| Dự án | Lĩnh vực | Công cụ |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Kiểm tra bảo mật dựa trên trình duyệt | 39 công cụ, Firefox, kiểm tra injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bảo mật đám mây (AWS/Azure/GCP) | 38 công cụ, 60+ kiểm tra |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Tình trạng bảo mật GitHub | 39 công cụ, 45 kiểm tra |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Thông tin tình báo lỗ hổng | 23 công cụ, 5 nguồn |
| **osint-mcp** | **OSINT & trinh sát** | **37 công cụ, 12 nguồn** |

---

<p align="center">
<b>Chỉ dành cho kiểm tra bảo mật và đánh giá được ủy quyền.</b><br>
Luôn đảm bảo bạn có ủy quyền hợp lệ trước khi thực hiện trinh sát trên bất kỳ mục tiêu nào.
</p>

<p align="center">
  <a href="LICENSE">Giấy phép MIT</a> &bull; Được xây dựng với Bun + TypeScript
</p>
