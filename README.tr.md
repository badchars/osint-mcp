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
  <strong>Türkçe</strong> |
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

<h3 align="center">Yapay zeka ajanları için OSINT ve keşif istihbaratı.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; tek bir MCP sunucusunda birleştirildi.<br>
  Yapay zeka ajanınız <b>talep üzerine tam kapsamlı OSINT</b> elde eder; 12 tarayıcı sekmesi ve elle korelasyon değil.
</p>

<br>

<p align="center">
  <a href="#sorun">Sorun</a> &bull;
  <a href="#farkımız">Farkımız</a> &bull;
  <a href="#hızlı-başlangıç">Hızlı Başlangıç</a> &bull;
  <a href="#yapay-zeka-neler-yapabilir">Yapay Zeka Neler Yapabilir</a> &bull;
  <a href="#araç-referansı-37-araç">Araçlar (37)</a> &bull;
  <a href="#veri-kaynakları-12">Veri Kaynakları</a> &bull;
  <a href="#mimari">Mimari</a>
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

## Sorun

OSINT toplama, her sızma testi, hata ödülü programı ve tehdit değerlendirmesinin ilk adımıdır. İhtiyacınız olan veri düzinelerce platforma dağılmış durumdadır &mdash; her birinin kendine özgü API'si, kimlik doğrulaması, hız sınırları ve çıktı formatı vardır. Bugün bir sekmede Shodan açıyorsunuz, diğerinde VirusTotal, terminalde `dig` çalıştırıyorsunuz, WHOIS'ten kopyala-yapıştır yapıyorsunuz, sertifikalar için crt.sh'e geçiyorsunuz ve ardından her şeyi elle ilişkilendirmek için 30 dakika harcıyorsunuz.

```
Geleneksel OSINT iş akışı:
  DNS kayıtlarını çözümle            →  dig / nslookup CLI
  WHOIS kaydını kontrol et           →  whois CLI veya web aracı
  alt alan adlarını keşfet           →  crt.sh + SecurityTrails + VirusTotal (3 farklı arayüz)
  açık port/servisleri tara          →  Shodan web arayüzü
  domain itibarını kontrol et        →  VirusTotal web arayüzü
  IP altyapısını haritala            →  Censys + BGP sorguları
  arşivlenmiş sayfaları bul          →  Wayback Machine web arayüzü
  e-posta güvenliğini kontrol et     →  elle MX/SPF/DMARC sorguları
  her şeyi ilişkilendir              →  elektronik tabloya kopyala-yapıştır
  ─────────────────────────────────
  Toplam: Hedef başına 45+ dakika, büyük kısmı bağlam değiştirmeyle geçer
```

