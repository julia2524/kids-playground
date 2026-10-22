export type SizeSortingMode = "twoSizes" | "threeSizes";

export type SizeSortingItemRelation = "sameObject" | "sameSubcategory";
export type SizeKey = "large" | "medium" | "small";

export type SizeSortingItemDistribution =
  | "sameItemAllSizes"
  | "sameSetAcrossSizes"
  | "differentSetPerSize";

export type SizeSortingColorScheme =
  | "naturalOnly"
  | "naturalAndOther"
  | "naturalAndDistinctOthers";

/**
 * round:        라운드 전체 동일
 * sizeGroup:    같은 크기끼리 같은 색
 * itemType:     사물 종류별
 * instance:     인스턴스마다 서로 다른 색
 * matchedSet:   한 세트(각 크기 1개씩)끼리 같은 색
 *               예) (큰+작은) natural / (큰+작은) pink
 */
export type SizeSortingColorAssignment =
  | "round"
  | "sizeGroup"
  | "itemType"
  | "instance"
  | "matchedSet";

export type SizeSortingLevelConfig = {
  level: number;
  title: string;
  goal: string;
  sizeMode: SizeSortingMode;
  itemRelation: SizeSortingItemRelation;
  itemDistribution: SizeSortingItemDistribution;
  itemTypesPerSize: number;
  instancesPerItemPerSize: number;
  objectsPerSize: number;
  nonNaturalColorCount: number;
  colorScheme: SizeSortingColorScheme;
  colorAssignment: SizeSortingColorAssignment;
};
