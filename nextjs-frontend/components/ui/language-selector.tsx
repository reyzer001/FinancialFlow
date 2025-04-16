'use client';

import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { t, LanguageCode } from '@/lib/translations';

interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageOptions: LanguageOption[] = [
    {
      code: 'id',
      name: 'Bahasa Indonesia',
      flag: '🇮🇩',
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
    },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    closeDropdown();
  };

  const currentLanguage = languageOptions.find(option => option.code === language);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={t('common.select_language', language)}
      >
        <Languages className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
        <span className="font-medium">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                  language === option.code
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{option.flag}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}