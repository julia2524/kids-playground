// import { ClassificationItem, ClassificationSubCategory } from "../types/game";
// import {
//   getPatternLevel,
//   PATTERN_LEVELS,
// } from "../types/Pattern/patternLevels";
// import {
//   GeneratedPattern,
//   PatternElement,
//   PatternLevelConfig,
//   PatternRule,
//   PatternShapeColorId,
// } from "../types/Pattern/patternTypes";

// /**
//  * `generatePattern` receives the app's existing ClassificationItem collection.
//  * Pass the same canonical item list used by the classification game.
//  */
// export type GeneratePatternOptions = {
//   /** Existing classified items; required for item-based levels. */
//   items: ClassificationItem[];
//   /** Optional deterministic seed for tests/debugging. Omit for a normal random round. */
//   random?: () => number;
//   /** Number of answer choices to show, including the correct answer. Defaults to 3. */
//   choiceCount?: number;
// };

// const DEFAULT_COLORS: PatternShapeColorId[] = [
//   "red",
//   "yellow",
//   "green",
//   "blue",
//   "black",
// ];

// const DEFAULT_SHAPES = [
//   "circle",
//   "square",
//   "triangle",
//   "star",
//   "heart",
// ] as const;

// const randomIndex = (length: number, random: () => number): number =>
//   Math.min(length - 1, Math.floor(random() * length));

// const pickOne = <T>(values: readonly T[], random: () => number): T => {
//   if (values.length === 0) {
//     throw new Error("패턴 요소 후보가 비어 있습니다.");
//   }
//   return values[randomIndex(values.length, random)];
// };

// const shuffle = <T>(values: T[], random: () => number): T[] => {
//   const result = [...values];
//   for (let i = result.length - 1; i > 0; i -= 1) {
//     const j = randomIndex(i + 1, random);
//     [result[i], result[j]] = [result[j], result[i]];
//   }
//   return result;
// };

// const sameElement = (a: PatternElement, b: PatternElement): boolean => {
//   if (a.kind !== b.kind) return false;

//   if (a.kind === "color" && b.kind === "color") {
//     return a.colorId === b.colorId;
//   }

//   if (a.kind === "shape" && b.kind === "shape") {
//     return a.shape === b.shape && a.colorId === b.colorId;
//   }

//   if (a.kind === "item" && b.kind === "item") {
//     return a.item.id === b.item.id;
//   }

//   return false;
// };

// const uniqueElements = (elements: PatternElement[]): PatternElement[] =>
//   elements.filter(
//     (element, index) =>
//       elements.findIndex((candidate) => sameElement(candidate, element)) ===
//       index,
//   );

// /** Number of distinct symbols needed (AAB and ABB both use two symbols). */
// const getDistinctSymbolCount = (rule: PatternRule): number =>
//   rule === "ABC" ? 3 : 2;

// /** Return the repeating key at a given position for the selected rule. */
// const getRuleKeyAt = (rule: PatternRule, index: number): number => {
//   switch (rule) {
//     case "AB":
//       return index % 2;
//     case "AAB":
//       return [0, 0, 1][index % 3];
//     case "ABB":
//       return [0, 1, 1][index % 3];
//     case "ABC":
//       return index % 3;
//   }
// };

// const getAllowedBlankIndices = (config: PatternLevelConfig): number[] => {
//   const lastIndex = config.slotCount - 1;

//   switch (config.blankPosition) {
//     case "end":
//       return [lastIndex];
//     case "middle":
//       return [Math.floor(config.slotCount / 2)];
//     case "start":
//       return [0];
//     // case "random":
//     //   // Avoid the very first/last position for random blanks where possible:
//     //   // leave enough examples on both sides to infer the rule.
//     //   return Array.from({ length: config.slotCount - 2 }, (_, i) => i + 1);
//     case "random":
//       return [...Array(config.slotCount).keys()];
//   }
// };

// const createCandidateElements = (
//   config: PatternLevelConfig,
//   items: ClassificationItem[],
//   random: () => number,
// ): PatternElement[] => {
//   if (config.elementType === "color") {
//     const colors = config.allowedColors ?? DEFAULT_COLORS;
//     const distinctColors = [...new Set(colors)];
//     if (distinctColors.length < getDistinctSymbolCount(config.rule)) {
//       throw new Error(
//         `Level ${config.level}: 규칙에 필요한 색상 후보가 부족합니다.`,
//       );
//     }
//     return shuffle(distinctColors, random)
//       .slice(0, getDistinctSymbolCount(config.rule))
//       .map((colorId) => ({ kind: "color", colorId }));
//   }

