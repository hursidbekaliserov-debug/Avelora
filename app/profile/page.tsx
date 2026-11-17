'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Language, Currency } from '@/lib/types';
import { User, Mail, Globe, DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { lang, setLang, currency, setCurrency } = useLanguage();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName || 'Eleanor Vance');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl space-y-8">
        
        <div className="flex items-center gap-4 pb-6 border-b border-forest-800">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-gold-400"
          />
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">{user?.fullName || 'Traveler'}</h1>
            <p className="text-xs text-forest-300">{user?.email}</p>
            <span className="mt-1 inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
              Role: {user?.role || 'Tourist'}
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile and localization preferences successfully updated.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-forest-900 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || 'eleanor.vance@traveler.com'}
                className="w-full bg-forest-900 text-forest-400 p-3 rounded-xl border border-forest-800 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">Preferred Language</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="w-full bg-forest-900 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              >
                <option value="en">English (Default)</option>
                <option value="ru">Русский (Russian)</option>
                <option value="uz">O‘zbekcha (Uzbek)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">Preferred Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full bg-forest-900 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="UZS">UZS (so‘m)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="gold-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Save Profile Settings
          </button>
        </form>

      </div>
    </div>
  );
}

