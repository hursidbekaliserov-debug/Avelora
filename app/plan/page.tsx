'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { Currency } from '@/lib/types';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Compass, 
  Activity, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import GoogleSignInModal from '@/components/Auth/GoogleSignInModal';

const INTEREST_OPTIONS = [
  { id: 'history', label: 'Historical Monuments', icon: '🏛️' },
  { id: 'culture', label: 'Silk Road Culture', icon: '✨' },
  { id: 'architecture', label: 'Timurid Architecture', icon: '🕌' },
  { id: 'food', label: 'Gastronomy & Plov', icon: '🍲' },
  { id: 'nature', label: 'Tian Shan Mountains', icon: '🏔️' },
  { id: 'artisan', label: 'Handmade Crafts & Ceramics', icon: '🎨' },
  { id: 'adventure', label: 'Desert & Mountain Treks', icon: '🧭' },
  { id: 'relaxation', label: 'Hammam & Teahouse Culture', icon: '🍵' },
  { id: 'photography', label: 'Golden Hour Photography', icon: '📷' },
];

function PlanPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, currency, setCurrency, t } = useLanguage();
  const { user, isLoading, saveTrip, signInWithGoogle } = useAuth();

  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  // Form State
  const [destination, setDestination] = useState(searchParams.get('dest') || 'Samarkand & Bukhara');
  const [openToRecommendations, setOpenToRecommendations] = useState(false);
  const [departureDate, setDepartureDate] = useState('2026-04-15');
  const [daysCount, setDaysCount] = useState(Number(searchParams.get('days')) || 5);
  const [travelersCount, setTravelersCount] = useState(Number(searchParams.get('travelers')) || 2);
  const [travelerStyle, setTravelerStyle] = useState<'solo' | 'couple' | 'family' | 'friends'>('couple');
  const [budgetLevel, setBudgetLevel] = useState<'budget' | 'comfort' | 'premium' | 'luxury'>('premium');
  const [customBudgetUSD, setCustomBudgetUSD] = useState(1400);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['history', 'culture', 'architecture', 'food']);
  const [travelPace, setTravelPace] = useState<'relaxed' | 'balanced' | 'adventure' | 'cultural' | 'luxury'>('balanced');

  const progressSteps = [
    t('genStep1'),
    t('genStep2'),
    t('genStep3'),
    t('genStep4'),
    t('genStep5'),
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationPhase(0);

    const interval = setInterval(() => {
      setGenerationPhase((prev) => {
        if (prev < progressSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 1100);

    try {
      const response = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: openToRecommendations ? 'Best of Uzbekistan (AI Recommended)' : destination,
          daysCount,
          travelersCount,
          travelerStyle,
          budgetLevel,
          customBudgetUSD,
          interests: selectedInterests,
          travelPace,
          language: lang,
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (data.success && data.itinerary) {
        saveTrip(data.itinerary);
        try {
          sessionStorage.setItem('avelora_active_itinerary', JSON.stringify(data.itinerary));
        } catch (e) {}
        router.push('/plan/results');
      } else {
        alert('Could not generate itinerary. Please try again.');
        setIsGenerating(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setIsGenerating(false);
    }
  };

  if (!user && !isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/40 max-w-lg w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 border border-gold-500/40 text-gold-400 mx-auto flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-gold-400" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gold-400 tracking-widest uppercase block">
              Shaxsiy AI Sayohat Konsyerji
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Sayohat Rejasini Tuzish Uchun Tizimga Kiring
            </h2>
            <p className="text-xs sm:text-sm text-forest-200 leading-relaxed font-light">
              Sun’iy intellekt orqali individual marshrut yaratish, byudjetni hisoblash va uni saqlab qo‘yish uchun iltimos ro‘yxatdan o‘ting yoki Google orqali kiring.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setGoogleModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google orqali davom etish</span>
            </button>

            <Link
              href="/login?redirect=/plan"
              className="gold-btn w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl block text-center"
            >
              <span>Elektron Pochta Orqali Kirish</span>
              <ArrowRight className="w-4 h-4 text-forest-950 inline" />
            </Link>

            <Link
              href="/register?redirect=/plan"
              className="w-full py-3 rounded-2xl bg-forest-900 hover:bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold block text-center transition-colors"
            >
              Yangi Hisob Ochish (Ro‘yxatdan O‘tish)
            </Link>
          </div>

          <GoogleSignInModal
            isOpen={googleModalOpen}
            onClose={() => setGoogleModalOpen(false)}
            onConfirm={async (confirmedName, confirmedEmail) => {
              await signInWithGoogle(confirmedName, confirmedEmail);
              setGoogleModalOpen(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          AVELORA Concierge Architect
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          {t('plannerTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 mt-2 max-w-xl mx-auto">
          {t('plannerSubtitle')}
        </p>

        {/* Progress Tracker Dots */}
        {!isGenerating && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  num === step
                    ? 'w-10 bg-gold-400'
                    : num < step
                    ? 'w-5 bg-gold-600'
                    : 'w-5 bg-forest-800'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* GENERATION LOADING OVERLAY */}
      {isGenerating ? (
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-gold-500/40 text-center shadow-2xl space-y-8 animate-fade-in">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gold-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gold-400 animate-pulse" />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Synthesizing Your Journey
            </h3>
            <p className="text-sm text-gold-300 font-medium">
              {progressSteps[generationPhase]}
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-2 text-left bg-forest-900/70 p-5 rounded-2xl border border-gold-500/20 text-xs">
            {progressSteps.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2.5 transition-all ${
                  idx <= generationPhase ? 'text-gold-200 font-semibold' : 'text-forest-400 opacity-40'
                }`}
              >
                {idx < generationPhase ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : idx === generationPhase ? (
                  <div className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-forest-600 shrink-0" />
                )}
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* WIZARD CONTAINER */
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl">
          
          {/* STEP 1: DESTINATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>Step 1 of 6 • Destination</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                Where would you like to travel?
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-2">
                    Country & Regions
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    disabled={openToRecommendations}
                    className="w-full bg-forest-900 text-white p-4 rounded-2xl border border-gold-500/30 focus:outline-none focus:border-gold-400 text-sm font-medium"
                  >
                    <option value="Samarkand">Samarkand (Crossroads of Cultures)</option>
                    <option value="Bukhara">Bukhara (Living Silk Road Museum)</option>
                    <option value="Khiva">Khiva (Walled Desert Citadel)</option>
                    <option value="Tashkent">Tashkent (Dynamic Metropolitan Heart)</option>
                    <option value="Amirsoy">Amirsoy (Premier Mountain Resort)</option>
                    <option value="Shahrisabz">Shahrisabz (Birthplace of Amir Timur)</option>
                    <option value="Fergana">Fergana (Cradle of Silk & Craft Masters)</option>
                    <option value="Zaamin">Zaamin (Alpine Switzerland National Park)</option>
                    <option value="Termez">Termez (Ancient Greco-Bactrian & Buddhist Heartland)</option>
                    <option value="Samarkand & Bukhara">Samarkand & Bukhara (The Classic Silk Road)</option>
                    <option value="Grand Trans-Uzbekistan (Tashkent, Samarkand, Bukhara, Khiva)">Grand Trans-Uzbekistan (All 4 UNESCO Capitals)</option>
                  </select>
                </div>

                {/* Open to recommendations toggle */}
                <div
                  onClick={() => setOpenToRecommendations(!openToRecommendations)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    openToRecommendations
                      ? 'bg-forest-800/80 border-gold-400 shadow-md'
                      : 'bg-forest-900/50 border-gold-500/20 hover:border-gold-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gold-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Let AI Recommend the Best Destinations</div>
                      <div className="text-[11px] text-forest-300">AVELORA will pick the ideal itinerary based on your interests and travel season.</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${openToRecommendations ? 'bg-gold-500 border-gold-500 text-forest-950 font-bold' : 'border-forest-600'}`}>
                    {openToRecommendations && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATES & DURATION */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-gold-500" />
                <span>Step 2 of 6 • Travel Duration</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                When and how long will you explore?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-2">
                    Estimated Departure Date
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-forest-900 text-white p-4 rounded-2xl border border-gold-500/30 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-2">
                    Total Duration (Days)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 5, 7, 10].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDaysCount(d)}
                        className={`py-3.5 rounded-2xl text-xs font-bold border transition-all ${
                          daysCount === d
                            ? 'bg-gold-500 text-forest-950 border-gold-500 shadow-lg'
                            : 'bg-forest-900 text-forest-200 border-gold-500/20 hover:border-gold-500/40'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRAVELERS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4 text-gold-500" />
                <span>Step 3 of 6 • Travel Party</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                Who is joining this journey?
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: 'solo', label: 'Solo Explorer', count: 1, desc: 'Independent discovery' },
                  { id: 'couple', label: 'Couple / Duo', count: 2, desc: 'Romantic & cultural' },
                  { id: 'family', label: 'Family', count: 4, desc: 'All ages & comfort' },
                  { id: 'friends', label: 'Friends Group', count: 4, desc: 'Dynamic & social' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setTravelerStyle(item.id as any);
                      setTravelersCount(item.count);
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      travelerStyle === item.id
                        ? 'bg-forest-800 border-gold-400 shadow-xl'
                        : 'bg-forest-900 border-gold-500/20 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                    <div className="text-[11px] text-forest-300">{item.desc}</div>
                    <div className="mt-3 text-xs font-semibold text-gold-400">{item.count} Travelers</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET & CUSTOM BUDGET INPUT */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-gold-500" />
                <span>Step 4 of 6 • Travel Budget & Financial Scope</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                Set Your Travel Budget
              </h2>
              <p className="text-xs text-forest-200">
                Choose a general travel style or specify your exact budget. If you choose a budget-friendly plan, AI will prioritize famous affordable eateries (Chorsu somsa, local plov centers at $2-$4) and authentic guesthouses.
              </p>

              {/* Direct Custom Budget Input Box */}
              <div className="p-5 rounded-2xl bg-forest-900/90 border-2 border-gold-400/50 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gold-400" />
                    Enter Your Exact Total Budget (USD)
                  </label>
                  <span className="text-[11px] text-forest-300 font-medium">
                    Calculated for {travelersCount} travelers • {daysCount} days
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 font-serif font-bold text-xl">$</div>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={customBudgetUSD}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setCustomBudgetUSD(val);
                      // Automatically adjust tier label based on custom input
                      const perDayPerson = val / (daysCount * travelersCount);
                      if (perDayPerson <= 80) setBudgetLevel('budget');
                      else if (perDayPerson <= 180) setBudgetLevel('comfort');
                      else if (perDayPerson <= 350) setBudgetLevel('premium');
                      else setBudgetLevel('luxury');
                    }}
                    placeholder="e.g. 800"
                    className="w-full bg-forest-950 text-white font-serif text-2xl font-bold pl-10 pr-24 py-3.5 rounded-xl border border-gold-500/40 focus:outline-none focus:border-gold-400"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-300 bg-forest-900 px-2.5 py-1 rounded-lg border border-gold-500/20">
                    USD
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-forest-200">
                  <span>
                    Daily rate: <strong className="text-gold-300 font-sans">${Math.round(customBudgetUSD / daysCount)} / day</strong> for the party
                  </span>
                  <span>
                    Per traveler: <strong className="text-gold-300 font-sans">${Math.round(customBudgetUSD / (daysCount * Math.max(1, travelersCount)))} / person / day</strong>
                  </span>
                </div>
              </div>

              {/* Preset Travel Comfort Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { 
                    id: 'budget', 
                    label: 'Smart Budget (Arzon / Hamyonbop)', 
                    est: '~$60 - $80 / day', 
                    desc: 'Family guesthouses, local plov centers ($2-$4), street tandir somsa, scenic self-guided walks.',
                    suggestedTotal: 400 * Math.max(1, travelersCount * 0.7)
                  },
                  { 
                    id: 'comfort', 
                    label: 'Comfort & Heritage', 
                    est: '~$140 - $180 / day', 
                    desc: 'Boutique hotels, Afrosiyob express trains, national teahouses, certified museum guides.',
                    suggestedTotal: 850 * Math.max(1, travelersCount * 0.7)
                  },
                  { 
                    id: 'premium', 
                    label: 'Premium Silk Road', 
                    est: '~$250 - $320 / day', 
                    desc: '4-star heritage suites, private chauffeured transport, fine dining, pottery masterclasses.',
                    suggestedTotal: 1500 * Math.max(1, travelersCount * 0.7)
                  },
                  { 
                    id: 'luxury', 
                    label: 'Imperial Luxury', 
                    est: '~$450+ / day', 
                    desc: '5-star palace hotels, private VIP transfers, exclusive rooftop dinners, VIP concierge.',
                    suggestedTotal: 2500 * Math.max(1, travelersCount * 0.7)
                  },
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setBudgetLevel(tier.id as any);
                      setCustomBudgetUSD(Math.round(tier.suggestedTotal));
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      budgetLevel === tier.id
                        ? 'bg-forest-800 border-gold-400 shadow-xl ring-1 ring-gold-400'
                        : 'bg-forest-900 border-gold-500/20 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-white">{tier.label}</span>
                      <span className="text-xs font-semibold text-gold-300">{tier.est}</span>
                    </div>
                    <p className="text-[11px] text-forest-300 leading-relaxed">{tier.desc}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-forest-400">Click to apply baseline:</span>
                      <span className="font-bold text-gold-400 font-sans">${Math.round(tier.suggestedTotal)} total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: INTERESTS */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-gold-500" />
                <span>Step 5 of 6 • Passions & Curiosities</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                What excites you most?
              </h2>
              <p className="text-xs text-forest-300">Choose multiple interests to guide AI itinerary balancing.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTEREST_OPTIONS.map((item) => {
                  const isChecked = selectedInterests.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-forest-800 border-gold-400 text-white font-semibold shadow-md'
                          : 'bg-forest-900 border-gold-500/20 text-forest-200 hover:border-gold-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${isChecked ? 'bg-gold-500 border-gold-500 text-forest-950 font-bold' : 'border-forest-600'}`}>
                        {isChecked && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: PACE & STYLE */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4 text-gold-500" />
                <span>Step 6 of 6 • Travel Cadence</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                How do you prefer to experience days?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'relaxed', label: 'Relaxed & Unhurried', desc: 'Late mornings, leisurely teahouse pauses, max 2 spots/day.' },
                  { id: 'balanced', label: 'Curated Balance', desc: 'Morning monuments, scenic midday lunch, twilight strolls.' },
                  { id: 'adventure', label: 'High Exploration', desc: 'Full-day discoveries, active walks, hidden artisan alleys.' },
                ].map((pace) => (
                  <div
                    key={pace.id}
                    onClick={() => setTravelPace(pace.id as any)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      travelPace === pace.id
                        ? 'bg-forest-800 border-gold-400 shadow-xl'
                        : 'bg-forest-900 border-gold-500/20 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1">{pace.label}</div>
                    <div className="text-[11px] text-forest-300">{pace.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="mt-10 pt-6 border-t border-forest-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 rounded-full border border-gold-500/30 text-gold-300 hover:text-white hover:bg-forest-800 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('prevStep')}</span>
              </button>
            ) : <div />}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="gold-btn px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <span>{t('nextStep')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-forest-950" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl group"
              >
                <Sparkles className="w-4 h-4 text-forest-950 group-hover:rotate-12 transition-transform" />
                <span>{t('generateButton')}</span>
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default function PlanPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen pt-36 pb-20 text-center text-gold-400">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-forest-200">Loading AVELORA Concierge Interface...</p>
        </div>
      }
    >
      <PlanPageInner />
    </React.Suspense>
  );
}
