import { ClassificationItem, ClassificationSubCategory } from "../types/game";
import {
  getPatternLevel,
  PATTERN_LEVELS,
} from "../types/Pattern/patternLevels";
import {
  GeneratedPattern,
  PatternElement,
  PatternLevelConfig,
  PatternRule,
  PatternShapeColorId,
} from "../types/Pattern/patternTypes";

/**
 * `generatePattern` receives the app's existing ClassificationItem collection.
 * Pass the same canonical item list used by the classification game.
 */
export type GeneratePatternOptions = {
  /** Existing classified items; required for item-based levels. */
  items: ClassificationItem[];
  /** Optional deterministic seed for tests/debugging. Omit for a normal random round. */
  random?: () => number;
  /** Number of answer choices to show, including the correct answer. Defaults to 3. */
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

/** Number of distinct symbols needed (AAB and ABB both use two symbols). */
const getDistinctSymbolCount = (rule: PatternRule): number =>
  rule === "ABC" ? 3 : 2;

/** Return the repeating key at a given position for the selected rule. */
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
    // case "random":
    //   // Avoid the very first/last position for random blanks where possible:
    //   // leave enough examples on both sides to infer the rule.
    //   return Array.from({ length: config.slotCount - 2 }, (_, i) => i + 1);
    case "random":
      return [...Array(config.slotCount).keys()];
  }
};

const createCandidateElements = (
  config: PatternLevelConfig,
  items: ClassificationItem[],
  random: () => number,
): PatternElement[] => {
  if (config.elementType === "color") {
    const colors = config.allowedColors ?? DEFAULT_COLORS;
    const distinctColors = [...new Set(colors)];
    if (distinctColors.length < getDistinctSymbolCount(config.rule)) {
      throw new Error(
        `Level ${config.level}: 규칙에 필요한 색상 후보가 부족합니다.`,
      );
    }
    return shuffle(distinctColors, random)
      .slice(0, getDistinctSymbolCount(config.rule))
      .map((colorId) => ({ kind: "color", colorId }));
  }

  if (config.elementType === "shapeColor") {
    const shapes = config.allowedShapes ?? [...DEFAULT_SHAPES];
    const colors = config.allowedColors ?? DEFAULT_COLORS;
    const required = getDistinctSymbolCount(config.rule);

    const candidates = shuffle(
      shapes.flatMap((shape) =>
        colors.map((colorId) => ({ kind: "shape" as const, shape, colorId })),
      ),
      random,
    );

    // Prefer visually distinct pairs/triples. The same shape or color may recur,
    // but a complete shape+color combination must be unique.
    if (candidates.length < required) {
      throw new Error(`Level ${config.level}: 도형+색상 후보가 부족합니다.`);
    }
    return candidates.slice(0, required);
  }

  const selection = config.itemSelection;
  if (!selection) {
    throw new Error(`Level ${config.level}: itemSelection 설정이 없습니다.`);
  }

  const validItems = items.filter((item) => {
    if (selection.excludeUnknown !== false && item.topCategory === "unknown") {
      return false;
    }
    if (item.subCategory === "unknown") return false;
    if (selection.subCategory && item.subCategory !== selection.subCategory) {
      return false;
    }
    return true;
  });

  let chosenSubCategory: ClassificationSubCategory | undefined =
    selection.subCategory;

  if (selection.sameSubCategory && !chosenSubCategory) {
    const counts = new Map<ClassificationSubCategory, ClassificationItem[]>();
    for (const item of validItems) {
      const current = counts.get(item.subCategory) ?? [];
      current.push(item);
      counts.set(item.subCategory, current);
    }

    const eligibleGroups = [...counts.entries()].filter(
      ([, group]) => uniqueItemsById(group).length >= selection.count,
    );

    if (eligibleGroups.length === 0) {
      throw new Error(
        `Level ${config.level}: 같은 하위 카테고리에서 서로 다른 사물 ${selection.count}개를 찾을 수 없습니다.`,
      );
    }

    chosenSubCategory = pickOne(eligibleGroups, random)[0];
  }

  const filteredItems = validItems.filter(
    (item) => !chosenSubCategory || item.subCategory === chosenSubCategory,
  );
  const distinctItems = uniqueItemsById(filteredItems);

  if (distinctItems.length < selection.count) {
    throw new Error(
      `Level ${config.level}: ${chosenSubCategory ?? "선택된 하위 카테고리"}에 서로 다른 사물이 ${selection.count}개 미만입니다.`,
    );
  }

  return shuffle(distinctItems, random)
    .slice(0, selection.count)
    .map((item) => ({ kind: "item", item }));
};

