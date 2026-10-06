import React, { useEffect, useMemo, useState } from "react";

import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import styled from "styled-components/native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { LinearGradient } from "expo-linear-gradient";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import { classificationItems } from "../../data/classification/classificationItems";

import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

import StarRow from "../../design-system/components/StarRow";

import { ColorSortingProblem } from "../../types/colorSotringTypes";

import { ClassificationItem } from "../../types/game";

import { colorSortingLevels } from "../../types/colorSortingLevels";

import { generateColorSortingProblem } from "../../generators/generateColorSortingProblem";

import AppHeader from "../../components/AppHeader";

// ============================================================
// Types
// ============================================================

type RouteProps = RouteProp<RootStackParamList, "ColorSortingPlayScreen">;

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type RoundResult = "correct" | "wrong" | null;

type ProblemObject = ColorSortingProblem["objects"][number];

// ============================================================
// Constants
// ============================================================

const TOTAL_ROUNDS = 10;

// 개발용 Level / Round 컨트롤바 표시 여부 (배포 시 false)
const SHOW_TEST_CONTROLS = true;

// 오브젝트 개수 → 열 개수
const getGridColumns = (count: number) => {
  if (count <= 4) return 2; // 4개  → 2행 2열
  if (count <= 6) return 3; // 6개  → 2행 3열
  if (count <= 8) return 4; // 8개  → 2행 4열
  if (count === 9) return 3; // 9개  → 3행 3열
  if (count === 10) return 5; // 10개 → 2행 5열
  return 4; // 12개 → 3행 4열
};

