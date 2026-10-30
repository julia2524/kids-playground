import {
  ClassificationItem,
  ClassificationShape,
  ClassificationSubCategory,
} from "../types/game";
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
  /**
   * @deprecated 선택지 개수는 이제 레벨 설정(PatternLevelConfig.choiceCount)이 결정한다.
   * 기존 호출부 호환을 위해 필드만 남겨 두며 값은 무시된다.
   */
  choiceCount?: number;
};

type ShapeElement = Extract<PatternElement, { kind: "shape" }>;

const DEFAULT_COLORS: PatternShapeColorId[] = [
  "red",
  "yellow",
  "green",
  "blue",
  "black",
];

const DEFAULT_SHAPES: ClassificationShape[] = [
  "circle",
  "square",
  "triangle",
  "star",
  "heart",
];

const ALL_RULES: PatternRule[] = ["AB", "AAB", "ABB", "ABC"];

/* -------------------------------------------------------------------------- */
/* 기본 유틸                                                                    */
/* -------------------------------------------------------------------------- */

const randomIndex = (length: number, random: () => number): number =>
  Math.min(length - 1, Math.floor(random() * length));

const pickOne = <T>(values: readonly T[], random: () => number): T => {
  if (values.length === 0) {
    throw new Error("패턴 요소 후보가 비어 있습니다.");
  }
  return values[randomIndex(values.length, random)];
};

const shuffle = <T>(values: readonly T[], random: () => number): T[] => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1, random);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const uniqueValues = <T>(values: readonly T[]): T[] => [...new Set(values)];

/** 후보 중 서로 다른 n개를 무작위로 뽑는다. 부족하면 오류. */
const takeDistinct = <T>(
  config: PatternLevelConfig,
  label: string,
  values: readonly T[],
  n: number,
  random: () => number,
): T[] => {
  if (values.length < n) {
    throw new Error(
      `Level ${config.level}(${config.stageId}): ${label} 후보가 부족합니다. (필요 ${n}, 보유 ${values.length})`,
    );
  }
  return shuffle(values, random).slice(0, n);
};

const isShapeElement = (element: PatternElement): element is ShapeElement =>
  element.kind === "shape";

const makeShape = (
  shape: ClassificationShape,
  colorId: PatternShapeColorId,
): ShapeElement => ({ kind: "shape", shape, colorId });

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

const uniqueItemsById = (items: ClassificationItem[]): ClassificationItem[] =>
  items.filter(
    (item, index) =>
      items.findIndex((candidate) => candidate.id === item.id) === index,
  );

const colorsOf = (elements: PatternElement[]): PatternShapeColorId[] =>
  uniqueValues(
    elements.flatMap((element) =>
      element.kind === "item" ? [] : [element.colorId],
    ),
  );

const shapesOf = (elements: PatternElement[]): ClassificationShape[] =>
  uniqueValues(
    elements.flatMap((element) =>
      element.kind === "shape" ? [element.shape] : [],
    ),
  );

/* -------------------------------------------------------------------------- */
/* 규칙 / 빈칸                                                                  */
/* -------------------------------------------------------------------------- */

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
    case "random":
      // 모든 위치를 후보로 두되, 아래 isBlankDeducible 검증을 통과한 위치만 사용한다.
      return [...Array(config.slotCount).keys()];
  }
};

/**
 * 보이는 요소만으로 `rule`을 가정했을 때의 결과.
 * - consistent: 같은 key는 같은 요소, 다른 key는 다른 요소여야 한다.
 * - value: 빈칸 key에 해당하는 보이는 요소 (없으면 null = 유추 불가)
 */
const inferBlank = (
  rule: PatternRule,
  sequence: Array<PatternElement | null>,
  blankIndex: number,
): { consistent: boolean; value: PatternElement | null } => {
  const byKey = new Map<number, PatternElement>();

  for (let i = 0; i < sequence.length; i += 1) {
    const element = sequence[i];
    if (i === blankIndex || element === null) continue;

    const key = getRuleKeyAt(rule, i);
    const existing = byKey.get(key);
    if (existing && !sameElement(existing, element)) {
      return { consistent: false, value: null };
    }
    byKey.set(key, element);
  }

  const entries = [...byKey.values()];
  for (let a = 0; a < entries.length; a += 1) {
    for (let b = a + 1; b < entries.length; b += 1) {
      // key가 다른데 같은 요소 → 이 규칙으로는 해석할 수 없다.
      if (sameElement(entries[a], entries[b])) {
        return { consistent: false, value: null };
      }
    }
  }

  return {
    consistent: true,
    value: byKey.get(getRuleKeyAt(rule, blankIndex)) ?? null,
  };
};

