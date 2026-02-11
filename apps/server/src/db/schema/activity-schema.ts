import { pgTable, text, jsonb, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { user } from "./auth-schema";
import { timestamps } from "./helpers/timestamp-schema";
import { collectionsTable } from "./collection-schema";
import {
  activityTypeEnum,
  collectionAccessRoleEnum,
} from "./helpers/enums-schema";

type ActivityType = (typeof activityTypeEnum.enumValues)[number];
type Role = (typeof collectionAccessRoleEnum.enumValues)[number];

type ActivityDataShapes = Record<ActivityType, unknown> & {
  invitation_sent: {
    invitationId: string;
    inviteeId: string;
    inviteeName: string;
    role: Role;
    message?: string;
  };
  invitation_accepted: {
    invitationId: string;
    inviteeId: string;
    inviteeName: string;
    role: Role;
  };
  invitation_rejected: {
    invitationId: string;
    inviteeId: string;
    inviteeName: string;
  };
  member_removed: {
    memberId: string;
    memberName: string;
    role: Role;
  };
  role_changed: {
    memberId: string;
    memberName: string;
    oldRole: Role;
    newRole: Role;
  };
  ownership_transferred: {
    previousOwnerId: string;
    previousOwnerName: string;
    newOwnerId: string;
    newOwnerName: string;
  };
};

type ActivityDataUnion = {
  [K in keyof ActivityDataShapes]: { type: K } & ActivityDataShapes[K];
}[keyof ActivityDataShapes];

export type ActivityData<T extends ActivityType = ActivityType> = Extract<
  ActivityDataUnion,
  { type: T }
>;

export const activityTable = pgTable(
  "activity",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    collectionId: text("collection_id").references(() => collectionsTable.id, {
      onDelete: "cascade",
    }),
    actorId: text("actor_id").references(() => user.id, {
      onDelete: "set null",
    }),
    type: activityTypeEnum().notNull(),
    data: jsonb().$type<ActivityData>().notNull(),
    ...timestamps,
  },
  (table) => [
    // "show recent activity for this collection" — your activity feed
    index("idx_activity_collection_created").on(
      table.collectionId,
      table.createdAt,
    ),
    // "show everything this user did" — useful for audit/moderation
    index("idx_activity_actor_created").on(table.actorId, table.createdAt),
    // filtering activity by type within a collection ("show all role changes")
    index("idx_activity_collection_type").on(table.collectionId, table.type),
  ],
);

export const activityRelations = relations(activityTable, ({ one }) => ({
  actor: one(user, {
    fields: [activityTable.actorId],
    references: [user.id],
  }),
  collection: one(collectionsTable, {
    fields: [activityTable.collectionId],
    references: [collectionsTable.id],
  }),
}));
