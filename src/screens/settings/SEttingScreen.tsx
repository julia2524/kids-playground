// import React, { useState } from "react";
// import { Switch } from "react-native";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";

// import { RootStackParamList } from "../../navigation/types";
// import i18n from "../../i18n";
// import { AppText } from "../../utils/AppText";

// import AppHeader from "../../components/AppHeader";
// import CustomAlert from "../../components/CustomAlert";
// import ResetProgressButton from "../../components/Setting/ResetProgresButton";
// import GradientBackground from "../../design-system/components/GradientBackground";
// import { colors } from "../../design-system/tokens/colors";

// import { SETTING_LEVEL_CLEAR_INFO } from "../../constants/game";
// import { resetProgress } from "../../utils/progressStorage";
// import {
//   getGuardianNoticeEnabled,
//   setGuardianNoticeEnabled,
// } from "../../components/GuardianNotice/getGuardianNoticeEnabled";

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "SettingScreen"
// >;

// export default function SettingScreen() {
//   const navigation = useNavigation<NavigationProp>();

//   // =========================
//   // 알럿 State
//   // =========================
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertConfirmAction, setAlertConfirmAction] = useState<
//     (() => void) | undefined
//   >();
//   const [alertShowCancel, setAlertShowCancel] = useState(false);
//   const [alertConfirmText, setAlertConfirmText] = useState("확인");

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
//     setAlertConfirmText(options?.confirmText ?? "확인");
//     setAlertVisible(true);
//   };

//   const handleAlertConfirm = () => {
//     setAlertVisible(false);
//     alertConfirmAction?.();
//   };

//   const handleAlertCancel = () => {
//     setAlertVisible(false);
//   };

//   // =========================
//   // 진행 상황 초기화
//   // =========================
//   const handleResetGame = (mode: keyof typeof SETTING_LEVEL_CLEAR_INFO) => {
//     const info = SETTING_LEVEL_CLEAR_INFO[mode] ?? { title: "색상 분류" };
//     const gameTitle = info.title;

//     showAlert(
//       "진행 상황 초기화",
//       `${gameTitle} 게임의 진행 기록을 정말 초기화하시겠어요?`,
//       async () => {
//         await resetProgress(mode);
//         showAlert("초기화 완료", `${gameTitle} 게임 기록이 초기화되었습니다.`);
//       },
//       { showCancel: true, confirmText: "초기화" },
//     );
//   };

//   const handleResetColor = () => handleResetGame("color");
//   const handleResetShape = () => handleResetGame("shape");
//   const handleResetCategory = () => handleResetGame("category");

//   // =========================
//   // 보호자 안내 설정 연동
//   // =========================
//   const [guardianNoticeEnabled, setGuardianNoticeEnabledState] = useState(true);

//   // 화면에 진입할 때마다 저장된 설정 불러오기
//   useFocusEffect(
//     React.useCallback(() => {
//       let isMounted = true;

//       const loadSettings = async () => {
//         const enabled = await getGuardianNoticeEnabled();
//         if (isMounted) {
//           setGuardianNoticeEnabledState(enabled);
//         }
//       };

//       loadSettings();

//       return () => {
//         isMounted = false;
//       };
//     }, []),
//   );

//   // 스위치 변경 시 AsyncStorage에 즉시 저장
//   const handleGuardianNoticeToggle = async (value: boolean) => {
//     setGuardianNoticeEnabledState(value);
//     await setGuardianNoticeEnabled(value);
//   };

//   return (
//     <Container>
//       <GradientBackground />

//       <AppHeader title="설정" onBackPress={() => navigation.goBack()} />

//       <Content>
//         {/* 🛡️ 보호자 안내 설정 */}
//         <Section>
//           <SectionTitle>보호자 안내</SectionTitle>
//           <SettingCard>
//             <SettingRow>
//               <SettingInfo>
//                 <IconBadge>
//                   <Ionicons
//                     name="information-circle"
//                     size={22}
//                     color={colors.blue}
//                   />
//                 </IconBadge>
//                 <SettingTextWrapper>
//                   <SettingTitle>보호자 안내문 팝업</SettingTitle>
//                   <SettingDescription>
//                     앱 시작 시 보호자 안내를 표시합니다.
//                   </SettingDescription>
//                 </SettingTextWrapper>
//               </SettingInfo>
//               <StyledSwitch
//                 value={guardianNoticeEnabled}
//                 onValueChange={handleGuardianNoticeToggle} // 👈 변경 핸들러 연결
//               />
//             </SettingRow>
//           </SettingCard>
//         </Section>

//         {/* 🔄 진행 상황 초기화 */}
//         <Section>
//           <SectionTitle>게임 기록 초기화</SectionTitle>
//           <SettingCard>
//             <ResetProgressButton gameType="color" onPress={handleResetColor} />
//             <ResetProgressButton gameType="shape" onPress={handleResetShape} />
//             <ResetProgressButton
//               gameType="category"
//               onPress={handleResetCategory}
//             />
//           </SettingCard>
//         </Section>
//       </Content>

