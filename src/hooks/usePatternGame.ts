// hooks/usePatternGame.ts

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  GeneratedPattern,
  PatternElement,
} from "../types/Pattern/patternTypes";

import { generatePattern } from "../generators/generatePatternProblem";
import { classificationItems } from "../data/classification/classificationItems";
import { PATTERN_LEVELS } from "../types/Pattern/patternLevels";
import { unlockStickers } from "../utils/asyncStorage/stickerStorage";

type UsePatternGameParams = {
  initialLevel?: number;
  totalRounds?: number;
};

const NEXT_ROUND_DELAY = 400;
const STAR_PER_ROUND = 0.5;
const MAX_MISTAKES_FOR_STAR = 1;
const STICKER_START_LEVEL = 10;

export function areSameElement(a: PatternElement, b: PatternElement): boolean {
  if (a.kind !== b.kind) return false;

  if (a.kind === "color" && b.kind === "color") {
    return a.colorId === b.colorId;
  }

  if (a.kind === "shape" && b.kind === "shape") {
    return a.shape === b.shape && a.colorId === b.colorId;
  }

  if (a.kind === "item" && b.kind === "item") {
    return a.item.id === b.item.id;
  }

  return false;
}

export default function usePatternGame({
  initialLevel = 1,
  totalRounds = 10,
}: UsePatternGameParams) {
  const [testLevel, setTestLevel] = useState(initialLevel);
  const [roundIndex, setRoundIndex] = useState(0);
  const [problemSeed, setProblemSeed] = useState(0);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [placedElement, setPlacedElement] = useState<PatternElement | null>(
    null,
  );
  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [earnedStars, setEarnedStars] = useState(0);

  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNextTimer = useCallback(() => {
    if (nextTimerRef.current !== null) {
      clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearNextTimer, [clearNextTimer]);

  const problem: GeneratedPattern | null = useMemo(() => {
    try {
      // 패턴 게임의 선택지는 3개로 고정
      return generatePattern(testLevel, {
        items: classificationItems,
        choiceCount: 3,
      });
    } catch (error) {
      console.error("[Pattern] 문제 생성 실패", error);
      return null;
    }
  }, [testLevel, roundIndex, problemSeed]);

  const problemKey = `${testLevel}-${roundIndex}-${problemSeed}`;

  const resetRoundState = useCallback(() => {
    setSelectedObjectId(null);
    setPlacedElement(null);
    setWrongObjectIds([]);
  }, []);

  const handleSelectObject = useCallback((id: string) => {
    setSelectedObjectId(id);
  }, []);

  // 정답을 빈칸에 놓았을 때
  const handleDropObject = useCallback(
    (element: PatternElement) => {
      if (!problem || roundResult || placedElement !== null) {
        return;
      }

      setPlacedElement(element);

      // 오답이 0회 또는 1회일 때만 이번 라운드의 별을 획득
      if (wrongObjectIds.length <= MAX_MISTAKES_FOR_STAR) {
        setEarnedStars((prev) => prev + STAR_PER_ROUND);
      }

      // 레벨 10부터 정답이 사물인 경우 해당 스티커 해금
      if (testLevel >= STICKER_START_LEVEL && element.kind === "item") {
        void unlockStickers([element.item.id]);
      }

      // 마지막 라운드라면 결과 화면 표시
      if (roundIndex + 1 >= totalRounds) {
        clearNextTimer();
        setRoundResult("correct");
        return;
      }

      clearNextTimer();

      nextTimerRef.current = setTimeout(() => {
        nextTimerRef.current = null;
        resetRoundState();
        setRoundIndex((prev) => prev + 1);
      }, NEXT_ROUND_DELAY);
    },
    [
      problem,
      roundResult,
      placedElement,
      wrongObjectIds,
      testLevel,
      roundIndex,
      totalRounds,
      clearNextTimer,
      resetRoundState,
    ],
  );

  // 오답으로 놓은 선택지는 기록해 두고 다시 선택하지 못하게 함
  const handleWrongDrop = useCallback((objectId: string) => {
    setWrongObjectIds((prev) =>
      prev.includes(objectId) ? prev : [...prev, objectId],
    );
  }, []);

  // 개발용 수동 다음 라운드
  const handleNextRound = useCallback(() => {
    if (roundResult) return;

    clearNextTimer();

    if (roundIndex + 1 >= totalRounds) {
      setRoundResult("correct");
      return;
    }

    resetRoundState();
    setRoundIndex((prev) => prev + 1);
  }, [roundIndex, totalRounds, roundResult, resetRoundState, clearNextTimer]);

  // 개발용 이전 라운드
  const handlePreviousRound = useCallback(() => {
    if (roundResult) return;

    clearNextTimer();
    resetRoundState();
    setRoundIndex((prev) => Math.max(0, prev - 1));
  }, [roundResult, resetRoundState, clearNextTimer]);

  // 레벨 변경 또는 다시 하기
  const handleChangeLevel = useCallback(
    (level: number) => {
      clearNextTimer();
      resetRoundState();

      setTestLevel(level);
      setRoundIndex(0);
      setEarnedStars(0);
      setRoundResult(null);
      setProblemSeed((prev) => prev + 1);
    },
    [resetRoundState, clearNextTimer],
  );

  // 결과 화면에서 다음 레벨로 이동
  const handleNextAfterResult = useCallback(() => {
    if (testLevel < PATTERN_LEVELS.length) {
      handleChangeLevel(testLevel + 1);
    }
  }, [testLevel, handleChangeLevel]);

  return {
    problem,
    problemKey,
    testLevel,
    roundIndex,
    earnedStars,
    selectedObjectId,
    placedElement,
    wrongObjectIds,
    roundResult,
    handleSelectObject,
    handleDropObject,
    handleWrongDrop,
    handleNextRound,
    handlePreviousRound,
    handleChangeLevel,
    handleNextAfterResult,
  };
}
