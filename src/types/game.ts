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

export type ClassificationVariant = {
  id: string;
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