//       <CustomAlert
//         visible={alertVisible}
//         title={alertTitle}
//         message={alertMessage}
//         onClose={handleAlertConfirm}
//         showCancel={alertShowCancel}
//         onCancel={handleAlertCancel}
//         confirmText={alertConfirmText}
//       />
//     </Container>
//   );
// }

// /* ================================================================
//    Styled Components (Kids Playground Design System)
// ================================================================ */

// export const Container = styled.View`
//   flex: 1;
// `;

// export const Content = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 48,
//   },
//   showsVerticalScrollIndicator: false,
// })`
//   flex: 1;
// `;

// export const Section = styled.View`
//   margin-bottom: 24px;
// `;

// export const SectionTitle = styled(AppText)`
//   margin-bottom: 10px;
//   padding-left: 8px;
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: 20px;
//   font-weight: 800;
//   color: ${colors.textGroup.primary};
// `;

// export const SettingCard = styled.View`
//   padding: 16px;
//   background-color: rgba(255, 255, 255, 0.88);
//   border-radius: 24px;
//   border-width: 1.5px;
//   border-color: ${colors.border.default};
//   gap: 12px;
//   elevation: 2;
//   box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
// `;

// export const SettingRow = styled.View`
//   min-height: 68px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// export const SettingInfo = styled.View`
//   flex: 1;
//   flex-direction: row;
//   align-items: center;
// `;

// export const IconBadge = styled.View`
//   width: 42px;
//   height: 42px;
//   border-radius: 21px;

//   align-items: center;
//   justify-content: center;
//   margin-right: 12px;
// `;

// export const SettingTextWrapper = styled.View`
//   flex: 1;
//   padding-right: 12px;
// `;

// export const SettingTitle = styled(AppText)`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: 16px;
//   font-weight: 700;
//   color: ${colors.textGroup.primary};
// `;

// export const SettingDescription = styled(AppText)`
//   margin-top: 2px;
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: 14px;
//   color: ${colors.textGroup.secondary};
// `;

// export const Divider = styled.View`
//   height: 1.5px;
//   background-color: ${colors.border.default};
//   opacity: 0.5;
//   margin-vertical: 4px;
// `;

// export const StyledSwitch = styled(Switch).attrs({
//   trackColor: {
//     false: "#E6E1F4",
//     true: colors.mint,
//   },
//   thumbColor: "#FFFFFF",
//   ios_backgroundColor: "#E6E1F4",
// })``;

import React, { useState } from "react";
import { Switch } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { RootStackParamList } from "../../navigation/types";
import i18n from "../../i18n";
import { AppText } from "../../utils/AppText";

import AppHeader from "../../components/AppHeader";
import CustomAlert from "../../components/CustomAlert";
import ResetProgressButton from "../../components/Setting/ResetProgresButton";
import GradientBackground from "../../design-system/components/GradientBackground";
import { colors } from "../../design-system/tokens/colors";

import { SETTING_LEVEL_CLEAR_INFO } from "../../constants/game";
import { resetProgress } from "../../utils/progressStorage";
import {
  getGuardianNoticeEnabled,
  setGuardianNoticeEnabled,
} from "../../components/GuardianNotice/getGuardianNoticeEnabled";
import { resetUnlockedStickers } from "../../utils/stickerStorage";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SettingScreen"
>;

