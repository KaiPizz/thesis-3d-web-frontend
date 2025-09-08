import { Link } from "react-router-dom";
import { products } from "../data/products";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/fallback/ImageWithFallback";
import BackToTop from "../components/ArrowToTop";

export default function Home() {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {p.name}
                        </h4>
                        <Badge variant="secondary">${p.price}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {p.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Material: {p.material}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <BackToTop showAfter={300} />
    </>
  );
}
