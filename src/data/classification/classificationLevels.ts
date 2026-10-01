/** 색상 variant id */
export type ColorId = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/** 기본 도형 */
export type ShapeId = "circle" | "triangle" | "square" | "star" | "heart";

/** 카테고리 (종류) */
export type CategoryId =
  | "animal"
  | "food"
  | "fruit"
  | "vehicle"
  | "tool"
  | "shape"
  | "object";

/** 위치 */
export type PositionId =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "inside"
  | "outside";

/** 크기 레벨 (비교용) */
export type SizeLevel = "small" | "medium" | "large";

/** 아이템 정의 (너가 준 데이터 구조 기반) */
export interface ItemVariant {
  id: ColorId;
  primary: string;
  secondary: string;
  accent: string;
}

export interface GameItem {
  id: string;
  name: string; // 표시용 이름 (예: "국/스프")
  topCategory: string; // "food" 등
  subCategory: string; // "meal" 등
  svgKey: string;
  shape: ShapeId[]; // 여러 개 가능 (TODO: shapePool 연결)
  description: string;
  variants: ItemVariant[];
  // 확장 필드 (generator에서 사용)
  category?: CategoryId; // 명시적 카테고리 (없으면 topCategory 매핑)
  defaultSize?: SizeLevel;
}

/** 문제에서 실제로 렌더링되는 선택지 하나 */
export interface Choice {
  id: string; // unique key
  itemId: string;
  color: ColorId;
  shape?: ShapeId;
  size: SizeLevel;
  position?: PositionId; // 위치 문제일 때
  quantity?: number; // 수량 문제일 때 (그룹 단위)
  isCorrect: boolean;
}

/** 생성되는 문제 */
export interface Question {
  level: number;
  prompt: string; // "빨간색인 것을 찾아보세요."
  promptKey: string; // i18n 키 (선택)
  choices: Choice[];
  correctIds: string[]; // 복수 정답 가능 (NOT 레벨)
  meta: {
    attributes: Attribute[]; // 이 레벨에서 사용하는 속성들
    isNegation?: boolean;
    choiceCount: number;
  };
}

/** 레벨에서 다루는 속성 */
export type Attribute =
  | "color"
  | "shape"
  | "category"
  | "size"
  | "quantity"
  | "position";

/** 레벨 설정 */
export interface LevelConfig {
  level: number;
  chapter: number;
  name: string;
  description: string;
  educationalGoal: string;

  /** 사용하는 속성들 */
  attributes: Attribute[];

  /** 선택지 개수 */
  choiceCount: 2 | 3 | 4;

  /** 복수 정답 허용 여부 (NOT 레벨) */
  allowMultipleCorrect?: boolean;

  /** 부정 조건 여부 */
  isNegation?: boolean;

  /** 비교 판단인지 (가장 큰 / 가장 많은 등) */
  isComparative?: boolean;

  /** 프롬프트 템플릿 키 */
  promptTemplate:
    | "find_color"
    | "find_shape"
    | "find_category"
    | "find_size"
    | "find_largest"
    | "find_quantity"
    | "find_most"
    | "find_position"
    | "find_color_and_category"
    | "find_shape_and_category"
    | "find_color_and_size"
    | "find_category_and_size"
    | "find_largest_category"
    | "find_position_and_color"
    | "find_position_and_category"
    | "find_quantity_and_category"
    | "find_three_conditions"
    | "find_size_color_category"
    | "find_position_quantity_category"
    | "find_not_color"
    | "find_not_color_and_category";

  /** 오답 생성 전략 힌트 */
  distractorStrategy:
    | "same_item_diff_color"
    | "same_color_diff_item"
    | "same_shape_diff_category"
    | "same_category_diff_size"
    | "position_swap"
    | "quantity_swap"
    | "mixed" // 핵심 오답 + 완전 오답 섞기
    | "category_swap" // 범주 교체 (L3) //추가
    | "negation_filter"; // NOT 조건을 고려한 오답 (L24) //추가

  //     distractorStrategy:
  //   | "same_item_diff_color"       // 같은 아이템, 다른 색상 (L1, L22, L23)
  //   | "same_shape_diff_category"   // 같은 모양, 다른 카테고리 (L2)
  //   | "same_category_diff_size"    // 같은 카테고리, 다른 크기 (L4, L5, L13, L14)
  //   | "same_color_diff_item"       // 같은 색상, 다른 아이템
  //   | "position_swap"              // 위치 반전/교체 (L8, L9)
  //   | "quantity_swap"              // 수량 변주 (L6, L7)
  //   | "mixed";                     // 핵심 오답(매력적 오답) + 완전 오답 혼합
}

