import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'fr-FR' },
  USD: { code: 'USD', symbol: '$', name: 'Dollar US', locale: 'en-US' },
  FCFA: { code: 'FCFA', symbol: 'FCFA', name: 'Franc CFA', locale: 'fr-FR' },
  CAD: { code: 'CAD', symbol: '$ CA', name: 'Dollar Canadien', locale: 'fr-CA' },
  GBP: { code: 'GBP', symbol: '£', name: 'Livre Sterling', locale: 'en-GB' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse', locale: 'fr-CH' },
  MAD: { code: 'MAD', symbol: 'DH', name: 'Dirham Marocain', locale: 'fr-MA' },
};

export function formatMoney(
  amount: number,
  currency: CurrencyCode = 'EUR',
  decimals = 2
): string {
  const cfg = CURRENCIES[currency] || CURRENCIES.EUR;
  try {
    const formattedNum = new Intl.NumberFormat(cfg.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);

    if (currency === 'USD' || currency === 'GBP') {
      return `${cfg.symbol}${formattedNum}`;
    }
    return `${formattedNum} ${cfg.symbol}`;
  } catch {
    return `${amount.toFixed(decimals)} ${cfg.symbol}`;
  }
}

/**
 * High precision ticker format (e.g. 48.7294 €) for real-time live clocking
 */
export function formatLiveMoney(
  amount: number,
  currency: CurrencyCode = 'EUR'
): { whole: string; cents: string; micro: string; symbol: string } {
  const cfg = CURRENCIES[currency] || CURRENCIES.EUR;
  const fixed = amount.toFixed(4);
  const parts = fixed.split('.');
  const wholePart = parseInt(parts[0], 10) || 0;
  const decPart = parts[1] || '0000';

  const formattedWhole = new Intl.NumberFormat(cfg.locale).format(wholePart);
  const cents = decPart.substring(0, 2);
  const micro = decPart.substring(2, 4);

  return {
    whole: formattedWhole,
    cents,
    micro,
    symbol: cfg.symbol,
  };
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');
  if (hours > 0) {
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
  return `${pad(minutes)}m ${pad(seconds)}s`;
}

export function formatShortDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function formatMonthYear(year: number, month: number): string {
  try {
    const date = new Date(year, month - 1, 1);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return `${month}/${year}`;
  }
}
