// context/LanguageContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n, { changeLanguage, loadSavedLanguage } from "../i18n";

interface LanguageContextType {
  locale: string;
  setLanguage: (lang: "ko" | "en" | "zh") => Promise<void>;
}

// i18n.locale 이 undefined 일 수 있으므로 안전하게 디폴트값 "ko" 보장
const initialLocale = i18n?.locale || "en";

const LanguageContext = createContext<LanguageContextType>({
  locale: initialLocale,
  setLanguage: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>(initialLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSavedLanguage().then(() => setLocale(i18n.locale));
    setReady(true);
  }, []);
  if (!ready) return null;
  const setLanguage = async (lang: "ko" | "en" | "zh") => {
    try {
      if (typeof changeLanguage === "function") {
        await changeLanguage(lang);
      }
      setLocale(lang);
    } catch (error) {
      console.warn("Language change failed:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
