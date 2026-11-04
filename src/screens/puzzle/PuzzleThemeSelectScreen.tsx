// import React, { useMemo } from "react";
// import {
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   useWindowDimensions,
// } from "react-native";
// import styled from "styled-components/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
// import { AppText } from "../../utils/AppText";
// import { RootStackParamList } from "../../navigation/types";
// import { ASSETS } from "../../assets/assets";
// import AppHeader from "../../components/AppHeader";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LangaugeContext";
// import { triggerHaptic } from "../../utils/haptic";
// import BannerAd from "../../services/BannerAd";

// export type AnimalCharacterType =
//   | "rabbit"
//   | "polarbear"
//   | "lion"
//   | "penguin"
//   | "elephant"
//   | "pig"
//   | "bear";

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
// } as const;

// export type PuzzleItemConfig = {
//   id: string;
//   titleKey: string;
//   descKey: string;
//   iconName: keyof typeof Ionicons.glyphMap;
//   accentColor: string;
//   cardBg: string;
// };

// export const ANIMAL_CONFIGS: readonly PuzzleItemConfig[] = [
//   {
//     id: "rabbit",
//     titleKey: "animal_rabbit_title",
//     descKey: "animal_rabbit_desc",
//     iconName: "heart",
//     accentColor: "#FF6FAE",
//     cardBg: "#FFF0F5",
//   },
//   {
//     id: "polarbear",
//     titleKey: "animal_polarbear_title",
//     descKey: "animal_polarbear_desc",
//     iconName: "snow",
//     accentColor: "#4D8DFF",
//     cardBg: "#F0F5FF",
//   },
//   {
//     id: "bear",
//     titleKey: "animal_bear_title",
//     descKey: "animal_bear_desc",
//     iconName: "shield",
//     accentColor: "#9B7653",
//     cardBg: "#FDF5EE",
//   },
//   {
//     id: "lion",
//     titleKey: "animal_lion_title",
//     descKey: "animal_lion_desc",
//     iconName: "sunny",
//     accentColor: "#FFB020",
//     cardBg: "#FFF9E6",
//   },
//   {
//     id: "pig",
//     titleKey: "animal_pig_title",
//     descKey: "animal_pig_desc",
//     iconName: "ellipse",
//     accentColor: "#FF94B8",
//     cardBg: "#FFF0F3",
//   },
//   {
//     id: "penguin",
//     titleKey: "animal_penguin_title",
//     descKey: "animal_penguin_desc",
//     iconName: "water",
//     accentColor: "#55D6BE",
//     cardBg: "#EDFAF6",
//   },
//   {
//     id: "elephant",
//     titleKey: "animal_elephant_title",
//     descKey: "animal_elephant_desc",
//     iconName: "leaf",
//     accentColor: "#7C5CFF",
//     cardBg: "#F2F5FF",
//   },
// ] as const;

// export const FLAG_CONFIGS: readonly PuzzleItemConfig[] = [
//   {
//     id: "korea",
//     titleKey: "flag_korea_title",
//     descKey: "flag_korea_desc",
//     iconName: "flag",
//     accentColor: "#E84A5F",
//     cardBg: "#FFF2F2",
//   },
//   {
//     id: "usa",
//     titleKey: "flag_usa_title",
//     descKey: "flag_usa_desc",
//     iconName: "star",
//     accentColor: "#4D8DFF",
//     cardBg: "#F0F5FF",
//   },
//   {
//     id: "japan",
//     titleKey: "flag_japan_title",
//     descKey: "flag_japan_desc",
//     iconName: "ellipse",
//     accentColor: "#FF6FAE",
//     cardBg: "#FFF0F5",
//   },
//   {
//     id: "uk",
//     titleKey: "flag_uk_title",
//     descKey: "flag_uk_desc",
//     iconName: "diamond",
//     accentColor: "#5B6CFF",
//     cardBg: "#F2F5FF",
//   },
//   {
//     id: "australia",
//     titleKey: "flag_australia_title",
//     descKey: "flag_australia_desc",
//     iconName: "moon",
//     accentColor: "#6B7CFF",
//     cardBg: "#EEF3FF",
//   },
//   {
//     id: "china",
//     titleKey: "flag_china_title",
//     descKey: "flag_china_desc",
//     iconName: "star",
//     accentColor: "#FFB020",
//     cardBg: "#FFF7E8",
//   },
//   {
//     id: "france",
//     titleKey: "flag_france_title",
//     descKey: "flag_france_desc",
//     iconName: "ribbon",
//     accentColor: "#4D8DFF",
//     cardBg: "#F4F7FF",
//   },
// ] as const;

