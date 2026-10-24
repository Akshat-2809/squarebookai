"use client";

import { useEffect, useState } from "react";
import { fmt } from "@/lib/format";
import { useReducedMotion } from "@/lib/useReducedMotion";
import s from "./Hero.module.css";

const START = 18400;
// Balance after each ledger row lands: bill fix, fee reversal, UPI part 1, UPI part 2.
const BALANCES = [18400, 11550, 10960, 6960, 0];
const FIRST_STEP_MS = 1100;
const STEP_GAP_MS = 1150;
const TWEEN_MS = 750;
const HOLD_MS = 5600;
const SETTLED = 5;

const ROWS = [
  { ic: "B", fix: true, label: "Billing error corrected", sub: "EMI debited twice · 03 Sep", amt: "−6,850" },
  { ic: "F", fix: true, label: "Late fee reversed", sub: "Charged during waiver", amt: "−590" },
  { ic: "₹", fix: false, label: "UPI payment", sub: "Plan part 1 · 06 Sep", amt: "−4,000" },
  { ic: "₹", fix: false, label: "UPI payment", sub: "Plan part 2 · 30 Sep", amt: "−6,960" },
];

export function KhataCard() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [bal, setBal] = useState(START);

  useEffect(() => {
    if (reduced) return;
    let dead = false;
    let raf = 0;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const tween = (from: number, to: number, ms: number) => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const frame = (now: number) => {
        if (dead) return;
        const k = Math.min(1, (now - t0) / ms);
        const e = 1 - Math.pow(1 - k, 3);
        setBal(Math.round(from + (to - from) * e));
        if (k < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];
      [1, 2, 3, 4].forEach((p, i) => {
        timers.push(
          setTimeout(() => {
            setPhase(p);
            tween(BALANCES[p - 1], BALANCES[p], TWEEN_MS);
          }, FIRST_STEP_MS + i * STEP_GAP_MS),
        );
      });
      const settleAt = FIRST_STEP_MS + 4 * STEP_GAP_MS;
      timers.push(setTimeout(() => setPhase(SETTLED), settleAt));
      timers.push(
        setTimeout(() => {
          if (dead) return;
          setPhase(0);
          setBal(START);
          run();
        }, settleAt + HOLD_MS),
      );
    };

    run();
    return () => {
      dead = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const shownPhase = reduced ? SETTLED : phase;
  const shownBal = reduced ? 0 : bal;
  const settled = shownPhase >= SETTLED;
  const pct = Math.round(((START - shownBal) / START) * 100);

  return (
    <>
      <div
        className={s.khata}
        role="img"
        aria-label="Sample account: an overdue balance of 18,400 rupees reduced to zero by a billing correction, a fee reversal and two UPI payments, then marked squared"
      >
        <div className={s.khtop}>
          <div className={s.av}>RK</div>
          <div className={s.khname}>
            <b>Ramesh K.</b>
            <span>Two-wheeler loan · LN-20418</span>
          </div>
          <span className={`${s.status} ${settled ? s.stDone : s.stOver}`}>{settled ? "Squared" : "Overdue"}</span>
        </div>
        <div>
          <div className={s.amtlab}>Outstanding</div>
          <div className={s.amtwrap}>
            <div className={`${s.amt} ${settled ? s.strikeOn : ""}`}>
              ₹{fmt(shownBal)}
              <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 20 C 80 8, 190 22, 296 10" />
              </svg>
            </div>
            <span className={`${s.chukta} ${settled ? s.chuktaOn : ""}`}>squared!</span>
          </div>
        </div>
        <div className={s.bar}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className={s.barmeta}>
          <span>Recovered ₹{fmt(START - shownBal)}</span>
          <span>{pct}%</span>
        </div>
        <div className={s.rows}>
          {ROWS.map((r, i) => (
            <div key={i} className={`${s.row} ${shownPhase >= i + 1 ? s.in : ""}`}>
              <span className={`${s.ic} ${r.fix ? s.icFix : s.icPay}`}>{r.ic}</span>
              <span className={s.rowt}>
                {/* Inner span matches the approved render: `.rowt span` styles the label text too. */}
                <b>
                  <span>{r.label}</span>
                </b>
                <span>{r.sub}</span>
              </span>
              <span className={s.rowa}>{r.amt}</span>
            </div>
          ))}
        </div>
        <span className="fine">Sample account · not real data</span>
      </div>
      <div className={`${s.receipt} ${settled ? s.receiptOn : ""}`} aria-hidden="true">
        <span>RECEIPT No. 0421</span>
        <b>Account closed</b>
        <span className="rcrow">
          <span>Last payment</span>
          <span>₹6,960</span>
        </span>
        <span className="rcrow">
          <span>Mode</span>
          <span>UPI</span>
        </span>
        <span className="rcrow">
          <span>Date</span>
          <span>30 Sep 2026</span>
        </span>
        <span>Closure letter sent</span>
      </div>
    </>
  );
}
