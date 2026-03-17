<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <strong>한국어</strong> |
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
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-light.svg">
    <img alt="osint-mcp" src="https://raw.githubusercontent.com/badchars/osint-mcp/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">AI 에이전트를 위한 OSINT 및 정찰 인텔리전스.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; 단일 MCP 서버로 통합.<br>
  AI 에이전트가 <b>온디맨드 전체 스펙트럼 OSINT</b>를 확보하고, 12개 브라우저 탭과 수동 상관 분석은 필요 없습니다.
</p>

<br>

<p align="center">
  <a href="#문제점">문제점</a> &bull;
  <a href="#차별점">차별점</a> &bull;
  <a href="#빠른-시작">빠른 시작</a> &bull;
  <a href="#ai가-할-수-있는-것">AI가 할 수 있는 것</a> &bull;
  <a href="#도구-레퍼런스-37개-도구">도구 (37)</a> &bull;
  <a href="#데이터-소스-12개">데이터 소스</a> &bull;
  <a href="#아키텍처">아키텍처</a>
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

## 문제점

OSINT 수집은 모든 침투 테스트, 버그 바운티 및 위협 평가의 첫 번째 단계입니다. 필요한 데이터는 수십 개의 플랫폼에 분산되어 있으며, 각각 자체 API, 자체 인증, 자체 속도 제한, 자체 출력 형식을 가지고 있습니다. 오늘날 한 탭에서 Shodan을 열고, 다른 탭에서 VirusTotal을 열고, 터미널에서 `dig`를 실행하고, WHOIS에서 복사-붙여넣기를 하고, 인증서를 위해 crt.sh로 전환한 다음, 모든 것을 수동으로 상관 분석하는 데 30분을 소비합니다.

```
전통적인 OSINT 워크플로우:
  DNS 레코드 확인            →  dig / nslookup CLI
  WHOIS 등록 정보 확인       →  whois CLI 또는 웹 도구
  하위 도메인 열거            →  crt.sh + SecurityTrails + VirusTotal (3개의 다른 UI)
  열린 포트/서비스 스캔       →  Shodan 웹 인터페이스
  도메인 평판 확인            →  VirusTotal 웹 인터페이스
  IP 인프라 매핑             →  Censys + BGP 조회
  아카이브된 페이지 찾기      →  Wayback Machine 웹 UI
  이메일 보안 확인            →  수동 MX/SPF/DMARC 조회
  모든 것 상관 분석          →  스프레드시트에 복사-붙여넣기
  ─────────────────────────────────
  총: 대상당 45분 이상, 대부분 컨텍스트 전환
```