/**
 * 해당 빈칸이 "정답이 하나로 정해지는 위치"인지 검증한다.
 * 1) 실제 규칙으로 해석했을 때, 같은 key의 요소가 보이고 그 값이 정답과 같아야 한다.
 * 2) 다른 규칙(AB/AAB/ABB/ABC)으로도 해석 가능하다면, 반드시 같은 정답이 나와야 한다.
 *    (다른 정답이 나오거나 유추 불가인 해석이 남아 있으면 모호한 빈칸으로 보고 제외)
 */
const isBlankDeducible = (
  trueRule: PatternRule,
  complete: PatternElement[],
  blankIndex: number,
): boolean => {
  const answer = complete[blankIndex];
  if (!answer) return false;

  const visible: Array<PatternElement | null> = complete.map((element, i) =>
    i === blankIndex ? null : element,
  );

  return ALL_RULES.every((rule) => {
    const result = inferBlank(rule, visible, blankIndex);
    if (!result.consistent) return rule !== trueRule;
    return result.value !== null && sameElement(result.value, answer);
  });
};

/* -------------------------------------------------------------------------- */
/* Target 생성                                                                  */
/* -------------------------------------------------------------------------- */

type TargetResult = {
  /** A, B(, C) 순서의 Target 요소 */
  elements: PatternElement[];
  /** 사물 레벨에서 방해 요소를 뽑을 수 있는 후보 (같은 subCategory 조건 적용 후) */
  itemPool: ClassificationItem[];
  subCategory?: ClassificationSubCategory;
};

const createTargets = (
  config: PatternLevelConfig,
  items: ClassificationItem[],
  random: () => number,
): TargetResult => {
  const count = config.targetCount;
  const colorPool = uniqueValues(config.allowedColors ?? DEFAULT_COLORS);
  const shapePool = uniqueValues(config.allowedShapes ?? DEFAULT_SHAPES);

  switch (config.targetMode) {
    case "colors": {
      const colors = takeDistinct(config, "색상", colorPool, count, random);
      return {
        elements: colors.map((colorId) => ({ kind: "color", colorId })),
        itemPool: [],
      };
    }

    case "sameShapeColors": {
      // 모양은 1개로 고정하고 색상만 다르게 한다.
      const [shape] = takeDistinct(config, "모양", shapePool, 1, random);
      const colors = takeDistinct(config, "색상", colorPool, count, random);
      return {
        elements: colors.map((colorId) => makeShape(shape, colorId)),
        itemPool: [],
      };
    }

    case "mixedShapeColors":
    case "pairedShapeColors": {
      // 모양 N개와 색상 N개를 먼저 각각 뽑은 뒤 1:1로 짝짓는다.
      // → 모든 Target은 서로 다른 모양 + 서로 다른 색상.
      const shapes = takeDistinct(config, "모양", shapePool, count, random);
      const colors = takeDistinct(config, "색상", colorPool, count, random);
      return {
        elements: shapes.map((shape, i) => makeShape(shape, colors[i])),
        itemPool: [],
      };
    }

    case "items": {
      const selection = config.itemSelection;
      if (!selection) {
        throw new Error(
          `Level ${config.level}: itemSelection 설정이 없습니다.`,
        );
      }
      if (selection.count !== count) {
        throw new Error(
          `Level ${config.level}: itemSelection.count(${selection.count})와 targetCount(${count})가 다릅니다.`,
        );
      }

      const extra =
        config.distractor.rule === "sameSubCategory"
          ? config.distractor.count
          : 0;
      const needed = selection.count + extra;

      const validItems = uniqueItemsById(items).filter((item) => {
        if (
          selection.excludeUnknown !== false &&
          item.topCategory === "unknown"
        ) {
          return false;
        }
        if (item.subCategory === "unknown") return false;
        return true;
      });

      let pool = validItems;
      let chosenSubCategory: ClassificationSubCategory | undefined;

      if (selection.sameSubCategory) {
        chosenSubCategory = selection.subCategory;

        if (!chosenSubCategory) {
          const groups = new Map<
            ClassificationSubCategory,
            ClassificationItem[]
          >();
          for (const item of validItems) {
            const group = groups.get(item.subCategory) ?? [];
            group.push(item);
            groups.set(item.subCategory, group);
          }

          // 타깃 + 방해 요소까지 모두 같은 subCategory에서 뽑을 수 있는 그룹만 후보
          const eligible = [...groups.entries()].filter(
            ([, group]) => group.length >= needed,
          );
          if (eligible.length === 0) {
            throw new Error(
              `Level ${config.level}(${config.stageId}): 같은 하위 카테고리에서 서로 다른 사물 ${needed}개를 찾을 수 없습니다.`,
            );
          }
          chosenSubCategory = pickOne(eligible, random)[0];
        }

        pool = validItems.filter(
          (item) => item.subCategory === chosenSubCategory,
        );
      } else if (selection.subCategory) {
        chosenSubCategory = selection.subCategory;
        pool = validItems.filter(
          (item) => item.subCategory === selection.subCategory,
        );
      }

      if (pool.length < needed) {
        throw new Error(
          `Level ${config.level}(${config.stageId}): ${chosenSubCategory ?? "선택된 범위"}에 서로 다른 사물이 ${needed}개 미만입니다.`,
        );
      }

      const picked = shuffle(pool, random).slice(0, selection.count);
      return {
        elements: picked.map((item) => ({ kind: "item", item })),
        itemPool: pool,
        subCategory: chosenSubCategory,
      };
    }
  }
};

