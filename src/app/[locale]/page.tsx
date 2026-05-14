import Hero from '@/components/sections/Hero';
import TechStack from '@/components/sections/TechStack';
import Stats from '@/components/sections/Stats';
import HowItWorks from '@/components/sections/HowItWorks';
import Services from '@/components/sections/Services';
import RoiSector from '@/components/sections/RoiSector';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import ChatWidget from '@/components/widgets/ChatWidget';

export default async function Home() {
  return (
    <>
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
