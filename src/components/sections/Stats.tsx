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

export default function Stats() {
  const t = useTranslations('Stats');
  const statKeys = ['automations', 'hours', 'clients', 'weeks'] as const;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="border-t border-b border-border/20 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statKeys.map((key, index) => (
            <m.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-3"
            >
              <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
                <AnimatedNumber
                  value={Number(t(`items.${key}.value`))}
                  suffix={t(`items.${key}.suffix`)}
                />
              </div>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-widest leading-relaxed">
                {t(`items.${key}.label`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
