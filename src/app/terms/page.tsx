import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service", description: "Terms of Service for Free Scanner Radio." };
export default function TermsPage() {
  return (<><Navbar /><main className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
    <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
      <p><strong>Effective Date:</strong> April 2026</p>
      <p>By using Free Scanner Radio at policeradioscanner.app, you agree to these terms.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Service</h2>
      <p>Free Scanner Radio is a directory and player for publicly broadcast unencrypted police, fire, and EMS radio communications in the United States. Audio streams are provided by third-party community operators (primarily Broadcastify). We do not operate, own, or control the audio content.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Legal Listening</h2>
      <p>In the United States, listening to unencrypted public safety radio communications is legal in most states. Some states restrict the use of scanners while committing a crime or in a moving vehicle. You are responsible for knowing and complying with applicable laws in your jurisdiction. This service does not stream encrypted communications.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">No Affiliation</h2>
      <p>Free Scanner Radio is not affiliated with any law enforcement agency, fire department, EMS service, or government entity. We also are not affiliated with Broadcastify or any other scanner feed provider — we simply link to and embed publicly available streams.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Acceptable Use</h2>
      <p>Use the service only for lawful purposes. Do not rely on scanner audio for life-safety decisions — call 911 in an emergency. Do not attempt to disrupt or abuse the service.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Disclaimer</h2>
      <p>The service is provided &quot;as is&quot; without warranties. Feeds may be unavailable at any time. We are not liable for any damages from use of or reliance on the service.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
      <p>Questions? Contact us at <a href="mailto:legal@policeradioscanner.app" className="text-primary hover:underline">legal@policeradioscanner.app</a>.</p>
    </div>
  </main><Footer /></>);
}
