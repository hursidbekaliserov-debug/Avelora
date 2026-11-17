import { Currency } from './types';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  USD: { rate: 1, symbol: '$', prefix: true },
  EUR: { rate: 0.92, symbol: '€', prefix: true },
  GBP: { rate: 0.79, symbol: '£', prefix: true },
  UZS: { rate: 12850, symbol: " so'm", prefix: false },
};

export function convertPrice(amountUSD: number, targetCurrency: Currency): number {
  const rate = CURRENCY_RATES[targetCurrency]?.rate || 1;
  const converted = amountUSD * rate;
  if (targetCurrency === 'UZS') {
    return Math.round(converted / 1000) * 1000;
  }
  return Math.round(converted);
}

export function formatPrice(amountUSD: number, targetCurrency: Currency = 'USD'): string {
  const meta = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;
  const value = convertPrice(amountUSD, targetCurrency);

  if (targetCurrency === 'UZS') {
    if (value >= 1_000_000) {
      const millions = (value / 1_000_000).toFixed(1).replace('.0', '');
      return `${millions} mln so'm`;
    }
    return `${value.toLocaleString('en-US')} so'm`;
  }

  const formattedNumber = value.toLocaleString('en-US');
  if (meta.prefix) {
    return `${meta.symbol}${formattedNumber}`;
  }
  return `${formattedNumber}${meta.symbol}`;
}

export function formatPriceFull(amountUSD: number, targetCurrency: Currency = 'USD'): string {
  const meta = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;
  const value = convertPrice(amountUSD, targetCurrency);
  const formattedNumber = value.toLocaleString('en-US');

  if (meta.prefix) {
    return `${meta.symbol}${formattedNumber}`;
  }
  return `${formattedNumber}${meta.symbol}`;
}
