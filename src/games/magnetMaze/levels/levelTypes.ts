// /** 경로의 유형. 레벨 번호와 분리해서 관리 → 같은 유형을 여러 레벨에서 재사용 가능 */
// export const LevelType = {
//   FREE: "FREE", // 자유 이동 (경로 없음)
//   STRAIGHT: "STRAIGHT", // 직선
//   L_SHAPE: "L_SHAPE", // ㄱ자 · ㄴ자
//   CIRCLE: "CIRCLE", // 원형 · 원호
//   SPIRAL: "SPIRAL", // 둥근 달팽이형 나선
//   SQUARE_SPIRAL: "SQUARE_SPIRAL", // 네모난 달팽이 (직선 + 90도 회전)
//   WAVE: "WAVE", // 파도형
//   ZIGZAG: "ZIGZAG", // 지그재그
//   /** Level 8+: 갈림길 + 막다른 길이 있는 복합 미로 (단일 정답 경로 + 탐색 분기) */
//   BRANCHED: "BRANCHED",
// } as const;
// export type LevelType = (typeof LevelType)[keyof typeof LevelType];

// export interface Point {
//   x: number;
//   y: number;
// }

// export type Orientation = "HORIZONTAL" | "VERTICAL";

// // ── 라운드 변형(Variant): "이 라운드는 이런 모양" 한 줄 ────────────────
// // 변형 목록(variants)의 i번째가 i번째 라운드가 된다. (라운드 수가 더 많으면 처음부터 순환)

// export interface FreeVariant {
//   /** 시작점 → 목적지 방향. 0 = 오른쪽, 90 = 아래, 45 = 오른쪽 아래 대각선 */
//   angleDeg: number;
//   /** 시작점과 목적지 사이 거리 */
//   distance: number;
// }

// /** 직선 진행 방향 (시작 → 끝). 대각선은 화면에서 항상 45도 */
// export type StraightDirection =
//   | "LEFT_TO_RIGHT"
//   | "RIGHT_TO_LEFT"
//   | "TOP_TO_BOTTOM"
//   | "BOTTOM_TO_TOP"
//   | "TOP_LEFT_TO_BOTTOM_RIGHT"
//   | "BOTTOM_RIGHT_TO_TOP_LEFT"
//   | "TOP_RIGHT_TO_BOTTOM_LEFT"
//   | "BOTTOM_LEFT_TO_TOP_RIGHT";

// /**
//  * 직선 경로.
//  *  - 새 방식: direction 으로 8방향을 명시한다. (권장)
//  *  - 기존 방식: orientation + reversed (direction 이 없을 때만 사용 → 하위 호환)
//  * length 는 경로의 실제 길이(보드 너비 = 1). 대각선도 대각선 방향 길이다.
//  */
// export interface StraightVariant {
//   direction?: StraightDirection;
//   /** @deprecated direction 을 사용하세요 (기존 설정 호환용) */
//   orientation?: Orientation;
//   length: number;
//   /** @deprecated direction 을 사용하세요 (기존 설정 호환용) */
//   reversed?: boolean;
// }

// export type Rotation = 0 | 90 | 180 | 270;

// /**
//  * ㄱ자 / ㄴ자 경로. 기본 모양을 만든 뒤 아래 순서로 변환한다:
//  *   기본 모양 → 좌우반전(mirrorX) → 상하반전(mirrorY) → 회전(rotationDeg, 시계 방향) → 진행 방향 반전(reversed)
//  * points / start / goal 이 함께 변환되므로 시작·목적지는 항상 경로의 양 끝점이다.
//  */
// export interface LShapeVariant {
//   /**
//    * GIYEOK = ㄱ (오른쪽으로 갔다가 아래로), NIEUN = ㄴ (아래로 갔다가 오른쪽으로)
//    * — 회전/반전을 적용하기 전 기본 모양
//    */
//   shape: "GIYEOK" | "NIEUN";
//   /** 기본 모양에서 가로 구간 길이 */
//   horizontalLength: number;
//   /** 기본 모양에서 세로 구간 길이 */
//   verticalLength: number;
//   /** 시계 방향 회전. 기본 0 */
//   rotationDeg?: Rotation;
//   /** 좌우 반전 */
//   mirrorX?: boolean;
//   /** 상하 반전 */
//   mirrorY?: boolean;
//   /** true 면 진행 방향(시작↔목적지)을 반대로 */
//   reversed?: boolean;
// }

