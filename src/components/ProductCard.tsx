import Link from "next/link";
import type { Product } from "@/content/types";
import { EnquiryButton } from "./Enquiry";
import { Photo } from "./Photo";
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/gemstones/${product.slug}/`}
        className="product-image"
        aria-label={`View ${product.name}`}
      >
        <Photo image={product.images[0]} />
        {product.demonstration && (
          <span className="demo-label">Illustration</span>
        )}
      </Link>
      <div className="product-copy">
        <h3>
          <Link href={`/gemstones/${product.slug}/`}>{product.name}</Link>
        </h3>
        <p className="product-ref">Ref: {product.reference}</p>
        <p className="product-spec">
          {product.carats !== undefined
            ? `${product.carats.toFixed(2)} ct`
            : "Weight on enquiry"}
          <span aria-hidden="true"> · </span>
          {product.shape}
        </p>
        <EnquiryButton
          subject={product}
          className="button outline card-enquiry"
        >
          Enquire on WhatsApp
        </EnquiryButton>
      </div>
    </article>
  );
}
