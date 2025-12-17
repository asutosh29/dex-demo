import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "~/lib/auth";
import { createCollection } from "~/services/collection.crud";
import { addItemToCollection } from "~/services/item.crud";
import { dexAgent } from "~/voltagent";
import { trustedOrigins } from "./lib/constants";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: trustedOrigins,
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong");
});

app.post("/add-collection", async (c) => {
  const { title } = await c.req.json();
  if (!title) {
    return c.json({ error: "Title is required" }, 400);
  }
  const collection = await createCollection(title);
  return c.json({ collection });
});

app.post("/add-item", async (c) => {
  const { url, collectionId } = await c.req.json();
  if (!url || !collectionId) {
    return c.json({ error: "URL and Collection ID are required" }, 400);
  }
  const item = await addItemToCollection(collectionId, url);
  return c.json({ item });
});

// Start the VoltAgent server (mcp)
dexAgent.getServerInstance()?.isRunning() ?? dexAgent.startServer();
console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
console.log("Starting app server on http://localhost:8787");
serve({
  fetch: app.fetch,
  port: 8787,
});
