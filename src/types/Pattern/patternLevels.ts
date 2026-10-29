// import type { PatternLevelConfig, PatternShapeColorId } from "./patternTypes";

// const BASIC_COLORS: PatternShapeColorId[] = [
//   "red",
//   "yellow",
//   "green",
//   "blue",
//   "black",
// ];

// const BASIC_SHAPES = ["circle", "square", "triangle", "star", "heart"] as const;

// /**
//  * 패턴놀이 Level Design
//  * 1-12: AB 교차 패턴 + 빈칸 위치 학습
//  * 13-17: AAB / ABB 수량 패턴
//  * 18-20: ABC 세 요소 순환
//  *
//  * random 빈칸 위치는 패턴 생성기에서 정답이 유일하고 규칙이 유지되는
//  * 위치만 허용하도록 처리한다.
//  */
// export const PATTERN_LEVELS: PatternLevelConfig[] = [
//   // Section 1. AB 기본 교차 패턴
//   {
//     level: 1,
//     title: "색깔이 번갈아 나와요",
//     description: "두 가지 색이 번갈아 나오는 규칙을 찾아요.",
//     rule: "AB",
//     elementType: "color",
//     blankPosition: "end",
//     slotCount: 5,
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 2,
//     title: "가운데 빈칸을 채워요",
//     description: "앞뒤의 색을 살펴보고 가운데 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "color",
//     blankPosition: "middle",
//     slotCount: 5,
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 3,
//     title: "첫 번째 빈칸을 채워요",
//     description: "뒤에 이어지는 규칙을 보고 처음 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "color",
//     blankPosition: "start",
//     slotCount: 5,
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 4,
//     title: "모양이 번갈아 나와요",
//     description: "두 가지 모양이 번갈아 나오는 규칙을 찾아요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "end",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 5,
//     title: "모양 패턴의 가운데",
//     description: "모양이 반복되는 규칙을 보고 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "middle",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 6,
//     title: "모양 패턴의 처음",
//     description: "반복되는 모양을 살펴보고 처음 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "start",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 7,
//     title: "모양과 색깔이 함께 바뀌어요",
//     description: "모양과 색깔이 함께 반복되는 규칙을 찾아요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "end",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 8,
//     title: "복합 패턴의 가운데",
//     description: "모양과 색깔을 함께 살펴보고 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "middle",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 9,
//     title: "복합 패턴의 처음",
//     description: "모양과 색깔의 반복 규칙을 찾아 처음 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "shapeColor",
//     blankPosition: "start",
//     slotCount: 5,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 10,
//     title: "사물이 번갈아 나와요",
//     description: "같은 종류의 사물 두 개가 번갈아 나오는 규칙을 찾아요.",
//     rule: "AB",
//     elementType: "item",
//     blankPosition: "end",
//     slotCount: 5,
//     itemSelection: { count: 2, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },
//   {
//     level: 11,
//     title: "사물 패턴의 가운데",
//     description: "반복되는 사물을 살펴보고 가운데 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "item",
//     blankPosition: "middle",
//     slotCount: 5,
//     itemSelection: { count: 2, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },
//   {
//     level: 12,
//     title: "사물 패턴의 처음",
//     description: "사물의 반복 규칙을 찾아 처음 빈칸을 채워요.",
//     rule: "AB",
//     elementType: "item",
//     blankPosition: "start",
//     slotCount: 5,
//     itemSelection: { count: 2, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },

//   // Section 2. AAB / ABB 수량 패턴
//   {
//     level: 13,
//     title: "두 번, 한 번!",
//     description: "같은 색 두 개 다음에 다른 색 하나가 나와요.",
//     rule: "AAB",
//     elementType: "color",
//     blankPosition: "random",
//     slotCount: 7,
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 14,
//     title: "두 번 반복되는 모양",
//     description: "모양과 색깔이 두 번, 한 번 순서로 반복돼요.",
//     rule: "AAB",
//     elementType: "shapeColor",
//     blankPosition: "random",
//     slotCount: 7,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 15,
//     title: "한 번, 두 번!",
//     description: "한 개 다음에 같은 요소 두 개가 나와요.",
//     rule: "ABB",
//     elementType: "shapeColor",
//     blankPosition: "random",
//     slotCount: 7,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 16,
//     title: "사물이 한 번, 두 번",
//     description: "사물 하나 다음에 다른 사물 두 개가 반복돼요.",
//     rule: "ABB",
//     elementType: "item",
//     blankPosition: "random",
//     slotCount: 7,
//     itemSelection: { count: 2, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },
//   {
//     level: 17,
//     title: "사물이 두 번, 한 번",
//     description: "같은 사물 두 개 다음에 다른 사물 하나가 나와요.",
//     rule: "AAB",
//     elementType: "item",
//     blankPosition: "random",
//     slotCount: 7,
//     itemSelection: { count: 2, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },

