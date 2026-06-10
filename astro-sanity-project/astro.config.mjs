// astro.config.mjs
// put.in coffee — Astro build configuration for Netlify

import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // ── Output mode ──────────────────────────────────────────
  // 'static' = pure SSG (no server, fastest, free on Netlify)
  output: 'static',

  // ── Site URL (required for sitemap + canonical links) ────
  site: 'https://www.putincoffee.com',

  // ── Build options ────────────────────────────────────────
  build: {
    // Inline small assets (<4KB) as base64 to reduce HTTP requests
    inlineStylesheets: 'auto',
    // Asset file naming with content hash for cache busting
    assets: '_astro',
    // Compress HTML output
    format: 'file',
  },

  // ── Vite (bundler) config ─────────────────────────────────
  vite: {
    build: {
      // Raise chunk size warning threshold (our SVG icons are verbose)
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          // Manual chunking: keep large vendor libs separate
          manualChunks: {
            leaflet: ['leaflet'],
          },
        },
      },
    },
    // Remove console.* in production
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },

  // ── Image service ─────────────────────────────────────────
  image: {
    // Use Astro's built-in Sharp for image optimisation
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Default quality for optimised images
    defaultFormat: 'webp',
    quality: 82,
  },

  // ── Integrations ──────────────────────────────────────────
  integrations: [],

  // ── Markdown (if you add a blog later) ───────────────────
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  // ── Dev server ────────────────────────────────────────────
  server: {
    port: 4321,
    host: true,
  },

  // ── Prefetch (improves perceived navigation speed) ────────
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
