/**
 * 눈에 보이는 게임판(Visible board) 과 실제 자석미로판(Maze) 의 크기 분리.
 *
 *   VisibleBoard (w × h)
 *   └─ 투명 여유 공간 (margin)  ← 자석펜/자석 끝은 갈 수 있지만 구슬은 못 간다
 *      └─ Maze (mazeW × mazeH)  ← 벽/통로/구슬/물리 좌표의 기준 (0,0 = 미로 왼쪽 위)
 *
 * 물리/벽/구슬 좌표는 모두 "미로 사각형" 기준이고, 화면 터치(보드 기준)만 margin 을 빼서 변환한다.
 */
export type BoardLayout = {
  /** 눈에 보이는 게임판 크기(px) */
  boardW: number;
  boardH: number;
  /** 투명 여유 공간 두께(px) */
  margin: number;
  /** 실제 미로 크기(px) */
  mazeW: number;
  mazeH: number;
};

const MIN_MARGIN = 16;
const MARGIN_RATIO = 0.06;

export function computeBoardLayout(boardW: number, boardH: number): BoardLayout {
  const margin = Math.max(
    MIN_MARGIN,
    Math.round(Math.min(boardW, boardH) * MARGIN_RATIO),
  );
  return {
    boardW,
    boardH,
    margin,
    mazeW: Math.max(1, boardW - margin * 2),
    mazeH: Math.max(1, boardH - margin * 2),
  };
}
