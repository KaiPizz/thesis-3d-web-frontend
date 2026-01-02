import { useState, useRef } from "react";
import { cn } from "../ui/utils";

interface ProductPreviewGalleryProps {
  images?: string[];
  alt: string;
}

export default function ProductPreviewGallery({
  images,
  alt,
}: ProductPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    const previousIndex = activeIndex;
    setActiveIndex(index);

    // Scroll in the direction of navigation
    const container = scrollContainerRef.current;
    if (!container) return;

    const direction = index > previousIndex ? "right" : "left";
    // Thumbnail width (w-28 = 7rem = 112px) + gap (gap-3 = 0.75rem = 12px) = 124px
    const scrollAmount = 124;

    if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Main image */}
      <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/30">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-1 scroll-smooth"
        >
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200",
                activeIndex === index
                  ? "border-primary ring-2 ring-primary/60"
                  : "border-border hover:border-primary/50"
              )}
            >
              <img
                src={src}
                alt={`${alt} - view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

