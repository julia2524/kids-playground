// hooks/Pattern/usePatternGame.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GeneratedPattern,
  PatternElement,
} from "../types/Pattern/patternTypes";
import { generatePattern } from "../generators/generatePatternProblem";
import { classificationItems } from "../data/classification/classificationItems";
import { PATTERN_LEVELS } from "../types/Pattern/patternLevels";

type UsePatternGameParams = {
  initialLevel?: number;
  totalRounds?: number;
};

const NEXT_ROUND_DELAY = 400;

export function areSameElement(a: PatternElement, b: PatternElement): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "color" && b.kind === "color") return a.colorId === b.colorId;
  if (a.kind === "shape" && b.kind === "shape")
    return a.shape === b.shape && a.colorId === b.colorId;
  if (a.kind === "item" && b.kind === "item") return a.item.id === b.item.id;
  return false;
}

export default function usePatternGame({
  initialLevel = 1,
  totalRounds = 10,
}: UsePatternGameParams) {
  const [testLevel, setTestLevel] = useState(initialLevel);
  const [roundIndex, setRoundIndex] = useState(0); // 0 ~ totalRounds-1
  // 같은 레벨/라운드에서 문제를 새로 뽑고 싶을 때(재시작) 올리는 값
  const [problemSeed, setProblemSeed] = useState(0);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [placedElement, setPlacedElement] = useState<PatternElement | null>(
    null,
  );
  const [wrongObjectIds, setWrongObjectIds] = useState<string[]>([]);
  // 레벨 전체를 끝냈을 때만 세팅 (오버레이용)
  const [roundResult, setRoundResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [earnedStars, setEarnedStars] = useState(0);

  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNextTimer = useCallback(() => {
    if (nextTimerRef.current) {
      clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearNextTimer, [clearNextTimer]);

  // ★ 렌더 중에 바로 계산 → roundIndex와 problem이 같은 렌더에서 바뀐다
  const problem: GeneratedPattern | null = useMemo(() => {
    try {
      return generatePattern(testLevel, { items: classificationItems });
    } catch (e) {
      console.error("[Pattern] 문제 생성 실패", e);
      return null;
    }
  }, [testLevel, roundIndex, problemSeed]);

  // 화면/보드의 key로 사용 (문제가 바뀌면 컴포넌트가 새로 마운트됨)
  const problemKey = `${testLevel}-${roundIndex}-${problemSeed}`;

  const resetRoundState = useCallback(() => {
    setSelectedObjectId(null);
    setPlacedElement(null);
    setWrongObjectIds([]);
  }, []);

  const handleSelectObject = useCallback((id: string) => {
    setSelectedObjectId(id);
  }, []);

  // 정답을 빈칸에 드롭했을 때
  const handleDropObject = useCallback(
    (element: PatternElement) => {
      if (!problem || roundResult) return;

      setPlacedElement(element);
      setEarnedStars((prev) => prev + 0.5);

      if (roundIndex + 1 >= totalRounds) {
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
      roundIndex,
      totalRounds,
      resetRoundState,
      clearNextTimer,
    ],
  );

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

  const handlePreviousRound = useCallback(() => {
    if (roundResult) return;
    clearNextTimer();
    resetRoundState();
    setRoundIndex((prev) => Math.max(0, prev - 1));
  }, [roundResult, resetRoundState, clearNextTimer]);

  const handleChangeLevel = useCallback(
    (level: number) => {
      clearNextTimer();
      resetRoundState();
      setTestLevel(level);
      setRoundIndex(0);
      setEarnedStars(0);
      setRoundResult(null);
      setProblemSeed((s) => s + 1);
    },
    [resetRoundState, clearNextTimer],
  );

  // 오버레이에서 "다음 레벨"
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
