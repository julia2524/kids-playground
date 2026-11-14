// import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";

// import {
//   type WallSettings,
//   type MagnetSettings,
//   type LevelConfig,
//   LevelType,
// } from "./levelTypes";

// const MAGNET: MagnetSettings = {
//   range: GAME_CONFIG.MAGNET_RANGE,
//   attachDistance: GAME_CONFIG.ATTACH_DISTANCE,
//   maxAccel: GAME_CONFIG.MAGNET_MAX_ACCEL,
// };

// const COMMON = {
//   roundCount: 5,
//   difficultyRange: [0, 1] as const,
//   magnetSettings: MAGNET,
// };

// // 벽이 있는 레벨은 통로 안을 지나야 하므로 쇠구슬을 조금 작게 쓴다.
// const MAZE_BALL_RADIUS = 16;

// const NO_WALLS: WallSettings = {
//   hasWalls: false,
//   corridorWidth: 0,
//   wallThickness: 0,
//   cornerRadius: 0,
//   minCorridorWidth: 0,
// };

// // ── Level 1. 자유 이동 ─────────────────────────────────────

// const level1: LevelConfig = {
//   ...COMMON,
//   levelId: 1,
//   levelType: LevelType.FREE,
//   timeLimitSeconds: 45,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: NO_WALLS,
//   pathConstraints: {
//     variants: [
//       { angleDeg: 0, distance: 0.45 },
//       { angleDeg: 90, distance: 0.75 },
//       { angleDeg: 45, distance: 0.6 },
//       { angleDeg: 135, distance: 0.8 },
//       { angleDeg: -60, distance: 1.0 },
//     ],
//   },
// };

// // ── Level 2. 직선 미로 ─────────────────────────────────────

// const level2: LevelConfig = {
//   ...COMMON,
//   levelId: 2,
//   levelType: LevelType.STRAIGHT,
//   timeLimitSeconds: 50,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 88,
//     wallThickness: 14,
//     cornerRadius: 0,
//     minCorridorWidth: 52,
//   },
//   pathConstraints: {
//     variants: [
//       { direction: "LEFT_TO_RIGHT", length: 0.7 },
//       { direction: "RIGHT_TO_LEFT", length: 0.7 },
//       { direction: "TOP_TO_BOTTOM", length: 1.0 },
//       { direction: "BOTTOM_TO_TOP", length: 1.0 },
//       { direction: "TOP_LEFT_TO_BOTTOM_RIGHT", length: 1.0 },
//     ],
//   },
// };

// // ── Level 3. ㄱ자 · ㄴ자 미로 ──────────────────────────────

// const level3: LevelConfig = {
//   ...COMMON,
//   levelId: 3,
//   levelType: LevelType.L_SHAPE,
//   timeLimitSeconds: 60,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 84,
//     wallThickness: 14,
//     cornerRadius: 42,
//     minCorridorWidth: 52,
//   },
//   pathConstraints: {
//     variants: [
//       {
//         shape: "GIYEOK",
//         horizontalLength: 0.6,
//         verticalLength: 0.8,
//       },
//       {
//         shape: "NIEUN",
//         horizontalLength: 0.55,
//         verticalLength: 0.9,
//       },
//       {
//         shape: "GIYEOK",
//         horizontalLength: 0.65,
//         verticalLength: 0.7,
//         rotationDeg: 180,
//       },
//       {
//         shape: "NIEUN",
//         horizontalLength: 0.5,
//         verticalLength: 1.0,
//         rotationDeg: 180,
//       },
//       {
//         shape: "NIEUN",
//         horizontalLength: 0.6,
//         verticalLength: 0.85,
//         mirrorY: true,
//       },
//     ],
//   },
// };

// // ── Level 4. 원형 미로 ─────────────────────────────────────

