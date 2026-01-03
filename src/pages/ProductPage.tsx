import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import type { Product, Variant } from "../api/types";
import ModelViewer3D from "../components/ModelViewer3d";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductPreviewGallery from "../components/product/ProductPreviewGallery";
import { getPreviewImages } from "../data/productPreviewImages";
import "@google/model-viewer";

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
        const previewImages = getPreviewImages(data.slug);
        setProduct({
          ...data,
          previewImages: previewImages.length > 0 ? previewImages : undefined,
        });

        const variants = data.variants ?? [];
        // For useOriginalColor products, start with null (original textures)
        // Otherwise use the default variant
        if (data.useOriginalColor) {
          setSelectedVariant(null);
        } else {
          const defaultVar =
            variants.find((v) => v.isDefault) ?? variants[0] ?? null;
          setSelectedVariant(defaultVar);
        }

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
  // If useOriginalColor is true AND no variant selected (null), preserve original textures
  // Otherwise apply the selected variant's color
  const colorHex =
    product?.useOriginalColor && selectedVariant === null
      ? undefined
      : selectedVariant?.colorHex ?? product?.baseColor;

  // Derive variant name for display
  const variantDisplayName =
    selectedVariant === null && product?.useOriginalColor
      ? product?.originalColorName ?? "Original color"
      : selectedVariant?.name ?? "Base color";

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
    <>
      <div className="lg:flex lg:h-[calc(100vh-65px)] lg:overflow-hidden">
        <div className="lg:w-1/2 lg:h-full lg:flex-shrink-0">
          <div className="h-full flex flex-col p-4 lg:p-6">
            <div className="lg:flex-1 lg:min-h-0 rounded-2xl border bg-muted/30 p-2 flex flex-col aspect-square lg:aspect-auto">
              <div className="flex-1 min-h-0">
                {glbSrc ? (
                  <ModelViewer3D
                    src={glbSrc}
                    colorHex={colorHex}
                    className="rounded-xl"
                    height="100%"
                  />
                ) : thumb ? (
                  <img
                    src={thumb}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center rounded-xl bg-muted/40 text-muted-foreground">
                    No preview available
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground flex-shrink-0">
                Drag to rotate, scroll to zoom.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lg:h-full lg:overflow-y-auto">
          <div className="px-4 py-6 lg:px-8 lg:py-10">
            {/* Product details */}
            <aside>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>

              {/* Category */}
              {product.category && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Category: {product.category.name}
                </p>
              )}

              {/* Colors / variants - only show if there are variants to choose from */}
              {variants.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Available variants</h3>

                  <div className="flex flex-wrap gap-2">
                    {/* Original color option for useOriginalColor products */}
                    {product.useOriginalColor && (
                      <button
                        onClick={() => setSelectedVariant(null)}
                        className={`h-9 w-9 rounded-full border shadow-sm ring-offset-2 transition-all overflow-hidden ${
                          selectedVariant === null
                            ? "ring-2 ring-ring scale-110"
                            : "hover:scale-105"
                        }`}
                        title={product.originalColorName ?? "Original color"}
                        aria-label={
                          product.originalColorName ?? "Original color"
                        }
                        style={{
                          background: product.originalColorPreview ?? "#888888",
                        }}
                      />
                    )}
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

                  {/* Active variant name */}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {variantDisplayName}
                  </p>
                </div>
              )}

              <ProductSpecs specs={product.specs} />
            </aside>
            {product.previewImages && product.previewImages.length > 0 && (
              <div className="mt-10">
                <h3 className="font-medium mb-4">Product Gallery</h3>
                <ProductPreviewGallery
                  images={product.previewImages.map(withBase)}
                  alt={product.name}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
