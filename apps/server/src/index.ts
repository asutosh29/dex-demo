import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
import { trustedOrigins } from "./lib/constants";
import { appRouter, createContext } from "~/trpc";
import { mcpServer } from "~/mcp/server";
import {
  sendWaitlistApprovedEmail,
  sendWaitlistConfirmationEmail,
} from "~/services/waitlist/mailer";
import { env } from "./lib/env";
import { db } from "./db/client";
import { user as userTable } from "~/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: trustedOrigins,
    allowHeaders: ["Content-Type", "Authorization", "X-API-Key"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// tRPC endpoint
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong");
});

// MCP endpoint
app.route("/mcp", mcpServer);

app.post("/waitlist/approve", async (c) => {
  const authorizationHeader = c.req.header("Authorization");
  if (authorizationHeader !== env.GRIST_AUTH_TOKEN)
    return c.json({ error: "Unauthorized" }, 401);

  try {
    const approveEvents = await c.req.json();

    for (const event of approveEvents) {
      const { name, email, approve } = event;
      if (!name || !email) {
        console.log(await c.req.json());
        return c.json({ error: "Name and email are required" }, 400);
      }

      const user = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }

      await db
        .update(userTable)
        .set({ status: approve ? "active" : "waitlist" })
        .where(eq(userTable.id, user.id));

      if (approve) {
        await sendWaitlistApprovedEmail(name, email);
      }
    }

    return c.json({ message: "Waitlist approvals processed" });
  } catch (error) {
    console.error("Error processing waitlist approvals:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

const port = Number(env.PORT || 8787);

console.log(`Starting app server on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
