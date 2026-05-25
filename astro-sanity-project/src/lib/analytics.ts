// src/lib/analytics.ts
// ══════════════════════════════════════════════════════════════
// PLAUSIBLE ANALYTICS — Privacy-first, GDPR compliant
// No cookies. No personal data. Lightweight (< 1KB).
// ══════════════════════════════════════════════════════════════

const DOMAIN = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || 'putincoffee.com';
const HOST = import.meta.env.PUBLIC_PLAUSIBLE_HOST || 'https://plausible.io';

/**
 * Returns the Plausible script URL.
 * Use `script.outbound-links` to track external link clicks.
 * Use `script.file-downloads` to track PDF/menu downloads.
 */
export function getPlausibleScriptUrl(): string {
  return `${HOST}/js/script.outbound-links.js`;
}

/**
 * Returns the data-domain attribute value.
 */
export function getPlausibleDomain(): string {
  return DOMAIN;
}

/**
 * Client-side: track a custom event programmatically.
 * Call from interactive components (e.g. form submit, CTA click).
 *
 * @example
 * // In a client-side <script> tag:
 * import { trackEvent } from '@lib/analytics';
 * trackEvent('Reservation', { props: { type: 'sunset-table' } });
 */
export function trackEvent(
  eventName: string,
  options?: {
    props?: Record<string, string | number | boolean>;
    callback?: () => void;
  }
): void {
  if (typeof window === 'undefined') return;

  // @ts-ignore — plausible is injected globally by the script
  const plausible = window.plausible;
  if (typeof plausible !== 'function') return;

  plausible(eventName, options);
}

/**
 * Predefined event names for consistency across the app.
 * Use these constants rather than raw strings.
 */
export const EVENTS = {
  RESERVATION_SUBMIT:   'Reservation Submit',
  NEWSLETTER_SIGNUP:    'Newsletter Signup',
  MENU_ITEM_CLICK:      'Menu Item Click',
  WHATSAPP_CLICK:       'WhatsApp Click',
  MAPS_CLICK:           'Maps Click',
  GOOGLE_REVIEWS_CLICK: 'Google Reviews Click',
  SHARE_CLICK:          'Share Click',
  CTA_HERO_PRIMARY:     'CTA Hero Primary',
  CTA_HERO_SECONDARY:   'CTA Hero Secondary',
} as const;

export type PlausibleEvent = typeof EVENTS[keyof typeof EVENTS];