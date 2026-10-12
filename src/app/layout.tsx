import type { Metadata } from "next";
import "@fontsource/libre-baskerville/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-400.css";
import "./globals.css";
import { brand } from "@/content/brand";
import { EnquiryProvider } from "@/components/Enquiry";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  icons: { icon: { url: "/images/tanzanite-hero.webp", type: "image/webp" } },
  title: {
    default: "TZ GEMS — Tanzanite, in its rarest light.",
    template: "%s | TZ GEMS",
  },
  description:
    "Explore Tanzanite with TZ GEMS, a specialist in Bangkok since 1996. An editorial gemstone showroom and direct enquiry experience.",
  robots: { index: brand.indexable, follow: brand.indexable },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: "TZ GEMS — Tanzanite, in its rarest light.",
    description: "A closer look at Tanzanite. Bangkok · Since 1996.",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/images/tanzanite-hero.webp",
        width: 1400,
        height: 933,
        alt: "Illustrative Tanzanite gemstone — TZ GEMS demonstration showroom",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <EnquiryProvider>
          <Header />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand.name,
              alternateName: brand.identity,
              url: brand.siteUrl,
              description: "Tanzanite specialists in Bangkok since 1996.",
              sameAs: [brand.instagram],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
            }}
          />
          {children}
          <Footer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
