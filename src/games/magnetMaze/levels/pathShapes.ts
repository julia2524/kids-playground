// import type {
//   BranchedVariant,
//   CircleVariant,
//   CompassDirection,
//   SquareSpiralVariant,
//   StraightDirection,
//   FreeVariant,
//   LShapeVariant,
//   Point,
//   SpiralVariant,
//   StraightVariant,
//   WaveVariant,
//   ZigzagVariant,
// } from "./levelTypes";

// /**
//  * 경로 형태 빌더.
//  * 보드와 무관한 "월드 좌표"(보드 너비 = 1, y 아래쪽이 +)에서 원점 근처에 모양만 만든다.
//  * 보드 중앙 배치 · 크기 맞춤 · 정규화는 levelGenerator 가 담당한다.
//  */
// export interface WorldPath {
//   /** 가이드 경로(정답 메인). FREE 는 빈 배열 */
//   points: Point[];
//   start: Point;
//   goal: Point;
//   /** 나선의 고리 사이 간격(검증용) */
//   ringSpacing?: number;
//   /** BRANCHED: 갈림길에서 뻗어 나가는 추가 통로들 (각 폴리라인의 첫 점이 갈림길) */
//   branches?: Point[][];
// }

// const DEG = Math.PI / 180;

// function fromPoints(points: Point[]): WorldPath {
//   return { points, start: points[0], goal: points[points.length - 1] };
// }

// export function buildFree(v: FreeVariant): WorldPath {
//   const dx = Math.cos(v.angleDeg * DEG) * v.distance;
//   const dy = Math.sin(v.angleDeg * DEG) * v.distance;
//   return {
//     points: [],
//     start: { x: -dx / 2, y: -dy / 2 },
//     goal: { x: dx / 2, y: dy / 2 },
//   };
// }

// const SQ = Math.SQRT1_2;

// /** 직선 방향 → 단위 벡터 (화면 좌표: x 오른쪽 +, y 아래 +) */
// const STRAIGHT_VECTORS: Record<StraightDirection, Point> = {
//   LEFT_TO_RIGHT: { x: 1, y: 0 },
//   RIGHT_TO_LEFT: { x: -1, y: 0 },
//   TOP_TO_BOTTOM: { x: 0, y: 1 },
//   BOTTOM_TO_TOP: { x: 0, y: -1 },
//   TOP_LEFT_TO_BOTTOM_RIGHT: { x: SQ, y: SQ },
//   BOTTOM_RIGHT_TO_TOP_LEFT: { x: -SQ, y: -SQ },
//   TOP_RIGHT_TO_BOTTOM_LEFT: { x: -SQ, y: SQ },
//   BOTTOM_LEFT_TO_TOP_RIGHT: { x: SQ, y: -SQ },
// };

// export function buildStraight(v: StraightVariant): WorldPath {
//   const h = v.length / 2;
//   if (v.direction) {
//     // 새 방식: 8방향 명시. 시작 = 중심 - 방향 * h, 목적지 = 중심 + 방향 * h
//     const u = STRAIGHT_VECTORS[v.direction];
//     return fromPoints([
//       { x: -u.x * h, y: -u.y * h },
//       { x: u.x * h, y: u.y * h },
//     ]);
//   }
//   // 기존 방식(orientation + reversed) — 하위 호환
//   const pts =
//     v.orientation === "VERTICAL"
//       ? [
//           { x: 0, y: -h },
//           { x: 0, y: h },
//         ]
//       : [
//           { x: -h, y: 0 },
//           { x: h, y: 0 },
//         ];
//   return fromPoints(v.reversed ? pts.reverse() : pts);
// }

