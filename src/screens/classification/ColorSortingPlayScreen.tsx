import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { classificationItems } from "../../data/classification/classificationItems";
import StarRow from "../../design-system/components/StarRow";
import { ColorSortingProblem } from "../../types/colorSotringTypes";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import { generateColorSortingProblem } from "../../generators/generateColorSortingProblem";
import AppHeader from "../../components/AppHeader";
import ColorSortingObjectBoard from "../../components/ColorSorting/ColorSortingObjectBoard";

import ColorSortingTargetArea from "../../components/ColorSorting/ColorSortingTargetArea";
import ColorSortingQuestion from "../../components/ColorSorting/ColorSortingQuestion";
import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ColorSortingTestControls from "../../components/ColorSorting/ColorSortingTestControls";
import ColorSortingResultOverlay from "../../components/ColorSorting/ColorSortingResultOverlay";
import useColorSortingGame from "../../hooks/ColorSorting/useColorSortingGame";
import { AppText } from "../../utils/AppText";

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
const SHOW_TEST_CONTROLS = false;

// ============================================================
// Screen
// ============================================================

export default function ColorSortingPlayScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { level: initialLevel = 1 } = route.params ?? {};

  const {
    problem,

    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedObjects,
    roundResult,

    allPlacedIds,

    handleSelectObject,
    handleTargetPress,
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,

    handleChangeLevel,
    handleNextAfterResult,

    totalLevels,
  } = useColorSortingGame({
    initialLevel,
    totalRounds: TOTAL_ROUNDS,
  });

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
          placedObjectIds={allPlacedIds}
          onObjectPress={handleSelectObject}
        />

        <ColorSortingTargetArea
          targets={problem.targets}
          objects={problem.objects}
          placedObjects={placedObjects}
          onTargetPress={handleTargetPress}
          onRemoveObject={handleRemoveFromTarget}
        />

        <ColorSortingFooter
          totalRounds={TOTAL_ROUNDS}
          roundIndex={roundIndex}
        />

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
          result={roundResult}
          roundIndex={roundIndex}
          totalRounds={TOTAL_ROUNDS}
          isLastLevel={testLevel === colorSortingLevels.length}
          onNext={handleNextAfterResult}
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
