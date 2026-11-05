// import React, { useEffect, useState } from "react";
// import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import { ThemeProvider } from "styled-components/native";
// import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen"; // ⭐ 추가

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

// // ⭐ 앱이 켜져 있는 동안 스플래시 화면이 자동으로 사라지지 않도록 유지
// SplashScreen.preventAutoHideAsync().catch(() => {});

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     Jua: require("./assets/fonts/Jua-Regular.ttf"),
//     Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
//     ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
//   });

//   const [isReady, setIsReady] = useState(false); // ⭐ 전체 준비 완료 상태

//   const {
//     shouldShowRestModal,
//     isCooltimeActive,
//     remainingCooltimeSec,
//     startThreeMinuteRest,
//     resetPlayTime,
//   } = useAppPlayTimer();

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
//       } catch (e) {
//         console.warn("앱 초기화 실패:", e);
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

//   // ⭐ 폰트와 모든 초기화 작업이 끝났을 때 스플래시 화면 숨기기
//   useEffect(() => {
//     if (fontsLoaded && isReady) {
//       SplashScreen.hideAsync().catch(() => {});
//     }
//   }, [fontsLoaded, isReady]);

//   if (!fontsLoaded || !isReady) {
//     return null;
//   }

//   const isModalVisible = shouldShowRestModal || isCooltimeActive;

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

//               <RestModal
//                 visible={isModalVisible}
//                 isCooltimeActive={isCooltimeActive}
//                 remainingCooltimeSec={remainingCooltimeSec}
//                 onRestThreeMinutes={startThreeMinuteRest}
//                 onWatchAdSuccess={resetPlayTime}
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
import * as SplashScreen from "expo-splash-screen"; // ⭐ 추가

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

// ⭐ 앱이 켜져 있는 동안 스플래시 화면이 자동으로 사라지지 않도록 유지
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false); // ⭐ 전체 준비 완료 상태

  const {
    shouldShowRestModal,
    isCooltimeActive,
    remainingCooltimeSec,
    startThreeMinuteRest,
    resetPlayTime,
  } = useAppPlayTimer();

  const { isUpdateModalVisible, isUpdating, onUpdate, onLater } =
    useInAppUpdates(
      isReady && fontsLoaded && !shouldShowRestModal && !isCooltimeActive,
    );

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
      } catch (e) {
        console.warn("앱 초기화 실패:", e);
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

  // ⭐ 폰트와 모든 초기화 작업이 끝났을 때 스플래시 화면 숨기기
  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  const isModalVisible = shouldShowRestModal || isCooltimeActive;

  return (
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

              <RestModal
                visible={isModalVisible}
                isCooltimeActive={isCooltimeActive}
                remainingCooltimeSec={remainingCooltimeSec}
                onRestThreeMinutes={startThreeMinuteRest}
                onWatchAdSuccess={resetPlayTime}
              />
              <UpdateModal
                visible={isUpdateModalVisible}
                isUpdating={isUpdating}
                onUpdate={onUpdate}
                onLater={onLater}
              />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </BackgroundMusicProvider>
    </LanguageProvider>
  );
}
