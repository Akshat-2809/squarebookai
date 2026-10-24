import { Fragment } from "react";
import { Scrolly, type Step } from "./Scrolly";
import s from "./HowItWorks.module.css";

const STEPS: Step[] = [
  {
    k: "01 · Arrives",
    title: "The account lands with its whole history.",
    body: "From your core banking or loan system, with every EMI, NACH attempt, fee and past conversation attached. Nobody starts from a phone number and a figure.",
  },
  {
    k: "02 · Bill check",
    title: "Errors are fixed before anyone is chased.",
    body: "Duplicate debits, payments that never posted, fees charged during a waiver. Squarebook finds them, corrects the balance, and only then makes contact.",
  },
  {
    k: "03 · Conversation",
    title: "A message the borrower can actually reply to.",
    body: "On WhatsApp at 10:12 am, in Hinglish, inside the permitted contact window. The borrower explains. Squarebook listens and offers a plan your policy already allows.",
  },
  {
    k: "04 · Plan",
    title: "Two payments instead of a default.",
    body: "₹4,000 by UPI link the same day, the rest by month end. A reminder goes out the day before, never a threat.",
  },
  {
    k: "05 · Closed",
    title: "Receipt, closure letter, bureau update.",
    body: "The account closes with a paper trail for the borrower and an audit trail for you. All square.",
  },
];

function Chip({ label, tag, tone }: { label: string; tag: string; tone: "y" | "g" | "b" }) {
  const toneCls = { y: s.tgY, g: s.tgG, b: s.tgB }[tone];
  return (
    <div className={s.vchip}>
      <span>{label}</span>
      <span className={`${s.tg} ${toneCls}`}>{tag}</span>
    </div>
  );
}

const VISUALS = [
  <Fragment key="arrives">
    <Chip label="Loan ledger and EMI schedule" tag="Finacle" tone="b" />
    <Chip label="NACH mandate attempts" tag="14 events" tone="b" />
    <Chip label="Fees and waivers" tag="3 rules" tone="b" />
    <Chip label="Past calls and messages" tag="2 threads" tone="b" />
  </Fragment>,
  <Fragment key="bill-check">
    <Chip label="EMI debited twice · 03 Sep" tag="−₹6,850" tone="y" />
    <Chip label="Late fee charged during waiver" tag="−₹590" tone="y" />
    <Chip label="Balance corrected before contact" tag="₹10,960" tone="g" />
  </Fragment>,
  <Fragment key="conversation">
    <span className={`mono ${s.muted}`}>WhatsApp · Hinglish · 10:12 am</span>
    <div className="bub-in">Is mahine salary late aayi hai, poora EMI nahi de paunga.</div>
    <div className="bub-out">
      Samajh sakte hain, Ramesh ji. EMI do baar kata tha, ₹6,850 adjust ho gaya. ₹4,000 abhi aur ₹6,960 30 Sep tak,
      chalega?
    </div>
  </Fragment>,
  <Fragment key="plan">
    <span className={`mono ${s.muted}`}>Plan inside policy P-3</span>
    <div className={s.split}>
      <div className={s.part1}>₹4,000 · 06 Sep</div>
      <div className={s.part2}>₹6,960 · 30 Sep</div>
    </div>
    <Chip label="UPI link sent in chat" tag="Paid" tone="g" />
  </Fragment>,
  <Fragment key="closed">
    <Chip label="Receipt No. 0421" tag="Sent" tone="g" />
    <Chip label="Closure letter" tag="Sent" tone="g" />
    <Chip label="Credit bureau update" tag="Filed" tone="g" />
    <span className={s.stamp}>squared!</span>
  </Fragment>,
];

export function HowItWorks() {
  return (
    <section id="how" className={s.how}>
      <div className="wrap">
        <div className="sechead rv">
          <span className="eyebrow">
            <i />
            How an account moves
          </span>
          <h2 className="h2">
            One overdue account, from ₹18,400 to <span className={`hand ${s.hand}`}>all square</span>.
          </h2>
        </div>
        <Scrolly steps={STEPS} visuals={VISUALS} />
      </div>
    </section>
  );
}
