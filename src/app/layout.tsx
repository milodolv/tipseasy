import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NOM } from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Apple Pay, Google Pay et alertes personnalisées. Un lien, zéro prise de tête.";

export const metadata: Metadata = {
  title: {
    default: NOM,
    template: `%s · ${NOM}`,
  },
  description,
  applicationName: NOM,
  openGraph: {
    title: NOM,
    description,
    siteName: NOM,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: NOM,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
