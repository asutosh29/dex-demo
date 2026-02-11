import {
  pgTable,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { user } from "./auth-schema";
import { collectionsTable } from "./collection-schema";
import {
  invitationStatusEnum,
  collectionAccessRoleEnum,
} from "./helpers/enums-schema";
import { timestamps } from "./helpers/timestamp-schema";

export const invitationsTable = pgTable(
  "invitations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    inviteeId: text("invitee_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    collectionId: text("collection_id")
      .notNull()
      .references(() => collectionsTable.id, { onDelete: "cascade" }),
    role: collectionAccessRoleEnum().default("member").notNull(),
    status: invitationStatusEnum().default("pending").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    respondedAt: timestamp("responded_at"),
    ...timestamps,
  },
  (table) => [
    index("idx_invitations_invitee_status").on(table.inviteeId, table.status),
    index("idx_invitations_inviter").on(table.inviterId),
    uniqueIndex("idx_unique_pending_invitation")
      .on(table.inviteeId, table.collectionId)
      .where(sql`status = 'pending'`),
  ],
);

export const invitationsRelations = relations(invitationsTable, ({ one }) => ({
  invitee: one(user, {
    fields: [invitationsTable.inviteeId],
    references: [user.id],
    relationName: "inviteeRelation",
  }),
  inviter: one(user, {
    fields: [invitationsTable.inviterId],
    references: [user.id],
    relationName: "inviterRelation",
  }),
  collection: one(collectionsTable, {
    fields: [invitationsTable.collectionId],
    references: [collectionsTable.id],
  }),
}));
