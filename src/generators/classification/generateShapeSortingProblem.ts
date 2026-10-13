// shapeSortingGenerator.ts

import { ShapeSortingLevelConfig } from "../../types/Classification/Shape/shapeSortingTypes";
import {
  ClassificationColorId,
  ClassificationItem,
  ClassificationShape,
  ClassificationVariant,
} from "../../types/game";

// ============================================
// 생성 결과 타입
// ============================================

export interface ShapeSortingTarget {
  id: string;
  shapeId: ClassificationShape;
}

export interface SimpleShapeObject {
  id: string;
  kind: "simple_shape";
  shapeId: ClassificationShape;
  colorId: ClassificationColorId;
  targetId: string;
}

export interface ShapeItemObject {
  id: string;
  kind: "item";
  itemId: string;
  name: string;
  svgKey: string;
  shapeId: ClassificationShape;
  variant: ClassificationVariant;
  targetId: string;
}

export type ShapeSortingObject = SimpleShapeObject | ShapeItemObject;

export interface ShapeSortingRound {
  level: number;
  rule: "shape";
  targets: ShapeSortingTarget[];
  objects: ShapeSortingObject[];

  // objectId -> targetId
  answer: Record<string, string>;
}

// ============================================
// 공통 유틸리티
// ============================================

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function pickOne<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("선택할 수 있는 데이터가 없습니다.");
  }

  return items[Math.floor(Math.random() * items.length)];
}

// ============================================
// Target 생성
// ============================================

function createTargets(config: ShapeSortingLevelConfig): ShapeSortingTarget[] {
  const availableShapes = [...new Set(config.shapePool)];

  if (availableShapes.length < config.targetCount) {
    throw new Error(`Level ${config.level}: Target 모양이 부족합니다.`);
  }

  return shuffle(availableShapes)
    .slice(0, config.targetCount)
    .map((shapeId) => ({
      id: `shape-target-${shapeId}`,
      shapeId,
    }));
}

// ============================================
// 단순 도형용 색상 생성
//
// distinctColorCount:
// 1 = 전체 오브젝트가 한 가지 색상
// 2 = 두 가지 색상을 Target마다 반복
// 4 = Target별로 서로 다른 두 색상씩 배정
// ============================================

function createSimpleShapeColors(
  count: number,
  config: ShapeSortingLevelConfig,
): ClassificationColorId[] {
  const colorPool = [...new Set(config.colorPool ?? [])];

  if (colorPool.length === 0) {
    throw new Error(`Level ${config.level}: colorPool이 비어 있습니다.`);
  }

  const distinctColorCount =
    config.distinctColorCount ??
    (config.objectColorMode === "same" ? 1 : count);

  if (!Number.isInteger(distinctColorCount) || distinctColorCount < 1) {
    throw new Error(
      `Level ${config.level}: distinctColorCount 설정이 올바르지 않습니다.`,
    );
  }

  if (distinctColorCount > colorPool.length) {
    throw new Error(
      `Level ${config.level}: 필요한 색상은 ${distinctColorCount}개지만 colorPool에는 ${colorPool.length}개뿐입니다.`,
    );
  }

  if (distinctColorCount > count) {
    throw new Error(
      `Level ${config.level}: 오브젝트 ${count}개에 서로 다른 색상 ${distinctColorCount}개를 배정할 수 없습니다.`,
    );
  }

  const selectedColors = shuffle(colorPool).slice(0, distinctColorCount);

  // ------------------------------------------
  // 1. 모든 도형이 같은 색상
  // Level 1~3
  // ------------------------------------------

  if (distinctColorCount === 1) {
    return Array(count).fill(selectedColors[0]);
  }

  // ------------------------------------------
  // 2. 두 가지 색상
  // Level 4~6
  //
  // Target 1: 빨강, 파랑
  // Target 2: 빨강, 파랑
  // ------------------------------------------

  if (distinctColorCount === 2) {
    const colors: ClassificationColorId[] = [];

    for (let targetIndex = 0; targetIndex < config.targetCount; targetIndex++) {
      for (
        let objectIndex = 0;
        objectIndex < config.objectsPerTarget;
        objectIndex++
      ) {
        colors.push(selectedColors[objectIndex % selectedColors.length]);
      }
    }

    return colors;
  }

  // ------------------------------------------
  // 3. 네 가지 색상
  // Level 7~9
  //
  // Target 1: 빨강, 파랑
  // Target 2: 초록, 노랑
  // ------------------------------------------

  if (
    distinctColorCount === 4 &&
    config.targetCount === 2 &&
    config.objectsPerTarget === 2
  ) {
    return selectedColors;
  }

  // ------------------------------------------
  // 4. 그 외의 설정
  //
  // 색상을 Target별로 가능한 한 균등하게 배정
  // ------------------------------------------

  const colorsPerTarget = distinctColorCount / config.targetCount;

  if (
    Number.isInteger(colorsPerTarget) &&
    colorsPerTarget >= 1 &&
    colorsPerTarget <= config.objectsPerTarget
  ) {
    const colors: ClassificationColorId[] = [];

    for (let targetIndex = 0; targetIndex < config.targetCount; targetIndex++) {
      const targetColors = selectedColors.slice(
        targetIndex * colorsPerTarget,
        (targetIndex + 1) * colorsPerTarget,
      );

      for (
        let objectIndex = 0;
        objectIndex < config.objectsPerTarget;
        objectIndex++
      ) {
        colors.push(targetColors[objectIndex % targetColors.length]);
      }
    }

    return colors;
  }

  // 설정이 위 조건에 맞지 않는 경우에도
  // 요청한 색상 개수만큼만 사용
  return Array.from(
    { length: count },
    (_, index) => selectedColors[index % selectedColors.length],
  );
}

