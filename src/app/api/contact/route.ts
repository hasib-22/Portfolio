import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentRequests = (rateLimitMap.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitMap.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string) {
  return /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(email);
}

function getErrorCode(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code;
  }

  return 'unknown';
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!isRecord(body)) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { user_name, user_email, subject, message } = body;
  if (
    typeof user_name !== 'string' ||
    typeof user_email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return Response.json(
      { error: 'All fields must be provided as text' },
      { status: 400 },
    );
  }

  const name = user_name.trim();
  const email = user_email.trim();
  const cleanSubject = subject.trim();
  const cleanMessage = message.trim();
  if (!name || !email || !cleanSubject || !cleanMessage) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    cleanSubject.length > 200 ||
    cleanMessage.length > 5000
  ) {
    return Response.json(
      { error: 'One or more fields exceed the maximum allowed length' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
    process.env;
  const port = Number(SMTP_PORT);
  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !CONTACT_EMAIL
  ) {
    console.error('[contact] SMTP configuration is incomplete or invalid');
    return Response.json(
      { error: 'Email service is not configured' },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${cleanSubject.replace(/[\r\n]+/g, ' ')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8A2BE2;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; font-weight: bold;">Name</td><td style="padding: 10px;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Email</td><td style="padding: 10px;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Subject</td><td style="padding: 10px;">${escapeHtml(cleanSubject)}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error(`[contact] Email dispatch failed (${getErrorCode(error)})`);
    return Response.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }

  return Response.json({ message: 'Message sent successfully!' });
}
