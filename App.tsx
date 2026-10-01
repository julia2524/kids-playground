import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { LanguageProvider } from "./src/context/LangaugeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/design-system/theme";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
}
