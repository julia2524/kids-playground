import { useLanguage } from "../../context/LangaugeContext";
import { classificationItems } from "../../data/classification/classificationItems";
import i18n from "../../i18n";
import { SizeSortingLevels } from "../../types/Classification/Size/sizeSortingLevels";
import {
  SizeKey,
  SizeSortingLevelConfig,
} from "../../types/Classification/Size/sizeSortingTypes";
import { ClassificationItem, ClassificationVariant } from "../../types/game";

// ----------------------------------------------------------
// Types
// ----------------------------------------------------------

export type SizeSortingTarget = {
  id: string;
  sizeKey: SizeKey;
  // label: string;
  scale: number;
};

export type SizeSortingObject = {
  id: string;
  itemId: string;
  name: string;
  svgKey: string;
  sizeKey: SizeKey;
  scale: number;
  targetId: string;
  variant: ClassificationVariant;
};

export type SizeSortingProblem = {
  level: number;
  title: string;
  goal: string;
  config: SizeSortingLevelConfig;
  targets: SizeSortingTarget[];
  objects: SizeSortingObject[];
  notes: string[];
};

export type GenerateSizeSortingOptions = {
  seed?: number;
};

// ----------------------------------------------------------
// Size settings  ← 차이 확대
// ----------------------------------------------------------

// const SIZE_DEFINITIONS: Record<SizeKey, { label: string; scale: number }> = {
//   large: { label: "large", scale: 1.5 },
//   medium: { label: "medium", scale: 0.9 },
//   small: { label: "small", scale: 0.38 },
// };

const SIZE_DEFINITIONS: Record<SizeKey, { scale: number }> = {
  large: { scale: 1.5 },
  medium: { scale: 0.9 },
  small: { scale: 0.38 },
};

function getSizeKeys(mode: SizeSortingLevelConfig["sizeMode"]): SizeKey[] {
  return mode === "twoSizes"
    ? ["large", "small"]
    : ["large", "medium", "small"];
}

// ----------------------------------------------------------
// Random helpers
// ----------------------------------------------------------

function createRandom(seed?: number): () => number {
  let state = seed ?? Math.floor(Math.random() * 2_147_483_647);
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickOne<T>(items: readonly T[], random: () => number): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(random() * items.length)];
}

// ----------------------------------------------------------
// Variant helpers (시각적 중복 제거)
// ----------------------------------------------------------

const EXCLUDED_TOP_CATEGORIES = new Set(["unknown"]);

const normalizeColor = (color: string | undefined): string =>
  (color ?? "").trim().toLowerCase();

const getVariantSignature = (variant: ClassificationVariant): string =>
  [
    normalizeColor(variant.primary),
    normalizeColor(variant.secondary),
    normalizeColor(variant.accent),
  ].join("|");

function getNaturalVariant(
  item: ClassificationItem,
): ClassificationVariant | undefined {
  return item.variants.find((v) => v.colorId === "natural");
}

/** natural을 첫 번째로, 실제 색 조합이 다른 variant만 남김 */
function getUniqueVisualVariants(
  item: ClassificationItem,
): ClassificationVariant[] {
  const natural = getNaturalVariant(item);
  if (!natural) return [];

  const unique: ClassificationVariant[] = [natural];
  const seen = new Set([getVariantSignature(natural)]);

  for (const variant of item.variants) {
    if (variant.colorId === "natural") continue;
    const sig = getVariantSignature(variant);
    if (seen.has(sig)) continue;
    seen.add(sig);
    unique.push(variant);
  }
  return unique;
}

function getNonNaturalUniqueVariants(
  item: ClassificationItem,
): ClassificationVariant[] {
  return getUniqueVisualVariants(item).filter((v) => v.colorId !== "natural");
}

function hasUsableVariant(item: ClassificationItem): boolean {
  return !!getNaturalVariant(item);
}

/** 필요한 non-natural 시각 색상 개수를 충족하는지 */
function hasEnoughColors(
  item: ClassificationItem,
  config: SizeSortingLevelConfig,
): boolean {
  if (config.colorScheme === "naturalOnly") return true;
  return (
    getNonNaturalUniqueVariants(item).length >= config.nonNaturalColorCount
  );
}

