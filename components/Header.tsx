
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
        <div className="flex items-center space-x-4">
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
          <a 
            href="https://github.com/google/generative-ai-docs/tree/main/site/en/ai_studio/docs/tool_gallery/plugins/game_item_analyzer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors duration-150"
            title={t('header.githubLinkTitle')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span className="sr-only">{t('header.githubLinkTitle')}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
