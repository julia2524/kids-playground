import { ClassificationColorId } from "./game";

export type ColorSortingObjectMode = "simple" | "same_type" | "different";

export type ColorSortingLevelConfig = {
  level: number;
  rule: "color";

  targetCount: number;
  objectCount: number;
  objectsPerTarget: number;

  objectMode: ColorSortingObjectMode;

  colorCount: number;

  showHint?: boolean;
  completionEffect?: "none" | "color_king";
};

export type ColorSortingObject = {
  id: string;

  itemId: string;

  label: string;

  colorId: ClassificationColorId;

  svgKey: string;

  shape: string;
};

export type ColorSortingTarget = {
  id: string;

  colorId: ClassificationColorId;

  label: string;
};

export type ColorSortingAnswer = {
  targetColorId: ClassificationColorId;

  objectIds: string[];
};

export type ColorSortingProblem = {
  level: number;

  round: number;

  targets: ColorSortingTarget[];

  objects: ColorSortingObject[];

  answer: ColorSortingAnswer[];
};
