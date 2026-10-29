import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
import { resetUnlockedStickers } from "../../utils/asyncStorage/stickerStorage";
import { resetPuzzleProgressByCharacters } from "../../utils/asyncStorage/puzzleProgressStorage";
import { triggerHaptic } from "../../utils/haptic";
import { useLanguage } from "../../context/LangaugeContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgressManagementScreen"
>;

type PuzzleCategory = "animal" | "flag" | "landmark";

type PuzzleResetItem = {
  category: PuzzleCategory;
  titleKey: string;
  characters: readonly string[];
};

// 각 퍼즐의 실제 저장 식별자와 일치해야 해.
const PUZZLE_RESET_ITEMS: readonly PuzzleResetItem[] = [
  {
    category: "animal",
    titleKey: "puzzle_animal_title",
    characters: [
      "rabbit",
      "polarbear",
      "bear",
      "lion",
      "pig",
      "penguin",
      "elephant",
    ],
  },
  {
    category: "flag",
    titleKey: "puzzle_flag_title",
    characters: ["korea", "usa", "japan", "uk", "australia", "china", "france"],
  },
  {
    category: "landmark",
    titleKey: "puzzle_landmark_title",
    characters: [
      "bigben",
      "pyramid",
      "eiffel",
      "pisa",
      "operahouse",
      "liberty",
      "tajmahal",
    ],
  },
];