// export const LANDMARK_CONFIGS: readonly PuzzleItemConfig[] = [
//   {
//     id: "bigben",
//     titleKey: "landmark_bigben_title",
//     descKey: "landmark_bigben_desc",
//     iconName: "time",
//     accentColor: "#5B6CFF",
//     cardBg: "#F2F5FF",
//   },
//   {
//     id: "pyramid",
//     titleKey: "landmark_pyramid_title",
//     descKey: "landmark_pyramid_desc",
//     iconName: "triangle",
//     accentColor: "#FFB020",
//     cardBg: "#FFF7E8",
//   },
//   {
//     id: "eiffel",
//     titleKey: "landmark_eiffel_title",
//     descKey: "landmark_eiffel_desc",
//     iconName: "restaurant",
//     accentColor: "#4D8DFF",
//     cardBg: "#F0F5FF",
//   },
//   {
//     id: "pisa",
//     titleKey: "landmark_pisa_title",
//     descKey: "landmark_pisa_desc",
//     iconName: "business",
//     accentColor: "#7C5CFF",
//     cardBg: "#F2F5FF",
//   },
//   {
//     id: "operahouse",
//     titleKey: "landmark_operahouse_title",
//     descKey: "landmark_operahouse_desc",
//     iconName: "moon",
//     accentColor: "#55D6BE",
//     cardBg: "#EDFAF6",
//   },
//   {
//     id: "liberty",
//     titleKey: "landmark_liberty_title",
//     descKey: "landmark_liberty_desc",
//     iconName: "flame",
//     accentColor: "#34CDB2",
//     cardBg: "#EDFDF8",
//   },
//   {
//     id: "tajmahal",
//     titleKey: "landmark_tajmahal_title",
//     descKey: "landmark_tajmahal_desc",
//     iconName: "sparkles",
//     accentColor: "#FF6FAE",
//     cardBg: "#FFF0F5",
//   },
// ] as const;

// export default function PuzzleThemeSelectScreen() {
//   const insets = useSafeAreaInsets();
//   const { locale } = useLanguage();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const route =
//     useRoute<RouteProp<RootStackParamList, "PuzzleThemeSelectScreen">>();

//   const { width: SCREEN_WIDTH } = useWindowDimensions();

//   // ⭐ 태블릿 여부 판별 (보통 768px 이상)
//   const isTablet = SCREEN_WIDTH > 768;

//   // ⭐ 태블릿에서는 최대 콘텐츠 너비를 600px로 제한하여 양옆으로 퍼지는 현상 방지
//   const containerWidth = isTablet ? Math.min(SCREEN_WIDTH, 600) : SCREEN_WIDTH;

//   // 항상 깔끔한 2열을 유지하되, 태블릿에서는 제한된 너비(600px)를 기준으로 카드가 예쁜 크기로 계산됨
//   const numColumns = 2;

//   const CARD_WIDTH = useMemo(() => {
//     const horizontalPadding = 48; // 양쪽 패딩 합
//     const gap = 16;
//     const totalGaps = numColumns - 1;
//     return (containerWidth - horizontalPadding - gap * totalGaps) / numColumns;
//   }, [containerWidth, numColumns]);

//   const { puzzleCategory } = route.params;
//   const titleKey = `puzzle_${puzzleCategory}_title`;
//   const headerTitle = i18n.t(titleKey);
//   const selectTitle = i18n.t(`select_${puzzleCategory}_title`);
//   const selectDescription = i18n.t(`select_${puzzleCategory}_desc`);

//   const configs = useMemo(() => {
//     switch (puzzleCategory) {
//       case "animal":
//         return ANIMAL_CONFIGS;
//       case "flag":
//         return FLAG_CONFIGS;
//       case "landmark":
//         return LANDMARK_CONFIGS;
//       default:
//         return [];
//     }
//   }, [puzzleCategory]);

//   const items = useMemo(() => {
//     return configs.map((item) => ({
//       ...item,
//       title: i18n.t(item.titleKey) || item.id,
//       description: i18n.t(item.descKey) || "",
//     }));
//   }, [locale, configs]);

//   const handleSelectItem = (item: (typeof items)[number]) => {
//     triggerHaptic("light");

