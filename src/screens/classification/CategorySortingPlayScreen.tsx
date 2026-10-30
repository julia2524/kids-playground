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
import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";
import { playEarnedNotes } from "../../utils/sound";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";

// Category 전용 컴포넌트 / 훅 / 타입 (아직 만들기 전 → 다음 단계에서 생성)

import useCategorySortingGame from "../../hooks/Classification/useCategorySortingGame";
import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";
import { CategorySortingLevels } from "../../types/Classification/Category/categorySortingLevels";
import { TargetRects } from "../../components/CategorySorting/CategorySortingObjectComponent";
import CategorySortingObjectBoard from "../../components/CategorySorting/CategorySortingObjectBoard";
import CategorySortingTargetArea from "../../components/CategorySorting/CategorySortingTargetArea";
import ClassificationQuestion from "../../components/common/ClassificationQuestion";

// ============================================================
// Types
// ============================================================

type RouteProps = RouteProp<RootStackParamList, "CategorySortingPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type ProblemObject = CategorySortingObject;

// ============================================================
// Constants
// ============================================================

const TOTAL_ROUNDS = 10;

// 개발용 Level / Round 컨트롤바 표시 여부 (배포 시 false)
const SHOW_TEST_CONTROLS = false;

// 튜토리얼을 보여 줄 마지막 레벨 (1 ~ 이 값까지)
const TUTORIAL_MAX_LEVEL = 3;
// ============================================================
// Screen
// ============================================================

export default function CategorySortingPlayScreen() {
  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    // 게임 화면 진입 시 게임용 BGM
    playThemeBGM("game");

    return () => {
      playThemeBGM("main");
    };
  }, []);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { gameType, level: initialLevel = 1 } = route.params ?? {};
  const footerRef = useRef<any>(null);

  // 튜토리얼
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
    handleTargetPress,
    handleDropObject,
    handleWrongDrop,
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,
    handleChangeLevel,
    handleNextAfterResult,
  } = useCategorySortingGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });

  const basketRefs = useRef<Record<string, any>>({});

  // ==========================================================
  // 바구니 위치 측정 (드래그 앤 드롭 충돌 판정용)
  // ==========================================================
  const getTargetRects = useCallback(
    (callback: (rects: TargetRects) => void) => {
      const entries = Object.entries(basketRefs.current).filter(
        ([, node]) => node !== null && node !== undefined,
      );

      const rects: TargetRects = {};
      if (entries.length === 0) return callback(rects);

      let remaining = entries.length;
      entries.forEach(([targetId, node]) => {
        const targetNode = node as any;
        if (targetNode && typeof targetNode.measureInWindow === "function") {
          targetNode.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              rects[targetId] = { x, y, width, height };
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

  // ==========================================================
  // 클리어 저장 / 효과음
  // ==========================================================
  useEffect(() => {
    if (!roundResult || !gameType) return;
    saveLevelClear(gameType, testLevel, earnedStars);
  }, [roundResult]);

  useEffect(() => {
    if (!roundResult) return;
    // earnedStars는 라운드당 0.5 → 별 획득한 라운드 수 = earnedStars / 0.5
    playEarnedNotes(Math.round(earnedStars / 0.5));
  }, [roundResult]);

  // ==========================================================
  // 튜토리얼 (Level 1 ~ TUTORIAL_MAX_LEVEL)
  // ==========================================================

  useEffect(() => {
    if (testLevel > TUTORIAL_MAX_LEVEL || !problem) {
      tutorialVisibleRef.current = false;
      setTutorialVisible(false);
      setTutorialObject(null);
      return;
    }

    // 해당 라운드의 첫 오브젝트를 튜토리얼 대상으로
    const firstObject = problem.objects[0];
    if (!firstObject) return;

    // 정답 목적지가 실제로 존재하는지 확인
    const matchingTarget = problem.targets.find(
      (target) => target.id === firstObject.targetId,
    );
    if (!matchingTarget) return;

    tutorialVisibleRef.current = true;
    setTutorialObject(firstObject);
    setTutorialVisible(true);
  }, [testLevel, roundIndex, problem]);

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
    <SafeAreaContainer edges={["top", "bottom"]}>
      {/* Background */}
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
            gameType="category"
            size={30}
          />
        }
      />

      <Container>
        {/* 카테고리 분류 게임일 때 */}
        {/* 카테고리/집 찾기 분류 화면 */}
        <ClassificationQuestion
          i18nKey="find_friends_home"
          text="친구들의 집을 찾아주세요!"
        />

        <CategorySortingObjectBoard
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

        <CategorySortingTargetArea
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

        {/* 개발용 Level / Round 컨트롤 */}
        {SHOW_TEST_CONTROLS && (
          <ClassificationTestControls
            level={testLevel}
            totalLevels={CategorySortingLevels.length}
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
              return (
                tutorialObjectRefs.current[tutorialObject.instanceId] ?? null
              );
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

      {/* Result Overlay */}
      {roundResult && (
        <ColorSortingResultOverlay
          level={testLevel}
          earnedStars={earnedStars}
          isLastLevel={testLevel === CategorySortingLevels.length}
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
    </SafeAreaContainer>
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
