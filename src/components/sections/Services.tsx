"use client";

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings, Bot, Webhook, Lightbulb } from 'lucide-react';

const icons = {
  automation: <Settings className="w-8 h-8 text-primary" />,
  agents: <Bot className="w-8 h-8 text-primary" />,
  api: <Webhook className="w-8 h-8 text-primary" />,
  consulting: <Lightbulb className="w-8 h-8 text-primary" />
};

export default function Services() {
  const t = useTranslations('Services');
  const servicesKeys = ['automation', 'agents', 'api', 'consulting'] as const;

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('title')}</h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesKeys.map((key, index) => (
            <m.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="h-full bg-secondary border-none hover:bg-secondary/80 hover:border-primary/20 border border-transparent transition-all duration-300">
                <CardHeader>
                  <m.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    className="mb-4 bg-background w-16 h-16 rounded-full flex items-center justify-center"
                  >
                    {icons[key]}
                  </m.div>
                  <CardTitle className="text-lg leading-snug">{t(`items.${key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{t(`items.${key}.description`)}</p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