// /**
//  * ㄱ / ㄴ 기본 모양을 만든 뒤 반전 → 회전 → 진행 방향 반전을 적용한다.
//  * points 를 한 번에 변환하고 start / goal 은 변환된 점 배열의 양 끝에서 다시 뽑으므로
//  * 시작점·목적지가 항상 경로의 양 끝과 일치한다.
//  */
// export function buildLShape(v: LShapeVariant): WorldPath {
//   const a = v.horizontalLength;
//   const b = v.verticalLength;
//   let pts: Point[] =
//     v.shape === "GIYEOK"
//       ? [
//           { x: 0, y: 0 },
//           { x: a, y: 0 },
//           { x: a, y: b },
//         ] // ㄱ: 오른쪽으로 갔다가 아래로
//       : [
//           { x: 0, y: 0 },
//           { x: 0, y: b },
//           { x: a, y: b },
//         ]; // ㄴ: 아래로 갔다가 오른쪽으로

//   if (v.mirrorX) pts = pts.map((q) => ({ x: -q.x, y: q.y }));
//   if (v.mirrorY) pts = pts.map((q) => ({ x: q.x, y: -q.y }));

//   const rot = (((v.rotationDeg ?? 0) % 360) + 360) % 360;
//   if (rot !== 0) {
//     const c = Math.round(Math.cos(rot * DEG)); // 90 단위라 정수로 딱 떨어진다
//     const sn = Math.round(Math.sin(rot * DEG));
//     // y 가 아래쪽 + 이므로 양의 각도 = 시계 방향
//     pts = pts.map((q) => ({ x: q.x * c - q.y * sn, y: q.x * sn + q.y * c }));
//   }

//   return fromPoints(v.reversed ? pts.reverse() : pts);
// }

// export function buildCircle(v: CircleVariant): WorldPath {
//   const dir = v.clockwise ? 1 : -1; // 화면은 y가 아래 → 각도가 늘어나는 쪽이 시계 방향
//   const n = Math.max(2, Math.ceil(v.sweepDeg / 6));
//   const pts: Point[] = [];
//   for (let i = 0; i <= n; i++) {
//     const ang = (v.startAngleDeg + (dir * v.sweepDeg * i) / n) * DEG;
//     pts.push({ x: Math.cos(ang) * v.radius, y: Math.sin(ang) * v.radius });
//   }
//   return fromPoints(pts);
// }

// export function buildSpiral(v: SpiralVariant): WorldPath {
//   const dir = v.clockwise ? 1 : -1;
//   const n = Math.max(8, Math.ceil(v.turns * 40));
//   const total = v.turns * 2 * Math.PI;
//   const pts: Point[] = [];
//   let path: WorldPath;

//   if (v.startAngleDeg === undefined) {
//     // 기존 동작: 항상 왼쪽(180도)에서 바깥 → 안 모양을 만들고, 안 → 바깥은 그 경로를 뒤집는다
//     for (let i = 0; i <= n; i++) {
//       const u = i / n;
//       const r = v.outerRadius + (v.innerRadius - v.outerRadius) * u;
//       const ang = Math.PI + dir * total * u;
//       pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
//     }
//     path = fromPoints(v.startOutside ? pts : pts.reverse());
//   } else {
//     // startAngleDeg 가 있으면 "경로의 출발점"이 그 각도에 놓이도록 출발점부터 순서대로 만든다.
//     // (안 → 바깥도 같은 방식이라 진행 방향 clockwise 가 그대로 시계 방향이다)
//     const r0 = v.startOutside ? v.outerRadius : v.innerRadius;
//     const r1 = v.startOutside ? v.innerRadius : v.outerRadius;
//     for (let i = 0; i <= n; i++) {
//       const u = i / n;
//       const r = r0 + (r1 - r0) * u;
//       const ang = v.startAngleDeg * DEG + dir * total * u;
//       pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
//     }
//     path = fromPoints(pts);
//   }
//   path.ringSpacing = (v.outerRadius - v.innerRadius) / v.turns;
//   return path;
// }

// const CLOCKWISE_DIRS: CompassDirection[] = ["RIGHT", "DOWN", "LEFT", "UP"];
// const COMPASS_VECTORS: Record<CompassDirection, Point> = {
//   RIGHT: { x: 1, y: 0 },
//   DOWN: { x: 0, y: 1 },
//   LEFT: { x: -1, y: 0 },
//   UP: { x: 0, y: -1 },
// };