// export interface CircleVariant {
//   radius: number;
//   /** 원호의 각도. 180 = 반원, 270 = 3/4 원호 (360 미만) */
//   sweepDeg: number;
//   clockwise: boolean;
//   /** 시작 위치 각도. 0 = 오른쪽 끝, 90 = 아래, 180 = 왼쪽 끝, 270 = 위 */
//   startAngleDeg: number;
// }

// export interface SpiralVariant {
//   /** 회전 수. 0.5 단위(1.5, 2.5 …)면 목적지가 시작점의 반대쪽에 놓인다 */
//   turns: number;
//   outerRadius: number;
//   innerRadius: number;
//   clockwise: boolean;
//   /** true = 바깥에서 안쪽으로, false = 안쪽에서 바깥으로 */
//   startOutside: boolean;
//   /**
//    * 경로의 "출발점" 위치 각도. 0 = 오른쪽, 90 = 아래, 180 = 왼쪽, 270 = 위.
//    * 생략하면 기존 동작(바깥 시작은 180 = 왼쪽, 안 → 밖은 그 경로를 뒤집은 모양)을 그대로 쓴다.
//    */
//   startAngleDeg?: number;
// }

// export type CompassDirection = "RIGHT" | "DOWN" | "LEFT" | "UP";

// /** 네모난 달팽이. 직선 + 90도 회전만으로 이루어진 직각 나선 */
// export interface SquareSpiralVariant {
//   /** 회전 수. 한 바퀴 = 직선 구간 4개. 0.5 단위 허용 (2.5 = 10개 구간) */
//   turns: number;
//   /** 가장 바깥 한 변의 길이 (보드 너비 = 1) */
//   outerSize: number;
//   /** 가장 안쪽 마지막 구간의 길이 */
//   innerSize: number;
//   /** 진행하면서 도는 방향. true = 시계 방향 */
//   clockwise: boolean;
//   /** true = 바깥에서 안쪽으로, false = 안쪽에서 바깥으로 */
//   startOutside: boolean;
//   /** 바깥 → 안 모양을 만들 때 첫 구간의 방향 (안 → 바깥은 그 모양을 반대로 달린다) */
//   startDirection: CompassDirection;
// }

// export interface WaveVariant {
//   orientation: Orientation;
//   waveCount: number;
//   /** 파도의 높이(진폭, 중심선에서 위/아래 최대 거리) */
//   amplitude: number;
//   /** 파도 경로의 전체 길이 */
//   length: number;
//   reversed?: boolean;
// }

// export interface ZigzagVariant {
//   orientation: Orientation;
//   /** 구간별 상대 길이. 구간 수 = 배열 길이, 방향 전환 횟수 = 길이 - 1 */
//   segmentWeights: number[];
//   /** 진행 방향 전체 길이 */
//   span: number;
//   /** 지그재그 폭(위아래 흔들리는 거리). span 대비 클수록 꺾임이 가파름 */
//   amplitude: number;
//   reversed?: boolean;
// }

// /**
//  * Level 8 갈림길 미로.
//  * mainPoints: 출발지 → (갈림길) → 목적지 정답 경로 (월드 좌표, 원점 근처)
//  * branchPoints: 갈림길에서 시작하는 막다른 길. 첫 점이 갈림길(main 위의 한 점)과 일치해야 함.
//  * 일자·ㄱ·ㄴ 조합으로 손으로 설계한 경로를 넣는다.
//  */
// export interface BranchedVariant {
//   /** 정답 경로 점열 (시작 → 갈림 → 목적지). 최소 3점 권장 */
//   mainPoints: Point[];
//   /** 막다른 길 점열. 첫 점은 갈림길(main 상의 점)과 같아야 함 */
//   branchPoints: Point[];
// }

// export interface PathConstraints<V> {
//   variants: readonly V[];
// }

// // ── 설정 공통 요소 ──────────────────────────────────────────

