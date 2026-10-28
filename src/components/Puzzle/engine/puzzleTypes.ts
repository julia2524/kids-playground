// import React from "react";

// export interface PuzzleArtworkProps {
//   width?: number | string;
//   height?: number | string;
// }

// export type PuzzleArtworkComponent = React.ComponentType<PuzzleArtworkProps>;

// export interface PuzzlePieceData {
//   id: string;
//   row: number;
//   column: number;
//   sourceX: number;
//   sourceY: number;
//   sourceWidth: number;
//   sourceHeight: number;
// }

// export interface PuzzlePiecePosition {
//   x: number;
//   y: number;
//   placed: boolean;
// }

// export interface PuzzleBoardProps {
//   Artwork: PuzzleArtworkComponent;
//   viewBoxWidth?: number;
//   viewBoxHeight?: number;
//   rows?: number;
//   columns?: number;
//   boardAspectRatio?: number;
//   onComplete?: (wrongDropCount: number) => void;
//   title?: string;
// }

import React from "react";

export interface PuzzleArtworkProps {
  width?: number | string;
  height?: number | string;
}

export type PuzzleArtworkComponent = React.ComponentType<PuzzleArtworkProps>;

export interface PuzzlePieceData {
  id: string;
  row: number;
  column: number;
  // 조각의 "기본 사각 칸" 영역 (viewBox 좌표계)
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  // 돌기/홈이 포함된 조각 외곽선 (viewBox 절대 좌표 SVG path)
  path: string;
  // 퍼즐 가이드선용 path (겹치지 않게 위쪽/왼쪽 경계만 포함)
  guidePath: string;
  // 돌기가 칸 밖으로 튀어나오는 여유 공간 (viewBox 단위)
  margin: number;
}

export interface PuzzlePiecePosition {
  x: number;
  y: number;
  placed: boolean;
}

export interface PuzzleBoardProps {
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  rows?: number;
  columns?: number;
  boardAspectRatio?: number;
  onComplete?: (wrongDropCount: number) => void;
  title?: string;
}
