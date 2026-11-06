// context/LanguageContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import i18n, {
  changeLanguage,
  loadSavedLanguage,
  SupportedLanguage,
} from "../i18n"; // 👈 SupportedLanguage 추가

interface LanguageContextType {
  locale: string;
  setLanguage: (lang: SupportedLanguage) => Promise<void>; // 👈 38개 언어 타입 지원
}

const initialLocale = i18n?.locale || "en";

const LanguageContext = createContext<LanguageContextType>({
  locale: initialLocale,
  setLanguage: async () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<string>(initialLocale);
  const [ready, setReady] = useState(false);

  // 💡 앱이 처음 켜질 때 저장된 언어 불러오기 유지
  useEffect(() => {
    loadSavedLanguage().then(() => {
      setLocale(i18n.locale);
      setReady(true);
    });
  }, []);

  // 로딩되는 동안 빈 화면 방지
  if (!ready) return null;

  const setLanguage = async (lang: SupportedLanguage) => {
    try {
      await changeLanguage(lang);
      setLocale(lang); // 전역 상태 변경 -> 하위 컴포넌트 자동 리렌더링
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
