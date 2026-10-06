//src/types/games.ts

//분류(Classification)뿐만 아니라 패턴, 미로, 퍼즐 등 다른 게임 모드나 렌더러 컴포넌트에서도 원본 아이템 데이터 모델을 공유할 수 있습니다.
export type GameType = "classification" | "pattern" | "puzzle" | "maze";
export type ClassificationTopCategory =
  | "animal"
  | "food"
  | "drink"
  | "clothing"
  | "living"
  | "vehicle";

export type ClassificationSubCategory =
  | "land_animal"
  | "insect"
  | "bird"
  | "sea_animal"
  | "fruit"
  | "vegetable"
  | "meal"
  | "snack"
  | "beverage"
  | "clothes"
  | "shoes"
  | "hat"
  | "furniture"
  | "electronics"
  | "stationery"
  | "daily"
  | "cleaning"
  | "bathroom"
  | "kitchen"
  | "road_vehicle"
  | "rail_special"
  | "air_vehicle"
  | "water_vehicle";

export type ClassificationColorId =
  | "natural"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "black"
  | "white"
  | "pink"
  | "brown";

export type ClassificationVariant = {
  colorId: ClassificationColorId;
  primary: string;
  secondary?: string;
  accent?: string;
  pattern?: string;
};

export type ClassificationShape =
  | "circle"
  | "square"
  | "triangle"
  | "heart"
  | "star";

export type ClassificationItem = {
  id: string;
  name: string;
  topCategory: ClassificationTopCategory;
  subCategory: ClassificationSubCategory;
  svgKey: string;
  description: string;
  shapes: ClassificationShape[];
  variants: ClassificationVariant[];
};

/** 색상 Variant ID */
export type ColorId = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/** 기본 도형 */
export type ShapeId = "circle" | "triangle" | "square" | "star" | "heart";

/** 위치 */
export type PositionId =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "inside"
  | "outside";

/** 크기 레벨 */
export type SizeLevel = "small" | "medium" | "large";

/** 아이템 색상 변형 정의 */
export interface ItemVariant {
  id: ColorId | string;
  primary: string;
  secondary?: string;
  accent?: string;
  pattern?: string;
}

/** 게임 원본 아이템 데이터 정의 */
export interface GameItem {
  id: string;
  name: string;
  topCategory: ClassificationTopCategory;
  subCategory: ClassificationSubCategory;
  svgKey: string;
  shape: ShapeId[];
  description: string;
  variants: ItemVariant[];
  defaultSize?: SizeLevel;
}
