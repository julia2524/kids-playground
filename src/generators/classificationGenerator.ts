// // ============================================================
// // generator.ts
// // ============================================================

// import {
//   CategoryId,
//   Choice,
//   ColorId,
//   GameItem,
//   LEVEL_CONFIGS,
//   LevelConfig,
//   PositionId,
//   Question,
//   ShapeId,
//   SizeLevel,
// } from "../data/classification/classificationLevels";

// // ─── 유틸 ───────────────────────────────────────────────────
// const COLORS: ColorId[] = [
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "blue",
//   "purple",
// ];
// const SHAPES: ShapeId[] = ["circle", "triangle", "square", "star", "heart"];
// const SIZES: SizeLevel[] = ["small", "medium", "large"];
// const POSITIONS: PositionId[] = ["left", "right", "top", "bottom", "center"];

// function randomPick<T>(arr: T[]): T {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function shuffle<T>(arr: T[]): T[] {
//   return [...arr].sort(() => Math.random() - 0.5);
// }

// /** topCategory → CategoryId 매핑 (item.category 우선 사용) */
// function resolveCategory(item: GameItem): CategoryId {
//   if (item.category) return item.category;
//   const map: Record<string, CategoryId> = {
//     food: "food",
//     animal: "animal",
//     vehicle: "vehicle",
//     fruit: "fruit",
//     tool: "tool",
//     shape: "shape",
//   };
//   return map[item.topCategory] ?? "object";
// }

// /** 프롬프트 생성 */
// function buildPrompt(
//   config: LevelConfig,
//   target: {
//     color?: ColorId;
//     shape?: ShapeId;
//     category?: CategoryId;
//     size?: SizeLevel;
//     quantity?: number;
//     position?: PositionId;
//   },
// ): string {
//   const colorName: Record<ColorId, string> = {
//     red: "빨간색",
//     orange: "주황색",
//     yellow: "노란색",
//     green: "초록색",
//     blue: "파란색",
//     purple: "보라색",
//   };
//   const shapeName: Record<ShapeId, string> = {
//     circle: "동그란",
//     triangle: "세모난",
//     square: "네모난",
//     star: "별 모양",
//     heart: "하트 모양",
//   };
//   const categoryName: Record<CategoryId, string> = {
//     animal: "동물",
//     food: "음식",
//     fruit: "과일",
//     vehicle: "탈것",
//     tool: "도구",
//     shape: "도형",
//     object: "물건",
//   };
//   const sizeName: Record<SizeLevel, string> = {
//     small: "작은",
//     medium: "중간",
//     large: "큰",
//   };
//   const positionName: Record<PositionId, string> = {
//     left: "왼쪽에 있는",
//     right: "오른쪽에 있는",
//     top: "위에 있는",
//     bottom: "아래에 있는",
//     center: "가운데에 있는",
//     inside: "안에 있는",
//     outside: "밖에 있는",
//   };

//   switch (config.promptTemplate) {
//     case "find_color":
//       return `${colorName[target.color!]}인 것을 찾아보세요.`;
//     case "find_shape":
//       return `${shapeName[target.shape!]} 것을 찾아보세요.`;
//     case "find_category":
//       return `${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_size":
//       return `${sizeName[target.size!]} 것을 찾아보세요.`;
//     case "find_largest":
//       return `가장 큰 것을 찾아보세요.`;
//     case "find_quantity":
//       return target.quantity && target.quantity > 2
//         ? `많은 것을 찾아보세요.`
//         : `적은 것을 찾아보세요.`;
//     case "find_most":
//       return `가장 많은 것을 찾아보세요.`;
//     case "find_position":
//       return `${positionName[target.position!]} 것을 찾아보세요.`;
//     case "find_color_and_category":
//       return `${colorName[target.color!]} ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_shape_and_category":
//       return `${shapeName[target.shape!]} ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_color_and_size":
//       return `${sizeName[target.size!]} ${colorName[target.color!]} 물건을 찾아보세요.`;
//     case "find_category_and_size":
//       return `${sizeName[target.size!]} ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_largest_category":
//       return `가장 큰 ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_position_and_color":
//       return `${positionName[target.position!]} ${colorName[target.color!]}을(를) 찾아보세요.`;
//     case "find_position_and_category":
//       return `${positionName[target.position!]} ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_quantity_and_category":
//       return `${target.quantity}개 있는 ${categoryName[target.category!]}을(를) 찾아보세요.`;

