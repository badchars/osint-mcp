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
  <strong>বাংলা</strong> |
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

<h3 align="center">AI এজেন্টের জন্য OSINT এবং রিকনেসান্স ইন্টেলিজেন্স।</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; একটি একক MCP সার্ভারে একত্রিত।<br>
  আপনার AI এজেন্ট <b>চাহিবামাত্র সম্পূর্ণ-স্পেকট্রাম OSINT</b> পায়, ১২টি ব্রাউজার ট্যাব এবং ম্যানুয়াল সংশ্লেষণ নয়।
</p>

<br>

<p align="center">
  <a href="#সমস্যা">সমস্যা</a> &bull;
  <a href="#এটি-কীভাবে-ভিন্ন">এটি কীভাবে ভিন্ন</a> &bull;
  <a href="#দ্রুত-শুরু">দ্রুত শুরু</a> &bull;
  <a href="#ai-কী-করতে-পারে">AI কী করতে পারে</a> &bull;
  <a href="#টুলস-রেফারেন্স-৩৭-টি-টুল">টুলস (৩৭)</a> &bull;
  <a href="#ডেটা-সোর্স-১২">ডেটা সোর্স</a> &bull;
  <a href="#আর্কিটেকচার">আর্কিটেকচার</a>
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

## সমস্যা

OSINT সংগ্রহ প্রতিটি অনুপ্রবেশ পরীক্ষা, বাগ বাউন্টি এবং হুমকি মূল্যায়নের প্রথম ধাপ। আপনার প্রয়োজনীয় ডেটা এক ডজন প্ল্যাটফর্ম জুড়ে ছড়িয়ে আছে &mdash; প্রতিটির নিজস্ব API, নিজস্ব অনুমোদন, নিজস্ব রেট লিমিট, নিজস্ব আউটপুট ফরম্যাট। আজ আপনি Shodan এক ট্যাবে খুলেন, অন্যটিতে VirusTotal, টার্মিনালে `dig` চালান, WHOIS থেকে কপি-পেস্ট করেন, সার্টিফিকেটের জন্য crt.sh এ যান, এবং তারপর সবকিছু ম্যানুয়ালি সংশ্লেষণে ৩০ মিনিট ব্যয় করেন।

```
ঐতিহ্যবাহী OSINT কর্মপ্রবাহ:
  DNS রেকর্ড সমাধান            →  dig / nslookup CLI
  WHOIS রেজিস্ট্রেশন চেক       →  whois CLI বা ওয়েব টুল
  সাবডোমেইন গণনা              →  crt.sh + SecurityTrails + VirusTotal (৩টি ভিন্ন UI)
  খোলা পোর্ট/সার্ভিস স্ক্যান   →  Shodan ওয়েব ইন্টারফেস
  ডোমেইন রেপুটেশন চেক         →  VirusTotal ওয়েব ইন্টারফেস
  IP ইনফ্রাস্ট্রাকচার ম্যাপ    →  Censys + BGP লুকআপ
  আর্কাইভ করা পেজ খুঁজুন       →  Wayback Machine ওয়েব UI
  ইমেল নিরাপত্তা চেক           →  ম্যানুয়াল MX/SPF/DMARC লুকআপ
  সবকিছু সংশ্লেষণ              →  স্প্রেডশীটে কপি-পেস্ট
  ─────────────────────────────────
  মোট: প্রতি টার্গেট ৪৫+ মিনিট, বেশিরভাগ সময় কনটেক্সট পরিবর্তনে
```

