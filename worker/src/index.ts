/**
 * Scanner Stream Proxy — Cloudflare Worker
 *
 * Routes:
 *   GET /stream/:feedId   → proxies upstream audio stream, adds CORS, unifies under our domain
 *   GET /health           → health check
 *
 * Only allowlisted upstream feeds are proxied. Premium/auth-gated feeds return 404.
 */

type FeedSource =
  | { kind: "broadcastify"; host: "cdnstream1"; id: string }
  | { kind: "somafm"; path: string }
  | { kind: "radioreference"; id: string };

const FEED_MAP: Record<string, FeedSource> = {
  // Broadcastify public feeds (cdnstream1.com)
  "3691":  { kind: "broadcastify", host: "cdnstream1", id: "3691"  }, // San Antonio PD
  "6007":  { kind: "broadcastify", host: "cdnstream1", id: "6007"  }, // Jefferson County NY
  "8705":  { kind: "broadcastify", host: "cdnstream1", id: "8705"  }, // New Haven CT
  "16984": { kind: "broadcastify", host: "cdnstream1", id: "16984" }, // Tillamook OR
  "17057": { kind: "broadcastify", host: "cdnstream1", id: "17057" }, // Pittsburgh
  "22562": { kind: "broadcastify", host: "cdnstream1", id: "22562" }, // Denver
  "22835": { kind: "broadcastify", host: "cdnstream1", id: "22835" }, // Tucson
  "24550": { kind: "broadcastify", host: "cdnstream1", id: "24550" }, // Madison County IN
  "24557": { kind: "broadcastify", host: "cdnstream1", id: "24557" }, // Chelan/Douglas WA
  "25324": { kind: "broadcastify", host: "cdnstream1", id: "25324" }, // Kansas City
  "28326": { kind: "broadcastify", host: "cdnstream1", id: "28326" }, // Fairfax VA
  "32253": { kind: "broadcastify", host: "cdnstream1", id: "32253" }, // Chicago PD

  // SomaFM (direct public icecast)
  "sf-police":  { kind: "somafm", path: "scanner-128-mp3" },
  "sf-1033":    { kind: "somafm", path: "sf1033-128-mp3" },

  // RadioReference public streams
  "travis-tx":  { kind: "radioreference", id: "907330774" },
};

function resolveUpstream(src: FeedSource): string {
  switch (src.kind) {
    case "broadcastify":
      return `https://broadcastify.${src.host}.com/${src.id}`;
    case "somafm":
      return `https://ice6.somafm.com/${src.path}`;
    case "radioreference":
      return `https://audio1.radioreference.com/${src.id}`;
  }
}

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const allow =
    origin && (origin === allowedOrigin || origin.endsWith(".policeradioscanner.app") || origin.endsWith(".pages.dev") || origin === "http://localhost:3000")
      ? origin
      : allowedOrigin;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Range, Icy-Metadata",
    "Access-Control-Expose-Headers": "Content-Length, Content-Range, Icy-MetaInt, Icy-Name, Icy-Description, Icy-Genre, Icy-Br",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request: Request, env: { ALLOWED_ORIGIN: string }): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN || "https://policeradioscanner.app");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, feeds: Object.keys(FEED_MAP).length }), {
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const match = url.pathname.match(/^\/stream\/([A-Za-z0-9-]+)$/);
    if (!match) {
      return new Response("Not Found", { status: 404, headers: cors });
    }

    const feedId = match[1];
    const source = FEED_MAP[feedId];
    if (!source) {
      return new Response("Feed not available", { status: 404, headers: cors });
    }

    const upstream = resolveUpstream(source);
    const upstreamHeaders: HeadersInit = {
      "User-Agent": "Mozilla/5.0 (compatible; ScannerProxy/1.0)",
    };
    const range = request.headers.get("Range");
    if (range) (upstreamHeaders as Record<string, string>)["Range"] = range;
    const icy = request.headers.get("Icy-Metadata");
    if (icy) (upstreamHeaders as Record<string, string>)["Icy-Metadata"] = icy;

    try {
      const resp = await fetch(upstream, {
        method: request.method === "HEAD" ? "HEAD" : "GET",
        headers: upstreamHeaders,
        // Cloudflare-specific — no cache for live streams
        cf: { cacheTtl: 0, cacheEverything: false },
      });

      const respHeaders = new Headers();
      // Passthrough relevant headers
      for (const [k, v] of resp.headers) {
        const key = k.toLowerCase();
        if (key.startsWith("content-") || key.startsWith("icy-") || key === "accept-ranges") {
          respHeaders.set(k, v);
        }
      }
      // Apply CORS
      for (const [k, v] of Object.entries(cors)) respHeaders.set(k, v as string);
      if (!respHeaders.has("Content-Type")) respHeaders.set("Content-Type", "audio/mpeg");
      respHeaders.set("Cache-Control", "no-cache, no-store");

      return new Response(resp.body, { status: resp.status, headers: respHeaders });
    } catch {
      return new Response("Upstream error", { status: 502, headers: cors });
    }
  },
};
