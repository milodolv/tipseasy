import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { NOM } from "@/config";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: `Espace streamer ${NOM}.`,
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return <DashboardShell>{children}</DashboardShell>;
}