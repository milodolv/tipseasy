import type { Metadata } from "next";
import Link from "next/link";
import { NOM } from "@/config";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <h1 className="text-3xl font-medium tracking-tight">Mentions légales</h1>
      <p className="mt-4 text-sm text-muted">{NOM}</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-accent hover:text-accent-hover"
      >
        Retour
      </Link>
    </main>
  );
}
