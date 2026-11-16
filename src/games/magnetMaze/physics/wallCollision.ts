// /**
//  * 쇠구슬 ↔ 벽 충돌.
//  *
//  * 통로는 "중심선에서 reach 이내"인 영역이다 (reach = 통로 반폭 - 구슬 반지름 → 구슬 반지름 반영).
//  * 구슬 중심이 이 영역 밖으로 나가면 영역 경계로 되돌린다. 되돌려진 위치는 항상 벽면 위이므로
//  * 벽에 닿은 채로 계속 이동하면 자연스럽게 벽을 따라 미끄러진다.
//  *
//  * 연속 충돌(Swept): 한 번에 COLLISION_STEP(px) 이상 움직이지 않고, 매 걸음마다 보정한다.
//  * 걸음이 벽 틈(구슬 지름 이상)보다 훨씬 작아서 벽을 뛰어넘을 수 없다.
//  */

// export interface WallHit {
//   x: number;
//   y: number;
//   hit: boolean;
//   /** 벽 바깥쪽 방향 법선 (hit 일 때만 의미 있음) */
//   nx: number;
//   ny: number;
// }

// /** 점 (x, y) 에서 중심선까지의 가장 가까운 점 */
// export function nearestOnCenterline(
//   segs: number[],
//   count: number,
//   x: number,
//   y: number,
// ) {
//   "worklet";
//   let best = Infinity;
//   let bx = 0;
//   let by = 0;
//   for (let i = 0; i < count; i++) {
//     const k = i * 4;
//     const ax = segs[k];
//     const ay = segs[k + 1];
//     const ex = segs[k + 2] - ax;
//     const ey = segs[k + 3] - ay;
//     const len2 = ex * ex + ey * ey;
//     let t = len2 > 0 ? ((x - ax) * ex + (y - ay) * ey) / len2 : 0;
//     t = t < 0 ? 0 : t > 1 ? 1 : t;
//     const px = ax + ex * t;
//     const py = ay + ey * t;
//     const dx = x - px;
//     const dy = y - py;
//     const d2 = dx * dx + dy * dy;
//     if (d2 < best) {
//       best = d2;
//       bx = px;
//       by = py;
//     }
//   }
//   return { px: bx, py: by, d: Math.sqrt(best) };
// }

// /** 구슬 중심이 통로 밖이면 가장 가까운 벽면 위로 되돌린다 */
// export function resolveWalls(
//   segs: number[],
//   count: number,
//   reach: number,
//   x: number,
//   y: number,
// ): WallHit {
//   "worklet";
//   if (count <= 0) return { x, y, hit: false, nx: 0, ny: 0 };
//   const near = nearestOnCenterline(segs, count, x, y);
//   if (near.d <= reach) return { x, y, hit: false, nx: 0, ny: 0 };
//   const nx = (x - near.px) / near.d;
//   const ny = (y - near.py) / near.d;
//   return {
//     x: near.px + nx * reach,
//     y: near.py + ny * reach,
//     hit: true,
//     nx,
//     ny,
//   };
// }

// /**
//  * (x, y) → 목표(tx, ty) 방향으로 작은 걸음씩 이동하며 매번 벽 보정.
//  * 벽에 막히면 벽면을 따라 미끄러지고, 더 못 나아가면 멈춘다. (부착 상태에서 자석 끝을 따라갈 때 사용)
//  */
// export function moveWithWalls(
//   segs: number[],
//   count: number,
//   reach: number,
//   x: number,
//   y: number,
//   tx: number,
//   ty: number,
//   step: number,
//   maxSteps: number,
// ) {
//   "worklet";
//   let cx = x;
//   let cy = y;
//   for (let k = 0; k < maxSteps; k++) {
//     const dx = tx - cx;
//     const dy = ty - cy;
//     const d = Math.sqrt(dx * dx + dy * dy);
//     if (d < 0.01) break;
//     const m = d < step ? d : step;
//     const res = resolveWalls(
//       segs,
//       count,
//       reach,
//       cx + (dx / d) * m,
//       cy + (dy / d) * m,
//     );
//     const nd = Math.sqrt(
//       (tx - res.x) * (tx - res.x) + (ty - res.y) * (ty - res.y),
//     );
//     cx = res.x;
//     cy = res.y;
//     if (d - nd < 0.05) break; // 더 가까워지지 않음 = 막힘
//   }
//   return { x: cx, y: cy };
// }

