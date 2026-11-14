// import {
//   buildBranched,
//   buildMultiBranched,
//   buildCircle,
//   buildFree,
//   buildLShape,
//   buildSpiral,
//   buildSquareSpiral,
//   buildStraight,
//   buildWave,
//   buildZigzag,
//   type WorldPath,
// } from "./pathShapes";

// import {
//   DEFAULT_RULES,
//   DEFAULT_VARIATION,
//   LevelType,
//   type GeneratedRound,
//   type LevelConfig,
//   type LevelVariation,
//   type Point,
//   type ValidationRules,
// } from "./levelTypes";
// import {
//   buildCenterline,
//   minShortcutGap,
//   minTurnRadius,
// } from "../physics/collisionGeometry";
// import { RANDOM_VARIANT_GENERATORS } from "./randomVariants";

// export interface GenerateOptions {
//   /** 게임 보드의 가로/세로 비 (width / height). 원이 찌그러지지 않게 하는 데 필요 */
//   boardAspect: number;
//   /** 보드 가로 길이(px). 벽이 있는 레벨은 통로 폭(px)을 정규화 좌표와 맞추는 데 필요하다 */
//   boardWidthPx?: number;
//   /**
//    * 시드 기준값. 같은 값이면 항상 같은 라운드가 나온다.
//    * 레벨(세션)을 시작할 때 한 번 정해서 그 레벨이 끝날 때까지 같은 값을 넘겨야
//    * 리렌더링/라운드 재시작에도 미로가 바뀌지 않는다.
//    */
//   baseSeed?: number;
// }

// const MAX_ATTEMPTS = 8;
// /** 랜덤 variant 생성 시 검증에 실패하면 새 매개변수로 다시 뽑는 최대 횟수 */
// const MAX_RANDOM_ATTEMPTS = 60;
// const EPS = 1e-6;

// // ── 유틸 ───────────────────────────────────────────────────

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// /** 시드 기반 난수 (mulberry32). Math.random 은 쓰지 않는다 → 재현 가능 */
// function makeRng(seed: number) {
//   let a = seed >>> 0;
//   return () => {
//     a = (a + 0x6d2b79f5) >>> 0;
//     let t = a;
//     t = Math.imul(t ^ (t >>> 15), t | 1);
//     t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
//     return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//   };
// }

// function hashSeed(baseSeed: number, levelId: number, roundIndex: number) {
//   return (
//     (Math.imul(baseSeed + 1, 73856093) ^
//       Math.imul(levelId, 19349663) ^
//       Math.imul(roundIndex + 1, 83492791)) >>>
//     0
//   );
// }

// function pick<T>(list: readonly T[], i: number): T {
//   if (list.length === 0)
//     throw new Error("[LevelGenerator] variants 가 비어 있습니다");
//   return list[i % list.length];
// }

// const round4 = (n: number) => Math.round(n * 10000) / 10000;
// const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

// /** FREE 는 경로가 없으므로 시작/목적지만으로 범위를 계산한다. BRANCHED 는 분기 포함 */
// function refPoints(p: WorldPath): Point[] {
//   if (p.points.length === 0) return [p.start, p.goal];
//   const all = p.points.slice();
//   if (p.branches) {
//     for (const b of p.branches) all.push(...b);
//   }
//   return all;
// }

// function mapPath(p: WorldPath, f: (q: Point) => Point): WorldPath {
//   return {
//     ...p,
//     points: p.points.map(f),
//     start: f(p.start),
//     goal: f(p.goal),
//     branches: p.branches?.map((b) => b.map(f)),
//   };
// }

// function scaleAbout(
//   p: WorldPath,
//   s: number,
//   cx: number,
//   cy: number,
// ): WorldPath {
//   const scaled = mapPath(p, (q) => ({
//     x: cx + (q.x - cx) * s,
//     y: cy + (q.y - cy) * s,
//   }));
//   if (p.ringSpacing !== undefined) scaled.ringSpacing = p.ringSpacing * s;
//   return scaled;
// }

// // ── 1) 레벨 유형별 원본 형태 ───────────────────────────────────

// function buildRaw(
//   config: LevelConfig,
//   roundIndex: number,
//   rng: () => number,
// ): WorldPath {
//   // 랜덤 생성 레벨: 기존 variants 에서 고르지 않고, 레벨 규칙에 맞는 새 매개변수를 뽑아
//   // 기존 build 함수(buildSpiral / buildSquareSpiral / buildBranched)에 그대로 넘긴다.
//   if (config.randomVariants) {
//     switch (config.levelType) {
//       case LevelType.SPIRAL:
//         return buildSpiral(RANDOM_VARIANT_GENERATORS[LevelType.SPIRAL](rng));
//       case LevelType.SQUARE_SPIRAL:
//         return buildSquareSpiral(
//           RANDOM_VARIANT_GENERATORS[LevelType.SQUARE_SPIRAL](rng),
//         );
//       case LevelType.BRANCHED:
//         return buildBranched(
//           RANDOM_VARIANT_GENERATORS[LevelType.BRANCHED](rng),
//         );
//       case LevelType.MULTI_BRANCHED:
//         return buildMultiBranched(
//           RANDOM_VARIANT_GENERATORS[LevelType.MULTI_BRANCHED](
//             rng,
//             config.junctionCount,
//           ),
//         );
//       default:
//         throw new Error(
//           `[LevelGenerator] ${config.levelType} 은(는) 랜덤 생성을 지원하지 않습니다 (Level ${config.levelId})`,
//         );
//     }
//   }
//   switch (config.levelType) {
//     case LevelType.FREE:
//       return buildFree(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.STRAIGHT:
//       return buildStraight(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.L_SHAPE:
//       return buildLShape(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.CIRCLE:
//       return buildCircle(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.SPIRAL:
//       return buildSpiral(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.SQUARE_SPIRAL:
//       return buildSquareSpiral(
//         pick(config.pathConstraints.variants, roundIndex),
//       );
//     case LevelType.WAVE:
//       return buildWave(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.ZIGZAG:
//       return buildZigzag(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.BRANCHED:
//       return buildBranched(pick(config.pathConstraints.variants, roundIndex));
//     case LevelType.MULTI_BRANCHED:
//       return buildMultiBranched(
//         pick(config.pathConstraints.variants, roundIndex),
//       );
//   }
// }

// // ── 2) 보드 위에 배치: (랜덤 변형) → 중앙 정렬 → 보드에 맞게 축소 → (뒤집기) ──

// function layout(
//   raw: WorldPath,
//   H: number,
//   rules: ValidationRules,
//   variation: LevelVariation,
//   rng: () => number,
// ): WorldPath {
//   let p = raw;

