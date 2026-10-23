// import React, { useCallback, useEffect, useRef } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styled from "styled-components/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";
// import StarRow from "../../design-system/components/StarRow";
// import { colorSortingLevels } from "../../types/Classification/Color/colorSortingLevels";
// import AppHeader from "../../components/AppHeader";
// import ColorSortingObjectBoard from "../../components/ColorSorting/ColorSortingObjectBoard";

// import ColorSortingTargetArea from "../../components/ColorSorting/ColorSortingTargetArea";

// import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
// import ClassificationTestControls from "../../components/common/ClassificationTestControls";
// import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";

// import { AppText } from "../../utils/AppText";
// import { TargetRects } from "../../components/ColorSorting/ColorSortingObjectComponent";

// import { saveLevelClear } from "../../utils/asyncStorage/progressStorage";
// import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";
// import { playEarnedNotes } from "../../utils/sound";
// import useColorSortingGame from "../../hooks/Classification/useColorSortingGame";
// import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
// import { ColorSortingProblem } from "../../types/Classification/Color/colorSotringTypes";
// import ClassificationQuestion from "../../components/common/ClassificationQuestion";

// // ============================================================
// // Types
// // ============================================================

// type RouteProps = RouteProp<RootStackParamList, "ColorSortingPlayScreen">;
// type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// export type ProblemObject = ColorSortingProblem["objects"][number];

// // ============================================================
// // Constants
// // ============================================================

// const TOTAL_ROUNDS = 10;

// // 개발용 Level / Round 컨트롤바 표시 여부 (배포 시 false)
// const SHOW_TEST_CONTROLS = true;

// // ============================================================
// // Screen
// // ============================================================

// export default function ColorSortingPlayScreen() {
//   const { playThemeBGM } = useBackgroundMusic();

//   useEffect(() => {
//     // 🎮 게임 화면에 들어올 때 게임용 BGM으로 전환!
//     playThemeBGM("game");

//     return () => {
//       // (선택) 다시 메인 화면으로 돌아갈 때 메인 BGM으로 원복하고 싶다면 cleanup에서 호출 가능
//       playThemeBGM("main");
//     };
//   }, []);
//   const navigation = useNavigation<NavigationProps>();
//   const route = useRoute<RouteProps>();
//   const { gameType, level: initialLevel = 1 } = route.params ?? {};

//   // 💡 [수정 포인트 1] footerRef 타입을 any로 열어주어 자식 컴포넌트로 전달 시 발생하는 타입 충돌 방지
//   const footerRef = useRef<any>(null);

//   const tutorialObjectRefs = useRef<Record<string, any>>({});
//   const tutorialVisibleRef = useRef(false);
//   const [tutorialVisible, setTutorialVisible] = React.useState(false);
//   const [tutorialObject, setTutorialObject] =
//     React.useState<ProblemObject | null>(null);

//   const {
//     problem,

//     testLevel,
//     roundIndex,
//     earnedStars,
//     selectedObjectId,
//     placedObjects,
//     wrongObjectIds, // 추가
//     roundResult,

//     allPlacedIds,

//     handleSelectObject,

//     handleRemoveFromTarget,

//     handleNextRound,
//     handlePreviousRound,

//     handleChangeLevel,
//     handleNextAfterResult,

//     totalLevels,
//     handleTargetPress,
//     handleDropObject,
//     handleWrongDrop,
//   } = useColorSortingGame({
//     initialLevel,
//     totalRounds: TOTAL_ROUNDS,
//   });

//   // 💡 [수정 포인트 2] basketRefs 타입을 any로 열어주어 타입 충돌 방지
//   const basketRefs = useRef<Record<string, any>>({});

//   // 💡 [수정 포인트 3] node를 안전하게 캐스팅하고 measureInWindow 안전 검사 및 인자 타입 추가
//   const getTargetRects = useCallback(
//     (callback: (rects: TargetRects) => void) => {
//       const entries = Object.entries(basketRefs.current).filter(
//         ([, node]) => node !== null && node !== undefined,
//       );

//       const rects: TargetRects = {};
//       if (entries.length === 0) return callback(rects);

//       let remaining = entries.length;
//       entries.forEach(([colorId, node]) => {
//         const targetNode = node as any;
//         if (targetNode && typeof targetNode.measureInWindow === "function") {
//           targetNode.measureInWindow(
//             (x: number, y: number, width: number, height: number) => {
//               rects[colorId] = { x, y, width, height };
//               if (--remaining === 0) callback(rects);
//             },
//           );
//         } else {
//           if (--remaining === 0) callback(rects);
//         }
//       });
//     },
//     [],
//   );

