import { pgEnum } from "drizzle-orm/pg-core";

export const itemTypeEnum = pgEnum("item_type", ["link", "note"]); // for now, links and notes, later on images and documents

export const collectionAccessRoleEnum = pgEnum("collection_access_role", [
  "owner",
  "admin",
  "member",
]);

export const apiKeyModeEnum = pgEnum("api_key_mode", [
  "full_access",
  "collection_specific",
]);

export const userStatusEnum = pgEnum("UserStatus", [
  "waitlist",
  "active",
  "suspended",
]);

export const invitationStatusEnum = pgEnum("invitation_status", [
  "pending",
  "accepted",
  "rejected",
  "expired",
  "cancelled",
]);

export const activityTypeEnum = pgEnum("activity_type", [
  "invitation_sent",
  "invitation_accepted",
  "invitation_rejected",
  "member_removed",
  "role_changed",
  "ownership_transferred",
]);
