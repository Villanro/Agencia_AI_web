import type { Metadata } from 'next';
import Link from 'next/link';

type LocalePageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Legal Notice | The MKN' : 'Aviso Legal | The MKN',
    description: isEn
      ? 'Read the legal terms that govern the use of The MKN website and services.'
      : 'Consulta los terminos legales que regulan el uso del sitio web y servicios de The MKN.',
  };
}

export default function TermsPage({ params }: LocalePageProps) {
  const isEn = params.locale === 'en';

  return (
    <section className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
        {isEn ? 'Legal Notice' : 'Aviso Legal'}
      </h1>

      <p className="text-muted-foreground mb-10">
        {isEn ? 'Last updated: May 8, 2026' : 'Ultima actualizacion: 8 de mayo de 2026'}
      </p>

      <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '1. Website owner' : '1. Titular del sitio web'}
          </h2>
          <p>
            {isEn
              ? 'This website is operated by The MKN. For legal and support matters, contact hola@themkn.com.'
              : 'Este sitio web es operado por The MKN. Para cuestiones legales y de soporte puedes contactar en hola@themkn.com.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '2. Terms of use' : '2. Condiciones de uso'}
          </h2>
          <p>
            {isEn
              ? 'By accessing this website, you agree to use it lawfully and respectfully. Misuse, unauthorized access attempts, or abusive behavior are prohibited.'
              : 'Al acceder a este sitio web aceptas un uso licito y respetuoso. Queda prohibido el uso indebido, el acceso no autorizado o cualquier comportamiento abusivo.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '3. Intellectual property' : '3. Propiedad intelectual'}
          </h2>
          <p>
            {isEn
              ? 'All content on this website, including text, graphics, branding, and code, is protected by intellectual property rights and may not be reproduced without authorization.'
              : 'Todo el contenido del sitio, incluidos textos, graficos, marca y codigo, esta protegido por derechos de propiedad intelectual y no puede reproducirse sin autorizacion.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '4. Liability limitation' : '4. Limitacion de responsabilidad'}
          </h2>
          <p>
            {isEn
              ? 'The MKN is not liable for interruptions, external service failures, or damages resulting from improper use of the website.'
              : 'The MKN no se responsabiliza por interrupciones, fallos de servicios externos o danos derivados de un uso inadecuado del sitio web.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '5. Applicable law' : '5. Ley aplicable'}
          </h2>
          <p>
            {isEn
              ? 'These terms are governed by applicable Spanish and European regulations.'
              : 'Estas condiciones se rigen por la normativa aplicable en Espana y la Union Europea.'}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Link href={`/${params.locale}`} className="text-primary hover:underline">
          {isEn ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>
    </section>
  );
}
