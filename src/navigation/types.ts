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
  LanguageScreen: undefined;
  ShapeSortingTestScreen: undefined;
  ShapeStickerScreen: undefined;
  ShapeBasketPreviewScreen: undefined;
  CategoryStickerPreviewScreen: undefined;
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
