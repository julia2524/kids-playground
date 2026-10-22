import { CategorySortingLevelConfig } from "./categorySortingTypes";

export const CategorySortingLevels: CategorySortingLevelConfig[] = [
  // ==================================================
  // Level 1~3
  // 같은 topCategory + 같은 subCategory
  // 서로 다른 사물 종류 2개를 구별
  // TargetBox는 구체적인 사물 종류별로 생성
  // ==================================================

  {
    level: 1,
    rule: "category",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    categoryMode: "sameSubcategory",
    itemTypesPerTarget: 1,
    instancesPerItem: 2,
    distinctColorCount: 1,
    objectColorMode: "same",
  },
  {
    level: 2,
    rule: "category",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    categoryMode: "sameSubcategory",
    itemTypesPerTarget: 1,
    instancesPerItem: 2,
    distinctColorCount: 2,
    objectColorMode: "mixed",
  },
  {
    level: 3,
    rule: "category",
    targetCount: 2,
    objectCount: 6,
    objectsPerTarget: 3,
    categoryMode: "sameSubcategory",
    itemTypesPerTarget: 1,
    instancesPerItem: 3,
    distinctColorCount: 3,
    objectColorMode: "mixed",
  },

  // ==================================================
  // Level 4~6
  // 서로 다른 topCategory 선택
  // 각 topCategory에서 subCategory 하나를 선택
  // 선택한 subCategory에서 서로 다른 사물 종류 출제
  // TargetBox는 topCategory별로 생성
  // ==================================================

  {
    level: 4,
    rule: "category",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    categoryMode: "differentTopCategories",
    itemTypesPerTarget: 2,
    instancesPerItem: 1,
    distinctTopCategoryCount: 2,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
  {
    level: 5,
    rule: "category",
    targetCount: 2,
    objectCount: 6,
    objectsPerTarget: 3,
    categoryMode: "differentTopCategories",
    itemTypesPerTarget: 3,
    instancesPerItem: 1,
    distinctTopCategoryCount: 2,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
  {
    level: 6,
    rule: "category",
    targetCount: 3,
    objectCount: 6,
    objectsPerTarget: 2,
    categoryMode: "differentTopCategories",
    itemTypesPerTarget: 2,
    instancesPerItem: 1,
    distinctTopCategoryCount: 3,
    objectColorMode: "same",
    distinctColorCount: 1,
  },

  // ==================================================
  // Level 7~10
  // 같은 topCategory 안에서 서로 다른 subCategory 선택
  // 각 subCategory에서 서로 다른 사물 종류 출제
  // TargetBox는 subCategory별로 생성
  // ==================================================

  {
    level: 7,
    rule: "category",
    targetCount: 2,
    objectCount: 4,
    objectsPerTarget: 2,
    categoryMode: "differentSubcategories",
    itemTypesPerTarget: 2,
    instancesPerItem: 1,
    distinctSubCategoryCount: 2,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
  {
    level: 8,
    rule: "category",
    targetCount: 2,
    objectCount: 6,
    objectsPerTarget: 3,
    categoryMode: "differentSubcategories",
    itemTypesPerTarget: 3,
    instancesPerItem: 1,
    distinctSubCategoryCount: 2,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
  {
    level: 9,
    rule: "category",
    targetCount: 3,
    objectCount: 6,
    objectsPerTarget: 2,
    categoryMode: "differentSubcategories",
    itemTypesPerTarget: 2,
    instancesPerItem: 1,
    distinctSubCategoryCount: 3,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
  {
    level: 10,
    rule: "category",
    targetCount: 3,
    objectCount: 9,
    objectsPerTarget: 3,
    categoryMode: "differentSubcategories",
    itemTypesPerTarget: 3,
    instancesPerItem: 1,
    distinctSubCategoryCount: 3,
    objectColorMode: "same",
    distinctColorCount: 1,
  },
];
