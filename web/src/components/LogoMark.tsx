import { ACCENT } from "@/lib/site";

type Props = { size: number; variant?: "navy" | "yellow" };

/** The Squarebook mark: a ring on a rounded tile, crossed by the accent stroke. */
export function LogoMark({ size, variant = "navy" }: Props) {
  const tile = variant === "navy" ? "#0E1330" : "#FFE36B";
  const ring = variant === "navy" ? "#FFE36B" : "#0E1330";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={tile} />
      <circle cx="20" cy="20" r="9.5" fill="none" stroke={ring} strokeWidth="4" />
      <path d="M6 23.5 L34 16.5" stroke={ACCENT} strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}
