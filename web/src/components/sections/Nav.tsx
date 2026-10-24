import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import s from "./Nav.module.css";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#desk", label: "Product" },
  { href: "/#guardrails", label: "Guardrails" },
  { href: "/#founder", label: "Founder" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className={s.nav}>
      <div className={`wrap ${s.navin}`}>
        <Link className="logo" href="/#top" aria-label="Squarebook home">
          <LogoMark size={34} />
          <span className="wm">squarebook</span>
        </Link>
        <nav className={s.navlinks} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} className={s.navlink} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <span className="livepill">
          <span className="dot" />
          Desk live
        </span>
        <Link className="btn btn-blue" href="/#pilot">
          Request a pilot
        </Link>
      </div>
    </header>
  );
}
