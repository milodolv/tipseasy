import Link from "next/link";
import { DonationMockup } from "@/components/landing/DonationMockup";
import { PhoneFrame } from "@/components/landing/PhoneFrame";
import { landingPrimaryButtonClass } from "@/components/landing/landing-styles";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-depth-grid pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-120px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px] sm:left-[20%] sm:translate-x-0 lg:h-[520px] lg:w-[520px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-80px] bottom-[-100px] h-[360px] w-[360px] rounded-full bg-accent/20 blur-[100px] sm:right-[8%]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <h1 className="bg-gradient-to-br from-[#f4f4f5] via-[#f4f4f5] to-accent bg-clip-text text-[2.125rem] leading-[1.1] font-semibold tracking-[-0.03em] text-transparent sm:text-5xl lg:text-[3.5rem]">
            Plus de dons, moins de friction.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Apple Pay, Google Pay et alertes personnalisées. Un lien, zéro prise
            de tête.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/login" className={landingPrimaryButtonClass}>
              Commencer avec Twitch
            </Link>
            <p className="text-sm text-muted">Sans abonnement</p>
          </div>
        </div>
        <div className="relative" style={{ perspective: "900px" }}>
          <div
            className="relative shadow-[0_40px_80px_-20px_rgba(56,189,248,0.35),0_24px_48px_-24px_rgba(0,0,0,0.8)]"
            style={{
              transform: "rotateY(-8deg) rotateX(4deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <PhoneFrame>
              <DonationMockup compact />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}