// export interface MagnetSettings {
//   range: number; // 자기력 영향 범위(px)
//   attachDistance: number; // 부착 거리(px)
//   maxAccel: number; // 최대 자기력 가속도
// }

// /** 경로 생성 공통 규칙(기획서 6-1)을 검사하는 기준값 */
// export interface ValidationRules {
//   /** 보드 가장자리에서 경로가 떨어져 있어야 하는 최소 여백 (보드 너비 = 1) */
//   boardMargin: number;
//   /** 시작점-목적지 최소 거리 */
//   minStartGoalDistance: number;
//   /** 나선 고리 사이 최소 간격 (중심부가 너무 좁아지는 것 방지) */
//   minRingSpacing: number;
//   /** 경로 전체를 제한 시간 안에 지나가는 데 필요한 평균 속도(보드 너비/초)의 상한 */
//   maxRequiredSpeed: number;
// }

// export const DEFAULT_RULES: ValidationRules = {
//   boardMargin: 0.06,
//   minStartGoalDistance: 0.25,
//   minRingSpacing: 0.06,
//   maxRequiredSpeed: 0.12,
// };

// /** 랜덤 요소. 기본값은 전부 꺼져 있어서 결정론적(항상 같은 결과)으로 동작한다 */
// export interface LevelVariation {
//   /** true 면 시드에 따라 좌우/상하를 뒤집을 수 있음 */
//   allowMirror: boolean;
//   /** 0.1 이면 크기가 ±10% 범위에서 달라짐 */
//   sizeJitter: number;
// }

// export const DEFAULT_VARIATION: LevelVariation = {
//   allowMirror: false,
//   sizeJitter: 0,
// };

// // ── 벽 설정 ───────────────────────────────────────────────
// // 단위는 px (쇠구슬 반지름과 같은 단위). 통로 폭과 벽 두께는 서로 독립적인 값이다.

// export interface WallSettings {
//   /** false 면 벽을 만들지 않고 충돌도 적용하지 않음 (Level 1) */
//   hasWalls: boolean;
//   /** 양쪽 벽 "안쪽 면" 사이의 실제 통로 폭 */
//   corridorWidth: number;
//   /** 벽 두께 (통로 바깥쪽으로 쌓임 → 통로 폭에는 영향 없음) */
//   wallThickness: number;
//   /** 꺾이는 코너의 중심선을 둥글게 깎는 반경. 0 이면 그대로 */
//   cornerRadius: number;
//   /** 생성 가능한 최소 통로 폭 (쇠구슬 지름보다 충분히 커야 함) */
//   minCorridorWidth: number;
// }

// // ── LevelConfig ────────────────────────────────────────────

// export interface LevelConfigBase {
//   levelId: number;
//   walls: WallSettings;
//   timeLimitSeconds: number;
//   roundCount: number;
//   /** [첫 라운드 난이도, 마지막 라운드 난이도]. 라운드 순서에 따라 선형 보간 */
//   difficultyRange: readonly [number, number];
//   ballRadius: number;
//   magnetSettings: MagnetSettings;
//   rules?: Partial<ValidationRules>;
//   variation?: Partial<LevelVariation>;
// }

// /** levelType 에 따라 pathConstraints 의 모양이 달라지는 합집합 타입 */
// export type LevelConfig = LevelConfigBase &
//   (
//     | {
//         levelType: typeof LevelType.FREE;
//         pathConstraints: PathConstraints<FreeVariant>;
//       }
//     | {
//         levelType: typeof LevelType.STRAIGHT;
//         pathConstraints: PathConstraints<StraightVariant>;
//       }
//     | {
//         levelType: typeof LevelType.L_SHAPE;
//         pathConstraints: PathConstraints<LShapeVariant>;
//       }
//     | {
//         levelType: typeof LevelType.CIRCLE;
//         pathConstraints: PathConstraints<CircleVariant>;
//       }
//     | {
//         levelType: typeof LevelType.SPIRAL;
//         pathConstraints: PathConstraints<SpiralVariant>;
//       }
//     | {
//         levelType: typeof LevelType.SQUARE_SPIRAL;
//         pathConstraints: PathConstraints<SquareSpiralVariant>;
//       }
//     | {
//         levelType: typeof LevelType.WAVE;
//         pathConstraints: PathConstraints<WaveVariant>;
//       }
//     | {
//         levelType: typeof LevelType.ZIGZAG;
//         pathConstraints: PathConstraints<ZigzagVariant>;
//       }
//     | {
//         levelType: typeof LevelType.BRANCHED;
//         pathConstraints: PathConstraints<BranchedVariant>;
//       }
//   );

