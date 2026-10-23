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
import { SizeSortingObject } from "../../generators/classification/generateSizeSortingProblem";
import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";

type RouteProps = RouteProp<RootStackParamList, "SizeSortingPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type ProblemObject = SizeSortingObject;

const TOTAL_ROUNDS = 10;
const SHOW_TEST_CONTROLS = true;

export default function SizeSortingPlayScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { playThemeBGM } = useBackgroundMusic();

  const { gameType, level: initialLevel = 1 } = route.params ?? {};

  const footerRef = useRef<any>(null);
  const basketRefs = useRef<Record<string, any | null>>({});

  const tutorialObjectRefs = useRef<Record<string, View | null>>({});
  const tutorialVisibleRef = useRef(false);
  const [tutorialVisible, setTutorialVisible] = React.useState(false);
  const [tutorialObject, setTutorialObject] =
    React.useState<ProblemObject | null>(null);

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
  // const getTargetRects = (callback: (rects: TargetRects) => void) => {
  //   const rects: TargetRects = {};
  //   const refs = basketRefs.current;

  //   const entries = Object.entries(refs).filter(([, node]) => node != null);

  //   if (entries.length === 0) {
  //     callback(rects);
  //     return;
  //   }

  //   let remaining = entries.length;

  //   entries.forEach(([targetId, node]) => {
  //     node!.measureInWindow((x, y, width, height) => {
  //       rects[targetId] = { x, y, width, height };
  //       remaining -= 1;

  //       if (remaining === 0) {
  //         callback(rects);
  //       }
  //     });
  //   });
  // };
  const getTargetRects = useCallback(
    (callback: (rects: TargetRects) => void) => {
      const entries = Object.entries(basketRefs.current).filter(
        ([, node]) => node !== null && node !== undefined,
      );

      const rects: TargetRects = {};
      if (entries.length === 0) return callback(rects);

      let remaining = entries.length;
      entries.forEach(([colorId, node]) => {
        const targetNode = node as any;
        if (targetNode && typeof targetNode.measureInWindow === "function") {
          targetNode.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              rects[colorId] = { x, y, width, height };
              if (--remaining === 0) callback(rects);
            },
          );
        } else {
          if (--remaining === 0) callback(rects);
        }
      });
    },
    [],
  );
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

  useEffect(() => {
    if (!problem || testLevel !== 1) {
      tutorialVisibleRef.current = false;
      setTutorialVisible(false);
      return;
    }

    const firstObject = problem.objects[0] ?? null;
    if (!firstObject) return;

    setTutorialObject(firstObject);
    tutorialVisibleRef.current = true;
    setTutorialVisible(true);
  }, [problem, roundIndex, testLevel]);
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
          tutorialRef={(objectId, node) => {
            tutorialObjectRefs.current[objectId] = node;
          }}
          onObjectGrab={() => {
            tutorialVisibleRef.current = false;
            setTutorialVisible(false);
          }}
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
        {tutorialVisible && tutorialObject && (
          <TutorialOverlay
            key={`${testLevel}-${roundIndex}`}
            visible={tutorialVisible}
            object={tutorialObject}
            fromRef={{
              get current() {
                return tutorialObjectRefs.current[tutorialObject.id] ?? null;
              },
            }}
            toRef={{
              get current() {
                return basketRefs.current[tutorialObject.targetId] ?? null;
              },
            }}
            onComplete={() => {
              tutorialVisibleRef.current = false;
              setTutorialVisible(false);
            }}
            onGrab={() => {
              tutorialVisibleRef.current = false;
              setTutorialVisible(false);
            }}
          />
        )}
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