//   if (variation.sizeJitter > 0) {
//     p = scaleAbout(p, 1 + (rng() * 2 - 1) * variation.sizeJitter, 0, 0);
//   }

//   // 중앙 정렬
//   const pts = refPoints(p);
//   const minX = Math.min(...pts.map((q) => q.x));
//   const maxX = Math.max(...pts.map((q) => q.x));
//   const minY = Math.min(...pts.map((q) => q.y));
//   const maxY = Math.max(...pts.map((q) => q.y));
//   const ox = 0.5 - (minX + maxX) / 2;
//   const oy = H / 2 - (minY + maxY) / 2;
//   p = mapPath(p, (q) => ({ x: q.x + ox, y: q.y + oy }));

//   // 보드 안에 들어오도록 모양은 그대로 두고 크기만 줄인다 (가로/세로비가 달라도 안전)
//   const w = maxX - minX;
//   const h = maxY - minY;
//   const usableW = 1 - 2 * rules.boardMargin;
//   const usableH = H - 2 * rules.boardMargin;
//   const s = Math.min(
//     1,
//     w > EPS ? usableW / w : Infinity,
//     h > EPS ? usableH / h : Infinity,
//   );
//   if (s < 1) p = scaleAbout(p, s, 0.5, H / 2);

//   if (variation.allowMirror) {
//     const flipX = rng() < 0.5;
//     const flipY = rng() < 0.5;
//     if (flipX || flipY) {
//       p = mapPath(p, (q) => ({
//         x: flipX ? 1 - q.x : q.x,
//         y: flipY ? H - q.y : q.y,
//       }));
//     }
//   }
//   return p;
// }

// // ── 3) 검증 (기획서 6-1) ──────────────────────────────────────

// function pathLengthOf(p: WorldPath): number {
//   if (p.points.length < 2) return dist(p.start, p.goal);
//   let sum = 0;
//   for (let i = 1; i < p.points.length; i++)
//     sum += dist(p.points[i - 1], p.points[i]);
//   return sum;
// }

// function cross(o: Point, a: Point, b: Point) {
//   return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
// }

// function segmentsCross(a: Point, b: Point, c: Point, d: Point) {
//   const d1 = cross(c, d, a);
//   const d2 = cross(c, d, b);
//   const d3 = cross(a, b, c);
//   const d4 = cross(a, b, d);
//   return d1 * d2 < -EPS && d3 * d4 < -EPS;
// }

// function hasSelfIntersection(pts: Point[]): boolean {
//   for (let i = 0; i < pts.length - 1; i++) {
//     for (let j = i + 2; j < pts.length - 1; j++) {
//       if (segmentsCross(pts[i], pts[i + 1], pts[j], pts[j + 1])) return true;
//     }
//   }
//   return false;
// }

// /** 벽이 있는 레벨 전용 검증: 통로 폭, 통로끼리의 간격, 급한 커브 */
// function validateWalls(p: WorldPath, config: LevelConfig, W: number): string[] {
//   const walls = config.walls;
//   if (!walls.hasWalls || p.points.length < 2) return [];
//   const issues: string[] = [];
//   const cw = walls.corridorWidth;
//   const wt = walls.wallThickness;

//   // 쇠구슬이 지나갈 수 있는 폭인가
//   if (cw < walls.minCorridorWidth || cw < config.ballRadius * 2 + 8) {
//     issues.push("통로 폭이 쇠구슬이 지나가기에 너무 좁음");
//   }

//   // 월드 좌표(보드 너비 = 1) → px
//   const px = p.points.map((q) => ({ x: q.x * W, y: q.y * W }));
//   const center = buildCenterline(px, walls.cornerRadius);

//   // 경로를 따라 멀리 떨어진 두 구간이 가까우면 통로끼리 붙어 지름길이 생긴다.
//   // 사이에 벽(두께 wt)이 들어갈 만큼 떨어져 있어야 한다.
//   const gap = minShortcutGap(center, Math.PI * (cw + wt));
//   if (gap < cw + wt - 0.5) issues.push("다른 구간의 통로가 서로 너무 가까움");

//   // 너무 급한 커브는 안쪽 벽이 뭉개진다
//   if (minTurnRadius(center) < cw * 0.35) issues.push("커브가 너무 급함");
//   return issues;
// }

// /** 점 → 선분까지의 거리 */
// function distToSegment(q: Point, a: Point, b: Point): number {
//   const dx = b.x - a.x;
//   const dy = b.y - a.y;
//   const len2 = dx * dx + dy * dy;
//   const u =
//     len2 < EPS
//       ? 0
//       : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / len2));
//   return Math.hypot(q.x - (a.x + dx * u), q.y - (a.y + dy * u));
// }

// function distToPolyline(q: Point, pts: Point[]): number {
//   let best = Infinity;
//   for (let i = 0; i < pts.length - 1; i++) {
//     best = Math.min(best, distToSegment(q, pts[i], pts[i + 1]));
//   }
//   return best;
// }

// /** 막다른 길 최소 길이 (보드 너비 = 1). 너무 짧으면 "막다른 길"을 경험하지 못한다 */
// const MIN_DEAD_END_LENGTH = 0.2;

// const SAME = 1e-4;

// /**
//  * 실제 통로 연결 그래프로 미로 구조를 분석한다 (화면에 보이는 선의 개수가 아니라 연결 관계 기준).
//  *  - 정답 경로와 막다른 길의 모든 선분을 노드(꼭짓점)/간선으로 만들고, 같은 위치의 꼭짓점은 하나로 합친다
//  *  - 교차: 서로 다른 두 선분이 꼭짓점이 아닌 곳에서 만나거나, 꼭짓점이 다른 선분 위에 놓이면 새 연결이 생긴 것
//  *  - 갈림길 = 차수(연결된 통로 수) 3, 막다른 길 끝 = 차수 1, 4 이상은 금지
//  *  - 시작→목적지 경로(트리라서 유일)를 따라가며 만나는 갈림길 수 = 선택 횟수
//  */
// export interface MazeAnalysis {
//   junctions: number;
//   deadEnds: number;
//   maxDegree: number;
//   isTree: boolean;
//   connected: boolean;
//   /** 시작 → 목적지 정답 경로에서 만난 갈림길 수 */
//   choicesOnAnswerPath: number;
//   /** 새 연결을 만드는 교차/접촉 수 */
//   strayContacts: number;
// }

