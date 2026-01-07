/**
 * Utility function to prepend the Vite base URL to asset paths.
 * This is necessary for GitHub Pages deployment with a base path.
 * 
 * @param path - The asset path (e.g., 'models/chair.glb' or '/thumbnails/chair.webp')
 * @returns The path with the base URL prepended (e.g., '/thesis-3d-web-frontend/models/chair.glb')
 */
export function withBaseUrl(path?: string): string {
  if (!path) return "";
  
  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // Remove leading slash from path if present
  const cleanPath = path.replace(/^\//, "");
  
  // Ensure baseUrl ends with / and cleanPath doesn't start with /
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  
  return `${normalizedBase}${cleanPath}`;
}

