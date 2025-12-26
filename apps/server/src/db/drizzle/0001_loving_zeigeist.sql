CREATE TABLE "api_key_collections" (
	"api_key_id" text NOT NULL,
	"collection_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_key_collections_api_key_id_collection_id_pk" PRIMARY KEY("api_key_id","collection_id")
);
--> statement-breakpoint
ALTER TABLE "api_key_collections" ADD CONSTRAINT "api_key_collections_api_key_id_apikey_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."apikey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_key_collections" ADD CONSTRAINT "api_key_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;