// import {
//   LevelType,
//   type BranchedVariant,
//   type CompassDirection,
//   type MultiBranchedVariant,
//   type Point,
//   type SpiralVariant,
//   type SquareSpiralVariant,
// } from "./levelTypes";

// /**
//  * 라운드 랜덤 variant 생성기 (Level 6 ~ 8).
//  *
//  * - levelConfigs.ts 의 기존 5개 variants 는 "생성 범위를 정한 기준 자료"다.
//  *   여기서는 그 값들(회전 수, 반경/크기, 통로 간격)을 기준으로 허용 범위를 정하고,
//  *   방향·시작 위치·배치처럼 학습 목표에 영향을 주지 않는 요소만 라운드마다 바꾼다.
//  * - "한 레벨 안의 모든 라운드는 같은 난이도"가 원칙이므로 난이도를 좌우하는 값
//  *   (회전 수, 갈림길 수, 막다른 길 수, 구간 수)은 라운드마다 고정한다.
//  * - 실제 경로 모양은 기존 buildSpiral / buildSquareSpiral / buildBranched 가 만든다.
//  *   여기서는 그 함수에 넣을 매개변수만 만든다. (검증은 levelGenerator 의 validate 가 담당)
//  * - Math.random 은 쓰지 않는다. 받은 rng(시드 기반)만 사용 → 같은 시드면 같은 결과.
//  */

// export type Rng = () => number;

// // ── 공통 유틸 ───────────────────────────────────────────────

// const between = (rng: Rng, min: number, max: number) =>
//   min + (max - min) * rng();

// const chance = (rng: Rng) => rng() < 0.5;

// function oneOf<T>(rng: Rng, list: readonly T[]): T {
//   return list[Math.min(list.length - 1, Math.floor(rng() * list.length))];
// }

// /** 소수 3자리로 정리 (보기 좋은 값 + 재현성) */
// const r3 = (n: number) => Math.round(n * 1000) / 1000;

// // ── Level 6: 달팽이(둥근 나선) ─────────────────────────────────

// /**
//  * 기존 variants: turns 1.25(라운드 1~4) / 1.75(라운드 5), outerRadius 0.38, innerRadius 0.085.
//  * 라운드 5 만 회전 수가 늘어 난이도가 튀었으므로 회전 수는 1.25 로 통일한다.
//  */
// export const SPIRAL_RANGE = {
//   turns: 1.25,
//   outerRadius: [0.36, 0.38],
//   innerRadius: [0.085, 0.1],
//   /** 시작 각도 간격(도). 0 = 오른쪽, 90 = 아래, 180 = 왼쪽, 270 = 위 */
//   startAngleStep: 15,
// } as const;

// export function generateSpiralVariant(rng: Rng): SpiralVariant {
//   const steps = Math.round(360 / SPIRAL_RANGE.startAngleStep);
//   return {
//     turns: SPIRAL_RANGE.turns,
//     outerRadius: r3(between(rng, ...SPIRAL_RANGE.outerRadius)),
//     innerRadius: r3(between(rng, ...SPIRAL_RANGE.innerRadius)),
//     clockwise: chance(rng),
//     startOutside: chance(rng),
//     startAngleDeg: Math.floor(rng() * steps) * SPIRAL_RANGE.startAngleStep,
//   };
// }

// // ── Level 7: 네모 달팽이 ───────────────────────────────────────

// /**
//  * 기존 variants: turns 2(라운드 1~4) / 2.5(라운드 5), outerSize 0.8, innerSize 0.23(0.2).
//  * 라운드 5 만 구간이 늘어 난이도가 튀었으므로 회전 수는 2 로 통일한다.
//  * 바퀴 사이 간격 d = (outer - inner) / (turns*2 - 1) ≈ 0.19 → 통로+벽 두께보다 넉넉하다.
//  */
// export const SQUARE_SPIRAL_RANGE = {
//   turns: 2,
//   outerSize: [0.76, 0.8],
//   innerSize: [0.23, 0.26],
// } as const;

