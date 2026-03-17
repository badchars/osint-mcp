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
  <strong>Українська</strong> |
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

<h3 align="center">OSINT та розвідувальна інформація для AI-агентів.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; об'єднані в один MCP-сервер.<br>
  Ваш AI-агент отримує <b>повноспектральний OSINT на вимогу</b>, а не 12 вкладок браузера та ручну кореляцію.
</p>

<br>

<p align="center">
  <a href="#проблема">Проблема</a> &bull;
  <a href="#чим-це-відрізняється">Чим це відрізняється</a> &bull;
  <a href="#швидкий-старт">Швидкий старт</a> &bull;
  <a href="#що-може-робити-ai">Що може робити AI</a> &bull;
  <a href="#довідка-по-інструментах-37-інструментів">Інструменти (37)</a> &bull;
  <a href="#джерела-даних-12">Джерела даних</a> &bull;
  <a href="#архітектура">Архітектура</a>
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

## Проблема

Збір OSINT — це перший крок кожного тесту на проникнення, баг-баунті та оцінки загроз. Дані, які вам потрібні, розсіяні по десятках платформ &mdash; кожна зі своїм API, своєю автентифікацією, своїми обмеженнями швидкості, своїм форматом виводу. Сьогодні ви відкриваєте Shodan в одній вкладці, VirusTotal в іншій, запускаєте `dig` у терміналі, копіюєте-вставляєте з WHOIS, переходите на crt.sh для сертифікатів, а потім витрачаєте 30 хвилин на ручну кореляцію всього.

```
Традиційний робочий процес OSINT:
  визначити DNS-записи            →  dig / nslookup CLI
  перевірити реєстрацію WHOIS     →  whois CLI або веб-інструмент
  перелічити піддомени            →  crt.sh + SecurityTrails + VirusTotal (3 різні UI)
  сканувати відкриті порти/сервіси →  веб-інтерфейс Shodan
  перевірити репутацію домену     →  веб-інтерфейс VirusTotal
  відобразити IP-інфраструктуру   →  Censys + BGP-пошук
  знайти архівовані сторінки      →  веб-UI Wayback Machine
  перевірити email-безпеку        →  ручні MX/SPF/DMARC пошуки
  зіставити все                   →  копіювати-вставляти в таблицю
  ─────────────────────────────────
  Всього: 45+ хвилин на ціль, більшість — перемикання контекстів
```

