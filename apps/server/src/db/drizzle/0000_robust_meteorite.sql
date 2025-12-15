CREATE TYPE "public"."item_type" AS ENUM('link', 'image', 'document');--> statement-breakpoint
CREATE TABLE "collection_items" (
	"collectionId" text NOT NULL,
	"itemId" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "collection_items_collectionId_itemId_pk" PRIMARY KEY("collectionId","itemId")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "item_type" DEFAULT 'link' NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"tldr" text NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"favicon" text,
	"image" text
);
--> statement-breakpoint
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_collectionId_collections_id_fk" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_itemId_items_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "items_search_idx" ON "items" USING gin ((
          setweight(to_tsvector('english', coalesce("title", '')), 'A') ||
          setweight(to_tsvector('english', coalesce(array_to_string("tags", ' ', ''), '')), 'B') ||
          setweight(to_tsvector('english', coalesce("tldr", '')), 'C')
      ));