import React, { useEffect, useState } from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

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

export default function App() {
  // 1. 커스텀 폰트 로드
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  // 2. 저장된 언어 설정 로드 상태
  const [isLangLoaded, setIsLangLoaded] = useState<boolean>(false);

  const {
    shouldShowRestModal,
    isCooltimeActive,
    remainingCooltimeSec,
    startThreeMinuteRest,
    resetPlayTime,
  } = useAppPlayTimer();

  // 3. 앱 초기화
  useEffect(() => {
    let isMounted = true;

    const initApp = async () => {
      try {
        // AdMob 아동 대상 광고 요청 설정
        await mobileAds().setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.G,
          tagForChildDirectedTreatment: true,
        });

        // AdMob 초기화
        await mobileAds().initialize();

        // 언어, 사운드, 진동 설정 로드
        await Promise.all([
          loadSavedLanguage(),
          preloadSounds(),
          syncHapticGlobalState(),
        ]);
      } catch (e) {
        console.warn("앱 초기화 실패:", e);
      } finally {
        if (isMounted) {
          setIsLangLoaded(true);
        }
      }
    };

    initApp();

    return () => {
      isMounted = false;
    };
  }, []);

  // 4. 폰트나 언어가 아직 로드되지 않았으면 렌더링 대기
  if (!fontsLoaded || !isLangLoaded) {
    return null;
  }

  // 5. 쉬어가기 모달 표시 여부
  const isModalVisible = shouldShowRestModal || isCooltimeActive;

  return (
    <LanguageProvider>
      <BackgroundMusicProvider>
        <ThemeProvider theme={theme}>
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

            {/* 카운트다운 기능이 포함된 통합 쉬어가기 모달 */}
            <RestModal
              visible={isModalVisible}
              isCooltimeActive={isCooltimeActive}
              remainingCooltimeSec={remainingCooltimeSec}
              onRestThreeMinutes={startThreeMinuteRest}
              onWatchAdSuccess={resetPlayTime}
            />
          </NavigationContainer>
        </ThemeProvider>
      </BackgroundMusicProvider>
    </LanguageProvider>
  );
}
