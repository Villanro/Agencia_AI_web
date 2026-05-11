import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background:
            'radial-gradient(circle at 20% 20%, #2a155f 0%, #0b1023 45%, #070b18 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          The MKN.
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
            maxWidth: 900,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          AI and Automation Agency
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            maxWidth: 900,
          }}
        >
          Intelligent workflows to save time and increase team output.
        </div>
      </div>
    ),
    size
  );
}
