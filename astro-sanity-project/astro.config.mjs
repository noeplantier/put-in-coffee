// put.in coffee — Astro build configuration for Netlify

import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // ── Output mode ──────────────────────────────────────────
  output: 'static',

  // ── Site URL (required for sitemap + canonical links) ────
  site: 'https://www.putincoffee.com',

  // ── Build options ────────────────────────────────────────
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
    format: 'file',
  },

  // ── Vite (bundler) config ─────────────────────────────────
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
          },
        },
      },
    },
    ssr: {
      external: ['sharp'],
    },
  },

  // ── Integrations ──────────────────────────────────────────
  integrations: [],

  // ── Markdown ──────────────────────────────────────────────
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