// /**
//  * 네모난 달팽이 (직선 + 90도 회전).
//  * 구간 길이:  S, S, S-d, S-d, S-2d, S-2d, …  (구간 수 N = turns * 4, 마지막 구간 = innerSize)
//  * 이웃한 바퀴 사이 간격이 항상 d 로 일정하다 → 통로 폭이 일정하고 벽이 겹치지 않는다.
//  * 안 → 바깥은 반대로 감기는 바깥 → 안 모양을 만들어 뒤집어서, 달리는 방향(시계/반시계)이 clockwise 와 같다.
//  */
// export function buildSquareSpiral(v: SquareSpiralVariant): WorldPath {
//   const n = Math.max(2, Math.round(v.turns * 4));
//   const half = n / 2;
//   const d = half > 1 ? (v.outerSize - v.innerSize) / (half - 1) : 0;

//   const inwardCW = v.startOutside ? v.clockwise : !v.clockwise;
//   const order = inwardCW ? CLOCKWISE_DIRS : [...CLOCKWISE_DIRS].reverse();
//   let di = Math.max(0, order.indexOf(v.startDirection));

//   const pts: Point[] = [{ x: 0, y: 0 }];
//   let cx = 0;
//   let cy = 0;
//   for (let i = 0; i < n; i++) {
//     const len = v.outerSize - d * Math.floor(i / 2);
//     const u = COMPASS_VECTORS[order[di % 4]];
//     cx += u.x * len;
//     cy += u.y * len;
//     pts.push({ x: cx, y: cy });
//     di++;
//   }

//   const path = fromPoints(v.startOutside ? pts : pts.reverse());
//   path.ringSpacing = d;
//   return path;
// }

// export function buildWave(v: WaveVariant): WorldPath {
//   const n = Math.max(8, Math.ceil(v.waveCount * 24));
//   const pts: Point[] = [];
//   for (let i = 0; i <= n; i++) {
//     const s = i / n;
//     const along = (s - 0.5) * v.length;
//     const across = v.amplitude * Math.sin(2 * Math.PI * v.waveCount * s);
//     pts.push(
//       v.orientation === "HORIZONTAL"
//         ? { x: along, y: across }
//         : { x: across, y: along },
//     );
//   }
//   return fromPoints(v.reversed ? pts.reverse() : pts);
// }

// export function buildZigzag(v: ZigzagVariant): WorldPath {
//   const total = v.segmentWeights.reduce((a, b) => a + b, 0);
//   const pts: Point[] = [];
//   let acc = 0;
//   for (let i = 0; i <= v.segmentWeights.length; i++) {
//     const along = (acc / total - 0.5) * v.span;
//     const across = (i % 2 === 0 ? -1 : 1) * (v.amplitude / 2);
//     pts.push(
//       v.orientation === "HORIZONTAL"
//         ? { x: along, y: across }
//         : { x: across, y: along },
//     );
//     if (i < v.segmentWeights.length) acc += v.segmentWeights[i];
//   }
//   return fromPoints(v.reversed ? pts.reverse() : pts);
// }

// /**
//  * Level 8 갈림길 미로.
//  * mainPoints 를 정답 경로로, branchPoints 를 막다른 길로 사용한다.
//  * 좌표는 월드(보드 너비=1) 기준이며, generator 가 중앙 배치·스케일한다.
//  */
// export function buildBranched(v: BranchedVariant): WorldPath {
//   const main = v.mainPoints.slice();
//   if (main.length < 2) {
//     throw new Error(
//       "[pathShapes] BranchedVariant.mainPoints 는 2점 이상이어야 합니다",
//     );
//   }
//   const branch = v.branchPoints.slice();
//   if (branch.length < 2) {
//     throw new Error(
//       "[pathShapes] BranchedVariant.branchPoints 는 2점 이상이어야 합니다",
//     );
//   }
//   return {
//     points: main,
//     start: main[0],
//     goal: main[main.length - 1],
//     branches: [branch],
//   };
// }

