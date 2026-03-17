<p align="center">

**🌐 [English](README.md) · [Türkçe](README.tr.md) · [Français](README.fr.md) · [中文](README.zh.md) · العربية · [Русский](README.ru.md) · [हिन्दी](README.hi.md)**

</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">استخبارات مفتوحة المصدر واستطلاع لوكلاء الذكاء الاصطناعي.</h3>

<p align="center">
  Shodan، VirusTotal، Censys، SecurityTrails، DNS، WHOIS، BGP، Wayback Machine &mdash; موحّدة في خادم MCP واحد.<br>
  يحصل وكيل الذكاء الاصطناعي على <b>استخبارات مفتوحة المصدر شاملة الطيف عند الطلب</b>، بدلاً من 12 تبويبة متصفح وربط يدوي.
</p>

<br>

<p align="center">
  <a href="#المشكلة">المشكلة</a> &bull;
  <a href="#ما-الفرق">ما الفرق</a> &bull;
  <a href="#البداية-السريعة">البداية السريعة</a> &bull;
  <a href="#ما-يمكن-للذكاء-الاصطناعي-فعله">ما يمكن للذكاء الاصطناعي فعله</a> &bull;
  <a href="#مرجع-الأدوات-37-أداة">الأدوات (37)</a> &bull;
  <a href="#مصادر-البيانات-12">مصادر البيانات</a> &bull;
  <a href="#البنية">البنية</a>
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

## المشكلة

جمع الاستخبارات مفتوحة المصدر (OSINT) هو الخطوة الأولى في كل اختبار اختراق ومكافأة ثغرات وتقييم تهديدات. البيانات التي تحتاجها مبعثرة عبر عشرات المنصات &mdash; كل منها بواجهة برمجة تطبيقات خاصة، ومصادقة خاصة، وحدود استخدام خاصة، وتنسيق إخراج خاص. اليوم تفتح Shodan في تبويبة، وVirusTotal في أخرى، وتشغّل `dig` في الطرفية، وتنسخ من WHOIS، وتنتقل إلى crt.sh للشهادات، ثم تقضي 30 دقيقة في ربط كل شيء يدوياً.

```
سير العمل التقليدي للاستخبارات مفتوحة المصدر:
  حل سجلات DNS                    →  dig / nslookup CLI
  فحص تسجيل WHOIS                 →  whois CLI أو أداة ويب
  تعداد النطاقات الفرعية          →  crt.sh + SecurityTrails + VirusTotal (3 واجهات مختلفة)
  فحص المنافذ والخدمات المفتوحة   →  واجهة Shodan الويب
  فحص سمعة النطاق                 →  واجهة VirusTotal الويب
  رسم خريطة بنية IP التحتية      →  Censys + استعلامات BGP
  البحث عن صفحات مؤرشفة          →  واجهة Wayback Machine الويب
  فحص أمان البريد الإلكتروني     →  استعلامات MX/SPF/DMARC يدوية
  ربط كل شيء                      →  نسخ ولصق في جدول بيانات
  ─────────────────────────────────
  المجموع: أكثر من 45 دقيقة لكل هدف، معظمها في التنقل بين السياقات
```

