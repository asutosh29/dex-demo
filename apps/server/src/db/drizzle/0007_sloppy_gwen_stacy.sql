ALTER TABLE "activity" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."activity_type";--> statement-breakpoint
CREATE TYPE "public"."activity_type" AS ENUM('invitation_sent', 'invitation_accepted', 'invitation_rejected', 'member_removed', 'role_changed', 'ownership_transferred');--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "type" SET DATA TYPE "public"."activity_type" USING "type"::"public"."activity_type";--> statement-breakpoint
ALTER TABLE "invitations" DROP COLUMN "message";