import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { LanguageProvider } from "./src/context/LangaugeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/design-system/theme";
import { StatusBar } from "react-native"; // ⭐ react-native에서 import

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
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
// import ColorSortingPreviewScreen from "./src/screens/classification/ColorSortProblemPreviewScreen";
// export default function App() {
//   return <ColorSortingPreviewScreen />;
// }
