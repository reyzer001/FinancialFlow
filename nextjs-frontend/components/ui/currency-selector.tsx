'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/translations';
import { CurrencyCode, currencies } from '@/lib/utils';

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: CurrencyCode) => void;
  value?: CurrencyCode;
}

export function CurrencySelector({ 
  onCurrencyChange,
  value
}: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleCurrencyChange = (currencyCode: CurrencyCode) => {
    setCurrency(currencyCode);
    if (onCurrencyChange) {
      onCurrencyChange(currencyCode);
    }
    closeDropdown();
  };

  const currentValue = value || currency;
  const currencyOptions = Object.entries(currencies).map(([code, details]) => ({
    code: code as CurrencyCode,
    ...details
  }));

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={t('common.select_currency', language)}
      >
        <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
        <span className="font-medium">{currentValue}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {currencyOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleCurrencyChange(option.code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                  currentValue === option.code
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{option.symbol}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}