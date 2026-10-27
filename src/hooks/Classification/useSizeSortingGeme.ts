import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SizeSortingLevels } from "../../types/Classification/Size/sizeSortingLevels";
import {
  generateSizeSortingProblem,
  SizeSortingProblem,
} from "../../generators/classification/generateSizeSortingProblem";
import { classificationItems } from "../../data/classification/classificationItems";
import { unlockStickers } from "../../utils/asyncStorage/stickerStorage";
import { playStreakNote } from "../../utils/sound";
import type { StickerPlacement } from "../../components/SizeSorting/SizeSortingObjectComponent";

export type SizeRoundResult = "correct" | "wrong" | null;

type UseSizeSortingGameProps = {
  initialLevel?: number;
  totalRounds: number;
};

const STAR_PER_ROUND = 0.5;
const MAX_MISTAKES = 2;
const AUTO_NEXT_DELAY = 400;
const STICKER_START_LEVEL = 1;

export default function useSizeSortingGame({
  initialLevel = 1,
  totalRounds,
}: UseSizeSortingGameProps) {
  const starRoundCountRef = useRef(0);

  const [testLevel, setTestLevel] = useState(initialLevel);
  const [roundIndex, setRoundIndex] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [placedObjects, setPlacedObjects] = useState<Record<string, string[]>>(
    {},
  );

  // 드래그로 정답 처리된 오브젝트가 바구니 안에서 붙을 위치 (object.id 키)
  // 없으면(탭 방식 배치) 바구니의 기본 자동 배치를 사용
  const [stickerPlacements, setStickerPlacements] = useState<
    Record<string, StickerPlacement>
  >({});

  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<SizeRoundResult>(null);

  const config = useMemo(
    () => SizeSortingLevels.find((item) => item.level === testLevel),
    [testLevel],
  );

  const problem: SizeSortingProblem | null = useMemo(() => {
    if (!config) return null;

    return generateSizeSortingProblem(config, classificationItems);
  }, [config, roundIndex]);

  // 새 문제마다 Target별 배치 상태 초기화
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

  // 라운드 완료 판정
  useEffect(() => {
    if (!problem || roundResult) return;

    const validIds = new Set(problem.objects.map((object) => object.id));

    const placedIds = Object.values(placedObjects)
      .flat()
      .filter((id) => validIds.has(id));

    const wrongIds = wrongObjectIds.filter((id) => validIds.has(id));

    // 아직 처리되지 않은 오브젝트가 있다면 대기
    if (placedIds.length + wrongIds.length < problem.objects.length) return;

    // 중복 배치 등으로 개수가 초과한 경우도 판정하지 않음
    if (placedIds.length + wrongIds.length !== problem.objects.length) return;

    const correctObjects = problem.objects.filter((object) =>
      (placedObjects[object.targetId] ?? []).includes(object.id),
    );
    // 실제로 배치한 오브젝트는 모두 올바른 Target에 놓였는지 확인
    const allPlacedCorrect = correctObjects.length === placedIds.length;

    // 오답 2개까지 허용하고, 나머지 오브젝트를 올바르게 배치했다면 별 획득
    const earnedStar = wrongIds.length <= MAX_MISTAKES && allPlacedCorrect;

    const isLastRound = roundIndex >= totalRounds - 1;

    const timer = setTimeout(
      () => {
        if (earnedStar) {
          setEarnedStars((previous) => previous + STAR_PER_ROUND);
          starRoundCountRef.current += 1;

          if (!isLastRound) {
            playStreakNote(starRoundCountRef.current);
          }
        }

        if (testLevel >= STICKER_START_LEVEL && correctObjects.length > 0) {
          unlockStickers(correctObjects.map((object) => object.itemId));
        }

        if (isLastRound) {
          setRoundResult(earnedStar ? "correct" : "wrong");
          return;
        }

        setSelectedObjectId(null);
        setRoundIndex((previous) => previous + 1);
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

  const handleSelectObject = useCallback(
    (objectId: string) => {
      if (roundResult) return;

      setSelectedObjectId((previous) =>
        previous === objectId ? null : objectId,
      );
    },
    [roundResult],
  );

  const handleWrongDrop = useCallback(
    (objectId: string) => {
      if (roundResult) return;

      setWrongObjectIds((previous) =>
        previous.includes(objectId) ? previous : [...previous, objectId],
      );

      setStickerPlacements((previous) => {
        if (!previous[objectId]) return previous;

        const next = { ...previous };
        delete next[objectId];
        return next;
      });

      setSelectedObjectId(null);
    },
    [roundResult],
  );

  // placement가 있으면(드래그) 놓은 자리에 스티커로 붙는다
  const placeObject = useCallback(
    (objectId: string, targetId: string, placement?: StickerPlacement) => {
      if (!problem || roundResult) return;

      const object = problem.objects.find((item) => item.id === objectId);
      const target = problem.targets.find((item) => item.id === targetId);

      if (!object || !target) return;

      // 크기가 다른 Target에 놓으면 오답 처리
      if (object.targetId !== target.id || object.sizeKey !== target.sizeKey) {
        handleWrongDrop(objectId);
        return;
      }

      setPlacedObjects((previous) => {
        const next: Record<string, string[]> = {};

        Object.entries(previous).forEach(([key, ids]) => {
          next[key] = ids.filter((id) => id !== objectId);
        });

        next[target.id] = [...(next[target.id] ?? []), objectId];

        return next;
      });

      setStickerPlacements((previous) => {
        const next = { ...previous };

        if (placement) {
          next[objectId] = placement;
        } else {
          delete next[objectId];
        }

        return next;
      });

      setSelectedObjectId(null);
    },
    [problem, roundResult, handleWrongDrop],
  );

  const handleTargetPress = useCallback(
    (targetId: string) => {
      if (!selectedObjectId) return;
      placeObject(selectedObjectId, targetId);
    },
    [selectedObjectId, placeObject],
  );

  const handleDropObject = useCallback(
    (objectId: string, targetId: string, placement: StickerPlacement) => {
      placeObject(objectId, targetId, placement);
    },
    [placeObject],
  );

  const handleRemoveFromTarget = useCallback(
    (targetId: string, objectId: string) => {
      if (roundResult) return;

      setPlacedObjects((previous) => ({
        ...previous,
        [targetId]: (previous[targetId] ?? []).filter((id) => id !== objectId),
      }));

      setStickerPlacements((previous) => {
        if (!previous[objectId]) return previous;

        const next = { ...previous };
        delete next[objectId];
        return next;
      });
    },
    [roundResult],
  );

  const handleNextRound = useCallback(() => {
    if (roundIndex >= totalRounds - 1) return;

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setStickerPlacements({});
    setWrongObjectIds([]);
    setRoundIndex((previous) => previous + 1);
  }, [roundIndex, totalRounds]);

  const handlePreviousRound = useCallback(() => {
    if (roundIndex <= 0) return;

    setRoundResult(null);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setStickerPlacements({});
    setWrongObjectIds([]);
    setRoundIndex((previous) => previous - 1);
  }, [roundIndex]);

  const handleChangeLevel = useCallback((nextLevel: number) => {
    if (nextLevel < 1 || nextLevel > SizeSortingLevels.length) return;

    setTestLevel(nextLevel);
    setRoundIndex(0);
    setSelectedObjectId(null);
    setPlacedObjects({});
    setStickerPlacements({});
    setWrongObjectIds([]);
    setRoundResult(null);
    setEarnedStars(0);
    starRoundCountRef.current = 0;
  }, []);

  const handleNextAfterResult = useCallback(() => {
    if (roundIndex < totalRounds - 1) {
      handleNextRound();
      return;
    }

    if (testLevel < SizeSortingLevels.length) {
      handleChangeLevel(testLevel + 1);
      return;
    }

    setRoundResult(null);
  }, [roundIndex, totalRounds, testLevel, handleNextRound, handleChangeLevel]);

  const allPlacedIds = Object.values(placedObjects).flat();

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
    totalLevels: SizeSortingLevels.length,

    handleSelectObject,
    handleTargetPress,
    handleDropObject,
    handleWrongDrop,
    handleRemoveFromTarget,

    handleNextRound,
    handlePreviousRound,
    handleChangeLevel,
    handleNextAfterResult,
  };
}
