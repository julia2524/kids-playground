import { useEffect, useMemo, useRef, useState } from "react";

import { unlockStickers } from "../../utils/asyncStorage/stickerStorage";
import { playStreakNote } from "../../utils/sound";
import { classificationItems } from "../../data/classification/classificationItems";
import {
  generateShapeSortingProblem,
  ShapeSortingObject,
  ShapeSortingRound,
} from "../../generators/classification/generateShapeSortingProblem";
import { ShapeSortingLevels } from "../../types/Classification/Shape/shapeSortingLevels";

export type ShapeRoundResult = "correct" | "wrong" | null;

type UseShapeSortingGameProps = {
  initialLevel?: number;
  totalRounds: number;
};

const STAR_PER_ROUND = 0.5;
const MAX_MISTAKES = 2;
const AUTO_NEXT_DELAY = 400;
const STICKER_START_LEVEL = 10;

const getStickerId = (object: ShapeSortingObject) =>
  object.kind === "item" ? object.itemId : object.id;

export default function useShapeSortingGame({
  initialLevel = 1,
  totalRounds,
}: UseShapeSortingGameProps) {
  // ==========================================================
  // Game State
  // ==========================================================

  const starRoundCountRef = useRef(0);

  const [testLevel, setTestLevel] = useState(initialLevel);
  const [roundIndex, setRoundIndex] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  // target.id를 키로 사용
  const [placedObjects, setPlacedObjects] = useState<Record<string, string[]>>(
    {},
  );

  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<ShapeRoundResult>(null);

  // ==========================================================
  // Problem 생성
  // ==========================================================

  const problem: ShapeSortingRound | null = useMemo(() => {
    const config = ShapeSortingLevels.find((item) => item.level === testLevel);

    if (!config) {
      return null;
    }

    // Generator는 roundIndex를 받지 않으므로
    // 라운드가 바뀌어 새로 호출될 때마다 문제를 생성
    return generateShapeSortingProblem(config, classificationItems);
  }, [testLevel, roundIndex]);

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
    setWrongObjectIds([]);
    setSelectedObjectId(null);
    setRoundResult(null);
  }, [problem]);

  // ==========================================================
  // 라운드 종료 판정
  // ==========================================================

  useEffect(() => {
    if (!problem || roundResult) return;

    const objectIds = new Set(problem.objects.map((object) => object.id));

    const placedIds = Object.values(placedObjects)
      .flat()
      .filter((id) => objectIds.has(id));

    const wrongIds = wrongObjectIds.filter((id) => objectIds.has(id));

    // 모든 오브젝트가 배치되거나 오답으로 처리되어야 종료
    if (placedIds.length + wrongIds.length !== problem.objects.length) {
      return;
    }

    // answer[object.id] = 정답 target.id
    const correctObjects = problem.objects.filter((object) =>
      (placedObjects[problem.answer[object.id]] ?? []).includes(object.id),
    );

    // 바구니에 배치한 모든 오브젝트가 정답 위치에 있는지 확인
    const allPlacedCorrect = placedIds.every((objectId) => {
      const correctTargetId = problem.answer[objectId];

      return (placedObjects[correctTargetId] ?? []).includes(objectId);
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

        // 레벨 5부터 정답으로 배치한 실제 사물의 스티커 해금
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
    if (roundResult) return;

    setSelectedObjectId((prev) => (prev === objectId ? null : objectId));
  };

  // ==========================================================
  // Object를 Target에 배치
  // 탭 / 드래그 공통
  // ==========================================================

  const placeObject = (objectId: string, targetId: string) => {
    if (!problem || roundResult) return;

    // 유효한 Object와 Target인지 확인
    if (!problem.objects.some((object) => object.id === objectId)) return;
    if (!problem.targets.some((target) => target.id === targetId)) return;

    setPlacedObjects((prev) => {
      const next: Record<string, string[]> = { ...prev };

      // 다른 바구니에 이미 있다면 제거
      Object.keys(next).forEach((id) => {
        next[id] = next[id].filter((placedId) => placedId !== objectId);
      });

      // 선택한 바구니에 추가
      next[targetId] = [...(next[targetId] ?? []), objectId];

      return next;
    });

    // 바구니에 넣었다면 오답으로 사라진 목록에서도 제거
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

  const handleDropObject = (objectId: string, targetId: string) => {
    placeObject(objectId, targetId);
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
  };

  // ==========================================================
  // 다음 / 이전 Round
  // ==========================================================

  const handleNextRound = () => {
    if (roundIndex >= totalRounds - 1) return;

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setWrongObjectIds([]);
    setRoundIndex((prev) => prev + 1);
  };

  const handlePreviousRound = () => {
    if (roundIndex <= 0) return;

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
    if (nextLevel < 1 || nextLevel > ShapeSortingLevels.length) return;

    setTestLevel(nextLevel);
    setRoundIndex(0);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setWrongObjectIds([]);
    setRoundResult(null);
    setEarnedStars(0);
    starRoundCountRef.current = 0;
  };

  // ==========================================================
  // 결과 후 다음 단계
  // ==========================================================

  const handleNextAfterResult = () => {
    if (roundIndex < totalRounds - 1) {
      handleNextRound();
      return;
    }

    if (testLevel < ShapeSortingLevels.length) {
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

    totalLevels: ShapeSortingLevels.length,
  };
}
