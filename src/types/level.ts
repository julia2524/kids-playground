// types/level.ts (변경 없음 – 이전 최종본 유지)
//LevelConfig와 직접적인 연관이 있으며, 레벨 제너레이터(Generator)가 출력하는 생성 결과물 타입이므로 레벨 관련 타입 모듈에 함께 모아두는 것이 직관적입니다.

import { ColorId, PositionId, ShapeId, SizeLevel } from "./game";

export type Attribute =
  | "color"
  | "shape"
  | "topCategory"
  | "subCategory"
  | "size"
  | "position"
  | "quantity";

export type CompareDirection = "more" | "less" | "largest" | "smallest";

export type LevelCondition = {
  attr: Attribute;
  value?: string | number;
  compare?: {
    attr: Attribute;
    dir: CompareDirection | CompareDirection[];
  };
};

export type DistractorSpec = {
  violated: Attribute[];
};

export type LevelConfig = {
  level: number;
  chapter: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  educationalGoal?: string;

  choiceCount: 2 | 3 | 4;
  correctCount: number;

  attributes: Attribute[];
  conditions: LevelCondition[];
  notConditions?: LevelCondition[];

  distractors: DistractorSpec[];

  sameItem?: boolean;
  sameSubCategory?: boolean;
  sameTopCategory?: boolean;

  sizeLevels?: ("small" | "medium" | "large")[];
  positionOptions?: ("left" | "right" | "top" | "bottom" | "center")[];
  quantityRange?: [number, number];

  questionTemplate: string;
};

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