// // ── GeneratedRound ─────────────────────────────────────────

// export interface GeneratedRound {
//   roundId: string; // 예: "L3-R2"
//   levelId: number;
//   roundIndex: number; // 0부터 시작
//   levelType: LevelType;
//   startPosition: Point; // 쇠구슬 시작점 (정규화 좌표)
//   goalPosition: Point; // 목적지 (정규화 좌표)
//   /** 시각적 가이드 경로(정답 메인). FREE 레벨은 빈 배열(경로 없음) */
//   pathPoints: Point[];
//   /**
//    * BRANCHED 전용: 막다른 길 등 추가 통로 중심선들.
//    * 각 배열은 하나의 폴리라인(정규화 좌표). 갈림길에서 main 과 연결된다.
//    * 렌더링·충돌은 pathPoints + extraPathPoints 의 합집합 통로를 사용한다.
//    */
//   extraPathPoints?: Point[][];
//   difficulty: number;
//   seed: number;
//   /** 경로 길이 (보드 너비 = 1). FREE 는 시작-목적지 직선거리. BRANCHED 는 정답 경로 길이 */
//   pathLength: number;
//   /** 생성에 사용한 보드 가로/세로 비. 보드 크기가 바뀌면(회전 등) 다시 생성해야 함 */
//   boardAspect: number;
//   /** 생성에 사용한 보드 크기(px). 벽 두께/통로 폭이 px 단위라서 함께 기록한다 */
//   boardWidth: number;
//   boardHeight: number;
// }

// ─────────────────────────────────────────────────────────────
// LevelType / LevelConfig / GeneratedRound 타입 정의
//
// 좌표 규칙
//  - GeneratedRound 의 모든 좌표는 정규화 좌표(x: 0~1, y: 0~1).
//  - 화면 좌표 = (x * 보드너비, y * 보드높이)  →  toBoardPoint() 사용
//  - 길이(length, radius, distance …)는 "보드 너비 = 1" 기준의 단위.
//    (원이 타원으로 찌그러지지 않도록, 생성기는 보드 가로세로비를 보고 계산한다)
// ─────────────────────────────────────────────────────────────

/** 경로의 유형. 레벨 번호와 분리해서 관리 → 같은 유형을 여러 레벨에서 재사용 가능 */
export const LevelType = {
  FREE: "FREE", // 자유 이동 (경로 없음)
  STRAIGHT: "STRAIGHT", // 직선
  L_SHAPE: "L_SHAPE", // ㄱ자 · ㄴ자
  CIRCLE: "CIRCLE", // 원형 · 원호
  SPIRAL: "SPIRAL", // 둥근 달팽이형 나선
  SQUARE_SPIRAL: "SQUARE_SPIRAL", // 네모난 달팽이 (직선 + 90도 회전)
  WAVE: "WAVE", // 파도형
  ZIGZAG: "ZIGZAG", // 지그재그
  /** Level 8+: 갈림길 + 막다른 길이 있는 복합 미로 (단일 정답 경로 + 탐색 분기) */
  BRANCHED: "BRANCHED",
} as const;
export type LevelType = (typeof LevelType)[keyof typeof LevelType];

export interface Point {
  x: number;
  y: number;
}

export type Orientation = "HORIZONTAL" | "VERTICAL";

// ── 라운드 변형(Variant): "이 라운드는 이런 모양" 한 줄 ────────────────
// 변형 목록(variants)의 i번째가 i번째 라운드가 된다. (라운드 수가 더 많으면 처음부터 순환)

export interface FreeVariant {
  /** 시작점 → 목적지 방향. 0 = 오른쪽, 90 = 아래, 45 = 오른쪽 아래 대각선 */
  angleDeg: number;
  /** 시작점과 목적지 사이 거리 */
  distance: number;
}

