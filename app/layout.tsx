import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* ── Fonts ──────────────────────────────────────────────── */

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* ── Metadata ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "Warad Hussain — Python & AI Engineer",
    template: "%s | Warad Hussain",
  },
  description:
    "Python backend and AI engineer building production-grade systems.",
  metadataBase: new URL("https://waradhussain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waradhussain.com",
    siteName: "Warad Hussain",
    title: "Warad Hussain — Python & AI Engineer",
    description:
      "Python backend and AI engineer building production-grade systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warad Hussain — Python & AI Engineer",
    description:
      "Python backend and AI engineer building production-grade systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

/* ── Layout ─────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-bg-primary text-text-primary antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
