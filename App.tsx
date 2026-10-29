import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";

import { LanguageProvider } from "./src/context/LangaugeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/design-system/theme";
import i18n, { loadSavedLanguage } from "./src/i18n";
import { colors } from "./src/design-system/tokens/colors";
import { BackgroundMusicProvider } from "./src/utils/BackgroundMusicContext";
import { preloadSounds } from "./src/utils/sound";
import { syncHapticGlobalState } from "./src/utils/haptic";

export default function App() {
  // 1. 커스텀 폰트 로드
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  // 2. 저장된 언어 설정 로드 상태
  const [isLangLoaded, setIsLangLoaded] = useState<boolean>(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // 앱 초기화 시 언어 로드와 사운드 프리로드를 같이 실행
        await Promise.all([
          loadSavedLanguage(),
          preloadSounds(),
          syncHapticGlobalState(),
        ]);
      } catch (e) {
        console.warn("앱 초기화 실패:", e);
      } finally {
        setIsLangLoaded(true);
      }
    };

    initApp();
  }, []); // 최상단에 고정된 single useEffect

  // 3. 폰트나 언어가 아직 로드되지 않았으면 렌더링 대기
  if (!fontsLoaded || !isLangLoaded) {
    return null;
  }

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
            <StatusBar barStyle="dark-content" hidden={true} />
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </BackgroundMusicProvider>
    </LanguageProvider>
  );
}
