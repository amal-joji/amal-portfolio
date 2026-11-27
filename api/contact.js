const rateLimitStore = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    res.status(429).json({
      error: 'Too many requests. Please wait a few minutes before trying again.',
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'Invalid JSON payload' });
      return;
    }
  }

  const { name, email, question, website } = body || {};

  // Honeypot check for spam bots
  if (website && String(website).trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedQuestion = (question || '').trim();

  if (!trimmedName || !trimmedEmail || !trimmedQuestion) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'aj1319@srmist.edu.in';

  if (!apiKey || !fromEmail) {
    res.status(503).json({
      error:
        'Email delivery is not configured yet. Set RESEND_API_KEY and CONTACT_FROM_EMAIL in environment variables.',
    });
    return;
  }

  const submittedAt = new Date().toISOString();
  const textBody = [
    'New Portfolio Enquiry — Amal Joji',
    '',
    `Name: ${trimmedName}`,
    `Email: ${trimmedEmail}`,
    `Submitted At: ${submittedAt}`,
    '',
    'Question / Message:',
    trimmedQuestion,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f17; color: #f1f1f7; border-radius: 12px;">
      <h2 style="margin: 0 0 16px; color: #a29bfe;">New Portfolio Enquiry — Amal Joji</h2>
      <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
      <p style="margin: 6px 0;"><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
      <p style="margin: 6px 0 18px;"><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
      <div style="padding: 16px; background: #181825; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #9494ad;">Question / Message</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(trimmedQuestion)}</p>
      </div>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: trimmedEmail,
        subject: 'New Portfolio Enquiry — Amal Joji',
        text: textBody,
        html: htmlBody,
      }),
    });

    const data = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      res.status(502).json({
        error: data?.message || 'Failed to deliver email via provider.',
      });
      return;
    }

    res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error while sending message.' });
  }
}
