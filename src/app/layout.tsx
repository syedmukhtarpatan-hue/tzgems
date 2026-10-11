import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { brand } from "@/content/brand";
import { EnquiryProvider } from "@/components/Enquiry";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: "TZ GEMS — The Art of Tanzanite", template: "%s | TZ GEMS" },
  description: "Explore Tanzanite with TZ GEMS, a specialist in Bangkok since 1996. An editorial gemstone showroom and direct enquiry experience.",
  robots: { index: brand.indexable, follow: brand.indexable },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: brand.name, title: "TZ GEMS — The Art of Tanzanite", description: "A closer look at Tanzanite. Bangkok · Since 1996.", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><EnquiryProvider><Header/>{children}<Footer/></EnquiryProvider></body></html>;
}
