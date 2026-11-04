// import {
//   RewardedAd,
//   RewardedAdEventType,
//   RewardedAdReward,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.REWARDED
//   : (process.env.EXPO_PUBLIC_ADMOB_REWARDED_UNIT_ID ?? TestIds.REWARDED);

// export const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
// });

// let onRewardCallback: (() => void) | null = null;
// let isShowing = false;

// // 1. 보상 획득 이벤트 리스너 (1회만 등록)
// rewardedAd.addAdEventListener(
//   RewardedAdEventType.EARNED_REWARD,
//   (reward: RewardedAdReward) => {
//     if (onRewardCallback) {
//       onRewardCallback();
//       onRewardCallback = null;
//     }
//   },
// );

// // 2. 광고 미리 로드 함수
// export const loadRewardedAd = () => {
//   if (!rewardedAd.loaded && !isShowing) {
//     rewardedAd.load();
//   }
// };

// // 3. 광고 실행 함수
// export const showRewardedAd = (onRewardEarned: () => void) => {
//   if (isShowing) return;

//   onRewardCallback = () => {
//     isShowing = false;
//     onRewardEarned();
//     // 광고가 끝나고 보상을 받았을 때 다음 광고 미리 로드
//     rewardedAd.load();
//   };

//   if (rewardedAd.loaded) {
//     isShowing = true;
//     rewardedAd.show();
//   } else {
//     // 로드되어 있지 않다면 로드 완료 후 1회만 show() 실행
//     const unsubscribeLoaded = rewardedAd.addAdEventListener(
//       RewardedAdEventType.LOADED,
//       () => {
//         unsubscribeLoaded();
//         if (!isShowing) {
//           isShowing = true;
//           rewardedAd.show();
//         }
//       },
//     );
//     rewardedAd.load();
//   }
// };

import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : (process.env.EXPO_PUBLIC_ADMOB_REWARDED_UNIT_ID ?? TestIds.REWARDED);

export type RewardedAdResult =
  | { success: true }
  | {
      success: false;
      reason: "load_failed" | "show_failed" | "cancelled" | "already_showing";
    };

type RewardCallback = (result: RewardedAdResult) => void;

export const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

let isLoading = false;
let isShowing = false;
let hasEarnedReward = false;

let rewardCallback: RewardCallback | null = null;

// 콜백을 한 번만 실행
const notifyResult = (result: RewardedAdResult) => {
  const callback = rewardCallback;
  rewardCallback = null;

  callback?.(result);
};

// 광고 로딩
export const loadRewardedAd = () => {
  if (rewardedAd.loaded || isLoading || isShowing) {
    return;
  }

  isLoading = true;

  try {
    rewardedAd.load();
  } catch (error) {
    isLoading = false;
    console.warn("[RewardedAd] Load error:", error);
  }
};

// 광고 표시
const showLoadedAd = () => {
  if (!rewardedAd.loaded || isShowing || !rewardCallback) {
    return;
  }

  isLoading = false;
  isShowing = true;
  hasEarnedReward = false;

  try {
    rewardedAd.show().catch((error) => {
      console.warn("[RewardedAd] Show error:", error);

      if (isShowing) {
        isShowing = false;

        if (!hasEarnedReward) {
          notifyResult({
            success: false,
            reason: "show_failed",
          });
        }

        hasEarnedReward = false;
        loadRewardedAd();
      }
    });
  } catch (error) {
    console.warn("[RewardedAd] Show exception:", error);

    isShowing = false;
    hasEarnedReward = false;

    notifyResult({
      success: false,
      reason: "show_failed",
    });

    loadRewardedAd();
  }
};

// 1. 광고 로딩 완료
rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
  isLoading = false;

  // 광고 시청 요청이 대기 중이었다면 바로 표시
  if (rewardCallback && !isShowing) {
    showLoadedAd();
  }
});

// 2. 광고 보상 획득
rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
  if (!isShowing || !rewardCallback) {
    return;
  }

  hasEarnedReward = true;

  notifyResult({
    success: true,
  });
});

// 3. 광고 닫힘
rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
  if (isShowing) {
    // 보상을 받지 않고 광고를 닫은 경우
    if (!hasEarnedReward) {
      notifyResult({
        success: false,
        reason: "cancelled",
      });
    }

    isShowing = false;
    hasEarnedReward = false;
  }

  // 다음 광고 미리 로드
  loadRewardedAd();
});

// 4. 광고 로딩 또는 표시 오류
rewardedAd.addAdEventListener(AdEventType.ERROR, (error) => {
  console.warn("[RewardedAd] Ad error:", error);

  isLoading = false;

  if (isShowing) {
    isShowing = false;

    if (!hasEarnedReward) {
      notifyResult({
        success: false,
        reason: "show_failed",
      });
    }

    hasEarnedReward = false;
    return;
  }

  if (rewardCallback) {
    notifyResult({
      success: false,
      reason: "load_failed",
    });
  }
});

// 5. 광고 실행 요청
export const showRewardedAd = (callback: RewardCallback) => {
  if (isShowing || rewardCallback) {
    callback({
      success: false,
      reason: "already_showing",
    });

    return;
  }

  rewardCallback = callback;

  if (rewardedAd.loaded) {
    showLoadedAd();
  } else {
    loadRewardedAd();
  }
};
