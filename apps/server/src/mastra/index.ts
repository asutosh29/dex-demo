import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { dexAgent } from "./agents/dex-agent";

export const mastra = new Mastra({
  agents: { dexAgent },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: ":memory:",
  }),
});
