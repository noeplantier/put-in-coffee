// src/lib/fallback.ts
// ══════════════════════════════════════════════════════════════
// FALLBACK DATA — Used when Sanity isn't configured yet.
// Replace this with real CMS data once Sanity is set up.
// ══════════════════════════════════════════════════════════════

import type { MenuItem, Review, ExperienceFeature, SiteSettings } from '../types/index.js';

export const fallbackSettings: Partial<SiteSettings> = {
  siteName: 'put.in coffee',
  tagline: 'Where Waves Meet Coffee',
  description: 'Bali\'s most soulful beachfront café on Pantai Biaung, Denpasar.',
  heroHeadline: 'Where Waves',
  heroHeadlineItalic: 'Meet Coffee',
  heroSubtitle: 'Sip specialty coffee as the tide rolls in. put.in coffee is Denpasar\'s most soulful beachfront café — nestled on the black sand shores of Pantai Biaung.',
  address: 'Jl. Pantai Biaung, Denpasar, Bali 80228',
  phone: '+62 812 3456 7890',
  whatsapp: '628123456789',
  mapLink: 'https://maps.google.com/?q=-8.6932,115.2631',
  totalReviews: 49,
  averageRating: 5,
  hours: [
    { label: 'Mon – Fri', time: '5:00 AM – 12:00 PM', isToday: true },
    { label: 'Fri – Sun', time: '12:00 PM – 3:00 AM', isToday: true },

    { label: 'Kitchen closes', time: '9:30 PM' },
    { label: 'Karaoke & Live Music', time: '7:00 PM – 9:00 PM' },
  ],
};

export const fallbackMenuItems: MenuItem[] = [
  {
    _id: '1', _type: 'menuItem', name: 'Pantai Cold Brew',
    description: 'Slow-steeped 24h with Bali Kintamani beans. Smooth, bold, and as refreshing as the ocean breeze.',
    price: 'IDR 45k', category: 'coffee', emoji: '☕', isBestSeller: true, order: 1,
  },
  {
    _id: '2', _type: 'menuItem', name: 'Sunset Latte',
    description: 'Espresso with turmeric-infused oat milk and a swirl of butterfly pea flower.',
    price: 'IDR 52k', category: 'signature', emoji: '🌅', isNew: false, order: 2,
  },
  {
    _id: '3', _type: 'menuItem', name: 'Black Sand Mocha',
    description: 'Dark chocolate espresso with activated charcoal cream. Bold, dramatic, unforgettable.',
    price: 'IDR 55k', category: 'coffee', emoji: '🧋', order: 3,
  },
  {
    _id: '4', _type: 'menuItem', name: 'Pandan Matcha Latte',
    description: 'Japanese ceremonial matcha with fragrant Balinese pandan, steamed coconut milk.',
    price: 'IDR 50k', category: 'signature', emoji: '🌿', isVegan: true, order: 4,
  },
  {
    _id: '5', _type: 'menuItem', name: 'Coconut Espresso Tonic',
    description: 'Double espresso over sparkling tonic with toasted coconut flakes. Refreshingly electric.',
    price: 'IDR 58k', category: 'coffee', emoji: '🥥', isNew: true, order: 5,
  },
  {
    _id: '6', _type: 'menuItem', name: 'Biaung Breakfast Bowl',
    description: 'Free-range eggs, avocado, micro greens, Balinese sambal, sourdough toast and fresh fruit.',
    price: 'IDR 85k', category: 'bowl', emoji: '🍳', order: 6,
  },
];

