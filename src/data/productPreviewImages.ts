/**
 * Mapping of product slugs to their preview images.
 * Images are stored in public/preview/{product-folder}/
 */
export const productPreviewImages: Record<string, string[]> = {
  "wooden-dining-chair": [
    "/preview/dining-chair/chair.png",
    "/preview/dining-chair/chair1.png",
    "/preview/dining-chair/chair2.png",
    "/preview/dining-chair/chair3.png",
    "/preview/dining-chair/chair4.png",
    "/preview/dining-chair/chair5.png",
  ],
  "ergonomic-office-chair": [
    "/preview/office-chair/office-chair.png",
  ],
  "classic-velvet-armchair": [
    "/preview/classic-velvet-armchair/velvet-armchair.png",
    "/preview/classic-velvet-armchair/velvet-armchair1.png",
    "/preview/classic-velvet-armchair/velvet-armchair2.png",
    "/preview/classic-velvet-armchair/velvet-armchair3.png",
    "/preview/classic-velvet-armchair/velvet-armchair4.png",
    "/preview/classic-velvet-armchair/velvet-armchair5.png",
    "/preview/classic-velvet-armchair/velvet-armchair6.png",
  ],
  "scandinavian-lounge-armchair": [
    "/preview/lounge-armchair/lounge-armchair.png",
    "/preview/lounge-armchair/lounge-armchair1.png",
    "/preview/lounge-armchair/lounge-armchair2.png",
    "/preview/lounge-armchair/lounge-armchair3.png",
    "/preview/lounge-armchair/lounge-armchair4.png",
  ],
  "big-dog-lamp": [
    "/preview/big-dog-lamp/big-dog-lamp.webp",
  ],
  "small-dog-lamp": [
    "/preview/small-dog-lamp/small-dog-lamp.jpg",
  ],
};

/**
 * Get preview images for a product by slug
 */
export function getPreviewImages(slug: string): string[] {
  return productPreviewImages[slug] ?? [];
}
