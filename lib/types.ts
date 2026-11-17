export type Currency = 'USD' | 'EUR' | 'UZS' | 'GBP';

export type Language = 'en' | 'ru' | 'uz';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Activity {
  id: string;
  name: string;
  time?: string;
  description: string;
  location: string;
  estimatedDuration: string;
  estimatedPriceUSD: number;
  category: 'culture' | 'architecture' | 'gastronomy' | 'nature' | 'adventure' | 'relaxation' | 'artisan' | 'photography';
  coordinates?: Coordinates;
  verifiedStatus: 'verified' | 'ai_suggested';
  notes?: string;
}

export interface DiningOption {
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  restaurantName: string;
  cuisine: string;
  location: string;
  estimatedCostUSD: number;
  recommendedDish: string;
  isBudgetFriendly: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  transportTip: string;
  localDishRecommendation: string;
  estimatedDayCostUSD: number;
  dining?: DiningOption[];
}

export interface Itinerary {
  id: string;
  title: string;
  destinationSummary: string;
  destinationName: string;
  totalDays: number;
  travelersCount: number;
  travelerStyle: 'solo' | 'couple' | 'family' | 'friends';
  travelPace: 'relaxed' | 'balanced' | 'adventure' | 'cultural' | 'luxury';
  budgetLevel: 'budget' | 'comfort' | 'premium' | 'luxury';
  totalEstimatedBudgetUSD: number;
  recommendedSeason: string;
  days: ItineraryDay[];
  localTips: string[];
  packingAdvice: string[];
  culturalEtiquette: string[];
  isDemo?: boolean;
  createdAt: string;
  currency?: Currency;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tag: string;
  rating: number;
  reviewsCount: number;
  image: string;
  bannerImage: string;
  description: string;
  longDescription: string;
  highlights: string[];
  bestSeason: string;
  idealDays: string;
  coordinates: Coordinates;
  verified: boolean;
  facts: string[];
  localGems: string[];
  sampleItineraryIdea: string;
  topAttractions: {
    name: string;
    description: string;
    coordinates?: Coordinates;
  }[];
}

export interface LocalBusiness {
  id: string;
  name: string;
  category: 'hotel' | 'guesthouse' | 'restaurant' | 'guide' | 'tour' | 'artisan' | 'transport';
  city: string;
  address: string;
  rating: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  description: string;
  image: string;
  phone?: string;
  website?: string;
  verifiedStatus: 'verified' | 'partner' | 'demo';
  featured: boolean;
  pricingNote?: string;
}

export interface PartnerApplication {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  preferredLanguage: Language;
  preferredCurrency: Currency;
  role: 'tourist' | 'admin' | 'partner';
  savedDestinations: string[];
}

