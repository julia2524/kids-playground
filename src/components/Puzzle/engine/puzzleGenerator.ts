import type { PuzzlePieceData } from "./puzzleTypes";

export function createPuzzlePieces(
  viewBoxWidth: number,
  viewBoxHeight: number,
  rows: number,
  columns: number,
): PuzzlePieceData[] {
  const pieces: PuzzlePieceData[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      pieces.push({
        id: `${row}-${column}`,
        row,
        column,
        sourceX: (viewBoxWidth / columns) * column,
        sourceY: (viewBoxHeight / rows) * row,
        sourceWidth: viewBoxWidth / columns,
        sourceHeight: viewBoxHeight / rows,
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