//     navigation.navigate("StageMapScreen", {
//       gameType: "puzzle",
//       puzzleCategory,
//       character: item.id,
//     });
//   };

//   return (
//     <Background>
//       <BackgroundImage
//         source={ASSETS.classificationMenuBackground}
//         resizeMode="cover"
//       />
//       <Screen edges={["top", "bottom"]}>
//         <AppHeader
//           title={headerTitle}
//           onBackPress={() => navigation.navigate("PuzzleMenuScreen")}
//           onMascotPress={() => navigation.navigate("SettingScreen")}
//         />

//         {/* ⭐ 태블릿에서 컨텐츠가 중앙에 모이도록 Wrapper 적용 */}
//         <CenterWrapper>
//           <MainContainer>
//             <TitleArea>
//               <Title>{selectTitle}</Title>
//               <Description>{selectDescription}</Description>
//             </TitleArea>

//             <FlatList
//               key={numColumns}
//               data={items}
//               keyExtractor={(item, index) => `${item.id}-${index}`}
//               numColumns={numColumns}
//               showsVerticalScrollIndicator={false}
//               style={{ flex: 1 }}
//               contentContainerStyle={{
//                 paddingHorizontal: 24,
//                 paddingBottom: 50,
//               }}
//               columnWrapperStyle={{
//                 justifyContent: "space-between",
//                 marginBottom: 16,
//               }}
//               renderItem={({ item }) => (
//                 <AnimalCard
//                   cardWidth={CARD_WIDTH}
//                   bgColor={item.cardBg}
//                   activeOpacity={0.9}
//                   onPress={() => handleSelectItem(item)}
//                 >
//                   <IconCircle style={{ backgroundColor: item.accentColor }}>
//                     <Ionicons name={item.iconName} size={42} color="#FFFFFF" />
//                   </IconCircle>
//                   <AnimalInfo>
//                     <AnimalTitle>{item.title}</AnimalTitle>
//                     <AnimalDescription>{item.description}</AnimalDescription>
//                   </AnimalInfo>
//                 </AnimalCard>
//               )}
//             />
//           </MainContainer>
//         </CenterWrapper>
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

// export const Screen = styled(SafeAreaView)`
//   flex: 1;
// `;

// /* ⭐ 태블릿 등 넓은 화면에서 양옆으로 퍼지지 않고 중앙에 모이도록 잡아주는 컴포넌트 추가 */
// export const CenterWrapper = styled.View`
//   flex: 1;
//   width: 100%;
//   align-self: center;
//   max-width: 600px;
// `;

// export const MainContainer = styled.View`
//   flex: 1;
// `;

// export const TitleArea = styled.View`
//   align-items: center;
//   padding-horizontal: 24px;
//   margin-top: 10px;
//   margin-bottom: 24px;
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

// export const AnimalCard = styled.TouchableOpacity<{
//   bgColor: string;
//   cardWidth: number;
// }>`
//   width: ${({ cardWidth }) => cardWidth}px;
//   background-color: ${({ bgColor }) => bgColor};
//   border-radius: 28px;
//   padding: 20px 16px;
//   align-items: center;
//   border-width: 3px;
//   border-color: #ffffff;

//   shadow-color: #a3a8cc;
//   shadow-offset: 0px 6px;
//   shadow-opacity: 0.12;
//   shadow-radius: 10px;
//   elevation: 3;
// `;

// export const IconCircle = styled.View`
//   width: 80px;
//   height: 80px;
//   border-radius: 40px;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 12px;

//   shadow-color: #000;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.12;
//   shadow-radius: 6px;
//   elevation: 3;
// `;

// export const AnimalInfo = styled.View`
//   align-items: center;
// `;

// export const AnimalTitle = styled(AppText)`
//   color: #29263d;
//   font-size: ${(props) => props.theme.typography.h3.fontSize}px;
//   font-family: ${(props) => props.theme.fontFamily};
//   text-align: center;
// `;

// export const AnimalDescription = styled(AppText)`
//   color: ${colors.secondaryText};
//   font-size: ${(props) => props.theme.typography.caption.fontSize}px;
//   margin-top: 2px;
//   text-align: center;
// `;

import React, { useMemo } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import Svg from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppText } from "../../utils/AppText";
import { RootStackParamList } from "../../navigation/types";
import { ASSETS } from "../../assets/assets";
import AppHeader from "../../components/AppHeader";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";
import { triggerHaptic } from "../../utils/haptic";
import BannerAd from "../../services/BannerAd";

