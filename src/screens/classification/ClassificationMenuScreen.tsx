// import React, { useRef, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from "react-native";
// import styled from "styled-components/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { AppText } from "../../utils/AppText";
// import { RootStackParamList } from "../../navigation/types";
// import { ClassificationGameType } from "../../types/game";

// // ============================================================
// // Theme / Color Definitions
// // ============================================================

// export const colors = {
//   purple: "#7C5CFF",
//   blue: "#4D8DFF",
//   pink: "#FF6FAE",
//   yellow: "#FFD95A",
//   mint: "#55D6BE",

//   white: "#FFFFFF",
//   black: "#000000",

//   softBlue: "#EEF6FF",
//   softPink: "#FFF1F7",
//   softYellow: "#FFF8DD",
//   softMint: "#E9FBF6",

//   background: "#F5F2FF",
//   text: "#29263D",
//   secondaryText: "#68657A",
//   muted: "#9C99AA",

//   brand: {
//     primary: "#7C5CFF",
//     blue: "#4D8DFF",
//     pink: "#FF6FAE",
//     yellow: "#FFD95A",
//     mint: "#55D6BE",
//   },
//   textGroup: {
//     primary: "#29263D",
//     secondary: "#68657A",
//     muted: "#9C99AA",
//     inverse: "#FFFFFF",
//   },
//   button: {
//     primary: "#7C5CFF",
//     primaryText: "#FFFFFF",
//     secondary: "#F2EFFD",
//     secondaryText: "#29263D",
//     disabled: "#E6E1F4",
//     disabledText: "#9C99AA",
//   },
//   feedback: {
//     success: "#35C98B",
//     successSoft: "#E7FAF2",
//     retry: "#FFB84D",
//     retrySoft: "#FFF5E3",
//     error: "#FF7A7A",
//     errorSoft: "#FFF0F0",
//     info: "#65A8FF",
//     infoSoft: "#EDF5FF",
//   },
//   border: {
//     default: "#E6E1F4",
//     strong: "#B7B0DD",
//     dashed: "#D8D2F1",
//   },
// } as const;

// export const COLORS = colors;

// // ============================================================
// // Constants
// // ============================================================

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// const CARD_WIDTH = SCREEN_WIDTH * 0.78;
// const ITEM_SPACING = 20; // 스냅 간격용
// const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;
// const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// type ClassificationGame = {
//   id: ClassificationGameType;
//   title: string;
//   subtitle: string;
//   description: string;
//   emoji: string;
//   planetColor: string;
//   accentColor: string;
// };

// const GAMES: ClassificationGame[] = [
//   {
//     id: "color",
//     title: "색깔 탐험대",
//     subtitle: "색깔 행성",
//     description: "같은 색을 찾아요!",
//     emoji: "🎨",
//     planetColor: "#FF8F9F",
//     accentColor: colors.brand.pink,
//   },
//   {
//     id: "shape",
//     title: "모양 탐험대",
//     subtitle: "모양 행성",
//     description: "같은 모양을 찾아요!",
//     emoji: "🔷",
//     planetColor: "#8FA8FF",
//     accentColor: colors.brand.blue,
//   },
//   {
//     id: "size",
//     title: "크기 탐험대",
//     subtitle: "크기 행성",
//     description: "크고 작은 것을 찾아요!",
//     emoji: "📏",
//     planetColor: "#A8DFA8",
//     accentColor: colors.brand.mint,
//   },
//   {
//     id: "category",
//     title: "종류 탐험대",
//     subtitle: "종류 행성",
//     description: "같은 종류를 찾아요!",
//     emoji: "🐶",
//     planetColor: "#FFD98A",
//     accentColor: colors.brand.yellow,
//   },
// ];

// // ============================================================
// // Screen Component
// // ============================================================

// export default function ClassificationMenuScreen() {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList<ClassificationGame>>(null);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / SNAP_INTERVAL);

//     if (index !== currentIndex && index >= 0 && index < GAMES.length) {
//       setCurrentIndex(index);
//     }
//   };

