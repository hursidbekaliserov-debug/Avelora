'use client';

import React, { useState } from 'react';
import { Coordinates } from '@/lib/types';
import { MapPin, Navigation, ExternalLink, Sparkles, Compass } from 'lucide-react';

interface MarkerItem {
  id: string;
  name: string;
  category?: string;
  coordinates: Coordinates;
  description?: string;
  price?: number;
  dayNumber?: number;
}

interface TravelMapProps {
  markers: MarkerItem[];
  center?: Coordinates;
  zoom?: number;
  showPolyline?: boolean;
  height?: string;
}

export default function TravelMap({ markers, height = '480px' }: TravelMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerItem | null>(markers[0] || null);

  // Map geographic coords (Uzbekistan: Lng 56 to 73, Lat 37 to 45.5) to SVG coordinate box (800 x 500)
  const minLng = 56.0;
  const maxLng = 73.0;
  const minLat = 37.0;
  const maxLat = 45.5;

  const toSvgX = (lng: number) => {
    return ((lng - minLng) / (maxLng - minLng)) * 740 + 30;
  };

  const toSvgY = (lat: number) => {
    return (1 - (lat - minLat) / (maxLat - minLat)) * 440 + 30;
  };

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 border border-gold-500/30 shadow-2xl flex flex-col justify-between"
      style={{ minHeight: height }}
    >
      {/* Top Map Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/80 border border-gold-500/30 backdrop-blur-md shadow-md text-xs font-semibold text-gold-300">
          <Compass className="w-3.5 h-3.5 text-gold-400" />
          <span>Interactive Silk Road Cartography</span>
        </div>

        <div className="pointer-events-auto text-[11px] font-mono text-gold-400/90 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-500/20 backdrop-blur-md">
          {markers.length} Verified Destinations
        </div>
      </div>

      {/* Main SVG Map Canvas */}
      <div className="relative w-full h-full flex-grow flex items-center justify-center p-4 pt-14">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full max-h-[500px] select-none"
        >
          {/* Stylized Uzbekistan Outline / Ambient Contours */}
          <defs>
            <linearGradient id="mapGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6A36A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#203D32" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DFBF85" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C6A36A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Abstract Geographical Landmass of Uzbekistan */}
          <path
            d="M 50,150 Q 150,90 280,120 T 450,170 T 600,160 T 720,240 T 750,330 T 680,390 T 560,430 T 420,380 T 260,340 T 130,300 Z"
            fill="url(#mapGlow)"
            stroke="#C6A36A"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="opacity-40"
          />

          {/* Major Silk Road Caravan Route Paths */}
          <path
            d="M 120,210 Q 250,280 430,320 T 540,310 T 670,220"
            fill="none"
            stroke="#C6A36A"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="opacity-50 animate-pulse"
          />

          {/* Destination Markers */}
          {markers.map((marker, index) => {
            const x = toSvgX(marker.coordinates.lng);
            const y = toSvgY(marker.coordinates.lat);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <g
                key={marker.id || index}
                onClick={() => setSelectedMarker(marker)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Outer Glow Halo */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 22 : 14}
                  fill="url(#pinGlow)"
                  className="transition-all"
                />

                {/* Pin Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 6}
                  fill={isSelected ? '#F8F7F2' : '#C6A36A'}
                  stroke="#172B25"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* Marker Label */}
                <text
                  x={x}
                  y={y - (isSelected ? 16 : 12)}
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#DFBF85'}
                  fontSize={isSelected ? '12' : '10'}
                  fontWeight={isSelected ? 'bold' : '600'}
                  className="font-serif pointer-events-none drop-shadow-md"
                >
                  {marker.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Marker Detail Card at Bottom */}
      {selectedMarker && (
        <div className="p-4 sm:p-5 m-3 rounded-2xl bg-forest-950/90 border border-gold-500/40 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                {selectedMarker.name}
              </h4>
              <span className="text-[10px] font-mono text-gold-400 px-2 py-0.5 rounded bg-forest-900 border border-gold-500/20">
                {selectedMarker.coordinates.lat.toFixed(4)}°N, {selectedMarker.coordinates.lng.toFixed(4)}°E
              </span>
            </div>
            {selectedMarker.description && (
              <p className="text-xs text-forest-200 line-clamp-1">
                {selectedMarker.description}
              </p>
            )}
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.coordinates.lat},${selectedMarker.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-lg"
          >
            <Navigation className="w-3.5 h-3.5 text-forest-950" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 text-forest-950" />
          </a>
        </div>
      )}
    </div>
  );
}
