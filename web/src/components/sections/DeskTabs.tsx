"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import s from "./Desk.module.css";

export type DeskTab = { id: string; label: string; n: string; desc: string; title: string };

export type DeskPanel = { content: ReactNode; log?: boolean };

type Props = { tabs: DeskTab[]; panels: DeskPanel[] };

export function DeskTabs({ tabs, panels }: Props) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    select(next[e.key]);
  };

  return (
    <div className={`${s.desk} rv`}>
      <div className={s.tabs} role="tablist" aria-label="Product modules" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`desk-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`desk-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              className={`${s.tab} ${on ? s.on : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={s.tt}>
                {t.label} <span className={s.tn}>{t.n}</span>
              </span>
              <span className={s.td}>{t.desc}</span>
            </button>
          );
        })}
      </div>
      <div className={s.win}>
        <div className={s.winbar}>
          <span className={s.lights}>
            <i />
            <i />
            <i />
          </span>
          <span>{tabs[active].title}</span>
          <span className={s.sample}>Sample data</span>
        </div>
        {panels.map((panel, i) => (
          <div
            key={tabs[i].id}
            role="tabpanel"
            id={`desk-panel-${tabs[i].id}`}
            aria-labelledby={`desk-tab-${tabs[i].id}`}
            tabIndex={0}
            hidden={i !== active}
            className={`${s.panel} ${panel.log ? s.log : ""}`}
          >
            {panel.content}
          </div>
        ))}
      </div>
    </div>
  );
}
