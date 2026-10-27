import { useEffect, useMemo, useRef, useState } from "react";

import { unlockStickers } from "../../utils/asyncStorage/stickerStorage";
import { playStreakNote } from "../../utils/sound";
import {
  generateCategorySortingProblem,
  CategorySortingProblem,
} from "../../generators/classification/generateCategorySortingProblem";
import { CategorySortingLevels } from "../../types/Classification/Category/categorySortingLevels";
import type { StickerPlacement } from "../../components/CategorySorting/CategorySortingObjectComponent";

export type CategoryRoundResult = "correct" | "wrong" | null;

type UseCategorySortingGameProps = {
  initialLevel?: number;
  totalRounds: number;
};

const STAR_PER_ROUND = 0.5;
const MAX_MISTAKES = 2;
const AUTO_NEXT_DELAY = 400;
const LAST_ROUND_DELAY = 180;

// 이 레벨부터 정답으로 배치한 사물의 스티커를 해금
// TODO: 실제 해금 시작 레벨에 맞게 조정
const STICKER_START_LEVEL = 1;

export default function useCategorySortingGame({
  initialLevel = 1,
  totalRounds,
}: UseCategorySortingGameProps) {
  // ==========================================================
  // Game State
  // ==========================================================

  const starRoundCountRef = useRef(0);

  const [testLevel, setTestLevel] = useState(initialLevel);
  const [roundIndex, setRoundIndex] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  // target.id를 키로, 값은 object.instanceId 배열
  const [placedObjects, setPlacedObjects] = useState<Record<string, string[]>>(
    {},
  );

  // 드래그로 정답 처리된 오브젝트가 바구니 안에서 붙을 위치 (instanceId 키)
  // 없으면(탭 방식 배치) 바구니의 기본 자동 배치를 사용
  const [stickerPlacements, setStickerPlacements] = useState<
    Record<string, StickerPlacement>
  >({});

  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<CategoryRoundResult>(null);

  // 같은 level/round에서도 문제를 새로 뽑고 싶을 때(재시작 등) 올리는 값
  const [problemSeed, setProblemSeed] = useState(0);

  // ==========================================================
  // Problem 생성
  // generator는 데이터가 부족하면 throw 하므로 null로 처리
  // ==========================================================

  const problem: CategorySortingProblem | null = useMemo(() => {
    try {
      return generateCategorySortingProblem(testLevel);
    } catch (error) {
      console.warn("[CategorySorting] 문제 생성 실패", error);
      return null;
    }
  }, [testLevel, roundIndex, problemSeed]);

  // ==========================================================
  // Problem 변경 시 초기화
  // ==========================================================

  useEffect(() => {
    if (!problem) return;

    const initialPlaced: Record<string, string[]> = {};

    problem.targets.forEach((target) => {
      initialPlaced[target.id] = [];
    });

    setPlacedObjects(initialPlaced);
    setStickerPlacements({});
    setWrongObjectIds([]);
    setSelectedObjectId(null);
    setRoundResult(null);
  }, [problem]);

  // ==========================================================
  // 라운드 종료 판정
  // ==========================================================

  useEffect(() => {
    if (!problem || roundResult) return;

    const objectIds = new Set(problem.objects.map((o) => o.instanceId));

    const placedIds = Object.values(placedObjects)
      .flat()
      .filter((id) => objectIds.has(id));

    const wrongIds = wrongObjectIds.filter((id) => objectIds.has(id));

    // 모든 오브젝트가 배치되거나 오답으로 처리되어야 종료
    if (placedIds.length + wrongIds.length !== problem.objects.length) {
      return;
    }

    // 정답 target에 들어간 오브젝트 (정답 target = object.targetId)
    const correctObjects = problem.objects.filter((object) =>
      (placedObjects[object.targetId] ?? []).includes(object.instanceId),
    );

    // 바구니에 배치한 모든 오브젝트가 정답 위치에 있는지
    const allPlacedCorrect = placedIds.every((instanceId) => {
      const object = problem.objects.find((o) => o.instanceId === instanceId);
      return object
        ? (placedObjects[object.targetId] ?? []).includes(instanceId)
        : false;
    });

    const earnedStar = wrongIds.length <= MAX_MISTAKES && allPlacedCorrect;
    const isLastRound = roundIndex >= totalRounds - 1;

    const timer = setTimeout(
      () => {
        if (earnedStar) {
          setEarnedStars((prev) => prev + STAR_PER_ROUND);
          starRoundCountRef.current += 1;

          if (!isLastRound) {
            playStreakNote(starRoundCountRef.current);
          }
        }

        // 정답으로 배치한 사물의 스티커 해금 (같은 사물 중복 제거)
        if (testLevel >= STICKER_START_LEVEL && correctObjects.length > 0) {
          unlockStickers([...new Set(correctObjects.map((o) => o.itemId))]);
        }

        if (isLastRound) {
          setRoundResult("correct");
          return;
        }

        setSelectedObjectId(null);
        setPlacedObjects({});
        setStickerPlacements({});
        setWrongObjectIds([]);
        setRoundIndex((prev) => prev + 1);
      },
      isLastRound ? LAST_ROUND_DELAY : AUTO_NEXT_DELAY,
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
    if (roundResult) return;

    setSelectedObjectId((prev) => (prev === objectId ? null : objectId));
  };

  // ==========================================================
  // Object를 Target에 배치 (탭 / 드래그 공통)
  // placement가 있으면(드래그) 놓은 자리에 스티커로 붙는다
  // ==========================================================

  const placeObject = (
    objectId: string,
    targetId: string,
    placement?: StickerPlacement,
  ) => {
    if (!problem || roundResult) return;

    if (!problem.objects.some((o) => o.instanceId === objectId)) return;
    if (!problem.targets.some((t) => t.id === targetId)) return;

    setPlacedObjects((prev) => {
      const next: Record<string, string[]> = { ...prev };

      // 다른 바구니에 이미 있다면 제거
      Object.keys(next).forEach((id) => {
        next[id] = next[id].filter((placedId) => placedId !== objectId);
      });

      next[targetId] = [...(next[targetId] ?? []), objectId];

      return next;
    });

    setStickerPlacements((prev) => {
      const next = { ...prev };

      if (placement) {
        next[objectId] = placement;
      } else {
        delete next[objectId];
      }

      return next;
    });

    // 바구니에 넣었다면 오답 목록에서도 제거
    setWrongObjectIds((prev) => prev.filter((id) => id !== objectId));
    setSelectedObjectId(null);
  };

  // ==========================================================
  // Target 선택 (탭 방식)
  // ==========================================================

  const handleTargetPress = (targetId: string) => {
    if (!selectedObjectId) return;

    placeObject(selectedObjectId, targetId);
  };

  // ==========================================================
  // 드래그 앤 드롭: Target에 놓기
  // ==========================================================

  const handleDropObject = (
    objectId: string,
    targetId: string,
    placement: StickerPlacement,
  ) => {
    placeObject(objectId, targetId, placement);
  };

  // ==========================================================
  // 드래그 앤 드롭: 오답으로 사라짐
  // ==========================================================

  const handleWrongDrop = (objectId: string) => {
    if (roundResult) return;

    setWrongObjectIds((prev) =>
      prev.includes(objectId) ? prev : [...prev, objectId],
    );

    // 이미 바구니에 있던 오브젝트라면 제거
    setPlacedObjects((prev) => {
      const next: Record<string, string[]> = {};

      Object.entries(prev).forEach(([targetId, ids]) => {
        next[targetId] = ids.filter((id) => id !== objectId);
      });

      return next;
    });

    setStickerPlacements((prev) => {
      if (!prev[objectId]) return prev;

      const next = { ...prev };
      delete next[objectId];
      return next;
    });

    setSelectedObjectId(null);
  };

  // ==========================================================
  // Target 안의 Object 꺼내기
  // ==========================================================

  const handleRemoveFromTarget = (targetId: string, objectId: string) => {
    if (roundResult) return;

    setPlacedObjects((prev) => ({
      ...prev,
      [targetId]: (prev[targetId] ?? []).filter((id) => id !== objectId),
    }));

    setStickerPlacements((prev) => {
      if (!prev[objectId]) return prev;

      const next = { ...prev };
      delete next[objectId];
      return next;
    });
  };

  // ==========================================================
  // 다음 / 이전 Round
  // ==========================================================

  const resetRoundState = () => {
    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setStickerPlacements({});
    setWrongObjectIds([]);
  };

  const handleNextRound = () => {
    if (roundIndex >= totalRounds - 1) return;

    resetRoundState();
    setRoundIndex((prev) => prev + 1);
  };

  const handlePreviousRound = () => {
    if (roundIndex <= 0) return;

    resetRoundState();
    setRoundIndex((prev) => prev - 1);
  };

  // ==========================================================
  // Level 변경 / 재시작
  // ==========================================================

  const handleChangeLevel = (nextLevel: number) => {
    if (nextLevel < 1 || nextLevel > CategorySortingLevels.length) return;

    resetRoundState();
    setTestLevel(nextLevel);
    setRoundIndex(0);
    setEarnedStars(0);
    starRoundCountRef.current = 0;

    // 같은 레벨 / 같은 라운드에서 재시작해도 문제를 새로 생성
    setProblemSeed((prev) => prev + 1);
  };

  // ==========================================================
  // 결과 후 다음 단계
  // ==========================================================

  const handleNextAfterResult = () => {
    if (roundIndex < totalRounds - 1) {
      handleNextRound();
      return;
    }

    if (testLevel < CategorySortingLevels.length) {
      handleChangeLevel(testLevel + 1);
      return;
    }

    setRoundResult(null);
  };

  // ==========================================================
  // 이미 바구니에 배치된 Object ID
  // ==========================================================

  const allPlacedIds = Object.values(placedObjects).flat();

  // ==========================================================
  // Return
  // ==========================================================

  return {
    problem,

    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedObjects,
    stickerPlacements,
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

    totalLevels: CategorySortingLevels.length,
  };
}
