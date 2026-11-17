'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          Concierge Relations
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Contact AVELORA
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 mt-2">
          Reach our international travel intelligence team, media inquiries, or hackathon delegation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Info */}
        <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/20 space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">
            Headquarters
          </h3>

          <div className="space-y-4 text-xs text-forest-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Address</strong>
                <span>Sharaf Rashidov Avenue 16, Tashkent, Uzbekistan</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Email Inquiries</strong>
                <span>concierge@avelora.travel</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">VIP Concierge Line</strong>
                <span>+998 71 200 44 88</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-forest-900 border border-gold-500/20 text-[11px] text-forest-300">
            For hotel, tour operator, or artisan registration, please visit our <a href="/partner/register" className="text-gold-300 font-semibold underline">Partner Portal</a>.
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-white">Message Dispatched</h3>
              <p className="text-xs text-forest-200">
                Thank you, {name}. Our concierge team will review your inquiry and reply within 12 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@voyageur.com"
                  className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">Message / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your upcoming travel plans or partnership proposal..."
                  className="w-full bg-forest-900 text-white p-3.5 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className="gold-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <Send className="w-3.5 h-3.5 text-forest-950" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

