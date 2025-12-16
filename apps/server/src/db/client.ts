import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// const pool = new Pool({
//   connectionString: process.env.DB_URL,
//   max: 10, // felt cute, might be too much
//   idleTimeoutMillis: 30_000,
//   connectionTimeoutMillis: 5_000,
// });

// @see https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing
// casing enforces that you define column in camelcasing - which is common practice in ts
// which will be automatically converted to snake_case in the database
export const db = () => {
  const client = postgres(process.env.DB_URL!, { prepare: false });
  return drizzle({ client, schema, casing: "snake_case" });
};
