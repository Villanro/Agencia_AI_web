"use client";

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { m, useInView, useMotionValue, useSpring } from 'framer-motion';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const statKeys = ['market', 'payback', 'roi', 'costs'] as const;

export default function Stats() {
  const t = useTranslations('Stats');

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-2">
            {t('heading')}
          </p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {t('subheading')}
          </p>
        </m.div>

        <div className="border-t border-b border-border/20 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statKeys.map((key, index) => {
            const display = t(`items.${key}.display`);
            const value = Number(t(`items.${key}.value`));
            const suffix = t(`items.${key}.suffix`);
            const label = t(`items.${key}.label`);
            const source = t(`items.${key}.source`);
            const sourceUrl = t(`items.${key}.sourceUrl`);

            return (
              <m.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
                  {display
                    ? display
                    : <AnimatedNumber value={value} suffix={suffix} />
                  }
                </div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest leading-relaxed">
                  {label}
                </p>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-muted-foreground/40 hover:text-primary transition-colors mt-1 w-fit"
                >
                  {source} ↗
                </a>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
