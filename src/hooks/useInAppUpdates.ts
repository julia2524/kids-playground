import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "expo-sqlite/kv-store";
import * as InAppUpdates from "expo-in-app-updates";

const DISMISSED_VERSION_KEY = "@kids_playground/dismissed_update_version";

interface UseInAppUpdatesReturn {
  isUpdateModalVisible: boolean;
  isUpdating: boolean;
  onUpdate: () => Promise<void>;
  onLater: () => Promise<void>;
}

export function useInAppUpdates(
  enabled: boolean = true,
): UseInAppUpdatesReturn {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const storeVersionRef = useRef<string | null>(null);
  const isCheckingRef = useRef(false);

  // 앱 시작 후 Google Play 업데이트 확인
  useEffect(() => {
    if (!enabled || __DEV__ || Platform.OS !== "android") {
      return;
    }

    let isActive = true;

    const checkForUpdates = async () => {
      if (isCheckingRef.current) return;

      isCheckingRef.current = true;

      try {
        const updateInfo = await InAppUpdates.checkForUpdate();

        console.log("[InAppUpdates] Google Play 확인 결과:", updateInfo);

        if (!isActive) return;

        // 업데이트가 없다면 안내창을 표시하지 않음
        if (!updateInfo.updateAvailable || !updateInfo.storeVersion) {
          storeVersionRef.current = null;
          setIsUpdateModalVisible(false);
          return;
        }

        const storeVersion = String(updateInfo.storeVersion);
        storeVersionRef.current = storeVersion;

        // 중단된 Immediate 업데이트가 있다면 재개
        if (updateInfo.updateInProgress) {
          setIsUpdating(true);
          setIsUpdateModalVisible(false);

          try {
            await InAppUpdates.startUpdate();
          } catch (error) {
            console.warn("[InAppUpdates] 업데이트 재개 실패:", error);
          } finally {
            if (isActive) {
              setIsUpdating(false);
            }
          }

          return;
        }

        // 사용자가 이미 같은 버전의 업데이트를 미룬 경우
        const dismissedVersion = await AsyncStorage.getItem(
          DISMISSED_VERSION_KEY,
        );

        if (!isActive) return;

        if (dismissedVersion === storeVersion) {
          setIsUpdateModalVisible(false);
          return;
        }

        setIsUpdateModalVisible(true);
      } catch (error) {
        console.warn("[InAppUpdates] 업데이트 확인 실패:", error);
        console.warn(
          "[InAppUpdates] 오류 상세:",
          JSON.stringify(error, Object.getOwnPropertyNames(error as object)),
        );
      } finally {
        isCheckingRef.current = false;
      }
    };

    checkForUpdates();

    // 업데이트 완료 / 취소 이벤트 처리
    const completedSubscription = InAppUpdates.addUpdateListener(
      "updateCompleted",
      () => {
        if (!isActive) return;

        setIsUpdating(false);
        setIsUpdateModalVisible(false);
      },
    );

    const cancelledSubscription = InAppUpdates.addUpdateListener(
      "updateCancelled",
      () => {
        if (!isActive) return;

        setIsUpdating(false);
        setIsUpdateModalVisible(false);
      },
    );

    return () => {
      isActive = false;
      completedSubscription();
      cancelledSubscription();
    };
  }, [enabled]);

  // Google Play 공식 업데이트 실행
  const onUpdate = useCallback(async () => {
    if (Platform.OS !== "android" || isUpdating) return;

    try {
      setIsUpdating(true);

      const started = await InAppUpdates.startUpdate();

      if (started) {
        // 공식 업데이트 UI가 시작되면 자체 모달은 닫음
        setIsUpdateModalVisible(false);
      } else {
        setIsUpdating(false);
      }
    } catch (error) {
      console.warn("[InAppUpdates] 업데이트 실행 실패:", error);
      setIsUpdating(false);
    }
  }, [isUpdating]);

  // 사용자가 업데이트를 나중에 하기로 선택
  const onLater = useCallback(async () => {
    const storeVersion = storeVersionRef.current;

    try {
      if (storeVersion) {
        await AsyncStorage.setItem(DISMISSED_VERSION_KEY, storeVersion);
      }
    } catch (error) {
      console.warn("[InAppUpdates] 업데이트 안내 상태 저장 실패:", error);
    } finally {
      setIsUpdateModalVisible(false);
    }
  }, []);

  return {
    isUpdateModalVisible,
    isUpdating,
    onUpdate,
    onLater,
  };
}
