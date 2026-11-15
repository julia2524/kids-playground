import type { MultiBranchedVariant, Point } from "./levelTypes";
import type { Rng } from "./randomVariants";

/**
 * Level 11+ 전용: 실제 게임판(직사각형) 비율에 맞춘 연속 갈림길 미로 생성기.
 *
 * Level 9/10 (randomVariants.ts 의 generateMultiBranchedVariant)은 정사각형 격자(4×4, 5×5)를 쓴다.
 * 이 파일은 그것과 완전히 분리되어 있고, Level 1~10 의 생성 결과에 영향을 주지 않는다.
 *
 * 생각의 순서
 *   1) 실제 미로판(가로 1, 세로 H)과 통로 규격(폭+벽)으로 격자의 열/행 수와 칸 간격을 정한다
 *      - 통로 폭과 벽 두께는 그대로, 칸 간격(pitchX / pitchY)만 보드에 맞게 늘어난다
 *      - 가로가 긴 보드면 열이 더 많아지고, 세로가 긴 보드면 행이 더 많아진다 (고정된 N×M 이 아니다)
 *   2) 긴 변 방향의 양 끝에 출발지/목적지를 두고, 그 사이를 꺾이는 정답 경로로 잇는다
 *   3) 정답 경로를 따라 갈림길 K개를 고르게 나누어 배치하고, 갈림길마다 막다른 길 1개를 붙인다
 *   4) 구조 전체가 보드 가로·세로를 고루 쓰는지 확인하고, 아니면 버리고 다시 만든다
 * 서로 연결되지 않은 통로는 항상 한 칸 이상(= 통로+벽 두께보다 넓게) 떨어지므로 통로가 붙거나
 * 새 갈림길이 생기지 않는다. 최종 연결 구조 검증은 levelGenerator 의 analyzeMaze 가 다시 한다.
 */

export const RECT_BRANCHED_RANGE = {
  /** 칸 간격 최소값 = (통로 폭 + 벽 두께) × 이 값. Level 9 ≈ 1.24, Level 10 ≈ 1.02 */
  spacing: 1.2,
  /** 격자가 쓰는 비율 (나머지는 배치 여유) */
  fill: 0.98,
  minCells: 3,
  /** 막다른 길 구간 수 */
  deadEndEdges: [2, 3] as const,
  /** 갈림길 사이(정답 경로상) 최소 구간 수 */
  minEdgesBetweenJunctions: 3,
  /** 정답 경로 길이 = (출발~도착 맨해튼 거리) + extra  (extra 는 짝수) */
  detourExtra: [2, 6] as const,
  /** 정답 경로의 최소 꺾임 수 = 갈림길 수 + 1 */
  extraBends: 1,
  /** 막다른 길 끝 구간 길이 비율 */
  tipRatio: [0.75, 1] as const,
  /** 무게중심이 격자 중심에서 벗어날 수 있는 최대 칸 수 */
  centroidTol: 0.8,
};

export interface RectBoardContext {
  /** 보드 너비를 1로 봤을 때의 높이 (= 1 / aspect) */
  H: number;
  /** 보드 너비(px). 통로 폭/벽 두께(px)를 월드 단위로 바꿀 때 쓴다 */
  W: number;
  /** 보드 가장자리 여유 (너비 = 1 기준, 벽 바깥 면 포함) */
  boardMargin: number;
  corridorWidth: number;
  wallThickness: number;
}

export interface RectGrid {
  cols: number;
  rows: number;
  /** 가로/세로 칸 간격 (너비 = 1 기준) */
  pitchX: number;
  pitchY: number;
}

/** 실제 보드 크기에서 격자를 정한다. 같은 보드면 항상 같은 결과 */
export function computeRectGrid(ctx: RectBoardContext): RectGrid {
  const R = RECT_BRANCHED_RANGE;
  const pitchMin =
    ((ctx.corridorWidth + ctx.wallThickness) * R.spacing) / ctx.W;
  const usableW = (1 - 2 * ctx.boardMargin) * R.fill;
  const usableH = (ctx.H - 2 * ctx.boardMargin) * R.fill;
  const cols = Math.max(R.minCells, Math.floor(usableW / pitchMin) + 1);
  const rows = Math.max(R.minCells, Math.floor(usableH / pitchMin) + 1);
  return {
    cols,
    rows,
    pitchX: usableW / (cols - 1),
    pitchY: usableH / (rows - 1),
  };
}

// ── 격자 유틸 ─────────────────────────────────────────────────

interface Cell {
  c: number;
  r: number;
}
const STEPS: readonly Cell[] = [
  { c: 1, r: 0 },
  { c: -1, r: 0 },
  { c: 0, r: 1 },
  { c: 0, r: -1 },
];

const r3 = (n: number) => Math.round(n * 1000) / 1000;
const between = (rng: Rng, a: number, b: number) => a + (b - a) * rng();
const pickOne = <T>(rng: Rng, list: readonly T[]): T =>
  list[Math.min(list.length - 1, Math.floor(rng() * list.length))];

