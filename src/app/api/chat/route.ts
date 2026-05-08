import { NextRequest, NextResponse } from 'next/server';

const N8N_URL = process.env.N8N_CHAT_WEBHOOK_URL ?? '';

export async function POST(req: NextRequest) {
  if (!N8N_URL) {
    return NextResponse.json(
      { reply: 'El agente no está configurado todavía.' },
      { status: 200 }
    );
  }

  try {
    const body = await req.json();

    const upstream = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) throw new Error(`n8n ${upstream.status}`);

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[chat proxy]', err);
    return NextResponse.json(
      { reply: 'No pude contactar al agente. Inténtalo de nuevo.' },
      { status: 200 }
    );
  }
}
