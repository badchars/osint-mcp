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
  <strong>ไทย</strong> |
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

<h3 align="center">ข่ าวกรอง OSINT และการลาดตระเวนสำหรับตัวแทน AI</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; รวมเป็นเซิร์ฟเวอร์ MCP เดียว<br>
  ตัวแทน AI ของคุณจะได้รับ <b>OSINT แบบครบวงจรทันที</b> ไม่ใช่แท็บเบราว์เซอร์ 12 แท็บและการเชื่อมโยงข้อมูลด้วยตนเอง
</p>

<br>

<p align="center">
  <a href="#ปัญหา">ปัญหา</a> &bull;
  <a href="#ความแตกต่าง">ความแตกต่าง</a> &bull;
  <a href="#เริ่มต้นอย่างรวดเร็ว">เริ่มต้นอย่างรวดเร็ว</a> &bull;
  <a href="#สิ่งที่-ai-สามารถทำได้">สิ่งที่ AI สามารถทำได้</a> &bull;
  <a href="#เครื่องมืออ้างอิง-37-เครื่องมือ">เครื่องมือ (37)</a> &bull;
  <a href="#แหล่งข้อมูล-12">แหล่งข้อมูล</a> &bull;
  <a href="#สถาปัตยกรรม">สถาปัตยกรรม</a>
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

## ปัญหา

การรวบรวม OSINT เป็นขั้นตอนแรกของการทดสอบเจาะระบบ การหาช่องโหว่ และการประเมินภัยคุกคามทุกครั้ง ข้อมูลที่คุณต้องการกระจัดกระจายอยู่ในแพลตฟอร์มหลายสิบแห่ง &mdash; แต่ละแพลตฟอร์มมี API ของตัวเอง การตรวจสอบสิทธิ์ของตัวเอง ขอบเขตอัตราของตัวเอง และรูปแบบผลลัพธ์ของตัวเอง วันนี้คุณเปิด Shodan ในแท็บหนึ่ง VirusTotal ในอีกแท็บหนึ่ง รัน `dig` ในเทอร์มินัล คัดลอก-วางจาก WHOIS เปลี่ยนไปที่ crt.sh สำหรับใบรับรอง และใช้เวลา 30 นาทีในการเชื่อมโยงข้อมูลทั้งหมดด้วยตนเอง

```
ขั้นตอนการทำงาน OSINT แบบดั้งเดิม:
  แก้ไข DNS records            →  dig / nslookup CLI
  ตรวจสอบการลงทะเบียน WHOIS    →  whois CLI หรือเครื่องมือเว็บ
  ระบุโดเมนย่อย                →  crt.sh + SecurityTrails + VirusTotal (3 UI ที่แตกต่างกัน)
  สแกนหาพอร์ต/บริการที่เปิดอยู่ →  อินเทอร์เฟซเว็บ Shodan
  ตรวจสอบชื่อเสียงโดเมน        →  อินเทอร์เฟซเว็บ VirusTotal
  แมปโครงสร้างพื้นฐาน IP        →  Censys + BGP lookups
  ค้นหาหน้าที่เก็บถาวร         →  อินเทอร์เฟซเว็บ Wayback Machine
  ตรวจสอบความปลอดภัยอีเมล      →  การค้นหา MX/SPF/DMARC ด้วยตนเอง
  เชื่อมโยงทุกอย่าง            →  คัดลอก-วางในสเปรดชีต
  ─────────────────────────────────
  รวม: 45+ นาทีต่อเป้าหมาย ส่วนใหญ่คือการสลับบริบท
```

