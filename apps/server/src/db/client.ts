import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import { env } from "~/lib/env";

// @see https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing
// casing enforces that you define column in camelcasing - which is common practice in ts
// which will be automatically converted to snake_case in the database

const client = postgres(env.DB_URL, { prepare: false });
export const db = drizzle({ client, schema, casing: "snake_case" });