//   if (config.elementType === "shapeColor") {
//     const shapes = config.allowedShapes ?? [...DEFAULT_SHAPES];
//     const colors = config.allowedColors ?? DEFAULT_COLORS;
//     const required = getDistinctSymbolCount(config.rule);

//     const candidates = shuffle(
//       shapes.flatMap((shape) =>
//         colors.map((colorId) => ({ kind: "shape" as const, shape, colorId })),
//       ),
//       random,
//     );

//     // Prefer visually distinct pairs/triples. The same shape or color may recur,
//     // but a complete shape+color combination must be unique.
//     if (candidates.length < required) {
//       throw new Error(`Level ${config.level}: 도형+색상 후보가 부족합니다.`);
//     }
//     return candidates.slice(0, required);
//   }

//   const selection = config.itemSelection;
//   if (!selection) {
//     throw new Error(`Level ${config.level}: itemSelection 설정이 없습니다.`);
//   }

//   const validItems = items.filter((item) => {
//     if (selection.excludeUnknown !== false && item.topCategory === "unknown") {
//       return false;
//     }
//     if (item.subCategory === "unknown") return false;
//     if (selection.subCategory && item.subCategory !== selection.subCategory) {
//       return false;
//     }
//     return true;
//   });

//   let chosenSubCategory: ClassificationSubCategory | undefined =
//     selection.subCategory;

//   if (selection.sameSubCategory && !chosenSubCategory) {
//     const counts = new Map<ClassificationSubCategory, ClassificationItem[]>();
//     for (const item of validItems) {
//       const current = counts.get(item.subCategory) ?? [];
//       current.push(item);
//       counts.set(item.subCategory, current);
//     }

//     const eligibleGroups = [...counts.entries()].filter(
//       ([, group]) => uniqueItemsById(group).length >= selection.count,
//     );

//     if (eligibleGroups.length === 0) {
//       throw new Error(
//         `Level ${config.level}: 같은 하위 카테고리에서 서로 다른 사물 ${selection.count}개를 찾을 수 없습니다.`,
//       );
//     }

//     chosenSubCategory = pickOne(eligibleGroups, random)[0];
//   }

//   const filteredItems = validItems.filter(
//     (item) => !chosenSubCategory || item.subCategory === chosenSubCategory,
//   );
//   const distinctItems = uniqueItemsById(filteredItems);

//   if (distinctItems.length < selection.count) {
//     throw new Error(
//       `Level ${config.level}: ${chosenSubCategory ?? "선택된 하위 카테고리"}에 서로 다른 사물이 ${selection.count}개 미만입니다.`,
//     );
//   }

//   return shuffle(distinctItems, random)
//     .slice(0, selection.count)
//     .map((item) => ({ kind: "item", item }));
// };

// const uniqueItemsById = (items: ClassificationItem[]): ClassificationItem[] =>
//   items.filter(
//     (item, index) =>
//       items.findIndex((candidate) => candidate.id === item.id) === index,
//   );

// const createSequence = (
//   rule: PatternRule,
//   slotCount: number,
//   elements: PatternElement[],
// ): PatternElement[] =>
//   Array.from({ length: slotCount }, (_, index) => {
//     const key = getRuleKeyAt(rule, index);
//     const element = elements[key];
//     if (!element) {
//       throw new Error(`패턴 생성 실패: ${rule} 규칙의 요소 ${key}가 없습니다.`);
//     }
//     return element;
//   });

// const createChoicePool = (
//   config: PatternLevelConfig,
//   items: ClassificationItem[],
//   patternElements: PatternElement[],
// ): PatternElement[] => {
//   if (config.elementType === "color") {
//     return [...new Set(config.allowedColors ?? DEFAULT_COLORS)].map(
//       (colorId) => ({ kind: "color", colorId }),
//     );
//   }

//   if (config.elementType === "shapeColor") {
//     const shapes = config.allowedShapes ?? [...DEFAULT_SHAPES];
//     const colors = config.allowedColors ?? DEFAULT_COLORS;
//     return shapes.flatMap((shape) =>
//       colors.map((colorId) => ({ kind: "shape" as const, shape, colorId })),
//     );
//   }