**osint-mcp-server** ให้เครื่องมือ 37 รายการจาก 12 แหล่งข้อมูลแก่ตัวแทน AI ของคุณผ่าน [Model Context Protocol](https://modelcontextprotocol.io) ตัวแทนจะสอบถามแหล่งข้อมูลทั้งหมดแบบขนาน เชื่อมโยงข้อมูล ระบุความเสี่ยง และนำเสนอภาพข่าวกรองแบบครบวงจร &mdash; ในการสนทนาเดียว

```
ด้วย osint-mcp-server:
  คุณ: "ทำการลาดตระเวนแบบเต็มรูปแบบบน target.com"

  ตัวแทน: → DNS: 4 A records, 3 MX (Google Workspace), 2 NS
         → WHOIS: ลงทะเบียนปี 2019, หมดอายุปี 2025, GoDaddy
         → crt.sh: 47 โดเมนย่อยที่ไม่ซ้ำกันจาก CT logs
         → HackerTarget: 23 โฮสต์พร้อม IP
         → Email: SPF soft-fail (~all), DMARC p=none, ไม่มี DKIM
         → Shodan: 3 IP, 12 พอร์ตเปิด, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: ชื่อเสียงดี, 0 การตรวจจับ
         → "target.com มี 47 โดเมนย่อย, ความปลอดภัยอีเมลอ่อนแอ
            (SPF soft-fail, DMARC เฉพาะการตรวจสอบ), และหนึ่ง IP
            ที่ใช้ Apache 2.4.49 ที่มี CVE path traversal ที่รู้จัก
            ลำดับความสำคัญ: แพตช์ Apache, อัปเกรด SPF เป็น -all, ตั้ง DMARC เป็น p=reject"
```

---

## ความแตกต่าง

เครื่องมือ OSINT ที่มีอยู่ให้ข้อมูลดิบจากแหล่งเดียวต่อครั้ง osint-mcp-server ให้ตัวแทน AI ของคุณความสามารถในการ **วิเคราะห์ข้ามแหล่งข้อมูลทั้งหมดพร้อมกัน**

<table>
<thead>
<tr>
<th></th>
<th>OSINT แบบดั้งเดิม</th>
<th>osint-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>อินเทอร์เฟซ</b></td>
<td>12 อินเทอร์เฟซเว็บ, CLI และ API ที่แตกต่างกัน</td>
<td>MCP &mdash; ตัวแทน AI เรียกใช้เครื่องมือผ่านการสนทนา</td>
</tr>
<tr>
<td><b>แหล่งข้อมูล</b></td>
<td>ทีละแพลตฟอร์ม</td>
<td>12 แหล่งสอบถามแบบขนาน</td>
</tr>
<tr>
<td><b>ระบุโดเมนย่อย</b></td>
<td>crt.sh หรือ SecurityTrails หรือ VirusTotal</td>
<td>ตัวแทนรวมทั้งสาม + HackerTarget, ลบที่ซ้ำกัน</td>
</tr>
<tr>
<td><b>การเชื่อมโยง</b></td>
<td>คัดลอก-วางระหว่างแท็บด้วยตนเอง</td>
<td>ตัวแทนอ้างอิงข้าม: "IP นี้จาก Shodan ปรากฏใน Censys ด้วยใบรับรองหมดอายุ"</td>
</tr>
<tr>
<td><b>ความปลอดภัยอีเมล</b></td>
<td>การค้นหา SPF/DMARC/DKIM แยกกัน</td>
<td>การวิเคราะห์รวมกับคะแนนความเสี่ยงและคำแนะนำที่ปฏิบัติได้</td>
</tr>
<tr>
<td><b>โครงสร้างพื้นฐาน</b></td>
<td>GeoIP + BGP + WHOIS แยกกัน</td>
<td>ตัวแทนแมปโครงสร้างพื้นฐานทั้งหมด: ASN, prefixes, geolocation, ownership</td>
</tr>
<tr>
<td><b>คีย์ API</b></td>
<td>จำเป็นสำหรับเกือบทุกอย่าง</td>
<td>21 เครื่องมือทำงานฟรี, 16 เครื่องมือเพิ่มเติมด้วยคีย์ API ที่เลือกได้</td>
</tr>
<tr>
<td><b>การตั้งค่า</b></td>
<td>ติดตั้งเครื่องมือแต่ละรายการ, จัดการการกำหนดค่าแต่ละรายการ</td>
<td><code>npx osint-mcp-server</code> &mdash; คำสั่งเดียว, ไม่ต้องกำหนดค่า</td>
</tr>
</tbody>
</table>

---

## เริ่มต้นอย่างรวดเร็ว

### ตัวเลือก 1: npx (ไม่ต้องติดตั้ง)

```bash
npx osint-mcp-server
```

21 เครื่องมือ OSINT สาธารณะทำงานทันที ไม่ต้องใช้คีย์ API

### ตัวเลือก 2: โคลน

```bash
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server
bun install
```

### ตัวแปรสภาพแวดล้อม (เลือกได้)

```bash
# แหล่ง OSINT พรีเมียม — ทั้งหมดเลือกได้
export SHODAN_API_KEY=your-key           # เปิดใช้งาน 4 เครื่องมือ Shodan
export VT_API_KEY=your-key               # เปิดใช้งาน 4 เครื่องมือ VirusTotal
export ST_API_KEY=your-key               # เปิดใช้งาน 3 เครื่องมือ SecurityTrails
export CENSYS_API_ID=your-id             # เปิดใช้งาน 3 เครื่องมือ Censys
export CENSYS_API_SECRET=your-secret     # จำเป็นพร้อม CENSYS_API_ID
```

คีย์ API พรีเมียมทั้งหมดเป็นตัวเลือก หากไม่มี คุณยังได้เครื่องมือ 21 รายการที่ครอบคลุม DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget และการค้นพบผู้เช่า Microsoft 365

### เชื่อมต่อกับตัวแทน AI ของคุณ

<details open>
<summary><b>Claude Code</b></summary>

```bash
# ด้วย npx
claude mcp add osint-mcp-server -- npx osint-mcp-server

# ด้วยโคลนภายในเครื่อง
claude mcp add osint-mcp-server -- bun run /path/to/osint-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

เพิ่มไปที่ `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / ไคลเอนต์ MCP อื่นๆ</b></summary>

รูปแบบการกำหนดค่า JSON เดียวกัน ชี้คำสั่งไปที่ `npx osint-mcp-server` หรือเส้นทางการติดตั้งภายในเครื่องของคุณ

</details>

### เริ่มสอบถาม

```
คุณ: "คุณพบอะไรเกี่ยวกับ example.com บ้าง?"
```

เท่านี้เอง ตัวแทนจัดการ DNS, WHOIS, โดเมนย่อย, ความปลอดภัยอีเมล และอื่นๆ โดยอัตโนมัติ

---

## สิ่งที่ AI สามารถทำได้

### การลาดตระเวนโดเมน

```
คุณ: "ทำการลาดตระเวนแบบเต็มรูปแบบบน target.com"

ตัวแทน: → osint_domain_recon {domain: "target.com"}
       → DNS: A records ชี้ไปที่ 3 IP (AWS us-east-1)
       → WHOIS: ลงทะเบียนปี 2018 ผ่าน Namecheap, หมดอายุปี 2026
       → crt.sh: ค้นพบ 62 โดเมนย่อย
       → HackerTarget: 31 โฮสต์พร้อม IP ที่แก้ไข
       → Email: SPF hard-fail, DMARC p=reject, พบ DKIM (selector1)
       → "target.com ได้รับการกำหนดค่าที่ดีสำหรับความปลอดภัยอีเมล
          พบ 62 โดเมนย่อย — น่าสังเกต: staging.target.com,
          admin-portal.target.com, api-v2.target.com
          โครงสร้างพื้นฐานอยู่บน AWS (us-east-1)"
```

### การแมปพื้นผิวการโจมตี

```
คุณ: "แมปพื้นผิวการโจมตีสำหรับ 203.0.113.50"

ตัวแทน: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          พอร์ตเปิด: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy บน 8080
          Reverse DNS: web1.target.com
          3 CVE ที่รู้จักถูกตั้งค่าสถานะโดย Shodan"
```

### การระบุโดเมนย่อย (หลายแหล่ง)

```
คุณ: "ค้นหาโดเมนย่อยทั้งหมดของ target.com โดยใช้ทุกแหล่งที่มี"

ตัวแทน: → crtsh_search {domain: "target.com"}              → 62 โดเมนย่อย
       → st_subdomains {domain: "target.com"}              → 84 โดเมนย่อย
       → vt_subdomains {domain: "target.com"}              → 41 โดเมนย่อย
       → hackertarget_hostsearch {domain: "target.com"}    → 31 โฮสต์
       → dns_wildcard_check {domain: "target.com"}         → ไม่มี wildcard
       → "127 โดเมนย่อยที่ไม่ซ้ำกันหลังจากลบที่ซ้ำจาก 4 แหล่ง
          การค้นพบที่น่าสังเกต: staging.target.com, dev-api.target.com,
          jenkins.target.com (ความเสี่ยงการเปิดเผย CI/CD),
          old-admin.target.com (ระบบเดิมที่อาจมี)"
```

### การตรวจสอบความปลอดภัยอีเมล

```
คุณ: "วิเคราะห์ท่าทางความปลอดภัยอีเมลของ target.com"

ตัวแทน: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "ความปลอดภัยอีเมล: ความเสี่ยงสูง
          SPF: ~all (soft fail — ปลอมแปลงได้)
          DMARC: p=none (เฉพาะการตรวจสอบ — ไม่บังคับใช้)
          DKIM: พบสำหรับ selector1 (2048-bit, ดี)
          SPF chain: 7 includes, 2 บริการ (Google Workspace, SendGrid)
          M365: ไม่ใช่ผู้เช่า Microsoft
          คำแนะนำ:
          1. อัปเกรด SPF จาก ~all เป็น -all
          2. เปลี่ยน DMARC จาก p=none เป็น p=quarantine, จากนั้น p=reject
          3. เพิ่ม rua= ไปที่ DMARC สำหรับการรายงานรวม"
```

### ข่าวกรองทางประวัติศาสตร์

```
คุณ: "target.com ใช้อะไร 3 ปีที่แล้ว?"

ตัวแทน: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "ประวัติ DNS: target.com ย้ายจาก 198.51.100.1 (DigitalOcean)
          ไปที่ 203.0.113.50 (AWS) ในปี 2023
          Wayback พบ 342 URL ที่ไม่ซ้ำกันรวมถึง:
          - /admin/ (ถูกลบในปี 2024, สามารถเข้าถึงได้)
          - /api/v1/docs (Swagger UI, ยังแคชอยู่)
          - /wp-content/ (เคยเป็น WordPress, ย้าย)
          robots.txt เก่าไม่อนุญาต /internal/ และ /debug/"
```

---

## เครื่องมืออ้างอิง (37 เครื่องมือ)

<details open>
<summary><b>DNS (6) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `dns_lookup` | แก้ไข A, AAAA, MX, TXT, NS, SOA, CNAME, SRV records |
| `dns_reverse` | การค้นหา Reverse DNS (PTR) สำหรับที่อยู่ IP |
| `dns_email_security` | การวิเคราะห์ SPF + DMARC + DKIM พร้อมคะแนนความเสี่ยงและคำแนะนำ |
| `dns_spf_chain` | การแก้ไข SPF include chain แบบเรียกซ้ำพร้อมการตรวจจับบริการ |
| `dns_srv_discover` | การค้นพบบริการ SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, ฯลฯ) |
| `dns_wildcard_check` | การตรวจจับ Wildcard DNS ผ่านการสำรวจโดเมนย่อยแบบสุ่ม |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `whois_domain` | การค้นหาโดเมน RDAP &mdash; ผู้ลงทะเบียน, วันที่, เนมเซิร์ฟเวอร์, ผู้ติดต่อ |
| `whois_ip` | การค้นหา IP RDAP &mdash; ชื่อเครือข่าย, CIDR, ประเทศ, หน่วยงาน |

