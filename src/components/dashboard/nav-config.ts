import {
  Bot,
  CreditCard,
  LayoutDashboard,
  LineChart,
  Radio,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  match: "exact" | "prefix";
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, match: "exact" },
  {
    href: "/dashboard/conversion",
    label: "Conversion",
    icon: LineChart,
    match: "prefix",
  },
  {
    href: "/dashboard/streaming",
    label: "Streaming",
    icon: Radio,
    match: "prefix",
  },
  { href: "/dashboard/bot", label: "Bot", icon: Bot, match: "prefix" },
  {
    href: "/dashboard/paiements",
    label: "Paiements",
    icon: CreditCard,
    match: "prefix",
  },
  {
    href: "/dashboard/parametres",
    label: "Paramètres",
    icon: Settings,
    match: "prefix",
  },
];