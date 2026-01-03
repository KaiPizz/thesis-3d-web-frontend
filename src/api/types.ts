// API Response Types - based on backend responses

export interface Variant {
  id: string;
  name: string;
  colorHex: string;
  textureUrl: string | null;
  isDefault: boolean;
}

export interface CategoryProductSummary {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  products?: CategoryProductSummary[];
}

export interface ProductSpecs {
  widthCm?: number;
  heightCm?: number;
  depthCm?: number;
  weightKg?: number;
  material?: string;
  maxLoadKg?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  modelUrl: string;
  thumbnailUrl: string;
  baseColor?: string;
  useOriginalColor?: boolean;
  originalColorName?: string;
  originalColorPreview?: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  defaultVariant?: Variant | null; 
  variants?: Variant[];
  specs?: ProductSpecs;
  previewImages?: string[];
}