// const level4: LevelConfig = {
//   ...COMMON,
//   levelId: 4,
//   levelType: LevelType.CIRCLE,
//   timeLimitSeconds: 65,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 80,
//     wallThickness: 14,
//     cornerRadius: 0,
//     minCorridorWidth: 52,
//   },
//   pathConstraints: {
//     variants: [
//       { radius: 0.3, sweepDeg: 180, clockwise: true, startAngleDeg: 180 },
//       { radius: 0.3, sweepDeg: 180, clockwise: false, startAngleDeg: 0 },
//       { radius: 0.28, sweepDeg: 270, clockwise: true, startAngleDeg: 135 },
//       { radius: 0.28, sweepDeg: 270, clockwise: false, startAngleDeg: 45 },
//       { radius: 0.3, sweepDeg: 240, clockwise: true, startAngleDeg: 270 },
//     ],
//   },
// };

// // ── Level 5. 지그재그 미로 ──────────────────────────────────
// // 기존 Level 7 설정을 그대로 이동한다.

// const level5: LevelConfig = {
//   ...COMMON,
//   levelId: 5,
//   levelType: LevelType.ZIGZAG,
//   timeLimitSeconds: 90,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 72,
//     wallThickness: 14,
//     cornerRadius: 36,
//     minCorridorWidth: 52,
//   },
//   pathConstraints: {
//     variants: [
//       {
//         orientation: "HORIZONTAL",
//         segmentWeights: [1, 1, 1],
//         span: 0.66,
//         amplitude: 0.36,
//       },
//       {
//         orientation: "HORIZONTAL",
//         segmentWeights: [1, 1, 1, 1],
//         span: 0.74,
//         amplitude: 0.34,
//         reversed: true,
//       },
//       {
//         orientation: "VERTICAL",
//         segmentWeights: [1, 1, 1, 1],
//         span: 0.9,
//         amplitude: 0.42,
//       },
//       {
//         orientation: "VERTICAL",
//         segmentWeights: [1, 1, 1, 1, 1],
//         span: 1.1,
//         amplitude: 0.42,
//         reversed: true,
//       },
//       {
//         orientation: "HORIZONTAL",
//         segmentWeights: [1, 1, 1, 1, 1, 1],
//         span: 0.82,
//         amplitude: 0.26,
//       },
//     ],
//   },
// };

// // ── Level 6. 둥근 달팽이 미로 ──────────────────────────────
// // 기존 Level 5 설정을 그대로 이동한다.

// const level6: LevelConfig = {
//   ...COMMON,
//   levelId: 6,
//   levelType: LevelType.SPIRAL,
//   timeLimitSeconds: 75,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 58,
//     wallThickness: 8,
//     cornerRadius: 0,
//     minCorridorWidth: 48,
//   },
//   pathConstraints: {
//     variants: [
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: true,
//         startOutside: true,
//         startAngleDeg: 180,
//       },
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: false,
//         startOutside: true,
//         startAngleDeg: 0,
//       },
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: true,
//         startOutside: false,
//         startAngleDeg: 270,
//       },
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: false,
//         startOutside: false,
//         startAngleDeg: 90,
//       },
//       {
//         turns: 1.75,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: true,
//         startOutside: true,
//         startAngleDeg: 225,
//       },
//     ],
//   },
// };

// // ── Level 7. 네모난 달팽이 미로 ────────────────────────────
// // 기존 Level 6 설정을 그대로 이동한다.

// const level7: LevelConfig = {
//   ...COMMON,
//   levelId: 7,
//   levelType: LevelType.SQUARE_SPIRAL,
//   timeLimitSeconds: 90,
//   ballRadius: MAZE_BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 50,
//     wallThickness: 8,
//     cornerRadius: 24,
//     minCorridorWidth: 44,
//   },
//   pathConstraints: {
//     variants: [
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: true,
//         startOutside: true,
//         startDirection: "RIGHT",
//       },
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: false,
//         startOutside: true,
//         startDirection: "DOWN",
//       },
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: true,
//         startOutside: false,
//         startDirection: "LEFT",
//       },
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: false,
//         startOutside: false,
//         startDirection: "UP",
//       },
//       {
//         turns: 2.5,
//         outerSize: 0.8,
//         innerSize: 0.2,
//         clockwise: true,
//         startOutside: true,
//         startDirection: "DOWN",
//       },
//     ],
//   },
// };

