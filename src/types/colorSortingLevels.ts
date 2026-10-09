import { ColorSortingLevelConfig } from "./colorSotringTypes";
import { ClassificationColorId } from "./game";

// 프리셋 정의
const BASIC_COLORS: ClassificationColorId[] = [
  "red",
  "blue",
  "yellow",
  "green",
  "black",
  "white",
];

const ALL_COLORS: ClassificationColorId[] = [
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

export const colorSortingLevels: ColorSortingLevelConfig[] = [
  // ==================================================
  // LEVEL 1
  // 단순도형 2가지 / 기본 6색 중 2개 선택
  // ==================================================
  {
    level: 1,
    rule: "color",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "simple_same_shape",
    colorCount: 2,
    showHint: true,
    colorPool: BASIC_COLORS,
    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 2
  // 단순도형 2가지 / 확장 10색 중 2개 선택
  // ==================================================
  {
    level: 2,
    rule: "color",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    objectMode: "simple_same_shape",
    colorCount: 2,
    showHint: true,
    colorPool: ALL_COLORS,
    completionEffect: "none",
  },
  // ==================================================
  // LEVEL 3
  // 2색 입문
  //
  // 목표:
  // 색깔을 기준으로 물건을 같은 그룹에 넣는
  // 게임 규칙을 이해한다.
  //
  // 2 colors
  // 2 targets
  // 4 objects
  // simple shapes
  // ==================================================

  {
    level: 3,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "simple",

    colorCount: 2,

    showHint: true,
    colorPool: BASIC_COLORS,

    completionEffect: "none",
  },
  {
    level: 4,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "simple",

    colorCount: 2,

    showHint: true,
    colorPool: ALL_COLORS,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 4
  // 같은 종류, 다른 색
  //
  // 목표:
  // 같은 물건이라도 색깔이 다르면
  // 다른 그룹에 들어간다는 것을 이해한다.
  //
  // 2 colors
  // 2 targets
  // 4 objects
  // same type
  // ==================================================

  {
    level: 5,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "same_type",

    colorCount: 2,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "none",
  },

  {
    level: 6,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "same_type",

    colorCount: 2,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "none",
  },
  // ==================================================
  // LEVEL 5
  // 서로 다른 종류, 같은 색
  //
  // 목표:
  // 서로 다른 물건도 같은 색이면
  // 같은 그룹으로 분류한다.
  //
  // 2 colors
  // 2 targets
  // 4 objects
  // different types
  // ==================================================

  {
    level: 7,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 2,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "none",
  },
  {
    level: 8,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 2,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 6
  // 서로 다른 종류 + 6개
  //
  // 목표:
  // 물건의 종류가 다양해져도
  // 색깔이라는 기준을 유지하여 분류한다.
  //
  // 2 colors
  // 2 targets
  // 6 objects
  // 3 objects per color
  // different types
  // ==================================================

  {
    level: 9,

    rule: "color",

    targetCount: 2,

    objectCount: 6,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 2,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "none",
  },
  {
    level: 10,

    rule: "color",

    targetCount: 2,

    objectCount: 6,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 2,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 7
  // 3색 분류
  //
  // 목표:
  // 분류해야 할 색상이 3개로 증가한다.
  //
  // 3 colors
  // 3 targets
  // 6 objects
  // 2 objects per color
  // different types
  // ==================================================

  {
    level: 11,

    rule: "color",

    targetCount: 3,

    objectCount: 6,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 3,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 8
  // 3색 + 색상 조합 변화
  //
  // 목표:
  // 3개의 색상 그룹을 유지하면서
  // 다양한 색상 조합을 구별한다.
  //
  // 색상 수는 동일하게 3개.
  // 실제 색상 조합은 Round마다 Generator가 변경.
  //
  // 3 colors
  // 3 targets
  // 6 objects
  // 2 objects per color
  // different types
  // ==================================================

  {
    level: 12,

    rule: "color",

    targetCount: 3,

    objectCount: 6,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 3,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 9
  // 4색 종합
  //
  // 목표:
  // 4개의 색상 그룹을 동시에 구분하고
  // 분류한다.
  //
  // 4 colors
  // 4 targets
  // 8 objects
  // 2 objects per color
  // different types
  // ==================================================

  {
    level: 13,

    rule: "color",

    targetCount: 4,

    objectCount: 8,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 4,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "color_king",
  },
  {
    level: 14,

    rule: "color",

    targetCount: 4,

    objectCount: 8,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 4,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "color_king",
  },

  // ==================================================
  // LEVEL 10
  // 4색 + 다양한 색상 조합
  //
  // 목표:
  // 색상 조합이 달라져도
  // 색깔을 기준으로 안정적으로 분류한다.
  //
  // 색상 수는 동일하게 4개.
  // 실제 색상 조합은 Round마다 Generator가 변경.
  //
  // 4 colors
  // 4 targets
  // 12 objects
  // 3 objects per color
  // different types
  // ==================================================
  {
    level: 15,

    rule: "color",

    targetCount: 4,

    objectCount: 12,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 4,

    showHint: false,
    colorPool: BASIC_COLORS,

    completionEffect: "color_king",
  },

  {
    level: 16,

    rule: "color",

    targetCount: 4,

    objectCount: 12,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 4,

    showHint: false,
    colorPool: ALL_COLORS,

    completionEffect: "color_king",
  },
];
