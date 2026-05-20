import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import MotionProvider from '@/components/MotionProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';

const inter = Inter({ subsets: ['latin'] });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://themkn.es';

// Partes estáticas del schema — hoistadas fuera del render
const ORG_SCHEMA_BASE = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The MKN',
  email: 'hola@themkn.com',
  areaServed: { '@type': 'Country', name: 'Spain' },
  serviceType: ['AI Automation', 'AI Agents', 'API Integration', 'AI Consulting'],
  knowsLanguage: ['es', 'en'],
} as const;

const ORG_DESCRIPTIONS = {
  en: 'AI and automation agency. We transform manual processes into intelligent workflows.',
  es: 'Agencia de IA y automatización. Transformamos procesos manuales en flujos inteligentes.',
} as const;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const isEn = params.locale === 'en';
  const title = isEn
    ? 'The MKN - AI and Automation Agency'
    : 'The MKN - Agencia de IA y Automatizacion';
  const description = isEn
    ? 'We transform manual processes into intelligent workflows with AI and automation.'
    : 'Transformamos procesos manuales en flujos inteligentes con IA y automatización.';
  const canonical = `${BASE_URL}/${params.locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'The MKN',
      locale: isEn ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/${params.locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'The MKN',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/${params.locale}/twitter-image`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const messages = await getMessages();

  const organizationSchema = {
    ...ORG_SCHEMA_BASE,
    url: `${BASE_URL}/${locale}`,
    description: ORG_DESCRIPTIONS[locale as keyof typeof ORG_DESCRIPTIONS] ?? ORG_DESCRIPTIONS.es,
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} ${plusJakarta.variable} min-h-screen bg-background antialiased flex flex-col`}>
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <MotionProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
              >
                Saltar al contenido principal
              </a>
              <ScrollProgress />
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
