import { gemImage } from "./images.ts";
import type { Product } from "./types.ts";
// Design demonstrations only. No weight, dimensions, treatment, reports or live
// stock have been supplied. Unknown specifications must remain absent.
const studies: {
  slug: string;
  name: string;
  shape: Product["shape"];
  category: Product["category"];
  tile: number;
}[] = [
  {
    slug: "emerald-cut",
    name: "Tanzanite – Emerald Cut",
    shape: "Emerald",
    category: "cut-polished",
    tile: 0,
  },
  {
    slug: "oval-cut",
    name: "Tanzanite – Oval Cut",
    shape: "Oval",
    category: "cut-polished",
    tile: 1,
  },
  {
    slug: "cushion-cut",
    name: "Tanzanite – Cushion Cut",
    shape: "Cushion",
    category: "cut-polished",
    tile: 2,
  },
  {
    slug: "pear-cut",
    name: "Tanzanite – Pear Cut",
    shape: "Pear",
    category: "cut-polished",
    tile: 3,
  },
  {
    slug: "radiant-cut",
    name: "Tanzanite – Radiant Cut",
    shape: "Radiant",
    category: "cut-polished",
    tile: 4,
  },
  {
    slug: "round-cut",
    name: "Tanzanite – Round Cut",
    shape: "Round",
    category: "cut-polished",
    tile: 5,
  },
  {
    slug: "tanzanite-crystal",
    name: "Tanzanite Crystal",
    shape: "Natural crystal",
    category: "crystals",
    tile: 6,
  },
  {
    slug: "rough-tanzanite",
    name: "Rough Tanzanite",
    shape: "Rough",
    category: "rough",
    tile: 7,
  },
  {
    slug: "trillion-cut",
    name: "Tanzanite – Trillion Cut",
    shape: "Trillion",
    category: "cut-polished",
    tile: 8,
  },
];
export const products: Product[] = studies.map((study, index) => ({
  ...study,
  reference: `DEMO-${String(index + 1).padStart(3, "0")}`,
  colour: "blue-violet",
  availability: "demonstration",
  demonstration: true,
  order: index + 1,
  images: [gemImage(study.tile, study.name)],
  description: `Explore the ${study.shape?.toLowerCase()} form in this illustrative Tanzanite study. This image is a starting point for a conversation, not an available gemstone. Ask TZ GEMS about comparable genuine stones, current photographs and verified specifications.`,
}));
export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
export function colourLabel(colour: Product["colour"]) {
  return {
    "blue-violet": "Blue-violet",
    "violet-blue": "Violet-blue",
    "deep-blue": "Deep blue",
  }[colour];
}
