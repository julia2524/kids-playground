// src/constants/languages.ts
import { SupportedLanguage } from "../i18n";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string; // 셀렉터에 표시될 이름
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "ar", label: "العربية (Arabic)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "zh-Hans", label: "简体中文 (Chinese Simplified)" },
  { code: "zh-Hant", label: "繁體中文 (Chinese Traditional)" },
  { code: "nl", label: "Nederlands (Dutch)" },
  { code: "arz", label: "العربية المصرية (Egyptian Arabic)" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français (French)" },
  { code: "de", label: "Deutsch (German)" },
  { code: "el", label: "Ελληνικά (Greek)" },
  { code: "ha", label: "Hausa" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "id", label: "Bahasa Indonesia (Indonesian)" },
  { code: "it", label: "Italiano (Italian)" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "ko", label: "한국어 (Korean)" },
  { code: "ms", label: "Bahasa Melayu (Malay)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "ne", label: "네पाली (Nepali)" },
  { code: "pcm", label: "Naijá (Nigerian Pidgin)" },
  { code: "fa-IR", label: "فارسی (Persian)" },
  { code: "pl", label: "Polski (Polish)" },
  { code: "pt", label: "Português (Portuguese)" },
  { code: "ro", label: "Română (Romanian)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "sw", label: "Kiswahili (Swahili)" },
  { code: "sv", label: "Svenska (Swedish)" },
  { code: "tl", label: "Tagalog" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "th", label: "ไทย (Thai)" },
  { code: "tr", label: "Türkçe (Turkish)" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "vi", label: "Tiếng Việt (Vietnamese)" },
  { code: "pnb", label: "پنجابی (Western Punjabi)" },
  { code: "wuu", label: "吴语 (Shanghainese)" },
  { code: "yue", label: "粵語 (Cantonese)" },
];
