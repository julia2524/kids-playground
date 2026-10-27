import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";

interface Props {
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  pieces: PuzzlePieceData[];
  rows: number;
  columns: number;
  width: number;
  height: number;
}

export default function PuzzleTargetBoard({
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  pieces,
  rows,
  columns,
  width,
  height,
}: Props) {
  return (
    <View style={[styles.board, { width, height }]}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={styles.faintArtwork}>
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="none"
          >
            <Artwork width={viewBoxWidth} height={viewBoxHeight} />
          </Svg>
        </View>
      </View>

      <Svg
        pointerEvents="none"
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
      >
        {pieces.map((piece) => (
          <Rect
            key={piece.id}
            x={piece.sourceX}
            y={piece.sourceY}
            width={piece.sourceWidth}
            height={piece.sourceHeight}
            fill="none"
            stroke="#52647A"
            strokeWidth={0.8}
            strokeDasharray="3 2"
            opacity={0.72}
          />
        ))}
        <Rect
          x={0.5}
          y={0.5}
          width={viewBoxWidth - 1}
          height={viewBoxHeight - 1}
          fill="none"
          stroke="#39465D"
          strokeWidth={1}
          rx={2}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  faintArtwork: {
    ...StyleSheet.absoluteFill,
    opacity: 0.22,
  },
});