//   const handleSelectGame = (game: ClassificationGame) => {
//     navigation.navigate("StageMapScreen", {
//       gameType: game.id,
//     });
//   };

//   // 정확한 오프셋 스크롤로 화살표 클릭 시 중앙 정렬 보장
//   const scrollToIndex = (index: number) => {
//     if (index < 0 || index >= GAMES.length) return;

//     flatListRef.current?.scrollToOffset({
//       offset: index * SNAP_INTERVAL,
//       animated: true,
//     });
//   };

//   const handlePrevious = () => {
//     if (currentIndex <= 0) return;
//     scrollToIndex(currentIndex - 1);
//   };

//   const handleNext = () => {
//     if (currentIndex >= GAMES.length - 1) return;
//     scrollToIndex(currentIndex + 1);
//   };

//   return (
//     <Screen>
//       <StarsBackground>
//         <Star style={{ top: "12%", left: "12%" }}>✦</Star>
//         <Star style={{ top: "19%", right: "14%" }}>·</Star>
//         <Star style={{ top: "37%", left: "8%" }}>✦</Star>
//         <Star style={{ top: "45%", right: "9%" }}>✦</Star>
//         <Star style={{ bottom: "18%", left: "17%" }}>·</Star>
//         <Star style={{ bottom: "12%", right: "16%" }}>✦</Star>
//       </StarsBackground>

//       <Header>
//         <BackButton
//           onPress={() => navigation.navigate("Home")}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="arrow-back" size={25} color={colors.brand.primary} />
//         </BackButton>

//         <HeaderText>분류 우주</HeaderText>

//         <HeaderSpacer />
//       </Header>

//       <TitleArea>
//         <Title>어떤 행성을 탐험할까요?</Title>
//         <Description>원하는 행성을 골라서 탐험을 시작해 보세요!</Description>
//       </TitleArea>

//       <CarouselArea>
//         <FlatList
//           ref={flatListRef}
//           data={GAMES}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={SNAP_INTERVAL}
//           decelerationRate="fast"
//           contentContainerStyle={{
//             paddingHorizontal: SIDE_SPACE,
//           }}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           renderItem={({ item }) => (
//             <GameCardWrapper>
//               <GameCard
//                 activeOpacity={0.9}
//                 onPress={() => handleSelectGame(item)}
//               >
//                 <PlanetArea>
//                   <SmallStar style={{ top: 18, left: 30 }}>✦</SmallStar>
//                   <SmallStar style={{ bottom: 30, right: 25 }}>✦</SmallStar>

//                   <Planet style={{ backgroundColor: item.planetColor }}>
//                     <PlanetHighlight />
//                     <PlanetEmoji>{item.emoji}</PlanetEmoji>
//                   </Planet>

//                   <Orbit>
//                     <OrbitLine />
//                     <UFO>🛸</UFO>
//                   </Orbit>
//                 </PlanetArea>

//                 <GameInfo>
//                   <GameSubtitle>{item.subtitle}</GameSubtitle>
//                   <GameTitle>{item.title}</GameTitle>
//                   <GameDescription>{item.description}</GameDescription>
//                 </GameInfo>

//                 <StartButton style={{ backgroundColor: item.accentColor }}>
//                   <StartButtonText>탐험 시작</StartButtonText>
//                   <Ionicons
//                     name="arrow-forward"
//                     size={18}
//                     color={colors.white}
//                   />
//                 </StartButton>
//               </GameCard>
//             </GameCardWrapper>
//           )}
//         />
//       </CarouselArea>

//       <BottomArea>
//         <ArrowButton
//           onPress={handlePrevious}
//           disabled={currentIndex === 0}
//           activeOpacity={0.8}
//         >
//           <Ionicons
//             name="chevron-back"
//             size={25}
//             color={
//               currentIndex === 0 ? colors.border.default : colors.brand.primary
//             }
//           />
//         </ArrowButton>

//         <Dots>
//           {GAMES.map((game, index) => (
//             <Dot key={game.id} active={index === currentIndex} />
//           ))}
//         </Dots>

