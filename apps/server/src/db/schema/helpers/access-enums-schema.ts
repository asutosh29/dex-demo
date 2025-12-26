import { pgEnum } from "drizzle-orm/pg-core";

export const collectionAccessRoleEnum = pgEnum("collection_access_role", [
  "owner",
  "admin",
  "member",
]);