// ============================================
// 단순 도형 Object 생성
// Level 1~9
// ============================================

function createSimpleShapeObjects(
  config: ShapeSortingLevelConfig,
  targets: ShapeSortingTarget[],
): SimpleShapeObject[] {
  const totalCount = config.targetCount * config.objectsPerTarget;

  const colors = createSimpleShapeColors(totalCount, config);

  let colorIndex = 0;

  const objects = targets.flatMap((target) =>
    Array.from({ length: config.objectsPerTarget }, () => {
      const object: SimpleShapeObject = {
        id: `simple-${config.level}-${colorIndex}`,
        kind: "simple_shape",
        shapeId: target.shapeId,
        colorId: colors[colorIndex],
        targetId: target.id,
      };

      colorIndex++;

      return object;
    }),
  );

  // 화면에 표시되는 순서만 섞고
  // 각 오브젝트의 targetId는 유지
  return shuffle(objects);
}

// ============================================
// 실제 사물 후보 검색
// Level 10 이상
// ============================================

function getItemCandidates(
  items: ClassificationItem[],
  shapeId: ClassificationShape,
  config: ShapeSortingLevelConfig,
): ClassificationItem[] {
  return items.filter((item) => {
    // 해당 모양을 가진 사물만 선택
    if (!item.shapes.includes(shapeId)) {
      return false;
    }

    // 사용할 수 있는 색상 Variant가 있는지 확인
    const allowedColors = config.colorPool;

    if (!allowedColors || allowedColors.length === 0) {
      return item.variants.length > 0;
    }

    return item.variants.some((variant) =>
      allowedColors.includes(variant.colorId),
    );
  });
}

// ============================================
// 실제 사물의 Variant 선택
// ============================================

function chooseItemVariant(
  item: ClassificationItem,
  config: ShapeSortingLevelConfig,
): ClassificationVariant {
  const allowedColors = config.colorPool ?? [];

  const candidates = item.variants.filter((variant) =>
    allowedColors.includes(variant.colorId),
  );

  if (candidates.length > 0) {
    return pickOne(candidates);
  }

  // 색상 후보가 없으면 자연색 사용
  const naturalVariant = item.variants.find(
    (variant) => variant.colorId === "natural",
  );

  if (naturalVariant) {
    return naturalVariant;
  }

  throw new Error(`${item.name}: 사용할 수 있는 Variant가 없습니다.`);
}

// ============================================
// 실제 사물 Object 생성
// ============================================

function createItemObjects(
  config: ShapeSortingLevelConfig,
  targets: ShapeSortingTarget[],
  items: ClassificationItem[],
): ShapeItemObject[] {
  const result: ShapeItemObject[] = [];
  const usedItemIds = new Set<string>();

  // Target 모양에 맞는 사물을 선택하고,
  // 한 라운드에서 같은 사물을 중복 사용하지 않음
  for (const target of targets) {
    const candidates = shuffle(
      getItemCandidates(items, target.shapeId, config).filter(
        (item) => !usedItemIds.has(item.id),
      ),
    );

    if (candidates.length < config.objectsPerTarget) {
      throw new Error(
        [
          `Level ${config.level}:`,
          `${target.shapeId} 모양의 사물이 부족합니다.`,
          `필요: ${config.objectsPerTarget}개`,
          `사용 가능: ${candidates.length}개`,
        ].join(" "),
      );
    }

    const selectedItems = candidates.slice(0, config.objectsPerTarget);

    for (const item of selectedItems) {
      usedItemIds.add(item.id);

      result.push({
        id: `item-${config.level}-${item.id}`,
        kind: "item",
        itemId: item.id,
        name: item.name,
        svgKey: item.svgKey,
        shapeId: target.shapeId,
        variant: chooseItemVariant(item, config),
        targetId: target.id,
      });
    }
  }

  return shuffle(result);
}

// ============================================
// 메인 Generator
// ============================================

export function generateShapeSortingProblem(
  config: ShapeSortingLevelConfig,
  items: ClassificationItem[],
): ShapeSortingRound {
  // 설정 오류 조기 검사
  if (config.targetCount * config.objectsPerTarget !== config.objectCount) {
    throw new Error(
      `Level ${config.level}: objectCount 설정이 올바르지 않습니다.`,
    );
  }

  // 1. Target 생성
  const targets = createTargets(config);

  // 2. Target의 모양에 맞는 Object 생성
  const objects =
    config.objectMode === "same"
      ? createSimpleShapeObjects(config, targets)
      : createItemObjects(config, targets, items);

  // 3. 정답 연결 생성
  const answer: Record<string, string> = {};

  for (const object of objects) {
    answer[object.id] = object.targetId;
  }

  // 4. 생성 결과 검증
  if (objects.length !== config.objectCount) {
    throw new Error(
      `Level ${config.level}: 생성된 Object 개수가 올바르지 않습니다.`,
    );
  }

  return {
    level: config.level,
    rule: "shape",
    targets,
    objects,
    answer,
  };
}