// const COMPASS: readonly CompassDirection[] = ["RIGHT", "DOWN", "LEFT", "UP"];

// export function generateSquareSpiralVariant(rng: Rng): SquareSpiralVariant {
//   return {
//     turns: SQUARE_SPIRAL_RANGE.turns,
//     outerSize: r3(between(rng, ...SQUARE_SPIRAL_RANGE.outerSize)),
//     innerSize: r3(between(rng, ...SQUARE_SPIRAL_RANGE.innerSize)),
//     clockwise: chance(rng),
//     startOutside: chance(rng),
//     startDirection: oneOf(rng, COMPASS),
//   };
// }

// // ── Level 8: 갈림길이 한 번 나오는 미로 ──────────────────────────

// /**
//  * 기존 5개의 구조를 일반화한다. 모든 라운드가 같은 복잡도:
//  *   START → (갈림길 1개) → GOAL  +  갈림길 → 막다른 길 1개
//  *
//  * 정답 경로는 "꺾임 0~2회"의 직각 경로이고, 갈림길은 항상 T자(3갈래)다.
//  *   STRAIGHT_T : 일자 정답 + 중간에서 막다른 길         (기존 R1, R2)
//  *   CORNER_T   : ㄱ/ㄴ 정답, 코너에서 갈림             (기존 R3, R4)
//  *   S_SHAPE    : 일자-꺾임-일자 정답, 첫 코너에서 갈림   (기존 R5)
//  *   BEFORE_TURN: ㄱ/ㄴ 정답, 꺾이기 전 직선 중간에서 갈림
//  * 기본 모양을 만든 뒤 회전(4) × 좌우반전(2) × 진행방향 반대(2) 로 배치를 바꾼다.
//  */
// export const BRANCHED_RANGE = {
//   straightLength: [0.7, 0.76],
//   straightJunctionOffset: 0.1, // 중앙에서 ±
//   deadEnd: [0.26, 0.32],
//   legA: [0.46, 0.52], // 코너까지의 긴 구간
//   legB: [0.4, 0.46], // 코너 이후 구간
//   legC: [0.22, 0.28], // S자의 마지막 구간
// } as const;

// type Archetype = "STRAIGHT_T" | "CORNER_T" | "S_SHAPE" | "BEFORE_TURN";
// const ARCHETYPES: readonly Archetype[] = [
//   "STRAIGHT_T",
//   "CORNER_T",
//   "S_SHAPE",
//   "BEFORE_TURN",
// ];

// const pt = (x: number, y: number): Point => ({ x, y });

// /** 기본 모양(회전·반전 전). 좌표는 월드(원점 근처), x 오른쪽 + / y 아래 + */
// function baseBranched(rng: Rng, kind: Archetype): BranchedVariant {
//   const R = BRANCHED_RANGE;
//   const dead = between(rng, ...R.deadEnd);

