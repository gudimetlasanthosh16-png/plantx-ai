import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  type SupportedLanguage, 
  type PageContent, 
  LANGUAGE_OPTIONS, 
  TRANSLATIONS 
} from '../data/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: PageContent;
  isSpeaking: boolean;
  speak: (customText?: string) => void;
  stopSpeaking: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.English, [language]);

  // Clean up speech on unmount or language change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speak = (customText?: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking && !customText) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const selectedOpt = LANGUAGE_OPTIONS.find(o => o.code === language);
    const langCode = selectedOpt ? selectedOpt.langCode : 'en-US';
    const textToRead = customText || t.speechSummary;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = langCode;
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
      v.lang.toLowerCase().includes(langCode.toLowerCase()) || 
      v.lang.toLowerCase().includes(langCode.split('-')[0].toLowerCase())
    );
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isSpeaking, speak, stopSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

