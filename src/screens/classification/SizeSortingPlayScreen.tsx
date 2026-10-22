import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";
import StarRow from "../../design-system/components/StarRow";
import AppHeader from "../../components/AppHeader";
import ClassificationQuestion from "../../components/common/ClassificationQuestion";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";

import { SizeSortingLevels } from "../../types/Classification/Size/sizeSortingLevels";

import { saveLevelClear } from "../../utils/asyncStorage/progressStorage";
import { AppText } from "../../utils/AppText";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import { playEarnedNotes } from "../../utils/sound";

import useSizeSortingGame from "../../hooks/Classification/useSizeSortingGeme";
import { TargetRects } from "../../components/SizeSorting/SizeSortingObjectComponent";
import SizeSortingObjectBoard from "../../components/SizeSorting/SizeSortingObjectBoard";
import SizeSortingTargetArea from "../../components/SizeSorting/SizeSortingTargetArea";

type RouteProps = RouteProp<RootStackParamList, "SizeSortingPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const TOTAL_ROUNDS = 10;
const SHOW_TEST_CONTROLS = true;

export default function SizeSortingPlayScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { playThemeBGM } = useBackgroundMusic();

  const { gameType, level: initialLevel = 1 } = route.params ?? {};

  const footerRef = useRef<View>(null);
  const basketRefs = useRef<Record<string, View | null>>({});

  const {
    problem,
    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedObjects,
    wrongObjectIds,
    roundResult,
    allPlacedIds,
    totalLevels,

    handleSelectObject,
    handleTargetPress,
    handleDropObject,
    handleWrongDrop,
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,
    handleChangeLevel,
    handleNextAfterResult,
  } = useSizeSortingGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });
  const getTargetRects = (callback: (rects: TargetRects) => void) => {
    const rects: TargetRects = {};
    const refs = basketRefs.current;

    const entries = Object.entries(refs).filter(([, node]) => node != null);

    if (entries.length === 0) {
      callback(rects);
      return;
    }

    let remaining = entries.length;

    entries.forEach(([targetId, node]) => {
      node!.measureInWindow((x, y, width, height) => {
        rects[targetId] = { x, y, width, height };
        remaining -= 1;

        if (remaining === 0) {
          callback(rects);
        }
      });
    });
  };
  useEffect(() => {
    playThemeBGM("game");

    return () => {
      playThemeBGM("main");
    };
  }, [playThemeBGM]);

  useEffect(() => {
    if (!roundResult || !gameType) return;

    saveLevelClear(gameType, testLevel, earnedStars);
  }, [roundResult, gameType, testLevel, earnedStars]);

  useEffect(() => {
    if (!roundResult) return;

    playEarnedNotes(Math.round(earnedStars / 0.5));
  }, [roundResult, earnedStars]);

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
            gameType="size"
            size={30}
          />
        }
      />

      <Container>
        <ClassificationQuestion
          i18nKey="sort_by_size"
          text="크기에 맞는 곳에 모아볼까요?"
        />
        <SizeSortingObjectBoard
          objects={problem.objects}
          selectedObjectId={selectedObjectId}
          placedObjectIds={[...allPlacedIds, ...wrongObjectIds]}
          onObjectPress={handleSelectObject}
          footerRef={footerRef}
          getTargetRects={getTargetRects}
          onCorrectDrop={handleDropObject}
          onWrongDrop={handleWrongDrop}
        />

        <SizeSortingTargetArea
          targets={problem.targets}
          objects={problem.objects}
          placedObjects={placedObjects}
          basketRefs={basketRefs}
          onTargetPress={handleTargetPress}
          onRemoveObject={handleRemoveFromTarget}
        />

        <View ref={footerRef} collapsable={false}>
          <ColorSortingFooter
            totalRounds={TOTAL_ROUNDS}
            roundIndex={roundIndex}
          />
        </View>

        {SHOW_TEST_CONTROLS && (
          <ClassificationTestControls
            level={testLevel}
            totalLevels={totalLevels}
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
          isLastLevel={testLevel === SizeSortingLevels.length}
          gameType={gameType}
          onHome={() => navigation.navigate("Home")}
          onRestart={() => handleChangeLevel(testLevel)}
          onNextLevel={handleNextAfterResult}
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
