# Contributing to osint-mcp-server

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/badchars/osint-mcp-server.git
cd osint-mcp-server

# Install dependencies (Bun recommended)
bun install

# Build
bun run build

# Run in dev mode (watch)
bun run dev

# Test a tool
node dist/index.js --tool dns_lookup '{"domain":"example.com","type":"A"}'

# List all tools
node dist/index.js --list
```

## Project Structure

```
src/
├── index.ts                  # Entry point (MCP server + CLI)
├── types/index.ts            # ToolDef, ToolContext, ToolResult types
├── protocol/
│   ├── mcp-server.ts         # MCP stdio transport
│   └── tools.ts              # allTools array (all 37 tools)
└── tools/
    ├── dns/                  # DNS tools (6)
    ├── whois/                # WHOIS / RDAP tools (2)
    ├── crtsh/                # Certificate Transparency (1)
    ├── geoip/                # GeoIP tools (2)
    ├── bgp/                  # BGP / ASN tools (3)
    ├── wayback/              # Wayback Machine tools (2)
    ├── hackertarget/         # HackerTarget tools (3)
    ├── m365/                 # Microsoft 365 tools (2)
    ├── meta/                 # Meta tools (2)
    ├── shodan/               # Shodan tools (4) — requires API key
    ├── virustotal/           # VirusTotal tools (4) — requires API key
    ├── securitytrails/       # SecurityTrails tools (3) — requires API key
    └── censys/               # Censys tools (3) — requires API key
```

## Adding a New Tool

1. Create the tool file in the appropriate `src/tools/<provider>/` directory
2. Follow the `ToolDef` interface:

```typescript
import { z } from "zod";
import type { ToolDef, ToolContext, ToolResult } from "../../types/index.js";

const schema = z.object({
  domain: z.string().describe("Target domain"),
});

export const myNewTool: ToolDef = {
  name: "provider_tool_name",
  description: "What this tool does in one sentence",
  inputSchema: schema,
  execute: async (args, ctx): Promise<ToolResult> => {
    const { domain } = schema.parse(args);

    // Your implementation here
    const result = { domain, data: "..." };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
};
```

3. Add the tool to `src/protocol/tools.ts`:

```typescript
import { myNewTool } from "../tools/provider/my-new-tool.js";

export const allTools: ToolDef[] = [
  // ... existing tools
  myNewTool,
];
```

4. Add the tool to `TOOL_CATEGORIES` in `src/index.ts`
5. Build and test:

```bash
bun run build
node dist/index.js --tool provider_tool_name '{"domain":"example.com"}'
```

## Adding a New Data Source

1. Create a new directory under `src/tools/<provider>/`
2. Implement one or more tools following the pattern above
3. If the source requires an API key:
   - Add the key to `ToolContext.config` in `src/types/index.ts`
   - Read it from `process.env` in `src/index.ts` → `buildToolContext()`
   - Return a helpful error message when the key is missing
4. Update README with the new source

## Guidelines

- **TypeScript strict mode** — no `any` types
- **Zod schemas** — every tool input must be validated
- **Native fetch** — no axios or other HTTP libraries
- **Minimal dependencies** — currently only 2 runtime deps (MCP SDK + Zod)
- **Graceful API key handling** — tools that need keys should return a clear message, not crash
- **Conventional Commits** — `feat:`, `fix:`, `docs:`, `refactor:`

## Submitting a PR

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `bun run build` and test your changes
4. Push and open a PR — the template will guide you

## Reporting Issues

Use the [issue templates](https://github.com/badchars/osint-mcp-server/issues/new/choose):
- **Bug Report** — something is broken
- **Feature Request** — suggest an improvement
- **New Data Source** — request a new OSINT provider integration
