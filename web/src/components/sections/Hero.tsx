import { HandUnderline } from "@/components/HandUnderline";
import { KhataCard } from "./KhataCard";
import { Ticker } from "./Ticker";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <section className={s.hero} id="top">
      <div className={s.rules} aria-hidden="true" />
      <div className={s.margin} aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />
      <div className={`wrap ${s.herogrid}`}>
        <div className={s.herocopy}>
          <span className="eyebrow">
            <i />
            Collections for Indian lenders
          </span>
          <h1 className={s.h1}>
            <span className={s.ln}>
              <span>All</span>
            </span>
            <span className={s.ln}>
              <span className="hand">
                square.
                <HandUnderline />
              </span>
            </span>
          </h1>
          <p className={s.sub}>
            <b>Recover the money.</b> Keep the customer.
          </p>
          <p className="lede">
            Squarebook checks the bill before it chases it, talks to borrowers on WhatsApp, voice and SMS in their own
            language, agrees plans inside your policy, and keeps every contact within RBI&apos;s recovery rules.
          </p>
          <div className={s.ctas}>
            <a className="btn btn-blue" href="#pilot">
              Request a pilot <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="#how">
              See one account close
            </a>
          </div>
          <Ticker />
        </div>

        <div className={s.stage}>
          <KhataCard />
          <div className={`${s.float} ${s.f1}`} aria-hidden="true">
            <span className={s.wa}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
              </svg>
            </span>
            <span>&quot;Haan, ye theek hai. Shukriya.&quot;</span>
          </div>
          <div className={`${s.float} ${s.f2}`} aria-hidden="true">
            <span className={`${s.wa} ${s.waClock}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <span className="mono">Contact window 08:00–19:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