/** 직선 진행 방향 (시작 → 끝). 대각선은 화면에서 항상 45도 */
export type StraightDirection =
  | "LEFT_TO_RIGHT"
  | "RIGHT_TO_LEFT"
  | "TOP_TO_BOTTOM"
  | "BOTTOM_TO_TOP"
  | "TOP_LEFT_TO_BOTTOM_RIGHT"
  | "BOTTOM_RIGHT_TO_TOP_LEFT"
  | "TOP_RIGHT_TO_BOTTOM_LEFT"
  | "BOTTOM_LEFT_TO_TOP_RIGHT";

/**
 * 직선 경로.
 *  - 새 방식: direction 으로 8방향을 명시한다. (권장)
 *  - 기존 방식: orientation + reversed (direction 이 없을 때만 사용 → 하위 호환)
 * length 는 경로의 실제 길이(보드 너비 = 1). 대각선도 대각선 방향 길이다.
 */
export interface StraightVariant {
  direction?: StraightDirection;
  /** @deprecated direction 을 사용하세요 (기존 설정 호환용) */
  orientation?: Orientation;
  length: number;
  /** @deprecated direction 을 사용하세요 (기존 설정 호환용) */
  reversed?: boolean;
}

export type Rotation = 0 | 90 | 180 | 270;

/**
 * ㄱ자 / ㄴ자 경로. 기본 모양을 만든 뒤 아래 순서로 변환한다:
 *   기본 모양 → 좌우반전(mirrorX) → 상하반전(mirrorY) → 회전(rotationDeg, 시계 방향) → 진행 방향 반전(reversed)
 * points / start / goal 이 함께 변환되므로 시작·목적지는 항상 경로의 양 끝점이다.
 */
export interface LShapeVariant {
  /**
   * GIYEOK = ㄱ (오른쪽으로 갔다가 아래로), NIEUN = ㄴ (아래로 갔다가 오른쪽으로)
   * — 회전/반전을 적용하기 전 기본 모양
   */
  shape: "GIYEOK" | "NIEUN";
  /** 기본 모양에서 가로 구간 길이 */
  horizontalLength: number;
  /** 기본 모양에서 세로 구간 길이 */
  verticalLength: number;
  /** 시계 방향 회전. 기본 0 */
  rotationDeg?: Rotation;
  /** 좌우 반전 */
  mirrorX?: boolean;
  /** 상하 반전 */
  mirrorY?: boolean;
  /** true 면 진행 방향(시작↔목적지)을 반대로 */
  reversed?: boolean;
}

export interface CircleVariant {
  radius: number;
  /** 원호의 각도. 180 = 반원, 270 = 3/4 원호 (360 미만) */
  sweepDeg: number;
  clockwise: boolean;
  /** 시작 위치 각도. 0 = 오른쪽 끝, 90 = 아래, 180 = 왼쪽 끝, 270 = 위 */
  startAngleDeg: number;
}

export interface SpiralVariant {
  /** 회전 수. 0.5 단위(1.5, 2.5 …)면 목적지가 시작점의 반대쪽에 놓인다 */
  turns: number;
  outerRadius: number;
  innerRadius: number;
  clockwise: boolean;
  /** true = 바깥에서 안쪽으로, false = 안쪽에서 바깥으로 */
  startOutside: boolean;
  /**
   * 경로의 "출발점" 위치 각도. 0 = 오른쪽, 90 = 아래, 180 = 왼쪽, 270 = 위.
   * 생략하면 기존 동작(바깥 시작은 180 = 왼쪽, 안 → 밖은 그 경로를 뒤집은 모양)을 그대로 쓴다.
   */
  startAngleDeg?: number;
}

export type CompassDirection = "RIGHT" | "DOWN" | "LEFT" | "UP";