//   const selection = config.itemSelection;
//   if (!selection) return patternElements;

//   const allowedSubCategory =
//     selection.subCategory ??
//     patternElements.find((element) => element.kind === "item")?.item
//       .subCategory;

//   const validItems = uniqueItemsById(items).filter((item) => {
//     if (selection.excludeUnknown !== false && item.topCategory === "unknown")
//       return false;
//     if (item.subCategory === "unknown") return false;
//     if (allowedSubCategory && item.subCategory !== allowedSubCategory)
//       return false;
//     return true;
//   });

//   return validItems.map((item) => ({ kind: "item", item }));
// };

// const makeChoices = (
//   answer: PatternElement,
//   allElements: PatternElement[],
//   choiceCount: number,
//   random: () => number,
// ): PatternElement[] => {
//   const distractors = uniqueElements(allElements).filter(
//     (element) => !sameElement(element, answer),
//   );
//   const selectedDistractors = shuffle(distractors, random).slice(
//     0,
//     Math.max(0, choiceCount - 1),
//   );

//   // If there are fewer distinct candidates than requested, return fewer choices
//   // instead of duplicating a visual element.
//   return shuffle(
//     [answer, ...selectedDistractors.slice(0, choiceCount - 1)],
//     random,
//   );
// };

// /**
//  * Creates one round of a pattern level.
//  *
//  * Important:
//  * - For `random` blank positions, only internal slots are considered.
//  * - A candidate blank is accepted only if the visible sequence still has
//  *   enough evidence to determine the correct repeating element.
//  * - `sequence[blankIndex]` is null; `answer` contains the removed element.
//  */
// export const generatePattern = (
//   level: number,
//   options: GeneratePatternOptions,
// ): GeneratedPattern => {
//   const config = getPatternLevel(level);
//   if (!config) {
//     throw new Error(
//       `존재하지 않는 패턴 레벨입니다: ${level}. 설정된 레벨은 ${PATTERN_LEVELS.length}개입니다.`,
//     );
//   }

//   const random = options.random ?? Math.random;
//   const choiceCount = Math.max(2, Math.floor(options.choiceCount ?? 3));
//   const elements = createCandidateElements(config, options.items, random);
//   const completeSequence = createSequence(
//     config.rule,
//     config.slotCount,
//     elements,
//   );

//   const candidateIndices = shuffle(getAllowedBlankIndices(config), random);
//   const blankIndex = candidateIndices.find((index) => {
//     const answer = completeSequence[index];
//     if (!answer) return false;

//     // Check that the sequence's visible evidence includes another occurrence
//     // of the answer's pattern key. For a single blank, this prevents selecting
//     // a slot whose identity has no visible supporting occurrence.
//     const answerKey = getRuleKeyAt(config.rule, index);
//     const visibleMatchingKeyCount = completeSequence.reduce(
//       (count, element, sequenceIndex) =>
//         sequenceIndex !== index &&
//         getRuleKeyAt(config.rule, sequenceIndex) === answerKey
//           ? count + 1
//           : count,
//       0,
//     );

//     return visibleMatchingKeyCount >= 1;
//   });

//   if (blankIndex === undefined) {
//     throw new Error(
//       `Level ${level}: 규칙을 유지하며 빈칸을 배치할 수 없습니다.`,
//     );
//   }

//   const answer = completeSequence[blankIndex];
//   if (!answer) {
//     throw new Error(`Level ${level}: 정답 요소를 생성하지 못했습니다.`);
//   }

//   const sequence: Array<PatternElement | null> = [...completeSequence];
//   sequence[blankIndex] = null;

//   const choicePool = createChoicePool(config, options.items, elements);
//   const choices = makeChoices(answer, choicePool, choiceCount, random);

//   return {
//     level: config.level,
//     rule: config.rule,
//     sequence,
//     blankIndex,
//     answer,
//     choices,
//   };
// };

// /** Optional helper when a screen already has the level config. */
// export const generatePatternFromConfig = (
//   config: PatternLevelConfig,
//   options: GeneratePatternOptions,
// ): GeneratedPattern => {
//   // The canonical level config is looked up by level to keep one source of truth.
//   const canonicalConfig = getPatternLevel(config.level);
//   if (!canonicalConfig) {
//     throw new Error(`존재하지 않는 패턴 레벨입니다: ${config.level}`);
//   }
//   return generatePattern(canonicalConfig.level, options);
// };

