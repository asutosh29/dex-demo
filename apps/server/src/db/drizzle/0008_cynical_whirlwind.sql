ALTER TABLE "items" DROP COLUMN IF EXISTS "search_vector";--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "search_vector" "tsvector";--> statement-breakpoint

-- Create trigger function to update search_vector
CREATE OR REPLACE FUNCTION update_items_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.tldr, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql IMMUTABLE;--> statement-breakpoint

-- Create trigger to automatically update search_vector on INSERT or UPDATE
CREATE TRIGGER items_search_vector_update
  BEFORE INSERT OR UPDATE ON items
  FOR EACH ROW
  EXECUTE FUNCTION update_items_search_vector();--> statement-breakpoint

-- Backfill existing rows
UPDATE items SET updated_at = updated_at;