//         <ArrowButton
//           onPress={handleNext}
//           disabled={currentIndex === GAMES.length - 1}
//           activeOpacity={0.8}
//         >
//           <Ionicons
//             name="chevron-forward"
//             size={25}
//             color={
//               currentIndex === GAMES.length - 1
//                 ? colors.border.default
//                 : colors.brand.primary
//             }
//           />
//         </ArrowButton>
//       </BottomArea>
//     </Screen>
//   );
// }

// // ============================================================
// // Styled Components (원래 레이아웃 수치 100% 유지)
// // ============================================================

// const Screen = styled(SafeAreaView)`
//   flex: 1;
//   background-color: ${colors.background};
// `;

// const StarsBackground = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

// const Star = styled(AppText)`
//   position: absolute;
//   color: ${colors.border.strong};
//   font-size: 20px;
// `;

// const Header = styled.View`
//   height: 72px;
//   flex-direction: row;
//   align-items: center;
//   padding-horizontal: 20px;
// `;

// const BackButton = styled.TouchableOpacity`
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   background-color: ${colors.white};
//   align-items: center;
//   justify-content: center;
//   border-width: 1.5px;
//   border-color: ${colors.border.default};
//   elevation: 2;
//   shadow-color: ${colors.brand.primary};
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.1;
//   shadow-radius: 4px;
// `;

// const HeaderText = styled(AppText)`
//   flex: 1;
//   text-align: center;
//   color: ${colors.textGroup.primary};
//   font-size: 22px;
//   font-weight: 800;
// `;

// const HeaderSpacer = styled.View`
//   width: 44px;
// `;

// const TitleArea = styled.View`
//   align-items: center;
//   padding-horizontal: 24px;
//   margin-top: 8px;
// `;

// const Title = styled(AppText)`
//   color: ${colors.textGroup.primary};
//   font-size: 25px;
//   font-weight: 900;
//   text-align: center;
// `;

// const Description = styled(AppText)`
//   color: ${colors.textGroup.secondary};
//   font-size: 14px;
//   margin-top: 8px;
//   text-align: center;
// `;

// const CarouselArea = styled.View`
//   flex: 1;
//   justify-content: center;
//   margin-top: 20px;
// `;

// const GameCardWrapper = styled.View`
//   width: ${CARD_WIDTH}px;
//   margin-right: 20px;
// `;

// const GameCard = styled.TouchableOpacity`
//   background-color: ${colors.white};
//   border-radius: 32px;
//   padding: 12px;
//   border-width: 2px;
//   border-color: ${colors.border.default};
//   elevation: 8;
//   shadow-color: ${colors.brand.primary};
//   shadow-offset: 0px 8px;
//   shadow-opacity: 0.12;
//   shadow-radius: 12px;
//   overflow: hidden;
// `;

// const PlanetArea = styled.View`
//   height: 300px;
//   background-color: ${colors.softBlue};
//   border-radius: 25px;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   position: relative;
// `;

// const Planet = styled.View`
//   width: 180px;
//   height: 180px;
//   border-radius: 90px;
//   align-items: center;
//   justify-content: center;
//   position: relative;
// `;

// const PlanetHighlight = styled.View`
//   position: absolute;
//   width: 55px;
//   height: 25px;
//   border-radius: 20px;
//   background-color: rgba(255, 255, 255, 0.4);
//   top: 32px;
//   left: 30px;
//   transform: rotate(-25deg);
// `;

// const PlanetEmoji = styled(AppText)`
//   font-size: 70px;
// `;

// const Orbit = styled.View`
//   position: absolute;
//   width: 250px;
//   height: 105px;
//   border-radius: 130px;
//   border-width: 2px;
//   border-color: rgba(124, 92, 255, 0.25);
//   transform: rotate(-18deg);
//   align-items: center;
//   justify-content: flex-end;
// `;

