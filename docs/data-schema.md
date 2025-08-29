# Data Schema
type ColorOption = { name: string; hex?: string; texture?: string; model?: string; };
type Product = {
  id: string; slug: string; name: string; category: string; material: string;
  size: { w:number; d:number; h:number; unit:"cm"|"in" };
  colors: ColorOption[]; model: string; thumbnail: string; tags?: string[];
};
Keep asset paths relative (e.g., /models/file.glb). Assets live in public/ so Vite copies them.
