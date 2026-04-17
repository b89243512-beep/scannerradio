import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://policeradioscanner.app"),
  title: {
    default: "Free Police Scanner Radio Online - Live Police, Fire & EMS Scanners USA",
    template: "%s | Police Radio Scanner",
  },
  description:
    "Listen to free live police scanner radio, fire department, and EMS feeds across the United States. Click any state on the interactive map to tune in instantly. 100% free, no sign-up required.",
  keywords: [
    "police scanner online", "live police radio", "scanner radio free",
    "police scanner app", "free scanner radio", "live police scanner",
    "police scanner online free", "fire scanner", "ems scanner",
    "emergency scanner", "police radio online", "scanner radio online",
    "live scanner feeds", "us police scanner", "scanner live",
    "broadcastify alternative", "police frequencies online",
    "police radio scanner", "real time police scanner", "scanner radio usa",
  ],
  openGraph: {
    title: "Free Police Scanner Radio Online - Live Feeds Across USA",
    description: "Listen live to police, fire, and EMS scanners from all 50 states. Interactive map, 100% free.",
    type: "website",
    url: "https://policeradioscanner.app",
    siteName: "Police Radio Scanner",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Police Scanner Radio Online - Live Feeds Across USA",
    description: "Listen live to police, fire, and EMS scanners from all 50 states. Interactive map, 100% free.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://policeradioscanner.app" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  verification: { google: "4MCq5dgRrRCdVMHgTZknV04N2LdRovQpBJzqMxSE-bI" },
  other: { "mobile-web-app-capable": "yes" },
  category: "news",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Police Radio Scanner",
    alternateName: "Free Police Scanner Radio",
    url: "https://policeradioscanner.app",
    logo: "https://policeradioscanner.app/logo.svg",
    description: "Free online police, fire, and EMS scanner radio directory covering all 50 US states.",
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Police Radio Scanner",
    url: "https://policeradioscanner.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://policeradioscanner.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Police Scanner Radio",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "RadioBroadcasting",
    operatingSystem: "Web, iOS, Android",
    description: "Free live police, fire, and EMS scanner radio feeds from across the United States with an interactive US map.",
    url: "https://policeradioscanner.app",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
    author: { "@type": "Organization", name: "Police Radio Scanner" },
  };

  const broadcastServiceSchema = {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    name: "Police Radio Scanner Network",
    broadcastDisplayName: "Live US Police, Fire & EMS Scanners",
    broadcastTimezone: "America/New_York",
    broadcaster: {
      "@type": "Organization",
      name: "Police Radio Scanner",
      url: "https://policeradioscanner.app",
    },
    area: {
      "@type": "Country",
      name: "United States",
    },
    inLanguage: "en-US",
    url: "https://policeradioscanner.app",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is Free Police Scanner Radio really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free with no sign-up required. Listen to unlimited police, fire, and EMS scanner feeds across the United States." } },
      { "@type": "Question", name: "Is it legal to listen to police scanners in the US?", acceptedAnswer: { "@type": "Answer", text: "Yes, in the United States it is legal to listen to unencrypted police, fire, and EMS radio communications. These frequencies are part of the public airwaves. Some states restrict scanner use while committing a crime or in a moving vehicle." } },
      { "@type": "Question", name: "How do I listen to a scanner feed?", acceptedAnswer: { "@type": "Answer", text: "Click any state on the interactive US map, choose a feed from the list, and press play. No download or installation required — audio streams directly in your browser." } },
      { "@type": "Question", name: "What kinds of feeds are available?", acceptedAnswer: { "@type": "Answer", text: "Police, fire department, EMS, aviation (ATC), and weather emergency feeds from all major US cities and counties." } },
    ],
  };

  return (
    <html lang="en-US" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(broadcastServiceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        {children}
      </body>
      <GoogleAnalytics gaId="G-LZXH0KMMQF" />
    </html>
  );
}
