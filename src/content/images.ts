import type { GemImage } from "./types.ts";
const demo = "AI-generated demonstration, not actual TZ GEMS inventory";
export const gemImage = (tile: number, name: string): GemImage => ({
  src: "/images/catalogue-illustration.webp",
  width: 418,
  height: 418,
  alt: `${name} — ${demo}`,
  illustrative: true,
  sheet: "catalogue",
  tile,
});
export const editorialImage = (tile: number, alt: string): GemImage => ({
  src: "/images/editorial-illustrations.webp",
  width: 627,
  height: 418,
  alt: `${alt} — AI-generated illustration`,
  illustrative: true,
  sheet: "editorial",
  tile,
});
export const images = {
  oval: gemImage(1, "Oval blue-violet tanzanite"),
  rough: gemImage(7, "Rough blue-violet tanzanite with mineral matrix"),
  emerald: gemImage(0, "Emerald-cut blue-violet tanzanite"),
  crystal: gemImage(6, "Blue-violet crystal cluster"),
  hero: {
    src: "/images/tanzanite-hero.webp",
    width: 1400,
    height: 933,
    alt: `Emerald-cut gemstone beside a natural-form blue-violet crystal — ${demo}`,
    illustrative: true,
  } satisfies GemImage,
  tweezers: {
    src: "/images/tanzanite-emerald-illustration.webp",
    width: 900,
    height: 1125,
    alt: `Emerald-cut blue-violet gemstone held in jeweller’s tweezers — ${demo}`,
    illustrative: true,
  } satisfies GemImage,
  inspection: editorialImage(
    0,
    "A gloved jeweller examining a gemstone with a loupe",
  ),
  cutting: editorialImage(1, "Hands shaping a gemstone at a faceting machine"),
  polishing: editorialImage(2, "Hands polishing a gemstone"),
  consultation: editorialImage(
    3,
    "A specialist and two buyers discussing gemstones; fictional people, not actual clients",
  ),
  buyers: editorialImage(
    4,
    "Gemstone buyers in consultation at a trade booth; fictional people, not actual clients",
  ),
  bangkok: editorialImage(
    5,
    "Illustrative view of Wat Arun and the Chao Phraya River in Bangkok at sunset",
  ),
};
