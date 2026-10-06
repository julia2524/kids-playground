import { ColorSortingLevelConfig } from "./colorSotringTypes";

export const colorSortingLevels: ColorSortingLevelConfig[] = [
  // ==================================================
  // LEVEL 1
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
    level: 1,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "simple",

    colorCount: 2,

    showHint: true,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 2
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
    level: 2,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "same_type",

    colorCount: 2,

    showHint: false,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 3
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
    level: 3,

    rule: "color",

    targetCount: 2,

    objectCount: 4,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 2,

    showHint: false,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 4
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
    level: 4,

    rule: "color",

    targetCount: 2,

    objectCount: 6,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 2,

    showHint: false,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 5
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
    level: 5,

    rule: "color",

    targetCount: 3,

    objectCount: 6,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 3,

    showHint: false,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 6
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
    level: 6,

    rule: "color",

    targetCount: 3,

    objectCount: 6,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 3,

    showHint: false,

    completionEffect: "none",
  },

  // ==================================================
  // LEVEL 7
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
    level: 7,

    rule: "color",

    targetCount: 4,

    objectCount: 8,

    objectsPerTarget: 2,

    objectMode: "different",

    colorCount: 4,

    showHint: false,

    completionEffect: "color_king",
  },

  // ==================================================
  // LEVEL 8
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
  // 8 objects
  // 2 objects per color
  // different types
  // ==================================================

  {
    level: 8,

    rule: "color",

    targetCount: 4,

    objectCount: 12,

    objectsPerTarget: 3,

    objectMode: "different",

    colorCount: 4,

    showHint: false,

    completionEffect: "color_king",
  },
];
