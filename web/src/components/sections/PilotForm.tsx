"use client";

import { useActionState, useEffect, useRef } from "react";
import { requestPilot } from "@/app/actions/pilot";
import { ACCOUNTS_BANDS, type PilotField, type PilotState } from "@/lib/pilot/options";
import s from "./PilotCta.module.css";

const initialState: PilotState = { status: "idle" };

export function PilotForm() {
  const [state, formAction, pending] = useActionState(requestPilot, initialState);
  const slipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") slipRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className={s.form}>
        <div className={s.slip} ref={slipRef} tabIndex={-1} role="status">
          <span>PILOT REQUEST · No. {state.reference}</span>
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
  const fieldError = (f: PilotField) => err?.fieldErrors?.[f];
  const value = (f: PilotField) => err?.values?.[f];
  const describe = (f: PilotField) => (fieldError(f) ? `f-${f}-err` : undefined);

  return (
    <div className={s.form}>
      <form action={formAction} className={s.formEl} aria-busy={pending}>
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
              defaultValue={value("name")}
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
              defaultValue={value("email")}
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
            defaultValue={value("organisation")}
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
            // key re-mounts the select so a returned value is re-applied after React resets the form
            key={value("accountsBand") ?? "default"}
            defaultValue={value("accountsBand") ?? ACCOUNTS_BANDS[0].value}
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

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div className={s.trap} aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <p className={s.alert} role="alert">
          {err?.message ?? ""}
        </p>
        <p className="sr-only" aria-live="polite">
          {pending ? "Sending your request" : ""}
        </p>

        <button type="submit" className={`btn btn-blue ${s.full}`} disabled={pending}>
          {pending ? (
            <>
              <span className={s.spinner} aria-hidden="true" />
              Sending request…
            </>
          ) : (
            <>
              Request a pilot <span className="arr">→</span>
            </>
          )}
        </button>
        <p className="fine">We reply within two working days.</p>
      </form>
    </div>
  );
}
