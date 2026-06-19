'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations.en);
  const [isClient, setIsClient] = useState(false);

  // Update the HTML lang attribute whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);
    
    // Load language preference from localStorage if available
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
        setT(translations[savedLanguage]);
      } else {
        // Set the initial HTML lang attribute
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language;
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      setT(translations[lang]);
      
      try {
        localStorage.setItem('language', lang);
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, isClient }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 