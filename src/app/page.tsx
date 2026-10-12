import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/content/images";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";
import { ClientCarousel } from "@/components/ClientCarousel";
import { Closing } from "@/components/Closing";
export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">BANGKOK · SINCE 1996</p>
            <h1>
              Tanzanite,
              <br />
              in its rarest light.
            </h1>
            <p>
              Discover fine Tanzanite gemstones, crystals and rough stones from
              Bangkok specialists.
            </p>
            <div className="button-row">
              <Link href="/gemstones/" className="button primary">
                Explore Collection <ArrowRight size={16} />
              </Link>
              <Link href="/contact/" className="button outline">
                Contact Us
              </Link>
            </div>
          </div>
          <Photo image={images.hero} className="hero-image" priority />
        </div>
      </section>
      <div className="wrap">
        <TrustStrip />
        <section className="section story-preview split" id="our-story">
          <figure>
            <Photo image={images.tweezers} />
            <figcaption className="image-caption">
              Illustrative gemstone photography
            </figcaption>
          </figure>
          <div className="section-copy">
            <p className="eyebrow">OUR STORY</p>
            <h2>
              One gemstone.
              <br />A lifelong fascination.
            </h2>
            <p>
              Specialising in Tanzanite since 1996, TZ GEMS brings together cut
              gemstones, rough stones and crystals. Based in Bangkok, we connect
              a passion for this remarkable gemstone with clients around the
              world.
            </p>
            <Link href="/our-story/" className="text-link">
              Read Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="section categories-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE TANZANITE</p>
              <h2>Beauty in every form.</h2>
            </div>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                className="category-card"
                href={category.href}
                key={category.id}
              >
                <Photo image={category.image} />
                <div>
                  <h3>
                    {category.name}
                    <ArrowRight size={18} />
                  </h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="image-caption">
            Illustrative images · explore styles and enquire about current
            inventory
          </p>
        </section>
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED FOR A CLOSER LOOK</p>
              <h2>The Collection</h2>
            </div>
            <Link href="/gemstones/" className="text-link">
              View All Gemstones <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid featured-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
          <p className="image-caption">
            Demonstration catalogue. Actual specifications and availability are
            confirmed on enquiry.
          </p>
        </section>
        <section
          className="section split certification-section"
          id="certification"
        >
          <div className="section-copy">
            <p className="eyebrow">CERTIFICATION</p>
            <h2>Confidence in Every Detail.</h2>
            <p>
              Every gemstone deserves a closer look. Ask about a stone’s
              treatment, origin information and any applicable independent
              gemological report.
            </p>
            <p>
              Report availability is confirmed individually. This preview
              contains no verified certificates or laboratory reports.
            </p>
            <Link href="/contact/" className="text-link">
              Ask About Certification <ArrowRight size={16} />
            </Link>
          </div>
          <figure>
            <Photo image={images.inspection} />
            <figcaption className="image-caption">
              Illustrative inspection · not a certification report
            </figcaption>
          </figure>
        </section>
        <section className="section process-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR PROCESS</p>
              <h2>The Art Behind Every Cut.</h2>
            </div>
          </div>
          <div className="process-grid">
            {[
              { name: "Rough Selection", image: images.rough },
              { name: "Cutting & Shaping", image: images.cutting },
              { name: "Polishing", image: images.polishing },
              { name: "Finished Gemstone", image: images.oval },
            ].map((stage, index) => (
              <figure key={stage.name}>
                <Photo image={stage.image} />
                <figcaption>
                  <span>{index + 1}.</span> {stage.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="image-caption">
            An illustrative journey from rough material to a finished gemstone.
          </p>
        </section>
        <ClientCarousel />
        <section className="section events-preview">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EVENTS & EXHIBITIONS</p>
              <h2>Beyond the Showroom.</h2>
            </div>
            <Link href="/events/" className="text-link">
              Explore Events <ArrowRight size={16} />
            </Link>
          </div>
          <p className="section-intro">
            Conversations, connections and a shared appreciation for Tanzanite.
          </p>
          <div className="events-grid">
            {[
              { image: images.consultation, title: "Gemstone conversations" },
              { image: images.buyers, title: "A meeting of perspectives" },
            ].map((item) => (
              <Link href="/events/" className="event-card" key={item.title}>
                <Photo image={item.image} />
                <h3>
                  {item.title}
                  <ArrowRight size={16} />
                </h3>
                <p>Demonstration scene · event details to be supplied</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Closing />
    </main>
  );
}