//   // Section 3. ABC 세 요소 순환 패턴
//   {
//     level: 18,
//     title: "세 가지 색깔 순환",
//     description: "세 가지 색깔이 차례대로 반복돼요.",
//     rule: "ABC",
//     elementType: "color",
//     blankPosition: "random",
//     slotCount: 7,
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 19,
//     title: "세 가지 모양과 색깔",
//     description: "세 가지 모양과 색깔이 차례대로 반복돼요.",
//     rule: "ABC",
//     elementType: "shapeColor",
//     blankPosition: "random",
//     slotCount: 7,
//     allowedShapes: [...BASIC_SHAPES],
//     allowedColors: BASIC_COLORS,
//     randomizeElements: true,
//   },
//   {
//     level: 20,
//     title: "세 가지 사물 순환",
//     description: "같은 종류의 사물 세 개가 차례대로 반복돼요.",
//     rule: "ABC",
//     elementType: "item",
//     blankPosition: "random",
//     slotCount: 7,
//     itemSelection: { count: 3, sameSubCategory: true, excludeUnknown: true },
//     randomizeElements: true,
//   },
// ];

// export const getPatternLevel = (
//   level: number,
// ): PatternLevelConfig | undefined =>
//   PATTERN_LEVELS.find((config) => config.level === level);

import type {
  PatternChoiceConfig,
  PatternLevelConfig,
  PatternShapeColorId,
} from "./patternTypes";

const BASIC_COLORS: PatternShapeColorId[] = [
  "red",
  "yellow",
  "green",
  "blue",
  "black",
];

const BASIC_SHAPES = ["circle", "square", "triangle", "star", "heart"] as const;

const targetChoices: PatternChoiceConfig = {
  base: "patternElements",
  distractors: [],
};

const withDistractors = (
  ...distractors: PatternChoiceConfig["distractors"]
): PatternChoiceConfig => ({
  base: "patternElements",
  distractors,
});

const answerWithDistractor = (
  ...distractors: PatternChoiceConfig["distractors"]
): PatternChoiceConfig => ({
  base: "answer",
  distractors,
});

const makeLevel = (config: PatternLevelConfig): PatternLevelConfig => config;

const colorLevel = (
  level: number,
  subLevel: number,
  title: string,
  rule: PatternLevelConfig["rule"],
  blankPosition: PatternLevelConfig["blankPosition"],
  choiceConfig: PatternChoiceConfig,
): PatternLevelConfig =>
  makeLevel({
    level,
    subLevel,
    title,
    description: "색깔이 반복되는 규칙을 찾아 빈칸을 채워요.",
    rule,
    elementType: "color",
    blankPosition,
    slotCount: rule === "AB" ? 5 : 7,
    allowedColors: BASIC_COLORS,
    choiceConfig,
    randomizeElements: true,
  });

const shapeLevel = (
  level: number,
  subLevel: number,
  title: string,
  rule: PatternLevelConfig["rule"],
  blankPosition: PatternLevelConfig["blankPosition"],
  shapeColorStrategy: NonNullable<PatternLevelConfig["shapeColorStrategy"]>,
  choiceConfig: PatternChoiceConfig,
): PatternLevelConfig =>
  makeLevel({
    level,
    subLevel,
    title,
    description: "모양과 색깔의 반복 규칙을 찾아 빈칸을 채워요.",
    rule,
    elementType: "shapeColor",
    blankPosition,
    slotCount: rule === "AB" ? 5 : 7,
    allowedShapes: [...BASIC_SHAPES],
    allowedColors: BASIC_COLORS,
    shapeColorStrategy,
    choiceConfig,
    randomizeElements: true,
  });

