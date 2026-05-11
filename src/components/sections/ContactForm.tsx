"use client";

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, CheckCircle2, XCircle } from 'lucide-react';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formSchema = z.object({
    name: z.string().min(2, { message: t('form.validation.nameMin') }),
    email: z.string().email({ message: t('form.validation.emailInvalid') }),
    company: z.string().optional(),
    service: z.string().min(1, { message: t('form.validation.serviceRequired') }),
    message: z.string().min(10, { message: t('form.validation.messageMin') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          locale,
          source: 'web',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('title')}</h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-white/5 bg-secondary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <m.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">{t('form.success')}</h3>
                    <p className="text-muted-foreground">{t('form.successDescription')}</p>
                    <Button onClick={() => setSubmitStatus('idle')} variant="outline" className="mt-8">
                      {t('form.sendAnother')}
                    </Button>
                  </m.div>
                ) : (
                  <m.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('form.name')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('form.namePlaceholder')} className="bg-background/50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('form.email')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('form.emailPlaceholder')} className="bg-background/50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('form.companyOptional')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('form.companyPlaceholder')} className="bg-background/50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('form.service')}</FormLabel>
                                <FormControl>
                                  <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                  >
                                    <option value="" disabled>{t('form.servicePlaceholder')}</option>
                                    <option value="automation">{t('services.automation')}</option>
                                    <option value="ai">{t('services.ai')}</option>
                                    <option value="api">{t('services.api')}</option>
                                    <option value="consulting">{t('services.consulting')}</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('form.message')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={t('form.messagePlaceholder')} 
                                  className="min-h-[120px] bg-background/50" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {submitStatus === 'error' && (
                          <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md">
                            <XCircle className="w-5 h-5" />
                            <p className="text-sm">{t('form.error')}</p>
                          </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                              {t('form.sending')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {t('form.submit')} <Send className="w-4 h-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </m.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </m.div>
      </div>
    </section>
  );
}
