// api/webhook.js
// Simple Vercel Serverless webhook forwarder for Manus AI -> Telegram
// This file uses environment variables for sensitive values.
//
// Set environment variables in Vercel (Project Settings -> Environment Variables):
// TELEGRAM_TOKEN    -> your Telegram Bot token (do NOT commit this to git)
// TELEGRAM_CHAT_ID  -> your personal chat id or group chat id
//
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_TOKEN';
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

  try {
    const body = req.body || {};
    const level = body.level || 'info';
    const title = body.title || body.matched_phrase || 'Alert';
    const excerpt = body.excerpt || '';
    const url = body.url || '';
    const source = body.source || '';

    // sanitize / shorten excerpt
    const shortExcerpt = excerpt ? (excerpt.length > 300 ? excerpt.substring(0,300) + '...' : excerpt) : '';

    const text = `🚨 *${level.toUpperCase()} ALERT*\n*${title}*\nSource: ${source}\n${shortExcerpt}\n🔗 ${url}`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const resp = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown'
      })
    });

    const j = await resp.json();
    return res.status(200).json({ ok: true, telegram: j });
  } catch (err) {
    console.error('Webhook forwarder error:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
