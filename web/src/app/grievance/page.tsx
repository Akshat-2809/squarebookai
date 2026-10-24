import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import s from "@/components/LegalDoc.module.css";
import { LEGAL_LOCATION } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grievance officer",
  description: "How to raise a grievance with Squarebook, and who handles it.",
  alternates: { canonical: "/grievance" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "officer",
    title: "Our Grievance Officer",
    body: (
      <div className={s.callout}>
        <p>
          <b>Grievance Officer, Squarebook</b>
        </p>
        <p>
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> (subject: &ldquo;Grievance&rdquo;)
        </p>
        <p>Address: {LEGAL_LOCATION}</p>
      </div>
    ),
  },
  {
    id: "how",
    title: "How to raise a grievance",
    body: (
      <>
        <p>Please include:</p>
        <ul>
          <li>your name and a way to contact you;</li>
          <li>what your grievance is about (for example, the Website, your personal data, or a message you received); and</li>
          <li>any reference numbers, dates or screenshots that will help us look into it.</li>
        </ul>
        <p>We may ask you to confirm your identity before sharing or changing any personal data.</p>
      </>
    ),
  },
  {
    id: "timelines",
    title: "What happens next",
    body: (
      <>
        <p>
          We will acknowledge your grievance promptly and resolve it within 30 days of receipt. If we need more
          information, we will tell you what we need and why.
        </p>
        <p>
          If you are not satisfied with our response, you may approach the Data Protection Board of India once the
          relevant provisions of the Digital Personal Data Protection Act, 2023 are in force.
        </p>
      </>
    ),
  },
  {
    id: "borrowers",
    title: "If you are a borrower",
    body: (
      <p>
        If you were contacted about a loan or bill through Squarebook, the lender or service provider you have the
        account with is responsible for your account and your data. Please raise the grievance with them first, using the
        grievance redressal details they have given you. If you write to us, we will pass your grievance to them promptly
        and help them resolve it.
      </p>
    ),
  },
  {
    id: "related",
    title: "Related policies",
    body: (
      <p>
        See our <Link href="/privacy">privacy policy</Link> and <Link href="/terms">terms of use</Link>.
      </p>
    ),
  },
];

export default function GrievancePage() {
  return (
    <LegalDoc
      title="Grievance officer"
      intro={
        <p>
          If something has gone wrong, or you have a concern about how we handle personal data, our Grievance Officer
          will look into it.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