import type {
  BranchedVariant,
  MultiBranchedVariant,
  CircleVariant,
  CompassDirection,
  SquareSpiralVariant,
  StraightDirection,
  FreeVariant,
  LShapeVariant,
  Point,
  SpiralVariant,
  StraightVariant,
  WaveVariant,
  ZigzagVariant,
} from "./levelTypes";

/**
 * 경로 형태 빌더.
 * 보드와 무관한 "월드 좌표"(보드 너비 = 1, y 아래쪽이 +)에서 원점 근처에 모양만 만든다.
 * 보드 중앙 배치 · 크기 맞춤 · 정규화는 levelGenerator 가 담당한다.
 */
export interface WorldPath {
  /** 가이드 경로(정답 메인). FREE 는 빈 배열 */
  points: Point[];
  start: Point;
  goal: Point;
  /** 나선의 고리 사이 간격(검증용) */
  ringSpacing?: number;
  /** BRANCHED: 갈림길에서 뻗어 나가는 추가 통로들 (각 폴리라인의 첫 점이 갈림길) */
  branches?: Point[][];
}

const DEG = Math.PI / 180;

function fromPoints(points: Point[]): WorldPath {
  return { points, start: points[0], goal: points[points.length - 1] };
}

export function buildFree(v: FreeVariant): WorldPath {
  const dx = Math.cos(v.angleDeg * DEG) * v.distance;
  const dy = Math.sin(v.angleDeg * DEG) * v.distance;
  return {
    points: [],
    start: { x: -dx / 2, y: -dy / 2 },
    goal: { x: dx / 2, y: dy / 2 },
  };
}

const SQ = Math.SQRT1_2;

/** 직선 방향 → 단위 벡터 (화면 좌표: x 오른쪽 +, y 아래 +) */
const STRAIGHT_VECTORS: Record<StraightDirection, Point> = {
  LEFT_TO_RIGHT: { x: 1, y: 0 },
  RIGHT_TO_LEFT: { x: -1, y: 0 },
  TOP_TO_BOTTOM: { x: 0, y: 1 },
  BOTTOM_TO_TOP: { x: 0, y: -1 },
  TOP_LEFT_TO_BOTTOM_RIGHT: { x: SQ, y: SQ },
  BOTTOM_RIGHT_TO_TOP_LEFT: { x: -SQ, y: -SQ },
  TOP_RIGHT_TO_BOTTOM_LEFT: { x: -SQ, y: SQ },
  BOTTOM_LEFT_TO_TOP_RIGHT: { x: SQ, y: -SQ },
};

export function buildStraight(v: StraightVariant): WorldPath {
  const h = v.length / 2;
  if (v.direction) {
    // 새 방식: 8방향 명시. 시작 = 중심 - 방향 * h, 목적지 = 중심 + 방향 * h
    const u = STRAIGHT_VECTORS[v.direction];
    return fromPoints([
      { x: -u.x * h, y: -u.y * h },
      { x: u.x * h, y: u.y * h },
    ]);
  }
  // 기존 방식(orientation + reversed) — 하위 호환
  const pts =
    v.orientation === "VERTICAL"
      ? [
          { x: 0, y: -h },
          { x: 0, y: h },
        ]
      : [
          { x: -h, y: 0 },
          { x: h, y: 0 },
        ];
  return fromPoints(v.reversed ? pts.reverse() : pts);
}

/**
 * ㄱ / ㄴ 기본 모양을 만든 뒤 반전 → 회전 → 진행 방향 반전을 적용한다.
 * points 를 한 번에 변환하고 start / goal 은 변환된 점 배열의 양 끝에서 다시 뽑으므로
 * 시작점·목적지가 항상 경로의 양 끝과 일치한다.
 */
