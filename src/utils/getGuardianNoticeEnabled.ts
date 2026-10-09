// src/utils/guardianNoticeStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const GUARDIAN_NOTICE_KEY = "@guardian_notice_enabled";

// 보호자 안내 팝업 노출 여부 불러오기 (기본값: true)
export const getGuardianNoticeEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(GUARDIAN_NOTICE_KEY);
    return value !== null ? JSON.parse(value) : true;
  } catch (error) {
    console.error("Failed to load guardian notice setting", error);
    return true;
  }
};

// 보호자 안내 팝업 노출 여부 저장하기
export const setGuardianNoticeEnabled = async (
  enabled: boolean,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(GUARDIAN_NOTICE_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.error("Failed to save guardian notice setting", error);
  }
};
