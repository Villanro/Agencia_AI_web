import type { Metadata } from 'next';
import Link from 'next/link';

type LocalePageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Cookie Policy | The MKN' : 'Politica de Cookies | The MKN',
    description: isEn
      ? 'Understand how The MKN uses cookies and similar technologies.'
      : 'Conoce como The MKN utiliza cookies y tecnologias similares.',
  };
}

export default function CookiesPage({ params }: LocalePageProps) {
  const isEn = params.locale === 'en';

  return (
    <section className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
        {isEn ? 'Cookie Policy' : 'Politica de Cookies'}
      </h1>

      <p className="text-muted-foreground mb-10">
        {isEn ? 'Last updated: May 8, 2026' : 'Ultima actualizacion: 8 de mayo de 2026'}
      </p>

      <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '1. What are cookies?' : '1. Que son las cookies?'}
          </h2>
          <p>
            {isEn
              ? 'Cookies are small text files stored in your browser that help websites remember your preferences and improve your browsing experience.'
              : 'Las cookies son pequenos archivos de texto que se almacenan en tu navegador y ayudan a recordar tus preferencias para mejorar la experiencia de navegacion.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '2. Cookies we use' : '2. Cookies que usamos'}
          </h2>
          <p>
            {isEn
              ? 'We may use technical cookies for basic website operation and analytical cookies to understand usage patterns and improve our services.'
              : 'Podemos utilizar cookies tecnicas para el funcionamiento basico del sitio y cookies analiticas para entender el uso y mejorar nuestros servicios.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '3. Managing cookies' : '3. Gestion de cookies'}
          </h2>
          <p>
            {isEn
              ? 'You can accept, reject, or delete cookies through your browser settings. Disabling some cookies may affect certain website features.'
              : 'Puedes aceptar, rechazar o eliminar cookies desde la configuracion de tu navegador. Desactivar ciertas cookies puede afectar algunas funcionalidades del sitio.'}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-semibold mb-2">
            {isEn ? '4. Contact' : '4. Contacto'}
          </h2>
          <p>
            {isEn
              ? 'For questions about this policy, contact us at hola@themkn.com.'
              : 'Para cualquier consulta sobre esta politica, escribenos a hola@themkn.com.'}
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
