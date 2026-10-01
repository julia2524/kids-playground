import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 💡 JSON 파일들 불러오기
import ko from "./locales/ko.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

// 1. 번역 문구 등록
const translations = { ko, en, zh };

// 2. i18n 객체 생성
const i18n = new I18n(translations);

// 3. 기기 언어 감지
const deviceLanguage = getLocales()[0]?.languageCode;

// 4. 기본 언어 설정 (기기 언어 우선 적용)
i18n.locale = deviceLanguage ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// ==========================================
// 💡 [추가 1] 저장된 언어 불러오기 (앱 시작 시 호출)
// ==========================================
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user_language");
    if (savedLanguage) {
      i18n.locale = savedLanguage; // 저장된 언어가 있으면 해당 언어로 교체
    }
  } catch (e) {
    console.error("Failed to load saved language", e);
  }
};

// ==========================================
// 💡 [추가 2] 사용자가 수동으로 언어를 변경할 때 호출
// ==========================================
export const changeLanguage = async (lang: "ko" | "en" | "zh") => {
  try {
    i18n.locale = lang;
    await AsyncStorage.setItem("user_language", lang); // 선택한 언어 기기에 저장
  } catch (e) {
    console.error("Failed to save language", e);
  }
};

export default i18n;
