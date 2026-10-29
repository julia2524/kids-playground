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

const LAST_PUZZLE_KEY = "LAST_ACCESSED_PUZZLE_CATEGORY";
// 퍼즐 카테고리별 진행 기록 초기화.
// character 값은 getPuzzleProgress(character)에 전달하는 값과 같아야 한다.
export async function resetPuzzleProgress(character: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(getStorageKey(character));

    // 초기화한 카테고리가 마지막으로 접근한 카테고리일 때만
    // 마지막 카테고리 기록도 지운다.
    const lastCategory = await AsyncStorage.getItem(LAST_PUZZLE_KEY);
    if (lastCategory === character) {
      await AsyncStorage.removeItem(LAST_PUZZLE_KEY);
    }

    return true;
  } catch (error) {
    console.warn("퍼즐 진행 기록을 초기화하지 못했어요.", error);
    return false;
  }
}
export async function resetPuzzleProgressByCharacters(
  characters: string[],
): Promise<boolean> {
  try {
    const keys = characters.map((character) => getStorageKey(character));

    await AsyncStorage.multiRemove(keys);

    return true;
  } catch (error) {
    console.warn("퍼즐 진행 기록을 초기화하지 못했어요.", error);
    return false;
  }
}

export const saveLastPuzzleCategory = async (category: string) => {
  try {
    await AsyncStorage.setItem(LAST_PUZZLE_KEY, category);
  } catch (e) {
    console.error("Failed to save last puzzle category", e);
  }
};

export const getLastPuzzleCategory = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LAST_PUZZLE_KEY);
  } catch (e) {
    console.error("Failed to get last puzzle category", e);
    return null;
  }
};
