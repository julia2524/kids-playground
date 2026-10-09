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
  LanguageScreen: undefined;
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