import type {
  ClassificationItem,
  ClassificationSubCategory,
} from "../types/game";
import {
  getPatternLevel,
  PATTERN_LEVELS,
} from "../types/Pattern/patternLevels";
import type {
  GeneratedPattern,
  PatternChoiceConfig,
  PatternDistractorRule,
  PatternElement,
  PatternLevelConfig,
  PatternRule,
  PatternShapeColorId,
} from "../types/Pattern/patternTypes";

export type GeneratePatternOptions = {
  /** Existing classified items; required for item-based levels. */
  items: ClassificationItem[];
  /** @deprecated Levels are sequential; each level now has one fixed configuration. */
  subLevel?: number;
  /** Optional deterministic random source for tests/debugging. */
  random?: () => number;
  /**
   * @deprecated Choice count is defined by the selected level/sublevel now.
   * Kept temporarily so existing call sites continue to type-check.
   */
  choiceCount?: number;
};

const DEFAULT_COLORS: PatternShapeColorId[] = [
  "red",
  "yellow",
  "green",
  "blue",
  "black",
];

const DEFAULT_SHAPES = [
  "circle",
  "square",
  "triangle",
  "star",
  "heart",
] as const;

const randomIndex = (length: number, random: () => number): number =>
  Math.min(length - 1, Math.floor(random() * length));

const pickOne = <T>(values: readonly T[], random: () => number): T => {
  if (values.length === 0) {
    throw new Error("패턴 요소 후보가 비어 있습니다.");
  }
  return values[randomIndex(values.length, random)];
};

const shuffle = <T>(values: T[], random: () => number): T[] => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1, random);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const sameElement = (a: PatternElement, b: PatternElement): boolean => {
  if (a.kind !== b.kind) return false;

  if (a.kind === "color" && b.kind === "color") {
    return a.colorId === b.colorId;
  }

  if (a.kind === "shape" && b.kind === "shape") {
    return a.shape === b.shape && a.colorId === b.colorId;
  }

  if (a.kind === "item" && b.kind === "item") {
    return a.item.id === b.item.id;
  }

  return false;
};

const uniqueElements = (elements: PatternElement[]): PatternElement[] =>
  elements.filter(
    (element, index) =>
      elements.findIndex((candidate) => sameElement(candidate, element)) ===
      index,
  );

const getDistinctSymbolCount = (rule: PatternRule): number =>
  rule === "ABC" ? 3 : 2;

const getRuleKeyAt = (rule: PatternRule, index: number): number => {
  switch (rule) {
    case "AB":
      return index % 2;
    case "AAB":
      return [0, 0, 1][index % 3];
    case "ABB":
      return [0, 1, 1][index % 3];
    case "ABC":
      return index % 3;
  }
};

const getAllowedBlankIndices = (config: PatternLevelConfig): number[] => {
  const lastIndex = config.slotCount - 1;

  switch (config.blankPosition) {
    case "end":
      return [lastIndex];
    case "middle":
      return [Math.floor(config.slotCount / 2)];
    case "start":
      return [0];
    case "random":
      // Leave examples on both sides whenever possible.
      return Array.from(
        { length: Math.max(0, config.slotCount - 2) },
        (_, i) => i + 1,
      );
  }
};

const uniqueItemsById = (items: ClassificationItem[]): ClassificationItem[] =>
  items.filter(
    (item, index) =>
      items.findIndex((candidate) => candidate.id === item.id) === index,
  );

const getValidItems = (
  config: PatternLevelConfig,
  items: ClassificationItem[],
): ClassificationItem[] => {
  const selection = config.itemSelection;
  return uniqueItemsById(items).filter((item) => {
    if (selection?.excludeUnknown !== false && item.topCategory === "unknown") {
      return false;
    }
    if (item.subCategory === "unknown") return false;
    if (selection?.subCategory && item.subCategory !== selection.subCategory) {
      return false;
    }
    return true;
  });
};

