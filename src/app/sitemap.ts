import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = "https://policeradioscanner.app";
  return [{ url: b }, { url: `${b}/privacy` }, { url: `${b}/terms` }];
}
