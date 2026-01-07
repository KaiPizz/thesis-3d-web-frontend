import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use subdirectory for GitHub Pages, root for Vercel/Netlify/Cloudflare
  base: process.env.GITHUB_PAGES === 'true' ? '/thesis-3d-web-frontend/' : '/',
})
