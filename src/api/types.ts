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

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  modelUrl: string;
  thumbnailUrl: string;
  baseColor: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  defaultVariant?: Variant | null; 
  variants?: Variant[];              
}