**osint-mcp**, yapay zeka ajanınıza [Model Context Protocol](https://modelcontextprotocol.io) aracılığıyla 12 veri kaynağında 37 araç sunar. Ajan tüm kaynakları paralel olarak sorgular, verileri ilişkilendirir, riskleri tespit eder ve tek bir konuşmada birleşik bir istihbarat tablosu sunar.

```
osint-mcp ile:
  Siz: "target.com üzerinde tam keşif yap"

  Ajan: → DNS: 4 A kaydı, 3 MX (Google Workspace), 2 NS
        → WHOIS: 2019'da kayıt, 2025'te sona eriyor, GoDaddy
        → crt.sh: CT loglarından 47 benzersiz alt alan adı
        → HackerTarget: IP'leri çözümlenmiş 23 host
        → E-posta: SPF soft-fail (~all), DMARC p=none, DKIM yok
        → Shodan: 3 IP, 12 açık port, Apache 2.4.49 (CVE-2021-41773)
        → VirusTotal: Temiz itibar, 0 tespit
        → "target.com'da 47 alt alan adı, zayıf e-posta güvenliği
           (SPF soft-fail, DMARC yalnızca izleme modunda) ve bilinen
           bir path traversal CVE'sine sahip Apache 2.4.49 çalıştıran
           bir IP mevcut.
           Öncelik: Apache'yi yamala, SPF'yi -all'a yükselt,
           DMARC'ı p=reject olarak ayarla."
```

---

## Farkımız

Mevcut OSINT araçları size tek seferde tek bir kaynaktan ham veri verir. osint-mcp, yapay zeka ajanınıza **tüm kaynaklar üzerinde eş zamanlı akıl yürütme** yeteneği kazandırır.

<table>
<thead>
<tr>
<th></th>
<th>Geleneksel OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Arayüz</b></td>
<td>12 farklı web arayüzü, CLI ve API</td>
<td>MCP &mdash; Yapay zeka ajanı araçları konuşarak çağırır</td>
</tr>
<tr>
<td><b>Veri kaynakları</b></td>
<td>Aynı anda yalnızca bir platform</td>
<td>12 kaynak paralel olarak sorgulanır</td>
</tr>
<tr>
<td><b>Alt alan adı keşfi</b></td>
<td>crt.sh VEYA SecurityTrails VEYA VirusTotal</td>
<td>Ajan üçünü + HackerTarget'ı birleştirir, tekrarları temizler</td>
</tr>
<tr>
<td><b>Korelasyon</b></td>
<td>Sekmeler arası elle kopyala-yapıştır</td>
<td>Ajan çapraz referans yapar: "Shodan'daki bu IP, Censys'te süresi dolmuş sertifikayla da görünüyor"</td>
</tr>
<tr>
<td><b>E-posta güvenliği</b></td>
<td>Ayrı SPF/DMARC/DKIM sorguları</td>
<td>Risk puanlı ve uygulanabilir önerilerle birleşik analiz</td>
</tr>
<tr>
<td><b>Altyapı</b></td>
<td>GeoIP + BGP + WHOIS ayrı ayrı</td>
<td>Ajan tam altyapıyı haritalar: ASN, ön ekler, coğrafi konum, sahiplik</td>
</tr>
<tr>
<td><b>API anahtarları</b></td>
<td>Neredeyse her şey için gerekli</td>
<td>21 araç ücretsiz çalışır, 16'sı opsiyonel API anahtarlarıyla etkinleşir</td>
</tr>
<tr>
<td><b>Kurulum</b></td>
<td>Her aracı ayrı kur, her yapılandırmayı ayrı yönet</td>
<td><code>npx osint-mcp</code> &mdash; tek komut, sıfır yapılandırma</td>
</tr>
</tbody>
</table>

---

## Hızlı Başlangıç

### Seçenek 1: npx (kurulum gerektirmez)

```bash
npx osint-mcp
```

21 genel OSINT aracı anında çalışır. API anahtarı gerekmez.

### Seçenek 2: Klonlama

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Ortam değişkenleri (opsiyonel)

```bash
# Premium OSINT kaynakları — tamamı opsiyonel
export SHODAN_API_KEY=your-key           # 4 Shodan aracını etkinleştirir
export VT_API_KEY=your-key               # 4 VirusTotal aracını etkinleştirir
export ST_API_KEY=your-key               # 3 SecurityTrails aracını etkinleştirir
export CENSYS_API_ID=your-id             # 3 Censys aracını etkinleştirir
export CENSYS_API_SECRET=your-secret     # CENSYS_API_ID ile birlikte gereklidir
```

Tüm premium API anahtarları opsiyoneldir. Bunlar olmadan bile DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget ve Microsoft 365 kiracı keşfini kapsayan 21 araca sahip olursunuz.

### Yapay zeka ajanınıza bağlayın

<details open>
<summary><b>Claude Code</b></summary>

```bash
# npx ile
claude mcp add osint-mcp -- npx osint-mcp

# Yerel klonla
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` dosyasına ekleyin:

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
<summary><b>Cursor / Windsurf / diğer MCP istemcileri</b></summary>

Aynı JSON yapılandırma formatı. Komutu `npx osint-mcp` veya yerel kurulum yolunuza yönlendirin.

</details>

### Sorgulamaya başlayın

```
Siz: "example.com hakkında ne bulabilirsin?"
```

Bu kadar. Ajan DNS, WHOIS, alt alan adları, e-posta güvenliği ve daha fazlasını otomatik olarak halleder.

---

## Yapay Zeka Neler Yapabilir

### Domain Keşfi

```
Siz: "target.com üzerinde tam keşif yap"

Ajan: → osint_domain_recon {domain: "target.com"}
      → DNS: A kayıtları 3 IP'ye işaret ediyor (AWS us-east-1)
      → WHOIS: 2018'de Namecheap üzerinden kayıt, 2026'da sona eriyor
      → crt.sh: 62 alt alan adı keşfedildi
      → HackerTarget: IP'leri çözümlenmiş 31 host
      → E-posta: SPF hard-fail, DMARC p=reject, DKIM bulundu (selector1)
      → "target.com e-posta güvenliği açısından iyi yapılandırılmış.
         62 alt alan adı bulundu — dikkat çekenler: staging.target.com,
         admin-portal.target.com, api-v2.target.com.
         Altyapı AWS (us-east-1) üzerinde."
```

### Saldırı Yüzeyi Haritalama

```
Siz: "203.0.113.50 için saldırı yüzeyini haritala"

Ajan: → shodan_host {ip: "203.0.113.50"}
      → geoip_lookup {ip: "203.0.113.50"}
      → bgp_ip {ip: "203.0.113.50"}
      → whois_ip {ip: "203.0.113.50"}
      → dns_reverse {ip: "203.0.113.50"}
      → "203.0.113.50 (Hetzner, DE, AS24940)
         Açık portlar: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
         Apache 2.4.51, OpenSSH 8.9, 8080'de nginx reverse proxy
         Ters DNS: web1.target.com
         Shodan tarafından işaretlenmiş 3 bilinen CVE"
```

### Alt Alan Adı Keşfi (Çoklu Kaynak)

```
Siz: "Mevcut tüm kaynakları kullanarak target.com'un tüm alt alan adlarını bul"

Ajan: → crtsh_search {domain: "target.com"}              → 62 alt alan adı
      → st_subdomains {domain: "target.com"}              → 84 alt alan adı
      → vt_subdomains {domain: "target.com"}              → 41 alt alan adı
      → hackertarget_hostsearch {domain: "target.com"}    → 31 host
      → dns_wildcard_check {domain: "target.com"}         → Wildcard yok
      → "4 kaynak üzerinden tekilleştirme sonrası 127 benzersiz alt alan adı.
         Dikkat çeken bulgular: staging.target.com, dev-api.target.com,
         jenkins.target.com (CI/CD ifşa riski),
         old-admin.target.com (potansiyel eski sistem)"
```

### E-posta Güvenliği Denetimi

```
Siz: "target.com'un e-posta güvenliği duruşunu analiz et"

Ajan: → dns_email_security {domain: "target.com"}
      → dns_spf_chain {domain: "target.com"}
      → m365_tenant {domain: "target.com"}
      → "E-posta Güvenliği: YÜKSEK RİSK
         SPF: ~all (soft fail — sahtecilik yapılabilir)
         DMARC: p=none (yalnızca izleme — zorlama yok)
         DKIM: selector1 için bulundu (2048-bit, iyi)
         SPF zinciri: 7 include, 2 servis (Google Workspace, SendGrid)
         M365: Microsoft kiracısı değil
         Öneriler:
         1. SPF'yi ~all'dan -all'a yükselt
         2. DMARC'ı p=none'dan p=quarantine'e, ardından p=reject'e geçir
         3. Toplu raporlama için DMARC'a rua= ekle"
```

### Tarihsel İstihbarat

```
Siz: "3 yıl önce target.com ne çalıştırıyordu?"

Ajan: → wayback_urls {domain: "target.com", limit: 500}
      → st_dns_history {domain: "target.com", type: "a"}
      → wayback_snapshots {url: "https://target.com/robots.txt"}
      → "DNS geçmişi: target.com 2023'te 198.51.100.1 (DigitalOcean)
         adresinden 203.0.113.50 (AWS) adresine taşındı.
         Wayback'te şunlar dahil 342 benzersiz URL bulundu:
         - /admin/ (2024'te kaldırıldı, erişilebilir durumdaydı)
         - /api/v1/docs (Swagger UI, hala önbellekte)
         - /wp-content/ (WordPress idi, taşındı)
         Eski robots.txt /internal/ ve /debug/ dizinlerini engelliyordu"
```

---

## Araç Referansı (37 araç)

<details open>
<summary><b>DNS (6) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `dns_lookup` | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV kayıtlarını çözümle |
| `dns_reverse` | Bir IP adresi için ters DNS (PTR) sorgusu |
| `dns_email_security` | Risk puanlaması ve önerilerle SPF + DMARC + DKIM analizi |
| `dns_spf_chain` | Servis tespitli özyinelemeli SPF include zincir çözümlemesi |
| `dns_srv_discover` | SRV + CNAME servis keşfi (Autodiscover, LDAP, SIP, Kerberos vb.) |
| `dns_wildcard_check` | Rastgele alt alan adı sorgusuyla wildcard DNS tespiti |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `whois_domain` | RDAP domain sorgusu &mdash; kayıt firması, tarihler, ad sunucuları, iletişim bilgileri |
| `whois_ip` | RDAP IP sorgusu &mdash; ağ adı, CIDR, ülke, tüzel kişiler |

</details>

<details>
<summary><b>Sertifika Şeffaflığı (1) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `crtsh_search` | crt.sh üzerinden CT loglarında arama &mdash; alt alan adı keşfi + sertifika detayları |

</details>

<details>
<summary><b>Shodan (4) &mdash; SHODAN_API_KEY gerektirir</b></summary>

| Araç | Açıklama |
|------|----------|
| `shodan_host` | IP detayları: açık portlar, servisler, banner'lar, zafiyetler, işletim sistemi, ASN |
| `shodan_search` | Shodan sorgu diliyle arama (ör. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Shodan aracılığıyla toplu hostname-IP çözümleme |
| `shodan_exploits` | Genel istismar veritabanında arama (PoC, Metasploit modülleri) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; VT_API_KEY gerektirir</b></summary>

| Araç | Açıklama |
|------|----------|
| `vt_domain` | Domain itibarı, tespit istatistikleri, kategoriler, DNS kayıtları |
| `vt_ip` | IP itibarı, tespit istatistikleri, ASN, ağ bilgisi |
| `vt_subdomains` | VirusTotal aracılığıyla alt alan adı keşfi |
| `vt_url` | URL taraması + zararlı yazılım/oltalama analizi |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; ST_API_KEY gerektirir</b></summary>

| Araç | Açıklama |
|------|----------|
| `st_subdomains` | Alt alan adı keşfi (FQDN döndürür) |
| `st_dns_history` | İlk/son görülme tarihleriyle geçmiş DNS kayıtları |
| `st_whois` | Kayıt sahibi/yönetici/teknik iletişim bilgileriyle zenginleştirilmiş WHOIS |

</details>

<details>
<summary><b>Censys (3) &mdash; CENSYS_API_ID + CENSYS_API_SECRET gerektirir</b></summary>

| Araç | Açıklama |
|------|----------|
| `censys_hosts` | Host araması &mdash; IP'ler, servisler, portlar, konum, ASN |
| `censys_host_details` | Tüm servisleriyle tek bir host'un tam detayları |
| `censys_certificates` | Domain, parmak izi veya sertifika otoritesine göre sertifika araması |

</details>

<details>
<summary><b>GeoIP (2) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `geoip_lookup` | IP coğrafi konum: ülke, şehir, ISS, ASN, proxy/barındırma/VPN tespiti |
| `geoip_batch` | Toplu IP coğrafi konum sorgusu (tek seferde 100 IP'ye kadar) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `bgp_asn` | ASN detayları + duyurulan tüm IPv4/IPv6 ön ekleri |
| `bgp_ip` | RIR tahsisli IP ön ek/ASN yönlendirme sorgusu |
| `bgp_prefix` | Ön ek detayları + duyuran ASN'ler |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `wayback_urls` | Arşivlenmiş URL keşfi &mdash; eski uç noktaları, gizli yolları, kaldırılmış içerikleri bulun |
| `wayback_snapshots` | Zaman damgaları ve doğrudan arşiv bağlantılarıyla anlık görüntü geçmişi |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `hackertarget_hostsearch` | Çözümlenmiş IP'lerle host/alt alan adı keşfi |
| `hackertarget_reverseip` | Ters IP sorgusu &mdash; bir IP üzerindeki tüm domain'leri bulun |
| `hackertarget_aslookup` | ASN bilgi sorgusu |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `m365_tenant` | M365 kiracı kimliği, bölge ve OpenID yapılandırmasını keşfedin |
| `m365_userrealm` | Kimlik doğrulama türünü (Yönetilen/Federasyon), federasyon markasını, kimlik doğrulama uç noktalarını tespit edin |

</details>

<details>
<summary><b>Meta (2) &mdash; API anahtarı gerekmez</b></summary>

| Araç | Açıklama |
|------|----------|
| `osint_list_sources` | Tüm OSINT kaynaklarını, API anahtarı durumunu ve araç sayılarını listeleyin |
| `osint_domain_recon` | Tüm ücretsiz kaynakları birleştiren hızlı keşif (DNS + WHOIS + crt.sh + HackerTarget + e-posta güvenliği) |

</details>

---

## Veri Kaynakları (12)

| Kaynak | Kimlik Doğrulama | Hız Sınırı | Sağladığı Veriler |
|--------|-------------------|------------|-------------------|
| [DNS](https://nodejs.org/api/dns.html) | Yok | Yok | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR kayıtları |
| [RDAP](https://rdap.org/) | Yok | 1 istek/sn | Domain ve IP WHOIS verileri (kayıt firması, tarihler, iletişim, CIDR) |
| [crt.sh](https://crt.sh/) | Yok | 0.5 istek/sn | Sertifika Şeffaflığı logları, alt alan adı keşfi |
| [ip-api.com](http://ip-api.com/) | Yok | 45 istek/dk | IP coğrafi konum, ISS, ASN, proxy/VPN/barındırma tespiti |
| [BGPView](https://bgpview.io/) | Yok | 0.5 istek/sn | ASN detayları, duyurulan ön ekler, IP yönlendirme bilgisi |
| [HackerTarget](https://hackertarget.com/) | Yok | 2 istek/sn | Host araması, ters IP, ASN sorgusu (ücretsiz günlük 50) |
| [Wayback Machine](https://web.archive.org/) | Yok | 1 istek/sn | Arşivlenmiş URL'ler, anlık görüntü geçmişi, tarihsel içerik |
| [Microsoft 365](https://login.microsoftonline.com/) | Yok | Yok | Kiracı keşfi, federasyon tespiti, kimlik doğrulama türü |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 istek/sn | İnternet genelinde port/servis/banner taraması |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 istek/dk | Domain/IP/URL itibarı, zararlı yazılım tespiti |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 istek/sn | DNS geçmişi, alt alan adı keşfi, zenginleştirilmiş WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 istek/sn | Host araması, sertifika şeffaflığı, servis keşfi |

---

## Mimari

```
src/
├── index.ts                    Giriş noktası, ortam yapılandırması, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 araç tanımı (Zod şemaları)
│   └── mcp-server.ts           MCP sunucusu + stdio aktarımı
├── dns/
│   └── index.ts                6 fonksiyon — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 fonksiyon — domain RDAP, IP RDAP
├── crtsh/
│   └── index.ts                Tekilleştirme + önbellekleme ile CT log araması
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domain, IP, subdomains, URL scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS history, WHOIS
├── censys/
│   └── index.ts                Host search, host details, certificates
├── geoip/
│   └── index.ts                Tekli + toplu IP coğrafi konum
├── bgp/
│   └── index.ts                ASN, IP prefix, prefix details
├── wayback/
│   └── index.ts                URL araması + anlık görüntü geçmişi
├── hackertarget/
│   └── index.ts                Host search, reverse IP, ASN
├── m365/
│   └── index.ts                Kiracı keşfi, user realm/federasyon
├── meta/
│   ├── sources.ts              Kaynak erişilebilirlik kontrolü
│   └── recon.ts                Birleşik ücretsiz kaynaklı domain keşfi
└── utils/
    ├── rate-limiter.ts          Kuyruk tabanlı hız sınırlayıcı
    ├── cache.ts                 Genel TTL önbelleği
    └── require-key.ts           API anahtarı doğrulama yardımcısı
```

**Tasarım kararları:**

- **12 sağlayıcı, 1 sunucu** &mdash; Her OSINT kaynağı bağımsız bir modüldür. Ajan, sorguya göre hangi araçları kullanacağını seçer.
- **21 ücretsiz araç** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget ve M365 herhangi bir API anahtarı olmadan çalışır. Premium kaynaklar ek katkı sağlar.
- **Paralel sorgular** &mdash; `osint_domain_recon` 8 kaynağı `Promise.allSettled` ile çağırır. Bir kaynak zaman aşımına uğrarsa diğerleri yine veri döndürür.
- **Sağlayıcı bazlı hız sınırlayıcılar** &mdash; Her veri kaynağının, o API'nin sınırlarına kalibre edilmiş kendi `RateLimiter` örneği vardır. Paylaşılan darboğaz yoktur.
- **TTL önbellekleme** &mdash; crt.sh (15dk), BGP (30dk), Shodan (5dk), VirusTotal (10dk) sonuçları, çoklu araç iş akışlarında gereksiz API çağrılarını önlemek için önbelleğe alınır.
- **Zarif bozulma** &mdash; Eksik API anahtarları sunucuyu çökertmez. Araçlar açıklayıcı hata mesajları döndürür: "Shodan araçlarını etkinleştirmek için SHODAN_API_KEY ayarlayın."
- **SPF zincir analizi** &mdash; Döngü tespitli özyinelemeli include çözümlemesi, servis tanımlama (Google Workspace, Microsoft 365, SendGrid vb.) ve RFC 7208 sorgu limiti kontrolü.
- **2 bağımlılık** &mdash; `@modelcontextprotocol/sdk` ve `zod`. Tüm HTTP yerel `fetch` ile. Tüm DNS `node:dns/promises` ile.

---

## Kısıtlamalar

- Ücretsiz katman hız sınırları geçerlidir: HackerTarget (günlük 50), ip-api.com (dakikada 45), VirusTotal topluluk (dakikada 4)
- crt.sh büyük domain'ler için yavaş olabilir (30sn zaman aşımı uygulanır)
- ip-api.com ücretsiz katman için HTTP gerektirir (HTTPS değil)
- Wayback Machine CDX API çok popüler domain'ler için zaman aşımına uğrayabilir
- RDAP üzerinden WHOIS tüm TLD'leri kapsamayabilir (bazı kayıt firmaları henüz RDAP desteklemiyor)
- macOS / Linux test edildi (Windows test edilmedi)

---

## MCP Güvenlik Paketi

| Proje | Alan | Araçlar |
|-------|------|---------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Tarayıcı tabanlı güvenlik testi | 39 araç, Firefox, enjeksiyon testi |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bulut güvenliği (AWS/Azure/GCP) | 38 araç, 60+ kontrol |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub güvenlik duruşu | 39 araç, 45 kontrol |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Zafiyet istihbaratı | 23 araç, 5 kaynak |
| **osint-mcp** | **OSINT ve keşif** | **37 araç, 12 kaynak** |

---

<p align="center">
<b>Yalnızca yetkili güvenlik testleri ve değerlendirmeleri içindir.</b><br>
Herhangi bir hedef üzerinde keşif yapmadan önce her zaman uygun yetkilendirmeye sahip olduğunuzdan emin olun.
</p>

<p align="center">
  <a href="LICENSE">MIT Lisansı</a> &bull; Bun + TypeScript ile geliştirildi
</p>
