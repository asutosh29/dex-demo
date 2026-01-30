CREATE TYPE "public"."UserStatus" AS ENUM('waitlist', 'active', 'suspended');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "status" "UserStatus" DEFAULT 'waitlist' NOT NULL;