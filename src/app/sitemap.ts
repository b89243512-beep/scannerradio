import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = "https://policeradioscanner.app";
  return [{ url: b }, { url: `${b}/privacy` }, { url: `${b}/terms` }];
}
