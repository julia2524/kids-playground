import React from "react";
import AnimalCategoryBackground, {
  AnimalBackgroundKind,
} from "./AnimalCategoryBackgrounds";
import FoodCategoryBackground, {
  FoodBackgroundKind,
} from "./FoodCategoryBackgrounds";
import ClothingCategoryBackground, {
  ClothingBackgroundKind,
} from "./ClothingCategoryBackgrounds";
import NatureCategoryBackground, {
  NatureBackgroundKind,
} from "./NatureCategoryBackgrounds";
import VehicleCategoryBackground, {
  VehicleBackgroundCategory,
} from "./VehicleCategoryBackgrounds";
import {
  ThingsCategoryBackground,
  ThingsCategoryKind,
} from "./ThingsCategoryBackgrounds";

type CategorySortingBackgroundProps = {
  topCategory?: string; // 예: "animal", "food", "clothing", "nature", "vehicle", "things" 등
  subCategory?: string; // 레벨 1~3 등에서 사용하는 세부 카테고리 키
  targetLabel?: string; // 라벨 기반 판별용 (필요시)
  width?: number | string;
  height?: number | string;
};

export default function CategorySortingBackground({
  topCategory,
  subCategory,
  targetLabel,
  width = "100%",
  height = "100%",
}: CategorySortingBackgroundProps) {
  // 1. 동물 (Animal) 계열
  const animalKinds: AnimalBackgroundKind[] = [
    "animal",
    "pet",
    "farm_animal",
    "wild_animal",
    "sea_animal",
    "bird",
    "insect",
  ];
  if (
    topCategory === "animal" ||
    (subCategory && animalKinds.includes(subCategory as AnimalBackgroundKind))
  ) {
    const kind = (
      animalKinds.includes(subCategory as AnimalBackgroundKind)
        ? subCategory
        : "animal"
    ) as AnimalBackgroundKind;
    return (
      <AnimalCategoryBackground category={kind} width={width} height={height} />
    );
  }

  // 2. 음식 (Food) 계열
  const foodKinds: FoodBackgroundKind[] = [
    "food",
    "fruit",
    "vegetable",
    "meal",
    "snack",
    "drink",
  ];
  if (
    topCategory === "food" ||
    (subCategory && foodKinds.includes(subCategory as FoodBackgroundKind))
  ) {
    const kind = (
      foodKinds.includes(subCategory as FoodBackgroundKind)
        ? subCategory
        : "food"
    ) as FoodBackgroundKind;
    return (
      <FoodCategoryBackground category={kind} width={width} height={height} />
    );
  }

  // 3. 의류 및 꾸미는 물건 (Clothing) 계열
  const clothingKinds: ClothingBackgroundKind[] = [
    "clothing",
    "hat",
    "clothes",
    "shoes",
    "hairpin",
    "necklace",
    "glasses",
  ];
  if (
    topCategory === "clothing" ||
    (subCategory &&
      clothingKinds.includes(subCategory as ClothingBackgroundKind))
  ) {
    const kind = (
      clothingKinds.includes(subCategory as ClothingBackgroundKind)
        ? subCategory
        : "clothing"
    ) as ClothingBackgroundKind;
    return (
      <ClothingCategoryBackground
        category={kind}
        width={width}
        height={height}
      />
    );
  }

  // 4. 자연 (Nature / Sky / Plant) 계열
  const natureKinds: NatureBackgroundKind[] = ["nature", "sky", "plant"];
  if (
    topCategory === "nature" ||
    (subCategory && natureKinds.includes(subCategory as NatureBackgroundKind))
  ) {
    const kind = (
      natureKinds.includes(subCategory as NatureBackgroundKind)
        ? subCategory
        : "nature"
    ) as NatureBackgroundKind;
    return (
      <NatureCategoryBackground category={kind} width={width} height={height} />
    );
  }

  // 5. 탈 것 (Vehicle) 계열
  const vehicleKinds: VehicleBackgroundCategory[] = [
    "vehicle",
    "road_vehicle",
    "rail_vehicle",
    "air_vehicle",
    "water_vehicle",
    "construction_vehicle",
  ];
  if (
    topCategory === "vehicle" ||
    (subCategory &&
      vehicleKinds.includes(subCategory as VehicleBackgroundCategory))
  ) {
    const kind = (
      vehicleKinds.includes(subCategory as VehicleBackgroundCategory)
        ? subCategory
        : "vehicle"
    ) as VehicleBackgroundCategory;
    return (
      <VehicleCategoryBackground
        category={kind}
        width={width}
        height={height}
      />
    );
  }

  // 6. 생활물건과 놀이물건 (Things) 계열
  const thingsKinds: ThingsCategoryKind[] = [
    "things",
    "musical_instrument",
    "clock",
    "stationery",
    "electronics",
    "furniture",
    "ball",
    "balloon",
    "toys_sports",
  ];
  if (
    topCategory === "things" ||
    (subCategory && thingsKinds.includes(subCategory as ThingsCategoryKind))
  ) {
    const kind = (
      thingsKinds.includes(subCategory as ThingsCategoryKind)
        ? subCategory
        : "things"
    ) as ThingsCategoryKind;
    return (
      <ThingsCategoryBackground category={kind} width={width} height={height} />
    );
  }

  // 💡 Fallback: 매칭되지 않을 경우 기본 동물 또는 단색 배경
  return (
    <AnimalCategoryBackground category="animal" width={width} height={height} />
  );
}
