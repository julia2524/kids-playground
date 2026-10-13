// utils/asyncStorage/hapticSettingsStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const HAPTIC_KEY = "@settings_haptic_enabled";

export async function getHapticEnabled(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(HAPTIC_KEY);
    return value !== null ? JSON.parse(value) : true; // 기본값은 켜져 있음(true)
  } catch {
    return true;
  }
}

export async function setHapticEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(HAPTIC_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.log("Failed to save haptic setting:", error);
  }
}