// // ── Level 8. 첫 갈림길 미로 (일자 + ㄱ/ㄴ 조합) ──────────────
// // 학습 목표: 갈림길 1개 · 막다른 길 1개 경험, 잘못 들어간 뒤 되돌아오기
// // 구조: START ─→ JUNCTION ─→ GOAL (정답) + JUNCTION ─→ DEAD_END
// // Round 1~5는 같은 복잡도, 방향·배치만 다르게 한다.

// const level8: LevelConfig = {
//   ...COMMON,
//   levelId: 8,
//   levelType: LevelType.BRANCHED,
//   timeLimitSeconds: 70,
//   ballRadius: MAZE_BALL_RADIUS,
//   walls: {
//     hasWalls: true,
//     corridorWidth: 84,
//     wallThickness: 14,
//     cornerRadius: 36,
//     minCorridorWidth: 52,
//   },
//   pathConstraints: {
//     variants: [
//       // R1: 가로 일자 메인, 중간에서 위로 막다른 길 (T자)
//       //     START ─── JUNCTION ─── GOAL
//       //                   │
//       //                DEAD_END
//       {
//         mainPoints: [
//           { x: -0.38, y: 0 },
//           { x: 0, y: 0 },
//           { x: 0.38, y: 0 },
//         ],
//         branchPoints: [
//           { x: 0, y: 0 },
//           { x: 0, y: -0.32 },
//         ],
//       },
//       // R2: 세로 일자 메인, 중간에서 오른쪽으로 막다른 길
//       //     START
//       //       │
//       //    JUNCTION ── DEAD_END
//       //       │
//       //      GOAL
//       {
//         mainPoints: [
//           { x: 0, y: -0.4 },
//           { x: 0, y: 0 },
//           { x: 0, y: 0.4 },
//         ],
//         branchPoints: [
//           { x: 0, y: 0 },
//           { x: 0.32, y: 0 },
//         ],
//       },
//       // R3: ㄱ자 메인 (오른쪽→아래) + 갈림에서 위쪽으로 막다른 길
//       //              DEAD
//       //               ↑
//       //     START ─── JUNCTION
//       //                   │
//       //                   ↓
//       //                  GOAL
//       {
//         mainPoints: [
//           { x: -0.32, y: -0.12 },
//           { x: 0.2, y: -0.12 },
//           { x: 0.2, y: 0.36 },
//         ],
//         branchPoints: [
//           { x: 0.2, y: -0.12 },
//           { x: 0.2, y: -0.38 },
//         ],
//       },
//       // R4: ㄴ자 메인 (아래→오른쪽) + 갈림에서 왼쪽으로 막다른 길
//       //     START
//       //       │
//       //  DEAD ← JUNCTION ─── GOAL
//       {
//         mainPoints: [
//           { x: -0.1, y: -0.36 },
//           { x: -0.1, y: 0.18 },
//           { x: 0.36, y: 0.18 },
//         ],
//         branchPoints: [
//           { x: -0.1, y: 0.18 },
//           { x: -0.38, y: 0.18 },
//         ],
//       },
//       // R5: 가로→아래→오른쪽 (ㄱ 후 일자) 메인, 첫 코너에서 위쪽 막다른 길
//       //     DEAD
//       //       ↑
//       //     START ─── J ─── (아래) ─── GOAL (오른쪽)
//       {
//         mainPoints: [
//           { x: -0.36, y: -0.12 },
//           { x: 0.12, y: -0.12 },
//           { x: 0.12, y: 0.32 },
//           { x: 0.38, y: 0.32 },
//         ],
//         branchPoints: [
//           { x: 0.12, y: -0.12 },
//           { x: 0.12, y: -0.38 },
//         ],
//       },
//     ],
//   },
// };

