export interface PuzzleGridConfig {
  rows: number;
  columns: number;
}

export const PUZZLE_GRIDS: Record<number, PuzzleGridConfig> = {
  2: { rows: 1, columns: 2 },
  3: { rows: 1, columns: 3 },
  4: { rows: 2, columns: 2 },
  6: { rows: 2, columns: 3 },
  8: { rows: 2, columns: 4 },
  9: { rows: 3, columns: 3 },
  12: { rows: 3, columns: 4 },
};

export function getPuzzleGrid(pieceCount: number): PuzzleGridConfig {
  return PUZZLE_GRIDS[pieceCount] ?? { rows: 2, columns: 2 };
}
