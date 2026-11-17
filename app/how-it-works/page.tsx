'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  PieChart, 
  CheckCircle2, 
  ArrowRight,
  Bot,
  Train,
  Coffee
} from 'lucide-react';

export default function HowItWorksPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          Behind The Intelligence
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
          How AVELORA Reimagines Travel Planning
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 mt-3 leading-relaxed">
          Combining Google Gemini generative intelligence, high-precision geospatial coordinates, and verified Silk Road hospitality partnerships into one cohesive platform.
        </p>
      </div>

      {/* 3 Interactive Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        <div className="glass-panel p-8 rounded-3xl border border-gold-500/20 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xl font-bold font-serif">
            01
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Hyper-Personalized Intake
          </h3>
          <p className="text-xs text-forest-200 leading-relaxed">
            Unlike generic travel guides, AVELORA asks deep preference questions: travel pace, party composition, culinary curiosity, and architectural passions.
          </p>
          <ul className="text-xs text-forest-300 space-y-2 pt-2 border-t border-forest-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Multi-currency budget calibration</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Trilingual support (EN, RU, UZ)</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-gold-500/40 space-y-4 shadow-2xl relative">
          <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 text-[10px] font-bold uppercase">
            Core AI
          </div>
          <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xl font-bold font-serif">
            02
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Logistical Validation
          </h3>
          <p className="text-xs text-forest-200 leading-relaxed">
            The AI verifies realistic travel times, timetable schedules (e.g., high-speed Afrosiyob trains), prayer and opening hours, and pacing between monuments.
          </p>
          <ul className="text-xs text-forest-300 space-y-2 pt-2 border-t border-forest-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Zero hallucinated coordinates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Verified local prices</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-gold-500/20 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xl font-bold font-serif">
            03
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Dynamic Adaptability
          </h3>
          <p className="text-xs text-forest-200 leading-relaxed">
            Your journey isn’t static. Swap out places, tweak days, export official briefing PDFs, and consult our 24/7 AI Concierge on the road.
          </p>
          <ul className="text-xs text-forest-300 space-y-2 pt-2 border-t border-forest-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Interactive Leaflet maps</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
              <span>Direct artisan encounters</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Demonstration Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 text-center space-y-4">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
          Ready to experience it?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          See the Live Hackathon Demonstration
        </h2>
        <p className="text-xs sm:text-sm text-forest-200 max-w-xl mx-auto">
          Explore our preloaded 5-day journey across Tashkent, Samarkand, and Bukhara designed specifically for international hackathon evaluation.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/my-journeys/grand-silk-road-5day-demo"
            className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Open Live Demo Journey
          </Link>
        </div>
      </div>

    </div>
  );
}

