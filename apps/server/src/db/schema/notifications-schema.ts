import { pgTable, text, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { user } from "./auth-schema";
import { timestamps } from "./helpers/timestamp-schema";
import { activityTable } from "./activity-schema";

export const notificationsTable = pgTable(
  "notifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    activityId: text("activity_id").references(() => activityTable.id, {
      onDelete: "cascade",
    }),
    isRead: boolean("is_read").default(false).notNull(),
    readAt: timestamp("read_at"),
    ...timestamps,
  },
  (table) => [
    index("idx_notifications_user_unread").on(table.userId, table.isRead),
    index("idx_notifications_user_created").on(table.userId, table.createdAt),
  ],
);

export const notificationsRelations = relations(
  notificationsTable,
  ({ one }) => ({
    user: one(user, {
      fields: [notificationsTable.userId],
      references: [user.id],
    }),
    activity: one(activityTable, {
      fields: [notificationsTable.activityId],
      references: [activityTable.id],
    }),
  }),
);