const createCandidateElements = (
  config: PatternLevelConfig,
  items: ClassificationItem[],
  random: () => number,
): PatternElement[] => {
  const required = getDistinctSymbolCount(config.rule);

  if (config.elementType === "color") {
    const colors = [...new Set(config.allowedColors ?? DEFAULT_COLORS)];
    if (colors.length < required) {
      throw new Error(
        `Level ${config.level}: 규칙에 필요한 색상 후보가 부족합니다.`,
      );
    }
    return shuffle(colors, random)
      .slice(0, required)
      .map((colorId) => ({ kind: "color", colorId }));
  }

  if (config.elementType === "shapeColor") {
    const shapes = [...new Set(config.allowedShapes ?? [...DEFAULT_SHAPES])];
    const colors = [...new Set(config.allowedColors ?? DEFAULT_COLORS)];
    const strategy = config.shapeColorStrategy ?? "independent";

    if (strategy === "sameShapeDifferentColors") {
      if (colors.length < required || shapes.length < 1) {
        throw new Error(
          `Level ${config.level}: 같은 모양 패턴의 후보가 부족합니다.`,
        );
      }
      const shape = pickOne(shapes, random);
      return shuffle(colors, random)
        .slice(0, required)
        .map((colorId) => ({ kind: "shape", shape, colorId }));
    }

    if (strategy === "differentShapesDifferentColors") {
      if (shapes.length < required || colors.length < required) {
        throw new Error(
          `Level ${config.level}: 서로 다른 모양/색상 후보가 부족합니다.`,
        );
      }
      const selectedShapes = shuffle(shapes, random).slice(0, required);
      const selectedColors = shuffle(colors, random).slice(0, required);
      return selectedShapes.map((shape, index) => ({
        kind: "shape",
        shape,
        colorId: selectedColors[index],
      }));
    }

    const candidates = shuffle(
      shapes.flatMap((shape) =>
        colors.map((colorId) => ({ kind: "shape" as const, shape, colorId })),
      ),
      random,
    );
    if (candidates.length < required) {
      throw new Error(`Level ${config.level}: 도형+색상 후보가 부족합니다.`);
    }
    return candidates.slice(0, required);
  }

  const selection = config.itemSelection;
  if (!selection) {
    throw new Error(`Level ${config.level}: itemSelection 설정이 없습니다.`);
  }

  const validItems = getValidItems(config, items);
  let chosenSubCategory: ClassificationSubCategory | undefined =
    selection.subCategory;

  if (selection.sameSubCategory && !chosenSubCategory) {
    const groups = new Map<ClassificationSubCategory, ClassificationItem[]>();
    for (const item of validItems) {
      const group = groups.get(item.subCategory) ?? [];
      group.push(item);
      groups.set(item.subCategory, group);
    }

    const eligibleGroups = [...groups.entries()].filter(
      ([, group]) => uniqueItemsById(group).length >= selection.count,
    );
    if (eligibleGroups.length === 0) {
      throw new Error(
        `Level ${config.level}: 같은 하위 카테고리에서 서로 다른 사물 ${selection.count}개를 찾을 수 없습니다.`,
      );
    }
    chosenSubCategory = pickOne(eligibleGroups, random)[0];
  }

  const candidates = validItems.filter(
    (item) => !chosenSubCategory || item.subCategory === chosenSubCategory,
  );
  if (candidates.length < selection.count) {
    throw new Error(
      `Level ${config.level}: ${chosenSubCategory ?? "선택된 하위 카테고리"}에 서로 다른 사물이 ${selection.count}개 미만입니다.`,
    );
  }

  return shuffle(candidates, random)
    .slice(0, selection.count)
    .map((item) => ({ kind: "item", item }));
};

const createSequence = (
  rule: PatternRule,
  slotCount: number,
  elements: PatternElement[],
): PatternElement[] =>
  Array.from({ length: slotCount }, (_, index) => {
    const key = getRuleKeyAt(rule, index);
    const element = elements[key];
    if (!element) {
      throw new Error(`패턴 생성 실패: ${rule} 규칙의 요소 ${key}가 없습니다.`);
    }
    return element;
  });

const getShapeElements = (elements: PatternElement[]) =>
  elements.filter(
    (element): element is Extract<PatternElement, { kind: "shape" }> =>
      element.kind === "shape",
  );

const getColorElements = (elements: PatternElement[]) =>
  elements.filter(
    (element): element is Extract<PatternElement, { kind: "color" }> =>
      element.kind === "color",
  );

