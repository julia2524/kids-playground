import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import Svg from "react-native-svg";
import styled, { css } from "styled-components/native";

import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";

import { triggerHaptic } from "../../../utils/haptic";

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
  const [isDragging, setIsDragging] = useState(false);

  const renderWidth = placed ? targetWidth : width;
  const renderHeight = placed ? targetHeight : height;
  const renderX = placed ? targetX : x;
  const renderY = placed ? targetY : y;

  // 조각의 실제 화면 위치를 Animated 값으로 관리한다.
  // 드래그 도중에는 부모의 React state를 갱신하지 않는다.
  const position = useRef(
    new Animated.ValueXY({
      x: renderX,
      y: renderY,
    }),
  ).current;

  const start = useRef({
    x: renderX,
    y: renderY,
  });

  // 부모에서 좌표가 바뀌었을 때만 Animated 좌표를 동기화한다.
  // 드래그 중 isDragging 상태가 바뀌는 것만으로는 위치를 초기화하지 않는다.
  useEffect(() => {
    position.setValue({
      x: renderX,
      y: renderY,
    });
  }, [position, renderX, renderY]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !placed,

        onMoveShouldSetPanResponder: (_, gesture) =>
          !placed && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),

        onPanResponderGrant: () => {
          start.current = {
            x: renderX,
            y: renderY,
          };

          setIsDragging(true);
          triggerHaptic("light");
        },

        // 핵심 변경: 움직일 때마다 부모의 onMove를 호출하지 않는다.
        onPanResponderMove: (_, gesture) => {
          position.setValue({
            x: start.current.x + gesture.dx,
            y: start.current.y + gesture.dy,
          });
        },

        // 손을 놓을 때만 부모에 최종 좌표를 전달한다.
        onPanResponderRelease: (_, gesture) => {
          const finalX = start.current.x + gesture.dx;
          const finalY = start.current.y + gesture.dy;

          position.setValue({
            x: finalX,
            y: finalY,
          });

          onDrop(piece.id, finalX, finalY);

          setIsDragging(false);
          triggerHaptic("light");
        },

        onPanResponderTerminate: (_, gesture) => {
          const finalX = start.current.x + gesture.dx;
          const finalY = start.current.y + gesture.dy;

          position.setValue({
            x: finalX,
            y: finalY,
          });

          onDrop(piece.id, finalX, finalY);
          setIsDragging(false);
        },
      }),
    [piece.id, placed, renderX, renderY, position, onDrop],
  );

  return (
    <Piece
      {...panResponder.panHandlers}
      placed={placed}
      isDragging={isDragging}
      style={{
        left: 0,
        top: 0,
        width: renderWidth,
        height: renderHeight,
        transform: position.getTranslateTransform(),
        zIndex: isDragging ? 999 : placed ? 1 : 10,
        elevation: isDragging ? 20 : placed ? 1 : 4,
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`${piece.sourceX} ${piece.sourceY} ${piece.sourceWidth} ${piece.sourceHeight}`}
        preserveAspectRatio="none"
      >
        <Artwork width={viewBoxWidth} height={viewBoxHeight} />
      </Svg>
    </Piece>
  );
}

// ============================================================
// Styled Components
// ============================================================

const Piece = styled(Animated.View)<{
  placed: boolean;
  isDragging: boolean;
}>`
  position: absolute;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.01);
  opacity: ${(p) => (p.isDragging ? 1 : p.placed ? 1 : 0.98)};

  ${(p) =>
    !p.placed &&
    css`
      border-width: 1.5px;
      border-color: #ffffff;
      border-radius: 5px;
      shadow-color: #39465d;
      shadow-offset: 0px 3px;
      shadow-opacity: 0.22;
      shadow-radius: 4px;
      elevation: 4;
    `}
`;
