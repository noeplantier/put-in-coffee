// src/types/index.ts
// ══════════════════════════════════════════════════════════════
// PUTIN COFFEE — Shared TypeScript Types
// These mirror the Sanity schema structure exactly.
// ══════════════════════════════════════════════════════════════

// ── Sanity image reference ─────────────────────────────────────
export interface SanityImage {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
      metadata?: {
        dimensions: { width: number; height: number; aspectRatio: number };
        lqip?: string; // Low-quality image placeholder (base64)
        palette?: Record<string, unknown>;
      };
    };
    alt?: string;
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  }
  
  // ── Sanity portable text block ─────────────────────────────────
  export interface PortableTextBlock {
    _type: 'block';
    _key: string;
    style: string;
    children: Array<{ _type: 'span'; text: string; marks?: string[] }>;
  }
  
  // ── Site Settings (singleton) ──────────────────────────────────
  export interface SiteSettings {
    _type: 'siteSettings';
    siteName: string;
    tagline: string;
    description: string;
    heroHeadline: string;
    heroHeadlineItalic: string;
    heroSubtitle: string;
    heroImage?: SanityImage;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutBody: PortableTextBlock[];
    stats: Array<{ value: string; label: string }>;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    mapLink: string;
    instagramUrl: string;
    facebookUrl: string;
    tiktokUrl: string;
    hours: Array<{ label: string; time: string; isToday?: boolean }>;
    reviewsGoogleUrl: string;
    totalReviews: number;
    averageRating: number;
  }
  
  // ── Menu Item ─────────────────────────────────────────────────
  export type MenuCategory = 'coffee' | 'signature' | 'food' | 'bowl';
  
  export interface MenuItem {
    _id: string;
    _type: 'menuItem';
    name: string;
    description: string;
    price: string; // e.g. "IDR 45k" — stored as string for flexibility
    category: MenuCategory;
    emoji: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    order: number;
    image?: SanityImage;
    cloudinaryPublicId?: string; // If managed in Cloudinary
  }
  
  // ── Review ─────────────────────────────────────────────────────
  export interface Review {
    _id: string;
    _type: 'review';
    authorName: string;
    authorLocation: string; // e.g. "Paris, France"
    rating: 1 | 2 | 3 | 4 | 5;
    reviewText: string;
    visitDate: string; // e.g. "March 2025"
    avatarInitial: string;
    avatarGradient: string; // e.g. "from-[#e8a830] to-[#c8953e]"
    isVerified: boolean;
    order: number;
  }
  
  // ── Experience Feature ─────────────────────────────────────────
  export interface ExperienceFeature {
    _id: string;
    _type: 'feature';
    icon: string; // Emoji
    title: string;
    description: string;
    order: number;
  }
  
  // ── Cloudinary image helper return ────────────────────────────
  export interface CloudinaryImage {
    src: string;
    srcset: string;
    width: number;
    height: number;
    alt: string;
    lqip?: string;
  }
  
  // ── Netlify Form submission ────────────────────────────────────
  export interface ReservationFormData {
    name: string;
    email: string;
    phone?: string;
    guests: string;
    date?: string;
    time?: string;
    message?: string;
    // Honeypot — should always be empty
    'bot-field'?: string;
  }
  
  // ── Navigation link ─────────────────────────────────────────
  export interface NavLink {
    label: string;
    href: string;
  }
  
  // ── Toast notification ─────────────────────────────────────
  export type ToastType = 'success' | 'error' | 'info';
  export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message: string;
  }