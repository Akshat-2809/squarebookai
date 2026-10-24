import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Geist, Geist_Mono, Kalam, Noto_Sans_Devanagari } from "next/font/google";
import { CONTACT_EMAIL, FOUNDER_EMAIL, FOUNDER_LINKEDIN, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// latin-ext carries the ₹ glyph (U+20B9) for these faces.
const familjen = Familjen_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-familjen", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });
const kalam = Kalam({ subsets: ["latin"], weight: "700", variable: "--font-kalam", display: "swap" });
// Fallback for Devanagari glyphs in the hand-written face; only fetched if such glyphs render.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F7FB",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: CONTACT_EMAIL,
  description: "Collections and billing disputes for Indian lenders.",
  founder: {
    "@type": "Person",
    name: "Sampanna Kanungo",
    jobTitle: "Co-founder",
    email: FOUNDER_EMAIL,
    sameAs: [FOUNDER_LINKEDIN],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${familjen.variable} ${geist.variable} ${geistMono.variable} ${kalam.variable} ${devanagari.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
