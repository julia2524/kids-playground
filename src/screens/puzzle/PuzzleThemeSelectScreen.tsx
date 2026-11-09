import React, { useMemo } from "react";
import { Dimensions, FlatList, useWindowDimensions } from "react-native";
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
import UsaFlagPuzzleScene from "../../components/Puzzle/assets/flag/UsaFlagPuzzleScene";
import { JapanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/JapanFlagPuzzleScene";
import { ChinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChinaFlagPuzzleScene";
import { UKFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UKFlagPuzzleScene";
import { FranceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/FranceFlagPuzzleScene";

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
import { EgyptFlagPuzzleScene } from "../../components/Puzzle/assets/flag/EgyptFlagPuzzleScene";
import { AlgeriaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/AlgeriaFlagPuzzleScene";
import { BangladeshFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BangladeshFlagPuzzleScene";
import { NetherlandsFlagPuzzleScene } from "../../components/Puzzle/assets/flag/NetherlandsFlagPuzzleScene";
import { GermanyFlagPuzzleScene } from "../../components/Puzzle/assets/flag/GermanyFlagPuzzleScene";
import { GreeceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/GreeceFlagPuzzleScene";
import { IndonesiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/IndonesiaFlagPuzzleScene";
import { SpainFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SpainFlagPuzzleScene";
import { ItalyFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ItalyFlagPuzzleScene";
import { BrazilFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BrazilFlagPuzzleScene";
import { ThailandFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ThailandFlagPuzzleScene";
import { VietnamFlagPuzzleScene } from "../../components/Puzzle/assets/flag/VietnamFlagPuzzleScene";
import { CanadaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/CanadaFlagPuzzleScene";
import { SwitzerlandFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SwitzerlandFlagPuzzleScene";
import { TurkeyFlagPuzzleScene } from "../../components/Puzzle/assets/flag/TurkeyFlagPuzzleScene";
import { ArgentinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ArgentinaFlagPuzzleScene";
import { PolandFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PolandFlagPuzzleScene";
import { RomaniaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/RomaniaFlagPuzzleScene";
import { RussiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/RussiaFlagPuzzleScene";
import { PhilippinesFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PhilippinesFlagPuzzleScene";
import { MalaysiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/MalaysiaFlagPuzzleScene";
import { PortugalFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PortugalFlagPuzzleScene";
import { VenezuelaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/VenezuelaFlagPuzzleScene";
import { ColombiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ColombiaFlagPuzzleScene";
import { PeruFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PeruFlagPuzzleScene";
import { ChileFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChileFlagPuzzleScene";
import { UkraineFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UkraineFlagPuzzleScene";
import { CubaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/CubaFlagPuzzleScene";
import { UruguayFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UruguayFlagPuzzleScene";
import { ParaguayFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ParaguayFlagPuzzleScene";
import { getPuzzleGroupId } from "./puzzleGroupConfig";
import { HondurasFlagPuzzleScene } from "../../components/Puzzle/assets/flag/HondurasFlagPuzzleScene";
import { ElSalvadorFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ElSalvadorFlagPuzzleScene";
import { NicaraguaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/NicaraguaFlagPuzzleScene";
import { GuatemalaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/GuatemalaFlagPuzzleScene";
import { CostaRicaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/CostaRicaFlagPuzzleScene";
import { PanamaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PanamaFlagPuzzleScene";
import { BoliviaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BoliviaFlagPuzzleScene";
import { EcuadorFlagPuzzleScene } from "../../components/Puzzle/assets/flag/EcuadorFlagPuzzleScene";
import { BelgiumFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BelgiumFlagPuzzleScene";
import { DRCongoFlagPuzzleScene } from "../../components/Puzzle/assets/flag/DRCongoFlagPuzzleScene";
import { NigeriaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/NigeriaFlagPuzzleScene";
import { NepalFlagPuzzleScene } from "../../components/Puzzle/assets/flag/NepalFlagPuzzleScene";
import { TanzaniaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/TanzaniaFlagPuzzleScene";
import { KoreaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import { TaiwanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/TaiwanFlagPuzzleScene";
import { SwedenFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SwedenFlagPuzzleScene";

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
    id: "bear",
    titleKey: "animal_bear_title",
    descKey: "animal_bear_desc",
    accentColor: "#9B7653",
    cardBg: "#FDF5EE",
  },
  {
    id: "elephant",
    titleKey: "animal_elephant_title",
    descKey: "animal_elephant_desc",
    accentColor: "#7C5CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "lion",
    titleKey: "animal_lion_title",
    descKey: "animal_lion_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF9E6",
  },
  {
    id: "penguin",
    titleKey: "animal_penguin_title",
    descKey: "animal_penguin_desc",
    accentColor: "#55D6BE",
    cardBg: "#EDFAF6",
  },
  {
    id: "pig",
    titleKey: "animal_pig_title",
    descKey: "animal_pig_desc",
    accentColor: "#FF94B8",
    cardBg: "#FFF0F3",
  },
  {
    id: "polarbear",
    titleKey: "animal_polarbear_title",
    descKey: "animal_polarbear_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "rabbit",
    titleKey: "animal_rabbit_title",
    descKey: "animal_rabbit_desc",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
] as const;

export const FLAG_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "algeria",
    titleKey: "flag_algeria_title",
    descKey: "flag_algeria_desc",
    accentColor: "#0F8A43",
    cardBg: "#EEF8F2",
  },
  {
    id: "argentina",
    titleKey: "flag_argentina_title",
    descKey: "flag_argentina_desc",
    accentColor: "#5BC0EB",
    cardBg: "#F0FAFF",
  },
  {
    id: "australia",
    titleKey: "flag_australia_title",
    descKey: "flag_australia_desc",
    accentColor: "#6B7CFF",
    cardBg: "#EEF3FF",
  },
  {
    id: "bangladesh",
    titleKey: "flag_bangladesh_title",
    descKey: "flag_bangladesh_desc",
    accentColor: "#0E8F55",
    cardBg: "#EEF9F4",
  },
  {
    id: "belgium",
    titleKey: "flag_belgium_title",
    descKey: "flag_belgium_desc",
    accentColor: "#FFD43B",
    cardBg: "#FFFBEA",
  },
  {
    id: "bolivia",
    titleKey: "flag_bolivia_title",
    descKey: "flag_bolivia_desc",
    accentColor: "#2EAE60",
    cardBg: "#EFFBF3",
  },
  {
    id: "brazil",
    titleKey: "flag_brazil_title",
    descKey: "flag_brazil_desc",
    accentColor: "#1E9E61",
    cardBg: "#EEF9F3",
  },
  {
    id: "canada",
    titleKey: "flag_canada_title",
    descKey: "flag_canada_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "chile",
    titleKey: "flag_chile_title",
    descKey: "flag_chile_desc",
    accentColor: "#2563EB",
    cardBg: "#EFF5FF",
  },
  {
    id: "china",
    titleKey: "flag_china_title",
    descKey: "flag_china_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF7E8",
  },
  {
    id: "colombia",
    titleKey: "flag_colombia_title",
    descKey: "flag_colombia_desc",
    accentColor: "#F4B400",
    cardBg: "#FFF9E8",
  },
  {
    id: "costarica",
    titleKey: "flag_costarica_title",
    descKey: "flag_costarica_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "cuba",
    titleKey: "flag_cuba_title",
    descKey: "flag_cuba_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "drcongo",
    titleKey: "flag_drcongo_title",
    descKey: "flag_drcongo_desc",
    accentColor: "#4D8DFF",
    cardBg: "#EEF5FF",
  },
  {
    id: "ecuador",
    titleKey: "flag_ecuador_title",
    descKey: "flag_ecuador_desc",
    accentColor: "#F4B400",
    cardBg: "#FFF9E8",
  },
  {
    id: "egypt",
    titleKey: "flag_egypt_title",
    descKey: "flag_egypt_desc",
    accentColor: "#D4A017",
    cardBg: "#FFF9EC",
  },
  {
    id: "elsalvador",
    titleKey: "flag_elsalvador_title",
    descKey: "flag_elsalvador_desc",
    accentColor: "#3B82F6",
    cardBg: "#EEF5FF",
  },
  {
    id: "france",
    titleKey: "flag_france_title",
    descKey: "flag_france_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F4F7FF",
  },
  {
    id: "germany",
    titleKey: "flag_germany_title",
    descKey: "flag_germany_desc",
    accentColor: "#222222",
    cardBg: "#F5F5F5",
  },
  {
    id: "greece",
    titleKey: "flag_greece_title",
    descKey: "flag_greece_desc",
    accentColor: "#5B8CFF",
    cardBg: "#F3F7FF",
  },
  {
    id: "guatemala",
    titleKey: "flag_guatemala_title",
    descKey: "flag_guatemala_desc",
    accentColor: "#5BC0EB",
    cardBg: "#F0FAFF",
  },
  {
    id: "honduras",
    titleKey: "flag_honduras_title",
    descKey: "flag_honduras_desc",
    accentColor: "#3B82F6",
    cardBg: "#EEF5FF",
  },
  {
    id: "indonesia",
    titleKey: "flag_indonesia_title",
    descKey: "flag_indonesia_desc",
    accentColor: "#E84A5F",
    cardBg: "#FFF2F2",
  },
  {
    id: "italy",
    titleKey: "flag_italy_title",
    descKey: "flag_italy_desc",
    accentColor: "#2EAE60",
    cardBg: "#EFFBF3",
  },
  {
    id: "japan",
    titleKey: "flag_japan_title",
    descKey: "flag_japan_desc",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
  {
    id: "korea",
    titleKey: "flag_korea_title",
    descKey: "flag_korea_desc",
    accentColor: "#E84A5F",
    cardBg: "#FFF2F2",
  },
  {
    id: "nepal",
    titleKey: "flag_nepal_title",
    descKey: "flag_nepal_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "netherlands",
    titleKey: "flag_netherlands_title",
    descKey: "flag_netherlands_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F2F6FF",
  },
  {
    id: "nicaragua",
    titleKey: "flag_nicaragua_title",
    descKey: "flag_nicaragua_desc",
    accentColor: "#3B82F6",
    cardBg: "#EEF5FF",
  },
  {
    id: "nigeria",
    titleKey: "flag_nigeria_title",
    descKey: "flag_nigeria_desc",
    accentColor: "#1FA971",
    cardBg: "#EEF9F5",
  },
  {
    id: "panama",
    titleKey: "flag_panama_title",
    descKey: "flag_panama_desc",
    accentColor: "#2563EB",
    cardBg: "#EFF5FF",
  },
  {
    id: "paraguay",
    titleKey: "flag_paraguay_title",
    descKey: "flag_paraguay_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "peru",
    titleKey: "flag_peru_title",
    descKey: "flag_peru_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "philippines",
    titleKey: "flag_philippines_title",
    descKey: "flag_philippines_desc",
    accentColor: "#2563EB",
    cardBg: "#EFF5FF",
  },
  {
    id: "poland",
    titleKey: "flag_poland_title",
    descKey: "flag_poland_desc",
    accentColor: "#E84A5F",
    cardBg: "#FFF0F3",
  },
  {
    id: "portugal",
    titleKey: "flag_portugal_title",
    descKey: "flag_portugal_desc",
    accentColor: "#1E9E61",
    cardBg: "#EEF9F3",
  },
  {
    id: "romania",
    titleKey: "flag_romania_title",
    descKey: "flag_romania_desc",
    accentColor: "#FFD43B",
    cardBg: "#FFFBEA",
  },
  {
    id: "russia",
    titleKey: "flag_russia_title",
    descKey: "flag_russia_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F2F6FF",
  },
  {
    id: "spain",
    titleKey: "flag_spain_title",
    descKey: "flag_spain_desc",
    accentColor: "#FFB020",
    cardBg: "#FFF8EC",
  },
  {
    id: "sweden",
    titleKey: "flag_sweden_title",
    descKey: "flag_sweden_desc",
    accentColor: "#2F80ED",
    cardBg: "#EEF5FF",
  },
  {
    id: "switzerland",
    titleKey: "flag_switzerland_title",
    descKey: "flag_switzerland_desc",
    accentColor: "#D62839",
    cardBg: "#FFF0F0",
  },
  {
    id: "taiwan",
    titleKey: "flag_taiwan_title",
    descKey: "flag_taiwan_desc",
    accentColor: "#2563EB",
    cardBg: "#EFF5FF",
  },
  {
    id: "tanzania",
    titleKey: "flag_tanzania_title",
    descKey: "flag_tanzania_desc",
    accentColor: "#1A936F",
    cardBg: "#EDF9F5",
  },
  {
    id: "thailand",
    titleKey: "flag_thailand_title",
    descKey: "flag_thailand_desc",
    accentColor: "#4154D8",
    cardBg: "#F1F3FF",
  },
  {
    id: "turkey",
    titleKey: "flag_turkey_title",
    descKey: "flag_turkey_desc",
    accentColor: "#E53935",
    cardBg: "#FFF1F1",
  },
  {
    id: "uk",
    titleKey: "flag_uk_title",
    descKey: "flag_uk_desc",
    accentColor: "#5B6CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "ukraine",
    titleKey: "flag_ukraine_title",
    descKey: "flag_ukraine_desc",
    accentColor: "#2F80ED",
    cardBg: "#EEF5FF",
  },
  {
    id: "uruguay",
    titleKey: "flag_uruguay_title",
    descKey: "flag_uruguay_desc",
    accentColor: "#5BC0EB",
    cardBg: "#F0FAFF",
  },
  {
    id: "usa",
    titleKey: "flag_usa_title",
    descKey: "flag_usa_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "venezuela",
    titleKey: "flag_venezuela_title",
    descKey: "flag_venezuela_desc",
    accentColor: "#F4B400",
    cardBg: "#FFF9E8",
  },
  {
    id: "vietnam",
    titleKey: "flag_vietnam_title",
    descKey: "flag_vietnam_desc",
    accentColor: "#D92D20",
    cardBg: "#FFF3F1",
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
    id: "eiffel",
    titleKey: "landmark_eiffel_title",
    descKey: "landmark_eiffel_desc",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "liberty",
    titleKey: "landmark_liberty_title",
    descKey: "landmark_liberty_desc",
    accentColor: "#34CDB2",
    cardBg: "#EDFDF8",
  },
  {
    id: "operahouse",
    titleKey: "landmark_operahouse_title",
    descKey: "landmark_operahouse_desc",
    accentColor: "#55D6BE",
    cardBg: "#EDFAF6",
  },
  {
    id: "pisa",
    titleKey: "landmark_pisa_title",
    descKey: "landmark_pisa_desc",
    accentColor: "#7C5CFF",
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
    case "egypt":
      return <EgyptFlagPuzzleScene />;

    case "algeria":
      return <AlgeriaFlagPuzzleScene />;
    case "bangladesh":
      return <BangladeshFlagPuzzleScene />;
    case "netherlands":
      return <NetherlandsFlagPuzzleScene />;
    case "germany":
      return <GermanyFlagPuzzleScene />;
    case "greece":
      return <GreeceFlagPuzzleScene />;

    case "indonesia":
      return <IndonesiaFlagPuzzleScene />;
    case "spain":
      return <SpainFlagPuzzleScene />;
    case "italy":
      return <ItalyFlagPuzzleScene />;
    case "brazil":
      return <BrazilFlagPuzzleScene />;
    case "sweden":
      return <SwedenFlagPuzzleScene />;
    case "thailand":
      return <ThailandFlagPuzzleScene />;
    case "vietnam":
      return <VietnamFlagPuzzleScene />;
    case "canada":
      return <CanadaFlagPuzzleScene />;
    case "switzerland":
      return <SwitzerlandFlagPuzzleScene />;
    case "turkey":
      return <TurkeyFlagPuzzleScene />;
    case "argentina":
      return <ArgentinaFlagPuzzleScene />;
    case "poland":
      return <PolandFlagPuzzleScene />;
    case "romania":
      return <RomaniaFlagPuzzleScene />;
    case "russia":
      return <RussiaFlagPuzzleScene />;
    case "philippines":
      return <PhilippinesFlagPuzzleScene />;

    case "portugal":
      return <PortugalFlagPuzzleScene />;
    case "venezuela":
      return <VenezuelaFlagPuzzleScene />;
    case "colombia":
      return <ColombiaFlagPuzzleScene />;
    case "peru":
      return <PeruFlagPuzzleScene />;
    case "chile":
      return <ChileFlagPuzzleScene />;
    case "ukraine":
      return <UkraineFlagPuzzleScene />;
    case "cuba":
      return <CubaFlagPuzzleScene />;
    case "uruguay":
      return <UruguayFlagPuzzleScene />;
    case "paraguay":
      return <ParaguayFlagPuzzleScene />;
    case "honduras":
      return <HondurasFlagPuzzleScene />;
    case "elsalvador":
      return <ElSalvadorFlagPuzzleScene />;
    case "nicaragua":
      return <NicaraguaFlagPuzzleScene />;
    case "guatemala":
      return <GuatemalaFlagPuzzleScene />;
    case "costarica":
      return <CostaRicaFlagPuzzleScene />;
    case "panama":
      return <PanamaFlagPuzzleScene />;
    case "bolivia":
      return <BoliviaFlagPuzzleScene />;
    case "ecuador":
      return <EcuadorFlagPuzzleScene />;
    case "belgium":
      return <BelgiumFlagPuzzleScene />;
    case "drcongo":
      return <DRCongoFlagPuzzleScene />;
    case "nigeria":
      return <NigeriaFlagPuzzleScene />;
    case "nepal":
      return <NepalFlagPuzzleScene />;

    case "tanzania":
      return <TanzaniaFlagPuzzleScene />;
    case "taiwan":
      return <TaiwanFlagPuzzleScene />;

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

  const { puzzleCategory, groupId } = route.params;
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

  const filteredConfigs = useMemo(() => {
    if (!groupId) return configs;

    return configs.filter(
      (item) => getPuzzleGroupId(puzzleCategory, item.id) === groupId,
    );
  }, [configs, groupId, puzzleCategory]);

  const items = useMemo(() => {
    return filteredConfigs.map((item) => ({
      ...item,
      title: i18n.t(item.titleKey) || item.id,
      description: i18n.t(item.descKey) || "",
    }));
  }, [locale, filteredConfigs]);

  const handleSelectItem = (item: (typeof items)[number]) => {
    triggerHaptic("light");

    navigation.navigate("StageMapScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character: item.id,
      groupId,
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
          onBackPress={() => {
            if (groupId) {
              navigation.navigate("PuzzleGroupSelectScreen", {
                puzzleCategory,
              });
              return;
            }

            navigation.navigate("PuzzleMenuScreen");
          }}
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
