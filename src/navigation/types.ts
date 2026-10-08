import { GameType, StageMapGameType } from "../types/game";

export type RootStackParamList = {
  Home: undefined;

  ClassificationMenuScreen: undefined;

  StageMapScreen: {
    gameType: StageMapGameType;
  };

  ClassificationPlayScreen: {
    gameType: "classification";
    level: number;
  };

  SettingScreen: undefined;

  StickerGalleryScreen: undefined;

  ColorSortingPlayScreen: {
    gameType: "color";
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