// ==========================================
// 일러스트 컴포넌트 임포트 (경로 확인)
// ==========================================
import { AustraliaPuzzleScene } from "../../components/Puzzle/assets/flag/AustraliaPuzzleScene";
import KoreaFlagPuzzleScene from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import UsaFlagPuzzleScene from "../../components/Puzzle/assets/flag/UsaFlagPuzzleScene";
import { JapanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/JapanFlagPuzzleScene";
import { ChinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChinaFlagPuzzleScene";
import { UKFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UKFlagPuzzleScene";
import { FranceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/FranceFlagPuzzleScene";

import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/animal/BabyBunny/BabyBunnyPuzzleScene";
import PolarBearPuzzleScene from "../../components/Puzzle/assets/animal/PolarBear/PolarBearPuzzleScene";
import ChocoBearPuzzleScene from "../../components/Puzzle/assets/animal/ChocoBear/ChocoBearPuzzleScene";
import BabyLionPuzzleScene from "../../components/Puzzle/assets/animal/BabyLion/BabyLionPuzzleScene";
import PinkyPigPuzzleScene from "../../components/Puzzle/assets/animal/PinkyPig/PinkyPigPuzzleScene";
import PochiPenguinPuzzleScene from "../../components/Puzzle/assets/animal/PochiPenguin/PochiPenguinPuzzleScene";
import BabyElephantPuzzleScene from "../../components/Puzzle/assets/animal/BabyElephant/BabyElephantPuzzleScene";

import { BigBenPuzzleScene } from "../../components/Puzzle/assets/landmark/BigBenPuzzleScene";
import { EgyptPyramidPuzzleScene } from "../../components/Puzzle/assets/landmark/EgyptPyramidPuzzleScene";
import { EiffelTowerPuzzleScene } from "../../components/Puzzle/assets/landmark/EiffelTowerPuzzleScene";
import { LeaningTowerPuzzleScene } from "../../components/Puzzle/assets/landmark/LeaningTowerPuzzleScene";
import { OperaHousePuzzleScene } from "../../components/Puzzle/assets/landmark/OperaHousePuzzleScene";
import { StatueOfLibertyPuzzleScene } from "../../components/Puzzle/assets/landmark/StatueOfLibertyPuzzleScene";
import { TajMahalPuzzleScene } from "../../components/Puzzle/assets/landmark/TajMahalPuzzleScene";
import BabyBunnyPuzzleArtwork from "../../components/Puzzle/assets/animal/BabyBunny/BabyBunnyPuzzleArtwork";
import PolarBearPuzzleArtwork from "../../components/Puzzle/assets/animal/PolarBear/PolarBearPuzzleArtwork";
import ChocoBearPuzzleArtwork from "../../components/Puzzle/assets/animal/ChocoBear/ChocoBearPuzzleArtwork";
import BabyLionPuzzleArtwork from "../../components/Puzzle/assets/animal/BabyLion/BabyLionPuzzleArtwork";
import BabyElephantPuzzleArtwork from "../../components/Puzzle/assets/animal/BabyElephant/BabyElephantPuzzleArtwork";
import PochiPenguinPuzzleArtwork from "../../components/Puzzle/assets/animal/PochiPenguin/PochiPenguinPuzzleArtwork";
import PinkPigPuzzleArtwork from "../../components/Puzzle/assets/animal/PinkyPig/PinkPigPuzzleArtwork";

export type AnimalCharacterType =
  | "rabbit"
  | "polarbear"
  | "lion"
  | "penguin"
  | "elephant"
  | "pig"
  | "bear";

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
} as const;

export type PuzzleItemConfig = {
  id: string;
  titleKey: string;
  descKey: string;
  accentColor: string;
  cardBg: string;
};

export const ANIMAL_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "rabbit",
    titleKey: "animal_rabbit_title",
    descKey: "animal_rabbit_desc",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
  {
    id: "polarbear",
    titleKey: "animal_polarbear_title",
    descKey: "animal_polarbear_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "bear",
    titleKey: "animal_bear_title",
    descKey: "animal_bear_desc",
    accentColor: "#9B7653",
    cardBg: "#FDF5EE",
  },
  {
    id: "lion",
    titleKey: "animal_lion_title",
    descKey: "animal_lion_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF9E6",
  },
  {
    id: "pig",
    titleKey: "animal_pig_title",
    descKey: "animal_pig_desc",
    accentColor: "#FF94B8",
    cardBg: "#FFF0F3",
  },
  {
    id: "penguin",
    titleKey: "animal_penguin_title",
    descKey: "animal_penguin_desc",
    accentColor: "#55D6BE",
    cardBg: "#EDFAF6",
  },
  {
    id: "elephant",
    titleKey: "animal_elephant_title",
    descKey: "animal_elephant_desc",
    accentColor: "#7C5CFF",
    cardBg: "#F2F5FF",
  },
] as const;

export const FLAG_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "korea",
    titleKey: "flag_korea_title",
    descKey: "flag_korea_desc",
    accentColor: "#E84A5F",
    cardBg: "#FFF2F2",
  },
  {
    id: "usa",
    titleKey: "flag_usa_title",
    descKey: "flag_usa_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "japan",
    titleKey: "flag_japan_title",
    descKey: "flag_japan_desc",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
  {
    id: "uk",
    titleKey: "flag_uk_title",
    descKey: "flag_uk_desc",
    accentColor: "#5B6CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "australia",
    titleKey: "flag_australia_title",
    descKey: "flag_australia_desc",
    accentColor: "#6B7CFF",
    cardBg: "#EEF3FF",
  },
  {
    id: "china",
    titleKey: "flag_china_title",
    descKey: "flag_china_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF7E8",
  },
  {
    id: "france",
    titleKey: "flag_france_title",
    descKey: "flag_france_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F4F7FF",
  },
] as const;

export const LANDMARK_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "bigben",
    titleKey: "landmark_bigben_title",
    descKey: "landmark_bigben_desc",
    accentColor: "#5B6CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "pyramid",
    titleKey: "landmark_pyramid_title",
    descKey: "landmark_pyramid_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF7E8",
  },
  {
    id: "eiffel",
    titleKey: "landmark_eiffel_title",
    descKey: "landmark_eiffel_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "pisa",
    titleKey: "landmark_pisa_title",
    descKey: "landmark_pisa_desc",
    accentColor: "#7C5CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "operahouse",
    titleKey: "landmark_operahouse_title",
    descKey: "landmark_operahouse_desc",
    accentColor: "#55D6BE",
    cardBg: "#EDFAF6",
  },
  {
    id: "liberty",
    titleKey: "landmark_liberty_title",
    descKey: "landmark_liberty_desc",
    accentColor: "#34CDB2",
    cardBg: "#EDFDF8",
  },
  {
    id: "tajmahal",
    titleKey: "landmark_tajmahal_title",
    descKey: "landmark_tajmahal_desc",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
] as const;

