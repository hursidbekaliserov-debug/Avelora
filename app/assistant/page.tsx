'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Info,
  DollarSign,
  Coffee,
  ShieldCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

export default function AssistantPage() {
  const { lang, t } = useLanguage();
  const { savedTrips } = useAuth();
  const activeItinerary = savedTrips[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: lang === 'ru' 
        ? 'Здравствуйте! Я ваш персональный AI-консьерж **AVELORA**. Готов помочь вам спланировать идеальное путешествие по Узбекистану и Великому Шелковому Пути. С чего начнем?'
        : lang === 'uz'
        ? 'Assalomu alaykum! Men **AVELORA** shaxsiy AI sayohat konsyerjiman. O‘zbekiston va Buyuk Ipak Yo‘li bo‘ylab unutilmas safaringizni rejalashtirishga tayyorman.'
        : 'Welcome to **AVELORA**. I am your personal AI Travel Concierge. I specialize in bespoke Silk Road itineraries, transparent travel budgets, and verified local artisan secrets across Uzbekistan. How may I curate your journey today?',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { label: 'Samarkand Highlights', query: 'Which places should I visit in Samarkand?' },
    { label: '$400 Budget Test', query: 'Can I explore Uzbekistan with a $400 budget?' },
    { label: 'Afrosiyob Train Guide', query: 'How does the Afrosiyob high-speed train work between Tashkent and Bukhara?' },
    { label: 'Local Artisans & Crafts', query: 'Recommend authentic local artisan workshops and experiences.' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userItinerary: activeItinerary,
          language: lang,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (e) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, an unexpected connection error occurred. Please ask again.',
          timestamp: 'Just now',
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold-500/20 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>24/7 Silk Road Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">
            {t('assistantTitle')}
          </h1>
          <p className="text-xs text-forest-200 mt-1">
            {t('assistantSubtitle')}
          </p>
        </div>

        {activeItinerary && (
          <div className="p-3 rounded-2xl bg-forest-900 border border-gold-500/20 text-xs flex items-center gap-3">
            <Compass className="w-4 h-4 text-gold-400 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-gold-400 uppercase font-bold block">Active Itinerary Context:</span>
              <span className="text-forest-100 font-medium truncate max-w-[200px] block">{activeItinerary.title}</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Inquiries */}
      <div className="mb-6">
        <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider block mb-2">
          {t('suggestedQueries')}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-forest-900 border border-gold-500/25 hover:border-gold-400 text-forest-100 hover:text-white transition-all text-left"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-grow glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 overflow-y-auto min-h-[460px] max-h-[550px] space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 rounded-full bg-forest-800 border border-gold-500/40 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
            )}

            <div
              className={`max-w-[82%] sm:max-w-[75%] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-medium rounded-tr-none'
                  : 'bg-forest-900/90 border border-gold-500/20 text-forest-100 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.content}
              <div
                className={`text-[9px] mt-2 font-mono ${
                  msg.role === 'user' ? 'text-forest-900/80 text-right' : 'text-forest-400 text-left'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center shrink-0 text-forest-950 font-bold text-xs shadow-md">
                U
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-forest-800 border border-gold-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            <div className="bg-forest-900 p-4 rounded-2xl border border-gold-500/20 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-4 flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('askPlaceholder')}
          className="flex-grow bg-forest-900 text-white p-4 rounded-2xl border border-gold-500/30 text-xs sm:text-sm focus:outline-none focus:border-gold-400 shadow-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="gold-btn px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl disabled:opacity-50 transition-all shrink-0"
        >
          <Send className="w-4 h-4 text-forest-950" />
          <span className="hidden sm:inline">{t('send')}</span>
        </button>
      </form>

    </div>
  );
}