// 열 개수 → SVG 크기
const getObjectSize = (columns: number) => {
  if (columns <= 2) return 96;
  if (columns === 3) return 84;
  if (columns === 4) return 72;
  return 60;
};
// HEX → 밝기(0~1)
const getLuminance = (hex: string) => {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return 0;

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

// 하양처럼 너무 밝은 색은 연한 회보라로 대체 (테두리/헤더가 안 보이는 문제 방지)
const getBasketColor = (hex: string) =>
  getLuminance(hex) > 0.95 ? "#CFC9E4" : hex;

// 헤더 배경이 밝으면 어두운 글자, 어두우면 흰 글자
const getHeaderTextColor = (hex: string) =>
  getLuminance(hex) > 0.75 ? "#4B4453" : "#FFFFFF";
// ============================================================
// Screen
// ============================================================

export default function ColorSortingPlayScreen() {
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute<RouteProps>();

  const { level: initialLevel = 1 } = route.params ?? {};

  // ==========================================================
  // Game State
  // ==========================================================

  const [testLevel, setTestLevel] = useState(initialLevel);

  const [roundIndex, setRoundIndex] = useState(0);

  const [earnedStars, setEarnedStars] = useState(0);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const [placedObjects, setPlacedObjects] = useState<Record<string, string[]>>(
    {},
  );

  const [roundResult, setRoundResult] = useState<RoundResult>(null);

  // ==========================================================
  // Problem 생성
  // ==========================================================

  const problem: ColorSortingProblem | null = useMemo(() => {
    const config = colorSortingLevels.find((item) => item.level === testLevel);

    if (!config) {
      return null;
    }

    return generateColorSortingProblem(
      config,
      roundIndex + 1,
      classificationItems,
    );
  }, [testLevel, roundIndex]);

  // ==========================================================
  // Problem 변경 시 초기화
  // ==========================================================

  useEffect(() => {
    if (!problem) {
      return;
    }

    const initialPlaced: Record<string, string[]> = {};

    problem.targets.forEach((target) => {
      initialPlaced[target.colorId] = [];
    });

    setPlacedObjects(initialPlaced);
    setSelectedObjectId(null);
    setRoundResult(null);
  }, [problem]);

  // ==========================================================
  // Problem 없음
  // ==========================================================

  if (!problem) {
    return (
      <SafeAreaContainer>
        <Container>
          <QuestionText>문제를 불러올 수 없습니다.</QuestionText>
        </Container>
      </SafeAreaContainer>
    );
  }

  // ==========================================================
  // 이미 Target에 들어간 Object id
  // ==========================================================

  const allPlacedIds = Object.values(placedObjects).flat();

  // ==========================================================
  // Object Grid (행 단위로 묶기)
  // ==========================================================

  const objectColumns = getGridColumns(problem.objects.length);
  const objectSize = getObjectSize(objectColumns);

  const objectRows: (ProblemObject | null)[][] = [];

  for (let i = 0; i < problem.objects.length; i += objectColumns) {
    const row: (ProblemObject | null)[] = problem.objects.slice(
      i,
      i + objectColumns,
    );

    // 모자란 칸은 null로 채워서 정렬 유지
    while (row.length < objectColumns) {
      row.push(null);
    }

    objectRows.push(row);
  }

  // ==========================================================
  // Object 선택
  // ==========================================================

  const handleSelectObject = (objectId: string) => {
    if (roundResult) {
      return;
    }

    setSelectedObjectId((prev) => (prev === objectId ? null : objectId));
  };

  // ==========================================================
  // Target 선택
  // ==========================================================

  const handleTargetPress = (targetColorId: string) => {
    if (!selectedObjectId || roundResult) {
      return;
    }

    const next: Record<string, string[]> = { ...placedObjects };

    // 기존 Target에서 선택된 Object 제거
    Object.keys(next).forEach((color) => {
      next[color] = next[color].filter((id) => id !== selectedObjectId);
    });

    // 새로운 Target에 Object 추가
    next[targetColorId] = [...(next[targetColorId] ?? []), selectedObjectId];

    setPlacedObjects(next);
    setSelectedObjectId(null);

    // 모든 Object가 들어갔는지 확인
    const nextPlacedIds = Object.values(next).flat();
    const allObjectsPlaced = nextPlacedIds.length === problem.objects.length;

    // 모든 Object가 들어갔다면 정답 판정
    if (allObjectsPlaced) {
      const isCorrect = problem.objects.every((object) => {
        const basket = next[object.colorId] ?? [];

        return basket.includes(object.id);
      });

      setTimeout(() => {
        setRoundResult(isCorrect ? "correct" : "wrong");
      }, 180);
    }
  };

  // ==========================================================
  // Target 안의 Object 꺼내기
  // ==========================================================

  const handleRemoveFromTarget = (targetColorId: string, objectId: string) => {
    if (roundResult) {
      return;
    }

    setPlacedObjects((prev) => ({
      ...prev,

      [targetColorId]: (prev[targetColorId] ?? []).filter(
        (id) => id !== objectId,
      ),
    }));
  };

  // ==========================================================
  // 다음 라운드
  // ==========================================================

  const handleNextRound = () => {
    if (roundIndex >= TOTAL_ROUNDS - 1) {
      return;
    }

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});

    setRoundIndex((prev) => prev + 1);
  };

  // ==========================================================
  // 이전 라운드
  // ==========================================================

  const handlePreviousRound = () => {
    if (roundIndex <= 0) {
      return;
    }

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});

    setRoundIndex((prev) => prev - 1);
  };

  // ==========================================================
  // Level 변경
  // ==========================================================

  const handleChangeLevel = (nextLevel: number) => {
    if (nextLevel < 1 || nextLevel > colorSortingLevels.length) {
      return;
    }

    setTestLevel(nextLevel);

    // Level 변경 → Round 1
    setRoundIndex(0);

    setSelectedObjectId(null);
    setPlacedObjects({});
    setRoundResult(null);
    setEarnedStars(0);
  };

  // ==========================================================
  // 결과 후 다음 단계
  // ==========================================================

  const handleNextAfterResult = () => {
    // 아직 10라운드가 남아있다면 → 다음 Round
    if (roundIndex < TOTAL_ROUNDS - 1) {
      handleNextRound();
      return;
    }

    // 10라운드 끝 → 다음 Level
    if (testLevel < colorSortingLevels.length) {
      handleChangeLevel(testLevel + 1);

      return;
    }

    // 마지막 Level까지 완료
    setRoundResult(null);
  };

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
        {/* ================================================== */}
        {/* Question */}
        {/* ================================================== */}

        <QuestionCard>
          <SpeakerCircle>
            <Ionicons name="volume-medium" size={15} color="#7C5CFF" />
          </SpeakerCircle>

          <QuestionText>색깔에 맞춰 모아볼까요?</QuestionText>
        </QuestionCard>

        {/* ================================================== */}
        {/* Object Board */}
        {/* ================================================== */}

        <ObjectBoard>
          {objectRows.map((row, rowIndex) => (
            <ObjectRow key={rowIndex}>
              {row.map((object, colIndex) => {
                if (!object) {
                  return <EmptyCell key={`empty-${rowIndex}-${colIndex}`} />;
                }

                const item = classificationItems.find(
                  (i: ClassificationItem) => i.id === object.itemId,
                );

                const variant = item?.variants.find(
                  (v) => v.colorId === object.colorId,
                );

                const basicColor = COLOR_SORTING_COLORS[object.colorId];
                const isSelected = selectedObjectId === object.id;
                const isPlaced = allPlacedIds.includes(object.id);

                return (
                  <ObjectCell
                    key={object.id}
                    activeOpacity={0.8}
                    disabled={isPlaced}
                    onPress={() => handleSelectObject(object.id)}
                    style={{ opacity: isPlaced ? 0 : 1 }}
                  >
                    <ObjectBubble
                      size={objectSize + 12}
                      isSelected={isSelected}
                    >
                      <RenderColorSortingObjectSvg
                        object={object}
                        primary={variant?.primary ?? basicColor}
                        secondary={variant?.secondary}
                        accent={variant?.accent}
                        size={objectSize}
                      />
                    </ObjectBubble>
                  </ObjectCell>
                );
              })}
            </ObjectRow>
          ))}
        </ObjectBoard>

        {/* ================================================== */}
        {/* Target Area */}
        {/* ================================================== */}

        <TargetGridContainer>
          {problem.targets.map((target) => {
            const targetColorHex =
              COLOR_SORTING_COLORS[target.colorId] ?? "#7C5CFF";
            const rawColor = COLOR_SORTING_COLORS[target.colorId] ?? "#7C5CFF";
            const basketColor = getBasketColor(rawColor);
            const itemsInTarget = placedObjects[target.colorId] ?? [];
            const headerTextColor = getHeaderTextColor(basketColor);

            return (
              <TargetBasket
                key={target.id}
                targetColor={targetColorHex}
                activeOpacity={0.9}
                onPress={() => handleTargetPress(target.colorId)}
              >
                {/* Basket Header */}

                <BasketHeader style={{ backgroundColor: targetColorHex }}>
                  <BasketTitle textColor={headerTextColor}>
                    {target.label}
                  </BasketTitle>
                </BasketHeader>

                {/* Basket Body */}

                <BasketBody>
                  <DashedBox targetColor={basketColor}>
                    {itemsInTarget.length === 0 ? (
                      <PlusCircle color={basketColor}>
                        <Ionicons name="add" size={26} color="#FFFFFF" />
                      </PlusCircle>
                    ) : (
                      <BasketItemsRow>
                        {itemsInTarget.map((objectId) => {
                          const object = problem.objects.find(
                            (o) => o.id === objectId,
                          );

                          if (!object) {
                            return null;
                          }

                          const item = classificationItems.find(
                            (i) => i.id === object.itemId,
                          );

                          const variant = item?.variants.find(
                            (v) => v.colorId === object.colorId,
                          );

                          const basicColor =
                            COLOR_SORTING_COLORS[object.colorId];

                          return (
                            <PlacedItemChip
                              key={objectId}
                              onPress={() =>
                                handleRemoveFromTarget(target.colorId, objectId)
                              }
                            >
                              <RenderColorSortingObjectSvg
                                object={object}
                                primary={variant?.primary ?? basicColor}
                                secondary={variant?.secondary}
                                accent={variant?.accent}
                                size={40}
                              />
                            </PlacedItemChip>
                          );
                        })}
                      </BasketItemsRow>
                    )}
                  </DashedBox>
                </BasketBody>
              </TargetBasket>
            );
          })}
        </TargetGridContainer>

        {/* ================================================== */}
        {/* Footer */}
        {/* ================================================== */}

        <Footer>
          <DotIndicatorGroup>
            {Array.from({ length: TOTAL_ROUNDS }).map((_, index) => (
              <Dot key={index} active={index === roundIndex} />
            ))}
          </DotIndicatorGroup>

          <RoundBadge>
            <RoundBadgeText>
              {roundIndex + 1} / {TOTAL_ROUNDS}
            </RoundBadgeText>
          </RoundBadge>
        </Footer>

        {/* ================================================== */}
        {/* 개발용 Level / Round 컨트롤 */}
        {/* ================================================== */}

        {SHOW_TEST_CONTROLS && (
          <TestControlBar>
            {/* Level */}

            <TestGroup>
              <TestLabel>LEVEL</TestLabel>

              <TestArrowButton
                disabled={testLevel === 1}
                onPress={() => handleChangeLevel(testLevel - 1)}
              >
                <Ionicons
                  name="chevron-back"
                  size={16}
                  color={testLevel === 1 ? "#C9C4D9" : "#6657B8"}
                />
              </TestArrowButton>

              <TestValue>{testLevel}</TestValue>

              <TestArrowButton
                disabled={testLevel === colorSortingLevels.length}
                onPress={() => handleChangeLevel(testLevel + 1)}
              >
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={
                    testLevel === colorSortingLevels.length
                      ? "#C9C4D9"
                      : "#6657B8"
                  }
                />
              </TestArrowButton>
            </TestGroup>

            {/* Round */}

            <TestGroup>
              <TestLabel>ROUND</TestLabel>

              <TestSmallButton
                disabled={roundIndex === 0}
                onPress={handlePreviousRound}
              >
                <Text>이전</Text>
              </TestSmallButton>

              <TestValue>
                {roundIndex + 1}/{TOTAL_ROUNDS}
              </TestValue>

              <TestSmallButton
                disabled={roundIndex === TOTAL_ROUNDS - 1}
                onPress={handleNextRound}
              >
                <Text>다음</Text>
              </TestSmallButton>
            </TestGroup>
          </TestControlBar>
        )}
      </Container>

      {/* ==================================================== */}
      {/* Result Overlay */}
      {/* ==================================================== */}

      {roundResult && (
        <ResultOverlay>
          <ResultCard>
            {roundResult === "correct" ? (
              <>
                <ResultEmoji>🎉</ResultEmoji>

                <ResultTitle>정말 잘했어요!</ResultTitle>

                <ResultDescription>
                  모든 물건을
                  <ResultStrong> 알맞은 색깔</ResultStrong>에 넣었어요!
                </ResultDescription>
              </>
            ) : (
              <>
                <ResultEmoji>🌱</ResultEmoji>

                <ResultTitle>한 번 더 해볼까요?</ResultTitle>

                <ResultDescription>
                  색깔을 다시 살펴보고 넣어볼까요?
                </ResultDescription>
              </>
            )}

            <ResultButton onPress={handleNextAfterResult} activeOpacity={0.85}>
              <ResultButtonText>
                {roundIndex === TOTAL_ROUNDS - 1
                  ? testLevel < colorSortingLevels.length
                    ? "다음 Level"
                    : "완료"
                  : "다음 라운드"}
              </ResultButtonText>

              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </ResultButton>
          </ResultCard>
        </ResultOverlay>
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

  padding-horizontal: 16px;
  padding-bottom: 8px;
`;

// ============================================================
// Question
// ============================================================

const QuestionCard = styled.View`
  align-self: center;

  flex-direction: row;
  align-items: center;

  min-height: 48px;

  padding-horizontal: 14px;
  padding-vertical: 8px;

  background-color: rgba(255, 255, 255, 0.95);

  border-radius: 24px;

  elevation: 2;

  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 5px;
`;

const SpeakerCircle = styled.View`
  width: 30px;
  height: 30px;

  border-radius: 15px;

  margin-right: 8px;

  background-color: #ede9fe;

  align-items: center;
  justify-content: center;
`;

const QuestionText = styled.Text`
  font-size: 15px;
  font-weight: 800;

  color: #29263d;
`;

// ============================================================
// Object Board
// ============================================================

const ObjectBoard = styled.View`
  flex: 1;

  margin-top: 12px;
  margin-bottom: 14px;

  padding: 12px 8px;

  background-color: rgba(255, 255, 255, 0.85);

  border-radius: 26px;

  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.95);

  justify-content: space-evenly;
`;

const ObjectRow = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-around;
`;

const ObjectCell = styled.TouchableOpacity`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

const EmptyCell = styled.View`
  flex: 1;
`;

const ObjectBubble = styled.View<{
  size: number;
  isSelected?: boolean;
}>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  align-items: center;
  justify-content: center;

  border-radius: ${(p) => p.size / 2}px;

  border-width: 3px;
  border-color: ${(p) => (p.isSelected ? "#7c5cff" : "transparent")};

  background-color: ${(p) =>
    p.isSelected ? "rgba(124, 92, 255, 0.08)" : "transparent"};

  transform: ${(p) => (p.isSelected ? "scale(1.06)" : "scale(1)")};
`;

// ============================================================
// Target
// ============================================================

const TargetGridContainer = styled.View`
  flex-direction: row;

  align-items: stretch;
  justify-content: center;

  gap: 8px;

  height: 170px;

  margin-bottom: 10px;
`;

const TargetBasket = styled.TouchableOpacity<{
  targetColor: string;
}>`
  flex: 1;

  background-color: #ffffff;

  border-radius: 22px;

  border-width: 3px;
  border-color: ${(p) => p.targetColor};

  overflow: hidden;

  elevation: 3;

  shadow-color: #6f63a8;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

const BasketHeader = styled.View`
  height: 34px;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 6px;

  padding-horizontal: 6px;
`;

const BasketDot = styled.View`
  width: 9px;
  height: 9px;

  border-radius: 5px;

  background-color: #ffffff;
`;

const BasketTitle = styled.Text<{
  textColor: string;
}>`
  font-size: 13px;
  font-weight: 900;

  color: ${(p) => p.textColor};
`;

const BasketBody = styled.View`
  flex: 1;

  padding: 8px;
`;

// ※ targetColor + "66" / "12" 는 #RRGGBB 형식의 HEX 색상일 때만 투명도로 동작해요.
const DashedBox = styled.View<{
  targetColor: string;
}>`
  flex: 1;

  align-items: center;
  justify-content: center;

  border-radius: 14px;

  border-width: 1.5px;
  border-style: dashed;
  border-color: ${(p) => p.targetColor}66;

  background-color: ${(p) => p.targetColor}12;
`;

const PlusCircle = styled.View<{
  color: string;
}>`
  width: 38px;
  height: 38px;

  border-radius: 19px;

  background-color: ${(p) => p.color};

  align-items: center;
  justify-content: center;

  opacity: 0.35;
`;

const BasketItemsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  gap: 2px;
`;

const PlacedItemChip = styled.TouchableOpacity`
  width: 44px;
  height: 44px;

  align-items: center;
  justify-content: center;
`;

// ============================================================
// Footer
// ============================================================

const Footer = styled.View`
  position: relative;

  height: 40px;

  flex-direction: row;

  align-items: center;
  justify-content: flex-end;

  margin-bottom: 4px;
`;

const DotIndicatorGroup = styled.View`
  position: absolute;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 4px;

  pointer-events: none;
`;

const Dot = styled.View<{
  active?: boolean;
}>`
  width: ${(props) => (props.active ? "18px" : "7px")};

  height: 7px;

  border-radius: 4px;

  background-color: ${(props) => (props.active ? "#7C5CFF" : "#C9C4DF")};
`;

const RoundBadge = styled.View`
  min-width: 50px;

  padding-horizontal: 10px;
  padding-vertical: 5px;

  border-radius: 14px;

  background-color: #ffffff;

  align-items: center;
  justify-content: center;
`;

const RoundBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 800;

  color: #64748b;
`;

// ============================================================
// Development Test Controls
// ============================================================

const TestControlBar = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 14px;

  padding: 5px 8px;

  margin-bottom: 2px;

  border-radius: 15px;

  background-color: rgba(255, 255, 255, 0.5);
`;

const TestGroup = styled.View`
  flex-direction: row;

  align-items: center;

  gap: 5px;
`;

const TestLabel = styled.Text`
  font-size: 8px;
  font-weight: 900;

  color: #aaa3c2;
`;

const TestArrowButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;

  border-radius: 13px;

  background-color: #ffffff;

  align-items: center;
  justify-content: center;
`;

const TestSmallButton = styled.TouchableOpacity`
  min-width: 38px;
  height: 25px;

  padding-horizontal: 7px;

  border-radius: 13px;

  background-color: #ffffff;

  align-items: center;
  justify-content: center;
`;

const TestValue = styled.Text`
  min-width: 30px;

  text-align: center;

  font-size: 10px;
  font-weight: 900;

  color: #6657b8;
`;

// ============================================================
// Result Overlay
// ============================================================

const ResultOverlay = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(83, 71, 135, 0.28);

  align-items: center;
  justify-content: center;

  padding: 28px;
`;

const ResultCard = styled.View`
  width: 100%;

  max-width: 340px;

  padding: 28px 24px 22px;

  border-radius: 30px;

  background-color: #ffffff;

  align-items: center;

  elevation: 8;

  shadow-color: #5d5193;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.18;
  shadow-radius: 14px;
`;

const ResultEmoji = styled.Text`
  font-size: 48px;

  margin-bottom: 8px;
`;

const ResultTitle = styled.Text`
  font-size: 22px;
  font-weight: 900;

  color: #332c58;

  text-align: center;
`;

const ResultDescription = styled.Text`
  margin-top: 8px;

  font-size: 14px;
  font-weight: 600;

  color: #817a9e;

  text-align: center;

  line-height: 21px;
`;

const ResultStrong = styled.Text`
  font-weight: 900;

  color: #6657b8;
`;

const ResultButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;

  margin-top: 22px;

  border-radius: 26px;

  background-color: #7c5cff;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 8px;

  elevation: 3;

  shadow-color: #7c5cff;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

const ResultButtonText = styled.Text`
  font-size: 16px;
  font-weight: 900;

  color: #ffffff;
`;
