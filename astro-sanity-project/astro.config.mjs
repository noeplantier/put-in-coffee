import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // URL de votre site en production (utilisée pour le SEO et sitemap)
  site: process.env.PUBLIC_SITE_URL || 'https://putincoffee.com',
  
  // Intégrations (C'est ici que Tailwind est activé !)
  integrations: [
    tailwind(),
  ],

  // Optimisations de performance
  compressHTML: true,
  prefetch: true, // Précharge les liens pour une navigation instantanée
  
  build: {
    inlineStylesheets: 'auto', // Optimise le chargement du CSS
  },
});