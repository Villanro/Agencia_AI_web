"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const items = ['t1', 't2', 't3'] as const;

  return (
    <section id="testimonials" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-background/60 p-8 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300"
            >
              {/* Estrellas */}
              <Stars />

              {/* Cita */}
              <p className="text-foreground/80 leading-relaxed flex-1 text-[15px]">
                &ldquo;{t(`items.${key}.text`)}&rdquo;
              </p>

              {/* Separador */}
              <div className="h-px bg-border/50" />

              {/* Autor */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-base flex-shrink-0">
                  {t(`items.${key}.name`).charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t(`items.${key}.name`)}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(`items.${key}.role`)} · {t(`items.${key}.company`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
