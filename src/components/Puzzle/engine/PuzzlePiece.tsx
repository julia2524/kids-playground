import React, { useMemo, useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";

interface Props {
  piece: PuzzlePieceData;
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  targetWidth: number;
  targetHeight: number;
  placed: boolean;
  onMove: (pieceId: string, x: number, y: number) => void;
  onDrop: (pieceId: string, x: number, y: number) => void;
}

export default function PuzzlePiece({
  piece,
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  x,
  y,
  width,
  height,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  placed,
  onMove,
  onDrop,
}: Props) {
  const start = useRef({ x, y });
  const currentPosition = useRef({ x, y });
  currentPosition.current = { x, y };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !placed,
        onMoveShouldSetPanResponder: (_, gesture) =>
          !placed && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),
        onPanResponderGrant: () => {
          start.current = { ...currentPosition.current };
        },
        onPanResponderMove: (_, gesture) => {
          onMove(
            piece.id,
            start.current.x + gesture.dx,
            start.current.y + gesture.dy,
          );
        },
        onPanResponderRelease: (_, gesture) => {
          onDrop(
            piece.id,
            start.current.x + gesture.dx,
            start.current.y + gesture.dy,
          );
        },
        onPanResponderTerminate: (_, gesture) => {
          onDrop(
            piece.id,
            start.current.x + gesture.dx,
            start.current.y + gesture.dy,
          );
        },
      }),
    [piece.id, placed, onMove, onDrop],
  );

  const renderWidth = placed ? targetWidth : width;
  const renderHeight = placed ? targetHeight : height;
  const renderX = placed ? targetX : x;
  const renderY = placed ? targetY : y;

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.piece,
        {
          left: renderX,
          top: renderY,
          width: renderWidth,
          height: renderHeight,
          zIndex: placed ? 1 : 10,
          opacity: placed ? 1 : 0.98,
        },
        !placed && styles.loosePiece,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`${piece.sourceX} ${piece.sourceY} ${piece.sourceWidth} ${piece.sourceHeight}`}
        preserveAspectRatio="none"
      >
        <Artwork width={viewBoxWidth} height={viewBoxHeight} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.01)",
  },
  loosePiece: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#39465D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 4,
  },
});
