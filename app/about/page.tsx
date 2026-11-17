'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-[10px] font-bold text-gold-300 uppercase tracking-widest">
          <Award className="w-3.5 h-3.5 text-gold-400" />
          <span>International Tourism Hackathon • Uzbekistan</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          The Story of AVELORA
        </h1>
        <p className="text-sm text-forest-200 leading-relaxed font-light">
          Bridging thousand-year Silk Road heritage with 21st-century artificial intelligence.
        </p>
      </div>

      {/* Brand Vision Section */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Our Mission
        </h2>
        <p className="text-forest-100 text-sm sm:text-base leading-relaxed font-light">
          AVELORA was conceived at the intersection of luxury hospitality and autonomous generative intelligence. For decades, international travelers venturing to Central Asia faced fragmented information, outdated tour bus schedules, or opaque pricing that overlooked the real soul of Uzbekistan: small family guesthouses, ancient paper mills, master suzani embroiderers, and subterranean hammams.
        </p>
        <p className="text-forest-100 text-sm sm:text-base leading-relaxed font-light">
          We built AVELORA to empower the modern international explorer with a digital concierge of unprecedented sophistication — one that honors local cultures, guarantees transparent economic estimates, and generates bespoke daily itineraries in seconds.
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-forest-800 text-center">
          <div className="p-4 rounded-2xl bg-forest-900">
            <span className="font-serif text-3xl font-bold gold-gradient-text block">100%</span>
            <span className="text-[11px] text-forest-300 uppercase tracking-wider font-semibold">Verified Coordinates</span>
          </div>
          <div className="p-4 rounded-2xl bg-forest-900">
            <span className="font-serif text-3xl font-bold gold-gradient-text block">3 Languages</span>
            <span className="text-[11px] text-forest-300 uppercase tracking-wider font-semibold">English • Russian • Uzbek</span>
          </div>
          <div className="p-4 rounded-2xl bg-forest-900">
            <span className="font-serif text-3xl font-bold gold-gradient-text block">0 Dummy Data</span>
            <span className="text-[11px] text-forest-300 uppercase tracking-wider font-semibold">Real Silk Road Knowledge</span>
          </div>
        </div>
      </div>

      {/* Hackathon Alignment */}
      <div className="p-8 sm:p-10 rounded-3xl bg-forest-900 border border-gold-500/25 space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-400" />
          Designed for the Uzbekistan Tourism Hackathon
        </h3>
        <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
          Developed to showcase how Uzbekistan can lead Central Asian digital tourism innovation. AVELORA incorporates direct partner registration for local Uzbek guesthouses and artisan studios, full currency conversion (USD, EUR, GBP, UZS), and strict compliance with ethical AI standards (never fabricating fake businesses or booking confirmations).
        </p>
      </div>

    </div>
  );
}