// ⭐ 각 아이템 ID에 맞는 SVG 일러스트를 렌더링하는 헬퍼 함수
export function renderPuzzleIllustration(id: string) {
  switch (id) {
    // 동물
    case "rabbit":
      return <BabyBunnyPuzzleArtwork />;
    case "polarbear":
      return <PolarBearPuzzleArtwork />;
    case "bear":
      return <ChocoBearPuzzleArtwork />;
    case "lion":
      return <BabyLionPuzzleArtwork />;
    case "pig":
      return <PinkPigPuzzleArtwork />;
    case "penguin":
      return <PochiPenguinPuzzleArtwork />;
    case "elephant":
      return <BabyElephantPuzzleArtwork />;

    // 국기
    case "korea":
      return <KoreaFlagPuzzleScene />;
    case "usa":
      return <UsaFlagPuzzleScene />;
    case "japan":
      return <JapanFlagPuzzleScene />;
    case "uk":
      return <UKFlagPuzzleScene />;
    case "australia":
      return <AustraliaPuzzleScene />;
    case "china":
      return <ChinaFlagPuzzleScene />;
    case "france":
      return <FranceFlagPuzzleScene />;

    // 랜드마크
    case "bigben":
      return <BigBenPuzzleScene />;
    case "pyramid":
      return <EgyptPyramidPuzzleScene />;
    case "eiffel":
      return <EiffelTowerPuzzleScene />;
    case "pisa":
      return <LeaningTowerPuzzleScene />;
    case "operahouse":
      return <OperaHousePuzzleScene />;
    case "liberty":
      return <StatueOfLibertyPuzzleScene />;
    case "tajmahal":
      return <TajMahalPuzzleScene />;

    default:
      return null;
  }
}

