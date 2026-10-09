import { ClassificationColorId } from "./game";

export type ColorSortingObjectMode =
  | "simple"
  | "simple_same_shape"
  | "same_type"
  | "different";

export type ColorSortingLevelConfig = {
  level: number;
  rule: "color";

  targetCount: number;
  objectCount: number;
  objectsPerTarget: number;

  objectMode: ColorSortingObjectMode;

  colorCount: number;
  colorPool: ClassificationColorId[]; // ✨ 추가: 각 레벨이 사용할 색상 Pool

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
