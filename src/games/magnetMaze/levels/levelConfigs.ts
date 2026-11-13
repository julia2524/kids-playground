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

// // 벽이 있는 레벨은 통로 안을 지나야 하므로 쇠구슬을 조금 작게 쓴다 (Level 1 은 기존 크기 그대로)
// const MAZE_BALL_RADIUS = 16;

// const NO_WALLS: WallSettings = {
//   hasWalls: false,
//   corridorWidth: 0,
//   wallThickness: 0,
//   cornerRadius: 0,
//   minCorridorWidth: 0,
// };

// // 아래 variants 는 "라운드 i 는 이런 모양" 표입니다. 숫자는 보드 너비 = 1 기준.
// // walls 의 숫자는 px 입니다. (통로 폭 = 벽 안쪽 면 사이 거리, 쇠구슬 지름보다 충분히 커야 함)

// // ── Level 1. 자유 이동 (벽 없음) ─────────────────────────────
// // 라운드마다 방향과 거리가 확실히 다르다. angleDeg: 0 = 오른쪽, 90 = 아래, -90 = 위
// const level1: LevelConfig = {
//   ...COMMON,
//   levelId: 1,
//   levelType: LevelType.FREE,
//   timeLimitSeconds: 45,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   walls: NO_WALLS, // 자유 이동: 벽/충돌 없음
//   pathConstraints: {
//     variants: [
//       { angleDeg: 0, distance: 0.45 }, // R1 가까운 좌 → 우
//       { angleDeg: 90, distance: 0.75 }, // R2 위 → 아래
//       { angleDeg: 45, distance: 0.6 }, // R3 오른쪽 아래 대각선
//       { angleDeg: 135, distance: 0.8 }, // R4 왼쪽 아래 대각선
//       { angleDeg: -60, distance: 1.0 }, // R5 먼 거리, 오른쪽 위 대각선
//     ],
//   },
// };

// // ── Level 2. 직선 미로 ─────────────────────────────────────
// // 8방향 중 5개 사용. 나머지(TOP_RIGHT_TO_BOTTOM_LEFT 등)는 variants 에 추가만 하면 된다.
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
//       { direction: "LEFT_TO_RIGHT", length: 0.7 }, // R1 왼쪽 → 오른쪽
//       { direction: "RIGHT_TO_LEFT", length: 0.7 }, // R2 오른쪽 → 왼쪽
//       { direction: "TOP_TO_BOTTOM", length: 1.0 }, // R3 위 → 아래
//       { direction: "BOTTOM_TO_TOP", length: 1.0 }, // R4 아래 → 위
//       { direction: "TOP_LEFT_TO_BOTTOM_RIGHT", length: 1.0 }, // R5 왼쪽 위 → 오른쪽 아래
//     ],
//   },
// };

// // ── Level 3. ㄱ자 · ㄴ자 미로 ───────────────────────────────
// // 기본 모양(GIYEOK = 오른쪽 → 아래, NIEUN = 아래 → 오른쪽)에 회전/반전을 적용해 방향을 만든다.
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
//       // R1 왼쪽 → 오른쪽 → 아래쪽 (ㄱ)
//       { shape: "GIYEOK", horizontalLength: 0.6, verticalLength: 0.8 },
//       // R2 위쪽 → 아래쪽 → 오른쪽 (ㄴ)
//       { shape: "NIEUN", horizontalLength: 0.55, verticalLength: 0.9 },
//       // R3 오른쪽 → 왼쪽 → 위쪽 (ㄱ 을 180도 회전)
//       {
//         shape: "GIYEOK",
//         horizontalLength: 0.65,
//         verticalLength: 0.7,
//         rotationDeg: 180,
//       },
//       // R4 아래쪽 → 위쪽 → 왼쪽 (ㄴ 을 180도 회전)
//       {
//         shape: "NIEUN",
//         horizontalLength: 0.5,
//         verticalLength: 1.0,
//         rotationDeg: 180,
//       },
//       // R5 왼쪽 → 위쪽 → 오른쪽 (ㄴ 을 상하 반전)
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
// // startAngleDeg: 0 = 오른쪽, 90 = 아래, 180 = 왼쪽, 270 = 위
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
//       { radius: 0.3, sweepDeg: 180, clockwise: true, startAngleDeg: 180 }, // R1 시계 방향 반원
//       { radius: 0.3, sweepDeg: 180, clockwise: false, startAngleDeg: 0 }, // R2 반시계 방향 반원
//       { radius: 0.28, sweepDeg: 270, clockwise: true, startAngleDeg: 135 }, // R3 시계 방향 큰 원호
//       { radius: 0.28, sweepDeg: 270, clockwise: false, startAngleDeg: 45 }, // R4 반시계 방향 큰 원호
//       { radius: 0.3, sweepDeg: 240, clockwise: true, startAngleDeg: 270 }, // R5 위에서 시작하는 큰 호
//     ],
//   },
// };

