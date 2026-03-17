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
  <strong>Ελληνικά</strong> |
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

<h3 align="center">Πληροφοριακή νοημοσύνη OSINT & αναγνώρισης για παράγοντες AI.</h3>

<p align="center">
  Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, BGP, Wayback Machine &mdash; ενοποιημένα σε έναν ενιαίο διακομιστή MCP.<br>
  Ο παράγοντας AI σας αποκτά <b>πλήρους φάσματος OSINT κατά παραγγελία</b>, όχι 12 καρτέλες περιηγητή και χειροκίνητη συσχέτιση.
</p>

<br>

<p align="center">
  <a href="#το-πρόβλημα">Το Πρόβλημα</a> &bull;
  <a href="#πώς-είναι-διαφορετικό">Πώς Είναι Διαφορετικό</a> &bull;
  <a href="#γρήγορη-έναρξη">Γρήγορη Έναρξη</a> &bull;
  <a href="#τι-μπορεί-να-κάνει-η-ai">Τι Μπορεί Να Κάνει Η AI</a> &bull;
  <a href="#αναφορά-εργαλείων-37-εργαλεία">Εργαλεία (37)</a> &bull;
  <a href="#πηγές-δεδομένων-12">Πηγές Δεδομένων</a> &bull;
  <a href="#αρχιτεκτονική">Αρχιτεκτονική</a>
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

## Το Πρόβλημα

Η συλλογή OSINT είναι το πρώτο βήμα κάθε δοκιμής διείσδυσης, bug bounty και αξιολόγησης απειλών. Τα δεδομένα που χρειάζεστε είναι διασκορπισμένα σε δώδεκα πλατφόρμες &mdash; η καθεμία με το δικό της API, την δική της εξουσιοδότηση, τα δικά της όρια ρυθμού, τη δική της μορφή εξόδου. Σήμερα ανοίγετε το Shodan σε μία καρτέλα, το VirusTotal σε άλλη, εκτελείτε `dig` σε ένα τερματικό, αντιγράφετε-επικολλάτε από το WHOIS, μεταβαίνετε στο crt.sh για πιστοποιητικά και στη συνέχεια περνάτε 30 λεπτά συσχετίζοντας χειροκίνητα τα πάντα.

```
Παραδοσιακή ροή εργασίας OSINT:
  επίλυση εγγραφών DNS           →  dig / nslookup CLI
  έλεγχος εγγραφής WHOIS         →  whois CLI ή εργαλείο web
  απαρίθμηση υποτομέων           →  crt.sh + SecurityTrails + VirusTotal (3 διαφορετικά UI)
  σάρωση για ανοιχτές θύρες/υπηρεσίες  →  διεπαφή web Shodan
  έλεγχος φήμης τομέα            →  διεπαφή web VirusTotal
  χαρτογράφηση υποδομής IP       →  Censys + αναζητήσεις BGP
  εύρεση αρχειοθετημένων σελίδων →  διεπαφή web Wayback Machine
  έλεγχος ασφάλειας email        →  χειροκίνητες αναζητήσεις MX/SPF/DMARC
  συσχέτιση όλων                 →  αντιγραφή-επικόλληση σε υπολογιστικό φύλλο
  ─────────────────────────────────
  Σύνολο: 45+ λεπτά ανά στόχο, το μεγαλύτερο μέρος εναλλαγή πλαισίων
```

