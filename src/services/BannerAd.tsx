// import React from "react";
// import { View } from "react-native";
// import {
//   BannerAd as GoogleBannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// export default function BannerAd() {
//   const adUnitId = __DEV__
//     ? TestIds.BANNER
//     : "ca-app-pub-5145202325745375/6203206953";

//   return (
//     <View
//       style={{
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <GoogleBannerAd
//         unitId={adUnitId}
//         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//       />
//     </View>
//   );
// }

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
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
