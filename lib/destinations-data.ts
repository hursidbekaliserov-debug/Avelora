import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'samarkand',
    slug: 'samarkand',
    name: 'Samarkand',
    country: 'Uzbekistan',
    region: 'Samarkand Region',
    tag: 'Crossroads of Cultures',
    rating: 4.95,
    reviewsCount: 1240,
    image: '/images/destinations/samarkand.jpg',
    bannerImage: '/images/destinations/samarkand.jpg',
    description: 'The celestial jewel of the Silk Road, adorned with majestic turquoise domes, azure mosaics, and timeless Timurid architecture.',
    longDescription: 'Founded in the 7th century BC as ancient Afrasiab, Samarkand is one of Central Asia’s oldest continuously inhabited cities. As the capital of Amir Timur’s vast empire, it blossomed into an architectural epicenter where master craftsmen from across Asia and the Middle East constructed monumental madrasahs, soaring minarets, and shimmering tilework that left Marco Polo and Ibn Battuta spellbound.',
    highlights: ['Registan Square', 'Shah-i Zinda Necropolis', 'Gur-e-Amir Mausoleum', 'Bibi-Khanym Mosque', 'Siab Bazaar', 'Konigil Meros Paper Mill'],
    bestSeason: 'April – June & September – November',
    idealDays: '2 - 3 Days',
    coordinates: { lat: 39.6542, lng: 66.9597 },
    verified: true,
    facts: [
      'UNESCO World Heritage Site designated as "Crossroads of Cultures".',
      'The Ulugbek Observatory was the foremost astronomical research center in the 15th-century Islamic world.',
      'Konigil mill preserves the 8th-century Chinese mulberry bark papermaking technique that made Samarkand paper renowned across Europe.'
    ],
    localGems: [
      'Evening illuminated spectacle at Registan Square at 20:30.',
      'Tasting authentic Samarkand plov at Osh Markazi (served fresh at 11:45 AM).',
      'Tea and dried figs under the grapevine trellis at Chaykhana Bibikhanum.'
    ],
    sampleItineraryIdea: 'Start at dawn at Gur-e-Amir, witness golden hour at Shah-i Zinda, and conclude with dinner overlooking illuminated Registan.',
    topAttractions: [
      { name: 'Registan Square', description: 'Trio of monumental 15th–17th century madrasahs tiled in lapis lazuli and gold leaf.', coordinates: { lat: 39.6547, lng: 66.9758 } },
      { name: 'Shah-i Zinda', description: 'Breathtaking avenue of 20+ turquoise-domed royal mausoleums.', coordinates: { lat: 39.6631, lng: 66.9878 } },
      { name: 'Gur-e-Amir', description: 'Fluted turquoise dome tomb of Amir Timur and Ulugbek.', coordinates: { lat: 39.6483, lng: 66.9686 } },
      { name: 'Siab Bazaar', description: 'Centuries-old trade hub famous for Samarkand non bread, halva, and almonds.', coordinates: { lat: 39.6617, lng: 66.9794 } }
    ]
  },
  {
    id: 'bukhara',
    slug: 'bukhara',
    name: 'Bukhara',
    country: 'Uzbekistan',
    region: 'Bukhara Region',
    tag: 'Living Silk Road Museum',
    rating: 4.92,
    reviewsCount: 980,
    image: '/images/destinations/bukhara.jpg',
    bannerImage: '/images/destinations/bukhara.jpg',
    description: 'An open-air museum of Islamic civilization boasting over 140 preserved architectural monuments and domed trading bazaars.',
    longDescription: 'Bukhara is among Central Asia’s most holy and storied cities, retaining its original medieval urban fabric almost intact. Stroll through pedestrianized clay-brick alleyways between 16th-century trading domes (Taqi Zargaran, Taqi Sarrofan), sip saffron green tea beside the Lyabi-Hauz pond, and stand humbled before the Kalyan Minaret, so staggering that Genghis Khan spared it from destruction in 1220.',
    highlights: ['Po-i Kalyan Ensemble', 'Ark of Bukhara Fortress', 'Lyabi-Hauz Pool & Chaykhana', 'Chor Minor', 'Bolo Hauz Mosque', 'Bozori Kord Hammam'],
    bestSeason: 'March – May & September – October',
    idealDays: '2 - 3 Days',
    coordinates: { lat: 39.7747, lng: 64.4286 },
    verified: true,
    facts: [
      'Home to the Kalyan Minaret (46m high), which served as an orientation beacon for desert caravans.',
      'The 10th-century Samanid Mausoleum is the oldest surviving monument of Islamic architecture in Central Asia.',
      'Bukhara produced renowned polymaths including Avicenna (Ibn Sina) and Imam al-Bukhari.'
    ],
    localGems: [
      'Unwind at the 16th-century Bozori Kord underground bathhouse with herbal massage.',
      'Suzani embroidery masterclass with fifth-generation artisan families in the old Jewish quarter.',
      'Sunset tea atop Chasmai Mirob terrace with panoramic view of Po-i Kalyan.'
    ],
    sampleItineraryIdea: 'Morning walk in the Ark Fortress, afternoon bargaining under domed bazaars, evening spiced tea beside Lyabi-Hauz.',
    topAttractions: [
      { name: 'Po-i Kalyan Complex', description: 'Magnificent minaret and turquoise-domed Friday mosque.', coordinates: { lat: 39.7758, lng: 64.4150 } },
      { name: 'Ark Fortress', description: 'Massive 5th-century citadel once housing the Emir of Bukhara.', coordinates: { lat: 39.7778, lng: 64.4108 } },
      { name: 'Lyabi-Hauz', description: 'Historic reflecting pool shaded by centuries-old mulberry trees.', coordinates: { lat: 39.7731, lng: 64.4206 } },
      { name: 'Chor Minor', description: 'Quirky four-towered gatehouse adorned with distinct ceramic crowns.', coordinates: { lat: 39.7749, lng: 64.4278 } }
    ]
  },
  {
    id: 'khiva',
    slug: 'khiva',
    name: 'Khiva',
    country: 'Uzbekistan',
    region: 'Khorezm Region',
    tag: 'Walled Desert Fortress',
    rating: 4.89,
    reviewsCount: 760,
    image: '/images/destinations/khiva.jpg',
    bannerImage: '/images/destinations/khiva.jpg',
    description: 'An untouched fairytale citadel surrounded by monumental mud-brick battlements rising out of the Karakum desert.',
    longDescription: 'Khiva’s UNESCO-listed inner town, Ichan Kala, is the most complete preserved ancient walled city in Central Asia. Enclosed within 10-meter-high crenelated ramparts, you enter a pedestrian maze of carved wooden columns, turquoise-glazed minarets, and royal harems where time has stood motionless for three centuries.',
    highlights: ['Ichan Kala Walled City', 'Kalta Minor Turquoise Minaret', 'Juma Mosque with 218 carved wood pillars', 'Tash Khauli Palace', 'Islam Khodja Minaret'],
    bestSeason: 'April – June & September – October',
    idealDays: '1 - 2 Days',
    coordinates: { lat: 41.3783, lng: 60.3639 },
    verified: true,
    facts: [
      'First site in Uzbekistan to be inscribed on the UNESCO World Heritage list (1990).',
      'The Kalta Minor minaret was planned to be the tallest in Central Asia (70m), but stopped at 29m.',
      'Muhammad ibn Musa al-Khwarizmi, father of algebra and the namesake of "algorithm", was born here in 780 AD.'
    ],
    localGems: [
      'Climb the watchtower at Kuhna Ark fortress at sunset for panoramic vistas of mud-brick rooftops.',
      'Savor Khorezmian green noodles (Shivit Oshi) and egg dumplings (Tukhum Barak) at Khorezm Art Restaurant.',
      'Listen to live folklore performance with Dutar instrument inside a restored caravanserai.'
    ],
    sampleItineraryIdea: 'Sunrise stroll inside empty Ichan Kala streets, morning artisan wood carving visits, sunset over Kalta Minor.',
    topAttractions: [
      { name: 'Ichan Kala', description: 'Fully enclosed ancient mud-brick citadel with 50+ historic monuments.', coordinates: { lat: 41.3783, lng: 60.3639 } },
      { name: 'Kalta Minor Minaret', description: 'Iconic turquoise tiled fat minaret covered in intricate arabesque motifs.', coordinates: { lat: 41.3776, lng: 60.3582 } },
      { name: 'Juma Mosque', description: 'Hypostyle 10th-century mosque with 218 uniquely hand-carved elm columns.', coordinates: { lat: 41.3781, lng: 60.3601 } }
    ]
  },
  {
    id: 'tashkent',
    slug: 'tashkent',
    name: 'Tashkent',
    country: 'Uzbekistan',
    region: 'Tashkent City',
    tag: 'Dynamic Metropolitan Heart',
    rating: 4.84,
    reviewsCount: 1100,
    image: '/images/destinations/tashkent.jpg',
    bannerImage: '/images/destinations/tashkent.jpg',
    description: 'A vibrant metropolis blending avant-garde Soviet brutalist landmarks, tree-lined boulevards, and opulent underground metro palaces.',
    longDescription: 'Uzbekistan’s progressive modern capital is the cultural and technological hub of Central Asia. Here, modern high-tech hubs and Michelin-caliber dining live in harmony with the historic Old City (Eski Shahar), where the world’s oldest Uthman Quran is enshrined in the Khazrati Imam Complex and Chorsu Bazaar pulsates with spices and fresh tandir bread.',
    highlights: ['Chorsu Bazaar Huge Turquoise Dome', 'Khazrati Imam Complex (Uthman Quran)', 'Tashkent Metro Art Stations (Kosmonavtlar, Alisher Navoi)', 'Amir Timur Square', 'State Museum of Applied Arts'],
    bestSeason: 'Year-Round (Best: April – May, September – November)',
    idealDays: '2 Days',
    coordinates: { lat: 41.2995, lng: 69.2401 },
    verified: true,
    facts: [
      'The Tashkent Metro is Central Asia’s first rapid transit system, famous for museum-like subterranean stations.',
      'Enshrines the 7th-century Holy Quran of Caliph Uthman, written on deerskin parchment.',
      'One of the greenest capitals in Eurasia, with over 35 square meters of green public space per inhabitant.'
    ],
    localGems: [
      'Ride the subway to Kosmonavtlar station honoring Yuri Gagarin and Valentina Tereshkova.',
      'Sip artisan freshly brewed specialty coffee in the artistic Yakkasaray quarter.',
      'Order steaming lamb naryn and horse meat sausages inside Chorsu’s open-air food pavilion.'
    ],
    sampleItineraryIdea: 'Morning spiritual tranquility at Hazrati Imam, midday foodie expedition at Chorsu, afternoon metro architecture tour.',
    topAttractions: [
      { name: 'Khazrati Imam Complex', description: 'Spiritual center containing the world-famous 7th-century Uthman Quran.', coordinates: { lat: 41.3364, lng: 69.2408 } },
      { name: 'Chorsu Bazaar', description: 'Giant blue-domed traditional marketplace overflowing with dried fruits and spices.', coordinates: { lat: 41.3273, lng: 69.2349 } },
      { name: 'Kosmonavtlar Metro', description: 'Futuristic blue and teal ceramic subway station themed around space exploration.', coordinates: { lat: 41.3069, lng: 69.2625 } }
    ]
  },
  {
    id: 'amirsoy',
    slug: 'amirsoy',
    name: 'Amirsoy',
    country: 'Uzbekistan',
    region: 'Tashkent Mountain Region',
    tag: 'Premier Mountain Resort of the Tian Shan',
    rating: 4.88,
    reviewsCount: 650,
    image: '/images/destinations/amirsoy.jpg',
    bannerImage: '/images/destinations/amirsoy.jpg',
    description: 'Crisp alpine air, snow-capped peaks, high-end mountain chalets, and turquoise Charvak reservoir just 80 minutes from Tashkent.',
    longDescription: 'Located in the Chatkal Range of the Western Tian Shan (a UNESCO Natural World Heritage site), the state-of-the-art Amirsoy Mountain Resort offers year-round world-class recreation. From world-class powder skiing and heated gondolas in winter to paragliding, horseback treks, and azure alpine lake sailing in summer.',
    highlights: ['Amirsoy Mountain Luxury Resort', 'Doppelmayr Gondola Lift (2,290m)', 'Charvak Turquoise Reservoir', 'Gulkam Canyons', 'Alpine Chalet Retreats'],
    bestSeason: 'December – March (Skiing) & May – October (Hiking & Mountain Panorama)',
    idealDays: '1 - 2 Days',
    coordinates: { lat: 41.4880, lng: 70.0400 },
    verified: true,
    facts: [
      'Amirsoy features modern Austrian Doppelmayr gondola lifts climbing to 2,290m altitude.',
      'Part of the Western Tian Shan UNESCO World Heritage natural biosphere.',
      'Charvak Lake holds over 2 billion cubic meters of pristine glacier meltwater.'
    ],
    localGems: [
      'Fondue and herb tea at the 2,290-meter Amirsoy peak terrace overlooking snowy peaks.',
      'Chartering a speedboat across Charvak’s crystal turquoise waters.',
      'Petroglyphs and walnut groves of Hodjikent dating back 4,000 years.'
    ],
    sampleItineraryIdea: 'Morning cable car ride to 2,290m, alpine lunch at Amirsoy, afternoon lakeside sunset at Charvak.',
    topAttractions: [
      { name: 'Amirsoy Resort', description: 'Premier 5-star mountain resort with gondola cabins and luxury alpine chalets.', coordinates: { lat: 41.4880, lng: 70.0400 } },
      { name: 'Charvak Reservoir', description: 'Huge turquoise mountain lake ideal for swimming, jet-skiing, and lakeside relaxation.', coordinates: { lat: 41.6322, lng: 70.0494 } },
      { name: 'Chimgan Valley', description: 'Scenic mountain valley with wildflower meadows and horseback riding trails.', coordinates: { lat: 41.5204, lng: 70.0215 } }
    ]
  },
  {
    id: 'shahrisabz',
    slug: 'shahrisabz',
    name: 'Shahrisabz',
    country: 'Uzbekistan',
    region: 'Kashkadarya Region',
    tag: 'Birthplace of Tamerlane',
    rating: 4.81,
    reviewsCount: 420,
    image: '/images/destinations/shahrisabz.jpg',
    bannerImage: '/images/destinations/shahrisabz.jpg',
    description: 'The monumental cradle of the Timurid dynasty, boasting the titanic remains of Ak-Saray Palace and verdant garden orchards.',
    longDescription: 'Known as the "Green City" south of the Zarafshan mountain pass, Shahrisabz was Amir Timur’s birthplace. Determined to make it rival Samarkand, he erected the Ak-Saray ("White Palace") with soaring 65-meter pylons emblazoned with the inscription: "If you challenge our might, look upon our monuments."',
    highlights: ['Ak-Saray Palace Ruins', 'Dorus Saodat Memorial Complex', 'Kok Gumbaz Blue Mosque', 'Amir Timur Crypt', 'Takhtakaracha Mountain Pass'],
    bestSeason: 'April – June & September – October',
    idealDays: '1 Day',
    coordinates: { lat: 39.0526, lng: 66.8306 },
    verified: true,
    facts: [
      'Amir Timur’s planned underground white marble crypt was discovered by chance in 1943.',
      'Connected to Samarkand through the scenic Takhtakaracha pass with stunning panoramic mountain vistas.',
      'The Ak-Saray mosaic towers took 24 years to complete.'
    ],
    localGems: [
      'Stop at the mountain pass for sizzling lamb tandoor kebab roasted on juniper branches (Tandir Go‘sht).',
      'Meet local women creating fine silk carpet tapestries in small family courtyards.',
      'Evening illuminated walk in the renovated Amir Timur memorial park.'
    ],
    sampleItineraryIdea: 'Day excursion from Samarkand via Takhtakaracha pass, mountain tandoor lunch, Ak-Saray palace exploration.',
    topAttractions: [
      { name: 'Ak-Saray Palace', description: 'Colossal remnants of Timur’s palace archway lined in deep blue mosaic.', coordinates: { lat: 39.0592, lng: 66.8317 } },
      { name: 'Kok Gumbaz', description: 'Friday Mosque with an enormous turquoise dome built by Ulugbek.', coordinates: { lat: 39.0494, lng: 66.8294 } }
    ]
  },
  {
    id: 'fergana',
    slug: 'fergana',
    name: 'Fergana',
    country: 'Uzbekistan',
    region: 'Fergana Valley',
    tag: 'Cradle of Silk & Craft Masters',
    rating: 4.86,
    reviewsCount: 390,
    image: '/images/destinations/fergana.jpg',
    bannerImage: '/images/destinations/fergana.jpg',
    description: 'The fertile craft valley where fifth-generation artisans hand-weave shimmering Khan-Atlas silks and shape legendary ceramics.',
    longDescription: 'Sheltered by the Tian Shan and Alay mountain ranges, the Fergana Valley has been Central Asia’s premier center of crafts and agriculture since the days of the Han Dynasty. In Margilan, witness the mesmerizing process of extracting natural silk threads from silkworm cocoons and hand-weaving intricate Ikat patterns at the historic Yodgorlik Silk Factory.',
    highlights: ['Yodgorlik Silk Mill in Margilan', 'Al-Fergani Monument & Garden', 'Khudayar Khan Palace in Kokand', 'Chust Handcrafted Knives (Pichoq)', 'Kumtepa Sunday Silk Bazaar'],
    bestSeason: 'April – June & September – October',
    idealDays: '2 - 3 Days',
    coordinates: { lat: 40.3842, lng: 71.7843 },
    verified: true,
    facts: [
      'Home to the monumental statue of Ahmad al-Fergani (Alfraganus), the 9th-century astronomer who calculated the earth’s diameter.',
      'Margilan has maintained unbroken manual silk-weaving traditions since the 10th century AD.',
      'The Palace of Khudayar Khan in Kokand contained 119 rooms and 7 inner courtyards.'
    ],
    localGems: [
      'Stroll through the Al-Fergani park colonnade and historic avenues.',
      'Taste Devzira red rice plov cooked over open apricot wood in Margilan teahouses.',
      'Morning bargaining for hand-spun pure silk scarves directly from weavers at Kumtepa bazaar.'
    ],
    sampleItineraryIdea: 'Day 1 Kokand palace and Chust artisan knives; Day 2 Margilan silk factory tour and Fergana city promenade.',
    topAttractions: [
      { name: 'Al-Fergani Monument', description: 'Grand white colonnade and statue honoring 9th-century polymath Ahmad al-Fergani.', coordinates: { lat: 40.3842, lng: 71.7843 } },
      { name: 'Yodgorlik Silk Factory', description: 'Traditional manual silk workshop demonstrating complete silkworm-to-ikat silk weaving.', coordinates: { lat: 40.4722, lng: 71.7180 } },
      { name: 'Khudayar Khan Palace', description: 'Ornate 19th-century residence of the last ruler of the Kokand Khanate.', coordinates: { lat: 40.5361, lng: 70.9392 } }
    ]
  },
  {
    id: 'zaamin',
    slug: 'zaamin',
    name: 'Zaamin',
    country: 'Uzbekistan',
    region: 'Jizzakh Region',
    tag: 'Uzbekistan’s Alpine Switzerland',
    rating: 4.87,
    reviewsCount: 310,
    image: '/images/destinations/zaamin.jpg',
    bannerImage: '/images/destinations/zaamin.jpg',
    description: 'Emerald alpine fir forests, crisp mountain air at 2,500 meters altitude, deep canyons, and state-of-the-art mountain wellness retreats.',
    longDescription: 'Spanning the northern slopes of the Turkestan mountain range, Zaamin National Park is celebrated as the "Uzbek Switzerland". With mountain elevations ranging from 1,760 to 3,500 meters, this pristine reserve is blanketed by ancient relic juniper forests, crystal-clear rushing streams, and striking red stone canyons. A state-of-the-art glass suspension bridge and modern cable car now connect travelers to panoramic mountain vistas.',
    highlights: ['Zaamin Coniferous Reserve', 'Glass Mountain Suspension Bridge', 'Chortangi Canyon', 'Historic 1,000-year-old Bobo-Yong‘oq Walnut Tree', 'Alpine Honey Tasting'],
    bestSeason: 'May – October (Hiking) & January – March (Snow Landscapes)',
    idealDays: '2 Days',
    coordinates: { lat: 39.6367, lng: 68.4983 },
    verified: true,
    facts: [
      'Home to the oldest national nature park in Central Asia, established in 1976.',
      'Features high-altitude juniper forests that naturally purify the air, making it a world-renowned climatotherapy center.',
      'The new glass suspension bridge spans 305 meters across a sheer 150-meter-deep canyon.'
    ],
    localGems: [
      'Sample famous Zaamin tandoor lamb roasted slowly inside underground clay ovens with fragrant juniper branches.',
      'Taste pure wild mountain herb honey directly from local high-altitude apiaries.',
      'Dawn stroll along the Chortangi gorge with mountain eagle watching.'
    ],
    sampleItineraryIdea: 'Morning hike through the juniper groves, midday walk across the glass skybridge, sunset herbal tea at the alpine resort.',
    topAttractions: [
      { name: 'Zaamin Glass Bridge', description: 'Spectacular pedestrian glass suspension bridge spanning over a breathtaking 150m mountain gorge.', coordinates: { lat: 39.6380, lng: 68.5120 } },
      { name: 'Chortangi Gorge', description: 'Dramatic red sandstone canyon carved by glacier melt streams.', coordinates: { lat: 39.6150, lng: 68.4800 } }
    ]
  },
  {
    id: 'termez',
    slug: 'termez',
    name: 'Termez',
    country: 'Uzbekistan',
    region: 'Surkhandarya Region',
    tag: 'Ancient Greco-Bactrian & Buddhist Heartland',
    rating: 4.83,
    reviewsCount: 280,
    image: '/images/destinations/termez.jpg',
    bannerImage: '/images/destinations/termez.jpg',
    description: 'Uzbekistan’s southernmost ancient city where Hellenistic Greek, Buddhist Kushan, and Islamic civilizations converged along the Oxus River.',
    longDescription: 'Situated directly on the bank of the legendary Amu Darya (Oxus) River, Termez is an unparalleled archaeological treasure trove. As the focal point of the Kushan Empire, it served as the gateway through which Buddhism traveled from India into China and East Asia. Discover monumental 2,000-year-old Buddhist stupas, cave monasteries cut into sandstone cliffs, and the mysterious multi-room fortress of Kirk Kiz.',
    highlights: ['Fayaz Tepe Buddhist Monastery', 'Kara Tepe Cave Complex', 'Zurmala 1st-Century Stupa', 'Kirk Kiz Fortress (Forty Maidens)', 'Sultan Saodat Necropolis', 'Termez Archaeological Museum'],
    bestSeason: 'March – May & September – November',
    idealDays: '2 Days',
    coordinates: { lat: 37.2286, lng: 67.2753 },
    verified: true,
    facts: [
      'Fayaz Tepe contains a 3rd-century alabaster Buddha statue now housed in the State History Museum.',
      'The Zurmala stupa was once 34 meters high and served as a giant landmark for Silk Road caravans.',
      'Alexander the Great passed through Termez in 329 BC, founding ancient settlements along the Oxus.'
    ],
    localGems: [
      'Visit the holy shrine and monument of 9th-century Sufi scholar Al-Hakim at-Termizi.',
      'Savor Surkhandarya Tandir Kabob seasoned exclusively with mountain salt and dried coriander.',
      'Inspect Greco-Bactrian gold jewelry and coins at the premier Termez Archaeological Museum.'
    ],
    sampleItineraryIdea: 'Morning archaeological tour at Fayaz Tepe and Zurmala stupa, afternoon visit to Kirk Kiz fortress, sunset by the Amu Darya river.',
    topAttractions: [
      { name: 'Al-Hakim at-Termizi Monument', description: 'Majestic memorial and golden statue complex dedicated to the revered Silk Road scholar.', coordinates: { lat: 37.2833, lng: 67.1833 } },
      { name: 'Kirk Kiz Fortress', description: 'Evocative 9th-century mud-brick palace fortress shrouded in legends of forty warrior maidens.', coordinates: { lat: 37.2611, lng: 67.3167 } }
    ]
  }
];

