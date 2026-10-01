import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
    <Container>
      {/* 우주 장식 */}
      <Star starType="star1" />
      <Star starType="star2" />
      <Star starType="star3" />

      <DecorationPlanet planetType="planet1" />
      <DecorationPlanet planetType="planet2" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 24,
          paddingBottom: 30,
        }}
      >
        {/* Header */}
        <Header>
          <HeaderTitleGroup>
            <LogoRow>
              <LogoStar>
                <LogoStarText>★</LogoStarText>
              </LogoStar>

              <LogoText>Kids{"\n"}Playground</LogoText>
            </LogoRow>

            <HeaderSubText>{i18n.t("subtitle")}</HeaderSubText>
          </HeaderTitleGroup>

          <IconButton
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SettingScreen" as never)}
          >
            <Ionicons name="settings-outline" size={23} color={COLORS.purple} />
          </IconButton>
        </Header>

        {/* Hero */}
        <HeroCard>
          <HeroTextArea>
            <HeroSmall>✨ 오늘은 어떤 놀이를 해볼까?</HeroSmall>

            <HeroTitle>
              즐겁게 놀면서{"\n"}
              똑똑하게 배워봐요!
            </HeroTitle>

            <HeroDescription>
              우주 놀이동산에서 만나는{"\n"}
              다양한 놀이와 배움
            </HeroDescription>
          </HeroTextArea>

          {/* 로켓 */}
          <Rocket>
            <RocketText>🚀</RocketText>
          </Rocket>

          {/* 행성 */}
          <HeroPlanet>
            <HeroPlanetText>🪐</HeroPlanetText>
          </HeroPlanet>
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

        {/* Game Cards */}
        <GameGrid>
          {/* 분류 */}
          <GameCard
            activeOpacity={0.9}
            bgColor={COLORS.softPink}
            onPress={() => goToStageMap("classification")}
          >
            <CardIllustration>
              <IllustrationText>🍎</IllustrationText>
              <IllustrationText isSmall>🐶</IllustrationText>
              <IllustrationText isSmall>🚗</IllustrationText>
            </CardIllustration>

            <CardBottom>
              <View>
                <CardTitle>분류 놀이</CardTitle>
                <CardDescription>같은 것을 찾아볼까요?</CardDescription>
              </View>

              <ArrowCircle>
                <Ionicons name="arrow-forward" size={19} color={COLORS.pink} />
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
                <Ionicons name="arrow-forward" size={19} color={COLORS.blue} />
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
        <Footer>
          <FooterItem
            activeOpacity={0.8}
            onPress={
              () => console.log("스티커북")
              //   navigation.navigate("IntegratedStickerGalleryScreen", {
              //     initialTab: "category",
              //   })
            }
          >
            <Ionicons name="star-outline" size={25} color={COLORS.muted} />
            <FooterText>도감</FooterText>
          </FooterItem>

          <FooterItem>
            <Ionicons name="home" size={27} color={COLORS.purple} />
            <FooterText active>홈</FooterText>
          </FooterItem>

          <FooterItem
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SettingScreen" as never)}
          >
            <Ionicons name="settings-outline" size={25} color={COLORS.muted} />
            <FooterText>설정</FooterText>
          </FooterItem>
        </Footer>
      </ScrollView>

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
  );
}

// ==================================================
// Styled Components
// ==================================================

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

// --- Header ---
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 6px;
  font-size: 13px;
  color: ${COLORS.secondaryText};
`;

const IconButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${COLORS.white};
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
  min-height: 185px;
  border-radius: 28px;
  background-color: ${COLORS.white};
  padding: 22px;
  margin-bottom: 16px;
  overflow: hidden;
  border-width: 2px;
  border-color: #e7e0ff;
  shadow-color: ${COLORS.purple};
  shadow-opacity: 0.12;
  shadow-radius: 12px;
  shadow-offset: 0px 5px;
  elevation: 4;
`;

const HeroTextArea = styled.View`
  width: 68%;
  z-index: 2;
`;

const HeroSmall = styled.Text`
  font-size: 14px;
  font-weight: 800;
  color: ${COLORS.purple};
  margin-bottom: 9px;
`;

const HeroTitle = styled.Text`
  font-size: 25px;
  line-height: 32px;
  font-weight: 900;
  color: ${COLORS.text};
`;

const HeroDescription = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.secondaryText};
`;

const Rocket = styled.View`
  position: absolute;
  right: 13px;
  top: 24px;
`;

const RocketText = styled.Text`
  font-size: 70px;
`;

const HeroPlanet = styled.View`
  position: absolute;
  right: 13px;
  bottom: -12px;
`;

const HeroPlanetText = styled.Text`
  font-size: 62px;
`;

// --- Filter ---
const FilterRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
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
  ${(props) => props.isSmall && "margin-top: -6px;"}
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
    props.starType === "star1" &&
    `
      top: 110px;
      right: 26px;
      background-color: ${COLORS.yellow};
    `}

  ${(props) =>
    props.starType === "star2" &&
    `
      top: 290px;
      left: 13px;
      background-color: ${COLORS.pink};
    `}

  ${(props) =>
    props.starType === "star3" &&
    `
      top: 540px;
      right: 12px;
      background-color: ${COLORS.mint};
    `}
`;

const DecorationPlanet = styled.View<{ planetType: "planet1" | "planet2" }>`
  position: absolute;
  border-radius: 999px;
  opacity: 0.25;

  ${(props) =>
    props.planetType === "planet1" &&
    `
      width: 100px;
      height: 100px;
      right: -48px;
      top: 170px;
      background-color: ${COLORS.blue};
    `}

  ${(props) =>
    props.planetType === "planet2" &&
    `
      width: 70px;
      height: 70px;
      left: -35px;
      top: 630px;
      background-color: ${COLORS.pink};
    `}
`;
