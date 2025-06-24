
import { useContext } from 'react';
import { LanguageContext, Language } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  
  // The t function, language, and setLanguage are now directly from the context.
  // The context handles loading and providing translations.
  return { 
    t: context.t, 
    setLanguage: context.setLanguage, 
    currentLanguage: context.language,
    isLoadingTranslations: context.isLoadingTranslations 
  };
};
