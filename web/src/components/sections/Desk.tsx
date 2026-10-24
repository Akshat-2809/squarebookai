import { DeskTabs, type DeskPanel, type DeskTab } from "./DeskTabs";
import { PlanBuilder } from "./PlanBuilder";
import s from "./Desk.module.css";

const TABS: DeskTab[] = [
  { id: "bill", label: "Bill Check", n: "01", desc: "Every account is reconciled against payments, mandates and fee rules before the first message.", title: "bill-check / two-wheeler book" },
  { id: "conv", label: "Conversations", n: "02", desc: "WhatsApp, voice and SMS in nine languages, only inside the hours and limits you set.", title: "contact-window / today" },
  { id: "plan", label: "Plans", n: "03", desc: "Instalments, waivers and settlements inside your policy. Try the instalment picker.", title: "plan-builder / LN-21177" },
  { id: "care", label: "Care", n: "04", desc: "Hardship is detected, automated contact pauses, and a trained person takes over.", title: "care / HL-08812" },
  { id: "audit", label: "Audit Trail", n: "05", desc: "Time, channel, script, consent and outcome for every contact. Unusual payments held.", title: "audit-trail / 24 Oct" },
  { id: "book", label: "Book Health", n: "06", desc: "Watch the overdue book shrink, by product, bucket and language.", title: "book-health / overdue book" },
];

const BILL_ROWS = [
  ["LN-20418", "EMI debited twice on 03 Sep", "₹6,850", "c-g", "Refund, then contact"],
  ["CC-77102", "₹12,000 paid 28 Aug, not posted", "₹12,000", "c-r", "Stop all contact"],
  ["LN-19877", "Late fee during moratorium", "₹590", "c-g", "Reverse fee"],
  ["EL-55310", "Estimated meter reading, 4 months", "₹3,214", "c-w", "Request re-read"],
];

const CONV_ROWS = [
  ["Farah S.", "Reminder for plan part 2", "WhatsApp", "c-b", "Queued 08:00"],
  ["Joseph P.", "Callback he asked for", "Voice", "c-b", "Queued 10:30"],
  ["Anita R.", "Second call today", "Voice", "c-r", "Blocked · daily cap"],
  ["Ramesh K.", "Receipt and closure letter", "WhatsApp", "c-g", "Sent 18:51"],
];

const AUDIT_ROWS = [
  ["10:12:04 · WA · LN-20418 · script v14", "c-g", "Within window"],
  ["10:12:40 · WA · LN-20418 · plan P-3 offered", "c-g", "Within limits"],
  ["11:05:19 · UPI · CC-77102 · third-party handle", "c-r", "Held for review"],
  ["14:31:02 · Voice · HL-08812 · hardship", "c-b", "Paused · person"],
  ["19:42:10 · Voice · LN-19011 · outside window", "c-w", "Blocked, queued"],
];

// Overdue book by week as % of the ₹5.0 crore axis; odd weeks are labelled.
const BARS = [96.4, 94.2, 91, 88, 85.6, 82, 79.2, 76.2, 74, 70.4, 68.2, 66];

const INTEGRATIONS = [
  "Finacle",
  "Oracle FLEXCUBE",
  "Salesforce",
  "WhatsApp Business Platform",
  "Twilio",
  "Exotel",
  "Intercom",
  "Razorpay",
  "Cashfree",
  "UPI AutoPay",
  "Account Aggregator",
  "REST API",
];

