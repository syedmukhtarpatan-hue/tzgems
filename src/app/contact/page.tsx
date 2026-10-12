import { whatsappConfigured } from "@/lib/whatsapp";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArrowUpRight,
  Globe2,
  Camera,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryButton } from "@/components/Enquiry";
import { ContactEnquiry } from "@/components/ContactEnquiry";
import { brand } from "@/content/brand";
export const metadata: Metadata = {
  title: "Contact TZ GEMS",
  description:
    "Speak with TZ GEMS in Bangkok about Tanzanite gemstones, crystals and rough stones. Worldwide enquiries welcome.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact TZ GEMS",
    description: "A personal conversation about your next Tanzanite.",
    url: "/contact/",
  },
};
export default function ContactPage() {
  return (
    <main id="main-content" className="wrap page-content contact-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact/" },
        ]}
      />
      <div className="page-heading">
        <h1>Let’s talk Tanzanite.</h1>
        <p>Connect with TZ GEMS in Bangkok. Worldwide enquiries welcome.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-details">
          <div>
            <MessageCircle />
            <span>
              <h2>WhatsApp</h2>
              <p>
                {whatsappConfigured
                  ? "Chat with us on WhatsApp."
                  : "Our official WhatsApp number is not yet connected."}
              </p>
              <EnquiryButton className="text-link">
                {whatsappConfigured
                  ? "Enquire on WhatsApp"
                  : "Prepare a demo enquiry"}
                <ArrowUpRight size={15} />
              </EnquiryButton>
            </span>
          </div>
          <div>
            <MapPin />
            <span>
              <h2>Location</h2>
              <p>Bangkok, Thailand</p>
              <small>Contact us directly to arrange a visit.</small>
            </span>
          </div>
          <div>
            <Globe2 />
            <span>
              <h2>Worldwide Shipping</h2>
              <p>Discuss delivery options with our team.</p>
              <small>
                Destinations, timing and costs are confirmed individually.
              </small>
            </span>
          </div>
          <div>
            <Camera />
            <span>
              <h2>Instagram</h2>
              <a
                href={brand.instagram}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                @tzgems_bkk
                <ArrowUpRight size={15} />
              </a>
            </span>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="contact-enquiry">Preparing your enquiry…</div>
          }
        >
          <ContactEnquiry />
        </Suspense>
      </div>
    </main>
  );
}