**osint-mcp**는 [Model Context Protocol](https://modelcontextprotocol.io)을 통해 AI 에이전트에게 12개 데이터 소스에 걸쳐 37개 도구를 제공합니다. 에이전트는 모든 소스를 병렬로 쿼리하고, 데이터를 상관 분석하고, 위험을 식별하고, 통합된 인텔리전스 그림을 단일 대화로 제공합니다.

```
osint-mcp 사용 시:
  사용자: "target.com에 대한 전체 정찰을 수행하세요"

  에이전트: → DNS: 4개 A 레코드, 3개 MX (Google Workspace), 2개 NS
         → WHOIS: 2019년 등록, 2025년 만료, GoDaddy
         → crt.sh: CT 로그에서 47개 고유 하위 도메인
         → HackerTarget: IP를 가진 23개 호스트
         → 이메일: SPF soft-fail (~all), DMARC p=none, DKIM 없음
         → Shodan: 3개 IP, 12개 열린 포트, Apache 2.4.49 (CVE-2021-41773)
         → VirusTotal: 깨끗한 평판, 0개 탐지
         → "target.com에는 47개 하위 도메인, 약한 이메일 보안
            (SPF soft-fail, DMARC 모니터링만), 그리고 알려진 경로 순회
            CVE가 있는 Apache 2.4.49를 실행하는 IP 1개가 있습니다.
            우선순위: Apache 패치, SPF를 -all로 업그레이드,
            DMARC를 p=reject로 설정."
```

---

## 차별점

기존 OSINT 도구는 한 번에 하나의 소스에서 원시 데이터를 제공합니다. osint-mcp는 AI 에이전트에게 **모든 소스를 동시에 분석할 수 있는 능력**을 제공합니다.

<table>
<thead>
<tr>
<th></th>
<th>전통적인 OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>인터페이스</b></td>
<td>12개의 다른 웹 UI, CLI 및 API</td>
<td>MCP &mdash; AI 에이전트가 대화형으로 도구 호출</td>
</tr>
<tr>
<td><b>데이터 소스</b></td>
<td>한 번에 하나의 플랫폼</td>
<td>병렬로 쿼리되는 12개 소스</td>
</tr>
<tr>
<td><b>하위 도메인 열거</b></td>
<td>crt.sh 또는 SecurityTrails 또는 VirusTotal</td>
<td>에이전트가 세 가지 모두 + HackerTarget을 병합하고 중복 제거</td>
</tr>
<tr>
<td><b>상관 분석</b></td>
<td>탭 간 수동 복사-붙여넣기</td>
<td>에이전트가 상호 참조: "Shodan의 이 IP는 만료된 인증서와 함께 Censys에도 나타남"</td>
</tr>
<tr>
<td><b>이메일 보안</b></td>
<td>별도의 SPF/DMARC/DKIM 조회</td>
<td>위험 점수 및 실행 가능한 권장 사항이 포함된 통합 분석</td>
</tr>
<tr>
<td><b>인프라</b></td>
<td>GeoIP + BGP + WHOIS 개별적으로</td>
<td>에이전트가 전체 인프라 매핑: ASN, 접두사, 지리적 위치, 소유권</td>
</tr>
<tr>
<td><b>API 키</b></td>
<td>거의 모든 것에 필요</td>
<td>21개 도구 무료, 선택적 API 키로 16개 추가</td>
</tr>
<tr>
<td><b>설정</b></td>
<td>각 도구 설치, 각 구성 관리</td>
<td><code>npx osint-mcp</code> &mdash; 하나의 명령, 구성 없음</td>
</tr>
</tbody>
</table>

---

## 빠른 시작

### 옵션 1: npx (설치 없음)

```bash
npx osint-mcp
```

21개의 공개 OSINT 도구가 즉시 작동합니다. API 키가 필요하지 않습니다.

### 옵션 2: 클론

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### 환경 변수 (선택 사항)

```bash
# 프리미엄 OSINT 소스 — 모두 선택 사항
export SHODAN_API_KEY=your-key           # Shodan 도구 4개 활성화
export VT_API_KEY=your-key               # VirusTotal 도구 4개 활성화
export ST_API_KEY=your-key               # SecurityTrails 도구 3개 활성화
export CENSYS_API_ID=your-id             # Censys 도구 3개 활성화
export CENSYS_API_SECRET=your-secret     # CENSYS_API_ID와 함께 필요
```

모든 프리미엄 API 키는 선택 사항입니다. 이것 없이도 DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget 및 Microsoft 365 테넌트 검색을 다루는 21개 도구를 사용할 수 있습니다.

### AI 에이전트에 연결

<details open>
<summary><b>Claude Code</b></summary>

```bash
# npx 사용 시
claude mcp add osint-mcp -- npx osint-mcp

# 로컬 클론 사용 시
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json`에 추가:

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
<summary><b>Cursor / Windsurf / 기타 MCP 클라이언트</b></summary>

동일한 JSON 구성 형식입니다. 명령을 `npx osint-mcp` 또는 로컬 설치 경로로 지정하세요.

</details>

### 쿼리 시작

```
사용자: "example.com에 대해 무엇을 찾을 수 있나요?"
```

그게 전부입니다. 에이전트가 DNS, WHOIS, 하위 도메인, 이메일 보안 등을 자동으로 처리합니다.

---

## AI가 할 수 있는 것

### 도메인 정찰

```
사용자: "target.com에 대한 전체 정찰을 수행하세요"

에이전트: → osint_domain_recon {domain: "target.com"}
       → DNS: A 레코드가 3개 IP를 가리킴 (AWS us-east-1)
       → WHOIS: 2018년 Namecheap을 통해 등록, 2026년 만료
       → crt.sh: 62개 하위 도메인 발견
       → HackerTarget: 해석된 IP를 가진 31개 호스트
       → 이메일: SPF hard-fail, DMARC p=reject, DKIM 발견 (selector1)
       → "target.com은 이메일 보안이 잘 구성되어 있습니다.
          62개 하위 도메인 발견 — 주목할 만한: staging.target.com,
          admin-portal.target.com, api-v2.target.com.
          인프라는 AWS (us-east-1)에 있습니다."
```

### 공격 표면 매핑

```
사용자: "203.0.113.50의 공격 표면을 매핑하세요"

에이전트: → shodan_host {ip: "203.0.113.50"}
       → geoip_lookup {ip: "203.0.113.50"}
       → bgp_ip {ip: "203.0.113.50"}
       → whois_ip {ip: "203.0.113.50"}
       → dns_reverse {ip: "203.0.113.50"}
       → "203.0.113.50 (Hetzner, DE, AS24940)
          열린 포트: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
          Apache 2.4.51, OpenSSH 8.9, 8080에 nginx 리버스 프록시
          역방향 DNS: web1.target.com
          Shodan이 플래그한 알려진 CVE 3개"
```

### 하위 도메인 열거 (다중 소스)

```
사용자: "사용 가능한 모든 소스를 사용하여 target.com의 모든 하위 도메인을 찾으세요"

에이전트: → crtsh_search {domain: "target.com"}              → 62개 하위 도메인
       → st_subdomains {domain: "target.com"}              → 84개 하위 도메인
       → vt_subdomains {domain: "target.com"}              → 41개 하위 도메인
       → hackertarget_hostsearch {domain: "target.com"}    → 31개 호스트
       → dns_wildcard_check {domain: "target.com"}         → 와일드카드 없음
       → "4개 소스에서 중복 제거 후 127개 고유 하위 도메인.
          주목할 만한 발견: staging.target.com, dev-api.target.com,
          jenkins.target.com (CI/CD 노출 위험),
          old-admin.target.com (잠재적 레거시 시스템)"
```

### 이메일 보안 감사

```
사용자: "target.com의 이메일 보안 태세를 분석하세요"

에이전트: → dns_email_security {domain: "target.com"}
       → dns_spf_chain {domain: "target.com"}
       → m365_tenant {domain: "target.com"}
       → "이메일 보안: 높은 위험
          SPF: ~all (soft fail — 스푸핑 가능)
          DMARC: p=none (모니터링만 — 시행 안 함)
          DKIM: selector1에 대해 발견됨 (2048비트, 양호)
          SPF 체인: 7개 포함, 2개 서비스 (Google Workspace, SendGrid)
          M365: Microsoft 테넌트 아님
          권장 사항:
          1. SPF를 ~all에서 -all로 업그레이드
          2. DMARC를 p=none에서 p=quarantine로 변경한 다음 p=reject로
          3. 집계 보고를 위해 DMARC에 rua= 추가"
```

### 과거 인텔리전스

```
사용자: "3년 전 target.com은 무엇을 실행했나요?"

에이전트: → wayback_urls {domain: "target.com", limit: 500}
       → st_dns_history {domain: "target.com", type: "a"}
       → wayback_snapshots {url: "https://target.com/robots.txt"}
       → "DNS 기록: target.com이 2023년에 198.51.100.1 (DigitalOcean)에서
          203.0.113.50 (AWS)로 이동했습니다.
          Wayback이 다음을 포함한 342개 고유 URL을 찾았습니다:
          - /admin/ (2024년에 제거됨, 접근 가능했음)
          - /api/v1/docs (Swagger UI, 여전히 캐시됨)
          - /wp-content/ (WordPress였음, 마이그레이션됨)
          이전 robots.txt가 /internal/ 및 /debug/를 허용하지 않음"
```

---

## 도구 레퍼런스 (37개 도구)

<details open>
<summary><b>DNS (6) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `dns_lookup` | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV 레코드 해석 |
| `dns_reverse` | IP 주소에 대한 역방향 DNS (PTR) 조회 |
| `dns_email_security` | 위험 점수 및 권장 사항이 포함된 SPF + DMARC + DKIM 분석 |
| `dns_spf_chain` | 서비스 감지와 함께 재귀적 SPF 포함 체인 해석 |
| `dns_srv_discover` | SRV + CNAME 서비스 검색 (Autodiscover, LDAP, SIP, Kerberos 등) |
| `dns_wildcard_check` | 무작위 하위 도메인 프로브를 통한 와일드카드 DNS 감지 |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `whois_domain` | RDAP 도메인 조회 &mdash; 등록 기관, 날짜, 네임서버, 연락처 |
| `whois_ip` | RDAP IP 조회 &mdash; 네트워크 이름, CIDR, 국가, 엔터티 |

</details>

<details>
<summary><b>인증서 투명성 (1) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `crtsh_search` | crt.sh를 통한 CT 로그 검색 &mdash; 하위 도메인 검색 + 인증서 세부 정보 |

</details>

<details>
<summary><b>Shodan (4) &mdash; SHODAN_API_KEY 필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `shodan_host` | IP 세부 정보: 열린 포트, 서비스, 배너, 취약점, OS, ASN |
| `shodan_search` | Shodan 쿼리 언어 검색 (예: `apache port:443 country:US`) |
| `shodan_dns_resolve` | Shodan을 통한 대량 호스트 이름-IP 해석 |
| `shodan_exploits` | 공개 익스플로잇 데이터베이스 검색 (PoC, Metasploit 모듈) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; VT_API_KEY 필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `vt_domain` | 도메인 평판, 탐지 통계, 범주, DNS 레코드 |
| `vt_ip` | IP 평판, 탐지 통계, ASN, 네트워크 |
| `vt_subdomains` | VirusTotal을 통한 하위 도메인 열거 |
| `vt_url` | URL 스캔 + 악성 코드/피싱 분석 |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; ST_API_KEY 필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `st_subdomains` | 하위 도메인 열거 (FQDN 반환) |
| `st_dns_history` | 처음/마지막 확인 날짜가 포함된 과거 DNS 레코드 |
| `st_whois` | 등록자/관리자/기술 연락처가 포함된 향상된 WHOIS |

</details>

<details>
<summary><b>Censys (3) &mdash; CENSYS_API_ID + CENSYS_API_SECRET 필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `censys_hosts` | 호스트 검색 &mdash; IP, 서비스, 포트, 위치, ASN |
| `censys_host_details` | 모든 서비스가 포함된 단일 호스트 전체 세부 정보 |
| `censys_certificates` | 도메인, 지문, 발급자별 인증서 검색 |

</details>

<details>
<summary><b>GeoIP (2) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `geoip_lookup` | IP 지리적 위치: 국가, 도시, ISP, ASN, 프록시/호스팅/VPN 감지 |
| `geoip_batch` | 대량 IP 지리적 위치 (한 번에 최대 100개 IP) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `bgp_asn` | ASN 세부 정보 + 모든 발표된 IPv4/IPv6 접두사 |
| `bgp_ip` | RIR 할당과 함께 IP 접두사/ASN 라우팅 조회 |
| `bgp_prefix` | 접두사 세부 정보 + 발표 ASN |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `wayback_urls` | 아카이브된 URL 검색 &mdash; 오래된 엔드포인트, 숨겨진 경로, 제거된 콘텐츠 찾기 |
| `wayback_snapshots` | 타임스탬프 및 직접 아카이브 링크가 포함된 스냅샷 기록 |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `hackertarget_hostsearch` | 해석된 IP를 가진 호스트/하위 도메인 검색 |
| `hackertarget_reverseip` | 역방향 IP 조회 &mdash; IP에서 모든 도메인 찾기 |
| `hackertarget_aslookup` | ASN 정보 조회 |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `m365_tenant` | M365 테넌트 ID, 지역 및 OpenID 구성 검색 |
| `m365_userrealm` | 인증 유형 (관리/페더레이션), 페더레이션 브랜드, 인증 엔드포인트 감지 |

</details>

<details>
<summary><b>메타 (2) &mdash; API 키 불필요</b></summary>

| 도구 | 설명 |
|------|-------------|
| `osint_list_sources` | 모든 OSINT 소스, API 키 상태 및 도구 수 나열 |
| `osint_domain_recon` | 모든 무료 소스를 결합한 빠른 정찰 (DNS + WHOIS + crt.sh + HackerTarget + 이메일 보안) |

</details>

---

## 데이터 소스 (12개)

| 소스 | 인증 | 속도 제한 | 제공하는 것 |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | 없음 | 없음 | A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR 레코드 |
| [RDAP](https://rdap.org/) | 없음 | 초당 1회 요청 | 도메인 및 IP WHOIS 데이터 (등록 기관, 날짜, 연락처, CIDR) |
| [crt.sh](https://crt.sh/) | 없음 | 초당 0.5회 요청 | 인증서 투명성 로그, 하위 도메인 검색 |
| [ip-api.com](http://ip-api.com/) | 없음 | 분당 45회 요청 | IP 지리적 위치, ISP, ASN, 프록시/VPN/호스팅 감지 |
| [BGPView](https://bgpview.io/) | 없음 | 초당 0.5회 요청 | ASN 세부 정보, 발표된 접두사, IP 라우팅 정보 |
| [HackerTarget](https://hackertarget.com/) | 없음 | 초당 2회 요청 | 호스트 검색, 역방향 IP, ASN 조회 (일일 무료 50회) |
| [Wayback Machine](https://web.archive.org/) | 없음 | 초당 1회 요청 | 아카이브된 URL, 스냅샷 기록, 과거 콘텐츠 |
| [Microsoft 365](https://login.microsoftonline.com/) | 없음 | 없음 | 테넌트 검색, 페더레이션 감지, 인증 유형 |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 초당 1회 요청 | 인터넷 전체 포트/서비스/배너 스캐닝 |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 분당 4회 요청 | 도메인/IP/URL 평판, 악성 코드 감지 |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 초당 1회 요청 | DNS 기록, 하위 도메인 열거, 향상된 WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 초당 1회 요청 | 호스트 검색, 인증서 투명성, 서비스 검색 |

---

## 아키텍처

```
src/
├── index.ts                    진입점, 환경 구성, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37개 도구 정의 (Zod 스키마)
│   └── mcp-server.ts           MCP 서버 + stdio 전송
├── dns/
│   └── index.ts                6개 함수 — 조회, 역방향, 이메일, SPF 체인, SRV, 와일드카드
├── whois/
│   └── index.ts                2개 함수 — 도메인 RDAP, IP RDAP
├── crtsh/
│   └── index.ts                중복 제거 + 캐싱이 포함된 CT 로그 검색
├── shodan/
│   └── index.ts                호스트, 검색, DNS 해석, 익스플로잇
├── virustotal/
│   └── index.ts                도메인, IP, 하위 도메인, URL 스캔
├── securitytrails/
│   └── index.ts                하위 도메인, DNS 기록, WHOIS
├── censys/
│   └── index.ts                호스트 검색, 호스트 세부 정보, 인증서
├── geoip/
│   └── index.ts                단일 + 대량 IP 지리적 위치
├── bgp/
│   └── index.ts                ASN, IP 접두사, 접두사 세부 정보
├── wayback/
│   └── index.ts                URL 검색 + 스냅샷 기록
├── hackertarget/
│   └── index.ts                호스트 검색, 역방향 IP, ASN
├── m365/
│   └── index.ts                테넌트 검색, 사용자 영역/페더레이션
├── meta/
│   ├── sources.ts              소스 가용성 확인
│   └── recon.ts                결합된 무료 소스 도메인 정찰
└── utils/
    ├── rate-limiter.ts          큐 기반 속도 제한기
    ├── cache.ts                 일반 TTL 캐시
    └── require-key.ts           API 키 유효성 검사 도우미
```

**설계 결정:**

- **12개 제공자, 1개 서버** &mdash; 모든 OSINT 소스는 독립 모듈입니다. 에이전트는 쿼리를 기반으로 사용할 도구를 선택합니다.
- **21개 무료 도구** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget 및 M365는 API 키 없이 작동합니다. 프리미엄 소스는 추가 옵션입니다.
- **병렬 쿼리** &mdash; `osint_domain_recon`은 `Promise.allSettled`를 통해 8개 소스를 호출합니다. 하나의 소스가 시간 초과되더라도 나머지는 여전히 데이터를 반환합니다.
- **제공자별 속도 제한기** &mdash; 각 데이터 소스에는 해당 API의 제한에 맞게 조정된 자체 `RateLimiter` 인스턴스가 있습니다. 공유 병목 현상이 없습니다.
- **TTL 캐싱** &mdash; crt.sh (15분), BGP (30분), Shodan (5분), VirusTotal (10분) 결과는 다중 도구 워크플로우 중 중복 API 호출을 피하기 위해 캐시됩니다.
- **우아한 저하** &mdash; 누락된 API 키는 서버를 중단시키지 않습니다. 도구는 설명 오류 메시지를 반환합니다: "Shodan 도구를 활성화하려면 SHODAN_API_KEY를 설정하세요."
- **SPF 체인 분석** &mdash; 루프 감지, 서비스 식별 (Google Workspace, Microsoft 365, SendGrid 등) 및 RFC 7208 조회 제한 확인이 포함된 재귀적 포함 해석.
- **2개 종속성** &mdash; `@modelcontextprotocol/sdk` 및 `zod`. 모든 HTTP는 네이티브 `fetch`를 통해. 모든 DNS는 `node:dns/promises`를 통해.

---

## 제한 사항

- 무료 계층 속도 제한 적용: HackerTarget (일일 50회), ip-api.com (분당 45회), VirusTotal 커뮤니티 (분당 4회)
- crt.sh는 대형 도메인의 경우 느릴 수 있습니다 (30초 시간 초과 적용)
- ip-api.com은 무료 계층의 경우 HTTP (HTTPS 아님) 필요
- Wayback Machine CDX API는 매우 인기 있는 도메인의 경우 시간 초과될 수 있습니다
- RDAP를 통한 WHOIS는 모든 TLD를 다루지 못할 수 있습니다 (일부 등록 기관은 아직 RDAP를 지원하지 않음)
- macOS / Linux 테스트됨 (Windows 미테스트)

---

## MCP 보안 스위트의 일부

| 프로젝트 | 도메인 | 도구 |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 브라우저 기반 보안 테스트 | 39개 도구, Firefox, 주입 테스트 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 클라우드 보안 (AWS/Azure/GCP) | 38개 도구, 60개 이상 검사 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 보안 태세 | 39개 도구, 45개 검사 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 취약점 인텔리전스 | 23개 도구, 5개 소스 |
| **osint-mcp** | **OSINT 및 정찰** | **37개 도구, 12개 소스** |

---

<p align="center">
<b>권한이 부여된 보안 테스트 및 평가 전용.</b><br>
항상 대상에 대한 정찰을 수행하기 전에 적절한 권한이 있는지 확인하세요.
</p>

<p align="center">
  <a href="LICENSE">MIT 라이선스</a> &bull; Bun + TypeScript로 구축
</p>
