import { useEffect, useMemo, useState } from "react";

import { classificationItems } from "../../data/classification/classificationItems";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import { generateColorSortingProblem } from "../../generators/generateColorSortingProblem";
import { ColorSortingProblem } from "../../types/colorSotringTypes";
import { unlockStickers } from "../../utils/stickerStorage";

export type RoundResult = "correct" | "wrong" | null;

type UseColorSortingGameProps = {
  initialLevel?: number;
  totalRounds: number;
};

const STAR_PER_ROUND = 0.5; // 10라운드 × 0.5 = 별 5개
const MAX_MISTAKES = 2; // 오답 드롭은 2번까지 허용
const AUTO_NEXT_DELAY = 400; // 라운드 완료 후 다음 라운드까지 대기(ms)
const STICKER_START_LEVEL = 5; // 레벨 1~4는 기본도형이라 스티커 없음
// 문제 object → 스티커 id (classificationItems의 id와 같아야 함)
const getStickerId = (object: { id: string; itemId?: string }) =>
  object.itemId ?? object.id;
export default function useColorSortingGame({
  initialLevel = 1,
  totalRounds,
}: UseColorSortingGameProps) {
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

  // 드래그로 오답 바구니에 놓아서 사라진 Object id
  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);

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
    setWrongObjectIds([]);
    setSelectedObjectId(null);
    setRoundResult(null);
  }, [problem]);

  // ==========================================================
  // 라운드 종료 판정
  // (바구니에 들어간 개수 + 오답으로 사라진 개수 === 전체 개수)
  // ==========================================================

  useEffect(() => {
    if (!problem || roundResult) return;

    const objectIds = new Set(problem.objects.map((o) => o.id));
    const placedIds = Object.values(placedObjects)
      .flat()
      .filter((id) => objectIds.has(id));
    const wrongIds = wrongObjectIds.filter((id) => objectIds.has(id));

    if (placedIds.length + wrongIds.length !== problem.objects.length) return;

    // 맞는 바구니에 들어간 object만 추림 (스티커 해금 + 별 판정에 공통 사용)
    const correctObjects = problem.objects.filter((object) =>
      (placedObjects[object.colorId] ?? []).includes(object.id),
    );

    const allPlacedCorrect = problem.objects.every((object) => {
      const inAnyBasket = Object.values(placedObjects)
        .flat()
        .includes(object.id);
      if (!inAnyBasket) return true;
      return (placedObjects[object.colorId] ?? []).includes(object.id);
    });
    const earnedStar = wrongIds.length <= MAX_MISTAKES && allPlacedCorrect;

    const isLastRound = roundIndex >= totalRounds - 1;

    const timer = setTimeout(
      () => {
        if (earnedStar) {
          setEarnedStars((prev) => prev + STAR_PER_ROUND);
        }

        // ✅ 정답 맞춘 스티커만 해금 (레벨 5부터)
        if (testLevel >= STICKER_START_LEVEL && correctObjects.length > 0) {
          unlockStickers(correctObjects.map(getStickerId));
        }

        if (isLastRound) {
          setRoundResult("correct");
          return;
        }

        setSelectedObjectId(null);
        setPlacedObjects({});
        setWrongObjectIds([]);
        setRoundIndex((prev) => prev + 1);
      },
      isLastRound ? 180 : AUTO_NEXT_DELAY,
    );

    return () => clearTimeout(timer);
  }, [
    problem,
    placedObjects,
    wrongObjectIds,
    roundResult,
    roundIndex,
    totalRounds,
    testLevel,
  ]);
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
  // Object를 Target에 배치 (탭 / 드래그 공통)
  // ==========================================================

  const placeObject = (objectId: string, targetColorId: string) => {
    if (!problem || roundResult) {
      return;
    }

    setPlacedObjects((prev) => {
      const next: Record<string, string[]> = { ...prev };

      // 기존 Target에서 해당 Object 제거
      Object.keys(next).forEach((color) => {
        next[color] = next[color].filter((id) => id !== objectId);
      });

      // 새로운 Target에 Object 추가
      next[targetColorId] = [...(next[targetColorId] ?? []), objectId];

      return next;
    });

    setSelectedObjectId(null);
  };

  // ==========================================================
  // Target 선택 (탭 방식)
  // ==========================================================

  const handleTargetPress = (targetColorId: string) => {
    if (!selectedObjectId) {
      return;
    }

    placeObject(selectedObjectId, targetColorId);
  };

  // ==========================================================
  // 드래그 앤 드롭: 정답 바구니에 놓았을 때
  // ==========================================================

  const handleDropObject = (objectId: string, targetColorId: string) => {
    placeObject(objectId, targetColorId);
  };

  // ==========================================================
  // 드래그 앤 드롭: 오답 바구니에 놓았을 때
  // ==========================================================

  const handleWrongDrop = (objectId: string) => {
    if (roundResult) {
      return;
    }

    setWrongObjectIds((prev) =>
      prev.includes(objectId) ? prev : [...prev, objectId],
    );

    setSelectedObjectId(null);
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
  // 다음 Round
  // ==========================================================

  const handleNextRound = () => {
    if (roundIndex >= totalRounds - 1) {
      return;
    }

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setWrongObjectIds([]);

    setRoundIndex((prev) => prev + 1);
  };

  // ==========================================================
  // 이전 Round
  // ==========================================================

  const handlePreviousRound = () => {
    if (roundIndex <= 0) {
      return;
    }

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setWrongObjectIds([]);

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
    setWrongObjectIds([]);
    setRoundResult(null);
    setEarnedStars(0);
  };

  // ==========================================================
  // 결과 후 다음 단계
  // ==========================================================

  const handleNextAfterResult = () => {
    // 아직 Round가 남아있다면 → 다음 Round
    if (roundIndex < totalRounds - 1) {
      handleNextRound();
      return;
    }

    // 모든 Round 완료 → 다음 Level
    if (testLevel < colorSortingLevels.length) {
      handleChangeLevel(testLevel + 1);
      return;
    }

    // 마지막 Level까지 완료
    setRoundResult(null);
  };

  // ==========================================================
  // 이미 처리된 Object id (바구니에 들어감)
  // ==========================================================

  const allPlacedIds = Object.values(placedObjects).flat();

  // ==========================================================
  // Return
  // ==========================================================

  return {
    // Problem
    problem,

    // State
    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedObjects,
    wrongObjectIds,
    roundResult,

    // Derived
    allPlacedIds,

    // Actions
    handleSelectObject,
    handleTargetPress,
    handleDropObject,
    handleWrongDrop,
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,

    handleChangeLevel,
    handleNextAfterResult,

    // Constants
    totalLevels: colorSortingLevels.length,
  };
}
