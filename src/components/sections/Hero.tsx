"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { m, useScroll, useTransform } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
export default function Hero() {
  const t = useTranslations('Hero');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Fondo con parallax — se mueve más lento que el contenido */}
      <m.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-background to-background"
      />
      {/* Patrón de puntos */}
      <div className="absolute inset-0 dot-grid z-0 pointer-events-none opacity-50" />

      <m.div style={{ y: contentY, opacity }} className="container relative z-10 mx-auto px-6 text-center max-w-4xl">

        {/* Título con parte resaltada */}
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
        >
          {t('title')}{' '}
          <span className="text-primary">{t('titleHighlight')}</span>
        </m.h1>

        {/* Subtítulo */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#contact" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto shadow-lg shadow-primary/25" })}>
            {t('ctaTalk')}
          </Link>
          <Link href="#services" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto" })}>
            {t('ctaServices')}
          </Link>
        </m.div>

      </m.div>
    </section>
  );
}
