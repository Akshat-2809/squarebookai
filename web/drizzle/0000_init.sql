CREATE TABLE "pilot_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" text GENERATED ALWAYS AS ('SQB-' || lpad(id::text, greatest(4, length(id::text)), '0')) STORED NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"organisation" text NOT NULL,
	"accounts_band" text NOT NULL,
	"ip_hash" text NOT NULL,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "pilot_requests_ip_created_idx" ON "pilot_requests" USING btree ("ip_hash","created_at");