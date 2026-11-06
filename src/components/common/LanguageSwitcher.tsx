// // components/common/LanguageSwitcher.tsx
// // components/common/LanguageSwitcher.tsx
// import React from "react";
// import styled from "styled-components/native";

// import { AppText } from "../../utils/AppText";
// import { useLanguage } from "../../context/LangaugeContext";
// import { triggerHaptic } from "../../utils/haptic";

// interface LanguageSwitcherProps {
//   onLanguageChange?: () => void;
// }

// export default function LanguageSwitcher({
//   onLanguageChange,
// }: LanguageSwitcherProps) {
//   const { locale, setLanguage } = useLanguage(); // 👈 Context 활용

//   const handleSelectLanguage = async (lang: "ko" | "en" | "zh") => {
//     await setLanguage(lang);
//     if (onLanguageChange) onLanguageChange();
//   };

//   return (
//     <Container>
//       <LangButton
//         isActive={locale.startsWith("zh")}
//         onPress={() => {
//           triggerHaptic("light");
//           handleSelectLanguage("zh");
//         }}
//         activeOpacity={0.8}
//       >
//         <LangText isActive={locale.startsWith("zh")}>🇨🇳 中文</LangText>
//       </LangButton>
//       <LangButton
//         isActive={locale.startsWith("en")}
//         onPress={() => {
//           triggerHaptic("light");
//           handleSelectLanguage("en");
//         }}
//         activeOpacity={0.8}
//       >
//         <LangText isActive={locale.startsWith("en")}>🇺🇸 English</LangText>
//       </LangButton>
//       <LangButton
//         isActive={locale.startsWith("ko")}
//         onPress={() => {
//           triggerHaptic("light");
//           handleSelectLanguage("ko");
//         }}
//         activeOpacity={0.8}
//       >
//         <LangText isActive={locale.startsWith("ko")}>🇰🇷 한국어</LangText>
//       </LangButton>
//     </Container>
//   );
// }

// const Container = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   gap: 8px;
//   width: 100%;
// `;

// const LangButton = styled.TouchableOpacity<{ isActive: boolean }>`
//   flex: 1;
//   padding-vertical: 10px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 14px;
//   background-color: ${(props) => (props.isActive ? "#3B82F6" : "#F1F5F9")};
//   border-width: 1px;
//   border-color: ${(props) => (props.isActive ? "#2563EB" : "transparent")};
// `;

// const LangText = styled(AppText)<{ isActive: boolean }>`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.small}px;
//   font-weight: bold;
//   color: ${(props) => (props.isActive ? "#FFFFFF" : "#475569")};
// `;

// components/common/LanguageSwitcher.tsx
import React, { useState } from "react";
import { Modal, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import i18n, { SupportedLanguage } from "../../i18n";
import { LANGUAGE_OPTIONS, LanguageOption } from "../../constants/languages";
import { AppText } from "../../utils/AppText";
import { triggerHaptic } from "../../utils/haptic";
import { useLanguage } from "../../context/LangaugeContext";

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { locale, setLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  // 현재 선택된 언어 옵션 찾기
  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === locale) ||
    LANGUAGE_OPTIONS.find((opt) => opt.code === "en") ||
    LANGUAGE_OPTIONS[0];

  const handleSelectLanguage = async (langCode: SupportedLanguage) => {
    triggerHaptic("light");
    setModalVisible(false);
    await setLanguage(langCode);
    onLanguageChange?.();
  };

  return (
    <Container>
      {/* 💡 셀렉터 드롭다운 버튼 */}
      <SelectorButton
        onPress={() => {
          triggerHaptic("light");
          setModalVisible(true);
        }}
        activeOpacity={0.8}
      >
        <SelectedText>{currentOption.label}</SelectedText>
        <Ionicons name="chevron-down" size={20} color="#64748B" />
      </SelectorButton>

      {/* 💡 언어 선택 팝업 모달 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay onPress={() => setModalVisible(false)}>
          <ModalCard onPress={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{i18n.t("select_language")}</ModalTitle>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </ModalHeader>

            <FlatList
              data={LANGUAGE_OPTIONS}
              keyExtractor={(item) => item.code}
              renderItem={({ item }: { item: LanguageOption }) => {
                const isSelected = locale === item.code;
                return (
                  <OptionItem
                    isSelected={isSelected}
                    onPress={() => handleSelectLanguage(item.code)}
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
              style={{ maxHeight: 400 }}
            />
          </ModalCard>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}

/* ==================================================
   Styles
================================================== */

const Container = styled.View`
  width: 100%;
`;

const SelectorButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f8fafc;
  border-width: 1px;
  border-color: #cbd5e1;
  border-radius: 14px;
`;

const SelectedText = styled(AppText)`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
`;

const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

// const ModalCard = styled.View`
//   width: 100%;
//   max-width: 360px;
//   background-color: #ffffff;
//   border-radius: 20px;
//   padding: 20px;
//   elevation: 10;
//   shadow-color: #000;
//   shadow-opacity: 0.15;
//   shadow-radius: 12px;
//   shadow-offset: 0px 4px;
// `;

// ✅ 수정 (Pressable로 변경하여 onPress 및 stopPropagation 지원)
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
  padding-bottom: 14px;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f5f9;
`;

const ModalTitle = styled(AppText)`
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

const OptionText = styled(AppText)<{ isSelected: boolean }>`
  font-size: 15px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "500")};
  color: ${(props) => (props.isSelected ? "#2563EB" : "#334155")};
`;

const Separator = styled.View`
  height: 1px;
  background-color: #f1f5f9;
`;
