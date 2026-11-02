# Squarebook — squarebookai.com

> **The forms deliver nothing.** The "Request a pilot" form is front-end only: it validates in the browser and shows the success receipt, but nothing is sent, stored or emailed. Visitors who want a pilot must email support@squarebookai.com, so that address must be a real, monitored mailbox.

Marketing site for Squarebook, a collections and billing-dispute platform for Indian lenders. It is a production port of the approved homepage design.

Everything lives in one Next.js 16 app in [`web/`](web/). There is no database, no email sending and no API.

```
squarebookai/
└── web/                         Next.js 16 (App Router, React 19, TypeScript), deployed to Vercel
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx         homepage: assembles the sections
    │   │   ├── layout.tsx       fonts, metadata, Organization JSON-LD
    │   │   ├── globals.css      design tokens + shared classes + keyframes
    │   │   ├── privacy/ terms/ grievance/   legal pages (shared layout: components/LegalDoc.tsx)
    │   │   ├── not-found.tsx    styled 404
    │   │   └── opengraph-image.tsx, twitter-image.tsx, icon.svg, apple-icon.tsx, sitemap.ts, robots.ts
    │   ├── components/sections/ one component + CSS Module per section
    │   └── lib/pilot/           zod schema and select options for the pilot form
    └── src/assets/fonts/        TTFs used only to render the OG image
```

## Sections and what runs in the browser

Sections are Server Components and ship no JavaScript, except the interactive pieces marked "client" below.

| Section | Component | Client JS |
|---|---|---|
| Nav | `Nav` | none |
| Hero | `Hero` (server), with `KhataCard` (balance tween loop) and `Ticker` | client: `KhataCard`, `Ticker` |
| Marquee | `Marquee` | none (CSS) |
| Statement | `Statement` | none (CSS scroll-driven ink sweep) |
| How it works | `HowItWorks` (server), with `Scrolly` (IntersectionObserver step tracking) | client: `Scrolly` |
| Desk | `Desk` (server panels), with `DeskTabs` (accessible tablist) and `PlanBuilder` (instalment calculator) | client: `DeskTabs`, `PlanBuilder` |
| Guardrails, Founder | `Guardrails`, `Founder` | none |
| FAQ | `Faq` (server, with FAQPage JSON-LD), with `FaqList` (accordion) | client: `FaqList` |
| Pilot CTA | `PilotCta` (server), with `PilotForm` (validates in the browser, sends nothing) | client: `PilotForm` |
| Footer | `Footer` | none (CSS scroll-driven wordmark fill) |

## Placeholders still to replace

These are deliberately visible on the live site until real content exists:

- **[Counselling partner]**: Desk → Care tab, "Shared with borrower" row.
- **[PILOT]**: Desk → Book Health tab, "Plans kept" KPI.
- **"Sample data" / "Sample account · not real data"** labels on all product mockups. Keep these.

## Legal pages

/privacy, /terms and /grievance contain full drafts written for Indian law: the IT Act 2000, the SPDI Rules 2011, and the DPDP Act 2023 with the DPDP Rules 2025. They are pending review by the legal team. The shared values (the "Last updated" date and the location) are in `web/src/lib/legal.ts`.

## Local setup

Requirements: Node 20.9 or later.

```bash
cd web
npm install
npm run dev                     # http://localhost:3000
```

### Scripts (in `web/`)

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | no | Canonical site URL used in metadata, the sitemap and robots.txt. Defaults to `https://squarebookai.com`. |

## How the pilot form works

1. `PilotForm` handles submit in the browser (`onSubmit` with `preventDefault`). It makes no network request.
2. The zod schema in `src/lib/pilot/schema.ts` checks name, email format, organisation and the accounts band (one of the four options in the design's select).
3. If something is wrong, an error message appears next to each field, an inline message explains what to fix, and what the person typed stays in place.
4. If everything is valid, the printed receipt from the design appears (`PILOT REQUEST · No. CHK-0421`).
5. Nothing is stored or sent. Leads only reach you if visitors email support@squarebookai.com.

## Deploy to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket, then in Vercel choose **Add New → Project** and import it.
2. Set **Root Directory** to `web`. The framework preset (Next.js) and the build command are detected automatically.
3. Deploy. Preview deployments serve a `Disallow: /` robots.txt, so they stay out of search results.

## Connect squarebookai.com (bought on GoDaddy)

### 1. Point the domain at Vercel
1. In Vercel: Project → **Settings → Domains** → add `squarebookai.com`, then add `www.squarebookai.com`. When asked, choose to **redirect `www` to the apex**. The canonical URLs, sitemap and OG tags all use `https://squarebookai.com`.
2. Vercel then shows the exact DNS records to create. Use those values; they are typically:
   - apex `squarebookai.com`: **A** record, host `@`, pointing to the IP Vercel shows (often `76.76.21.21`)
   - `www`: **CNAME** record, host `www`, pointing to the target Vercel shows (often `cname.vercel-dns.com`)
3. In GoDaddy: **My Products → squarebookai.com → DNS → Manage DNS**.
   - Delete GoDaddy's default "Parked" **A** record for `@`, and any existing `www` CNAME, so they don't conflict.
   - Add the A and CNAME records exactly as Vercel shows them, with TTL 1 hour or lower.
4. Back in Vercel, wait for both domains to show **Valid Configuration**. HTTPS certificates are issued automatically.

### 2. Email

To *receive* mail at support@squarebookai.com and sampannakanungo@squarebookai.com, set up a mailbox provider (Google Workspace, Zoho, etc.) and add its MX records for `@`. This is required: the website's form sends nothing, so email is the only way visitors can reach you.

## Fidelity notes (vs. the approved design, `Main.dc.html`)

The homepage was compared side by side with the design in Chrome at 1440px and 390px:
- **Full page:** identical layout, with every section at the same top and height. Pixel difference is 0.03% (1440) and 0.11% (390).
- **Interactive states:** all 6 Desk tabs, every instalment option and all 5 How-it-works steps match.
- **Hero animation:** follows the design's timeline.

Intentional differences:
- The contact email is `support@squarebookai.com`, and it is a `mailto:` link.
- "Privacy · Terms · Grievance officer" are links to the new pages.
- Accessibility additions with no visual change: tab panels have ids and `aria-controls`, plus arrow, Home and End key navigation; FAQ questions sit inside `h3`s and their answers are `inert` while closed; footer column titles are `h2`s styled exactly like the design's `h4`s, to keep the heading order valid; the form has labels, `aria-invalid` and an inline error message.
- Fonts are self-hosted with `next/font` and include the latin-ext subset, so `₹` renders in Geist and Familjen Grotesk as it does in the design.
- One quirk was reproduced on purpose. In the design's own renderer, `.rowt span` also styles the hero ledger titles (12.5px grey), and `.track span` also styles the integration pills (22px with a yellow square). The port keeps both, because that is how the approved design looks.

Worth a decision later (kept as designed): at 390px the nav wraps onto two lines, because the logo and the "Request a pilot" button don't fit side by side.

## Lighthouse (mobile, local production build)

Best Practices 100, SEO 100, Accessibility 97, Performance 94–95 across several runs. CLS is 0 and TBT is 30–80 ms. The simulated LCP is about 3.0s, set by the size of the Next.js/React runtime under Lighthouse's slow-4G model; in a real Chrome load the LCP is about 0.2s. The only accessibility warnings come from the design's intentionally dimmed states: unlit ledger rows, inactive scrollytelling steps, and the 12px step labels at 4.44:1 contrast. Re-run Lighthouse against the Vercel URL after deploying; Brotli and edge caching there usually improve on local numbers.
