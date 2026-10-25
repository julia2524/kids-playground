// screens/Pattern/PatternPlayScreen.tsx
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import StarRow from "../../design-system/components/StarRow";
import AppHeader from "../../components/AppHeader";

import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";

import { AppText } from "../../utils/AppText";
import { saveLevelClear } from "../../utils/asyncStorage/progressStorage";
import { playEarnedNotes } from "../../utils/sound";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";

import { PATTERN_LEVELS } from "../../types/Pattern/patternLevels";
import ClassificationQuestion from "../../components/common/ClassificationQuestion";

import usePatternGame from "../../hooks/usePatternGame";
import PatternTargetArea from "../../components/Pattern/PatternTargetArea";
import PatternObjectBoard from "../../components/Pattern/PatternObjectBoard";

type RouteProps = RouteProp<RootStackParamList, "PatternPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const TOTAL_ROUNDS = 10;
const SHOW_TEST_CONTROLS = false;

export default function PatternPlayScreen() {
  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    playThemeBGM("game");
    return () => {
      playThemeBGM("main");
    };
  }, []);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { gameType, level: initialLevel = 1 } = route.params ?? {};
  const footerRef = useRef<any>(null);

  const {
    problem,
    problemKey,
    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedElement,
    wrongObjectIds,
    roundResult,
    handleSelectObject,
    handleDropObject,
    handleWrongDrop,
    handleNextRound,
    handlePreviousRound,
    handleChangeLevel,
    handleNextAfterResult,
  } = usePatternGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });

  // 타겟(빈칸) 위치 측정용 ref
  const blankSlotRef = useRef<View | null>(null);
  const getTargetRects = useCallback((callback: (rects: any) => void) => {
    if (!blankSlotRef.current) {
      callback({});
      return;
    }
    (blankSlotRef.current as any).measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        callback({ blank: { x, y, width, height } });
      },
    );
  }, []);

  // 클리어 저장 / 효과음
  useEffect(() => {
    if (!roundResult || !gameType) return;
    saveLevelClear(gameType, testLevel, earnedStars);
  }, [roundResult]);

  useEffect(() => {
    if (!roundResult) return;
    playEarnedNotes(Math.round(earnedStars / 0.5));
  }, [roundResult]);

  if (!problem) {
    return (
      <SafeAreaContainer>
        <Container>
          <ErrorText>문제를 불러올 수 없습니다.</ErrorText>
        </Container>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer edges={["top", "bottom"]}>
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
            gameType="pattern"
            size={30}
          />
        }
      />

      <Container>
        <ClassificationQuestion
          i18nKey="find_next_in_pattern"
          text="다음에는 무엇이 올까?"
        />

        {/* 가운데: 패턴 시퀀스 + 빈칸 (문제가 바뀌면 새로 마운트) */}
        <PatternTargetArea
          key={problemKey}
          sequence={problem.sequence}
          blankIndex={problem.blankIndex}
          placedElement={placedElement}
          blankSlotRef={blankSlotRef}
        />

        {/* 아래: 드래그할 선택지들 */}
        <PatternObjectBoard
          roundKey={problemKey}
          choices={problem.choices}
          answer={problem.answer}
          selectedObjectId={selectedObjectId}
          wrongObjectIds={wrongObjectIds}
          onObjectPress={handleSelectObject}
          footerRef={footerRef}
          getTargetRects={getTargetRects}
          onCorrectDrop={handleDropObject}
          onWrongDrop={handleWrongDrop}
        />

        <FooterWrapper ref={footerRef} collapsable={false}>
          <ColorSortingFooter
            totalRounds={TOTAL_ROUNDS}
            roundIndex={roundIndex}
          />
        </FooterWrapper>

        {SHOW_TEST_CONTROLS && (
          <ClassificationTestControls
            level={testLevel}
            totalLevels={PATTERN_LEVELS.length}
            roundIndex={roundIndex}
            totalRounds={TOTAL_ROUNDS}
            onChangeLevel={handleChangeLevel}
            onPreviousRound={handlePreviousRound}
            onNextRound={handleNextRound}
          />
        )}
      </Container>

      {roundResult && (
        <ColorSortingResultOverlay
          level={testLevel}
          earnedStars={earnedStars}
          isLastLevel={testLevel === PATTERN_LEVELS.length}
          gameType={gameType}
          onHome={() => navigation.navigate("Home")}
          onRestart={() => handleChangeLevel(testLevel)}
          onNextLevel={() => handleNextAfterResult()}
          onGoRoadmap={() =>
            navigation.navigate("StageMapScreen", { gameType })
          }
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
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`;

const ErrorText = styled(AppText)`
  font-size: 15px;
  font-weight: 800;
  color: #29263d;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 44px;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;
