import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com',
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    svg: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: '#how',      label: t('Navigation.howItWorks') },
    { href: '#services', label: t('Navigation.services') },
    { href: '#roi',      label: 'ROI' },
    { href: '#faq',      label: t('Navigation.faq') },
    { href: '#contact',  label: t('Navigation.contact') },
  ];

  const legalLinks = [
    { href: `/${locale}/privacidad`, label: t('Footer.privacy') },
    { href: `/${locale}/terminos`,   label: t('Footer.terms') },
    { href: `/${locale}/cookies`,    label: t('Footer.cookies') },
  ];

  return (
    <footer className="bg-background border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-6">

        {/* Columnas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Columna 1 — Marca */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href={`/${locale}`} className="text-2xl font-bold tracking-tighter w-fit">
              The MKN<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t('Footer.tagline')}
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:hola@themkn.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
            >
              <Mail className="size-4" />
              hola@themkn.com
            </a>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t('Footer.nav')}
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3 — Legal */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t('Footer.legal')}
            </p>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground/60 text-center">
            © {new Date().getFullYear()} {t('Footer.rights')}
          </p>
        </div>

      </div>
    </footer>
  );
}
