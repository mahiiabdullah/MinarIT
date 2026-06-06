import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import ChatWidget from "@/components/ai/ChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://minar.agency"),
  title: {
    default: "Minar — AI-Powered Business Automation Agency",
    template: "%s | Minar Agency",
  },
  description:
    "We build custom AI software, intelligent automation systems, and complete business operating systems for restaurants, hospitals, NGOs, e-commerce, and schools. Transform your operations with cutting-edge AI technology.",
  keywords: [
    "AI automation",
    "business automation",
    "custom software",
    "AI agency",
    "business operating system",
    "restaurant automation",
    "hospital software",
    "NGO management",
    "e-commerce automation",
    "school management system",
    "artificial intelligence",
    "machine learning",
    "workflow automation",
  ],
  authors: [{ name: "Minar Agency" }],
  creator: "Minar Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://minar.agency",
    siteName: "Minar Agency",
    title: "Minar — AI-Powered Business Automation Agency",
    description:
      "Custom AI Software + Intelligent Automation + Business Operating Systems. Built for restaurants, hospitals, NGOs, e-commerce, and schools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Minar — AI-Powered Business Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minar — AI-Powered Business Automation Agency",
    description:
      "Custom AI Software + Intelligent Automation + Business Operating Systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A0F1E" />
      </head>
      <body className="min-h-screen bg-background antialiased safe-area-padding">
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
