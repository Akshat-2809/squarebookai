import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import s from "./SimplePage.module.css";

type Props = { eyebrow: string; title: ReactNode; children: ReactNode; actions?: ReactNode };

/** Shell for short standalone pages (the 404): nav, a single text block, footer. */
export function SimplePage({ eyebrow, title, children, actions }: Props) {
  return (
    <>
      <Nav />
      <main className={s.page}>
        <div className={`wrap ${s.inner}`}>
          <span className="eyebrow">
            <i />
            {eyebrow}
          </span>
          <h1 className={s.title}>{title}</h1>
          <div className={`lede ${s.body}`}>{children}</div>
          {actions && <div className={s.actions}>{actions}</div>}
        </div>
      </main>
      <Footer />
    </>
  );
}