const createDistractorCandidates = (
  rule: PatternDistractorRule,
  config: PatternLevelConfig,
  items: ClassificationItem[],
  patternElements: PatternElement[],
  answer: PatternElement,
  selected: PatternElement[],
): PatternElement[] => {
  const shapes = [...new Set(config.allowedShapes ?? [...DEFAULT_SHAPES])];
  const colors = [...new Set(config.allowedColors ?? DEFAULT_COLORS)];
  const patternShapes = getShapeElements(patternElements);
  const patternColors = getColorElements(patternElements);
  const usedShapes = [
    ...new Set(patternShapes.map((element) => element.shape)),
  ];
  const usedColors = [
    ...new Set([
      ...patternColors.map((element) => element.colorId),
      ...patternShapes.map((element) => element.colorId),
    ]),
  ];

  if (config.elementType === "color") {
    if (rule !== "new-color") return [];
    return colors
      .filter((colorId) => !usedColors.includes(colorId))
      .map((colorId) => ({ kind: "color", colorId }));
  }

  if (config.elementType === "item") {
    if (rule !== "same-subcategory-item") return [];
    const targetItems = patternElements.filter(
      (element): element is Extract<PatternElement, { kind: "item" }> =>
        element.kind === "item",
    );
    const subCategory =
      targetItems[0]?.item.subCategory ?? config.itemSelection?.subCategory;
    if (!subCategory) return [];
    const usedIds = new Set([
      ...targetItems.map((element) => element.item.id),
      ...selected
        .filter(
          (element): element is Extract<PatternElement, { kind: "item" }> =>
            element.kind === "item",
        )
        .map((element) => element.item.id),
    ]);
    return getValidItems(config, items)
      .filter(
        (item) => item.subCategory === subCategory && !usedIds.has(item.id),
      )
      .map((item) => ({ kind: "item", item }));
  }

  if (config.elementType !== "shapeColor") return [];

  const shapeCandidates = shapes.filter((shape) => !usedShapes.includes(shape));
  const colorCandidates = colors.filter(
    (colorId) => !usedColors.includes(colorId),
  );
  // Ignore original target elements when tracking dimensions already used by distractors.
  const selectedShapeDistractors = getShapeElements(selected).filter(
    (candidate) =>
      !patternElements.some((element) => sameElement(element, candidate)),
  );
  const selectedColorDistractors = getShapeElements(selected).filter(
    (candidate) =>
      !patternElements.some((element) => sameElement(element, candidate)),
  );

  switch (rule) {
    case "new-shape-new-color":
      return shapeCandidates.flatMap((shape) =>
        colorCandidates.map((colorId) => ({
          kind: "shape" as const,
          shape,
          colorId,
        })),
      );

    case "same-shape-new-color":
      return patternShapes.flatMap(({ shape }) =>
        colorCandidates.map((colorId) => ({
          kind: "shape" as const,
          shape,
          colorId,
        })),
      );

    case "new-shape-same-color":
      return shapeCandidates.flatMap((shape) =>
        [...new Set(usedColors)].map((colorId) => ({
          kind: "shape" as const,
          shape,
          colorId,
        })),
      );

    case "same-shape-new-color-each": {
      const alreadyUsedShapes = new Set(
        selectedShapeDistractors.map((element) => element.shape),
      );
      return patternShapes
        .filter(({ shape }) => !alreadyUsedShapes.has(shape))
        .flatMap(({ shape }) =>
          colorCandidates.map((colorId) => ({
            kind: "shape" as const,
            shape,
            colorId,
          })),
        );
    }

    case "new-shape-same-color-each": {
      const alreadyUsedColors = new Set(
        selectedColorDistractors.map((element) => element.colorId),
      );
      return [...new Set(usedColors)]
        .filter((colorId) => !alreadyUsedColors.has(colorId))
        .flatMap((colorId) =>
          shapeCandidates.map((shape) => ({
            kind: "shape" as const,
            shape,
            colorId,
          })),
        );
    }

    case "mixed-shape-color":
      return patternShapes.flatMap(({ shape }) =>
        [...new Set(usedColors)].map((colorId) => ({
          kind: "shape" as const,
          shape,
          colorId,
        })),
      );

    case "swapped-color": {
      if (answer.kind !== "shape") return [];
      return [...new Set(usedColors)]
        .filter((colorId) => colorId !== answer.colorId)
        .map((colorId) => ({ kind: "shape", shape: answer.shape, colorId }));
    }

    case "new-color":
    case "same-subcategory-item":
      return [];
  }
};

