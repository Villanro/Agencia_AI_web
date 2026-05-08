"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const tools = [
  'OpenAI', 'Claude', 'n8n', 'Make', 'LangChain',
  'Supabase', 'Pinecone', 'Groq', 'Mistral', 'Gemini',
  'WhatsApp API', 'HubSpot', 'Airtable', 'Notion', 'Zapier', 'Slack',
];

function ToolBadge({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground font-medium whitespace-nowrap flex-shrink-0 hover:border-primary/40 hover:text-foreground transition-colors duration-300">
      {name}
    </span>
  );
}

export default function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section className="py-14 border-y border-border/30 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em]"
        >
          {t('label')}
        </motion.p>
      </div>

      {/* Una sola fila de marquee */}
      <div className="flex gap-3 animate-marquee-left w-max">
        {[...tools, ...tools].map((name, i) => (
          <ToolBadge key={i} name={name} />
        ))}
      </div>

      {/* Fades laterales */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
    </section>
  );
}