// const OrbitLine = styled.View`
//   position: absolute;
//   width: 250px;
//   height: 105px;
//   border-radius: 130px;
//   border-width: 2px;
//   border-color: transparent;
// `;

// const UFO = styled(AppText)`
//   position: absolute;
//   right: 12px;
//   bottom: -18px;
//   font-size: 38px;
// `;

// const SmallStar = styled(AppText)`
//   position: absolute;
//   color: ${colors.brand.primary};
//   opacity: 0.6;
//   font-size: 18px;
// `;

// const GameInfo = styled.View`
//   align-items: center;
//   padding-top: 18px;
//   padding-horizontal: 10px;
// `;

// const GameSubtitle = styled(AppText)`
//   color: ${colors.textGroup.muted};
//   font-size: 13px;
//   font-weight: 700;
// `;

// const GameTitle = styled(AppText)`
//   color: ${colors.textGroup.primary};
//   font-size: 24px;
//   font-weight: 900;
//   margin-top: 3px;
// `;

// const GameDescription = styled(AppText)`
//   color: ${colors.textGroup.secondary};
//   font-size: 14px;
//   margin-top: 6px;
// `;

// const StartButton = styled.View`
//   height: 52px;
//   border-radius: 18px;
//   margin-top: 18px;
//   margin-bottom: 8px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 7px;
// `;

// const StartButtonText = styled(AppText)`
//   color: ${colors.white};
//   font-size: 16px;
//   font-weight: 800;
// `;

// const BottomArea = styled.View`
//   height: 80px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 22px;
// `;

// const ArrowButton = styled.TouchableOpacity`
//   width: 42px;
//   height: 42px;
//   border-radius: 21px;
//   background-color: ${colors.white};
//   align-items: center;
//   justify-content: center;
//   border-width: 1.5px;
//   border-color: ${colors.border.default};
//   elevation: 2;
//   shadow-color: ${colors.brand.primary};
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.08;
//   shadow-radius: 4px;
// `;

// const Dots = styled.View`
//   flex-direction: row;
//   align-items: center;
//   gap: 8px;
// `;

// const Dot = styled.View<{ active: boolean }>`
//   width: ${({ active }) => (active ? "22px" : "7px")};
//   height: 7px;
//   border-radius: 4px;
//   background-color: ${({ active }) =>
//     active ? colors.brand.primary : colors.border.strong};
// `;

import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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

// ============================================================
// Theme / Color Definitions
// ============================================================

export const colors = {
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",

  white: "#FFFFFF",
  black: "#000000",

  softBlue: "#EEF6FF",
  softPink: "#FFF1F7",
  softYellow: "#FFF8DD",
  softMint: "#E9FBF6",

  background: "#F5F2FF",
  text: "#29263D",
  secondaryText: "#68657A",
  muted: "#9C99AA",

  brand: {
    primary: "#7C5CFF",
    blue: "#4D8DFF",
    pink: "#FF6FAE",
    yellow: "#FFD95A",
    mint: "#55D6BE",
  },
  textGroup: {
    primary: "#29263D",
    secondary: "#68657A",
    muted: "#9C99AA",
    inverse: "#FFFFFF",
  },
  button: {
    primary: "#7C5CFF",
    primaryText: "#FFFFFF",
    secondary: "#F2EFFD",
    secondaryText: "#29263D",
    disabled: "#E6E1F4",
    disabledText: "#9C99AA",
  },
  feedback: {
    success: "#35C98B",
    successSoft: "#E7FAF2",
    retry: "#FFB84D",
    retrySoft: "#FFF5E3",
    error: "#FF7A7A",
    errorSoft: "#FFF0F0",
    info: "#65A8FF",
    infoSoft: "#EDF5FF",
  },
  border: {
    default: "#E6E1F4",
    strong: "#B7B0DD",
    dashed: "#D8D2F1",
  },
} as const;

export const COLORS = colors;

// ============================================================
// Constants
// ============================================================

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CARD_WIDTH = SCREEN_WIDTH * 0.78;
const ITEM_SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;
const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

