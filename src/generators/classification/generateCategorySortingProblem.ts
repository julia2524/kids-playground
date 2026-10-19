import { classificationItems } from "../../data/classification/classificationItems";
import { CategorySortingLevels } from "../../types/Classification/Category/categorySortingLevels";
import { CategorySortingLevelConfig } from "../../types/Classification/Category/categorySortingTypes";

export type CategorySortingObject = {
  instanceId: string;
  itemId: string;
  itemName: string;
  topCategory: string;
  subCategory: string;
  targetId: string;
  colorId: string;
  primary: string;
  secondary?: string;
  accent?: string;
};

export type CategorySortingTarget = {
  id: string;
  label: string; // 표시용 문장이 아니라 번역 키로 쓰는 영어 값 (item.id 또는 카테고리명)
  labelType: "item" | "category"; // label이 사물 id인지 카테고리명인지 (번역 키 구분용)
  topCategory: string;
  subCategory?: string;
  itemIds: string[];
};

export type CategorySortingProblem = {
  level: number;
  targets: CategorySortingTarget[];
  objects: CategorySortingObject[];
};

type Item = (typeof classificationItems)[number];
type ItemVariant = Item["variants"][number];

// ============================================================
// Utils
// ============================================================

const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const pick = <T>(items: T[], count: number): T[] => {
  if (items.length < count) {
    throw new Error(
      `문제 생성에 필요한 데이터가 부족해요. 필요: ${count}, 실제: ${items.length}`,
    );
  }

  return shuffle(items).slice(0, count);
};

const groupBy = <T>(
  items: T[],
  getKey: (item: T) => string,
): Map<string, T[]> => {
  const map = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = map.get(key) ?? [];
    group.push(item);
    map.set(key, group);
  }

  return map;
};

// ============================================================
// Item / Variant helpers
// ============================================================

const EXCLUDED_TOP_CATEGORIES = new Set(["unknown"]);

// 색상값 정규화 (대소문자, 앞뒤 공백 차이 무시)
const normalizeColor = (color: string | undefined): string =>
  (color ?? "").trim().toLowerCase();

// 실제 SVG 색상 조합 기준 시그니처
const getVariantSignature = (variant: ItemVariant): string =>
  [
    normalizeColor(variant.primary),
    normalizeColor(variant.secondary),
    normalizeColor(variant.accent),
  ].join("|");

const getNaturalVariant = (item: Item): ItemVariant | undefined =>
  item.variants?.find((variant) => variant.colorId === "natural");

// 자연색을 첫 번째로 두고, 실제 색상 조합이 다른 variant만 남김
const getUniqueVisualVariants = (item: Item): ItemVariant[] => {
  const natural = getNaturalVariant(item);

  if (!natural) return [];

  const uniqueVariants = [natural];
  const seenSignatures = new Set([getVariantSignature(natural)]);

  for (const variant of item.variants ?? []) {
    if (variant.colorId === "natural") continue;

    const signature = getVariantSignature(variant);
    if (seenSignatures.has(signature)) continue;

    seenSignatures.add(signature);
    uniqueVariants.push(variant);
  }

  return uniqueVariants;
};

// 사용할 수 있는 사물만 추림. 같은 id가 중복돼 있으면 하나만 남김.
// (중복이 남아 있으면 "서로 다른 사물 N종"을 뽑을 때 같은 사물이 두 번 뽑힐 수 있음)
const getAvailableItems = (): Item[] => {
  const seenIds = new Set<string>();
  const result: Item[] = [];

  for (const item of classificationItems) {
    if (
      !item.id ||
      !item.svgKey ||
      !item.topCategory ||
      !item.subCategory ||
      EXCLUDED_TOP_CATEGORIES.has(item.topCategory) ||
      item.subCategory === "unknown" ||
      !getNaturalVariant(item)
    ) {
      continue;
    }

    if (seenIds.has(item.id)) continue;
    seenIds.add(item.id);

    result.push(item);
  }

  return result;
};

// 레벨 번호가 아니라 config 기준으로 사물을 거름.
// 색상이 섞이는(mixed) 레벨은 필요한 색상 수 이상을 가진 사물만 사용.
const getItemsForConfig = (config: CategorySortingLevelConfig): Item[] => {
  const items = getAvailableItems();

  if (config.objectColorMode === "same") return items;

  const requiredCount = config.distinctColorCount ?? 1;

  return items.filter(
    (item) => getUniqueVisualVariants(item).length >= requiredCount,
  );
};

// ============================================================
// Target / Object builders
// ============================================================

