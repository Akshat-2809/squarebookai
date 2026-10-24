import s from "./Marquee.module.css";

const SEGMENTS = [
  "NBFCs",
  "Microfinance",
  "Housing finance",
  "Credit cards",
  "Two-wheeler loans",
  "BNPL",
  "Electricity discoms",
  "Gold loans",
  "Co-operative banks",
];

export function Marquee() {
  return (
    <div
      className={s.marq}
      role="region"
      aria-label="Built for NBFCs, microfinance, housing finance, credit cards, two-wheeler loans, BNPL, electricity discoms, gold loans and co-operative banks"
    >
      {/* rendered twice so the -50% loop is seamless */}
      <div className={s.track} aria-hidden="true">
        {[...SEGMENTS, ...SEGMENTS].map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>
    </div>
  );
}
