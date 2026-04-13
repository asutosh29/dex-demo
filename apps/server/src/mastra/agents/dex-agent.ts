import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { DEX_PROMPT } from "./dex-prompt";
import { webSearch } from "../tools/web-search-tool";
import { dexMcp } from "../mcp/dex-mcp";

const dexTools = await dexMcp.listTools();
export const dexAgent = new Agent({
  id: "dex-agent",
  name: "Dex Agent",
  instructions: DEX_PROMPT,
  model: "groq/moonshotai/kimi-k2-instruct-0905",
  tools: { webSearch, ...dexTools },
  memory: new Memory({
    options: {
      generateTitle: true,
    },
  }),
});