// // ── Level 5. 둥근 달팽이 미로 ───────────────────────────────
// // startAngleDeg 는 "출발점"의 위치. startOutside=false 면 안쪽 중심에서 출발해 바깥으로 나온다.
// const level5: LevelConfig = {
//   ...COMMON,
//   levelId: 5,
//   levelType: LevelType.SPIRAL,
//   timeLimitSeconds: 75,
//   ballRadius: GAME_CONFIG.BALL_RADIUS,
//   // 나선은 고리 사이에 벽이 들어가야 해서 통로를 가장 좁게 쓴다
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
//       }, // R1 시계 방향, 바깥 → 안
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: false,
//         startOutside: true,
//         startAngleDeg: 0,
//       }, // R2 반시계 방향, 바깥 → 안
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: true,
//         startOutside: false,
//         startAngleDeg: 270,
//       }, // R3 시계 방향, 안 → 바깥
//       {
//         turns: 1.25,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: false,
//         startOutside: false,
//         startAngleDeg: 90,
//       }, // R4 반시계 방향, 안 → 바깥
//       {
//         turns: 1.75,
//         outerRadius: 0.38,
//         innerRadius: 0.085,
//         clockwise: true,
//         startOutside: true,
//         startAngleDeg: 225,
//       }, // R5 시계 방향, 바깥 → 안, 회전 증가
//     ],
//   },
// };

// // ── Level 6. 네모난 달팽이 미로 ─────────────────────────────
// // 구간 길이가 S, S, S-d, S-d … 로 줄어드는 직각 나선. 바퀴 사이 간격 d 는 일정하다.
// // d 는 (통로 폭 + 벽 두께) / 보드 너비 보다 커야 해서 통로를 좁게 쓴다.
// const level6: LevelConfig = {
//   ...COMMON,
//   levelId: 6,
//   levelType: LevelType.SQUARE_SPIRAL,
//   timeLimitSeconds: 90,
//   ballRadius: MAZE_BALL_RADIUS, // 통로가 좁아서 구슬을 조금 작게
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
//       }, // R1 시계 방향, 바깥 → 안
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: false,
//         startOutside: true,
//         startDirection: "DOWN",
//       }, // R2 반시계 방향, 바깥 → 안
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: true,
//         startOutside: false,
//         startDirection: "LEFT",
//       }, // R3 시계 방향, 안 → 바깥
//       {
//         turns: 2,
//         outerSize: 0.8,
//         innerSize: 0.23,
//         clockwise: false,
//         startOutside: false,
//         startDirection: "UP",
//       }, // R4 반시계 방향, 안 → 바깥
//       {
//         turns: 2.5,
//         outerSize: 0.8,
//         innerSize: 0.2,
//         clockwise: true,
//         startOutside: true,
//         startDirection: "DOWN",
//       }, // R5 시계 방향, 바깥 → 안, 회전 증가
//     ],
//   },
// };

// // ── Level 7. 지그재그 미로 ──────────────────────────────────
// // segmentWeights 길이 - 1 = 꺾임 횟수. reversed 로 역방향(오른쪽 → 왼쪽, 아래 → 위).
// const level7: LevelConfig = {
//   ...COMMON,
//   levelId: 7,
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
//       }, // R1 왼쪽 → 오른쪽, 꺾임 2회
//       {
//         orientation: "HORIZONTAL",
//         segmentWeights: [1, 1, 1, 1],
//         span: 0.74,
//         amplitude: 0.34,
//         reversed: true,
//       }, // R2 오른쪽 → 왼쪽, 꺾임 3회
//       {
//         orientation: "VERTICAL",
//         segmentWeights: [1, 1, 1, 1],
//         span: 0.9,
//         amplitude: 0.42,
//       }, // R3 위 → 아래, 꺾임 3회
//       {
//         orientation: "VERTICAL",
//         segmentWeights: [1, 1, 1, 1, 1],
//         span: 1.1,
//         amplitude: 0.42,
//         reversed: true,
//       }, // R4 아래 → 위, 꺾임 4회
//       {
//         orientation: "HORIZONTAL",
//         segmentWeights: [1, 1, 1, 1, 1, 1],
//         span: 0.82,
//         amplitude: 0.26,
//       }, // R5 왼쪽 → 오른쪽, 꺾임 5회
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
// ];

// /**
//  * 통로/벽/구슬의 기준이 되는 보드 한 변(px). 이 크기 이상이면 설정값을 그대로 쓰고,
//  * 더 작은 화면에서는 통로 폭·벽 두께·구슬 반지름을 같은 비율로 줄여 보드 대비 비율을 유지한다.
//  * (정사각형 보드에서 같은 모양이 작은 화면에서도 똑같이 만들어지도록)
//  */
// export const REFERENCE_BOARD_PX = 430;

// /** 보드 한 변이 boardSidePx 일 때의 비율(최대 1) */
// export function boardScale(boardSidePx: number): number {
//   return Math.min(1, boardSidePx / REFERENCE_BOARD_PX);
// }

// /** 벽이 있는 레벨의 통로 폭·벽 두께·코너 반경·구슬 반지름을 보드 크기에 맞게 줄인 설정 */
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
//   if (!config)
//     throw new Error(`[levelConfigs] Level ${levelId} 설정이 없습니다`);
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
// 기존 Level 5 설정을 그대로 이동한다.

const level6: LevelConfig = {
  ...COMMON,
  levelId: 6,
  levelType: LevelType.SPIRAL,
  timeLimitSeconds: 75,
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
        turns: 1.75,
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
// 기존 Level 6 설정을 그대로 이동한다.

const level7: LevelConfig = {
  ...COMMON,
  levelId: 7,
  levelType: LevelType.SQUARE_SPIRAL,
  timeLimitSeconds: 90,
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
        turns: 2.5,
        outerSize: 0.8,
        innerSize: 0.2,
        clockwise: true,
        startOutside: true,
        startDirection: "DOWN",
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
