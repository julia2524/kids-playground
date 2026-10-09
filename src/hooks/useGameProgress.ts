import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  DEFAULT_PROGRESS,
  GameProgress,
  loadProgress,
} from "../utils/progressStorage";

export default function useGameProgress(gameType: string, totalLevels: number) {
  const [progress, setProgress] = useState<GameProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProgress(gameType).then((p) => {
        if (!active) return;
        setProgress(p);
        setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, [gameType]),
  );

  // 지금 도전할 레벨 (마지막 레벨을 넘지 않게)
  const currentLevel = Math.max(
    Math.min(progress.highestClearedLevel + 1, totalLevels),
    1,
  );

  return { progress, currentLevel, loaded };
}
