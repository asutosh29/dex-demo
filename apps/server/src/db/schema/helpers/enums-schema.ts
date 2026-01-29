import { pgEnum } from "drizzle-orm/pg-core";

export const itemTypeEnum = pgEnum("item_type", ["link", "note"]); // for now, links and notes, later on images and documents

export const collectionAccessRoleEnum = pgEnum("collection_access_role", [
  "owner",
  "admin",
  "member",
]);

export const userStatusEnum = pgEnum("UserStatus", [
  "waitlist",
  "active",
  "suspended",
]);
