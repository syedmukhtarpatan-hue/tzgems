import type { GemImage } from "./types.ts";
export const images: Record<"oval" | "rough" | "emerald", GemImage> = {
  oval: { src: "/images/tanzanite-oval-illustration.webp", alt: "AI illustration of an oval blue-violet gemstone on pale limestone; not an inventory photograph", width: 1122, height: 1402, illustrative: true },
  rough: { src: "/images/tanzanite-rough-illustration.webp", alt: "AI illustration of a blue-violet rough crystal on an ivory surface; not a real specimen", width: 900, height: 1125, illustrative: true },
  emerald: { src: "/images/tanzanite-emerald-illustration.webp", alt: "AI illustration of a rectangular blue-violet gemstone in tweezers; not an inventory photograph", width: 900, height: 1125, illustrative: true },
};
