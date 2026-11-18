import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Latin text uses Inter, Arabic / Kurdish text uses Noto Sans Arabic (self-hosted by next/font at build time).
const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin", display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://warith.online"),
  title: {
    default: "Warith | وارث",
    template: "%s | Warith",
  },
  description: "The official website of the Warith educational app.",
  applicationName: "Warith",
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0090fd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ar" className={`${latin.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}