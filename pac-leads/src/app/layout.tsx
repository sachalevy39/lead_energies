import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Calculateur Aides PAC 2024 | MaPrimeRénov' & CEE",
  description: "Calculez vos aides pour l'installation d'une pompe à chaleur. MaPrimeRénov', CEE, TVA réduite. Simulation gratuite en 2 minutes.",
  keywords: "pompe à chaleur, MaPrimeRénov, aides rénovation énergétique, CEE, simulation PAC, DPE F, DPE G",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
