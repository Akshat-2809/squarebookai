import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Squarebook — All square. Recover the money. Keep the customer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));

// Read at module scope so the image is prerendered at build time.
const [display, hand, mono] = await Promise.all([
  font("FamiljenGrotesk-Bold.ttf"),
  font("Kalam-Bold.ttf"),
  font("GeistMono-Medium.ttf"),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0B0F2A",
          backgroundImage:
            "radial-gradient(circle at 88% 18%, rgba(255,227,107,.22), transparent 42%), radial-gradient(circle at 100% 110%, rgba(91,107,255,.35), transparent 45%)",
          color: "#E7E9F7",
          fontFamily: "Familjen Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#FFE36B" />
            <circle cx="20" cy="20" r="9.5" fill="none" stroke="#0E1330" strokeWidth="4" />
            <path d="M6 23.5 L34 16.5" stroke="#2A3BD8" strokeWidth="4.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 48, letterSpacing: "-0.045em", color: "#FFFFFF" }}>squarebook</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 32, fontSize: 168, lineHeight: 0.9, letterSpacing: "-0.055em" }}>
            <span style={{ color: "#FFFFFF" }}>All</span>
            <span style={{ display: "flex", flexDirection: "column", fontFamily: "Kalam", color: "#FFE36B", letterSpacing: "-0.02em" }}>
              square.
              <svg width="420" height="26" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ marginTop: -8 }}>
                <path d="M3 9 C 50 2, 120 2, 197 7" fill="none" stroke="#9AA5FF" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 44, letterSpacing: "-0.02em", color: "#A9AED0" }}>
            <span style={{ color: "#FFFFFF" }}>Recover the money.</span>
            <span>Keep the customer.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A9AED0" }}>
          <span>Collections for Indian lenders</span>
          <span style={{ color: "#FFE36B" }}>squarebookai.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Familjen Grotesk", data: display, weight: 700, style: "normal" },
        { name: "Kalam", data: hand, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