export function buildLShape(v: LShapeVariant): WorldPath {
  const a = v.horizontalLength;
  const b = v.verticalLength;
  let pts: Point[] =
    v.shape === "GIYEOK"
      ? [
          { x: 0, y: 0 },
          { x: a, y: 0 },
          { x: a, y: b },
        ] // ㄱ: 오른쪽으로 갔다가 아래로
      : [
          { x: 0, y: 0 },
          { x: 0, y: b },
          { x: a, y: b },
        ]; // ㄴ: 아래로 갔다가 오른쪽으로

  if (v.mirrorX) pts = pts.map((q) => ({ x: -q.x, y: q.y }));
  if (v.mirrorY) pts = pts.map((q) => ({ x: q.x, y: -q.y }));

  const rot = (((v.rotationDeg ?? 0) % 360) + 360) % 360;
  if (rot !== 0) {
    const c = Math.round(Math.cos(rot * DEG)); // 90 단위라 정수로 딱 떨어진다
    const sn = Math.round(Math.sin(rot * DEG));
    // y 가 아래쪽 + 이므로 양의 각도 = 시계 방향
    pts = pts.map((q) => ({ x: q.x * c - q.y * sn, y: q.x * sn + q.y * c }));
  }

  return fromPoints(v.reversed ? pts.reverse() : pts);
}

export function buildCircle(v: CircleVariant): WorldPath {
  const dir = v.clockwise ? 1 : -1; // 화면은 y가 아래 → 각도가 늘어나는 쪽이 시계 방향
  const n = Math.max(2, Math.ceil(v.sweepDeg / 6));
  const pts: Point[] = [];
  for (let i = 0; i <= n; i++) {
    const ang = (v.startAngleDeg + (dir * v.sweepDeg * i) / n) * DEG;
    pts.push({ x: Math.cos(ang) * v.radius, y: Math.sin(ang) * v.radius });
  }
  return fromPoints(pts);
}

export function buildSpiral(v: SpiralVariant): WorldPath {
  const dir = v.clockwise ? 1 : -1;
  const n = Math.max(8, Math.ceil(v.turns * 40));
  const total = v.turns * 2 * Math.PI;
  const pts: Point[] = [];
  let path: WorldPath;

  if (v.startAngleDeg === undefined) {
    // 기존 동작: 항상 왼쪽(180도)에서 바깥 → 안 모양을 만들고, 안 → 바깥은 그 경로를 뒤집는다
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const r = v.outerRadius + (v.innerRadius - v.outerRadius) * u;
      const ang = Math.PI + dir * total * u;
      pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
    }
    path = fromPoints(v.startOutside ? pts : pts.reverse());
  } else {
    // startAngleDeg 가 있으면 "경로의 출발점"이 그 각도에 놓이도록 출발점부터 순서대로 만든다.
    // (안 → 바깥도 같은 방식이라 진행 방향 clockwise 가 그대로 시계 방향이다)
    const r0 = v.startOutside ? v.outerRadius : v.innerRadius;
    const r1 = v.startOutside ? v.innerRadius : v.outerRadius;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const r = r0 + (r1 - r0) * u;
      const ang = v.startAngleDeg * DEG + dir * total * u;
      pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
    }
    path = fromPoints(pts);
  }
  path.ringSpacing = (v.outerRadius - v.innerRadius) / v.turns;
  return path;
}

const CLOCKWISE_DIRS: CompassDirection[] = ["RIGHT", "DOWN", "LEFT", "UP"];
const COMPASS_VECTORS: Record<CompassDirection, Point> = {
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
};

/**
 * 네모난 달팽이 (직선 + 90도 회전).
 * 구간 길이:  S, S, S-d, S-d, S-2d, S-2d, …  (구간 수 N = turns * 4, 마지막 구간 = innerSize)
 * 이웃한 바퀴 사이 간격이 항상 d 로 일정하다 → 통로 폭이 일정하고 벽이 겹치지 않는다.
 * 안 → 바깥은 반대로 감기는 바깥 → 안 모양을 만들어 뒤집어서, 달리는 방향(시계/반시계)이 clockwise 와 같다.
 */
