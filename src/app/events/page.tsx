import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { images } from "@/content/images";
export const metadata: Metadata = {
  title: "Events & Exhibitions",
  description:
    "Meet the world of TZ GEMS through conversations, exhibitions and a shared appreciation for Tanzanite. Demonstration gallery awaiting verified event details.",
  alternates: { canonical: "/events/" },
  openGraph: {
    title: "Events & Exhibitions | TZ GEMS",
    description: "Beyond the showroom. A shared passion for Tanzanite.",
    url: "/events/",
  },
};
export default function EventsPage() {
  return (
    <main id="main-content" className="wrap page-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Events", href: "/events/" },
        ]}
      />
      <div className="page-heading">
        <p className="eyebrow">BEYOND THE SHOWROOM</p>
        <h1>Events & Exhibitions</h1>
        <p>Gemstone conversations and connections around the world.</p>
      </div>
      <div className="notice">
        <strong>Demonstration gallery</strong>
        <p>
          These scenes are illustrative. Verified TZ GEMS event photographs,
          names, locations and years have not yet been supplied.
        </p>
      </div>
      <div className="events-grid full-events">
        {[
          { title: "Exhibition conversations", image: images.consultation },
          { title: "A closer look at Tanzanite", image: images.buyers },
        ].map((item) => (
          <article key={item.title} className="event-card">
            <Photo image={item.image} />
            <div className="event-copy">
              <span className="eyebrow">DEMONSTRATION SCENE</span>
              <h2>{item.title}</h2>
              <p>Location and year: not supplied</p>
              <p>
                Illustrative people and setting; no TZ GEMS attendance or client
                relationship is implied.
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="inline-cta">
        <div>
          <h2>Let’s meet over a gemstone.</h2>
          <p>
            Contact the team to discuss an appointment or future exhibition
            plans.
          </p>
        </div>
        <Link className="button primary" href="/contact/">
          Contact Us
          <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
