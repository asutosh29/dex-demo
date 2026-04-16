import { Mastra } from "@mastra/core";
import { dexAgent } from "./agents/dex-agent";
import { env } from "~/lib/env";
import { PostgresStore } from "@mastra/pg";
import { PinoLogger } from "@mastra/loggers";
import { MastraEditor } from "@mastra/editor";
import { chatRoute } from "@mastra/ai-sdk";
import { weatherAgent } from "./agents/weather-agent";

export const mastra = new Mastra({
  agents: { dexAgent, weatherAgent },
  storage: new PostgresStore({
    id: "pg-storage-test",
    connectionString: env.DB_URL,
  }),
  server: {
    apiRoutes: [
      chatRoute({
        version: "v6",
        path: "/chat",
        agent: "weather-agent",
        defaultOptions: {},
      }),
    ],
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  editor: new MastraEditor(),
});
