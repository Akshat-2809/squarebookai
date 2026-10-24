import s from "./Statement.module.css";

export function Statement() {
  return (
    <section className={s.statement}>
      <div className="wrap">
        <p className={s.sweep}>
          <span className={s.sweepIn}>
            Most collection tools start by dialling. Squarebook starts by <em>reading the bill</em>, because part of
            every overdue book was never really owed.
          </span>
        </p>
      </div>
    </section>
  );
}
