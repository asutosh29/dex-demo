-- Add new columns for the @better-auth/api-key plugin schema
ALTER TABLE "apikey" ADD COLUMN "config_id" text DEFAULT 'default' NOT NULL;--> statement-breakpoint
ALTER TABLE "apikey" ADD COLUMN "reference_id" text;--> statement-breakpoint

-- Backfill reference_id from the legacy user_id column
UPDATE "apikey" SET "reference_id" = "user_id" WHERE "reference_id" IS NULL;--> statement-breakpoint
ALTER TABLE "apikey" ALTER COLUMN "reference_id" SET NOT NULL;--> statement-breakpoint

-- Drop legacy user_id column, FK, and index (replaced by reference_id)
ALTER TABLE "apikey" DROP CONSTRAINT "apikey_user_id_user_id_fk";--> statement-breakpoint
DROP INDEX "apikey_userId_idx";--> statement-breakpoint
ALTER TABLE "apikey" DROP COLUMN "user_id";--> statement-breakpoint

-- Add indexes for the new columns
CREATE INDEX "apikey_configId_idx" ON "apikey" USING btree ("config_id");--> statement-breakpoint
CREATE INDEX "apikey_referenceId_idx" ON "apikey" USING btree ("reference_id");
