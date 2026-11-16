"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NOM } from "@/config";
import { dashboardNavItems } from "@/components/dashboard/nav-config";
import { DashboardPageTransition } from "@/components/dashboard/DashboardPageTransition";
import { StatusPill } from "@/components/ui/StatusPill";
import { mockStreamer } from "@/mock-data";

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0a0a0b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-foreground/90"
          >
            {NOM}
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-sm font-medium">{mockStreamer.displayName}</span>
              <StatusPill online={mockStreamer.isOnline} />
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-medium">
              {mockStreamer.avatarInitials}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1200px] gap-8 px-6">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 py-8 lg:block">
          <nav className="flex flex-col gap-1">
            {dashboardNavItems.map((item) => {
              const active = isActive(pathname, item.href, item.match);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm transition-[background-color,color] duration-200 ${
                    active
                      ? "bg-white/[0.08] text-foreground"
                      : "text-muted hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 py-8 pb-28 lg:pb-8">
          <DashboardPageTransition>{children}</DashboardPageTransition>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#0a0a0b]/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-6 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1">
          {dashboardNavItems.map((item) => {
            const active = isActive(pathname, item.href, item.match);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[9px] transition-colors duration-200 ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden />
                <span className="max-w-[52px] truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}