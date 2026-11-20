import { Mastra } from "@mastra/core";
import { dexAgent } from "./agents/dex-agent";
import { env } from "~/lib/env";
import { PostgresStoreVNext } from "@mastra/pg";
import { PinoLogger } from "@mastra/loggers";
import { MastraEditor } from "@mastra/editor";
import { chatRoute } from "@mastra/ai-sdk";
import { createObservability } from "./observability";

export const mastra = new Mastra({
  agents: { dexAgent },
  observability: createObservability(),
  storage: new PostgresStoreVNext({
    id: "pg-storage-test",
    connectionString: env.DB_URL,
    observability: {
      connectionString: env.OBSERVABILITY_DB_URL ?? env.DB_URL,
      schemaName: "dex_observability",
    },
  }),
  server: {
    apiRoutes: [
      chatRoute({
        version: "v6",
        path: "/chat",
        agent: "dex-agent",
        defaultOptions: {},
        sendReasoning: true,
        sendSources: true,
        sendStart: true,
        sendFinish: true,
      }),
    ],
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  editor: new MastraEditor(),
});
