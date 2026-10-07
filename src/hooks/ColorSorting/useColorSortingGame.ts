import { useEffect, useMemo, useState } from "react";

import { classificationItems } from "../../data/classification/classificationItems";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import { generateColorSortingProblem } from "../../generators/generateColorSortingProblem";
import { ColorSortingProblem } from "../../types/colorSotringTypes";

export type RoundResult = "correct" | "wrong" | null;

type UseColorSortingGameProps = {
  initialLevel?: number;
  totalRounds: number;
};

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

  // const handleTargetPress = (targetColorId: string) => {
  //   if (!problem) {
  //     return;
  //   }

  //   if (!selectedObjectId || roundResult) {
  //     return;
  //   }

  //   const next: Record<string, string[]> = {
  //     ...placedObjects,
  //   };

  //   // 기존 Target에서 선택된 Object 제거
  //   Object.keys(next).forEach((color) => {
  //     next[color] = next[color].filter((id) => id !== selectedObjectId);
  //   });

  //   // 새로운 Target에 Object 추가
  //   next[targetColorId] = [...(next[targetColorId] ?? []), selectedObjectId];

  //   setPlacedObjects(next);
  //   setSelectedObjectId(null);

  //   // 모든 Object가 들어갔는지 확인
  //   const nextPlacedIds = Object.values(next).flat();

  //   const allObjectsPlaced = nextPlacedIds.length === problem.objects.length;

  //   // 모든 Object가 들어갔다면 정답 판정
  //   if (allObjectsPlaced) {
  //     const isCorrect = problem.objects.every((object) => {
  //       const basket = next[object.colorId] ?? [];

  //       return basket.includes(object.id);
  //     });

  //     setTimeout(() => {
  //       setRoundResult(isCorrect ? "correct" : "wrong");
  //     }, 180);
  //   }
  // };

  // ==========================================================
  // Object를 Target에 배치 (탭 / 드래그 공통)
  // ==========================================================

  const placeObject = (objectId: string, targetColorId: string) => {
    if (!problem || roundResult) {
      return;
    }

    const next: Record<string, string[]> = {
      ...placedObjects,
    };

    // 기존 Target에서 해당 Object 제거
    Object.keys(next).forEach((color) => {
      next[color] = next[color].filter((id) => id !== objectId);
    });

    // 새로운 Target에 Object 추가
    next[targetColorId] = [...(next[targetColorId] ?? []), objectId];

    setPlacedObjects(next);
    setSelectedObjectId(null);

    // 모든 Object가 들어갔는지 확인
    const nextPlacedIds = Object.values(next).flat();
    const allObjectsPlaced = nextPlacedIds.length === problem.objects.length;

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
    setSelectedObjectId(null);
    // 나중에 여기서 오답 횟수 집계, 별 감소, 효과음 등을 처리하면 됩니다.
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
  // 이미 Target에 들어간 Object id
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
    roundResult,

    // Derived
    allPlacedIds,

    // Actions
    handleSelectObject,
    handleTargetPress,
    handleDropObject, // 추가
    handleWrongDrop, // 추가
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,

    handleChangeLevel,
    handleNextAfterResult,

    // Constants
    totalLevels: colorSortingLevels.length,
  };
}