// export const LEVEL_CONFIGS: readonly LevelConfig[] = [
//   level1,
//   level2,
//   level3,
//   level4,
//   level5,
//   level6,
//   level7,
//   level8,
// ];

// /**
//  * 통로/벽/구슬의 기준이 되는 보드 한 변(px).
//  */
// export const REFERENCE_BOARD_PX = 430;

// /** 보드 한 변이 boardSidePx 일 때의 비율(최대 1) */
// export function boardScale(boardSidePx: number): number {
//   return Math.min(1, boardSidePx / REFERENCE_BOARD_PX);
// }

// /** 벽이 있는 레벨의 설정을 보드 크기에 맞게 줄인다. */
// export function fitConfigToBoard(
//   config: LevelConfig,
//   boardSidePx: number,
// ): LevelConfig {
//   const k = boardScale(boardSidePx);

//   if (!config.walls.hasWalls || k >= 1) return config;

//   const w = config.walls;

//   return {
//     ...config,
//     ballRadius: config.ballRadius * k,
//     walls: {
//       ...w,
//       corridorWidth: w.corridorWidth * k,
//       wallThickness: w.wallThickness * k,
//       cornerRadius: w.cornerRadius * k,
//       minCorridorWidth: w.minCorridorWidth * k,
//     },
//   } as LevelConfig;
// }

// export function getLevelConfig(levelId: number): LevelConfig {
//   const config = LEVEL_CONFIGS.find((c) => c.levelId === levelId);

//   if (!config) {
//     throw new Error(`[levelConfigs] Level ${levelId} 설정이 없습니다`);
//   }

//   return config;
// }

import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";

import {
  type WallSettings,
  type MagnetSettings,
  type LevelConfig,
  LevelType,
} from "./levelTypes";

const MAGNET: MagnetSettings = {
  range: GAME_CONFIG.MAGNET_RANGE,
  attachDistance: GAME_CONFIG.ATTACH_DISTANCE,
  maxAccel: GAME_CONFIG.MAGNET_MAX_ACCEL,
};

const COMMON = {
  roundCount: 5,
  difficultyRange: [0, 1] as const,
  magnetSettings: MAGNET,
};

// 벽이 있는 레벨은 통로 안을 지나야 하므로 쇠구슬을 조금 작게 쓴다.
const MAZE_BALL_RADIUS = 16;

const NO_WALLS: WallSettings = {
  hasWalls: false,
  corridorWidth: 0,
  wallThickness: 0,
  cornerRadius: 0,
  minCorridorWidth: 0,
};

// ── Level 1. 자유 이동 ─────────────────────────────────────

const level1: LevelConfig = {
  ...COMMON,
  levelId: 1,
  levelType: LevelType.FREE,
  timeLimitSeconds: 45,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: NO_WALLS,
  pathConstraints: {
    variants: [
      { angleDeg: 0, distance: 0.45 },
      { angleDeg: 90, distance: 0.75 },
      { angleDeg: 45, distance: 0.6 },
      { angleDeg: 135, distance: 0.8 },
      { angleDeg: -60, distance: 1.0 },
    ],
  },
};

// ── Level 2. 직선 미로 ─────────────────────────────────────

const level2: LevelConfig = {
  ...COMMON,
  levelId: 2,
  levelType: LevelType.STRAIGHT,
  timeLimitSeconds: 50,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 88,
    wallThickness: 14,
    cornerRadius: 0,
    minCorridorWidth: 52,
  },
  pathConstraints: {
    variants: [
      { direction: "LEFT_TO_RIGHT", length: 0.7 },
      { direction: "RIGHT_TO_LEFT", length: 0.7 },
      { direction: "TOP_TO_BOTTOM", length: 1.0 },
      { direction: "BOTTOM_TO_TOP", length: 1.0 },
      { direction: "TOP_LEFT_TO_BOTTOM_RIGHT", length: 1.0 },
    ],
  },
};

// ── Level 3. ㄱ자 · ㄴ자 미로 ──────────────────────────────

