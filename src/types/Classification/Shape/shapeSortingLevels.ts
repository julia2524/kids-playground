import { ClassificationColorId, ClassificationShape } from "../../game";
import { ShapeSortingLevelConfig } from "./shapeSortingTypes";

export const BASIC_SHAPES: ClassificationShape[] = [
  "circle",
  "triangle",
  "square",
];

export const ALL_SHAPES: ClassificationShape[] = [
  "circle",
  "triangle",
  "square",
  "star",
  "heart",
];

export const BASIC_COLORS: ClassificationColorId[] = [
  "red",
  "blue",
  "yellow",
  "green",
  "black",
  "white",
];

export const ALL_COLORS: ClassificationColorId[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
];

// ==================================================
// Shape Sorting Level Config
//
// Level 1~3  : 단순 도형 + 같은 색상
// Level 4~6  : 단순 도형 + 두 가지 색상
// Level 7~9  : 단순 도형 + 네 가지 색상
// Level 10~18: 실제 아이템 분류
// ==================================================

export const ShapeSortingLevels: ShapeSortingLevelConfig[] = [
  // ==================================================
  // Level 1~3
  // 단순 도형 4개 / 모든 도형 같은 색상
  // ==================================================

  {
    level: 1,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: BASIC_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 1,
    objectColorMode: "same",
    showHint: true,
  },
  {
    level: 2,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 1,
    objectColorMode: "same",
    showHint: true,
  },
  {
    level: 3,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: ALL_COLORS,
    distinctColorCount: 1,
    objectColorMode: "same",
    showHint: true,
  },

  // ==================================================
  // Level 4~6
  // 단순 도형 4개 / 두 가지 색상
  // 각 색상 2개씩 사용
  // ==================================================

  {
    level: 4,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: BASIC_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 2,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 5,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 2,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 6,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: ALL_COLORS,
    distinctColorCount: 2,
    objectColorMode: "mixed",
    showHint: false,
  },

  // ==================================================
  // Level 7~9
  // 단순 도형 4개 / 서로 다른 색상 4개
  // ==================================================

  {
    level: 7,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: BASIC_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 4,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 8,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: BASIC_COLORS,
    distinctColorCount: 4,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 9,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "same",
    shapePool: ALL_SHAPES,
    colorPool: ALL_COLORS,
    distinctColorCount: 4,
    objectColorMode: "mixed",
    showHint: false,
  },

  // ==================================================
  // Level 10~13
  // 실제 아이템 / 두 가지 도형 종류
  // ==================================================

  {
    level: 10,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "different",
    shapePool: BASIC_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 11,
    rule: "shape",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "different",
    shapePool: ["heart", "star"],
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 12,
    rule: "shape",
    targetCount: 2,
    objectCount: 6,
    objectsPerTarget: 3,
    objectMode: "different",
    shapePool: BASIC_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 13,
    rule: "shape",
    targetCount: 2,
    objectCount: 6,
    objectsPerTarget: 3,
    objectMode: "different",
    shapePool: ["heart", "star"],
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },

  // ==================================================
  // Level 14~16
  // 실제 아이템 / 세 가지 도형 종류
  // ==================================================

  {
    level: 14,
    rule: "shape",
    targetCount: 3,
    objectCount: 6,
    objectsPerTarget: 2,
    objectMode: "different",
    shapePool: BASIC_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 15,
    rule: "shape",
    targetCount: 3,
    objectCount: 9,
    objectsPerTarget: 3,
    objectMode: "different",
    shapePool: BASIC_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
  {
    level: 16,
    rule: "shape",
    targetCount: 3,
    objectCount: 12,
    objectsPerTarget: 4,
    objectMode: "different",
    shapePool: BASIC_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },

  // ==================================================
  // Level 17~18
  // 실제 아이템 / 네 가지 도형 종류
  // ==================================================

  {
    level: 17,
    rule: "shape",
    targetCount: 4,
    objectCount: 12,
    objectsPerTarget: 3,
    objectMode: "different",
    shapePool: ALL_SHAPES,
    colorPool: ALL_COLORS,
    objectColorMode: "mixed",
    showHint: false,
  },
];
