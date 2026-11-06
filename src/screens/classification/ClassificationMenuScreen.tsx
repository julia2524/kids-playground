// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from "react-native";
// import styled from "styled-components/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { AppText } from "../../utils/AppText";
// import { RootStackParamList } from "../../navigation/types";
// import { ClassificationGameType } from "../../types/game";
// import ClassificationPlanet from "../../components/illustrations/ClassificationPlanet";
// import SpaceUFO from "../../components/illustrations/SpaceUFO";
// import ShootingStar from "../../components/illustrations/ShootingStar";
// import { ASSETS } from "../../assets/assets";
// import AppHeader from "../../components/AppHeader";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LangaugeContext";
// import { triggerHaptic } from "../../utils/haptic";
// import {
//   getLastGame,
//   saveLastGame,
// } from "../../utils/asyncStorage/progressStorage";
// import BannerAd from "../../services/BannerAd";

// // ============================================================
// // 메인 화면과 통일된 몽환 파스텔 컬러 팔레트
// // ============================================================
// export const colors = {
//   purple: "#7C5CFF",
//   blue: "#4D8DFF",
//   pink: "#FF6FAE",
//   yellow: "#FFD95A",
//   mint: "#55D6BE",
//   white: "#FFFFFF",
//   background: "#F2F5FF",
//   text: "#29263D",
//   secondaryText: "#7E7B9A",

//   cardBg: {
//     color: "#FFF0F5",
//     shape: "#F0F5FF",
//     category: "#EDFAF6",
//     size: "#FFF9E6",
//   },

//   accent: {
//     color: "#FF6FAE",
//     shape: "#4D8DFF",
//     category: "#34CDB2",
//     size: "#FFB020",
//   },
// } as const;

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // ⭐ 퍼즐 메뉴와 동일하게 카드 너비 0.8, 간격 12, 좌우 여백 공식 적용 (왼쪽 치우침 방지)
// const CARD_WIDTH = SCREEN_WIDTH * 0.8;
// const ITEM_SPACING = 12;
// const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;
// const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// type ClassificationGame = {
//   id: ClassificationGameType;
//   title: string;
//   subtitle: string;
//   description: string;
//   accentColor: string;
//   cardBg: string;
// };

// const MENU_GAME_CONFIGS = [
//   {
//     id: "color",
//     titleKey: "planet_color_title",
//     subtitleKey: "planet_color_subtitle",
//     descKey: "planet_color_desc",
//     accentColor: colors.accent.color,
//     cardBg: colors.cardBg.color,
//   },
//   {
//     id: "shape",
//     titleKey: "planet_shape_title",
//     subtitleKey: "planet_shape_subtitle",
//     descKey: "planet_shape_desc",
//     accentColor: colors.accent.shape,
//     cardBg: colors.cardBg.shape,
//   },
//   {
//     id: "category",
//     titleKey: "planet_category_title",
//     subtitleKey: "planet_category_subtitle",
//     descKey: "planet_category_desc",
//     accentColor: colors.accent.category,
//     cardBg: colors.cardBg.category,
//   },
//   {
//     id: "size",
//     titleKey: "planet_size_title",
//     subtitleKey: "planet_size_subtitle",
//     descKey: "planet_size_desc",
//     accentColor: colors.accent.size,
//     cardBg: colors.cardBg.size,
//   },
// ] as const;

// export default function ClassificationMenuScreen() {
//   const insets = useSafeAreaInsets();
//   const { locale } = useLanguage();

//   const GAMES = useMemo(() => {
//     return MENU_GAME_CONFIGS.map((item) => ({
//       ...item,
//       title: i18n.t(item.titleKey),
//       subtitle: i18n.t(item.subtitleKey),
//       description: i18n.t(item.descKey),
//     }));
//   }, [locale]);

//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList<ClassificationGame>>(null);

//   useEffect(() => {
//     const loadLastGamePosition = async () => {
//       const lastGameId = await getLastGame();
//       if (!lastGameId) return;

//       const targetIndex = GAMES.findIndex((game) => game.id === lastGameId);
//       if (targetIndex !== -1) {
//         setCurrentIndex(targetIndex);
//         setTimeout(() => {
//           flatListRef.current?.scrollToOffset({
//             offset: targetIndex * SNAP_INTERVAL,
//             animated: false,
//           });
//         }, 100);
//       }
//     };

