import type { Point } from "./levelTypes";
import type { Rng } from "./randomVariants";
import { nearestOnCenterline } from "../physics/wallCollision";

/**
 * Level 12+ 전용: 실제 자석미로 교구판처럼 "보드 전체가 하나의 미로"인 생성기.
 *
 * Level 1~11 은 정답 경로(중심선)를 먼저 만들고 그 둘레에 벽을 둘렀다.
 * 여기서는 반대로 직사각형 셀 격자의 "셀 사이 벽"을 먼저 정하고, 열린 칸 사이를 통로로 바꾼다.
 *
 *   1) 보드 크기에서 열/행 수와 칸 간격을 정한다 (통로 폭·벽 두께는 그대로, 칸 간격만 보드에 맞게)
 *   2) 모든 셀 사이의 벽을 닫은 상태에서 시작해 벽을 허문다
 *      - 가장자리 한 바퀴(외곽 통로)를 전부 연다  → 순환 구조
 *      - 안쪽 셀들은 DFS 로 이어 붙여 구불구불한 내부 통로를 만든다
 *      - 출발지/목적지는 외곽 통로 위에 두고, 각각 안쪽으로 들어가는 문을 하나씩 낸다
 *      - 외곽과 안쪽을 잇는 문을 몇 개 더 내고, 막다른 길 대부분을 이어 순환(지름길)을 만든다
 *   3) 그래프로 검증 (validateGridMaze): 연결성, 서로 다른 정답 경로 2개 이상,
 *      외곽 경로, 내부 경로(외곽 통로를 쓰지 않음), 막다른 길 개수
 *   4) 열린 칸 사이를 통로 중심선으로 바꿔 기존 렌더링(PathWall)/충돌(wallCollision)에 넘긴다.
 *      두 시스템 모두 "중심선에서 통로 반폭 이내가 통로" 라는 같은 규칙이라, 갈림길·순환·교차가
 *      몇 개든 그대로 동작한다.
 *
 * 기존 levelGenerator 의 analyzeMaze / validateBranchedMaze 는 "순환 없음, 정답 경로 1개"를 요구하므로
 * Level 12 에는 쓰지 않고 이 파일의 전용 검증기를 쓴다. (Level 8~11 검증은 그대로)
 */

export const GRID_MAZE_RANGE = {
  /** 칸 간격 최소값 = (통로 폭 + 벽 두께) × 이 값 → 칸 사이 벽 두께가 벽 두께 이상 */
  spacing: 1.15,
  /** 격자가 보드의 쓸 수 있는 영역에서 차지하는 비율 */
  fill: 0.98,
  /** 안쪽 칸이 최소 2×2 는 있도록 */
  minCells: 4,
  /** 출발/목적지 문 외에 외곽에서 안쪽으로 내는 문 개수 [최소, 최대] */
  extraOpenings: [1, 3] as const,
  /** 막다른 길을 이어서 순환을 만들 확률 (나머지는 막다른 길로 남는다) */
  braidChance: 0.75,
  /** 막다른 길 최대 개수 (Level 12 는 "제한적인 막다른 길") */
  maxDeadEnds: 4,
  /** 출발지-목적지 사이 외곽 거리가 둘레의 이 비율 이상 (짧은 쪽 기준) */
  minRingShare: 0.3,
};

export interface GridMazeContext {
  /** 보드 너비를 1로 봤을 때의 높이 */
  H: number;
  /** 보드 너비(px) */
  W: number;
  /** 보드 가장자리 여유 (너비 = 1 기준) */
  boardMargin: number;
  corridorWidth: number;
  wallThickness: number;
  ballRadius: number;
}

export interface MazeGrid {
  cols: number;
  rows: number;
  /** 가로/세로 칸 간격 (너비 = 1 기준) */
  pitchX: number;
  pitchY: number;
}

