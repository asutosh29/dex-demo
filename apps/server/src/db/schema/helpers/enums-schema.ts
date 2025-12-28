import { pgEnum } from "drizzle-orm/pg-core";

export const itemTypeEnum = pgEnum("item_type", ["link"]); // for now, just links, later on images and documents

export const collectionAccessRoleEnum = pgEnum("collection_access_role", [
  "owner",
  "admin",
  "member",
]);
