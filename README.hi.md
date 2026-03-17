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
  <a href="README.vi.md">Tiếng Việt</a> |
  <strong>हिन्दी</strong>
</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">AI एजेंटों के लिए OSINT और टोही खुफिया जानकारी।</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; सभी एक MCP सर्वर में एकीकृत।<br>
  आपके AI एजेंट को <b>सम्पूर्ण-स्पेक्ट्रम OSINT मांग पर</b> मिलती है, 12 ब्राउज़र टैब और मैन्युअल सहसंबंध नहीं।
</p>

<br>

<p align="center">
  <a href="#समस्या">समस्या</a> &bull;
  <a href="#यह-कैसे-अलग-है">यह कैसे अलग है</a> &bull;
  <a href="#त्वरित-शुरुआत">त्वरित शुरुआत</a> &bull;
  <a href="#ai-क्या-कर-सकता-है">AI क्या कर सकता है</a> &bull;
  <a href="#उपकरण-संदर्भ-37-उपकरण">उपकरण (37)</a> &bull;
  <a href="#डेटा-स्रोत-12">डेटा स्रोत</a> &bull;
  <a href="#वास्तुकला">वास्तुकला</a>
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

## समस्या

OSINT संग्रह हर पेनिट्रेशन टेस्ट, बग बाउंटी और खतरा मूल्यांकन का पहला कदम है। आपको जिस डेटा की आवश्यकता है वह एक दर्जन प्लेटफ़ॉर्म पर बिखरा हुआ है &mdash; प्रत्येक का अपना API, अपना प्रमाणीकरण, अपनी दर सीमाएँ, अपना आउटपुट प्रारूप। आज आप एक टैब में Shodan खोलते हैं, दूसरे में VirusTotal, टर्मिनल में `dig` चलाते हैं, WHOIS से कॉपी-पेस्ट करते हैं, प्रमाणपत्रों के लिए crt.sh पर जाते हैं, और फिर सब कुछ मैन्युअल रूप से सहसंबंधित करने में 30 मिनट लगाते हैं।

```
पारंपरिक OSINT कार्यप्रवाह:
  DNS रिकॉर्ड हल करें              →  dig / nslookup CLI
  WHOIS पंजीकरण जाँचें             →  whois CLI या वेब टूल
  सबडोमेन गणना करें                →  crt.sh + SecurityTrails + VirusTotal (3 अलग-अलग UI)
  खुले पोर्ट/सेवाएँ स्कैन करें      →  Shodan वेब इंटरफ़ेस
  डोमेन प्रतिष्ठा जाँचें            →  VirusTotal वेब इंटरफ़ेस
  IP बुनियादी ढाँचा मैप करें        →  Censys + BGP लुकअप
  संग्रहीत पृष्ठ खोजें               →  Wayback Machine वेब UI
  ईमेल सुरक्षा जाँचें               →  मैन्युअल MX/SPF/DMARC लुकअप
  सब कुछ सहसंबंधित करें            →  स्प्रेडशीट में कॉपी-पेस्ट
  ─────────────────────────────────
  कुल: प्रति लक्ष्य 45+ मिनट, अधिकांश समय संदर्भ बदलने में
```

