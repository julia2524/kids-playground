// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Text, View } from "react-native";

// import AppHeader from "../../components/common/AppHeader";
// import ResetProgressButton from "../../components/common/ResetProgressButton";

// import { RootStackParamList } from "../../navigation/types";

// import GradientBackground from "../../design-system/backgrounds/GradientBackground";

// import { clearGameProgress } from "../classification/progress/progressStorage";
// import React, { useState } from "react";
// import {
//   Container,
//   Content,
//   Divider,
//   HeaderCenter,
//   Section,
//   SectionTitle,
//   SettingCard,
//   SettingDescription,
//   SettingIcon,
//   SettingInfo,
//   SettingRow,
//   SettingTextWrapper,
//   SettingTitle,
//   StyledSwitch,
//   Title,
// } from "./SettingScreenStyles";
// import CustomAlert from "../../components/common/CustomAlert";
// import {
//   getCorrectEffectEnabled,
//   getSoundEnabled,
//   setCorrectEffectEnabled,
//   setSoundEnabled,
// } from "../audio/audioSettingsStorage";
// import { useBackgroundMusic } from "../audio/BackgroundMusicContext";
// import { GAME_INFO } from "../../constants/GameInfo";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { BASIC_COLORS } from "../../design-system/tokens/colors";
// import { clearUnlockedStickers } from "../sticker/utils/stickerStorage";
// import ResetStickerButton from "../../components/common/ResetStickerButton";
// import i18n from "../../i18n";
// import LanguageSwitcher from "../../components/common/LanguageSwitcher";
// import {
//   getGuardianNoticeEnabled,
//   setGuardianNoticeEnabled,
// } from "../../components/GuardianNotice/guardianNoticeStorage";
// import { useLanguage } from "../../context/LanguageContext";

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "SettingScreen"
// >;

// export default function SettingScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   // 💡 언어 변경 시 SettingScreen 전체를 리렌더링하기 위한 State
//   //const [, setLangState] = useState(i18n.locale);
//   useLanguage();
//   // const handleLanguageChange = () => {
//   //   //  setLangState(i18n.locale); // State 변경으로 화면 갱신
//   // };

//   // =========================
//   // 게임 진행 상황 초기화
//   // =========================
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertConfirmAction, setAlertConfirmAction] = useState<
//     (() => void) | undefined
//   >();
//   const [alertShowCancel, setAlertShowCancel] = useState(false);
//   const [alertConfirmText, setAlertConfirmText] = useState(i18n.t("confirm")); // 알럿 띄우는 헬퍼 함수
//   const showAlert = (
//     title: string,
//     message: string,
//     onConfirm?: () => void,
//     options?: { showCancel?: boolean; confirmText?: string },
//   ) => {
//     setAlertTitle(title);
//     setAlertMessage(message);
//     setAlertConfirmAction(() => onConfirm);
//     setAlertShowCancel(options?.showCancel ?? false);
//     setAlertConfirmText(options?.confirmText ?? i18n.t("confirm"));
//     setAlertVisible(true);
//   };
//   // 알럿 확인 버튼
//   const handleAlertConfirm = () => {
//     setAlertVisible(false);
//     alertConfirmAction?.();
//   };
//   // 알럿 취소 버튼
//   const handleAlertCancel = () => {
//     setAlertVisible(false);
//   };
//   // 공통 초기화 함수
//   const handleResetGame = (mode: keyof typeof GAME_INFO) => {
//     const { title } = GAME_INFO[mode];

//     showAlert(
//       i18n.t("reset_progress_alert_title"),
//       i18n.t("reset_progress_alert_msg", { gameTitle: title }),
//       async () => {
//         await clearGameProgress(mode);
//         showAlert(
//           i18n.t("reset_complete_title"),
//           i18n.t("reset_progress_done_msg", { gameTitle: title }),
//         );
//       },
//       { showCancel: true, confirmText: i18n.t("restart") },
//     );
//   };

