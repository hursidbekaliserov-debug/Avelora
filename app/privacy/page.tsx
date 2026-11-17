import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
      <div className="glass-panel p-8 rounded-3xl border border-gold-500/20 space-y-4 text-xs sm:text-sm text-forest-200 leading-relaxed">
        <p>
          AVELORA is committed to safeguarding the privacy and digital security of international travelers.
        </p>
        <h3 className="font-serif text-lg font-bold text-white pt-2">Data Protection</h3>
        <p>
          We do not sell personal travel inquiries or payment coordinates. All generative prompts processed via Google Gemini are transmitted securely through server-side authenticated relays.
        </p>
        <h3 className="font-serif text-lg font-bold text-white pt-2">Geospatial Privacy</h3>
        <p>
          Geographic searches and destination markers are displayed without storing continuous user geolocation data.
        </p>
      </div>
    </div>
  );
}

