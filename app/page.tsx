'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { DESTINATIONS } from '@/lib/destinations-data';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Layers, 
  CheckCircle2, 
  Coffee, 
  ChevronRight,
  Award,
  DollarSign
} from 'lucide-react';
import FloatingSparkles from '@/components/Visual/FloatingSparkles';

export default function HomePage() {
  const { t, formatMoney } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  // Floating search state
  const [selectedDest, setSelectedDest] = useState('Samarkand & Bukhara');
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState('comfort');
  const [customBudgetUSD, setCustomBudgetUSD] = useState(1200);

  const handleStartPlanning = (e: React.FormEvent) => {
    e.preventDefault();
    const planUrl = `/plan?dest=${encodeURIComponent(selectedDest)}&days=${days}&travelers=${travelers}&budget=${budget}&customBudget=${customBudgetUSD}`;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(planUrl)}`);
    } else {
      router.push(planUrl);
    }
  };

  const featuredDestinations = DESTINATIONS.slice(0, 9);

  return (
    <div className="relative overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Background Samarkand Registan with Deep Forest Gradient & Floating Sparkles */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/destinations/samarkand.jpg"
            alt="Registan Square Samarkand Avelora Hero"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/70 to-forest-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,163,106,0.14)_0%,transparent_70%)]" />
        </div>

        {/* Ambient Flying Airplane, Sparkles & Golden Stardust */}
        <FloatingSparkles />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            <span>{t('heroHeadline1')}</span>
            <br />
            <span className="gold-gradient-text italic font-normal">
              {t('heroHeadline2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-forest-100/90 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            {t('heroSubtext')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => {
                if (!user) {
                  router.push('/login?redirect=/plan');
                } else {
                  router.push('/plan');
                }
              }}
              className="gold-btn px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2.5 shadow-2xl transition-all w-full sm:w-auto justify-center group"
            >
              <Sparkles className="w-4 h-4 text-forest-950 group-hover:rotate-12 transition-transform" />
              <span>{t('heroPrimaryCTA')}</span>
              <ArrowRight className="w-4 h-4 text-forest-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="#destinations"
              className="px-8 py-4 rounded-full text-sm font-semibold tracking-wider text-gold-300 bg-forest-900/80 hover:bg-forest-800 border border-gold-500/40 hover:border-gold-400 backdrop-blur-md transition-all w-full sm:w-auto justify-center flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-gold-400" />
              <span>{t('heroSecondaryCTA')}</span>
            </Link>
          </div>

          {/* Interactive Floating Quick Planner Bar with Direct Custom Budget Input */}
          <div className="glass-panel p-4 sm:p-5 rounded-3xl max-w-5xl mx-auto shadow-2xl border border-gold-500/30">
            <form onSubmit={handleStartPlanning} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
              
              {/* Destination */}
              <div className="bg-forest-900/70 p-3 rounded-2xl border border-gold-500/20">
                <label className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  Destination
                </label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
                >
                  <option value="Samarkand & Bukhara" className="bg-forest-900 text-white">Samarkand & Bukhara</option>
                  <option value="Tashkent, Samarkand & Bukhara" className="bg-forest-900 text-white">Tashkent, Samarkand & Bukhara</option>
                  <option value="Khiva Oasis" className="bg-forest-900 text-white">Khiva Ancient Citadel</option>
                  <option value="Amirsoy Mountain Resort" className="bg-forest-900 text-white">Amirsoy Mountain Resort</option>
                  <option value="Shahrisabz Timurid Heritage" className="bg-forest-900 text-white">Shahrisabz Timurid Heritage</option>
                  <option value="Fergana Silk Valley" className="bg-forest-900 text-white">Fergana Silk Valley</option>
                  <option value="Zaamin National Park" className="bg-forest-900 text-white">Zaamin National Park</option>
                  <option value="Termez Ancient Crossroads" className="bg-forest-900 text-white">Termez Ancient Crossroads</option>
                </select>
              </div>

              {/* Duration */}
              <div className="bg-forest-900/70 p-3 rounded-2xl border border-gold-500/20">
                <label className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase block mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  Duration
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
                >
                  <option value={3} className="bg-forest-900 text-white">3 Days (Weekend Express)</option>
                  <option value={5} className="bg-forest-900 text-white">5 Days (Classic Odyssey)</option>
                  <option value={7} className="bg-forest-900 text-white">7 Days (In-Depth Journey)</option>
                  <option value={10} className="bg-forest-900 text-white">10 Days (Grand Expedition)</option>
                </select>
              </div>

              {/* Travelers */}
              <div className="bg-forest-900/70 p-3 rounded-2xl border border-gold-500/20">
                <label className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase block mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gold-500" />
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-forest-900 text-white">Solo Traveler (1)</option>
                  <option value={2} className="bg-forest-900 text-white">Couple (2 Guests)</option>
                  <option value={4} className="bg-forest-900 text-white">Family / Friends (4 Guests)</option>
                  <option value={6} className="bg-forest-900 text-white">Small Group (6 Guests)</option>
                </select>
              </div>

              {/* Direct Custom Budget Input */}
              <div className="bg-forest-900/70 p-3 rounded-2xl border border-gold-500/20">
                <label className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase block mb-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-gold-500" />
                  Your Budget ($ USD)
                </label>
                <div className="flex items-center">
                  <span className="text-gold-400 text-xs font-bold mr-1">$</span>
                  <input
                    type="number"
                    min={200}
                    step={50}
                    value={customBudgetUSD}
                    onChange={(e) => setCustomBudgetUSD(Number(e.target.value) || 500)}
                    placeholder="e.g. 1200"
                    className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* CTA Start Planning */}
              <button
                type="submit"
                className="gold-btn py-3 px-4 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 col-span-1 sm:col-span-2 lg:col-span-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-forest-950" />
                <span>{t('startPlanning')}</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 2. FEATURED DESTINATIONS */}
      <section id="destinations" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold tracking-widest uppercase mb-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>Curated Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              {t('featuredTitle')}
            </h2>
            <p className="text-forest-200 text-sm max-w-xl mt-3">
              {t('featuredSubtitle')}
            </p>
          </div>

          <Link
            href="/destinations"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-white uppercase tracking-wider group"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-3xl overflow-hidden bg-forest-900 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                
                {/* Region Tag */}
                <div className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 text-[10px] font-semibold text-gold-300 uppercase tracking-wider">
                  {dest.tag}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-forest-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold-500/30 text-[11px] font-bold text-gold-300 flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  <span>{dest.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-forest-200 mt-2 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-forest-800 text-gold-200/90 border border-gold-500/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-6 pt-4 border-t border-forest-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-forest-300 font-medium">
                    Ideal: {dest.idealDays}
                  </span>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="text-xs font-bold text-gold-400 hover:text-gold-200 flex items-center gap-1 group/btn"
                  >
                    <span>{t('exploreCity')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 bg-forest-900/60 border-y border-gold-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-2 block">
              Concierge Process
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-forest-200 text-sm mt-3">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="glass-panel p-8 rounded-3xl relative border border-gold-500/20 hover:border-gold-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-300 font-serif font-bold text-xl mb-6">
                01
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                {t('step1Title')}
              </h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-8 rounded-3xl relative border border-gold-500/30 hover:border-gold-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-300 font-serif font-bold text-xl mb-6">
                02
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-8 rounded-3xl relative border border-gold-500/20 hover:border-gold-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-gold-500/40 flex items-center justify-center text-gold-300 font-serif font-bold text-xl mb-6">
                03
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                {t('step3Title')}
              </h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HIDDEN GEMS SPOTLIGHT */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Authentic Discoveries
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              {t('hiddenGemsTitle')}
            </h2>
            <p className="text-forest-200 text-sm leading-relaxed">
              {t('hiddenGemsSubtitle')}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-forest-900 border border-gold-500/20 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-forest-800 text-gold-400 mt-1">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gold-200">Konigil Meros Paper Mill Watermill</h4>
                  <p className="text-xs text-forest-300 mt-1">
                    Revived 8th-century Samarkand mulberry papermaking by riverside willow trees with aromatic herbal tea.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900 border border-gold-500/20 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-forest-800 text-gold-400 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gold-200">Bozori Kord 16th-Century Thermal Bathhouse</h4>
                  <p className="text-xs text-forest-300 mt-1">
                    Underground brick domes in Bukhara providing restorative herbal massage and ancient hospitality rituals.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/plan"
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-white uppercase tracking-wider pt-2"
            >
              <span>Build Itinerary with Local Hidden Gems</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
              alt="Silk Road Craftsman in Samarkand"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-forest-950/80 backdrop-blur-md border border-gold-500/20">
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">Featured Artisan Spot</span>
              <h4 className="font-serif text-lg text-white font-bold">Master Craftsmen of Bukhara & Samarkand</h4>
              <p className="text-[11px] text-forest-200 mt-0.5">Direct encounters preserving centuries of Silk Road heritage.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY AVELORA */}
      <section className="py-24 bg-forest-900/40 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-2 block">
              Intelligent Precision
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {t('whyTitle')}
            </h2>
            <p className="text-forest-200 text-sm mt-3">
              {t('whySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{t('whyFeature1Title')}</h3>
              <p className="text-xs text-forest-200 leading-relaxed">{t('whyFeature1Desc')}</p>
            </div>

            <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{t('whyFeature2Title')}</h3>
              <p className="text-xs text-forest-200 leading-relaxed">{t('whyFeature2Desc')}</p>
            </div>

            <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{t('whyFeature3Title')}</h3>
              <p className="text-xs text-forest-200 leading-relaxed">{t('whyFeature3Desc')}</p>
            </div>

            <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{t('whyFeature4Title')}</h3>
              <p className="text-xs text-forest-200 leading-relaxed">{t('whyFeature4Desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION (Clean Luxury Dark Gradient without squished banner) */}
      <section className="relative py-24 sm:py-28 text-center px-4 overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 border-t border-gold-500/20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
              Start Your Exploration
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-sm sm:text-base text-forest-200 max-w-xl mx-auto font-light leading-relaxed">
            {t('finalCtaSubtitle')}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (!user) {
                  router.push('/login?redirect=/plan');
                } else {
                  router.push('/plan');
                }
              }}
              className="gold-btn px-10 py-4 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-2xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-forest-950" />
              <span>{t('finalCtaButton')}</span>
            </button>
            <Link
              href="/destinations"
              className="px-8 py-4 rounded-full text-sm font-semibold tracking-wider text-gold-300 bg-forest-900/90 hover:bg-forest-800 border border-gold-500/40 transition-all inline-flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>{t('navDestinations')}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

