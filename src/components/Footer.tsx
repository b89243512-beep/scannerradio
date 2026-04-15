import Link from "next/link";
import { Logo } from "@/components/Logo";
export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-12">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-3"><Logo size={28} /><span>Free Scanner Radio</span></Link>
            <p className="text-sm text-muted max-w-sm">Free live police, fire, and EMS scanner radio feeds across the United States. No sign-up required.</p>
          </div>
          <div className="flex gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} Scanner Radio. All rights reserved. Scanner feeds are provided by public broadcasters. This site is not affiliated with any law enforcement agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
