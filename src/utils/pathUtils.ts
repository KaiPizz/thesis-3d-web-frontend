/**
 * Utility function to prepend the Vite base URL to asset paths.
 * This is necessary for GitHub Pages deployment with a base path.
 * 
 * @param path 
 * @returns 
 */
export function withBaseUrl(path?: string): string {
  if (!path) return "";

  const baseUrl = import.meta.env.BASE_URL || "/";

  const cleanPath = path.replace(/^\//, "");

  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
}

