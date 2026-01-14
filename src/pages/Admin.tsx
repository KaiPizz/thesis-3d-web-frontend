import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { apiFetch, apiPost, apiDelete } from "../api/client";
import type { Product, Category } from "../api/types";

// Simple password protection
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "Gm11022003";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  modelUrl: string;
  thumbnailUrl: string;
  baseColor: string;
  isFeatured: boolean;
}

interface VariantFormData {
  name: string;
  colorHex: string;
  isDefault: boolean;
}

const emptyProductForm: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  categoryId: "",
  modelUrl: "",
  thumbnailUrl: "",
  baseColor: "#8B4513",
  isFeatured: false,
};

const emptyVariantForm: VariantFormData = {
  name: "",
  colorHex: "#000000",
  isDefault: false,
};

export default function Admin() {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productForm, setProductForm] =
    useState<ProductFormData>(emptyProductForm);
  const [submitting, setSubmitting] = useState(false);

  // Track which product is showing the variant form
  const [variantProductId, setVariantProductId] = useState<string | null>(null);
  const [variantForm, setVariantForm] =
    useState<VariantFormData>(emptyVariantForm);

  // Handle password submission
  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
      // Store in sessionStorage so it persists during the session
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setAuthError("Incorrect password. Please try again.");
      setPasswordInput("");
    }
  };

  // Check if already authenticated in this session
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        apiFetch<Product[]>("/api/admin/products"),
        apiFetch<Category[]>("/api/categories"),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiPost("/api/admin/products", productForm);
      setProductForm(emptyProductForm);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await apiDelete(`/api/admin/products/${id}`);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  const handleVariantSubmit = async (e: FormEvent, productId: string) => {
    e.preventDefault();

    try {
      await apiPost(`/api/admin/variants/${productId}`, variantForm);
      setVariantForm(emptyVariantForm);
      setVariantProductId(null);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create variant");
    }
  };

  const handleDeleteVariant = async (
    variantId: string,
    variantName: string,
    productName: string
  ) => {
    if (
      !window.confirm(
        `Are you sure you want to delete variant "${variantName}" from "${productName}"?`
      )
    ) {
      return;
    }

    try {
      await apiDelete(`/api/admin/variants/${variantId}`);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete variant");
    }
  };

  // Show password prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="p-8 border border-border rounded-lg bg-muted/30">
          <h1 className="text-2xl font-bold mb-2 text-center">
            🔐 Admin Access
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Enter the admin password to continue
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                required
                autoFocus
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-center text-lg tracking-widest"
              />
            </div>
            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              Unlock Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Loading admin data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchData();
          }}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("adminAuth");
            setIsAuthenticated(false);
          }}
          className="px-4 py-2 text-sm border border-border rounded hover:bg-muted"
        >
          🔒 Logout
        </button>
      </div>

      {/* Create Product Form */}
      <section className="mb-12 p-6 border border-border rounded-lg bg-muted/30">
        <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
        <form
          onSubmit={handleProductSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              value={productForm.slug}
              onChange={(e) =>
                setProductForm({ ...productForm, slug: e.target.value })
              }
              required
              placeholder="e.g. modern-chair"
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 border border-border rounded bg-background resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={productForm.categoryId}
              onChange={(e) =>
                setProductForm({ ...productForm, categoryId: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-border rounded bg-background"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Base Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={productForm.baseColor}
                onChange={(e) =>
                  setProductForm({ ...productForm, baseColor: e.target.value })
                }
                className="h-10 w-14 border border-border rounded cursor-pointer"
              />
              <input
                type="text"
                value={productForm.baseColor}
                onChange={(e) =>
                  setProductForm({ ...productForm, baseColor: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-border rounded bg-background"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Model URL</label>
            <input
              type="text"
              value={productForm.modelUrl}
              onChange={(e) =>
                setProductForm({ ...productForm, modelUrl: e.target.value })
              }
              required
              placeholder="/models/chair.glb"
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={productForm.thumbnailUrl}
              onChange={(e) =>
                setProductForm({ ...productForm, thumbnailUrl: e.target.value })
              }
              required
              placeholder="/thumbnails/chair.webp"
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={productForm.isFeatured}
              onChange={(e) =>
                setProductForm({ ...productForm, isFeatured: e.target.checked })
              }
              className="h-4 w-4"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">
              Featured Product
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </section>

      {/* Products List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Products ({products.length})
        </h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Featured
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Variants
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <>
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {product.slug}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.category?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.isFeatured ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {product.variants?.length ?? 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-right space-x-2">
                      <button
                        onClick={() =>
                          setVariantProductId(
                            variantProductId === product.id ? null : product.id
                          )
                        }
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {variantProductId === product.id
                          ? "Cancel"
                          : "Add Variant"}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteProduct(product.id, product.name)
                        }
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Show existing variants row */}
                  {product.variants && product.variants.length > 0 && (
                    <tr
                      key={`${product.id}-variants-list`}
                      className="bg-muted/20"
                    >
                      <td colSpan={5} className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-muted-foreground">
                            Variants:
                          </span>
                          {product.variants.map((v) => (
                            <div
                              key={v.id}
                              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-background border border-border rounded"
                            >
                              <span
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: v.colorHex }}
                              />
                              <span>{v.name}</span>
                              {v.isDefault && (
                                <span className="text-green-600 text-[10px]">
                                  (default)
                                </span>
                              )}
                              <button
                                onClick={() =>
                                  handleDeleteVariant(
                                    v.id,
                                    v.name,
                                    product.name
                                  )
                                }
                                className="ml-1 text-red-600 hover:text-red-800 font-bold"
                                title={`Delete ${v.name}`}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  )}

                  {/* Inline Variant Form */}
                  {variantProductId === product.id && (
                    <tr key={`${product.id}-variant`} className="bg-muted/30">
                      <td colSpan={6} className="px-4 py-4">
                        <form
                          onSubmit={(e) => handleVariantSubmit(e, product.id)}
                          className="flex flex-wrap items-end gap-4"
                        >
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Variant Name
                            </label>
                            <input
                              type="text"
                              value={variantForm.name}
                              onChange={(e) =>
                                setVariantForm({
                                  ...variantForm,
                                  name: e.target.value,
                                })
                              }
                              required
                              placeholder="e.g. Walnut Brown"
                              className="px-3 py-1.5 text-sm border border-border rounded bg-background"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Color Hex
                            </label>
                            <div className="flex gap-1">
                              <input
                                type="color"
                                value={variantForm.colorHex}
                                onChange={(e) =>
                                  setVariantForm({
                                    ...variantForm,
                                    colorHex: e.target.value,
                                  })
                                }
                                className="h-8 w-10 border border-border rounded cursor-pointer"
                              />
                              <input
                                type="text"
                                value={variantForm.colorHex}
                                onChange={(e) =>
                                  setVariantForm({
                                    ...variantForm,
                                    colorHex: e.target.value,
                                  })
                                }
                                required
                                className="w-24 px-2 py-1.5 text-sm border border-border rounded bg-background"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`isDefault-${product.id}`}
                              checked={variantForm.isDefault}
                              onChange={(e) =>
                                setVariantForm({
                                  ...variantForm,
                                  isDefault: e.target.checked,
                                })
                              }
                              className="h-4 w-4"
                            />
                            <label
                              htmlFor={`isDefault-${product.id}`}
                              className="text-xs font-medium"
                            >
                              Default
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Add Variant
                          </button>
                        </form>

                        {/* Show existing variants */}
                        {product.variants && product.variants.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs text-muted-foreground mb-2 block">
                              Existing Variants:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {product.variants.map((v) => (
                                <div
                                  key={v.id}
                                  className="inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-background border border-border rounded"
                                >
                                  <span
                                    className="w-3 h-3 rounded-full border"
                                    style={{ backgroundColor: v.colorHex }}
                                  />
                                  <span>{v.name}</span>
                                  {v.isDefault && (
                                    <span className="text-green-600 text-[10px]">
                                      (default)
                                    </span>
                                  )}
                                  <button
                                    onClick={() =>
                                      handleDeleteVariant(
                                        v.id,
                                        v.name,
                                        product.name
                                      )
                                    }
                                    className="ml-1 text-red-600 hover:text-red-800 font-bold"
                                    title={`Delete ${v.name}`}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No products yet. Create one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