**osint-mcp** আপনার AI এজেন্টকে [Model Context Protocol](https://modelcontextprotocol.io) এর মাধ্যমে ১২টি ডেটা সোর্স জুড়ে ৩৭টি টুল দেয়। এজেন্ট সমস্ত সোর্স সমান্তরালে অনুসন্ধান করে, ডেটা সংশ্লেষণ করে, ঝুঁকি চিহ্নিত করে এবং একটি একক কথোপকথনে একীভূত ইন্টেলিজেন্স চিত্র উপস্থাপন করে।

```
osint-mcp এর সাথে:
  আপনি: "target.com এর উপর সম্পূর্ণ রিকন করুন"

  এজেন্ট: → DNS: ৪টি A রেকর্ড, ৩টি MX (Google Workspace), ২টি NS
         → WHOIS: ২০১৯ এ নিবন্ধিত, ২০২৫ এ শেষ, GoDaddy
         → crt.sh: CT লগ থেকে ৪৭টি অনন্য সাবডোমেইন
         → HackerTarget: IP সহ ২৩টি হোস্ট
         → Email: SPF soft-fail (~all), DMARC p=none, DKIM নেই
         → Shodan: ৩টি IP, ১২টি খোলা পোর্ট, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: পরিষ্কার রেপুটেশন, ০ ডিটেকশন
         → "target.com এর ৪৭টি সাবডোমেইন আছে, দুর্বল ইমেল নিরাপত্তা
            (SPF soft-fail, শুধুমাত্র DMARC মনিটরিং), এবং একটি IP
            Apache 2.4.49 চালাচ্ছে যার একটি পরিচিত path traversal CVE আছে।
            অগ্রাধিকার: Apache প্যাচ করুন, SPF -all এ আপগ্রেড করুন, DMARC p=reject সেট করুন।"
```

---

## এটি কীভাবে ভিন্ন

বিদ্যমান OSINT টুলগুলি আপনাকে একবারে একটি সোর্স থেকে কাঁচা ডেটা দেয়। osint-mcp আপনার AI এজেন্টকে **সমস্ত সোর্স একসাথে যুক্তি করার** ক্ষমতা দেয়।

<table>
<thead>
<tr>
<th></th>
<th>ঐতিহ্যবাহী OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>ইন্টারফেস</b></td>
<td>১২টি ভিন্ন ওয়েব UI, CLI এবং API</td>
<td>MCP &mdash; AI এজেন্ট কথোপকথনমূলকভাবে টুল কল করে</td>
</tr>
<tr>
<td><b>ডেটা সোর্স</b></td>
<td>একবারে একটি প্ল্যাটফর্ম</td>
<td>১২টি সোর্স সমান্তরালে অনুসন্ধান করা হয়</td>
</tr>
<tr>
<td><b>সাবডোমেইন গণনা</b></td>
<td>crt.sh অথবা SecurityTrails অথবা VirusTotal</td>
<td>এজেন্ট তিনটি + HackerTarget একত্রিত করে, ডুপ্লিকেট সরিয়ে দেয়</td>
</tr>
<tr>
<td><b>সংশ্লেষণ</b></td>
<td>ট্যাবগুলির মধ্যে ম্যানুয়াল কপি-পেস্ট</td>
<td>এজেন্ট ক্রস-রেফারেন্স করে: "Shodan থেকে এই IP Censys-এও উপস্থিত, মেয়াদোত্তীর্ণ সার্টিফিকেট সহ"</td>
</tr>
<tr>
<td><b>ইমেল নিরাপত্তা</b></td>
<td>পৃথক SPF/DMARC/DKIM লুকআপ</td>
<td>ঝুঁকি স্কোর এবং কার্যকর সুপারিশ সহ সম্মিলিত বিশ্লেষণ</td>
</tr>
<tr>
<td><b>ইনফ্রাস্ট্রাকচার</b></td>
<td>পৃথকভাবে GeoIP + BGP + WHOIS</td>
<td>এজেন্ট সম্পূর্ণ ইনফ্রাস্ট্রাকচার ম্যাপ করে: ASN, প্রিফিক্স, জিওলোকেশন, মালিকানা</td>
</tr>
<tr>
<td><b>API কী</b></td>
<td>প্রায় সবকিছুর জন্য প্রয়োজনীয়</td>
<td>২১টি টুল বিনামূল্যে কাজ করে, ঐচ্ছিক API কী সহ আরও ১৬টি</td>
</tr>
<tr>
<td><b>সেটআপ</b></td>
<td>প্রতিটি টুল ইনস্টল করুন, প্রতিটি কনফিগ পরিচালনা করুন</td>
<td><code>npx osint-mcp</code> &mdash; একটি কমান্ড, শূন্য কনফিগ</td>
</tr>
</tbody>
</table>

---

## দ্রুত শুরু

### বিকল্প ১: npx (ইনস্টল ছাড়া)

```bash
npx osint-mcp
```

২১টি পাবলিক OSINT টুল অবিলম্বে কাজ করে। কোনো API কী প্রয়োজন নেই।

### বিকল্প ২: ক্লোন

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### পরিবেশ ভেরিয়েবল (ঐচ্ছিক)

```bash
# প্রিমিয়াম OSINT সোর্স — সব ঐচ্ছিক
export SHODAN_API_KEY=your-key           # ৪টি Shodan টুল সক্রিয় করে
export VT_API_KEY=your-key               # ৪টি VirusTotal টুল সক্রিয় করে
export ST_API_KEY=your-key               # ৩টি SecurityTrails টুল সক্রিয় করে
export CENSYS_API_ID=your-id             # ৩টি Censys টুল সক্রিয় করে
export CENSYS_API_SECRET=your-secret     # CENSYS_API_ID এর সাথে প্রয়োজনীয়
```

সমস্ত প্রিমিয়াম API কী ঐচ্ছিক। এগুলি ছাড়া, আপনি এখনও DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget এবং Microsoft 365 টেন্যান্ট আবিষ্কার কভার করে ২১টি টুল পাবেন।

### আপনার AI এজেন্টের সাথে সংযুক্ত করুন

<details open>
<summary><b>Claude Code</b></summary>

```bash
# npx দিয়ে
claude mcp add osint-mcp -- npx osint-mcp

# লোকাল ক্লোন দিয়ে
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` এ যোগ করুন:

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
<summary><b>Cursor / Windsurf / অন্যান্য MCP ক্লায়েন্ট</b></summary>

একই JSON কনফিগ ফরম্যাট। কমান্ডটি `npx osint-mcp` বা আপনার লোকাল ইনস্টলেশন পাথে নির্দেশ করুন।

</details>

### অনুসন্ধান শুরু করুন

```
আপনি: "example.com সম্পর্কে আপনি কী খুঁজে পেতে পারেন?"
```

ব্যস। এজেন্ট স্বয়ংক্রিয়ভাবে DNS, WHOIS, সাবডোমেইন, ইমেল নিরাপত্তা এবং আরও অনেক কিছু পরিচালনা করে।

---

## AI কী করতে পারে

### ডোমেইন রিকনেসান্স

```
আপনি: "target.com এর উপর সম্পূর্ণ রিকন করুন"

এজেন্ট: → osint_domain_recon {domain: "target.com"}
       → DNS: A রেকর্ড ৩টি IP এ নির্দেশ করে (AWS us-east-1)
       → WHOIS: ২০১৮ সালে Namecheap এর মাধ্যমে নিবন্ধিত, ২০২৬ এ শেষ
       → crt.sh: ৬২টি সাবডোমেইন আবিষ্কৃত
       → HackerTarget: সমাধান করা IP সহ ৩১টি হোস্ট
       → Email: SPF hard-fail, DMARC p=reject, DKIM পাওয়া গেছে (selector1)
       → "target.com ইমেল নিরাপত্তার জন্য ভালভাবে কনফিগার করা।
          ৬২টি সাবডোমেইন পাওয়া গেছে — উল্লেখযোগ্য: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          ইনফ্রাস্ট্রাকচার AWS (us-east-1) এ আছে।"
```

### আক্রমণ পৃষ্ঠ ম্যাপিং

```
আপনি: "203.0.113.50 এর জন্য আক্রমণ পৃষ্ঠ ম্যাপ করুন"

এজেন্ট: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          খোলা পোর্ট: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, 8080 এ nginx রিভার্স প্রক্সি
          রিভার্স DNS: web1.target.com
          Shodan দ্বারা ৩টি পরিচিত CVE ফ্ল্যাগ করা হয়েছে"
```

### সাবডোমেইন গণনা (বহু-সোর্স)

```
আপনি: "উপলব্ধ প্রতিটি সোর্স ব্যবহার করে target.com এর সমস্ত সাবডোমেইন খুঁজুন"

এজেন্ট: → crtsh_search {domain: "target.com"}              → ৬২টি সাবডোমেইন
       → st_subdomains {domain: "target.com"}              → ৮৪টি সাবডোমেইন
       → vt_subdomains {domain: "target.com"}              → ৪১টি সাবডোমেইন
       → hackertarget_hostsearch {domain: "target.com"}    → ৩১টি হোস্ট
       → dns_wildcard_check {domain: "target.com"}         → কোনো ওয়াইল্ডকার্ড নেই
       → "৪টি সোর্স জুড়ে ডুপ্লিকেট সরানোর পরে ১২৭টি অনন্য সাবডোমেইন।
          উল্লেখযোগ্য ফলাফল: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD এক্সপোজার ঝুঁকি),
          old-admin.target.com (সম্ভাব্য লিগেসি সিস্টেম)"
```

### ইমেল নিরাপত্তা অডিট

```
আপনি: "target.com এর ইমেল নিরাপত্তা অবস্থান বিশ্লেষণ করুন"

এজেন্ট: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "ইমেল নিরাপত্তা: উচ্চ ঝুঁকি
          SPF: ~all (soft fail — স্পুফযোগ্য)
          DMARC: p=none (শুধুমাত্র মনিটরিং — প্রয়োগ করছে না)
          DKIM: selector1 এর জন্য পাওয়া গেছে (2048-bit, ভাল)
          SPF চেইন: ৭টি include, ২টি সার্ভিস (Google Workspace, SendGrid)
          M365: Microsoft টেন্যান্ট নয়
          সুপারিশ:
          1. SPF ~all থেকে -all এ আপগ্রেড করুন
          2. DMARC p=none থেকে p=quarantine, তারপর p=reject এ পরিবর্তন করুন
          3. সমষ্টিগত রিপোর্টিংয়ের জন্য DMARC এ rua= যোগ করুন"
```

### ঐতিহাসিক ইন্টেলিজেন্স

```
আপনি: "৩ বছর আগে target.com কী চালাচ্ছিল?"

এজেন্ট: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS ইতিহাস: target.com ২০২৩ সালে 198.51.100.1 (DigitalOcean)
          থেকে 203.0.113.50 (AWS) এ স্থানান্তরিত হয়েছে।
          Wayback সহ ৩৪২টি অনন্য URL পেয়েছে:
          - /admin/ (২০২৪ এ সরানো হয়েছে, অ্যাক্সেসযোগ্য ছিল)
          - /api/v1/docs (Swagger UI, এখনও ক্যাশে আছে)
          - /wp-content/ (WordPress ছিল, মাইগ্রেট করা হয়েছে)
          পুরানো robots.txt /internal/ এবং /debug/ অনুমোদন করেনি"
```

---

## টুলস রেফারেন্স (৩৭টি টুল)

<details open>
<summary><b>DNS (৬) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `dns_lookup` | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV রেকর্ড সমাধান করুন |
| `dns_reverse` | একটি IP ঠিকানার জন্য রিভার্স DNS (PTR) লুকআপ |
| `dns_email_security` | ঝুঁকি স্কোরিং এবং সুপারিশ সহ SPF + DMARC + DKIM বিশ্লেষণ |
| `dns_spf_chain` | সার্ভিস সনাক্তকরণ সহ পুনরাবৃত্তিমূলক SPF include চেইন সমাধান |
| `dns_srv_discover` | SRV + CNAME সার্ভিস আবিষ্কার (Autodiscover, LDAP, SIP, Kerberos, ইত্যাদি) |
| `dns_wildcard_check` | র্যান্ডম সাবডোমেইন প্রোবের মাধ্যমে ওয়াইল্ডকার্ড DNS সনাক্তকরণ |

</details>

<details>
<summary><b>WHOIS / RDAP (২) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `whois_domain` | RDAP ডোমেইন লুকআপ &mdash; রেজিস্ট্রার, তারিখ, নেমসার্ভার, পরিচিতি |
| `whois_ip` | RDAP IP লুকআপ &mdash; নেটওয়ার্ক নাম, CIDR, দেশ, সত্তা |

</details>

<details>
<summary><b>সার্টিফিকেট স্বচ্ছতা (১) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `crtsh_search` | crt.sh এর মাধ্যমে CT লগ অনুসন্ধান করুন &mdash; সাবডোমেইন আবিষ্কার + সার্টিফিকেট বিবরণ |

</details>

<details>
<summary><b>Shodan (৪) &mdash; SHODAN_API_KEY প্রয়োজন</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `shodan_host` | IP বিবরণ: খোলা পোর্ট, সার্ভিস, ব্যানার, দুর্বলতা, OS, ASN |
| `shodan_search` | Shodan ক্যোয়ারী ভাষা অনুসন্ধান করুন (যেমন `apache port:443 country:US`) |
| `shodan_dns_resolve` | Shodan এর মাধ্যমে বাল্ক হোস্টনাম-থেকে-IP সমাধান |
| `shodan_exploits` | পাবলিক এক্সপ্লয়েট ডাটাবেস অনুসন্ধান করুন (PoC, Metasploit মডিউল) |

</details>

<details>
<summary><b>VirusTotal (৪) &mdash; VT_API_KEY প্রয়োজন</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `vt_domain` | ডোমেইন রেপুটেশন, ডিটেকশন পরিসংখ্যান, ক্যাটাগরি, DNS রেকর্ড |
| `vt_ip` | IP রেপুটেশন, ডিটেকশন পরিসংখ্যান, ASN, নেটওয়ার্ক |
| `vt_subdomains` | VirusTotal এর মাধ্যমে সাবডোমেইন গণনা |
| `vt_url` | URL স্ক্যান + ম্যালওয়্যার/ফিশিং বিশ্লেষণ |

</details>

<details>
<summary><b>SecurityTrails (৩) &mdash; ST_API_KEY প্রয়োজন</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `st_subdomains` | সাবডোমেইন গণনা (FQDN ফেরত দেয়) |
| `st_dns_history` | প্রথম/শেষ দেখা তারিখ সহ ঐতিহাসিক DNS রেকর্ড |
| `st_whois` | রেজিস্ট্রান্ট/অ্যাডমিন/টেকনিক্যাল পরিচিতি সহ উন্নত WHOIS |

</details>

<details>
<summary><b>Censys (৩) &mdash; CENSYS_API_ID + CENSYS_API_SECRET প্রয়োজন</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `censys_hosts` | হোস্ট অনুসন্ধান &mdash; IP, সার্ভিস, পোর্ট, অবস্থান, ASN |
| `censys_host_details` | সমস্ত সার্ভিস সহ একক হোস্টের সম্পূর্ণ বিবরণ |
| `censys_certificates` | ডোমেইন, ফিঙ্গারপ্রিন্ট, ইস্যুকারী দ্বারা সার্টিফিকেট অনুসন্ধান |

</details>

<details>
<summary><b>GeoIP (২) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `geoip_lookup` | IP জিওলোকেশন: দেশ, শহর, ISP, ASN, প্রক্সি/হোস্টিং/VPN সনাক্তকরণ |
| `geoip_batch` | ব্যাচ IP জিওলোকেশন (একবারে ১০০টি IP পর্যন্ত) |

</details>

<details>
<summary><b>BGP / ASN (৩) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `bgp_asn` | ASN বিবরণ + সমস্ত ঘোষিত IPv4/IPv6 প্রিফিক্স |
| `bgp_ip` | RIR বরাদ্দ সহ IP প্রিফিক্স/ASN রাউটিং লুকআপ |
| `bgp_prefix` | প্রিফিক্স বিবরণ + ঘোষণাকারী ASN |

</details>

<details>
<summary><b>Wayback Machine (২) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `wayback_urls` | আর্কাইভ করা URL আবিষ্কার &mdash; পুরানো এন্ডপয়েন্ট, লুকানো পাথ, সরানো কন্টেন্ট খুঁজুন |
| `wayback_snapshots` | টাইমস্ট্যাম্প এবং সরাসরি আর্কাইভ লিঙ্ক সহ স্ন্যাপশট ইতিহাস |

</details>

<details>
<summary><b>HackerTarget (৩) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `hackertarget_hostsearch` | সমাধান করা IP সহ হোস্ট/সাবডোমেইন আবিষ্কার |
| `hackertarget_reverseip` | রিভার্স IP লুকআপ &mdash; একটি IP এ সমস্ত ডোমেইন খুঁজুন |
| `hackertarget_aslookup` | ASN তথ্য লুকআপ |

</details>

<details>
<summary><b>Microsoft 365 (২) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `m365_tenant` | M365 টেন্যান্ট ID, অঞ্চল এবং OpenID কনফিগারেশন আবিষ্কার করুন |
| `m365_userrealm` | auth টাইপ (Managed/Federated), ফেডারেশন ব্র্যান্ড, auth এন্ডপয়েন্ট সনাক্ত করুন |

</details>

<details>
<summary><b>মেটা (২) &mdash; কোনো API কী নেই</b></summary>

| টুল | বর্ণনা |
|------|-------------|
| `osint_list_sources` | সমস্ত OSINT সোর্স, API কী স্ট্যাটাস এবং টুল সংখ্যা তালিকাভুক্ত করুন |
| `osint_domain_recon` | সমস্ত বিনামূল্যে সোর্স একত্রিত করে দ্রুত রিকন (DNS + WHOIS + crt.sh + HackerTarget + ইমেল নিরাপত্তা) |

</details>

---

## ডেটা সোর্স (১২)

| সোর্স | অনুমোদন | রেট লিমিট | এটি কী প্রদান করে |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | কিছুই না | কিছুই না | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR রেকর্ড |
| [RDAP](https://rdap.org/) | কিছুই না | ১ req/s | ডোমেইন এবং IP WHOIS ডেটা (রেজিস্ট্রার, তারিখ, পরিচিতি, CIDR) |
| [crt.sh](https://crt.sh/) | কিছুই না | ০.৫ req/s | সার্টিফিকেট স্বচ্ছতা লগ, সাবডোমেইন আবিষ্কার |
| [ip-api.com](http://ip-api.com/) | কিছুই না | ৪৫ req/min | IP জিওলোকেশন, ISP, ASN, প্রক্সি/VPN/হোস্টিং সনাক্তকরণ |
| [BGPView](https://bgpview.io/) | কিছুই না | ০.৫ req/s | ASN বিবরণ, ঘোষিত প্রিফিক্স, IP রাউটিং তথ্য |
| [HackerTarget](https://hackertarget.com/) | কিছুই না | ২ req/s | হোস্ট অনুসন্ধান, রিভার্স IP, ASN লুকআপ (দিনে ৫০ বিনামূল্যে) |
| [Wayback Machine](https://web.archive.org/) | কিছুই না | ১ req/s | আর্কাইভ করা URL, স্ন্যাপশট ইতিহাস, ঐতিহাসিক কন্টেন্ট |
| [Microsoft 365](https://login.microsoftonline.com/) | কিছুই না | কিছুই না | টেন্যান্ট আবিষ্কার, ফেডারেশন সনাক্তকরণ, auth টাইপ |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | ১ req/s | ইন্টারনেট-ব্যাপী পোর্ট/সার্ভিস/ব্যানার স্ক্যানিং |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | ৪ req/min | ডোমেইন/IP/URL রেপুটেশন, ম্যালওয়্যার সনাক্তকরণ |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | ১ req/s | DNS ইতিহাস, সাবডোমেইন গণনা, উন্নত WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | ১ req/s | হোস্ট অনুসন্ধান, সার্টিফিকেট স্বচ্ছতা, সার্ভিস আবিষ্কার |

---

## আর্কিটেকচার

```
src/
├── index.ts                    এন্ট্রি পয়েন্ট, env কনফিগ, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                ৩৭টি টুল ডেফিনিশন (Zod স্কিমা)
│   └── mcp-server.ts           MCP সার্ভার + stdio ট্রান্সপোর্ট
├── dns/
│   └── index.ts                ৬টি ফাংশন — লুকআপ, রিভার্স, ইমেল, SPF চেইন, SRV, ওয়াইল্ডকার্ড
├── whois/
│   └── index.ts                ২টি ফাংশন — ডোমেইন RDAP, IP RDAP
├── crtsh/
│   └── index.ts                ডুপ্লিকেট সরানো + ক্যাশিং সহ CT লগ অনুসন্ধান
├── shodan/
│   └── index.ts                হোস্ট, অনুসন্ধান, DNS সমাধান, এক্সপ্লয়েট
├── virustotal/
│   └── index.ts                ডোমেইন, IP, সাবডোমেইন, URL স্ক্যান
├── securitytrails/
│   └── index.ts                সাবডোমেইন, DNS ইতিহাস, WHOIS
├── censys/
│   └── index.ts                হোস্ট অনুসন্ধান, হোস্ট বিবরণ, সার্টিফিকেট
├── geoip/
│   └── index.ts                একক + ব্যাচ IP জিওলোকেশন
├── bgp/
│   └── index.ts                ASN, IP প্রিফিক্স, প্রিফিক্স বিবরণ
├── wayback/
│   └── index.ts                URL অনুসন্ধান + স্ন্যাপশট ইতিহাস
├── hackertarget/
│   └── index.ts                হোস্ট অনুসন্ধান, রিভার্স IP, ASN
├── m365/
│   └── index.ts                টেন্যান্ট আবিষ্কার, ইউজার realm/ফেডারেশন
├── meta/
│   ├── sources.ts              সোর্স উপলব্ধতা চেক
│   └── recon.ts                সম্মিলিত বিনামূল্যে-সোর্স ডোমেইন রিকন
└── utils/
    ├── rate-limiter.ts          কিউ-ভিত্তিক রেট লিমিটার
    ├── cache.ts                 সাধারণ TTL ক্যাশ
    └── require-key.ts           API কী যাচাইকরণ সহায়ক
```

**ডিজাইন সিদ্ধান্ত:**

- **১২টি প্রোভাইডার, ১টি সার্ভার** &mdash; প্রতিটি OSINT সোর্স একটি স্বতন্ত্র মডিউল। এজেন্ট ক্যোয়ারীর ভিত্তিতে কোন টুল ব্যবহার করবে তা নির্বাচন করে।
- **২১টি বিনামূল্যে টুল** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget এবং M365 কোনো API কী ছাড়াই কাজ করে। প্রিমিয়াম সোর্স অ্যাডিটিভ।
- **সমান্তরাল ক্যোয়ারী** &mdash; `osint_domain_recon` `Promise.allSettled` এর মাধ্যমে ৮টি সোর্স কল করে। যদি একটি সোর্স টাইমআউট হয়, বাকিগুলি এখনও ডেটা ফেরত দেয়।
- **প্রতি-প্রোভাইডার রেট লিমিটার** &mdash; প্রতিটি ডেটা সোর্সের নিজস্ব `RateLimiter` ইনস্ট্যান্স আছে যা সেই API এর সীমার সাথে সামঞ্জস্যপূর্ণ। কোনো শেয়ার করা বাধা নেই।
- **TTL ক্যাশিং** &mdash; crt.sh (১৫মিনিট), BGP (৩০মিনিট), Shodan (৫মিনিট), VirusTotal (১০মিনিট) ফলাফল মাল্টি-টুল ওয়ার্কফ্লোর সময় অপ্রয়োজনীয় API কল এড়াতে ক্যাশ করা হয়।
- **সুন্দর অবনমন** &mdash; অনুপস্থিত API কী সার্ভার ক্র্যাশ করায় না। টুল বর্ণনামূলক ত্রুটি বার্তা ফেরত দেয়: "Shodan টুল সক্রিয় করতে SHODAN_API_KEY সেট করুন।"
- **SPF চেইন বিশ্লেষণ** &mdash; লুপ সনাক্তকরণ, সার্ভিস সনাক্তকরণ (Google Workspace, Microsoft 365, SendGrid, ইত্যাদি) এবং RFC 7208 লুকআপ সীমা চেকিং সহ পুনরাবৃত্তিমূলক include সমাধান।
- **২টি নির্ভরতা** &mdash; `@modelcontextprotocol/sdk` এবং `zod`। নেটিভ `fetch` এর মাধ্যমে সমস্ত HTTP। `node:dns/promises` এর মাধ্যমে সমস্ত DNS।

---

## সীমাবদ্ধতা

- ফ্রি-টায়ার রেট লিমিট প্রযোজ্য: HackerTarget (দিনে ৫০), ip-api.com (মিনিটে ৪৫), VirusTotal কমিউনিটি (মিনিটে ৪)
- বড় ডোমেইনের জন্য crt.sh ধীর হতে পারে (৩০সে টাইমআউট প্রয়োগ করা হয়েছে)
- ফ্রি টায়ারের জন্য ip-api.com HTTP প্রয়োজন (HTTPS নয়)
- খুব জনপ্রিয় ডোমেইনের জন্য Wayback Machine CDX API টাইমআউট হতে পারে
- RDAP এর মাধ্যমে WHOIS সমস্ত TLD কভার নাও করতে পারে (কিছু রেজিস্ট্রার এখনও RDAP সমর্থন করে না)
- macOS / Linux পরীক্ষিত (Windows পরীক্ষিত নয়)

---

## MCP সিকিউরিটি স্যুটের অংশ

| প্রকল্প | ডোমেইন | টুল |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ব্রাউজার-ভিত্তিক নিরাপত্তা পরীক্ষা | ৩৯টি টুল, Firefox, ইনজেকশন পরীক্ষা |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | ক্লাউড নিরাপত্তা (AWS/Azure/GCP) | ৩৮টি টুল, ৬০+ চেক |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub নিরাপত্তা অবস্থান | ৩৯টি টুল, ৪৫টি চেক |
| [cve-mcp](https://github.com/badchars/cve-mcp) | দুর্বলতা ইন্টেলিজেন্স | ২৩টি টুল, ৫টি সোর্স |
| **osint-mcp** | **OSINT এবং রিকনেসান্স** | **৩৭টি টুল, ১২টি সোর্স** |

---

<p align="center">
<b>শুধুমাত্র অনুমোদিত নিরাপত্তা পরীক্ষা এবং মূল্যায়নের জন্য।</b><br>
কোনো টার্গেটে রিকনেসান্স করার আগে সর্বদা নিশ্চিত করুন যে আপনার যথাযথ অনুমোদন আছে।
</p>

<p align="center">
  <a href="LICENSE">MIT লাইসেন্স</a> &bull; Bun + TypeScript দিয়ে তৈরি
</p>
