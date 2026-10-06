import { GameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  StageMapScreen: {
    gameType: GameType;
  };

  ClassificationPlayScreen: {
    gameType: "classification";
    level: number;
  };
  SettingScreen: undefined;
  StickerGalleryScreen: undefined;
  ColorSortingPlayScreen: {
    gameType: "classification";
    level: number;
  };
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
