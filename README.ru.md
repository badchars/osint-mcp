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
  <strong>Русский</strong> |
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
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Разведка из открытых источников (OSINT) и рекогносцировка для ИИ-агентов.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; объединены в одном MCP-сервере.<br>
  Ваш ИИ-агент получает <b>полноспектральный OSINT по запросу</b>, а не 12 вкладок браузера и ручную корреляцию.
</p>

<br>

<p align="center">
  <a href="#проблема">Проблема</a> &bull;
  <a href="#чем-отличается">Чем отличается</a> &bull;
  <a href="#быстрый-старт">Быстрый старт</a> &bull;
  <a href="#что-может-ии">Что может ИИ</a> &bull;
  <a href="#справочник-инструментов-37-инструментов">Инструменты (37)</a> &bull;
  <a href="#источники-данных-12">Источники данных</a> &bull;
  <a href="#архитектура">Архитектура</a>
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

Сбор разведданных из открытых источников (OSINT) — первый этап любого тестирования на проникновение, программы bug bounty и оценки угроз. Необходимые данные разбросаны по десяткам платформ — у каждой свой API, своя аутентификация, свои лимиты запросов, свой формат вывода. Сегодня вы открываете Shodan в одной вкладке, VirusTotal в другой, запускаете `dig` в терминале, копируете данные из WHOIS, переключаетесь на crt.sh для сертификатов, а потом 30 минут вручную коррелируете всё это.

```
Традиционный OSINT-процесс:
  получить DNS-записи              →  dig / nslookup в CLI
  проверить WHOIS-регистрацию      →  утилита whois или веб-сервис
  перечислить поддомены            →  crt.sh + SecurityTrails + VirusTotal (3 разных интерфейса)
  просканировать порты/сервисы     →  веб-интерфейс Shodan
  проверить репутацию домена       →  веб-интерфейс VirusTotal
  картировать IP-инфраструктуру    →  Censys + BGP-запросы
  найти архивные страницы          →  веб-интерфейс Wayback Machine
  проверить защиту электронной почты → ручные запросы MX/SPF/DMARC
  скоррелировать всё               →  копирование в таблицу
  ─────────────────────────────────
  Итого: 45+ минут на каждую цель, большая часть — переключение контекста
```

