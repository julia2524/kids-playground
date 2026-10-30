import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
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

import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";

import { AppText } from "../../utils/AppText";
import { TargetRects } from "../../components/ColorSorting/ColorSortingObjectComponent";

import { saveLevelClear } from "../../utils/asyncStorage/progressStorage";
import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";
import { playEarnedNotes } from "../../utils/sound";
import ShapeSortingTargetArea from "../../components/ShapeSorting/ShapeSortingTargetArea";
import useShapeSortingGame from "../../hooks/Classification/useShapeSortingGame";
import ShapeSortingObjectBoard from "../../components/ShapeSorting/ShapeSortingObjectBoard";
import { ShapeSortingObject } from "../../generators/classification/generateShapeSortingProblem";
import { ShapeSortingLevels } from "../../types/Classification/Shape/shapeSortingLevels";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import ClassificationQuestion from "../../components/common/ClassificationQuestion";

// ============================================================
// Types
// ============================================================

type RouteProps = RouteProp<RootStackParamList, "ColorSortingPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type ProblemObject = ShapeSortingObject;

// ============================================================
// Constants
// ============================================================

const TOTAL_ROUNDS = 10;

// 개발용 Level / Round 컨트롤바 표시 여부 (배포 시 false)
const SHOW_TEST_CONTROLS = false;

// ============================================================
// Screen
// ============================================================

export default function ShapeSortingPlayScreen() {
  const insets = useSafeAreaInsets();

  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    // 🎮 게임 화면에 들어올 때 게임용 BGM으로 전환!
    playThemeBGM("game");

    return () => {
      // (선택) 다시 메인 화면으로 돌아갈 때 메인 BGM으로 원복하고 싶다면 cleanup에서 호출 가능
      playThemeBGM("main");
    };
  }, []);
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { gameType, level: initialLevel = 1 } = route.params ?? {};
  const footerRef = useRef<any>(null);

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
    stickerPlacements, // 추가
    wrongObjectIds,
    roundResult,

    allPlacedIds,

    handleSelectObject,

    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,

    handleChangeLevel,
    handleNextAfterResult,

    totalLevels,
    handleTargetPress,
    handleDropObject,
    handleWrongDrop,
  } = useShapeSortingGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });
  const basketRefs = useRef<Record<string, any>>({});

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
    if (!roundResult || !gameType) return;
    saveLevelClear(gameType, testLevel, earnedStars);
  }, [roundResult]);

  useEffect(() => {
    console.log("[튜토리얼 확인]", {
      testLevel,
      roundIndex,
      hasProblem: !!problem,
      objectCount: problem?.objects.length,
    });
    // 현재는 Level 1에서만 튜토리얼 실행
    if (testLevel !== 1 || !problem) {
      tutorialVisibleRef.current = false;
      setTutorialVisible(false);
      setTutorialObject(null);
      return;
    }

    // 해당 라운드의 첫 오브젝트를 튜토리얼 대상으로 선택
    const firstObject = problem.objects[0];

    if (!firstObject) {
      return;
    }

    // 정답 색상의 바구니가 실제로 존재하는지 확인
    const matchingTarget = problem.targets.find(
      (target) => target.id === firstObject.targetId,
    );

    if (!matchingTarget) {
      return;
    }

    tutorialVisibleRef.current = true;
    setTutorialObject(firstObject);
    setTutorialVisible(true);
  }, [testLevel, roundIndex, problem]);
  useEffect(() => {
    if (!roundResult) return;
    // earnedStars는 라운드당 0.5 → 별 획득한 라운드 수 = earnedStars / 0.5
    playEarnedNotes(Math.round(earnedStars / 0.5));
  }, [roundResult]);
  // ==========================================================
  // Problem 없음
  // ==========================================================

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
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#eef0fe",
      }}
    >
      {/* ================================================== */}
      {/* Background */}
      {/* ================================================== */}

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
            gameType="shape"
            size={30}
          />
        }
      />

      <Container>
        {/* 형태나 속성 분류 게임일 때 */}
        {/* 모양 분류 화면 */}
        <ClassificationQuestion
          i18nKey="sort_by_shape"
          text="모양에 맞춰 모아볼까요?"
        />

        <ShapeSortingObjectBoard
          objects={problem.objects}
          selectedObjectId={selectedObjectId}
          placedObjectIds={[...allPlacedIds, ...wrongObjectIds]} // 변경
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

        <ShapeSortingTargetArea
          targets={problem.targets}
          objects={problem.objects}
          placedObjects={placedObjects}
          stickerPlacements={stickerPlacements}
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

        {/* ================================================== */}
        {/* 개발용 Level / Round 컨트롤 */}
        {/* ================================================== */}
        {SHOW_TEST_CONTROLS && (
          <ClassificationTestControls
            level={testLevel}
            totalLevels={ShapeSortingLevels.length}
            roundIndex={roundIndex}
            totalRounds={TOTAL_ROUNDS}
            onChangeLevel={handleChangeLevel}
            onPreviousRound={handlePreviousRound}
            onNextRound={handleNextRound}
          />
        )}
      </Container>

      {tutorialVisible && tutorialObject && (
        <TutorialOverlay
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

      {/* ==================================================== */}
      {/* Result Overlay */}
      {/* ==================================================== */}
      {roundResult && (
        <ColorSortingResultOverlay
          level={testLevel}
          earnedStars={earnedStars}
          isLastLevel={testLevel === ShapeSortingLevels.length}
          gameType={gameType} // 👈 이 부분을 추가해주면 오버레이로 gameType이 전달됩니다!
          onHome={() => {
            navigation.navigate("Home");
          }}
          onRestart={() => {
            handleChangeLevel(testLevel);
          }}
          onNextLevel={() => {
            handleNextAfterResult();
          }}
          onGoRoadmap={() => {
            navigation.navigate("StageMapScreen", {
              gameType,
            });
          }}
        />
      )}
    </View>
  );
}

// ============================================================
// Styled Components
// ============================================================

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
