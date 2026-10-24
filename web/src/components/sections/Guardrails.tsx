import s from "./Guardrails.module.css";

const MAY = [
  "Remind borrowers what is due and why, with the bill attached",
  "Correct billing errors it can prove from your records",
  "Offer plans and waivers inside the limits you set",
  "Send UPI and card payment links, and receipts",
  "Hand any account to a person, with a written summary",
];

const NEVER = [
  "Contacts anyone before 08:00 or after 19:00",
  "Discusses the debt with family, neighbours or an employer",
  "Threatens, shames or uses abusive language",
  "Pretends to be a person, or hides that it is software",
  "Contacts a borrower who is paused for hardship",
];

const RULES = [
  ["08–19", "Contact hours, borrower's local time"],
  ["9", "Languages, from approved scripts"],
  ["100%", "Of contacts logged with script and consent"],
  ["1 tap", "For the borrower to reach a person"],
];

function Tick() {
  return (
    <span className={`${s.mk} ${s.mkY}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12l5 5 9-10" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className={`${s.mk} ${s.mkN}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

export function Guardrails() {
  return (
    <section className={`sec ${s.dark}`} id="guardrails">
      <div className="wrap">
        <div className="sechead rv">
          <span className="eyebrow">
            <i />
            Guardrails
          </span>
          <h2 className={`h2 ${s.title}`}>It chases the balance. Never the person.</h2>
          <p className="lede">These limits are built in. You can make them stricter. You cannot switch them off.</p>
        </div>
        <div className={s.gr}>
          <div className={`${s.grc} rv`}>
            <h3>Squarebook may</h3>
            <ul className={s.gl}>
              {MAY.map((item) => (
                <li key={item}>
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.grc} rv`}>
            <h3>Squarebook never</h3>
            <ul className={s.gl}>
              {NEVER.map((item) => (
                <li key={item}>
                  <Cross />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.rulesrow}>
          {RULES.map(([big, small]) => (
            <div key={big} className={`${s.rule} rv`}>
              <b>{big}</b>
              <span>{small}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
