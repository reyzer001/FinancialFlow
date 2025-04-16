import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = 'IDR' | 'USD' | 'EUR' | 'SGD' | 'JPY' | 'CNY' | 'MYR';

interface CurrencyOption {
  code: CurrencyCode;
  locale: string;
  name: string;
  symbol: string;
  rate: number; // Rate against IDR (IDR is base 1.0)
  decimalDigits: number;
}

export const currencies: Record<CurrencyCode, CurrencyOption> = {
  IDR: {
    code: 'IDR',
    locale: 'id-ID',
    name: 'Rupiah Indonesia',
    symbol: 'Rp',
    rate: 1.0,
    decimalDigits: 0,
  },
  USD: {
    code: 'USD',
    locale: 'en-US',
    name: 'US Dollar',
    symbol: '$',
    rate: 0.000064, // 1 IDR = 0.000064 USD (or 1 USD = 15,625 IDR)
    decimalDigits: 2,
  },
  EUR: {
    code: 'EUR',
    locale: 'de-DE',
    name: 'Euro',
    symbol: '€',
    rate: 0.000059, // 1 IDR = 0.000059 EUR (or 1 EUR = 16,949 IDR)
    decimalDigits: 2,
  },
  SGD: {
    code: 'SGD',
    locale: 'en-SG',
    name: 'Singapore Dollar',
    symbol: 'S$',
    rate: 0.000086, // 1 IDR = 0.000086 SGD (or 1 SGD = 11,628 IDR)
    decimalDigits: 2,
  },
  JPY: {
    code: 'JPY',
    locale: 'ja-JP',
    name: 'Japanese Yen',
    symbol: '¥',
    rate: 0.0099, // 1 IDR = 0.0099 JPY (or 1 JPY = 101 IDR)
    decimalDigits: 0,
  },
  CNY: {
    code: 'CNY',
    locale: 'zh-CN',
    name: 'Chinese Yuan',
    symbol: '¥',
    rate: 0.00046, // 1 IDR = 0.00046 CNY (or 1 CNY = 2,174 IDR)
    decimalDigits: 2,
  },
  MYR: {
    code: 'MYR',
    locale: 'ms-MY',
    name: 'Malaysian Ringgit',
    symbol: 'RM',
    rate: 0.00030, // 1 IDR = 0.00030 MYR (or 1 MYR = 3,333 IDR)
    decimalDigits: 2,
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'IDR';

/**
 * Format a number as currency
 * @param amount Number to format
 * @param currencyCode Currency code to use for formatting
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY
): string {
  const currency = currencies[currencyCode];
  
  if (!currency) {
    return formatRupiah(amount); // Fallback to IDR
  }
  
  // Convert amount from IDR to target currency
  const convertedAmount = amount * currency.rate;
  
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currency.decimalDigits,
    maximumFractionDigits: currency.decimalDigits
  });
  
  return formatter.format(convertedAmount);
}

/**
 * Formats a number as Indonesian Rupiah
 * @param amount Number to format
 * @returns Formatted Rupiah string
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Converts an amount from one currency to another
 * @param amount The amount to convert
 * @param fromCurrency Source currency code
 * @param toCurrency Target currency code
 * @returns Converted amount
 */
export function convertCurrency(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number {
  const fromRate = currencies[fromCurrency]?.rate || 1;
  const toRate = currencies[toCurrency]?.rate || 1;
  
  // First convert to IDR (base currency)
  const amountInIDR = amount / fromRate;
  
  // Then convert to target currency
  return amountInIDR * toRate;
}

/**
 * Format a date with standard formatting
 */
export function formatDate(date: Date, locale: string = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Format a date with shorter formatting
 */
export function formatShortDate(date: Date, locale: string = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

/**
 * Get appropriate color for a status
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    completed: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    rejected: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    paid: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    unpaid: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    partial: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    shipped: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    delivered: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    cancelled: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    draft: 'text-gray-500 bg-gray-50 dark:bg-gray-800',
    active: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    inactive: 'text-gray-500 bg-gray-50 dark:bg-gray-800',
  };

  return statusMap[status.toLowerCase()] || 'text-gray-500 bg-gray-50 dark:bg-gray-800';
}