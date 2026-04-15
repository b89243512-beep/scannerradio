import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = "https://scannerradio.live";
  return [{ url: b }, { url: `${b}/privacy` }, { url: `${b}/terms` }];
}