//     loadLastGamePosition();
//   }, []);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / SNAP_INTERVAL);
//     if (index !== currentIndex && index >= 0 && index < GAMES.length) {
//       setCurrentIndex(index);
//     }
//   };

//   const handleSelectGame = (game: ClassificationGame) => {
//     saveLastGame(game.id);
//     navigation.navigate("StageMapScreen", { gameType: game.id });
//   };

//   const scrollToIndex = (index: number) => {
//     if (index < 0 || index >= GAMES.length) return;
//     flatListRef.current?.scrollToOffset({
//       offset: index * SNAP_INTERVAL,
//       animated: true,
//     });
//   };

//   // ⭐ 하단 배너 광고 높이(60px) + 안전영역(insets.bottom)을 계산하여 콘텐츠가 가리지 않도록 여유 공간 확보
//   const bannerTotalHeight = 60 + Math.max(insets.bottom, 12);

//   return (
//     <Background>
//       <BackgroundImage
//         source={ASSETS.classificationMenuBackground}
//         resizeMode="cover"
//       />
//       {/* ⭐ SafeAreaView 대신 일반 View를 사용하고 paddingTop을 insets.top으로 수동 고정하여 툭 밀림 원천 차단 */}
//       <Screen style={{ paddingTop: insets.top }}>
//         <AppHeader
//           title={i18n.t("classification_space_title")}
//           onBackPress={() => {
//             navigation.navigate("Home");
//           }}
//           onMascotPress={() => navigation.navigate("SettingScreen")}
//         />

//         <MainContainer style={{ paddingBottom: bannerTotalHeight + 10 }}>
//           <CarouselArea>
//             <TitleArea>
//               <Title>{i18n.t("classification_hero_title")}</Title>
//               <Description>{i18n.t("classification_hero_desc")}</Description>
//             </TitleArea>
//             <FlatList
//               ref={flatListRef}
//               data={GAMES}
//               keyExtractor={(item, index) => `${item.id}-${index}`}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               contentContainerStyle={{
//                 paddingHorizontal: SIDE_SPACE,
//                 alignItems: "center",
//               }}
//               style={{ flexGrow: 0 }}
//               onScroll={handleScroll}
//               scrollEventThrottle={16}
//               renderItem={({ item, index }) => {
//                 const isActive = index === currentIndex;
//                 return (
//                   <GameCardWrapper>
//                     <GameCard
//                       active={isActive}
//                       bgColor={item.cardBg}
//                       activeOpacity={0.95}
//                       onPress={() => {
//                         triggerHaptic("light");
//                         handleSelectGame(item);
//                       }}
//                     >
//                       <PlanetArea>
//                         <ShootingStarArea style={{ top: 4, left: 8 }}>
//                           <ShootingStar color={item.accentColor} size={32} />
//                         </ShootingStarArea>

//                         <PlanetScene>
//                           <ClassificationPlanet type={item.id} size={120} />
//                           <Orbit>
//                             <OrbitLine />
//                             <UFO>
//                               <SpaceUFO size={38} />
//                             </UFO>
//                           </Orbit>
//                         </PlanetScene>
//                       </PlanetArea>

//                       <GameInfo>
//                         <GameTitle numberOfLines={1} adjustsFontSizeToFit>
//                           {item.title}
//                         </GameTitle>
//                         <GameDescription numberOfLines={2}>
//                           {item.description}
//                         </GameDescription>
//                       </GameInfo>

//                       <StartButton
//                         style={{ backgroundColor: item.accentColor }}
//                       >
//                         <StartButtonText>
//                           {i18n.t("classification_start")}
//                         </StartButtonText>
//                       </StartButton>
//                     </GameCard>
//                   </GameCardWrapper>
//                 );
//               }}
//             />
//           </CarouselArea>

//           <BottomArea>
//             <ArrowButton
//               onPress={() => {
//                 triggerHaptic("light");
//                 scrollToIndex(currentIndex - 1);
//               }}
//               disabled={currentIndex === 0}
//               activeOpacity={0.8}
//             >
//               <Ionicons
//                 name="chevron-back"
//                 size={22}
//                 color={currentIndex === 0 ? "#D0CCE4" : "#7C5CFF"}
//               />
//             </ArrowButton>

//             <Dots>
//               {GAMES.map((game, index) => (
//                 <Dot key={game.id} active={index === currentIndex} />
//               ))}
//             </Dots>

