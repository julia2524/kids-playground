import AsyncStorage from "@react-native-async-storage/async-storage";

export const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";

/**
 * AsyncStorage에서 해금된 전체 스티커 ID 목록을 가져옵니다.
 */
export const getUnlockedStickers = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(UNLOCKED_STICKERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("스티커 목록 불러오기 실패:", e);
    return [];
  }
};

/**
 * 라운드 클리어 시 스티커를 해금합니다.
 * @param stickerId 해금할 스티커의 고유 ID (예: "medal", "apple")
 * @returns { isNew: boolean, updatedList: string[] } 새로 해금되었는지 여부와 업데이트된 전체 목록
 */
export const unlockSticker = async (
  stickerId: string,
): Promise<{ isNew: boolean; updatedList: string[] }> => {
  try {
    const currentList = await getUnlockedStickers();

    // 이미 해금된 스티커인 경우
    if (currentList.includes(stickerId)) {
      return { isNew: false, updatedList: currentList };
    }

    // 신규 스티커 추가 및 저장
    const updatedList = [...currentList, stickerId];
    await AsyncStorage.setItem(
      UNLOCKED_STICKERS_KEY,
      JSON.stringify(updatedList),
    );

    return { isNew: true, updatedList };
  } catch (e) {
    console.error("스티커 해금 저장 실패:", e);
    return { isNew: false, updatedList: [] };
  }
};

// 저장 작업이 겹치지 않도록 순서대로 실행하기 위한 큐
let unlockQueue: Promise<unknown> = Promise.resolve();

/**
 * 여러 스티커를 한 번에 해금합니다. (라운드 종료 시 정답 스티커용)
 * @param stickerIds 해금할 스티커 ID 목록
 * @returns newIds: 이번에 새로 해금된 id 목록 / updatedList: 업데이트된 전체 목록
 */
export const unlockStickers = (
  stickerIds: string[],
): Promise<{ newIds: string[]; updatedList: string[] }> => {
  const task = unlockQueue.then(async () => {
    try {
      const currentList = await getUnlockedStickers();
      const owned = new Set(currentList);

      // 중복 제거 + 이미 해금된 것 제외
      const newIds = [...new Set(stickerIds)].filter((id) => !owned.has(id));

      if (newIds.length === 0) {
        return { newIds: [], updatedList: currentList };
      }

      const updatedList = [...currentList, ...newIds];
      await AsyncStorage.setItem(
        UNLOCKED_STICKERS_KEY,
        JSON.stringify(updatedList),
      );

      return { newIds, updatedList };
    } catch (e) {
      console.error("스티커 해금 저장 실패:", e);
      return { newIds: [], updatedList: [] as string[] };
    }
  });

  unlockQueue = task;
  return task;
};

/**
 * 해금된 스티커를 전부 잠금 상태로 되돌립니다.
 * @returns 성공 여부
 */
export const resetUnlockedStickers = (): Promise<boolean> => {
  // unlockStickers와 같은 큐에 넣어서, 저장 중인 작업과 겹치지 않게 함
  const task = unlockQueue.then(async () => {
    try {
      await AsyncStorage.removeItem(UNLOCKED_STICKERS_KEY);
      return true;
    } catch (e) {
      console.error("스티커 초기화 실패:", e);
      return false;
    }
  });

  unlockQueue = task;
  return task;
};
