ALTER TABLE "collections" ADD COLUMN "parent_id" text;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_parent_id_collections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_collections_parent_id" ON "collections" USING btree ("parent_id");--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_no_self_parent" CHECK ("collections"."parent_id" IS NULL OR "collections"."parent_id" <> "collections"."id");--> statement-breakpoint

-- One-level nesting invariant: a child collection cannot itself be a parent,
-- and cannot hold root-scoped rows (user_collections, api_key_collections, invitations).

-- Enforces: when setting parent_id, target row must not already have children;
-- when promoting to child, row must not own root-scoped rows.
CREATE OR REPLACE FUNCTION enforce_collection_depth() RETURNS trigger AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    IF EXISTS (
      SELECT 1
      FROM collections
      WHERE id = NEW.parent_id
        AND parent_id IS NOT NULL
    ) THEN
      RAISE EXCEPTION 'sub_collection_nesting_exceeded: parent % is already a sub-collection',
        NEW.parent_id USING ERRCODE = 'check_violation';
    END IF;

    IF EXISTS (SELECT 1 FROM collections WHERE parent_id = NEW.id) THEN
      RAISE EXCEPTION 'sub_collection_nesting_exceeded: collection % already has children',
        NEW.id USING ERRCODE = 'check_violation';
    END IF;

    IF TG_OP = 'UPDATE' AND OLD.parent_id IS NULL THEN
      IF EXISTS (SELECT 1 FROM user_collections WHERE collection_id = NEW.id)
         OR EXISTS (SELECT 1 FROM api_key_collections WHERE collection_id = NEW.id)
         OR EXISTS (SELECT 1 FROM invitations WHERE collection_id = NEW.id) THEN
        RAISE EXCEPTION 'root_has_scoped_rows: cannot demote root % with membership, api key, or invitation rows',
          NEW.id USING ERRCODE = 'check_violation';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint

CREATE TRIGGER collections_depth_guard
BEFORE INSERT OR UPDATE OF parent_id ON collections
FOR EACH ROW EXECUTE FUNCTION enforce_collection_depth();--> statement-breakpoint

-- Rejects rows that reference a child collection.
CREATE OR REPLACE FUNCTION enforce_collection_is_root() RETURNS trigger AS $$
DECLARE
  is_child boolean;
BEGIN
  SELECT parent_id IS NOT NULL INTO is_child FROM collections WHERE id = NEW.collection_id;
  IF is_child THEN
    RAISE EXCEPTION 'sub_collection_not_allowed: % cannot reference a child collection',
      TG_TABLE_NAME USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint

CREATE TRIGGER user_collections_root_guard
BEFORE INSERT OR UPDATE OF collection_id ON user_collections
FOR EACH ROW EXECUTE FUNCTION enforce_collection_is_root();--> statement-breakpoint

CREATE TRIGGER api_key_collections_root_guard
BEFORE INSERT OR UPDATE OF collection_id ON api_key_collections
FOR EACH ROW EXECUTE FUNCTION enforce_collection_is_root();--> statement-breakpoint

CREATE TRIGGER invitations_root_guard
BEFORE INSERT OR UPDATE OF collection_id ON invitations
FOR EACH ROW EXECUTE FUNCTION enforce_collection_is_root();
