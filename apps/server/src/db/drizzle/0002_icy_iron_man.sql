CREATE TYPE "public"."item_access_role" AS ENUM('owner', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."collection_access_role" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
CREATE TABLE "user_items" (
	"user_id" text NOT NULL,
	"item_id" text NOT NULL,
	"role" "item_access_role" DEFAULT 'viewer' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_items_user_id_item_id_pk" PRIMARY KEY("user_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "user_collections" (
	"user_id" text NOT NULL,
	"collection_id" text NOT NULL,
	"role" "collection_access_role" DEFAULT 'member' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_collections_user_id_collection_id_pk" PRIMARY KEY("user_id","collection_id")
);
--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "creator_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_collections" ADD CONSTRAINT "user_collections_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_collections" ADD CONSTRAINT "user_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;