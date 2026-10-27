// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STORAGE_KEY = "@puzzleProgress/v1";

// export type PuzzleProgress = {
//   bestStars: Record<string, number>;
//   clearedLevels: number[];
// };

// const EMPTY_PROGRESS: PuzzleProgress = {
//   bestStars: {},
//   clearedLevels: [],
// };

// export async function getPuzzleProgress(): Promise<PuzzleProgress> {
//   try {
//     const raw = await AsyncStorage.getItem(STORAGE_KEY);

//     if (!raw) return EMPTY_PROGRESS;

//     const parsed = JSON.parse(raw);

//     return {
//       bestStars:
//         parsed?.bestStars && typeof parsed.bestStars === "object"
//           ? parsed.bestStars
//           : {},
//       clearedLevels: Array.isArray(parsed?.clearedLevels)
//         ? parsed.clearedLevels
//         : [],
//     };
//   } catch (error) {
//     console.warn("퍼즐 진행 기록을 불러오지 못했어요.", error);
//     return EMPTY_PROGRESS;
//   }
// }

// export async function savePuzzleLevelStars(
//   level: number,
//   earnedStars: number,
// ): Promise<void> {
//   try {
//     const current = await getPuzzleProgress();
//     const key = String(level);
//     const previousStars = current.bestStars[key] ?? 0;

//     current.bestStars[key] = Math.max(
//       previousStars,
//       Math.min(5, Math.max(0, earnedStars)),
//     );

//     if (!current.clearedLevels.includes(level)) {
//       current.clearedLevels.push(level);
//     }

//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current));
//   } catch (error) {
//     console.warn("퍼즐 별 기록을 저장하지 못했어요.", error);
//   }
// }

// export function isPuzzleLevelUnlocked(
//   level: number,
//   progress: PuzzleProgress,
// ): boolean {
//   if (level === 1) return true;

//   return progress.clearedLevels.includes(level - 1);
// }

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_PREFIX = "@puzzleProgress/v1";

export type PuzzleProgress = {
  bestStars: Record<string, number>;
  clearedLevels: number[];
};

const EMPTY_PROGRESS: PuzzleProgress = {
  bestStars: {},
  clearedLevels: [],
};

function getStorageKey(character: string): string {
  return `${STORAGE_PREFIX}/${character}`;
}

export async function getPuzzleProgress(
  character: string,
): Promise<PuzzleProgress> {
  try {
    const raw = await AsyncStorage.getItem(getStorageKey(character));

    if (!raw) {
      return {
        bestStars: {},
        clearedLevels: [],
      };
    }

    const parsed = JSON.parse(raw);

    return {
      bestStars:
        parsed?.bestStars && typeof parsed.bestStars === "object"
          ? parsed.bestStars
          : {},
      clearedLevels: Array.isArray(parsed?.clearedLevels)
        ? parsed.clearedLevels
        : [],
    };
  } catch (error) {
    console.warn("퍼즐 진행 기록을 불러오지 못했어요.", error);
    return EMPTY_PROGRESS;
  }
}

export async function savePuzzleLevelStars(
  character: string,
  level: number,
  earnedStars: number,
): Promise<void> {
  try {
    const progress = await getPuzzleProgress(character);
    const key = String(level);
    const safeStars = Math.max(0, Math.min(5, earnedStars));
    const previousStars = progress.bestStars[key];

    // 이전 최고 기록보다 높을 때만 갱신한다.
    // 첫 클리어가 별 0개여도 기록 자체는 생성된다.
    progress.bestStars[key] =
      previousStars === undefined
        ? safeStars
        : Math.max(previousStars, safeStars);

    if (!progress.clearedLevels.includes(level)) {
      progress.clearedLevels.push(level);
    }

    await AsyncStorage.setItem(
      getStorageKey(character),
      JSON.stringify(progress),
    );
  } catch (error) {
    console.warn("퍼즐 별 기록을 저장하지 못했어요.", error);
  }
}

export function isPuzzleLevelUnlocked(
  level: number,
  progress: PuzzleProgress,
): boolean {
  if (level === 1) return true;

  return progress.clearedLevels.includes(level - 1);
}
