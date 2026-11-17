'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { SAMPLE_HACKATHON_TRIP } from '@/lib/sample-trip';
import { exportItineraryToPdf } from '@/lib/exportPdf';
import TravelMap from '@/components/Map/TravelMap';
import BudgetCalculator from '@/components/Planner/BudgetCalculator';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Download, 
  ChevronLeft, 
  Train, 
  Utensils, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';

export default function SavedJourneyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { savedTrips } = useAuth();
  const { formatMoney, t } = useLanguage();

  const id = params?.id as string;
  const trip = savedTrips.find((t) => t.id === id) || (id === 'grand-silk-road-5day-demo' ? SAMPLE_HACKATHON_TRIP : null);

  const [activeDayIdx, setActiveDayIdx] = useState(0);

  if (!trip) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center px-4">
        <h2 className="font-serif text-2xl text-white font-bold">Journey Not Found</h2>
        <p className="text-xs text-forest-200 mt-2">The requested itinerary could not be located.</p>
        <div className="mt-6">
          <Link href="/my-journeys" className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase">
            Return to My Journeys
          </Link>
        </div>
      </div>
    );
  }

  const activeDay = trip.days[activeDayIdx] || trip.days[0];

  const mapMarkers = [activeDay.morning, activeDay.afternoon, activeDay.evening]
    .filter((a) => a.coordinates)
    .map((a) => ({
      id: a.id,
      name: a.name,
      category: a.category,
      coordinates: a.coordinates!,
      description: a.description,
      price: a.estimatedPriceUSD,
      dayNumber: activeDay.dayNumber,
    }));

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Bar */}
      <div className="mb-6">
        <Link
          href="/my-journeys"
          className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Saved Journeys</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {trip.isDemo && (
                <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-gold-400" />
                  Official Hackathon Demonstration Journey
                </span>
              )}
              <span className="text-xs text-forest-300">{trip.recommendedSeason}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {trip.title}
            </h1>
            <p className="text-xs sm:text-sm text-forest-200 max-w-2xl leading-relaxed">
              {trip.destinationSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-forest-300">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                {trip.totalDays} Days ({trip.travelerStyle})
              </span>
              <span className="flex items-center gap-1 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-gold-400" />
                Est. Total: <strong className="text-gold-300">{formatMoney(trip.totalEstimatedBudgetUSD)}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => exportItineraryToPdf(trip)}
            className="gold-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl self-start lg:self-center"
          >
            <Download className="w-4 h-4 text-forest-950" />
            <span>Export Official PDF</span>
          </button>
        </div>
      </div>

      {/* Grid: 7 cols Itinerary, 5 cols Map & Economics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 space-y-6">
          {/* Day selection tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {trip.days.map((d, idx) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeDayIdx === idx
                    ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 border-gold-400 shadow-lg font-bold'
                    : 'bg-forest-900 text-forest-200 border-gold-500/20 hover:border-gold-500/40'
                }`}
              >
                Day {d.dayNumber}
              </button>
            ))}
          </div>

          {/* Active Day Card */}
          <div className="p-6 rounded-3xl bg-forest-900/80 border border-gold-500/20 space-y-2">
            <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest">
              Day {activeDay.dayNumber} • {activeDay.theme}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {activeDay.title}
            </h3>

            <div className="mt-4 pt-3 border-t border-forest-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 text-forest-300">
                <Train className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-forest-100 block">Transport:</strong>
                  <span>{activeDay.transportTip}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-forest-300">
                <Utensils className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-forest-100 block">Culinary Tip:</strong>
                  <span>{activeDay.localDishRecommendation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="space-y-4">
            {[
              { slot: 'Morning', act: activeDay.morning },
              { slot: 'Afternoon', act: activeDay.afternoon },
              { slot: 'Evening', act: activeDay.evening },
            ].map(({ slot, act }) => (
              <div
                key={act.id}
                className="p-5 rounded-3xl bg-forest-900 border border-gold-500/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-800 border border-gold-500/30 text-[10px] font-bold text-gold-300 uppercase tracking-wider">
                    {slot} {act.time && `• ${act.time}`}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-white pt-1">
                  {act.name}
                </h4>
                <p className="text-xs text-forest-200 leading-relaxed">
                  {act.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-forest-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    {act.location}
                  </span>
                  <span className="text-gold-300 font-bold">
                    Est. {formatMoney(act.estimatedPriceUSD)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Packing Advice & Tips */}
          <div className="p-6 rounded-3xl bg-forest-900/60 border border-gold-500/20 space-y-3">
            <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Local Guidance & Preparation
            </h4>
            <ul className="space-y-2 text-xs text-forest-200">
              {trip.localTips?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Map & Budget */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>Day {activeDay.dayNumber} Route Map</span>
            </h3>
            <TravelMap
              markers={mapMarkers}
              center={mapMarkers[0]?.coordinates || { lat: 39.6542, lng: 66.9597 }}
              zoom={13}
              height="380px"
            />
          </div>

          <BudgetCalculator
            initialTotalUSD={trip.totalEstimatedBudgetUSD}
            totalDays={trip.totalDays}
            travelers={trip.travelersCount}
            userBudgetCapUSD={trip.totalEstimatedBudgetUSD + 200}
          />
        </div>

      </div>

    </div>
  );
}