// export function analyzeMaze(p: WorldPath): MazeAnalysis {
//   const lines: Point[][] = [p.points, ...(p.branches ?? [])];
//   const nodes: Point[] = [];
//   const nodeOf = (q: Point) => {
//     for (let i = 0; i < nodes.length; i++)
//       if (dist(nodes[i], q) < SAME) return i;
//     nodes.push(q);
//     return nodes.length - 1;
//   };
//   const segs: { a: number; b: number }[] = [];
//   for (const line of lines) {
//     for (let i = 1; i < line.length; i++) {
//       const a = nodeOf(line[i - 1]);
//       const b = nodeOf(line[i]);
//       if (a !== b) segs.push({ a, b });
//     }
//   }
//   const adj: number[][] = nodes.map(() => []);
//   for (const s of segs) {
//     adj[s.a].push(s.b);
//     adj[s.b].push(s.a);
//   }

//   // 의도하지 않은 접촉/교차
//   let stray = 0;
//   for (let i = 0; i < segs.length; i++) {
//     for (let j = i + 1; j < segs.length; j++) {
//       const s = segs[i];
//       const t = segs[j];
//       if (segmentsCross(nodes[s.a], nodes[s.b], nodes[t.a], nodes[t.b]))
//         stray++;
//     }
//   }
//   for (let n = 0; n < nodes.length; n++) {
//     for (const s of segs) {
//       if (s.a === n || s.b === n) continue;
//       if (distToSegment(nodes[n], nodes[s.a], nodes[s.b]) < SAME) stray++;
//     }
//   }

//   const deg = adj.map((a) => a.length);
//   const junctions = deg.filter((d) => d === 3).length;
//   const deadEnds = deg.filter((d) => d === 1).length;
//   const maxDegree = Math.max(0, ...deg);

//   // 연결성 + 시작→목적지 경로(BFS)
//   const s0 = nodeOf(p.start);
//   const g0 = nodeOf(p.goal);
//   const prev = new Array<number>(nodes.length).fill(-2);
//   prev[s0] = -1;
//   const queue = [s0];
//   for (let qi = 0; qi < queue.length; qi++) {
//     for (const m of adj[queue[qi]]) {
//       if (prev[m] === -2) {
//         prev[m] = queue[qi];
//         queue.push(m);
//       }
//     }
//   }
//   const connected = queue.length === nodes.length;
//   let choices = 0;
//   if (prev[g0] !== -2) {
//     for (let n = g0; n !== -1; n = prev[n]) if (deg[n] === 3) choices++;
//   }
//   return {
//     junctions,
//     deadEnds,
//     maxDegree,
//     isTree: connected && segs.length === nodes.length - 1,
//     connected,
//     choicesOnAnswerPath: choices,
//     strayContacts: stray,
//   };
// }

// /**
//  * 갈림길 미로(Level 8, 9, …) 전용 검증. expected = 갈림길(= 막다른 길) 수.
//  *  - 갈림길은 정확히 expected 개, 막다른 길도 expected 개, 정답 경로 위에서 expected 번 선택한다
//  *  - 갈림길마다 선택지는 2개(차수 3), 서로 다른 곳에 있고 시작/목적지가 아니다
//  *  - 막다른 길은 갈림길 근처를 빼면 다른 통로와 만나거나 너무 가까워지지 않는다
//  *    (가까우면 통로끼리 붙어 지름길·추가 갈림길이 생긴다)
//  *  - 잘못 들어가도 같은 갈림길로 되돌아올 수 있다 (막다른 길의 한쪽 끝이 갈림길)
//  */
// function validateBranchedMaze(
//   p: WorldPath,
//   config: LevelConfig,
//   W: number,
//   expected: number,
// ): string[] {
//   const issues: string[] = [];
//   const branches = p.branches ?? [];
//   if (branches.length !== expected) {
//     return [`막다른 길이 정확히 ${expected}개가 아님`];
//   }
//   if (branches.some((b) => b.length < 2)) return ["막다른 길 점열이 부족함"];

//   // 각 갈림길 = 막다른 길의 첫 점. 정답 경로의 서로 다른 중간 꼭짓점이어야 한다
//   const jIdxs: number[] = [];
//   for (const branch of branches) {
//     const jIdx = p.points.findIndex((q) => dist(q, branch[0]) < SAME);
//     if (jIdx < 0) return ["갈림길이 정답 경로 위에 있지 않음"];
//     if (jIdx === 0 || jIdx === p.points.length - 1) {
//       issues.push("갈림길이 시작점이나 목적지에 있음");
//     }
//     if (jIdxs.includes(jIdx)) issues.push("한 곳에서 갈림길이 겹침");
//     jIdxs.push(jIdx);
//   }

//   // 실제 연결 구조 (기획: 선의 개수가 아니라 통로 연결 관계로 판단)
//   const a = analyzeMaze(p);
//   if (a.junctions !== expected) issues.push("갈림길 수가 규칙과 다름");
//   if (a.deadEnds !== expected + 2)
//     issues.push("막다른 길/출발/도착 끝점 수가 규칙과 다름");
//   if (a.maxDegree > 3) issues.push("한 곳에서 선택지가 3개 이상");
//   if (!a.isTree) issues.push("통로가 끊겼거나 순환/교차가 있음");
//   if (a.strayContacts > 0) issues.push("의도하지 않은 통로 접촉/교차");
//   if (a.choicesOnAnswerPath !== expected)
//     issues.push("정답 경로의 선택 횟수가 규칙과 다름");

//   const w = config.walls;
//   const gapWorld =
//     w.hasWalls && W > 0 ? (w.corridorWidth + w.wallThickness - 0.5) / W : 0;
//   const skip = gapWorld * 1.5; // 갈림길 주변(T자 합류부)은 가까운 게 정상
//   const STEP = 0.01;

//   for (let bi = 0; bi < branches.length; bi++) {
//     const branch = branches[bi];
//     const junction = branch[0];

//     // 막다른 길 길이
//     let deadLen = 0;
//     for (let i = 1; i < branch.length; i++)
//       deadLen += dist(branch[i - 1], branch[i]);
//     if (deadLen < MIN_DEAD_END_LENGTH) issues.push("막다른 길이 너무 짧음");

