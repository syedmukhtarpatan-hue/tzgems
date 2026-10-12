"use client";
import { wrapDialogFocus } from "@/lib/dialog";
import { useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { GemImage } from "@/content/types";
import { Photo } from "./Photo";
export function ImageGallery({
  images,
  label,
}: {
  images: GemImage[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState(false);
  const lightbox = useRef<HTMLDialogElement>(null);
  const current = images[active];
  if (!current) return null;
  return (
    <div className="gallery">
      <button
        className={`gallery-main ${detail ? "detail-view" : ""}`}
        onClick={() => lightbox.current?.showModal()}
        aria-label={`Enlarge ${label}`}
      >
        <Photo image={current} priority />
        <span className="gallery-expand">
          <Expand size={17} />
          <span>Enlarge</span>
        </span>
      </button>
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            aria-label={`View full image ${index + 1}`}
            aria-pressed={active === index && !detail}
            onClick={() => {
              setActive(index);
              setDetail(false);
            }}
          >
            <Photo image={image} />
          </button>
        ))}
        <button
          aria-label="View enlarged facet detail"
          className="thumbnail-detail"
          aria-pressed={detail}
          onClick={() => setDetail(true)}
        >
          <Photo image={current} />
        </button>
      </div>
      <p className="image-caption">
        AI illustration · demonstration only. Detail view uses the same image.
      </p>
      <dialog
        onKeyDown={wrapDialogFocus}
        ref={lightbox}
        className="lightbox"
        aria-label={`${label} enlarged image`}
        onClick={(e) => {
          if (e.target === e.currentTarget) lightbox.current?.close();
        }}
      >
        <button
          className="icon-button close-dialog"
          aria-label="Close image viewer"
          onClick={() => lightbox.current?.close()}
        >
          <X />
        </button>
        <Photo image={current} />
        <p>Illustrative gemstone · not an inventory photograph</p>
      </dialog>
    </div>
  );
}
