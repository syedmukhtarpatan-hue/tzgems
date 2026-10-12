import Image from "next/image";
import type { GemImage } from "@/content/types";

export function Photo({
  image,
  className = "",
  priority = false,
}: {
  image: GemImage;
  className?: string;
  priority?: boolean;
}) {
  if (image.sheet) {
    const columns = image.sheet === "catalogue" ? 3 : 2;
    const tile = image.tile ?? 0;
    // The generated contact sheets have slightly unequal rows. Clip each
    // measured cell without changing the source image or distorting the gem.
    const row = Math.floor(tile / columns);
    const rows =
      image.sheet === "catalogue"
        ? [
            [0, 410],
            [414, 398],
            [814, 440],
          ]
        : [
            [0, 410],
            [412, 408],
            [822, 432],
          ];
    const cellWidth = 1254 / columns;
    const x = (tile % columns) * cellWidth + 7;
    const y = rows[row][0] + 7;
    const width = cellWidth - 14;
    const height = rows[row][1] - 14;
    return (
      <span className={`photo sheet-photo ${image.sheet} ${className}`}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={image.alt}
          preserveAspectRatio="xMidYMid meet"
        >
          <svg
            width={width}
            height={height}
            viewBox={`${x} ${y} ${width} ${height}`}
            overflow="hidden"
          >
            <image href={image.src} width="1254" height="1254" />
          </svg>
        </svg>
      </span>
    );
  }
  return (
    <span className={`photo ${className}`}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        priority={priority}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
    </span>
  );
}
