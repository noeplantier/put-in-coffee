// src/sanity/sanity.config.ts
// ══════════════════════════════════════════════════════════════
// SANITY STUDIO CONFIGURATION
// Run: npm run sanity  → starts studio at localhost:3333
// Run: npm run sanity:deploy → deploys to <project>.sanity.studio
// ══════════════════════════════════════════════════════════════

import { defineConfig, isDev } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media'; // Optional: nice media library UI

import { siteSettings } from './schemas/siteSettings.js';
import { menuItem } from './schemas/menuItem.js';
import { review, feature } from './schemas/index.js';

// Singleton document types (only one document allowed)
const singletons = new Set(['siteSettings']);

export default defineConfig({
  projectId: process.env.SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  title: 'Putin Coffee CMS',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('⚙️  Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            // Collections
            S.documentTypeListItem('menuItem').title('☕ Menu Items'),
            S.documentTypeListItem('review').title('⭐ Customer Reviews'),
            S.documentTypeListItem('feature').title('🌊 Experience Features'),
          ]),
    }),

    // GROQ playground (dev only)
    ...(isDev ? [visionTool()] : []),
  ],

  schema: {
    types: [siteSettings, menuItem, review, feature],

    // Prevent creating additional "Site Settings" documents
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
});