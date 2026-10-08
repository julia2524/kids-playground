import React, { useRef, useState } from "react";
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

const GAMES: ClassificationGame[] = [
  {
    id: "color",
    title: "색깔 탐험대",
    subtitle: "색깔 행성",
    description: "같은 색을 찾아요!",
    accentColor: colors.accent.color,
    cardBg: colors.cardBg.color,
  },
  {
    id: "shape",
    title: "모양 탐험대",
    subtitle: "모양 행성",
    description: "같은 모양을 찾아요!",
    accentColor: colors.accent.shape,
    cardBg: colors.cardBg.shape,
  },
  {
    id: "size",
    title: "크기 탐험대",
    subtitle: "크기 행성",
    description: "크고 작은 것을 찾아요!",
    accentColor: colors.accent.size,
    cardBg: colors.cardBg.size,
  },
  {
    id: "category",
    title: "종류 탐험대",
    subtitle: "종류 행성",
    description: "같은 종류를 찾아요!",
    accentColor: colors.accent.category,
    cardBg: colors.cardBg.category,
  },
];

export default function ClassificationMenuScreen() {
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
        <Header>
          <BackButton
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color="#7C5CFF" />
          </BackButton>
          <HeaderText>분류 우주</HeaderText>
          <HeaderSpacer />
        </Header>

        <MainContainer>
          <CarouselArea>
            <TitleArea>
              <Title>어떤 행성을 탐험할까요?</Title>
              <Description>
                원하는 행성을 골라서 탐험을 시작해 보세요!
              </Description>
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
                        <StartButtonText>탐험 시작</StartButtonText>
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

// ============================================================
// 메인 화면과 일관된 스타일링
// ============================================================
const Screen = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`;

const MainContainer = styled.View`
  flex: 1;
`;

const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;

const BackButton = styled.TouchableOpacity`
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

const HeaderText = styled(AppText)`
  flex: 1;
  text-align: center;
  color: #29263d;
  font-size: 18px;
  font-weight: 900;
`;

const HeaderSpacer = styled.View`
  width: 40px;
`;
const TitleArea = styled.View`
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  margin-bottom: 35px;
`;

const Title = styled(AppText)`
  color: #29263d;
  font-size: 22px;
  font-weight: 900;
  text-align: center;
`;

const Description = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: 13px;
  margin-top: 4px;
  text-align: center;
`;

const CarouselArea = styled.View`
  flex: 1;
  justify-content: center;
`;

const GameCardWrapper = styled.View`
  width: ${CARD_WIDTH}px;
  margin-right: ${ITEM_SPACING}px;
`;

// 메인 화면의 말랑말랑한 둥근 카드 느낌
const GameCard = styled.TouchableOpacity<{ active: boolean; bgColor: string }>`
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

const PlanetArea = styled.View`
  height: 180px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlanetScene = styled.View`
  width: 180px;
  height: 150px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Orbit = styled.View`
  position: absolute;
  width: 180px;
  height: 80px;
  border-radius: 90px;
  transform: rotate(-15deg);
  align-items: center;
  justify-content: center;
`;

const OrbitLine = styled.View`
  position: absolute;
  width: 180px;
  height: 80px;
  border-radius: 90px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.6);
  border-style: dashed;
`;

const UFO = styled.View`
  position: absolute;
  right: -10px;
  bottom: -10px;
`;

const ShootingStarArea = styled.View`
  position: absolute;
  z-index: 1;
`;

const GameInfo = styled.View`
  align-items: center;

  margin-bottom: 12px;
`;

const GameTitle = styled(AppText)`
  color: #29263d;
  font-size: 20px;
  font-weight: 900;
`;

const GameDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: 13px;
  margin-top: 2px;
`;

// 메인 카드의 버튼처럼 동그라미 화살표 아이콘이 들어간 둥글둥글한 버튼
const StartButton = styled.View`
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

const StartButtonText = styled(AppText)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
  flex: 1;
  text-align: center;
`;

const ArrowCircle = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const BottomArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const ArrowButton = styled.TouchableOpacity`
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

const Dots = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#7C5CFF" : "#DCD7EE")};
`;
