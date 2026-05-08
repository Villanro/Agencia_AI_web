"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '¡Hola! Soy el asistente IA de The MKN. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.slice(-5) // Enviar últimos 5 mensajes para contexto (opcional)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Asumiendo que n8n devuelve { "reply": "texto de respuesta" }
        // Si la estructura es diferente, el usuario deberá adaptar esto:
        const replyContent = data.reply || data.output || data.message || "Recibido. Estamos procesando tu solicitud.";
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: replyContent
        }]);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error connecting to chat webhook:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Lo siento, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo más tarde."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-background border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-secondary p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente The MKN</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-secondary">
                    {msg.role === 'user' ? <User className="w-4 h-4 text-muted-foreground" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-secondary">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary rounded-tl-sm flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-background border-t border-white/5">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..." 
                  className="bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
