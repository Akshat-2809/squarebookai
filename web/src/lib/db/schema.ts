import { sql } from "drizzle-orm";
import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pilotRequests = pgTable(
  "pilot_requests",
  {
    id: serial("id").primaryKey(),
    // SQB-0421 style: zero-padded to at least four digits, grows past 9999.
    reference: text("reference")
      .notNull()
      .generatedAlwaysAs(sql`'SQB-' || lpad(id::text, greatest(4, length(id::text)), '0')`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    organisation: text("organisation").notNull(),
    accountsBand: text("accounts_band").notNull(),
    // Salted SHA-256 of the client IP, used only for rate limiting.
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("pilot_requests_ip_created_idx").on(t.ipHash, t.createdAt)],
);

export type PilotRequestRow = typeof pilotRequests.$inferSelect;
