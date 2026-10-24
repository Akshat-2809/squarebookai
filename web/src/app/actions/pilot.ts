"use server";

import { createHash, randomInt } from "node:crypto";
import { and, count, eq, gt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { getDb } from "@/lib/db/client";
import { pilotRequests } from "@/lib/db/schema";
import { sendPilotEmails } from "@/lib/pilot/email";
import type { PilotField, PilotState } from "@/lib/pilot/options";
import { pilotRequestSchema } from "@/lib/pilot/schema";
import { CONTACT_EMAIL } from "@/lib/site";

const RATE_LIMIT = 5;
const RATE_WINDOW = "1 hour";
const FIELDS: PilotField[] = ["name", "email", "organisation", "accountsBand"];

function clientIp(h: Headers) {
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "squarebook-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function requestPilot(_prev: PilotState, formData: FormData): Promise<PilotState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    organisation: String(formData.get("organisation") ?? ""),
    accountsBand: String(formData.get("accountsBand") ?? ""),
    website: String(formData.get("website") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, organisation: raw.organisation, accountsBand: raw.accountsBand };

  // Honeypot filled: pretend it worked, store nothing.
  if (raw.website.trim() !== "") {
    console.info("[pilot] honeypot triggered, dropping submission");
    return { status: "success", reference: `SQB-${String(randomInt(1000, 9999))}` };
  }

  const parsed = pilotRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<PilotField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as PilotField;
      if (FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields and try again.", fieldErrors, values };
  }

  const db = getDb();
  if (!db) {
    console.error("[pilot] DATABASE_URL is not set");
    return {
      status: "error",
      message: `We couldn't send your request just now. Please try again, or email ${CONTACT_EMAIL}.`,
      values,
    };
  }

  const h = await headers();
  const ipHash = hashIp(clientIp(h));
  const { name, email, organisation, accountsBand } = parsed.data;

  try {
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(pilotRequests)
      .where(and(eq(pilotRequests.ipHash, ipHash), gt(pilotRequests.createdAt, sql`now() - ${RATE_WINDOW}::interval`)));

    if (recent >= RATE_LIMIT) {
      return {
        status: "error",
        message: `We've had several requests from your network in the last hour. Please try again later, or email ${CONTACT_EMAIL}.`,
        values,
      };
    }

    const [row] = await db
      .insert(pilotRequests)
      .values({ name, email, organisation, accountsBand, ipHash, userAgent: h.get("user-agent")?.slice(0, 300) ?? null })
      .returning({ id: pilotRequests.id, reference: pilotRequests.reference });

    // Emails go out after the response is sent; failures are logged, never surfaced.
    after(() => sendPilotEmails({ reference: row.reference, name, email, organisation, accountsBand }));

    return { status: "success", reference: row.reference };
  } catch (err) {
    console.error("[pilot] failed to store request", err);
    return {
      status: "error",
      message: `Something went wrong on our side and your request wasn't sent. Please try again, or email ${CONTACT_EMAIL}.`,
      values,
    };
  }
}