//     // ── 새로 변경 및 추가된 3조건 템플릿 반영 ──
//     case "find_size_color_category":
//       return `${sizeName[target.size!]} ${colorName[target.color!]} ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     case "find_position_quantity_category":
//       return `${positionName[target.position!]} ${target.quantity}개의 ${categoryName[target.category!]}을(를) 찾아보세요.`;

//     case "find_not_color":
//       return `${colorName[target.color!]}이(가) 아닌 것을 찾아보세요.`;
//     case "find_not_color_and_category":
//       return `${colorName[target.color!]}이(가) 아닌 ${categoryName[target.category!]}을(를) 찾아보세요.`;
//     default:
//       return "맞는 것을 찾아보세요.";
//   }
// }

// // ─── 핵심 Generator ─────────────────────────────────────────
// export function generateQuestion(
//   level: number,
//   itemPool: GameItem[],
// ): Question {
//   const config = LEVEL_CONFIGS[level];
//   if (!config) {
//     throw new Error(`Unknown level: ${level}`);
//   }

//   // 1. 타겟 속성 결정
//   const targetColor = randomPick(COLORS);
//   const targetShape = randomPick(SHAPES);
//   const targetSize: SizeLevel = config.isComparative
//     ? "large"
//     : randomPick(["small", "large"]);
//   const targetPosition = randomPick(["left", "right"] as PositionId[]);
//   const targetQuantity = config.isComparative
//     ? randomPick([4, 5, 6])
//     : randomPick([2, 3, 4]);

//   const categoriesInPool = [
//     ...new Set(itemPool.map(resolveCategory)),
//   ] as CategoryId[];
//   const targetCategory: CategoryId = randomPick(
//     categoriesInPool.length ? categoriesInPool : ["animal"],
//   );

//   const target = {
//     color: targetColor,
//     shape: targetShape,
//     category: targetCategory,
//     size: targetSize,
//     quantity: targetQuantity,
//     position: targetPosition,
//   };

//   // 2. 정답 후보 아이템 필터링
//   let correctCandidates = itemPool.filter((item) => {
//     const cat = resolveCategory(item);
//     if (config.attributes.includes("category") && cat !== targetCategory) {
//       return false;
//     }
//     if (
//       config.attributes.includes("shape") &&
//       !item.shape.includes(targetShape)
//     ) {
//       return false;
//     }
//     return true;
//   });

//   if (correctCandidates.length === 0) {
//     correctCandidates = itemPool;
//   }
//   const correctItem = randomPick(correctCandidates);

//   // 3. Choice 생성 및 키 중복 회피 유틸
//   const choices: Choice[] = [];
//   const usedKeys = new Set<string>();

//   const makeChoice = (
//     item: GameItem,
//     overrides: Partial<Choice> & { isCorrect: boolean },
//   ): Choice => {
//     let color = overrides.color ?? randomPick(item.variants.map((v) => v.id));
//     let size = overrides.size ?? "medium";
//     let position = overrides.position;
//     let quantity = overrides.quantity;

//     let key = `${item.id}-${color}-${size}-${position ?? ""}-${quantity ?? ""}`;
//     let attempts = 0;

//     // 키 중복 시 다른 색상/크기/위치로 시도하여 재귀 재앙 방지
//     while (usedKeys.has(key) && attempts < 15) {
//       color = randomPick(COLORS);
//       key = `${item.id}-${color}-${size}-${position ?? ""}-${quantity ?? ""}`;
//       attempts++;
//     }

