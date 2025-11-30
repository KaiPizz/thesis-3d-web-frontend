import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api/client";
import type { Product, Category } from "../api/types";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/fallback/ImageWithFallback";
import BackToTop from "../components/ArrowToTop";

// Prepend Vite base path for static assets
const withBase = (p?: string) =>
  p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}` : "";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Product[]>("/api/products")
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      });

    apiFetch<Category[]>("/api/categories")
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {
        // Silently fail - just hide the filter bar
        setCategories([]);
      });
  }, []);

  const filteredProducts =
    selectedCategoryId === null
      ? products
      : products.filter((p) => p.category?.id === selectedCategoryId);

  if (loading) {
    return <div className="py-16 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Failed to load products.
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-8 text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Modern Furniture &amp; Decor
          </h2>
          <p className="mx-auto mb-3 max-w-2xl text-lg text-muted-foreground">
            Discover our curated collection of contemporary furniture and home
            decorations
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main id="catalog" className="py-8">
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

          {/* Category Filter Bar */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategoryId === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategoryId === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={withBase(p.thumbnailUrl)}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {p.name}
                        </h4>
                        {p.isFeatured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {p.description}
                      </p>
                      {p.category && (
                        <p className="text-xs text-muted-foreground">
                          Category: {p.category.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No products found in this category.
            </p>
          )}
        </div>
      </main>
      <BackToTop showAfter={300} />
    </>
  );
}
