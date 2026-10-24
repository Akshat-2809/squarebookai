"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { fmt } from "@/lib/format";
import s from "./HowItWorks.module.css";

export type Step = { k: string; title: string; body: string };

// Outstanding balance shown on the card while each step is active.
const STORY_BALANCES = [18400, 10960, 10960, 6960, 0];
// A step becomes active once its top edge passes 55% of the viewport height.
const ACTIVE_LINE = 0.55;

type Props = { steps: Step[]; visuals: ReactNode[] };

export function Scrolly({ steps, visuals }: Props) {
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter((el): el is HTMLDivElement => el !== null);
    // The observer only says *when* to look. Each time it fires, every step is re-measured,
    // because after a jump (anchor link, Home key) some steps change position without
    // changing their intersection state, and would otherwise keep a stale value.
    const io = new IntersectionObserver(
      () => {
        const line = window.innerHeight * ACTIVE_LINE;
        let best = 0;
        els.forEach((el, i) => {
          if (el.getBoundingClientRect().top < line) best = i;
        });
        setStep(best);
      },
      // Shrink the root to the top 55% of the viewport, so crossing that line triggers a check.
      { rootMargin: `0px 0px -${Math.round((1 - ACTIVE_LINE) * 100)}% 0px` },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.scrolly}>
      <div className={s.sticky}>
        <div className={s.story}>
          <div className={s.storyhead}>
            <span>LN-20418 · Ramesh K.</span>
            <span>Step {step + 1} of 5</span>
          </div>
          <div className={s.balwrap}>
            <span className={`mono ${s.muted}`}>Outstanding</span>
            <span className={`${s.storybal} ${step === 4 ? s.zero : ""}`}>₹{fmt(STORY_BALANCES[step])}</span>
          </div>
          <div className={s.track5}>
            {steps.map((_, i) => (
              <i key={i} className={i <= step ? s.on : undefined} />
            ))}
          </div>
          {visuals.map((v, i) => (
            <div key={i} className={s.vis} hidden={i !== step}>
              {v}
            </div>
          ))}
        </div>
      </div>
      <div className={s.steps}>
        {steps.map((st, i) => (
          <div
            key={st.k}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={`${s.step} ${i === step ? s.act : ""}`}
          >
            <span className={s.k}>{st.k}</span>
            <h3>{st.title}</h3>
            <p>{st.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