//   useEffect(() => {
//     if (!roundResult || !gameType) return;
//     saveLevelClear(gameType, testLevel, earnedStars);
//   }, [roundResult]);

//   useEffect(() => {
//     console.log("[튜토리얼 확인]", {
//       testLevel,
//       roundIndex,
//       hasProblem: !!problem,
//       objectCount: problem?.objects.length,
//     });
//     // 현재는 Level 1에서만 튜토리얼 실행
//     if (testLevel !== 1 || !problem) {
//       tutorialVisibleRef.current = false;
//       setTutorialVisible(false);
//       setTutorialObject(null);
//       return;
//     }

//     // 해당 라운드의 첫 오브젝트를 튜토리얼 대상으로 선택
//     const firstObject = problem.objects[0];

//     if (!firstObject) {
//       return;
//     }

//     // 정답 색상의 바구니가 실제로 존재하는지 확인
//     const matchingTarget = problem.targets.find(
//       (target) => target.colorId === firstObject.colorId,
//     );

//     if (!matchingTarget) {
//       return;
//     }

//     tutorialVisibleRef.current = true;
//     setTutorialObject(firstObject);
//     setTutorialVisible(true);
//   }, [testLevel, roundIndex, problem]);
//   // ==========================================================
//   // Problem 없음
//   // ==========================================================

//   if (!problem) {
//     return (
//       <SafeAreaContainer>
//         <Container>
//           <ErrorText>문제를 불러올 수 없습니다.</ErrorText>
//         </Container>
//       </SafeAreaContainer>
//     );
//   }
//   useEffect(() => {
//     if (!roundResult) return;
//     // earnedStars는 라운드당 0.5 → 별 획득한 라운드 수 = earnedStars / 0.5
//     playEarnedNotes(Math.round(earnedStars / 0.5));
//   }, [roundResult]);
//   return (
//     <SafeAreaContainer edges={["top", "bottom"]}>
//       {/* ================================================== */}
//       {/* Background */}
//       {/* ================================================== */}

//       <LinearGradient
//         colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
//         style={StyleSheet.absoluteFill}
//       />

//       <AppHeader
//         onBackPress={() => navigation.goBack()}
//         onMascotPress={() => navigation.navigate("SettingScreen")}
//         title={
//           <StarRow
//             earnedStars={earnedStars}
//             totalStars={5}
//             gameType="color"
//             size={30}
//           />
//         }
//       />

//       <Container>
//         {/* 색상 분류 화면 */}
//         <ClassificationQuestion
//           i18nKey="sort_correct_place"
//           text="알맞은 곳에 모아볼까요?"
//         />

//         <ColorSortingObjectBoard
//           objects={problem.objects}
//           selectedObjectId={selectedObjectId}
//           placedObjectIds={[...allPlacedIds, ...wrongObjectIds]} // 변경
//           onObjectPress={handleSelectObject}
//           footerRef={footerRef}
//           getTargetRects={getTargetRects}
//           onCorrectDrop={handleDropObject}
//           onWrongDrop={handleWrongDrop}
//           tutorialRef={(objectId, node) => {
//             tutorialObjectRefs.current[objectId] = node;
//           }}
//           onObjectGrab={() => {
//             tutorialVisibleRef.current = false;
//             setTutorialVisible(false);
//           }}
//         />

//         <ColorSortingTargetArea
//           targets={problem.targets}
//           objects={problem.objects}
//           placedObjects={placedObjects}
//           basketRefs={basketRefs}
//           onTargetPress={handleTargetPress}
//           onRemoveObject={handleRemoveFromTarget}
//         />
//         <View ref={footerRef} collapsable={false}>
//           <ColorSortingFooter
//             totalRounds={TOTAL_ROUNDS}
//             roundIndex={roundIndex}
//           />
//         </View>

//         {/* ================================================== */}
//         {/* 개발용 Level / Round 컨트롤 */}
//         {/* ================================================== */}
//         {SHOW_TEST_CONTROLS && (
//           <ClassificationTestControls
//             level={testLevel}
//             totalLevels={colorSortingLevels.length}
//             roundIndex={roundIndex}
//             totalRounds={TOTAL_ROUNDS}
//             onChangeLevel={handleChangeLevel}
//             onPreviousRound={handlePreviousRound}
//             onNextRound={handleNextRound}
//           />
//         )}
//       </Container>

//       {tutorialVisible && tutorialObject && (
//         <TutorialOverlay
//           visible={tutorialVisible}
//           object={tutorialObject}
//           fromRef={{
//             get current() {
//               return tutorialObjectRefs.current[tutorialObject.id] ?? null;
//             },
//           }}
//           toRef={{
//             get current() {
//               return basketRefs.current[tutorialObject.colorId] ?? null;
//             },
//           }}
//           onComplete={() => {
//             tutorialVisibleRef.current = false;
//             setTutorialVisible(false);
//           }}
//           onGrab={() => {
//             tutorialVisibleRef.current = false;
//             setTutorialVisible(false);
//           }}
//         />
//       )}

