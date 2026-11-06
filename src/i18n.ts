// import { getLocales } from "expo-localization";
// import { I18n } from "i18n-js";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // 💡 JSON 파일들 불러오기
// import ko from "./locales/ko.json";
// import en from "./locales/en.json";
// import zhHans from "./locales/zh-Hans.json";

// // 1. 번역 문구 등록
// const translations = { ko, en, zhHans };

// // 2. i18n 객체 생성
// const i18n = new I18n(translations);

// // 3. 기기 언어 감지
// const deviceLanguage = getLocales()[0]?.languageCode;

// // 4. 기본 언어 설정 (기기 언어 우선 적용)
// i18n.locale = deviceLanguage ?? "en";
// i18n.enableFallback = true;
// i18n.defaultLocale = "en";

// // ==========================================
// // 💡 [추가 1] 저장된 언어 불러오기 (앱 시작 시 호출)
// // ==========================================
// export const loadSavedLanguage = async () => {
//   try {
//     const savedLanguage = await AsyncStorage.getItem("user_language");
//     if (savedLanguage) {
//       i18n.locale = savedLanguage; // 저장된 언어가 있으면 해당 언어로 교체
//     }
//   } catch (e) {
//     console.error("Failed to load saved language", e);
//   }
// };

// // ==========================================
// // 💡 [추가 2] 사용자가 수동으로 언어를 변경할 때 호출
// // ==========================================
// export const changeLanguage = async (lang: "ko" | "en" | "zhHans") => {
//   try {
//     i18n.locale = lang;
//     await AsyncStorage.setItem("user_language", lang); // 선택한 언어 기기에 저장
//   } catch (e) {
//     console.error("Failed to save language", e);
//   }
// };

// export default i18n;
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart"; // 👈 expo-updates 대신 react-native-restart 사용

// 1. 지원하는 38개 언어 태그 타입 정의
export type SupportedLanguage =
  | "ar"
  | "bn"
  | "zh-Hans"
  | "zh-Hant"
  | "nl"
  | "arz"
  | "en"
  | "fr"
  | "de"
  | "el"
  | "ha"
  | "hi"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "ms"
  | "mr"
  | "ne"
  | "pcm"
  | "fa-IR"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "es"
  | "sw"
  | "sv"
  | "tl"
  | "ta"
  | "te"
  | "th"
  | "tr"
  | "ur"
  | "vi"
  | "pnb"
  | "wuu"
  | "yue";

// 2. 38개 언어 JSON 파일 임포트
import ar from "./locales/ar.json";
import bn from "./locales/bn.json";
import zhHans from "./locales/zh-Hans.json";
import zhHant from "./locales/zh-Hant.json";
import nl from "./locales/nl.json";
import arz from "./locales/arz.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import el from "./locales/el.json";
import ha from "./locales/ha.json";
import hi from "./locales/hi.json";
import id from "./locales/id.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import ms from "./locales/ms.json";
import mr from "./locales/mr.json";
import ne from "./locales/ne.json";
import pcm from "./locales/pcm.json";
import faIR from "./locales/fa-IR.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";
import sw from "./locales/sw.json";
import sv from "./locales/sv.json";
import tl from "./locales/tl.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import th from "./locales/th.json";
import tr from "./locales/tr.json";
import ur from "./locales/ur.json";
import vi from "./locales/vi.json";
import pnb from "./locales/pnb.json";
import wuu from "./locales/wuu.json";
import yue from "./locales/yue.json";

// 3. i18n 번역 객체 전체 매핑
const translations: Record<SupportedLanguage, any> = {
  ar,
  bn,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  nl,
  arz,
  en,
  fr,
  de,
  el,
  ha,
  hi,
  id,
  it,
  ja,
  ko,
  ms,
  mr,
  ne,
  pcm,
  "fa-IR": faIR,
  pl,
  pt,
  ro,
  ru,
  es,
  sw,
  sv,
  tl,
  ta,
  te,
  th,
  tr,
  ur,
  vi,
  pnb,
  wuu,
  yue,
};

// 4. RTL(오른쪽에서 왼쪽으로 읽는) 언어 세트 목록
const RTL_LANGUAGES: Set<string> = new Set([
  "ar", // Arabic
  "arz", // Egyptian Arabic
  "fa-IR", // Persian (Iran)
  "ur", // Urdu
  "pnb", // Western Punjabi
]);

// 5. i18n 객체 생성 및 기본 설정
const i18n = new I18n(translations);
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// 6. 기기 언어 감지 및 표준화 적용
const deviceLocale =
  getLocales()[0]?.languageTag || getLocales()[0]?.languageCode || "en";
if (deviceLocale in translations) {
  i18n.locale = deviceLocale;
} else {
  i18n.locale = "en";
}

/**
 * RTL 언어 여부를 확인하고 레이아웃 방향을 변경한 뒤 앱을 재시작합니다.
 */
export const applyRTLIfNeeded = (lang: string) => {
  const isRTL = RTL_LANGUAGES.has(lang);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    // 💡 개발/배포 환경 구분 없이 네이티브 레벨에서 확실하게 앱 재시작
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  }
};

/**
 * 사용자가 수동으로 언어를 변경할 때 호출
 */
export const changeLanguage = async (lang: SupportedLanguage) => {
  try {
    i18n.locale = lang;
    await AsyncStorage.setItem("user_language", lang);
    applyRTLIfNeeded(lang);
  } catch (e) {
    console.error("Failed to save language", e);
  }
};

/**
 * 앱 시작 시 저장된 언어 불러오기
 */
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user_language");
    if (savedLanguage && savedLanguage in translations) {
      i18n.locale = savedLanguage;
      applyRTLIfNeeded(savedLanguage);
    }
  } catch (e) {
    console.error("Failed to load saved language", e);
  }
};

export default i18n;
