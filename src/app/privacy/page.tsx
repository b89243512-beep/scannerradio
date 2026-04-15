import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy Policy for Free Scanner Radio." };
export default function PrivacyPage() {
  return (<><Navbar /><main className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
    <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
      <p><strong>Effective Date:</strong> April 2026</p>
      <p>Free Scanner Radio respects your privacy. We do not require account registration and do not collect personal information. Stream preferences are stored locally in your browser.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
      <p>We may collect anonymous usage data (page views, device type, approximate region) via analytics to improve the service. Audio streams are served from third-party providers (primarily Broadcastify); when you play a feed, their servers handle the audio delivery.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Third-Party Services</h2>
      <p>Audio feeds are provided by Broadcastify and other public community-run scanner networks. Their privacy policies apply to data they collect when you stream audio. We are not affiliated with any law enforcement agency or feed operator.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
      <p>Questions? Contact us at <a href="mailto:privacy@scannerradio.live" className="text-primary hover:underline">privacy@scannerradio.live</a>.</p>
    </div>
  </main><Footer /></>);
}
