CREATE TYPE "public"."api_key_mode" AS ENUM('full_access', 'collection_specific');--> statement-breakpoint
ALTER TABLE "apikey" ADD COLUMN "mode" "api_key_mode" DEFAULT 'collection_specific' NOT NULL;