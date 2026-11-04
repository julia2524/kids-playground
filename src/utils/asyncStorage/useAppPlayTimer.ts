import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PLAY_TIME_LIMIT = 1 * 60 * 1000; // 15분 (밀리초): 15 * 60 * 1000
const REST_COOLTIME = 1 * 3 * 1000; // 3분 (밀리초): 3 * 60 * 1000

const STORAGE_KEY_PLAY = "@accumulated_play_time";
const STORAGE_KEY_REST_UNTIL = "@rest_until_timestamp";

export function useAppPlayTimer() {
  const [shouldShowRestModal, setShouldShowRestModal] = useState(false);
  const [isCooltimeActive, setIsCooltimeActive] = useState(false);
  const [remainingCooltimeSec, setRemainingCooltimeSec] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const accumulatedPlayTimeRef = useRef<number>(0);

  useEffect(() => {
    const initTimer = async () => {
      // 1. 쿨타임 진행 중인지 먼저 확인
      const savedRestUntil = await AsyncStorage.getItem(STORAGE_KEY_REST_UNTIL);
      if (savedRestUntil) {
        const restUntil = parseInt(savedRestUntil, 10);
        const now = Date.now();
        if (now < restUntil) {
          setIsCooltimeActive(true);
          setRemainingCooltimeSec(Math.ceil((restUntil - now) / 1000));
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY_REST_UNTIL);
        }
      }

      // 2. 누적 플레이 시간 불러오기
      const savedPlayTime = await AsyncStorage.getItem(STORAGE_KEY_PLAY);
      if (savedPlayTime) {
        accumulatedPlayTimeRef.current = parseInt(savedPlayTime, 10);
      }
    };

    initTimer();

    // AppState 감지 (백그라운드 전환 시 시간 저장)
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    // 10초마다 플레이 시간 체크
    const interval = setInterval(() => {
      checkPlayTime();
    }, 10000);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  // 쿨타임 카운트다운 타이머
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isCooltimeActive && remainingCooltimeSec > 0) {
      timer = setInterval(() => {
        setRemainingCooltimeSec((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // ⭐ [핵심 수정] 3분이 끝났을 때 플레이 타임을 완전히 리셋하고 게임 재개 허용!
            resetPlayTime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooltimeActive, remainingCooltimeSec]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      const sessionDuration = Date.now() - startTimeRef.current;
      accumulatedPlayTimeRef.current += sessionDuration;
      await AsyncStorage.setItem(
        STORAGE_KEY_PLAY,
        accumulatedPlayTimeRef.current.toString(),
      );
    } else if (nextAppState === "active") {
      startTimeRef.current = Date.now();
    }
  };

  const checkPlayTime = async () => {
    if (isCooltimeActive) return;

    const sessionDuration = Date.now() - startTimeRef.current;
    const total = accumulatedPlayTimeRef.current + sessionDuration;

    if (total >= PLAY_TIME_LIMIT) {
      setShouldShowRestModal(true);
    }
  };

  // 3분 그냥 쉬기 선택 시
  const startThreeMinuteRest = async () => {
    const restUntil = Date.now() + REST_COOLTIME;
    await AsyncStorage.setItem(STORAGE_KEY_REST_UNTIL, restUntil.toString());

    // ⭐ [수정] 여기서는 resetPlayTime을 부르지 않고 팝업만 닫고 쿨타임 모드로 진입
    setShouldShowRestModal(false);
    setIsCooltimeActive(true);
    setRemainingCooltimeSec(3); // 3분 = 180초: 180
  };

  // 광고 보고 바로 해제 시 또는 3분이 다 끝났을 때
  const resetPlayTime = async () => {
    accumulatedPlayTimeRef.current = 0;
    startTimeRef.current = Date.now();
    await AsyncStorage.removeItem(STORAGE_KEY_PLAY);
    await AsyncStorage.removeItem(STORAGE_KEY_REST_UNTIL);

    setShouldShowRestModal(false);
    setIsCooltimeActive(false);
    setRemainingCooltimeSec(0);
  };

  return {
    shouldShowRestModal,
    isCooltimeActive,
    remainingCooltimeSec,
    startThreeMinuteRest,
    resetPlayTime,
  };
}
