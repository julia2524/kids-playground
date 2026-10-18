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
