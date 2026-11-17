import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, userItinerary, language = 'en' } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    const userPrompt = messages[messages.length - 1]?.content || 'Hello';

    if (apiKey) {
      try {
        const systemInstruction = `
You are AVELORA's elite AI Travel Concierge for international visitors exploring Uzbekistan and the Silk Road.
You speak with elegance, warmth, and precision, resembling a high-end luxury hospitality director.

Context:
- Current active itinerary: ${userItinerary ? JSON.stringify(userItinerary).slice(0, 800) : 'None selected yet'}
- User's preferred language: ${language}

Rules:
1. Always respond in the requested language (${language === 'ru' ? 'Russian' : language === 'uz' ? 'Uzbek' : 'English'}).
2. Never invent non-existent businesses or fake prices. Give realistic cost estimates in USD and Uzbek So'm (approx 1 USD = 12,850 UZS).
3. If asked about budget, advise realistically (e.g. $400 for 5 days is viable with modest guesthouses and local trains, but $1,000+ provides high luxury).
4. Give specific cultural nuances (e.g., tea etiquette, Afrosiyob booking timelines, dress codes for holy sites).
5. Format your answers clearly using Markdown with tasteful bullet points and bold highlights. Keep answers concise, high-value, and elegant.
`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nUser Question: ${userPrompt}` }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply, source: 'gemini' });
          }
        }
      } catch (geminiError) {
        console.error('Gemini chat error:', geminiError);
      }
    }

    // High quality contextual fallback responses in EN, RU, UZ
    let fallbackReply = '';
    const qLower = userPrompt.toLowerCase();

    if (language === 'ru') {
      if (qLower.includes('бюджет') || qLower.includes('400') || qLower.includes('цен') || qLower.includes('стоимост')) {
        fallbackReply = `### Реалистичный расчет бюджета по Узбекистану

Путешествие по Узбекистану с бюджетом **$400 на человека (на 4-5 дней)** вполне осуществимо при грамотном планировании:

1. **Проживание ($120 - $160):** Уютные семейные бутик-гостевые дома в Бухаре и Самарканде с великолепными завтраками во внутренних двориках ($30–$40/ночь).
2. **Транспорт ($45 - $60):** Скоростной поезд «Афросиаб» эконом-класса между Ташкентом, Самаркандом и Бухарой ($12–$18 за билет).
3. **Питание ($80 - $100):** Настоящий плов в чайханах, свежая тандырная самса и ароматный зеленый чай ($5–$8 на человека за обед).
4. **Билеты в памятники ($50 - $70):** Площадь Регистан, Шахи-Зинда, Арк Бухары ($3–$6 за вход).

💡 *Совет AVELORA:* Рекомендуем бронировать билеты на поезд «Афросиаб» за 20–30 дней, так как они быстро раскупаются.`;
      } else if (qLower.includes('самарканд')) {
        fallbackReply = `### Главные сокровища Самарканда

В Самарканде обязательно посетите:
- **Площадь Регистан:** Три грандиозных медресе (Улугбек, Шер-Дор, Тилля-Кари) с позолоченными куполами.
- **Некрополь Шахи-Зинда:** Потрясающая аллея из 20+ бирюзовых мавзолеев династии Темуридов.
- **Гур-Эмир:** Усыпальница Амира Темура с резным нефритовым надгробием.
- **Бумажная мельница Конигил:** Водяная мельница, где возрождена технология создания шелковой бумаги VIII века.
- **Центр плова (Ош Маркази):** Самаркандский плов слоями, подается ровно в 11:45 утра.`;
      } else {
        fallbackReply = `Добро пожаловать в **AVELORA**. Я ваш персональный AI-консьерж по Узбекистану и Шелковому Пути. 

Я могу помочь вам:
- Составить индивидуальный план поездки под ваш темп и бюджет.
- Порекомендовать проверенных ремесленников (керамика Риштана, бухарское сюзане, самаркандская бумага).
- Найти аутентичные гастрономические точки в Ташкенте, Самарканде и Бухаре.

Задайте любой интересующий вас вопрос!`;
      }
    } else if (language === 'uz') {
      if (qLower.includes('samarqand')) {
        fallbackReply = `### Samarqandning Eng Mashhur Qadamjolari

Samarqandga safaringizda quyidagi maskanlarni ko'rishni tavsiya etamiz:
- **Registon Maydoni:** Ulug'bek, Sherdor va Tillakori madrasalarining mahobatli ansambli.
- **Shohi Zinda Majmuasi:** Firuza va lojuvard koshinlar bilan bezatilgan 20 dan ortiq maqbara xiyoboni.
- **Go'ri Amir:** Sohibqiron Amir Temurning muhtasham maqbarasi.
- **Konigil Meros:** VIII asr ipak qog'oz ishlab chiqarish an'analarini saqlab qolgan qadimiy tegirmon.
- **Samarqand Oshi:** Qat-qat tayyorlanadigan mashhur Samarqand palovini tatib ko'ring.`;
      } else {
        fallbackReply = `Assalomu alaykum! **AVELORA** AI Sayohat Konsyerjiga xush kelibsiz.

Men sizga:
- O'zbekiston bo'ylab shaxsiy sayohat rejasini tuzishda;
- Eng yaxshi milliy taomlar va choyxonalarni topishda;
- Tarixiy obidalar va tezyurar «Afrosiyob» poyezdi chiptalarini rejalashtirishda yordam bera olaman.

Savolingizni bering, sizga yordam berishdan mamnunman!`;
      }
    } else {
      if (qLower.includes('budget') || qLower.includes('400') || qLower.includes('cost') || qLower.includes('price')) {
        fallbackReply = `### Exploring Uzbekistan with a $400 Budget

Yes, **$400 for a 4–5 day journey** in Uzbekistan is entirely achievable and culturally rewarding when planned intelligently:

1. **Accommodation ($140 – $180):** Historic family guesthouses in Bukhara and Samarkand featuring courtyards and lavish Uzbek breakfasts ($30–$45/night).
2. **Intercity Transit ($40 – $55):** Economy tickets on the Afrosiyob bullet train or comfortable Sharq trains between Tashkent, Samarkand, and Bukhara ($10–$16 per segment).
3. **Dining & Gastronomy ($80 – $100):** Traditional plov at local chaykhanas, tandir somsa, fresh salads, and endless pots of green tea with dried fruits ($5–$8 per feast).
4. **Heritage Entrance Fees ($50 – $70):** Covers entry to Registan, Shah-i Zinda, Gur-e-Amir, and Ark of Bukhara.

💡 *AVELORA Concierge Tip:* Afrosiyob train tickets open 30–45 days ahead and sell out quickly. Booking early secures economy pricing without needing costly private taxis.`;
      } else if (qLower.includes('samarkand') || qLower.includes('places to visit')) {
        fallbackReply = `### Curated Samarkand Highlights for Discerning Travelers

- **Registan Square:** The defining monumental ensemble of Islamic architecture. Enter the Tilya-Kori mosque to witness its dome coated in pure gold leaf, and return at 20:30 for the night illumination.
- **Shah-i Zinda:** A breathtaking pedestrian avenue of 20+ turquoise-domed royal mausoleums dating from the 11th–15th centuries. Best photographed in morning light.
- **Gur-e-Amir:** The ribbed-dome tomb of conqueror Amir Timur, marked by an enormous jade tombstone.
- **Konigil Meros Watermill:** Situated 8km outside the center, where master artisans produce 2,000-year archival paper from mulberry bark.
- **Osh Markazi:** Samarkand plov is distinct from Tashkent plov — layered rather than mixed. Arrive at 11:45 AM before it sells out!`;
      } else {
        fallbackReply = `Welcome to **AVELORA**. I am your personal AI Travel Concierge for Uzbekistan and the Silk Road.

I can assist you with:
- Tailoring your daily itinerary to your preferred pace and travel party.
- Estimating transparent travel budgets across USD, EUR, and Uzbek So'm.
- Introducing verified local artisans, heritage guesthouses, and historic teahouses.
- Sharing cultural etiquette tips to enrich your journey.

How may I curate your Silk Road experience today?`;
      }
    }

    return NextResponse.json({
      reply: fallbackReply,
      source: 'concierge_knowledge_engine',
      notice: 'Operating with AVELORA Silk Road knowledge base. To activate full generative Gemini model, add GEMINI_API_KEY.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

