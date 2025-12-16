import { Hono } from "hono";
import { createCollection } from "./services/collection.crud";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/add-collection", async (c) => {
  const { title } = await c.req.json();
  if (!title) {
    return c.json({ error: "Title is required" }, 400);
  }
  const collection = await createCollection(title);
  return c.json({ collection });
});

export default app;
