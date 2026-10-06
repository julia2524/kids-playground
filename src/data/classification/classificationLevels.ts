//src/data/classification/classficationLevles/ts
import { LevelConfig } from "../../types/level";

// levelConfigs.ts – 최종본

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  // ===================== CHAPTER 1 =====================
  1: {
    level: 1,
    chapter: 1,
    name: "색상을 찾아요",
    educationalGoal: "색상을 기준으로 대상을 구별한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["color"],
    conditions: [{ attr: "color" }],
    distractors: [
      { violated: ["color"] },
      { violated: ["color"] },
      { violated: ["color"] },
    ],
    sameItem: true,
    questionTemplate: "{color}인 것을 찾아보세요.",
  },

  2: {
    level: 2,
    chapter: 1,
    name: "모양을 찾아요",
    educationalGoal: "형태의 특징을 관찰하고 지정된 모양을 분류한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["shape"],
    conditions: [{ attr: "shape" }],
    distractors: [
      { violated: ["shape"] },
      { violated: ["shape"] },
      { violated: ["shape"] },
    ],
    // 라벨 매핑에서 "동그란", "세모난", "네모난", "별 모양인", "하트 모양인" 처리
    questionTemplate: "{shape} 것을 찾아보세요.",
  },

  3: {
    level: 3,
    chapter: 1,
    name: "종류를 찾아요",
    educationalGoal: "대상을 상위 범주에 따라 분류한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["topCategory"],
    conditions: [{ attr: "topCategory" }],
    distractors: [
      { violated: ["topCategory"] },
      { violated: ["topCategory"] },
      { violated: ["topCategory"] },
    ],
    questionTemplate: "{topCategory}을/를 찾아보세요.",
  },

  4: {
    level: 4,
    chapter: 1,
    name: "크기를 찾아요",
    educationalGoal: "동일 대상에서 크기 차이를 직관적으로 구별한다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["size"],
    conditions: [{ attr: "size" }], // value 없음 → 랜덤 (large / small)
    distractors: [{ violated: ["size"] }],
    sameItem: true,
    sizeLevels: ["small", "large"],
    questionTemplate: "{size} {item}을/를 찾아보세요.",
  },

  // ===================== CHAPTER 2 =====================
  5: {
    level: 5,
    chapter: 2,
    name: "가장 큰 것을 찾아요",
    educationalGoal: "동일 대상 3개의 크기를 비교하여 최상위 값을 찾는다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["size"],
    conditions: [{ attr: "size", compare: { attr: "size", dir: "largest" } }],
    distractors: [{ violated: ["size"] }, { violated: ["size"] }],
    sameItem: true,
    sizeLevels: ["small", "medium", "large"],
    questionTemplate: "가장 큰 {item}을/를 찾아보세요.",
  },

  6: {
    level: 6,
    chapter: 2,
    name: "수량을 비교해요",
    educationalGoal: "동일 대상의 수량(많은/적은)을 직관적으로 비교한다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["quantity"],
    conditions: [
      {
        attr: "quantity",
        compare: { attr: "quantity", dir: ["more", "less"] },
      },
    ],
    distractors: [{ violated: ["quantity"] }],
    sameItem: true,
    quantityRange: [1, 5],
    questionTemplate: "{compareDir} 것을 찾아보세요.",
  },

  7: {
    level: 7,
    chapter: 2,
    name: "가장 수량이 많은 것을 찾아요",
    educationalGoal: "3개 그룹의 수량을 비교하여 최상위 수량을 찾는다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["quantity"],
    conditions: [
      {
        attr: "quantity",
        compare: { attr: "quantity", dir: ["largest", "smallest"] },
      },
    ],
    distractors: [{ violated: ["quantity"] }, { violated: ["quantity"] }],
    sameItem: true,
    quantityRange: [1, 6],
    questionTemplate: "가장 {compareDir} 것을 찾아보세요.",
  },

  8: {
    level: 8,
    chapter: 2,
    name: "위치를 찾아요",
    educationalGoal: "좌/우 공간 개념을 이해하고 조건에 맞는 위치를 찾는다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["position"],
    conditions: [{ attr: "position" }],
    distractors: [{ violated: ["position"] }],
    sameItem: true,
    positionOptions: ["left", "right"],
    questionTemplate: "{position}에 있는 것을 찾아보세요.",
  },

  9: {
    level: 9,
    chapter: 2,
    name: "위치를 확장해서 찾아요",
    educationalGoal: "좌/우/위 등 확장된 공간 위치를 구분한다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["position"],
    conditions: [{ attr: "position" }],
    distractors: [{ violated: ["position"] }, { violated: ["position"] }],
    sameItem: true,
    positionOptions: ["left", "right", "top"],
    questionTemplate: "{position}에 있는 것을 찾아보세요.",
  },

  // ===================== CHAPTER 3 =====================
  10: {
    level: 10,
    chapter: 3,
    name: "색상 + 종류",
    educationalGoal:
      "색상과 종류 두 가지 조건을 동시에 만족하는 대상을 찾는다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["color", "topCategory"],
    conditions: [{ attr: "color" }, { attr: "topCategory" }],
    distractors: [
      { violated: ["topCategory"] },
      { violated: ["color"] },
      { violated: ["color", "topCategory"] },
    ],
    questionTemplate: "{color} {topCategory}을/를 찾아보세요.",
  },

  11: {
    level: 11,
    chapter: 3,
    name: "모양 + 종류",
    educationalGoal:
      "모양과 종류 두 가지 조건을 동시에 만족하는 대상을 찾는다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["shape", "subCategory"],
    conditions: [{ attr: "shape" }, { attr: "subCategory", value: "fruit" }],
    distractors: [
      { violated: ["subCategory"] },
      { violated: ["shape"] },
      { violated: ["shape", "subCategory"] },
    ],
    questionTemplate: "{shape} 과일을 찾아보세요.",
  },

  12: {
    level: 12,
    chapter: 3,
    name: "색상 + 크기",
    educationalGoal: "색상과 크기 두 가지 감각 속성을 동시에 판단한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["color", "size"],
    conditions: [{ attr: "color" }, { attr: "size", value: "large" }],
    distractors: [
      { violated: ["size"] },
      { violated: ["color"] },
      { violated: ["color", "size"] },
    ],
    sameItem: true,
    sizeLevels: ["small", "large"],
    questionTemplate: "큰 {color} 물건을 찾아보세요.",
  },

  // ===================== CHAPTER 4 =====================
  13: {
    level: 13,
    chapter: 4,
    name: "종류 + 크기 (같은 sub)",
    educationalGoal: "같은 소범주 내 서로 다른 사물의 크기를 비교한다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["size", "subCategory"],
    conditions: [{ attr: "size", value: "large" }],
    distractors: [{ violated: ["size"] }],
    sameSubCategory: true,
    sizeLevels: ["small", "large"],
    questionTemplate: "큰 {topCategory}을/를 찾아보세요.",
  },

  14: {
    level: 14,
    chapter: 4,
    name: "종류 + 크기 비교 (같은 sub)",
    educationalGoal: "같은 소범주 내 3가지 대상 중 가장 큰 대상을 판별한다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["size", "subCategory"],
    conditions: [{ attr: "size", compare: { attr: "size", dir: "largest" } }],
    distractors: [{ violated: ["size"] }, { violated: ["size"] }],
    sameSubCategory: true,
    sizeLevels: ["small", "medium", "large"],
    questionTemplate: "가장 큰 {topCategory}을/를 찾아보세요.",
  },

  15: {
    level: 15,
    chapter: 4,
    name: "종류 + 크기 (독립 조합)",
    educationalGoal:
      "종류와 크기 조건이 교차하는 4개 선택지 중 정답을 추출한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["size", "topCategory"],
    conditions: [{ attr: "size", value: "large" }, { attr: "topCategory" }],
    distractors: [
      { violated: ["topCategory"] },
      { violated: ["size"] },
      { violated: ["size", "topCategory"] },
    ],
    sizeLevels: ["small", "large"],
    questionTemplate: "큰 {topCategory}을/를 찾아보세요.",
  },

  // ===================== CHAPTER 5 =====================
  16: {
    level: 16,
    chapter: 5,
    name: "위치 + 색상",
    educationalGoal: "공간 위치와 색상 조건의 조합을 처리한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["position", "color"],
    conditions: [{ attr: "position" }, { attr: "color" }],
    distractors: [
      { violated: ["color"] },
      { violated: ["position"] },
      { violated: ["position", "color"] },
    ],
    sameItem: true,
    positionOptions: ["left", "right"],
    questionTemplate: "{position}에 있는 {color}을/를 찾아보세요.",
  },

  17: {
    level: 17,
    chapter: 5,
    name: "위치 + 종류",
    educationalGoal: "공간 위치와 범주 정보를 동시에 판단한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["position", "topCategory"],
    conditions: [{ attr: "position" }, { attr: "topCategory" }],
    distractors: [
      { violated: ["topCategory"] },
      { violated: ["position"] },
      { violated: ["position", "topCategory"] },
    ],
    positionOptions: ["left", "right"],
    questionTemplate: "{position}에 있는 {topCategory}을/를 찾아보세요.",
  },

  18: {
    level: 18,
    chapter: 5,
    name: "수량 비교 (같은 sub)",
    educationalGoal:
      "같은 종류 안에서 수량만 비교하여 조건에 맞는 수량을 찾는다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["quantity", "subCategory"],
    conditions: [{ attr: "quantity" }],
    distractors: [{ violated: ["quantity"] }, { violated: ["quantity"] }],
    sameSubCategory: true,
    quantityRange: [1, 5],
    questionTemplate: "{quantity}개 있는 {subCategoryLabel}을/를 찾아보세요.",
  },

  19: {
    level: 19,
    chapter: 5,
    name: "종류와 수량을 함께 봐요",
    educationalGoal: "같은 종류인지 확인하고, 수량까지 비교해요.",
    choiceCount: 3,
    correctCount: 1,

    attributes: ["subCategory", "quantity"],

    conditions: [{ attr: "subCategory" }, { attr: "quantity" }],

    sameSubCategory: false,
    quantityRange: [1, 3],

    distractors: [{ violated: ["subCategory"] }, { violated: ["quantity"] }],

    questionTemplate: "{quantity}개 있는 {subCategory}을/를 찾아보세요.",
  },

  20: {
    level: 20,
    chapter: 5,
    name: "종류와 수량을 꼼꼼히 살펴봐요",
    educationalGoal:
      "종류와 수량을 각각 확인하고 두 조건을 모두 만족하는 것을 찾아요.",
    choiceCount: 4,
    correctCount: 1,

    attributes: ["subCategory", "quantity"],

    conditions: [{ attr: "subCategory" }, { attr: "quantity" }],

    quantityRange: [1, 3],

    distractors: [
      { violated: ["subCategory"] },
      { violated: ["quantity"] },
      { violated: ["subCategory", "quantity"] },
    ],

    questionTemplate: "{quantity}개 있는 {subCategory}을/를 찾아보세요.",
  },

  21: {
    level: 21,
    chapter: 5,
    name: "크기 + 색상 + 종류",
    educationalGoal: "3가지 속성을 동시에 비교/검증한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["size", "color", "topCategory"],
    conditions: [
      { attr: "size", value: "small" },
      { attr: "color" },
      { attr: "topCategory" },
    ],
    distractors: [
      { violated: ["size"] },
      { violated: ["color"] },
      { violated: ["topCategory"] },
    ],
    sizeLevels: ["small", "large"],
    questionTemplate: "작은 {color} {topCategory}을/를 찾아보세요.",
  },

  22: {
    level: 22,
    chapter: 5,
    name: "위치 + 수량 + 종류",
    educationalGoal: "화면 격자 영역 내 그룹 단위 3가지 속성을 판단한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["position", "quantity", "topCategory"],
    conditions: [
      { attr: "position" },
      { attr: "quantity" },
      { attr: "topCategory" },
    ],
    distractors: [
      { violated: ["quantity"] },
      { violated: ["position"] },
      { violated: ["topCategory"] },
    ],
    positionOptions: ["left", "right"],
    quantityRange: [2, 4],
    questionTemplate:
      "{position}에 있는 {quantity}{unit}의 {topCategory}을/를 찾아보세요.",
  },

  // ===================== CHAPTER 6 (NOT) =====================
  23: {
    level: 23,
    chapter: 6,
    name: "단순 NOT (같은 사물)",
    educationalGoal: "부정 조건을 이해하고 해당하지 않는 것을 찾는다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["color"],
    conditions: [],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }],
    sameItem: true,
    questionTemplate: "{color}이/가 아닌 것을 찾아보세요.",
  },

  24: {
    level: 24,
    chapter: 6,
    name: "단순 NOT (같은 sub)",
    educationalGoal: "같은 소범주 안에서 부정 조건을 적용한다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["color"],
    conditions: [],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }],
    sameSubCategory: true,
    questionTemplate: "{color}이/가 아닌 것을 찾아보세요.",
  },

  25: {
    level: 25,
    chapter: 6,
    name: "단순 NOT (같은 top)",
    educationalGoal: "같은 대범주 안에서 부정 조건을 적용한다.",
    choiceCount: 2,
    correctCount: 1,
    attributes: ["color"],
    conditions: [],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }],
    sameTopCategory: true,
    questionTemplate: "{color}이/가 아닌 것을 찾아보세요.",
  },

  26: {
    level: 26,
    chapter: 6,
    name: "단순 NOT 복수 정답",
    educationalGoal:
      "부정 조건을 만족하는 답이 2개 이상일 때 다중 선택을 학습한다.",
    choiceCount: 3,
    correctCount: 2,
    attributes: ["color"],
    conditions: [],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }],
    sameItem: true,
    questionTemplate: "{color}이/가 아닌 것을 모두 찾아보세요.",
  },

  27: {
    level: 27,
    chapter: 6,
    name: "단순 NOT 복수 (sub 확장)",
    educationalGoal: "같은 소범주에서 부정 조건 복수 정답을 찾는다.",
    choiceCount: 3,
    correctCount: 2,
    attributes: ["color"],
    conditions: [],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }],
    sameSubCategory: true,
    questionTemplate: "{color}이/가 아닌 것을 모두 찾아보세요.",
  },

  28: {
    level: 28,
    chapter: 6,
    name: "NOT 색상 + 종류 (쉬운)",
    educationalGoal: "종류를 먼저 맞추고 그 중 부정 색상을 고른다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["color", "topCategory"],
    conditions: [{ attr: "topCategory" }],
    notConditions: [{ attr: "color" }],
    distractors: [
      { violated: ["color"] },
      { violated: ["color", "topCategory"] },
    ],
    questionTemplate: "{color}이/가 아닌 {topCategory}을/를 찾아보세요.",
  },

  29: {
    level: 29,
    chapter: 6,
    name: "NOT 색상 + 종류 (교차)",
    educationalGoal:
      "부정 색상과 종류 조건이 촘촘하게 교차된 선택지를 구분한다.",
    choiceCount: 3,
    correctCount: 1,
    attributes: ["color", "topCategory"],
    conditions: [{ attr: "topCategory" }],
    notConditions: [{ attr: "color" }],
    distractors: [{ violated: ["color"] }, { violated: ["topCategory"] }],
    questionTemplate: "{color}이/가 아닌 {topCategory}을/를 찾아보세요.",
  },

  30: {
    level: 30,
    chapter: 6,
    name: "NOT 색상 + 크기",
    educationalGoal: "부정 색상 조건과 크기 조건을 결합하여 판단한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["color", "size"],
    conditions: [{ attr: "size", value: "large" }],
    notConditions: [{ attr: "color" }],
    distractors: [
      { violated: ["color"] },
      { violated: ["size"] },
      { violated: ["color", "size"] },
    ],
    sameItem: true,
    sizeLevels: ["small", "large"],
    questionTemplate: "{color}이/가 아닌 큰 물건을 찾아보세요.",
  },

  31: {
    level: 31,
    chapter: 6,
    name: "NOT 종류 + 색상",
    educationalGoal: "특정 종류를 제외한 상태에서 특정 색상을 선택한다.",
    choiceCount: 4,
    correctCount: 1,
    attributes: ["topCategory", "color"],
    conditions: [{ attr: "color" }],
    notConditions: [{ attr: "topCategory" }],
    distractors: [
      { violated: ["topCategory"] },
      { violated: ["color"] },
      { violated: ["topCategory", "color"] },
    ],
    questionTemplate: "{topCategory}이/가 아닌 {color} 물건을 찾아보세요.",
  },
};
