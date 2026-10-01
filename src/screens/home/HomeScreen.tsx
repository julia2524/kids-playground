import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import styled from "styled-components/native";

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
import { LinearGradient } from "expo-linear-gradient";
import { ASSETS } from "../../assets/assets";
import Mascot from "../../design-system/components/Mascot";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// 앱 실행 중 한 번만 보호자 안내
let hasShownGuardianNoticeThisSession = false;

const COLORS = {
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",

  background: "#F5F2FF",
  white: "#FFFFFF",

  text: "#29263D",
  secondaryText: "#68657A",
  muted: "#9C99AA",

  softBlue: "#EEF6FF",
  softPink: "#FFF1F7",
  softYellow: "#FFF8DD",
  softMint: "#E9FBF6",
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

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
      <Container>
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

          {/* 로켓 */}
          {/* <Rocket>
            <RocketText>🚀</RocketText>
          </Rocket> */}

          {/* 행성 */}
          {/* <HeroPlanet>
            <HeroPlanetText>🪐</HeroPlanetText>
          </HeroPlanet> */}
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
            paddingBottom: 100,
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
              <CardIllustration>
                <IllustrationText>🌈</IllustrationText>
                <IllustrationSmallText>⭐ 🔵 ⭐</IllustrationSmallText>
              </CardIllustration>

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
              <CardIllustration>
                <IllustrationText>🧩</IllustrationText>
                <IllustrationSmallText>⭐ ✨</IllustrationSmallText>
              </CardIllustration>

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
              <CardIllustration>
                <IllustrationText>🛸</IllustrationText>
                <IllustrationSmallText>✨ 🪐 ✨</IllustrationSmallText>
              </CardIllustration>

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
          <ComingSoon>
            <ComingSoonEmoji>✨ 👽 ✨</ComingSoonEmoji>
            <ComingSoonText>새로운 놀이가 기다리고 있어요!</ComingSoonText>
          </ComingSoon>

          {/* Footer */}
        </ScrollView>
        {/* Bottom Navigation */}
        <BottomTab>
          <TabItem active>
            <Ionicons name="home" size={24} color={COLORS.purple} />
            <TabLabel active>{i18n.t("nav_home")}</TabLabel>
          </TabItem>

          <TabItem onPress={() => console.log("도감")}>
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

// ==================================================
// Styled Components
// ==================================================

const Container = styled.View`
  flex: 1;
  /* background-color: ${COLORS.background}; */
`;

// --- Header ---
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 18px;
`;

const HeaderTitleGroup = styled.View``;

const LogoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LogoStar = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background-color: ${COLORS.yellow};
  justify-content: center;
  align-items: center;
  margin-right: 9px;
`;

const LogoStarText = styled.Text`
  font-size: 22px;
  color: ${COLORS.white};
`;

const LogoText = styled.Text`
  font-size: 20px;
  line-height: 19px;
  font-weight: 900;
  color: ${COLORS.purple};
`;

const HeaderSubText = styled.Text`
  font-size: 13px;
  color: ${COLORS.purple};
`;

const IconButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${COLORS.purple};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

// --- Hero ---
const HeroCard = styled.View`
  margin: 0px 18px 20px;
`;

const HeroTextArea = styled.View`
  width: 68%;
  z-index: 2;
`;

const HeroTitle = styled.Text`
  font-size: 25px;
  line-height: 32px;
  font-weight: 900;
  color: ${COLORS.text};
`;

const HeroDescription = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.secondaryText};
`;

// --- Filter ---
const FilterRow = styled.View`
  flex-direction: row;
  gap: 8px;

  margin-left: 18px;
  margin-right: 18px;
`;

const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  min-height: 52px;
  border-radius: 18px;
  background-color: ${(props) => (props.active ? COLORS.purple : COLORS.white)};
  align-items: center;
  justify-content: center;
  padding-horizontal: 4px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const FilterText = styled.Text<{ active?: boolean }>`
  margin-top: 3px;
  font-size: 11px;
  font-weight: 800;
  color: ${(props) => (props.active ? COLORS.white : COLORS.secondaryText)};