export default function ProgressManagementScreen() {
  useLanguage();

  const navigation = useNavigation<NavigationProp>();

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
    options?: {
      showCancel?: boolean;
      confirmText?: string;
    },
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

  const handleResetGame = (mode: keyof typeof SETTING_LEVEL_CLEAR_INFO) => {
    const info = SETTING_LEVEL_CLEAR_INFO[mode] ?? {
      title: mode,
    };

    const gameTitle = info.title;

    triggerHaptic("light");

    showAlert(
      i18n.t("alert_reset_progress_title"),
      i18n.t("alert_reset_progress_msg", { gameTitle }),
      async () => {
        try {
          const result: unknown = await resetProgress(mode);
          const ok = result !== false;

          showAlert(
            ok
              ? i18n.t("alert_reset_success_title")
              : i18n.t("alert_reset_stickers_fail_title"),
            ok
              ? i18n.t("alert_reset_success_msg", { gameTitle })
              : i18n.t("alert_reset_stickers_fail_msg"),
          );
        } catch (error) {
          console.warn("게임 진행 기록 초기화 실패:", error);

          showAlert(
            i18n.t("alert_reset_stickers_fail_title"),
            i18n.t("alert_reset_stickers_fail_msg"),
          );
        }
      },
      {
        showCancel: true,
        confirmText: i18n.t("btn_reset"),
      },
    );
  };
  const handleResetPuzzle = (
    characters: readonly string[],
    gameTitle: string,
  ) => {
    triggerHaptic("light");

    showAlert(
      i18n.t("alert_reset_progress_title"),
      i18n.t("alert_reset_progress_msg", { gameTitle }),
      async () => {
        try {
          const result: unknown = await resetPuzzleProgressByCharacters([
            ...characters,
          ]);

          const ok = result !== false;

          showAlert(
            ok
              ? i18n.t("alert_reset_success_title")
              : i18n.t("alert_reset_stickers_fail_title"),
            ok
              ? i18n.t("alert_reset_success_msg", { gameTitle })
              : i18n.t("alert_reset_stickers_fail_msg"),
          );
        } catch (error) {
          console.warn("퍼즐 진행 기록 초기화 실패:", error);

          showAlert(
            i18n.t("alert_reset_stickers_fail_title"),
            i18n.t("alert_reset_stickers_fail_msg"),
          );
        }
      },
      {
        showCancel: true,
        confirmText: i18n.t("btn_reset"),
      },
    );
  };
  const handleResetStickers = () => {
    triggerHaptic("light");

    showAlert(
      i18n.t("alert_reset_stickers_title"),
      i18n.t("alert_reset_stickers_msg"),
      async () => {
        try {
          const result: unknown = await resetUnlockedStickers();
          const ok = result !== false;

          showAlert(
            ok
              ? i18n.t("alert_reset_stickers_success_title")
              : i18n.t("alert_reset_stickers_fail_title"),
            ok
              ? i18n.t("alert_reset_stickers_success_msg")
              : i18n.t("alert_reset_stickers_fail_msg"),
          );
        } catch (error) {
          console.warn("스티커북 초기화 실패:", error);

          showAlert(
            i18n.t("alert_reset_stickers_fail_title"),
            i18n.t("alert_reset_stickers_fail_msg"),
          );
        }
      },
      {
        showCancel: true,
        confirmText: i18n.t("btn_reset"),
      },
    );
  };
  return (
    <Container>
      <GradientBackground />

      <AppHeader
        title={i18n.t("progress_management_title")}
        onBackPress={() => navigation.goBack()}
      />

      <Content>
        {/* 일반 게임 진행 기록 */}
        <Section>
          <SectionTitle>{i18n.t("reset_progress_section")}</SectionTitle>

          <SectionDescription>
            {i18n.t("progress_management_game_desc")}
          </SectionDescription>

          <SettingCard>
            <ResetProgressButton
              gameType="color"
              onPress={() => handleResetGame("color")}
            />

            <ResetProgressButton
              gameType="shape"
              onPress={() => handleResetGame("shape")}
            />

            <ResetProgressButton
              gameType="category"
              onPress={() => handleResetGame("category")}
            />

            <ResetProgressButton
              gameType="size"
              onPress={() => handleResetGame("size")}
            />

            <ResetProgressButton
              gameType="pattern"
              onPress={() => handleResetGame("pattern")}
            />
          </SettingCard>
        </Section>

        {/* 퍼즐 놀이 진행 기록 */}
        <Section>
          <SectionTitle>{i18n.t("puzzle_reset_section")}</SectionTitle>

          <SectionDescription>
            {i18n.t("puzzle_reset_description")}
          </SectionDescription>

          <SettingCard>
            {PUZZLE_RESET_ITEMS.map(({ category, titleKey, characters }) => {
              const gameTitle = i18n.t(titleKey);

              return (
                <ResetPuzzleButtonRow
                  key={category}
                  activeOpacity={0.75}
                  onPress={() => handleResetPuzzle(characters, gameTitle)}
                >
                  <SettingInfo>
                    <IconBadge
                      style={{
                        backgroundColor: colors.softBlue,
                      }}
                    >
                      <Ionicons
                        name="extension-puzzle-outline"
                        size={21}
                        color={colors.blue}
                      />
                    </IconBadge>

                    <SettingTextWrapper>
                      <SettingTitle>{gameTitle}</SettingTitle>

                      <SettingDescription>
                        {i18n.t("puzzle_reset_item_description")}
                      </SettingDescription>
                    </SettingTextWrapper>
                  </SettingInfo>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textGroup.secondary}
                  />
                </ResetPuzzleButtonRow>
              );
            })}
          </SettingCard>
        </Section>

        {/* 스티커북 초기화 */}
        <Section>
          <SectionTitle>{i18n.t("reset_stickerbook_section")}</SectionTitle>

          <SectionDescription>
            {i18n.t("progress_management_sticker_desc")}
          </SectionDescription>

          <SettingCard>
            <ResetStickerButtonRow
              onPress={handleResetStickers}
              activeOpacity={0.75}
            >
              <SettingInfo>
                <IconBadge>
                  <Ionicons
                    name="trash-outline"
                    size={21}
                    color={colors.feedback.error}
                  />
                </IconBadge>

                <SettingTextWrapper>
                  <SettingTitle
                    style={{
                      color: colors.feedback.error,
                    }}
                  >
                    {i18n.t("reset_stickerbook_title")}
                  </SettingTitle>

                  <SettingDescription>
                    {i18n.t("reset_stickerbook_desc")}
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textGroup.secondary}
              />
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

const Container = styled.View`
  flex: 1;
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled(AppText)`
  margin-bottom: 8px;
  padding-left: 8px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 20px;
  font-weight: 800;
  color: ${colors.textGroup.primary};
`;

const SectionDescription = styled(AppText)`
  margin-bottom: 10px;
  padding-left: 8px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 14px;
  line-height: 20px;
  color: ${colors.textGroup.secondary};
`;

const SettingCard = styled.View`
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  gap: 12px;
  elevation: 2;
  box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
`;

const ResetPuzzleButtonRow = styled(TouchableOpacity)`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ResetStickerButtonRow = styled(TouchableOpacity)`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SettingInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const IconBadge = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: ${colors.feedback.errorSoft};
`;

const SettingTextWrapper = styled.View`
  flex: 1;
  padding-right: 12px;
`;

const SettingTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-weight: 700;
  color: ${colors.textGroup.primary};
`;

const SettingDescription = styled(AppText)`
  margin-top: 2px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 14px;
  color: ${colors.textGroup.secondary};
`;