//             <ArrowButton
//               onPress={() => {
//                 triggerHaptic("light");
//                 scrollToIndex(currentIndex + 1);
//               }}
//               disabled={currentIndex === GAMES.length - 1}
//               activeOpacity={0.8}
//             >
//               <Ionicons
//                 name="chevron-forward"
//                 size={22}
//                 color={
//                   currentIndex === GAMES.length - 1 ? "#D0CCE4" : "#7C5CFF"
//                 }
//               />
//             </ArrowButton>
//           </BottomArea>
//         </MainContainer>
//       </Screen>

//       <BannerAdContainer bottomInset={insets.bottom}>
//         <BannerAd />
//       </BannerAdContainer>
//     </Background>
//   );
// }

// const BannerAdContainer = styled.View<{ bottomInset: number }>`
//   height: 60px;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   background-color: transparent;
//   position: absolute;
//   bottom: ${(props) => Math.max(props.bottomInset, 12)}px;
//   left: 0;
//   z-index: 20;
// `;

// export const Background = styled.View`
//   flex: 1;
// `;

// export const BackgroundImage = styled.Image`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

// // ⭐ SafeAreaView 대신 일반 View 기반으로 변경하여 첫 렌더링 시 밀림 현상 방지
// export const Screen = styled.View`
//   flex: 1;
//   justify-content: space-between;
// `;

// export const MainContainer = styled.View`
//   flex: 1;
// `;

// export const Header = styled.View`
//   height: 56px;
//   flex-direction: row;
//   align-items: center;
//   padding-horizontal: 20px;
// `;

// export const BackButton = styled.TouchableOpacity`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: ${colors.white};
//   align-items: center;
//   justify-content: center;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.12;
//   shadow-radius: 8px;
//   elevation: 3;
// `;

// export const HeaderText = styled(AppText)`
//   flex: 1;
//   text-align: center;
//   color: #29263d;
//   font-size: ${(props) => props.theme.typography.button.fontSize}px;
// `;

// export const HeaderSpacer = styled.View`
//   width: 40px;
// `;

// export const TitleArea = styled.View`
//   align-items: center;
//   padding-right: 24px;
//   padding-left: 24px;
//   margin-bottom: 20px;
// `;

// export const Title = styled(AppText)`
//   color: #29263d;
//   font-size: ${(props) => props.theme.typography.h2.fontSize}px;
//   font-family: ${(props) => props.theme.fontFamily};
//   text-align: center;
// `;

// export const Description = styled(AppText)`
//   color: ${colors.secondaryText};
//   font-size: ${(props) => props.theme.typography.caption.fontSize}px;
//   margin-top: 4px;
//   text-align: center;
// `;

// export const CarouselArea = styled.View`
//   flex: 1;
//   justify-content: center;
// `;

// // ⭐ 퍼즐 메뉴와 동일하게 justify-content: center를 추가하여 카드가 왼쪽으로 치우치지 않고 정중앙에 오도록 수정
// export const GameCardWrapper = styled.View`
//   width: ${CARD_WIDTH}px;
//   margin-right: ${ITEM_SPACING}px;
//   justify-content: center;
// `;

// export const GameCard = styled.TouchableOpacity<{
//   active: boolean;
//   bgColor: string;
// }>`
//   background-color: ${({ bgColor }) => bgColor};
//   border-radius: 32px;
//   padding: 20px;
//   border-width: 3px;
//   border-color: #ffffff;

//   shadow-color: #a3a8cc;
//   shadow-offset: 0px 8px;
//   shadow-opacity: ${({ active }) => (active ? 0.2 : 0.08)};
//   shadow-radius: 12px;
//   elevation: ${({ active }) => (active ? 5 : 2)};

//   opacity: ${({ active }) => (active ? 1 : 0.65)};
// `;

// export const PlanetArea = styled.View`
//   height: 140px;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   margin-bottom: 8px;
// `;

// export const PlanetScene = styled.View`
//   width: 140px;
//   height: 120px;
//   align-items: center;
//   justify-content: center;
//   position: relative;
// `;

// export const Orbit = styled.View`
//   position: absolute;
//   width: 140px;
//   height: 64px;
//   border-radius: 32px;
//   transform: rotate(-15deg);
//   align-items: center;
//   justify-content: center;
// `;

// export const OrbitLine = styled.View`
//   position: absolute;
//   width: 140px;
//   height: 64px;
//   border-radius: 32px;
//   border-width: 2px;
//   border-color: rgba(255, 255, 255, 0.6);
//   border-style: dashed;
// `;

