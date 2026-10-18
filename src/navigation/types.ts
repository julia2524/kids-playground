import { GameType, StageMapGameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  ClassificationMenuScreen: undefined;

  StageMapScreen: {
    gameType: StageMapGameType;
  };

  SettingScreen: undefined;

  StickerGalleryScreen: undefined;

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
  LanguageScreen: undefined;
  ShapeSortingTestScreen: undefined;
  ShapeStickerScreen: undefined;
  ShapeBasketPreviewScreen: undefined;
  CategoryStickerPreviewScreen: undefined;

  CategorySortingTestScreen: undefined;
  AnimalCategoryBackgroundPreviewScreen: undefined;
  CategoryScenePreviewScreen: undefined;
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
