import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="TZ GEMS home">
      {brand.logo ? (
        <Image
          src={brand.logo}
          width={184}
          height={52}
          alt="TZ GEMS"
          priority
        />
      ) : (
        <span className="brand-text">
          TZ GEMS<small>TANZANITE GEMSTONE & JEWELLERY</small>
        </span>
      )}
    </Link>
  );
}