// export const UFO = styled.View`
//   position: absolute;
//   right: -8px;
//   bottom: -8px;
// `;

// export const ShootingStarArea = styled.View`
//   position: absolute;
//   z-index: 1;
// `;

// export const GameInfo = styled.View`
//   align-items: center;
//   margin-bottom: 12px;
//   margin-top: 2px;
// `;

// export const GameTitle = styled(AppText)`
//   color: #29263d;
//   font-size: ${(props) => props.theme.typography.h3.fontSize}px;
//   font-family: ${(props) => props.theme.fontFamily};
//   text-align: center;
// `;

// export const GameDescription = styled(AppText)`
//   color: ${colors.secondaryText};
//   font-size: ${(props) => props.theme.typography.caption.fontSize}px;
//   margin-top: 2px;
//   text-align: center;
// `;

// export const StartButton = styled.View`
//   height: 50px;
//   border-radius: 25px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;

//   shadow-color: #000;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.12;
//   shadow-radius: 6px;
//   elevation: 3;
// `;

// export const StartButtonText = styled(AppText)`
//   color: #ffffff;
//   font-size: ${(props) => props.theme.typography.body.fontSize}px;
//   flex: 1;
//   text-align: center;
// `;

// export const BottomArea = styled.View`
//   height: 60px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;
//   margin-bottom: 20px;
// `;

// export const ArrowButton = styled.TouchableOpacity`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: ${colors.white};
//   align-items: center;
//   justify-content: center;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.1;
//   shadow-radius: 4px;
//   elevation: 2;
// `;

// export const Dots = styled.View`
//   flex-direction: row;
//   align-items: center;
//   gap: 8px;
// `;

// export const Dot = styled.View<{ active: boolean }>`
//   width: ${({ active }) => (active ? "20px" : "8px")};
//   height: 8px;
//   border-radius: 4px;
//   background-color: ${({ active }) => (active ? "#7C5CFF" : "#DCD7EE")};
// `;

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  I18nManager,
  ImageBackground,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { triggerHaptic } from "../../utils/haptic";
import {
  getLastGame,
  saveLastGame,
} from "../../utils/asyncStorage/progressStorage";
import BannerAd from "../../services/BannerAd";

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
  background: "#F2F5FF",
  text: "#29263D",
  secondaryText: "#7E7B9A",

  cardBg: {
    color: "#FFF0F5",
    shape: "#F0F5FF",
    category: "#EDFAF6",
    size: "#FFF9E6",
  },

  accent: {
    color: "#FF6FAE",
    shape: "#4D8DFF",
    category: "#34CDB2",
    size: "#FFB020",
  },
} as const;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ⭐ 퍼즐 메뉴와 동일하게 카드 너비 0.8, 간격 12, 좌우 여백 공식 적용 (왼쪽 치우침 방지)
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12;
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
    id: "category",
    titleKey: "planet_category_title",
    subtitleKey: "planet_category_subtitle",
    descKey: "planet_category_desc",
    accentColor: colors.accent.category,
    cardBg: colors.cardBg.category,
  },
  {
    id: "size",
    titleKey: "planet_size_title",
    subtitleKey: "planet_size_subtitle",
    descKey: "planet_size_desc",
    accentColor: colors.accent.size,
    cardBg: colors.cardBg.size,
  },
] as const;

