import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/types";
import { EnquiryButton } from "./Enquiry";
export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  return <article className="product-card"><Link className="product-image" href={`/gemstones/${product.slug}/`} aria-label={`View ${product.name}`}><Image src={image.src} width={image.width} height={image.height} sizes="(max-width: 599px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={image.alt}/>{product.demonstration && <span className="image-label">Demo · AI illustration</span>}<span className="product-view" aria-hidden="true"><ArrowUpRight size={20}/></span></Link><div className="product-meta"><span>{product.reference}</span><span>{product.demonstration ? "Demonstration" : product.availability}</span></div><h3><Link href={`/gemstones/${product.slug}/`}>{product.name}</Link></h3><p className="product-spec">{[product.shape, product.carats !== undefined ? `${product.carats.toFixed(2)} ct` : undefined].filter(Boolean).join(" · ")}</p><EnquiryButton subject={product} className="product-enquire">Enquire about this style <ArrowUpRight size={16}/></EnquiryButton></article>;
}
