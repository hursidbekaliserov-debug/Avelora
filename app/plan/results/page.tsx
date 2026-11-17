'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { Itinerary, ItineraryDay, Activity } from '@/lib/types';
import { SAMPLE_HACKATHON_TRIP } from '@/lib/sample-trip';
import { exportItineraryToPdf } from '@/lib/exportPdf';
import RouteRoadmap from '@/components/Map/RouteRoadmap';
import BudgetCalculator from '@/components/Planner/BudgetCalculator';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Download, 
  Bookmark, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X,
  Compass,
  Train,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function PlanResultsPage() {
  const router = useRouter();
  const { lang, formatMoney, t } = useLanguage();
  const { saveTrip } = useAuth();

  const [itinerary, setItinerary] = useState<Itinerary>(SAMPLE_HACKATHON_TRIP);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Add place modal
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDesc, setNewPlaceDesc] = useState('');
  const [newPlaceSlot, setNewPlaceSlot] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('avelora_active_itinerary');
      if (stored) {
        setItinerary(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  const handleSaveJourney = () => {
    saveTrip(itinerary);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleExportPdf = () => {
    exportItineraryToPdf(itinerary);
  };

  // Activity Edit
  const startEditing = (act: Activity) => {
    setEditingActivityId(act.id);
    setEditTitle(act.name);
    setEditDesc(act.description);
  };

  const saveEditedActivity = (slot: 'morning' | 'afternoon' | 'evening') => {
    if (!editingActivityId) return;
    const updatedDays = [...itinerary.days];
    const day = { ...updatedDays[activeDayIndex] };

    if (day[slot].id === editingActivityId) {
      day[slot] = {
        ...day[slot],
        name: editTitle,
        description: editDesc,
      };
      updatedDays[activeDayIndex] = day;
      const updatedTrip = { ...itinerary, days: updatedDays };
      setItinerary(updatedTrip);
      saveTrip(updatedTrip);
      sessionStorage.setItem('avelora_active_itinerary', JSON.stringify(updatedTrip));
    }
    setEditingActivityId(null);
  };

  const removeActivity = (slot: 'morning' | 'afternoon' | 'evening') => {
    const updatedDays = [...itinerary.days];
    const day = { ...updatedDays[activeDayIndex] };
    day[slot] = {
      ...day[slot],
      name: 'Free Leisure / Teahouse Pause',
      description: 'Reserved for personal exploration, quiet teahouse moments, and strolls in local mahallas.',
      estimatedPriceUSD: 0,
      verifiedStatus: 'ai_suggested',
    };
    updatedDays[activeDayIndex] = day;
    const updatedTrip = { ...itinerary, days: updatedDays };
    setItinerary(updatedTrip);
    saveTrip(updatedTrip);
    sessionStorage.setItem('avelora_active_itinerary', JSON.stringify(updatedTrip));
  };

  const handleAddCustomPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceName) return;

    const newAct: Activity = {
      id: `custom-${Date.now()}`,
      name: newPlaceName,
      description: newPlaceDesc || 'Custom added explorer destination.',
      location: itinerary.destinationName,
      estimatedDuration: '1.5 hours',
      estimatedPriceUSD: 15,
      category: 'culture',
      verifiedStatus: 'ai_suggested',
    };

    const updatedDays = [...itinerary.days];
    const day = { ...updatedDays[activeDayIndex] };
    day[newPlaceSlot] = newAct;
    updatedDays[activeDayIndex] = day;

    const updatedTrip = { ...itinerary, days: updatedDays };
    setItinerary(updatedTrip);
    saveTrip(updatedTrip);
    sessionStorage.setItem('avelora_active_itinerary', JSON.stringify(updatedTrip));
    setShowAddPlaceModal(false);
    setNewPlaceName('');
    setNewPlaceDesc('');
  };

  // Collect map markers for the active day or entire trip
  const currentDayActivities = [activeDay.morning, activeDay.afternoon, activeDay.evening];
  const mapMarkers = currentDayActivities
    .filter((a) => a.coordinates)
    .map((a, i) => ({
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
      
      {/* Top Banner / Trip Metadata */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 mb-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-[10px] font-bold text-gold-300 uppercase tracking-widest">
                {itinerary.isDemo ? 'Verified Demonstration Itinerary' : 'Live AI Curated'}
              </span>
              <span className="text-xs text-forest-300">• {itinerary.recommendedSeason}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-xs sm:text-sm text-forest-200 max-w-2xl leading-relaxed">
              {itinerary.destinationSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-forest-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                {itinerary.totalDays} Days
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                {itinerary.travelPace.toUpperCase()} Pace
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-gold-400" />
                Est. Total: <strong className="text-gold-300">{formatMoney(itinerary.totalEstimatedBudgetUSD)}</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={handleSaveJourney}
              className="px-4 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 border border-gold-500/30 text-gold-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <Bookmark className="w-3.5 h-3.5 text-gold-400" />
              <span>{savedSuccess ? 'Saved to Dashboard!' : t('saveJourney')}</span>
            </button>

            <button
              onClick={handleExportPdf}
              className="gold-btn px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Download className="w-3.5 h-3.5 text-forest-950" />
              <span>{t('exportPdf')}</span>
            </button>

            <Link
              href="/plan"
              className="px-4 py-2.5 rounded-full bg-forest-900 border border-gold-500/20 text-forest-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('regenerateTrip')}</span>
            </Link>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Itinerary has been successfully saved to your personal dashboard!</span>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout: Left = Itinerary Schedule, Right = Map & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Days & Activities (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {itinerary.days.map((d, index) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayIndex(index)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeDayIndex === index
                    ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 border-gold-400 shadow-lg font-bold'
                    : 'bg-forest-900 text-forest-200 border-gold-500/20 hover:border-gold-500/40'
                }`}
              >
                Day {d.dayNumber}
              </button>
            ))}
          </div>

          {/* Active Day Header */}
          <div className="p-5 rounded-3xl bg-forest-900/80 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest">
                Day {activeDay.dayNumber} Theme
              </span>
              <span className="text-xs font-semibold text-gold-300">
                Daily Est. {formatMoney(activeDay.estimatedDayCostUSD)}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {activeDay.title}
            </h3>
            <p className="text-xs text-forest-200 font-medium">
              {activeDay.theme}
            </p>

            {/* Logistics & Culinary Bar */}
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
                  <strong className="text-forest-100 block">Culinary Secret:</strong>
                  <span>{activeDay.localDishRecommendation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Activities Slots: Morning, Afternoon, Evening */}
          <div className="space-y-4">
            
            {/* Morning Activity */}
            <ActivityCard
              slot="morning"
              label={t('morning')}
              activity={activeDay.morning}
              isEditing={editingActivityId === activeDay.morning.id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              onStartEdit={() => startEditing(activeDay.morning)}
              onSaveEdit={() => saveEditedActivity('morning')}
              onCancelEdit={() => setEditingActivityId(null)}
              onRemove={() => removeActivity('morning')}
              formatMoney={formatMoney}
            />

            {/* Afternoon Activity */}
            <ActivityCard
              slot="afternoon"
              label={t('afternoon')}
              activity={activeDay.afternoon}
              isEditing={editingActivityId === activeDay.afternoon.id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              onStartEdit={() => startEditing(activeDay.afternoon)}
              onSaveEdit={() => saveEditedActivity('afternoon')}
              onCancelEdit={() => setEditingActivityId(null)}
              onRemove={() => removeActivity('afternoon')}
              formatMoney={formatMoney}
            />

            {/* Evening Activity */}
            <ActivityCard
              slot="evening"
              label={t('evening')}
              activity={activeDay.evening}
              isEditing={editingActivityId === activeDay.evening.id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              onStartEdit={() => startEditing(activeDay.evening)}
              onSaveEdit={() => saveEditedActivity('evening')}
              onCancelEdit={() => setEditingActivityId(null)}
              onRemove={() => removeActivity('evening')}
              formatMoney={formatMoney}
            />

          </div>

          {/* DEDICATED CULINARY & DINING GUIDE FOR THIS DAY */}
          <div className="p-6 rounded-3xl bg-forest-900/80 border border-gold-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Utensils className="w-4 h-4 text-gold-500" />
                <span>Culinary & Dining Guide • Day {activeDay.dayNumber}</span>
              </div>
              <span className="text-[11px] font-semibold text-gold-300">
                {itinerary.budgetLevel === 'budget' ? 'Budget-Friendly Local Eats' : 'Curated Dining'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {(activeDay.dining && activeDay.dining.length > 0 ? activeDay.dining : [
                {
                  mealType: 'Breakfast',
                  restaurantName: 'Mahalla Choyxonasi',
                  cuisine: 'National Breakfast',
                  location: 'Historic quarter',
                  estimatedCostUSD: itinerary.budgetLevel === 'budget' ? 2 : 7,
                  recommendedDish: 'Fresh tandir non, qaymoq & kok choy',
                  isBudgetFriendly: true,
                },
                {
                  mealType: 'Lunch',
                  restaurantName: itinerary.budgetLevel === 'budget' ? 'Markaziy Samarqand Osh Markazi' : 'Platan Heritage Restaurant',
                  cuisine: 'Authentic Samarkand Plov',
                  location: 'City center',
                  estimatedCostUSD: itinerary.budgetLevel === 'budget' ? 4 : 22,
                  recommendedDish: 'Royal lamb plov with raisins, chickpeas and horse sausage',
                  isBudgetFriendly: itinerary.budgetLevel === 'budget',
                },
                {
                  mealType: 'Dinner',
                  restaurantName: itinerary.budgetLevel === 'budget' ? 'Chorsu Tandir Somsa & Shashlik' : 'Emirate Grand Lounge',
                  cuisine: 'Charcoal Grilled Kebabs',
                  location: 'Artisan boulevard',
                  estimatedCostUSD: itinerary.budgetLevel === 'budget' ? 5 : 35,
                  recommendedDish: 'Juicy spiced minced lamb skewers (qiyma) & fresh tandoor somsa',
                  isBudgetFriendly: itinerary.budgetLevel === 'budget',
                },
              ]).map((meal, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-2xl border transition-all ${
                    meal.isBudgetFriendly 
                      ? 'bg-emerald-950/30 border-emerald-500/30' 
                      : 'bg-forest-900 border-gold-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">
                      {meal.mealType}
                    </span>
                    <span className="text-xs font-bold text-white font-sans">
                      {formatMoney(meal.estimatedCostUSD)}
                    </span>
                  </div>

                  <h5 className="font-serif text-sm font-bold text-white mb-1">
                    {meal.restaurantName}
                  </h5>

                  <p className="text-[11px] text-forest-200 line-clamp-2 leading-relaxed">
                    <strong>Specialty:</strong> {meal.recommendedDish}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-forest-800 flex items-center justify-between text-[10px]">
                    <span className="text-forest-400 truncate max-w-[120px]">{meal.location}</span>
                    {meal.isBudgetFriendly && (
                      <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-900/40">
                        Smart Budget
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add custom destination button */}
          <div className="pt-1">
            <button
              onClick={() => setShowAddPlaceModal(true)}
              className="w-full py-3.5 rounded-2xl border border-dashed border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 hover:bg-forest-900/50 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Monument, Tea House or Artisan Stop to Day {activeDay.dayNumber}</span>
            </button>
          </div>

          {/* Local Cultural & Etiquette Notes */}
          <div className="p-6 rounded-3xl bg-forest-900/60 border border-gold-500/20 space-y-3">
            <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              Cultural Etiquette & Local Advice
            </h4>
            <ul className="space-y-2 text-xs text-forest-200">
              {itinerary.culturalEtiquette?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Route Roadmap & Budget (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive Trajectory & Waypoint Roadmap (100% Reliable, replaces Leaflet) */}
          <RouteRoadmap
            stops={mapMarkers.map((m, idx) => ({
              ...m,
              timeSlot: idx === 0 ? 'Morning Stop' : idx === 1 ? 'Afternoon Highlight' : 'Evening Conclusion'
            }))}
            dayNumber={activeDay.dayNumber}
            destinationName={itinerary.destinationName}
          />

          {/* Smart Budget Calculator */}
          <BudgetCalculator
            initialTotalUSD={itinerary.totalEstimatedBudgetUSD}
            totalDays={itinerary.totalDays}
            travelers={itinerary.travelersCount}
            userBudgetCapUSD={itinerary.totalEstimatedBudgetUSD + 250}
          />

        </div>

      </div>

      {/* Add Place Modal */}
      {showAddPlaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-md">
          <div className="bg-forest-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">
                Add Custom Place to Day {activeDay.dayNumber}
              </h3>
              <button
                onClick={() => setShowAddPlaceModal(false)}
                className="p-1 rounded-lg text-forest-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomPlace} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">
                  Place Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Siyob Chaixana or Afrosiyob Museum"
                  value={newPlaceName}
                  onChange={(e) => setNewPlaceName(e.target.value)}
                  required
                  className="w-full bg-forest-800 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">
                  Time Slot
                </label>
                <select
                  value={newPlaceSlot}
                  onChange={(e) => setNewPlaceSlot(e.target.value as any)}
                  className="w-full bg-forest-800 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                >
                  <option value="morning">Morning Activity</option>
                  <option value="afternoon">Afternoon Activity</option>
                  <option value="evening">Evening Activity</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gold-300 block mb-1">
                  Description / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the experience or artisan encounter..."
                  value={newPlaceDesc}
                  onChange={(e) => setNewPlaceDesc(e.target.value)}
                  className="w-full bg-forest-800 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlaceModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-forest-200 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-btn px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Add Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Activity Card sub-component
function ActivityCard({
  slot,
  label,
  activity,
  isEditing,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
  formatMoney,
}: {
  slot: string;
  label: string;
  activity: Activity;
  isEditing: boolean;
  editTitle: string;
  setEditTitle: (val: string) => void;
  editDesc: string;
  setEditDesc: (val: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemove: () => void;
  formatMoney: (val: number) => string;
}) {
  return (
    <div className="p-5 rounded-3xl bg-forest-900 border border-gold-500/20 hover:border-gold-500/40 transition-all space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-forest-800 border border-gold-500/30 text-[10px] font-bold text-gold-300 uppercase tracking-wider">
            {label} {activity.time && `• ${activity.time}`}
          </span>
          <span className="text-[10px] text-forest-300 uppercase tracking-wider font-semibold">
            {activity.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {activity.verifiedStatus === 'verified' && (
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}

          {!isEditing && (
            <>
              <button
                onClick={onStartEdit}
                className="p-1.5 rounded-lg text-forest-300 hover:text-gold-300 hover:bg-forest-800 transition-colors"
                title="Edit Activity"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onRemove}
                className="p-1.5 rounded-lg text-forest-300 hover:text-red-400 hover:bg-forest-800 transition-colors"
                title="Remove Activity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3 pt-1">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-forest-800 text-white text-sm font-bold p-2.5 rounded-xl border border-gold-500/40"
          />
          <textarea
            rows={2}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full bg-forest-800 text-forest-100 text-xs p-2.5 rounded-xl border border-gold-500/40"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onCancelEdit}
              className="px-3 py-1 rounded-lg text-xs text-forest-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={onSaveEdit}
              className="gold-btn px-4 py-1 rounded-lg text-xs font-bold"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-serif text-lg font-bold text-white">
            {activity.name}
          </h4>
          <p className="text-xs text-forest-200 leading-relaxed">
            {activity.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-forest-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {activity.location}
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                {activity.estimatedDuration}
              </span>
              <span className="text-gold-300 font-bold">
                Est. {formatMoney(activity.estimatedPriceUSD)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