//     usedKeys.add(key);

//     return {
//       id: key,
//       itemId: item.id,
//       color,
//       shape: item.shape[0],
//       size,
//       position,
//       quantity,
//       isCorrect: overrides.isCorrect,
//     };
//   };

//   // ── 정답 선택지 생성 ──
//   if (config.isNegation) {
//     // 부정 조건: Target 색상이 아닌 것
//     const nonTargetColors = COLORS.filter((c) => c !== targetColor);
//     const correctCount = config.allowMultipleCorrect
//       ? Math.min(config.choiceCount - 1, 2)
//       : 1;

//     for (let i = 0; i < correctCount; i++) {
//       const item = randomPick(correctCandidates);
//       choices.push(
//         makeChoice(item, {
//           color: randomPick(nonTargetColors),
//           isCorrect: true,
//           size: config.attributes.includes("size") ? targetSize : "medium",
//         }),
//       );
//     }
//   } else if (config.attributes.includes("quantity")) {
//     choices.push(
//       makeChoice(correctItem, {
//         color: targetColor,
//         quantity: targetQuantity,
//         position: config.attributes.includes("position")
//           ? targetPosition
//           : undefined,
//         isCorrect: true,
//         size: config.attributes.includes("size") ? targetSize : "medium",
//       }),
//     );
//   } else if (config.attributes.includes("position")) {
//     choices.push(
//       makeChoice(correctItem, {
//         color: targetColor,
//         position: targetPosition,
//         isCorrect: true,
//         size: targetSize,
//       }),
//     );
//   } else {
//     choices.push(
//       makeChoice(correctItem, {
//         color: config.attributes.includes("color")
//           ? targetColor
//           : randomPick(COLORS),
//         size: config.attributes.includes("size") ? targetSize : "medium",
//         isCorrect: true,
//       }),
//     );
//   }

//   // ── 오답(Distractor) 생성 ──
//   const needed = config.choiceCount - choices.length;

//   for (let i = 0; i < needed; i++) {
//     let distractor: Choice | null = null;

//     // 1) 신규 strategy: category_swap (L3 등 범주 바꾸기)
//     if (config.distractorStrategy === "category_swap") {
//       const diffCatItems = itemPool.filter(
//         (it) => resolveCategory(it) !== targetCategory,
//       );
//       const wrongItem = randomPick(
//         diffCatItems.length ? diffCatItems : itemPool,
//       );
//       distractor = makeChoice(wrongItem, {
//         color: randomPick(COLORS),
//         size: "medium",
//         isCorrect: false,
//       });
//     }
//     // 2) 신규 strategy: negation_filter (L24 등 부정 조건 오답 - Target 색상을 섞어줌)
//     else if (config.distractorStrategy === "negation_filter") {
//       // 부정 문제에서 "틀린 답"은 targetColor를 그대로 가지고 있는 아이템
//       distractor = makeChoice(correctItem, {
//         color: targetColor, // targetColor를 가졌으므로 부정 조건에 위배(오답)
//         size: config.attributes.includes("size") ? targetSize : "medium",
//         isCorrect: false,
//       });
//     }
//     // 3) mixed (복합 속성 레벨 오답)
//     else if (
//       config.distractorStrategy === "mixed" ||
//       config.attributes.length >= 2
//     ) {
//       const strategy = i % 3; // 0: 색만, 1: 종류만, 2: 완전 틀림

