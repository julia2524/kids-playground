// import type { PuzzlePieceData } from "./puzzleTypes";

// export function createPuzzlePieces(
//   viewBoxWidth: number,
//   viewBoxHeight: number,
//   rows: number,
//   columns: number,
// ): PuzzlePieceData[] {
//   const pieces: PuzzlePieceData[] = [];

//   for (let row = 0; row < rows; row += 1) {
//     for (let column = 0; column < columns; column += 1) {
//       pieces.push({
//         id: `${row}-${column}`,
//         row,
//         column,
//         sourceX: (viewBoxWidth / columns) * column,
//         sourceY: (viewBoxHeight / rows) * row,
//         sourceWidth: viewBoxWidth / columns,
//         sourceHeight: viewBoxHeight / rows,
//       });
//     }
//   }

//   return pieces;
// }

// export function shuffleArray<T>(items: T[]): T[] {
//   const result = [...items];
//   for (let i = result.length - 1; i > 0; i -= 1) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [result[i], result[j]] = [result[j], result[i]];
//   }
//   return result;
// }

import type { PuzzlePieceData } from "./puzzleTypes";

type Pt = [number, number];

type Seg = { type: "L"; p: Pt } | { type: "C"; c1: Pt; c2: Pt; p: Pt };

interface EdgeShape {
  start: Pt;
  end: Pt;
  segs: Seg[];
}

// ------------------------------------------------------------
// 돌기 모양 설정
// ------------------------------------------------------------
// 돌기 깊이 (칸 짧은 변 기준 비율)
const KNOB_DEPTH = 0.27;
// 돌기 머리 너비 배율
const KNOB_WIDTH_SCALE = 1.15;
// 돌기가 튀어나와도 잘리지 않도록 확보하는 여유 공간 비율
const MARGIN_RATIO = 0.38;

export function getPieceMargin(sourceWidth: number, sourceHeight: number) {
  return Math.min(sourceWidth, sourceHeight) * MARGIN_RATIO;
}

const num = (value: number) => Math.round(value * 100) / 100;
const fmt = (p: Pt) => `${num(p[0])} ${num(p[1])}`;

function flatEdge(start: Pt, end: Pt): EdgeShape {
  return { start, end, segs: [{ type: "L", p: end }] };
}

/**
 * start → end 방향의 모서리를 만든다.
 * normal: 돌기가 튀어나가는 방향의 단위 벡터
 */
function knobEdge(start: Pt, end: Pt, normal: Pt, unit: number): EdgeShape {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.hypot(dx, dy);
  const dir: Pt = [dx / length, dy / length];

  // 돌기 위치와 크기를 조금씩 랜덤하게
  const center = 0.5 + (Math.random() - 0.5) * 0.16;
  const depth = KNOB_DEPTH * unit * (0.94 + Math.random() * 0.14);
  const w = KNOB_WIDTH_SCALE * unit;

  // t: 모서리 방향 (w 단위), u: 돌기 방향 (depth 비율)
  const at = (t: number, u: number): Pt => [
    start[0] + dir[0] * (center * length + t * w) + normal[0] * u * depth,
    start[1] + dir[1] * (center * length + t * w) + normal[1] * u * depth,
  ];

  const segs: Seg[] = [
    { type: "L", p: at(-0.09, 0) },
    { type: "C", c1: at(-0.07, 0.1), c2: at(-0.07, 0.2), p: at(-0.07, 0.3) },
    { type: "C", c1: at(-0.17, 0.4), c2: at(-0.16, 1.0), p: at(0, 1.0) },
    { type: "C", c1: at(0.16, 1.0), c2: at(0.17, 0.4), p: at(0.07, 0.3) },
    { type: "C", c1: at(0.07, 0.2), c2: at(0.07, 0.1), p: at(0.09, 0) },
    { type: "L", p: end },
  ];

  return { start, end, segs };
}

function segsToString(segs: Seg[]): string {
  return segs
    .map((seg) =>
      seg.type === "L"
        ? `L ${fmt(seg.p)}`
        : `C ${fmt(seg.c1)} ${fmt(seg.c2)} ${fmt(seg.p)}`,
    )
    .join(" ");
}

// 같은 모서리를 반대 방향으로 지나갈 때 사용
function reverseSegs(edge: EdgeShape): Seg[] {
  const points: Pt[] = [edge.start, ...edge.segs.map((seg) => seg.p)];
  const result: Seg[] = [];

  for (let i = edge.segs.length - 1; i >= 0; i -= 1) {
    const seg = edge.segs[i];
    const to = points[i];

    if (seg.type === "L") {
      result.push({ type: "L", p: to });
    } else {
      result.push({ type: "C", c1: seg.c2, c2: seg.c1, p: to });
    }
  }

  return result;
}

export function createPuzzlePieces(
  viewBoxWidth: number,
  viewBoxHeight: number,
  rows: number,
  columns: number,
): PuzzlePieceData[] {
  const cellW = viewBoxWidth / columns;
  const cellH = viewBoxHeight / rows;
  const unit = Math.min(cellW, cellH);
  const margin = getPieceMargin(cellW, cellH);

  const randomSign = () => (Math.random() < 0.5 ? 1 : -1);

  // 가로 경계선 h[r][c]: r번째 줄의 위쪽 경계, 왼쪽 → 오른쪽
  // sign = +1 이면 위쪽 조각의 돌기가 아래로 튀어나옴
  const h: EdgeShape[][] = [];
  for (let r = 0; r <= rows; r += 1) {
    h[r] = [];
    for (let c = 0; c < columns; c += 1) {
      const a: Pt = [c * cellW, r * cellH];
      const b: Pt = [(c + 1) * cellW, r * cellH];
      h[r][c] =
        r === 0 || r === rows
          ? flatEdge(a, b)
          : knobEdge(a, b, [0, randomSign()], unit);
    }
  }

  // 세로 경계선 v[c][r]: c번째 칸의 왼쪽 경계, 위 → 아래
  // sign = +1 이면 왼쪽 조각의 돌기가 오른쪽으로 튀어나옴
  const v: EdgeShape[][] = [];
  for (let c = 0; c <= columns; c += 1) {
    v[c] = [];
    for (let r = 0; r < rows; r += 1) {
      const a: Pt = [c * cellW, r * cellH];
      const b: Pt = [c * cellW, (r + 1) * cellH];
      v[c][r] =
        c === 0 || c === columns
          ? flatEdge(a, b)
          : knobEdge(a, b, [randomSign(), 0], unit);
    }
  }

  const pieces: PuzzlePieceData[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const top = h[row][column];
      const bottom = h[row + 1][column];
      const left = v[column][row];
      const right = v[column + 1][row];

      const path = [
        `M ${fmt(top.start)}`,
        segsToString(top.segs), // 위: 왼 → 오
        segsToString(right.segs), // 오른쪽: 위 → 아래
        segsToString(reverseSegs(bottom)), // 아래: 오 → 왼
        segsToString(reverseSegs(left)), // 왼쪽: 아래 → 위
        "Z",
      ].join(" ");

      const guideParts: string[] = [];
      if (row > 0) {
        guideParts.push(`M ${fmt(top.start)} ${segsToString(top.segs)}`);
      }
      if (column > 0) {
        guideParts.push(`M ${fmt(left.start)} ${segsToString(left.segs)}`);
      }

      pieces.push({
        id: `${row}-${column}`,
        row,
        column,
        sourceX: cellW * column,
        sourceY: cellH * row,
        sourceWidth: cellW,
        sourceHeight: cellH,
        path,
        guidePath: guideParts.join(" "),
        margin,
      });
    }
  }

  return pieces;
}

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