// ============================================================
// levelConfig.ts
// ============================================================

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  // ─────────────────────────────────────────────
  // CHAPTER 1: 하나의 특징을 찾아요 (단순 인식)
  // ─────────────────────────────────────────────
  1: {
    level: 1,
    chapter: 1,
    name: "색상을 찾아요",
    description: "색상을 기준으로 대상을 구별한다.",
    educationalGoal: "색상 인식 및 구별",
    attributes: ["color"],
    choiceCount: 4,
    promptTemplate: "find_color",
    distractorStrategy: "same_item_diff_color",
  },
  2: {
    level: 2,
    chapter: 1,
    name: "모양을 찾아요",
    description: "형태의 특징을 관찰하고 같은 모양을 분류한다.",
    educationalGoal: "형태 인식 및 분류",
    attributes: ["shape"],
    choiceCount: 4,
    promptTemplate: "find_shape",
    distractorStrategy: "same_shape_diff_category",
  },
  3: {
    level: 3,
    chapter: 1,
    name: "종류를 찾아요",
    description: "대상을 범주에 따라 분류한다.",
    educationalGoal: "범주 분류",
    attributes: ["category"],
    choiceCount: 4,
    promptTemplate: "find_category",
    distractorStrategy: "mixed",
  },
  4: {
    level: 4,
    chapter: 1,
    name: "크기를 찾아요 (단순)",
    description: "크기라는 속성을 기준으로 분류한다.",
    educationalGoal: "크기 구별 (2지 선다)",
    attributes: ["size"],
    choiceCount: 2,
    promptTemplate: "find_size",
    distractorStrategy: "same_category_diff_size",
  },

  // ─────────────────────────────────────────────
  // CHAPTER 2: 특징을 비교해요 (비교 판단)
  // ─────────────────────────────────────────────
  5: {
    level: 5,
    chapter: 2,
    name: "가장 큰 것을 찾아요",
    description: "동일한 기준에서 여러 대상을 비교하여 최상위 값을 찾는다.",
    educationalGoal: "크기 비교 판단",
    attributes: ["size"],
    choiceCount: 3,
    isComparative: true,
    promptTemplate: "find_largest",
    distractorStrategy: "same_category_diff_size",
  },
  6: {
    level: 6,
    chapter: 2,
    name: "수량을 찾아요 (2지)",
    description: "수량을 인식하고 주어진 수량과 비교한다.",
    educationalGoal: "수량 비교 (많음/적음)",
    attributes: ["quantity"],
    choiceCount: 2,
    promptTemplate: "find_quantity",
    distractorStrategy: "quantity_swap",
  },
  7: {
    level: 7,
    chapter: 2,
    name: "수량을 찾아요 (3지)",
    description: "수량을 인식하고 주어진 수량과 비교한다.",
    educationalGoal: "수량 비교 (가장 많음/적음)",
    attributes: ["quantity"],
    choiceCount: 3,
    isComparative: true,
    promptTemplate: "find_most",
    distractorStrategy: "quantity_swap",
  },
  8: {
    level: 8,
    chapter: 2,
    name: "위치를 찾아요 (2지)",
    description: "공간적 위치를 이해하고 조건에 맞는 대상을 선택한다.",
    educationalGoal: "위치 인식",
    attributes: ["position"],
    choiceCount: 2,
    promptTemplate: "find_position",
    distractorStrategy: "position_swap",
  },
  9: {
    level: 9,
    chapter: 2,
    name: "위치를 찾아요 (3지)",
    description: "공간적 위치를 이해하고 조건에 맞는 대상을 선택한다.",
    educationalGoal: "위치 인식 (3지)",
    attributes: ["position"],
    choiceCount: 3,
    promptTemplate: "find_position",
    distractorStrategy: "position_swap",
  },

  // ─────────────────────────────────────────────
  // CHAPTER 3~4: 두 가지 특징을 동시에 봐요
  // ─────────────────────────────────────────────
  10: {
    level: 10,
    chapter: 3,
    name: "색상 + 종류",
    description: "두 가지 조건을 동시에 만족하는 대상 찾기.",
    educationalGoal: "색상 + 범주 동시 판단",
    attributes: ["color", "category"],
    choiceCount: 4,
    promptTemplate: "find_color_and_category",
    distractorStrategy: "mixed", // 색만 맞음 / 종류만 맞음
  },
  11: {
    level: 11,
    chapter: 3,
    name: "모양 + 종류",
    description: "모양과 종류를 동시에 판단한다.",
    educationalGoal: "형태 + 범주 동시 판단",
    attributes: ["shape", "category"],
    choiceCount: 4,
    promptTemplate: "find_shape_and_category",
    distractorStrategy: "mixed",
  },
  12: {
    level: 12,
    chapter: 3,
    name: "색상 + 크기",
    description: "두 가지 시각 속성을 동시에 판단한다.",
    educationalGoal: "색상 + 크기 동시 판단",
    attributes: ["color", "size"],
    choiceCount: 4,
    promptTemplate: "find_color_and_size",
    distractorStrategy: "mixed",
  },
  13: {
    level: 13,
    chapter: 4,
    name: "종류 + 크기 (단순)",
    description: "크기라는 속성을 기준으로 분류한다.",
    educationalGoal: "범주 + 크기 단순 구별",
    attributes: ["category", "size"],
    choiceCount: 2,
    promptTemplate: "find_category_and_size",
    distractorStrategy: "same_category_diff_size",
  },
  14: {
    level: 14,
    chapter: 4,
    name: "종류 + 크기 (비교)",
    description: "동일한 기준에서 여러 대상을 비교하여 최상위 값을 찾는다.",
    educationalGoal: "범주 안에서 크기 비교",
    attributes: ["category", "size"],
    choiceCount: 3,
    isComparative: true,
    promptTemplate: "find_largest_category",
    distractorStrategy: "same_category_diff_size",
  },
  15: {
    level: 15,
    chapter: 4,
    name: "종류 + 크기 (4지)",
    description: "크기와 종류를 동시에 고려한 4지 선다.",
    educationalGoal: "범주 + 크기 복합 판단",
    attributes: ["category", "size"],
    choiceCount: 4,
    promptTemplate: "find_category_and_size",
    distractorStrategy: "mixed",
  },

  // ─────────────────────────────────────────────
  // CHAPTER 5: 공간과 수량을 생각해요
  // ─────────────────────────────────────────────
  16: {
    level: 16,
    chapter: 5,
    name: "위치 + 색상",
    description: "공간 정보와 색상 정보를 동시에 처리한다.",
    educationalGoal: "위치 + 색상 동시 판단",
    attributes: ["position", "color"],
    choiceCount: 4,
    promptTemplate: "find_position_and_color",
    distractorStrategy: "mixed",
  },
  17: {
    level: 17,
    chapter: 5,
    name: "위치 + 종류",
    description: "공간 정보와 범주 정보를 동시에 처리한다.",
    educationalGoal: "위치 + 범주 동시 판단",
    attributes: ["position", "category"],
    choiceCount: 4,
    promptTemplate: "find_position_and_category",
    distractorStrategy: "mixed",
  },
  18: {
    level: 18,
    chapter: 5,
    name: "수량 + 종류 (3지)",
    description: "수량과 범주를 동시에 판단한다.",
    educationalGoal: "수량 + 범주 동시 판단",
    attributes: ["quantity", "category"],
    choiceCount: 3,
    promptTemplate: "find_quantity_and_category",
    distractorStrategy: "mixed",
  },
  19: {
    level: 19,
    chapter: 5,
    name: "수량 + 종류 (4지)",
    description: "수량과 범주를 동시에 판단한다.",
    educationalGoal: "수량 + 범주 동시 판단 (4지)",
    attributes: ["quantity", "category"],
    choiceCount: 4,
    promptTemplate: "find_quantity_and_category",
    distractorStrategy: "mixed",
  },
  20: {
    level: 20,
    chapter: 5,
    name: "3가지 조건 (크기+색상+종류)",
    description:
      "세 가지 속성을 동시에 비교하고 조건을 만족하는 대상을 선택한다.",
    educationalGoal: "3속성 동시 판단",
    attributes: ["size", "color", "category"],
    choiceCount: 4,
    promptTemplate: "find_size_color_category", //find_three_conditions에서 교체
    distractorStrategy: "mixed",
  },
  21: {
    level: 21,
    chapter: 5,
    name: "3가지 조건 (위치+수량+종류)",
    description: "위치, 수량, 종류를 동시에 판단한다.",
    educationalGoal: "위치 + 수량 + 범주 동시 판단",
    attributes: ["position", "quantity", "category"],
    choiceCount: 4,
    promptTemplate: "find_position_quantity_category", //find_three_conditions에서 교체
    distractorStrategy: "mixed",
  },

  // ─────────────────────────────────────────────
  // CHAPTER 6: 조건을 뒤집어 생각해요 (부정 조건)
  // ─────────────────────────────────────────────
  22: {
    level: 22,
    chapter: 6,
    name: "단순 NOT (2지)",
    description: "부정 조건을 이해하고 해당하지 않는 것을 찾는다.",
    educationalGoal: "부정 조건 이해",
    attributes: ["color"],
    choiceCount: 2,
    isNegation: true,
    allowMultipleCorrect: false,
    promptTemplate: "find_not_color",
    distractorStrategy: "same_item_diff_color",
  },
  23: {
    level: 23,
    chapter: 6,
    name: "단순 NOT (3지 + 복수정답)",
    description: "부정 조건을 이해하고 해당하지 않는 것들을 모두 찾는다.",
    educationalGoal: "부정 조건 + 복수 정답",
    attributes: ["color"],
    choiceCount: 3,
    isNegation: true,
    allowMultipleCorrect: true,
    promptTemplate: "find_not_color",
    distractorStrategy: "same_item_diff_color",
  },
  24: {
    level: 24,
    chapter: 6,
    name: "NOT + 종류",
    description: "부정 조건과 범주를 동시에 판단한다.",
    educationalGoal: "부정 + 범주 동시 판단",
    attributes: ["color", "category"],
    choiceCount: 4,
    isNegation: true,
    allowMultipleCorrect: true,
    promptTemplate: "find_not_color_and_category",
    distractorStrategy: "mixed",
  },
};
