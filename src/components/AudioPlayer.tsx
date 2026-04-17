"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square, Users, MapPin, X as XIcon, Loader2, AlertCircle } from "lucide-react";
import type { Feed } from "@/data/feeds";

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

type State = "idle" | "loading" | "playing" | "error";

export function AudioPlayer({ feed, onClose }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    setState("idle");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
    }
  }, [feed?.id]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  if (!feed) return null;
  const catStyle = CATEGORY_COLORS[feed.category];

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (state === "playing" || state === "loading") {
      el.pause();
      el.removeAttribute("src");
      el.load();
      setState("idle");
      return;
    }
    setState("loading");
    el.src = feed.streamUrl;
    el.play().catch(() => setState("error"));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={toggle}
            disabled={state === "error"}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 transition-all shadow-lg ${
              state === "playing"
                ? "bg-red-500 hover:bg-red-600 animate-pulse-dot"
                : state === "error"
                ? "bg-red-500/60 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
            aria-label={state === "playing" ? "Stop" : "Play"}
          >
            {state === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : state === "playing" ? (
              <Square className="w-5 h-5" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${catStyle.bg} ${catStyle.text} uppercase tracking-wider`}>
                {catStyle.label}
              </span>
              {state === "playing" && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE · ON AIR
                </span>
              )}
              {state === "loading" && (
                <span className="text-[10px] font-bold text-amber-400">Connecting…</span>
              )}
              {state === "idle" && (
                <span className="text-[10px] text-muted">Click play to start streaming</span>
              )}
              {state === "error" && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400">
                  <AlertCircle className="w-3 h-3" /> Feed offline — try another
                </span>
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

          <button
            onClick={() => { if (audioRef.current) audioRef.current.pause(); onClose(); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-label="Close player"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <audio
          ref={audioRef}
          preload="none"
          crossOrigin="anonymous"
          onPlaying={() => setState("playing")}
          onWaiting={() => setState("loading")}
          onPause={() => setState((s) => (s === "playing" ? "idle" : s))}
          onError={() => setState("error")}
        />
      </div>
    </div>
  );
}