//   // 기존 핸들러
//   const handleResetColor = () => handleResetGame("color");
//   const handleResetShape = () => handleResetGame("shape");
//   const handleResetCategory = () => handleResetGame("category");

//   // =========================
//   // 임시 소리 설정
//   // =========================

//   const [soundEffect, setSoundEffect] = useState(true);
//   // const [backgroundMusic, setBackgroundMusic] = useState(true);
//   const [correctEffect, setCorrectEffect] = useState(true);
//   const [guardianNoticeEnabled, setGuardianNoticeEnabledState] = useState(true);
//   const { backgroundMusic, setBackgroundMusic } = useBackgroundMusic();

//   useFocusEffect(
//     React.useCallback(() => {
//       let isMounted = true;

//       const loadSettings = async () => {
//         const enabled = await getSoundEnabled();
//         const correctEnabled = await getCorrectEffectEnabled();
//         const guardianEnabled = await getGuardianNoticeEnabled();

//         if (!isMounted) return;

//         setSoundEffect(enabled);
//         setCorrectEffect(correctEnabled);
//         setGuardianNoticeEnabledState(guardianEnabled);
//       };

//       loadSettings();

//       return () => {
//         isMounted = false;
//       };
//     }, []),
//   );

//   const handleSoundToggle = async (value: boolean) => {
//     setSoundEffect(value);
//     await setSoundEnabled(value);
//   };
//   const handleCorrectToggle = async (value: boolean) => {
//     setCorrectEffect(value);
//     await setCorrectEffectEnabled(value);
//   };
//   const handleGuardianNoticeToggle = async (value: boolean) => {
//     setGuardianNoticeEnabledState(value);
//     await setGuardianNoticeEnabled(value);
//   };

//   // =========================
//   // 스티커 초기화
//   // =========================

//   const handleResetSticker = (mode: keyof typeof GAME_INFO) => {
//     const { title } = GAME_INFO[mode];

//     showAlert(
//       i18n.t("reset_sticker_alert_title"),
//       i18n.t("reset_sticker_alert_msg", { gameTitle: title }),
//       async () => {
//         const success = await clearUnlockedStickers(mode);

//         if (success) {
//           showAlert(
//             i18n.t("reset_complete_title"),
//             i18n.t("reset_sticker_done_msg", { gameTitle: title }),
//           );
//         }
//       },
//       {
//         showCancel: true,
//         confirmText: i18n.t("reset"),
//       },
//     );
//   };

//   const handleResetColorStickers = () => handleResetSticker("color");

//   const handleResetShapeStickers = () => handleResetSticker("shape");

//   const handleResetCategoryStickers = () => handleResetSticker("category");
//   return (
//     <Container>
//       <GradientBackground />

//       <AppHeader
//         onBack={() => navigation.goBack()}
//         center={
//           <HeaderCenter>
//             <Title>{i18n.t("setting_title")}</Title>
//           </HeaderCenter>
//         }
//       />

//       <Content>
//         {/* =========================
//             💡 언어 설정 (새로 추가)
//            ========================= */}
//         <Section>
//           <SectionTitle>
//             {i18n.t("language_section") || "언어 설정"}
//           </SectionTitle>
//           <SettingCard>
//             <LanguageSwitcher />
//           </SettingCard>
//         </Section>
//         {/* =========================
//     보호자 안내 설정
//    ========================= */}

//         <Section>
//           <SectionTitle>{i18n.t("guardian_notice_section")}</SectionTitle>

//           <SettingCard>
//             <SettingRow>
//               <SettingInfo>
//                 <SettingIcon>
//                   <Ionicons
//                     name="information-circle"
//                     size={24}
//                     color={BASIC_COLORS.SECONDARY}
//                   />
//                 </SettingIcon>

//                 <SettingTextWrapper>
//                   <SettingTitle>
//                     {i18n.t("guardian_notice_setting_title")}
//                   </SettingTitle>

//                   <SettingDescription>
//                     {i18n.t("guardian_notice_setting_desc")}
//                   </SettingDescription>
//                 </SettingTextWrapper>
//               </SettingInfo>

