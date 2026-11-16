import { Benefits } from "@/components/landing/Benefits";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MidCta } from "@/components/landing/MidCta";
import { Navigation } from "@/components/landing/Navigation";
import { Pricing } from "@/components/landing/Pricing";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { ProductVisuals } from "@/components/landing/ProductVisuals";
import { Profiles } from "@/components/landing/Profiles";
import { SocialProof } from "@/components/landing/SocialProof";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProductVisuals />
        <SocialProof />
        <Benefits />
        <ProblemSolution />
        <MidCta />
        <HowItWorks />
        <Profiles />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
