import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// @see https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing
// casing enforces that you define column in camelcasing - which is common practice in ts
// which will be automatically converted to snake_case in the database
export const db = drizzle({
  connection: {
    connectionString: process.env.DB_URL!,
  },
  schema,
  casing: "snake_case",
});
