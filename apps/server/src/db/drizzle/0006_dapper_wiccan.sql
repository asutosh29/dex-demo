CREATE TYPE "public"."activity_type" AS ENUM('invitation_sent', 'invitation_accepted', 'invitation_rejected', 'member_removed', 'role_changed', 'ownership_transferred');--> statement-breakpoint
CREATE TABLE "activity" (
	"id" text PRIMARY KEY NOT NULL,
	"collection_id" text,
	"actor_id" text,
	"type" "activity_type" NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "idx_notifications_type";--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "activity_id" text;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_actor_id_user_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_activity_collection_created" ON "activity" USING btree ("collection_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_activity_actor_created" ON "activity" USING btree ("actor_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_activity_collection_type" ON "activity" USING btree ("collection_id","type");--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "data";--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "is_archived";--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "archived_at";--> statement-breakpoint
DROP TYPE "public"."notification_type";