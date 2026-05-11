import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    : 'Transformamos procesos manuales en flujos inteligentes con IA y automatizacion.';
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} ${plusJakarta.variable} min-h-screen bg-background antialiased flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
