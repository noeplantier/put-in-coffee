// src/middleware.ts
// Astro middleware — request sanitisation + attack path blocking

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url  = new URL(context.request.url);
  const path = url.pathname;

  // ── Block common attack / probe paths ─────────────────
  const blockedPaths = [
    '/wp-admin', '/wp-login', '/phpMyAdmin', '/phpmyadmin',
    '/.env', '/.git', '/config.php', '/admin',
    '/xmlrpc.php', '/wp-content', '/.aws', '/.ssh',
    '/etc/passwd', '/shell.php', '/cmd', '/actuator',
  ];
  for (const blocked of blockedPaths) {
    if (path.startsWith(blocked)) {
      return new Response('Not Found', { status: 404 });
    }
  }

  // ── Block obvious XSS / SQLi in query string ──────────
  const query = url.search.toLowerCase();
  const badPatterns = [
    '<script', 'javascript:', 'vbscript:', 'onload=',
    'union+select', 'drop+table', 'exec(', 'eval(',
    '../..', '%2e%2e',
  ];
  for (const pattern of badPatterns) {
    if (query.includes(pattern)) {
      return new Response('Bad Request', { status: 400 });
    }
  }

  const response = await next();
  return response;
});
