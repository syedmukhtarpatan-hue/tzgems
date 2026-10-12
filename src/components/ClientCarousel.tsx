"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { images } from "@/content/images";
import { Photo } from "./Photo";
const slides = [
  { image: images.consultation, title: "A shared appreciation for colour" },
  { image: images.buyers, title: "Conversations that begin with a gemstone" },
  { image: images.inspection, title: "Taking a closer look, together" },
];
export function ClientCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () =>
      setPosition({
        start: element.scrollLeft < 4,
        end:
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 4,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  function step(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({
      left:
        direction *
        (element.firstElementChild?.getBoundingClientRect().width || 300),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      className="section client-section"
      aria-label="Our clients"
      aria-roledescription="carousel"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">A SHARED PASSION</p>
          <h2>Our Clients</h2>
        </div>
        <div className="carousel-controls">
          <button
            className="icon-button"
            aria-label="Previous client photograph"
            disabled={position.start}
            onClick={() => step(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            className="icon-button"
            aria-label="Next client photograph"
            disabled={position.end}
            onClick={() => step(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="carousel-track"
        tabIndex={0}
        aria-label="Client photographs; use left and right arrow keys to browse"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            step(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.title}
            className="client-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <Photo image={slide.image} />
            <figcaption>
              {slide.title}
              <small>
                Demonstration image · not an actual client photograph
              </small>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
