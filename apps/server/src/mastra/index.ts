import { Mastra } from "@mastra/core";
import { dexAgent } from "./agents/dex-agent";
import { env } from "~/lib/env";
import { PostgresStore } from "@mastra/pg";
import { PinoLogger } from "@mastra/loggers";
import { MastraEditor } from "@mastra/editor";

export const mastra = new Mastra({
  agents: { dexAgent },
  storage: new PostgresStore({
    id: "pg-storage-test",
    connectionString: env.DB_URL,
  }),
  server: {
    middleware: [
      async (context, next) => {
        const requestContext = context.get("requestContext");

        // TODO: Implement Better Auth session extraction
        // Example: const session = await auth.api.getSession({ headers: context.req.raw.headers });
        // if (session) {
        //   requestContext.set("userId", session.user.id);
        //   requestContext.set("userName", session.user.name);
        // }
        //
        // For model preference (passed from frontend):
        // const body = await context.req.json().catch(() => ({}));
        // if (body.provider) requestContext.set("provider", body.provider);
        // if (body.modelId) requestContext.set("modelId", body.modelId);

        await next();
      },
    ],
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  editor: new MastraEditor(),
});
