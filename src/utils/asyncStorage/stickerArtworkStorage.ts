import AsyncStorage from "@react-native-async-storage/async-storage";

const ARTWORK_STORAGE_KEY = "@sticker_artworks_v1";

type DrawingStroke = {
  id: string;
  path: string;
  color: string;
  strokeWidth: number;
};

type SavedArtwork = {
  stickerId: string;
  selectedColor: string;
  drawings: DrawingStroke[];
  updatedAt: number;
};

type ArtworkCollection = Record<string, SavedArtwork>;

/**
 * 모든 스티커의 그림을 삭제한다.
 * 스티커별 선택 색상은 유지한다.
 *
 * @returns 삭제 성공 여부
 */
export const clearAllStickerDrawings = async (): Promise<boolean> => {
  try {
    const json = await AsyncStorage.getItem(ARTWORK_STORAGE_KEY);

    const collection: ArtworkCollection = json ? JSON.parse(json) : {};
    const updatedCollection: ArtworkCollection = {};
    const updatedAt = Date.now();

    for (const [stickerId, artwork] of Object.entries(collection)) {
      updatedCollection[stickerId] = {
        ...artwork,
        drawings: [],
        updatedAt,
      };
    }

    await AsyncStorage.setItem(
      ARTWORK_STORAGE_KEY,
      JSON.stringify(updatedCollection),
    );

    return true;
  } catch (error) {
    console.error("스티커 그림 전체 삭제 실패:", error);
    return false;
  }
};
