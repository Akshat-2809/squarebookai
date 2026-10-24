import { Desk } from "@/components/sections/Desk";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Founder } from "@/components/sections/Founder";
import { Guardrails } from "@/components/sections/Guardrails";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Marquee } from "@/components/sections/Marquee";
import { Nav } from "@/components/sections/Nav";
import { PilotCta } from "@/components/sections/PilotCta";
import { Statement } from "@/components/sections/Statement";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <HowItWorks />
        <Desk />
        <Guardrails />
        <Founder />
        <Faq />
        <PilotCta />
      </main>
      <Footer />
    </>
  );
}
