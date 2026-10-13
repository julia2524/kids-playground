import React, { useEffect, useState } from "react";
import { Switch, TouchableOpacity } from "react-native";
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
import { resetProgress } from "../../utils/asyncStorage/progressStorage";
import {
  getGuardianNoticeEnabled,
  setGuardianNoticeEnabled,
} from "../../components/GuardianNotice/getGuardianNoticeEnabled";
import { resetUnlockedStickers } from "../../utils/asyncStorage/stickerStorage";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useLanguage } from "../../context/LangaugeContext";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import {
  getCorrectEffectEnabled,
  getSoundEnabled,
  setCorrectEffectEnabled,
  setSoundEnabled,
} from "../../utils/asyncStorage/audioSettingsStorage";
import { syncHapticGlobalState, triggerHaptic } from "../../utils/haptic";
import {
  getHapticEnabled,
  setHapticEnabled,
} from "../../utils/asyncStorage/hapticSettingsStorage";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SettingScreen"
>;

export default function SettingScreen() {
  useLanguage();
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
  // 진행 상황 초기화
  // =========================
  const handleResetGame = (mode: keyof typeof SETTING_LEVEL_CLEAR_INFO) => {
    const info = SETTING_LEVEL_CLEAR_INFO[mode] ?? { title: "색상 분류" };
    const gameTitle = info.title;

    showAlert(
      i18n.t("alert_reset_progress_title"),
      i18n.t("alert_reset_progress_msg", { gameTitle }),
      async () => {
        await resetProgress(mode);
        showAlert(
          i18n.t("alert_reset_success_title"),
          i18n.t("alert_reset_success_msg", { gameTitle }),
        );
      },
      { showCancel: true, confirmText: i18n.t("btn_reset") },
    );
  };

  const handleResetColor = () => {
    triggerHaptic("light");
    handleResetGame("color");
  };
  const handleResetShape = () => {
    triggerHaptic("light");
    handleResetGame("shape");
  };
  const handleResetCategory = () => {
    triggerHaptic("light");
    handleResetGame("category");
  };

  // =========================
  // 보호자 안내 설정 연동
  // =========================
  const [guardianNoticeEnabled, setGuardianNoticeEnabledState] = useState(true);

  // 화면에 진입할 때마다 저장된 설정 불러오기
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

  // 스위치 변경 시 AsyncStorage에 즉시 저장
  const handleGuardianNoticeToggle = async (value: boolean) => {
    triggerHaptic("light");
    setGuardianNoticeEnabledState(value);
    await setGuardianNoticeEnabled(value);
  };

  // =========================
  // 임시 소리 설정
  // =========================

  const [soundEffect, setSoundEffect] = useState(true);
  // const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [correctEffect, setCorrectEffect] = useState(true);

  const { backgroundMusic, setBackgroundMusic } = useBackgroundMusic();
  // 💡 BGM 스위치 토글 핸들러
  const handleBgmToggle = async (value: boolean) => {
    triggerHaptic("light"); // 터치 햅틱 피드백 실행
    await setBackgroundMusic(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;

      const loadSettings = async () => {
        const enabled = await getSoundEnabled();
        const correctEnabled = await getCorrectEffectEnabled();
        const guardianEnabled = await getGuardianNoticeEnabled();

        if (!isMounted) return;

        setSoundEffect(enabled);
        setCorrectEffect(correctEnabled);
        setGuardianNoticeEnabledState(guardianEnabled);
      };

      loadSettings();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  const handleSoundToggle = async (value: boolean) => {
    triggerHaptic("light");
    setSoundEffect(value);
    await setSoundEnabled(value);
  };
  const handleCorrectToggle = async (value: boolean) => {
    triggerHaptic("light");
    setCorrectEffect(value);
    await setCorrectEffectEnabled(value);
  };

  //   // 🎁 스티커 수집 기록 전체 초기화
  const handleResetStickers = () => {
    triggerHaptic("light");
    showAlert(
      i18n.t("alert_reset_stickers_title"),
      i18n.t("alert_reset_stickers_msg"),
      async () => {
        const ok = await resetUnlockedStickers();
        showAlert(
          ok
            ? i18n.t("alert_reset_stickers_success_title")
            : i18n.t("alert_reset_stickers_fail_title"),
          ok
            ? i18n.t("alert_reset_stickers_success_msg")
            : i18n.t("alert_reset_stickers_fail_msg"),
        );
      },
      { showCancel: true, confirmText: i18n.t("btn_reset") },
    );
  };
  const [hapticEnabled, setHapticEnabledState] = useState(true);

  // 설정 불러오기 (useEffect 내부)
  useEffect(() => {
    getHapticEnabled().then(setHapticEnabledState);
  }, []);

  // 토글 핸들러
  const handleHapticToggle = async (value: boolean) => {
    setHapticEnabledState(value);
    await setHapticEnabled(value);
    await syncHapticGlobalState(); // 전역 캐시 동기화

    if (value) {
      triggerHaptic("light"); // 켜질 때 가볍게 테스트 진동 울려주기!
    }
  };

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        title={i18n.t("nav_settings")}
        onBackPress={() => navigation.goBack()}
      />

      <Content>
        {/* =========================
            💡 언어 설정 (새로 추가)
           ========================= */}
        <Section>
          <SectionTitle>{i18n.t("language_setting")}</SectionTitle>
          <SettingCard>
            <LanguageSwitcher />
          </SettingCard>
        </Section>
        {/* 🛡️ 보호자 안내 설정 */}
        <Section>
          <SectionTitle>{i18n.t("guardian_section")}</SectionTitle>
          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: colors.softBlue }}>
                  <Ionicons
                    name="information-circle"
                    size={22}
                    color={colors.blue}
                  />
                </IconBadge>
                <SettingTextWrapper>
                  <SettingTitle>{i18n.t("guardian_popup_title")}</SettingTitle>
                  <SettingDescription>
                    {i18n.t("guardian_popup_desc")}
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
              <StyledSwitch
                value={guardianNoticeEnabled}
                onValueChange={handleGuardianNoticeToggle} // 👈 변경 핸들러 연결
              />
            </SettingRow>
          </SettingCard>
        </Section>

        {/* =========================
            소리 설정
           ========================= */}

        <Section>
          <SectionTitle>{i18n.t("sound_section")}</SectionTitle>

          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: colors.softMint }}>
                  <Ionicons name="volume-high" size={24} color={colors.mint} />
                </IconBadge>

                <SettingTextWrapper>
                  <SettingTitle>{i18n.t("sfx_title")}</SettingTitle>
                  <SettingDescription>{i18n.t("sfx_desc")}</SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <StyledSwitch
                value={soundEffect}
                onValueChange={handleSoundToggle}
              />
            </SettingRow>

            <Divider />

            <SettingRow>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: colors.softPink }}>
                  <Ionicons
                    name="musical-notes"
                    size={24}
                    color={colors.pink}
                  />
                </IconBadge>

                <SettingTextWrapper>
                  <SettingTitle>{i18n.t("bgm_title")}</SettingTitle>
                  <SettingDescription>{i18n.t("bgm_desc")}</SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
              <StyledSwitch
                value={backgroundMusic}
                onValueChange={handleBgmToggle}
              />
            </SettingRow>

            <Divider />

            <SettingRow>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: colors.softYellow }}>
                  <Ionicons name="sparkles" size={24} color="#FBBF24" />
                </IconBadge>

                <SettingTextWrapper>
                  <SettingTitle>{i18n.t("correct_sfx_title")}</SettingTitle>
                  <SettingDescription>
                    {i18n.t("correct_sfx_desc")}
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <StyledSwitch
                value={correctEffect}
                onValueChange={handleCorrectToggle}
              />
            </SettingRow>
          </SettingCard>
        </Section>

        {/* 🛡️ 햅틱 설정 */}
        <Section>
          <SectionTitle>{i18n.t("haptic_section")}</SectionTitle>
          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <IconBadge style={{ backgroundColor: colors.softPink }}>
                  <Ionicons name="finger-print" size={22} color={colors.pink} />
                </IconBadge>
                <SettingTextWrapper>
                  <SettingTitle>{i18n.t("haptic_title")}</SettingTitle>
                  <SettingDescription>
                    {i18n.t("haptic_desc")}
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
              <StyledSwitch
                value={hapticEnabled}
                onValueChange={handleHapticToggle} // 👈 변경 핸들러 연결
              />
            </SettingRow>
          </SettingCard>
        </Section>
        {/* 🔄 진행 상황 초기화 */}
        <Section>
          <SectionTitle>{i18n.t("reset_progress_section")}</SectionTitle>
          <SettingCard>
            <ResetProgressButton gameType="color" onPress={handleResetColor} />
            <ResetProgressButton gameType="shape" onPress={handleResetShape} />
            <ResetProgressButton
              gameType="category"
              onPress={handleResetCategory}
            />
          </SettingCard>
        </Section>

        <Section>
          <SectionTitle>{i18n.t("reset_stickerbook_section")}</SectionTitle>
          <SettingCard>
            <ResetStickerButtonRow onPress={handleResetStickers}>
              <SettingInfo>
                <IconBadge
                  style={{ backgroundColor: colors.feedback.errorSoft }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.feedback.error}
                  />
                </IconBadge>

                <SettingTextWrapper>
                  <SettingTitle style={{ color: colors.feedback.error }}>
                    {i18n.t("reset_stickerbook_title")}
                  </SettingTitle>

                  <SettingDescription>
                    {i18n.t("reset_stickerbook_desc")}
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>
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
  gap: 12px;
  elevation: 2;
  box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
`;

export const SettingRow = styled.View`
  min-height: 68px;
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
  font-size: 14px;
  color: ${colors.textGroup.secondary};
`;

export const Divider = styled.View`
  height: 1.5px;
  background-color: ${colors.border.default};
  opacity: 0.5;
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

export const ResetStickerButtonRow = styled.TouchableOpacity`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
