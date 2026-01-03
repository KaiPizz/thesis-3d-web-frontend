/**
 * Mapping of product slugs to their preview images.
 * Images are stored in public/preview/{product-folder}/
 */
export const productPreviewImages: Record<string, string[]> = {
  "wooden-dining-chair": [
    "/preview/dining-chair/chair1.png",
    "/preview/dining-chair/chair2.png",
    "/preview/dining-chair/chair3.png",
    "/preview/dining-chair/chair4.png",
    "/preview/dining-chair/chair5.png",
    "/preview/dining-chair/chair6.png",
  ],
  "ergonomic-office-chair": [
    "/preview/office-chair/office-chair1.png",
    "/preview/office-chair/office-chair2.png",
    "/preview/office-chair/office-chair3.png",
    "/preview/office-chair/office-chair4.png",
    "/preview/office-chair/office-chair5.png",
  ],
  "classic-velvet-armchair": [
    "/preview/classic-velvet-armchair/velvet-armchair1.png",
    "/preview/classic-velvet-armchair/velvet-armchair2.png",
    "/preview/classic-velvet-armchair/velvet-armchair3.png",
    "/preview/classic-velvet-armchair/velvet-armchair4.png",
    "/preview/classic-velvet-armchair/velvet-armchair5.png",
    "/preview/classic-velvet-armchair/velvet-armchair6.png",
  ],
  "scandinavian-lounge-armchair": [
    "/preview/lounge-armchair/lounge-armchair1.png",
    "/preview/lounge-armchair/lounge-armchair2.png",
    "/preview/lounge-armchair/lounge-armchair3.png",
    "/preview/lounge-armchair/lounge-armchair4.png",
    "/preview/lounge-armchair/lounge-armchair5.png",
    "/preview/lounge-armchair/lounge-armchair6.png",
  ],
  "big-dog-lamp": [
    "/preview/big-dog-lamp/big-dog-lamp1.png",
    "/preview/big-dog-lamp/big-dog-lamp2.png",
    "/preview/big-dog-lamp/big-dog-lamp3.png",
    "/preview/big-dog-lamp/big-dog-lamp4.png",
  ],
  "small-dog-lamp": [
    "/preview/small-dog-lamp/small-dog-lamp1.png",
    "/preview/small-dog-lamp/small-dog-lamp2.png",
  ],
  "fabric-armchair": [
    "/preview/fabric-armchair/fabric-armchair1.png",
    "/preview/fabric-armchair/fabric-armchair2.png",
    "/preview/fabric-armchair/fabric-armchair3.png",
    "/preview/fabric-armchair/fabric-armchair4.png",
  ],
  "wooden-coffee-table": [
    "/preview/classic-table/classic-table1.png",
    "/preview/classic-table/classic-table2.png",
  ],
  "piskor-sculpture": [
    "/preview/piskor-sculpture/piskor-sculpture1.png",
    "/preview/piskor-sculpture/piskor-sculpture2.png",
    "/preview/piskor-sculpture/piskor-sculpture3.png",
    "/preview/piskor-sculpture/piskor-sculpture4.png",
    "/preview/piskor-sculpture/piskor-sculpture5.png",
  ],
  "coffee-table-jais": [
    "/preview/jais-table/jais-table1.png",
    "/preview/jais-table/jais-table2.png",
    "/preview/jais-table/jais-table3.png",
  ],
  "xander-desk": [
    "/preview/xander-desk/xander-desk1.png",
    "/preview/xander-desk/xander-desk2.png",
    "/preview/xander-desk/xander-desk3.png",
    "/preview/xander-desk/xander-desk4.png",
    "/preview/xander-desk/xander-desk5.png",
  ],
};

/**
 * Get preview images for a product by slug
 */
export function getPreviewImages(slug: string): string[] {
  return productPreviewImages[slug] ?? [];
}
