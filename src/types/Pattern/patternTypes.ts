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

export type PatternLevelConfig = {
  level: number;
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
};
