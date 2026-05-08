import Hero from '@/components/sections/Hero';
import TechStack from '@/components/sections/TechStack';
import Stats from '@/components/sections/Stats';
import HowItWorks from '@/components/sections/HowItWorks';
import Services from '@/components/sections/Services';
import SuccessCases from '@/components/sections/SuccessCases';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
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
      <SuccessCases />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactForm />
      <TechStack />
      <ChatWidget />
    </>
  );
}
