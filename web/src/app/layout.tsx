import type { Metadata } from "next";
import { Playfair_Display, Manrope, Italiana, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana-google",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://twistphuket.com"),
  title: {
    default: "TWIST · Rooftop Restaurant & Bar · Phuket Old Town",
    template: "%s · TWIST Phuket",
  },
  description:
    "Phuket Old Town's most iconic rooftop bar & restaurant. 19th floor of Royal Phuket City Hotel — sunset panoramas, signature cocktails, and a Thai-rooted kitchen.",
  openGraph: {
    title: "TWIST · Rooftop Restaurant & Bar · Phuket Old Town",
    description:
      "Cinematic rooftop dining 19 floors above Phuket Old Town. Sunset cocktails, fusion cuisine, live jazz nights.",
    type: "website",
    siteName: "TWIST Phuket",
  },
  twitter: {
    card: "summary_large_image",
    title: "TWIST · Rooftop Restaurant & Bar · Phuket Old Town",
    description: "Sunset cocktails 19 floors up. Phuket Old Town.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${italiana.variable} ${jetbrains.variable}`}
    >
      <body className="isolate bg-twist-ink text-white antialiased">{children}</body>
    </html>
  );
}
