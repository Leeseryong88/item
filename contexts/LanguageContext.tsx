import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ko' | 'ja' | 'zh'; // Added 'ja' and 'zh'

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
  isLoadingTranslations: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const fetchTranslations = async (lang: Language): Promise<Translations> => {
  const path = `/locales/${lang}.json`; // Use absolute path from public root
  console.log(`Fetching translations for ${lang} from ${path}`);
  try {
    const response = await fetch(path);
    console.log(`Response status for ${lang}.json: ${response.status} ${response.statusText}`);
    if (!response.ok) {
      console.error(`Failed to load ${lang}.json. Status: ${response.status}. Response body (if any):`, await response.text().catch(() => 'Could not read response text'));
      throw new Error(`Failed to load ${lang}.json: ${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    console.log(`Successfully fetched and parsed translations for ${lang}.`); // Avoid logging potentially large data object
    return data;
  } catch (error) {
    console.error(`Error fetching or parsing translations for ${lang} from ${path}:`, error);
    return {}; // Return empty object on error to prevent app crash
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('appLanguage') as Language : null;
    const validLanguages: Language[] = ['en', 'ko', 'ja', 'zh'];
    return storedLang && validLanguages.includes(storedLang) ? storedLang : 'ko';
  });
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoadingTranslations, setIsLoadingTranslations] = useState<boolean>(true);

  const loadTranslations = useCallback(async (lang: Language) => {
    setIsLoadingTranslations(true);
    setTranslations({}); // Clear previous translations to ensure no stale data if next fetch fails partially
    const newTranslations = await fetchTranslations(lang);

    // Diagnostic log to check the content of what's about to be set
    if (newTranslations && Object.keys(newTranslations).length > 0) {
        // Log a specific, known key to see if its value matches the expected language
        const sampleKey = 'header.title';
        const sampleValue = newTranslations[sampleKey] || "SAMPLE_KEY_NOT_FOUND";
        console.log(`LanguageContext: Setting translations for language: "${lang}". Sample ("${sampleKey}"): "${sampleValue}"`);
    } else {
        console.log(`LanguageContext: Setting EMPTY translations for language: "${lang}". Fetch likely failed or newTranslations object is empty.`);
    }

    setTranslations(newTranslations);
    setIsLoadingTranslations(false);
    document.documentElement.lang = lang;
  }, []); // loadTranslations itself is stable as it doesn't depend on component scope variables that change

  useEffect(() => {
    loadTranslations(language);
  }, [language, loadTranslations]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('appLanguage', lang);
    }
  };

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    if (isLoadingTranslations && Object.keys(translations).length === 0) {
      return key;
    }

    if (Object.keys(translations).length === 0) {
      console.warn(`Translations for language "${language}" are empty (fetch might have failed or newTranslations empty). Key "${key}" requested. Returning key.`);
      return key;
    }

    // Directly access the translation using the full key, as JSON files are flat.
    const value = translations[key];
     
    if (value === undefined) {
      console.warn(`Key "${key}" not found in translations for language "${language}". Returning key.`);
      return key; 
    }

    // Ensure the found value is a string, not another object (which would indicate an incomplete key for nested structures, though not used here).
    if (typeof value === 'object' && value !== null) {
      console.warn(`Key "${key}" resolved to an object, not a string, for language "${language}". This is unexpected for flat JSON. Returning key.`);
      return key;
    }

    let strValue = String(value);

    if (params) {
      Object.keys(params).forEach(paramKey => {
        strValue = strValue.replace(new RegExp(`{${paramKey}}`, 'g'), String(params[paramKey]));
      });
    }
    return strValue;
  }, [translations, language, isLoadingTranslations]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, isLoadingTranslations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};