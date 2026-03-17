#!/usr/bin/env node
import { startMcpStdio } from "./protocol/mcp-server.js";
import type { ToolContext } from "./types/index.js";

function buildToolContext(): ToolContext {
  return {
    config: {
      shodanApiKey: process.env.SHODAN_API_KEY,
      vtApiKey: process.env.VT_API_KEY,
      stApiKey: process.env.ST_API_KEY,
      censysApiId: process.env.CENSYS_API_ID,
      censysApiSecret: process.env.CENSYS_API_SECRET,
    },
  };
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log("osint-mcp — OSINT intelligence MCP server");
    console.log("");
    console.log("Usage: osint-mcp");
    console.log("");
    console.log("Environment variables:");
    console.log("  SHODAN_API_KEY       Optional. Enables Shodan host/search/exploit tools");
    console.log("  VT_API_KEY           Optional. Enables VirusTotal domain/IP/URL analysis");
    console.log("  ST_API_KEY           Optional. Enables SecurityTrails subdomain/DNS history");
    console.log("  CENSYS_API_ID        Optional. Enables Censys host/certificate search");
    console.log("  CENSYS_API_SECRET    Optional. Required with CENSYS_API_ID");
    console.log("");
    console.log("Starts an MCP server on stdio with 37 OSINT intelligence tools.");
    console.log("Public tools (DNS, WHOIS, crt.sh, BGP, GeoIP, Wayback, HackerTarget, M365)");
    console.log("work without any API keys.");
    process.exit(0);
  }

  const ctx = buildToolContext();
  await startMcpStdio(ctx);

  // Keep process alive
  await new Promise(() => {});
}

main().catch((err) => {
  console.error("[osint-mcp] Fatal:", err);
  process.exit(1);
});
