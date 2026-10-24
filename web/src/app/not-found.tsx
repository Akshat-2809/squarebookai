import Link from "next/link";
import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SimplePage
      eyebrow="Error 404"
      title={
        <>
          Not in <span className="hand">the books.</span>
        </>
      }
      actions={
        <>
          <Link className="btn btn-blue" href="/">
            Back to home <span className="arr">→</span>
          </Link>
          <Link className="btn btn-ghost" href="/#pilot">
            Request a pilot
          </Link>
        </>
      }
    >
      <p>We couldn&apos;t find that page. It may have moved, or the link may be wrong.</p>
    </SimplePage>
  );
}
