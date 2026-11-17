import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DESTINATIONS } from '@/lib/destinations-data';
import TravelMap from '@/components/Map/TravelMap';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Info, 
  Coffee, 
  Compass, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  const mapMarkers = [
    {
      id: destination.id,
      name: destination.name,
      category: destination.tag,
      coordinates: destination.coordinates,
      description: destination.description,
    },
    ...destination.topAttractions.map((att, i) => ({
      id: `att-${i}`,
      name: att.name,
      category: 'Key Monument',
      coordinates: att.coordinates || destination.coordinates,
      description: att.description,
    })),
  ];

  return (
    <div className="min-h-screen pb-24">
      
      {/* Hero Banner */}
      <div className="relative h-[65vh] min-h-[460px] w-full">
        <Image
          src={destination.bannerImage}
          alt={destination.name}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/30" />
        
        {/* Back Link */}
        <div className="absolute top-28 left-4 sm:left-8 z-10">
          <Link
            href="/destinations"
            className="px-4 py-2 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold flex items-center gap-1.5 transition-colors backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Destinations</span>
          </Link>
        </div>

        <div className="absolute bottom-10 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/40 text-[11px] font-bold text-gold-300 uppercase tracking-widest backdrop-blur-md">
              {destination.tag}
            </span>
            <div className="flex items-center gap-1 bg-forest-900/90 px-2.5 py-1 rounded-full border border-gold-500/30 text-xs text-gold-400 font-bold backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-gold-400" />
              <span>{destination.rating} ({destination.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-forest-100/90 max-w-2xl font-light leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                Historical & Cultural Overview
              </h2>
              <p className="text-forest-200 text-sm sm:text-base leading-relaxed font-light">
                {destination.longDescription}
              </p>
            </div>

            {/* Top Attractions Cards */}
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
                Key Monuments & Must-Visit Sights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.topAttractions.map((att, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-forest-900 border border-gold-500/20 space-y-2"
                  >
                    <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">
                      Monument 0{i + 1}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">{att.name}</h4>
                    <p className="text-xs text-forest-300 leading-relaxed">{att.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interesting Verified Facts */}
            <div className="p-6 rounded-3xl bg-forest-900/80 border border-gold-500/25 space-y-4">
              <h3 className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-500" />
                Verified Historical Facts
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-forest-200">
                {destination.facts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-gold-400 font-bold mt-0.5">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Gems & Secrets */}
            <div className="p-6 rounded-3xl bg-forest-900/80 border border-gold-500/25 space-y-4">
              <h3 className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                <Coffee className="w-4 h-4 text-gold-500" />
                Local Secrets & Artisan Encounters
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-forest-200">
                {destination.localGems.map((gem, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-gold-400 font-bold mt-0.5">•</span>
                    <span>{gem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Destination Map */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>Verified Geospatial Coordinates</span>
              </h3>
              <TravelMap
                markers={mapMarkers}
                center={destination.coordinates}
                zoom={13}
                height="420px"
              />
            </div>

          </div>

          {/* Right Column: Travel Quick Summary & CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-gold-500/30 shadow-xl space-y-6 sticky top-28">
              <h3 className="font-serif text-2xl font-bold text-white">
                Plan Your Journey to {destination.name}
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-forest-200 pb-3 border-b border-forest-800">
                  <Calendar className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Best Time to Visit:</strong>
                    <span>{destination.bestSeason}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-forest-200 pb-3 border-b border-forest-800">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Recommended Duration:</strong>
                    <span>{destination.idealDays}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-forest-200">
                  <Compass className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Curator Tip:</strong>
                    <span>{destination.sampleItineraryIdea}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/plan?dest=${encodeURIComponent(destination.name)}`}
                  className="w-full gold-btn py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl block text-center"
                >
                  <Sparkles className="w-4 h-4 text-forest-950" />
                  <span>Build {destination.name} Itinerary</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