const makeTarget = (
  id: string,
  topCategory: string,
  subCategory: string | undefined,
  items: Item[],
  label?: string,
): CategorySortingTarget => ({
  id,
  // label을 따로 주면 그 값, 아니면 소분류(없으면 대분류) 이름
  label: label ?? subCategory ?? topCategory,
  labelType: label ? "item" : "category",
  topCategory,
  subCategory,
  itemIds: items.map((item) => item.id),
});

const toObject = (
  item: Item,
  target: CategorySortingTarget,
  variant: ItemVariant,
  instanceId: string,
): CategorySortingObject => ({
  instanceId,
  itemId: item.svgKey,
  itemName: item.name,
  topCategory: item.topCategory,
  subCategory: item.subCategory,
  targetId: target.id,
  colorId: variant.colorId,
  primary: variant.primary,
  secondary: variant.secondary,
  accent: variant.accent,
});

const makeObjects = (
  items: Item[],
  target: CategorySortingTarget,
  config: CategorySortingLevelConfig,
  nextInstanceId: () => string,
): CategorySortingObject[] => {
  const result: CategorySortingObject[] = [];

  for (const item of items) {
    const natural = getNaturalVariant(item);

    if (!natural) {
      throw new Error(`${item.name}: natural 색상 변형이 없어요.`);
    }

    // same 모드: 자연색 반복
    if (config.objectColorMode === "same") {
      for (let i = 0; i < config.instancesPerItem; i++) {
        result.push(toObject(item, target, natural, nextInstanceId()));
      }
      continue;
    }

    // mixed 모드: 실제로 다른 색 조합만 사용
    const uniqueVariants = getUniqueVisualVariants(item);
    const requiredCount = config.distinctColorCount ?? 1;

    if (uniqueVariants.length < requiredCount) {
      throw new Error(
        `${item.name}: Level ${config.level}에 필요한 서로 다른 색상은 ` +
          `${requiredCount}개지만, 실제로는 ${uniqueVariants.length}개예요.`,
      );
    }

    const selectedVariants = [
      uniqueVariants[0],
      ...shuffle(uniqueVariants.slice(1)).slice(0, requiredCount - 1),
    ];

    // instancesPerItem이 색상 수보다 많아도 에러 대신 색을 돌려가며 배정
    for (let i = 0; i < config.instancesPerItem; i++) {
      const variant = selectedVariants[i % selectedVariants.length];
      result.push(toObject(item, target, variant, nextInstanceId()));
    }
  }

  return result;
};

// ============================================================
// Core builder (실패하면 throw)
// ============================================================