//       {/* ==================================================== */}
//       {/* Result Overlay */}
//       {/* ==================================================== */}
//       {roundResult && (
//         <ColorSortingResultOverlay
//           level={testLevel}
//           earnedStars={earnedStars}
//           isLastLevel={testLevel === colorSortingLevels.length}
//           gameType={gameType} // 👈 이 부분을 추가해주면 오버레이로 gameType이 전달됩니다!
//           onHome={() => {
//             navigation.navigate("Home");
//           }}
//           onRestart={() => {
//             handleChangeLevel(testLevel);
//           }}
//           onNextLevel={() => {
//             handleNextAfterResult();
//           }}
//           onGoRoadmap={() => {
//             navigation.navigate("StageMapScreen", {
//               gameType,
//             });
//           }}
//         />
//       )}
//     </SafeAreaContainer>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const SafeAreaContainer = styled(SafeAreaView)`
//   flex: 1;
//   background-color: #eef0fe;
// `;

// const Container = styled.View`
//   flex: 1;
//   padding-left: 16px;
//   padding-right: 16px;
//   padding-bottom: 8px;
// `;

// const ErrorText = styled(AppText)`
//   font-size: 15px;
//   font-weight: 800;

//   color: #29263d;
// `;

import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import StarRow from "../../design-system/components/StarRow";
import { colorSortingLevels } from "../../types/Classification/Color/colorSortingLevels";
import AppHeader from "../../components/AppHeader";
import ColorSortingObjectBoard from "../../components/ColorSorting/ColorSortingObjectBoard";

import ColorSortingTargetArea from "../../components/ColorSorting/ColorSortingTargetArea";

import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";

import { AppText } from "../../utils/AppText";
import { TargetRects } from "../../components/ColorSorting/ColorSortingObjectComponent";

import { saveLevelClear } from "../../utils/asyncStorage/progressStorage";
import TutorialOverlay from "../../components/Tutorial/TutorialOverlay";
import { playEarnedNotes } from "../../utils/sound";
import useColorSortingGame from "../../hooks/Classification/useColorSortingGame";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import { ColorSortingProblem } from "../../types/Classification/Color/colorSotringTypes";
import ClassificationQuestion from "../../components/common/ClassificationQuestion";

// ============================================================
// Types
// ============================================================

type RouteProps = RouteProp<RootStackParamList, "ColorSortingPlayScreen">;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type ProblemObject = ColorSortingProblem["objects"][number];

// ============================================================
// Constants
// ============================================================

const TOTAL_ROUNDS = 10;

// 개발용 Level / Round 컨트롤바 표시 여부 (배포 시 false)
const SHOW_TEST_CONTROLS = true;

// ============================================================
// Screen
// ============================================================

export default function ColorSortingPlayScreen() {
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

  // 💡 [수정 포인트 1] footerRef 타입을 any로 열어주어 자식 컴포넌트로 전달 시 발생하는 타입 충돌 방지
  const footerRef = useRef<any>(null);

  const tutorialObjectRefs = useRef<Record<string, any>>({});
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
    wrongObjectIds, // 추가
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
  } = useColorSortingGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });

  // 💡 [수정 포인트 2] basketRefs 타입을 any로 열어주어 타입 충돌 방지
  const basketRefs = useRef<Record<string, any>>({});

  // 💡 [수정 포인트 3] node를 안전하게 캐스팅하고 measureInWindow 안전 검사 및 인자 타입 추가
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

  // (hooks 순서 규칙 때문에 early return 위로 올림)
  useEffect(() => {
    if (!roundResult) return;
    // earnedStars는 라운드당 0.5 → 별 획득한 라운드 수 = earnedStars / 0.5
    playEarnedNotes(Math.round(earnedStars / 0.5));
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
      (target) => target.colorId === firstObject.colorId,
    );

    if (!matchingTarget) {
      return;
    }

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
            gameType="color"
            size={30}
          />
        }
      />

      <Container>
        {/* 색상 분류 화면 */}
        <ClassificationQuestion
          i18nKey="sort_correct_place"
          text="알맞은 곳에 모아볼까요?"
        />

        <ColorSortingObjectBoard
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

        <ColorSortingTargetArea
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
            totalLevels={colorSortingLevels.length}
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
              return basketRefs.current[tutorialObject.colorId] ?? null;
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
          isLastLevel={testLevel === colorSortingLevels.length}
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
