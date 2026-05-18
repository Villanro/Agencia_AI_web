"use client";

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';

const sectorKeys = ['clinicas', 'agencias', 'ecommerce', 'servicios'] as const;

export default function RoiSector() {
  const t = useTranslations('RoiSector');

  return (
    <section id="roi" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {sectorKeys.map((key, index) => (
            <m.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full rounded-2xl border border-border/40 bg-secondary/10 p-8 flex flex-col gap-5 hover:border-primary/30 hover:bg-secondary/20 transition-colors duration-300">
                {/* Sector header */}
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                    {t(`items.${key}.sector`)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t(`items.${key}.problem`)}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/30" />

                {/* Result + Payback */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <TrendingUp className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {t(`items.${key}.result`)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 bg-primary/10 text-primary rounded-full px-3 py-1">
                    <Clock className="size-3" />
                    <span className="text-xs font-semibold whitespace-nowrap">
                      {t(`items.${key}.payback`)}
                    </span>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground/40">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
