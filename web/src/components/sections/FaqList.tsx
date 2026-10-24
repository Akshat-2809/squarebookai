"use client";

import { useState } from "react";
import s from "./Faq.module.css";

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  // First question starts open; only one is open at a time.
  const [open, setOpen] = useState(0);

  return (
    <div className={`rv ${s.list}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`${s.q} ${isOpen ? s.open : ""}`}>
            <h3 className={s.qh}>
              <button
                type="button"
                className={s.qb}
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <span className={s.qi} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div className={s.qa} id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={!isOpen}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