type ClassificationGame = {
  id: ClassificationGameType;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  planetColor: string;
  accentColor: string;
};

const GAMES: ClassificationGame[] = [
  {
    id: "color",
    title: "색깔 탐험대",
    subtitle: "색깔 행성",
    description: "같은 색을 찾아요!",
    emoji: "🎨",
    planetColor: "#FF8F9F",
    accentColor: colors.brand.pink,
  },
  {
    id: "shape",
    title: "모양 탐험대",
    subtitle: "모양 행성",
    description: "같은 모양을 찾아요!",
    emoji: "🔷",
    planetColor: "#8FA8FF",
    accentColor: colors.brand.blue,
  },
  {
    id: "size",
    title: "크기 탐험대",
    subtitle: "크기 행성",
    description: "크고 작은 것을 찾아요!",
    emoji: "📏",
    planetColor: "#A8DFA8",
    accentColor: colors.brand.mint,
  },
  {
    id: "category",
    title: "종류 탐험대",
    subtitle: "종류 행성",
    description: "같은 종류를 찾아요!",
    emoji: "🐶",
    planetColor: "#FFD98A",
    accentColor: colors.brand.yellow,
  },
];

// ============================================================
// Screen Component
// ============================================================

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
    navigation.navigate("StageMapScreen", {
      gameType: game.id,
    });
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= GAMES.length) return;

    flatListRef.current?.scrollToOffset({
      offset: index * SNAP_INTERVAL,
      animated: true,
    });
  };

  const handlePrevious = () => {
    if (currentIndex <= 0) return;
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex >= GAMES.length - 1) return;
    scrollToIndex(currentIndex + 1);
  };

  return (
    <Screen edges={["top", "bottom"]}>
      <StarsBackground>
        <Star style={{ top: "12%", left: "12%" }}>✦</Star>
        <Star style={{ top: "19%", right: "14%" }}>·</Star>
        <Star style={{ top: "37%", left: "8%" }}>✦</Star>
        <Star style={{ top: "45%", right: "9%" }}>✦</Star>
        <Star style={{ bottom: "18%", left: "17%" }}>·</Star>
        <Star style={{ bottom: "12%", right: "16%" }}>✦</Star>
      </StarsBackground>

      {/* 고정 규격 헤더 */}
      <Header>
        <BackButton
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={colors.brand.primary}
          />
        </BackButton>

        <HeaderText>분류 우주</HeaderText>

        <HeaderSpacer />
      </Header>

      <MainContainer>
        <TitleArea>
          <Title>어떤 행성을 탐험할까요?</Title>
          <Description>원하는 행성을 골라서 탐험을 시작해 보세요!</Description>
        </TitleArea>

        <CarouselArea>
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
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <GameCardWrapper>
                <GameCard
                  activeOpacity={0.9}
                  onPress={() => handleSelectGame(item)}
                >
                  <PlanetArea>
                    <SmallStar style={{ top: 18, left: 30 }}>✦</SmallStar>
                    <SmallStar style={{ bottom: 30, right: 25 }}>✦</SmallStar>

                    <Planet style={{ backgroundColor: item.planetColor }}>
                      <PlanetHighlight />
                      <PlanetEmoji>{item.emoji}</PlanetEmoji>
                    </Planet>

                    <Orbit>
                      <OrbitLine />
                      <UFO>🛸</UFO>
                    </Orbit>
                  </PlanetArea>

                  <GameInfo>
                    <GameSubtitle>{item.subtitle}</GameSubtitle>
                    <GameTitle>{item.title}</GameTitle>
                    <GameDescription>{item.description}</GameDescription>
                  </GameInfo>

                  <StartButton style={{ backgroundColor: item.accentColor }}>
                    <StartButtonText>탐험 시작</StartButtonText>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={colors.white}
                    />
                  </StartButton>
                </GameCard>
              </GameCardWrapper>
            )}
          />
        </CarouselArea>

        <BottomArea>
          <ArrowButton
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={
                currentIndex === 0
                  ? colors.border.default
                  : colors.brand.primary
              }
            />
          </ArrowButton>

          <Dots>
            {GAMES.map((game, index) => (
              <Dot key={game.id} active={index === currentIndex} />
            ))}
          </Dots>

          <ArrowButton
            onPress={handleNext}
            disabled={currentIndex === GAMES.length - 1}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={
                currentIndex === GAMES.length - 1
                  ? colors.border.default
                  : colors.brand.primary
              }
            />
          </ArrowButton>
        </BottomArea>
      </MainContainer>
    </Screen>
  );
}

