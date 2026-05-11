"use client";

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';

export default function SuccessCases() {
  const t = useTranslations('SuccessCases');
  const caseKeys = ['case1', 'case2', 'case3'] as const;

  return (
    <section id="cases" className="py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            {t('title')}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseKeys.map((key, index) => (
            <m.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative rounded-2xl border border-border/50 bg-secondary/20 p-8 overflow-hidden flex flex-col gap-6 hover:border-primary/30 transition-colors duration-300"
            >
              {/* Glow sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              {/* Sector tag */}
              <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
                {t(`cases.${key}.sector`)}
              </span>

              {/* Métrica — protagonista */}
              <div>
                <p className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                  {t(`cases.${key}.metric`)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t(`cases.${key}.metricLabel`)}
                </p>
              </div>

              {/* Descripción */}
              <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                {t(`cases.${key}.description`)}
              </p>

              {/* Línea inferior decorativa */}
              <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent" />

              <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider">
                {t(`cases.${key}.title`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
