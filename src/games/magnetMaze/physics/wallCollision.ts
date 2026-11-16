/**
 * 쇠구슬 ↔ 벽 충돌.
 *
 * 통로 = 중심선에서 reach 이내.
 * 핵심: 보정은 "현재/직전 위치 근처" 선분만 허용한다.
 * 전역 최근접만 쓰면 코너·평행 통로에서 다른 통로로 순간이동한다.
 */

export interface WallHit {
  x: number;
  y: number;
  hit: boolean;
  /** 벽 바깥쪽 방향 법선 (hit 일 때만 의미 있음) */
  nx: number;
  ny: number;
  segIndex: number;
}

function projectOnSeg(
  segs: number[],
  i: number,
  x: number,
  y: number,
): { px: number; py: number; d2: number } {
  "worklet";
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
  return { px, py, d2: dx * dx + dy * dy };
}

/** 전역 최근접 (초기 배치·검증용) */
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
    const p = projectOnSeg(segs, i, x, y);
    if (p.d2 < best) {
      best = p.d2;
      bx = p.px;
      by = p.py;
      bestI = i;
    }
  }
  return { px: bx, py: by, d: Math.sqrt(best), segIndex: bestI };
}

/**
 * 앵커(직전 구슬 위치) 근처 선분만 후보로 최근접.
 * 물리 스텝에서는 반드시 이 경로를 쓴다.
 */
export function nearestOnCenterlineAnchored(
  segs: number[],
  count: number,
  x: number,
  y: number,
  anchorX: number,
  anchorY: number,
  maxFromAnchor: number,
) {
  "worklet";
  const maxA2 = maxFromAnchor * maxFromAnchor;
  let best = Infinity;
  let bx = x;
  let by = y;
  let bestI = -1;
  let found = false;

  for (let i = 0; i < count; i++) {
    const p = projectOnSeg(segs, i, x, y);
    // 투영점이 앵커에서 너무 멀면 다른 통로로 간주 → 제외
    const adx = p.px - anchorX;
    const ady = p.py - anchorY;
    if (adx * adx + ady * ady > maxA2) continue;
    if (p.d2 < best) {
      best = p.d2;
      bx = p.px;
      by = p.py;
      bestI = i;
      found = true;
    }
  }

  if (found) {
    return { px: bx, py: by, d: Math.sqrt(best), segIndex: bestI };
  }

  // 후보 없음: 앵커 기준으로 최근접 투영을 찾고, 보정은 앵커 쪽으로만 제한
  let gBest = Infinity;
  let gpx = anchorX;
  let gpy = anchorY;
  let gi = -1;
  for (let i = 0; i < count; i++) {
    const p = projectOnSeg(segs, i, anchorX, anchorY);
    if (p.d2 < gBest) {
      gBest = p.d2;
      gpx = p.px;
      gpy = p.py;
      gi = i;
    }
  }
  // (x,y) → 그 투영 방향으로 maxFromAnchor 이내만 이동
  const dx = gpx - x;
  const dy = gpy - y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d > 1e-6) {
    const allow = Math.min(d, maxFromAnchor * 0.5);
    return {
      px: x + (dx / d) * allow,
      py: y + (dy / d) * allow,
      d: allow,
      segIndex: gi,
    };
  }
  return { px: x, py: y, d: 0, segIndex: gi };
}

/**
 * 구슬이 통로 밖이면 벽면으로 되돌림.
 * anchorX/Y = 직전 위치 (한 스텝에서 다른 통로로 점프 방지).
 */
export function resolveWalls(
  segs: number[],
  count: number,
  reach: number,
  x: number,
  y: number,
  anchorX?: number,
  anchorY?: number,
): WallHit {
  "worklet";
  if (count <= 0) return { x, y, hit: false, nx: 0, ny: 0, segIndex: -1 };

  const ax = anchorX === undefined ? x : anchorX;
  const ay = anchorY === undefined ? y : anchorY;
  // 한 보정에서 허용하는 최대 통로 전환 거리
  const maxFromAnchor = Math.max(reach * 2.25, 28);

  const near = nearestOnCenterlineAnchored(
    segs,
    count,
    x,
    y,
    ax,
    ay,
    maxFromAnchor,
  );

  if (near.d <= reach) {
    return { x, y, hit: false, nx: 0, ny: 0, segIndex: near.segIndex };
  }

  const inv = 1 / (near.d + 1e-9);
  const nx = (x - near.px) * inv;
  const ny = (y - near.py) * inv;
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
 * 목표 방향으로 작은 걸음 이동 + 앵커 기반 벽 보정.
 * (레거시/보조. ATTACHED 주 제어에서는 쓰지 않는 것을 권장)
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
  const maxStepJump = step * 1.75;

  for (let k = 0; k < maxSteps; k++) {
    const dx = tx - cx;
    const dy = ty - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 0.01) break;

    const m = d < step ? d : step;
    const nx = cx + (dx / d) * m;
    const ny = cy + (dy / d) * m;

    // 직전 위치를 앵커로 넘겨 다른 통로 점프 차단
    const res = resolveWalls(segs, count, reach, nx, ny, cx, cy);

    const jdx = res.x - cx;
    const jdy = res.y - cy;
    const jump = Math.sqrt(jdx * jdx + jdy * jdy);
    if (jump > maxStepJump) {
      const s = maxStepJump / (jump + 1e-9);
      const lx = cx + jdx * s;
      const ly = cy + jdy * s;
      const res2 = resolveWalls(segs, count, reach, lx, ly, cx, cy);
      cx = res2.x;
      cy = res2.y;
    } else {
      cx = res.x;
      cy = res.y;
    }

    const nd = Math.sqrt((tx - cx) * (tx - cx) + (ty - cy) * (ty - cy));
    if (d - nd < 0.05) break;
  }
  return { x: cx, y: cy };
}