export default function ClassificationMenuScreen() {
  const insets = useSafeAreaInsets();
  const { locale } = useLanguage();

  // ⭐ 앱이 forceRTL 로 네이티브 레이아웃 방향을 이미 뒤집어 둔 상태이므로,
  //    그 값(I18nManager.isRTL)을 기준으로 삼는다.
  //    네이티브 RTL 에서는 FlatList / flex-row 가 알아서 오른쪽부터 시작하므로
  //    데이터 순서는 절대 뒤집지 않는다. (Color=0, Shape=1, Category=2, Size=3 유지)
  const isRTL = I18nManager.isRTL;

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

  useEffect(() => {
    const loadLastGamePosition = async () => {
      const lastGameId = await getLastGame();
      if (!lastGameId) return;

      const targetIndex = GAMES.findIndex((game) => game.id === lastGameId);
      if (targetIndex !== -1) {
        setCurrentIndex(targetIndex);
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: targetIndex * SNAP_INTERVAL,
            animated: false,
          });
        }, 100);
      }
    };

    loadLastGamePosition();
  }, []);

  // LTR(영어권): 원본 그대로
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    if (index !== currentIndex && index >= 0 && index < GAMES.length) {
      setCurrentIndex(index);
    }
  };

  // ------------------------------------------------------------
  // RTL 전용: 스크롤이 멈춘 뒤에만 인덱스를 계산한다.
  //
  // scrollToOffset(x) 은 "시작점(오른쪽) 기준"으로 동작하지만,
  // 플랫폼에 따라 onMomentumScrollEnd 의 contentOffset.x 는
  //   (A) 시작점 기준  : Color = 0,  Size = 최대값
  //   (B) 물리적 왼쪽 기준 : Color = 최대값, Size = 0   (Android 에서 흔함)
  // 중 하나로 보고된다. (B)를 (A)처럼 읽으면 카드/Dot 인덱스가 뒤집힌다.
  // -> 기본값은 플랫폼으로 정하고, 화살표로 이동한 "목표 인덱스"와 비교해서
  //    어느 쪽 방식인지 스스로 보정한다.
  // ------------------------------------------------------------
  const offsetIsFromLeftRef = useRef<boolean>(Platform.OS === "android");
  const pendingTargetRef = useRef<number | null>(null);

  const handleScrollEndRTL = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const rawX = Math.abs(contentOffset.x);
    const maxOffset = Math.max(0, contentSize.width - layoutMeasurement.width);

    const lastIndex = GAMES.length - 1;
    const clamp = (n: number) => Math.min(lastIndex, Math.max(0, n));

    const directIndex = clamp(Math.round(rawX / SNAP_INTERVAL)); // (A)
    const reversedIndex = clamp(Math.round((maxOffset - rawX) / SNAP_INTERVAL)); // (B)

    // 화살표로 이동한 직후라면 목표 인덱스와 맞는 쪽으로 방식을 학습
    const target = pendingTargetRef.current;
    if (target !== null) {
      if (directIndex === target && reversedIndex !== target) {
        offsetIsFromLeftRef.current = false;
      } else if (reversedIndex === target && directIndex !== target) {
        offsetIsFromLeftRef.current = true;
      }
      pendingTargetRef.current = null;
    }

    setCurrentIndex(offsetIsFromLeftRef.current ? reversedIndex : directIndex);
  };

  const handleSelectGame = (game: ClassificationGame) => {
    saveLastGame(game.id);
    navigation.navigate("StageMapScreen", { gameType: game.id });
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= GAMES.length) return;
    // RTL 에서는 카드/Dot/버튼 상태가 항상 같은 인덱스를 보도록 즉시 반영
    if (isRTL) {
      setCurrentIndex(index);
      pendingTargetRef.current = index;
    }
    flatListRef.current?.scrollToOffset({
      offset: index * SNAP_INTERVAL,
      animated: true,
    });
  };

  // ⭐ 하단 배너 광고 높이(60px) + 안전영역(insets.bottom)을 계산하여 콘텐츠가 가리지 않도록 여유 공간 확보
  const bannerTotalHeight = 60 + Math.max(insets.bottom, 12);

  return (
    <Background>
      <BackgroundImage
        source={ASSETS.classificationMenuBackground}
        resizeMode="cover"
      />
      {/* ⭐ SafeAreaView 대신 일반 View를 사용하고 paddingTop을 insets.top으로 수동 고정하여 툭 밀림 원천 차단 */}
      <Screen style={{ paddingTop: insets.top }}>
        <AppHeader
          title={i18n.t("classification_space_title")}
          onBackPress={() => {
            navigation.navigate("Home");
          }}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        <MainContainer style={{ paddingBottom: bannerTotalHeight + 10 }}>
          <CarouselArea>
            <TitleArea>
              <Title>{i18n.t("classification_hero_title")}</Title>
              <Description>{i18n.t("classification_hero_desc")}</Description>
            </TitleArea>
            <FlatList
              ref={flatListRef}
              data={GAMES}
              extraData={currentIndex}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: SIDE_SPACE,
                alignItems: "center",
              }}
              style={{ flexGrow: 0 }}
              onScroll={isRTL ? undefined : handleScroll}
              onMomentumScrollEnd={isRTL ? handleScrollEndRTL : undefined}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                return (
                  <GameCardWrapper>
                    <GameCard
                      active={isActive}
                      bgColor={item.cardBg}
                      activeOpacity={0.95}
                      onPress={() => {
                        triggerHaptic("light");
                        handleSelectGame(item);
                      }}
                    >
                      <PlanetArea>
                        <ShootingStarArea style={{ top: 4, left: 8 }}>
                          <ShootingStar color={item.accentColor} size={32} />
                        </ShootingStarArea>

                        <PlanetScene>
                          <ClassificationPlanet type={item.id} size={120} />
                          <Orbit>
                            <OrbitLine />
                            <UFO>
                              <SpaceUFO size={38} />
                            </UFO>
                          </Orbit>
                        </PlanetScene>
                      </PlanetArea>

                      <GameInfo>
                        <GameTitle numberOfLines={1} adjustsFontSizeToFit>
                          {item.title}
                        </GameTitle>
                        <GameDescription numberOfLines={2}>
                          {item.description}
                        </GameDescription>
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

          {/*
            BottomArea 는 flex-row 라서 RTL 에서 첫 번째 자식이 화면 "오른쪽"에 놓인다.
            - 첫 번째 버튼 = 이전 카드 (LTR: 왼쪽 "<" / RTL: 오른쪽 ">")
            - 마지막 버튼 = 다음 카드 (LTR: 오른쪽 ">" / RTL: 왼쪽 "<")
            => RTL 에서 "왼쪽 < = 다음, 오른쪽 > = 이전", Color 에서는 오른쪽 버튼만 비활성화,
               Size 에서는 왼쪽 버튼만 비활성화.
            Dot 도 같은 이유로 첫 번째(Color) Dot 가 맨 오른쪽에 놓인다.
          */}
          <BottomArea>
            <ArrowButton
              onPress={() => {
                triggerHaptic("light");
                scrollToIndex(currentIndex - 1);
              }}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isRTL ? "chevron-forward" : "chevron-back"}
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
              onPress={() => {
                triggerHaptic("light");
                scrollToIndex(currentIndex + 1);
              }}
              disabled={currentIndex === GAMES.length - 1}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isRTL ? "chevron-back" : "chevron-forward"}
                size={22}
                color={
                  currentIndex === GAMES.length - 1 ? "#D0CCE4" : "#7C5CFF"
                }
              />
            </ArrowButton>
          </BottomArea>
        </MainContainer>
      </Screen>

      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
    </Background>
  );
}

