export type PuzzleLevelConfig = {
  level: number;
  rows: number;
  columns: number;
  pieceCount: number;
};

export const PUZZLE_LEVELS: PuzzleLevelConfig[] = [
  { level: 1, rows: 1, columns: 2, pieceCount: 2 },
  { level: 2, rows: 2, columns: 1, pieceCount: 2 },
  { level: 3, rows: 2, columns: 2, pieceCount: 4 },
  { level: 4, rows: 2, columns: 3, pieceCount: 6 },
  { level: 5, rows: 3, columns: 2, pieceCount: 6 },
  { level: 6, rows: 2, columns: 4, pieceCount: 8 },
  { level: 7, rows: 4, columns: 2, pieceCount: 8 },
  { level: 8, rows: 3, columns: 4, pieceCount: 12 },
  { level: 9, rows: 4, columns: 3, pieceCount: 12 },
  { level: 10, rows: 4, columns: 4, pieceCount: 16 },
];

export const TOTAL_PUZZLE_LEVELS = PUZZLE_LEVELS.length;

export function getPuzzleLevelConfig(level: number): PuzzleLevelConfig {
  return PUZZLE_LEVELS.find((item) => item.level === level) ?? PUZZLE_LEVELS[0];
}

export function getPuzzleStars(wrongDropCount: number): number {
  return Math.max(0, 5 - Math.max(0, wrongDropCount));
}
