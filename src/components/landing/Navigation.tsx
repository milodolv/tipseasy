"use client";

import Link from "next/link";
import { useState } from "react";
import { NOM } from "@/config";
import { landingPrimaryButtonCompactClass } from "@/components/landing/landing-styles";

const links = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-foreground transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-accent"
        >
          {NOM}
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link href="/login" className={landingPrimaryButtonCompactClass}>
            Commencer avec Twitch
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/10 text-foreground transition-colors duration-200 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </span>
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className={`mt-2 ${landingPrimaryButtonCompactClass} h-10`}
              onClick={() => setOpen(false)}
            >
              Commencer avec Twitch
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
