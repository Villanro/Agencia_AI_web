import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CONTACT_WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL ?? '';

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

export async function POST(req: NextRequest) {
  if (!CONTACT_WEBHOOK_URL) {
    return NextResponse.json(
      { ok: false, error: 'Contact webhook is not configured.' },
      { status: 500 }
    );
  }

  try {
    const json = await req.json();
    const parsed = ContactPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid form payload.' },
        { status: 400 }
      );
    }

    const { website, ...payload } = parsed.data;

    // Basic honeypot: bots usually fill hidden fields.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const forwardedPayload = {
      ...payload,
      company: payload.company?.trim() || '',
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') ?? '',
      ip:
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        req.ip ??
        '',
    };

    const upstream = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardedPayload),
      cache: 'no-store',
    });

    if (!upstream.ok) {
      console.error('[contact proxy] webhook error', upstream.status);
      return NextResponse.json(
        { ok: false, error: 'Unable to submit the form right now.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[contact proxy] unexpected error', error);
    return NextResponse.json(
      { ok: false, error: 'Unexpected error while submitting form.' },
      { status: 500 }
    );
  }
}
