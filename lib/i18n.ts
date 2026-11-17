import { Language } from './types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand
    brandName: 'AVELORA',
    tagline: 'The World, Tailored to You.',
    subTagline: 'Discover the extraordinary. Experience the world differently.',
    
    // Navigation
    navExplore: 'Explore',
    navDestinations: 'Destinations',
    navHowItWorks: 'How It Works',
    navAbout: 'About',
    navAssistant: 'AI Concierge',
    navMyJourneys: 'My Journeys',
    navAdmin: 'Admin',
    navSignIn: 'Sign In',
    navSignOut: 'Sign Out',
    navPlanCTA: 'Plan My Journey',
    navPlanJourney: 'Plan Journey',
    
    // Hero
    heroHeadline1: 'Your Journey.',
    heroHeadline2: 'Beyond Ordinary.',
    heroSubtext: 'Discover extraordinary destinations and let intelligent travel planning turn your dreams into unforgettable experiences.',
    heroPrimaryCTA: 'Create My Journey',
    heroSecondaryCTA: 'Explore Destinations',
    heroBadge: 'International Tourism Hackathon • Uzbekistan',
    
    // Quick Search
    whereTo: 'Where would you like to explore?',
    dates: 'Travel Dates',
    travelers: 'Travelers',
    startPlanning: 'Start Planning',
    featuredTitle: 'Timeless Silk Road Jewels',
    featuredSubtitle: 'Hand-curated destinations blending thousand-year history, architectural marvels, and authentic local traditions.',
    exploreCity: 'Discover Destination',
    
    // How It Works
    howItWorksTitle: 'Intelligent Travel in Three Steps',
    howItWorksSubtitle: 'Sophisticated AI architecture tailored to your personal aesthetic, budget, and curiosity.',
    step1Title: 'Share Your Aspirations',
    step1Desc: 'Tell us your destination, dates, travel party, pace, and passions — from ancient architecture to culinary wonders.',
    step2Title: 'Intelligent Curation',
    step2Desc: 'AVELORA’s AI synthesizes real-time logistical feasibility, verified cultural landmarks, and hidden artisan gems.',
    step3Title: 'Explore With Confidence',
    step3Desc: 'Navigate with interactive maps, itemized transparent budgets, and personalized 24/7 AI concierge guidance.',
    
    // Hidden Gems
    hiddenGemsTitle: 'Beyond the Guidebooks: Hidden Gems',
    hiddenGemsSubtitle: 'Uncover centuries-old paper mills, underground tile ateliers, and secluded mountain teahouses known only to locals.',
    
    // Why Avelora
    whyTitle: 'Why Discerning Travelers Choose AVELORA',
    whySubtitle: 'Engineered for seamless elegance, precision, and authentic cultural immersion.',
    whyFeature1Title: 'Personalized Travel Intelligence',
    whyFeature1Desc: 'Never a generic template. Every single itinerary is uniquely crafted based on your passions, budget, and travel party.',
    whyFeature2Title: 'Authentic Local Connections',
    whyFeature2Desc: 'Direct discovery of verified local artisans, family guesthouses, and historic teahouses without intermediaries.',
    whyFeature3Title: 'Transparent Budget Optimization',
    whyFeature3Desc: 'Real-time itemized cost estimates in USD, EUR, UZS, and GBP with intelligent over-budget alerts.',
    whyFeature4Title: 'Interactive Geospatial Routing',
    whyFeature4Desc: 'High-precision coordinate mapping and daily geographic routing for effortless day-to-day navigation.',
    
    // Final CTA
    finalCtaTitle: 'Your next extraordinary journey starts here.',
    finalCtaSubtitle: 'Join travelers discovering the world through bespoke AI intelligence.',
    finalCtaButton: 'Plan Your Journey',
    
    // Footer
    footerRights: 'All rights reserved. Designed for the Uzbekistan International Tourism Hackathon.',
    footerQuickLinks: 'Quick Links',
    footerCompany: 'Company',
    footerLegal: 'Legal',
    footerContact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // Planner Wizard
    plannerTitle: 'AVELORA Travel Concierge',
    plannerSubtitle: 'Configure your travel parameters for bespoke itinerary generation',
    stepLabelDestination: 'Destination',
    stepLabelDates: 'Dates',
    stepLabelTravelers: 'Travelers',
    stepLabelBudget: 'Budget',
    stepLabelInterests: 'Interests',
    stepLabelStyle: 'Pace & Style',
    nextStep: 'Continue',
    prevStep: 'Back',
    generateButton: 'Generate Bespoke Itinerary',
    
    // Generation states
    genStep1: 'Understanding your preferences...',
    genStep2: 'Discovering verified cultural landmarks...',
    genStep3: 'Structuring daily morning, afternoon & evening cadence...',
    genStep4: 'Estimating realistic itemized budget...',
    genStep5: 'Finalizing your bespoke Silk Road itinerary...',
    
    // Results
    resultsTitle: 'Your Tailored Itinerary',
    editActivity: 'Edit Activity',
    removeActivity: 'Remove',
    regenerateTrip: 'Regenerate',
    exportPdf: 'Export PDF Itinerary',
    saveJourney: 'Save Journey',
    savedJourneySuccess: 'Journey saved to your dashboard!',
    budgetCalculatorTitle: 'Smart Budget Breakdown',
    mapViewTitle: 'Interactive Route Map',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    transportation: 'Transportation & Logistics',
    culinaryHighlight: 'Culinary Recommendation',
    verifiedBadge: 'Verified Location',
    aiBadge: 'Curated by AI',
    demoNotice: 'Interactive Demonstration Mode • Gemini AI Ready',

    // Assistant
    assistantTitle: 'AVELORA Travel Concierge AI',
    assistantSubtitle: 'Ask questions, customize your itinerary, or explore hidden secrets',
    askPlaceholder: 'Ask anything about Uzbekistan travel, budgets, culture...',
    send: 'Send',
    suggestedQueries: 'Suggested inquiries:',
    
    // Demo Journey banner
    demoBannerTitle: 'Featured Hackathon Demonstration',
    demoBannerDesc: 'Preloaded 5-day luxury journey across Tashkent, Samarkand, and Bukhara.',
    demoBannerCTA: 'Explore Live Demo Journey',
  },
  ru: {
    // Brand
    brandName: 'AVELORA',
    tagline: 'Мир, созданный специально для вас.',
    subTagline: 'Откройте для себя необыкновенное. Познайте мир по-новому.',
    
    // Navigation
    navExplore: 'Обзор',
    navDestinations: 'Направления',
    navHowItWorks: 'Как это работает',
    navAbout: 'О проекте',
    navAssistant: 'AI-Консьерж',
    navMyJourneys: 'Мои поездки',
    navAdmin: 'Админ',
    navSignIn: 'Войти',
    navSignOut: 'Выйти',
    navPlanCTA: 'Создать маршрут',
    navPlanJourney: 'Plan Journey',
    
    // Hero
    heroHeadline1: 'Ваше путешествие.',
    heroHeadline2: 'За гранью обычного.',
    heroSubtext: 'Откройте для себя уникальные направления и позвольте искусственному интеллекту превратить ваши мечты в незабываемые впечатления.',
    heroPrimaryCTA: 'Создать поездку',
    heroSecondaryCTA: 'Смотреть направления',
    heroBadge: 'Международный туристический хакатон • Узбекистан',
    
    // Quick Search
    whereTo: 'Куда вы хотите отправиться?',
    dates: 'Даты поездки',
    travelers: 'Путешественники',
    startPlanning: 'Начать планирование',
    featuredTitle: 'Жемчужины Шелкового Пути',
    featuredSubtitle: 'Отобранные направления, объединяющие тысячелетнюю историю, архитектурное величие и живые традиции.',
    exploreCity: 'Подробнее',
    
    // How It Works
    howItWorksTitle: 'Умное путешествие за 3 шага',
    howItWorksSubtitle: 'Передовой искусственный интеллект, настроенный под ваши вкусы, бюджет и интересы.',
    step1Title: 'Укажите предпочтения',
    step1Desc: 'Выберите направление, даты, состав компании, темп и увлечения — от архитектуры до гастрономии.',
    step2Title: 'Интеллектуальный расчет',
    step2Desc: 'AVELORA сопоставляет реальную логистику, проверенные памятники и аутентичные мастерские.',
    step3Title: 'Путешествуйте с комфортом',
    step3Desc: 'Пользуйтесь интерактивными картами, прозрачным бюджетом и персональным круглосуточным AI-консьержем.',
    
    // Hidden Gems
    hiddenGemsTitle: 'Тайны Шелкового Пути',
    hiddenGemsSubtitle: 'Древние водяные мельницы, мастерские росписи шелка и горные чайханы, известные лишь местным жителям.',
    
    // Why Avelora
    whyTitle: 'Почему выбирают AVELORA',
    whySubtitle: 'Создано для истинных ценителей эстетики, точности и глубокого погружения в культуру.',
    whyFeature1Title: 'Персонализированный AI-интеллект',
    whyFeature1Desc: 'Никаких шаблонных маршрутов. Каждая программа уникальна и адаптирована под ваши интересы.',
    whyFeature2Title: 'Прямая связь с местными мастерами',
    whyFeature2Desc: 'Прямой доступ к проверенным ремесленникам, бутик-отелям и историческим чайханам.',
    whyFeature3Title: 'Оптимизация бюджета',
    whyFeature3Desc: 'Прозрачный детальный расчет расходов в USD, EUR, UZS и GBP с контролем перерасхода.',
    whyFeature4Title: 'Интерактивная карта и маршруты',
    whyFeature4Desc: 'Точные координаты, проверенные локации и продуманные ежедневные переходы.',
    
    // Final CTA
    finalCtaTitle: 'Ваше следующее великое путешествие начинается здесь.',
    finalCtaSubtitle: 'Присоединяйтесь к путешественникам нового поколения.',
    finalCtaButton: 'Спланировать поездку',
    
    // Footer
    footerRights: 'Все права защищены. Разработано для Международного Туристического Хакатона в Узбекистане.',
    footerQuickLinks: 'Навигация',
    footerCompany: 'Компания',
    footerLegal: 'Правовая информация',
    footerContact: 'Контакты',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    
    // Planner Wizard
    plannerTitle: 'Консьерж путешествий AVELORA',
    plannerSubtitle: 'Настройте параметры вашей поездки для персонального расчета',
    stepLabelDestination: 'Направление',
    stepLabelDates: 'Даты',
    stepLabelTravelers: 'Компания',
    stepLabelBudget: 'Бюджет',
    stepLabelInterests: 'Интересы',
    stepLabelStyle: 'Темп и стиль',
    nextStep: 'Далее',
    prevStep: 'Назад',
    generateButton: 'Создать индивидуальный маршрут',
    
    // Generation states
    genStep1: 'Анализ ваших предпочтений...',
    genStep2: 'Поиск проверенных культурных сокровищ...',
    genStep3: 'Формирование расписания (утро, день, вечер)...',
    genStep4: 'Расчет реалистичного детального бюджета...',
    genStep5: 'Финализация вашего маршрута по Шелковому Пути...',
    
    // Results
    resultsTitle: 'Ваш персонализированный маршрут',
    editActivity: 'Редактировать',
    removeActivity: 'Удалить',
    regenerateTrip: 'Перегенерировать',
    exportPdf: 'Экспорт маршрута в PDF',
    saveJourney: 'Сохранить поездку',
    savedJourneySuccess: 'Поездка успешно сохранена!',
    budgetCalculatorTitle: 'Калькулятор бюджета поездки',
    mapViewTitle: 'Интерактивная карта маршрута',
    morning: 'Утро',
    afternoon: 'День',
    evening: 'Вечер',
    transportation: 'Транспорт и логистика',
    culinaryHighlight: 'Гастрономическая рекомендация',
    verifiedBadge: 'Проверенная локация',
    aiBadge: 'Подобрано AI',
    demoNotice: 'Режим живой демонстрации • Поддержка Gemini AI',

    // Assistant
    assistantTitle: 'AI-Консьерж AVELORA',
    assistantSubtitle: 'Задавайте любые вопросы о путешествии, бюджетах и обычаях',
    askPlaceholder: 'Спросите о достопримечательностях, ценах, советах...',
    send: 'Отправить',
    suggestedQueries: 'Популярные вопросы:',
    
    // Demo Journey banner
    demoBannerTitle: 'Готовая демонстрация для хакатона',
    demoBannerDesc: '5-дневное премиальное путешествие: Ташкент, Самарканд и Бухара.',
    demoBannerCTA: 'Открыть демо-маршрут',
  },
  uz: {
    // Brand
    brandName: 'AVELORA',
    tagline: 'Dunyo — Sizga Moslashtirilgan.',
    subTagline: 'Favqulodda go‘zallikni kashf eting. Dunyoni yangicha his qiling.',
    
    // Navigation
    navExplore: 'Kashf Qiling',
    navDestinations: 'Manzillar',
    navHowItWorks: 'Qanday Ishlaydi',
    navAbout: 'Biz Haqimizda',
    navAssistant: 'AI Konsyerj',
    navMyJourneys: 'Mening Safarlarim',
    navAdmin: 'Admin',
    navSignIn: 'Kirish',
    navSignOut: 'Chiqish',
    navPlanCTA: 'Safarimni Rejalashtirish',
    navPlanJourney: 'Plan Journey',
    
    // Hero
    heroHeadline1: 'Sizning Safaringiz.',
    heroHeadline2: 'Oddiylikdan Yuqori.',
    heroSubtext: 'Noyob sayyohlik manzillarini kashf eting va sun’iy intellekt orqali orzularingizni unutilmas taassurotlarga aylantiring.',
    heroPrimaryCTA: 'Safar Yaratish',
    heroSecondaryCTA: 'Manzillarni Ko‘rish',
    heroBadge: 'Xalqaro Turizm Xakatoni • O‘zbekiston',
    
    // Quick Search
    whereTo: 'Qayerga sayohat qilishni xohlaysiz?',
    dates: 'Safar sanalari',
    travelers: 'Sayohatchilar',
    startPlanning: 'Rejalashtirishni Boshlash',
    featuredTitle: 'Buyuk Ipak Yo‘li Javohirlari',
    featuredSubtitle: 'Ming yillik tarix, mahobatli me’morchilik va milliy qadriyatlarni o‘zida jamlagan saralangan manzillar.',
    exploreCity: 'Batafsil',
    
    // How It Works
    howItWorksTitle: 'Aqlli Sayohat — 3 Bosqichda',
    howItWorksSubtitle: 'Sizning didingiz, byudjetingiz va qiziqishlaringizga moslashtirilgan ilg‘or AI arxitekturasi.',
    step1Title: 'Xohishingizni Bildiring',
    step1Desc: 'Manzil, sanalar, hamrohlar, harakat sur’ati va qiziqishlaringizni tanlang.',
    step2Title: 'Aqlli Tahlil va Yaratish',
    step2Desc: 'AVELORA real logistika, tarixiy obidalar va an’anaviy hunarmandchilik maskanlarini birlashtiradi.',
    step3Title: 'Ishonch Bilan Sayohat Qiling',
    step3Desc: 'Interaktiv xaritalar, shaffof byudjet va tunu-kun yordam beruvchi AI konsyerjdan foydalaning.',
    
    // Hidden Gems
    hiddenGemsTitle: 'Yashirin Sirlar va Marvaridlar',
    hiddenGemsSubtitle: 'Qadimiy ipak qog‘oz tegirmonlari, kulolchilik ustaxonalari va faqat mahalliy aholi biladigan maskanlar.',
    
    // Why Avelora
    whyTitle: 'Nega Sayohatchilar AVELORA’ni Tanlashadi?',
    whySubtitle: 'Nafislik, aniqlik va boy madaniy merosga chuqur sho‘ng‘ish uchun ishlab chiqilgan.',
    whyFeature1Title: 'Shaxsiy AI Intellekti',
    whyFeature1Desc: 'Bir xil andozalar yo‘q. Har bir marshrut sizning xohishingizga mos ravishda noldan tuziladi.',
    whyFeature2Title: 'Mahalliy Hunarmandlar Bilan Aloqa',
    whyFeature2Desc: 'Haqiqiy hunarmandlar, butik mehmonxonalar va an’anaviy choyxonalarni vositachilarsiz toping.',
    whyFeature3Title: 'Shaffof Byudjet Nazorati',
    whyFeature3Desc: 'USD, EUR, UZS va GBP valyutalarida aniq hisob-kitob va ortiqcha xarajatlardan ogohlantirish.',
    whyFeature4Title: 'Interaktiv Geografik Xarita',
    whyFeature4Desc: 'Aniq koordinatalar va qulay kunlik harakat yo‘nalishlari bilan oson yo‘l toping.',
    
    // Final CTA
    finalCtaTitle: 'Navbatdagi ajoyib sayohatingiz shu yerdan boshlanadi.',
    finalCtaSubtitle: 'Besh yulduzli sayohat intellektiga ega bo‘ling.',
    finalCtaButton: 'Sayohatni Rejalashtiring',
    
    // Footer
    footerRights: 'Barcha huquqlar himoyalangan. O‘zbekiston Xalqaro Turizm Xakatoni uchun maxsus yaratilgan.',
    footerQuickLinks: 'Tezkor Havolalar',
    footerCompany: 'Kompaniya',
    footerLegal: 'Huquqiy',
    footerContact: 'Bog‘lanish',
    privacyPolicy: 'Maxfiylik Siyosati',
    termsOfService: 'Foydalanish Shartlari',
    
    // Planner Wizard
    plannerTitle: 'AVELORA Sayohat Konsyerji',
    plannerSubtitle: 'Sizga mos marshrutni yaratish uchun parametrlarini kiriting',
    stepLabelDestination: 'Manzil',
    stepLabelDates: 'Sanalar',
    stepLabelTravelers: 'Hamrohlar',
    stepLabelBudget: 'Byudjet',
    stepLabelInterests: 'Qiziqishlar',
    stepLabelStyle: 'Sur’at va Uslub',
    nextStep: 'Davom Etish',
    prevStep: 'Orqaga',
    generateButton: 'Maxsus Marshrutni Yaratish',
    
    // Generation states
    genStep1: 'Sizning afzalliklaringiz o‘rganilmoqda...',
    genStep2: 'Tarixiy obidalar va maskanlar saralanmoqda...',
    genStep3: 'Ertalabki, tushki va kechki rejalar tuzilmoqda...',
    genStep4: 'Aniq va real byudjet hisoblanmoqda...',
    genStep5: 'Buyuk Ipak Yo‘li marshruti tayyorlanmoqda...',
    
    // Results
    resultsTitle: 'Sizga Moslashtirilgan Marshrut',
    editActivity: 'Tahrirlash',
    removeActivity: 'O‘chirish',
    regenerateTrip: 'Qayta Yaratish',
    exportPdf: 'PDF Formatda Yuklash',
    saveJourney: 'Safarimni Saqlash',
    savedJourneySuccess: 'Safar muvaffaqiyatli saqlandi!',
    budgetCalculatorTitle: 'Aqlli Byudjet Taqsimoti',
    mapViewTitle: 'Interaktiv Safar Xaritasi',
    morning: 'Ertalab',
    afternoon: 'Tushdan so‘ng',
    evening: 'Kechqurun',
    transportation: 'Transport va Logistika',
    culinaryHighlight: 'Milliy Taom Tavsiyasi',
    verifiedBadge: 'Tasdiqlangan Maskani',
    aiBadge: 'AI Tavsiyasi',
    demoNotice: 'Jonli Xakaton Demo Rejimi • Gemini AI Tayyor',

    // Assistant
    assistantTitle: 'AVELORA AI Sayohat Konsyerji',
    assistantSubtitle: 'O‘zbekiston sayohati, narxlar va urf-odatlar haqida so‘rang',
    askPlaceholder: 'Tarixiy maskanlar, taomlar va byudjet haqida so‘rang...',
    send: 'Yuborish',
    suggestedQueries: 'Tavsiya etilgan savollar:',
    
    // Demo Journey banner
    demoBannerTitle: 'Xakaton Jonli Namunasi',
    demoBannerDesc: 'Toshkent, Samarqand va Buxoro bo‘ylab 5 kunlik mukammal sayohat.',
    demoBannerCTA: 'Demo Safarni Ochish',
  }
};

