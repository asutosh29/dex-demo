ALTER TABLE "items" drop column "search_vector";--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(tldr, '')), 'B') ||
          setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')) STORED;