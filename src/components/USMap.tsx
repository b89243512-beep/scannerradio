"use client";

import { US_STATES, STATE_GRID } from "@/data/us-states";

interface USMapProps {
  selectedState: string | null;
  onSelectState: (code: string) => void;
  statesWithFeeds: Set<string>;
  feedCounts: Record<string, number>;
}

export function USMap({ selectedState, onSelectState, statesWithFeeds, feedCounts }: USMapProps) {
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="min-w-[600px] max-w-4xl mx-auto space-y-1.5">
        {STATE_GRID.map((row, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center">
            {row.map((code, ci) => {
              if (!code) {
                return <div key={ci} className="w-[8%] aspect-square" />;
              }
              const state = US_STATES.find((s) => s.code === code);
              const has = statesWithFeeds.has(code);
              const selected = selectedState === code;
              const count = feedCounts[code] || 0;

              return (
                <button
                  key={ci}
                  onClick={() => onSelectState(code)}
                  title={state?.name}
                  className={`relative w-[8%] aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-200 ${
                    selected
                      ? "bg-primary text-white ring-2 ring-primary/50 scale-110 z-10"
                      : has
                      ? "bg-primary/20 text-primary-light hover:bg-primary/40 hover:text-white border border-primary/30"
                      : "bg-surface text-muted/50 hover:bg-surface-alt border border-border/50 cursor-not-allowed"
                  }`}
                  disabled={!has}
                >
                  <span className="leading-none">{code}</span>
                  {has && count > 0 && (
                    <span className={`mt-0.5 text-[8px] md:text-[9px] font-normal leading-none ${
                      selected ? "text-white/80" : "text-primary-light/60"
                    }`}>
                      {count}
                    </span>
                  )}
                  {has && !selected && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-5 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
          <span>Live feeds</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Broadcasting now</span>
        </div>
      </div>
    </div>
  );
}