**osint-mcp** предоставляет вашему ИИ-агенту 37 инструментов по 12 источникам данных через [Model Context Protocol](https://modelcontextprotocol.io). Агент параллельно опрашивает все источники, коррелирует данные, выявляет риски и формирует единую разведывательную картину — в одном диалоге.

```
С osint-mcp:
  Вы: "Проведи полную разведку target.com"

  Агент: → DNS: 4 записи A, 3 MX (Google Workspace), 2 NS
         → WHOIS: зарегистрирован в 2019, истекает в 2025, GoDaddy
         → crt.sh: 47 уникальных поддоменов из логов CT
         → HackerTarget: 23 хоста с IP-адресами
         → Email: SPF soft-fail (~all), DMARC p=none, DKIM не найден
         → Shodan: 3 IP, 12 открытых портов, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: чистая репутация, 0 обнаружений
         → "target.com: 47 поддоменов, слабая защита электронной почты
            (SPF soft-fail, DMARC только мониторинг), один IP
            с Apache 2.4.49 и известной CVE обхода пути.
            Приоритет: обновить Apache, ужесточить SPF до -all,
            установить DMARC в p=reject."
```

---

## Чем отличается

Существующие OSINT-инструменты выдают необработанные данные по одному источнику за раз. osint-mcp даёт вашему ИИ-агенту возможность **анализировать все источники одновременно**.

<table>
<thead>
<tr>
<th></th>
<th>Традиционный OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Интерфейс</b></td>
<td>12 разных веб-интерфейсов, CLI и API</td>
<td>MCP &mdash; ИИ-агент вызывает инструменты в диалоге</td>
</tr>
<tr>
<td><b>Источники данных</b></td>
<td>Одна платформа за раз</td>
<td>12 источников опрашиваются параллельно</td>
</tr>
<tr>
<td><b>Перечисление поддоменов</b></td>
<td>crt.sh ИЛИ SecurityTrails ИЛИ VirusTotal</td>
<td>Агент объединяет все три + HackerTarget с дедупликацией</td>
</tr>
<tr>
<td><b>Корреляция</b></td>
<td>Ручное копирование между вкладками</td>
<td>Агент перекрёстно сопоставляет: «Этот IP из Shodan также есть в Censys с просроченным сертификатом»</td>
</tr>
<tr>
<td><b>Безопасность почты</b></td>
<td>Раздельные запросы SPF/DMARC/DKIM</td>
<td>Комплексный анализ с оценкой рисков и конкретными рекомендациями</td>
</tr>
<tr>
<td><b>Инфраструктура</b></td>
<td>GeoIP + BGP + WHOIS по отдельности</td>
<td>Агент строит полную карту инфраструктуры: ASN, префиксы, геолокация, владелец</td>
</tr>
<tr>
<td><b>API-ключи</b></td>
<td>Требуются почти для всего</td>
<td>21 инструмент работает бесплатно, ещё 16 — с опциональными API-ключами</td>
</tr>
<tr>
<td><b>Установка</b></td>
<td>Установка каждого инструмента, настройка каждого конфига</td>
<td><code>npx osint-mcp</code> &mdash; одна команда, ноль настроек</td>
</tr>
</tbody>
</table>

---

## Быстрый старт

### Вариант 1: npx (без установки)

```bash
npx osint-mcp
```

21 публичный OSINT-инструмент работает сразу. API-ключи не требуются.

### Вариант 2: Клонирование

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Переменные окружения (опционально)

```bash
# Премиум-источники OSINT — все опциональны
export SHODAN_API_KEY=your-key           # Включает 4 инструмента Shodan
export VT_API_KEY=your-key               # Включает 4 инструмента VirusTotal
export ST_API_KEY=your-key               # Включает 3 инструмента SecurityTrails
export CENSYS_API_ID=your-id             # Включает 3 инструмента Censys
export CENSYS_API_SECRET=your-secret     # Требуется вместе с CENSYS_API_ID
```

Все премиум API-ключи опциональны. Без них вы получаете 21 инструмент, покрывающий DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget и обнаружение тенантов Microsoft 365.

### Подключение к ИИ-агенту

<details open>
<summary><b>Claude Code</b></summary>

```bash
# С npx
claude mcp add osint-mcp -- npx osint-mcp

# С локальным клоном
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Добавьте в `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / другие MCP-клиенты</b></summary>

Тот же формат JSON-конфигурации. Укажите команду `npx osint-mcp` или путь к локальной установке.

</details>

### Начните запрашивать

```
Вы: "Что можно узнать о example.com?"
```

Вот и всё. Агент автоматически обработает DNS, WHOIS, поддомены, безопасность электронной почты и многое другое.

---

## Что может ИИ

### Разведка домена

```
Вы: "Проведи полную разведку target.com"

Агент: → osint_domain_recon {domain: "target.com"}
       → DNS: записи A указывают на 3 IP (AWS us-east-1)
       → WHOIS: зарегистрирован в 2018 через Namecheap, истекает в 2026
       → crt.sh: обнаружено 62 поддомена
       → HackerTarget: 31 хост с разрешёнными IP
       → Email: SPF hard-fail, DMARC p=reject, DKIM найден (selector1)
       → "target.com имеет хорошую настройку почтовой безопасности.
          Найдено 62 поддомена — примечательные: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          Инфраструктура размещена на AWS (us-east-1)."
```

### Картирование поверхности атаки

```
Вы: "Построй карту поверхности атаки для 203.0.113.50"

Агент: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          Открытые порты: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy на 8080
          Обратный DNS: web1.target.com
          3 известные CVE обнаружены Shodan"
```

### Перечисление поддоменов (мультиисточник)

```
Вы: "Найди все поддомены target.com, используя все доступные источники"

Агент: → crtsh_search {domain: "target.com"}              → 62 поддомена
       → st_subdomains {domain: "target.com"}              → 84 поддомена
       → vt_subdomains {domain: "target.com"}              → 41 поддомен
       → hackertarget_hostsearch {domain: "target.com"}    → 31 хост
       → dns_wildcard_check {domain: "target.com"}         → Wildcard отсутствует
       → "127 уникальных поддоменов после дедупликации по 4 источникам.
          Примечательные находки: staging.target.com, dev-api.target.com,
          jenkins.target.com (риск раскрытия CI/CD),
          old-admin.target.com (потенциально устаревшая система)"
```

### Аудит безопасности электронной почты

```
Вы: "Проанализируй состояние почтовой безопасности target.com"

Агент: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "Безопасность почты: ВЫСОКИЙ РИСК
          SPF: ~all (soft fail — возможен спуфинг)
          DMARC: p=none (только мониторинг — без принудительного применения)
          DKIM: найден для selector1 (2048-бит, хорошо)
          Цепочка SPF: 7 включений, 2 сервиса (Google Workspace, SendGrid)
          M365: не является тенантом Microsoft
          Рекомендации:
          1. Обновить SPF с ~all на -all
          2. Изменить DMARC с p=none на p=quarantine, затем p=reject
          3. Добавить rua= в DMARC для агрегированных отчётов"
```

### Историческая разведка

```
Вы: "Что было на target.com 3 года назад?"

Агент: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "История DNS: target.com мигрировал с 198.51.100.1 (DigitalOcean)
          на 203.0.113.50 (AWS) в 2023 году.
          Wayback обнаружил 342 уникальных URL, включая:
          - /admin/ (удалён в 2024, был доступен)
          - /api/v1/docs (Swagger UI, всё ещё в кеше)
          - /wp-content/ (был WordPress, мигрирован)
          Старый robots.txt запрещал /internal/ и /debug/"
```

---

## Справочник инструментов (37 инструментов)

<details open>
<summary><b>DNS (6) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `dns_lookup` | Разрешение записей A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Обратный DNS-запрос (PTR) для IP-адреса |
| `dns_email_security` | Анализ SPF + DMARC + DKIM с оценкой рисков и рекомендациями |
| `dns_spf_chain` | Рекурсивное разрешение цепочки SPF-включений с определением сервисов |
| `dns_srv_discover` | Обнаружение сервисов через SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos и др.) |
| `dns_wildcard_check` | Обнаружение wildcard DNS через запрос случайного поддомена |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `whois_domain` | RDAP-запрос домена &mdash; регистратор, даты, DNS-серверы, контакты |
| `whois_ip` | RDAP-запрос IP &mdash; имя сети, CIDR, страна, владельцы |

