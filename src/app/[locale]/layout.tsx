import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
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

export const metadata = {
  title: 'The MKN - Agencia de IA y Automatización',
  description: 'Transformamos procesos manuales en flujos inteligentes con IA y Automatización.',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
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
