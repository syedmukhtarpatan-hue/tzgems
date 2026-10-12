import { whatsappConfigured } from "@/lib/whatsapp";
import Link from "next/link";
import { Globe2, Camera, MapPin, MessageCircle } from "lucide-react";
import { brand, navigation } from "@/content/brand";
import { Brand } from "./Brand";
import { EnquiryButton } from "./Enquiry";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Tanzanite in all its forms.
              <br />
              Bangkok specialists since 1996.
            </p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            {navigation
              .filter((x) => x.label !== "Home" && x.label !== "Tanzanite")
              .map((x) => (
                <Link key={x.label} href={x.href}>
                  {x.label}
                </Link>
              ))}
          </div>
          <div className="footer-column">
            <h2>The Collection</h2>
            <Link href="/gemstones/?category=cut-polished">Cut Gemstones</Link>
            <Link href="/gemstones/?category=crystals">Crystals</Link>
            <Link href="/gemstones/?category=rough">Rough Stones</Link>
          </div>
          <div className="footer-column">
            <h2>Connect with us</h2>
            <span>
              <MapPin />
              Bangkok, Thailand
            </span>
            <span>
              <Globe2 />
              Worldwide shipping
            </span>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
              <Camera />
              @tzgems_bkk
            </a>
            <EnquiryButton className="footer-contact">
              <MessageCircle />
              WhatsApp{!whatsappConfigured && " · demo"}
            </EnquiryButton>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} TZ GEMS. All rights reserved.
          </span>
          <span>Design preview · illustrative inventory</span>
          <Link href="/privacy-policy/">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
