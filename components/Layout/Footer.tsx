'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { Award, ShieldCheck, Mail, Phone, Compass, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-forest-950 border-t border-gold-500/20 pt-16 pb-12 text-forest-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full p-1 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900 border-2 border-gold-400/80 shadow-[0_0_15px_rgba(198,163,106,0.35)] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-circle.png"
                  alt="Avelora Luxury Emblem"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic font-bold text-2xl tracking-[0.16em] bg-gradient-to-r from-[#FFF5DC] via-[#DFBF85] to-[#B8860B] bg-clip-text text-transparent leading-none">
                  Avelora
                </span>
                <span className="text-[7.5px] font-sans font-bold tracking-[0.35em] text-gold-400/90 uppercase mt-0.5">
                  HAUTE VOYAGE
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-forest-100 max-w-sm font-serif italic text-lg leading-relaxed">
              &ldquo;{t('tagline')}&rdquo;
            </p>
            <p className="text-xs text-forest-300 max-w-sm leading-relaxed">
              {t('subTagline')} Engineered as an elite, full-stack AI travel concierge tailored for international explorers.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="px-3 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-[11px] text-gold-300 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>International Tourism Hackathon • Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore" className="hover:text-gold-300 transition-colors">
                  Silk Road Discovery
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-gold-300 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-gold-300 transition-colors">
                  AI Trip Concierge
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-gold-300 transition-colors">
                  Interactive AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/my-journeys" className="hover:text-gold-300 transition-colors">
                  My Saved Journeys
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/destinations/samarkand" className="hover:text-gold-300 transition-colors">
                  Samarkand (Registan)
                </Link>
              </li>
              <li>
                <Link href="/destinations/bukhara" className="hover:text-gold-300 transition-colors">
                  Bukhara (Po-i Kalyan)
                </Link>
              </li>
              <li>
                <Link href="/destinations/khiva" className="hover:text-gold-300 transition-colors">
                  Khiva (Ichan Kala)
                </Link>
              </li>
              <li>
                <Link href="/destinations/tashkent" className="hover:text-gold-300 transition-colors">
                  Tashkent (Metropolis)
                </Link>
              </li>
              <li>
                <Link href="/destinations/chimgan" className="hover:text-gold-300 transition-colors">
                  Chimgan & Amirsoy Alpine
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
              Company & Relations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/partner/register" className="hover:text-gold-300 transition-colors text-gold-400 font-medium">
                  Partner Registration
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Avelora
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Concierge Inquiries
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-300 gap-4">
          <p>© 2026 AVELORA Technologies Inc. {t('footerRights')}</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">
              {t('termsOfService')}
            </Link>
            <span className="text-gold-500">•</span>
            <span className="text-gold-300">Tashkent, Uzbekistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

