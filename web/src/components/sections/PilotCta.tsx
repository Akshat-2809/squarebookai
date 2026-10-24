import { HandUnderline } from "@/components/HandUnderline";
import { PilotForm } from "./PilotForm";
import s from "./PilotCta.module.css";

export function PilotCta() {
  return (
    <section className={`sec ${s.ctaband}`} id="pilot">
      <div className={`wrap ${s.cta}`}>
        <div className={s.copy}>
          <span className={`eyebrow ${s.eyebrowInk}`}>
            <i />
            Start a pilot
          </span>
          <h2 className={s.ctah}>
            Make your book{" "}
            <span className="hand">
              square.
              <HandUnderline />
            </span>
          </h2>
          <p className={`lede ${s.ledeInk}`}>
            We run the bill check on a slice of your overdue book first, and show you how much was never owed before we
            talk to a single borrower.
          </p>
        </div>
        <PilotForm />
      </div>
    </section>
  );
}