const level3: LevelConfig = {
  ...COMMON,
  levelId: 3,
  levelType: LevelType.L_SHAPE,
  timeLimitSeconds: 60,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 84,
    wallThickness: 14,
    cornerRadius: 42,
    minCorridorWidth: 52,
  },
  pathConstraints: {
    variants: [
      {
        shape: "GIYEOK",
        horizontalLength: 0.6,
        verticalLength: 0.8,
      },
      {
        shape: "NIEUN",
        horizontalLength: 0.55,
        verticalLength: 0.9,
      },
      {
        shape: "GIYEOK",
        horizontalLength: 0.65,
        verticalLength: 0.7,
        rotationDeg: 180,
      },
      {
        shape: "NIEUN",
        horizontalLength: 0.5,
        verticalLength: 1.0,
        rotationDeg: 180,
      },
      {
        shape: "NIEUN",
        horizontalLength: 0.6,
        verticalLength: 0.85,
        mirrorY: true,
      },
    ],
  },
};

// ── Level 4. 원형 미로 ─────────────────────────────────────

const level4: LevelConfig = {
  ...COMMON,
  levelId: 4,
  levelType: LevelType.CIRCLE,
  timeLimitSeconds: 65,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 80,
    wallThickness: 14,
    cornerRadius: 0,
    minCorridorWidth: 52,
  },
  pathConstraints: {
    variants: [
      { radius: 0.3, sweepDeg: 180, clockwise: true, startAngleDeg: 180 },
      { radius: 0.3, sweepDeg: 180, clockwise: false, startAngleDeg: 0 },
      { radius: 0.28, sweepDeg: 270, clockwise: true, startAngleDeg: 135 },
      { radius: 0.28, sweepDeg: 270, clockwise: false, startAngleDeg: 45 },
      { radius: 0.3, sweepDeg: 240, clockwise: true, startAngleDeg: 270 },
    ],
  },
};

// ── Level 5. 지그재그 미로 ──────────────────────────────────
// 기존 Level 7 설정을 그대로 이동한다.

const level5: LevelConfig = {
  ...COMMON,
  levelId: 5,
  levelType: LevelType.ZIGZAG,
  timeLimitSeconds: 90,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 72,
    wallThickness: 14,
    cornerRadius: 36,
    minCorridorWidth: 52,
  },
  pathConstraints: {
    variants: [
      {
        orientation: "HORIZONTAL",
        segmentWeights: [1, 1, 1],
        span: 0.66,
        amplitude: 0.36,
      },
      {
        orientation: "HORIZONTAL",
        segmentWeights: [1, 1, 1, 1],
        span: 0.74,
        amplitude: 0.34,
        reversed: true,
      },
      {
        orientation: "VERTICAL",
        segmentWeights: [1, 1, 1, 1],
        span: 0.9,
        amplitude: 0.42,
      },
      {
        orientation: "VERTICAL",
        segmentWeights: [1, 1, 1, 1, 1],
        span: 1.1,
        amplitude: 0.42,
        reversed: true,
      },
      {
        orientation: "HORIZONTAL",
        segmentWeights: [1, 1, 1, 1, 1, 1],
        span: 0.82,
        amplitude: 0.26,
      },
    ],
  },
};

// ── Level 6. 둥근 달팽이 미로 ──────────────────────────────
// randomVariants: 라운드마다 randomVariants.ts 의 generateSpiralVariant 가 새 나선을 만든다.
// 아래 variants 는 생성 범위를 정한 기준 자료이며, 모든 라운드의 회전 수는 1.25 로 같다.