//     // 막다른 길의 모든 점은 갈림길에서 멀어질수록 정답 경로·다른 막다른 길에서도 멀어져야 한다
//     for (let i = 1; i < branch.length; i++) {
//       const s = branch[i - 1];
//       const e = branch[i];
//       const n = Math.max(1, Math.ceil(dist(s, e) / STEP));
//       for (let k = 0; k <= n; k++) {
//         const q = {
//           x: s.x + ((e.x - s.x) * k) / n,
//           y: s.y + ((e.y - s.y) * k) / n,
//         };
//         if (dist(q, junction) <= skip) continue;
//         let near = distToPolyline(q, p.points);
//         for (let bj = 0; bj < branches.length; bj++) {
//           if (bj !== bi) near = Math.min(near, distToPolyline(q, branches[bj]));
//         }
//         if (near < gapWorld) {
//           issues.push(
//             "막다른 길이 다른 통로에 너무 가까움(추가 갈림길/지름길)",
//           );
//           return issues;
//         }
//       }
//     }
//   }
//   return issues;
// }

// function validate(
//   p: WorldPath,
//   config: LevelConfig,
//   rules: ValidationRules,
//   H: number,
//   W: number,
// ): string[] {
//   const issues: string[] = [];
//   const pts = refPoints(p);

//   if (pts.some((q) => !Number.isFinite(q.x) || !Number.isFinite(q.y))) {
//     return ["좌표가 유효하지 않음"];
//   }

//   // 4. 게임 보드 영역 안 (+ 7. 쇠구슬이 도달 가능한 위치)
//   const m = rules.boardMargin - EPS;
//   if (pts.some((q) => q.x < m || q.x > 1 - m || q.y < m || q.y > H - m)) {
//     issues.push("경로가 게임 보드 영역을 벗어남");
//   }

//   // 6. 시작점과 목적지가 충분히 떨어져 있음
//   if (dist(p.start, p.goal) < rules.minStartGoalDistance - EPS) {
//     issues.push("시작점과 목적지가 너무 가까움");
//   }

//   if (p.points.length >= 2) {
//     // 2. 하나로 연결 (끊김/중복점 없음)
//     for (let i = 1; i < p.points.length; i++) {
//       if (dist(p.points[i - 1], p.points[i]) < EPS) {
//         issues.push("경로에 길이 0인 구간이 있음");
//         break;
//       }
//     }
//     // 5. 자기 교차 없음
//     if (hasSelfIntersection(p.points)) issues.push("경로가 자기 자신과 교차함");
//   }

//   // 8. 제한 시간 안에 도전할 수 있는 길이
//   const required = pathLengthOf(p) / config.timeLimitSeconds;
//   if (required > rules.maxRequiredSpeed)
//     issues.push("제한 시간에 비해 경로가 너무 김");

//   // 나선: 중심부가 너무 좁지 않음
//   if (
//     p.ringSpacing !== undefined &&
//     p.ringSpacing < rules.minRingSpacing - EPS
//   ) {
//     issues.push("나선 간격이 너무 좁음");
//   }
//   issues.push(...validateWalls(p, config, W));
//   if (config.levelType === LevelType.BRANCHED) {
//     issues.push(...validateBranchedMaze(p, config, W, 1));
//   } else if (config.levelType === LevelType.MULTI_BRANCHED) {
//     issues.push(...validateBranchedMaze(p, config, W, config.junctionCount));
//   }
//   return issues;
// }

// // ── 4) 공개 API ───────────────────────────────────────────────

// export function generateRound(
//   config: LevelConfig,
//   roundIndex: number,
//   options: GenerateOptions,
// ): GeneratedRound {
//   const aspect = options.boardAspect;
//   if (!Number.isFinite(aspect) || aspect <= 0) {
//     throw new RangeError(
//       `[LevelGenerator] boardAspect 가 올바르지 않습니다: ${aspect}`,
//     );
//   }
//   if (
//     !Number.isInteger(roundIndex) ||
//     roundIndex < 0 ||
//     roundIndex >= config.roundCount
//   ) {
//     throw new RangeError(
//       `[LevelGenerator] roundIndex 범위 오류: ${roundIndex} (0~${config.roundCount - 1})`,
//     );
//   }

//   const H = 1 / aspect; // 보드 너비를 1로 봤을 때의 높이
//   let rules: ValidationRules = { ...DEFAULT_RULES, ...config.rules };
//   const W = options.boardWidthPx ?? 0;
//   if (config.walls.hasWalls) {
//     if (!(W > 0))
//       throw new RangeError(
//         "[LevelGenerator] 벽이 있는 레벨은 boardWidthPx 가 필요합니다",
//       );
//     // 벽 바깥 면까지 보드 안에 들어오도록 여백을 늘린다
//     const extent = config.walls.corridorWidth / 2 + config.walls.wallThickness;
//     rules = {
//       ...rules,
//       boardMargin: Math.max(rules.boardMargin, extent / W + 0.01),
//     };
//   }
//   const variation: LevelVariation = {
//     ...DEFAULT_VARIATION,
//     ...config.variation,
//   };
//   const seed = hashSeed(options.baseSeed ?? 0, config.levelId, roundIndex);

//   // 랜덤 요소가 꺼져 있으면 몇 번을 다시 만들어도 결과가 같으므로 1회만 시도한다
//   // 랜덤 variant 레벨은 검증에 실패하면 다른 매개변수로 다시 뽑는다 (상한 MAX_RANDOM_ATTEMPTS)
//   const randomized = variation.allowMirror || variation.sizeJitter > 0;
//   const attempts = config.randomVariants
//     ? MAX_RANDOM_ATTEMPTS
//     : randomized
//       ? MAX_ATTEMPTS
//       : 1;

//   let issues: string[] = [];
//   for (let attempt = 0; attempt < attempts; attempt++) {
//     const rng = makeRng(seed + Math.imul(attempt, 0x9e3779b9));
//     const placed = layout(
//       buildRaw(config, roundIndex, rng),
//       H,
//       rules,
//       variation,
//       rng,
//     );
//     issues = validate(placed, config, rules, H, W);
//     if (issues.length === 0) {
//       const t =
//         config.roundCount > 1 ? roundIndex / (config.roundCount - 1) : 0;
//       const toNorm = (q: Point): Point => ({
//         x: round4(q.x),
//         y: round4(q.y / H),
//       });
//       const extra =
//         placed.branches && placed.branches.length > 0
//           ? placed.branches.map((b) => b.map(toNorm))
//           : undefined;
//       return {
//         roundId: `L${config.levelId}-R${roundIndex + 1}`,
//         levelId: config.levelId,
//         roundIndex,
//         levelType: config.levelType,
//         startPosition: toNorm(placed.start),
//         goalPosition: toNorm(placed.goal),
//         pathPoints: placed.points.map(toNorm),
//         extraPathPoints: extra,
//         difficulty: lerp(
//           config.difficultyRange[0],
//           config.difficultyRange[1],
//           t,
//         ),
//         seed,
//         pathLength: round4(pathLengthOf(placed)),
//         boardAspect: aspect,
//         boardWidth: W,
//         boardHeight: W > 0 ? W / aspect : 0,
//       };
//     }
//   }
//   throw new Error(
//     `[LevelGenerator] Level ${config.levelId}(${config.levelType}) Round ${roundIndex + 1} 생성 실패 (${attempts}회 시도): ${issues.join(", ")}`,
//   );
// }

