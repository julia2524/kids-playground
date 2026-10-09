import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../utils/AppText";
import { RootStackParamList } from "../../navigation/types";
import { ClassificationGameType } from "../../types/game";
import ClassificationPlanet from "../../components/illustrations/ClassificationPlanet";
import SpaceUFO from "../../components/illustrations/SpaceUFO";
import ShootingStar from "../../components/illustrations/ShootingStar";
import { ASSETS } from "../../assets/assets";
import AppHeader from "../../components/AppHeader";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";

// ============================================================
// 메인 화면과 통일된 몽환 파스텔 컬러 팔레트
// ============================================================
export const colors = {
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",
  white: "#FFFFFF",
  background: "#F2F5FF", // 메인화면과 유사한 은은한 연보라/하늘 배경
  text: "#29263D",
  secondaryText: "#7E7B9A",

  // 테마별 카드 배경 (메인 화면처럼 부드러운 파스텔 틴트)
  cardBg: {
    color: "#FFF0F5", // 분홍 파스텔
    shape: "#F0F5FF", // 하늘 파스텔
    size: "#EDFAF6", // 민트 파스텔
    category: "#FFF9E6", // 노랑 파스텔
  },

  // 버튼 & 강조 보더 색상
  accent: {
    color: "#FF6FAE",
    shape: "#4D8DFF",
    size: "#34CDB2",
    category: "#FFB020",
  },
} as const;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.76;
const ITEM_SPACING = 16;
const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;
const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

type ClassificationGame = {
  id: ClassificationGameType;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  cardBg: string;
};
const MENU_GAME_CONFIGS = [
  {
    id: "color",
    titleKey: "planet_color_title",
    subtitleKey: "planet_color_subtitle",
    descKey: "planet_color_desc",
    accentColor: colors.accent.color,
    cardBg: colors.cardBg.color,
  },
  {
    id: "shape",
    titleKey: "planet_shape_title",
    subtitleKey: "planet_shape_subtitle",
    descKey: "planet_shape_desc",
    accentColor: colors.accent.shape,
    cardBg: colors.cardBg.shape,
  },
  {
    id: "size",
    titleKey: "planet_size_title",
    subtitleKey: "planet_size_subtitle",
    descKey: "planet_size_desc",
    accentColor: colors.accent.size,
    cardBg: colors.cardBg.size,
  },
  {
    id: "category",
    titleKey: "planet_category_title",
    subtitleKey: "planet_category_subtitle",
    descKey: "planet_category_desc",
    accentColor: colors.accent.category,
    cardBg: colors.cardBg.category,
  },
] as const;

export default function ClassificationMenuScreen() {
  const { locale } = useLanguage(); // 👈 언어 변경 상태를 감지

  // locale이 변경될 때마다 GAMES의 i18n.t 번역 갱신!
  const GAMES = useMemo(() => {
    return MENU_GAME_CONFIGS.map((item) => ({
      ...item,
      title: i18n.t(item.titleKey),
      subtitle: i18n.t(item.subtitleKey),
      description: i18n.t(item.descKey),
    }));
  }, [locale]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<ClassificationGame>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    if (index !== currentIndex && index >= 0 && index < GAMES.length) {
      setCurrentIndex(index);
    }
  };

  const handleSelectGame = (game: ClassificationGame) => {
    navigation.navigate("StageMapScreen", { gameType: game.id });
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= GAMES.length) return;
    flatListRef.current?.scrollToOffset({
      offset: index * SNAP_INTERVAL,
      animated: true,
    });
  };

  return (
    <ImageBackground
      source={ASSETS.classificationMenuBackground}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Screen edges={["top", "bottom"]}>
        {/* 고정 헤더 */}

        <AppHeader
          title={i18n.t("classification_space_title")}
          onBackPress={() => {
            navigation.navigate("Home");
          }}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />
        <MainContainer>
          <CarouselArea>
            <TitleArea>
              <Title>{i18n.t("classification_hero_title")}</Title>
              <Description>{i18n.t("classification_hero_desc")}</Description>
            </TitleArea>
            <FlatList
              ref={flatListRef}
              data={GAMES}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: SIDE_SPACE,
                alignItems: "center",
              }}
              style={{ flexGrow: 0 }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                return (
                  <GameCardWrapper>
                    <GameCard
                      active={isActive}
                      bgColor={item.cardBg}
                      activeOpacity={0.95}
                      onPress={() => handleSelectGame(item)}
                    >
                      <PlanetArea>
                        <ShootingStarArea style={{ top: 10, left: 12 }}>
                          <ShootingStar color={item.accentColor} size={38} />
                        </ShootingStarArea>

                        <PlanetScene>
                          {/* 크기 변경 애니메이션 제거 (145px 고정) */}
                          <ClassificationPlanet type={item.id} size={145} />
                          <Orbit>
                            <OrbitLine />
                            <UFO>
                              <SpaceUFO size={46} />
                            </UFO>
                          </Orbit>
                        </PlanetScene>
                      </PlanetArea>

                      <GameInfo>
                        <GameTitle>{item.title}</GameTitle>
                        <GameDescription>{item.description}</GameDescription>
                      </GameInfo>

                      <StartButton
                        style={{ backgroundColor: item.accentColor }}
                      >
                        <StartButtonText>
                          {i18n.t("classification_start")}
                        </StartButtonText>
                      </StartButton>
                    </GameCard>
                  </GameCardWrapper>
                );
              }}
            />
          </CarouselArea>

          {/* 하단 인디케이터 & 화살표 */}
          <BottomArea>
            <ArrowButton
              onPress={() => scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={currentIndex === 0 ? "#D0CCE4" : "#7C5CFF"}
              />
            </ArrowButton>

            <Dots>
              {GAMES.map((game, index) => (
                <Dot key={game.id} active={index === currentIndex} />
              ))}
            </Dots>

            <ArrowButton
              onPress={() => scrollToIndex(currentIndex + 1)}
              disabled={currentIndex === GAMES.length - 1}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  currentIndex === GAMES.length - 1 ? "#D0CCE4" : "#7C5CFF"
                }
              />
            </ArrowButton>
          </BottomArea>
        </MainContainer>
      </Screen>
    </ImageBackground>
  );
}

