# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OSINT MCP — the fifth project in the MCP security suite. Provides AI agents with access to OSINT data sources: Shodan, Censys, VirusTotal, SecurityTrails + public DNS/WHOIS/crt.sh/Wayback/BGP/IP geolocation.

Published as `npx osint-mcp` on npm. Public tools work without API keys; paid providers (Shodan, VT, SecurityTrails, Censys) require env vars and return descriptive messages when keys are missing.

## Build & Development Commands

```bash
bun install                    # Install dependencies
bun run dev                    # Watch mode (bun --watch run src/index.ts)
bun run build                  # Compile for npm (tsc -p tsconfig.build.json → dist/)
npm publish                    # Publishes to npm (prepublishOnly runs build automatically)
npx . --help                   # Test local package as if installed via npx
```

No test framework is set up yet. When adding tests, use `bun test` (Bun's built-in test runner).

## Architecture

Follows the same architecture as cve-mcp, github-security-mcp, cloud-audit-mcp, and hackbrowser-mcp.

### Core Pattern

```
src/
├── index.ts                  # Entry point: shebang, buildToolContext(), main()
├── types/
│   └── index.ts              # ToolDef, ToolContext, ToolResult interfaces + text()/json() helpers
├── protocol/
│   ├── mcp-server.ts         # Creates McpServer, loops allTools to register, stdio transport
│   └── tools.ts              # All ToolDef objects + allTools[] export
├── <provider>/               # One directory per data source
│   └── index.ts              # API functions (fetch calls, response normalization)
└── utils/
    ├── rate-limiter.ts       # Shared RateLimiter (prevents 429s)
    └── cache.ts              # TTLCache with expiry
```

### Key Interfaces

```typescript
interface ToolDef {
  name: string;                                          // e.g. "shodan_search"
  description: string;
  schema: Record<string, z.ZodType>;                     // Zod validators per param
  execute: (args: Record<string, unknown>, ctx: ToolContext) => Promise<ToolResult>;
}

interface ToolContext {
  config: { shodan_api_key?: string; vt_api_key?: string; /* ... */ };
  // shared caches, rate limiters
}

interface ToolResult {
  content: { type: "text"; text: string }[];
}
```

### How Tools Are Registered

1. Each tool is a `ToolDef` object in `src/protocol/tools.ts`
2. All tools collected in `export const allTools: ToolDef[]`
3. `mcp-server.ts` loops `allTools` and calls `server.tool(name, description, schema, handler)` for each
4. Error handling wraps each tool execution — errors return as text, never crash the server

### Provider Module Pattern

Each provider (shodan/, virustotal/, dns/, whois/, censys/, securitytrails/, crtsh/, wayback/, bgp/, geoip/) exports pure functions that:
- Accept query params + optional API key
- Use native `fetch` (no axios/got)
- Share a `RateLimiter` instance per API
- Cache results with `TTLCache`
- Normalize API responses to internal types

## Data Sources & Environment Variables

| Provider | Env Var(s) | Required |
|----------|-----------|----------|
| Shodan | `SHODAN_API_KEY` | Optional |
| VirusTotal | `VT_API_KEY` | Optional |
| SecurityTrails | `ST_API_KEY` | Optional |
| Censys | `CENSYS_API_ID` + `CENSYS_API_SECRET` | Optional |
| DNS | — | Free (dns/promises) |
| WHOIS | — | Free (rdap.org) |
| IP Geolocation | — | Free (ip-api.com) |
| BGP/ASN | — | Free (bgpview.io) |
| crt.sh | — | Free (CT logs) |
| Wayback Machine | — | Free (CDX API) |

## Tool Naming Convention

Provider prefix + action: `shodan_search`, `shodan_exploit`, `vt_domain`, `vt_ip`, `dns_lookup`, `dns_reverse`, `whois_domain`, `censys_hosts`, `st_subdomains`, `crtsh_search`, `wayback_urls`, `bgp_asn`, `geoip_lookup`, `osint_list_sources` (meta tool showing key availability).

## npm Package Configuration

- `"type": "module"` — ESM only
- `"bin": { "osint-mcp": "dist/index.js" }` — enables npx
- `"files": ["dist/"]` — only ship compiled JS
- `"dependencies"` — only `@modelcontextprotocol/sdk` + `zod`
- Two tsconfigs: `tsconfig.json` (dev, Bun types) and `tsconfig.build.json` (publish, Node types)

## Rules

- Runtime: Bun (must stay Node.js compatible for npm publish)
- Language: TypeScript strict mode, English code/comments
- Minimal dependencies: MCP SDK + Zod only, native fetch for HTTP, dns/promises for DNS
- API keys read from env vars, always optional
- Missing keys → descriptive text message (not generic NOT_AVAILABLE)
- Zod schema required for every tool parameter with `.describe()`
- Each provider in its own module directory
- Response helper functions: `text(msg)` and `json(data)` for ToolResult construction
