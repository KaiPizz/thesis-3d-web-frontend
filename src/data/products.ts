export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  material: string;
};

export const products: Product[] = [
  { id: 1, slug: "modern-sofa", name: "Modern Sofa", price: 1299, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", description: "Comfortable 3-seater sofa with modern design", material: "Fabric & Wood" },
  { id: 2, slug: "coffee-table", name: "Coffee Table", price: 599, image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop", description: "Contemporary coffee table with clean lines", material: "Walnut Wood" },
  { id: 3, slug: "floor-lamp", name: "Floor Lamp", price: 189, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop", description: "Minimalist floor lamp with adjustable brightness", material: "Aluminum" },
  { id: 4, slug: "dining-chair", name: "Dining Chair", price: 249, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", description: "Ergonomic dining chair with cushioned seat", material: "Oak Wood" },
  { id: 5, slug: "bookshelf", name: "Bookshelf", price: 449, image: "https://m.media-amazon.com/images/I/71pr1F0VWRL._AC_SL1500_.jpg", description: "Five-tier bookshelf with modern design", material: "Pine Wood" },
  { id: 6, slug: "side-table", name: "Side Table", price: 299, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop", description: "Elegant side table with storage drawer", material: "Bamboo" },
  { id: 7, slug: "wall-mirror", name: "Wall Mirror", price: 159, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop", description: "Round mirror with metallic frame", material: "Glass & Metal" },
  { id: 8, slug: "plant-pot", name: "Plant Pot", price: 79, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", description: "Ceramic plant pot for indoor plants", material: "Ceramic" },
  { id: 9, slug: "throw-pillow", name: "Throw Pillow", price: 39, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop", description: "Soft throw pillow with geometric pattern", material: "Cotton" },
  {id: 10, slug: "area-rug", name: "Area Rug", price: 499, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop", description: "Plush area rug with modern design", material: "Polyester" },
  {id: 11, slug: "desk-lamp", name: "Desk Lamp", price: 129, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop", description: "Adjustable desk lamp with LED light", material: "Steel" },
  {id: 12, slug: "accent-chair", name: "Accent Chair", price: 799, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=400&fit=crop", description: "Stylish accent chair with plush upholstery", material: "Velvet & Wood" },
];
