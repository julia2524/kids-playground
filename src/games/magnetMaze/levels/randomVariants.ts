import {
  LevelType,
  type BranchedVariant,
  type CompassDirection,
  type Point,
  type SpiralVariant,
  type SquareSpiralVariant,
} from "./levelTypes";

/**
 * 라운드 랜덤 variant 생성기 (Level 6 ~ 8).
 *
 * - levelConfigs.ts 의 기존 5개 variants 는 "생성 범위를 정한 기준 자료"다.
 *   여기서는 그 값들(회전 수, 반경/크기, 통로 간격)을 기준으로 허용 범위를 정하고,
 *   방향·시작 위치·배치처럼 학습 목표에 영향을 주지 않는 요소만 라운드마다 바꾼다.
 * - "한 레벨 안의 모든 라운드는 같은 난이도"가 원칙이므로 난이도를 좌우하는 값
 *   (회전 수, 갈림길 수, 막다른 길 수, 구간 수)은 라운드마다 고정한다.
 * - 실제 경로 모양은 기존 buildSpiral / buildSquareSpiral / buildBranched 가 만든다.
 *   여기서는 그 함수에 넣을 매개변수만 만든다. (검증은 levelGenerator 의 validate 가 담당)
 * - Math.random 은 쓰지 않는다. 받은 rng(시드 기반)만 사용 → 같은 시드면 같은 결과.
 */

export type Rng = () => number;

// ── 공통 유틸 ───────────────────────────────────────────────

const between = (rng: Rng, min: number, max: number) =>
  min + (max - min) * rng();

const chance = (rng: Rng) => rng() < 0.5;

function oneOf<T>(rng: Rng, list: readonly T[]): T {
  return list[Math.min(list.length - 1, Math.floor(rng() * list.length))];
}

/** 소수 3자리로 정리 (보기 좋은 값 + 재현성) */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

// ── Level 6: 달팽이(둥근 나선) ─────────────────────────────────

/**
 * 기존 variants: turns 1.25(라운드 1~4) / 1.75(라운드 5), outerRadius 0.38, innerRadius 0.085.
 * 라운드 5 만 회전 수가 늘어 난이도가 튀었으므로 회전 수는 1.25 로 통일한다.
 */
export const SPIRAL_RANGE = {
  turns: 1.25,
  outerRadius: [0.36, 0.38],
  innerRadius: [0.085, 0.1],
  /** 시작 각도 간격(도). 0 = 오른쪽, 90 = 아래, 180 = 왼쪽, 270 = 위 */
  startAngleStep: 15,
} as const;

export function generateSpiralVariant(rng: Rng): SpiralVariant {
  const steps = Math.round(360 / SPIRAL_RANGE.startAngleStep);
  return {
    turns: SPIRAL_RANGE.turns,
    outerRadius: r3(between(rng, ...SPIRAL_RANGE.outerRadius)),
    innerRadius: r3(between(rng, ...SPIRAL_RANGE.innerRadius)),
    clockwise: chance(rng),
    startOutside: chance(rng),
    startAngleDeg: Math.floor(rng() * steps) * SPIRAL_RANGE.startAngleStep,
  };
}

// ── Level 7: 네모 달팽이 ───────────────────────────────────────

/**
 * 기존 variants: turns 2(라운드 1~4) / 2.5(라운드 5), outerSize 0.8, innerSize 0.23(0.2).
 * 라운드 5 만 구간이 늘어 난이도가 튀었으므로 회전 수는 2 로 통일한다.
 * 바퀴 사이 간격 d = (outer - inner) / (turns*2 - 1) ≈ 0.19 → 통로+벽 두께보다 넉넉하다.
 */
export const SQUARE_SPIRAL_RANGE = {
  turns: 2,
  outerSize: [0.76, 0.8],
  innerSize: [0.23, 0.26],
} as const;

const COMPASS: readonly CompassDirection[] = ["RIGHT", "DOWN", "LEFT", "UP"];

export function generateSquareSpiralVariant(rng: Rng): SquareSpiralVariant {
  return {
    turns: SQUARE_SPIRAL_RANGE.turns,
    outerSize: r3(between(rng, ...SQUARE_SPIRAL_RANGE.outerSize)),
    innerSize: r3(between(rng, ...SQUARE_SPIRAL_RANGE.innerSize)),
    clockwise: chance(rng),
    startOutside: chance(rng),
    startDirection: oneOf(rng, COMPASS),
  };
}

// ── Level 8: 갈림길이 한 번 나오는 미로 ──────────────────────────

/**
 * 기존 5개의 구조를 일반화한다. 모든 라운드가 같은 복잡도:
 *   START → (갈림길 1개) → GOAL  +  갈림길 → 막다른 길 1개
 *
 * 정답 경로는 "꺾임 0~2회"의 직각 경로이고, 갈림길은 항상 T자(3갈래)다.
 *   STRAIGHT_T : 일자 정답 + 중간에서 막다른 길         (기존 R1, R2)
 *   CORNER_T   : ㄱ/ㄴ 정답, 코너에서 갈림             (기존 R3, R4)
 *   S_SHAPE    : 일자-꺾임-일자 정답, 첫 코너에서 갈림   (기존 R5)
 *   BEFORE_TURN: ㄱ/ㄴ 정답, 꺾이기 전 직선 중간에서 갈림
 * 기본 모양을 만든 뒤 회전(4) × 좌우반전(2) × 진행방향 반대(2) 로 배치를 바꾼다.
 */
