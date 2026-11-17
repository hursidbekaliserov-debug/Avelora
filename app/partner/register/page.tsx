'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LOCAL_BUSINESSES } from '@/lib/businesses-data';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function PartnerRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('hotel');
  const [city, setCity] = useState('Samarkand');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          Empowering Local Tourism
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Join the AVELORA Silk Road Partner Network
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 leading-relaxed font-light">
          Connect your heritage boutique guesthouse, artisan ceramics workshop, or transport fleet with discerning international travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Registration Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-white">
                Application Submitted for Verification
              </h3>
              <p className="text-xs text-forest-200 max-w-md mx-auto leading-relaxed">
                Thank you for applying to become an AVELORA verified partner. Our local curation committee in Tashkent will contact {phone || email} within 48 hours to complete verification.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    Business / Studio Name
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Bukhara Suzani Atelier"
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  >
                    <option value="hotel">Boutique Hotel / Heritage Stay</option>
                    <option value="guesthouse">Family Guesthouse</option>
                    <option value="restaurant">Traditional Restaurant / Chaykhana</option>
                    <option value="artisan">Artisan Studio & Masterclasses</option>
                    <option value="guide">Licensed Cultural Guide</option>
                    <option value="transport">Private Transport / Chauffeur Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    City / Region
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  >
                    <option value="Samarkand">Samarkand</option>
                    <option value="Bukhara">Bukhara</option>
                    <option value="Khiva">Khiva</option>
                    <option value="Tashkent">Tashkent</option>
                    <option value="Fergana">Fergana / Rishtan</option>
                    <option value="Chimgan">Chimgan / Bostanlyk</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    Contact Person / Owner
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Master Rahmon"
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    Telephone (WhatsApp / Telegram)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gold-300 block mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@atelier.uz"
                    className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">
                  Business Description & Authentic Experience
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what makes your service authentic (e.g. 5th generation ceramic master, courtyard from 1890, traditional wood carving)..."
                  className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-forest-900/60 border border-gold-500/20 text-[11px] text-forest-300">
                Notice: All partner submissions undergo strict administrative review before being surfaced in AI itinerary recommendations.
              </div>

              <button
                type="submit"
                className="gold-btn w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4 text-forest-950" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Existing Directory Sample (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-gold-500" />
              <span>Current Verified Partners (Directory)</span>
            </h3>
            <span className="text-[10px] text-forest-300">Sample Records</span>
          </div>

          <div className="space-y-3">
            {LOCAL_BUSINESSES.slice(0, 4).map((biz) => (
              <div
                key={biz.id}
                className="p-4 rounded-2xl bg-forest-900 border border-gold-500/20 flex gap-4 items-center"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gold-500/20">
                  <img
                    src={biz.image}
                    alt={biz.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gold-400 uppercase font-bold tracking-wider">
                      {biz.category} • {biz.city}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {biz.verifiedStatus}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white mt-0.5 line-clamp-1">{biz.name}</h4>
                  <p className="text-[11px] text-forest-300 line-clamp-1">{biz.description}</p>
                  <span className="text-[10px] text-gold-300 font-semibold block mt-1">{biz.pricingNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

