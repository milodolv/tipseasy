import type { Metadata } from "next";
import Link from "next/link";
import { NOM } from "@/config";

export const metadata: Metadata = {
  title: "Commencer avec Twitch",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-24">
      <p className="text-sm text-muted">{NOM}</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight">
        Commencer avec Twitch
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Connecte ta chaîne Twitch.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-accent transition-colors duration-200 hover:text-accent-hover"
      >
        Retour
      </Link>
    </main>
  );
}
