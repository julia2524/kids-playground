import { PuzzleCategoryType } from "../screens/puzzle/puzzleMenuScreen";
import { GameType, StageMapGameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  ClassificationMenuScreen: undefined;
  PuzzleMenuScreen: undefined;
  PuzzleThemeSelectScreen: {
    puzzleCategory: PuzzleCategoryType;
  };

  StageMapScreen: {
    gameType: StageMapGameType;
    puzzleCategory?: "animal" | "vehicle" | "dinosaur" | "object";
    character?: string;
  };
  PuzzleRoadMapScreen: {
    puzzleCategory?: "animal" | "vehicle" | "dinosaur" | "object";
    character: string;
  };

  SettingScreen: undefined;

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
    puzzleCategory?: "animal" | "vehicle" | "dinosaur" | "object"; // 👈 추가!
    character?: string;
    level?: number;
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
