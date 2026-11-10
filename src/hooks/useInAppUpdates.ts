// import { useCallback, useEffect, useRef, useState } from "react";
// import { Platform } from "react-native";
// import AsyncStorage from "expo-sqlite/kv-store";
// import * as InAppUpdates from "expo-in-app-updates";

// const DISMISSED_VERSION_KEY = "@kids_playground/dismissed_update_version";

// interface UseInAppUpdatesReturn {
//   isUpdateModalVisible: boolean;
//   isUpdating: boolean;
//   onUpdate: () => Promise<void>;
//   onLater: () => Promise<void>;
// }

// export function useInAppUpdates(
//   enabled: boolean = true,
// ): UseInAppUpdatesReturn {
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const storeVersionRef = useRef<string | null>(null);
//   const isCheckingRef = useRef(false);

//   // 앱 시작 후 Google Play 업데이트 확인
//   useEffect(() => {
//     if (!enabled || __DEV__ || Platform.OS !== "android") {
//       return;
//     }

//     let isActive = true;

//     const checkForUpdates = async () => {
//       if (isCheckingRef.current) return;

//       isCheckingRef.current = true;

//       try {
//         const updateInfo = await InAppUpdates.checkForUpdate();

//         console.log("[InAppUpdates] Google Play 확인 결과:", updateInfo);

//         if (!isActive) return;

//         // 업데이트가 없다면 안내창을 표시하지 않음
//         if (!updateInfo.updateAvailable || !updateInfo.storeVersion) {
//           storeVersionRef.current = null;
//           setIsUpdateModalVisible(false);
//           return;
//         }

//         const storeVersion = String(updateInfo.storeVersion);
//         storeVersionRef.current = storeVersion;

//         // 중단된 Immediate 업데이트가 있다면 재개
//         if (updateInfo.updateInProgress) {
//           setIsUpdating(true);
//           setIsUpdateModalVisible(false);

//           try {
//             await InAppUpdates.startUpdate();
//           } catch (error) {
//             console.warn("[InAppUpdates] 업데이트 재개 실패:", error);
//           } finally {
//             if (isActive) {
//               setIsUpdating(false);
//             }
//           }

//           return;
//         }

//         // 사용자가 이미 같은 버전의 업데이트를 미룬 경우
//         const dismissedVersion = await AsyncStorage.getItem(
//           DISMISSED_VERSION_KEY,
//         );

//         if (!isActive) return;

//         if (dismissedVersion === storeVersion) {
//           setIsUpdateModalVisible(false);
//           return;
//         }

//         setIsUpdateModalVisible(true);
//       } catch (error) {
//         console.warn("[InAppUpdates] 업데이트 확인 실패:", error);
//         console.warn(
//           "[InAppUpdates] 오류 상세:",
//           JSON.stringify(error, Object.getOwnPropertyNames(error as object)),
//         );
//       } finally {
//         isCheckingRef.current = false;
//       }
//     };

//     checkForUpdates();

//     // 업데이트 완료 / 취소 이벤트 처리
//     const completedSubscription = InAppUpdates.addUpdateListener(
//       "updateCompleted",
//       () => {
//         if (!isActive) return;

//         setIsUpdating(false);
//         setIsUpdateModalVisible(false);
//       },
//     );

//     const cancelledSubscription = InAppUpdates.addUpdateListener(
//       "updateCancelled",
//       () => {
//         if (!isActive) return;

//         setIsUpdating(false);
//         setIsUpdateModalVisible(false);
//       },
//     );

//     return () => {
//       isActive = false;
//       completedSubscription();
//       cancelledSubscription();
//     };
//   }, [enabled]);

//   // Google Play 공식 업데이트 실행
//   const onUpdate = useCallback(async () => {
//     if (Platform.OS !== "android" || isUpdating) return;

//     try {
//       setIsUpdating(true);

//       const started = await InAppUpdates.startUpdate();

//       if (started) {
//         // 공식 업데이트 UI가 시작되면 자체 모달은 닫음
//         setIsUpdateModalVisible(false);
//       } else {
//         setIsUpdating(false);
//       }
//     } catch (error) {
//       console.warn("[InAppUpdates] 업데이트 실행 실패:", error);
//       setIsUpdating(false);
//     }
//   }, [isUpdating]);

//   // 사용자가 업데이트를 나중에 하기로 선택
//   const onLater = useCallback(async () => {
//     const storeVersion = storeVersionRef.current;

//     try {
//       if (storeVersion) {
//         await AsyncStorage.setItem(DISMISSED_VERSION_KEY, storeVersion);
//       }
//     } catch (error) {
//       console.warn("[InAppUpdates] 업데이트 안내 상태 저장 실패:", error);
//     } finally {
//       setIsUpdateModalVisible(false);
//     }
//   }, []);

//   return {
//     isUpdateModalVisible,
//     isUpdating,
//     onUpdate,
//     onLater,
//   };
// }

import { useCallback, useEffect, useRef, useState } from "react";

