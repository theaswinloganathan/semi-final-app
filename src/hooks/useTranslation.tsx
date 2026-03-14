import { useState, createContext, useContext, type ReactNode } from 'react';
import { translations, type Language, type TranslationSchema } from '../services/translations';

interface TranslationContextType {
  lang: Language;
  t: TranslationSchema;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const value = {
    lang,
    t: translations[lang],
    setLanguage: (l: Language) => setLang(l)
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
