ALTER TABLE "items" ALTER COLUMN "creator_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "creator_id" DROP NOT NULL;