const uniqueItemsById = (items: ClassificationItem[]): ClassificationItem[] =>
  items.filter(
    (item, index) =>
      items.findIndex((candidate) => candidate.id === item.id) === index,
  );

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

const createChoicePool = (
  config: PatternLevelConfig,
  items: ClassificationItem[],
  patternElements: PatternElement[],
): PatternElement[] => {
  if (config.elementType === "color") {
    return [...new Set(config.allowedColors ?? DEFAULT_COLORS)].map(
      (colorId) => ({ kind: "color", colorId }),
    );
  }

  if (config.elementType === "shapeColor") {
    const shapes = config.allowedShapes ?? [...DEFAULT_SHAPES];
    const colors = config.allowedColors ?? DEFAULT_COLORS;
    return shapes.flatMap((shape) =>
      colors.map((colorId) => ({ kind: "shape" as const, shape, colorId })),
    );
  }

  const selection = config.itemSelection;
  if (!selection) return patternElements;

  const allowedSubCategory =
    selection.subCategory ??
    patternElements.find((element) => element.kind === "item")?.item
      .subCategory;

  const validItems = uniqueItemsById(items).filter((item) => {
    if (selection.excludeUnknown !== false && item.topCategory === "unknown")
      return false;
    if (item.subCategory === "unknown") return false;
    if (allowedSubCategory && item.subCategory !== allowedSubCategory)
      return false;
    return true;
  });

  return validItems.map((item) => ({ kind: "item", item }));
};

const makeChoices = (
  answer: PatternElement,
  allElements: PatternElement[],
  choiceCount: number,
  random: () => number,
): PatternElement[] => {
  const distractors = uniqueElements(allElements).filter(
    (element) => !sameElement(element, answer),
  );
  const selectedDistractors = shuffle(distractors, random).slice(
    0,
    Math.max(0, choiceCount - 1),
  );

  // If there are fewer distinct candidates than requested, return fewer choices
  // instead of duplicating a visual element.
  return shuffle(
    [answer, ...selectedDistractors.slice(0, choiceCount - 1)],
    random,
  );
};

/**
 * Creates one round of a pattern level.
 *
 * Important:
 * - For `random` blank positions, only internal slots are considered.
 * - A candidate blank is accepted only if the visible sequence still has
 *   enough evidence to determine the correct repeating element.
 * - `sequence[blankIndex]` is null; `answer` contains the removed element.
 */
export const generatePattern = (
  level: number,
  options: GeneratePatternOptions,
): GeneratedPattern => {
  const config = getPatternLevel(level);
  if (!config) {
    throw new Error(
      `존재하지 않는 패턴 레벨입니다: ${level}. 설정된 레벨은 ${PATTERN_LEVELS.length}개입니다.`,
    );
  }

  const random = options.random ?? Math.random;
  const choiceCount = Math.max(2, Math.floor(options.choiceCount ?? 3));
  const elements = createCandidateElements(config, options.items, random);
  const completeSequence = createSequence(
    config.rule,
    config.slotCount,
    elements,
  );

  const candidateIndices = shuffle(getAllowedBlankIndices(config), random);
  const blankIndex = candidateIndices.find((index) => {
    const answer = completeSequence[index];
    if (!answer) return false;

    // Check that the sequence's visible evidence includes another occurrence
    // of the answer's pattern key. For a single blank, this prevents selecting
    // a slot whose identity has no visible supporting occurrence.
    const answerKey = getRuleKeyAt(config.rule, index);
    const visibleMatchingKeyCount = completeSequence.reduce(
      (count, element, sequenceIndex) =>
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

  const choicePool = createChoicePool(config, options.items, elements);
  const choices = makeChoices(answer, choicePool, choiceCount, random);

  return {
    level: config.level,
    rule: config.rule,
    sequence,
    blankIndex,
    answer,
    choices,
  };
};

/** Optional helper when a screen already has the level config. */
export const generatePatternFromConfig = (
  config: PatternLevelConfig,
  options: GeneratePatternOptions,
): GeneratedPattern => {
  // The canonical level config is looked up by level to keep one source of truth.
  const canonicalConfig = getPatternLevel(config.level);
  if (!canonicalConfig) {
    throw new Error(`존재하지 않는 패턴 레벨입니다: ${config.level}`);
  }
  return generatePattern(canonicalConfig.level, options);
};