export const BRANCHED_RANGE = {
  straightLength: [0.7, 0.76],
  straightJunctionOffset: 0.1, // 중앙에서 ±
  deadEnd: [0.26, 0.32],
  legA: [0.46, 0.52], // 코너까지의 긴 구간
  legB: [0.4, 0.46], // 코너 이후 구간
  legC: [0.22, 0.28], // S자의 마지막 구간
} as const;

type Archetype = "STRAIGHT_T" | "CORNER_T" | "S_SHAPE" | "BEFORE_TURN";
const ARCHETYPES: readonly Archetype[] = [
  "STRAIGHT_T",
  "CORNER_T",
  "S_SHAPE",
  "BEFORE_TURN",
];

const pt = (x: number, y: number): Point => ({ x, y });

/** 기본 모양(회전·반전 전). 좌표는 월드(원점 근처), x 오른쪽 + / y 아래 + */
function baseBranched(rng: Rng, kind: Archetype): BranchedVariant {
  const R = BRANCHED_RANGE;
  const dead = between(rng, ...R.deadEnd);

  switch (kind) {
    case "STRAIGHT_T": {
      const len = between(rng, ...R.straightLength);
      const jx = between(
        rng,
        -R.straightJunctionOffset,
        R.straightJunctionOffset,
      );
      return {
        mainPoints: [pt(-len / 2, 0), pt(jx, 0), pt(len / 2, 0)],
        branchPoints: [pt(jx, 0), pt(jx, -dead)],
      };
    }
    case "CORNER_T": {
      const a = between(rng, ...R.legA);
      const b = between(rng, ...R.legB);
      // 막다른 길: 나가는 쪽의 반대(위) 또는 들어온 방향의 연장(오른쪽)
      const branchEnd = chance(rng) ? pt(0, -dead) : pt(dead, 0);
      return {
        mainPoints: [pt(-a, 0), pt(0, 0), pt(0, b)],
        branchPoints: [pt(0, 0), branchEnd],
      };
    }
    case "S_SHAPE": {
      const a = between(rng, ...R.legA);
      const b = between(rng, ...R.legB);
      const c = between(rng, ...R.legC);
      const branchEnd = chance(rng) ? pt(0, -dead) : pt(dead, 0);
      return {
        mainPoints: [pt(-a, 0), pt(0, 0), pt(0, b), pt(c, b)],
        branchPoints: [pt(0, 0), branchEnd],
      };
    }
    case "BEFORE_TURN": {
      // 첫 직선 중간(갈림) → 코너 → 목적지.  막다른 길은 위쪽(코너 반대쪽)
      const a = between(rng, ...R.legA);
      const b = between(rng, ...R.legB);
      const jx = -a * between(rng, 0.4, 0.6);
      return {
        mainPoints: [pt(-a, 0), pt(jx, 0), pt(0, 0), pt(0, b)],
        branchPoints: [pt(jx, 0), pt(jx, -dead)],
      };
    }
  }
}

/** 회전(90° 단위) · 좌우반전 · 진행 방향 반대를 적용한다. 갈림길/막다른 길 관계는 그대로 유지된다. */
function transformBranched(rng: Rng, v: BranchedVariant): BranchedVariant {
  const rot = Math.floor(rng() * 4); // 90° 단위
  const mirror = chance(rng);
  const reverse = chance(rng);

  const f = (q: Point): Point => {
    let { x, y } = q;
    if (mirror) x = -x;
    for (let i = 0; i < rot; i++) {
      const nx = -y;
      const ny = x;
      x = nx;
      y = ny;
    }
    return { x: r3(x), y: r3(y) };
  };

  const main = v.mainPoints.map(f);
  return {
    mainPoints: reverse ? main.reverse() : main,
    branchPoints: v.branchPoints.map(f),
  };
}

export function generateBranchedVariant(rng: Rng): BranchedVariant {
  const kind = oneOf(rng, ARCHETYPES);
  const base = baseBranched(rng, kind);
  const rounded: BranchedVariant = {
    mainPoints: base.mainPoints.map((p) => pt(r3(p.x), r3(p.y))),
    branchPoints: base.branchPoints.map((p) => pt(r3(p.x), r3(p.y))),
  };
  return transformBranched(rng, rounded);
}

// ── 레벨 유형 → 생성기 ────────────────────────────────────────

/** 랜덤 생성을 지원하는 레벨 유형. 여기에 추가하면 Level 9+ 도 같은 방식으로 확장할 수 있다. */
export const RANDOM_VARIANT_GENERATORS = {
  [LevelType.SPIRAL]: generateSpiralVariant,
  [LevelType.SQUARE_SPIRAL]: generateSquareSpiralVariant,
  [LevelType.BRANCHED]: generateBranchedVariant,
} as const;
