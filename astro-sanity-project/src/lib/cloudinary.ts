// src/lib/cloudinary.ts
// ══════════════════════════════════════════════════════════════
// CLOUDINARY IMAGE OPTIMIZER
// Generates optimized URLs with auto WebP/AVIF, responsive srcset,
// LQIP blur placeholders, and smart cropping.
// ══════════════════════════════════════════════════════════════

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// ── Types ───────────────────────────────────────────────────────
export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb' | 'crop' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  aspectRatio?: string; // e.g. "16:9"
  blur?: number; // For LQIP placeholders (e.g. 1000)
  dpr?: 'auto' | 1 | 2 | 3;
  effect?: string; // e.g. "sharpen:80"
}

export interface CloudinaryImageSet {
  src: string;
  srcset: string;
  sizes: string;
  lqip: string;
  width: number;
  height?: number;
}

// ── Core: Build a single Cloudinary URL ────────────────────────
export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    aspectRatio,
    blur,
    dpr,
    effect,
  } = options;

  const transforms: string[] = [
    `f_${format}`,
    `q_${quality}`,
    crop && `c_${crop}`,
    gravity && `g_${gravity}`,
    width && `w_${width}`,
    height && `h_${height}`,
    aspectRatio && `ar_${aspectRatio}`,
    blur && `e_blur:${blur}`,
    dpr && `dpr_${dpr}`,
    effect && `e_${effect}`,
  ].filter(Boolean) as string[];

  return `${BASE_URL}/${transforms.join(',')}/${publicId}`;
}

// ── Generate responsive srcset (WebP/AVIF) ────────────────────
export function getCloudinaryImageSet(
  publicId: string,
  options: CloudinaryOptions & { widths?: number[]; sizes?: string } = {}
): CloudinaryImageSet {
  const {
    widths = [400, 800, 1200, 1600],
    sizes = '100vw',
    quality = 'auto',
    crop = 'fill',
    gravity = 'auto',
    height,
    ...rest
  } = options;

  // Use the largest width as the default src
  const maxWidth = Math.max(...widths);

  const src = getCloudinaryUrl(publicId, {
    width: maxWidth,
    height,
    quality,
    crop,
    gravity,
    format: 'auto', // Cloudinary picks best (AVIF → WebP → JPEG)
    ...rest,
  });

  // Generate srcset for all breakpoints
  const srcset = widths
    .map(w => {
      const url = getCloudinaryUrl(publicId, {
        width: w,
        height: height ? Math.round((height / maxWidth) * w) : undefined,
        quality,
        crop,
        gravity,
        format: 'auto',
        ...rest,
      });
      return `${url} ${w}w`;
    })
    .join(', ');

  // Generate tiny blurred LQIP (low quality image placeholder)
  const lqip = getCloudinaryUrl(publicId, {
    width: 20,
    quality: 30,
    format: 'auto',
    blur: 1000,
  });

  return { src, srcset, sizes, lqip, width: maxWidth, height };
}

// ── Preset helpers for common use cases ───────────────────────
export const cloudinary = {
  /** Hero image — full-width, max 2000px, AVIF/WebP */
  hero: (publicId: string) =>
    getCloudinaryImageSet(publicId, {
      widths: [640, 1024, 1408, 2000],
      sizes: '100vw',
      quality: 'auto:best',
      crop: 'fill',
      gravity: 'auto',
      aspectRatio: '16:9',
    }),

  /** About / editorial portrait — 4:5 aspect */
  portrait: (publicId: string) =>
    getCloudinaryImageSet(publicId, {
      widths: [400, 600, 800],
      sizes: '(max-width: 900px) 100vw, 50vw',
      crop: 'fill',
      gravity: 'face',
      aspectRatio: '4:5',
    }),

  /** Menu card icon — square thumbnail */
  menuIcon: (publicId: string, size: number = 200) =>
    getCloudinaryUrl(publicId, {
      width: size,
      height: size,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
    }),

  /** Gallery image */
  gallery: (publicId: string) =>
    getCloudinaryImageSet(publicId, {
      widths: [400, 600, 800],
      sizes: '(max-width: 600px) 100vw, 33vw',
      crop: 'fill',
      aspectRatio: '1:1',
      quality: 'auto:good',
    }),

  /** OG / social share — exactly 1200×630 */
  og: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 1200,
      height: 630,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'jpg',
    }),
};

/** The hero image public ID in Cloudinary (upload your photo there) */
export const HERO_IMAGE_ID = 'putincoffee/hero-pantai-biaung';