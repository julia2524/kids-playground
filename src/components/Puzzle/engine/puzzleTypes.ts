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
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
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
  onComplete?: () => void;
  title?: string;
}
