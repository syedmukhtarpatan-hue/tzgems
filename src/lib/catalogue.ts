import type { Product } from "../content/types.ts";
export const filterOptions = {
  category: [
    ["cut-polished", "Cut Gemstones"],
    ["crystals", "Crystals"],
    ["rough", "Rough Stones"],
  ],
  colour: [
    ["blue-violet", "Blue-violet"],
    ["violet-blue", "Violet-blue"],
    ["deep-blue", "Deep blue"],
  ],
  shape: [
    ["Emerald", "Emerald"],
    ["Oval", "Oval"],
    ["Cushion", "Cushion"],
    ["Pear", "Pear"],
    ["Radiant", "Radiant"],
    ["Round", "Round"],
    ["Trillion", "Trillion"],
    ["Natural crystal", "Natural crystal"],
    ["Rough", "Rough"],
  ],
  carats: [
    ["under-1", "Under 1 ct"],
    ["1-3", "1–under 3 ct"],
    ["3-5", "3–under 5 ct"],
    ["5-plus", "5 ct and above"],
  ],
  treatment: [
    ["heated", "Heated"],
    ["unheated", "Unheated"],
  ],
  availability: [
    ["demonstration", "Demonstration"],
    ["available", "Available"],
    ["reserved", "Reserved"],
    ["sold", "Sold"],
  ],
  sort: [
    ["curated", "Curated order"],
    ["name", "Name A–Z"],
    ["weight-asc", "Weight: low to high"],
    ["weight-desc", "Weight: high to low"],
  ],
} as const;
export type FacetKey = Exclude<keyof typeof filterOptions, "sort">;
export type Filters = Record<FacetKey | "q" | "sort", string>;
export const defaultFilters: Filters = {
  q: "",
  category: "",
  colour: "",
  shape: "",
  carats: "",
  treatment: "",
  availability: "",
  sort: "curated",
};
export function parseFilters(params: URLSearchParams): Filters {
  const filters = {
    ...defaultFilters,
    q: (params.get("q") || "").slice(0, 120),
  };
  for (const key of Object.keys(
    filterOptions,
  ) as (keyof typeof filterOptions)[]) {
    const value = params.get(key);
    if (value && filterOptions[key].some(([option]) => option === value))
      filters[key] = value;
  }
  return filters;
}
export function serializeFilters(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of Object.keys(defaultFilters) as (keyof Filters)[]) {
    if (filters[key] && filters[key] !== defaultFilters[key])
      params.set(key, filters[key]);
  }
  return params.toString();
}
export function filterProducts(
  products: Product[],
  filters: Filters,
): Product[] {
  const q = filters.q.trim().toLocaleLowerCase("en");
  const results = products.filter((product) => {
    if (
      q &&
      !`${product.name} ${product.reference} ${product.shape || ""} ${product.colour} tanzanite`
        .toLocaleLowerCase("en")
        .includes(q)
    )
      return false;
    for (const key of [
      "category",
      "colour",
      "shape",
      "treatment",
      "availability",
    ] as const) {
      if (filters[key] && filters[key] !== product[key]) return false;
    }
    if (filters.carats) {
      const weight = product.carats;
      if (weight === undefined || !Number.isFinite(weight)) return false;
      if (filters.carats === "under-1" && weight >= 1) return false;
      if (filters.carats === "1-3" && (weight < 1 || weight >= 3)) return false;
      if (filters.carats === "3-5" && (weight < 3 || weight >= 5)) return false;
      if (filters.carats === "5-plus" && weight < 5) return false;
    }
    return true;
  });
  return results.sort((a, b) => {
    if (filters.sort === "name") return a.name.localeCompare(b.name, "en");
    if (filters.sort.startsWith("weight-")) {
      if (a.carats === undefined && b.carats === undefined)
        return a.order - b.order;
      if (a.carats === undefined) return 1;
      if (b.carats === undefined) return -1;
      return (
        (filters.sort === "weight-asc"
          ? a.carats - b.carats
          : b.carats - a.carats) || a.order - b.order
      );
    }
    return a.order - b.order;
  });
}
export function activeFilters(filters: Filters) {
  return (Object.keys(filters) as (keyof Filters)[]).filter(
    (key) => key !== "sort" && filters[key],
  );
}
export function filterLabel(key: keyof Filters, value: string) {
  return key === "q"
    ? `Search: ${value}`
    : filterOptions[key].find(([option]) => option === value)?.[1] || value;
}