//   switch (kind) {
//     case "STRAIGHT_T": {
//       const len = between(rng, ...R.straightLength);
//       const jx = between(
//         rng,
//         -R.straightJunctionOffset,
//         R.straightJunctionOffset,
//       );
//       return {
//         mainPoints: [pt(-len / 2, 0), pt(jx, 0), pt(len / 2, 0)],
//         branchPoints: [pt(jx, 0), pt(jx, -dead)],
//       };
//     }
//     case "CORNER_T": {
//       const a = between(rng, ...R.legA);
//       const b = between(rng, ...R.legB);
//       // 막다른 길: 나가는 쪽의 반대(위) 또는 들어온 방향의 연장(오른쪽)
//       const branchEnd = chance(rng) ? pt(0, -dead) : pt(dead, 0);
//       return {
//         mainPoints: [pt(-a, 0), pt(0, 0), pt(0, b)],
//         branchPoints: [pt(0, 0), branchEnd],
//       };
//     }
//     case "S_SHAPE": {
//       const a = between(rng, ...R.legA);
//       const b = between(rng, ...R.legB);
//       const c = between(rng, ...R.legC);
//       const branchEnd = chance(rng) ? pt(0, -dead) : pt(dead, 0);
//       return {
//         mainPoints: [pt(-a, 0), pt(0, 0), pt(0, b), pt(c, b)],
//         branchPoints: [pt(0, 0), branchEnd],
//       };
//     }
//     case "BEFORE_TURN": {
//       // 첫 직선 중간(갈림) → 코너 → 목적지.  막다른 길은 위쪽(코너 반대쪽)
//       const a = between(rng, ...R.legA);
//       const b = between(rng, ...R.legB);
//       const jx = -a * between(rng, 0.4, 0.6);
//       return {
//         mainPoints: [pt(-a, 0), pt(jx, 0), pt(0, 0), pt(0, b)],
//         branchPoints: [pt(jx, 0), pt(jx, -dead)],
//       };
//     }
//   }
// }

// /** 회전(90° 단위) · 좌우반전 · 진행 방향 반대를 적용한다. 갈림길/막다른 길 관계는 그대로 유지된다. */
// function transformBranched(rng: Rng, v: BranchedVariant): BranchedVariant {
//   const rot = Math.floor(rng() * 4); // 90° 단위
//   const mirror = chance(rng);
//   const reverse = chance(rng);

//   const f = (q: Point): Point => {
//     let { x, y } = q;
//     if (mirror) x = -x;
//     for (let i = 0; i < rot; i++) {
//       const nx = -y;
//       const ny = x;
//       x = nx;
//       y = ny;
//     }
//     return { x: r3(x), y: r3(y) };
//   };

//   const main = v.mainPoints.map(f);
//   return {
//     mainPoints: reverse ? main.reverse() : main,
//     branchPoints: v.branchPoints.map(f),
//   };
// }

// export function generateBranchedVariant(rng: Rng): BranchedVariant {
//   const kind = oneOf(rng, ARCHETYPES);
//   const base = baseBranched(rng, kind);
//   const rounded: BranchedVariant = {
//     mainPoints: base.mainPoints.map((p) => pt(r3(p.x), r3(p.y))),
//     branchPoints: base.branchPoints.map((p) => pt(r3(p.x), r3(p.y))),
//   };
//   return transformBranched(rng, rounded);
// }

// // ── Level 9+: 갈림길이 연속으로 나오는 미로 ───────────────────────

// /**
//  * Level 9 = 갈림길 2개. START → 갈림길 A → 갈림길 B → GOAL, 갈림길마다 막다른 길 1개.
//  *
//  * 연결 구조를 먼저 만들고 좌표로 바꾼다:
//  *   1) 4×4 격자 위에서 정답 경로(자기 교차 없는 직각 경로)를 랜덤으로 만든다
//  *   2) 정답 경로 위에서 갈림길 노드를 고른다
//  *   3) 갈림길마다 비어 있는 이웃 노드로 막다른 길을 뻗는다
//  *   4) 격자 노드 → 월드 좌표
//  * 격자 간격(GRID_PITCH)이 "서로 연결되지 않은 통로 사이 최소 간격"이 되므로
//  * 통로가 붙거나 새 갈림길이 생기지 않는다. (최종 검증은 levelGenerator 가 실제 연결 그래프로 다시 한다)
//  *
//  * 난이도(정답 경로 길이, 갈림길 수, 막다른 길 수)는 라운드마다 거의 같고,
//  * 위치·방향·꺾임·막다른 길의 모양만 달라진다.
//  */
// export const MULTI_BRANCHED_RANGE = {
//   gridSize: 4,
//   /** 격자 노드 간격 (보드 너비 = 1). 통로폭 + 벽 두께(≈0.18)보다 넉넉해야 한다 */
//   pitch: 0.22,
//   /** 정답 경로 구간 수 = baseEdges + junctionCount 의 ±0 ~ +1 */
//   mainEdgesBase: 4,
//   mainEdgesExtra: 2,
//   /** 막다른 길 구간 수 */
//   deadEndEdges: [2, 3],
//   /** 갈림길 사이(정답 경로상) 최소 구간 수 */
//   minEdgesBetweenJunctions: 3,
//   /** 출발지-목적지 최소 맨해튼 거리(격자 칸) */
//   minStartGoalSteps: 4,
//   /** 막다른 길 끝 구간 길이 비율 */
//   tipRatio: [0.75, 1],
// } as const;

