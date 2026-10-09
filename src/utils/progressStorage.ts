import AsyncStorage from "@react-native-async-storage/async-storage";

export type GameProgress = {
  highestClearedLevel: number;
  stars: Record<number, number>;
};

export const DEFAULT_PROGRESS: GameProgress = {
  highestClearedLevel: 0,
  stars: {},
};

const keyOf = (gameType: string) => `@progress/${gameType}`;

export async function loadProgress(gameType: string): Promise<GameProgress> {
  try {
    const raw = await AsyncStorage.getItem(keyOf(gameType));
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    console.warn("[progress] load 실패", e);
    return DEFAULT_PROGRESS;
  }
}

// 레벨 클리어 저장: 진행도는 절대 뒤로 가지 않고, 별은 최고 기록만 유지
export async function saveLevelClear(
  gameType: string,
  level: number,
  stars: number,
) {
  try {
    const prev = await loadProgress(gameType);
    const next: GameProgress = {
      highestClearedLevel: Math.max(prev.highestClearedLevel, level),
      stars: {
        ...prev.stars,
        [level]: Math.max(prev.stars[level] ?? 0, stars),
      },
    };
    await AsyncStorage.setItem(keyOf(gameType), JSON.stringify(next));
  } catch (e) {
    console.warn("[progress] save 실패", e);
  }
}

// 개발용: 진행도 초기화
export async function resetProgress(gameType: string) {
  try {
    await AsyncStorage.removeItem(keyOf(gameType));
  } catch (e) {
    console.warn("[progress] reset 실패", e);
  }
}
