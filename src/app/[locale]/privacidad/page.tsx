import type { Metadata } from 'next';
import Link from 'next/link';

type LocalePageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Privacy Policy | The MKN' : 'Política de Privacidad | The MKN',
    description: isEn
      ? 'Learn how The MKN collects, uses, and protects your personal data.'
      : 'Conoce cómo The MKN recopila, usa y protege tus datos personales.',
  };
}

export default function PrivacyPage({ params }: LocalePageProps) {
  const isEn = params.locale === 'en';

  return (
    <section className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
        {isEn ? 'Privacy Policy' : 'Política de Privacidad'}
      </h1>

      <p className="text-muted-foreground mb-10">
        {isEn ? 'Last updated: May 8, 2026' : 'Ultima actualizacion: 8 de mayo de 2026'}
      </p>

      <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '1. Data controller' : '1. Responsable del tratamiento'}
          </h2>
          <p>
            {isEn
              ? 'The MKN is the data controller for personal information collected through this website.'
              : 'The MKN es el responsable del tratamiento de los datos personales recopilados a traves de este sitio web.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '2. Data we collect' : '2. Datos que recopilamos'}
          </h2>
          <p>
            {isEn
              ? 'We may collect your name, email, company, message, technical metadata, and communication preferences when you submit contact forms.'
              : 'Podemos recopilar tu nombre, email, empresa, mensaje, metadatos tecnicos y preferencias de comunicacion cuando envias formularios de contacto.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '3. Purpose and legal basis' : '3. Finalidad y base legal'}
          </h2>
          <p>
            {isEn
              ? 'We process your data to answer inquiries, provide our services, and improve our operations. The legal basis is your consent and our legitimate business interest.'
              : 'Tratamos tus datos para responder consultas, prestar nuestros servicios y mejorar nuestras operaciones. La base legal es tu consentimiento y nuestro interes legitimo.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '4. Data retention' : '4. Conservacion de los datos'}
          </h2>
          <p>
            {isEn
              ? 'We retain data only for as long as necessary to fulfill the stated purposes and legal obligations.'
              : 'Conservamos los datos solo durante el tiempo necesario para cumplir las finalidades indicadas y las obligaciones legales aplicables.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '5. Your rights' : '5. Tus derechos'}
          </h2>
          <p>
            {isEn
              ? 'You may request access, rectification, deletion, limitation, objection, and portability of your personal data by contacting us at hola@themkn.com.'
              : 'Puedes solicitar acceso, rectificacion, supresion, limitacion, oposicion y portabilidad de tus datos personales escribiendo a hola@themkn.com.'}
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
