"use client";

import { useState } from "react";
import { fmt } from "@/lib/format";
import s from "./Desk.module.css";

const TOTAL = 48200;
const OPTIONS = [3, 6, 9, 12];
// Freeze lengths and the policy limit an agent can apply without credit-team approval.
const FREEZE_LIMIT_DAYS = 30;

export function PlanBuilder() {
  const [months, setMonths] = useState(6);

  const inst = Math.ceil(TOTAL / months);
  const last = TOTAL - inst * (months - 1);
  const freeze = months <= 6 ? 30 : 60;
  const ok = freeze <= FREEZE_LIMIT_DAYS;

  return (
    <>
      <div className={s.pl}>
        <span>LN-21177 · Kavya M. · outstanding</span>
        <b>₹{fmt(TOTAL)}</b>
      </div>
      <div className={s.pickwrap}>
        <span className="fine">Choose instalments</span>
        <div className={s.pills} role="group" aria-label="Number of instalments">
          {OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              className={`${s.pill} ${n === months ? s.on : ""}`}
              aria-pressed={n === months}
              onClick={() => setMonths(n)}
            >
              {n} months
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className={`${s.pl} ${s.big}`}>
        <span>Monthly instalment</span>
        <b>₹{fmt(inst)}</b>
      </div>
      <div className={s.pl}>
        <span>Final instalment</span>
        <b>₹{fmt(last)}</b>
      </div>
      <div className={s.pl}>
        <span>
          Late fee waiver ₹1,180 <span className="chip c-g">Within limit</span>
        </span>
        <b>−1,180</b>
      </div>
      <div className={`${s.pl} ${s.last}`}>
        <span>
          Interest freeze, {freeze} days <span className={`chip ${ok ? "c-g" : "c-w"}`}>{ok ? "Within limit" : "Needs approval"}</span>
        </span>
        <span className="mono">{ok ? "Applied" : "Sent to credit team"}</span>
      </div>
    </>
  );
}
