"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const t = useTranslations('Pricing');
  const planKeys = ['basic', 'pro', 'enterprise'] as const;

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {planKeys.map((key, index) => {
            const isPro = key === 'pro';
            // Extract features array using translation map logic or manual parse since we know length
            const features = t.raw(`plans.${key}.features`) as string[];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full flex flex-col ${isPro ? 'relative border-primary shadow-2xl shadow-primary/10 scale-105 z-10' : 'border-white/5 bg-secondary/20'}`}>
                  {isPro && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recomendado
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl text-muted-foreground">{t(`plans.${key}.name`)}</CardTitle>
                    <div className="text-4xl font-bold mt-4">{t(`plans.${key}.price`)}</div>
                  </CardHeader>
                  <CardContent className="flex-1 mt-6">
                    <ul className="space-y-4">
                      {features?.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link 
                      href="#contact" 
                      className={buttonVariants({ variant: isPro ? 'default' : 'outline', className: 'w-full' })}
                    >
                      {t(`plans.${key}.cta`)}
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
