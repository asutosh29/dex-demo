import { Hono } from "hono";
import { createCollection } from "./services/collection.crud";
import { addItemToCollection } from "./services/item.crud";
import { dexAgent } from "./voltagent";
import { serve } from "@hono/node-server";
import "dotenv/config";

const app = new Hono();

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

dexAgent.getServerInstance()?.isRunning() ?? dexAgent.startServer();

console.log("Starting app server on http://localhost:8787");
serve(app);
