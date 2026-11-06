import React, { useState } from "react";
import {
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// 💡 프로젝트 경로 구조에 맞춘 임포트
import AppHeader from "../components/AppHeader"; // 혹은 올바른 경로
import GradientBackground from "../design-system/components/GradientBackground"; // 혹은 올바른 경로
import { useLanguage } from "../context/LangaugeContext";
import i18n, { SupportedLanguage } from "../i18n";
import { LANGUAGE_OPTIONS, LanguageOption } from "../constants/languages";

// json 번역 파일 직접 임포트 (키 목록 추출용)
import ko from "../locales/ko.json";

export default function LanguageScreen() {
  const navigation = useNavigation();
  const { locale, setLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  // 테스트하고 싶은 언어 선택 상태 (38개 SupportedLanguage 지원)
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    (locale as SupportedLanguage) || "ko",
  );

  // 현재 선택된 옵션의 라벨 추출 (없으면 첫 번째 기본값)
  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === selectedLang) ||
    LANGUAGE_OPTIONS[0];

  // 언어 선택 처리
  const handleSelectLang = async (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setModalVisible(false);
    await setLanguage(lang); // 전역 i18n 언어 변경 및 저장
  };

  // ko.json 기준 키 목록 추출
  const translationKeys = Object.keys(ko);

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        onBackPress={() => navigation.goBack()}
        title="다국어 번역 검증 Screen"
      />

      {/* ==================================================
          1. 언어 선택 셀렉터 박스 (모달 트리거)
      ================================================== */}
      <SelectorContainer>
        <SelectorButton
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <SelectedText>{currentOption.label}</SelectedText>
          <Ionicons name="chevron-down" size={20} color="#64748B" />
        </SelectorButton>
      </SelectorContainer>

      {/* ==================================================
          2. 38개 언어 선택 모달 팝업
      ================================================== */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay onPress={() => setModalVisible(false)}>
          <ModalCard onPress={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>검증할 언어 선택</ModalTitle>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </ModalHeader>

            <FlatList
              data={LANGUAGE_OPTIONS}
              keyExtractor={(item) => item.code}
              renderItem={({ item }: { item: LanguageOption }) => {
                const isSelected = selectedLang === item.code;
                return (
                  <OptionItem
                    isSelected={isSelected}
                    onPress={() => handleSelectLang(item.code)}
                    activeOpacity={0.7}
                  >
                    <OptionText isSelected={isSelected}>
                      {item.label}
                    </OptionText>
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="#3B82F6" />
                    )}
                  </OptionItem>
                );
              }}
              ItemSeparatorComponent={() => <Separator />}
              style={{ maxHeight: 350 }}
            />
          </ModalCard>
        </ModalOverlay>
      </Modal>

      {/* ==================================================
          3. 번역 키 & 중첩 객체 안전 렌더링 목록 출력
      ================================================== */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CountText>총 {translationKeys.length}개 번역 키 등록됨</CountText>

        {translationKeys.map((key) => {
          // 객체 반환 허용 설정 (i18n-js nested object 대응)
          const translatedText = i18n.t(key, { returnObjects: true });

          // 반환된 값이 객체(Object) 형태인지 확인하여 안전하게 문자열화
          const displayValue =
            typeof translatedText === "object" && translatedText !== null
              ? JSON.stringify(translatedText, null, 2)
              : String(translatedText);

          return (
            <ItemCard key={key}>
              <KeyText>🔑 {key}</KeyText>
              <ValueText>{displayValue}</ValueText>
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

const SelectorContainer = styled.View`
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const SelectorButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f8fafc;
  border-width: 1px;
  border-color: #cbd5e1;
  border-radius: 12px;
`;

const SelectedText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #1e293b;
`;

const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ModalCard = styled.Pressable`
  width: 100%;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  elevation: 10;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f5f9;
`;

const ModalTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #0f172a;
`;

const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  padding-horizontal: 8px;
  background-color: ${(props) =>
    props.isSelected ? "#EFF6FF" : "transparent"};
  border-radius: 10px;
`;

const OptionText = styled.Text<{ isSelected: boolean }>`
  font-size: 15px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "500")};
  color: ${(props) => (props.isSelected ? "#2563EB" : "#334155")};
`;

const Separator = styled.View`
  height: 1px;
  background-color: #f1f5f9;
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
  text-align: ${I18nManager.isRTL ? "right" : "left"};
`;