const makeChoices = (
  config: PatternLevelConfig,
  answer: PatternElement,
  patternElements: PatternElement[],
  items: ClassificationItem[],
  random: () => number,
): PatternElement[] => {
  const choiceConfig: PatternChoiceConfig = config.choiceConfig;
  const base = choiceConfig.base === "answer" ? [answer] : [...patternElements];
  const choices = uniqueElements(base);

  for (const rule of choiceConfig.distractors) {
    const candidates = uniqueElements(
      createDistractorCandidates(
        rule,
        config,
        items,
        patternElements,
        answer,
        choices,
      ),
    ).filter(
      (candidate) =>
        !choices.some((existing) => sameElement(existing, candidate)),
    );

    if (candidates.length === 0) {
      throw new Error(
        `Level ${config.level}: '${rule}' 오답 후보를 만들 수 없습니다. allowedShapes/allowedColors 또는 사물 데이터의 범위를 확인해 주세요.`,
      );
    }

    choices.push(pickOne(candidates, random));
  }

  return shuffle(choices, random);
};

/**
 * 선택한 레벨/하위 레벨의 패턴 한 라운드를 생성한다.
 * 각 번호는 독립된 레벨이며, 선택지 구성도 해당 레벨에 고정된다.
 */
export const generatePattern = (
  level: number,
  options: GeneratePatternOptions,
): GeneratedPattern => {
  const config = getPatternLevel(level);
  const subLevel = 0;

  if (!config) {
    throw new Error(`존재하지 않는 패턴 레벨입니다: ${level}.`);
  }

  const random = options.random ?? Math.random;
  const elements = createCandidateElements(config, options.items, random);
  const completeSequence = createSequence(
    config.rule,
    config.slotCount,
    elements,
  );

  const candidateIndices = shuffle(getAllowedBlankIndices(config), random);
  const blankIndex = candidateIndices.find((index) => {
    const answerKey = getRuleKeyAt(config.rule, index);
    const visibleMatchingKeyCount = completeSequence.reduce(
      (count, _element, sequenceIndex) =>
        sequenceIndex !== index &&
        getRuleKeyAt(config.rule, sequenceIndex) === answerKey
          ? count + 1
          : count,
      0,
    );
    return visibleMatchingKeyCount >= 1;
  });

  if (blankIndex === undefined) {
    throw new Error(
      `Level ${level}: 규칙을 유지하며 빈칸을 배치할 수 없습니다.`,
    );
  }

  const answer = completeSequence[blankIndex];
  if (!answer) {
    throw new Error(`Level ${level}: 정답 요소를 생성하지 못했습니다.`);
  }

  const sequence: Array<PatternElement | null> = [...completeSequence];
  sequence[blankIndex] = null;

  const choices = makeChoices(config, answer, elements, options.items, random);

  const expectedChoiceCount =
    (config.choiceConfig.base === "answer"
      ? 1
      : uniqueElements(elements).length) +
    config.choiceConfig.distractors.length;
  if (choices.length !== expectedChoiceCount) {
    throw new Error(
      `Level ${level}: 선택지 ${expectedChoiceCount}개를 기대했지만 ${choices.length}개가 생성되었습니다.`,
    );
  }
  if (!choices.some((choice) => sameElement(choice, answer))) {
    throw new Error(`Level ${level}: 선택지에 정답이 포함되지 않았습니다.`);
  }

  return {
    level: config.level,
    subLevel: config.subLevel,
    rule: config.rule,
    sequence,
    blankIndex,
    answer,
    choices,
  };
};

/** 화면에서 이미 config를 가지고 있을 때 사용하는 호환 helper. */
export const generatePatternFromConfig = (
  config: PatternLevelConfig,
  options: GeneratePatternOptions,
): GeneratedPattern => {
  const canonicalConfig = getPatternLevel(config.level);
  if (!canonicalConfig) {
    throw new Error(`존재하지 않는 패턴 레벨입니다: ${config.level}.`);
  }
  return generatePattern(canonicalConfig.level, {
    ...options,
    subLevel: canonicalConfig.subLevel,
  });
};
