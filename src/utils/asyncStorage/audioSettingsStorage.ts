import AsyncStorage from "@react-native-async-storage/async-storage";

const SOUND_ENABLED_KEY = "@classification_sound_enabled";
const CORRECT_EFFECT_ENABLED_KEY = "@classification_correct_effect_enabled";
const BGM_ENABLED_KEY = "@classification_bgm_enabled";

export async function getSoundEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(SOUND_ENABLED_KEY);

  // 저장된 값이 없으면 기본값 ON
  if (value === null) {
    return true;
  }

  return value === "true";
}

export async function setSoundEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}

export async function getCorrectEffectEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(CORRECT_EFFECT_ENABLED_KEY);

  if (value === null) return true;

  return value === "true";
}

export async function setCorrectEffectEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(CORRECT_EFFECT_ENABLED_KEY, String(enabled));
}

// =========================
// 배경음악
// =========================

export async function getBGMEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(BGM_ENABLED_KEY);

  // 저장된 값이 없으면 기본값 ON
  if (value === null) return true;

  return value === "true";
}

export async function setBGMEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(BGM_ENABLED_KEY, String(enabled));
}
