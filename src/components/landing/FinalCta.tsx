import Link from "next/link";
import { LandingSectionTitle } from "@/components/landing/LandingSectionTitle";
import { landingPrimaryButtonClass, landingSectionPad } from "@/components/landing/landing-styles";

export function FinalCta() {
  return (
    <section className="border-t border-white/10 bg-background-alt">
      <div className={`mx-auto max-w-3xl text-center ${landingSectionPad}`}>
        <LandingSectionTitle eyebrow="DONS" centered>
          Prêt à recevoir plus de dons ?
        </LandingSectionTitle>
        <Link
          href="/login"
          className={`${landingPrimaryButtonClass} mt-8`}
        >
          Commencer avec Twitch
        </Link>
      </div>
    </section>
  );
}