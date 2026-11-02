"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ACCOUNTS_BANDS, type PilotField } from "@/lib/pilot/options";
import { pilotRequestSchema } from "@/lib/pilot/schema";
import s from "./PilotCta.module.css";

const FIELDS: PilotField[] = ["name", "email", "organisation", "accountsBand"];
const FIELD_IDS: Record<PilotField, string> = { name: "f-name", email: "f-email", organisation: "f-org", accountsBand: "f-size" };

type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors: Partial<Record<PilotField, string>> };

/**
 * Front-end only: the request is validated in the browser and the receipt is shown.
 * Nothing is sent or stored anywhere.
 */
export function PilotForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const slipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") slipRef.current?.focus();
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = pilotRequestSchema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organisation: String(data.get("organisation") ?? ""),
      accountsBand: String(data.get("accountsBand") ?? ""),
    });

    if (parsed.success) {
      setState({ status: "success" });
      return;
    }

    const fieldErrors: Partial<Record<PilotField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as PilotField;
      if (FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setState({ status: "error", message: "Please check the highlighted fields and try again.", fieldErrors });
    const first = FIELDS.find((f) => fieldErrors[f]);
    if (first) document.getElementById(FIELD_IDS[first])?.focus();
  };

  if (state.status === "success") {
    return (
      <div className={s.form}>
        <div className={s.slip} ref={slipRef} tabIndex={-1} role="status">
          <span>PILOT REQUEST · No. CHK-0421</span>
          <b>Request received</b>
          <span className="rcrow">
            <span>Next step</span>
            <span>Call within 2 working days</span>
          </span>
          <span className="rcrow">
            <span>Keep ready</span>
            <span>Sample of 1,000 accounts</span>
          </span>
          <span className={s.stamp} aria-hidden="true">
            squared!
          </span>
        </div>
      </div>
    );
  }

  const err = state.status === "error" ? state : null;
  const fieldError = (f: PilotField) => err?.fieldErrors[f];
  const describe = (f: PilotField) => (fieldError(f) ? `f-${f}-err` : undefined);

  return (
    <div className={s.form}>
      {/* noValidate: the zod schema shows its own messages next to each field */}
      <form onSubmit={onSubmit} className={s.formEl} noValidate>
        <div className={s.two}>
          <div className={s.field}>
            <label htmlFor="f-name">Name</label>
            <input
              id="f-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              maxLength={120}
              aria-invalid={!!fieldError("name")}
              aria-describedby={describe("name")}
            />
            {fieldError("name") && (
              <span id="f-name-err" className={s.ferr}>
                {fieldError("name")}
              </span>
            )}
          </div>
          <div className={s.field}>
            <label htmlFor="f-email">Work email</label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@lender.in"
              required
              maxLength={254}
              aria-invalid={!!fieldError("email")}
              aria-describedby={describe("email")}
            />
            {fieldError("email") && (
              <span id="f-email-err" className={s.ferr}>
                {fieldError("email")}
              </span>
            )}
          </div>
        </div>
        <div className={s.field}>
          <label htmlFor="f-org">Organisation</label>
          <input
            id="f-org"
            name="organisation"
            type="text"
            autoComplete="organization"
            placeholder="NBFC, bank or utility"
            required
            maxLength={160}
            aria-invalid={!!fieldError("organisation")}
            aria-describedby={describe("organisation")}
          />
          {fieldError("organisation") && (
            <span id="f-organisation-err" className={s.ferr}>
              {fieldError("organisation")}
            </span>
          )}
        </div>
        <div className={s.field}>
          <label htmlFor="f-size">Accounts in collection</label>
          <select
            id="f-size"
            name="accountsBand"
            required
            defaultValue={ACCOUNTS_BANDS[0].value}
            aria-invalid={!!fieldError("accountsBand")}
            aria-describedby={describe("accountsBand")}
          >
            {ACCOUNTS_BANDS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {fieldError("accountsBand") && (
            <span id="f-accountsBand-err" className={s.ferr}>
              {fieldError("accountsBand")}
            </span>
          )}
        </div>

        <p className={s.alert} role="alert">
          {err?.message ?? ""}
        </p>

        <button type="submit" className={`btn btn-blue ${s.full}`}>
          Request a pilot <span className="arr">→</span>
        </button>
        <p className="fine">We reply within two working days.</p>
      </form>
    </div>
  );
}
