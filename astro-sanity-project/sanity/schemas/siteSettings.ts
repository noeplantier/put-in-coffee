// src/sanity/schemas/siteSettings.ts
import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // This is a singleton — only one document
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ── Brand ──────────────────────────────────────────────
    defineField({ name: 'siteName', title: 'Site Name', type: 'string',
      initialValue: 'Putin Coffee', validation: R => R.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string',
      initialValue: 'Where Waves Meet Coffee' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2,
      validation: R => R.required().max(160) }),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline (line 1)', type: 'string',
          initialValue: 'Where Waves' }),
        defineField({ name: 'headlineItalic', title: 'Headline (line 2 — italic gold)', type: 'string',
          initialValue: 'Meet Coffee' }),
        defineField({ name: 'subtitle', title: 'Subtitle text', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Hero Background Image', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        }),
      ]
    }),

    // ── About ──────────────────────────────────────────────
    defineField({
      name: 'about', title: 'About Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Story' }),
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body text', type: 'array',
          of: [{ type: 'block' }] }),
        defineField({
          name: 'stats', title: 'Stats', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value (e.g. "5★")' },
              { name: 'label', type: 'string', title: 'Label (e.g. "Google Rating")' },
            ]
          }],
          validation: R => R.max(4),
        }),
      ]
    }),

    // ── Contact ────────────────────────────────────────────
    defineField({ name: 'address', title: 'Full Address', type: 'text', rows: 2 }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (no +)', type: 'string' }),
    defineField({ name: 'mapLink', title: 'Google Maps Link', type: 'url' }),

    // ── Social ─────────────────────────────────────────────
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'tiktokUrl', title: 'TikTok URL', type: 'url' }),

    // ── Hours ──────────────────────────────────────────────
    defineField({
      name: 'hours', title: 'Opening Hours', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label (e.g. "Mon – Sun")' },
          { name: 'time', type: 'string', title: 'Time (e.g. "5:00 AM – 10:00 PM")' },
          { name: 'isToday', type: 'boolean', title: 'Highlight as "Today"?', initialValue: false },
        ]
      }]
    }),

    // ── Reviews meta ───────────────────────────────────────
    defineField({ name: 'totalReviews', title: 'Total Google Reviews', type: 'number',
      initialValue: 127, validation: R => R.min(0) }),
    defineField({ name: 'averageRating', title: 'Average Rating (1-5)', type: 'number',
      initialValue: 5.0, validation: R => R.min(1).max(5) }),
    defineField({ name: 'reviewsGoogleUrl', title: 'Google Reviews URL', type: 'url' }),
  ],

  preview: {
    select: { title: 'siteName', subtitle: 'tagline' },
  },
});