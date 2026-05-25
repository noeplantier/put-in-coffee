// src/lib/sanity.ts
// ══════════════════════════════════════════════════════════════
// SANITY CMS CLIENT
// All GROQ queries live here — single source of truth.
// ══════════════════════════════════════════════════════════════

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage, SiteSettings, MenuItem, Review, ExperienceFeature } from '../types/index.js';

// ── Client configuration ────────────────────────────────────────
export const sanityClient = createClient({
  projectId:  import.meta.env.SANITY_PROJECT_ID  || 'your_project_id',
  dataset:    import.meta.env.SANITY_DATASET      || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION  || '2024-01-01',
  token:      import.meta.env.SANITY_API_TOKEN,
  useCdn:     import.meta.env.PROD, // CDN in production, live data in dev
  perspective: 'published',         // Only fetch published documents
  stega:      false,                // No stega encoding needed for landing page
});

// ── Image URL builder ────────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient);

export function sanityImageUrl(source: SanityImage) {
  return builder.image(source);
}

// ── GROQ Queries ─────────────────────────────────────────────────

/** Projection for Sanity images with LQIP placeholder */
const IMAGE_PROJECTION = `{
  asset->{url, metadata{dimensions, lqip}},
  alt,
  hotspot,
  crop
}`;

/** Fetch all site-level settings (singleton document) */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{
        siteName, tagline, description,
        heroHeadline, heroHeadlineItalic, heroSubtitle,
        heroImage ${IMAGE_PROJECTION},
        aboutEyebrow, aboutTitle, aboutBody,
        stats, address, phone, email, whatsapp, mapLink,
        instagramUrl, facebookUrl, tiktokUrl,
        hours, reviewsGoogleUrl, totalReviews, averageRating
      }`
    );
  } catch (err) {
    console.error('[Sanity] Failed to fetch site settings:', err);
    return null;
  }
}

/** Fetch all menu items, ordered by category then order field */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    return await sanityClient.fetch<MenuItem[]>(
      `*[_type == "menuItem"] | order(category asc, order asc) {
        _id, name, description, price,
        category, emoji,
        isNew, isBestSeller, isVegan, isGlutenFree,
        order, cloudinaryPublicId,
        image ${IMAGE_PROJECTION}
      }`
    );
  } catch (err) {
    console.error('[Sanity] Failed to fetch menu items:', err);
    return [];
  }
}

/** Fetch featured menu items only (for condensed display) */
export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  try {
    return await sanityClient.fetch<MenuItem[]>(
      `*[_type == "menuItem" && (isBestSeller == true || isNew == true)] | order(order asc)[0..5] {
        _id, name, description, price, category, emoji,
        isNew, isBestSeller, cloudinaryPublicId
      }`
    );
  } catch (err) {
    console.error('[Sanity] Failed to fetch featured menu items:', err);
    return [];
  }
}

/** Fetch all reviews, ordered */
export async function getReviews(): Promise<Review[]> {
  try {
    return await sanityClient.fetch<Review[]>(
      `*[_type == "review"] | order(order asc) {
        _id, authorName, authorLocation, rating,
        reviewText, visitDate, avatarInitial,
        avatarGradient, isVerified, order
      }`
    );
  } catch (err) {
    console.error('[Sanity] Failed to fetch reviews:', err);
    return [];
  }
}

/** Fetch experience features */
export async function getExperienceFeatures(): Promise<ExperienceFeature[]> {
  try {
    return await sanityClient.fetch<ExperienceFeature[]>(
      `*[_type == "feature"] | order(order asc) {
        _id, icon, title, description, order
      }`
    );
  } catch (err) {
    console.error('[Sanity] Failed to fetch features:', err);
    return [];
  }
}

/** Validate all Sanity env vars are set */
export function validateSanityConfig(): boolean {
  const required = ['SANITY_PROJECT_ID', 'SANITY_DATASET'];
  const missing = required.filter(k => !import.meta.env[k]);
  if (missing.length > 0) {
    console.warn(`[Sanity] Missing env vars: ${missing.join(', ')}. Using fallback data.`);
    return false;
  }
  return true;
}