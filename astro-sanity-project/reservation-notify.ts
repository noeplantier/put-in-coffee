// netlify/functions/reservation-notify.ts
// Triggered by Netlify Forms submission → sends email notification
// Deploy: automatically detected by Netlify

import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  // Only accept POST from Netlify Forms
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Verify this is a genuine Netlify Forms submission
  const secret = process.env.NETLIFY_FORMS_SECRET;
  if (secret && event.headers['x-webhook-signature'] !== secret) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const data    = payload.payload?.data || {};

    // Log submission (visible in Netlify Function logs)
    console.log('[put.in reservation]', {
      name:    data.name,
      email:   data.email,
      guests:  data.guests,
      date:    data.date,
      time:    data.time,
      message: data.message,
      ts:      new Date().toISOString(),
    });

    // ── Optional: send WhatsApp via Twilio ──────────────────
    // Uncomment and add TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN
    // / TWILIO_WHATSAPP_FROM / NOTIFY_WHATSAPP_TO env vars
    //
    // const twilio = require('twilio')(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    // await twilio.messages.create({
    //   from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
    //   to:   `whatsapp:${process.env.NOTIFY_WHATSAPP_TO}`,
    //   body: `New reservation from ${data.name} — ${data.guests} guests on ${data.date} at ${data.time}`,
    // });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[put.in reservation error]', err);
    return { statusCode: 500, body: 'Internal error' };
  }
};

