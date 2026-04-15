import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://scannerradio.live"),
  title: {
    default: "Free Police Scanner Radio Online - Live Police, Fire & EMS Scanners USA",
    template: "%s | Free Scanner Radio",
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
  ],
  openGraph: {
    title: "Free Police Scanner Radio Online - Live Feeds Across USA",
    description: "Listen live to police, fire, and EMS scanners from all 50 states. Interactive map, 100% free.",
    type: "website", url: "https://scannerradio.live", siteName: "Free Scanner Radio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Police Scanner Radio Online - Live Feeds Across USA",
    description: "Listen live to police, fire, and EMS scanners from all 50 states. Interactive map, 100% free.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://scannerradio.live" },
  icons: { icon: "/logo.svg", apple: "/logo.svg" },
  verification: {},
  category: "news",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebApplication",
          name: "Free Scanner Radio", applicationCategory: "MultimediaApplication",
          operatingSystem: "Web",
          description: "Free live police, fire, and EMS scanner radio feeds from across the United States.",
          url: "https://scannerradio.live",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Is Free Scanner Radio really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free with no sign-up required. Listen to unlimited police, fire, and EMS scanner feeds across the United States." } },
            { "@type": "Question", name: "Is it legal to listen to police scanners?", acceptedAnswer: { "@type": "Answer", text: "Yes, in the United States it is legal to listen to unencrypted police, fire, and EMS radio communications. These frequencies are part of the public airwaves." } },
            { "@type": "Question", name: "How do I listen to a scanner?", acceptedAnswer: { "@type": "Answer", text: "Click any state on the interactive map, choose a feed from the list, and click play. No download or installation required — it works directly in your browser." } },
          ],
        }) }} />
        {children}
      </body>
    </html>
  );
}