const PANELS: DeskPanel[] = [
  {
    content: (
      <>
        <div className={s.kpis}>
          <div className={s.kpi}><small>Accounts checked</small><b>12,480</b></div>
          <div className={s.kpi}><small>Billing errors</small><b>412</b></div>
          <div className={s.kpi}><small>Not actually owed</small><b>₹38.6 L</b></div>
        </div>
        <div className={s.tbl}>
          <div className={`${s.tr} ${s.th}`}><span>Account</span><span>Finding</span><span className={s.right}>Amount</span><span>Action</span></div>
          {BILL_ROWS.map(([acc, finding, amt, tone, action]) => (
            <div key={acc} className={s.tr}>
              <span className="mono">{acc}</span>
              <span>{finding}</span>
              <span className={`mono ${s.right}`}>{amt}</span>
              <span className={`chip ${tone}`}>{action}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className={s.clockpad}>
          <div className={s.clock} role="img" aria-label="Contact allowed from 08:00 to 19:00. It is 19:42, outside the window.">
            <div className={s.allowed} />
            <div className={s.now} />
          </div>
        </div>
        <div className={s.hours}><span>00:00</span><span>08:00</span><span>12:00</span><span>19:00</span><span>24:00</span></div>
        <div className={s.tbl}>
          <div className={`${s.tr} ${s.th}`}><span>Borrower</span><span>Next step</span><span>Channel</span><span>Status</span></div>
          {CONV_ROWS.map(([who, next, channel, tone, status]) => (
            <div key={who} className={s.tr}>
              <span>{who}</span>
              <span>{next}</span>
              <span className="mono">{channel}</span>
              <span className={`chip ${tone}`}>{status}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  { content: <PlanBuilder /> },
  {
    content: (
      <>
        <div className={`bub-in ${s.careMsg}`}>Mere pati ka accident hua hai, woh hospital mein hain. Abhi kuch nahi kar sakti.</div>
        <div className={s.pl}><span>Detected</span><span className="chip c-w">Medical emergency in family</span></div>
        <div className={s.pl}><span>Automated reminders</span><span className="chip c-g">Paused for 30 days</span></div>
        <div className={s.pl}><span>Assigned to</span><span>Priya N. · hardship desk</span></div>
        <div className={`${s.pl} ${s.last}`}><span>Shared with borrower</span><span>[Counselling partner] helpline</span></div>
      </>
    ),
  },
  {
    log: true,
    content: (
      <>
        {AUDIT_ROWS.map(([line, tone, note], i) => (
          <div key={line} className={`${s.pl} ${i === AUDIT_ROWS.length - 1 ? s.last : ""}`}>
            <span>{line}</span>
            <span className={`chip ${tone}`}>{note}</span>
          </div>
        ))}
      </>
    ),
  },
  {
    content: (
      <>
        <div className={s.chart} role="img" aria-label="Overdue book over 12 weeks, falling from 4.82 crore to 3.30 crore rupees">
          <div className={s.yax}><span>5.0</span><span>2.5</span><span>0</span></div>
          <div className={s.plot}>
            {BARS.map((h, i) => {
              const week = i + 1;
              const isLast = week === BARS.length;
              return (
                <div key={week} className={`${s.b} ${isLast ? s.lastBar : ""}`} style={{ height: `${h}%` }}>
                  {(week % 2 === 1 || isLast) && <span>W{week}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className={s.kpis}>
          <div className={s.kpi}><small>Overdue book, ₹ crore</small><b>3.30</b></div>
          <div className={s.kpi}><small>12-week change</small><b>−31.5%</b></div>
          <div className={s.kpi}><small>Plans kept</small><b>[PILOT]</b></div>
        </div>
      </>
    ),
  },
];

export function Desk() {
  return (
    <section className="sec" id="desk">
      <div className="wrap">
        <div className="sechead rv">
          <span className="eyebrow">
            <i />
            The collections desk
          </span>
          <h2 className="h2">Everything between the overdue notice and the closure letter.</h2>
        </div>
        <DeskTabs tabs={TABS} panels={PANELS} />

        <div className={`rv ${s.intsWrap}`}>
          <span className="fine">Works with the systems you already run</span>
          <div className={s.ints}>
            <div className={s.track}>
              {/* second copy keeps the loop seamless; hidden from screen readers */}
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <span key={i} className={s.int} aria-hidden={i >= INTEGRATIONS.length || undefined}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
