import { PuzzleGroupId } from "../screens/puzzle/puzzleGroupConfig";
import type { PuzzleCategoryType } from "../screens/puzzle/puzzleMenuScreen";
import { StageMapGameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  ClassificationMenuScreen: undefined;
  PuzzleMenuScreen: undefined;
  // PuzzleThemeSelectScreen: {
  //   puzzleCategory: PuzzleCategoryType;
  // };

  PuzzleGroupSelectScreen: {
    puzzleCategory: PuzzleCategoryType;
  };

  PuzzleThemeSelectScreen: {
    puzzleCategory: PuzzleCategoryType;
    groupId?: PuzzleGroupId;
  };

  StageMapScreen: {
    gameType: StageMapGameType;
    puzzleCategory?:
      | "animal"
      | "vehicle"
      | "dinosaur"
      | "object"
      | "flag"
      | "landmark";
    character?: string;
    groupId?: PuzzleGroupId;
  };

  SettingScreen: undefined;
  ProgressManagementScreen: undefined;

  StickerGalleryScreen: undefined;
  StickerDetailScreen: {
    stickerId: string;
    stickerName: string;
  };

  ColorSortingPlayScreen: {
    gameType: "color";
    level: number;
  };
  ShapeSortingPlayScreen: {
    gameType: "shape";
    level: number;
  };
  CategorySortingPlayScreen: {
    gameType: "category";
    level: number;
  };
  SizeSortingPlayScreen: {
    gameType: "size";
    level: number;
  };
  PatternPlayScreen: {
    gameType: "pattern";
    level: number;
  };
  PuzzlePlayScreen: {
    gameType: "puzzle";
    puzzleCategory?:
      | "animal"
      | "vehicle"
      | "dinosaur"
      | "object"
      | "flag"
      | "landmark"; // 👈 추가!
    character?: string;
    level?: number;
    groupId?: PuzzleGroupId;
  };

  LanguageScreen: undefined;
  ShapeSortingTestScreen: undefined;
  ShapeStickerScreen: undefined;
  ShapeBasketPreviewScreen: undefined;
  CategoryStickerPreviewScreen: undefined;

  CategorySortingTestScreen: undefined;
  AnimalCategoryBackgroundPreviewScreen: undefined;
  CategoryScenePreviewScreen: undefined;
  SizeSortingTestScreen: undefined;
  ProgressMoonTestScreen: undefined;
  PatternTestScreen: undefined;
  PatternGeneratorTestScreen: undefined;
  AstroCatPreviewScreen: undefined;
  PuzzleTestScreen: undefined;
};
