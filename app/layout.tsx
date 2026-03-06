import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secretaria — Votre secrétaire IA disponible 24h/24",
  description:
    "Sofia répond à vos appels, prend les rendez-vous et envoie les confirmations — pendant que vous vous concentrez sur vos patients et clients.",
  openGraph: {
    title: "Secretaria — Votre secrétaire IA disponible 24h/24",
    description: "L'agent IA qui répond à vos appels, 24h/24, 7j/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
