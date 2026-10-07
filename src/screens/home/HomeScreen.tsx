import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
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
// ⭐ 단일 통합 색상 테마 import

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// 앱 실행 중 한 번만 보호자 안내
let hasShownGuardianNoticeThisSession = false;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets(); // ⭐ 하단 안전 영역 값 가져오기

  useLanguage();

  const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
  const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // ==================================================
  // 보호자 안내
  // ==================================================

  useEffect(() => {
    if (hasShownGuardianNoticeThisSession) {
      setGuardianNoticeLoaded(true);
      return;
    }

    const load = async () => {
      const enabled = await getGuardianNoticeEnabled();

      if (enabled) {
        setGuardianNoticeVisible(true);
      }

      hasShownGuardianNoticeThisSession = true;
      setGuardianNoticeLoaded(true);
    };

    load();
  }, []);

  // ==================================================
  // Navigation
  // ==================================================
  const goToStageMap = (gameType: GameType) => {
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

          {/* <IconButton
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SettingScreen" as never)}
          >
            <Mascot size={50} />
          </IconButton> */}
        </Header>

        {/* Hero */}
        <HeroCard>
          <HeroTextArea>
            {/* <HeroSmall>✨ 오늘은 어떤 놀이를 해볼까?</HeroSmall> */}

            <HeroTitle>
              즐겁게 놀면서{"\n"}
              똑똑하게 배워봐요!
            </HeroTitle>

            <HeroDescription>
              우주 놀이동산에서 만나는{"\n"}
              다양한 놀이와 배움!
            </HeroDescription>
          </HeroTextArea>
        </HeroCard>
        {/* Game filter */}
        <FilterRow>
          <FilterButton active>
            <Ionicons name="sparkles" size={19} color={COLORS.white} />
            <FilterText active>전체</FilterText>
          </FilterButton>

          <FilterButton
            activeOpacity={0.8}
            onPress={() => goToStageMap("classification")}
          >
            <Ionicons name="grid-outline" size={19} color={COLORS.purple} />
            <FilterText>분류</FilterText>
          </FilterButton>

          <FilterButton>
            <Ionicons name="repeat-outline" size={19} color={COLORS.blue} />
            <FilterText>패턴</FilterText>
          </FilterButton>

          <FilterButton>
            <Ionicons
              name="extension-puzzle-outline"
              size={19}
              color={COLORS.pink}
            />
            <FilterText>퍼즐</FilterText>
          </FilterButton>

          <FilterButton>
            <Ionicons name="magnet-outline" size={19} color={COLORS.mint} />
            <FilterText>미로</FilterText>
          </FilterButton>
        </FilterRow>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: 24,
            paddingBottom: 200,
          }}
        >
          {/* Game Cards */}
          <GameGrid>
            {/* 분류 */}
            <GameCard
              activeOpacity={0.9}
              bgColor={COLORS.softPink}
              onPress={() => goToStageMap("classification")}
            >
              <CardImage source={ASSETS.cardClassification} />

              <CardBottom>
                <View>
                  <CardTitle>분류 놀이</CardTitle>
                  <CardDescription>같은 것을 찾아볼까요?</CardDescription>
                </View>

                <ArrowCircle>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.pink}
                  />
                </ArrowCircle>
              </CardBottom>
            </GameCard>

            {/* 패턴 */}
            <GameCard
              activeOpacity={0.9}
              bgColor={COLORS.softBlue}
              onPress={() => showLockedAlert("패턴 놀이")}
            >
              <CardImage source={ASSETS.cardPattern} />

              <CardBottom>
                <View>
                  <CardTitle>패턴 놀이</CardTitle>
                  <CardDescription>규칙을 찾아볼까요?</CardDescription>
                </View>

                <ArrowCircle>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.blue}
                  />
                </ArrowCircle>
              </CardBottom>
            </GameCard>

            {/* 퍼즐 */}
            <GameCard
              activeOpacity={0.9}
              bgColor={COLORS.softYellow}
              onPress={() => showLockedAlert("퍼즐 맞추기")}
            >
              <CardImage source={ASSETS.cardPuzzle} />

              <CardBottom>
                <View>
                  <CardTitle>퍼즐 맞추기</CardTitle>
                  <CardDescription>조각을 맞춰볼까요?</CardDescription>
                </View>

                <ArrowCircle>
                  <Ionicons name="arrow-forward" size={19} color="#E8A900" />
                </ArrowCircle>
              </CardBottom>
            </GameCard>

            {/* 미로 */}
            <GameCard
              activeOpacity={0.9}
              bgColor={COLORS.softMint}
              onPress={() => showLockedAlert("미로 찾기")}
            >
              <CardImage source={ASSETS.cardMaze} />

              <CardBottom>
                <View>
                  <CardTitle>미로 찾기</CardTitle>
                  <CardDescription>길을 찾아갈까요?</CardDescription>
                </View>

                <ArrowCircle>
                  <Ionicons name="arrow-forward" size={19} color="#16A58D" />
                </ArrowCircle>
              </CardBottom>
            </GameCard>
          </GameGrid>

          {/* Coming soon */}
          {/* <ComingSoon>
            <ComingSoonEmoji>✨ 👽 ✨</ComingSoonEmoji>
            <ComingSoonText>새로운 놀이가 기다리고 있어요!</ComingSoonText>
          </ComingSoon> */}

          {/* Footer */}
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