</details>

<details>
<summary><b>ความโปร่งใสของใบรับรอง (1) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `crtsh_search` | ค้นหา CT logs ผ่าน crt.sh &mdash; การค้นพบโดเมนย่อย + รายละเอียดใบรับรอง |

</details>

<details>
<summary><b>Shodan (4) &mdash; ต้องใช้ SHODAN_API_KEY</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `shodan_host` | รายละเอียด IP: พอร์ตเปิด, บริการ, แบนเนอร์, ช่องโหว่, OS, ASN |
| `shodan_search` | ค้นหาภาษาสอบถาม Shodan (เช่น `apache port:443 country:US`) |
| `shodan_dns_resolve` | การแก้ไขชื่อโฮสต์เป็น IP จำนวนมากผ่าน Shodan |
| `shodan_exploits` | ค้นหาฐานข้อมูลการโจมตีสาธารณะ (PoC, โมดูล Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; ต้องใช้ VT_API_KEY</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `vt_domain` | ชื่อเสียงโดเมน, สถิติการตรวจจับ, หมวดหมู่, DNS records |
| `vt_ip` | ชื่อเสียง IP, สถิติการตรวจจับ, ASN, เครือข่าย |
| `vt_subdomains` | การระบุโดเมนย่อยผ่าน VirusTotal |
| `vt_url` | การสแกน URL + การวิเคราะห์มัลแวร์/ฟิชชิ่ง |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; ต้องใช้ ST_API_KEY</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `st_subdomains` | การระบุโดเมนย่อย (คืนค่า FQDN) |
| `st_dns_history` | DNS records ทางประวัติศาสตร์พร้อมวันที่เห็นครั้งแรก/ครั้งสุดท้าย |
| `st_whois` | WHOIS ขั้นสูงพร้อมผู้ลงทะเบียน/ผู้ดูแล/ผู้ติดต่อด้านเทคนิค |

</details>

<details>
<summary><b>Censys (3) &mdash; ต้องใช้ CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `censys_hosts` | การค้นหาโฮสต์ &mdash; IP, บริการ, พอร์ต, ตำแหน่ง, ASN |
| `censys_host_details` | รายละเอียดเต็มรูปแบบของโฮสต์เดียวพร้อมบริการทั้งหมด |
| `censys_certificates` | การค้นหาใบรับรองโดยโดเมน, ลายนิ้วมือ, ผู้ออก |

</details>

<details>
<summary><b>GeoIP (2) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `geoip_lookup` | ตำแหน่งทางภูมิศาสตร์ IP: ประเทศ, เมือง, ISP, ASN, การตรวจจับพร็อกซี/โฮสติ้ง/VPN |
| `geoip_batch` | ตำแหน่งทางภูมิศาสตร์ IP จำนวนมาก (สูงสุด 100 IP ในครั้งเดียว) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `bgp_asn` | รายละเอียด ASN + prefixes IPv4/IPv6 ที่ประกาศทั้งหมด |
| `bgp_ip` | การค้นหาเส้นทาง IP prefix/ASN พร้อมการจัดสรร RIR |
| `bgp_prefix` | รายละเอียด prefix + ASN ที่ประกาศ |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `wayback_urls` | การค้นพบ URL ที่เก็บถาวร &mdash; ค้นหาจุดสิ้นสุดเก่า, เส้นทางที่ซ่อน, เนื้อหาที่ถูกลบ |
| `wayback_snapshots` | ประวัติสแนปช็อตพร้อมเวลาและลิงก์เก็บถาวรโดยตรง |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `hackertarget_hostsearch` | การค้นพบโฮสต์/โดเมนย่อยพร้อม IP ที่แก้ไข |
| `hackertarget_reverseip` | การค้นหา Reverse IP &mdash; ค้นหาโดเมนทั้งหมดบน IP |
| `hackertarget_aslookup` | การค้นหาข้อมูล ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `m365_tenant` | ค้นพบ ID ผู้เช่า M365, ภูมิภาค และการกำหนดค่า OpenID |
| `m365_userrealm` | ตรวจจับประเภทการตรวจสอบสิทธิ์ (Managed/Federated), แบรนด์ federation, จุดสิ้นสุดการตรวจสอบสิทธิ์ |

</details>

<details>
<summary><b>Meta (2) &mdash; ไม่ต้องใช้คีย์ API</b></summary>

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `osint_list_sources` | แสดงรายการแหล่ง OSINT ทั้งหมด, สถานะคีย์ API และจำนวนเครื่องมือ |
| `osint_domain_recon` | การลาดตระเวนอย่างรวดเร็วที่รวมแหล่งฟรีทั้งหมด (DNS + WHOIS + crt.sh + HackerTarget + ความปลอดภัยอีเมล) |

</details>

---

## แหล่งข้อมูล (12)

| แหล่ง | การตรวจสอบสิทธิ์ | ขีดจำกัดอัตรา | สิ่งที่ให้ |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | ไม่มี | ไม่มี | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR records |
| [RDAP](https://rdap.org/) | ไม่มี | 1 req/s | ข้อมูล WHOIS โดเมนและ IP (ผู้ลงทะเบียน, วันที่, ผู้ติดต่อ, CIDR) |
| [crt.sh](https://crt.sh/) | ไม่มี | 0.5 req/s | Certificate Transparency logs, การค้นพบโดเมนย่อย |
| [ip-api.com](http://ip-api.com/) | ไม่มี | 45 req/min | ตำแหน่งทางภูมิศาสตร์ IP, ISP, ASN, การตรวจจับพร็อกซี/VPN/โฮสติ้ง |
| [BGPView](https://bgpview.io/) | ไม่มี | 0.5 req/s | รายละเอียด ASN, prefixes ที่ประกาศ, ข้อมูลเส้นทาง IP |
| [HackerTarget](https://hackertarget.com/) | ไม่มี | 2 req/s | การค้นหาโฮสต์, reverse IP, การค้นหา ASN (50/วันฟรี) |
| [Wayback Machine](https://web.archive.org/) | ไม่มี | 1 req/s | URL ที่เก็บถาวร, ประวัติสแนปช็อต, เนื้อหาทางประวัติศาสตร์ |
| [Microsoft 365](https://login.microsoftonline.com/) | ไม่มี | ไม่มี | การค้นพบผู้เช่า, การตรวจจับ federation, ประเภทการตรวจสอบสิทธิ์ |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 req/s | การสแกนพอร์ต/บริการ/แบนเนอร์ทั่วอินเทอร์เน็ต |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 req/min | ชื่อเสียงโดเมน/IP/URL, การตรวจจับมัลแวร์ |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 req/s | ประวัติ DNS, การระบุโดเมนย่อย, WHOIS ขั้นสูง |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 req/s | การค้นหาโฮสต์, ความโปร่งใสของใบรับรอง, การค้นพบบริการ |

---

## สถาปัตยกรรม

```
src/
├── index.ts                    จุดเริ่มต้น, การกำหนดค่า env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 คำนิยามเครื่องมือ (Zod schemas)
│   └── mcp-server.ts           เซิร์ฟเวอร์ MCP + stdio transport
├── dns/
│   └── index.ts                6 ฟังก์ชัน — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 ฟังก์ชัน — domain RDAP, IP RDAP
├── crtsh/
│   └── index.ts                การค้นหา CT log พร้อมลบที่ซ้ำ + caching
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domain, IP, subdomains, URL scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS history, WHOIS
├── censys/
│   └── index.ts                Host search, host details, certificates
├── geoip/
│   └── index.ts                ตำแหน่งทางภูมิศาสตร์ IP เดียว + จำนวนมาก
├── bgp/
│   └── index.ts                ASN, IP prefix, prefix details
├── wayback/
│   └── index.ts                การค้นหา URL + ประวัติสแนปช็อต
├── hackertarget/
│   └── index.ts                Host search, reverse IP, ASN
├── m365/
│   └── index.ts                การค้นพบผู้เช่า, user realm/federation
├── meta/
│   ├── sources.ts              การตรวจสอบความพร้อมใช้งานของแหล่ง
│   └── recon.ts                การลาดตระเวนโดเมนแหล่งฟรีรวม
└── utils/
    ├── rate-limiter.ts          ตัวจำกัดอัตราตามคิว
    ├── cache.ts                 แคช TTL แบบทั่วไป
    └── require-key.ts           ตัวช่วยการตรวจสอบคีย์ API
```

**การตัดสินใจออกแบบ:**

- **12 providers, 1 server** &mdash; ทุกแหล่ง OSINT เป็นโมดูลอิสระ ตัวแทนเลือกเครื่องมือที่จะใช้ตามคำสอบถาม
- **21 เครื่องมือฟรี** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget และ M365 ทำงานโดยไม่มีคีย์ API ใดๆ แหล่งพรีเมียมเป็นตัวเพิ่มเติม
- **คำสอบถามขนาน** &mdash; `osint_domain_recon` เรียก 8 แหล่งผ่าน `Promise.allSettled` หากแหล่งหนึ่งหมดเวลา ส่วนที่เหลือยังคืนข้อมูล
- **ตัวจำกัดอัตราต่อผู้ให้บริการ** &mdash; แต่ละแหล่งข้อมูลมีอินสแตนซ์ `RateLimiter` ของตัวเองที่ปรับเทียบให้เหมาะกับขีดจำกัดของ API นั้น ไม่มีคอขวดที่ใช้ร่วมกัน
- **TTL caching** &mdash; ผลลัพธ์ crt.sh (15นาที), BGP (30นาที), Shodan (5นาที), VirusTotal (10นาที) ถูกแคชเพื่อหลีกเลี่ยงการเรียก API ซ้ำซ้อนระหว่างเวิร์กโฟลว์หลายเครื่องมือ
- **การลดประสิทธิภาพอย่างสง่างาม** &mdash; การขาดคีย์ API ไม่ทำให้เซิร์ฟเวอร์ล่ม เครื่องมือคืนข้อความแสดงข้อผิดพลาดที่อธิบาย: "ตั้งค่า SHODAN_API_KEY เพื่อเปิดใช้งานเครื่องมือ Shodan"
- **การวิเคราะห์ SPF chain** &mdash; การแก้ไข include แบบเรียกซ้ำพร้อมการตรวจจับลูป, การระบุบริการ (Google Workspace, Microsoft 365, SendGrid, ฯลฯ) และการตรวจสอบขีดจำกัดการค้นหา RFC 7208
- **2 dependencies** &mdash; `@modelcontextprotocol/sdk` และ `zod` HTTP ทั้งหมดผ่าน `fetch` native DNS ทั้งหมดผ่าน `node:dns/promises`

---

## ข้อจำกัด

- ขีดจำกัดอัตราระดับฟรีใช้: HackerTarget (50/วัน), ip-api.com (45/นาที), VirusTotal community (4/นาที)
- crt.sh อาจช้าสำหรับโดเมนขนาดใหญ่ (มีการใช้หมดเวลา 30 วินาที)
- ip-api.com ต้องการ HTTP (ไม่ใช่ HTTPS) สำหรับระดับฟรี
- Wayback Machine CDX API อาจหมดเวลาสำหรับโดเมนที่ได้รับความนิยมมาก
- WHOIS ผ่าน RDAP อาจไม่ครอบคลุม TLD ทั้งหมด (บางผู้ลงทะเบียนยังไม่รองรับ RDAP)
- ทดสอบ macOS / Linux (ไม่ได้ทดสอบ Windows)

---

## ส่วนหนึ่งของ MCP Security Suite

| โครงการ | โดเมน | เครื่องมือ |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | การทดสอบความปลอดภัยตามเบราว์เซอร์ | 39 เครื่องมือ, Firefox, การทดสอบการแทรก |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | ความปลอดภัยคลาวด์ (AWS/Azure/GCP) | 38 เครื่องมือ, 60+ การตรวจสอบ |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | ท่าทางความปลอดภัย GitHub | 39 เครื่องมือ, 45 การตรวจสอบ |
| [cve-mcp](https://github.com/badchars/cve-mcp) | ข่าวกรองช่องโหว่ | 23 เครื่องมือ, 5 แหล่ง |
| **osint-mcp-server** | **OSINT และการลาดตระเวน** | **37 เครื่องมือ, 12 แหล่ง** |

---

<p align="center">
<b>สำหรับการทดสอบและการประเมินความปลอดภัยที่ได้รับอนุญาตเท่านั้น</b><br>
ตรวจสอบให้แน่ใจเสมอว่าคุณได้รับอนุญาตอย่างเหมาะสมก่อนดำเนินการลาดตระเวนบนเป้าหมายใดๆ
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; สร้างด้วย Bun + TypeScript
</p>
