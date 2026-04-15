"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink, Radio, Users, MapPin, X as XIcon, Loader2 } from "lucide-react";
import type { Feed } from "@/data/feeds";
import { getBroadcastifyUrl, getStreamUrl } from "@/data/feeds";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setError(false);
    setLoading(false);
  }, [feed?.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  if (!feed) return null;

  const catStyle = CATEGORY_COLORS[feed.category];

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      setError(false);
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border shadow-2xl">
      <audio
        ref={audioRef}
        src={getStreamUrl(feed)}
        onPlaying={() => { setPlaying(true); setLoading(false); }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onError={() => { setError(true); setLoading(false); setPlaying(false); }}
        preload="none"
      />

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={togglePlay}
            disabled={loading}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 transition-all shadow-lg ${
              playing ? "bg-red-500 hover:bg-red-600 animate-pulse-dot" : "bg-primary hover:bg-primary-dark"
            }`}
            aria-label={playing ? "Pause" : "Play"}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> :
              playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${catStyle.bg} ${catStyle.text} uppercase tracking-wider`}>
                {catStyle.label}
              </span>
              {playing && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              )}
              {error && (
                <span className="text-[10px] text-amber-400">Stream unavailable — open in Broadcastify</span>
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

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setMuted(!muted)} className="text-muted hover:text-foreground transition-colors">
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); if (muted) setMuted(false); }}
              className="w-24 accent-primary"
            />
          </div>

          <a
            href={getBroadcastifyUrl(feed)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-card"
            title="Open on Broadcastify"
          >
            <Radio className="w-4 h-4" />
            <span>Broadcastify</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-label="Close player"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
