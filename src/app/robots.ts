import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(brand.indexable ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
