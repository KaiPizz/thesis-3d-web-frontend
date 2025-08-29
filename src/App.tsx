import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/fallback/ImageWithFallback";

// Full product list (9 items)
const products = [
  {
    id: 1,
    name: "Modern Sofa",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Comfortable 3-seater sofa with modern design",
    material: "Fabric & Wood",
  },
  {
    id: 2,
    name: "Coffee Table",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop",
    description: "Contemporary coffee table with clean lines",
    material: "Walnut Wood",
  },
  {
    id: 3,
    name: "Floor Lamp",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    description: "Minimalist floor lamp with adjustable brightness",
    material: "Aluminum",
  },
  {
    id: 4,
    name: "Dining Chair",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Ergonomic dining chair with cushioned seat",
    material: "Oak Wood",
  },
  {
    id: 5,
    name: "Bookshelf",
    price: 449,
    image: "https://m.media-amazon.com/images/I/71pr1F0VWRL._AC_SL1500_.jpg",
    description: "Five-tier bookshelf with modern design",
    material: "Pine Wood",
  },
  {
    id: 6,
    name: "Side Table",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    description: "Elegant side table with storage drawer",
    material: "Bamboo",
  },
  {
    id: 7,
    name: "Wall Mirror",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop",
    description: "Round mirror with metallic frame",
    material: "Glass & Metal",
  },
  {
    id: 8,
    name: "Plant Pot",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    description: "Ceramic plant pot for indoor plants",
    material: "Ceramic",
  },
  {
    id: 9,
    name: "Throw Pillow",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
    description: "Soft throw pillow with geometric pattern",
    material: "Cotton",
  },
];

// Simple dark mode hook
function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

export default function App() {
  const { dark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">🛋️ FurniStore</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            onClick={toggle}
            className="ml-4 rounded-md px-3 py-1.5 text-sm border border-border hover:bg-muted transition-colors"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-muted/30 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Modern Furniture &amp; Decor
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our carefully curated collection of contemporary furniture
            and home decorations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow">
              Shop Now
            </button>
            <button className="border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Featured Products
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Browse through our selection of high-quality furniture and
              decorative items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <Badge variant="secondary">${product.price}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Material: {product.material}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-12">
        <div className="container mx-auto px-4 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-3">FurniStore</h5>
              <p className="text-muted-foreground">
                Your destination for modern furniture and home decor.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Products</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Furniture</li>
                <li>Lighting</li>
                <li>Decor</li>
                <li>Storage</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Company</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Support</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Warranty</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
            © {new Date().getFullYear()} FurniStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