Το **osint-mcp** δίνει στον παράγοντα AI σας 37 εργαλεία σε 12 πηγές δεδομένων μέσω του [Model Context Protocol](https://modelcontextprotocol.io). Ο παράγοντας υποβάλλει ερωτήματα σε όλες τις πηγές παράλληλα, συσχετίζει δεδομένα, εντοπίζει κινδύνους και παρουσιάζει μια ενοποιημένη εικόνα πληροφοριών &mdash; σε μια μόνο συζήτηση.

```
Με το osint-mcp:
  Εσείς: "Κάνε πλήρη αναγνώριση στο target.com"

  Παράγοντας: → DNS: 4 εγγραφές A, 3 MX (Google Workspace), 2 NS
              → WHOIS: Καταχωρημένο 2019, λήγει 2025, GoDaddy
              → crt.sh: 47 μοναδικοί υποτομείς από αρχεία CT
              → HackerTarget: 23 hosts με IPs
              → Email: SPF soft-fail (~all), DMARC p=none, χωρίς DKIM
              → Shodan: 3 IPs, 12 ανοιχτές θύρες, Apache 2.4.49 (CVE-2021-41773)
              → VirusTotal: Καθαρή φήμη, 0 ανιχνεύσεις
              → "Το target.com έχει 47 υποτομείς, αδύναμη ασφάλεια email
                 (SPF soft-fail, DMARC μόνο παρακολούθηση), και ένα IP
                 που τρέχει Apache 2.4.49 με γνωστό CVE path traversal.
                 Προτεραιότητα: ενημέρωση Apache, αναβάθμιση SPF σε -all, ορισμός DMARC σε p=reject."
```

---

## Πώς Είναι Διαφορετικό

Τα υπάρχοντα εργαλεία OSINT σας δίνουν ακατέργαστα δεδομένα από μία πηγή τη φορά. Το osint-mcp δίνει στον παράγοντα AI σας τη δυνατότητα να **συλλογίζεται σε όλες τις πηγές ταυτόχρονα**.

<table>
<thead>
<tr>
<th></th>
<th>Παραδοσιακό OSINT</th>
<th>osint-mcp</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Διεπαφή</b></td>
<td>12 διαφορετικά web UIs, CLIs και APIs</td>
<td>MCP &mdash; Ο παράγοντας AI καλεί εργαλεία συνομιλιακά</td>
</tr>
<tr>
<td><b>Πηγές δεδομένων</b></td>
<td>Μία πλατφόρμα τη φορά</td>
<td>12 πηγές με ερωτήματα παράλληλα</td>
</tr>
<tr>
<td><b>Απαρίθμηση υποτομέων</b></td>
<td>crt.sh Ή SecurityTrails Ή VirusTotal</td>
<td>Ο παράγοντας συγχωνεύει και τα τρία + HackerTarget, αφαιρεί διπλότυπα</td>
</tr>
<tr>
<td><b>Συσχέτιση</b></td>
<td>Χειροκίνητη αντιγραφή-επικόλληση μεταξύ καρτελών</td>
<td>Ο παράγοντας κάνει διασταυρούμενες αναφορές: "Αυτό το IP από το Shodan εμφανίζεται επίσης στο Censys με πιστοποιητικό που έχει λήξει"</td>
</tr>
<tr>
<td><b>Ασφάλεια email</b></td>
<td>Ξεχωριστές αναζητήσεις SPF/DMARC/DKIM</td>
<td>Συνδυασμένη ανάλυση με βαθμολογία κινδύνου και εφαρμόσιμες συστάσεις</td>
</tr>
<tr>
<td><b>Υποδομή</b></td>
<td>GeoIP + BGP + WHOIS ξεχωριστά</td>
<td>Ο παράγοντας χαρτογραφεί πλήρη υποδομή: ASN, prefixes, γεωγραφική θέση, ιδιοκτησία</td>
</tr>
<tr>
<td><b>Κλειδιά API</b></td>
<td>Απαιτούνται για σχεδόν τα πάντα</td>
<td>21 εργαλεία λειτουργούν δωρεάν, 16 ακόμα με προαιρετικά κλειδιά API</td>
</tr>
<tr>
<td><b>Εγκατάσταση</b></td>
<td>Εγκατάσταση κάθε εργαλείου, διαχείριση κάθε διαμόρφωσης</td>
<td><code>npx osint-mcp</code> &mdash; μία εντολή, μηδενική διαμόρφωση</td>
</tr>
</tbody>
</table>

---

## Γρήγορη Έναρξη

### Επιλογή 1: npx (χωρίς εγκατάσταση)

```bash
npx osint-mcp
```

21 δημόσια εργαλεία OSINT λειτουργούν αμέσως. Δεν απαιτούνται κλειδιά API.

### Επιλογή 2: Κλωνοποίηση

```bash
git clone https://github.com/badchars/osint-mcp.git
cd osint-mcp
bun install
```

### Μεταβλητές περιβάλλοντος (προαιρετικά)

```bash
# Premium πηγές OSINT — όλες προαιρετικές
export SHODAN_API_KEY=your-key           # Ενεργοποιεί 4 εργαλεία Shodan
export VT_API_KEY=your-key               # Ενεργοποιεί 4 εργαλεία VirusTotal
export ST_API_KEY=your-key               # Ενεργοποιεί 3 εργαλεία SecurityTrails
export CENSYS_API_ID=your-id             # Ενεργοποιεί 3 εργαλεία Censys
export CENSYS_API_SECRET=your-secret     # Απαιτείται με το CENSYS_API_ID
```

Όλα τα premium κλειδιά API είναι προαιρετικά. Χωρίς αυτά, εξακολουθείτε να έχετε 21 εργαλεία που καλύπτουν DNS, WHOIS, crt.sh, GeoIP, BGP, Wayback Machine, HackerTarget και ανακάλυψη tenant Microsoft 365.

### Σύνδεση με τον παράγοντα AI σας

<details open>
<summary><b>Claude Code</b></summary>

```bash
# Με npx
claude mcp add osint-mcp -- npx osint-mcp

# Με τοπικό κλώνο
claude mcp add osint-mcp -- bun run /path/to/osint-mcp/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Προσθέστε στο `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / άλλοι πελάτες MCP</b></summary>

Ίδια μορφή διαμόρφωσης JSON. Κατευθύνετε την εντολή στο `npx osint-mcp` ή στη διαδρομή της τοπικής σας εγκατάστασης.

</details>

### Ξεκινήστε να υποβάλλετε ερωτήματα

```
Εσείς: "Τι μπορείς να βρεις για το example.com;"
```

Αυτό είναι όλο. Ο παράγοντας χειρίζεται DNS, WHOIS, υποτομείς, ασφάλεια email και άλλα αυτόματα.

---

## Τι Μπορεί Να Κάνει Η AI

### Αναγνώριση Τομέα

```
Εσείς: "Κάνε πλήρη αναγνώριση στο target.com"

Παράγοντας: → osint_domain_recon {domain: "target.com"}
            → DNS: Οι εγγραφές A δείχνουν σε 3 IPs (AWS us-east-1)
            → WHOIS: Καταχωρημένο 2018 μέσω Namecheap, λήγει 2026
            → crt.sh: Ανακαλύφθηκαν 62 υποτομείς
            → HackerTarget: 31 hosts με επιλυμένα IPs
            → Email: SPF hard-fail, DMARC p=reject, DKIM βρέθηκε (selector1)
            → "Το target.com είναι καλά διαμορφωμένο για ασφάλεια email.
               Βρέθηκαν 62 υποτομείς — αξιοσημείωτοι: staging.target.com,
               admin-portal.target.com, api-v2.target.com.
               Η υποδομή βρίσκεται στο AWS (us-east-1)."
```

### Χαρτογράφηση Επιφάνειας Επίθεσης

```
Εσείς: "Χαρτογράφησε την επιφάνεια επίθεσης για το 203.0.113.50"

Παράγοντας: → shodan_host {ip: "203.0.113.50"}
            → geoip_lookup {ip: "203.0.113.50"}
            → bgp_ip {ip: "203.0.113.50"}
            → whois_ip {ip: "203.0.113.50"}
            → dns_reverse {ip: "203.0.113.50"}
            → "203.0.113.50 (Hetzner, DE, AS24940)
               Ανοιχτές θύρες: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy
               Apache 2.4.51, OpenSSH 8.9, nginx reverse proxy στο 8080
               Αντίστροφο DNS: web1.target.com
               3 γνωστά CVEs επισημάνθηκαν από το Shodan"
```

### Απαρίθμηση Υποτομέων (Πολλαπλές Πηγές)

```
Εσείς: "Βρες όλους τους υποτομείς του target.com χρησιμοποιώντας κάθε διαθέσιμη πηγή"

Παράγοντας: → crtsh_search {domain: "target.com"}              → 62 υποτομείς
            → st_subdomains {domain: "target.com"}              → 84 υποτομείς
            → vt_subdomains {domain: "target.com"}              → 41 υποτομείς
            → hackertarget_hostsearch {domain: "target.com"}    → 31 hosts
            → dns_wildcard_check {domain: "target.com"}         → Χωρίς wildcard
            → "127 μοναδικοί υποτομείς μετά από αφαίρεση διπλότυπων σε 4 πηγές.
               Αξιοσημείωτα ευρήματα: staging.target.com, dev-api.target.com,
               jenkins.target.com (κίνδυνος έκθεσης CI/CD),
               old-admin.target.com (πιθανό παλαιό σύστημα)"
```

### Έλεγχος Ασφάλειας Email

```
Εσείς: "Ανάλυσε τη στάση ασφάλειας email του target.com"

Παράγοντας: → dns_email_security {domain: "target.com"}
            → dns_spf_chain {domain: "target.com"}
            → m365_tenant {domain: "target.com"}
            → "Ασφάλεια Email: ΥΨΗΛΟΣ ΚΙΝΔΥΝΟΣ
               SPF: ~all (soft fail — ευάλωτο σε spoofing)
               DMARC: p=none (μόνο παρακολούθηση — δεν επιβάλλεται)
               DKIM: Βρέθηκε για selector1 (2048-bit, καλό)
               Αλυσίδα SPF: 7 includes, 2 υπηρεσίες (Google Workspace, SendGrid)
               M365: Δεν είναι tenant Microsoft
               Συστάσεις:
               1. Αναβάθμιση SPF από ~all σε -all
               2. Αλλαγή DMARC από p=none σε p=quarantine, μετά p=reject
               3. Προσθήκη rua= στο DMARC για αναφορά συγκεντρωτικών στοιχείων"
```

### Ιστορική Πληροφορία

```
Εσείς: "Τι έτρεχε το target.com πριν 3 χρόνια;"

Παράγοντας: → wayback_urls {domain: "target.com", limit: 500}
            → st_dns_history {domain: "target.com", type: "a"}
            → wayback_snapshots {url: "https://target.com/robots.txt"}
            → "Ιστορικό DNS: το target.com μεταφέρθηκε από 198.51.100.1 (DigitalOcean)
               στο 203.0.113.50 (AWS) το 2023.
               Το Wayback βρήκε 342 μοναδικά URLs συμπεριλαμβανομένων:
               - /admin/ (αφαιρέθηκε το 2024, ήταν προσβάσιμο)
               - /api/v1/docs (Swagger UI, ακόμα σε cache)
               - /wp-content/ (ήταν WordPress, μεταφέρθηκε)
               Το παλαιό robots.txt απαγόρευε /internal/ και /debug/"
```

---

## Αναφορά Εργαλείων (37 εργαλεία)

<details open>
<summary><b>DNS (6) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `dns_lookup` | Επίλυση εγγραφών A, AAAA, MX, TXT, NS, SOA, CNAME, SRV |
| `dns_reverse` | Αντίστροφη αναζήτηση DNS (PTR) για διεύθυνση IP |
| `dns_email_security` | Ανάλυση SPF + DMARC + DKIM με βαθμολογία κινδύνου και συστάσεις |
| `dns_spf_chain` | Αναδρομική επίλυση αλυσίδας SPF include με ανίχνευση υπηρεσίας |
| `dns_srv_discover` | Ανακάλυψη υπηρεσιών SRV + CNAME (Autodiscover, LDAP, SIP, Kerberos, κλπ.) |
| `dns_wildcard_check` | Ανίχνευση wildcard DNS μέσω δοκιμής τυχαίου υποτομέα |

</details>

<details>
<summary><b>WHOIS / RDAP (2) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `whois_domain` | Αναζήτηση RDAP τομέα &mdash; καταχωρητής, ημερομηνίες, nameservers, επαφές |
| `whois_ip` | Αναζήτηση RDAP IP &mdash; όνομα δικτύου, CIDR, χώρα, οντότητες |

</details>

<details>
<summary><b>Διαφάνεια Πιστοποιητικών (1) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `crtsh_search` | Αναζήτηση αρχείων CT μέσω crt.sh &mdash; ανακάλυψη υποτομέων + λεπτομέρειες πιστοποιητικών |

</details>

<details>
<summary><b>Shodan (4) &mdash; Απαιτεί SHODAN_API_KEY</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `shodan_host` | Λεπτομέρειες IP: ανοιχτές θύρες, υπηρεσίες, banners, ευπάθειες, OS, ASN |
| `shodan_search` | Αναζήτηση γλώσσας ερωτημάτων Shodan (π.χ. `apache port:443 country:US`) |
| `shodan_dns_resolve` | Μαζική επίλυση hostname-σε-IP μέσω Shodan |
| `shodan_exploits` | Αναζήτηση δημόσιας βάσης δεδομένων exploits (PoC, modules Metasploit) |

</details>

<details>
<summary><b>VirusTotal (4) &mdash; Απαιτεί VT_API_KEY</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `vt_domain` | Φήμη τομέα, στατιστικά ανίχνευσης, κατηγορίες, εγγραφές DNS |
| `vt_ip` | Φήμη IP, στατιστικά ανίχνευσης, ASN, δίκτυο |
| `vt_subdomains` | Απαρίθμηση υποτομέων μέσω VirusTotal |
| `vt_url` | Σάρωση URL + ανάλυση malware/phishing |

</details>

<details>
<summary><b>SecurityTrails (3) &mdash; Απαιτεί ST_API_KEY</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `st_subdomains` | Απαρίθμηση υποτομέων (επιστρέφει FQDNs) |
| `st_dns_history` | Ιστορικές εγγραφές DNS με ημερομηνίες πρώτης/τελευταίας εμφάνισης |
| `st_whois` | Βελτιωμένο WHOIS με επαφές καταχωρητή/διαχειριστή/τεχνικές |

</details>

<details>
<summary><b>Censys (3) &mdash; Απαιτεί CENSYS_API_ID + CENSYS_API_SECRET</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `censys_hosts` | Αναζήτηση host &mdash; IPs, υπηρεσίες, θύρες, τοποθεσία, ASN |
| `censys_host_details` | Πλήρεις λεπτομέρειες μεμονωμένου host με όλες τις υπηρεσίες |
| `censys_certificates` | Αναζήτηση πιστοποιητικών ανά τομέα, fingerprint, εκδότη |

</details>

<details>
<summary><b>GeoIP (2) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `geoip_lookup` | Γεωγραφικός εντοπισμός IP: χώρα, πόλη, ISP, ASN, ανίχνευση proxy/hosting/VPN |
| `geoip_batch` | Μαζικός γεωγραφικός εντοπισμός IP (έως 100 IPs ταυτόχρονα) |

</details>

<details>
<summary><b>BGP / ASN (3) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `bgp_asn` | Λεπτομέρειες ASN + όλα τα ανακοινωμένα prefixes IPv4/IPv6 |
| `bgp_ip` | Αναζήτηση δρομολόγησης IP prefix/ASN με κατανομή RIR |
| `bgp_prefix` | Λεπτομέρειες prefix + ASNs που ανακοινώνουν |

</details>

<details>
<summary><b>Wayback Machine (2) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `wayback_urls` | Ανακάλυψη αρχειοθετημένων URL &mdash; εύρεση παλαιών endpoints, κρυφών διαδρομών, αφαιρεθέντος περιεχομένου |
| `wayback_snapshots` | Ιστορικό στιγμιότυπων με χρονοσφραγίδες και άμεσους συνδέσμους αρχείου |

</details>

<details>
<summary><b>HackerTarget (3) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `hackertarget_hostsearch` | Ανακάλυψη host/υποτομέων με επιλυμένα IPs |
| `hackertarget_reverseip` | Αντίστροφη αναζήτηση IP &mdash; εύρεση όλων των τομέων σε ένα IP |
| `hackertarget_aslookup` | Αναζήτηση πληροφοριών ASN |

</details>

<details>
<summary><b>Microsoft 365 (2) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `m365_tenant` | Ανακάλυψη ID tenant M365, περιοχής και διαμόρφωσης OpenID |
| `m365_userrealm` | Ανίχνευση τύπου εξουσιοδότησης (Managed/Federated), federation brand, endpoints εξουσιοδότησης |

</details>

<details>
<summary><b>Meta (2) &mdash; Χωρίς κλειδί API</b></summary>

| Εργαλείο | Περιγραφή |
|------|-------------|
| `osint_list_sources` | Λίστα όλων των πηγών OSINT, κατάστασης κλειδιού API και πλήθους εργαλείων |
| `osint_domain_recon` | Γρήγορη αναγνώριση συνδυάζοντας όλες τις δωρεάν πηγές (DNS + WHOIS + crt.sh + HackerTarget + ασφάλεια email) |

</details>

---

## Πηγές Δεδομένων (12)

| Πηγή | Εξουσιοδότηση | Όριο Ρυθμού | Τι παρέχει |
|--------|------|-----------|-----------------|
| [DNS](https://nodejs.org/api/dns.html) | Καμία | Κανένα | Εγγραφές A, AAAA, MX, TXT, NS, SOA, CNAME, SRV, PTR |
| [RDAP](https://rdap.org/) | Καμία | 1 αίτημα/s | Δεδομένα WHOIS τομέα & IP (καταχωρητής, ημερομηνίες, επαφές, CIDR) |
| [crt.sh](https://crt.sh/) | Καμία | 0.5 αίτημα/s | Αρχεία Διαφάνειας Πιστοποιητικών, ανακάλυψη υποτομέων |
| [ip-api.com](http://ip-api.com/) | Καμία | 45 αίτημα/λεπτό | Γεωγραφικός εντοπισμός IP, ISP, ASN, ανίχνευση proxy/VPN/hosting |
| [BGPView](https://bgpview.io/) | Καμία | 0.5 αίτημα/s | Λεπτομέρειες ASN, ανακοινωμένα prefixes, πληροφορίες δρομολόγησης IP |
| [HackerTarget](https://hackertarget.com/) | Καμία | 2 αίτημα/s | Αναζήτηση host, αντίστροφο IP, αναζήτηση ASN (50/ημέρα δωρεάν) |
| [Wayback Machine](https://web.archive.org/) | Καμία | 1 αίτημα/s | Αρχειοθετημένα URLs, ιστορικό στιγμιότυπων, ιστορικό περιεχόμενο |
| [Microsoft 365](https://login.microsoftonline.com/) | Καμία | Κανένα | Ανακάλυψη tenant, ανίχνευση federation, τύπος εξουσιοδότησης |
| [Shodan](https://www.shodan.io/) | `SHODAN_API_KEY` | 1 αίτημα/s | Σάρωση θύρας/υπηρεσίας/banner σε όλο το διαδίκτυο |
| [VirusTotal](https://www.virustotal.com/) | `VT_API_KEY` | 4 αίτημα/λεπτό | Φήμη τομέα/IP/URL, ανίχνευση malware |
| [SecurityTrails](https://securitytrails.com/) | `ST_API_KEY` | 1 αίτημα/s | Ιστορικό DNS, απαρίθμηση υποτομέων, βελτιωμένο WHOIS |
| [Censys](https://censys.io/) | `CENSYS_API_ID` | 1 αίτημα/s | Αναζήτηση host, διαφάνεια πιστοποιητικών, ανακάλυψη υπηρεσιών |

---

## Αρχιτεκτονική

```
src/
├── index.ts                    Σημείο εισόδου, διαμόρφωση env, MCP stdio
├── types/
│   └── index.ts                ToolDef, ToolContext, ToolResult
├── protocol/
│   ├── tools.ts                37 ορισμοί εργαλείων (Zod schemas)
│   └── mcp-server.ts           Διακομιστής MCP + stdio transport
├── dns/
│   └── index.ts                6 συναρτήσεις — lookup, reverse, email, SPF chain, SRV, wildcard
├── whois/
│   └── index.ts                2 συναρτήσεις — domain RDAP, IP RDAP
├── crtsh/
│   └── index.ts                Αναζήτηση αρχείου CT με αφαίρεση διπλότυπων + caching
├── shodan/
│   └── index.ts                Host, search, DNS resolve, exploits
├── virustotal/
│   └── index.ts                Domain, IP, subdomains, URL scan
├── securitytrails/
│   └── index.ts                Subdomains, DNS history, WHOIS
├── censys/
│   └── index.ts                Host search, host details, certificates
├── geoip/
│   └── index.ts                Μονός + μαζικός γεωγραφικός εντοπισμός IP
├── bgp/
│   └── index.ts                ASN, IP prefix, λεπτομέρειες prefix
├── wayback/
│   └── index.ts                Αναζήτηση URL + ιστορικό στιγμιότυπων
├── hackertarget/
│   └── index.ts                Host search, reverse IP, ASN
├── m365/
│   └── index.ts                Ανακάλυψη tenant, user realm/federation
├── meta/
│   ├── sources.ts              Έλεγχος διαθεσιμότητας πηγής
│   └── recon.ts                Συνδυασμένη αναγνώριση τομέα με δωρεάν πηγές
└── utils/
    ├── rate-limiter.ts          Rate limiter βασισμένο σε ουρά
    ├── cache.ts                 Generic TTL cache
    └── require-key.ts           Βοηθητικό επικύρωσης κλειδιού API
```

**Αποφάσεις σχεδιασμού:**

- **12 πάροχοι, 1 διακομιστής** &mdash; Κάθε πηγή OSINT είναι ανεξάρτητη μονάδα. Ο παράγοντας επιλέγει ποια εργαλεία θα χρησιμοποιήσει με βάση το ερώτημα.
- **21 δωρεάν εργαλεία** &mdash; DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget και M365 λειτουργούν χωρίς κλειδιά API. Οι premium πηγές είναι πρόσθετες.
- **Παράλληλα ερωτήματα** &mdash; Το `osint_domain_recon` καλεί 8 πηγές μέσω `Promise.allSettled`. Αν μια πηγή τελειώσει σε timeout, οι υπόλοιπες εξακολουθούν να επιστρέφουν δεδομένα.
- **Rate limiters ανά πάροχο** &mdash; Κάθε πηγή δεδομένων έχει τη δική της instance `RateLimiter` βαθμονομημένη στα όρια του API. Χωρίς κοινό σημείο συμφόρησης.
- **TTL caching** &mdash; Τα αποτελέσματα crt.sh (15λεπτά), BGP (30λεπτά), Shodan (5λεπτά), VirusTotal (10λεπτά) αποθηκεύονται προσωρινά για αποφυγή περιττών κλήσεων API κατά τις ροές εργασίας πολλαπλών εργαλείων.
- **Ομαλή υποβάθμιση** &mdash; Τα κλειδιά API που λείπουν δεν προκαλούν κατάρρευση του διακομιστή. Τα εργαλεία επιστρέφουν περιγραφικά μηνύματα σφάλματος: "Ορίστε SHODAN_API_KEY για ενεργοποίηση εργαλείων Shodan."
- **Ανάλυση αλυσίδας SPF** &mdash; Αναδρομική επίλυση include με ανίχνευση βρόχων, αναγνώριση υπηρεσιών (Google Workspace, Microsoft 365, SendGrid, κλπ.) και έλεγχος ορίου αναζήτησης RFC 7208.
- **2 εξαρτήσεις** &mdash; `@modelcontextprotocol/sdk` και `zod`. Όλες οι HTTP μέσω native `fetch`. Όλα τα DNS μέσω `node:dns/promises`.

---

## Περιορισμοί

- Ισχύουν όρια ρυθμού δωρεάν επιπέδου: HackerTarget (50/ημέρα), ip-api.com (45/λεπτό), VirusTotal community (4/λεπτό)
- Το crt.sh μπορεί να είναι αργό για μεγάλους τομείς (εφαρμόζεται timeout 30s)
- Το ip-api.com απαιτεί HTTP (όχι HTTPS) για το δωρεάν επίπεδο
- Το CDX API του Wayback Machine μπορεί να τελειώσει σε timeout για πολύ δημοφιλείς τομείς
- Το WHOIS μέσω RDAP μπορεί να μην καλύπτει όλα τα TLDs (ορισμένοι καταχωρητές δεν υποστηρίζουν ακόμα RDAP)
- Δοκιμασμένο σε macOS / Linux (το Windows δεν έχει δοκιμαστεί)

---

## Μέρος της Σουίτας Ασφάλειας MCP

| Έργο | Τομέας | Εργαλεία |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Δοκιμή ασφάλειας βασισμένη σε περιηγητή | 39 εργαλεία, Firefox, δοκιμή injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Ασφάλεια cloud (AWS/Azure/GCP) | 38 εργαλεία, 60+ έλεγχοι |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Στάση ασφάλειας GitHub | 39 εργαλεία, 45 έλεγχοι |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Πληροφορίες ευπαθειών | 23 εργαλεία, 5 πηγές |
| **osint-mcp** | **OSINT & αναγνώριση** | **37 εργαλεία, 12 πηγές** |

---

<p align="center">
<b>Μόνο για εξουσιοδοτημένες δοκιμές ασφάλειας και αξιολόγηση.</b><br>
Βεβαιωθείτε πάντα ότι έχετε τη σωστή εξουσιοδότηση πριν εκτελέσετε αναγνώριση σε οποιονδήποτε στόχο.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Κατασκευασμένο με Bun + TypeScript
</p>
