import type { MetadataRoute } from 'next';
import { brand } from '@/content/brand';
import { products } from '@/content/products';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {
  // Demo pages remain out of search engines until approved for production.
  if (!brand.indexable) return [];
  return [{url:`${brand.siteUrl}/`,priority:1},{url:`${brand.siteUrl}/gemstones/`,priority:.9},...products.filter(product=>!product.demonstration).map(product=>({url:`${brand.siteUrl}/gemstones/${product.slug}/`,priority:.7}))];
}