/**
 * 쇠구슬 ↔ 벽 충돌.
 *
 * 통로는 "중심선에서 reach 이내"인 영역이다 (reach = 통로 반폭 - 구슬 반지름 → 구슬 반지름 반영).
 * 구슬 중심이 이 영역 밖으로 나가면 영역 경계로 되돌린다. 되돌려진 위치는 항상 벽면 위이므로
 * 벽에 닿은 채로 계속 이동하면 자연스럽게 벽을 따라 미끄러진다.
 *
 * 연속 충돌(Swept): 한 번에 COLLISION_STEP(px) 이상 움직이지 않고, 매 걸음마다 보정한다.
 * 걸음이 벽 틈(구슬 지름 이상)보다 훨씬 작아서 벽을 뛰어넘을 수 없다.
 *
 * 개선: 전역 최근접 중심선만 쓰지 않고, 현재 위치에서 "너무 멀리" 떨어진 선분으로의
 * 순간이동을 막는다. 코너/평행 통로에서 다른 통로로 튀는 현상을 줄인다.
 */

export interface WallHit {
  x: number;
  y: number;
  hit: boolean;
  /** 벽 바깥쪽 방향 법선 (hit 일 때만 의미 있음) */
  nx: number;
  ny: number;
  /** 선택된 선분 인덱스 (-1 = 없음) */
  segIndex: number;
}

/** 점 (x, y) 에서 중심선까지의 가장 가까운 점 (전역 검색) */
export function nearestOnCenterline(
  segs: number[],
  count: number,
  x: number,
  y: number,
) {
  "worklet";
  let best = Infinity;
  let bx = 0;
  let by = 0;
  let bestI = -1;
  for (let i = 0; i < count; i++) {
    const k = i * 4;
    const ax = segs[k];
    const ay = segs[k + 1];
    const ex = segs[k + 2] - ax;
    const ey = segs[k + 3] - ay;
    const len2 = ex * ex + ey * ey;
    let t = len2 > 0 ? ((x - ax) * ex + (y - ay) * ey) / len2 : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = ax + ex * t;
    const py = ay + ey * t;
    const dx = x - px;
    const dy = y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 < best) {
      best = d2;
      bx = px;
      by = py;
      bestI = i;
    }
  }
  return { px: bx, py: by, d: Math.sqrt(best), segIndex: bestI };
}

/**
 * 현재 위치 기준으로 "가까운" 선분만 우선 검색하는 최근접.
 * maxJump 보다 멀리 있는 보정점은 무시하고, 그 안에서는 가장 가까운 것을 고른다.
 * 후보가 없으면 전역 최근접으로 폴백하되, 보정 거리를 제한한다.
 */
