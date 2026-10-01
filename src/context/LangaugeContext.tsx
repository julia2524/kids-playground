// context/LanguageContext.tsx
import React, { createContext, useContext, useState } from "react";
import i18n, { changeLanguage } from "../i18n";

interface LanguageContextType {
  locale: string;
  setLanguage: (lang: "ko" | "en" | "zh") => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: i18n.locale,
  setLanguage: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState(i18n.locale || "en");

  const setLanguage = async (lang: "ko" | "en" | "zh") => {
    await changeLanguage(lang);
    setLocale(lang); // 💡 전역 상태 변경 -> App 하위 모든 화면 자동 리렌더링!
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