const itemLevel = (
  level: number,
  subLevel: number,
  title: string,
  rule: PatternLevelConfig["rule"],
  blankPosition: PatternLevelConfig["blankPosition"],
  count: 2 | 3,
  choiceConfig: PatternChoiceConfig,
): PatternLevelConfig =>
  makeLevel({
    level,
    subLevel,
    title,
    description: "같은 하위 종류에 속한 사물의 반복 규칙을 찾아요.",
    rule,
    elementType: "item",
    blankPosition,
    slotCount: rule === "AB" ? 5 : 7,
    itemSelection: {
      count,
      sameSubCategory: true,
      excludeUnknown: true,
    },
    choiceConfig,
    randomizeElements: true,
  });

/**
 * 패턴놀이 레벨 설계
 *
 * 세부 난이도 단계까지 모두 독립된 순차 레벨로 펼쳐서 1부터 번호를 부여한다.
 *
 * 선택지에는 항상 정답이 포함된다. choiceConfig.base가 patternElements이면
 * 패턴에 사용된 A/B(/C) 요소를 모두 넣고, answer이면 정답 하나만 기본으로 넣는다.
 */
export const PATTERN_LEVELS: PatternLevelConfig[] = [
  // LEVEL 1-3: 색상 두 개의 AB 반복, 빈칸 위치만 다름
  ...[
    { level: 1, blank: "end" as const, title: "색깔이 번갈아 나와요" },
    { level: 2, blank: "middle" as const, title: "가운데 빈칸을 채워요" },
    { level: 3, blank: "start" as const, title: "처음 빈칸을 채워요" },
  ].flatMap(({ level, blank, title }) => [
    colorLevel(level, 0, title, "AB", blank, targetChoices),
    colorLevel(
      level,
      1,
      `${title} · 다른 색깔도 살펴봐요`,
      "AB",
      blank,
      withDistractors("new-color"),
    ),
  ]),

  // LEVEL 4-6: 두 요소 모두 같은 모양, 색상만 다르게 구성
  ...[
    { level: 4, blank: "end" as const, title: "모양 패턴의 끝" },
    { level: 5, blank: "middle" as const, title: "모양 패턴의 가운데" },
    { level: 6, blank: "start" as const, title: "모양 패턴의 처음" },
  ].flatMap(({ level, blank, title }) => [
    shapeLevel(
      level,
      0,
      title,
      "AB",
      blank,
      "sameShapeDifferentColors",
      targetChoices,
    ),
    shapeLevel(
      level,
      1,
      `${title} · 다른 모양도 살펴봐요`,
      "AB",
      blank,
      "sameShapeDifferentColors",
      withDistractors("new-shape-new-color"),
    ),
    shapeLevel(
      level,
      2,
      `${title} · 같은 모양의 다른 색`,
      "AB",
      blank,
      "sameShapeDifferentColors",
      withDistractors("same-shape-new-color"),
    ),
    shapeLevel(
      level,
      3,
      `${title} · 같은 색의 다른 모양`,
      "AB",
      blank,
      "sameShapeDifferentColors",
      withDistractors("new-shape-same-color"),
    ),
    shapeLevel(
      level,
      4,
      `${title} · 두 가지 모양을 더 살펴봐요`,
      "AB",
      blank,
      "sameShapeDifferentColors",
      withDistractors("new-shape-same-color-each", "new-shape-same-color-each"),
    ),
  ]),

  // LEVEL 7-9: 모양 2개와 색상 2개가 각각 다른 AB 패턴
  ...[
    { level: 7, blank: "end" as const, title: "모양과 색깔이 함께 바뀌어요" },
    { level: 8, blank: "middle" as const, title: "복합 패턴의 가운데" },
    { level: 9, blank: "start" as const, title: "복합 패턴의 처음" },
  ].flatMap(({ level, blank, title }) => [
    shapeLevel(
      level,
      0,
      title,
      "AB",
      blank,
      "differentShapesDifferentColors",
      targetChoices,
    ),
    shapeLevel(
      level,
      1,
      `${title} · 색깔을 바꿔 봐요`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      answerWithDistractor("swapped-color"),
    ),
    shapeLevel(
      level,
      2,
      `${title} · 새로운 모양과 색깔`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("new-shape-new-color"),
    ),
    shapeLevel(
      level,
      3,
      `${title} · 같은 모양의 새로운 색깔`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("same-shape-new-color"),
    ),
    shapeLevel(
      level,
      4,
      `${title} · 새로운 모양과 익숙한 색깔`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("new-shape-same-color"),
    ),
    shapeLevel(
      level,
      5,
      `${title} · 각 모양에 새로운 색깔`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("same-shape-new-color-each", "same-shape-new-color-each"),
    ),
    shapeLevel(
      level,
      6,
      `${title} · 각 색깔에 새로운 모양`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("new-shape-same-color-each", "new-shape-same-color-each"),
    ),
    shapeLevel(
      level,
      7,
      `${title} · 모양과 색깔을 섞어 봐요`,
      "AB",
      blank,
      "differentShapesDifferentColors",
      withDistractors("mixed-shape-color", "mixed-shape-color"),
    ),
  ]),

  // LEVEL 10-12: 같은 하위 카테고리의 사물 두 개 AB 반복
  ...[
    { level: 10, blank: "end" as const, title: "사물이 번갈아 나와요" },
    { level: 11, blank: "middle" as const, title: "사물 패턴의 가운데" },
    { level: 12, blank: "start" as const, title: "사물 패턴의 처음" },
  ].flatMap(({ level, blank, title }) => [
    itemLevel(level, 0, title, "AB", blank, 2, targetChoices),
    itemLevel(
      level,
      1,
      `${title} · 다른 사물 하나`,
      "AB",
      blank,
      2,
      withDistractors("same-subcategory-item"),
    ),
    itemLevel(
      level,
      2,
      `${title} · 다른 사물 둘`,
      "AB",
      blank,
      2,
      withDistractors("same-subcategory-item", "same-subcategory-item"),
    ),
  ]),

  // LEVEL 13: 동그라미 색상으로 AAB 반복
  colorLevel(1, 0, "두 번, 한 번!", "AAB", "random", targetChoices),
  colorLevel(
    2,
    0,
    "두 번, 한 번! · 다른 색깔도 살펴봐요",
    "AAB",
    "random",
    withDistractors("new-color"),
  ),

  // LEVEL 14: 모양은 하나로 고정하고 색상 두 개로 AAB 반복
  shapeLevel(
    3,
    0,
    "두 번 반복되는 모양",
    "AAB",
    "random",
    "sameShapeDifferentColors",
    targetChoices,
  ),
  shapeLevel(
    4,
    0,
    "두 번 반복되는 모양 · 다른 모양",
    "AAB",
    "random",
    "sameShapeDifferentColors",
    withDistractors("new-shape-new-color"),
  ),
  shapeLevel(
    5,
    0,
    "두 번 반복되는 모양 · 같은 모양의 다른 색",
    "AAB",
    "random",
    "sameShapeDifferentColors",
    withDistractors("same-shape-new-color"),
  ),
  shapeLevel(
    6,
    0,
    "두 번 반복되는 모양 · 같은 색의 다른 모양",
    "AAB",
    "random",
    "sameShapeDifferentColors",
    withDistractors("new-shape-same-color"),
  ),
  shapeLevel(
    7,
    0,
    "두 번 반복되는 모양 · 두 가지 다른 모양",
    "AAB",
    "random",
    "sameShapeDifferentColors",
    withDistractors("new-shape-same-color-each", "new-shape-same-color-each"),
  ),

  // LEVEL 15: 모양 2개와 색상 2개가 각각 다른 ABB 반복
  shapeLevel(
    8,
    0,
    "한 번, 두 번!",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    targetChoices,
  ),
  shapeLevel(
    9,
    0,
    "한 번, 두 번! · 색깔을 바꿔 봐요",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    answerWithDistractor("swapped-color"),
  ),
  shapeLevel(
    10,
    0,
    "한 번, 두 번! · 새로운 모양과 색깔",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("new-shape-new-color"),
  ),
  shapeLevel(
    11,
    0,
    "한 번, 두 번! · 같은 모양의 새로운 색깔",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("same-shape-new-color"),
  ),
  shapeLevel(
    12,
    0,
    "한 번, 두 번! · 새로운 모양과 익숙한 색깔",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("new-shape-same-color"),
  ),
  shapeLevel(
    13,
    0,
    "한 번, 두 번! · 각 모양에 새로운 색깔",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("same-shape-new-color-each", "same-shape-new-color-each"),
  ),
  shapeLevel(
    14,
    0,
    "한 번, 두 번! · 각 색깔에 새로운 모양",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("new-shape-same-color-each", "new-shape-same-color-each"),
  ),
  shapeLevel(
    15,
    0,
    "한 번, 두 번! · 모양과 색깔을 섞어 봐요",
    "ABB",
    "random",
    "differentShapesDifferentColors",
    withDistractors("mixed-shape-color", "mixed-shape-color"),
  ),

  // LEVEL 16-17: 같은 하위 카테고리의 사물 두 개로 ABB 반복
  itemLevel(16, 0, "사물이 한 번, 두 번", "ABB", "random", 2, targetChoices),
  itemLevel(
    17,
    0,
    "사물이 한 번, 두 번 · 다른 사물 하나",
    "ABB",
    "random",
    2,
    withDistractors("same-subcategory-item"),
  ),
  itemLevel(
    18,
    0,
    "사물이 한 번, 두 번 · 다른 사물 둘",
    "ABB",
    "random",
    2,
    withDistractors("same-subcategory-item", "same-subcategory-item"),
  ),
  itemLevel(19, 0, "사물이 두 번, 한 번", "ABB", "random", 2, targetChoices),
  itemLevel(
    20,
    0,
    "사물이 두 번, 한 번 · 다른 사물 하나",
    "ABB",
    "random",
    2,
    withDistractors("same-subcategory-item"),
  ),
  itemLevel(
    21,
    0,
    "사물이 두 번, 한 번 · 다른 사물 둘",
    "ABB",
    "random",
    2,
    withDistractors("same-subcategory-item", "same-subcategory-item"),
  ),

  // LEVEL 18: 동그라미 색상 세 가지 ABC 순환
  colorLevel(22, 0, "세 가지 색깔 순환", "ABC", "random", targetChoices),
  colorLevel(
    23,
    0,
    "세 가지 색깔 순환 · 다른 색깔도 살펴봐요",
    "ABC",
    "random",
    withDistractors("new-color"),
  ),

  // LEVEL 19: 서로 다른 모양 3개와 서로 다른 색상 3개를 고정 짝짓기 후 ABC 순환
  shapeLevel(
    24,
    0,
    "세 가지 모양과 색깔",
    "ABC",
    "random",
    "differentShapesDifferentColors",
    targetChoices,
  ),
  shapeLevel(
    25,
    0,
    "세 가지 모양과 색깔 · 새로운 모양과 색깔",
    "ABC",
    "random",
    "differentShapesDifferentColors",
    withDistractors("new-shape-new-color"),
  ),
  shapeLevel(
    26,
    0,
    "세 가지 모양과 색깔 · 새로운 색깔",
    "ABC",
    "random",
    "differentShapesDifferentColors",
    withDistractors("same-shape-new-color"),
  ),
  shapeLevel(
    27,
    0,
    "세 가지 모양과 색깔 · 새로운 모양",
    "ABC",
    "random",
    "differentShapesDifferentColors",
    withDistractors("new-shape-same-color"),
  ),

  // LEVEL 20: 같은 하위 카테고리의 사물 세 개 ABC 순환
  itemLevel(28, 0, "세 가지 사물 순환", "ABC", "random", 3, targetChoices),
  itemLevel(
    29,
    0,
    "세 가지 사물 순환 · 다른 사물 하나",
    "ABC",
    "random",
    3,
    withDistractors("same-subcategory-item"),
  ),
].map((config, index) => ({
  ...config,
  level: index + 1,
  subLevel: 0,
}));

export const getPatternLevel = (
  level: number,
): PatternLevelConfig | undefined =>
  PATTERN_LEVELS.find((config) => config.level === level);

/** 모든 패턴 단계가 독립된 레벨이므로 각 레벨의 하위 레벨은 없다. */
export const getPatternSubLevels = (_level: number): number[] => [0];