// /** 레벨의 모든 라운드를 한 번에 생성 */
// export function generateLevelRounds(
//   config: LevelConfig,
//   options: GenerateOptions,
// ): GeneratedRound[] {
//   return Array.from({ length: config.roundCount }, (_, i) =>
//     generateRound(config, i, options),
//   );
// }

// /** 정규화 좌표 → 보드 내부 좌표(px). 물리 엔진이 쓰는 좌표와 같은 기준 */
// export function toBoardPoint(
//   p: Point,
//   boardWidth: number,
//   boardHeight: number,
// ): Point {
//   return { x: p.x * boardWidth, y: p.y * boardHeight };
// }

import {
  buildBranched,
  buildMultiBranched,
  buildCircle,
  buildFree,
  buildLShape,
  buildSpiral,
  buildSquareSpiral,
  buildStraight,
  buildWave,
  buildZigzag,
  type WorldPath,
} from "./pathShapes";

import {
  DEFAULT_RULES,
  DEFAULT_VARIATION,
  LevelType,
  type GeneratedRound,
  type LevelConfig,
  type LevelVariation,
  type Point,
  type ValidationRules,
} from "./levelTypes";
import {
  buildCenterline,
  minShortcutGap,
  minTurnRadius,
} from "../physics/collisionGeometry";
import { RANDOM_VARIANT_GENERATORS } from "./randomVariants";

export interface GenerateOptions {
  /** 게임 보드의 가로/세로 비 (width / height). 원이 찌그러지지 않게 하는 데 필요 */
  boardAspect: number;
  /** 보드 가로 길이(px). 벽이 있는 레벨은 통로 폭(px)을 정규화 좌표와 맞추는 데 필요하다 */
  boardWidthPx?: number;
  /**
   * 시드 기준값. 같은 값이면 항상 같은 라운드가 나온다.
   * 레벨(세션)을 시작할 때 한 번 정해서 그 레벨이 끝날 때까지 같은 값을 넘겨야
   * 리렌더링/라운드 재시작에도 미로가 바뀌지 않는다.
   */
  baseSeed?: number;
}

const MAX_ATTEMPTS = 8;
/** 랜덤 variant 생성 시 검증에 실패하면 새 매개변수로 다시 뽑는 최대 횟수 */
const MAX_RANDOM_ATTEMPTS = 60;
const EPS = 1e-6;

// ── 유틸 ───────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** 시드 기반 난수 (mulberry32). Math.random 은 쓰지 않는다 → 재현 가능 */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(baseSeed: number, levelId: number, roundIndex: number) {
  return (
    (Math.imul(baseSeed + 1, 73856093) ^
      Math.imul(levelId, 19349663) ^
      Math.imul(roundIndex + 1, 83492791)) >>>
    0
  );
}

