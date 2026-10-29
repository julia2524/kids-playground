// import {
//   ClassificationColorId,
//   ClassificationItem,
//   ClassificationShape,
//   ClassificationSubCategory,
// } from "../game";

// /** AB = A-B 반복, AAB = A-A-B 반복, ABB = A-B-B 반복, ABC = A-B-C 순환 */
// export type PatternRule = "AB" | "AAB" | "ABB" | "ABC";

// export type PatternBlankPosition = "end" | "middle" | "start" | "random";
// export type PatternElementType = "color" | "shapeColor" | "item";
// export type PatternShapeColorId = Exclude<ClassificationColorId, "natural">;

// export type PatternElement =
//   | { kind: "color"; colorId: PatternShapeColorId }
//   | { kind: "shape"; shape: ClassificationShape; colorId: PatternShapeColorId }
//   | { kind: "item"; item: ClassificationItem };

// /** 실제 사물은 같은 하위 카테고리 안에서 서로 다른 아이템을 선택할 수 있다. */
// export type PatternItemSelection = {
//   count: 2 | 3;
//   sameSubCategory: boolean;
//   /** 지정하면 해당 하위 카테고리로 제한. 생략하면 조건에 맞는 하위 카테고리를 선택한다. */
//   subCategory?: ClassificationSubCategory;
//   excludeUnknown?: boolean;
// };

// export type PatternLevelConfig = {
//   level: number;
//   title: string;
//   description: string;
//   rule: PatternRule;
//   elementType: PatternElementType;
//   blankPosition: PatternBlankPosition;
//   /** 물음표 칸을 포함한 전체 슬롯 수 */
//   slotCount: 5 | 7;
//   allowedShapes?: ClassificationShape[];
//   allowedColors?: PatternShapeColorId[];
//   itemSelection?: PatternItemSelection;
//   /** 각 라운드에서 후보 요소를 새로 선택할 수 있는 레벨인지 */
//   randomizeElements: boolean;
// };

// /** 생성기에서 반환하는 한 라운드의 패턴 결과 */
// export type GeneratedPattern = {
//   level: number;
//   rule: PatternRule;
//   /** null은 물음표 빈칸 */
//   sequence: Array<PatternElement | null>;
//   blankIndex: number;
//   answer: PatternElement;
//   choices: PatternElement[];
// };

import {
  ClassificationColorId,
  ClassificationItem,
  ClassificationShape,
  ClassificationSubCategory,
} from "../game";

/** AB = A-B 반복, AAB = A-A-B 반복, ABB = A-B-B 반복, ABC = A-B-C 순환 */
export type PatternRule = "AB" | "AAB" | "ABB" | "ABC";
export type PatternBlankPosition = "end" | "middle" | "start" | "random";
export type PatternElementType = "color" | "shapeColor" | "item";
export type PatternShapeColorId = Exclude<ClassificationColorId, "natural">;

/**
 * shapeColor 요소를 뽑는 방식.
 * - sameShapeDifferentColors: 모양은 하나로 고정하고 색상만 다르게 선택
 * - differentShapesDifferentColors: 모양과 색상을 각각 중복 없이 선택해 짝짓기
 * - independent: 모양/색상 조합 전체에서 선택
 */
export type PatternShapeColorStrategy =
  | "sameShapeDifferentColors"
  | "differentShapesDifferentColors"
  | "independent";

export type PatternElement =
  | { kind: "color"; colorId: PatternShapeColorId }
  | { kind: "shape"; shape: ClassificationShape; colorId: PatternShapeColorId }
  | { kind: "item"; item: ClassificationItem };

export type PatternItemSelection = {
  /** 패턴에 사용할 서로 다른 사물 수 */
  count: 2 | 3;
  sameSubCategory: boolean;
  /** 지정하면 해당 하위 카테고리로 제한. 생략하면 조건에 맞는 하위 카테고리를 선택한다. */
  subCategory?: ClassificationSubCategory;
  excludeUnknown?: boolean;
};

/**
 * 오답 생성 규칙. 선택지는 항상 정답을 포함한다.
 * * new-color: 패턴에 없는 색상
 * * new-shape-new-color: 패턴에 없는 모양과 색상 조합
 * * same-shape-new-color: 패턴에 등장한 모양 + 패턴에 없는 색상
 * * new-shape-same-color: 패턴에 없는 모양 + 패턴에 등장한 색상
 * * same-shape-new-color-each: 각 패턴 모양마다 새로운 색상을 하나씩 사용
 * * new-shape-same-color-each: 각 패턴 색상마다 새로운 모양을 하나씩 사용
 * * mixed-shape-color: 패턴에 등장한 모양과 색상을 사용하되 기존 짝은 제외
 * * swapped-color: 정답 모양에 다른 패턴 요소의 색상을 적용
 * * same-subcategory-item: 패턴 사물과 같은 하위 카테고리의 다른 사물
 */
export type PatternDistractorRule =
  | "new-color"
  | "new-shape-new-color"
  | "same-shape-new-color"
  | "new-shape-same-color"
  | "same-shape-new-color-each"
  | "new-shape-same-color-each"
  | "mixed-shape-color"
  | "swapped-color"
  | "same-subcategory-item";

export type PatternChoiceConfig = {
  /** patternElements: 모든 패턴 요소를 선택지에 포함, answer: 정답만 기본 선택지로 포함 */
  base: "patternElements" | "answer";
  /** 각 규칙은 오답 하나를 생성한다. 같은 규칙을 여러 번 지정할 수 있다. */
  distractors: PatternDistractorRule[];
};

export type PatternLevelConfig = {
  /** 독립적으로 진행되는 순차 레벨 번호 */
  level: number;
  /** 호환성을 위해 유지하며, 순차 레벨에서는 항상 0 */
  subLevel: number;
  title: string;
  description: string;
  rule: PatternRule;
  elementType: PatternElementType;
  blankPosition: PatternBlankPosition;
  /** 물음표 칸을 포함한 전체 슬롯 수 */
  slotCount: 5 | 7;
  allowedShapes?: ClassificationShape[];
  allowedColors?: PatternShapeColorId[];
  itemSelection?: PatternItemSelection;
  shapeColorStrategy?: PatternShapeColorStrategy;
  /** 레벨별로 정해진 선택지/오답 구성 */
  choiceConfig: PatternChoiceConfig;
  /** 각 라운드에서 패턴 요소를 새로 선택할 수 있는 레벨인지 */
  randomizeElements: boolean;
};

/** 생성기에서 반환하는 한 라운드의 패턴 결과 */
export type GeneratedPattern = {
  level: number;
  subLevel: number;
  rule: PatternRule;
  /** null은 물음표 빈칸 */
  sequence: Array<PatternElement | null>;
  blankIndex: number;
  answer: PatternElement;
  choices: PatternElement[];
};
