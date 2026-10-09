import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import { RootStackParamList } from "../../navigation/types";

import i18n from "../../i18n";
import CustomAlert from "../../components/CustomAlert";
import GuardianNoticeModal from "../../components/GuardianNotice/GuardianNoticeModal";
import { useLanguage } from "../../context/LangaugeContext";
import { getGuardianNoticeEnabled } from "../../components/GuardianNotice/getGuardianNoticeEnabled";
import { GameType } from "../../types/game";
import { ASSETS } from "../../assets/assets";
import {
  ArrowCircle,
  BottomTab,
  CardBottom,
  CardDescription,
  CardImage,
  CardTitle,
  ComingSoon,
  ComingSoonEmoji,
  ComingSoonText,
  Container,
  FilterButton,
  FilterRow,
  FilterText,
  GameCard,
  GameGrid,
  Header,
  HeaderSubText,
  HeaderTitleGroup,
  HeroCard,
  HeroDescription,
  HeroTextArea,
  HeroTitle,
  LogoRow,
  LogoText,
  TabItem,
  TabLabel,
} from "./homeStyles";
import { COLORS } from "../../design-system/tokens/colors";
import { CATEGORY_FILTERS, GAME_CARDS } from "../../constants/game";
// ⭐ 단일 통합 색상 테마 import

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// 앱 실행 중 한 번만 보호자 안내
let hasShownGuardianNoticeThisSession = false;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets(); // ⭐ 하단 안전 영역 값 가져오기
  const { width, height } = useWindowDimensions();

  useLanguage();

  // ==================================================
  // Responsive
  // ==================================================

  // 기준 화면: 일반적인 휴대폰
  const BASE_WIDTH = 360;
  const BASE_HEIGHT = 800;

  // 화면이 작아졌을 때만 공간을 살짝 압축
  // 큰 화면에서는 절대 확대하지 않음
  const compactScale = Math.max(
    0.9,
    Math.min(1, width / BASE_WIDTH, height / BASE_HEIGHT),
  );

  const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
  const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);
  // ==================================================
  // 보호자 안내
  // ==================================================

  useEffect(() => {
    // 이미 이번 세션에서 한 번 보여줬으면 더 이상 안 띄움
    if (hasShownGuardianNoticeThisSession) {
      setGuardianNoticeLoaded(true);
      return;
    }
    const loadGuardianNoticeSetting = async () => {
      const enabled = await getGuardianNoticeEnabled();

      if (enabled) {
        setGuardianNoticeVisible(true);
      }
      hasShownGuardianNoticeThisSession = true; // 이번 앱 실행에서는 더 이상 안 보여줌
      setGuardianNoticeLoaded(true);
    };

    loadGuardianNoticeSetting();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // ==================================================
  // Navigation
  // ==================================================
  const goToStageMap = (gameType: GameType) => {
    if (gameType === "classification") {
      navigation.navigate("ClassificationMenuScreen");
      return;
    }
    navigation.navigate("StageMapScreen", { gameType });
  };

  const showLockedAlert = (gameName: string) => {
    setAlertTitle(i18n.t("alert_locked_title"));
    setAlertMessage(
      i18n.t("alert_locked_message", {
        gameName,
      }),
    );
    setAlertVisible(true);
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <ImageBackground
      source={ASSETS.homeBackground}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Container edges={["top"]}>
        {/* Header */}
        <Header>
          <HeaderTitleGroup>
            <LogoRow>
              <LogoText>Kids{"\n"}Playground</LogoText>
            </LogoRow>

            <HeaderSubText>{i18n.t("subtitle")}</HeaderSubText>
          </HeaderTitleGroup>
        </Header>

        {/* Hero */}
        <HeroCard>
          <HeroTextArea>
            <HeroTitle>{i18n.t("hero_title")}</HeroTitle>

            <HeroDescription>{i18n.t("hero_desc")}</HeroDescription>
          </HeroTextArea>
        </HeroCard>

        {/* 1. 카테고리 필터 바 */}
        <FilterRow>
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = filter.id === "all"; // 필터 선택 상태 관리 시 활성화
            return (
              <FilterButton
                key={filter.id}
                active={isActive}
                activeOpacity={0.8}
                onPress={() => {
                  if (filter.id === "classification")
                    goToStageMap("classification");
                }}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={19}
                  color={isActive ? COLORS.white : filter.iconColor}
                />
                <FilterText active={isActive}>
                  {i18n.t(filter.labelKey)}
                </FilterText>
              </FilterButton>
            );
          })}
        </FilterRow>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18 * compactScale,
            paddingTop: 5 * compactScale,
            paddingBottom: 200 * compactScale,
          }}
        >
          <GameGrid>
            {GAME_CARDS.map((card) => {
              const cardTitle = i18n.t(card.titleKey);

              return (
                <GameCard
                  key={card.id}
                  activeOpacity={0.9}
                  bgColor={card.bgColor}
                  onPress={() => {
                    if (card.isUnlocked) {
                      goToStageMap(card.id as any);
                    } else {
                      showLockedAlert(cardTitle);
                    }
                  }}
                >
                  <CardImage source={card.image} resizeMode="contain" />

                  <CardBottom>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>{i18n.t(card.descKey)}</CardDescription>
                  </CardBottom>
                </GameCard>
              );
            })}
          </GameGrid>

          {/* 번역 검증! */}
          <ComingSoon onPress={() => navigation.navigate("LanguageScreen")}>
            {/* <ComingSoonEmoji>🌐</ComingSoonEmoji> */}
            <ComingSoonText>🌐 번역 검증하기</ComingSoonText>
          </ComingSoon>
        </ScrollView>
        {/* Bottom Navigation */}
        <BottomTab bottomInset={insets.bottom}>
          <TabItem active>
            <Ionicons name="home" size={24} color={COLORS.purple} />
            <TabLabel active>{i18n.t("nav_home")}</TabLabel>
          </TabItem>

          <TabItem onPress={() => navigation.navigate("StickerGalleryScreen")}>
            <Ionicons name="star-outline" size={24} color={COLORS.muted} />
            <TabLabel>{i18n.t("nav_book")}</TabLabel>
          </TabItem>

          <TabItem
            onPress={() => navigation.navigate("SettingScreen" as never)}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.muted} />
            <TabLabel>{i18n.t("nav_settings")}</TabLabel>
          </TabItem>
        </BottomTab>

        {/* 보호자 안내 */}
        {guardianNoticeLoaded && (
          <GuardianNoticeModal
            visible={guardianNoticeVisible}
            onClose={() => setGuardianNoticeVisible(false)}
          />
        )}

        {/* 잠금 알림 */}
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </Container>
    </ImageBackground>
  );
}
