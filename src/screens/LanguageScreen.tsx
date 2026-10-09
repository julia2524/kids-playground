import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../i18n"; // 💡 경로에 맞게 조정

// json 번역 파일 직접 임포트 (키 목록 추출용)
import ko from "../locales/ko.json";
import GradientBackground from "../design-system/components/GradientBackground";
import AppHeader from "../components/AppHeader";
import { useLanguage } from "../context/LangaugeContext";

export default function LanguageScreen() {
  const navigation = useNavigation();
  const { locale, setLanguage } = useLanguage();

  // 테스트하고 싶은 언어 탭 선택 상태 (기존 전역 locale과 동기화)
  const [selectedLang, setSelectedLang] = useState<"ko" | "en" | "zh">(
    (locale as "ko" | "en" | "zh") || "ko",
  );

  // 탭 변경 시 언어 전환 실행
  const handleSelectLang = async (lang: "ko" | "en" | "zh") => {
    setSelectedLang(lang);
    await setLanguage(lang); // 전역 i18n 언어 변경
  };

  // ko.json 파일의 키 목록 전체 추출
  const translationKeys = Object.keys(ko);

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        onBackPress={() => navigation.goBack()}
        title="다국어 번역 검증 창"
      />

      {/* ==================================================
          1. 상단 언어 선택 탭 (한국어, 영어, 중국어)
      ================================================== */}
      <TabContainer>
        <TabButton
          isActive={selectedLang === "ko"}
          onPress={() => handleSelectLang("ko")}
          activeOpacity={0.8}
        >
          <TabText isActive={selectedLang === "ko"}>🇰🇷 한국어</TabText>
        </TabButton>

        <TabButton
          isActive={selectedLang === "en"}
          onPress={() => handleSelectLang("en")}
          activeOpacity={0.8}
        >
          <TabText isActive={selectedLang === "en"}>🇺🇸 English</TabText>
        </TabButton>

        <TabButton
          isActive={selectedLang === "zh"}
          onPress={() => handleSelectLang("zh")}
          activeOpacity={0.8}
        >
          <TabText isActive={selectedLang === "zh"}>🇨🇳 中文</TabText>
        </TabButton>
      </TabContainer>

      {/* ==================================================
          2. 번역 키 & 렌더링 문구 목록 출력
      ================================================== */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CountText>총 {translationKeys.length}개 번역 키 등록됨</CountText>

        {translationKeys.map((key) => {
          // 현재 설정된 i18n으로 번역 결과 조회
          const translatedText = i18n.t(key);

          return (
            <ItemCard key={key}>
              <KeyText>🔑 {key}</KeyText>
              <ValueText>{translatedText}</ValueText>
            </ItemCard>
          );
        })}
      </ScrollView>
    </Container>
  );
}

/* ==================================================
   Styles
================================================== */

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const TabButton = styled(TouchableOpacity)<{ isActive: boolean }>`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${(props) => (props.isActive ? "#3B82F6" : "#E2E8F0")};
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#64748B")};
`;

const CountText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
  margin-bottom: 12px;
`;

const ItemCard = styled.View`
  background-color: #ffffff;
  padding: 14px 16px;
  border-radius: 14px;
  margin-bottom: 10px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

const KeyText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #64748b;
  margin-bottom: 4px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
`;
