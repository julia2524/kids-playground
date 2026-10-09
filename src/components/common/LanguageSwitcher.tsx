// components/common/LanguageSwitcher.tsx
// components/common/LanguageSwitcher.tsx
import React from "react";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import { useLanguage } from "../../context/LangaugeContext";

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { locale, setLanguage } = useLanguage(); // 👈 Context 활용

  const handleSelectLanguage = async (lang: "ko" | "en" | "zh") => {
    await setLanguage(lang);
    if (onLanguageChange) onLanguageChange();
  };

  return (
    <Container>
      <LangButton
        isActive={locale.startsWith("zh")}
        onPress={() => handleSelectLanguage("zh")}
        activeOpacity={0.8}
      >
        <LangText isActive={locale.startsWith("zh")}>🇨🇳 中文</LangText>
      </LangButton>
      <LangButton
        isActive={locale.startsWith("en")}
        onPress={() => handleSelectLanguage("en")}
        activeOpacity={0.8}
      >
        <LangText isActive={locale.startsWith("en")}>🇺🇸 English</LangText>
      </LangButton>
      <LangButton
        isActive={locale.startsWith("ko")}
        onPress={() => handleSelectLanguage("ko")}
        activeOpacity={0.8}
      >
        <LangText isActive={locale.startsWith("ko")}>🇰🇷 한국어</LangText>
      </LangButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const LangButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${(props) => (props.isActive ? "#3B82F6" : "#F1F5F9")};
  border-width: 1px;
  border-color: ${(props) => (props.isActive ? "#2563EB" : "transparent")};
`;

const LangText = styled(AppText)<{ isActive: boolean }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#475569")};
`;