**osint-mcp** дає вашому AI-агенту 37 інструментів з 12 джерел даних через [Model Context Protocol](https://modelcontextprotocol.io). Агент запитує всі джерела паралельно, співставляє дані, визначає ризики і представляє єдину розвідувальну картину &mdash; в одній розмові.

```
З osint-mcp:
  Ви: "Зроби повну розвідку target.com"

  Агент: → DNS: 4 A-записи, 3 MX (Google Workspace), 2 NS
         → WHOIS: Зареєстровано 2019, закінчується 2025, GoDaddy
         → crt.sh: 47 унікальних піддоменів з CT-логів
         → HackerTarget: 23 хости з IP
         → Email: SPF soft-fail (~all), DMARC p=none, немає DKIM
         → Shodan: 3 IP, 12 відкритих портів, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: Чиста репутація, 0 виявлень
         → "target.com має 47 піддоменів, слабка email-безпека
            (SPF soft-fail, DMARC тільки моніторинг), і один IP
            з Apache 2.4.49 з відомою вразливістю path traversal.
            Пріоритет: пропатчити Apache, оновити SPF до -all, встановити DMARC p=reject."
```

---

## Чим це відрізняється

Існуючі OSINT-інструменти дають вам сирі дані з одного джерела за раз. osint-mcp дає вашому AI-агенту можливість **міркувати з усіх джерел одночасно**.

<table>
<thead>
<tr>
<th></th>
<th>Традиційний OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Інтерфейс</b></td>
<td>12 різних веб-UI, CLI та API</td>
<td>MCP &mdash; AI-агент викликає інструменти через розмову</td>
</tr>
<tr>
<td><b>Джерела даних</b></td>
<td>По одній платформі за раз</td>
<td>12 джерел запитуються паралельно</td>
</tr>
<tr>
<td><b>Перелік піддоменів</b></td>
<td>crt.sh АБО SecurityTrails АБО VirusTotal</td>
<td>Агент об'єднує всі три + HackerTarget, дедуплікує</td>
</tr>
<tr>
<td><b>Кореляція</b></td>
<td>Ручне копіювання-вставляння між вкладками</td>
<td>Агент перехресно посилається: "Цей IP з Shodan також з'являється в Censys з простроченим сертифікатом"</td>
</tr>
<tr>
<td><b>Email-безпека</b></td>
<td>Окремі SPF/DMARC/DKIM пошуки</td>
<td>Комбінований аналіз з оцінкою ризику та конкретними рекомендаціями</td>
</tr>
<tr>
<td><b>Інфраструктура</b></td>
<td>GeoIP + BGP + WHOIS окремо</td>
<td>Агент відображає повну інфраструктуру: ASN, префікси, геолокація, власність</td>
</tr>
<tr>
<td><b>API-ключі</b></td>
<td>Потрібні майже для всього</td>
<td>21 інструмент працює безкоштовно, 16 більше з опційними API-ключами</td>
</tr>
<tr>
<td><b>Налаштування</b></td>
<td>Встановити кожен інструмент, керувати кожною конфігурацією</td>
<td><code>npx osint-mcp</code> &mdash; одна команда, нуль конфігурацій</td>
</tr>
</tbody>
</table>

---

## Швидкий старт

### Варіант 1: npx (без встановлення)

```bash
npx osint-mcp
```

21 публічний OSINT-інструмент працює відразу. API-ключі не потрібні.

### Варіант 2: Клонування

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Змінні середовища (опційно)

```bash
# Преміум OSINT-джерела — всі опційні
export SHODAN_API_KEY=your-key           # Вмикає 4 інструменти Shodan
export VT_API_KEY=your-key               # Вмикає 4 інструменти VirusTotal
export ST_API_KEY=your-key               # Вмикає 3 інструменти SecurityTrails
export CENSYS_API_ID=your-id             # Вмикає 3 інструменти Censys
export CENSYS_API_SECRET=your-secret     # Потрібно разом з CENSYS_API_ID
```

Всі преміум API-ключі опційні. Без них ви все одно отримуєте 21 інструмент, що охоплює DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget та виявлення орендаторів Microsoft 365.

### Підключення до вашого AI-агента

<details open>
<summary><b>Claude Code</b></summary>

```bash
# З npx
claude mcp add osint-mcp -- npx osint-mcp

# З локального клону
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Додайте до `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / інші MCP-клієнти</b></summary>

Той самий формат JSON-конфігурації. Вкажіть команду на `npx osint-mcp` або шлях до вашої локальної інсталяції.

</details>

### Почніть запитувати

```
Ви: "Що ти можеш знайти про example.com?"
```

Ось і все. Агент автоматично обробляє DNS, WHOIS, піддомени, email-безпеку та багато іншого.

---

## Що може робити AI

### Розвідка домену

```
Ви: "Зроби повну розвідку target.com"

Агент: → osint_domain_recon {domain: "target.com"}
       → DNS: A-записи вказують на 3 IP (AWS us-east-1)
       → WHOIS: Зареєстровано 2018 через Namecheap, закінчується 2026
       → crt.sh: Виявлено 62 піддомени
       → HackerTarget: 31 хост з визначеними IP
       → Email: SPF hard-fail, DMARC p=reject, знайдено DKIM (selector1)
       → "target.com добре налаштований для email-безпеки.
          Знайдено 62 піддомени — примітні: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Інфраструктура на AWS (us-east-1)."
```

### Відображення поверхні атаки

```
Ви: "Відобрази поверхню атаки для 203.0.113.50"

Агент: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Відкриті порти: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy на 8080
          Зворотний DNS: web1.target.com
          3 відомі CVE позначені Shodan"
```

### Перелік піддоменів (багато джерел)

```
Ви: "Знайди всі піддомени target.com використовуючи всі доступні джерела"

Агент: → crtsh_search {domain: "target.com"}              → 62 піддомени
       → st_subdomains {domain: "target.com"}              → 84 піддомени
       → vt_subdomains {domain: "target.com"}              → 41 піддомен
       → hackertarget_hostsearch {domain: "target.com"}    → 31 хост
       → dns_wildcard_check {domain: "target.com"}         → Без wildcard
       → "127 унікальних піддоменів після дедуплікації з 4 джерел.
          Примітні знахідки: staging.target.com, dev-api.target.com,
          jenkins.target.com (ризик експозиції CI/CD),
          old-admin.target.com (можлива застаріла система)"
```

### Аудит email-безпеки

```
Ви: "Проаналізуй стан email-безпеки target.com"

Агент: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Email-безпека: ВИСОКИЙ РИЗИК
          SPF: ~all (м'який збій — можна підробити)
          DMARC: p=none (тільки моніторинг — не застосовується)
          DKIM: Знайдено для selector1 (2048-біт, добре)
          SPF-ланцюг: 7 включень, 2 сервіси (Google Workspace, SendGrid)
          M365: Не орендатор Microsoft
          Рекомендації:
          1. Оновити SPF з ~all до -all
          2. Змінити DMARC з p=none на p=quarantine, потім p=reject
          3. Додати rua= до DMARC для агрегованої звітності"
```

### Історична розвідка

```
Ви: "Що запускав target.com 3 роки тому?"

Агент: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS-історія: target.com переїхав з 198.51.100.1 (DigitalOcean)
          на 203.0.113.50 (AWS) в 2023.
          Wayback знайшов 342 унікальні URL включно з:
          - /admin/ (видалено в 2024, був доступний)
          - /api/v1/docs (Swagger UI, все ще в кеші)
          - /wp-content/ (був WordPress, мігрував)
          Старий robots.txt забороняв /internal/ та /debug/"
```

---

## Довідка по інструментах (37 інструментів)

<details open>
<summary><b>DNS (6) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `dns_lookup` | Визначити A, AAAA, MX, TXT, NS, SOA, CNAME, SRV записи |
| `dns_reverse` | Зворотній DNS (PTR) пошук для IP-адреси |
| `dns_email_security` | Аналіз SPF + DMARC + DKIM з оцінкою ризику та рекомендаціями |
| `dns_spf_chain` | Рекурсивне визначення ланцюга SPF include з виявленням сервісів |
| `dns_srv_discover` | Виявлення сервісів SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos тощо) |
| `dns_wildcard_check` | Виявлення wildcard DNS через пробу випадкового піддомену |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `whois_domain` | RDAP пошук домену &mdash; реєстратор, дати, сервери імен, контакти |
| `whois_ip` | RDAP пошук IP &mdash; ім'я мережі, CIDR, країна, сутності |