export default function PuzzleThemeSelectScreen() {
  const insets = useSafeAreaInsets();
  const { locale } = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route =
    useRoute<RouteProp<RootStackParamList, "PuzzleThemeSelectScreen">>();

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const isTablet = SCREEN_WIDTH > 768;
  const containerWidth = isTablet ? Math.min(SCREEN_WIDTH, 600) : SCREEN_WIDTH;
  const numColumns = 2;

  const CARD_WIDTH = useMemo(() => {
    const horizontalPadding = 48;
    const gap = 16;
    const totalGaps = numColumns - 1;
    return (containerWidth - horizontalPadding - gap * totalGaps) / numColumns;
  }, [containerWidth, numColumns]);

  const { puzzleCategory } = route.params;
  const titleKey = `puzzle_${puzzleCategory}_title`;
  const headerTitle = i18n.t(titleKey);
  const selectTitle = i18n.t(`select_${puzzleCategory}_title`);
  const selectDescription = i18n.t(`select_${puzzleCategory}_desc`);

  const configs = useMemo(() => {
    switch (puzzleCategory) {
      case "animal":
        return ANIMAL_CONFIGS;
      case "flag":
        return FLAG_CONFIGS;
      case "landmark":
        return LANDMARK_CONFIGS;
      default:
        return [];
    }
  }, [puzzleCategory]);

  const items = useMemo(() => {
    return configs.map((item) => ({
      ...item,
      title: i18n.t(item.titleKey) || item.id,
      description: i18n.t(item.descKey) || "",
    }));
  }, [locale, configs]);

  const handleSelectItem = (item: (typeof items)[number]) => {
    triggerHaptic("light");

    navigation.navigate("StageMapScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character: item.id,
    });
  };

  return (
    <Background>
      <BackgroundImage
        source={ASSETS.classificationMenuBackground}
        resizeMode="cover"
      />
      <Screen edges={["top", "bottom"]}>
        <AppHeader
          title={headerTitle}
          onBackPress={() => navigation.navigate("PuzzleMenuScreen")}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        <CenterWrapper>
          <MainContainer>
            <TitleArea>
              <Title>{selectTitle}</Title>
              <Description>{selectDescription}</Description>
            </TitleArea>

            <FlatList
              key={numColumns}
              data={items}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={numColumns}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: 50,
              }}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 16,
              }}
              renderItem={({ item }) => (
                <AnimalCard
                  cardWidth={CARD_WIDTH}
                  bgColor={item.cardBg}
                  activeOpacity={0.9}
                  onPress={() => handleSelectItem(item)}
                >
                  {/* ⭐ 기존 단색 IconCircle 대신 깔끔한 일러스트 컨테이너와 SVG 렌더링 적용 */}
                  <IllustrationContainer>
                    <Svg width={96} height={72} viewBox="0 0 240 180">
                      {renderPuzzleIllustration(item.id)}
                    </Svg>
                  </IllustrationContainer>

                  <AnimalInfo>
                    <AnimalTitle numberOfLines={1} adjustsFontSizeToFit>
                      {item.title}
                    </AnimalTitle>
                    <AnimalDescription numberOfLines={2}>
                      {item.description}
                    </AnimalDescription>
                  </AnimalInfo>
                </AnimalCard>
              )}
            />
          </MainContainer>
        </CenterWrapper>
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

export const Screen = styled(SafeAreaView)`
  flex: 1;
`;

export const CenterWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-self: center;
  max-width: 600px;
`;

export const MainContainer = styled.View`
  flex: 1;
`;

export const TitleArea = styled.View`
  align-items: center;
  padding-horizontal: 24px;
  margin-top: 10px;
  margin-bottom: 24px;
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

export const AnimalCard = styled.TouchableOpacity<{
  bgColor: string;
  cardWidth: number;
}>`
  width: ${({ cardWidth }) => cardWidth}px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 28px;
  padding: 16px 12px;
  align-items: center;
  border-width: 3px;
  border-color: #ffffff;

  shadow-color: #a3a8cc;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.12;
  shadow-radius: 10px;
  elevation: 3;
`;

export const IllustrationContainer = styled.View`
  width: 96px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 3;
`;

export const AnimalInfo = styled.View`
  align-items: center;
`;

export const AnimalTitle = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h3.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const AnimalDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 2px;
  text-align: center;
`;
