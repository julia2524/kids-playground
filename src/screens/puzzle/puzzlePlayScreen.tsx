import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";
import StarRow from "../../design-system/components/StarRow";
import AppHeader from "../../components/AppHeader";
import PuzzleBoard from "../../components/Puzzle/engine/PuzzleBoard";

import PolarBearPuzzleScene from "../../components/Puzzle/assets/animal/PolarBear/PolarBearPuzzleScene";
import BabyLionPuzzleScene from "../../components/Puzzle/assets/animal/BabyLion/BabyLionPuzzleScene";
import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/animal/BabyBunny/BabyBunnyPuzzleScene";
import PochiPenguinPuzzleScene from "../../components/Puzzle/assets/animal/PochiPenguin/PochiPenguinPuzzleScene";
import BabyElephantPuzzleScene from "../../components/Puzzle/assets/animal/BabyElephant/BabyElephantPuzzleScene";
import PinkyPigPuzzleScene from "../../components/Puzzle/assets/animal/PinkyPig/PinkyPigPuzzleScene";
import ChocoBearPuzzleScene from "../../components/Puzzle/assets/animal/ChocoBear/ChocoBearPuzzleScene";

import ResultOverlay from "../../components/ResultOverlay";
import { playEarnedNotes } from "../../utils/sound";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import { savePuzzleLevelStars } from "../../utils/asyncStorage/puzzleProgressStorage";
import {
  getPuzzleLevelConfig,
  getPuzzleStars,
  TOTAL_PUZZLE_LEVELS,
} from "../../types/Puzzle/puzzleLevels";
import { AustraliaPuzzleScene } from "../../components/Puzzle/assets/flag/AustraliaPuzzleScene";
import { ChinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChinaFlagPuzzleScene";
import { FranceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/FranceFlagPuzzleScene";
import { JapanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/JapanFlagPuzzleScene";
import { UKFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UKFlagPuzzleScene";
import UsaFlagPuzzleScene from "../../components/Puzzle/assets/flag/UsaFlagPuzzleScene";
import { BigBenPuzzleScene } from "../../components/Puzzle/assets/landmark/BigBenPuzzleScene";
import { EgyptPyramidPuzzleScene } from "../../components/Puzzle/assets/landmark/EgyptPyramidPuzzleScene";
import { EiffelTowerPuzzleScene } from "../../components/Puzzle/assets/landmark/EiffelTowerPuzzleScene";
import { LeaningTowerPuzzleScene } from "../../components/Puzzle/assets/landmark/LeaningTowerPuzzleScene";
import { OperaHousePuzzleScene } from "../../components/Puzzle/assets/landmark/OperaHousePuzzleScene";
import { StatueOfLibertyPuzzleScene } from "../../components/Puzzle/assets/landmark/StatueOfLibertyPuzzleScene";
import { TajMahalPuzzleScene } from "../../components/Puzzle/assets/landmark/TajMahalPuzzleScene";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import PuzzleTestControls from "../../components/Puzzle/PuzzleTestControls";
import { EgyptFlagPuzzleScene } from "../../components/Puzzle/assets/flag/EgyptFlagPuzzleScene";
import { SaudiArabiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SaudiArabiaFlagPuzzleScene";
import { IraqFlagPuzzleScene } from "../../components/Puzzle/assets/flag/IraqFlagPuzzleScene";
import { AlgeriaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/AlgeriaFlagPuzzleScene";
import { BangladeshFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BangladeshFlagPuzzleScene";
import { NetherlandsFlagPuzzleScene } from "../../components/Puzzle/assets/flag/NetherlandsFlagPuzzleScene";
import { GermanyFlagPuzzleScene } from "../../components/Puzzle/assets/flag/GermanyFlagPuzzleScene";
import { GreeceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/GreeceFlagPuzzleScene";
import { IndiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/IndiaFlagPuzzleScene";
import { IndonesiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/IndonesiaFlagPuzzleScene";
import { SpainFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SpainFlagPuzzleScene";
import { ItalyFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ItalyFlagPuzzleScene";
import { BrazilFlagPuzzleScene } from "../../components/Puzzle/assets/flag/BrazilFlagPuzzleScene";
import { SwedenFlagPuzzleScene } from "../../components/Puzzle/assets/flag/SwedenFlagPuzzleScene";
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
import { PakistanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PakistanFlagPuzzleScene";
import { MexicoFlagPuzzleScene } from "../../components/Puzzle/assets/flag/MexicoFlagPuzzleScene";
import { PortugalFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PortugalFlagPuzzleScene";
import { VenezuelaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/VenezuelaFlagPuzzleScene";
import { ColombiaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ColombiaFlagPuzzleScene";
import { PeruFlagPuzzleScene } from "../../components/Puzzle/assets/flag/PeruFlagPuzzleScene";
import { ChileFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChileFlagPuzzleScene";
import { UkraineFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UkraineFlagPuzzleScene";
import { CubaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/CubaFlagPuzzleScene";
import { UruguayFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UruguayFlagPuzzleScene";
import { ParaguayFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ParaguayFlagPuzzleScene";
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
import { IranFlagPuzzleScene } from "../../components/Puzzle/assets/flag/IranFlagPuzzleScene";
import { TanzaniaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/TanzaniaFlagPuzzleScene";
import { KoreaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import { TaiwanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/TaiwanFlagPuzzleScene";

type RouteProps = RouteProp<RootStackParamList, "PuzzlePlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const ANIMAL_PUZZLE_DATA: Record<
  string,
  { title: string; Artwork: React.ComponentType<any> }
> = {
  polarbear: {
    title: "🐻‍❄️ 북극곰 퍼즐",
    Artwork: PolarBearPuzzleScene,
  },
  rabbit: {
    title: "🐰 토끼 퍼즐",
    Artwork: BabyBunnyPuzzleScene,
  },
  lion: {
    title: "🦁 사자 퍼즐",
    Artwork: BabyLionPuzzleScene,
  },
  penguin: {
    title: "🐧 펭귄 퍼즐",
    Artwork: PochiPenguinPuzzleScene,
  },
  elephant: {
    title: "🐘 코끼리 퍼즐",
    Artwork: BabyElephantPuzzleScene,
  },
  pig: {
    title: "🐷 돼지 퍼즐",
    Artwork: PinkyPigPuzzleScene,
  },
  bear: {
    title: "🐻 곰 퍼즐",
    Artwork: ChocoBearPuzzleScene,
  },
};

const FLAG_PUZZLE_DATA: Record<
  string,
  { title: string; Artwork: React.ComponentType<any> }
> = {
  korea: {
    title: "🇰🇷 태극기 퍼즐",
    Artwork: KoreaFlagPuzzleScene,
  },
  australia: {
    title: "🇦🇺 호주 국기 퍼즐",
    Artwork: AustraliaPuzzleScene,
  },
  china: {
    title: "🇨🇳 중국 국기 퍼즐",
    Artwork: ChinaFlagPuzzleScene,
  },
  france: {
    title: "🇫🇷 프랑스 국기 퍼즐",
    Artwork: FranceFlagPuzzleScene,
  },
  japan: {
    title: "🇯🇵 일장기 퍼즐",
    Artwork: JapanFlagPuzzleScene,
  },
  uk: {
    title: "영국 국기 퍼즐",
    Artwork: UKFlagPuzzleScene,
  },
  usa: {
    title: "성조기 퍼즐",
    Artwork: UsaFlagPuzzleScene,
  },
  egypt: {
    title: "🇪🇬 이집트 국기 퍼즐",
    Artwork: EgyptFlagPuzzleScene,
  },
  saudiarabia: {
    title: "🇸🇦 사우디아라비아 국기 퍼즐",
    Artwork: SaudiArabiaFlagPuzzleScene,
  },
  iraq: {
    title: "🇮🇶 이라크 국기 퍼즐",
    Artwork: IraqFlagPuzzleScene,
  },
  algeria: {
    title: "🇩🇿 알제리 국기 퍼즐",
    Artwork: AlgeriaFlagPuzzleScene,
  },
  bangladesh: {
    title: "🇧🇩 방글라데시 국기 퍼즐",
    Artwork: BangladeshFlagPuzzleScene,
  },
  netherlands: {
    title: "🇳🇱 네덜란드 국기 퍼즐",
    Artwork: NetherlandsFlagPuzzleScene,
  },
  germany: {
    title: "🇩🇪 독일 국기 퍼즐",
    Artwork: GermanyFlagPuzzleScene,
  },
  greece: {
    title: "🇬🇷 그리스 국기 퍼즐",
    Artwork: GreeceFlagPuzzleScene,
  },
  india: {
    title: "🇮🇳 인도 국기 퍼즐",
    Artwork: IndiaFlagPuzzleScene,
  },
  indonesia: {
    title: "🇮🇩 인도네시아 국기 퍼즐",
    Artwork: IndonesiaFlagPuzzleScene,
  },
  spain: {
    title: "🇪🇸 스페인 국기 퍼즐",
    Artwork: SpainFlagPuzzleScene,
  },
  italy: {
    title: "🇮🇹 이탈리아 국기 퍼즐",
    Artwork: ItalyFlagPuzzleScene,
  },
  brazil: {
    title: "🇧🇷 브라질 국기 퍼즐",
    Artwork: BrazilFlagPuzzleScene,
  },
  sweden: {
    title: "🇸🇪 스웨덴 국기 퍼즐",
    Artwork: SwedenFlagPuzzleScene,
  },
  thailand: {
    title: "🇹🇭 태국 국기 퍼즐",
    Artwork: ThailandFlagPuzzleScene,
  },
  vietnam: {
    title: "🇻🇳 베트남 국기 퍼즐",
    Artwork: VietnamFlagPuzzleScene,
  },
  canada: {
    title: "🇨🇦 캐나다 국기 퍼즐",
    Artwork: CanadaFlagPuzzleScene,
  },
  switzerland: {
    title: "🇨🇭 스위스 국기 퍼즐",
    Artwork: SwitzerlandFlagPuzzleScene,
  },
  turkey: {
    title: "🇹🇷 튀르키예 국기 퍼즐",
    Artwork: TurkeyFlagPuzzleScene,
  },
  argentina: {
    title: "🇦🇷 아르헨티나 국기 퍼즐",
    Artwork: ArgentinaFlagPuzzleScene,
  },
  poland: {
    title: "🇵🇱 폴란드 국기 퍼즐",
    Artwork: PolandFlagPuzzleScene,
  },
  romania: {
    title: "🇷🇴 루마니아 국기 퍼즐",
    Artwork: RomaniaFlagPuzzleScene,
  },
  russia: {
    title: "🇷🇺 러시아 국기 퍼즐",
    Artwork: RussiaFlagPuzzleScene,
  },
  philippines: {
    title: "🇵🇭 필리핀 국기 퍼즐",
    Artwork: PhilippinesFlagPuzzleScene,
  },
  malaysia: {
    title: "🇲🇾 말레이시아 국기 퍼즐",
    Artwork: MalaysiaFlagPuzzleScene,
  },
  pakistan: {
    title: "🇵🇰 파키스탄 국기 퍼즐",
    Artwork: PakistanFlagPuzzleScene,
  },
  mexico: {
    title: "🇲🇽 멕시코 국기 퍼즐",
    Artwork: MexicoFlagPuzzleScene,
  },
  portugal: {
    title: "🇵🇹 포르투갈 국기 퍼즐",
    Artwork: PortugalFlagPuzzleScene,
  },
  venezuela: {
    title: "🇻🇪 베네수엘라 국기 퍼즐",
    Artwork: VenezuelaFlagPuzzleScene,
  },
  colombia: {
    title: "🇨🇴 콜롬비아 국기 퍼즐",
    Artwork: ColombiaFlagPuzzleScene,
  },
  peru: {
    title: "🇵🇪 페루 국기 퍼즐",
    Artwork: PeruFlagPuzzleScene,
  },
  chile: {
    title: "🇨🇱 칠레 국기 퍼즐",
    Artwork: ChileFlagPuzzleScene,
  },
  ukraine: {
    title: "🇺🇦 우크라이나 국기 퍼즐",
    Artwork: UkraineFlagPuzzleScene,
  },
  cuba: {
    title: "🇨🇺 쿠바 국기 퍼즐",
    Artwork: CubaFlagPuzzleScene,
  },
  uruguay: {
    title: "🇺🇾 우루과이 국기 퍼즐",
    Artwork: UruguayFlagPuzzleScene,
  },
  paraguay: {
    title: "🇵🇾 파라과이 국기 퍼즐",
    Artwork: ParaguayFlagPuzzleScene,
  },
  honduras: {
    title: "🇭🇳 온두라스 국기 퍼즐",
    Artwork: HondurasFlagPuzzleScene,
  },
  elsalvador: {
    title: "🇸🇻 엘살바도르 국기 퍼즐",
    Artwork: ElSalvadorFlagPuzzleScene,
  },
  nicaragua: {
    title: "🇳🇮 니카라과 국기 퍼즐",
    Artwork: NicaraguaFlagPuzzleScene,
  },
  guatemala: {
    title: "🇬🇹 과테말라 국기 퍼즐",
    Artwork: GuatemalaFlagPuzzleScene,
  },
  costarica: {
    title: "🇨🇷 코스타리카 국기 퍼즐",
    Artwork: CostaRicaFlagPuzzleScene,
  },
  panama: {
    title: "🇵🇦 파나마 국기 퍼즐",
    Artwork: PanamaFlagPuzzleScene,
  },
  bolivia: {
    title: "🇧🇴 볼리비아 국기 퍼즐",
    Artwork: BoliviaFlagPuzzleScene,
  },
  ecuador: {
    title: "🇪🇨 에콰도르 국기 퍼즐",
    Artwork: EcuadorFlagPuzzleScene,
  },
  belgium: {
    title: "🇧🇪 벨기에 국기 퍼즐",
    Artwork: BelgiumFlagPuzzleScene,
  },
  drcongo: {
    title: "🇨🇩 콩고민주공화국 국기 퍼즐",
    Artwork: DRCongoFlagPuzzleScene,
  },
  nigeria: {
    title: "🇳🇬 나이지리아 국기 퍼즐",
    Artwork: NigeriaFlagPuzzleScene,
  },
  nepal: {
    title: "🇳🇵 네팔 국기 퍼즐",
    Artwork: NepalFlagPuzzleScene,
  },
  iran: {
    title: "🇮🇷 이란 국기 퍼즐",
    Artwork: IranFlagPuzzleScene,
  },
  tanzania: {
    title: "🇹🇿 탄자니아 국기 퍼즐",
    Artwork: TanzaniaFlagPuzzleScene,
  },
  taiwan: {
    title: "🇹🇼 대만 국기 퍼즐",
    Artwork: TaiwanFlagPuzzleScene,
  },
};

const LANDMARK_PUZZLE_DATA: Record<
  string,
  { title: string; Artwork: React.ComponentType<any> }
> = {
  bigben: {
    title: "🇬🇧 빅벤 퍼즐",
    Artwork: BigBenPuzzleScene,
  },
  pyramid: {
    title: "🇪🇬 피라미드 퍼즐",
    Artwork: EgyptPyramidPuzzleScene,
  },
  eiffel: {
    title: "🇫🇷 에펠탑 퍼즐",
    Artwork: EiffelTowerPuzzleScene,
  },
  pisa: {
    title: "🇮🇹 피사의 사탑 퍼즐",
    Artwork: LeaningTowerPuzzleScene,
  },
  operahouse: {
    title: "🇦🇺 오페라하우스 퍼즐",
    Artwork: OperaHousePuzzleScene,
  },
  liberty: {
    title: "🇺🇸 자유의 여신상 퍼즐",
    Artwork: StatueOfLibertyPuzzleScene,
  },
  tajmahal: {
    title: "🇮🇳 타지마할 퍼즐",
    Artwork: TajMahalPuzzleScene,
  },
};
const HIDE_ARTWORK_FROM_LEVEL = 11;
const SHOW_TEST_CONTROLS = false;

export default function PuzzlePlayScreen() {
  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    playThemeBGM("game");

    return () => {
      playThemeBGM("main");
    };
  }, [playThemeBGM]);

  const insets = useSafeAreaInsets();
  const bottomSpace = Math.max(insets.bottom, 16);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const {
    gameType = "puzzle",
    level: initialLevel = 1,
    character = "polarbear",
    puzzleCategory = "animal",
  } = route.params ?? {};

  const [level, setLevel] = useState(initialLevel);
  const [currentStars, setCurrentStars] = useState(5);
  const [earnedStars, setEarnedStars] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  const PUZZLE_DATA_MAP = {
    animal: ANIMAL_PUZZLE_DATA,
    flag: FLAG_PUZZLE_DATA,
    landmark: LANDMARK_PUZZLE_DATA,
  } as const;

  const currentPuzzleDataset =
    PUZZLE_DATA_MAP[puzzleCategory as keyof typeof PUZZLE_DATA_MAP] ??
    ANIMAL_PUZZLE_DATA;
  const levelConfig = getPuzzleLevelConfig(level);
  const currentPuzzle =
    currentPuzzleDataset[character] ??
    currentPuzzleDataset[Object.keys(currentPuzzleDataset)[0]] ??
    ANIMAL_PUZZLE_DATA.polarbear;

  const handleComplete = useCallback((wrongDropCount: number) => {
    const stars = getPuzzleStars(wrongDropCount);

    const timer = setTimeout(() => {
      setEarnedStars(stars);
      setIsCompleted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isCompleted) return;

    void savePuzzleLevelStars(character, level, earnedStars);
  }, [isCompleted, character, level, earnedStars]);

  useEffect(() => {
    if (!isCompleted) return;

    playEarnedNotes(Math.round(earnedStars / 0.5));
  }, [isCompleted, earnedStars, playEarnedNotes]);

  const resetBoard = useCallback(() => {
    setIsCompleted(false);
    setEarnedStars(0);
    setCurrentStars(5);
    setBoardKey((previous) => previous + 1);
  }, []);

  const handleRestart = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  const handleNextLevel = useCallback(() => {
    if (level >= TOTAL_PUZZLE_LEVELS) return;

    setLevel((previous) => Math.min(previous + 1, TOTAL_PUZZLE_LEVELS));
    resetBoard();
  }, [level, resetBoard]);

  // 컨트롤러에서 레벨을 변경할 때 실행될 함수
  const handleChangeLevel = useCallback(
    (newLevel: number) => {
      setLevel(newLevel);
      resetBoard();
    },
    [resetBoard],
  );
  const handleGoRoadmap = useCallback(() => {
    navigation.navigate("StageMapScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character,
    });
  }, [navigation, puzzleCategory, character]);

  const handleWrongDropCountChange = useCallback((wrongDropCount: number) => {
    setCurrentStars(getPuzzleStars(wrongDropCount));
  }, []);

  const hideArtwork = level >= HIDE_ARTWORK_FROM_LEVEL;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#eef0fe",
      }}
    >
      <LinearGradient
        colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
        style={StyleSheet.absoluteFill}
      />

      <AppHeader
        onBackPress={() => navigation.goBack()}
        onMascotPress={() => navigation.navigate("SettingScreen")}
        title={
          <StarRow
            earnedStars={isCompleted ? earnedStars : currentStars}
            totalStars={5}
            gameType="color"
            size={30}
          />
        }
      />

      <Container>
        <GameContainer>
          <PuzzleBoard
            key={boardKey}
            title={currentPuzzle.title}
            Artwork={currentPuzzle.Artwork}
            viewBoxWidth={240}
            viewBoxHeight={180}
            rows={levelConfig.rows}
            columns={levelConfig.columns}
            onComplete={handleComplete}
            onWrongDropCountChange={handleWrongDropCountChange}
            hideArtwork={hideArtwork}
            showTutorial={level === 1} // ← 첫 레벨에서만
          />
        </GameContainer>
        {/* 퍼즐에 맞게 라운드를 뺀 레벨 전용 컨트롤러 */}
        {SHOW_TEST_CONTROLS && (
          <PuzzleTestControls
            level={level}
            totalLevels={TOTAL_PUZZLE_LEVELS}
            onChangeLevel={handleChangeLevel}
          />
        )}
      </Container>

      {isCompleted && (
        <ResultOverlay
          level={level}
          earnedStars={earnedStars}
          isLastLevel={level >= TOTAL_PUZZLE_LEVELS}
          gameType={gameType}
          onHome={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
          onRestart={handleRestart}
          onNextLevel={handleNextLevel}
          onGoRoadmap={handleGoRoadmap}
        />
      )}
    </View>
  );
}

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #eef0fe;
`;

const Container = styled.View`
  flex: 1;
`;

const GameContainer = styled.View`
  flex: 1;
  align-self: stretch;
  direction: ltr;
`;
