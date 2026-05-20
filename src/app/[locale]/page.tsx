import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import TechStack from '@/components/sections/TechStack';
import Stats from '@/components/sections/Stats';
import HowItWorks from '@/components/sections/HowItWorks';
import Services from '@/components/sections/Services';
import RoiSector from '@/components/sections/RoiSector';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';

const ChatWidget = dynamic(() => import('@/components/widgets/ChatWidget'), {
  ssr: false,
});

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export default async function Home() {
  const t = await getTranslations('FAQ');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`items.${key}.q`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`items.${key}.a`),
      },
    })),
  };

  return (
    <>
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <RoiSector />
      <FAQ />
      <ContactForm />
      <TechStack />
      <ChatWidget />
    </>
  );
}
