import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons are shown square and rounded by iOS, so the mark fills the canvas edge to edge.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0E1330" }}>
        <svg width="180" height="180" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="9.5" fill="none" stroke="#FFE36B" strokeWidth="4" />
          <path d="M6 23.5 L34 16.5" stroke="#2A3BD8" strokeWidth="4.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
