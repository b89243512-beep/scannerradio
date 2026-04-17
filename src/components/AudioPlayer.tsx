"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square, ExternalLink, Radio, Users, MapPin, X as XIcon, AlertCircle } from "lucide-react";
import type { Feed } from "@/data/feeds";
import { getBroadcastifyUrl } from "@/data/feeds";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  police: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Police" },
  fire: { bg: "bg-orange-500/15", text: "text-orange-400", label: "Fire" },
  ems: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "EMS" },
  mixed: { bg: "bg-purple-500/15", text: "text-purple-400", label: "Mixed" },
  aviation: { bg: "bg-sky-500/15", text: "text-sky-400", label: "Aviation" },
  weather: { bg: "bg-yellow-500/15", text: "text-yellow-400", label: "Weather" },
};

interface Props {
  feed: Feed | null;
  onClose: () => void;
}

export function AudioPlayer({ feed, onClose }: Props) {
  const popupRef = useRef<Window | null>(null);
  const [playing, setPlaying] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setIframeFailed(false);
    if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
    popupRef.current = null;
  }, [feed?.id]);

  useEffect(() => {
    return () => {
      if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
    };
  }, []);

  if (!feed) return null;

  const catStyle = CATEGORY_COLORS[feed.category];
  const embedUrl = `https://www.broadcastify.com/webPlayer/${feed.broadcastifyId}`;

  const openInPopup = () => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }
    const w = 480, h = 320;
    const left = typeof window !== "undefined" ? window.screenX + (window.outerWidth - w) / 2 : 0;
    const top = typeof window !== "undefined" ? window.screenY + (window.outerHeight - h) / 2 : 0;
    const popup = window.open(
      embedUrl,
      `scanner-${feed.id}`,
      `width=${w},height=${h},left=${left},top=${top},menubar=no,toolbar=no`
    );
    if (popup) {
      popupRef.current = popup;
      setPlaying(true);
    } else {
      window.open(getBroadcastifyUrl(feed), "_blank", "noopener,noreferrer");
    }
  };

  const toggle = () => {
    if (playing) {
      if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
      popupRef.current = null;
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={toggle}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 transition-all shadow-lg ${
              playing ? "bg-red-500 hover:bg-red-600 animate-pulse-dot" : "bg-primary hover:bg-primary-dark"
            }`}
            aria-label={playing ? "Stop" : "Play"}
          >
            {playing ? <Square className="w-5 h-5" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${catStyle.bg} ${catStyle.text} uppercase tracking-wider`}>
                {catStyle.label}
              </span>
              {playing ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE · ON AIR
                </span>
              ) : (
                <span className="text-[10px] text-muted">Click play to start streaming</span>
              )}
            </div>
            <p className="text-sm md:text-base font-bold text-foreground truncate">{feed.name}</p>
            <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 shrink-0" />
                {feed.city}, {feed.state}
              </span>
              {feed.listeners && (
                <span className="hidden sm:flex items-center gap-1">
                  <Users className="w-3 h-3" /> {feed.listeners.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <a
            href={getBroadcastifyUrl(feed)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-card"
            title="Open full page"
          >
            <Radio className="w-4 h-4" />
            <span>Details</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => { if (popupRef.current && !popupRef.current.closed) popupRef.current.close(); setPlaying(false); onClose(); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-label="Close player"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded player — tries iframe first */}
        {playing && !iframeFailed && (
          <div className="mt-3 rounded-xl overflow-hidden border border-border bg-black/40">
            <iframe
              src={embedUrl}
              title={`${feed.name} live scanner`}
              className="w-full block"
              style={{ height: "120px", border: 0 }}
              allow="autoplay; encrypted-media"
              onError={() => setIframeFailed(true)}
            />
          </div>
        )}

        {/* Iframe failed — offer popup fallback */}
        {playing && iframeFailed && (
          <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-foreground">Audio blocked in this frame</p>
              <p className="text-xs text-muted">Click below to open the live stream in a small popup window.</p>
            </div>
            <button
              onClick={openInPopup}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              Open Player
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