function getAvailableItems(
  items: readonly ClassificationItem[],
): ClassificationItem[] {
  const seenIds = new Set<string>();
  const result: ClassificationItem[] = [];

  for (const item of items) {
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
}

// ----------------------------------------------------------
// Item selection
// ----------------------------------------------------------

type ItemSelection = {
  itemBySize: Map<SizeKey, ClassificationItem[]>;
  notes: string[];
};

// function selectItemsForLevel(
//   config: SizeSortingLevelConfig,
//   items: readonly ClassificationItem[],
//   sizeKeys: readonly SizeKey[],
//   random: () => number,
// ): ItemSelection {
//   const notes: string[] = [];
//   const usableItems = getAvailableItems(items);

//   if (usableItems.length === 0) {
//     return {
//       itemBySize: new Map(),
//       notes: ["사용 가능한 사물 데이터가 없습니다."],
//     };
//   }

//   const itemBySize = new Map<SizeKey, ClassificationItem[]>();

//   // ──────────── sameObject ────────────
//   if (config.itemRelation === "sameObject") {
//     const colorReady = usableItems.filter((item) =>
//       hasEnoughColors(item, config),
//     );
//     const pool = colorReady.length > 0 ? colorReady : usableItems;

//     if (colorReady.length === 0) {
//       notes.push(
//         "색상이 충분한 사물이 없어 색상 조건을 완화하고 다른 사물을 선택했습니다.",
//       );
//     }

//     const selected = pickOne(pool, random);
//     if (!selected) {
//       return { itemBySize, notes: ["사물을 선택하지 못했습니다."] };
//     }

//     for (const sizeKey of sizeKeys) {
//       itemBySize.set(sizeKey, [selected]);
//     }
//     return { itemBySize, notes };
//   }

//   // ──────────── sameSubcategory ────────────
//   const requiredPerSize = config.itemTypesPerSize;
//   const requiredTotal =
//     config.itemDistribution === "sameSetAcrossSizes"
//       ? requiredPerSize
//       : requiredPerSize * sizeKeys.length;

//   const colorReadyItems = usableItems.filter((item) =>
//     hasEnoughColors(item, config),
//   );
//   const candidateSource =
//     colorReadyItems.length >= requiredTotal ? colorReadyItems : usableItems;

//   if (colorReadyItems.length < requiredTotal) {
//     notes.push("색상이 충분한 사물이 부족하여 색상 조건을 완화했습니다.");
//   }

//   const subcategoryGroups = new Map<string, ClassificationItem[]>();
//   for (const item of candidateSource) {
//     const key = `${item.topCategory}:${item.subCategory}`;
//     const group = subcategoryGroups.get(key) ?? [];
//     group.push(item);
//     subcategoryGroups.set(key, group);
//   }

//   const sufficientGroups = [...subcategoryGroups.values()].filter(
//     (g) => g.length >= requiredTotal,
//   );

//   let candidatePool: ClassificationItem[];

//   if (sufficientGroups.length > 0) {
//     candidatePool = pickOne(sufficientGroups, random) ?? candidateSource;
//   } else {
//     const largestGroup = [...subcategoryGroups.values()].sort(
//       (a, b) => b.length - a.length,
//     )[0];

//     candidatePool = largestGroup ?? candidateSource;

//     if (candidatePool.length < requiredTotal) {
//       const firstTop = candidatePool[0]?.topCategory;
//       const sameTop = candidateSource.filter((i) => i.topCategory === firstTop);

//       if (sameTop.length >= requiredTotal) {
//         candidatePool = sameTop;
//         notes.push(
//           "같은 소범주의 사물이 부족하여 동일 대범주 내 다른 소범주를 사용했습니다.",
//         );
//       } else {
//         candidatePool = candidateSource;
//         notes.push("사물 종류가 부족하여 여러 범주에서 사물을 선택했습니다.");
//       }
//     }
//   }

//   const shuffled = shuffle(candidatePool, random);

//   if (config.itemDistribution === "sameSetAcrossSizes") {
//     const selected = shuffled.slice(0, requiredPerSize);
//     for (const sizeKey of sizeKeys) {
//       itemBySize.set(sizeKey, selected);
//     }
//     return { itemBySize, notes };
//   }

//   let cursor = 0;
//   for (const sizeKey of sizeKeys) {
//     const selected = shuffled.slice(cursor, cursor + requiredPerSize);
//     cursor += selected.length;
//     itemBySize.set(sizeKey, selected);
//   }

//   return { itemBySize, notes };
// }

// ----------------------------------------------------------
// Color palette builders
// ----------------------------------------------------------
function selectItemsForLevel(
  config: SizeSortingLevelConfig,
  items: readonly ClassificationItem[],
  sizeKeys: readonly SizeKey[],
  random: () => number,
): ItemSelection {
  const notes: string[] = [];
  const usableItems = getAvailableItems(items);

  if (usableItems.length === 0) {
    return {
      itemBySize: new Map(),
      notes: ["사용 가능한 사물 데이터가 없습니다."],
    };
  }

  const itemBySize = new Map<SizeKey, ClassificationItem[]>();

  // ──────────── sameObject ────────────
  if (config.itemRelation === "sameObject") {
    const colorReady = usableItems.filter((item) =>
      hasEnoughColors(item, config),
    );

    // 배열 순서 편향 제거: 항상 shuffle 후 pick
    const pool = shuffle(
      colorReady.length > 0 ? colorReady : usableItems,
      random,
    );

    if (colorReady.length === 0) {
      notes.push(
        "색상이 충분한 사물이 없어 색상 조건을 완화하고 다른 사물을 선택했습니다.",
      );
    }

    const selected = pickOne(pool, random);
    if (!selected) {
      return { itemBySize, notes: ["사물을 선택하지 못했습니다."] };
    }

    for (const sizeKey of sizeKeys) {
      itemBySize.set(sizeKey, [selected]);
    }
    return { itemBySize, notes };
  }

  // ──────────── sameSubcategory ────────────
  const requiredPerSize = config.itemTypesPerSize;
  const requiredTotal =
    config.itemDistribution === "sameSetAcrossSizes"
      ? requiredPerSize
      : requiredPerSize * sizeKeys.length;

  const colorReadyItems = usableItems.filter((item) =>
    hasEnoughColors(item, config),
  );
  const candidateSource =
    colorReadyItems.length >= requiredTotal ? colorReadyItems : usableItems;

  if (colorReadyItems.length < requiredTotal) {
    notes.push("색상이 충분한 사물이 부족하여 색상 조건을 완화했습니다.");
  }

  // 소범주 그룹핑
  const subcategoryGroups = new Map<string, ClassificationItem[]>();
  for (const item of candidateSource) {
    const key = `${item.topCategory}:${item.subCategory}`;
    const group = subcategoryGroups.get(key) ?? [];
    group.push(item);
    subcategoryGroups.set(key, group);
  }

  // Map 삽입 순서(분류 데이터 순서) 편향 제거
  const allGroups = shuffle([...subcategoryGroups.values()], random);

  const sufficientGroups = allGroups.filter((g) => g.length >= requiredTotal);

  let candidatePool: ClassificationItem[];

  if (sufficientGroups.length > 0) {
    // 충분한 소범주 중에서 랜덤 선택
    candidatePool =
      pickOne(sufficientGroups, random) ?? shuffle(candidateSource, random);
  } else {
    // 가장 큰 그룹들 중에서도 랜덤 (동일 크기면 여러 개일 수 있음)
    const maxLen = Math.max(...allGroups.map((g) => g.length), 0);
    const largestGroups = allGroups.filter((g) => g.length === maxLen);
    candidatePool =
      pickOne(largestGroups, random) ?? shuffle(candidateSource, random);

    if (candidatePool.length < requiredTotal) {
      const firstTop = candidatePool[0]?.topCategory;
      const sameTop = shuffle(
        candidateSource.filter((i) => i.topCategory === firstTop),
        random,
      );

      if (sameTop.length >= requiredTotal) {
        candidatePool = sameTop;
        notes.push(
          "같은 소범주의 사물이 부족하여 동일 대범주 내 다른 소범주를 사용했습니다.",
        );
      } else {
        candidatePool = shuffle(candidateSource, random);
        notes.push("사물 종류가 부족하여 여러 범주에서 사물을 선택했습니다.");
      }
    }
  }

  // 최종 후보도 한 번 더 shuffle
  const shuffled = shuffle(candidatePool, random);

  if (config.itemDistribution === "sameSetAcrossSizes") {
    const selected = shuffled.slice(0, requiredPerSize);
    for (const sizeKey of sizeKeys) {
      itemBySize.set(sizeKey, selected);
    }
    return { itemBySize, notes };
  }

  // differentSetPerSize
  let cursor = 0;
  for (const sizeKey of sizeKeys) {
    const selected = shuffled.slice(cursor, cursor + requiredPerSize);
    cursor += selected.length;
    itemBySize.set(sizeKey, selected);
  }

  return { itemBySize, notes };
}
/**
 * matchedSet:
 *   setIndex 0 → natural
 *   setIndex 1+ → 서로 다른 non-natural
 *   한 세트 = 각 크기에서 instanceIndex가 같은 것들
 */
function buildMatchedSetPalette(
  item: ClassificationItem,
  config: SizeSortingLevelConfig,
  sizeKeys: readonly SizeKey[],
  random: () => number,
): ClassificationVariant[] {
  const natural = getNaturalVariant(item)!;
  const alternatives = shuffle(getNonNaturalUniqueVariants(item), random);
  const setCount = config.instancesPerItemPerSize;

  // setColors[setIndex]
  const setColors: ClassificationVariant[] = [];
  for (let s = 0; s < setCount; s++) {
    if (s === 0) {
      setColors.push(natural);
    } else {
      setColors.push(
        alternatives[(s - 1) % Math.max(1, alternatives.length)] ?? natural,
      );
    }
  }

  // 생성 순서: size → itemType(1) → instance
  // palette[globalIndex] 가 그 순서를 따름
  const palette: ClassificationVariant[] = [];
  for (let sizeIndex = 0; sizeIndex < sizeKeys.length; sizeIndex++) {
    for (let instanceIndex = 0; instanceIndex < setCount; instanceIndex++) {
      palette.push(setColors[instanceIndex]);
    }
  }
  return palette;
}

function buildInstancePalette(
  item: ClassificationItem,
  totalInstances: number,
  random: () => number,
): ClassificationVariant[] {
  const natural = getNaturalVariant(item)!;
  const alternatives = shuffle(getNonNaturalUniqueVariants(item), random);

  const palette: ClassificationVariant[] = [natural];
  for (let i = 0; i < totalInstances - 1; i++) {
    palette.push(alternatives[i % Math.max(1, alternatives.length)] ?? natural);
  }
  return shuffle(palette, random); // natural 위치 랜덤
}

function buildSizeGroupPalette(
  item: ClassificationItem,
  config: SizeSortingLevelConfig,
  sizeKeys: readonly SizeKey[],
  random: () => number,
): ClassificationVariant[] {
  const natural = getNaturalVariant(item)!;
  const alternatives = shuffle(getNonNaturalUniqueVariants(item), random);
  const sizeCount = sizeKeys.length;
  const naturalSizeIndex = Math.floor(random() * sizeCount);

  const sizeColors: ClassificationVariant[] = [];
  let altIdx = 0;
  for (let i = 0; i < sizeCount; i++) {
    if (i === naturalSizeIndex) {
      sizeColors.push(natural);
    } else {
      sizeColors.push(
        alternatives[altIdx % Math.max(1, alternatives.length)] ?? natural,
      );
      altIdx++;
    }
  }

  const palette: ClassificationVariant[] = [];
  for (let s = 0; s < sizeCount; s++) {
    for (let i = 0; i < config.instancesPerItemPerSize; i++) {
      palette.push(sizeColors[s]);
    }
  }
  return palette;
}

function chooseVariantSimple(
  item: ClassificationItem,
  config: SizeSortingLevelConfig,
  occurrenceIndexForItem: number,
): ClassificationVariant {
  const natural = getNaturalVariant(item)!;
  const alternatives = getNonNaturalUniqueVariants(item);

  if (config.colorScheme === "naturalOnly" || alternatives.length === 0) {
    return natural;
  }

  if (config.colorAssignment === "itemType") {
    if (occurrenceIndexForItem === 0) return natural;
    return alternatives[(occurrenceIndexForItem - 1) % alternatives.length];
  }

  return natural;
}

// ----------------------------------------------------------
// Problem generator
// ----------------------------------------------------------

export function generateSizeSortingProblem(
  levelOrConfig: number | SizeSortingLevelConfig,
  items: readonly ClassificationItem[] = classificationItems,
  options: GenerateSizeSortingOptions = {},
): SizeSortingProblem {
  const config =
    typeof levelOrConfig === "number"
      ? SizeSortingLevels.find((e) => e.level === levelOrConfig)
      : levelOrConfig;

  if (!config) {
    throw new Error(`크기 분류 레벨을 찾을 수 없습니다: ${levelOrConfig}`);
  }

  const random = createRandom(options.seed);
  const sizeKeys = getSizeKeys(config.sizeMode);

  // const targets: SizeSortingTarget[] = sizeKeys.map((sizeKey) => ({
  //   id: `size-target-${sizeKey}`,
  //   sizeKey,
  //   label: SIZE_DEFINITIONS[sizeKey].label,
  //   scale: SIZE_DEFINITIONS[sizeKey].scale,
  // }));

  const targets: SizeSortingTarget[] = sizeKeys.map((sizeKey) => ({
    id: `size-target-${sizeKey}`,
    sizeKey,

    scale: SIZE_DEFINITIONS[sizeKey].scale,
  }));
  // const targets: SizeSortingTarget[] = sizeKeys.map((sizeKey) => ({
  //   id: `size-target-${sizeKey}`,
  //   sizeKey,
  //   label: SIZE_DEFINITIONS[sizeKey].label,
  //   scale: SIZE_DEFINITIONS[sizeKey].scale,
  // }));

  const selection = selectItemsForLevel(config, items, sizeKeys, random);
  const objects: SizeSortingObject[] = [];
  const occurrenceByItem = new Map<string, number>();

  // sameObject + 특수 색상 모드 → 미리 팔레트
  const prebuiltPalettes = new Map<string, ClassificationVariant[]>();

  if (config.itemRelation === "sameObject") {
    const item = selection.itemBySize.get(sizeKeys[0])?.[0];
    if (item) {
      const totalInstances = sizeKeys.length * config.instancesPerItemPerSize;

      let palette: ClassificationVariant[] = [];

      if (config.colorAssignment === "matchedSet") {
        palette = buildMatchedSetPalette(item, config, sizeKeys, random);
      } else if (config.colorAssignment === "instance") {
        palette = buildInstancePalette(item, totalInstances, random);
      } else if (config.colorAssignment === "sizeGroup") {
        palette = buildSizeGroupPalette(item, config, sizeKeys, random);
      }

      if (palette.length > 0) {
        prebuiltPalettes.set(item.id, palette);
      }
    }
  }

  let globalInstanceCounter = 0;

  for (let sizeIndex = 0; sizeIndex < sizeKeys.length; sizeIndex++) {
    const sizeKey = sizeKeys[sizeIndex];
    const selectedItems = selection.itemBySize.get(sizeKey) ?? [];

    for (
      let itemTypeIndex = 0;
      itemTypeIndex < selectedItems.length;
      itemTypeIndex++
    ) {
      const item = selectedItems[itemTypeIndex];

      for (
        let instanceIndex = 0;
        instanceIndex < config.instancesPerItemPerSize;
        instanceIndex++
      ) {
        const occurrenceIndexForItem = occurrenceByItem.get(item.id) ?? 0;

        let variant: ClassificationVariant;
        const palette = prebuiltPalettes.get(item.id);

        if (palette) {
          variant = palette[globalInstanceCounter] ?? palette[0];
        } else {
          variant = chooseVariantSimple(item, config, occurrenceIndexForItem);
        }

        occurrenceByItem.set(item.id, occurrenceIndexForItem + 1);
        globalInstanceCounter++;

        objects.push({
          id: `size-object-${config.level}-${sizeKey}-${item.id}-${itemTypeIndex}-${instanceIndex}`,
          itemId: item.id,
          name: item.name,
          svgKey: item.svgKey,
          sizeKey,
          scale: SIZE_DEFINITIONS[sizeKey].scale,
          targetId: `size-target-${sizeKey}`,
          variant,
        });
      }
    }
  }

  return {
    level: config.level,
    title: config.title,
    goal: config.goal,
    config,
    targets,
    objects: shuffle(objects, random),
    notes: selection.notes,
  };
}
