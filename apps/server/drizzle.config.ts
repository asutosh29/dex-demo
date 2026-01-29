import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { env } from "~/lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/drizzle",
  dbCredentials: {
    url: env.DB_URL!,
  },
  casing: "snake_case",
});
