import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const LOCALES = ['es', 'en'] as const;
const STATIC_PATHS = ['', '/privacidad', '/terminos', '/cookies'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    }))
  );
}
