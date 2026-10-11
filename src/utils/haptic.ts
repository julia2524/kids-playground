// utils/haptic.ts
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function triggerHaptic(type: "light" | "success" | "error") {
  // 시뮬레이터에서는 아예 실행 안 함
  if (Platform.OS === "web") return;

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