import { AppState, Platform } from "react-native";

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

  // 업데이트 확인 중복 실행 방지
  const isCheckingRef = useRef(false);

  // 확인 중 새 요청이 들어오면 끝난 뒤 다시 실행
  const checkAgainRef = useRef(false);

  useEffect(() => {
    if (!enabled || __DEV__ || Platform.OS !== "android") {
      return;
    }

    let isActive = true;

    const checkForUpdates = async () => {
      if (!isActive) return;

      // 이미 확인 중이면 다음 확인을 예약
      if (isCheckingRef.current) {
        checkAgainRef.current = true;

        console.log("[InAppUpdates] 확인 진행 중 - 재확인 예약");

        return;
      }

      isCheckingRef.current = true;

      try {
        console.log("[InAppUpdates] Google Play 업데이트 확인 시작");

        const updateInfo = await InAppUpdates.checkForUpdate();

        console.log("[InAppUpdates] Google Play 확인 결과:", updateInfo);

        if (!isActive) return;

        // 이미 진행 중인 업데이트가 있다면 재개
        if (updateInfo.updateInProgress) {
          console.log("[InAppUpdates] 진행 중인 업데이트 재개");

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

        // 사용 가능한 업데이트가 없는 경우
        if (!updateInfo.updateAvailable || !updateInfo.storeVersion) {
          console.log("[InAppUpdates] 사용 가능한 업데이트 없음");

          storeVersionRef.current = null;

          setIsUpdateModalVisible(false);

          return;
        }

        const storeVersion = String(updateInfo.storeVersion);

        storeVersionRef.current = storeVersion;

        console.log("[InAppUpdates] 업데이트 발견:", storeVersion);

        // 사용자가 이미 미룬 버전인지 확인
        const dismissedVersion = await AsyncStorage.getItem(
          DISMISSED_VERSION_KEY,
        );

        if (!isActive) return;

        if (dismissedVersion === storeVersion) {
          console.log(
            "[InAppUpdates] 이미 업데이트를 미룬 버전:",
            storeVersion,
          );

          setIsUpdateModalVisible(false);

          return;
        }

        // 새로운 업데이트 팝업 표시
        console.log("[InAppUpdates] 업데이트 팝업 표시:", storeVersion);

        setIsUpdateModalVisible(true);
      } catch (error) {
        console.warn("[InAppUpdates] 업데이트 확인 실패:", error);

        // 확인 실패 시 기존 팝업 상태를 임의로 변경하지 않음
      } finally {
        isCheckingRef.current = false;

        // 확인 중 들어온 재확인 요청 처리
        if (isActive && checkAgainRef.current) {
          checkAgainRef.current = false;

          console.log("[InAppUpdates] 예약된 업데이트 재확인 실행");

          void checkForUpdates();
        }
      }
    };

    // 업데이트 완료 이벤트
    const completedSubscription = InAppUpdates.addUpdateListener(
      "updateCompleted",
      () => {
        if (!isActive) return;

        console.log("[InAppUpdates] 업데이트 완료");

        setIsUpdating(false);
        setIsUpdateModalVisible(false);
      },
    );

    // 업데이트 취소 이벤트
    const cancelledSubscription = InAppUpdates.addUpdateListener(
      "updateCancelled",
      () => {
        if (!isActive) return;

        console.log("[InAppUpdates] 업데이트 취소");

        setIsUpdating(false);

        // 업데이트를 취소했다면 안내창 다시 표시
        if (storeVersionRef.current) {
          setIsUpdateModalVisible(true);
        }
      },
    );

    // 앱 시작 시 최초 업데이트 확인
    void checkForUpdates();

    // 앱이 백그라운드에서 다시 활성화될 때 재확인
    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          console.log("[InAppUpdates] 앱 활성화 - 업데이트 재확인");

          void checkForUpdates();
        }
      },
    );

    return () => {
      isActive = false;

      checkAgainRef.current = false;

      appStateSubscription.remove();

      completedSubscription();

      cancelledSubscription();
    };
  }, [enabled]);

  // Google Play 공식 업데이트 실행
  const onUpdate = useCallback(async () => {
    if (Platform.OS !== "android" || isUpdating) {
      return;
    }

    try {
      console.log("[InAppUpdates] 업데이트 실행 시작");

      setIsUpdating(true);

      const started = await InAppUpdates.startUpdate();

      if (started) {
        // Google Play 업데이트 UI가 시작되면 자체 팝업 닫기
        setIsUpdateModalVisible(false);
      } else {
        setIsUpdating(false);
      }
    } catch (error) {
      console.warn("[InAppUpdates] 업데이트 실행 실패:", error);

      setIsUpdating(false);
    }
  }, [isUpdating]);

  // 업데이트 나중에 하기
  const onLater = useCallback(async () => {
    if (isUpdating) return;

    const storeVersion = storeVersionRef.current;

    try {
      if (storeVersion) {
        await AsyncStorage.setItem(DISMISSED_VERSION_KEY, storeVersion);

        console.log("[InAppUpdates] 업데이트 나중에 하기:", storeVersion);
      }
    } catch (error) {
      console.warn("[InAppUpdates] 업데이트 안내 상태 저장 실패:", error);
    } finally {
      setIsUpdateModalVisible(false);
    }
  }, [isUpdating]);

  return {
    isUpdateModalVisible,
    isUpdating,
    onUpdate,
    onLater,
  };
}
