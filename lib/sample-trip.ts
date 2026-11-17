import { Itinerary } from './types';

export const SAMPLE_HACKATHON_TRIP: Itinerary = {
  id: 'grand-silk-road-5day-demo',
  title: 'Grand Silk Road Odyssey: Tashkent, Samarkand & Bukhara',
  destinationName: 'Uzbekistan (Tashkent – Samarkand – Bukhara)',
  destinationSummary: 'A 5-day journey curated for international explorers across Uzbekistan’s UNESCO Silk Road capitals. Blending monumental Islamic architecture, high-speed rail transit, master artisan encounters, and royal culinary secrets.',
  totalDays: 5,
  travelersCount: 2,
  travelerStyle: 'couple',
  travelPace: 'balanced',
  budgetLevel: 'premium',
  totalEstimatedBudgetUSD: 1350,
  recommendedSeason: 'April – June or September – November',
  isDemo: true,
  createdAt: '2026-11-16T12:00:00Z',
  localTips: [
    'Afrosiyob high-speed train tickets should be booked at least 15–30 days in advance.',
    'Dress modestly when visiting mosques and mausoleums (shoulders and knees covered).',
    'Always carry cash (Uzbek So‘m) for artisan bazaars, though international cards work in hotels and restaurants.',
    'Bargaining in traditional trading domes is respectful and customary — start around 20–30% below initial quote.',
    'Stay hydrated and try green tea (kok choy) with lemon and crystal rock sugar (novvot).'
  ],
  packingAdvice: [
    'Comfortable slip-on walking shoes for cobblestones and mosque entry.',
    'Lightweight breathable linen or cotton garments.',
    'Light shawl/scarf for temple and shrine visits.',
    'Universal power adapter (standard European Type C/F plugs 220V).'
  ],
  culturalEtiquette: [
    'Accept tea cups with your right hand, placing your left hand over your chest as a sign of deep respect.',
    'Never place bread (non) upside down on the table — bread is considered sacred in Uzbek heritage.',
    'Ask for permission before photographing local artisans or elderly individuals in mahallas.'
  ],
  days: [
    {
      dayNumber: 1,
      title: 'Arrival in Tashkent: Avant-Garde Heritage & Culinary Awakening',
      theme: 'Spiritual Treasures & Underground Palaces',
      estimatedDayCostUSD: 180,
      transportTip: 'Private executive transfer & Tashkent Metro network',
      localDishRecommendation: 'Tashkent Naryn with cold horse meat delicacies and tandir somsa at Chorsu',
      morning: {
        id: 'act-1-1',
        name: 'Khazrati Imam Square & 7th-Century Uthman Quran',
        time: '09:30 AM',
        description: 'Begin at the spiritual heart of Tashkent, housing the world-famous Caliph Uthman deerskin Quran dating back to 651 AD inside the Muyi Mubarak Madrasah.',
        location: 'Khazrati Imam Complex, Old City Tashkent',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 15,
        category: 'culture',
        coordinates: { lat: 41.3364, lng: 69.2408 },
        verifiedStatus: 'verified',
        notes: 'Photography allowed without flash in the courtyard.'
      },
      afternoon: {
        id: 'act-1-2',
        name: 'Chorsu Bazaar Gastronomic Discovery & Crafts Dome',
        time: '01:00 PM',
        description: 'Explore Central Asia’s most iconic open-air domed market. Taste dry apricots, mountain almonds, crystal sugar novvot, and freshly baked puffy flatbreads straight from ceramic tandir ovens.',
        location: 'Chorsu Bazaar, Navoi Avenue',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 25,
        category: 'gastronomy',
        coordinates: { lat: 41.3273, lng: 69.2349 },
        verifiedStatus: 'verified',
        notes: 'Master bakers will gladly demonstrate bread stamping techniques.'
      },
      evening: {
        id: 'act-1-3',
        name: 'Underground Metro Art Tour & Sunset Promenade at Amir Timur Square',
        time: '05:30 PM',
        description: 'Ride the palatial marble and chandelier stations of Tashkent Metro (Kosmonavtlar, Alisher Navoi, Mustaqillik Maidoni), followed by twilight drinks under century-old plane trees.',
        location: 'Kosmonavtlar Station to Amir Timur Square',
        estimatedDuration: '2 hours',
        estimatedPriceUSD: 12,
        category: 'architecture',
        coordinates: { lat: 41.3111, lng: 69.2797 },
        verifiedStatus: 'verified',
        notes: 'Metro token costs 2,000 UZS ($0.16).'
      }
    },
    {
      dayNumber: 2,
      title: 'High-Speed Afrosiyob to Samarkand: Jewels of the Timurid Empire',
      theme: 'Turquoise Domes & Imperial Grandeur',
      estimatedDayCostUSD: 310,
      transportTip: 'Afrosiyob Train 762F (08:00 AM Departure, 2h 10m journey)',
      localDishRecommendation: 'Samarkand Plov with yellow carrots, chickpeas, raisins, and tender beef',
      morning: {
        id: 'act-2-1',
        name: 'Afrosiyob Express & Arrival at Gur-e-Amir Mausoleum',
        time: '08:00 AM',
        description: 'Board the aerodynamic bullet train gliding across the Syr Darya steppe. Upon arrival in Samarkand, visit the monumental fluted-dome tomb of Amir Timur and Emperor-Astronomer Ulugbek.',
        location: 'Gur-e-Amir Mausoleum, Samarkand',
        estimatedDuration: '3 hours',
        estimatedPriceUSD: 45,
        category: 'culture',
        coordinates: { lat: 39.6483, lng: 66.9686 },
        verifiedStatus: 'verified',
        notes: 'Contains the largest single block of dark jade in the world.'
      },
      afternoon: {
        id: 'act-2-2',
        name: 'Master Plov Feast at Samarkand Osh Markazi',
        time: '12:30 PM',
        description: 'Witness the midday ritual where 200kg of layered Samarkand plov is opened precisely at noon in massive cast-iron kazans, served with quail eggs and savory tomato-onion achichuk salad.',
        location: 'Osh Markazi, Samarkand',
        estimatedDuration: '1.5 hours',
        estimatedPriceUSD: 20,
        category: 'gastronomy',
        coordinates: { lat: 39.6580, lng: 66.9620 },
        verifiedStatus: 'verified',
        notes: 'Arrive before 13:00 as authentic plov sells out daily.'
      },
      evening: {
        id: 'act-2-3',
        name: 'Golden Hour & Light Spectacle at Registan Square',
        time: '05:00 PM',
        description: 'Stand in awe at the monumental ensemble of three madrasahs (Ulugbek, Sher-Dor, Tilya-Kori). Enter the Tilya-Kori mosque to marvel at its dome gilded in 5kg of pure gold leaf, then view the 20:30 architectural light mapping.',
        location: 'Registan Square, Samarkand',
        estimatedDuration: '3 hours',
        estimatedPriceUSD: 30,
        category: 'architecture',
        coordinates: { lat: 39.6547, lng: 66.9758 },
        verifiedStatus: 'verified',
        notes: 'Return at night for the illuminated façade.'
      }
    },
    {
      dayNumber: 3,
      title: 'Samarkand Hidden Gems: Necropolis Avenue & Ancient Papermaking',
      theme: 'Lapis Lazuli Shrines & Silk Road Watermills',
      estimatedDayCostUSD: 260,
      transportTip: 'Private chauffeur with air-conditioned executive vehicle',
      localDishRecommendation: 'Shashlik skewers (Gijduvan style) and fresh cherry compote',
      morning: {
        id: 'act-3-1',
        name: 'Shah-i Zinda: The Turquoise Stairway of Eternity',
        time: '09:00 AM',
        description: 'Ascend the 36-step staircase to a breathtaking avenue of 20+ turquoise, sapphire, and cobalt mausoleums adorned with intricate terracotta filigree and glazed majolica tiles.',
        location: 'Shah-i Zinda Complex, Samarkand',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 20,
        category: 'architecture',
        coordinates: { lat: 39.6631, lng: 66.9878 },
        verifiedStatus: 'verified',
        notes: 'Morning light provides the most vivid cobalt tile photographs.'
      },
      afternoon: {
        id: 'act-3-2',
        name: 'Konigil Meros Paper Mill & Ceramic Masterclass',
        time: '01:30 PM',
        description: 'Venture to the peaceful Siab riverbank where the Mukhtarov brothers restored an ancient hydraulic wooden watermill processing mulberry bark into world-famous 2000-year archival paper.',
        location: 'Konigil Village, 8km outside Samarkand',
        estimatedDuration: '3 hours',
        estimatedPriceUSD: 35,
        category: 'artisan',
        coordinates: { lat: 39.6710, lng: 67.0425 },
        verifiedStatus: 'verified',
        notes: 'Includes hands-on papermaking and natural herbal tea by the creek.'
      },
      evening: {
        id: 'act-3-3',
        name: 'Bibi-Khanym Mosque & Sunset Tea at Chaykhana Bibikhanum',
        time: '06:00 PM',
        description: 'Visit Timur’s colossal cathedral mosque built in 1404 with its 40-meter monumental portal, followed by green tea and pomegranate halva overlooking the illuminated domes.',
        location: 'Bibi-Khanym Complex, Samarkand',
        estimatedDuration: '2 hours',
        estimatedPriceUSD: 25,
        category: 'culture',
        coordinates: { lat: 39.6606, lng: 66.9792 },
        verifiedStatus: 'verified',
        notes: 'Adjacent to vibrant Siab Bazaar.'
      }
    },
    {
      dayNumber: 4,
      title: 'Bukhara the Noble: Living Oasis & Caravanserais',
      theme: 'Mud-Brick Minarets & Medieval Trade Domes',
      estimatedDayCostUSD: 320,
      transportTip: 'Afrosiyob Train from Samarkand to Bukhara (1h 30m)',
      localDishRecommendation: 'Bukharian Oshi Sofi (dietary plov cooked in copper cauldron with saffron and sour prunes)',
      morning: {
        id: 'act-4-1',
        name: 'Morning Bullet Train & Po-i Kalyan Architectural Ensemble',
        time: '08:45 AM',
        description: 'Arrive in ancient Bukhara. Stand beneath the legendary 46-meter Kalyan Minaret constructed in 1127 AD with 14 distinct decorative brick bands, spared by Genghis Khan due to its sheer elegance.',
        location: 'Po-i Kalyan Complex, Bukhara',
        estimatedDuration: '3 hours',
        estimatedPriceUSD: 35,
        category: 'architecture',
        coordinates: { lat: 39.7758, lng: 64.4150 },
        verifiedStatus: 'verified',
        notes: 'Mir-i-Arab Madrasah remains an active Islamic college.'
      },
      afternoon: {
        id: 'act-4-2',
        name: 'Trading Domes (Taqi Zargaran, Sarrofan) & Suzani Masters',
        time: '01:30 PM',
        description: 'Weave through the bustling 16th-century crossroad domes where merchants once exchanged coins, jewels, silk and Astrakhan furs. Visit Master Rahmon’s suzani embroidery workshop.',
        location: 'Bukhara Old Town Trading Domes',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 30,
        category: 'artisan',
        coordinates: { lat: 39.7745, lng: 64.4170 },
        verifiedStatus: 'verified',
        notes: 'Handmade Bukhara damascus steel scissors shaped like storks are a signature souvenir.'
      },
      evening: {
        id: 'act-4-3',
        name: 'Lyabi-Hauz Evening Atmosphere & Traditional Music',
        time: '06:30 PM',
        description: 'Dine around the tranquil historic reflecting pool bordered by 400-year-old mulberry trees and the bronze statue of folk hero Khoja Nasreddin, serenaded by acoustic dutar lute melodies.',
        location: 'Lyabi-Hauz Ensemble, Bukhara',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 40,
        category: 'relaxation',
        coordinates: { lat: 39.7731, lng: 64.4206 },
        verifiedStatus: 'verified',
        notes: 'Order spiced tea infused with cardamom and saffron.'
      }
    },
    {
      dayNumber: 5,
      title: 'Emir’s Fortress & Hammam Rejuvenation: Farewell Bukhara',
      theme: 'Royal Citadels & Rejuvenation Rituals',
      estimatedDayCostUSD: 280,
      transportTip: 'Walking in old quarter & evening return train / flight',
      localDishRecommendation: 'Barak meat dumplings and honey halva with spiced walnuts',
      morning: {
        id: 'act-5-1',
        name: 'The Ark Fortress of Bukhara & Bolo Hauz Mosque',
        time: '09:00 AM',
        description: 'Explore the massive 5th-century cliff-like royal fortress where Bukhara’s Emirs ruled for centuries. Directly across the plaza, admire the 20 intricately carved walnut wood pillars of Bolo Hauz Mosque.',
        location: 'Ark of Bukhara Fortress',
        estimatedDuration: '2.5 hours',
        estimatedPriceUSD: 20,
        category: 'culture',
        coordinates: { lat: 39.7778, lng: 64.4108 },
        verifiedStatus: 'verified',
        notes: 'Offers panoramic photography over the old city walls.'
      },
      afternoon: {
        id: 'act-5-2',
        name: 'Bozori Kord 16th-Century Thermal Bathhouse Ritual',
        time: '01:00 PM',
        description: 'Experience Central Asia’s oldest operating public hammam. Subterranean brick domes, heated stone slabs, invigorating herbal scrub and honey ginger tea to ease travel tension.',
        location: 'Bozori Kord Hammam, Old Town Bukhara',
        estimatedDuration: '2 hours',
        estimatedPriceUSD: 45,
        category: 'relaxation',
        coordinates: { lat: 39.7740, lng: 64.4180 },
        verifiedStatus: 'verified',
        notes: 'Advance reservation recommended.'
      },
      evening: {
        id: 'act-5-3',
        name: 'Chor Minor Sunset Farewell & Departure',
        time: '04:30 PM',
        description: 'Conclude your journey at the whimsical 4-towered Chor Minor gatehouse nestled in a tranquil residential mahalla, with time for souvenir packing and departure transfer.',
        location: 'Chor Minor, Bukhara',
        estimatedDuration: '2 hours',
        estimatedPriceUSD: 15,
        category: 'culture',
        coordinates: { lat: 39.7749, lng: 64.4278 },
        verifiedStatus: 'verified',
        notes: 'Transfer to Bukhara station or airport for return to Tashkent.'
      }
    }
  ]
};

