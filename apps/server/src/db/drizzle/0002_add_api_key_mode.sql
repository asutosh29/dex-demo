-- Add api_key_mode enum type
DO $$ BEGIN
  CREATE TYPE "public"."api_key_mode" AS ENUM('full_access', 'collection_specific');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add mode column to apikey table with default value
ALTER TABLE "apikey" ADD COLUMN "mode" "api_key_mode" DEFAULT 'collection_specific' NOT NULL;
