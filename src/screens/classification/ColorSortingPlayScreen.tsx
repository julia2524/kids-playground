// import React, { useCallback, useRef } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styled from "styled-components/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";
// import StarRow from "../../design-system/components/StarRow";
// import { ColorSortingProblem } from "../../types/colorSotringTypes";
// import { colorSortingLevels } from "../../types/colorSortingLevels";
// import AppHeader from "../../components/AppHeader";
// import ColorSortingObjectBoard from "../../components/ColorSorting/ColorSortingObjectBoard";

// import ColorSortingTargetArea from "../../components/ColorSorting/ColorSortingTargetArea";
// import ColorSortingQuestion from "../../components/ColorSorting/ColorSortingQuestion";
// import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
// import ColorSortingTestControls from "../../components/ColorSorting/ColorSortingTestControls";
// import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";
// import useColorSortingGame from "../../hooks/ColorSorting/useColorSortingGame";
// import { AppText } from "../../utils/AppText";
// import { TargetRects } from "../../components/ColorSorting/ColorSortingObjectComponent";

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
//   const navigation = useNavigation<NavigationProps>();
//   const route = useRoute<RouteProps>();
//   const { level: initialLevel = 1 } = route.params ?? {};
//   const footerRef = useRef<View>(null);

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
//   const basketRefs = useRef<Record<string, View | null>>({});

//   const getTargetRects = useCallback(
//     (callback: (rects: TargetRects) => void) => {
//       const entries = Object.entries(basketRefs.current).filter(
//         ([, node]) => node,
//       ) as [string, View][];

//       const rects: TargetRects = {};
//       if (entries.length === 0) return callback(rects);

//       let remaining = entries.length;
//       entries.forEach(([colorId, node]) => {
//         node.measureInWindow((x, y, width, height) => {
//           rects[colorId] = { x, y, width, height };
//           if (--remaining === 0) callback(rects);
//         });
//       });
//     },
//     [],
//   );

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
//             gameType="classification"
//             size={30}
//           />
//         }
//       />

//       <Container>
//         <ColorSortingQuestion />

//         <ColorSortingObjectBoard
//           objects={problem.objects}
//           selectedObjectId={selectedObjectId}
//           placedObjectIds={[...allPlacedIds, ...wrongObjectIds]} // 변경
//           onObjectPress={handleSelectObject}
//           footerRef={footerRef}
//           getTargetRects={getTargetRects}
//           onCorrectDrop={handleDropObject}
//           onWrongDrop={handleWrongDrop}
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
//           <ColorSortingTestControls
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

//       {/* ==================================================== */}
//       {/* Result Overlay */}
//       {/* ==================================================== */}
//       {roundResult && (
//         <ColorSortingResultOverlay
//           result={roundResult}
//           roundIndex={roundIndex}
//           totalRounds={TOTAL_ROUNDS}
//           isLastLevel={testLevel === colorSortingLevels.length}
//           onNext={handleNextAfterResult}
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

import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import StarRow from "../../design-system/components/StarRow";
import { ColorSortingProblem } from "../../types/colorSotringTypes";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import AppHeader from "../../components/AppHeader";
import ColorSortingObjectBoard from "../../components/ColorSorting/ColorSortingObjectBoard";

import ColorSortingTargetArea from "../../components/ColorSorting/ColorSortingTargetArea";
import ColorSortingQuestion from "../../components/ColorSorting/ColorSortingQuestion";
import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ColorSortingTestControls from "../../components/ColorSorting/ColorSortingTestControls";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";
import useColorSortingGame from "../../hooks/ColorSorting/useColorSortingGame";
import { AppText } from "../../utils/AppText";
import { TargetRects } from "../../components/ColorSorting/ColorSortingObjectComponent";

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
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { level: initialLevel = 1 } = route.params ?? {};
  const footerRef = useRef<View>(null);

  const {
    problem,

    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedObjects,
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
  const basketRefs = useRef<Record<string, View | null>>({});

  const getTargetRects = useCallback(
    (callback: (rects: TargetRects) => void) => {
      const entries = Object.entries(basketRefs.current).filter(
        ([, node]) => node,
      ) as [string, View][];

      const rects: TargetRects = {};
      if (entries.length === 0) return callback(rects);

      let remaining = entries.length;
      entries.forEach(([colorId, node]) => {
        node.measureInWindow((x, y, width, height) => {
          rects[colorId] = { x, y, width, height };
          if (--remaining === 0) callback(rects);
        });
      });
    },
    [],
  );

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
            gameType="classification"
            size={30}
          />
        }
      />

      <Container>
        <ColorSortingQuestion />

        <ColorSortingObjectBoard
          objects={problem.objects}
          selectedObjectId={selectedObjectId}
          placedObjectIds={[...allPlacedIds, ...wrongObjectIds]} // 변경
          onObjectPress={handleSelectObject}
          footerRef={footerRef}
          getTargetRects={getTargetRects}
          onCorrectDrop={handleDropObject}
          onWrongDrop={handleWrongDrop}
        />

        <ColorSortingTargetArea
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

        {/* ================================================== */}
        {/* 개발용 Level / Round 컨트롤 */}
        {/* ================================================== */}
        {SHOW_TEST_CONTROLS && (
          <ColorSortingTestControls
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

      {/* ==================================================== */}
      {/* Result Overlay */}
      {/* ==================================================== */}
      {roundResult && (
        <ColorSortingResultOverlay
          level={testLevel}
          earnedStars={earnedStars}
          isLastLevel={testLevel === colorSortingLevels.length}
          onHome={() => {
            navigation.navigate("Home");
          }}
          onRestart={() => {
            handleChangeLevel(testLevel);
          }}
          onNextLevel={() => {
            handleNextAfterResult();
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
