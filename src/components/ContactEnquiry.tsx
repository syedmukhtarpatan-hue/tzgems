"use client";
import { whatsappConfigured } from "@/lib/whatsapp";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { products } from "@/content/products";
import { EnquiryButton } from "./Enquiry";
export function ContactEnquiry() {
  const params = useSearchParams();
  const product = products.find(
    (item) => item.reference === params.get("product"),
  );
  return (
    <div className="contact-enquiry">
      <p className="eyebrow">A PERSONAL CONVERSATION</p>
      <h2>
        {product
          ? "A closer look at your gemstone."
          : "Your next Tanzanite starts here."}
      </h2>
      <p>
        {product
          ? `${product.name} · Ref: ${product.reference}`
          : "Tell us about the shape, colour or type of Tanzanite you have in mind."}
      </p>
      <EnquiryButton subject={product} className="button primary">
        {whatsappConfigured ? "Enquire on WhatsApp" : "Prepare an Enquiry"}
        <ArrowRight size={16} />
      </EnquiryButton>
      <p className="demo-note">
        {whatsappConfigured
          ? "WhatsApp opens with your prepared enquiry. You choose when to send it."
          : "WhatsApp demo mode. Prepare and copy your message, then contact us on Instagram. No message is sent by this site."}
      </p>
    </div>
  );
}
