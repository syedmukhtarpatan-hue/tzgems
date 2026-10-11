"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GemImage } from "@/content/types";
export function ImageGallery({ images, label }: { images: GemImage[]; label: string }) {
  const [active, setActive] = useState(0);
  const lightbox = useRef<HTMLDialogElement>(null);
  if (!images.length) return null;
  const current = images[active];
  function step(direction: number) { setActive(index => (index + direction + images.length) % images.length); }
  return <div className="gallery"><button className="gallery-main" onClick={() => lightbox.current?.showModal()} aria-label={`Enlarge ${label}`}><Image src={current.src} width={current.width} height={current.height} alt={current.alt} sizes="(max-width: 768px) 100vw, 55vw" priority/><span className="gallery-expand"><Expand size={17}/> Enlarge</span></button><p className="image-caption">{current.illustrative ? "AI illustration · demonstration only" : label}</p>{images.length > 1 && <div className="gallery-thumbnails">{images.map((image, index) => <button aria-label={`View image ${index + 1} of ${label}`} aria-pressed={active === index} onClick={() => setActive(index)} key={`${image.src}-${index}`}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="80px"/></button>)}</div>}<dialog ref={lightbox} className="lightbox" aria-label={`${label} image viewer`} onClick={event => { if (event.target === event.currentTarget) lightbox.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }}><button className="icon-button lightbox-close" onClick={() => lightbox.current?.close()} aria-label="Close image viewer"><X/></button><Image src={current.src} width={current.width} height={current.height} alt={current.alt} sizes="90vw"/>{images.length > 1 && <div className="lightbox-controls"><button className="icon-button" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft/></button><span aria-live="polite">{active + 1} / {images.length}</span><button className="icon-button" aria-label="Next image" onClick={() => step(1)}><ChevronRight/></button></div>}</dialog></div>;
}
