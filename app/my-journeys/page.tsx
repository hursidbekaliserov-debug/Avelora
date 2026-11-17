'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { exportItineraryToPdf } from '@/lib/exportPdf';
import { 
  Luggage, 
  Calendar, 
  MapPin, 
  Download, 
  Copy, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function MyJourneysPage() {
  const { savedTrips, removeTrip, duplicateTrip } = useAuth();
  const { formatMoney, t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gold-500/20 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Luggage className="w-4 h-4 text-gold-500" />
            <span>Personal Travel Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            My Saved Journeys
          </h1>
          <p className="text-xs sm:text-sm text-forest-200 mt-1">
            Review, refine, duplicate, and export your tailored Silk Road itineraries.
          </p>
        </div>

        <Link
          href="/plan"
          className="gold-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-forest-950" />
          <span>Plan New Journey</span>
        </Link>
      </div>

      {/* Trips Grid */}
      {savedTrips.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
          <Luggage className="w-12 h-12 text-gold-400 mx-auto opacity-70" />
          <h3 className="font-serif text-2xl text-white font-bold">No saved journeys yet</h3>
          <p className="text-xs text-forest-200">
            Let our AI travel architect create a bespoke itinerary for your upcoming journey.
          </p>
          <div className="pt-2">
            <Link href="/plan" className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase">
              Start Planning
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {trip.id === 'grand-silk-road-5day-demo' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3 text-gold-400" />
                      Hackathon Demo
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-800 text-forest-200 text-[10px] font-semibold uppercase tracking-wider">
                      {trip.totalDays} Days • {trip.travelerStyle}
                    </span>
                  )}
                  <span className="text-xs text-gold-400 font-bold">
                    {formatMoney(trip.totalEstimatedBudgetUSD)}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white line-clamp-2">
                  {trip.title}
                </h3>
                <p className="text-xs text-forest-200 line-clamp-3 leading-relaxed">
                  {trip.destinationSummary}
                </p>

                <div className="pt-2 flex items-center gap-3 text-[11px] text-forest-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" />
                    {trip.totalDays} Days
                  </span>
                  <span>•</span>
                  <span>{trip.days.length} Itinerary Days</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-forest-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => exportItineraryToPdf(trip)}
                    className="p-2 rounded-xl text-forest-300 hover:text-gold-300 hover:bg-forest-800 transition-colors"
                    title="Export PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => duplicateTrip(trip.id)}
                    className="p-2 rounded-xl text-forest-300 hover:text-gold-300 hover:bg-forest-800 transition-colors"
                    title="Duplicate Trip"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {trip.id !== 'grand-silk-road-5day-demo' && (
                    <button
                      onClick={() => removeTrip(trip.id)}
                      className="p-2 rounded-xl text-forest-300 hover:text-red-400 hover:bg-forest-800 transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <Link
                  href={`/my-journeys/${trip.id}`}
                  className="text-xs font-bold text-gold-400 hover:text-gold-200 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
