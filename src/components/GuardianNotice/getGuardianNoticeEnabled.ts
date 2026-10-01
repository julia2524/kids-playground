import AsyncStorage from "@react-native-async-storage/async-storage";

const GUARDIAN_NOTICE_ENABLED_KEY = "@kidsplayground_guardian_notice_enabled";

// 현재 설정 가져오기
export async function getGuardianNoticeEnabled(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(GUARDIAN_NOTICE_ENABLED_KEY);

    // 저장된 값이 없으면 기본값 = true
    return value !== "false";
  } catch (error) {
    console.log("보호자 안내 설정을 불러오지 못했습니다.", error);

    // 오류가 나도 기본적으로 표시
    return true;
  }
}

// 설정 저장
export async function setGuardianNoticeEnabled(
  enabled: boolean,
): Promise<void> {
  try {
    await AsyncStorage.setItem(GUARDIAN_NOTICE_ENABLED_KEY, String(enabled));
  } catch (error) {
    console.log("보호자 안내 설정을 저장하지 못했습니다.", error);
  }
}
