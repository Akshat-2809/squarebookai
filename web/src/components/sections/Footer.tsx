import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={s.foot}>
      <div className="wrap">
        <div className={s.footgrid}>
          <div className={s.fc}>
            <Link className={`logo ${s.logo}`} href="/#top" aria-label="Squarebook home">
              <LogoMark size={32} variant="yellow" />
              <span className={`wm ${s.wm}`}>squarebook</span>
            </Link>
            <p className={s.tagline}>
              To square the books: to settle every account until nothing is owed. Collections and billing disputes for
              Indian lenders.
            </p>
          </div>
          {/* Column titles are h2 (styled small) to keep the page's heading order valid. */}
          <nav className={s.fc} aria-labelledby="foot-product">
            <h2 id="foot-product">Product</h2>
            <Link href="/#desk">Bill Check</Link>
            <Link href="/#desk">Conversations</Link>
            <Link href="/#desk">Plans</Link>
            <Link href="/#desk">Audit Trail</Link>
          </nav>
          <nav className={s.fc} aria-labelledby="foot-company">
            <h2 id="foot-company">Company</h2>
            <Link href="/#founder">Founder</Link>
            <Link href="/#guardrails">Guardrails</Link>
            <Link href="/#pilot">Request a pilot</Link>
          </nav>
          <div className={s.fc}>
            <h2>Contact</h2>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <span>Gurugram, Haryana</span>
          </div>
        </div>
      </div>
      <div className={s.giant} aria-hidden="true">
        <span>squarebook</span>
      </div>
      <div className={`wrap ${s.legal}`}>
        <span>© 2026 Squarebook</span>
        <span>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> ·{" "}
          <Link href="/grievance">Grievance officer</Link>
        </span>
      </div>
    </footer>
  );
}
