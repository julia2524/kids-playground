import React from "react";
import {
  BannerAd as RNBannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

// 💡 @env 대신 Expo 기본 환경 변수 접근 방식 사용
const adUnitId = __DEV__
  ? TestIds.BANNER
  : (process.env.EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID ?? TestIds.BANNER);

export default function BannerAd() {
  return (
    <RNBannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
