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

// Create a single client instance that's reused
const client = postgres(process.env.DB_URL!, {
  prepare: false,
  max: 10, // maximum number of connections in the pool
  idle_timeout: 20, // close idle connections after 20 seconds
  max_lifetime: 60 * 30, // close connections after 30 minutes
});

export const db = drizzle({ client, schema, casing: "snake_case" });