export default function SettingScreen() {
  const navigation = useNavigation<NavigationProp>();

  // =========================
  // 알럿 State
  // =========================
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertConfirmAction, setAlertConfirmAction] = useState<
    (() => void) | undefined
  >();
  const [alertShowCancel, setAlertShowCancel] = useState(false);
  const [alertConfirmText, setAlertConfirmText] = useState("확인");

  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void,
    options?: { showCancel?: boolean; confirmText?: string },
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmAction(() => onConfirm);
    setAlertShowCancel(options?.showCancel ?? false);
    setAlertConfirmText(options?.confirmText ?? "확인");
    setAlertVisible(true);
  };

  const handleAlertConfirm = () => {
    setAlertVisible(false);
    alertConfirmAction?.();
  };

  const handleAlertCancel = () => {
    setAlertVisible(false);
  };

  // =========================
  // 진행 상황 및 스티커 초기화
  // =========================
  const handleResetGame = (mode: keyof typeof SETTING_LEVEL_CLEAR_INFO) => {
    const info = SETTING_LEVEL_CLEAR_INFO[mode] ?? { title: "색상 분류" };
    const gameTitle = info.title;

    showAlert(
      "진행 상황 초기화",
      `${gameTitle} 게임의 진행 기록을 정말 초기화하시겠어요?`,
      async () => {
        await resetProgress(mode);
        showAlert("초기화 완료", `${gameTitle} 게임 기록이 초기화되었습니다.`);
      },
      { showCancel: true, confirmText: "초기화" },
    );
  };

  const handleResetColor = () => handleResetGame("color");
  const handleResetShape = () => handleResetGame("shape");
  const handleResetCategory = () => handleResetGame("category");

  // 🎁 스티커 수집 기록 전체 초기화
  const handleResetStickers = () => {
    showAlert(
      "스티커 초기화",
      "모은 스티커가 모두 잠금 상태로 돌아가요. 계속할까요?",
      async () => {
        const ok = await resetUnlockedStickers();
        showAlert(
          ok ? "초기화 완료" : "초기화 실패",
          ok
            ? "스티커가 모두 초기화되었습니다."
            : "초기화 중 문제가 발생했습니다. 다시 시도해 주세요.",
        );
      },
      { showCancel: true, confirmText: "초기화" },
    );
  };

  // =========================
  // 보호자 안내 설정 연동
  // =========================
  const [guardianNoticeEnabled, setGuardianNoticeEnabledState] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;

      const loadSettings = async () => {
        const enabled = await getGuardianNoticeEnabled();
        if (isMounted) {
          setGuardianNoticeEnabledState(enabled);
        }
      };

      loadSettings();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  const handleGuardianNoticeToggle = async (value: boolean) => {
    setGuardianNoticeEnabledState(value);
    await setGuardianNoticeEnabled(value);
  };

  return (
    <Container>
      <GradientBackground />

      <AppHeader title="설정" onBackPress={() => navigation.goBack()} />

      <Content>
        {/* 🛡️ 보호자 안내 설정 */}
        <Section>
          <SectionTitle>보호자 안내</SectionTitle>
          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <IconBadge>
                  <Ionicons
                    name="information-circle"
                    size={22}
                    color={colors.blue}
                  />
                </IconBadge>
                <SettingTextWrapper>
                  <SettingTitle>보호자 안내문 팝업</SettingTitle>
                  <SettingDescription>
                    앱 시작 시 보호자 안내를 표시합니다.
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
              <StyledSwitch
                value={guardianNoticeEnabled}
                onValueChange={handleGuardianNoticeToggle}
              />
            </SettingRow>
          </SettingCard>
        </Section>

        {/* 🔄 진행 상황 초기화 */}
        <Section>
          <SectionTitle>게임 및 수집 기록 초기화</SectionTitle>
          <SettingCard>
            <ResetProgressButton gameType="color" onPress={handleResetColor} />
            <Divider />
            <ResetProgressButton gameType="shape" onPress={handleResetShape} />
            <Divider />
            <ResetProgressButton
              gameType="category"
              onPress={handleResetCategory}
            />
            <Divider />
            {/* 🎁 스티커 전용 초기화 버튼 */}
            <ResetStickerButtonRow onPress={handleResetStickers}>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: "#FFF0F0" }}>
                  <Ionicons name="trash-outline" size={20} color="#FF6F6F" />
                </IconBadge>
                <SettingTextWrapper>
                  <SettingTitle style={{ color: "#FF5252" }}>
                    스티커북 초기화
                  </SettingTitle>
                  <SettingDescription>
                    수집한 모든 스티커를 초기 상태로 돌립니다.
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
              <Ionicons name="chevron-forward" size={18} color="#9C99AA" />
            </ResetStickerButtonRow>
          </SettingCard>
        </Section>
      </Content>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={handleAlertConfirm}
        showCancel={alertShowCancel}
        onCancel={handleAlertCancel}
        confirmText={alertConfirmText}
      />
    </Container>
  );
}

/* ================================================================
   Styled Components (Kids Playground Design System)
================================================================ */

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled(AppText)`
  margin-bottom: 10px;
  padding-left: 8px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 20px;
  font-weight: 800;
  color: ${colors.textGroup.primary};
`;

export const SettingCard = styled.View`
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  gap: 8px;
  elevation: 2;
  box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
`;

export const SettingRow = styled.View`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ResetStickerButtonRow = styled.TouchableOpacity`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SettingInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const IconBadge = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: ${colors.button.secondary};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const SettingTextWrapper = styled.View`
  flex: 1;
  padding-right: 12px;
`;

export const SettingTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-weight: 700;
  color: ${colors.textGroup.primary};
`;

export const SettingDescription = styled(AppText)`
  margin-top: 2px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 13px;
  color: ${colors.textGroup.secondary};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${colors.border.default};
  opacity: 0.6;
  margin-vertical: 4px;
`;

export const StyledSwitch = styled(Switch).attrs({
  trackColor: {
    false: "#E6E1F4",
    true: colors.mint,
  },
  thumbColor: "#FFFFFF",
  ios_backgroundColor: "#E6E1F4",
})``;