function shuffled<T>(rng: Rng, list: readonly T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const manhattan = (a: Cell, b: Cell) =>
  Math.abs(a.c - b.c) + Math.abs(a.r - b.r);

function bendCount(path: Cell[]): number {
  let n = 0;
  for (let i = 1; i < path.length - 1; i++) {
    const a = path[i - 1];
    const b = path[i];
    const c = path[i + 1];
    if (b.c - a.c !== c.c - b.c || b.r - a.r !== c.r - b.r) n++;
  }
  return n;
}

/** 일직선 위의 중간 점은 빼고 꺾이는 점·keep·양 끝만 남긴다 */
function simplify(path: Cell[], keep: Set<string>): Cell[] {
  return path.filter((n, i) => {
    if (i === 0 || i === path.length - 1) return true;
    if (keep.has(`${n.c},${n.r}`)) return true;
    const a = path[i - 1];
    const b = path[i + 1];
    return !(n.c - a.c === b.c - n.c && n.r - a.r === b.r - n.r);
  });
}

const key = (n: Cell) => `${n.c},${n.r}`;

/**
 * start → goal 자기 교차 없는 랜덤 경로 (깊이 우선, 길이 [minEdges, maxEdges]).
 * 탐색 횟수에 상한을 두어 오래 걸리면 null.
 */
function randomPath(
  rng: Rng,
  grid: RectGrid,
  start: Cell,
  goal: Cell,
  minEdges: number,
  maxEdges: number,
  budget = 4000,
): Cell[] | null {
  const path: Cell[] = [start];
  const used = new Set<string>([key(start)]);
  let steps = 0;

  const dfs = (): boolean => {
    if (++steps > budget) return false;
    const cur = path[path.length - 1];
    const len = path.length - 1;
    if (cur.c === goal.c && cur.r === goal.r) return len >= minEdges;
    const options: Cell[] = [];
    for (const d of STEPS) {
      const n = { c: cur.c + d.c, r: cur.r + d.r };
      if (n.c < 0 || n.r < 0 || n.c >= grid.cols || n.r >= grid.rows) continue;
      if (used.has(key(n))) continue;
      if (len + 1 + manhattan(n, goal) > maxEdges) continue;
      options.push(n);
    }
    for (const n of shuffled(rng, options)) {
      path.push(n);
      used.add(key(n));
      if (dfs()) return true;
      path.pop();
      used.delete(key(n));
      if (steps > budget) return false;
    }
    return false;
  };

  return dfs() ? path : null;
}

/** 막다른 길용 자기 교차 없는 걷기 */
function walkFree(
  rng: Rng,
  grid: RectGrid,
  from: Cell,
  edges: number,
  used: Set<string>,
): Cell[] | null {
  const path: Cell[] = [from];
  const mine = new Set<string>();
  for (let i = 0; i < edges; i++) {
    const cur = path[path.length - 1];
    const options: Cell[] = [];
    for (const d of STEPS) {
      const n = { c: cur.c + d.c, r: cur.r + d.r };
      if (n.c < 0 || n.r < 0 || n.c >= grid.cols || n.r >= grid.rows) continue;
      if (used.has(key(n)) || mine.has(key(n))) continue;
      options.push(n);
    }
    if (options.length === 0) return null;
    const n = pickOne(rng, options);
    mine.add(key(n));
    path.push(n);
  }
  return path;
}

// ── 생성기 ────────────────────────────────────────────────────

export function generateRectBranchedVariant(
  rng: Rng,
  junctionCount: number,
  ctx: RectBoardContext,
): MultiBranchedVariant {
  const R = RECT_BRANCHED_RANGE;
  const K = junctionCount;
  const grid = computeRectGrid(ctx);
  const { cols, rows } = grid;

  // 긴 변 방향으로 출발지 → 목적지를 놓는다. 정사각형에 가까우면 세로.
  const vertical = rows >= cols;
  const longN = vertical ? rows : cols;
  const shortN = vertical ? cols : rows;
  const at = (lng: number, sht: number): Cell =>
    vertical ? { c: sht, r: lng } : { c: lng, r: sht };
  const lng = (n: Cell) => (vertical ? n.r : n.c);
  const sht = (n: Cell) => (vertical ? n.c : n.r);

  for (let attempt = 0; attempt < 600; attempt++) {
    // 1) 출발지/목적지: 긴 변의 양 끝 (한 줄 안쪽까지 허용), 어느 쪽이 출발인지도 랜덤
    const nearEnd = () => (rng() < 0.7 ? 0 : 1);
    const a = at(nearEnd(), Math.floor(rng() * shortN));
    const b = at(longN - 1 - nearEnd(), Math.floor(rng() * shortN));
    const [start, goal] = rng() < 0.5 ? [a, b] : [b, a];
    const dist = manhattan(start, goal);

    const extra =
      R.detourExtra[0] +
      2 * Math.floor(rng() * ((R.detourExtra[1] - R.detourExtra[0]) / 2 + 1));
    const minEdges = Math.max(
      dist + 2,
      1 + R.minEdgesBetweenJunctions * (K - 1) + 2,
    );
    const maxEdges = Math.max(minEdges, dist + extra);

    // 2) 정답 경로
    const main = randomPath(rng, grid, start, goal, minEdges, maxEdges);
    if (!main) continue;
    if (bendCount(main) < K + R.extraBends) continue;
    const E = main.length - 1;

    // 3) 갈림길: 정답 경로를 K 등분한 구간마다 하나씩 (고르게 분포), 서로 한 줄에 놓이지 않게
    const idx: number[] = [];
    let ok = true;
    let lo = 1;
    for (let k = 0; k < K; k++) {
      const bandLo = Math.max(lo, 1 + Math.floor((E * k) / K));
      const bandHi = Math.min(
        E - 1 - (K - 1 - k) * R.minEdgesBetweenJunctions,
        Math.floor((E * (k + 1)) / K),
      );
      if (bandHi < bandLo) {
        ok = false;
        break;
      }
      const i = bandLo + Math.floor(rng() * (bandHi - bandLo + 1));
      idx.push(i);
      lo = i + R.minEdgesBetweenJunctions;
    }
    if (!ok) continue;
    for (let k = 1; k < K; k++) {
      const p = main[idx[k - 1]];
      const q = main[idx[k]];
      if (p.c === q.c || p.r === q.r) ok = false;
    }
    if (!ok) continue;

    // 4) 막다른 길 (갈림길마다 하나, 빈 칸으로만)
    const used = new Set(main.map(key));
    const branches: Cell[][] = [];
    for (const i of idx) {
      const len =
        R.deadEndEdges[0] +
        Math.floor(rng() * (R.deadEndEdges[1] - R.deadEndEdges[0] + 1));
      const j = main[i];
      let found: Cell[] | null = null;
      const firsts: Cell[] = [];
      for (const d of STEPS) {
        const n = { c: j.c + d.c, r: j.r + d.r };
        if (n.c < 0 || n.r < 0 || n.c >= cols || n.r >= rows) continue;
        if (!used.has(key(n))) firsts.push(n);
      }
      for (const first of shuffled(rng, firsts)) {
        const tail = walkFree(
          rng,
          grid,
          first,
          len - 1,
          new Set([...used, key(first)]),
        );
        if (tail) {
          found = [j, ...tail];
          break;
        }
      }
      if (!found) {
        ok = false;
        break;
      }
      for (const n of found.slice(1)) used.add(key(n));
      branches.push(found);
    }
    if (!ok) continue;

    // 5) 보드를 고루 쓰는지: 짧은 변 방향으로 양쪽 끝까지 닿고, 무게중심이 가운데 근처
    const all = [...main, ...branches.flatMap((br) => br.slice(1))];
    const shorts = all.map(sht);
    if (Math.max(...shorts) - Math.min(...shorts) < shortN - 1) continue;
    const mLong = all.reduce((s, n) => s + lng(n), 0) / all.length;
    const mShort = shorts.reduce((s, v) => s + v, 0) / all.length;
    if (Math.abs(mLong - (longN - 1) / 2) > R.centroidTol * (longN / 4 + 0.5))
      continue;
    if (Math.abs(mShort - (shortN - 1) / 2) > R.centroidTol) continue;

    // 6) 월드 좌표 (+ 좌우/상하 반전). 격자가 직사각형이라 회전은 쓰지 않는다
    const flipX = rng() < 0.5;
    const flipY = rng() < 0.5;
    const world = (n: Cell): Point => {
      let x = (n.c - (cols - 1) / 2) * grid.pitchX;
      let y = (n.r - (rows - 1) / 2) * grid.pitchY;
      if (flipX) x = -x;
      if (flipY) y = -y;
      return { x: r3(x), y: r3(y) };
    };
    const junctionKeys = new Set(idx.map((i) => key(main[i])));
    const mainPts = simplify(main, junctionKeys).map(world);
    const branchPts = branches.map((br) => {
      const pts = simplify(br, new Set()).map(world);
      const n = pts.length;
      const ratio = between(rng, R.tipRatio[0], R.tipRatio[1]);
      const p = pts[n - 2];
      const z = pts[n - 1];
      pts[n - 1] = {
        x: r3(p.x + (z.x - p.x) * ratio),
        y: r3(p.y + (z.y - p.y) * ratio),
      };
      return pts;
    });
    return { mainPoints: mainPts, branches: branchPts };
  }
  throw new Error(
    `[rectBranched] 직사각형 보드(${grid.cols}×${grid.rows})에서 갈림길 ${K}개 미로를 만들지 못했습니다`,
  );
}
