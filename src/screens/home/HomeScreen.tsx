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
  Background,
  BackgroundImage,
  BottomTab,
  CardBottom,
  CardDescription,
  CardImage,
  CardTitle,
  ComingSoon,
  ComingSoonText,
  Container,
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
import { triggerHaptic } from "../../utils/haptic";
import { getKoreanSubjectParticle } from "../../utils/korean";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

let hasShownGuardianNoticeThisSession = false;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  useLanguage();

  const BASE_WIDTH = 360;
  const BASE_HEIGHT = 800;

  const compactScale = Math.max(
    0.9,
    Math.min(1, width / BASE_WIDTH, height / BASE_HEIGHT),
  );

  const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
  const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);

  useEffect(() => {
    if (hasShownGuardianNoticeThisSession) {
      setGuardianNoticeLoaded(true);
      return;
    }
    const loadGuardianNoticeSetting = async () => {
      const enabled = await getGuardianNoticeEnabled();

      if (enabled) {
        setGuardianNoticeVisible(true);
      }
      hasShownGuardianNoticeThisSession = true;
      setGuardianNoticeLoaded(true);
    };

    loadGuardianNoticeSetting();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const goToStageMap = (gameType: GameType) => {
    if (gameType === "classification") {
      navigation.navigate("ClassificationMenuScreen");
      return;
    }
    if (gameType === "puzzle") {
      navigation.navigate("PuzzleMenuScreen");
      return;
    }
    navigation.navigate("StageMapScreen", { gameType });
  };

  const showLockedAlert = (gameName: string) => {
    setAlertTitle(i18n.t("alert_locked_title"));

    setAlertMessage(
      i18n.t("alert_locked_message", {
        gameName,
        particle: getKoreanSubjectParticle(gameName),
      }),
    );

    setAlertVisible(true);
  };

  // ⭐ 하단 탭바 높이 + 안전영역(insets.bottom)을 계산하여 스크롤 내용이 가리지 않도록 여유 공간 확보
  const bottomTabTotalHeight = 64 + Math.max(insets.bottom, 12) + 16;

  return (
    <Background>
      <BackgroundImage source={ASSETS.homeBackground} resizeMode="cover" />
      {/* ⭐ 상단 인셋을 직접 패딩으로 고정하여 툭 밀리는 덜컹거림 원천 차단 */}
      <Container style={{ paddingTop: insets.top }}>
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18 * compactScale,
            paddingTop: 5 * compactScale,
            // ⭐ 탭바에 콘텐츠가 가리지 않도록 동적 패딩 적용
            paddingBottom: bottomTabTotalHeight + 24,
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
                    triggerHaptic("light");
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
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomTab bottomInset={insets.bottom}>
          <TabItem active>
            <Ionicons name="home" size={24} color={COLORS.purple} />
            <TabLabel active>{i18n.t("nav_home")}</TabLabel>
          </TabItem>

          <TabItem
            onPress={() => {
              triggerHaptic("light");
              navigation.navigate("StickerGalleryScreen");
            }}
          >
            <Ionicons name="book-outline" size={24} color={COLORS.muted} />
            <TabLabel>{i18n.t("nav_book")}</TabLabel>
          </TabItem>

          <TabItem
            onPress={() => {
              triggerHaptic("light");
              navigation.navigate("SettingScreen" as never);
            }}
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
    </Background>
  );
}