export function nearestOnCenterlineLocal(
  segs: number[],
  count: number,
  x: number,
  y: number,
  maxJump: number,
) {
  "worklet";
  let best = Infinity;
  let bx = 0;
  let by = 0;
  let bestI = -1;
  const maxJump2 = maxJump * maxJump;

  for (let i = 0; i < count; i++) {
    const k = i * 4;
    const ax = segs[k];
    const ay = segs[k + 1];
    const ex = segs[k + 2] - ax;
    const ey = segs[k + 3] - ay;
    const len2 = ex * ex + ey * ey;
    let t = len2 > 0 ? ((x - ax) * ex + (y - ay) * ey) / len2 : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = ax + ex * t;
    const py = ay + ey * t;
    const dx = x - px;
    const dy = y - py;
    const d2 = dx * dx + dy * dy;
    // 현재 위치에서 보정점까지 거리가 maxJump 이내인 후보만
    if (d2 < best && d2 <= maxJump2) {
      best = d2;
      bx = px;
      by = py;
      bestI = i;
    }
  }

  if (bestI >= 0) {
    return { px: bx, py: by, d: Math.sqrt(best), segIndex: bestI };
  }

  // 후보 없음 → 전역 최근접, 단 보정 거리는 제한
  const global = nearestOnCenterline(segs, count, x, y);
  if (global.d > maxJump) {
    // 너무 멀면 "현재 위치 쪽"으로만 살짝 당긴다 (순간이동 방지)
    const scale = maxJump / (global.d + 1e-6);
    return {
      px: x + (global.px - x) * scale,
      py: y + (global.py - y) * scale,
      d: maxJump,
      segIndex: global.segIndex,
    };
  }
  return global;
}

/** 구슬 중심이 통로 밖이면 가장 가까운 벽면 위로 되돌린다 (로컬 우선) */
export function resolveWalls(
  segs: number[],
  count: number,
  reach: number,
  x: number,
  y: number,
): WallHit {
  "worklet";
  if (count <= 0) return { x, y, hit: false, nx: 0, ny: 0, segIndex: -1 };

  // 한 프레임/한 걸음에서 허용하는 최대 보정 거리.
  // reach * 3 ~ 4 정도면 코너에서도 미끄러지면서, 평행 통로로 튀지는 않음.
  const maxJump = Math.max(reach * 3.5, 40);
  const near = nearestOnCenterlineLocal(segs, count, x, y, maxJump);

  if (near.d <= reach) {
    return { x, y, hit: false, nx: 0, ny: 0, segIndex: near.segIndex };
  }

  const nx = (x - near.px) / (near.d + 1e-9);
  const ny = (y - near.py) / (near.d + 1e-9);
  return {
    x: near.px + nx * reach,
    y: near.py + ny * reach,
    hit: true,
    nx,
    ny,
    segIndex: near.segIndex,
  };
}

/**
 * (x, y) → 목표(tx, ty) 방향으로 작은 걸음씩 이동하며 매번 벽 보정.
 * 벽에 막히면 벽면을 따라 미끄러지고, 더 못 나아가면 멈춘다.
 * 개선: 한 걸음으로 위치가 급격히 점프하지 않도록 보정 후 이동량을 제한.
 */
export function moveWithWalls(
  segs: number[],
  count: number,
  reach: number,
  x: number,
  y: number,
  tx: number,
  ty: number,
  step: number,
  maxSteps: number,
) {
  "worklet";
  let cx = x;
  let cy = y;
  const maxStepJump = step * 2.5; // 한 스텝에서 허용하는 최대 위치 변화

  for (let k = 0; k < maxSteps; k++) {
    const dx = tx - cx;
    const dy = ty - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 0.01) break;

    const m = d < step ? d : step;
    const nx = cx + (dx / d) * m;
    const ny = cy + (dy / d) * m;

    const res = resolveWalls(segs, count, reach, nx, ny);

    // 보정 결과가 이전 위치에서 너무 멀면 (순간이동 방지) 방향을 유지한 채 짧게만 이동
    const jdx = res.x - cx;
    const jdy = res.y - cy;
    const jump = Math.sqrt(jdx * jdx + jdy * jdy);
    if (jump > maxStepJump) {
      const s = maxStepJump / (jump + 1e-9);
      cx = cx + jdx * s;
      cy = cy + jdy * s;
      // 제한된 위치도 한 번 더 보정
      const res2 = resolveWalls(segs, count, reach, cx, cy);
      cx = res2.x;
      cy = res2.y;
    } else {
      cx = res.x;
      cy = res.y;
    }

    const nd = Math.sqrt((tx - cx) * (tx - cx) + (ty - cy) * (ty - cy));
    if (d - nd < 0.05) break; // 더 가까워지지 않음 = 막힘
  }
  return { x: cx, y: cy };
}
