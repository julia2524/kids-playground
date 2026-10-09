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
        await loadSavedLanguage();
      } catch (e) {
        console.warn("언어 설정 로드 실패:", e);
      } finally {
        setIsLangLoaded(true);
      }
    };

    initApp();
  }, []);

  // 3. 폰트나 언어가 아직 로드되지 않았으면 렌더링 대기 (깜빡임 방지)
  if (!fontsLoaded || !isLangLoaded) {
    return null; // 또는 CustomSplashScreen 컴포넌트
  }

  return (
    <LanguageProvider>
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
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
            hidden={true}
          />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
}