</details>

<details>
<summary><b>Прозорість сертифікатів (1) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `crtsh_search` | Пошук CT-логів через crt.sh &mdash; виявлення піддоменів + деталі сертифікатів |

</details>

<details>
<summary><b>Shodan (4) &mdash; Потрібен SHODAN_API_KEY</b></summary>

| Інструмент | Опис |
|------|-------------|
| `shodan_host` | Деталі IP: відкриті порти, сервіси, банери, вразливості, ОС, ASN |
| `shodan_search` | Пошук за мовою запитів Shodan (напр. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Масове визначення hostname-в-IP через Shodan |
| `shodan_exploits` | Пошук бази публічних експлойтів (PoC, модулі Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Потрібен VT_API_KEY</b></summary>

| Інструмент | Опис |
|------|-------------|
| `vt_domain` | Репутація домену, статистика виявлень, категорії, DNS-записи |
| `vt_ip` | Репутація IP, статистика виявлень, ASN, мережа |
| `vt_subdomains` | Перелік піддоменів через VirusTotal |
| `vt_url` | Сканування URL + аналіз шкідливого ПЗ/фішингу |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Потрібен ST_API_KEY</b></summary>

| Інструмент | Опис |
|------|-------------|
| `st_subdomains` | Перелік піддоменів (повертає FQDN) |
| `st_dns_history` | Історичні DNS-записи з датами першого/останнього перегляду |
| `st_whois` | Розширений WHOIS з контактами реєстранта/адміністратора/технічними |

</details>

<details>
<summary><b>Censys (3) &mdash; Потрібні CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Інструмент | Опис |
|------|-------------|
| `censys_hosts` | Пошук хостів &mdash; IP, сервіси, порти, місцезнаходження, ASN |
| `censys_host_details` | Повні деталі одного хоста з усіма сервісами |
| `censys_certificates` | Пошук сертифікатів за доменом, відбитком, емітентом |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `geoip_lookup` | Геолокація IP: країна, місто, ISP, ASN, виявлення проксі/хостингу/VPN |
| `geoip_batch` | Масова геолокація IP (до 100 IP за раз) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `bgp_asn` | Деталі ASN + всі оголошені IPv4/IPv6 префікси |
| `bgp_ip` | Пошук маршрутизації IP-префіксу/ASN з виділенням RIR |
| `bgp_prefix` | Деталі префіксу + оголошуючі ASN |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `wayback_urls` | Виявлення архівованих URL &mdash; знайти старі ендпоінти, приховані шляхи, видалений контент |
| `wayback_snapshots` | Історія знімків з часовими мітками та прямими посиланнями на архів |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `hackertarget_hostsearch` | Виявлення хостів/піддоменів з визначеними IP |
| `hackertarget_reverseip` | Зворотній IP-пошук &mdash; знайти всі домени на IP |
| `hackertarget_aslookup` | Пошук інформації про ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `m365_tenant` | Виявити ID орендатора M365, регіон та конфігурацію OpenID |
| `m365_userrealm` | Визначити тип автентифікації (Керований/Федеративний), бренд федерації, ендпоінти автентифікації |

</details>

<details>
<summary><b>Мета (2) &mdash; Без API-ключа</b></summary>

| Інструмент | Опис |
|------|-------------|
| `osint_list_sources` | Перелічити всі OSINT-джерела, статус API-ключів та кількість інструментів |
| `osint_domain_recon` | Швидка розвідка, що поєднує всі безкоштовні джерела (DNS + WHOIS + crt.sh + HackerTarget + email-безпека) |

</details>

---

## Джерела даних (12)

| Джерело | Автентифікація | Обмеження швидкості | Що надає |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Немає | Немає | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR записи |
| [RDAP](https://rdap.org/) | Немає | 1 зап/с | Дані WHOIS домену та IP (реєстратор, дати, контакти, CIDR) |
| [crt.sh](https://crt.sh/) | Немає | 0.5 зап/с | Логи прозорості сертифікатів, виявлення піддоменів |
| [ip-api.com](http://ip-api.com/) | Немає | 45 зап/хв | Геолокація IP, ISP, ASN, виявлення проксі/VPN/хостингу |
| [BGPView](https://bgpview.io/) | Немає | 0.5 зап/с | Деталі ASN, оголошені префікси, інформація про маршрутизацію IP |
| [HackerTarget](https://hackertarget.com/) | Немає | 2 зап/с | Пошук хостів, зворотній IP, пошук ASN (50/день безкоштовно) |
| [Wayback Machine](https://web.archive.org/) | Немає | 1 зап/с | Архівовані URL, історія знімків, історичний контент |
| [Microsoft 365](https://login.microsoftonline.com/) | Немає | Немає | Виявлення орендатора, виявлення федерації, тип автентифікації |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 зап/с | Сканування портів/сервісів/банерів в масштабі Інтернету |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 зап/хв | Репутація домену/IP/URL, виявлення шкідливого ПЗ |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 зап/с | Історія DNS, перелік піддоменів, розширений WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 зап/с | Пошук хостів, прозорість сертифікатів, виявлення сервісів |

---

## Архітектура

```
src/
├── index.ts                    Точка входу, конфігурація env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 визначень інструментів (Zod-схеми)
│   └── mcp-server.ts           MCP-сервер + stdio-транспорт
├── dns/
│   └── index.ts                6 функцій — lookup, reverse, email, SPF-ланцюг, SRV, wildcard
├── whois/
│   └── index.ts                2 функції — доменний RDAP, IP RDAP
├── crtsh/
│   └── index.ts                Пошук CT-логів з дедуплікацією + кешуванням
├── shodan/
│   └── index.ts                Хост, пошук, визначення DNS, експлойти
├── virustotal/
│   └── index.ts                Домен, IP, піддомени, сканування URL
├── securitytrails/
│   └── index.ts                Піддомени, історія DNS, WHOIS
├── censys/
│   └── index.ts                Пошук хостів, деталі хоста, сертифікати
├── geoip/
│   └── index.ts                Одинична + масова геолокація IP
├── bgp/
│   └── index.ts                ASN, IP-префікс, деталі префіксу
├── wayback/
│   └── index.ts                Пошук URL + історія знімків
├── hackertarget/
│   └── index.ts                Пошук хостів, зворотній IP, ASN
├── m365/
│   └── index.ts                Виявлення орендатора, realm користувача/федерація
├── meta/
│   ├── sources.ts              Перевірка доступності джерел
│   └── recon.ts                Комбінована розвідка домену з безкоштовних джерел
└── utils/
    ├── rate-limiter.ts          Обмежувач швидкості на основі черги
    ├── cache.ts                 Загальний TTL-кеш
    └── require-key.ts           Помічник перевірки API-ключа
```

**Рішення щодо дизайну:**

- **12 провайдерів, 1 сервер** &mdash; Кожне OSINT-джерело є незалежним модулем. Агент вибирає, які інструменти використовувати на основі запиту.
- **21 безкоштовний інструмент** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget та M365 працюють без будь-яких API-ключів. Преміум-джерела додаткові.
- **Паралельні запити** &mdash; `osint_domain_recon` викликає 8 джерел через `Promise.allSettled`. Якщо одне джерело таймаутиться, решта все одно повертають дані.
- **Обмежувачі швидкості для кожного провайдера** &mdash; Кожне джерело даних має свій власний екземпляр `RateLimiter`, калібрований до обмежень того API. Немає загального вузького місця.
- **TTL-кешування** &mdash; Результати crt.sh (15хв), BGP (30хв), Shodan (5хв), VirusTotal (10хв) кешуються, щоб уникнути зайвих викликів API під час багатоінструментальних робочих процесів.
- **Плавна деградація** &mdash; Відсутність API-ключів не ламає сервер. Інструменти повертають описові повідомлення про помилки: "Встановіть SHODAN_API_KEY, щоб увімкнути інструменти Shodan."
- **Аналіз SPF-ланцюга** &mdash; Рекурсивне визначення include з виявленням циклів, ідентифікацією сервісів (Google Workspace, Microsoft 365, SendGrid тощо) та перевіркою обмеження кількості пошуків RFC 7208.
- **2 залежності** &mdash; `@modelcontextprotocol/sdk` і `zod`. Весь HTTP через нативний `fetch`. Весь DNS через `node:dns/promises`.

---

## Обмеження

- Застосовуються обмеження безкоштовного рівня: HackerTarget (50/день), ip-api.com (45/хв), VirusTotal community (4/хв)
- crt.sh може бути повільним для великих доменів (застосовується таймаут 30с)
- ip-api.com вимагає HTTP (не HTTPS) для безкоштовного рівня
- CDX API Wayback Machine може таймаутитися для дуже популярних доменів
- WHOIS через RDAP може не охоплювати всі TLD (деякі реєстратори ще не підтримують RDAP)
- Протестовано macOS / Linux (Windows не тестувався)

---

## Частина MCP Security Suite

| Проект | Домен | Інструменти |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Тестування безпеки на основі браузера | 39 інструментів, Firefox, тестування ін'єкцій |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Безпека хмари (AWS/Azure/GCP) | 38 інструментів, 60+ перевірок |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Стан безпеки GitHub | 39 інструментів, 45 перевірок |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Розвідка вразливостей | 23 інструменти, 5 джерел |
| **osint-mcp** | **OSINT та розвідка** | **37 інструментів, 12 джерел** |

---

<p align="center">
<b>Тільки для авторизованого тестування безпеки та оцінки.</b><br>
Завжди переконуйтеся, що у вас є належний дозвіл перед виконанням розвідки будь-якої цілі.
</p>

<p align="center">
  <a href="LICENSE">Ліцензія MIT</a> &bull; Побудовано з Bun + TypeScript
</p>
