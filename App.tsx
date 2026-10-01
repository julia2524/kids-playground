import { ThemeProvider } from "styled-components/native";
import { LanguageProvider } from "./src/context/LangaugeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/design-system/theme";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </LanguageProvider>
  );
}
