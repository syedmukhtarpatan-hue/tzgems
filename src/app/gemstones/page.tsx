import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalogue, CatalogueLoading } from "@/components/Catalogue";
export const metadata: Metadata = {
  title: "The Tanzanite Collection",
  description:
    "Explore cut Tanzanite gemstones, crystals and rough stones. Filter the TZ GEMS demonstration catalogue and prepare a personal enquiry.",
  alternates: { canonical: "/gemstones/" },
  openGraph: {
    title: "The Tanzanite Collection | TZ GEMS",
    description:
      "Cut gemstones, crystals and rough stones from Bangkok specialists.",
    url: "/gemstones/",
  },
};
export default function CollectionPage() {
  return (
    <main id="main-content" className="wrap page-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Collection", href: "/gemstones/" },
        ]}
      />
      <div className="page-heading">
        <h1>The Tanzanite Collection</h1>
        <p>
          Browse our selection of Tanzanite gemstones, crystals and rough
          stones.
        </p>
      </div>
      <Suspense fallback={<CatalogueLoading />}>
        <Catalogue />
      </Suspense>
    </main>
  );
}
