// import { ClassificationColorId, ClassificationShape } from "../../game";

// export type ShapeSortingObjectMode =
//   | "simple" //단순도형
//   | "simple_same_shape"
//   | "same_type"
//   | "different"; //다양한사물

// export interface ShapeSortingLevelConfig {
//   level: number;

//   rule: "shape";

//   targetCount: number;
//   objectCount: number;
//   objectsPerTarget: number;

//   // same: 단순 도형
//   // different: 실제 사물 / 다양한 사물
//   objectMode: "same" | "different";

//   // 해당 레벨에서 분류 대상으로 선택할 수 있는 모양
//   shapePool: ClassificationShape[];

//   // 오브젝트 색상 후보
//   colorPool?: ClassificationColorId[];

//   // same: 한 라운드의 모든 오브젝트가 같은 색상
//   // mixed: 여러 색상을 사용할 수 있음
//   objectColorMode: "same" | "mixed";

//   showHint: boolean;

//   // completionEffect?: string;
// }

import type { ClassificationColorId, ClassificationShape } from "../../game";

export type ShapeSortingObjectMode =
  | "simple"
  | "simple_same_shape"
  | "same_type"
  | "different";

export interface ShapeSortingLevelConfig {
  level: number;
  rule: "shape";
  targetCount: number;
  objectCount: number;
  objectsPerTarget: number;

  // simple: 단순 도형, different: 실제 사물
  objectMode: "same" | "different";

  shapePool: ClassificationShape[];
  colorPool?: ClassificationColorId[];

  // 한 라운드에서 사용할 서로 다른 색상 개수
  distinctColorCount?: 1 | 2 | 4;

  // same: 한 가지 색상만 사용
  // mixed: 여러 색상 사용
  objectColorMode: "same" | "mixed";

  showHint: boolean;
}