const level6: LevelConfig = {
  ...COMMON,
  levelId: 6,
  levelType: LevelType.SPIRAL,
  timeLimitSeconds: 75,
  randomVariants: true,
  ballRadius: GAME_CONFIG.BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 58,
    wallThickness: 8,
    cornerRadius: 0,
    minCorridorWidth: 48,
  },
  pathConstraints: {
    variants: [
      {
        turns: 1.25,
        outerRadius: 0.38,
        innerRadius: 0.085,
        clockwise: true,
        startOutside: true,
        startAngleDeg: 180,
      },
      {
        turns: 1.25,
        outerRadius: 0.38,
        innerRadius: 0.085,
        clockwise: false,
        startOutside: true,
        startAngleDeg: 0,
      },
      {
        turns: 1.25,
        outerRadius: 0.38,
        innerRadius: 0.085,
        clockwise: true,
        startOutside: false,
        startAngleDeg: 270,
      },
      {
        turns: 1.25,
        outerRadius: 0.38,
        innerRadius: 0.085,
        clockwise: false,
        startOutside: false,
        startAngleDeg: 90,
      },
      {
        turns: 1.25, // 라운드 5 만 난이도가 튀지 않도록 다른 라운드와 같게 (기존 1.75)
        outerRadius: 0.38,
        innerRadius: 0.085,
        clockwise: true,
        startOutside: true,
        startAngleDeg: 225,
      },
    ],
  },
};

// ── Level 7. 네모난 달팽이 미로 ────────────────────────────
// randomVariants: 라운드마다 randomVariants.ts 의 generateSquareSpiralVariant 가 새 네모 나선을 만든다.
// 아래 variants 는 생성 범위를 정한 기준 자료이며, 모든 라운드의 회전 수는 2 로 같다.

const level7: LevelConfig = {
  ...COMMON,
  levelId: 7,
  levelType: LevelType.SQUARE_SPIRAL,
  timeLimitSeconds: 90,
  randomVariants: true,
  ballRadius: MAZE_BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 50,
    wallThickness: 8,
    cornerRadius: 24,
    minCorridorWidth: 44,
  },
  pathConstraints: {
    variants: [
      {
        turns: 2,
        outerSize: 0.8,
        innerSize: 0.23,
        clockwise: true,
        startOutside: true,
        startDirection: "RIGHT",
      },
      {
        turns: 2,
        outerSize: 0.8,
        innerSize: 0.23,
        clockwise: false,
        startOutside: true,
        startDirection: "DOWN",
      },
      {
        turns: 2,
        outerSize: 0.8,
        innerSize: 0.23,
        clockwise: true,
        startOutside: false,
        startDirection: "LEFT",
      },
      {
        turns: 2,
        outerSize: 0.8,
        innerSize: 0.23,
        clockwise: false,
        startOutside: false,
        startDirection: "UP",
      },
      {
        turns: 2, // 라운드 5 만 난이도가 튀지 않도록 다른 라운드와 같게 (기존 2.5 / 0.2)
        outerSize: 0.8,
        innerSize: 0.23,
        clockwise: true,
        startOutside: true,
        startDirection: "DOWN",
      },
    ],
  },
};

// ── Level 8. 첫 갈림길 미로 (일자 + ㄱ/ㄴ 조합) ──────────────
// 학습 목표: 갈림길 1개 · 막다른 길 1개 경험, 잘못 들어간 뒤 되돌아오기
// 구조: START ─→ JUNCTION ─→ GOAL (정답) + JUNCTION ─→ DEAD_END
// Round 1~5는 같은 복잡도, 방향·배치만 다르게 한다.
// randomVariants: 라운드마다 randomVariants.ts 의 generateBranchedVariant 가 새 갈림길 미로를 만든다.
// 아래 variants 5개는 생성 범위(구간 길이, 막다른 길 길이, 갈림길 구조)를 정한 기준 자료다.

