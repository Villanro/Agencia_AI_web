"use client";

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    // Basic implementation for changing locale route
    const currentPathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPathWithoutLocale}`);
  };

  const navLinks = [
    { href: '#how', label: t('howItWorks') },
    { href: '#services', label: t('services') },
    { href: '#cases', label: t('successCases') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-2xl font-bold tracking-tighter">
          The MKN<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="flex bg-secondary rounded-md p-1">
            <button 
              onClick={() => switchLanguage('es')}
              className={`px-2 py-1 text-xs font-bold rounded-sm transition-colors ${locale === 'es' ? 'bg-background text-foreground' : 'text-muted-foreground'}`}
            >
              ES
            </button>
            <button 
              onClick={() => switchLanguage('en')}
              className={`px-2 py-1 text-xs font-bold rounded-sm transition-colors ${locale === 'en' ? 'bg-background text-foreground' : 'text-muted-foreground'}`}
            >
              EN
            </button>
          </div>
          <Link href="#contact" className={buttonVariants({ variant: "default" })}>
            {t('contact')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => { switchLanguage('es'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 text-sm font-bold rounded-md ${locale === 'es' ? 'bg-secondary text-foreground' : 'text-muted-foreground'}`}>ES</button>
              <button onClick={() => { switchLanguage('en'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 text-sm font-bold rounded-md ${locale === 'en' ? 'bg-secondary text-foreground' : 'text-muted-foreground'}`}>EN</button>
              <ThemeToggle />
            </div>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={buttonVariants({ variant: "default" })}>
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
