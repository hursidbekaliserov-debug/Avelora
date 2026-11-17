'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Currency } from './types';
import { TRANSLATIONS } from './i18n';
import { formatPrice, convertPrice } from './currency';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
  formatMoney: (amountUSD: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('avelora_lang') as Language;
      if (storedLang && ['en', 'ru', 'uz'].includes(storedLang)) {
        setLangState(storedLang);
      }
      const storedCurr = localStorage.getItem('avelora_currency') as Currency;
      if (storedCurr && ['USD', 'EUR', 'UZS', 'GBP'].includes(storedCurr)) {
        setCurrencyState(storedCurr);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('avelora_lang', newLang);
    } catch (e) {}
  };

  const setCurrency = (newCurr: Currency) => {
    setCurrencyState(newCurr);
    try {
      localStorage.setItem('avelora_currency', newCurr);
    } catch (e) {}
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const formatMoney = (amountUSD: number): string => {
    return formatPrice(amountUSD, currency);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, setCurrency, t, formatMoney }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

