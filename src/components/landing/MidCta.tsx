import Link from "next/link";
import { LandingSectionTitle } from "@/components/landing/LandingSectionTitle";
import { landingPrimaryButtonClass, landingSectionPad } from "@/components/landing/landing-styles";

export function MidCta() {
  return (
    <section className="border-t border-white/10">
      <div
        className={`mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center ${landingSectionPad}`}
      >
        <LandingSectionTitle eyebrow="PAGE DE DON">
          Créer ma page de don
        </LandingSectionTitle>
        <Link href="/login" className={`${landingPrimaryButtonClass} shrink-0`}>
          Commencer avec Twitch
        </Link>
      </div>
    </section>
  );
}