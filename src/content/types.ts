export type GemImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  illustrative?: boolean;
  sheet?: "catalogue" | "editorial";
  tile?: number;
};
export type Product = {
  slug: string;
  name: string;
  reference: string;
  category: "rough" | "cut-polished" | "crystals";
  colour: "blue-violet" | "violet-blue" | "deep-blue";
  shape?:
    | "Oval"
    | "Emerald"
    | "Natural crystal"
    | "Cushion"
    | "Pear"
    | "Radiant"
    | "Round"
    | "Rough"
    | "Trillion";
  carats?: number;
  dimensions?: string;
  treatment?: "heated" | "unheated";
  availability: "demonstration" | "available" | "reserved" | "sold";
  description: string;
  images: GemImage[];
  videos?: { src: string; poster?: string; label: string }[];
  certificateIds?: string[];
  demonstration: boolean;
  order: number;
};
export type Certificate = {
  id: string;
  title: string;
  description: string;
  images: GemImage[];
  laboratory?: string;
  reportNumber?: string;
  productReference?: string;
};
export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  approved: boolean;
};
export type Exhibition = {
  id: string;
  name: string;
  location?: string;
  date?: string;
  description: string;
  images: GemImage[];
  confirmed: boolean;
};