/** 네모난 달팽이. 직선 + 90도 회전만으로 이루어진 직각 나선 */
export interface SquareSpiralVariant {
  /** 회전 수. 한 바퀴 = 직선 구간 4개. 0.5 단위 허용 (2.5 = 10개 구간) */
  turns: number;
  /** 가장 바깥 한 변의 길이 (보드 너비 = 1) */
  outerSize: number;
  /** 가장 안쪽 마지막 구간의 길이 */
  innerSize: number;
  /** 진행하면서 도는 방향. true = 시계 방향 */
  clockwise: boolean;
  /** true = 바깥에서 안쪽으로, false = 안쪽에서 바깥으로 */
  startOutside: boolean;
  /** 바깥 → 안 모양을 만들 때 첫 구간의 방향 (안 → 바깥은 그 모양을 반대로 달린다) */
  startDirection: CompassDirection;
}

export interface WaveVariant {
  orientation: Orientation;
  waveCount: number;
  /** 파도의 높이(진폭, 중심선에서 위/아래 최대 거리) */
  amplitude: number;
  /** 파도 경로의 전체 길이 */
  length: number;
  reversed?: boolean;
}

export interface ZigzagVariant {
  orientation: Orientation;
  /** 구간별 상대 길이. 구간 수 = 배열 길이, 방향 전환 횟수 = 길이 - 1 */
  segmentWeights: number[];
  /** 진행 방향 전체 길이 */
  span: number;
  /** 지그재그 폭(위아래 흔들리는 거리). span 대비 클수록 꺾임이 가파름 */
  amplitude: number;
  reversed?: boolean;
}

/**
 * Level 8 갈림길 미로.
 * mainPoints: 출발지 → (갈림길) → 목적지 정답 경로 (월드 좌표, 원점 근처)
 * branchPoints: 갈림길에서 시작하는 막다른 길. 첫 점이 갈림길(main 위의 한 점)과 일치해야 함.
 * 일자·ㄱ·ㄴ 조합으로 손으로 설계한 경로를 넣는다.
 */
export interface BranchedVariant {
  /** 정답 경로 점열 (시작 → 갈림 → 목적지). 최소 3점 권장 */
  mainPoints: Point[];
  /** 막다른 길 점열. 첫 점은 갈림길(main 상의 점)과 같아야 함 */
  branchPoints: Point[];
}

export interface PathConstraints<V> {
  variants: readonly V[];
}

// ── 설정 공통 요소 ──────────────────────────────────────────

export interface MagnetSettings {
  range: number; // 자기력 영향 범위(px)
  attachDistance: number; // 부착 거리(px)
  maxAccel: number; // 최대 자기력 가속도
}

/** 경로 생성 공통 규칙(기획서 6-1)을 검사하는 기준값 */
export interface ValidationRules {
  /** 보드 가장자리에서 경로가 떨어져 있어야 하는 최소 여백 (보드 너비 = 1) */
  boardMargin: number;
  /** 시작점-목적지 최소 거리 */
  minStartGoalDistance: number;
  /** 나선 고리 사이 최소 간격 (중심부가 너무 좁아지는 것 방지) */
  minRingSpacing: number;
  /** 경로 전체를 제한 시간 안에 지나가는 데 필요한 평균 속도(보드 너비/초)의 상한 */
  maxRequiredSpeed: number;
}

export const DEFAULT_RULES: ValidationRules = {
  boardMargin: 0.06,
  minStartGoalDistance: 0.25,
  minRingSpacing: 0.06,
  maxRequiredSpeed: 0.12,
};

/** 랜덤 요소. 기본값은 전부 꺼져 있어서 결정론적(항상 같은 결과)으로 동작한다 */
export interface LevelVariation {
  /** true 면 시드에 따라 좌우/상하를 뒤집을 수 있음 */
  allowMirror: boolean;
  /** 0.1 이면 크기가 ±10% 범위에서 달라짐 */
  sizeJitter: number;
}

export const DEFAULT_VARIATION: LevelVariation = {
  allowMirror: false,
  sizeJitter: 0,
};

// ── 벽 설정 ───────────────────────────────────────────────
// 단위는 px (쇠구슬 반지름과 같은 단위). 통로 폭과 벽 두께는 서로 독립적인 값이다.

