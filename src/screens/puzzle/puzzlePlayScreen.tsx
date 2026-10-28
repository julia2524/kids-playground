import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
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

import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";
import { playEarnedNotes } from "../../utils/sound";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import { savePuzzleLevelStars } from "../../utils/asyncStorage/puzzleProgressStorage";
import {
  getPuzzleLevelConfig,
  getPuzzleStars,
  TOTAL_PUZZLE_LEVELS,
} from "../../types/Puzzle/puzzleLevels";
import KoreaFlagPuzzleScene from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import { AustraliaPuzzleScene } from "../../components/Puzzle/assets/flag/AustraliaPuzzleScene";
import { ChinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChinaFlagPuzzleScene";
import { FranceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/FranceFlagPuzzleScene";
import { JapanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/JapanFlagPuzzleScene";
import { UKFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UKFlagPuzzleScene";
import UsaFlagPuzzleScene from "../../components/Puzzle/assets/flag/UsaFlagPuzzleScene";

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
  austrailia: {
    title: "🇦🇺 호주 국기 퍼즐",
    Artwork: AustraliaPuzzleScene,
  },
  china: {
    title: "🇨🇳 중국 국기 퍼즐",
    Artwork: ChinaFlagPuzzleScene,
  },
  france: {
    title: "🇫🇷 프랑스 국기 퍼즐", // 오타 수정
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
};

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
  const [earnedStars, setEarnedStars] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  // const currentPuzzle =
  //   ANIMAL_PUZZLE_DATA[character] ?? ANIMAL_PUZZLE_DATA.polarbear;
  // puzzleCategory에 따라 animal 또는 flag 데이터셋 선택하도록 일반화
  const currentPuzzleDataset =
    puzzleCategory === "flag" ? FLAG_PUZZLE_DATA : ANIMAL_PUZZLE_DATA;
  const levelConfig = getPuzzleLevelConfig(level);
  const currentPuzzle =
    currentPuzzleDataset[character] ??
    currentPuzzleDataset[Object.keys(currentPuzzleDataset)[0]] ??
    ANIMAL_PUZZLE_DATA.polarbear;

  const handleComplete = useCallback((wrongDropCount: number) => {
    const stars = getPuzzleStars(wrongDropCount);

    // 마지막 조각이 맞춰지는 순간과 결과 오버레이 표시를 분리한다.
    const timer = setTimeout(() => {
      setEarnedStars(stars);
      setIsCompleted(true);
    }, 500);

    // return () => clearTimeout(timer);
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
  const handleGoRoadmap = useCallback(() => {
    navigation.navigate("StageMapScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character,
    });
  }, [navigation, puzzleCategory, character]);
  return (
    <SafeAreaContainer edges={["top"]}>
      <LinearGradient
        colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
        style={StyleSheet.absoluteFill}
      />

      <AppHeader
        onBackPress={() => navigation.goBack()}
        onMascotPress={() => navigation.navigate("SettingScreen")}
        title={
          <StarRow
            earnedStars={earnedStars}
            totalStars={5}
            gameType="color"
            size={30}
          />
        }
      />

      <Container style={{ paddingBottom: bottomSpace }}>
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
          />
        </GameContainer>
      </Container>

      {isCompleted && (
        <ColorSortingResultOverlay
          level={level}
          earnedStars={earnedStars}
          isLastLevel={level >= TOTAL_PUZZLE_LEVELS}
          gameType={gameType}
          onHome={() => navigation.navigate("Home")}
          onRestart={handleRestart}
          onNextLevel={handleNextLevel}
          onGoRoadmap={handleGoRoadmap}
        />
      )}
    </SafeAreaContainer>
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
`;
