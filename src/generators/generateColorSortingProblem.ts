// ============================================================
// Color Sorting Generator
// ============================================================

import {
  ColorSortingLevelConfig,
  ColorSortingObject,
  ColorSortingProblem,
  ColorSortingTarget,
} from "../types/colorSotringTypes";

import { ClassificationColorId, ClassificationItem } from "../types/game";

// ============================================================
// 색상 이름
// ============================================================

const COLOR_LABELS: Record<ClassificationColorId, string> = {
  natural: "자연색",
  red: "빨강",
  orange: "주황",
  yellow: "노랑",
  green: "초록",
  blue: "파랑",
  purple: "보라",
  pink: "분홍",
  brown: "갈색",
  black: "검정",
  white: "하양",
};

// ============================================================
// 단순 도형 목록 (L1~L3 공용)
// ============================================================

const SIMPLE_SHAPES = [
  { shape: "circle", label: "원", svgKey: "circle" },
  { shape: "square", label: "네모", svgKey: "square" },
  { shape: "triangle", label: "세모", svgKey: "triangle" },
  { shape: "star", label: "별", svgKey: "star" },
  { shape: "heart", label: "하트", svgKey: "heart" },
];
// ============================================================
// Random
// ============================================================

function shuffle<T>(array: T[]): T[] {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

// ============================================================
// Item이 실제로 해당 색상을 가지고 있는지
// ============================================================

function hasColor(
  item: ClassificationItem,
  colorId: ClassificationColorId,
): boolean {
  return item.variants.some((variant) => variant.colorId === colorId);
}

// ============================================================
// ⭐ 색상 선택
//
// 1. Level에서 사용할 수 있는 색상 Pool을 가져온다.
// 2. natural은 제외한다.
// 3. 실제 Item 데이터에 존재하는 색상만 남긴다.
// 4. colorCount만큼 랜덤 선택한다.
//
// "색깔을 먼저 정한다"의 핵심
// ============================================================

function generateColors(
  config: ColorSortingLevelConfig,
  items: ClassificationItem[],
): ClassificationColorId[] {
  const levelColors = config.colorPool;

  if (!levelColors) {
    throw new Error(`Level ${config.level}의 COLOR_POOL이 없습니다.`);
  }

  const availableColors = levelColors.filter((colorId) => {
    if (colorId === "natural") {
      return false;
    }

    return items.some((item) => hasColor(item, colorId));
  });

  if (availableColors.length < config.colorCount) {
    throw new Error(
      `Level ${config.level}에서 ` +
        `${config.colorCount}개의 색상을 선택할 수 없습니다.\n` +
        `현재 색상: ${availableColors.join(", ")}`,
    );
  }

  return pickRandom(availableColors, config.colorCount);
}

// ============================================================
// ⭐ 선택된 모든 색상을 가지고 있는 Item
//
// 예)
// 선택 색상 = yellow + white
//
// chocolate
// yellow ❌
// white ⭕
// → 탈락
//
// butterfly
// yellow ⭕
// white ⭕
// → 후보
// ============================================================

function getItemsWithAllColors(
  items: ClassificationItem[],
  colors: ClassificationColorId[],
): ClassificationItem[] {
  return items.filter((item) =>
    colors.every((colorId) => hasColor(item, colorId)),
  );
}

// ============================================================
// Target 생성
// ============================================================

function generateTargets(
  colors: ClassificationColorId[],
): ColorSortingTarget[] {
  return colors.map((colorId, index) => ({
    id: `target-${index}`,
    colorId,
    label: COLOR_LABELS[colorId],
  }));
}

// ============================================================
// L1 ~ L2
//
// 도형을 먼저 N종류만 뽑고(2개),
// 뽑은 도형을 "모든 색깔"로 각각 만든다.
//
// 예) 색 = blue + yellow, 도형 = circle + heart
//   → 파랑 원, 노랑 원, 파랑 하트, 노랑 하트
// ============================================================

function generateSimpleSameShapeObjects(
  config: ColorSortingLevelConfig,
  colors: ClassificationColorId[],
): ColorSortingObject[] {
  // 도형은 색깔과 무관하게 한 번만 선택
  const selectedShapes = pickRandom(SIMPLE_SHAPES, config.objectsPerTarget);

  const objects: ColorSortingObject[] = [];

  colors.forEach((colorId, colorIndex) => {
    selectedShapes.forEach((shape, shapeIndex) => {
      objects.push({
        id: `object-${colorIndex}-${shapeIndex}`,
        itemId: `simple-${shape.shape}`,
        label: `${COLOR_LABELS[colorId]} ${shape.label}`,
        colorId,
        svgKey: shape.svgKey,
        shape: shape.shape,
      });
    });
  });

  return shuffle(objects);
}

// ============================================================
// L1
//
// 단순 도형
// 색깔만 먼저 선택하고
// 각 색깔에 맞는 도형을 랜덤 생성
// ============================================================

function generateSimpleObjects(
  config: ColorSortingLevelConfig,
  colors: ClassificationColorId[],
): ColorSortingObject[] {
  const objects: ColorSortingObject[] = [];

  colors.forEach((colorId, colorIndex) => {
    const selectedShapes = pickRandom(SIMPLE_SHAPES, config.objectsPerTarget);

    selectedShapes.forEach((shape, shapeIndex) => {
      objects.push({
        id: `object-${colorIndex}-${shapeIndex}`,
        itemId: `simple-${shape.shape}`,
        label: `${COLOR_LABELS[colorId]} ${shape.label}`,
        colorId,
        svgKey: shape.svgKey,
        shape: shape.shape,
      });
    });
  });

  return shuffle(objects);
}

// ============================================================
// L2
//
// ⭐ 색상을 먼저 선택
// ⭐ 선택된 모든 색상을 가진 Item만 사용
//
// 같은 Item을 여러 색상으로 보여준다.
//
// 예)
// 색상 = yellow + white
//
// butterfly
// yellow butterfly
// white butterfly
//
// car
// yellow car
// white car
// ============================================================

function generateSameTypeObjects(
  config: ColorSortingLevelConfig,
  colors: ClassificationColorId[],
  items: ClassificationItem[],
): ColorSortingObject[] {
  const commonItems = getItemsWithAllColors(items, colors);

  if (commonItems.length < config.objectsPerTarget) {
    throw new Error(
      `Level ${config.level}에서 ` +
        `선택된 모든 색상을 가진 Item이 부족합니다.\n` +
        `필요: ${config.objectsPerTarget}\n` +
        `현재: ${commonItems.length}\n` +
        `색상: ${colors.join(", ")}`,
    );
  }

  const selectedItems = pickRandom(commonItems, config.objectsPerTarget);

  const objects: ColorSortingObject[] = [];

  colors.forEach((colorId, colorIndex) => {
    selectedItems.forEach((item, itemIndex) => {
      const validShapes = item.shapes.length > 0 ? item.shapes : [""];

      const shape = pickRandom(validShapes, 1)[0];

      objects.push({
        id: `object-${colorIndex}-${itemIndex}`,
        itemId: item.id,
        label: `${COLOR_LABELS[colorId]} ${item.name}`,
        colorId,
        svgKey: item.svgKey,
        shape,
      });
    });
  });

  return shuffle(objects);
}

// ============================================================
// L3 ~ L8
//
// ⭐ 색상은 이미 결정되어 있다.
//
// 각 색깔에 대해
// → 그 색상을 실제로 가지고 있는 Item 중 랜덤 선택
//
// 다른 색상 그룹끼리는 Item이 중복되지 않도록 한다.
// ============================================================

function generateDifferentObjects(
  config: ColorSortingLevelConfig,
  colors: ClassificationColorId[],
  items: ClassificationItem[],
): ColorSortingObject[] {
  const objects: ColorSortingObject[] = [];

  // 전체 문제에서 이미 사용한 Item
  const usedItemIds = new Set<string>();

  colors.forEach((colorId, colorIndex) => {
    const availableItems = items.filter(
      (item) => hasColor(item, colorId) && !usedItemIds.has(item.id),
    );

    if (availableItems.length < config.objectsPerTarget) {
      throw new Error(
        `색상 ${colorId}의 사용 가능한 Item이 부족합니다.\n` +
          `필요: ${config.objectsPerTarget}\n` +
          `현재: ${availableItems.length}`,
      );
    }

    const selectedItems = pickRandom(availableItems, config.objectsPerTarget);

    selectedItems.forEach((item, itemIndex) => {
      usedItemIds.add(item.id);

      const validShapes = item.shapes.length > 0 ? item.shapes : [""];

      const shape = pickRandom(validShapes, 1)[0];

      objects.push({
        id: `object-${colorIndex}-${itemIndex}`,
        itemId: item.id,
        label: `${COLOR_LABELS[colorId]} ${item.name}`,
        colorId,
        svgKey: item.svgKey,
        shape,
      });
    });
  });

  return shuffle(objects);
}

// ============================================================
// Object Generator
// ============================================================

function generateObjects(
  config: ColorSortingLevelConfig,
  colors: ClassificationColorId[],
  items: ClassificationItem[],
): ColorSortingObject[] {
  switch (config.objectMode) {
    case "simple_same_shape":
      return generateSimpleSameShapeObjects(config, colors);
    case "simple":
      return generateSimpleObjects(config, colors);

    case "same_type":
      return generateSameTypeObjects(config, colors, items);

    case "different":
      return generateDifferentObjects(config, colors, items);

    default:
      throw new Error(`지원하지 않는 objectMode입니다.`);
  }
}

// ============================================================
// MAIN GENERATOR
// ============================================================

export function generateColorSortingProblem(
  config: ColorSortingLevelConfig,
  round: number,
  items: ClassificationItem[],
): ColorSortingProblem {
  // ==========================================================
  // 1. ⭐ 색깔을 가장 먼저 선택
  // ==========================================================

  const colors = generateColors(config, items);

  // ==========================================================
  // 2. Target 생성
  // ==========================================================

  const targets = generateTargets(colors);

  // ==========================================================
  // 3. 선택된 색깔을 기준으로 Object 생성
  // ==========================================================

  const objects = generateObjects(config, colors, items);

  // ==========================================================
  // 4. 정답 생성
  // ==========================================================

  const answer = colors.map((colorId) => ({
    targetColorId: colorId,

    objectIds: objects
      .filter((object) => object.colorId === colorId)
      .map((object) => object.id),
  }));

  // ==========================================================
  // 5. Problem 완성
  // ==========================================================

  return {
    level: config.level,
    round,
    targets,
    objects,
    answer,
  };
}
