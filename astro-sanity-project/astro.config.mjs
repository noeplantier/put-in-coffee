// astro.config.mjs  ·  put.in coffee
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Pure static site — no server, served from CDN
  output: 'static',

  // Canonical URL (used for sitemap + og:url)
  site: 'https://www.putincoffee.com',

  // Build
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
    format: 'file',
  },

  // Vite
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      // Strip console.* in production
      drop: ['console', 'debugger'],
    },
  },

  // Image
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Dev server
  server: {
    port: 4321,
    host: true,
  },
});