const level8: LevelConfig = {
  ...COMMON,
  levelId: 8,
  levelType: LevelType.BRANCHED,
  timeLimitSeconds: 70,
  randomVariants: true,
  ballRadius: MAZE_BALL_RADIUS,
  walls: {
    hasWalls: true,
    corridorWidth: 84,
    wallThickness: 14,
    cornerRadius: 36,
    minCorridorWidth: 52,
  },
  pathConstraints: {
    variants: [
      // R1: 가로 일자 메인, 중간에서 위로 막다른 길 (T자)
      //     START ─── JUNCTION ─── GOAL
      //                   │
      //                DEAD_END
      {
        mainPoints: [
          { x: -0.38, y: 0 },
          { x: 0, y: 0 },
          { x: 0.38, y: 0 },
        ],
        branchPoints: [
          { x: 0, y: 0 },
          { x: 0, y: -0.32 },
        ],
      },
      // R2: 세로 일자 메인, 중간에서 오른쪽으로 막다른 길
      //     START
      //       │
      //    JUNCTION ── DEAD_END
      //       │
      //      GOAL
      {
        mainPoints: [
          { x: 0, y: -0.4 },
          { x: 0, y: 0 },
          { x: 0, y: 0.4 },
        ],
        branchPoints: [
          { x: 0, y: 0 },
          { x: 0.32, y: 0 },
        ],
      },
      // R3: ㄱ자 메인 (오른쪽→아래) + 갈림에서 위쪽으로 막다른 길
      //              DEAD
      //               ↑
      //     START ─── JUNCTION
      //                   │
      //                   ↓
      //                  GOAL
      {
        mainPoints: [
          { x: -0.32, y: -0.12 },
          { x: 0.2, y: -0.12 },
          { x: 0.2, y: 0.36 },
        ],
        branchPoints: [
          { x: 0.2, y: -0.12 },
          { x: 0.2, y: -0.38 },
        ],
      },
      // R4: ㄴ자 메인 (아래→오른쪽) + 갈림에서 왼쪽으로 막다른 길
      //     START
      //       │
      //  DEAD ← JUNCTION ─── GOAL
      {
        mainPoints: [
          { x: -0.1, y: -0.36 },
          { x: -0.1, y: 0.18 },
          { x: 0.36, y: 0.18 },
        ],
        branchPoints: [
          { x: -0.1, y: 0.18 },
          { x: -0.38, y: 0.18 },
        ],
      },
      // R5: 가로→아래→오른쪽 (ㄱ 후 일자) 메인, 첫 코너에서 위쪽 막다른 길
      //     DEAD
      //       ↑
      //     START ─── J ─── (아래) ─── GOAL (오른쪽)
      {
        mainPoints: [
          { x: -0.36, y: -0.12 },
          { x: 0.12, y: -0.12 },
          { x: 0.12, y: 0.32 },
          { x: 0.38, y: 0.32 },
        ],
        branchPoints: [
          { x: 0.12, y: -0.12 },
          { x: 0.12, y: -0.38 },
        ],
      },
    ],
  },
};

export const LEVEL_CONFIGS: readonly LevelConfig[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
];

/**
 * 통로/벽/구슬의 기준이 되는 보드 한 변(px).
 */
export const REFERENCE_BOARD_PX = 430;

/** 보드 한 변이 boardSidePx 일 때의 비율(최대 1) */
export function boardScale(boardSidePx: number): number {
  return Math.min(1, boardSidePx / REFERENCE_BOARD_PX);
}

/** 벽이 있는 레벨의 설정을 보드 크기에 맞게 줄인다. */
export function fitConfigToBoard(
  config: LevelConfig,
  boardSidePx: number,
): LevelConfig {
  const k = boardScale(boardSidePx);

  if (!config.walls.hasWalls || k >= 1) return config;

  const w = config.walls;

  return {
    ...config,
    ballRadius: config.ballRadius * k,
    walls: {
      ...w,
      corridorWidth: w.corridorWidth * k,
      wallThickness: w.wallThickness * k,
      cornerRadius: w.cornerRadius * k,
      minCorridorWidth: w.minCorridorWidth * k,
    },
  } as LevelConfig;
}

export function getLevelConfig(levelId: number): LevelConfig {
  const config = LEVEL_CONFIGS.find((c) => c.levelId === levelId);

  if (!config) {
    throw new Error(`[levelConfigs] Level ${levelId} 설정이 없습니다`);
  }

  return config;
}
