"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
const placeholders = [
  { id: "placeholder-1", quote: "Space for your stories.", attribution: "Verified client feedback will appear here once it is supplied and approved." },
  { id: "placeholder-2", quote: "Words, shared with permission.", attribution: "Every review will be published with the client’s permission. No reviews have been added yet." },
  { id: "placeholder-3", quote: "A conversation worth having.", attribution: "In the meantime, speak directly with TZ GEMS about your next gemstone enquiry." },
];
export function Testimonials() {
  const approved = testimonials.filter(review => review.approved);
  const isDemo = approved.length === 0;
  const slides = isDemo ? placeholders : approved;
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const slide = slides[active];
  function step(direction: number) { setActive(index => (index + direction + slides.length) % slides.length); }
  return <section className="testimonials wrap section-space" aria-labelledby="testimonial-title"><div className="section-intro"><p className="eyebrow">In good company</p><h2 id="testimonial-title">Words From<br/><em>Our Clients.</em></h2></div><div className="testimonial-carousel" role="region" aria-roledescription="carousel" aria-label="Client feedback" tabIndex={0} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }} onTouchStart={event => { startX.current = event.touches[0].clientX; }} onTouchEnd={event => { if (startX.current !== null) { const distance = event.changedTouches[0].clientX - startX.current; if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1); startX.current = null; } }}><div aria-live="polite" aria-atomic="true" className="testimonial-slide"><p className="eyebrow placeholder-label">{isDemo ? "Development placeholder · not a client review" : "Client feedback"}</p>{isDemo ? <p className="testimonial-quote">{slide.quote}</p> : <blockquote className="testimonial-quote">“{slide.quote}”</blockquote>}<p className="testimonial-attribution">{slide.attribution}</p></div><div className="carousel-controls"><span className="eyebrow">0{active + 1}<span> / 0{slides.length}</span></span><div><button className="icon-button" onClick={() => step(-1)} aria-label="Previous testimonial"><ArrowLeft size={20}/></button><button className="icon-button" onClick={() => step(1)} aria-label="Next testimonial"><ArrowRight size={20}/></button></div></div></div></section>;
}
