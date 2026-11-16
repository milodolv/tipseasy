import { SHOW_SOCIAL_PROOF } from "@/config";

export function SocialProof() {
  if (!SHOW_SOCIAL_PROOF) {
    return null;
  }

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-center text-sm text-muted">Sans abonnement</p>
      </div>
    </section>
  );
}
