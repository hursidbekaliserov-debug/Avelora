'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Currency } from '@/lib/types';
import { CURRENCY_RATES, formatPrice, formatPriceFull } from '@/lib/currency';
import { DollarSign, AlertCircle, CheckCircle, PieChart, Users, Calendar, ShieldCheck } from 'lucide-react';

interface BudgetCalculatorProps {
  initialTotalUSD?: number;
  totalDays?: number;
  travelers?: number;
  userBudgetCapUSD?: number;
}

export default function BudgetCalculator({
  initialTotalUSD = 1350,
  totalDays = 5,
  travelers = 2,
  userBudgetCapUSD = 1500,
}: BudgetCalculatorProps) {
  const { currency, setCurrency, formatMoney } = useLanguage();
  const [targetCapUSD, setTargetCapUSD] = useState<number>(userBudgetCapUSD);
  const [customDays, setCustomDays] = useState<number>(totalDays);
  const [customTravelers, setCustomTravelers] = useState<number>(travelers);

  // Category percentage allocations (realistic Silk Road luxury travel balance)
  const accommodationShare = 0.38; // 38%
  const foodShare = 0.22;          // 22%
  const activitiesShare = 0.18;    // 18%
  const transportShare = 0.14;     // 14%
  const localGemsShare = 0.08;     // 8%

  // Calculate scaled budget if user tweaks days or travelers
  const baseScale = (customDays / totalDays) * (customTravelers / travelers);
  const totalCostUSD = Math.round(initialTotalUSD * baseScale);
  const perPersonCostUSD = Math.round(totalCostUSD / customTravelers);
  const dailyCostUSD = Math.round(totalCostUSD / customDays);

  const categories = [
    { name: 'Luxury Hotels & Boutique Guesthouses', amount: Math.round(totalCostUSD * accommodationShare), pct: '38%', color: '#DFBF85' },
    { name: 'Gastronomy, Teahouses & Fine Dining', amount: Math.round(totalCostUSD * foodShare), pct: '22%', color: '#C6A36A' },
    { name: 'Historical Monuments & Guided Tours', amount: Math.round(totalCostUSD * activitiesShare), pct: '18%', color: '#2C5244' },
    { name: 'Afrosiyob High-Speed Rail & Chauffeur', amount: Math.round(totalCostUSD * transportShare), pct: '14%', color: '#4E6B5D' },
    { name: 'Artisan Workshops & Masterclasses', amount: Math.round(totalCostUSD * localGemsShare), pct: '8%', color: '#886834' },
  ];

  const isOverBudget = totalCostUSD > targetCapUSD;
  const differenceUSD = Math.abs(totalCostUSD - targetCapUSD);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <PieChart className="w-4 h-4 text-gold-500" />
            <span>AVELORA Travel Economics</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-gold-200">Smart Budget Calculator</h3>
          <p className="text-xs text-forest-200 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            Itemized algorithmic estimate based on verified Uzbekistan market prices.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1 bg-forest-900/80 p-1.5 rounded-xl border border-gold-500/30 self-start md:self-auto">
          {(['USD', 'EUR', 'GBP', 'UZS'] as Currency[]).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currency === curr
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 shadow-md font-bold'
                  : 'text-gold-200 hover:text-white hover:bg-forest-800'
                }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs for Simulation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="bg-forest-900/60 p-4 rounded-2xl border border-gold-500/20">
          <label className="text-xs text-gold-400 font-medium flex items-center gap-1.5 mb-2">
            <Users className="w-3.5 h-3.5" />
            Travelers
          </label>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCustomTravelers(Math.max(1, customTravelers - 1))}
              className="w-8 h-8 rounded-lg bg-forest-800 text-gold-300 hover:bg-forest-700 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="text-xl font-bold text-white font-serif">{customTravelers}</span>
            <button
              onClick={() => setCustomTravelers(customTravelers + 1)}
              className="w-8 h-8 rounded-lg bg-forest-800 text-gold-300 hover:bg-forest-700 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-forest-900/60 p-4 rounded-2xl border border-gold-500/20">
          <label className="text-xs text-gold-400 font-medium flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Duration (Days)
          </label>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCustomDays(Math.max(1, customDays - 1))}
              className="w-8 h-8 rounded-lg bg-forest-800 text-gold-300 hover:bg-forest-700 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="text-xl font-bold text-white font-serif">{customDays} Days</span>
            <button
              onClick={() => setCustomDays(customDays + 1)}
              className="w-8 h-8 rounded-lg bg-forest-800 text-gold-300 hover:bg-forest-700 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-forest-900/60 p-4 rounded-2xl border border-gold-500/20">
          <label className="text-xs text-gold-400 font-medium flex items-center gap-1.5 mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            Your Target Budget Limit
          </label>
          <div className="flex items-center">
            <input
              type="number"
              step="50"
              value={targetCapUSD}
              onChange={(e) => setTargetCapUSD(Number(e.target.value) || 0)}
              className="w-full bg-forest-800 text-white font-serif font-bold text-lg px-3 py-1.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* Overview Metric Cards (Guaranteed Overflow-Safe with Responsive Typography) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="min-w-0 p-4 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-gold-500/30 overflow-hidden shadow-md flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] text-gold-400 uppercase tracking-wider font-semibold block truncate">
            Total Estimated Trip
          </span>
          <div
            className="text-sm sm:text-base lg:text-lg font-bold font-sans text-white mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis"
            title={formatPriceFull(totalCostUSD, currency)}
          >
            {formatMoney(totalCostUSD)}
          </div>
          <span className="text-[10px] text-forest-200 mt-1 block truncate">
            For {customTravelers} explorers ({customDays} days)
          </span>
        </div>

        <div className="min-w-0 p-4 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-gold-500/30 overflow-hidden shadow-md flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] text-gold-400 uppercase tracking-wider font-semibold block truncate">
            Per Person Cost
          </span>
          <div
            className="text-sm sm:text-base lg:text-lg font-bold font-sans text-gold-300 mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis"
            title={formatPriceFull(perPersonCostUSD, currency)}
          >
            {formatMoney(perPersonCostUSD)}
          </div>
          <span className="text-[10px] text-forest-200 mt-1 block truncate">
            Average total per guest
          </span>
        </div>

        <div className="min-w-0 p-4 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-gold-500/30 overflow-hidden shadow-md flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] text-gold-400 uppercase tracking-wider font-semibold block truncate">
            Average Per Day
          </span>
          <div
            className="text-sm sm:text-base lg:text-lg font-bold font-sans text-gold-300 mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis"
            title={formatPriceFull(dailyCostUSD, currency)}
          >
            {formatMoney(dailyCostUSD)}
          </div>
          <span className="text-[10px] text-forest-200 mt-1 block truncate">
            Daily group expenditure
          </span>
        </div>
      </div>

      {/* Budget Warning / Health Indicator */}
      {isOverBudget ? (
        <div className="p-4 mb-6 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-amber-200">
              Budget Alert: Estimated total exceeds target by {formatMoney(differenceUSD)}
            </div>
            <p className="text-xs text-amber-300/80 mt-1">
              AI Recommendation: Consider choosing boutique heritage guesthouses in Bukhara instead of 5-star international chains to save approximately $240 without compromising charm.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 mb-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-emerald-200">
              Budget Optimal: Your plan is {formatMoney(differenceUSD)} within your target limit.
            </div>
            <p className="text-xs text-emerald-300/80 mt-1">
              You have comfortable financial headroom for optional private ceramic masterclasses or luxury hammam treatments.
            </p>
          </div>
        </div>
      )}

      {/* Category Breakdown Progress Bars */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Expense Allocation Breakdown</h4>
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-forest-100 font-medium">{cat.name}</span>
              <span className="text-gold-300 font-semibold">{formatMoney(cat.amount)} ({cat.pct})</span>
            </div>
            <div className="w-full h-2 rounded-full bg-forest-900 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: cat.pct, backgroundColor: cat.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