/* -------------------------------------------------------------------------- */
/* 방해 요소(선택지) 생성                                                         */
/* -------------------------------------------------------------------------- */

const createDistractors = (
  config: PatternLevelConfig,
  targets: PatternElement[],
  answer: PatternElement,
  itemPool: ClassificationItem[],
  random: () => number,
): PatternElement[] => {
  const { rule, count } = config.distractor;
  const colorPool = uniqueValues(config.allowedColors ?? DEFAULT_COLORS);
  const shapePool = uniqueValues(config.allowedShapes ?? DEFAULT_SHAPES);
  const targetColors = colorsOf(targets);
  const targetShapes = shapesOf(targets);

  const newColors = colorPool.filter((c) => !targetColors.includes(c));
  const newShapes = shapePool.filter((s) => !targetShapes.includes(s));

  switch (rule) {
    case "none":
      return [];

    case "otherColor": {
      const colors = takeDistinct(
        config,
        "Target 외 색상",
        newColors,
        count,
        random,
      );
      return colors.map((colorId) => ({ kind: "color", colorId }));
    }

    case "newShapeNewColor": {
      const shapes = takeDistinct(
        config,
        "Target 외 모양",
        newShapes,
        count,
        random,
      );
      const colors = takeDistinct(
        config,
        "Target 외 색상",
        newColors,
        count,
        random,
      );
      return shapes.map((shape, i) => makeShape(shape, colors[i]));
    }

    case "targetShapeNewColor": {
      // Target에 등장한 모양 + Target에 등장하지 않은 색상
      const shapes = shuffle(targetShapes, random);
      if (shapes.length === 0) {
        throw new Error(`Level ${config.level}: Target 모양이 없습니다.`);
      }
      const colors = takeDistinct(
        config,
        "Target 외 색상",
        newColors,
        count,
        random,
      );
      return colors.map((colorId, i) =>
        makeShape(shapes[i % shapes.length], colorId),
      );
    }

    case "newShapeTargetColor": {
      // Target에 등장하지 않은 모양(1개) + Target에 등장한 색상
      // count=1 → 무작위 Target 색 1개, count=2 → Target 색 2개 모두 (같은 새 모양)
      const [shape] = takeDistinct(
        config,
        "Target 외 모양",
        newShapes,
        1,
        random,
      );
      const colors = takeDistinct(
        config,
        "Target 색상",
        targetColors,
        count,
        random,
      );
      return colors.map((colorId) => makeShape(shape, colorId));
    }

    case "swapBothColors": {
      // A(모양1, 색1), B(모양2, 색2) → (모양1, 색2), (모양2, 색1)
      // 예: 💚(하트+초록), 🟣(원+보라) → 💜(하트+보라), 🟢(원+초록)
      const shapeTargets = targets.filter(isShapeElement);
      if (shapeTargets.length !== 2) {
        throw new Error(
          `Level ${config.level}: swapBothColors는 Target 2개의 도형이 필요합니다.`,
        );
      }
      const [a, b] = shapeTargets;
      return [makeShape(a.shape, b.colorId), makeShape(b.shape, a.colorId)];
    }

    case "swapAllColors": {
      // Target 모양 2개 × Target 색 2개 중 Target이 아닌 나머지 교차 조합 2개
      const shapeTargets = targets.filter(isShapeElement);
      if (shapeTargets.length !== 2) {
        throw new Error(
          `Level ${config.level}: swapAllColors는 Target 2개의 도형이 필요합니다.`,
        );
      }
      const [a, b] = shapeTargets;
      return [makeShape(a.shape, b.colorId), makeShape(b.shape, a.colorId)];
    }

    case "sameSubCategory": {
      const targetIds = new Set(
        targets.flatMap((element) =>
          element.kind === "item" ? [element.item.id] : [],
        ),
      );
      const candidates = itemPool.filter((item) => !targetIds.has(item.id));
      const picked = takeDistinct(
        config,
        "같은 하위 카테고리 사물",
        candidates,
        count,
        random,
      );
      return picked.map((item) => ({ kind: "item", item }));
    }
  }
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

/* -------------------------------------------------------------------------- */
/* 메인                                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Creates one round of a pattern level.
 *
 * - Target 생성(createTargets)과 선택지 생성(createDistractors)은 분리되어 있다.
 * - 빈칸은 레벨의 blankPosition 규칙을 따르되, isBlankDeducible 검증을 통과한
 *   위치만 사용한다.
 * - `sequence[blankIndex]` is null; `answer` contains the removed element.
 * - 선택지 = (Target 요소들 | swapBothColors 단계에서는 정답만) + 방해 요소.
 *   정답은 항상 포함되며 동일한 시각 요소는 중복되지 않는다.
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

  // 1) Target 요소
  const { elements, itemPool, subCategory } = createTargets(
    config,
    options.items,
    random,
  );
  const completeSequence = createSequence(
    config.rule,
    config.slotCount,
    elements,
  );

  // 2) 빈칸 (정답을 유추할 수 있는 위치만)
  const candidateIndices = shuffle(getAllowedBlankIndices(config), random);
  const blankIndex = candidateIndices.find((index) =>
    isBlankDeducible(config.rule, completeSequence, index),
  );

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

  // 3) 선택지 = 기본 보기 + 방해 요소
  const distractors = createDistractors(
    config,
    elements,
    answer,
    itemPool,
    random,
  );
  const baseChoices =
    config.distractor.rule === "swapBothColors" ? [answer] : elements;
  const choices = shuffle([...baseChoices, ...distractors], random);

  // 4) 사후 검증
  if (!choices.some((choice) => sameElement(choice, answer))) {
    throw new Error(`Level ${level}: 선택지에 정답이 없습니다.`);
  }
  if (uniqueElements(choices).length !== choices.length) {
    throw new Error(`Level ${level}: 선택지에 중복된 요소가 있습니다.`);
  }
  if (choices.length !== config.choiceCount) {
    throw new Error(
      `Level ${level}: 선택지 개수가 ${config.choiceCount}개여야 하는데 ${choices.length}개입니다.`,
    );
  }

  return {
    level: config.level,
    rule: config.rule,
    sequence,
    blankIndex,
    answer,
    choices,
    stageId: config.stageId,
    legacyLevel: config.legacyLevel,
    targets: elements,
    distractors,
    distractorRule: config.distractor.rule,
    subCategory,
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
