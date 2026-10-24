import { FaqList, type FaqItem } from "./FaqList";
import s from "./Faq.module.css";

const FAQS: FaqItem[] = [
  {
    q: "Does Squarebook follow RBI’s rules on recovery?",
    a: "Yes. Contact hours, contact limits, who may be contacted and how are enforced on every message and call, not checked afterwards. Your own policy can be stricter, and Squarebook applies whichever rule is tighter.",
  },
  {
    q: "Who decides what the borrower is offered?",
    a: "You do. Plans, waivers and settlements are set as limits by your credit team. Squarebook only offers what sits inside them, and anything above goes to a named person for approval.",
  },
  {
    q: "Can borrowers always reach a person?",
    a: "Always. Borrowers can ask for a person at any point, and hardship cases are handed over automatically with a written summary of the account and the conversation.",
  },
  {
    q: "Where is our data kept?",
    a: "In India, encrypted in transit and at rest, and processed in line with the Digital Personal Data Protection Act. Borrower data is never used to train models for anyone else.",
  },
  {
    q: "How does a pilot work?",
    a: "We connect to a read-only copy of a slice of your overdue book, run the bill check first, and share what we find before a single borrower is contacted.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section className={`sec ${s.faq}`} id="faq">
      <div className={`wrap ${s.faqgrid}`}>
        <div className={`sechead rv ${s.head}`}>
          <span className="eyebrow">
            <i />
            Questions
          </span>
          <h2 className="h2">What credit and risk teams ask first.</h2>
        </div>
        <FaqList items={FAQS} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
