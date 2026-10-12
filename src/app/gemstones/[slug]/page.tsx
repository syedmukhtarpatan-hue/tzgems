import { whatsappConfigured } from "@/lib/whatsapp";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileCheck2, Globe2, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryButton } from "@/components/Enquiry";
import { ImageGallery } from "@/components/ImageGallery";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { products, findProduct, colourLabel } from "@/content/products";
import { certifications } from "@/content/certifications";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Gemstone not found" };
  const description = `Explore ${product.name}, reference ${product.reference}. Illustrative design study; enquire about comparable genuine Tanzanite with TZ GEMS.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/gemstones/${slug}/` },
    openGraph: {
      title: `${product.name} | TZ GEMS`,
      description,
      url: `/gemstones/${slug}/`,
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const reports = certifications.filter(
    (report) =>
      product.certificateIds?.includes(report.id) &&
      report.productReference === product.reference,
  );
  const related = products
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category),
    )
    .slice(0, 3);
  const details = [
    [
      "Carat Weight",
      product.carats !== undefined
        ? `${product.carats.toFixed(2)} ct`
        : "Not supplied",
    ],
    ["Shape", product.shape || "Not supplied"],
    ["Colour", colourLabel(product.colour)],
    [
      "Treatment",
      product.treatment === "heated"
        ? "Heated"
        : product.treatment === "unheated"
          ? "Unheated"
          : "Not supplied",
    ],
    ["Dimensions", product.dimensions || "Not supplied"],
    [
      "Certification",
      reports.length
        ? reports.map((r) => r.title).join(", ")
        : "No report supplied",
    ],
    [
      "Availability",
      product.demonstration ? "Demonstration only" : product.availability,
    ],
  ];
  return (
    <main id="main-content" className="wrap page-content product-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Collection", href: "/gemstones/" },
          { name: product.shape || product.name, href: `/gemstones/${slug}/` },
        ]}
      />
      <div className="product-detail-grid">
        <ImageGallery images={product.images} label={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="reference">Ref: {product.reference}</p>
          <dl className="specifications">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <EnquiryButton
            subject={product}
            className="button primary product-whatsapp"
          >
            Enquire on WhatsApp <ArrowRight size={16} />
          </EnquiryButton>
          <Link
            href={`/contact/?product=${encodeURIComponent(product.reference)}`}
            className="button outline"
          >
            Request More Information
          </Link>
          <p className="demo-note">
            {whatsappConfigured
              ? "Illustrative gemstone. Enquire about comparable genuine stones."
              : "Illustrative gemstone · WhatsApp demo mode. No message is sent."}
          </p>
        </div>
      </div>
      <div className="service-grid">
        <div>
          <FileCheck2 />
          <span>
            <strong>Individual Documentation</strong>
            <small>Ask about reports for your chosen stone.</small>
          </span>
        </div>
        <div>
          <Globe2 />
          <span>
            <strong>Worldwide Shipping</strong>
            <small>Discuss delivery to your destination.</small>
          </span>
        </div>
        <div>
          <MessageCircle />
          <span>
            <strong>Personalised Enquiry</strong>
            <small>Request current images and individual details.</small>
          </span>
        </div>
      </div>
      <ProductTabs description={product.description} />
      <section className="related-section">
        <div className="section-heading">
          <h2>You may also like</h2>
          <Link href="/gemstones/" className="text-link">
            View Collection <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
