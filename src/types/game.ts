//src/types/games.ts

//분류(Classification)뿐만 아니라 패턴, 미로, 퍼즐 등 다른 게임 모드나 렌더러 컴포넌트에서도 원본 아이템 데이터 모델을 공유할 수 있습니다.
export type GameType = "classification" | "pattern" | "puzzle" | "maze";
export type ClassificationGameType = "color" | "shape" | "size" | "category";
export type StageMapGameType =
  | ClassificationGameType
  | "pattern"
  | "puzzle"
  | "maze";
export type ClassificationTopCategory =
  | "animal" // 동물
  | "food" // 음식
  | "clothing" // 의류 및 꾸미는 물건
  | "vehicle" // 탈것
  | "nature" // 자연
  | "things" // 생활물건과 놀이물건
  | "unknown"; // 미분류

export type ClassificationSubCategory =
  // 동물
  | "pet" // 반려동물
  | "farm_animal" // 농장 동물
  | "wild_animal" // 숲·야생 동물
  | "sea_animal" // 바다 동물
  | "bird" // 새
  | "insect" // 곤충
  | "small_animal" // 작은 동물

  // 음식
  | "fruit" // 과일
  | "vegetable" // 채소
  | "meal" // 한 끼 음식
  | "snack" // 간식
  | "drink" // 음료

  // 의류 및 꾸미는 물건
  | "hat" // 모자
  | "clothes" // 옷
  | "shoes" // 신발
  | "hairpin" // 머리핀
  | "necklace" // 목걸이
  | "glasses" // 안경
  | "button" //단추

  // 자연
  | "sky" // 하늘에서 볼 수 있는 것
  | "plant" // 식물

  // 탈것
  | "road_vehicle" // 도로에서 다니는 탈것
  | "rail_vehicle" // 레일 위를 다니는 탈것
  | "air_vehicle" // 하늘을 나는 탈것
  | "water_vehicle" // 물에서 다니는 탈것
  | "construction_vehicle" // 공사하는 차

  // 생활물건과 놀이물건
  | "musical_instrument" // 악기
  | "clock" // 시계
  | "stationery" // 문구
  | "electronics" // 전자제품
  | "furniture" // 가구
  | "ball" // 공
  | "balloon" // 풍선
  | "toys_sports" // 장난감·놀이 도구
  | "daily" // 기타 생활물건

  // 미분류
  | "unknown";

export const SUB_CATEGORY_MAP: Record<string, string[]> = {
  animal: [
    "pet",
    "farm_animal",
    "wild_animal",
    "sea_animal",
    "bird",
    "insect",
    "small_animal",
  ],

  food: ["fruit", "vegetable", "meal", "snack", "drink"],

  clothing: [
    "hat",
    "clothes",
    "shoes",
    "hairpin",
    "necklace",
    "glasses",
    "button",
  ],

  nature: ["sky", "plant"],

  vehicle: [
    "road_vehicle",
    "rail_vehicle",
    "air_vehicle",
    "water_vehicle",
    "construction_vehicle",
  ],

  things: [
    "musical_instrument",
    "clock",
    "stationery",
    "electronics",
    "furniture",
    "ball",
    "balloon",
    "toys_sports",
    "daily",
  ],

  unknown: ["unknown"],
};
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