//               <StyledSwitch
//                 value={guardianNoticeEnabled}
//                 onValueChange={handleGuardianNoticeToggle}
//               />
//             </SettingRow>
//           </SettingCard>
//         </Section>
//         {/* =========================
//             소리 설정
//            ========================= */}

//         <Section>
//           <SectionTitle>{i18n.t("sound_section")}</SectionTitle>

//           <SettingCard>
//             <SettingRow>
//               <SettingInfo>
//                 <SettingIcon>
//                   <Ionicons
//                     name="volume-high"
//                     size={24}
//                     color={BASIC_COLORS.SECONDARY}
//                   />
//                 </SettingIcon>

//                 <SettingTextWrapper>
//                   <SettingTitle>{i18n.t("sfx_title")}</SettingTitle>
//                   <SettingDescription>{i18n.t("sfx_desc")}</SettingDescription>
//                 </SettingTextWrapper>
//               </SettingInfo>

//               <StyledSwitch
//                 value={soundEffect}
//                 onValueChange={handleSoundToggle}
//               />
//             </SettingRow>

//             <Divider />

//             <SettingRow>
//               <SettingInfo>
//                 <SettingIcon>
//                   <Ionicons name="musical-notes" size={24} color="#FB7185" />
//                 </SettingIcon>

//                 <SettingTextWrapper>
//                   <SettingTitle>{i18n.t("bgm_title")}</SettingTitle>
//                   <SettingDescription>{i18n.t("bgm_desc")}</SettingDescription>
//                 </SettingTextWrapper>
//               </SettingInfo>
//               <StyledSwitch
//                 value={backgroundMusic}
//                 onValueChange={setBackgroundMusic}
//               />
//             </SettingRow>

//             <Divider />

//             <SettingRow>
//               <SettingInfo>
//                 <SettingIcon>
//                   <Ionicons name="sparkles" size={24} color="#FBBF24" />
//                 </SettingIcon>

//                 <SettingTextWrapper>
//                   <SettingTitle>{i18n.t("correct_sfx_title")}</SettingTitle>
//                   <SettingDescription>
//                     {i18n.t("correct_sfx_desc")}
//                   </SettingDescription>
//                 </SettingTextWrapper>
//               </SettingInfo>

//               <StyledSwitch
//                 value={correctEffect}
//                 onValueChange={handleCorrectToggle}
//               />
//             </SettingRow>
//           </SettingCard>
//         </Section>

//         {/* =========================
//             진행 상황 초기화
//            ========================= */}

//         <Section>
//           <SectionTitle>{i18n.t("reset_progress_section")}</SectionTitle>
//           <SettingCard>
//             <ResetProgressButton gameType="color" onPress={handleResetColor} />
//             <ResetProgressButton gameType="shape" onPress={handleResetShape} />
//             <ResetProgressButton
//               gameType="category"
//               onPress={handleResetCategory}
//             />
//           </SettingCard>
//           <CustomAlert
//             visible={alertVisible}
//             title={alertTitle}
//             message={alertMessage}
//             onClose={handleAlertConfirm}
//             showCancel={alertShowCancel}
//             onCancel={handleAlertCancel}
//             confirmText={alertConfirmText}
//           />
//         </Section>
//         {/* =========================
//     스티커 초기화
//    ========================= */}

//         <Section>
//           <SectionTitle>{i18n.t("reset_sticker_section")}</SectionTitle>

//           <SettingCard>
//             <ResetStickerButton
//               gameType="color"
//               onPress={handleResetColorStickers}
//             />

//             <ResetStickerButton
//               gameType="shape"
//               onPress={handleResetShapeStickers}
//             />

//             <ResetStickerButton
//               gameType="category"
//               onPress={handleResetCategoryStickers}
//             />
//           </SettingCard>
//         </Section>
//       </Content>
//     </Container>
//   );
// }

export default function SettingScreen() {
  return (
    <View>
      <Text>Setting SCreen</Text>
    </View>
  );
}
