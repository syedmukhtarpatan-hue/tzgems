import Image from "next/image";
import type { GemImage } from "@/content/types";
export function EditorialImage({ image, className = "", caption = "AI illustration · not inventory photography", priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { image: GemImage; className?: string; caption?: string; priority?: boolean; sizes?: string }) {
  return <figure className={`editorial-image ${className}`}><div className="image-crop"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority}/></div><figcaption>{caption}</figcaption></figure>;
}