**osint-mcp** आपके AI एजेंट को [Model Context Protocol](https://modelcontextprotocol.io) के माध्यम से 12 डेटा स्रोतों में 37 उपकरण देता है। एजेंट सभी स्रोतों को समानांतर में क्वेरी करता है, डेटा को सहसंबंधित करता है, जोखिमों की पहचान करता है, और एक एकीकृत खुफिया तस्वीर प्रस्तुत करता है &mdash; एक ही बातचीत में।

```
osint-mcp के साथ:
  आप: "target.com पर पूरी टोही करो"

  एजेंट: → DNS: 4 A रिकॉर्ड, 3 MX (Google Workspace), 2 NS
          → WHOIS: 2019 में पंजीकृत, 2025 में समाप्त, GoDaddy
          → crt.sh: CT लॉग से 47 अद्वितीय सबडोमेन
          → HackerTarget: IP के साथ 23 होस्ट
          → ईमेल: SPF सॉफ्ट-फेल (~all), DMARC p=none, कोई DKIM नहीं
          → Shodan: 3 IP, 12 खुले पोर्ट, Apache 2.4.49 (CVE-2021-41773)
          → VirusTotal: स्वच्छ प्रतिष्ठा, 0 पहचान
          → "target.com में 47 सबडोमेन हैं, कमज़ोर ईमेल सुरक्षा
             (SPF सॉफ्ट-फेल, DMARC केवल मॉनिटरिंग), और एक IP
             पर Apache 2.4.49 चल रहा है जिसमें ज्ञात पाथ ट्रैवर्सल CVE है।
             प्राथमिकता: Apache पैच करें, SPF को -all में अपग्रेड करें,
             DMARC को p=reject सेट करें।"
```

---

## यह कैसे अलग है

मौजूदा OSINT उपकरण आपको एक समय में एक स्रोत से कच्चा डेटा देते हैं। osint-mcp आपके AI एजेंट को **सभी स्रोतों पर एक साथ तर्क करने** की क्षमता देता है।

<table>
<thead>
<tr>
<th></th>
<th>पारंपरिक OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>इंटरफ़ेस</b></td>
<td>12 अलग-अलग वेब UI, CLI और API</td>
<td>MCP &mdash; AI एजेंट संवादात्मक रूप से उपकरण कॉल करता है</td>
</tr>
<tr>
<td><b>डेटा स्रोत</b></td>
<td>एक समय में एक प्लेटफ़ॉर्म</td>
<td>12 स्रोत समानांतर में क्वेरी किए जाते हैं</td>
</tr>
<tr>
<td><b>सबडोमेन गणना</b></td>
<td>crt.sh या SecurityTrails या VirusTotal</td>
<td>एजेंट तीनों + HackerTarget को मर्ज करता है, डुप्लिकेट हटाता है</td>
</tr>
<tr>
<td><b>सहसंबंध</b></td>
<td>टैब के बीच मैन्युअल कॉपी-पेस्ट</td>
<td>एजेंट क्रॉस-रेफ़रेंस करता है: "Shodan का यह IP Censys में भी एक्सपायर्ड सर्टिफ़िकेट के साथ दिखता है"</td>
</tr>
<tr>
<td><b>ईमेल सुरक्षा</b></td>
<td>अलग-अलग SPF/DMARC/DKIM लुकअप</td>
<td>जोखिम स्कोर और कार्रवाई योग्य अनुशंसाओं के साथ संयुक्त विश्लेषण</td>
</tr>
<tr>
<td><b>बुनियादी ढाँचा</b></td>
<td>GeoIP + BGP + WHOIS अलग-अलग</td>
<td>एजेंट पूरा बुनियादी ढाँचा मैप करता है: ASN, प्रीफ़िक्स, भौगोलिक स्थान, स्वामित्व</td>
</tr>
<tr>
<td><b>API कुंजियाँ</b></td>
<td>लगभग सब कुछ के लिए आवश्यक</td>
<td>21 उपकरण मुफ़्त काम करते हैं, 16 और वैकल्पिक API कुंजियों के साथ</td>
</tr>
<tr>
<td><b>सेटअप</b></td>
<td>प्रत्येक उपकरण इंस्टॉल करें, प्रत्येक कॉन्फ़िग प्रबंधित करें</td>
<td><code>npx osint-mcp</code> &mdash; एक कमांड, शून्य कॉन्फ़िग</td>
</tr>
</tbody>
</table>

---

## त्वरित शुरुआत

### विकल्प 1: npx (इंस्टॉल नहीं)

```bash
npx osint-mcp
```

21 सार्वजनिक OSINT उपकरण तुरंत काम करते हैं। किसी API कुंजी की आवश्यकता नहीं।

### विकल्प 2: क्लोन

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### पर्यावरण चर (वैकल्पिक)

```bash
# प्रीमियम OSINT स्रोत — सभी वैकल्पिक
export SHODAN_API_KEY=your-key           # 4 Shodan उपकरण सक्षम करता है
export VT_API_KEY=your-key               # 4 VirusTotal उपकरण सक्षम करता है
export ST_API_KEY=your-key               # 3 SecurityTrails उपकरण सक्षम करता है
export CENSYS_API_ID=your-id             # 3 Censys उपकरण सक्षम करता है
export CENSYS_API_SECRET=your-secret     # CENSYS_API_ID के साथ आवश्यक
```

सभी प्रीमियम API कुंजियाँ वैकल्पिक हैं। इनके बिना भी, आपको DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget, और Microsoft 365 टेनेंट खोज को कवर करने वाले 21 उपकरण मिलते हैं।

### अपने AI एजेंट से कनेक्ट करें

<details open>
<summary><b>Claude Code</b></summary>

```bash
# npx के साथ
claude mcp add osint-mcp -- npx osint-mcp

# लोकल क्लोन के साथ
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` में जोड़ें:

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
<summary><b>Cursor / Windsurf / अन्य MCP क्लाइंट</b></summary>

वही JSON कॉन्फ़िग प्रारूप। कमांड को `npx osint-mcp` या अपने लोकल इंस्टॉलेशन पथ पर निर्देशित करें।

</details>

### क्वेरी शुरू करें

```
आप: "example.com के बारे में क्या मिल सकता है?"
```

बस इतना ही। एजेंट DNS, WHOIS, सबडोमेन, ईमेल सुरक्षा, और बहुत कुछ स्वचालित रूप से संभालता है।

---

## AI क्या कर सकता है

### डोमेन टोही

```
आप: "target.com पर पूरी टोही करो"

एजेंट: → osint_domain_recon {domain: "target.com"}
       → DNS: A रिकॉर्ड 3 IP की ओर इशारा करते हैं (AWS us-east-1)
       → WHOIS: 2018 में Namecheap द्वारा पंजीकृत, 2026 में समाप्त
       → crt.sh: 62 सबडोमेन खोजे गए
       → HackerTarget: हल किए गए IP के साथ 31 होस्ट
       → ईमेल: SPF हार्ड-फेल, DMARC p=reject, DKIM मिला (selector1)
       → "target.com ईमेल सुरक्षा के लिए अच्छी तरह कॉन्फ़िगर है।
          62 सबडोमेन मिले — उल्लेखनीय: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          बुनियादी ढाँचा AWS (us-east-1) पर है।"
```

### हमले की सतह का मानचित्रण

```
आप: "203.0.113.50 की हमले की सतह मैप करो"

एजेंट: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          खुले पोर्ट: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, 8080 पर nginx रिवर्स प्रॉक्सी
          रिवर्स DNS: web1.target.com
          Shodan द्वारा 3 ज्ञात CVE चिह्नित"
```

### सबडोमेन गणना (बहु-स्रोत)

```
आप: "हर उपलब्ध स्रोत का उपयोग करके target.com के सभी सबडोमेन खोजो"

एजेंट: → crtsh_search {domain: "target.com"}              → 62 सबडोमेन
       → st_subdomains {domain: "target.com"}              → 84 सबडोमेन
       → vt_subdomains {domain: "target.com"}              → 41 सबडोमेन
       → hackertarget_hostsearch {domain: "target.com"}    → 31 होस्ट
       → dns_wildcard_check {domain: "target.com"}         → कोई वाइल्डकार्ड नहीं
       → "4 स्रोतों से डिडुप्लिकेशन के बाद 127 अद्वितीय सबडोमेन।
          उल्लेखनीय खोज: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD एक्सपोज़र जोखिम),
          old-admin.target.com (संभावित विरासत प्रणाली)"
```

### ईमेल सुरक्षा ऑडिट

```
आप: "target.com की ईमेल सुरक्षा स्थिति का विश्लेषण करो"

एजेंट: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "ईमेल सुरक्षा: उच्च जोखिम
          SPF: ~all (सॉफ्ट फेल — स्पूफ़ करने योग्य)
          DMARC: p=none (केवल मॉनिटरिंग — प्रवर्तन नहीं)
          DKIM: selector1 के लिए मिला (2048-बिट, अच्छा)
          SPF चेन: 7 इंक्लूड, 2 सेवाएँ (Google Workspace, SendGrid)
          M365: Microsoft टेनेंट नहीं
          अनुशंसाएँ:
          1. SPF को ~all से -all में अपग्रेड करें
          2. DMARC को p=none से p=quarantine, फिर p=reject में बदलें
          3. समेकित रिपोर्टिंग के लिए DMARC में rua= जोड़ें"
```

### ऐतिहासिक खुफिया जानकारी

```
आप: "3 साल पहले target.com पर क्या चल रहा था?"

एजेंट: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS इतिहास: target.com 2023 में 198.51.100.1 (DigitalOcean)
          से 203.0.113.50 (AWS) पर स्थानांतरित हुआ।
          Wayback ने 342 अद्वितीय URL पाए जिनमें शामिल हैं:
          - /admin/ (2024 में हटाया गया, पहले सुलभ था)
          - /api/v1/docs (Swagger UI, अभी भी कैश में)
          - /wp-content/ (WordPress था, माइग्रेट हुआ)
          पुरानी robots.txt ने /internal/ और /debug/ को अस्वीकृत किया"
```

---

## उपकरण संदर्भ (37 उपकरण)

<details open>
<summary><b>DNS (6) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `dns_lookup` | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV रिकॉर्ड हल करें |
| `dns_reverse` | IP पते के लिए रिवर्स DNS (PTR) लुकअप |
| `dns_email_security` | जोखिम स्कोरिंग और अनुशंसाओं के साथ SPF + DMARC + DKIM विश्लेषण |
| `dns_spf_chain` | सेवा पहचान के साथ पुनरावर्ती SPF इंक्लूड चेन रिज़ॉल्यूशन |
| `dns_srv_discover` | SRV + CNAME सेवा खोज (Autodiscover, LDAP, SIP, Kerberos, आदि) |
| `dns_wildcard_check` | रैंडम सबडोमेन प्रोब द्वारा वाइल्डकार्ड DNS पहचान |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `whois_domain` | RDAP डोमेन लुकअप &mdash; रजिस्ट्रार, तिथियाँ, नेमसर्वर, संपर्क |
| `whois_ip` | RDAP IP लुकअप &mdash; नेटवर्क नाम, CIDR, देश, संस्थाएँ |

</details>

<details>
<summary><b>प्रमाणपत्र पारदर्शिता (1) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `crtsh_search` | crt.sh द्वारा CT लॉग खोज &mdash; सबडोमेन खोज + प्रमाणपत्र विवरण |

</details>

<details>
<summary><b>Shodan (4) &mdash; SHODAN_API_KEY आवश्यक</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `shodan_host` | IP विवरण: खुले पोर्ट, सेवाएँ, बैनर, कमज़ोरियाँ, OS, ASN |
| `shodan_search` | Shodan क्वेरी भाषा में खोज (उदा. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Shodan द्वारा बल्क होस्टनेम-से-IP रिज़ॉल्यूशन |
| `shodan_exploits` | सार्वजनिक एक्सप्लॉइट डेटाबेस खोज (PoC, Metasploit मॉड्यूल) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; VT_API_KEY आवश्यक</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `vt_domain` | डोमेन प्रतिष्ठा, पहचान आँकड़े, श्रेणियाँ, DNS रिकॉर्ड |
| `vt_ip` | IP प्रतिष्ठा, पहचान आँकड़े, ASN, नेटवर्क |
| `vt_subdomains` | VirusTotal द्वारा सबडोमेन गणना |
| `vt_url` | URL स्कैन + मैलवेयर/फ़िशिंग विश्लेषण |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; ST_API_KEY आवश्यक</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `st_subdomains` | सबडोमेन गणना (FQDN लौटाता है) |
| `st_dns_history` | पहली/अंतिम देखे जाने की तिथियों के साथ ऐतिहासिक DNS रिकॉर्ड |
| `st_whois` | पंजीकरणकर्ता/व्यवस्थापक/तकनीकी संपर्कों के साथ उन्नत WHOIS |

</details>

<details>
<summary><b>Censys (3) &mdash; CENSYS_API_ID + CENSYS_API_SECRET आवश्यक</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `censys_hosts` | होस्ट खोज &mdash; IP, सेवाएँ, पोर्ट, स्थान, ASN |
| `censys_host_details` | सभी सेवाओं के साथ एकल होस्ट का पूरा विवरण |
| `censys_certificates` | डोमेन, फ़िंगरप्रिंट, जारीकर्ता द्वारा प्रमाणपत्र खोज |

</details>

<details>
<summary><b>GeoIP (2) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `geoip_lookup` | IP भौगोलिक स्थान: देश, शहर, ISP, ASN, प्रॉक्सी/होस्टिंग/VPN पहचान |
| `geoip_batch` | बैच IP भौगोलिक स्थान (एक बार में 100 IP तक) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `bgp_asn` | ASN विवरण + सभी घोषित IPv4/IPv6 प्रीफ़िक्स |
| `bgp_ip` | RIR आवंटन के साथ IP प्रीफ़िक्स/ASN रूटिंग लुकअप |
| `bgp_prefix` | घोषणा करने वाले ASN के साथ प्रीफ़िक्स विवरण |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `wayback_urls` | संग्रहीत URL खोज &mdash; पुराने एंडपॉइंट, छिपे पथ, हटाई गई सामग्री खोजें |
| `wayback_snapshots` | टाइमस्टैम्प और सीधे आर्काइव लिंक के साथ स्नैपशॉट इतिहास |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `hackertarget_hostsearch` | हल किए गए IP के साथ होस्ट/सबडोमेन खोज |
| `hackertarget_reverseip` | रिवर्स IP लुकअप &mdash; एक IP पर सभी डोमेन खोजें |
| `hackertarget_aslookup` | ASN सूचना लुकअप |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `m365_tenant` | M365 टेनेंट ID, क्षेत्र, और OpenID कॉन्फ़िगरेशन खोजें |
| `m365_userrealm` | प्रमाणीकरण प्रकार (प्रबंधित/फ़ेडरेटेड), फ़ेडरेशन ब्रांड, प्रमाणीकरण एंडपॉइंट पहचानें |

</details>

<details>
<summary><b>मेटा (2) &mdash; API कुंजी नहीं चाहिए</b></summary>

| उपकरण | विवरण |
|--------|-------|
| `osint_list_sources` | सभी OSINT स्रोत, API कुंजी स्थिति, और उपकरण संख्या सूचीबद्ध करें |
| `osint_domain_recon` | सभी मुफ़्त स्रोतों को मिलाकर त्वरित टोही (DNS + WHOIS + crt.sh + HackerTarget + ईमेल सुरक्षा) |

</details>

---

## डेटा स्रोत (12)

| स्रोत | प्रमाणीकरण | दर सीमा | क्या प्रदान करता है |
|--------|------------|---------|-------------------|
| [DNS](https://nodejs.org/api/dns.html) | कोई नहीं | कोई नहीं | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR रिकॉर्ड |
| [RDAP](https://rdap.org/) | कोई नहीं | 1 अनुरोध/सेकंड | डोमेन और IP WHOIS डेटा (रजिस्ट्रार, तिथियाँ, संपर्क, CIDR) |
| [crt.sh](https://crt.sh/) | कोई नहीं | 0.5 अनुरोध/सेकंड | प्रमाणपत्र पारदर्शिता लॉग, सबडोमेन खोज |
| [ip-api.com](http://ip-api.com/) | कोई नहीं | 45 अनुरोध/मिनट | IP भौगोलिक स्थान, ISP, ASN, प्रॉक्सी/VPN/होस्टिंग पहचान |
| [BGPView](https://bgpview.io/) | कोई नहीं | 0.5 अनुरोध/सेकंड | ASN विवरण, घोषित प्रीफ़िक्स, IP रूटिंग जानकारी |
| [HackerTarget](https://hackertarget.com/) | कोई नहीं | 2 अनुरोध/सेकंड | होस्ट खोज, रिवर्स IP, ASN लुकअप (50/दिन मुफ़्त) |
| [Wayback Machine](https://web.archive.org/) | कोई नहीं | 1 अनुरोध/सेकंड | संग्रहीत URL, स्नैपशॉट इतिहास, ऐतिहासिक सामग्री |
| [Microsoft 365](https://login.microsoftonline.com/) | कोई नहीं | कोई नहीं | टेनेंट खोज, फ़ेडरेशन पहचान, प्रमाणीकरण प्रकार |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 अनुरोध/सेकंड | इंटरनेट-व्यापी पोर्ट/सेवा/बैनर स्कैनिंग |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 अनुरोध/मिनट | डोमेन/IP/URL प्रतिष्ठा, मैलवेयर पहचान |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 अनुरोध/सेकंड | DNS इतिहास, सबडोमेन गणना, उन्नत WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 अनुरोध/सेकंड | होस्ट खोज, प्रमाणपत्र पारदर्शिता, सेवा खोज |

---

## वास्तुकला

```
src/
├── index.ts                    एंट्री पॉइंट, env कॉन्फ़िग, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 उपकरण परिभाषाएँ (Zod स्कीमा)
│   └── mcp-server.ts           MCP सर्वर + stdio ट्रांसपोर्ट
├── dns/
│   └── index.ts                6 फ़ंक्शन — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 फ़ंक्शन — डोमेन RDAP, IP RDAP
├── crtsh/
│   └── index.ts                डिडुप + कैशिंग के साथ CT लॉग खोज
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domain, IP, subdomains, URL scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS history, WHOIS
├── censys/
│   └── index.ts                Host search, host details, certificates
├── geoip/
│   └── index.ts                एकल + बैच IP भौगोलिक स्थान
├── bgp/
│   └── index.ts                ASN, IP prefix, prefix details
├── wayback/
│   └── index.ts                URL खोज + स्नैपशॉट इतिहास
├── hackertarget/
│   └── index.ts                Host search, reverse IP, ASN
├── m365/
│   └── index.ts                टेनेंट खोज, user realm/federation
├── meta/
│   ├── sources.ts              स्रोत उपलब्धता जाँच
│   └── recon.ts                संयुक्त मुफ़्त-स्रोत डोमेन टोही
└── utils/
    ├── rate-limiter.ts          क्यू-आधारित दर सीमक
    ├── cache.ts                 सामान्य TTL कैश
    └── require-key.ts           API कुंजी सत्यापन सहायक
```

**डिज़ाइन निर्णय:**

- **12 प्रदाता, 1 सर्वर** &mdash; प्रत्येक OSINT स्रोत एक स्वतंत्र मॉड्यूल है। एजेंट क्वेरी के आधार पर उपयोग करने के लिए उपकरण चुनता है।
- **21 मुफ़्त उपकरण** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget, और M365 बिना किसी API कुंजी के काम करते हैं। प्रीमियम स्रोत अतिरिक्त हैं।
- **समानांतर क्वेरी** &mdash; `osint_domain_recon` `Promise.allSettled` के माध्यम से 8 स्रोतों को कॉल करता है। यदि एक स्रोत टाइमआउट हो जाता है, तो बाकी अभी भी डेटा लौटाते हैं।
- **प्रदाता-विशिष्ट दर सीमक** &mdash; प्रत्येक डेटा स्रोत का अपना `RateLimiter` इंस्टेंस है जो उस API की सीमाओं के अनुसार कैलिब्रेट किया गया है। कोई साझा बॉटलनेक नहीं।
- **TTL कैशिंग** &mdash; crt.sh (15 मिनट), BGP (30 मिनट), Shodan (5 मिनट), VirusTotal (10 मिनट) परिणाम कैश किए जाते हैं ताकि बहु-उपकरण वर्कफ़्लो के दौरान अनावश्यक API कॉल से बचा जा सके।
- **सुशोभित गिरावट** &mdash; गायब API कुंजियाँ सर्वर को क्रैश नहीं करतीं। उपकरण वर्णनात्मक त्रुटि संदेश लौटाते हैं: "Shodan उपकरण सक्षम करने के लिए SHODAN_API_KEY सेट करें।"
- **SPF चेन विश्लेषण** &mdash; लूप पहचान, सेवा पहचान (Google Workspace, Microsoft 365, SendGrid, आदि), और RFC 7208 लुकअप सीमा जाँच के साथ पुनरावर्ती इंक्लूड रिज़ॉल्यूशन।
- **2 निर्भरताएँ** &mdash; `@modelcontextprotocol/sdk` और `zod`। सभी HTTP नेटिव `fetch` द्वारा। सभी DNS `node:dns/promises` द्वारा।

---

## सीमाएँ

- मुफ़्त-टियर दर सीमाएँ लागू होती हैं: HackerTarget (50/दिन), ip-api.com (45/मिनट), VirusTotal कम्युनिटी (4/मिनट)
- बड़े डोमेन के लिए crt.sh धीमा हो सकता है (30 सेकंड टाइमआउट लागू)
- ip-api.com मुफ़्त टियर के लिए HTTP (HTTPS नहीं) आवश्यक है
- बहुत लोकप्रिय डोमेन के लिए Wayback Machine CDX API टाइमआउट हो सकता है
- RDAP के माध्यम से WHOIS सभी TLD को कवर नहीं कर सकता (कुछ रजिस्ट्रार अभी तक RDAP का समर्थन नहीं करते)
- macOS / Linux पर परीक्षित (Windows पर परीक्षण नहीं किया गया)

---

## MCP सुरक्षा सूट

| परियोजना | डोमेन | उपकरण |
|----------|--------|--------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ब्राउज़र-आधारित सुरक्षा परीक्षण | 39 उपकरण, Firefox, इंजेक्शन परीक्षण |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | क्लाउड सुरक्षा (AWS/Azure/GCP) | 38 उपकरण, 60+ जाँच |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub सुरक्षा स्थिति | 39 उपकरण, 45 जाँच |
| [cve-mcp](https://github.com/badchars/cve-mcp) | कमज़ोरी खुफिया जानकारी | 23 उपकरण, 5 स्रोत |
| **osint-mcp** | **OSINT और टोही** | **37 उपकरण, 12 स्रोत** |

---

<p align="center">
<b>केवल अधिकृत सुरक्षा परीक्षण और मूल्यांकन के लिए।</b><br>
किसी भी लक्ष्य पर टोही करने से पहले हमेशा सुनिश्चित करें कि आपके पास उचित प्राधिकरण है।
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Built with Bun + TypeScript
</p>
