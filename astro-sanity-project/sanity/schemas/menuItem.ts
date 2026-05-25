// src/sanity/schemas/menuItem.ts
import { defineField, defineType } from 'sanity';

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: R => R.required() }),
    defineField({ name: 'price', title: 'Price (e.g. "IDR 45k")', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: '☕ Coffee', value: 'coffee' },
          { title: '🌅 Signature', value: 'signature' },
          { title: '🥗 Food', value: 'food' },
          { title: '🥣 Bowl', value: 'bowl' },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    }),
    defineField({ name: 'emoji', title: 'Emoji Icon', type: 'string',
      description: 'Single emoji to represent this item',
      validation: R => R.required().max(4) }),
    defineField({ name: 'isNew', title: 'New item?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isBestSeller', title: 'Best Seller?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isVegan', title: 'Vegan?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isGlutenFree', title: 'Gluten-Free?', type: 'boolean', initialValue: false }),
    defineField({
      name: 'image', title: 'Photo (optional)', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'cloudinaryPublicId',
      title: 'Cloudinary Public ID (override)',
      type: 'string',
      description: 'If set, this Cloudinary image is used instead of the Sanity image above.',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number',
      initialValue: 99, validation: R => R.required().integer().positive() }),
  ],

  orderings: [
    { title: 'Category, then Order', name: 'categoryOrder',
      by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] }
  ],

  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image', emoji: 'emoji' },
    prepare({ title, subtitle, emoji }) {
      return { title: `${emoji} ${title}`, subtitle };
    },
  },
});