"use client";

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
const stepKeys = ['step1', 'step2', 'step3'] as const;

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');

  return (
    <section id="how" className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </h2>
        </m.div>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora — solo desktop */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {stepKeys.map((key, index) => (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col items-center text-center lg:items-center relative"
              >
                {/* Número con círculo */}
                <div className="relative mb-8">
                  <div className="size-28 rounded-full bg-background border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
                    <span className="text-4xl font-bold text-primary/30 select-none">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>
                  {/* Pulso animado en el primer paso */}
                  {index === 0 && (
                    <m.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full border border-primary/40"
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3">{t(`steps.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {t(`steps.${key}.description`)}
                </p>
              </m.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="#contact"
            className={buttonVariants({ size: 'lg', className: 'shadow-lg shadow-primary/25' })}
          >
            {t('cta')}
          </Link>
        </m.div>

      </div>
    </section>
  );
}
