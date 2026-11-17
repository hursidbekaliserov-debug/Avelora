'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { DESTINATIONS } from '@/lib/destinations-data';
import { Bookmark, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function SavedPage() {
  const { user, toggleFavoriteDestination } = useAuth();
  const savedIds = user?.savedDestinations || [];

  const savedDestinations = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gold-500/20 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Bookmark className="w-4 h-4 text-gold-500" />
            <span>Wishlist & Favorites</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Saved Destinations
          </h1>
          <p className="text-xs sm:text-sm text-forest-200 mt-1">
            Hand-picked Silk Road gems you intend to explore.
          </p>
        </div>

        <Link
          href="/explore"
          className="px-5 py-2.5 rounded-full bg-forest-900 border border-gold-500/30 text-gold-300 hover:text-white text-xs font-semibold"
        >
          Explore More Places
        </Link>
      </div>

      {savedDestinations.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-gold-400 mx-auto opacity-70" />
          <h3 className="font-serif text-2xl text-white font-bold">No saved places yet</h3>
          <p className="text-xs text-forest-200">
            Browse our curated destinations and click the bookmark icon to save your favorites.
          </p>
          <div className="pt-2">
            <Link href="/explore" className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase">
              Browse Destinations
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-3xl overflow-hidden bg-forest-900 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <button
                  onClick={() => toggleFavoriteDestination(dest.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-forest-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400"
                  title="Remove from saved"
                >
                  <Bookmark className="w-4 h-4 fill-gold-400" />
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-forest-200 line-clamp-2 mt-2">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-forest-800 flex items-center justify-between">
                  <Link
                    href={`/plan?dest=${encodeURIComponent(dest.name)}`}
                    className="gold-btn px-4 py-2 rounded-full text-[11px] font-bold uppercase flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plan Trip Here</span>
                  </Link>

                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="text-xs font-bold text-gold-400 hover:text-white flex items-center gap-1"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