`;

// --- Game Grid & Cards ---
const GameGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 14px;
`;

const GameCard = styled.TouchableOpacity<{ bgColor: string }>`
  width: 48.2%;
  height: 190px;
  border-radius: 25px;
  overflow: hidden;
  padding: 13px;
  background-color: ${(props) => props.bgColor};
  border-width: 2px;
  border-color: ${COLORS.white};
  shadow-color: #000;
  shadow-opacity: 0.09;
  shadow-radius: 9px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

const CardIllustration = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IllustrationText = styled.Text<{ isSmall?: boolean }>`
  font-size: ${(props) => (props.isSmall ? "16px" : "57px")};
  margin-top: ${(props) => (props.isSmall ? "-6px" : "0px")};
`;

const IllustrationSmallText = styled.Text`
  margin-top: -6px;
  font-size: 16px;
`;

const CardBottom = styled.View`
  min-height: 58px;
  border-radius: 17px;
  background-color: ${COLORS.white};
  padding-horizontal: 11px;
  padding-vertical: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: ${COLORS.text};
`;

const CardDescription = styled.Text`
  margin-top: 2px;
  font-size: 11px;
  color: ${COLORS.secondaryText};
`;

const ArrowCircle = styled.View`
  width: 31px;
  height: 31px;
  border-radius: 16px;
  background-color: #f7f7fb;
  justify-content: center;
  align-items: center;
`;

// --- Coming Soon ---
const ComingSoon = styled.View`
  margin-top: 18px;
  min-height: 58px;
  border-radius: 22px;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e8e4f5;
`;

const ComingSoonEmoji = styled.Text`
  font-size: 16px;
  margin-bottom: 3px;
`;

const ComingSoonText = styled.Text`
  font-size: 13px;
  font-weight: 800;
  color: ${COLORS.secondaryText};
`;

// --- Footer ---
const Footer = styled.View`
  margin-top: 20px;
  height: 68px;
  border-radius: 25px;
  background-color: ${COLORS.white};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.07;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

const FooterItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

const FooterText = styled.Text<{ active?: boolean }>`
  margin-top: 2px;
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => (props.active ? COLORS.purple : COLORS.muted)};
`;

// --- Decoration Elements ---
const Star = styled.View<{ starType: "star1" | "star2" | "star3" }>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 4px;
  opacity: 0.8;

  ${(props) =>
    props.starType === "star1"
      ? `
        top: 110px;
        right: 26px;
        background-color: ${COLORS.yellow};
      `
      : ""}

  ${(props) =>
    props.starType === "star2"
      ? `
        top: 290px;
        left: 13px;
        background-color: ${COLORS.pink};
      `
      : ""}

  ${(props) =>
    props.starType === "star3"
      ? `
        top: 540px;
        right: 12px;
        background-color: ${COLORS.mint};
      `
      : ""}
`;

const DecorationPlanet = styled.View<{ planetType: "planet1" | "planet2" }>`
  position: absolute;
  border-radius: 999px;
  opacity: 0.25;

  ${(props) =>
    props.planetType === "planet1"
      ? `
        width: 100px;
        height: 100px;
        right: -48px;
        top: 170px;
        background-color: ${COLORS.blue};
      `
      : ""}

  ${(props) =>
    props.planetType === "planet2"
      ? `
        width: 70px;
        height: 70px;
        left: -35px;
        top: 630px;
        background-color: ${COLORS.pink};
      `
      : ""}
`;

const BottomTab = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${COLORS.white};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  elevation: 8;
`;

const TabItem = styled.TouchableOpacity<{ active?: boolean }>`
  align-items: center;
  justify-content: center;
`;

const TabLabel = styled.Text<{ active?: boolean }>`
  font-size: 11px;
  font-weight: 800;
  color: ${(props) => (props.active ? COLORS.purple : COLORS.muted)};
  margin-top: 3px;
`;

const CardImage = styled(Image)`
  flex: 1;
  width: 100%;
`;
