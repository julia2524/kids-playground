// import React, { useEffect, useState } from "react";
// import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import { ThemeProvider } from "styled-components/native";
// import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";
// import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
// import { LanguageProvider } from "./src/context/LangaugeContext";
// import AppNavigator from "./src/navigation/AppNavigator";
// import { theme } from "./src/design-system/theme";
// import { loadSavedLanguage } from "./src/i18n";
// import { colors } from "./src/design-system/tokens/colors";
// import { BackgroundMusicProvider } from "./src/utils/BackgroundMusicContext";
// import { preloadSounds } from "./src/utils/sound";
// import { syncHapticGlobalState } from "./src/utils/haptic";
// import { useAppPlayTimer } from "./src/utils/asyncStorage/useAppPlayTimer";
// import RestModal from "./src/components/RestModal";
// import { useInAppUpdates } from "./src/hooks/useInAppUpdates";
// import UpdateModal from "./src/components/UpdateModal";

// // 앱이 준비될 때까지 스플래시 화면 유지
// SplashScreen.preventAutoHideAsync().catch(() => {});

// export default function App() {
//   // 폰트 로딩
//   const [fontsLoaded] = useFonts({
//     Jua: require("./assets/fonts/Jua-Regular.ttf"),
//     Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
//     ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
//   });

//   // 앱 초기화 완료 상태
//   const [isReady, setIsReady] = useState(false);

//   // 플레이 타이머
//   const {
//     shouldShowRestModal,
//     isCooltimeActive,
//     remainingCooltimeSec,
//     startThreeMinuteRest,
//     resetPlayTime,
//   } = useAppPlayTimer();

//   // 휴식 모달 표시 여부
//   const isModalVisible = shouldShowRestModal || isCooltimeActive;

//   // 앱 준비 완료 후 업데이트 확인
//   const { isUpdateModalVisible, isUpdating, onUpdate, onLater } =
//     useInAppUpdates(isReady && fontsLoaded);

//   // 앱 초기화
//   useEffect(() => {
//     let isMounted = true;

//     const initApp = async () => {
//       try {
//         await mobileAds().setRequestConfiguration({
//           maxAdContentRating: MaxAdContentRating.G,
//           tagForChildDirectedTreatment: true,
//         });

//         await mobileAds().initialize();

//         await Promise.all([
//           loadSavedLanguage(),
//           preloadSounds(),
//           syncHapticGlobalState(),
//         ]);
//       } catch (error) {
//         console.warn("[App] 앱 초기화 실패:", error);
//       } finally {
//         if (isMounted) {
//           setIsReady(true);
//         }
//       }
//     };

//     initApp();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // 폰트와 앱 초기화 완료 후 스플래시 숨기기
//   useEffect(() => {
//     if (fontsLoaded && isReady) {
//       SplashScreen.hideAsync().catch(() => {});
//     }
//   }, [fontsLoaded, isReady]);

//   // 초기화 전에는 화면 표시하지 않음
//   if (!fontsLoaded || !isReady) {
//     return null;
//   }

//   return (
//     <LanguageProvider>
//       <BackgroundMusicProvider>
//         <ThemeProvider theme={theme}>
//           <SafeAreaProvider>
//             <NavigationContainer
//               theme={{
//                 ...DefaultTheme,
//                 colors: {
//                   ...DefaultTheme.colors,
//                   background: colors.background,
//                 },
//               }}
//             >
//               <StatusBar style="light" hidden={false} />

//               <AppNavigator />

//               {/* 휴식 모달 */}
//               <RestModal
//                 visible={isModalVisible}
//                 isCooltimeActive={isCooltimeActive}
//                 remainingCooltimeSec={remainingCooltimeSec}
//                 onRestThreeMinutes={startThreeMinuteRest}
//                 onWatchAdSuccess={resetPlayTime}
//               />

//               {/* 업데이트 모달 */}
//               <UpdateModal
//                 visible={isUpdateModalVisible && !isModalVisible}
//                 isUpdating={isUpdating}
//                 onUpdate={onUpdate}
//                 onLater={onLater}
//               />
//             </NavigationContainer>
//           </SafeAreaProvider>
//         </ThemeProvider>
//       </BackgroundMusicProvider>
//     </LanguageProvider>
//   );
// }

import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { LanguageProvider } from "./src/context/LangaugeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/design-system/theme";
import { loadSavedLanguage } from "./src/i18n";
import { colors } from "./src/design-system/tokens/colors";
import { BackgroundMusicProvider } from "./src/utils/BackgroundMusicContext";
import { preloadSounds } from "./src/utils/sound";
import { syncHapticGlobalState } from "./src/utils/haptic";
import { useAppPlayTimer } from "./src/utils/asyncStorage/useAppPlayTimer";
import RestModal from "./src/components/RestModal";
import { useInAppUpdates } from "./src/hooks/useInAppUpdates";
import UpdateModal from "./src/components/UpdateModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// 앱이 준비될 때까지 스플래시 화면 유지
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // 폰트 로딩
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  // 앱 초기화 완료 상태
  const [isReady, setIsReady] = useState(false);

  // 플레이 타이머
  const {
    shouldShowRestModal,
    isCooltimeActive,
    remainingCooltimeSec,
    startThreeMinuteRest,
    resetPlayTime,
  } = useAppPlayTimer();

  // 휴식 모달 표시 여부
  const isModalVisible = shouldShowRestModal || isCooltimeActive;

  // 앱 준비 완료 후 업데이트 확인
  const { isUpdateModalVisible, isUpdating, onUpdate, onLater } =
    useInAppUpdates(isReady && fontsLoaded);

  // 앱 초기화
  useEffect(() => {
    let isMounted = true;

    const initApp = async () => {
      try {
        await mobileAds().setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.G,
          tagForChildDirectedTreatment: true,
        });

        await mobileAds().initialize();

        await Promise.all([
          loadSavedLanguage(),
          preloadSounds(),
          syncHapticGlobalState(),
        ]);
      } catch (error) {
        console.warn("[App] 앱 초기화 실패:", error);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    initApp();

    return () => {
      isMounted = false;
    };
  }, []);

  // 폰트와 앱 초기화 완료 후 스플래시 숨기기
  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, isReady]);

  // 초기화 전에는 화면 표시하지 않음
  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <BackgroundMusicProvider>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <NavigationContainer
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    background: colors.background,
                  },
                }}
              >
                <StatusBar style="light" hidden={false} />

                <AppNavigator />

                {/* 휴식 모달 */}
                <RestModal
                  visible={isModalVisible}
                  isCooltimeActive={isCooltimeActive}
                  remainingCooltimeSec={remainingCooltimeSec}
                  onRestThreeMinutes={startThreeMinuteRest}
                  onWatchAdSuccess={resetPlayTime}
                />

                {/* 업데이트 모달 */}
                <UpdateModal
                  visible={isUpdateModalVisible && !isModalVisible}
                  isUpdating={isUpdating}
                  onUpdate={onUpdate}
                  onLater={onLater}
                />
              </NavigationContainer>
            </SafeAreaProvider>
          </ThemeProvider>
        </BackgroundMusicProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
