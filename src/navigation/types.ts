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