</details>

<details>
<summary><b>Прозрачность сертификатов (1) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `crtsh_search` | Поиск в логах CT через crt.sh &mdash; обнаружение поддоменов + данные сертификатов |

</details>

<details>
<summary><b>Shodan (4) &mdash; Требуется SHODAN_API_KEY</b></summary>

| Инструмент | Описание |
|------|-------------|
| `shodan_host` | Детали IP: открытые порты, сервисы, баннеры, уязвимости, ОС, ASN |
| `shodan_search` | Поиск на языке запросов Shodan (напр. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Массовое разрешение имён хостов в IP через Shodan |
| `shodan_exploits` | Поиск в публичной базе эксплойтов (PoC, модули Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Требуется VT_API_KEY</b></summary>

| Инструмент | Описание |
|------|-------------|
| `vt_domain` | Репутация домена, статистика обнаружений, категории, DNS-записи |
| `vt_ip` | Репутация IP, статистика обнаружений, ASN, сеть |
| `vt_subdomains` | Перечисление поддоменов через VirusTotal |
| `vt_url` | Сканирование URL + анализ на вредоносное ПО/фишинг |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Требуется ST_API_KEY</b></summary>

| Инструмент | Описание |
|------|-------------|
| `st_subdomains` | Перечисление поддоменов (возвращает FQDN) |
| `st_dns_history` | Исторические DNS-записи с датами первого/последнего обнаружения |
| `st_whois` | Расширенный WHOIS с контактами регистранта/администратора/техподдержки |

</details>

<details>
<summary><b>Censys (3) &mdash; Требуется CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Инструмент | Описание |
|------|-------------|
| `censys_hosts` | Поиск хостов &mdash; IP, сервисы, порты, местоположение, ASN |
| `censys_host_details` | Полная информация об отдельном хосте со всеми сервисами |
| `censys_certificates` | Поиск сертификатов по домену, отпечатку, издателю |

</details>

<details>
<summary><b>GeoIP (2) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `geoip_lookup` | Геолокация IP: страна, город, провайдер, ASN, обнаружение прокси/хостинга/VPN |
| `geoip_batch` | Пакетная геолокация IP (до 100 адресов за раз) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `bgp_asn` | Данные ASN + все анонсируемые IPv4/IPv6-префиксы |
| `bgp_ip` | Поиск IP-префикса/ASN-маршрутизации с распределением RIR |
| `bgp_prefix` | Данные о префиксе + анонсирующие ASN |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `wayback_urls` | Обнаружение архивных URL &mdash; старые эндпоинты, скрытые пути, удалённый контент |
| `wayback_snapshots` | История снимков с временными метками и прямыми ссылками на архив |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `hackertarget_hostsearch` | Обнаружение хостов/поддоменов с разрешёнными IP |
| `hackertarget_reverseip` | Обратный поиск IP &mdash; все домены на одном IP-адресе |
| `hackertarget_aslookup` | Поиск информации об ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `m365_tenant` | Обнаружение тенанта M365: ID, регион и конфигурация OpenID |
| `m365_userrealm` | Определение типа аутентификации (Managed/Federated), бренд федерации, эндпоинты аутентификации |

</details>

<details>
<summary><b>Мета (2) &mdash; API-ключ не требуется</b></summary>

| Инструмент | Описание |
|------|-------------|
| `osint_list_sources` | Список всех OSINT-источников, статус API-ключей и количество инструментов |
| `osint_domain_recon` | Экспресс-разведка с использованием всех бесплатных источников (DNS + WHOIS + crt.sh + HackerTarget + безопасность почты) |

</details>

---

## Источники данных (12)

| Источник | Аутентификация | Лимит запросов | Что предоставляет |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Нет | Нет | Записи A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Нет | 1 запрос/с | WHOIS-данные домена и IP (регистратор, даты, контакты, CIDR) |
| [crt.sh](https://crt.sh/) | Нет | 0.5 запроса/с | Логи прозрачности сертификатов, обнаружение поддоменов |
| [ip-api.com](http://ip-api.com/) | Нет | 45 запросов/мин | Геолокация IP, провайдер, ASN, обнаружение прокси/VPN/хостинга |
| [BGPView](https://bgpview.io/) | Нет | 0.5 запроса/с | Данные ASN, анонсируемые префиксы, маршрутная информация IP |
| [HackerTarget](https://hackertarget.com/) | Нет | 2 запроса/с | Поиск хостов, обратный IP, поиск ASN (50/день бесплатно) |
| [Wayback Machine](https://web.archive.org/) | Нет | 1 запрос/с | Архивные URL, история снимков, исторический контент |
| [Microsoft 365](https://login.microsoftonline.com/) | Нет | Нет | Обнаружение тенантов, определение федерации, тип аутентификации |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 запрос/с | Глобальное сканирование портов/сервисов/баннеров |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 запроса/мин | Репутация доменов/IP/URL, обнаружение вредоносного ПО |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 запрос/с | История DNS, перечисление поддоменов, расширенный WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 запрос/с | Поиск хостов, прозрачность сертификатов, обнаружение сервисов |

---

## Архитектура

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

**Проектные решения:**

- **12 провайдеров, 1 сервер** &mdash; Каждый OSINT-источник — независимый модуль. Агент выбирает нужные инструменты в зависимости от запроса.
- **21 бесплатный инструмент** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget и M365 работают без API-ключей. Премиум-источники дополняют набор.
- **Параллельные запросы** &mdash; `osint_domain_recon` обращается к 8 источникам через `Promise.allSettled`. Если один источник не отвечает, остальные продолжают возвращать данные.
- **Раздельные лимитеры по провайдерам** &mdash; У каждого источника данных свой экземпляр `RateLimiter`, откалиброванный под лимиты его API. Нет общего узкого места.
- **TTL-кеширование** &mdash; crt.sh (15 мин), BGP (30 мин), Shodan (5 мин), VirusTotal (10 мин) — результаты кешируются для исключения избыточных запросов в многоинструментных сценариях.
- **Плавная деградация** &mdash; Отсутствие API-ключей не вызывает сбоев сервера. Инструменты возвращают информативные сообщения: «Установите SHODAN_API_KEY для активации инструментов Shodan.»
- **Анализ цепочки SPF** &mdash; Рекурсивное разрешение включений с обнаружением циклов, идентификацией сервисов (Google Workspace, Microsoft 365, SendGrid и др.) и проверкой лимита запросов по RFC 7208.
- **2 зависимости** &mdash; `@modelcontextprotocol/sdk` и `zod`. Все HTTP-запросы через нативный `fetch`. Весь DNS через `node:dns/promises`.

---

## Ограничения

- Действуют лимиты бесплатных тарифов: HackerTarget (50/день), ip-api.com (45/мин), VirusTotal community (4/мин)
- crt.sh может работать медленно для крупных доменов (установлен таймаут 30 с)
- ip-api.com для бесплатного тарифа требует HTTP (не HTTPS)
- CDX API Wayback Machine может зависать для очень популярных доменов
- WHOIS через RDAP может не покрывать все TLD (некоторые регистраторы пока не поддерживают RDAP)
- Протестировано на macOS / Linux (Windows не тестировался)

---

## Пакет безопасности MCP

| Проект | Область | Инструменты |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Тестирование безопасности через браузер | 39 инструментов, Firefox, тестирование инъекций |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Безопасность облака (AWS/Azure/GCP) | 38 инструментов, 60+ проверок |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Состояние безопасности GitHub | 39 инструментов, 45 проверок |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Разведка уязвимостей | 23 инструмента, 5 источников |
| **osint-mcp** | **OSINT и рекогносцировка** | **37 инструментов, 12 источников** |

---

<p align="center">
<b>Только для авторизованного тестирования безопасности и оценки.</b><br>
Всегда убеждайтесь в наличии надлежащего разрешения перед проведением разведки любой цели.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Собрано на Bun + TypeScript
</p>
