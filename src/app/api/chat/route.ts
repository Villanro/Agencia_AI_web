import { NextRequest, NextResponse } from 'next/server';

const N8N_URL = process.env.N8N_CHAT_WEBHOOK_URL ?? '';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!N8N_URL) {
    return NextResponse.json(
      { reply: 'El agente no está configurado todavía.' },
      { status: 200 }
    );
  }

  try {
    const body = await req.json();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const upstream = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!upstream.ok) throw new Error(`n8n ${upstream.status}`);

    const data = await upstream.json();
    return NextResponse.json(data);

  } catch (err) {
    const error = err as { name?: string };
    console.error('[chat proxy]', err);

    if (error?.name === 'AbortError') {
      return NextResponse.json(
        { reply: 'Nova está tardando más de lo habitual. Por favor, inténtalo de nuevo en unos segundos.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { reply: 'No pude contactar al agente. Inténtalo de nuevo.' },
      { status: 200 }
    );
  }
}
