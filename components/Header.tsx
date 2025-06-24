
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t, setLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (langString: string) => {
    // Ensure the string is a valid Language type
    const lang = langString as Language;
    if (['en', 'ko', 'ja'].includes(lang)) {
        setLanguage(lang);
    } else {
        console.warn("Attempted to set an invalid language:", langString);
    }
  };

  return (
    <header className="bg-gray-900 bg-opacity-50 shadow-lg backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {t('header.title')}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="appearance-none bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer pr-8"
              aria-label={t('header.language.selectLabel')}
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="ja">日本語</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