//       if (strategy === 0 && config.attributes.includes("color")) {
//         // 색만 맞고 종류는 틀림
//         const wrongItem = randomPick(
//           itemPool.filter((it) => resolveCategory(it) !== targetCategory),
//         );
//         distractor = makeChoice(wrongItem ?? randomPick(itemPool), {
//           color: targetColor,
//           size: randomPick(SIZES),
//           isCorrect: false,
//         });
//       } else if (strategy === 1 && config.attributes.includes("category")) {
//         // 종류만 맞고 색/크기는 틀림
//         const sameCatItems = itemPool.filter(
//           (it) => resolveCategory(it) === targetCategory,
//         );
//         distractor = makeChoice(
//           randomPick(sameCatItems.length ? sameCatItems : itemPool),
//           {
//             color: randomPick(COLORS.filter((c) => c !== targetColor)),
//             size: randomPick(SIZES.filter((s) => s !== targetSize)),
//             isCorrect: false,
//           },
//         );
//       } else if (config.attributes.includes("position")) {
//         const wrongPos = POSITIONS.filter((p) => p !== targetPosition);
//         distractor = makeChoice(randomPick(itemPool), {
//           color: randomPick(COLORS),
//           position: randomPick(wrongPos),
//           isCorrect: false,
//         });
//       } else if (config.attributes.includes("quantity")) {
//         const wrongQty = [1, 2, 3, 5, 6].filter((q) => q !== targetQuantity);
//         distractor = makeChoice(randomPick(itemPool), {
//           color: randomPick(COLORS),
//           quantity: randomPick(wrongQty),
//           isCorrect: false,
//         });
//       } else {
//         // 완전 틀림
//         distractor = makeChoice(randomPick(itemPool), {
//           color: randomPick(COLORS.filter((c) => c !== targetColor)),
//           size: randomPick(SIZES),
//           isCorrect: false,
//         });
//       }
//     }
//     // 4) 기존 단일 오답 전략들
//     else if (config.distractorStrategy === "same_item_diff_color") {
//       distractor = makeChoice(correctItem, {
//         color: randomPick(COLORS.filter((c) => c !== targetColor)),
//         isCorrect: false,
//       });
//     } else if (config.distractorStrategy === "same_category_diff_size") {
//       distractor = makeChoice(correctItem, {
//         color: targetColor,
//         size: targetSize === "large" ? "small" : "large",
//         isCorrect: false,
//       });
//     } else if (config.distractorStrategy === "position_swap") {
//       const wrongPos = POSITIONS.filter((p) => p !== targetPosition);
//       distractor = makeChoice(correctItem, {
//         position: randomPick(wrongPos),
//         isCorrect: false,
//       });
//     } else if (config.distractorStrategy === "quantity_swap") {
//       const wrongQty = [1, 2, 3, 5, 6].filter((q) => q !== targetQuantity);
//       distractor = makeChoice(correctItem, {
//         quantity: randomPick(wrongQty),
//         isCorrect: false,
//       });
//     } else {
//       // fallback
//       distractor = makeChoice(randomPick(itemPool), {
//         color: randomPick(COLORS),
//         size: randomPick(SIZES),
//         isCorrect: false,
//       });
//     }

//     if (distractor) {
//       choices.push(distractor);
//     }
//   }

//   // ── 크기 비교 레벨인 경우 크기 차등 처리 ──
//   if (config.isComparative && config.attributes.includes("size")) {
//     const sizes: SizeLevel[] =
//       config.choiceCount === 3
//         ? ["large", "medium", "small"]
//         : ["large", "small"];

//     choices.forEach((c, idx) => {
//       c.size = sizes[idx] ?? "medium";
//       c.isCorrect = c.size === "large"; // 가장 큰 것을 정답 처리
//     });
//   }

//   // 최종 셔플 및 정답 ID 목록 구성
//   const shuffled = shuffle(choices);
//   const correctIds = shuffled.filter((c) => c.isCorrect).map((c) => c.id);

//   return {
//     level,
//     prompt: buildPrompt(config, target),
//     promptKey: config.promptTemplate,
//     choices: shuffled,
//     correctIds,
//     meta: {
//       attributes: config.attributes,
//       isNegation: config.isNegation,
//       choiceCount: config.choiceCount,
//     },
//   };
// }
