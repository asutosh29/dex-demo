CREATE TYPE "public"."item_type" AS ENUM('link');--> statement-breakpoint
CREATE TABLE "collection_items" (
	"collection_id" text NOT NULL,
	"item_id" text NOT NULL,
	CONSTRAINT "collection_items_collection_id_item_id_pk" PRIMARY KEY("collection_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
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
	"image" text,
	"search_vector" "tsvector" GENERATED ALWAYS AS (setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(tldr, '')), 'B')) STORED,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "items_search_idx" ON "items" USING gin ("search_vector");