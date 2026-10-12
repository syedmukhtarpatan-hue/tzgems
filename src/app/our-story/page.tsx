import type { Metadata } from "next";
import { Gem, Globe2, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { Closing } from "@/components/Closing";
import { images } from "@/content/images";
export const metadata: Metadata = {
  title: "Our Story",
  description:
    "One gemstone. A lifelong fascination. Discover TZ GEMS, Bangkok-based Tanzanite specialists since 1996.",
  alternates: { canonical: "/our-story/" },
  openGraph: {
    title: "Our Story | TZ GEMS",
    description: "A passion for Tanzanite, from Bangkok to the world.",
    url: "/our-story/",
  },
};
export default function StoryPage() {
  return (
    <main id="main-content">
      <div className="wrap page-content">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Our Story", href: "/our-story/" },
          ]}
        />
        <section className="story-intro split">
          <div className="section-copy">
            <p className="eyebrow">TZ GEMS · SINCE 1996</p>
            <h1>
              One gemstone.
              <br />A lifelong fascination.
            </h1>
            <p>
              Specialising in Tanzanite since 1996, TZ GEMS brings together cut
              gemstones, rough stones and crystals. Based in Bangkok, we connect
              our passion for Tanzanite with clients worldwide.
            </p>
          </div>
          <figure>
            <Photo image={images.tweezers} />
            <figcaption className="image-caption">
              Illustrative gemstone photography
            </figcaption>
          </figure>
        </section>
        <section className="story-journey">
          <h2>Our Journey</h2>
          <p>
            Since 1996, Tanzanite has been at the heart of TZ GEMS. Our focus
            spans the gemstone in its many forms: the individuality of natural
            crystals, the possibilities held in rough stones, and the colour and
            character revealed by a considered cut.
          </p>
          <p>
            From Bangkok, Thailand, we welcome conversations with collectors,
            jewellers and gemstone enthusiasts around the world. Every enquiry
            begins with what matters to you — a particular shape, a colour, or a
            stone with its own distinctive character.
          </p>
          <figure>
            <Photo image={images.bangkok} />
            <figcaption className="image-caption">
              Bangkok, Thailand · illustrative cityscape
            </figcaption>
          </figure>
        </section>
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div>
              <ShieldCheck />
              <h3>Authenticity</h3>
              <p>
                Clear information about each gemstone and the details available
                for it.
              </p>
            </div>
            <div>
              <Gem />
              <h3>Expertise</h3>
              <p>A dedicated focus on Tanzanite since 1996.</p>
            </div>
            <div>
              <Globe2 />
              <h3>Global Reach</h3>
              <p>Connecting with clients worldwide from our home in Bangkok.</p>
            </div>
          </div>
        </section>
      </div>
      <Closing />
    </main>
  );
}
