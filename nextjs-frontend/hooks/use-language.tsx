'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LanguageCode, DEFAULT_LANGUAGE } from '@/lib/translations';

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Check if there's a language preference in localStorage
    const storedLanguage = localStorage.getItem('language') as LanguageCode | null;
    
    if (storedLanguage && isLanguageCode(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Helper function to type guard language code
  const isLanguageCode = (code: string): code is LanguageCode => {
    return ['id', 'en'].includes(code);
  };

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};