export const fallbackReviews: Review[] = [
  {
    _id: 'r1', _type: 'review', authorName: 'Sophie M.', authorLocation: 'Paris, France',
    rating: 5, visitDate: 'March 2025', avatarInitial: 'S',
    avatarGradient: 'from-pc-gold to-yellow-500', isVerified: true, order: 1,
    reviewText: 'Woke up at sunrise just for put.in coffee — best decision of my entire Bali trip! The view from the beachfront is absolutely magical. Their cold brew is perfection, and the staff remembered my name after just two visits.',
  },
  {
    _id: 'r2', _type: 'review', authorName: 'James K.', authorLocation: 'Melbourne, Australia',
    rating: 5, visitDate: 'January 2025', avatarInitial: 'J',
    avatarGradient: 'from-pc-teal to-cyan-500', isVerified: true, order: 2,
    reviewText: 'I\'ve been to coffee shops all over Bali — Canggu, Ubud, Seminyak — but put.in coffee at Pantai Biaung is on a completely different level. The sound of the waves while sipping their Sunset Latte is an experience money can\'t buy.',
  },
  {
    _id: 'r3', _type: 'review', authorName: 'Yuki T.', authorLocation: 'Tokyo, Japan',
    rating: 5, visitDate: 'February 2025', avatarInitial: 'Y',
    avatarGradient: 'from-green-500 to-emerald-600', isVerified: true, order: 3,
    reviewText: 'The black sand beach, the driftwood decor, the incredible coffee — put.in coffee is pure Bali magic. Their Pandan Matcha Latte is the best I\'ve had anywhere in Asia. I was there for a coffee and stayed three hours.',
  },
  {
    _id: 'r4', _type: 'review', authorName: 'Maria L.', authorLocation: 'Rome, Italy',
    rating: 5, visitDate: 'April 2025', avatarInitial: 'M',
    avatarGradient: 'from-orange-500 to-red-500', isVerified: true, order: 4,
    reviewText: 'A true gem on the Sanur beachfront. The atmosphere is romantic and utterly relaxed — exactly what you dream of when you say "Bali café". We watched the sunset from our table and couldn\'t believe this place even exists.',
  },
  {
    _id: 'r5', _type: 'review', authorName: 'Alex R.', authorLocation: 'London, UK',
    rating: 5, visitDate: 'December 2024', avatarInitial: 'A',
    avatarGradient: 'from-purple-500 to-violet-600', isVerified: true, order: 5,
    reviewText: 'Finally found my perfect Bali coffee spot! put.in coffee has incredible vibes, amazing staff, and coffee that rivals anything in Seminyak — with so much more soul and authenticity.',
  },
  {
    _id: 'r6', _type: 'review', authorName: 'Chen W.', authorLocation: 'Singapore',
    rating: 5, visitDate: 'November 2024', avatarInitial: 'C',
    avatarGradient: 'from-pink-500 to-rose-600', isVerified: true, order: 6,
    reviewText: 'We visited put.in coffee every single morning for 10 days straight. The Biaung Breakfast Bowl is healthy, huge, and absolutely delicious. The Pantai Biaung location is unbeatable — like having breakfast at the edge of the world.',
  },
];

export const fallbackFeatures: ExperienceFeature[] = [
  { _id: 'f1', _type: 'feature', icon: '🌊', title: 'Beachfront Tables', description: 'Sit meters from the ocean. Feel the sea breeze. Hear the waves. This is not a simulation — it\'s the real Bali.', order: 1 },
  { _id: 'f2', _type: 'feature', icon: '☕', title: 'Specialty Roastery', description: 'We roast our own Bali Kintamani and Toraja single-origins in-house. Every cup is freshly ground to order.', order: 2 },
  { _id: 'f3', _type: 'feature', icon: '🎵', title: 'Live Sunset Sessions', description: 'Acoustic guitarists and local musicians every Friday and Saturday evening as the sun dips into the sea.', order: 3 },
  { _id: 'f4', _type: 'feature', icon: '🏄', title: 'Surf & Coffee Culture', description: 'Boards stored for free. Surf reports daily. Post-surf espressos are our specialty.', order: 4 },
  { _id: 'f5', _type: 'feature', icon: '🌿', title: 'Sustainable by Nature', description: 'Zero single-use plastic. Compostable packaging. 1% of revenue to Pantai Biaung beach cleanup programs.', order: 5 },
];