"use client";

import { useEffect, useState } from "react";
import s from "./Hero.module.css";

const LINE_PX = 24;
const EVERY_MS = 2600;

const LINES: [string, string][] = [
  ["Bill error found", " · ₹6,850 on LN-20418"],
  ["Plan agreed", " on WhatsApp · Hinglish"],
  ["Call queued", " for 08:00 · outside window"],
  ["Hardship detected", " · handed to a person"],
  ["Account closed", " · receipt sent"],
];

export function Ticker() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => (n + 1) % LINES.length), EVERY_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={s.ticker} aria-live="off">
      <span className="livepill">
        <span className="dot" />
        Live desk
      </span>
      <div className={s.tickwin}>
        <div className={s.ticklist} style={{ transform: `translateY(-${tick * LINE_PX}px)` }}>
          {LINES.map(([b, rest]) => (
            <span key={b}>
              <b>{b}</b>
              {rest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