export interface WallSettings {
  /** false 면 벽을 만들지 않고 충돌도 적용하지 않음 (Level 1) */
  hasWalls: boolean;
  /** 양쪽 벽 "안쪽 면" 사이의 실제 통로 폭 */
  corridorWidth: number;
  /** 벽 두께 (통로 바깥쪽으로 쌓임 → 통로 폭에는 영향 없음) */
  wallThickness: number;
  /** 꺾이는 코너의 중심선을 둥글게 깎는 반경. 0 이면 그대로 */
  cornerRadius: number;
  /** 생성 가능한 최소 통로 폭 (쇠구슬 지름보다 충분히 커야 함) */
  minCorridorWidth: number;
}

// ── LevelConfig ────────────────────────────────────────────

export interface LevelConfigBase {
  levelId: number;
  walls: WallSettings;
  timeLimitSeconds: number;
  roundCount: number;
  /** [첫 라운드 난이도, 마지막 라운드 난이도]. 라운드 순서에 따라 선형 보간 */
  difficultyRange: readonly [number, number];
  ballRadius: number;
  magnetSettings: MagnetSettings;
  rules?: Partial<ValidationRules>;
  variation?: Partial<LevelVariation>;
  /**
   * true 면 라운드마다 variants 목록에서 고르지 않고, 레벨의 학습 목표를 지키는 범위 안에서
   * 새 variant 를 랜덤 생성한다 (randomVariants.ts). 이때 variants 는 "생성 범위를 정한 기준 자료"일 뿐이다.
   * 생략/false 면 기존처럼 roundIndex 로 variants 를 고른다 (Level 1~5).
   */
  randomVariants?: boolean;
}

/** levelType 에 따라 pathConstraints 의 모양이 달라지는 합집합 타입 */
export type LevelConfig = LevelConfigBase &
  (
    | {
        levelType: typeof LevelType.FREE;
        pathConstraints: PathConstraints<FreeVariant>;
      }
    | {
        levelType: typeof LevelType.STRAIGHT;
        pathConstraints: PathConstraints<StraightVariant>;
      }
    | {
        levelType: typeof LevelType.L_SHAPE;
        pathConstraints: PathConstraints<LShapeVariant>;
      }
    | {
        levelType: typeof LevelType.CIRCLE;
        pathConstraints: PathConstraints<CircleVariant>;
      }
    | {
        levelType: typeof LevelType.SPIRAL;
        pathConstraints: PathConstraints<SpiralVariant>;
      }
    | {
        levelType: typeof LevelType.SQUARE_SPIRAL;
        pathConstraints: PathConstraints<SquareSpiralVariant>;
      }
    | {
        levelType: typeof LevelType.WAVE;
        pathConstraints: PathConstraints<WaveVariant>;
      }
    | {
        levelType: typeof LevelType.ZIGZAG;
        pathConstraints: PathConstraints<ZigzagVariant>;
      }
    | {
        levelType: typeof LevelType.BRANCHED;
        pathConstraints: PathConstraints<BranchedVariant>;
      }
  );

// ── GeneratedRound ─────────────────────────────────────────

export interface GeneratedRound {
  roundId: string; // 예: "L3-R2"
  levelId: number;
  roundIndex: number; // 0부터 시작
  levelType: LevelType;
  startPosition: Point; // 쇠구슬 시작점 (정규화 좌표)
  goalPosition: Point; // 목적지 (정규화 좌표)
  /** 시각적 가이드 경로(정답 메인). FREE 레벨은 빈 배열(경로 없음) */
  pathPoints: Point[];
  /**
   * BRANCHED 전용: 막다른 길 등 추가 통로 중심선들.
   * 각 배열은 하나의 폴리라인(정규화 좌표). 갈림길에서 main 과 연결된다.
   * 렌더링·충돌은 pathPoints + extraPathPoints 의 합집합 통로를 사용한다.
   */
  extraPathPoints?: Point[][];
  difficulty: number;
  seed: number;
  /** 경로 길이 (보드 너비 = 1). FREE 는 시작-목적지 직선거리. BRANCHED 는 정답 경로 길이 */
  pathLength: number;
  /** 생성에 사용한 보드 가로/세로 비. 보드 크기가 바뀌면(회전 등) 다시 생성해야 함 */
  boardAspect: number;
  /** 생성에 사용한 보드 크기(px). 벽 두께/통로 폭이 px 단위라서 함께 기록한다 */
  boardWidth: number;
  boardHeight: number;
}
