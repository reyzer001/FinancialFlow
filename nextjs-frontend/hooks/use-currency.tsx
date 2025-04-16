'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CurrencyCode, DEFAULT_CURRENCY } from '@/lib/utils';

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    // Check if there's a currency preference in localStorage
    const storedCurrency = localStorage.getItem('currency') as CurrencyCode | null;
    
    if (storedCurrency && isCurrencyCode(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  // Helper function to type guard currency code
  const isCurrencyCode = (code: string): code is CurrencyCode => {
    return ['IDR', 'USD', 'EUR', 'SGD', 'JPY', 'CNY', 'MYR'].includes(code);
  };

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  
  return context;
};