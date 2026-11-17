'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DESTINATIONS } from '@/lib/destinations-data';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import TravelMap from '@/components/Map/TravelMap';
import { 
  Compass, 
  Search, 
  MapPin, 
  Star, 
  Sparkles, 
  Bookmark, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Experiences' },
  { id: 'historical', label: 'Historical Monuments' },
  { id: 'cultural', label: 'Silk Road Culture' },
  { id: 'nature', label: 'Mountains & Alpine' },
  { id: 'food', label: 'Gastronomy & Bazaars' },
  { id: 'gems', label: 'Hidden Gems' },
];

export default function ExplorePage() {
  const { t } = useLanguage();
  const { toggleFavoriteDestination, isDestinationSaved } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [showMapView, setShowMapView] = useState(false);

  const filtered = DESTINATIONS.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));

    if (selectedCat === 'all') return matchesSearch;
    if (selectedCat === 'nature') return matchesSearch && (d.id === 'chimgan');
    if (selectedCat === 'historical') return matchesSearch && (d.id === 'samarkand' || d.id === 'bukhara' || d.id === 'khiva' || d.id === 'shahrisabz');
    if (selectedCat === 'cultural') return matchesSearch && (d.id === 'bukhara' || d.id === 'samarkand' || d.id === 'tashkent');
    return matchesSearch;
  });

  const mapMarkers = filtered.map((d) => ({
    id: d.id,
    name: d.name,
    category: d.tag,
    coordinates: d.coordinates,
    description: d.description,
  }));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-1 block">
          Curated Discovery
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Explore the Wonders of Uzbekistan
        </h1>
        <p className="text-xs sm:text-sm text-forest-200 mt-2">
          From the lapis lazuli domes of Samarkand to the pristine snowfields of the Tian Shan mountains.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cities, monuments, bazaars (e.g. Registan, Plov, Amirsoy)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-forest-900 text-white pl-11 pr-4 py-3.5 rounded-2xl border border-gold-500/30 text-xs sm:text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <button
            onClick={() => setShowMapView(!showMapView)}
            className={`px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all shrink-0 w-full sm:w-auto ${
              showMapView
                ? 'bg-gold-500 text-forest-950 border-gold-500 shadow-lg'
                : 'bg-forest-900 text-gold-300 border-gold-500/30 hover:border-gold-400'
            }`}
          >
            {showMapView ? 'View Cards' : 'Interactive Map'}
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCat === cat.id
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 font-bold shadow-md'
                  : 'bg-forest-900/80 text-forest-200 hover:text-white border border-gold-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map View Toggle */}
      {showMapView ? (
        <div className="mb-12">
          <TravelMap
            markers={mapMarkers}
            center={{ lat: 40.5, lng: 66.5 }}
            zoom={6}
            height="560px"
          />
        </div>
      ) : (
        /* Grid of Destination Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => {
            const isSaved = isDestinationSaved(dest.id);
            return (
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
                    {dest.tag}
                  </div>

                  <button
                    onClick={() => toggleFavoriteDestination(dest.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-forest-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 hover:text-white transition-colors"
                    title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-gold-400 text-gold-400' : ''}`} />
                  </button>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                        {dest.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gold-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-gold-400" />
                        <span>{dest.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-forest-200 line-clamp-3 leading-relaxed mt-2">
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
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

