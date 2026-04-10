import { Mastra } from "@mastra/core";
import { weatherAgent } from "./agents/weather-agent";
import { LibSQLStore } from "@mastra/libsql";

export const mastra = new Mastra({
  agents: { weatherAgent },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: ":memory:",
  }),
});
