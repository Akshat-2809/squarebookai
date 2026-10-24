import "server-only";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";
import { bandLabel } from "./options";

type Request = { reference: string; name: string; email: string; organisation: string; accountsBand: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends the internal notification and the requester's confirmation.
 * Never throws: email problems are logged and must not fail the request.
 */
export async function sendPilotEmails(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const notify = process.env.NOTIFY_EMAIL;
  if (!apiKey || !from) {
    console.warn(`[pilot] ${req.reference}: RESEND_API_KEY or EMAIL_FROM not set, skipping emails`);
    return;
  }
  const resend = new Resend(apiKey);
  const band = bandLabel(req.accountsBand);

  const jobs: Promise<unknown>[] = [];

  if (notify) {
    jobs.push(
      resend.emails.send(
        {
          from,
          to: notify,
          replyTo: req.email,
          subject: `Pilot request ${req.reference} · ${req.organisation}`,
          text: [
            `New pilot request ${req.reference}`,
            "",
            `Name: ${req.name}`,
            `Email: ${req.email}`,
            `Organisation: ${req.organisation}`,
            `Accounts in collection: ${band}`,
          ].join("\n"),
          html: `<p>New pilot request <b>${req.reference}</b></p>
<table cellpadding="4">
<tr><td>Name</td><td>${escape(req.name)}</td></tr>
<tr><td>Email</td><td>${escape(req.email)}</td></tr>
<tr><td>Organisation</td><td>${escape(req.organisation)}</td></tr>
<tr><td>Accounts in collection</td><td>${escape(band)}</td></tr>
</table>`,
        },
        { idempotencyKey: `pilot-notify/${req.reference}` },
      ),
    );
  } else {
    console.warn(`[pilot] ${req.reference}: NOTIFY_EMAIL not set, skipping internal notification`);
  }

  jobs.push(
    resend.emails.send(
      {
        from,
        to: req.email,
        replyTo: CONTACT_EMAIL,
        subject: `We've got your pilot request (${req.reference})`,
        text: [
          `Hi ${req.name},`,
          "",
          `Thanks for asking about a Squarebook pilot for ${req.organisation}. Your reference is ${req.reference}.`,
          "",
          "We reply within two working days. To get started quickly, keep a sample of 1,000 accounts ready.",
          "",
          "— Squarebook",
          CONTACT_EMAIL,
        ].join("\n"),
      },
      { idempotencyKey: `pilot-confirm/${req.reference}` },
    ),
  );

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error(`[pilot] ${req.reference}: email failed`, r.reason);
    } else {
      const { error } = r.value as { error: unknown };
      if (error) console.error(`[pilot] ${req.reference}: email rejected by Resend`, error);
    }
  }
}