/** 실제 보드 크기에서 격자를 정한다 */
export function computeMazeGrid(ctx: GridMazeContext): MazeGrid {
  const R = GRID_MAZE_RANGE;
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

// ── 셀/간선 ───────────────────────────────────────────────────

export interface GridMaze {
  grid: MazeGrid;
  /** 열린 칸 사이(간선) 집합. edgeKey(a, b) */
  open: Set<number>;
  /** 외곽 한 바퀴를 이루는 간선 */
  ring: Set<number>;
  /** 외곽 셀을 시계방향으로 나열 */
  ringOrder: number[];
  start: number;
  goal: number;
}

const id = (g: MazeGrid, c: number, r: number) => r * g.cols + c;
const colOf = (g: MazeGrid, i: number) => i % g.cols;
const rowOf = (g: MazeGrid, i: number) => Math.floor(i / g.cols);
const cellCount = (g: MazeGrid) => g.cols * g.rows;
const edgeKey = (g: MazeGrid, a: number, b: number) =>
  a < b ? a * cellCount(g) + b : b * cellCount(g) + a;

function neighborsOf(g: MazeGrid, i: number): number[] {
  const c = colOf(g, i);
  const r = rowOf(g, i);
  const out: number[] = [];
  if (c > 0) out.push(id(g, c - 1, r));
  if (c < g.cols - 1) out.push(id(g, c + 1, r));
  if (r > 0) out.push(id(g, c, r - 1));
  if (r < g.rows - 1) out.push(id(g, c, r + 1));
  return out;
}

const isRingCell = (g: MazeGrid, i: number) => {
  const c = colOf(g, i);
  const r = rowOf(g, i);
  return c === 0 || r === 0 || c === g.cols - 1 || r === g.rows - 1;
};
const isCorner = (g: MazeGrid, i: number) => {
  const c = colOf(g, i);
  const r = rowOf(g, i);
  return (c === 0 || c === g.cols - 1) && (r === 0 || r === g.rows - 1);
};

/** 외곽 셀에서 안쪽으로 한 칸 들어간 셀 (모서리는 없음) */
function inwardOf(g: MazeGrid, i: number): number {
  const c = colOf(g, i);
  const r = rowOf(g, i);
  if (r === 0) return id(g, c, 1);
  if (r === g.rows - 1) return id(g, c, g.rows - 2);
  if (c === 0) return id(g, 1, r);
  return id(g, g.cols - 2, r);
}

function ringCells(g: MazeGrid): number[] {
  const out: number[] = [];
  for (let c = 0; c < g.cols; c++) out.push(id(g, c, 0));
  for (let r = 1; r < g.rows; r++) out.push(id(g, g.cols - 1, r));
  for (let c = g.cols - 2; c >= 0; c--) out.push(id(g, c, g.rows - 1));
  for (let r = g.rows - 2; r >= 1; r--) out.push(id(g, 0, r));
  return out;
}

function adjacency(m: GridMaze): number[][] {
  const g = m.grid;
  const adj: number[][] = Array.from({ length: cellCount(g) }, () => []);
  for (let a = 0; a < cellCount(g); a++) {
    for (const b of neighborsOf(g, a)) {
      if (a < b && m.open.has(edgeKey(g, a, b))) {
        adj[a].push(b);
        adj[b].push(a);
      }
    }
  }
  return adj;
}

function shuffled<T>(rng: Rng, list: readonly T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pickOne = <T>(rng: Rng, list: readonly T[]): T =>
  list[Math.min(list.length - 1, Math.floor(rng() * list.length))];

// ── 생성 ──────────────────────────────────────────────────────

/** 격자 위에 미로를 만든다. 조건을 못 맞추면 throw (호출한 쪽에서 다시 뽑는다) */
export function generateGridMaze(rng: Rng, grid: MazeGrid): GridMaze {
  const R = GRID_MAZE_RANGE;
  const g = grid;
  const open = new Set<number>();
  const ring = new Set<number>();
  const order = ringCells(g);

  // 1) 외곽 통로: 가장자리 한 바퀴
  for (let k = 0; k < order.length; k++) {
    const e = edgeKey(g, order[k], order[(k + 1) % order.length]);
    open.add(e);
    ring.add(e);
  }

  // 2) 출발지/목적지: 외곽 위, 모서리 아님, 외곽을 따라 충분히 떨어져 있음
  const doors = order.filter((i) => !isCorner(g, i));
  const start = pickOne(rng, doors);
  const si = order.indexOf(start);
  const far = doors.filter((i) => {
    const d = Math.abs(order.indexOf(i) - si);
    return Math.min(d, order.length - d) >= R.minRingShare * order.length;
  });
  if (far.length === 0) throw new Error("[gridMaze] 목적지 후보가 없음");
  const goal = pickOne(rng, far);

  // 3) 안쪽 통로: 안쪽 셀을 DFS 로 모두 잇는다 (구불구불한 긴 통로)
  const interior: number[] = [];
  for (let r = 1; r < g.rows - 1; r++)
    for (let c = 1; c < g.cols - 1; c++) interior.push(id(g, c, r));
  const seen = new Set<number>();
  const first = pickOne(rng, interior);
  const stack = [first];
  seen.add(first);
  while (stack.length > 0) {
    const cur = stack[stack.length - 1];
    const next = shuffled(rng, neighborsOf(g, cur)).filter(
      (n) => !isRingCell(g, n) && !seen.has(n),
    );
    if (next.length === 0) {
      stack.pop();
      continue;
    }
    seen.add(next[0]);
    open.add(edgeKey(g, cur, next[0]));
    stack.push(next[0]);
  }

  // 4) 외곽 ↔ 안쪽 문: 출발지, 목적지, 그리고 몇 개 더
  const door = (i: number) => open.add(edgeKey(g, i, inwardOf(g, i)));
  door(start);
  door(goal);
  const others = shuffled(
    rng,
    doors.filter((i) => i !== start && i !== goal),
  );
  const extra =
    R.extraOpenings[0] +
    Math.floor(rng() * (R.extraOpenings[1] - R.extraOpenings[0] + 1));
  for (const i of others.slice(0, extra)) door(i);

  const maze: GridMaze = { grid: g, open, ring, ringOrder: order, start, goal };

  // 5) 막다른 길 대부분을 이웃과 이어 순환(지름길)을 만든다
  const adj = adjacency(maze);
  for (let i = 0; i < cellCount(g); i++) {
    if (adj[i].length !== 1 || i === start || i === goal) continue;
    if (rng() >= R.braidChance) continue;
    const closed = neighborsOf(g, i).filter((n) => !open.has(edgeKey(g, i, n)));
    if (closed.length === 0) continue;
    // 안쪽 셀끼리 이어 붙이는 쪽을 우선 (외곽과의 문이 너무 많아지지 않게)
    const inner = closed.filter((n) => !isRingCell(g, n));
    open.add(edgeKey(g, i, pickOne(rng, inner.length > 0 ? inner : closed)));
  }
  return maze;
}

// ── 검증 (Level 12 전용) ──────────────────────────────────────

export interface GridMazeAnalysis {
  issues: string[];
  /** 모든 셀이 연결되어 있는가 */
  connected: boolean;
  /** 출발지 → 목적지 간선이 겹치지 않는 경로 수 (최대 3까지 센다) */
  disjointRoutes: number;
  /** 외곽 통로만 쓰는 경로의 길이 [짧은 쪽, 긴 쪽] (칸 수). 없으면 null */
  outerRoute: [number, number] | null;
  /** 외곽 통로를 전혀 쓰지 않는 내부 경로의 길이(칸 수). 없으면 null */
  innerRoute: number | null;
  deadEnds: number;
  /** 안쪽 셀 중 갈림길(연결 3개 이상)인 셀 수 */
  interiorJunctions: number;
  /** 출발지 → 목적지 최단 경로 (셀 id 목록) */
  shortest: number[];
}

/** 간선을 allow 가 허락하는 것만 써서 start → goal 최단 경로(셀 목록). 없으면 null */
function bfsPath(
  adj: number[][],
  start: number,
  goal: number,
  allow: (a: number, b: number) => boolean,
): number[] | null {
  const prev = new Map<number, number>([[start, -1]]);
  const queue = [start];
  for (let qi = 0; qi < queue.length; qi++) {
    const cur = queue[qi];
    if (cur === goal) break;
    for (const n of adj[cur]) {
      if (prev.has(n) || !allow(cur, n)) continue;
      prev.set(n, cur);
      queue.push(n);
    }
  }
  if (!prev.has(goal)) return null;
  const path: number[] = [];
  for (let n = goal; n !== -1; n = prev.get(n)!) path.push(n);
  return path.reverse();
}

/** 간선이 겹치지 않는 start → goal 경로 수 (최대 limit). 단위 용량 최대 유량 */
function edgeDisjointRoutes(
  adj: number[][],
  n: number,
  start: number,
  goal: number,
  limit: number,
): number {
  const cap = new Map<number, number>();
  const key = (a: number, b: number) => a * n + b;
  for (let a = 0; a < n; a++) for (const b of adj[a]) cap.set(key(a, b), 1);
  let flow = 0;
  while (flow < limit) {
    const prev = new Map<number, number>([[start, -1]]);
    const queue = [start];
    for (let qi = 0; qi < queue.length && !prev.has(goal); qi++) {
      const cur = queue[qi];
      for (const nx of adj[cur]) {
        if (prev.has(nx) || (cap.get(key(cur, nx)) ?? 0) <= 0) continue;
        prev.set(nx, cur);
        queue.push(nx);
      }
    }
    if (!prev.has(goal)) break;
    for (let v = goal; prev.get(v) !== -1; v = prev.get(v)!) {
      const u = prev.get(v)!;
      cap.set(key(u, v), (cap.get(key(u, v)) ?? 0) - 1);
      cap.set(key(v, u), (cap.get(key(v, u)) ?? 0) + 1);
    }
    flow++;
  }
  return flow;
}

export function validateGridMaze(m: GridMaze): GridMazeAnalysis {
  const g = m.grid;
  const N = cellCount(g);
  const adj = adjacency(m);
  const issues: string[] = [];

  // 연결성 (모든 셀이 통로로 이어져 있어야 한다. 갇힌 셀 = 의도하지 않은 막힌 공간)
  const seen = new Set<number>([m.start]);
  const queue = [m.start];
  for (let qi = 0; qi < queue.length; qi++) {
    for (const n of adj[queue[qi]]) {
      if (!seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    }
  }
  const connected = seen.size === N;
  if (!connected) issues.push("연결되지 않은 칸이 있음");
  if (m.start === m.goal) issues.push("출발지와 목적지가 같음");

  // 서로 다른(간선이 겹치지 않는) 정답 경로
  const disjoint = edgeDisjointRoutes(adj, N, m.start, m.goal, 3);
  if (disjoint < 2) issues.push("서로 다른 정답 경로가 2개 미만");

  // 외곽 경로: 외곽 통로 간선만 사용
  const ringOnly = (a: number, b: number) => m.ring.has(edgeKey(g, a, b));
  const outerPath = bfsPath(adj, m.start, m.goal, ringOnly);
  let outerRoute: [number, number] | null = null;
  if (!outerPath) {
    issues.push("외곽 통로만으로 목적지에 도달할 수 없음");
  } else {
    const si = m.ringOrder.indexOf(m.start);
    const gi = m.ringOrder.indexOf(m.goal);
    const d = Math.abs(si - gi);
    outerRoute = [
      Math.min(d, m.ringOrder.length - d),
      Math.max(d, m.ringOrder.length - d),
    ];
  }

  // 내부 경로: 외곽 통로 간선을 하나도 쓰지 않는 경로 (출발지 → 안쪽 → 목적지)
  const innerOnly = (a: number, b: number) => !m.ring.has(edgeKey(g, a, b));
  const innerPath = bfsPath(adj, m.start, m.goal, innerOnly);
  const innerRoute = innerPath ? innerPath.length - 1 : null;
  if (!innerPath) issues.push("내부 통로만으로 목적지에 도달할 수 없음");
  else if (innerPath.length - 1 < 3) issues.push("내부 경로가 너무 짧음");
  // 내부 경로는 외곽 경로보다 짧거나(지름길) 최소한 외곽의 긴 쪽보다는 길지 않아야 한다
  if (innerRoute !== null && outerRoute && innerRoute > outerRoute[0]) {
    issues.push("내부 경로가 외곽 경로보다 짧지 않음(지름길 없음)");
  }

  // 막다른 길 / 내부 교차점
  let deadEnds = 0;
  let interiorJunctions = 0;
  for (let i = 0; i < N; i++) {
    if (adj[i].length === 0) issues.push("통로가 없는 칸이 있음");
    if (adj[i].length === 1) deadEnds++;
    if (!isRingCell(g, i) && adj[i].length >= 3) interiorJunctions++;
  }
  if (deadEnds > GRID_MAZE_RANGE.maxDeadEnds)
    issues.push("막다른 길이 너무 많음");
  if (interiorJunctions < 1) issues.push("내부 교차점이 없음");

  const shortest = bfsPath(adj, m.start, m.goal, () => true) ?? [];
  return {
    issues,
    connected,
    disjointRoutes: disjoint,
    outerRoute,
    innerRoute,
    deadEnds,
    interiorJunctions,
    shortest,
  };
}

// ── 좌표 변환 ─────────────────────────────────────────────────

export interface GridMazeBuild {
  /** 정규화 좌표 (x: 너비 기준 0~1, y: 높이 기준 0~1) */
  start: Point;
  goal: Point;
  /** 출발지 → 목적지 최단 경로 (중심선) */
  main: Point[];
  /** 그 밖의 모든 통로 중심선 (곧은 구간 단위) */
  extra: Point[][];
  /** 최단 경로 길이 (보드 너비 = 1) */
  pathLength: number;
  analysis: GridMazeAnalysis;
}

const r4 = (n: number) => Math.round(n * 10000) / 10000;

/**
 * 미로 → 통로 중심선. 열린 칸 사이 = 중심선 선분.
 * 같은 줄의 이어진 선분은 하나의 곧은 구간으로 합쳐 선분 수를 줄인다.
 * 마지막에 "닫힌 벽 한가운데가 정말 벽인지 / 열린 통로가 정말 통로인지"를 중심선으로 다시 확인한다.
 */
export function buildGridMazeRound(
  rng: Rng,
  ctx: GridMazeContext,
): GridMazeBuild {
  const grid = computeMazeGrid(ctx);
  const g = grid;
  const maze = generateGridMaze(rng, grid);
  const analysis = validateGridMaze(maze);
  if (analysis.issues.length > 0) {
    throw new Error(`[gridMaze] ${analysis.issues.join(", ")}`);
  }

  const flipX = rng() < 0.5;
  const flipY = rng() < 0.5;
  // 월드 좌표 (x: 너비 = 1, y: 너비 단위) — 보드 한가운데 기준
  const pos = (i: number): Point => {
    const c = flipX ? g.cols - 1 - colOf(g, i) : colOf(g, i);
    const r = flipY ? g.rows - 1 - rowOf(g, i) : rowOf(g, i);
    return {
      x: 0.5 + (c - (g.cols - 1) / 2) * g.pitchX,
      y: ctx.H / 2 + (r - (g.rows - 1) / 2) * g.pitchY,
    };
  };
  const norm = (p: Point): Point => ({ x: r4(p.x), y: r4(p.y / ctx.H) });

  // 최단 경로 (외곽/내부 어느 쪽이든 가장 짧은 길)
  const mainCells = analysis.shortest;
  const mainEdges = new Set<number>();
  for (let k = 1; k < mainCells.length; k++)
    mainEdges.add(edgeKey(g, mainCells[k - 1], mainCells[k]));

  const simplify = (cells: number[]): Point[] => {
    const pts = cells.map(pos);
    return pts.filter((p, k) => {
      if (k === 0 || k === pts.length - 1) return true;
      const a = pts[k - 1];
      const b = pts[k + 1];
      return (
        Math.abs((p.x - a.x) * (b.y - p.y) - (p.y - a.y) * (b.x - p.x)) > 1e-9
      );
    });
  };
  const main = simplify(mainCells);

  // 나머지 통로: 가로/세로로 이어진 곧은 구간 단위로 묶는다
  const extraRuns: number[][] = [];
  const used = new Set<number>(mainEdges);
  const isOpenFree = (a: number, b: number) => {
    const e = edgeKey(g, a, b);
    return maze.open.has(e) && !used.has(e);
  };
  for (let r = 0; r < g.rows; r++) {
    for (let c = 0; c < g.cols; c++) {
      for (const [dc, dr] of [
        [1, 0],
        [0, 1],
      ] as const) {
        let a = id(g, c, r);
        if (c - dc >= 0 && r - dr >= 0) {
          // 앞 칸에서 이미 이어지는 구간이면 건너뜀 (구간의 시작에서만 시작)
          const prevCell = id(g, c - dc, r - dr);
          if (isOpenFree(prevCell, a)) continue;
        }
        const cells = [a];
        let cc = c;
        let rr = r;
        while (cc + dc < g.cols && rr + dr < g.rows) {
          const b = id(g, cc + dc, rr + dr);
          if (!isOpenFree(a, b)) break;
          used.add(edgeKey(g, a, b));
          cells.push(b);
          a = b;
          cc += dc;
          rr += dr;
        }
        if (cells.length >= 2) extraRuns.push(cells);
      }
    }
  }
  const extra = extraRuns.map((cells) => [
    pos(cells[0]),
    pos(cells[cells.length - 1]),
  ]);

  // 기하 검증: 중심선만으로 다시 확인
  const segs: number[] = [];
  const addSeg = (a: Point, b: Point) => segs.push(a.x, a.y, b.x, b.y);
  for (let k = 1; k < main.length; k++) addSeg(main[k - 1], main[k]);
  for (const line of extra) addSeg(line[0], line[1]);
  const count = segs.length / 4;
  const half = ctx.corridorWidth / 2 / ctx.W; // 통로 반폭 (너비 = 1)
  const wall = ctx.wallThickness / ctx.W;
  // 닫힌 칸 사이의 한가운데는 벽이어야 한다 (통로 반폭 + 벽 두께의 절반 이상 떨어져 있음)
  for (let a = 0; a < cellCount(g); a++) {
    for (const b of neighborsOf(g, a)) {
      if (a > b || maze.open.has(edgeKey(g, a, b))) continue;
      const pa = pos(a);
      const pb = pos(b);
      const near = nearestOnCenterline(
        segs,
        count,
        (pa.x + pb.x) / 2,
        (pa.y + pb.y) / 2,
      );
      if (near.d < half + wall / 2 - 1e-6) {
        throw new Error(
          "[gridMaze] 닫힌 벽 자리에 통로가 겹침(의도하지 않은 벽 틈)",
        );
      }
    }
  }
  // 통로가 구슬 지름보다 충분히 넓은가
  if (ctx.corridorWidth < ctx.ballRadius * 2 * 1.3) {
    throw new Error("[gridMaze] 통로가 쇠구슬에 비해 좁음");
  }
  // 모든 통로가 보드 안 (벽 두께 포함)
  const edgeNeed = half + wall;
  for (let k = 0; k < count; k++) {
    for (const [x, y] of [
      [segs[k * 4], segs[k * 4 + 1]],
      [segs[k * 4 + 2], segs[k * 4 + 3]],
    ]) {
      if (
        x < edgeNeed - 1e-6 ||
        x > 1 - edgeNeed + 1e-6 ||
        y < edgeNeed - 1e-6 ||
        y > ctx.H - edgeNeed + 1e-6
      ) {
        throw new Error("[gridMaze] 통로가 보드 가장자리에 너무 가까움");
      }
    }
  }

  let len = 0;
  for (let k = 1; k < main.length; k++)
    len += Math.hypot(main[k].x - main[k - 1].x, main[k].y - main[k - 1].y);

  return {
    start: norm(pos(maze.start)),
    goal: norm(pos(maze.goal)),
    main: main.map(norm),
    extra: extra.map((line) => line.map(norm)),
    pathLength: r4(len),
    analysis,
  };
}
