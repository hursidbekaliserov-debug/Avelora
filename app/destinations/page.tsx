'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DESTINATIONS } from '@/lib/destinations-data';
import { useLanguage } from '@/lib/LanguageContext';
import { Star, ArrowRight, Compass, MapPin } from 'lucide-react';

export default function DestinationsIndexPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          Silk Road Atlas
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          All Destinations
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 mt-2">
          Immerse yourself in centuries of civilization, UNESCO architectural monuments, and breathtaking alpine passes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            className="group rounded-3xl overflow-hidden bg-forest-900 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 shadow-xl flex flex-col"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 text-[10px] font-semibold text-gold-300 uppercase tracking-wider">
                {dest.region}
              </div>
              <div className="absolute top-4 right-4 bg-forest-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold-500/30 text-[11px] font-bold text-gold-300 flex items-center gap-1">
                <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                <span>{dest.rating}</span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-forest-200 mt-2 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dest.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-forest-800 text-gold-200/90 border border-gold-500/15"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-800 flex items-center justify-between">
                <span className="text-[11px] text-forest-300 font-medium">
                  Ideal: {dest.idealDays}
                </span>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="text-xs font-bold text-gold-400 hover:text-gold-200 flex items-center gap-1"
                >
                  <span>Discover</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