const buildProblem = (
  config: CategorySortingLevelConfig,
): CategorySortingProblem => {
  const level = config.level;
  const items = getItemsForConfig(config);
  const targets: CategorySortingTarget[] = [];
  const objects: CategorySortingObject[] = [];
  let instanceCounter = 0;

  const nextInstanceId = () => `level-${level}-object-${instanceCounter++}`;

  const addTarget = (
    topCategory: string,
    subCategory: string | undefined,
    selectedItems: Item[],
    label?: string,
  ) => {
    const target = makeTarget(
      `target-${targets.length + 1}`,
      topCategory,
      subCategory,
      selectedItems,
      label,
    );

    targets.push(target);
    objects.push(...makeObjects(selectedItems, target, config, nextInstanceId));
  };

  // --------------------------------------------------
  // 같은 subCategory 안에서 사물 targetCount종 선택
  // 사물 종류마다 목적지 하나
  // --------------------------------------------------
  if (config.categoryMode === "sameSubcategory") {
    const eligibleGroups = [
      ...groupBy(
        items,
        (item) => `${item.topCategory}::${item.subCategory}`,
      ).entries(),
    ].filter(([, group]) => group.length >= config.targetCount);

    if (eligibleGroups.length === 0) {
      throw new Error(
        `Level ${level}: 사물 ${config.targetCount}종 이상을 가진 소분류가 없어요.`,
      );
    }

    const [groupKey, selectedGroup] = pick(eligibleGroups, 1)[0];
    const [topCategory, subCategory] = groupKey.split("::");

    pick(selectedGroup, config.targetCount).forEach((item) => {
      addTarget(topCategory, subCategory, [item], item.id);
    });
  }

  // --------------------------------------------------
  // 서로 다른 topCategory
  // 각 topCategory에서 subCategory 하나 → 그 안에서 사물 선택
  // --------------------------------------------------
  if (config.categoryMode === "differentTopCategories") {
    const requiredTopCount =
      config.distinctTopCategoryCount ?? config.targetCount;

    const eligibleTopGroups = [
      ...groupBy(items, (item) => item.topCategory).entries(),
    ]
      .map(([topCategory, topItems]) => ({
        topCategory,
        subGroups: [
          ...groupBy(topItems, (item) => item.subCategory).entries(),
        ].filter(
          ([, subItems]) => subItems.length >= config.itemTypesPerTarget,
        ),
      }))
      .filter(({ subGroups }) => subGroups.length > 0);

    if (eligibleTopGroups.length < requiredTopCount) {
      throw new Error(
        `Level ${level}: 필요한 대분류는 ${requiredTopCount}개지만, ` +
          `조건에 맞는 대분류는 ${eligibleTopGroups.length}개예요.`,
      );
    }

    pick(eligibleTopGroups, requiredTopCount).forEach(
      ({ topCategory, subGroups }) => {
        const [subCategory, subItems] = pick(subGroups, 1)[0];

        addTarget(
          topCategory,
          subCategory,
          pick(subItems, config.itemTypesPerTarget),
        );
      },
    );
  }

  // --------------------------------------------------
  // 같은 topCategory 안의 서로 다른 subCategory
  // --------------------------------------------------
  if (config.categoryMode === "differentSubcategories") {
    const requiredSubCount =
      config.distinctSubCategoryCount ?? config.targetCount;

    const eligibleTopGroups = [
      ...groupBy(items, (item) => item.topCategory).entries(),
    ]
      .map(([topCategory, group]) => ({
        topCategory,
        subGroups: [
          ...groupBy(group, (item) => item.subCategory).entries(),
        ].filter(
          ([, subItems]) => subItems.length >= config.itemTypesPerTarget,
        ),
      }))
      .filter(({ subGroups }) => subGroups.length >= requiredSubCount);

    if (eligibleTopGroups.length === 0) {
      throw new Error(
        `Level ${level}: 서로 다른 소분류 ${requiredSubCount}개를 가진 ` +
          `대분류를 찾을 수 없어요. 사물 데이터를 추가하거나 레벨 설정을 조정해 주세요.`,
      );
    }

    const selectedTopGroup = pick(eligibleTopGroups, 1)[0];

    pick(selectedTopGroup.subGroups, requiredSubCount).forEach(
      ([subCategory, subItems]) => {
        addTarget(
          selectedTopGroup.topCategory,
          subCategory,
          pick(subItems, config.itemTypesPerTarget),
        );
      },
    );
  }

  // 설정과 결과 개수가 다르면 게임을 막지 않고 개발 중에만 경고
  if (__DEV__) {
    if (objects.length !== config.objectCount) {
      console.warn(
        `[CategorySorting] Level ${level}: 예상 사물 수 ${config.objectCount}개, 생성 결과 ${objects.length}개`,
      );
    }
    if (targets.length !== config.targetCount) {
      console.warn(
        `[CategorySorting] Level ${level}: 예상 목적지 ${config.targetCount}개, 생성 결과 ${targets.length}개`,
      );
    }
  }

  return {
    level,
    targets,
    objects: shuffle(objects),
  };
};

// ============================================================
// Public API
// ============================================================

export const generateCategorySortingProblem = (
  level: number,
): CategorySortingProblem => {
  const config = CategorySortingLevels.find((entry) => entry.level === level);

  if (!config) {
    throw new Error(`Level ${level} 설정을 찾을 수 없어요.`);
  }

  try {
    return buildProblem(config);
  } catch (error) {
    // 색상 변형 데이터가 부족해서 실패한 경우에는
    // 자연색 반복 모드로 낮춰서라도 문제를 만든다.
    if (config.objectColorMode !== "same") {
      console.warn(
        `[CategorySorting] Level ${level}: 색상 변형이 부족해 same 모드로 대체해요.`,
        error,
      );

      return buildProblem({ ...config, objectColorMode: "same" });
    }

    throw error;
  }
};

// ============================================================
// 개발용 진단: 어떤 레벨이 왜 실패하는지 확인
// 앱 시작 시 한 번 호출해서 콘솔을 보면 돼.
//   import { diagnoseCategorySortingLevels } from "...";
//   if (__DEV__) diagnoseCategorySortingLevels();
// ============================================================

export const diagnoseCategorySortingLevels = (tries = 30) => {
  CategorySortingLevels.forEach((config) => {
    let failures = 0;
    let lastError = "";

    for (let i = 0; i < tries; i++) {
      try {
        buildProblem(config);
      } catch (error) {
        failures += 1;
        lastError = error instanceof Error ? error.message : String(error);
      }
    }

    if (failures === 0) {
      console.log(`[진단] Level ${config.level}: OK (${tries}/${tries})`);
    } else {
      console.warn(
        `[진단] Level ${config.level}: 실패 ${failures}/${tries} → ${lastError}`,
      );
    }
  });
};
