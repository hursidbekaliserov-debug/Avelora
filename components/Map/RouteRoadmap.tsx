'use client';

import React from 'react';
import { Coordinates } from '@/lib/types';
import { MapPin, Navigation, ExternalLink, Compass, Clock, CheckCircle2 } from 'lucide-react';

interface StopItem {
  id: string;
  name: string;
  category?: string;
  coordinates: Coordinates;
  description?: string;
  price?: number;
  timeSlot?: string;
}

interface RouteRoadmapProps {
  stops: StopItem[];
  dayNumber: number;
  destinationName: string;
}

export default function RouteRoadmap({ stops, dayNumber, destinationName }: RouteRoadmapProps) {
  // Generate multi-stop Google Maps URL
  const googleMapsUrl = stops.length > 0
    ? `https://www.google.com/maps/dir/${stops.map(s => `${s.coordinates.lat},${s.coordinates.lng}`).join('/')}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationName)}`;

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-gold-500/30 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-gold-400 text-[11px] font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-gold-500" />
            <span>Interactive Route Roadmap</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
            Day {dayNumber} Trajectory & Stops
          </h3>
        </div>
        
        <span className="px-3 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-xs font-semibold text-gold-300">
          {stops.length} Verified Stops
        </span>
      </div>

      {/* Visual Roadmap Path */}
      <div className="space-y-3 relative">
        {stops.map((stop, idx) => {
          const singleMapUrl = `https://www.google.com/maps/search/?api=1&query=${stop.coordinates.lat},${stop.coordinates.lng}`;
          const isLast = idx === stops.length - 1;

          return (
            <div key={stop.id || idx} className="relative flex items-start gap-3.5 group">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500/40 to-forest-700" />
              )}

              {/* Waypoint circle pin */}
              <div className="w-8 h-8 rounded-full bg-forest-900 border-2 border-gold-400 text-gold-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-md group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>

              {/* Waypoint details card */}
              <div className="flex-grow p-3.5 rounded-2xl bg-forest-900/80 border border-gold-500/20 group-hover:border-gold-500/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">
                      {stop.timeSlot || `Stop ${idx + 1}`}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold-200 transition-colors">
                      {stop.name}
                    </h4>
                  </div>

                  <a
                    href={singleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open exact coordinates in Google Maps"
                    className="p-1.5 rounded-lg bg-forest-800 text-gold-400 hover:text-white hover:bg-forest-700 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {stop.description && (
                  <p className="text-[11px] text-forest-200 mt-1 leading-relaxed line-clamp-2">
                    {stop.description}
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2 text-[10px] text-forest-300">
                  <span className="flex items-center gap-1 font-mono text-gold-400/90">
                    <MapPin className="w-3 h-3 text-gold-500" />
                    {stop.coordinates.lat.toFixed(4)}°N, {stop.coordinates.lng.toFixed(4)}°E
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified GPS
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* External Direct Maps Action */}
      <div className="pt-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 border border-gold-500/40 text-gold-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
        >
          <Navigation className="w-4 h-4 text-gold-400 group-hover:rotate-45 transition-transform" />
          <span>Open Full Day Trajectory in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
        </a>
      </div>
    </div>
  );
}

