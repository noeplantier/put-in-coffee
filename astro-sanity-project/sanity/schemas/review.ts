// src/sanity/schemas/review.ts
import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    defineField({ name: 'authorName', title: 'Author Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'authorLocation', title: 'Location (e.g. "Paris, France")', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'rating', title: 'Rating', type: 'number',
      options: { list: [1,2,3,4,5].map(n => ({ title: '★'.repeat(n), value: n })) },
      initialValue: 5, validation: R => R.required().min(1).max(5),
    }),
    defineField({ name: 'reviewText', title: 'Review Text', type: 'text', rows: 4, validation: R => R.required() }),
    defineField({ name: 'visitDate', title: 'Visit Date (e.g. "March 2025")', type: 'string', validation: R => R.required() }),
    defineField({ name: 'avatarInitial', title: 'Avatar Initial (single letter)', type: 'string',
      validation: R => R.required().max(1) }),
    defineField({
      name: 'avatarGradient', title: 'Avatar Gradient (Tailwind classes)', type: 'string',
      description: 'e.g. "from-pc-gold to-yellow-500"',
      initialValue: 'from-pc-gold to-yellow-500',
    }),
    defineField({ name: 'isVerified', title: 'Verified Google Review?', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'authorLocation', rating: 'rating' },
    prepare({ title, subtitle, rating }) {
      return { title, subtitle: `${'★'.repeat(rating)} · ${subtitle}` };
    },
  },
});

// ── Experience Feature ────────────────────────────────────────
export const feature = defineType({
  name: 'feature',
  title: 'Experience Feature',
  type: 'document',
  fields: [
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', validation: R => R.required().max(4) }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: R => R.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'title', icon: 'icon' },
    prepare({ title, icon }) { return { title: `${icon} ${title}` }; },
  },
});

// ── Schema Index ─────────────────────────────────────────────
export * from './siteSettings.js';