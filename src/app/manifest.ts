import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Free Scanner Radio - Live Police, Fire & EMS",
    short_name: "Scanner Radio",
    description: "Free live police, fire, and EMS scanner radio feeds across the USA.",
    start_url: "/", display: "standalone", background_color: "#0a0e1a", theme_color: "#3b82f6",
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
