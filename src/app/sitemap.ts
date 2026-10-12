import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { products } from "@/content/products";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!brand.indexable) return [];
  return [
    "",
    "gemstones/",
    "our-story/",
    "events/",
    "contact/",
    "privacy-policy/",
    ...products
      .filter((p) => !p.demonstration)
      .map((p) => `gemstones/${p.slug}/`),
  ].map((path) => ({ url: `${brand.siteUrl}/${path}` }));
}