export function buildSquareSpiral(v: SquareSpiralVariant): WorldPath {
  const n = Math.max(2, Math.round(v.turns * 4));
  const half = n / 2;
  const d = half > 1 ? (v.outerSize - v.innerSize) / (half - 1) : 0;

  const inwardCW = v.startOutside ? v.clockwise : !v.clockwise;
  const order = inwardCW ? CLOCKWISE_DIRS : [...CLOCKWISE_DIRS].reverse();
  let di = Math.max(0, order.indexOf(v.startDirection));

  const pts: Point[] = [{ x: 0, y: 0 }];
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    const len = v.outerSize - d * Math.floor(i / 2);
    const u = COMPASS_VECTORS[order[di % 4]];
    cx += u.x * len;
    cy += u.y * len;
    pts.push({ x: cx, y: cy });
    di++;
  }

  const path = fromPoints(v.startOutside ? pts : pts.reverse());
  path.ringSpacing = d;
  return path;
}

export function buildWave(v: WaveVariant): WorldPath {
  const n = Math.max(8, Math.ceil(v.waveCount * 24));
  const pts: Point[] = [];
  for (let i = 0; i <= n; i++) {
    const s = i / n;
    const along = (s - 0.5) * v.length;
    const across = v.amplitude * Math.sin(2 * Math.PI * v.waveCount * s);
    pts.push(
      v.orientation === "HORIZONTAL"
        ? { x: along, y: across }
        : { x: across, y: along },
    );
  }
  return fromPoints(v.reversed ? pts.reverse() : pts);
}

export function buildZigzag(v: ZigzagVariant): WorldPath {
  const total = v.segmentWeights.reduce((a, b) => a + b, 0);
  const pts: Point[] = [];
  let acc = 0;
  for (let i = 0; i <= v.segmentWeights.length; i++) {
    const along = (acc / total - 0.5) * v.span;
    const across = (i % 2 === 0 ? -1 : 1) * (v.amplitude / 2);
    pts.push(
      v.orientation === "HORIZONTAL"
        ? { x: along, y: across }
        : { x: across, y: along },
    );
    if (i < v.segmentWeights.length) acc += v.segmentWeights[i];
  }
  return fromPoints(v.reversed ? pts.reverse() : pts);
}

/**
 * Level 8 갈림길 미로.
 * mainPoints 를 정답 경로로, branchPoints 를 막다른 길로 사용한다.
 * 좌표는 월드(보드 너비=1) 기준이며, generator 가 중앙 배치·스케일한다.
 */
export function buildBranched(v: BranchedVariant): WorldPath {
  const main = v.mainPoints.slice();
  if (main.length < 2) {
    throw new Error(
      "[pathShapes] BranchedVariant.mainPoints 는 2점 이상이어야 합니다",
    );
  }
  const branch = v.branchPoints.slice();
  if (branch.length < 2) {
    throw new Error(
      "[pathShapes] BranchedVariant.branchPoints 는 2점 이상이어야 합니다",
    );
  }
  return {
    points: main,
    start: main[0],
    goal: main[main.length - 1],
    branches: [branch],
  };
}

/**
 * Level 9+ 연속 갈림길 미로.
 * 정답 경로(mainPoints)에 막다른 길(branches)을 여러 개 붙인다. 좌표 규약은 buildBranched 와 같다.
 * 갈림길-통로 연결 검증은 levelGenerator 의 analyzeMaze 가 실제 연결 그래프로 한다.
 */
export function buildMultiBranched(v: MultiBranchedVariant): WorldPath {
  const main = v.mainPoints.slice();
  if (main.length < 2) {
    throw new Error(
      "[pathShapes] MultiBranchedVariant.mainPoints 는 2점 이상이어야 합니다",
    );
  }
  if (v.branches.length < 1 || v.branches.some((b) => b.length < 2)) {
    throw new Error(
      "[pathShapes] MultiBranchedVariant.branches 는 1개 이상이고 각 2점 이상이어야 합니다",
    );
  }
  return {
    points: main,
    start: main[0],
    goal: main[main.length - 1],
    branches: v.branches.map((b) => b.slice()),
  };
}
