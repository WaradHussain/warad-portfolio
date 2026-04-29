import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from '@/components/chatbot/ChatWidget'
import "./globals.css";
import NewsletterProvider from '@/components/newsletter/NewsletterProvider'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

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
  metadataBase: new URL('https://waradhussain.com'),
  title: {
    default: 'Warad Hussain — Python & AI Engineer',
    template: '%s — Warad Hussain',
  },
  description: 'Python backend and AI engineer building production-grade systems.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waradhussain.com',
    siteName: 'Warad Hussain',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

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

        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00E87A] focus:text-[#0A0A0A] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main-content" className="flex-1 pt-14">{children}</main>
        <Footer />
        <NewsletterProvider />
        {/* <ChatWidget /> */}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
