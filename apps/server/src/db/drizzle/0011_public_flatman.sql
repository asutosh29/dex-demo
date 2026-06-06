ALTER TABLE "collections" ADD COLUMN "parent_id" text;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_parent_id_collections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_collections_parent_id" ON "collections" USING btree ("parent_id");--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_no_self_parent" CHECK ("collections"."parent_id" IS NULL OR "collections"."parent_id" <> "collections"."id");