const BannerAdContainer = styled.View<{ bottomInset: number }>`
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  bottom: ${(props) => Math.max(props.bottomInset, 12)}px;
  left: 0;
  z-index: 20;
`;

export const Background = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// ⭐ SafeAreaView 대신 일반 View 기반으로 변경하여 첫 렌더링 시 밀림 현상 방지
export const Screen = styled.View`
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
  margin-bottom: 20px;
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

// ⭐ 퍼즐 메뉴와 동일하게 justify-content: center를 추가하여 카드가 왼쪽으로 치우치지 않고 정중앙에 오도록 수정
export const GameCardWrapper = styled.View`
  width: ${CARD_WIDTH}px;
  margin-right: ${ITEM_SPACING}px;
  justify-content: center;
`;

export const GameCard = styled.TouchableOpacity<{
  active: boolean;
  bgColor: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 32px;
  padding: 20px;
  border-width: 3px;
  border-color: #ffffff;

  shadow-color: #a3a8cc;
  shadow-offset: 0px 8px;
  shadow-opacity: ${({ active }) => (active ? 0.2 : 0.08)};
  shadow-radius: 12px;
  elevation: ${({ active }) => (active ? 5 : 2)};

  opacity: ${({ active }) => (active ? 1 : 0.65)};
`;

export const PlanetArea = styled.View`
  height: 140px;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
`;

export const PlanetScene = styled.View`
  width: 140px;
  height: 120px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Orbit = styled.View`
  position: absolute;
  width: 140px;
  height: 64px;
  border-radius: 32px;
  transform: rotate(-15deg);
  align-items: center;
  justify-content: center;
`;

export const OrbitLine = styled.View`
  position: absolute;
  width: 140px;
  height: 64px;
  border-radius: 32px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.6);
  border-style: dashed;
`;

export const UFO = styled.View`
  position: absolute;
  right: -8px;
  bottom: -8px;
`;

export const ShootingStarArea = styled.View`
  position: absolute;
  z-index: 1;
`;

export const GameInfo = styled.View`
  align-items: center;
  margin-bottom: 12px;
  margin-top: 2px;
`;

export const GameTitle = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h3.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const GameDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 2px;
  text-align: center;
`;

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

export const BottomArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
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