function pick<T>(list: readonly T[], i: number): T {
  if (list.length === 0)
    throw new Error("[LevelGenerator] variants 가 비어 있습니다");
  return list[i % list.length];
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

/** FREE 는 경로가 없으므로 시작/목적지만으로 범위를 계산한다. BRANCHED 는 분기 포함 */
function refPoints(p: WorldPath): Point[] {
  if (p.points.length === 0) return [p.start, p.goal];
  const all = p.points.slice();
  if (p.branches) {
    for (const b of p.branches) all.push(...b);
  }
  return all;
}

function mapPath(p: WorldPath, f: (q: Point) => Point): WorldPath {
  return {
    ...p,
    points: p.points.map(f),
    start: f(p.start),
    goal: f(p.goal),
    branches: p.branches?.map((b) => b.map(f)),
  };
}

function scaleAbout(
  p: WorldPath,
  s: number,
  cx: number,
  cy: number,
): WorldPath {
  const scaled = mapPath(p, (q) => ({
    x: cx + (q.x - cx) * s,
    y: cy + (q.y - cy) * s,
  }));
  if (p.ringSpacing !== undefined) scaled.ringSpacing = p.ringSpacing * s;
  return scaled;
}

// ── 1) 레벨 유형별 원본 형태 ───────────────────────────────────

function buildRaw(
  config: LevelConfig,
  roundIndex: number,
  rng: () => number,
): WorldPath {
  // 랜덤 생성 레벨: 기존 variants 에서 고르지 않고, 레벨 규칙에 맞는 새 매개변수를 뽑아
  // 기존 build 함수(buildSpiral / buildSquareSpiral / buildBranched)에 그대로 넘긴다.
  if (config.randomVariants) {
    switch (config.levelType) {
      case LevelType.SPIRAL:
        return buildSpiral(RANDOM_VARIANT_GENERATORS[LevelType.SPIRAL](rng));
      case LevelType.SQUARE_SPIRAL:
        return buildSquareSpiral(
          RANDOM_VARIANT_GENERATORS[LevelType.SQUARE_SPIRAL](rng),
        );
      case LevelType.BRANCHED:
        return buildBranched(
          RANDOM_VARIANT_GENERATORS[LevelType.BRANCHED](rng),
        );
      case LevelType.MULTI_BRANCHED:
        return buildMultiBranched(
          RANDOM_VARIANT_GENERATORS[LevelType.MULTI_BRANCHED](
            rng,
            config.junctionCount,
          ),
        );
      default:
        throw new Error(
          `[LevelGenerator] ${config.levelType} 은(는) 랜덤 생성을 지원하지 않습니다 (Level ${config.levelId})`,
        );
    }
  }
  switch (config.levelType) {
    case LevelType.FREE:
      return buildFree(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.STRAIGHT:
      return buildStraight(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.L_SHAPE:
      return buildLShape(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.CIRCLE:
      return buildCircle(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.SPIRAL:
      return buildSpiral(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.SQUARE_SPIRAL:
      return buildSquareSpiral(
        pick(config.pathConstraints.variants, roundIndex),
      );
    case LevelType.WAVE:
      return buildWave(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.ZIGZAG:
      return buildZigzag(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.BRANCHED:
      return buildBranched(pick(config.pathConstraints.variants, roundIndex));
    case LevelType.MULTI_BRANCHED:
      return buildMultiBranched(
        pick(config.pathConstraints.variants, roundIndex),
      );
  }
}

// ── 2) 보드 위에 배치: (랜덤 변형) → 중앙 정렬 → 보드에 맞게 축소 → (뒤집기) ──

function layout(
  raw: WorldPath,
  H: number,
  rules: ValidationRules,
  variation: LevelVariation,
  rng: () => number,
): WorldPath {
  let p = raw;

  if (variation.sizeJitter > 0) {
    p = scaleAbout(p, 1 + (rng() * 2 - 1) * variation.sizeJitter, 0, 0);
  }

  // 중앙 정렬
  const pts = refPoints(p);
  const minX = Math.min(...pts.map((q) => q.x));
  const maxX = Math.max(...pts.map((q) => q.x));
  const minY = Math.min(...pts.map((q) => q.y));
  const maxY = Math.max(...pts.map((q) => q.y));
  const ox = 0.5 - (minX + maxX) / 2;
  const oy = H / 2 - (minY + maxY) / 2;
  p = mapPath(p, (q) => ({ x: q.x + ox, y: q.y + oy }));

  // 보드 안에 들어오도록 모양은 그대로 두고 크기만 줄인다 (가로/세로비가 달라도 안전)
  const w = maxX - minX;
  const h = maxY - minY;
  const usableW = 1 - 2 * rules.boardMargin;
  const usableH = H - 2 * rules.boardMargin;
  const s = Math.min(
    1,
    w > EPS ? usableW / w : Infinity,
    h > EPS ? usableH / h : Infinity,
  );
  if (s < 1) p = scaleAbout(p, s, 0.5, H / 2);

  if (variation.allowMirror) {
    const flipX = rng() < 0.5;
    const flipY = rng() < 0.5;
    if (flipX || flipY) {
      p = mapPath(p, (q) => ({
        x: flipX ? 1 - q.x : q.x,
        y: flipY ? H - q.y : q.y,
      }));
    }
  }
  return p;
}

// ── 3) 검증 (기획서 6-1) ──────────────────────────────────────

function pathLengthOf(p: WorldPath): number {
  if (p.points.length < 2) return dist(p.start, p.goal);
  let sum = 0;
  for (let i = 1; i < p.points.length; i++)
    sum += dist(p.points[i - 1], p.points[i]);
  return sum;
}

function cross(o: Point, a: Point, b: Point) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function segmentsCross(a: Point, b: Point, c: Point, d: Point) {
  const d1 = cross(c, d, a);
  const d2 = cross(c, d, b);
  const d3 = cross(a, b, c);
  const d4 = cross(a, b, d);
  return d1 * d2 < -EPS && d3 * d4 < -EPS;
}

function hasSelfIntersection(pts: Point[]): boolean {
  for (let i = 0; i < pts.length - 1; i++) {
    for (let j = i + 2; j < pts.length - 1; j++) {
      if (segmentsCross(pts[i], pts[i + 1], pts[j], pts[j + 1])) return true;
    }
  }
  return false;
}

/** 벽이 있는 레벨 전용 검증: 통로 폭, 통로끼리의 간격, 급한 커브 */
function validateWalls(p: WorldPath, config: LevelConfig, W: number): string[] {
  const walls = config.walls;
  if (!walls.hasWalls || p.points.length < 2) return [];
  const issues: string[] = [];
  const cw = walls.corridorWidth;
  const wt = walls.wallThickness;

  // 쇠구슬이 지나갈 수 있는 폭인가
  if (cw < walls.minCorridorWidth || cw < config.ballRadius * 2 + 8) {
    issues.push("통로 폭이 쇠구슬이 지나가기에 너무 좁음");
  }

  // 월드 좌표(보드 너비 = 1) → px
  const px = p.points.map((q) => ({ x: q.x * W, y: q.y * W }));
  const center = buildCenterline(px, walls.cornerRadius);

  // 경로를 따라 멀리 떨어진 두 구간이 가까우면 통로끼리 붙어 지름길이 생긴다.
  // 사이에 벽(두께 wt)이 들어갈 만큼 떨어져 있어야 한다.
  const gap = minShortcutGap(center, Math.PI * (cw + wt));
  if (gap < cw + wt - 0.5) issues.push("다른 구간의 통로가 서로 너무 가까움");

  // 너무 급한 커브는 안쪽 벽이 뭉개진다
  if (minTurnRadius(center) < cw * 0.35) issues.push("커브가 너무 급함");
  return issues;
}

/** 점 → 선분까지의 거리 */
function distToSegment(q: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const u =
    len2 < EPS
      ? 0
      : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / len2));
  return Math.hypot(q.x - (a.x + dx * u), q.y - (a.y + dy * u));
}

function distToPolyline(q: Point, pts: Point[]): number {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    best = Math.min(best, distToSegment(q, pts[i], pts[i + 1]));
  }
  return best;
}

/** 막다른 길 최소 길이 (보드 너비 = 1). 너무 짧으면 "막다른 길"을 경험하지 못한다 */
const MIN_DEAD_END_LENGTH = 0.2;

const SAME = 1e-4;

/**
 * 실제 통로 연결 그래프로 미로 구조를 분석한다 (화면에 보이는 선의 개수가 아니라 연결 관계 기준).
 *  - 정답 경로와 막다른 길의 모든 선분을 노드(꼭짓점)/간선으로 만들고, 같은 위치의 꼭짓점은 하나로 합친다
 *  - 교차: 서로 다른 두 선분이 꼭짓점이 아닌 곳에서 만나거나, 꼭짓점이 다른 선분 위에 놓이면 새 연결이 생긴 것
 *  - 갈림길 = 차수(연결된 통로 수) 3, 막다른 길 끝 = 차수 1, 4 이상은 금지
 *  - 시작→목적지 경로(트리라서 유일)를 따라가며 만나는 갈림길 수 = 선택 횟수
 */
export interface MazeAnalysis {
  junctions: number;
  deadEnds: number;
  maxDegree: number;
  isTree: boolean;
  connected: boolean;
  /** 시작 → 목적지 정답 경로에서 만난 갈림길 수 */
  choicesOnAnswerPath: number;
  /** 새 연결을 만드는 교차/접촉 수 */
  strayContacts: number;
}

export function analyzeMaze(p: WorldPath): MazeAnalysis {
  const lines: Point[][] = [p.points, ...(p.branches ?? [])];
  const nodes: Point[] = [];
  const nodeOf = (q: Point) => {
    for (let i = 0; i < nodes.length; i++)
      if (dist(nodes[i], q) < SAME) return i;
    nodes.push(q);
    return nodes.length - 1;
  };
  const segs: { a: number; b: number }[] = [];
  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const a = nodeOf(line[i - 1]);
      const b = nodeOf(line[i]);
      if (a !== b) segs.push({ a, b });
    }
  }
  const adj: number[][] = nodes.map(() => []);
  for (const s of segs) {
    adj[s.a].push(s.b);
    adj[s.b].push(s.a);
  }

  // 의도하지 않은 접촉/교차
  let stray = 0;
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      const s = segs[i];
      const t = segs[j];
      if (segmentsCross(nodes[s.a], nodes[s.b], nodes[t.a], nodes[t.b]))
        stray++;
    }
  }
  for (let n = 0; n < nodes.length; n++) {
    for (const s of segs) {
      if (s.a === n || s.b === n) continue;
      if (distToSegment(nodes[n], nodes[s.a], nodes[s.b]) < SAME) stray++;
    }
  }

  const deg = adj.map((a) => a.length);
  const junctions = deg.filter((d) => d === 3).length;
  const deadEnds = deg.filter((d) => d === 1).length;
  const maxDegree = Math.max(0, ...deg);

  // 연결성 + 시작→목적지 경로(BFS)
  const s0 = nodeOf(p.start);
  const g0 = nodeOf(p.goal);
  const prev = new Array<number>(nodes.length).fill(-2);
  prev[s0] = -1;
  const queue = [s0];
  for (let qi = 0; qi < queue.length; qi++) {
    for (const m of adj[queue[qi]]) {
      if (prev[m] === -2) {
        prev[m] = queue[qi];
        queue.push(m);
      }
    }
  }
  const connected = queue.length === nodes.length;
  let choices = 0;
  if (prev[g0] !== -2) {
    for (let n = g0; n !== -1; n = prev[n]) if (deg[n] === 3) choices++;
  }
  return {
    junctions,
    deadEnds,
    maxDegree,
    isTree: connected && segs.length === nodes.length - 1,
    connected,
    choicesOnAnswerPath: choices,
    strayContacts: stray,
  };
}

/**
 * 갈림길 미로(Level 8, 9, …) 전용 검증. expected = 갈림길(= 막다른 길) 수.
 *  - 갈림길은 정확히 expected 개, 막다른 길도 expected 개, 정답 경로 위에서 expected 번 선택한다
 *  - 갈림길마다 선택지는 2개(차수 3), 서로 다른 곳에 있고 시작/목적지가 아니다
 *  - 막다른 길은 갈림길 근처를 빼면 다른 통로와 만나거나 너무 가까워지지 않는다
 *    (가까우면 통로끼리 붙어 지름길·추가 갈림길이 생긴다)
 *  - 잘못 들어가도 같은 갈림길로 되돌아올 수 있다 (막다른 길의 한쪽 끝이 갈림길)
 */
function validateBranchedMaze(
  p: WorldPath,
  config: LevelConfig,
  W: number,
  expected: number,
): string[] {
  const issues: string[] = [];
  const branches = p.branches ?? [];
  if (branches.length !== expected) {
    return [`막다른 길이 정확히 ${expected}개가 아님`];
  }
  if (branches.some((b) => b.length < 2)) return ["막다른 길 점열이 부족함"];

  // 각 갈림길 = 막다른 길의 첫 점. 정답 경로의 서로 다른 중간 꼭짓점이어야 한다
  const jIdxs: number[] = [];
  for (const branch of branches) {
    const jIdx = p.points.findIndex((q) => dist(q, branch[0]) < SAME);
    if (jIdx < 0) return ["갈림길이 정답 경로 위에 있지 않음"];
    if (jIdx === 0 || jIdx === p.points.length - 1) {
      issues.push("갈림길이 시작점이나 목적지에 있음");
    }
    if (jIdxs.includes(jIdx)) issues.push("한 곳에서 갈림길이 겹침");
    jIdxs.push(jIdx);
  }

  // 실제 연결 구조 (기획: 선의 개수가 아니라 통로 연결 관계로 판단)
  const a = analyzeMaze(p);
  if (a.junctions !== expected) issues.push("갈림길 수가 규칙과 다름");
  if (a.deadEnds !== expected + 2)
    issues.push("막다른 길/출발/도착 끝점 수가 규칙과 다름");
  if (a.maxDegree > 3) issues.push("한 곳에서 선택지가 3개 이상");
  if (!a.isTree) issues.push("통로가 끊겼거나 순환/교차가 있음");
  if (a.strayContacts > 0) issues.push("의도하지 않은 통로 접촉/교차");
  if (a.choicesOnAnswerPath !== expected)
    issues.push("정답 경로의 선택 횟수가 규칙과 다름");

  const w = config.walls;
  const gapWorld =
    w.hasWalls && W > 0 ? (w.corridorWidth + w.wallThickness - 0.5) / W : 0;
  const skip = gapWorld * 1.5; // 갈림길 주변(T자 합류부)은 가까운 게 정상
  const STEP = 0.01;

  for (let bi = 0; bi < branches.length; bi++) {
    const branch = branches[bi];
    const junction = branch[0];

    // 막다른 길 길이
    let deadLen = 0;
    for (let i = 1; i < branch.length; i++)
      deadLen += dist(branch[i - 1], branch[i]);
    if (deadLen < MIN_DEAD_END_LENGTH) issues.push("막다른 길이 너무 짧음");

    // 막다른 길의 모든 점은 갈림길에서 멀어질수록 정답 경로·다른 막다른 길에서도 멀어져야 한다
    for (let i = 1; i < branch.length; i++) {
      const s = branch[i - 1];
      const e = branch[i];
      const n = Math.max(1, Math.ceil(dist(s, e) / STEP));
      for (let k = 0; k <= n; k++) {
        const q = {
          x: s.x + ((e.x - s.x) * k) / n,
          y: s.y + ((e.y - s.y) * k) / n,
        };
        if (dist(q, junction) <= skip) continue;
        let near = distToPolyline(q, p.points);
        for (let bj = 0; bj < branches.length; bj++) {
          if (bj !== bi) near = Math.min(near, distToPolyline(q, branches[bj]));
        }
        if (near < gapWorld) {
          issues.push(
            "막다른 길이 다른 통로에 너무 가까움(추가 갈림길/지름길)",
          );
          return issues;
        }
      }
    }
  }
  return issues;
}

function validate(
  p: WorldPath,
  config: LevelConfig,
  rules: ValidationRules,
  H: number,
  W: number,
): string[] {
  const issues: string[] = [];
  const pts = refPoints(p);

  if (pts.some((q) => !Number.isFinite(q.x) || !Number.isFinite(q.y))) {
    return ["좌표가 유효하지 않음"];
  }

  // 4. 게임 보드 영역 안 (+ 7. 쇠구슬이 도달 가능한 위치)
  const m = rules.boardMargin - EPS;
  if (pts.some((q) => q.x < m || q.x > 1 - m || q.y < m || q.y > H - m)) {
    issues.push("경로가 게임 보드 영역을 벗어남");
  }

  // 6. 시작점과 목적지가 충분히 떨어져 있음
  if (dist(p.start, p.goal) < rules.minStartGoalDistance - EPS) {
    issues.push("시작점과 목적지가 너무 가까움");
  }

  if (p.points.length >= 2) {
    // 2. 하나로 연결 (끊김/중복점 없음)
    for (let i = 1; i < p.points.length; i++) {
      if (dist(p.points[i - 1], p.points[i]) < EPS) {
        issues.push("경로에 길이 0인 구간이 있음");
        break;
      }
    }
    // 5. 자기 교차 없음
    if (hasSelfIntersection(p.points)) issues.push("경로가 자기 자신과 교차함");
  }

  // 8. 제한 시간 안에 도전할 수 있는 길이
  const required = pathLengthOf(p) / config.timeLimitSeconds;
  if (required > rules.maxRequiredSpeed)
    issues.push("제한 시간에 비해 경로가 너무 김");

  // 나선: 중심부가 너무 좁지 않음
  if (
    p.ringSpacing !== undefined &&
    p.ringSpacing < rules.minRingSpacing - EPS
  ) {
    issues.push("나선 간격이 너무 좁음");
  }
  issues.push(...validateWalls(p, config, W));
  if (config.levelType === LevelType.BRANCHED) {
    issues.push(...validateBranchedMaze(p, config, W, 1));
  } else if (config.levelType === LevelType.MULTI_BRANCHED) {
    issues.push(...validateBranchedMaze(p, config, W, config.junctionCount));
  }
  return issues;
}

// ── 4) 공개 API ───────────────────────────────────────────────

export function generateRound(
  config: LevelConfig,
  roundIndex: number,
  options: GenerateOptions,
): GeneratedRound {
  const aspect = options.boardAspect;
  if (!Number.isFinite(aspect) || aspect <= 0) {
    throw new RangeError(
      `[LevelGenerator] boardAspect 가 올바르지 않습니다: ${aspect}`,
    );
  }
  if (
    !Number.isInteger(roundIndex) ||
    roundIndex < 0 ||
    roundIndex >= config.roundCount
  ) {
    throw new RangeError(
      `[LevelGenerator] roundIndex 범위 오류: ${roundIndex} (0~${config.roundCount - 1})`,
    );
  }

  const H = 1 / aspect; // 보드 너비를 1로 봤을 때의 높이
  let rules: ValidationRules = { ...DEFAULT_RULES, ...config.rules };
  const W = options.boardWidthPx ?? 0;
  if (config.walls.hasWalls) {
    if (!(W > 0))
      throw new RangeError(
        "[LevelGenerator] 벽이 있는 레벨은 boardWidthPx 가 필요합니다",
      );
    // 벽 바깥 면까지 보드 안에 들어오도록 여백을 늘린다
    const extent = config.walls.corridorWidth / 2 + config.walls.wallThickness;
    rules = {
      ...rules,
      boardMargin: Math.max(rules.boardMargin, extent / W + 0.01),
    };
  }
  const variation: LevelVariation = {
    ...DEFAULT_VARIATION,
    ...config.variation,
  };
  const seed = hashSeed(options.baseSeed ?? 0, config.levelId, roundIndex);

  // 랜덤 요소가 꺼져 있으면 몇 번을 다시 만들어도 결과가 같으므로 1회만 시도한다
  // 랜덤 variant 레벨은 검증에 실패하면 다른 매개변수로 다시 뽑는다 (상한 MAX_RANDOM_ATTEMPTS)
  const randomized = variation.allowMirror || variation.sizeJitter > 0;
  const attempts = config.randomVariants
    ? MAX_RANDOM_ATTEMPTS
    : randomized
      ? MAX_ATTEMPTS
      : 1;

  let issues: string[] = [];
  for (let attempt = 0; attempt < attempts; attempt++) {
    const rng = makeRng(seed + Math.imul(attempt, 0x9e3779b9));
    // 랜덤 variant 생성기가 (드물게) 조건에 맞는 매개변수를 못 찾으면 이번 시도만 버리고 다시 뽑는다
    let raw: WorldPath;
    try {
      raw = buildRaw(config, roundIndex, rng);
    } catch (e) {
      if (!config.randomVariants) throw e;
      issues = [e instanceof Error ? e.message : String(e)];
      continue;
    }
    const placed = layout(raw, H, rules, variation, rng);
    issues = validate(placed, config, rules, H, W);
    if (issues.length === 0) {
      const t =
        config.roundCount > 1 ? roundIndex / (config.roundCount - 1) : 0;
      const toNorm = (q: Point): Point => ({
        x: round4(q.x),
        y: round4(q.y / H),
      });
      const extra =
        placed.branches && placed.branches.length > 0
          ? placed.branches.map((b) => b.map(toNorm))
          : undefined;
      return {
        roundId: `L${config.levelId}-R${roundIndex + 1}`,
        levelId: config.levelId,
        roundIndex,
        levelType: config.levelType,
        startPosition: toNorm(placed.start),
        goalPosition: toNorm(placed.goal),
        pathPoints: placed.points.map(toNorm),
        extraPathPoints: extra,
        difficulty: lerp(
          config.difficultyRange[0],
          config.difficultyRange[1],
          t,
        ),
        seed,
        pathLength: round4(pathLengthOf(placed)),
        boardAspect: aspect,
        boardWidth: W,
        boardHeight: W > 0 ? W / aspect : 0,
      };
    }
  }
  throw new Error(
    `[LevelGenerator] Level ${config.levelId}(${config.levelType}) Round ${roundIndex + 1} 생성 실패 (${attempts}회 시도): ${issues.join(", ")}`,
  );
}

/** 레벨의 모든 라운드를 한 번에 생성 */
export function generateLevelRounds(
  config: LevelConfig,
  options: GenerateOptions,
): GeneratedRound[] {
  return Array.from({ length: config.roundCount }, (_, i) =>
    generateRound(config, i, options),
  );
}

/** 정규화 좌표 → 보드 내부 좌표(px). 물리 엔진이 쓰는 좌표와 같은 기준 */
export function toBoardPoint(
  p: Point,
  boardWidth: number,
  boardHeight: number,
): Point {
  return { x: p.x * boardWidth, y: p.y * boardHeight };
}