// ============================================================
// Styled Components
// ============================================================

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const MainContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const StarsBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Star = styled(AppText)`
  position: absolute;
  color: ${colors.border.strong};
  font-size: 20px;
`;

const Header = styled.View`
  height: 64px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  elevation: 2;
  shadow-color: ${colors.brand.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const HeaderText = styled(AppText)`
  flex: 1;
  text-align: center;
  color: ${colors.textGroup.primary};
  font-size: 18px;
  font-weight: 900;
`;

const HeaderSpacer = styled.View`
  width: 44px;
`;

const TitleArea = styled.View`
  align-items: center;
  padding-horizontal: 24px;
  margin-top: 40px;
`;

const Title = styled(AppText)`
  color: ${colors.textGroup.primary};
  font-size: 24px;
  font-weight: 900;
  text-align: center;
`;

const Description = styled(AppText)`
  color: ${colors.textGroup.secondary};
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
  margin-right: 20px;
`;

const GameCard = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 28px;
  padding: 10px;
  border-width: 2px;
  border-color: ${colors.border.default};
  elevation: 6;
  shadow-color: ${colors.brand.primary};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  overflow: hidden;
`;

const PlanetArea = styled.View`
  height: 200px;
  background-color: ${colors.softBlue};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Planet = styled.View`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlanetHighlight = styled.View`
  position: absolute;
  width: 40px;
  height: 18px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.4);
  top: 22px;
  left: 20px;
  transform: rotate(-25deg);
`;

const PlanetEmoji = styled(AppText)`
  font-size: 50px;
`;

const Orbit = styled.View`
  position: absolute;
  width: 180px;
  height: 75px;
  border-radius: 90px;
  border-width: 2px;
  border-color: rgba(124, 92, 255, 0.25);
  transform: rotate(-18deg);
  align-items: center;
  justify-content: flex-end;
`;

const OrbitLine = styled.View`
  position: absolute;
  width: 180px;
  height: 75px;
  border-radius: 90px;
  border-width: 2px;
  border-color: transparent;
`;

const UFO = styled(AppText)`
  position: absolute;
  right: 8px;
  bottom: -14px;
  font-size: 28px;
`;

const SmallStar = styled(AppText)`
  position: absolute;
  color: ${colors.brand.primary};
  opacity: 0.6;
  font-size: 16px;
`;

const GameInfo = styled.View`
  align-items: center;
  padding-top: 12px;
  padding-horizontal: 8px;
`;

const GameSubtitle = styled(AppText)`
  color: ${colors.textGroup.muted};
  font-size: 12px;
  font-weight: 700;
`;

const GameTitle = styled(AppText)`
  color: ${colors.textGroup.primary};
  font-size: 20px;
  font-weight: 900;
  margin-top: 2px;
`;

const GameDescription = styled(AppText)`
  color: ${colors.textGroup.secondary};
  font-size: 13px;
  margin-top: 4px;
`;

const StartButton = styled.View`
  height: 46px;
  border-radius: 16px;
  margin-top: 12px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const StartButtonText = styled(AppText)`
  color: ${colors.white};
  font-size: 15px;
  font-weight: 800;
`;

const BottomArea = styled.View`
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 8px;
`;

const ArrowButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  elevation: 2;
  shadow-color: ${colors.brand.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
`;

const Dots = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "22px" : "7px")};
  height: 7px;
  border-radius: 4px;
  background-color: ${({ active }) =>
    active ? colors.brand.primary : colors.border.strong};
`;
