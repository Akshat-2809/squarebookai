import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import s from "@/components/LegalDoc.module.css";
import { LEGAL_LOCATION } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Squarebook collects, uses, shares and protects personal data, and the rights you have under Indian law, including the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy" },
};

const mail = (address: string) => <a href={`mailto:${address}`}>{address}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are and what this policy covers",
    body: (
      <>
        <p>
          Squarebook (&ldquo;Squarebook&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is based in{" "}
          {LEGAL_LOCATION}.
        </p>
        <p>This policy explains how we handle personal data when:</p>
        <ul>
          <li>you visit squarebookai.com (the &ldquo;Website&rdquo;);</li>
          <li>you request a pilot, write to us, or otherwise deal with us as a prospective or existing customer; and</li>
          <li>
            we process information about borrowers and customers on behalf of the banks, NBFCs, utilities and other
            organisations that use Squarebook (&ldquo;Clients&rdquo;).
          </li>
        </ul>
        <p>
          We follow the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices
          and Procedures and Sensitive Personal Data or Information) Rules, 2011 (the &ldquo;SPDI Rules&rdquo;). We are
          also aligning our practices with the Digital Personal Data Protection Act, 2023 and the Digital Personal Data
          Protection Rules, 2025 (together, the &ldquo;DPDP Law&rdquo;) as their provisions come into force. Terms such
          as &ldquo;Data Fiduciary&rdquo;, &ldquo;Data Processor&rdquo; and &ldquo;Data Principal&rdquo; have the
          meaning given in the DPDP Law.
        </p>
      </>
    ),
  },
  {
    id: "our-roles",
    title: "Our two roles",
    body: (
      <>
        <h3>When we decide how your data is used</h3>
        <p>
          For data about Website visitors, people who request a pilot, and contacts at our Clients, suppliers and
          partners, Squarebook decides why and how the data is processed. We act as the <b>Data Fiduciary</b> and this
          policy applies in full.
        </p>
        <h3>When we act for a lender</h3>
        <p>
          When a Client uses Squarebook to check bills, contact borrowers, agree repayment plans or keep audit records,
          the Client decides why and how its borrowers&apos; data is processed. The Client is the <b>Data Fiduciary</b>{" "}
          and Squarebook is its <b>Data Processor</b>, processing that data only on the Client&apos;s documented
          instructions and under a written contract. Section 4 describes this processing.
        </p>
        <div className={s.callout}>
          <p>
            <b>If you are a borrower</b> contacted through Squarebook, the lender or service provider you have an account
            with is responsible for your data, and its own privacy notice applies. Please send requests about your data
            to them. If you write to us instead, we will pass your request to the right Client promptly and help them
            respond.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect as Data Fiduciary",
    body: (
      <>
        <h3>Data you give us</h3>
        <ul>
          <li>
            <b>Pilot requests:</b> your name, work email address, organisation, and the approximate number of accounts
            your organisation has in collection.
          </li>
          <li>
            <b>Correspondence and meetings:</b> what you tell us when you email, call or meet us, including your job
            title, phone number and the content of our conversations.
          </li>
          <li>
            <b>Business relationship data:</b> contact and billing details of people at our Clients, suppliers and
            partners, needed to run a contract with their organisation.
          </li>
        </ul>
        <h3>Data collected automatically</h3>
        <ul>
          <li>
            <b>IP address:</b> used when you submit a form to prevent spam and abuse. We store it only as a salted,
            one-way hash, which cannot practically be turned back into your IP address.
          </li>
          <li>
            <b>Browser information:</b> the user-agent string your browser sends when you submit a form.
          </li>
          <li>
            <b>Server logs:</b> our hosting provider keeps standard request logs (IP address, date and time, page
            requested, browser type) for security and reliability.
          </li>
        </ul>
        <h3>Cookies</h3>
        <p>
          The Website does not use advertising or analytics cookies, and does not track you across other websites. If we
          introduce analytics or other non-essential cookies in future, we will update this policy first and ask for your
          consent where the law requires it.
        </p>
        <h3>Data we do not want through the Website</h3>
        <p>
          We do not ask for, and you should not send through the Website or by email, any sensitive personal data or
          information under the SPDI Rules (such as passwords, bank account or card details, health information or
          biometric data), or any borrower&apos;s personal data. Borrower data for a pilot is shared only through a
          secure channel agreed in writing with your organisation.
        </p>
      </>
    ),
  },
  {
    id: "borrower-data",
    title: "Borrower data we process for Clients",
    body: (
      <>
        <p>As a Data Processor, and only as instructed by the relevant Client, we may process:</p>
        <ul>
          <li>identity and contact details, such as name, phone number, email address, postal address and preferred language;</li>
          <li>account and loan information, such as balances, EMI schedules, payments, mandate (NACH, UPI AutoPay) attempts, fees, waivers and billing records;</li>
          <li>communications with the borrower over WhatsApp, voice and SMS, including messages, call recordings and transcripts where the Client has enabled them;</li>
          <li>repayment plans, promises to pay, receipts and closure letters; and</li>
          <li>
            information a borrower chooses to share about hardship, such as illness, bereavement or job loss. It is used
            only to pause automated contact and route the account to a trained person.
          </li>
        </ul>
        <p>When we act as a Data Processor:</p>
        <ul>
          <li>we process borrower data only for the Client&apos;s purposes and never sell it or use it for our own marketing;</li>
          <li>we store and process it in India;</li>
          <li>we do not use one Client&apos;s borrower data to train models for, or provide services to, anyone else;</li>
          <li>
            automated messages say that they come from software, contact happens only within the hours and limits the
            Client sets, and a borrower can ask for a person at any time;
          </li>
          <li>
            at the end of an engagement we return or delete the data as the Client instructs, unless the law requires us
            to keep it.
          </li>
        </ul>
        <p>
          Each Client remains responsible for having a lawful basis to share borrower data with us, for giving borrowers
          the notices the law requires, and for its own regulatory obligations, including directions issued by the
          Reserve Bank of India on fair practices, outsourcing and recovery.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "Why we use your data, and on what basis",
    body: (
      <>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Purpose</th>
                <th scope="col">Data used</th>
                <th scope="col">Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Respond to your pilot request and arrange next steps</td>
                <td>Pilot request details, correspondence</td>
                <td>Your consent, and data you provided voluntarily for that purpose</td>
              </tr>
              <tr>
                <td>Send a confirmation and follow-up emails about your request</td>
                <td>Name, email, organisation</td>
                <td>Your consent</td>
              </tr>
              <tr>
                <td>Enter into and perform contracts with your organisation</td>
                <td>Business relationship data</td>
                <td>Data provided voluntarily for that purpose; performance of a contract</td>
              </tr>
              <tr>
                <td>Keep the Website secure and prevent spam and abuse</td>
                <td>Hashed IP address, browser information, server logs</td>
                <td>Reasonable security practices required by law</td>
              </tr>
              <tr>
                <td>Meet legal, tax, accounting and regulatory obligations, and respond to lawful requests</td>
                <td>Any of the above, as needed</td>
                <td>Compliance with law, or with a judgment or order</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not sell personal data, and we do not use it for automated decisions that have legal or similarly
          significant effects on you. We will not add you to marketing mailing lists without your consent, and you can
          ask us to stop contacting you at any time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>We share personal data only where needed, and only with:</p>
        <ul>
          <li>
            <b>Service providers</b> who process data on our behalf under written contracts with confidentiality and
            security obligations:
          </li>
        </ul>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">What they do for us</th>
                <th scope="col">Data involved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Inc.</td>
                <td>Website hosting and delivery</td>
                <td>Server logs, form submissions in transit</td>
              </tr>
              <tr>
                <td>Neon (Databricks, Inc.)</td>
                <td>Database hosting for pilot requests</td>
                <td>Pilot request details, hashed IP, browser information</td>
              </tr>
              <tr>
                <td>Resend (Plus Five Five, Inc.)</td>
                <td>Sending confirmation and notification emails</td>
                <td>Name, email, organisation, accounts band</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            <b>Professional advisers</b>, such as lawyers, auditors and insurers, under a duty of confidentiality.
          </li>
          <li>
            <b>Government and regulatory authorities</b>, courts and law enforcement agencies, where the law requires
            it or to protect our legal rights.
          </li>
          <li>
            <b>A buyer or successor</b>, if we are involved in a merger, acquisition or sale of assets, subject to this
            policy continuing to protect your data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    title: "Where your data is stored",
    body: (
      <>
        <p>
          Borrower data that we process for Clients is stored and processed in India.
        </p>
        <p>
          Some of the service providers listed in section 6 store or process Website and business contact data outside
          India. The DPDP Law permits such transfers except to countries the Central Government restricts by
          notification, and we will not transfer personal data to any restricted country. We use providers that commit
          by contract to protect the data to a standard at least equal to Indian law.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <>
        <ul>
          <li>
            <b>Pilot requests and related correspondence:</b> for as long as we are discussing a pilot or working with
            your organisation, and for up to 24 months after our last interaction. After that we delete or anonymise
            them.
          </li>
          <li>
            <b>Hashed IP addresses and browser information</b> are kept with the pilot request they belong to and
            deleted with it.
          </li>
          <li>
            <b>Server logs</b> are kept by our hosting provider for a short period, typically no more than 30 days.
          </li>
          <li>
            <b>Contract, billing and tax records</b> are kept for as long as Indian law requires, generally eight years
            for books of account.
          </li>
          <li>
            <b>Borrower data</b> is kept only for as long as the Client instructs, and then returned or deleted.
          </li>
        </ul>
        <p>
          If you withdraw consent or ask us to erase your data, we will delete it unless the law requires us to keep it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect data",
    body: (
      <>
        <p>
          We maintain reasonable security practices and procedures, as required by section 43A of the Information
          Technology Act, 2000 and the SPDI Rules, including:
        </p>
        <ul>
          <li>encryption of data in transit (TLS) and at rest;</li>
          <li>access limited to people who need it for their work, with multi-factor authentication and access logs;</li>
          <li>storing IP addresses only as salted one-way hashes;</li>
          <li>due diligence on, and written contracts with, our service providers; and</li>
          <li>regular review of our security controls.</li>
        </ul>
        <p>
          No method of transmission or storage is completely secure, but we work to protect personal data against loss,
          misuse and unauthorised access.
        </p>
        <h3>If something goes wrong</h3>
        <p>
          If a personal data breach occurs, we will inform affected individuals and the Data Protection Board of India as
          the DPDP Law requires. We will also report cyber security incidents to CERT-In within the time set by its
          directions. Where the breach involves borrower data we process for a Client, we will tell that Client without
          undue delay so it can meet its own obligations.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Subject to the law, you have the right to:</p>
        <ol>
          <li>ask for a summary of the personal data we process about you, how we process it, and who we have shared it with;</li>
          <li>ask us to correct, complete or update inaccurate or incomplete data;</li>
          <li>ask us to erase data that is no longer needed for the purpose it was collected for, unless the law requires us to keep it;</li>
          <li>withdraw your consent at any time, as easily as you gave it. This does not affect processing that already took place;</li>
          <li>nominate another person to exercise your rights if you die or become unable to do so; and</li>
          <li>have your grievances addressed by us, and then, if you are not satisfied, by the Data Protection Board of India.</li>
        </ol>
        <p>
          To exercise any of these rights, email {mail(CONTACT_EMAIL)} with the subject &ldquo;Privacy request&rdquo;. We
          may ask you to confirm your identity before acting on the request. We will respond within 30 days.
        </p>
        <p>
          The DPDP Law also expects Data Principals not to impersonate others, not to suppress material information, and
          not to file false or frivolous complaints.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The Website and our services are meant for businesses and are not directed at anyone under 18. We do not
        knowingly collect personal data from children through the Website. If you believe a child has sent us personal
        data, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    body: (
      <p>
        The Website links to sites we do not control, such as LinkedIn. Their own privacy policies apply when you visit
        them.
      </p>
    ),
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    body: (
      <>
        <p>
          In line with Rule 5(9) of the SPDI Rules and the DPDP Law, we have appointed a Grievance Officer to handle
          privacy concerns and complaints:
        </p>
        <div className={s.callout}>
          <p>
            <b>Grievance Officer, Squarebook</b>
          </p>
          <p>Email: {mail(CONTACT_EMAIL)} (subject: &ldquo;Grievance&rdquo;)</p>
          <p>Address: {LEGAL_LOCATION}</p>
        </div>
        <p>
          We will acknowledge your grievance promptly and resolve it within 30 days of receipt. If you are not satisfied
          with our response, you may approach the Data Protection Board of India once the relevant provisions of the DPDP
          Law are in force. See also our <Link href="/grievance">grievance page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as our services or the law change. We will post the new version on this page with a
        new &ldquo;Last updated&rdquo; date. If we make a material change, we will notify you by email or with a notice on
        the Website before it takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        For any question about this policy or how we handle personal data, write to {mail(CONTACT_EMAIL)}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy policy"
      intro={
        <>
          <p>
            Squarebook helps lenders recover what is owed while keeping the customer. Handling personal data carefully is
            part of that.
          </p>
          <p>
            This policy explains what we collect, why, who we share it with, how long we keep it, and the rights you have.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  );
}