export const Screen = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`;

export const MainContainer = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  shadow-color: #7c5cff;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  elevation: 3;
`;

export const HeaderText = styled(AppText)`
  flex: 1;
  text-align: center;
  color: #29263d;
  font-size: ${(props) => props.theme.typography.button.fontSize}px;
`;

export const HeaderSpacer = styled.View`
  width: 40px;
`;

export const TitleArea = styled.View`
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  margin-bottom: 35px;
`;

export const Title = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h2.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const Description = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 4px;
  text-align: center;
`;

export const CarouselArea = styled.View`
  flex: 1;
  justify-content: center;
`;

export const GameCardWrapper = styled.View`
  width: ${CARD_WIDTH}px;
  margin-right: ${ITEM_SPACING}px;
`;

// 메인 화면의 말랑말랑한 둥근 카드 느낌
export const GameCard = styled.TouchableOpacity<{
  active: boolean;
  bgColor: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 32px;
  padding: 16px;
  border-width: 3px;
  border-color: #ffffff;

  /* 부드러운 그림자 효과 */
  shadow-color: #a3a8cc;
  shadow-offset: 0px 8px;
  shadow-opacity: ${({ active }) => (active ? 0.2 : 0.08)};
  shadow-radius: 12px;
  elevation: ${({ active }) => (active ? 5 : 2)};

  /* 스케일 애니메이션 대신 불투명도 차이만 적용 */
  opacity: ${({ active }) => (active ? 1 : 0.65)};
`;

export const PlanetArea = styled.View`
  height: 180px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PlanetScene = styled.View`
  width: 180px;
  height: 150px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Orbit = styled.View`
  position: absolute;
  width: 180px;
  height: 80px;
  border-radius: 90px;
  transform: rotate(-15deg);
  align-items: center;
  justify-content: center;
`;

export const OrbitLine = styled.View`
  position: absolute;
  width: 180px;
  height: 80px;
  border-radius: 90px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.6);
  border-style: dashed;
`;

export const UFO = styled.View`
  position: absolute;
  right: -10px;
  bottom: -10px;
`;

export const ShootingStarArea = styled.View`
  position: absolute;
  z-index: 1;
`;

export const GameInfo = styled.View`
  align-items: center;
  margin-bottom: 12px;
`;

export const GameTitle = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h3.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
`;

export const GameDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 2px;
`;

// 메인 카드의 버튼처럼 동그라미 화살표 아이콘이 들어간 둥글둥글한 버튼
export const StartButton = styled.View`
  height: 50px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 3;
`;

export const StartButtonText = styled(AppText)`
  color: #ffffff;
  font-size: ${(props) => props.theme.typography.body.fontSize}px;

  flex: 1;
  text-align: center;
`;

export const ArrowCircle = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

export const BottomArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Dots = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#7C5CFF" : "#DCD7EE")};
`;