**osint-mcp** يمنح وكيل الذكاء الاصطناعي 37 أداة عبر 12 مصدر بيانات من خلال [بروتوكول سياق النموذج](https://modelcontextprotocol.io). يستعلم الوكيل من جميع المصادر بالتوازي، ويربط البيانات، ويحدد المخاطر، ويقدم صورة استخباراتية موحّدة &mdash; في محادثة واحدة.

```
مع osint-mcp:
  أنت: "قم باستطلاع كامل لـ target.com"

  الوكيل: → DNS: 4 سجلات A، 3 MX (Google Workspace)، 2 NS
           → WHOIS: مسجّل 2019، تنتهي صلاحيته 2025، GoDaddy
           → crt.sh: 47 نطاقاً فرعياً فريداً من سجلات شفافية الشهادات
           → HackerTarget: 23 مضيفاً مع عناوين IP
           → البريد: SPF soft-fail (~all)، DMARC p=none، لا يوجد DKIM
           → Shodan: 3 عناوين IP، 12 منفذاً مفتوحاً، Apache 2.4.49 (CVE-2021-41773)
           → VirusTotal: سمعة نظيفة، 0 اكتشافات
           → "target.com لديه 47 نطاقاً فرعياً، أمان بريد إلكتروني ضعيف
              (SPF soft-fail، DMARC للمراقبة فقط)، وعنوان IP واحد
              يشغّل Apache 2.4.49 مع ثغرة CVE معروفة لاجتياز المسارات.
              الأولوية: ترقيع Apache، ترقية SPF إلى -all، تعيين DMARC إلى p=reject."
```

---

## ما الفرق

أدوات الاستخبارات مفتوحة المصدر الحالية تمنحك بيانات خام من مصدر واحد في كل مرة. osint-mcp يمنح وكيل الذكاء الاصطناعي القدرة على **التحليل عبر جميع المصادر في وقت واحد**.

<table>
<thead>
<tr>
<th></th>
<th>الاستخبارات التقليدية</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>الواجهة</b></td>
<td>12 واجهة ويب وأدوات سطر أوامر وواجهات برمجة مختلفة</td>
<td>MCP &mdash; وكيل الذكاء الاصطناعي يستدعي الأدوات بالمحادثة</td>
</tr>
<tr>
<td><b>مصادر البيانات</b></td>
<td>منصة واحدة في كل مرة</td>
<td>12 مصدراً يُستعلم عنها بالتوازي</td>
</tr>
<tr>
<td><b>تعداد النطاقات الفرعية</b></td>
<td>crt.sh أو SecurityTrails أو VirusTotal</td>
<td>الوكيل يدمج الثلاثة + HackerTarget، ويزيل التكرار</td>
</tr>
<tr>
<td><b>الربط</b></td>
<td>نسخ ولصق يدوي بين التبويبات</td>
<td>الوكيل يربط البيانات: "عنوان IP هذا من Shodan يظهر أيضاً في Censys مع شهادة منتهية"</td>
</tr>
<tr>
<td><b>أمان البريد</b></td>
<td>استعلامات SPF/DMARC/DKIM منفصلة</td>
<td>تحليل مجمّع مع درجة مخاطر وتوصيات عملية</td>
</tr>
<tr>
<td><b>البنية التحتية</b></td>
<td>GeoIP + BGP + WHOIS بشكل منفصل</td>
<td>الوكيل يرسم خريطة البنية التحتية الكاملة: ASN، البادئات، الموقع الجغرافي، الملكية</td>
</tr>
<tr>
<td><b>مفاتيح API</b></td>
<td>مطلوبة لكل شيء تقريباً</td>
<td>21 أداة تعمل مجاناً، 16 أخرى مع مفاتيح API اختيارية</td>
</tr>
<tr>
<td><b>الإعداد</b></td>
<td>تثبيت كل أداة وإدارة كل إعداد</td>
<td><code>npx osint-mcp</code> &mdash; أمر واحد، بدون إعداد</td>
</tr>
</tbody>
</table>

---

## البداية السريعة

### الخيار 1: npx (بدون تثبيت)

```bash
npx osint-mcp
```

21 أداة استخبارات مفتوحة المصدر عامة تعمل فوراً. لا حاجة لمفاتيح API.

### الخيار 2: استنساخ

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### متغيرات البيئة (اختيارية)

```bash
# مصادر OSINT المتقدمة — جميعها اختيارية
export SHODAN_API_KEY=your-key           # تفعيل 4 أدوات Shodan
export VT_API_KEY=your-key               # تفعيل 4 أدوات VirusTotal
export ST_API_KEY=your-key               # تفعيل 3 أدوات SecurityTrails
export CENSYS_API_ID=your-id             # تفعيل 3 أدوات Censys
export CENSYS_API_SECRET=your-secret     # مطلوب مع CENSYS_API_ID
```

جميع مفاتيح API المتقدمة اختيارية. بدونها، لا تزال تحصل على 21 أداة تغطي DNS، WHOIS، crt.sh، GeoIP، BGP، Wayback Machine، HackerTarget، واكتشاف مستأجري Microsoft 365.

### الاتصال بوكيل الذكاء الاصطناعي

<details open>
<summary><b>Claude Code</b></summary>

```bash
# مع npx
claude mcp add osint-mcp -- npx osint-mcp

# مع الاستنساخ المحلي
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

أضف إلى `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / عملاء MCP الآخرون</b></summary>

نفس تنسيق إعدادات JSON. وجّه الأمر إلى `npx osint-mcp` أو مسار التثبيت المحلي.

</details>

### ابدأ الاستعلام

```
أنت: "ماذا يمكنك أن تجد عن example.com؟"
```

هذا كل شيء. الوكيل يتعامل مع DNS وWHOIS والنطاقات الفرعية وأمان البريد الإلكتروني والمزيد تلقائياً.

---

## ما يمكن للذكاء الاصطناعي فعله

### استطلاع النطاقات

```
أنت: "قم باستطلاع كامل لـ target.com"

الوكيل: → osint_domain_recon {domain: "target.com"}
         → DNS: سجلات A تشير إلى 3 عناوين IP (AWS us-east-1)
         → WHOIS: مسجّل 2018 عبر Namecheap، تنتهي صلاحيته 2026
         → crt.sh: اكتُشف 62 نطاقاً فرعياً
         → HackerTarget: 31 مضيفاً مع عناوين IP محلولة
         → البريد: SPF hard-fail، DMARC p=reject، DKIM موجود (selector1)
         → "target.com مُعَدّ جيداً لأمان البريد الإلكتروني.
            اكتُشف 62 نطاقاً فرعياً — الجدير بالملاحظة: staging.target.com،
            admin-portal.target.com، api-v2.target.com.
            البنية التحتية على AWS (us-east-1)."
```

### رسم سطح الهجوم

```
أنت: "ارسم خريطة سطح الهجوم لـ 203.0.113.50"

الوكيل: → shodan_host {ip: "203.0.113.50"}
         → geoip_lookup {ip: "203.0.113.50"}
         → bgp_ip {ip: "203.0.113.50"}
         → whois_ip {ip: "203.0.113.50"}
         → dns_reverse {ip: "203.0.113.50"}
         → "203.0.113.50 (Hetzner، DE، AS24940)
            المنافذ المفتوحة: 22/SSH، 80/HTTP، 443/HTTPS، 8080/HTTP-Proxy
            Apache 2.4.51، OpenSSH 8.9، nginx reverse proxy على 8080
            DNS العكسي: web1.target.com
            3 ثغرات CVE معروفة أشار إليها Shodan"
```

### تعداد النطاقات الفرعية (متعدد المصادر)

```
أنت: "اعثر على جميع النطاقات الفرعية لـ target.com باستخدام كل مصدر متاح"

الوكيل: → crtsh_search {domain: "target.com"}              → 62 نطاقاً فرعياً
         → st_subdomains {domain: "target.com"}              → 84 نطاقاً فرعياً
         → vt_subdomains {domain: "target.com"}              → 41 نطاقاً فرعياً
         → hackertarget_hostsearch {domain: "target.com"}    → 31 مضيفاً
         → dns_wildcard_check {domain: "target.com"}         → لا يوجد wildcard
         → "127 نطاقاً فرعياً فريداً بعد إزالة التكرار عبر 4 مصادر.
            نتائج جديرة بالملاحظة: staging.target.com، dev-api.target.com،
            jenkins.target.com (خطر كشف CI/CD)،
            old-admin.target.com (نظام قديم محتمل)"
```

### تدقيق أمان البريد الإلكتروني

```
أنت: "حلّل الوضع الأمني للبريد الإلكتروني لـ target.com"

الوكيل: → dns_email_security {domain: "target.com"}
         → dns_spf_chain {domain: "target.com"}
         → m365_tenant {domain: "target.com"}
         → "أمان البريد الإلكتروني: مخاطر عالية
            SPF: ~all (فشل ناعم — قابل للانتحال)
            DMARC: p=none (مراقبة فقط — غير مُنفَّذ)
            DKIM: موجود لـ selector1 (2048 بت، جيد)
            سلسلة SPF: 7 تضمينات، خدمتان (Google Workspace، SendGrid)
            M365: ليس مستأجر Microsoft
            التوصيات:
            1. ترقية SPF من ~all إلى -all
            2. تغيير DMARC من p=none إلى p=quarantine، ثم p=reject
            3. إضافة rua= إلى DMARC لتقارير التجميع"
```

### الاستخبارات التاريخية

```
أنت: "ماذا كان يشغّل target.com قبل 3 سنوات؟"

الوكيل: → wayback_urls {domain: "target.com", limit: 500}
         → st_dns_history {domain: "target.com", type: "a"}
         → wayback_snapshots {url: "https://target.com/robots.txt"}
         → "تاريخ DNS: انتقل target.com من 198.51.100.1 (DigitalOcean)
            إلى 203.0.113.50 (AWS) في 2023.
            وجد Wayback عدد 342 رابطاً فريداً بما في ذلك:
            - /admin/ (أُزيل في 2024، كان متاحاً)
            - /api/v1/docs (Swagger UI، لا يزال مخزناً مؤقتاً)
            - /wp-content/ (كان WordPress، تمّ الترحيل)
            ملف robots.txt القديم كان يمنع /internal/ و /debug/"
```

---

## مرجع الأدوات (37 أداة)

<details open>
<summary><b>DNS (6) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `dns_lookup` | حل سجلات A، AAAA، MX، TXT، NS، SOA، CNAME، SRV |
| `dns_reverse` | استعلام DNS العكسي (PTR) لعنوان IP |
| `dns_email_security` | تحليل SPF + DMARC + DKIM مع درجة مخاطر وتوصيات |
| `dns_spf_chain` | حل تسلسل تضمينات SPF مع اكتشاف الخدمات |
| `dns_srv_discover` | اكتشاف خدمات SRV + CNAME (Autodiscover، LDAP، SIP، Kerberos، إلخ.) |
| `dns_wildcard_check` | اكتشاف DNS بحرف البدل عبر اختبار نطاق فرعي عشوائي |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `whois_domain` | استعلام RDAP للنطاق &mdash; المسجّل، التواريخ، خوادم الأسماء، جهات الاتصال |
| `whois_ip` | استعلام RDAP لعنوان IP &mdash; اسم الشبكة، CIDR، البلد، الجهات |

</details>

<details>
<summary><b>شفافية الشهادات (1) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `crtsh_search` | البحث في سجلات شفافية الشهادات عبر crt.sh &mdash; اكتشاف النطاقات الفرعية + تفاصيل الشهادات |

</details>

<details>
<summary><b>Shodan (4) &mdash; يتطلب SHODAN_API_KEY</b></summary>

| الأداة | الوصف |
|--------|-------|
| `shodan_host` | تفاصيل IP: المنافذ المفتوحة، الخدمات، اللافتات، الثغرات، نظام التشغيل، ASN |
| `shodan_search` | البحث بلغة استعلام Shodan (مثلاً `apache port:443 country:US`) |
| `shodan_dns_resolve` | حل مجمّع لأسماء المضيفين إلى عناوين IP عبر Shodan |
| `shodan_exploits` | البحث في قاعدة بيانات الاستغلال العامة (PoC، وحدات Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; يتطلب VT_API_KEY</b></summary>

| الأداة | الوصف |
|--------|-------|
| `vt_domain` | سمعة النطاق، إحصائيات الاكتشاف، التصنيفات، سجلات DNS |
| `vt_ip` | سمعة عنوان IP، إحصائيات الاكتشاف، ASN، الشبكة |
| `vt_subdomains` | تعداد النطاقات الفرعية عبر VirusTotal |
| `vt_url` | فحص الروابط + تحليل البرمجيات الخبيثة/التصيد |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; يتطلب ST_API_KEY</b></summary>

| الأداة | الوصف |
|--------|-------|
| `st_subdomains` | تعداد النطاقات الفرعية (يُرجع أسماء النطاقات الكاملة FQDN) |
| `st_dns_history` | سجلات DNS التاريخية مع تواريخ الظهور الأول والأخير |
| `st_whois` | WHOIS محسّن مع جهات اتصال المسجّل/المدير/التقني |

</details>

<details>
<summary><b>Censys (3) &mdash; يتطلب CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| الأداة | الوصف |
|--------|-------|
| `censys_hosts` | البحث عن المضيفين &mdash; عناوين IP، الخدمات، المنافذ، الموقع، ASN |
| `censys_host_details` | تفاصيل كاملة لمضيف واحد مع جميع الخدمات |
| `censys_certificates` | البحث عن الشهادات بالنطاق أو البصمة أو الجهة المصدرة |

</details>

<details>
<summary><b>GeoIP (2) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `geoip_lookup` | تحديد الموقع الجغرافي لعنوان IP: البلد، المدينة، مزود الخدمة، ASN، اكتشاف الوكيل/الاستضافة/VPN |
| `geoip_batch` | تحديد الموقع الجغرافي بالدفعات (حتى 100 عنوان IP دفعة واحدة) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `bgp_asn` | تفاصيل ASN + جميع بادئات IPv4/IPv6 المُعلنة |
| `bgp_ip` | استعلام توجيه بادئة/ASN لعنوان IP مع تخصيص RIR |
| `bgp_prefix` | تفاصيل البادئة + أنظمة ASN المُعلنة |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `wayback_urls` | اكتشاف الروابط المؤرشفة &mdash; العثور على نقاط النهاية القديمة والمسارات المخفية والمحتوى المحذوف |
| `wayback_snapshots` | تاريخ اللقطات مع الطوابع الزمنية وروابط الأرشيف المباشرة |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `hackertarget_hostsearch` | اكتشاف المضيفين/النطاقات الفرعية مع عناوين IP المحلولة |
| `hackertarget_reverseip` | استعلام IP العكسي &mdash; العثور على جميع النطاقات على عنوان IP |
| `hackertarget_aslookup` | استعلام معلومات ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `m365_tenant` | اكتشاف معرّف مستأجر M365 والمنطقة وإعدادات OpenID |
| `m365_userrealm` | اكتشاف نوع المصادقة (مُدار/موحّد)، العلامة التجارية للاتحاد، نقاط نهاية المصادقة |

</details>

<details>
<summary><b>أدوات وصفية (2) &mdash; بدون مفتاح API</b></summary>

| الأداة | الوصف |
|--------|-------|
| `osint_list_sources` | سرد جميع مصادر OSINT وحالة مفاتيح API وعدد الأدوات |
| `osint_domain_recon` | استطلاع سريع يجمع جميع المصادر المجانية (DNS + WHOIS + crt.sh + HackerTarget + أمان البريد) |

</details>

---

## مصادر البيانات (12)

| المصدر | المصادقة | حد الاستخدام | ما يوفره |
|--------|----------|-------------|----------|
| [DNS](https://nodejs.org/api/dns.html) | لا شيء | لا شيء | سجلات A، AAAA، MX، TXT، NS، SOA، CNAME، SRV، PTR |
| [RDAP](https://rdap.org/) | لا شيء | 1 طلب/ث | بيانات WHOIS للنطاق وعنوان IP (المسجّل، التواريخ، جهات الاتصال، CIDR) |
| [crt.sh](https://crt.sh/) | لا شيء | 0.5 طلب/ث | سجلات شفافية الشهادات، اكتشاف النطاقات الفرعية |
| [ip-api.com](http://ip-api.com/) | لا شيء | 45 طلب/د | تحديد الموقع الجغرافي، مزود الخدمة، ASN، اكتشاف الوكيل/VPN/الاستضافة |
| [BGPView](https://bgpview.io/) | لا شيء | 0.5 طلب/ث | تفاصيل ASN، البادئات المُعلنة، معلومات توجيه IP |
| [HackerTarget](https://hackertarget.com/) | لا شيء | 2 طلب/ث | البحث عن المضيفين، IP العكسي، استعلام ASN (50/يوم مجاناً) |
| [Wayback Machine](https://web.archive.org/) | لا شيء | 1 طلب/ث | الروابط المؤرشفة، تاريخ اللقطات، المحتوى التاريخي |
| [Microsoft 365](https://login.microsoftonline.com/) | لا شيء | لا شيء | اكتشاف المستأجرين، اكتشاف الاتحاد، نوع المصادقة |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 طلب/ث | فحص المنافذ/الخدمات/اللافتات على مستوى الإنترنت |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 طلبات/د | سمعة النطاق/عنوان IP/الرابط، اكتشاف البرمجيات الخبيثة |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 طلب/ث | تاريخ DNS، تعداد النطاقات الفرعية، WHOIS محسّن |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 طلب/ث | البحث عن المضيفين، شفافية الشهادات، اكتشاف الخدمات |

---

## البنية

```
src/
├── index.ts                    نقطة الدخول، إعدادات البيئة، MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 تعريف أداة (مخططات Zod)
│   └── mcp-server.ts           خادم MCP + نقل stdio
├── dns/
│   └── index.ts                6 دوال — lookup، reverse، email، سلسلة SPF، SRV، wildcard
├── whois/
│   └── index.ts                دالتان — RDAP للنطاق، RDAP لعنوان IP
├── crtsh/
│   └── index.ts                بحث سجلات CT مع إزالة التكرار + التخزين المؤقت
├── shodan/
│   └── index.ts                Host، search، DNS resolve، exploits
├── virustotal/
│   └── index.ts                Domain، IP، subdomains، URL scan
├── securitytrails/
│   └── index.ts                Subdomains، DNS history، WHOIS
├── censys/
│   └── index.ts                Host search، host details، certificates
├── geoip/
│   └── index.ts                تحديد الموقع الجغرافي لعنوان IP مفرد + بالدفعات
├── bgp/
│   └── index.ts                ASN، بادئة IP، تفاصيل البادئة
├── wayback/
│   └── index.ts                بحث الروابط + تاريخ اللقطات
├── hackertarget/
│   └── index.ts                بحث المضيفين، IP العكسي، ASN
├── m365/
│   └── index.ts                اكتشاف المستأجرين، user realm/federation
├── meta/
│   ├── sources.ts              فحص توفّر المصادر
│   └── recon.ts                استطلاع مجمّع للمصادر المجانية
└── utils/
    ├── rate-limiter.ts          محدد معدل قائم على الطوابير
    ├── cache.ts                 ذاكرة مؤقتة عامة مع TTL
    └── require-key.ts           مساعد التحقق من مفاتيح API
```

**قرارات التصميم:**

- **12 مزوّداً، خادم واحد** &mdash; كل مصدر OSINT وحدة مستقلة. الوكيل يختار الأدوات المناسبة حسب الاستعلام.
- **21 أداة مجانية** &mdash; DNS وWHOIS وcrt.sh وBGP وGeoIP وWayback وHackerTarget وM365 تعمل بدون أي مفاتيح API. المصادر المتقدمة إضافية.
- **استعلامات متوازية** &mdash; `osint_domain_recon` يستدعي 8 مصادر عبر `Promise.allSettled`. إذا انتهت مهلة أحد المصادر، البقية تُرجع البيانات.
- **محددات معدل لكل مزوّد** &mdash; كل مصدر بيانات لديه مثيل `RateLimiter` خاص معايَر وفق حدود واجهة برمجة التطبيقات. لا يوجد عنق زجاجة مشترك.
- **تخزين مؤقت بمدة صلاحية** &mdash; نتائج crt.sh (15 دقيقة)، BGP (30 دقيقة)، Shodan (5 دقائق)، VirusTotal (10 دقائق) تُخزَّن مؤقتاً لتجنب استدعاءات API الزائدة في سير العمل متعدد الأدوات.
- **تدهور رشيق** &mdash; مفاتيح API المفقودة لا تعطّل الخادم. الأدوات تُرجع رسائل خطأ وصفية: "عيّن SHODAN_API_KEY لتفعيل أدوات Shodan."
- **تحليل سلسلة SPF** &mdash; حل التضمينات بشكل تكراري مع اكتشاف الحلقات، وتحديد الخدمات (Google Workspace، Microsoft 365، SendGrid، إلخ.)، وفحص حد عمليات البحث وفق RFC 7208.
- **اعتماديتان فقط** &mdash; `@modelcontextprotocol/sdk` و`zod`. جميع طلبات HTTP عبر `fetch` الأصلي. جميع استعلامات DNS عبر `node:dns/promises`.

---

## القيود

- حدود الاستخدام المجانية سارية: HackerTarget (50/يوم)، ip-api.com (45/دقيقة)، مجتمع VirusTotal (4/دقيقة)
- قد يكون crt.sh بطيئاً للنطاقات الكبيرة (مهلة 30 ثانية مطبّقة)
- ip-api.com يتطلب HTTP (وليس HTTPS) للمستوى المجاني
- واجهة CDX لـ Wayback Machine قد تنتهي مهلتها للنطاقات الشائعة جداً
- WHOIS عبر RDAP قد لا يغطي جميع نطاقات TLD (بعض المسجّلين لا يدعمون RDAP بعد)
- تم الاختبار على macOS / Linux (لم يُختبر على Windows)

---

## حزمة MCP الأمنية

| المشروع | المجال | الأدوات |
|---------|--------|--------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | اختبار أمان المتصفح | 39 أداة، Firefox، اختبار الحقن |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | أمان السحابة (AWS/Azure/GCP) | 38 أداة، أكثر من 60 فحصاً |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | الوضع الأمني لـ GitHub | 39 أداة، 45 فحصاً |
| [cve-mcp](https://github.com/badchars/cve-mcp) | استخبارات الثغرات | 23 أداة، 5 مصادر |
| **osint-mcp** | **الاستخبارات مفتوحة المصدر والاستطلاع** | **37 أداة، 12 مصدراً** |

---

<p align="center">
<b>للاختبارات والتقييمات الأمنية المصرّح بها فقط.</b><br>
تأكد دائماً من حصولك على التصريح المناسب قبل إجراء أي استطلاع على أي هدف.
</p>

<p align="center">
  <a href="LICENSE">رخصة MIT</a> &bull; بُني بـ Bun + TypeScript
</p>
