# AVELORA — Premium AI Travel Platform
> *"The World, Tailored to You."*

**AVELORA** is a full-stack, luxury AI-powered travel intelligence platform engineered for international tourists exploring the UNESCO Silk Road capitals of Uzbekistan (Samarkand, Bukhara, Khiva, Tashkent, and the Tian Shan mountains).

Built specifically for the **International Tourism Hackathon in Uzbekistan**, AVELORA moves beyond generic templates and superficial AI wrappers. It provides a bespoke travel concierge experience with verified historical monuments, realistic itemized budgeting, trilingual localization (English, Russian, Uzbek), interactive Leaflet maps, and an ethical partner directory for local businesses.

---

## 🌟 Hackathon Demonstration Highlights

Judges can immediately evaluate the platform through:
1. **Curated 5-Day Live Demo Journey**:
   - Route: *Tashkent → Samarkand → Bukhara*
   - Preloaded with verified coordinates, timing, Afrosiyob bullet train logistics, and itemized expenditure.
   - Access directly from the homepage banner or at `/my-journeys/grand-silk-road-5day-demo`.
2. **Interactive 6-Step AI Concierge Wizard**:
   - Customize destinations, duration, party composition, budget comfort, interests, and travel pace.
   - Real-time synthesis with progress visualization.
3. **Smart Budget Economics & Multi-Currency Converter**:
   - Instant calculation across **USD ($)**, **EUR (€)**, **GBP (£)**, and **Uzbek So'm (UZS)**.
   - Algorithmic budget health indicator with AI cost-saving alternatives.
4. **Interactive Leaflet Silk Road Cartography**:
   - Verified coordinates for UNESCO monuments, artisan mills, and bazaars with day-by-day routing.
5. **PDF Itinerary Export**:
   - One-click generation of high-resolution printable travel vouchers with complete day schedules and etiquette notes.
6. **Trilingual Localization**:
   - Seamless language switching between English, Russian, and Uzbek across navigation, planner, assistant, and guides.
7. **1-Click Judge Evaluation Sign-In**:
   - Switch between **Demo Tourist** (Eleanor Vance) and **Admin Curator** (Alexander Hamilton) in 1 click at `/login`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with bespoke luxury design tokens (Deep Forest Green `#172B25`, Champagne Gold `#C6A36A`, Warm Ivory `#F8F7F2`)
- **Artificial Intelligence**: Google Gemini API (`gemini-2.5-flash`) with structured JSON schema enforcement and verified Silk Road fallback engine
- **Authentication & Database**: Supabase with RLS policies + zero-configuration Hackathon Showcase Mode
- **Mapping**: Leaflet & OpenStreetMap (CartoDB Positron / Voyager luxury tiles)
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, AVELORA seamlessly activates its verified Silk Road algorithmic engine, ensuring 100% reliable evaluation for hackathon judges).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Core Routes Architecture

- `/` — Luxury Cinematic Homepage & Quick Planner
- `/explore` — Search & Filter Hub (Historical, Cultural, Nature, Food, Hidden Gems)
- `/destinations` — Silk Road Atlas
- `/destinations/[slug]` — Deep-dive guide with verified facts and interactive map
- `/plan` — 6-Step AI Travel Concierge Wizard
- `/plan/results` — Bespoke Itinerary with Day Tabs, Interactive Map, Budget Calculator & PDF Export
- `/assistant` — 24/7 AI Travel Assistant Chat with context awareness
- `/my-journeys` — Saved Journeys Dashboard with PDF Export & Duplicate controls
- `/my-journeys/[id]` — Saved Journey Inspector (includes the 5-Day Demo Odyssey)
- `/saved` — Wishlist of destinations & favorite spots
- `/how-it-works` — Platform Architecture & Verification Philosophy
- `/about` — Avelora Brand Story & Uzbekistan Hackathon Mission
- `/contact` — VIP Concierge & Delegation Inquiries
- `/login` & `/register` — Authentication + 1-Click Judge Demo Logins
- `/profile` & `/settings` — Traveler Preferences, Currency & Language
- `/partner/register` — Local Tourism Business & Artisan Registration Portal
- `/admin` — Protected Curator Command Console with Partner Approval Queue & Analytics

---

## 🏆 Hackathon Compliance & Ethics

- **Zero Fabricated Partners**: Demo businesses and verified partners are distinctly labeled.
- **Accurate Coordinates**: Coordinates correspond to real UNESCO monuments and landmarks.
- **No Hallucinated Bookings**: Opaque booking claims are avoided in favor of transparent pricing estimates and direct local contacts.

---
© 2026 AVELORA Technologies Inc. Designed for the International Tourism Hackathon in Uzbekistan.