// interface Cell {
//   c: number;
//   r: number;
// }
// const cellKey = (n: Cell) => n.c * 10 + n.r;
// const STEPS: readonly Cell[] = [
//   { c: 1, r: 0 },
//   { c: -1, r: 0 },
//   { c: 0, r: 1 },
//   { c: 0, r: -1 },
// ];

// function freeNeighbors(n: Cell, used: Set<number>, size: number): Cell[] {
//   const out: Cell[] = [];
//   for (const d of STEPS) {
//     const m = { c: n.c + d.c, r: n.r + d.r };
//     if (m.c < 0 || m.r < 0 || m.c >= size || m.r >= size) continue;
//     if (!used.has(cellKey(m))) out.push(m);
//   }
//   return out;
// }

// function shuffled<T>(rng: Rng, list: readonly T[]): T[] {
//   const a = list.slice();
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(rng() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// /** 자기 교차 없는 랜덤 걷기. 막히면 null */
// function walk(
//   rng: Rng,
//   from: Cell,
//   edges: number,
//   used: Set<number>,
//   size: number,
// ): Cell[] | null {
//   const path: Cell[] = [from];
//   const mine = new Set<number>();
//   for (let i = 0; i < edges; i++) {
//     const cur = path[path.length - 1];
//     const next = freeNeighbors(cur, new Set([...used, ...mine]), size);
//     if (next.length === 0) return null;
//     const m = oneOf(rng, next);
//     mine.add(cellKey(m));
//     path.push(m);
//   }
//   return path;
// }

// /** 일직선 위의 중간 점은 빼고, 꺾이는 점·keep 으로 지정한 점·양 끝만 남긴다 */
// function simplify(path: Cell[], keep: Set<number>): Cell[] {
//   return path.filter((n, i) => {
//     if (i === 0 || i === path.length - 1) return true;
//     if (keep.has(cellKey(n))) return true;
//     const a = path[i - 1];
//     const b = path[i + 1];
//     return !(n.c - a.c === b.c - n.c && n.r - a.r === b.r - n.r);
//   });
// }

// export function generateMultiBranchedVariant(
//   rng: Rng,
//   junctionCount: number,
// ): MultiBranchedVariant {
//   const R = MULTI_BRANCHED_RANGE;
//   const size = R.gridSize;
//   const K = junctionCount;

//   for (let attempt = 0; attempt < 400; attempt++) {
//     // 1) 정답 경로
//     const edges =
//       R.mainEdgesBase + K + Math.floor(rng() * (R.mainEdgesExtra + 1));
//     const start = {
//       c: Math.floor(rng() * size),
//       r: Math.floor(rng() * size),
//     };
//     const main = walk(rng, start, edges, new Set([cellKey(start)]), size);
//     if (!main) continue;
//     const goal = main[main.length - 1];
//     if (
//       Math.abs(goal.c - start.c) + Math.abs(goal.r - start.r) <
//       R.minStartGoalSteps
//     )
//       continue;

//     // 2) 갈림길 위치: 정답 경로 중간의 노드 K개 (서로 충분히 떨어지고 한 줄에 놓이지 않게)
//     const idx: number[] = [];
//     let ok = true;
//     let lo = 1;
//     for (let k = 0; k < K && ok; k++) {
//       const hi = edges - 1 - (K - 1 - k) * R.minEdgesBetweenJunctions;
//       if (hi < lo) {
//         ok = false;
//         break;
//       }
//       const i = lo + Math.floor(rng() * (hi - lo + 1));
//       idx.push(i);
//       lo = i + R.minEdgesBetweenJunctions;
//     }
//     if (!ok) continue;
//     let aligned = false;
//     for (let k = 1; k < K; k++) {
//       const a = main[idx[k - 1]];
//       const b = main[idx[k]];
//       if (a.c === b.c || a.r === b.r) aligned = true;
//     }
//     if (aligned) continue;

//     // 3) 막다른 길
//     const used = new Set(main.map(cellKey));
//     const branches: Cell[][] = [];
//     for (const i of idx) {
//       const len =
//         R.deadEndEdges[0] +
//         Math.floor(rng() * (R.deadEndEdges[1] - R.deadEndEdges[0] + 1));
//       let found: Cell[] | null = null;
//       for (const first of shuffled(rng, freeNeighbors(main[i], used, size))) {
//         const tail = walk(
//           rng,
//           first,
//           len - 1,
//           new Set([...used, cellKey(first)]),
//           size,
//         );
//         if (tail) {
//           found = [main[i], ...tail];
//           break;
//         }
//       }
//       if (!found) {
//         ok = false;
//         break;
//       }
//       for (const n of found.slice(1)) used.add(cellKey(n));
//       branches.push(found);
//     }
//     if (!ok) continue;

//     // 보드를 고르게 쓰는지: 가로/세로 3칸 이상 + 무게중심이 가운데 근처
//     const all = [...main, ...branches.flatMap((b) => b.slice(1))];
//     const cs = all.map((n) => n.c);
//     const rs = all.map((n) => n.r);
//     if (Math.max(...cs) - Math.min(...cs) < 2) continue;
//     if (Math.max(...rs) - Math.min(...rs) < 2) continue;
//     const mc = cs.reduce((a, b) => a + b, 0) / all.length;
//     const mr = rs.reduce((a, b) => a + b, 0) / all.length;
//     const mid = (size - 1) / 2;
//     if (Math.abs(mc - mid) > 0.6 || Math.abs(mr - mid) > 0.6) continue;

//     // 4) 월드 좌표 (+ 회전/반전)
//     const rot = Math.floor(rng() * 4);
//     const mirror = chance(rng);
//     const toWorld = (n: Cell, scale = 1): Point => {
//       let x = (n.c - mid) * R.pitch;
//       let y = (n.r - mid) * R.pitch;
//       if (mirror) x = -x;
//       for (let t = 0; t < rot; t++) [x, y] = [-y, x];
//       return { x: r3(x * scale), y: r3(y * scale) };
//     };
//     const world = (n: Cell): Point => toWorld(n);

//     const junctionKeys = new Set(idx.map((i) => cellKey(main[i])));
//     const mainPts = simplify(main, junctionKeys).map(world);
//     const branchPts = branches.map((b) => {
//       const cells = simplify(b, new Set());
//       const pts = cells.map(world);
//       // 막다른 길 끝 구간을 조금 줄여 모양에 변화를 준다
//       const n = pts.length;
//       const ratio = between(rng, ...R.tipRatio);
//       const a = pts[n - 2];
//       const z = pts[n - 1];
//       pts[n - 1] = {
//         x: r3(a.x + (z.x - a.x) * ratio),
//         y: r3(a.y + (z.y - a.y) * ratio),
//       };
//       return pts;
//     });
//     return { mainPoints: mainPts, branches: branchPts };
//   }
//   throw new Error("[randomVariants] 연속 갈림길 미로를 만들지 못했습니다");
// }

// // ── 레벨 유형 → 생성기 ────────────────────────────────────────

// /** 랜덤 생성을 지원하는 레벨 유형. 여기에 추가하면 Level 9+ 도 같은 방식으로 확장할 수 있다. */
// export const RANDOM_VARIANT_GENERATORS = {
//   [LevelType.SPIRAL]: generateSpiralVariant,
//   [LevelType.SQUARE_SPIRAL]: generateSquareSpiralVariant,
//   [LevelType.BRANCHED]: generateBranchedVariant,
//   [LevelType.MULTI_BRANCHED]: generateMultiBranchedVariant,
// } as const;

import {
  LevelType,
  type BranchedVariant,
  type CompassDirection,
  type MultiBranchedVariant,
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

// ── Level 9+: 갈림길이 연속으로 나오는 미로 ───────────────────────

/**
 * Level 9 = 갈림길 2개. START → 갈림길 A → 갈림길 B → GOAL, 갈림길마다 막다른 길 1개.
 *
 * 연결 구조를 먼저 만들고 좌표로 바꾼다:
 *   1) 4×4 격자 위에서 정답 경로(자기 교차 없는 직각 경로)를 랜덤으로 만든다
 *   2) 정답 경로 위에서 갈림길 노드를 고른다
 *   3) 갈림길마다 비어 있는 이웃 노드로 막다른 길을 뻗는다
 *   4) 격자 노드 → 월드 좌표
 * 격자 간격(GRID_PITCH)이 "서로 연결되지 않은 통로 사이 최소 간격"이 되므로
 * 통로가 붙거나 새 갈림길이 생기지 않는다. (최종 검증은 levelGenerator 가 실제 연결 그래프로 다시 한다)
 *
 * 난이도(정답 경로 길이, 갈림길 수, 막다른 길 수)는 라운드마다 거의 같고,
 * 위치·방향·꺾임·막다른 길의 모양만 달라진다.
 */
export interface MultiBranchedRange {
  gridSize: number;
  /** 격자 노드 간격 (보드 너비 = 1). 통로폭 + 벽 두께(≈0.18)보다 크거나 같아야 한다 */
  pitch: number;
  /** 정답 경로 구간 수 = mainEdgesBase + junctionCount + (0 ~ mainEdgesExtra) */
  mainEdgesBase: number;
  mainEdgesExtra: number;
  /** 막다른 길 구간 수 [최소, 최대] */
  deadEndEdges: readonly [number, number];
  /** 갈림길 사이(정답 경로상) 최소 구간 수 */
  minEdgesBetweenJunctions: number;
  /** 출발지-목적지 최소 맨해튼 거리(격자 칸) */
  minStartGoalSteps: number;
  /** 구조 전체가 가로/세로로 걸쳐야 하는 최소 칸 수 (보드 일부만 쓰는 배치 방지) */
  minSpan: number;
  /** 무게중심이 격자 중심에서 벗어날 수 있는 최대 칸 수 (한쪽에 몰림 방지) */
  centroidTol: number;
  /** 막다른 길 끝 구간 길이 비율 */
  tipRatio: readonly [number, number];
}

/** 갈림길 2개 (Level 9): 4×4 격자 */
const MULTI_BRANCHED_2: MultiBranchedRange = {
  gridSize: 4,
  pitch: 0.22,
  mainEdgesBase: 4,
  mainEdgesExtra: 2,
  deadEndEdges: [2, 3],
  minEdgesBetweenJunctions: 3,
  minStartGoalSteps: 4,
  minSpan: 2,
  centroidTol: 0.6,
  tipRatio: [0.75, 1],
};

/**
 * 갈림길 3개 (Level 10): 갈림길 하나와 막다른 길 하나가 늘어 4×4 에는 들어가지 않으므로 5×5 격자.
 * 통로 폭/벽 두께는 그대로이고 격자 간격만 0.18 (= 통로폭+벽 ≈ 0.176 보다 크다).
 */
const MULTI_BRANCHED_3: MultiBranchedRange = {
  ...MULTI_BRANCHED_2,
  gridSize: 5,
  pitch: 0.18,
  minStartGoalSteps: 5,
  minSpan: 3,
  centroidTol: 0.7,
};

/** 갈림길 수별 생성 범위. Level 11+ 에서 갈림길이 더 늘면 여기에 항목을 추가한다 */
export function multiBranchedRange(junctionCount: number): MultiBranchedRange {
  if (junctionCount === 2) return MULTI_BRANCHED_2;
  if (junctionCount === 3) return MULTI_BRANCHED_3;
  throw new Error(
    `[randomVariants] 갈림길 ${junctionCount}개 미로의 생성 범위가 정의되어 있지 않습니다`,
  );
}

interface Cell {
  c: number;
  r: number;
}
const cellKey = (n: Cell) => n.c * 10 + n.r;
const STEPS: readonly Cell[] = [
  { c: 1, r: 0 },
  { c: -1, r: 0 },
  { c: 0, r: 1 },
  { c: 0, r: -1 },
];

function freeNeighbors(n: Cell, used: Set<number>, size: number): Cell[] {
  const out: Cell[] = [];
  for (const d of STEPS) {
    const m = { c: n.c + d.c, r: n.r + d.r };
    if (m.c < 0 || m.r < 0 || m.c >= size || m.r >= size) continue;
    if (!used.has(cellKey(m))) out.push(m);
  }
  return out;
}

function shuffled<T>(rng: Rng, list: readonly T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 자기 교차 없는 랜덤 걷기. 막히면 null */
function walk(
  rng: Rng,
  from: Cell,
  edges: number,
  used: Set<number>,
  size: number,
): Cell[] | null {
  const path: Cell[] = [from];
  const mine = new Set<number>();
  for (let i = 0; i < edges; i++) {
    const cur = path[path.length - 1];
    const next = freeNeighbors(cur, new Set([...used, ...mine]), size);
    if (next.length === 0) return null;
    const m = oneOf(rng, next);
    mine.add(cellKey(m));
    path.push(m);
  }
  return path;
}

/** 일직선 위의 중간 점은 빼고, 꺾이는 점·keep 으로 지정한 점·양 끝만 남긴다 */
function simplify(path: Cell[], keep: Set<number>): Cell[] {
  return path.filter((n, i) => {
    if (i === 0 || i === path.length - 1) return true;
    if (keep.has(cellKey(n))) return true;
    const a = path[i - 1];
    const b = path[i + 1];
    return !(n.c - a.c === b.c - n.c && n.r - a.r === b.r - n.r);
  });
}

export function generateMultiBranchedVariant(
  rng: Rng,
  junctionCount: number,
): MultiBranchedVariant {
  const R = multiBranchedRange(junctionCount);
  const size = R.gridSize;
  const K = junctionCount;

  for (let attempt = 0; attempt < 400; attempt++) {
    // 1) 정답 경로
    const edges =
      R.mainEdgesBase + K + Math.floor(rng() * (R.mainEdgesExtra + 1));
    const start = {
      c: Math.floor(rng() * size),
      r: Math.floor(rng() * size),
    };
    const main = walk(rng, start, edges, new Set([cellKey(start)]), size);
    if (!main) continue;
    const goal = main[main.length - 1];
    if (
      Math.abs(goal.c - start.c) + Math.abs(goal.r - start.r) <
      R.minStartGoalSteps
    )
      continue;

    // 2) 갈림길 위치: 정답 경로 중간의 노드 K개 (서로 충분히 떨어지고 한 줄에 놓이지 않게)
    const idx: number[] = [];
    let ok = true;
    let lo = 1;
    for (let k = 0; k < K && ok; k++) {
      const hi = edges - 1 - (K - 1 - k) * R.minEdgesBetweenJunctions;
      if (hi < lo) {
        ok = false;
        break;
      }
      const i = lo + Math.floor(rng() * (hi - lo + 1));
      idx.push(i);
      lo = i + R.minEdgesBetweenJunctions;
    }
    if (!ok) continue;
    let aligned = false;
    for (let k = 1; k < K; k++) {
      const a = main[idx[k - 1]];
      const b = main[idx[k]];
      if (a.c === b.c || a.r === b.r) aligned = true;
    }
    if (aligned) continue;

    // 3) 막다른 길
    const used = new Set(main.map(cellKey));
    const branches: Cell[][] = [];
    for (const i of idx) {
      const len =
        R.deadEndEdges[0] +
        Math.floor(rng() * (R.deadEndEdges[1] - R.deadEndEdges[0] + 1));
      let found: Cell[] | null = null;
      for (const first of shuffled(rng, freeNeighbors(main[i], used, size))) {
        const tail = walk(
          rng,
          first,
          len - 1,
          new Set([...used, cellKey(first)]),
          size,
        );
        if (tail) {
          found = [main[i], ...tail];
          break;
        }
      }
      if (!found) {
        ok = false;
        break;
      }
      for (const n of found.slice(1)) used.add(cellKey(n));
      branches.push(found);
    }
    if (!ok) continue;

    // 보드를 고르게 쓰는지: 가로/세로 3칸 이상 + 무게중심이 가운데 근처
    const all = [...main, ...branches.flatMap((b) => b.slice(1))];
    const cs = all.map((n) => n.c);
    const rs = all.map((n) => n.r);
    if (Math.max(...cs) - Math.min(...cs) < R.minSpan) continue;
    if (Math.max(...rs) - Math.min(...rs) < R.minSpan) continue;
    const mc = cs.reduce((a, b) => a + b, 0) / all.length;
    const mr = rs.reduce((a, b) => a + b, 0) / all.length;
    const mid = (size - 1) / 2;
    if (
      Math.abs(mc - mid) > R.centroidTol ||
      Math.abs(mr - mid) > R.centroidTol
    )
      continue;

    // 4) 월드 좌표 (+ 회전/반전)
    const rot = Math.floor(rng() * 4);
    const mirror = chance(rng);
    const toWorld = (n: Cell, scale = 1): Point => {
      let x = (n.c - mid) * R.pitch;
      let y = (n.r - mid) * R.pitch;
      if (mirror) x = -x;
      for (let t = 0; t < rot; t++) [x, y] = [-y, x];
      return { x: r3(x * scale), y: r3(y * scale) };
    };
    const world = (n: Cell): Point => toWorld(n);

    const junctionKeys = new Set(idx.map((i) => cellKey(main[i])));
    const mainPts = simplify(main, junctionKeys).map(world);
    const branchPts = branches.map((b) => {
      const cells = simplify(b, new Set());
      const pts = cells.map(world);
      // 막다른 길 끝 구간을 조금 줄여 모양에 변화를 준다
      const n = pts.length;
      const ratio = between(rng, ...R.tipRatio);
      const a = pts[n - 2];
      const z = pts[n - 1];
      pts[n - 1] = {
        x: r3(a.x + (z.x - a.x) * ratio),
        y: r3(a.y + (z.y - a.y) * ratio),
      };
      return pts;
    });
    return { mainPoints: mainPts, branches: branchPts };
  }
  throw new Error("[randomVariants] 연속 갈림길 미로를 만들지 못했습니다");
}

// ── 레벨 유형 → 생성기 ────────────────────────────────────────

/** 랜덤 생성을 지원하는 레벨 유형. 여기에 추가하면 Level 9+ 도 같은 방식으로 확장할 수 있다. */
export const RANDOM_VARIANT_GENERATORS = {
  [LevelType.SPIRAL]: generateSpiralVariant,
  [LevelType.SQUARE_SPIRAL]: generateSquareSpiralVariant,
  [LevelType.BRANCHED]: generateBranchedVariant,
  [LevelType.MULTI_BRANCHED]: generateMultiBranchedVariant,
} as const;
