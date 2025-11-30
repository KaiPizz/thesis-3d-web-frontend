import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import type { Product, Variant } from "../api/types";
import ModelViewer3D from "../components/ModelViewer3d";
import "@google/model-viewer";

// builds a correct path under your Vite base (/thesis-3d-web-frontend/)
const withBase = (p?: string) =>
  p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}` : "";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    apiFetch<Product>(`/api/products/${id}`)
      .then((data) => {
        setProduct(data);

        // pick default variant or first variant
        const variants = data.variants ?? [];
        const defaultVar =
          variants.find((v) => v.isDefault) ?? variants[0] ?? null;
        setSelectedVariant(defaultVar);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
        setError(err.message || "Failed to fetch product");
        setLoading(false);
      });
  }, [id]);

  const glbSrc = useMemo(() => {
    if (!product) return "";
    return withBase(product.modelUrl);
  }, [product]);

  const thumb = useMemo(() => {
    if (!product) return "";
    return withBase(product.thumbnailUrl);
  }, [product]);

  // Derive colorHex from selectedVariant, fallback to product.baseColor
  const colorHex = selectedVariant?.colorHex ?? product?.baseColor;

  // Derive variant name for display
  const variantDisplayName = selectedVariant?.name ?? "Base color";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-sm text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-sm text-muted-foreground">
          Product not found.{" "}
          <Link to="/" className="text-blue-600 underline">
            Back to home
          </Link>
        </p>
      </div>
    );
  }

  const variants = product.variants ?? [];

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 3D viewer (or image fallback) */}
        <div className="rounded-2xl border bg-muted/30 p-2">
          {glbSrc ? (
            <ModelViewer3D
              src={glbSrc}
              colorHex={colorHex}
              className="rounded-xl"
            />
          ) : thumb ? (
            <img
              src={thumb}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-xl"
            />
          ) : (
            <div className="w-full aspect-square grid place-items-center rounded-xl bg-muted/40 text-muted-foreground">
              No preview available
            </div>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Drag to rotate, scroll to zoom.
          </p>
        </div>

        {/* Right column: details */}
        <aside>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.description}</p>

          {/* Category */}
          {product.category && (
            <p className="mt-1 text-xs text-muted-foreground">
              Category: {product.category.name}
            </p>
          )}

          {/* Colors / variants */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">
              {variants.length > 0 ? "Available variants" : "Color"}
            </h3>

            {variants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`h-9 w-9 rounded-full border shadow-sm ring-offset-2 transition-all ${
                      selectedVariant?.id === v.id
                        ? "ring-2 ring-ring scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: v.colorHex }}
                    title={v.name}
                    aria-label={v.name}
                  />
                ))}
              </div>
            ) : (
              <div
                className="h-9 w-9 rounded-full border shadow-sm"
                style={{ backgroundColor: product.baseColor }}
                title="Base color"
              />
            )}

            {/* Active variant name */}
            <p className="mt-2 text-sm text-muted-foreground">
              {variantDisplayName}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
