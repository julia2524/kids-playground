// utils/haptics.ts
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { getHapticEnabled } from "./asyncStorage/hapticSettingsStorage";

// 캐시 변수 (매번 비동기로 AsyncStorage를 읽지 않기 위함)
let isHapticGloballyEnabled = true;

// 앱 시작 시 또는 설정 변경 시 호출해서 상태 동기화
export async function syncHapticGlobalState() {
  isHapticGloballyEnabled = await getHapticEnabled();
}

export function triggerHaptic(type: "light" | "success" | "error") {
  if (Platform.OS === "web") return;
  if (!isHapticGloballyEnabled) return; // 👈 햅틱 꺼져있으면 차단!

  try {
    switch (type) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "success":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "error":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch (e) {
    console.log("햅틱 실패:", e);
  }
}
