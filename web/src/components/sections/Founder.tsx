import Image from "next/image";
import { FOUNDER_EMAIL, FOUNDER_LINKEDIN } from "@/lib/site";
import portrait from "@/assets/founder/sampanna-kanungo.jpg";
import s from "./Founder.module.css";

const CAREER = [
  ["SEP 2024 –", "Co-founder", "Gurugram"],
  ["AUG 2021 – SEP 2023", "Energy Specialist, Credit · E.ON Next", "Manchester, United Kingdom"],
  ["JUN 2013 – MAR 2018", "Operations Officer, then Manager · Punjab National Bank", "Rourkela, Odisha"],
  ["APR 2010 – APR 2011", "Relationship Manager, Wealth · ING Vysya Bank", "Lucknow"],
];

export function Founder() {
  return (
    <section className="sec" id="founder">
      <div className={`wrap ${s.fgrid}`}>
        <div className={`${s.photo} rv`}>
          <div className={s.portraitWrap}>
            <Image
              src={portrait}
              alt="Sampanna Kanungo, co-founder of Squarebook"
              className={s.portrait}
              placeholder="blur"
              sizes="(max-width: 1000px) 72vw, 340px"
            />
          </div>
          <div className={s.caption}>
            <div className={s.who}>
              <span className={s.name}>Sampanna Kanungo</span>
              <span className="fine">Co-founder · Gurugram</span>
            </div>
            <div className={s.links}>
              <a
                className={s.contactBtn}
                href={`mailto:${FOUNDER_EMAIL}`}
                aria-label={`Email Sampanna Kanungo at ${FOUNDER_EMAIL}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Email
              </a>
              <a
                className={`${s.contactBtn} ${s.li}`}
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sampanna Kanungo on LinkedIn (opens in a new tab)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className={`rv ${s.copy}`}>
          <span className="eyebrow">
            <i />
            Why Squarebook exists
          </span>
          <h2 className={`h2 ${s.title}`}>Built by someone who has worked both sides of an overdue account.</h2>
          <p className="lede">
            At Punjab National Bank, Sampanna ran branch operations in Rourkela, authorising high-value transactions and
            leading a team of nine. At E.ON Next in the UK she worked on shrinking the debt book: investigating accounts
            where debt had built up through billing errors, having hard conversations with customers, and pointing them
            to debt charities when they needed more than a payment plan. Squarebook brings that way of working to Indian
            lenders.
          </p>
          <div className={s.career}>
            {CAREER.map(([d, role, place]) => (
              <div key={d} className={s.cr}>
                <span className={s.d}>{d}</span>
                <span className={s.r}>
                  <b>{role}</b>
                  <span>{place}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
