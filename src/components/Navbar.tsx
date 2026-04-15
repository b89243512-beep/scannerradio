"use client";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Radio } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Logo size={28} /><span>Police Scanner Radio</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="#map" className="text-sm text-muted hover:text-primary transition-colors hidden md:block">Map</Link>
          <Link href="#browse" className="text-sm text-muted hover:text-primary transition-colors hidden md:block">Browse</Link>
          <Link href="#faq" className="text-sm text-muted hover:text-primary transition-colors hidden md:block">FAQ</Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-400">LIVE</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
