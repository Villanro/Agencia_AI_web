import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CONTACT_WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL ?? '';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestHistoryByIp = new Map<string, number[]>();

const ContactPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  company: z.string().max(120).optional(),
  service: z.string().min(1).max(80),
  message: z.string().min(10).max(3000),
  locale: z.string().min(2).max(10).optional(),
  source: z.string().max(100).optional(),
  website: z.string().optional(),
});
const allowedSources = new Set(['web', 'landing', 'campaign']);

function jsonWithRequestId(
  requestId: string,
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: HeadersInit
) {
  return NextResponse.json(
    { ...body, requestId },
    {
      status,
      headers: {
        'x-request-id': requestId,
        ...extraHeaders,
      },
    }
  );
}

function getClientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.ip ??
    'unknown'
  );
}

function isRateLimited(ip: string, now: number) {
  const currentHits = requestHistoryByIp.get(ip) ?? [];
  const recentHits = currentHits.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recentHits.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestHit = recentHits[0];
    const retryAfterMs = Math.max(0, RATE_LIMIT_WINDOW_MS - (now - oldestHit));
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  recentHits.push(now);
  requestHistoryByIp.set(ip, recentHits);
  return { limited: false, retryAfterSeconds: 0 };
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const now = Date.now();
  const clientIp = getClientIp(req);

  const rateLimit = isRateLimited(clientIp, now);
  if (rateLimit.limited) {
    return jsonWithRequestId(
      requestId,
      { ok: false, error: 'Too many requests. Please try again in a few minutes.' },
      429,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) }
    );
  }

  if (!CONTACT_WEBHOOK_URL) {
    console.error(`[contact proxy][${requestId}] missing webhook configuration`);
    return jsonWithRequestId(
      requestId,
      { ok: false, error: 'Contact webhook is not configured.' },
      500
    );
  }

  try {
    const json = await req.json();
    const parsed = ContactPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return jsonWithRequestId(
        requestId,
        { ok: false, error: 'Invalid form payload.' },
        400
      );
    }

    const { website, ...payload } = parsed.data;

    // Basic honeypot: bots usually fill hidden fields.
    if (website && website.trim().length > 0) {
      return jsonWithRequestId(
        requestId,
        { ok: false, error: 'Bot-like submission detected.' },
        400
      );
    }

    const forwardedPayload = {
      ...payload,
      requestId,
      company: payload.company?.trim() || '',
      source: allowedSources.has(payload.source ?? '') ? payload.source : 'web',
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') ?? '',
      ip: clientIp,
    };

    const upstream = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-request-id': requestId,
      },
      body: JSON.stringify(forwardedPayload),
      cache: 'no-store',
    });

    if (!upstream.ok) {
      console.error(`[contact proxy][${requestId}] webhook error`, upstream.status);
      return jsonWithRequestId(
        requestId,
        { ok: false, error: 'Unable to submit the form right now.' },
        502
      );
    }

    return jsonWithRequestId(requestId, { ok: true }, 200);
  } catch (error) {
    console.error(`[contact proxy][${requestId}] unexpected error`, error);
    return jsonWithRequestId(
      requestId,
      { ok: false, error: 'Unexpected error while submitting form.' },
      500
    );
  }
}
