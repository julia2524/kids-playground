import { GameType, StageMapGameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  ClassificationMenuScreen: undefined;

  StageMapScreen: {
    gameType: StageMapGameType;
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
};
// PatternPlayScreen: {
//   gameType: "pattern";
//   level: number;
// };

// PuzzlePlayScreen: {
//   gameType: "puzzle";
//   level: number;
// };

// MazePlayScreen: {
//   gameType: "maze";
//   level: number;
// };
