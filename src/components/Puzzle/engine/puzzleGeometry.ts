import type { PuzzlePieceData } from "./puzzleTypes";

/** 조각의 실루엣 경로를 보드와 드래그 조각에서 동일하게 사용하기 위한 유틸리티. */
export function getPiecePath(piece: PuzzlePieceData): string {
  return piece.path;
}

export function getPieceRenderBounds(piece: PuzzlePieceData) {
  return {
    x: piece.viewBoxX,
    y: piece.viewBoxY,
    width: piece.viewBoxWidth,
    height: piece.viewBoxHeight,
  };
}

export function getPieceBoardOrigin(
  piece: PuzzlePieceData,
  cellWidth: number,
  cellHeight: number,
) {
  const scaleX = cellWidth / piece.sourceWidth;
  const scaleY = cellHeight / piece.sourceHeight;
  return {
    x: piece.sourceX * scaleX - (piece.sourceX - piece.viewBoxX) * scaleX,
    y: piece.sourceY * scaleY - (piece.sourceY - piece.viewBoxY) * scaleY,
  };
}
