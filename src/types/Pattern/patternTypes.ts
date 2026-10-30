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

export type PatternElement =
  | { kind: "color"; colorId: PatternShapeColorId }
  | { kind: "shape"; shape: ClassificationShape; colorId: PatternShapeColorId }
  | { kind: "item"; item: ClassificationItem };

/** 실제 사물은 같은 하위 카테고리 안에서 서로 다른 아이템을 선택할 수 있다. */
export type PatternItemSelection = {
  count: 2 | 3;
  sameSubCategory: boolean;
  /** 지정하면 해당 하위 카테고리로 제한. 생략하면 조건에 맞는 하위 카테고리를 선택한다. */
  subCategory?: ClassificationSubCategory;
  excludeUnknown?: boolean;
};

/**
 * Target(패턴에 등장하는 요소) 생성 방식.
 * - colors            : 색 동그라미 (kind: "color")
 * - sameShapeColors   : 모양은 1개로 고정, 색상만 서로 다름 (Level 4~6, 14 계열)
 * - mixedShapeColors  : 모양 N개 × 색상 N개를 1:1로 짝지음. 모양/색상 모두 서로 다름 (Level 7~9, 15 계열)
 * - pairedShapeColors : 모양 3개 + 색상 3개를 먼저 뽑고 1:1로 짝지어 ABC 순환 (Level 19 계열)
 * - items             : 실제 사물 (같은 subCategory)
 */
export type PatternTargetMode =
  | "colors"
  | "sameShapeColors"
  | "mixedShapeColors"
  | "pairedShapeColors"
  | "items";

/**
 * 하위 단계별 방해 요소(distractor) 규칙.
 * - none                : 방해 요소 없음 (선택지 = Target 요소들)
 * - otherColor          : Target에 없는 색의 동그라미
 * - newShapeNewColor    : Target에 없는 모양 + Target에 없는 색
 * - targetShapeNewColor : Target에 있는 모양 + Target에 없는 색
 * - newShapeTargetColor : Target에 없는 모양 + Target에 있는 색
 * - swapBothColors      : Target 2개의 색을 서로 맞바꾼 요소 2개 (A모양+B색, B모양+A색).
 *                         선택지 = [정답, 뒤바뀐 요소 2개]  (예: 💚🟣 → 💜🟢)
 * - swapAllColors       : swapBothColors와 같은 요소 2개. 단, 선택지 = [Target 2개 + 뒤바뀐 요소 2개]
 * - sameSubCategory     : Target과 같은 subCategory의 다른 사물
 */
export type PatternDistractorRule =
  | "none"
  | "otherColor"
  | "newShapeNewColor"
  | "targetShapeNewColor"
  | "newShapeTargetColor"
  | "swapBothColors"
  | "swapAllColors"
  | "sameSubCategory";

export type PatternDistractorSpec = {
  rule: PatternDistractorRule;
  /** 방해 요소 개수 (none이면 0) */
  count: number;
};

export type PatternLevelConfig = {
  /** 1~83: 하위 단계까지 펼친 독립 레벨 번호 */
  level: number;
  /** 기존 기획의 레벨 번호 (1~20) */
  legacyLevel: number;
  /** 기존 기획 안에서의 하위 단계 번호 (예: 7-3 이면 3) */
  subLevel: number;
  /** 기존 기획 표기 (예: "7-3") */
  stageId: string;
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
  /** 각 라운드에서 후보 요소를 새로 선택할 수 있는 레벨인지 */
  randomizeElements: boolean;

  /** Target 생성 방식 */
  targetMode: PatternTargetMode;
  /** 패턴에 등장하는 서로 다른 Target 요소 수 (ABC는 3, 나머지는 2) */
  targetCount: 2 | 3;
  /** 하위 단계별 방해 요소 규칙 */
  distractor: PatternDistractorSpec;
  /** 정답을 포함한 선택지 총 개수 */
  choiceCount: number;
};

/** 생성기에서 반환하는 한 라운드의 패턴 결과 */
export type GeneratedPattern = {
  level: number;
  rule: PatternRule;
  /** null은 물음표 빈칸 */
  sequence: Array<PatternElement | null>;
  blankIndex: number;
  answer: PatternElement;
  choices: PatternElement[];

  /** 아래는 선택 필드: 기존 사용처와의 호환을 위해 optional로 둔다. */
  /** 기존 기획 표기 (예: "7-3") */
  stageId?: string;
  legacyLevel?: number;
  /** 패턴에 등장하는 Target 요소 (순서 = A, B, C) */
  targets?: PatternElement[];
  /** 선택지 중 방해 요소 */
  distractors?: PatternElement[];
  distractorRule?: PatternDistractorRule;
  /** 사물 레벨에서 선택된 하위 카테고리 */
  subCategory?: ClassificationSubCategory;
};
