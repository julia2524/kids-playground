import {
  RewardedAd,
  RewardedAdEventType,
  RewardedAdReward,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : (process.env.EXPO_PUBLIC_ADMOB_REWARDED_UNIT_ID ?? TestIds.REWARDED);

export const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

let onRewardCallback: (() => void) | null = null;
let isShowing = false;

// 1. 보상 획득 이벤트 리스너 (1회만 등록)
rewardedAd.addAdEventListener(
  RewardedAdEventType.EARNED_REWARD,
  (reward: RewardedAdReward) => {
    if (onRewardCallback) {
      onRewardCallback();
      onRewardCallback = null;
    }
  },
);

// 2. 광고 미리 로드 함수
export const loadRewardedAd = () => {
  if (!rewardedAd.loaded && !isShowing) {
    rewardedAd.load();
  }
};

// 3. 광고 실행 함수
export const showRewardedAd = (onRewardEarned: () => void) => {
  if (isShowing) return;

  onRewardCallback = () => {
    isShowing = false;
    onRewardEarned();
    // 광고가 끝나고 보상을 받았을 때 다음 광고 미리 로드
    rewardedAd.load();
  };

  if (rewardedAd.loaded) {
    isShowing = true;
    rewardedAd.show();
  } else {
    // 로드되어 있지 않다면 로드 완료 후 1회만 show() 실행
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        unsubscribeLoaded();
        if (!isShowing) {
          isShowing = true;
          rewardedAd.show();
        }
      },
    );
    rewardedAd.load();
  }
};
