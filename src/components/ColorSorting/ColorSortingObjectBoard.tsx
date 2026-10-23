import React, { useRef, useState } from "react";

import { LayoutChangeEvent, View } from "react-native";

import styled from "styled-components/native";

import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";

import ColorSortingObjectComponent, {
  DragBounds,
  TargetRects,
} from "./ColorSortingObjectComponent";

type ColorSortingObjectBoardProps = {
  objects: ColorSortingObject[];

  selectedObjectId: string | null;

  placedObjectIds: string[];

  onObjectPress: (objectId: string) => void;
  footerRef: React.RefObject<View | null>;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;
  onCorrectDrop: (objectId: string, targetColorId: string) => void;
  onWrongDrop?: (objectId: string) => void;
  tutorialRef?: (objectId: string, node: View | null) => void;
  onObjectGrab?: (objectId: string) => void;
};

// ============================================================
// Grid
// ============================================================

const getGridColumns = (count: number) => {
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  if (count <= 8) return 3;
  if (count === 9) return 3;
  if (count === 10) return 5;
  return 4;
};

// ============================================================
// Object Size
// ============================================================

const getBaseObjectSize = (columns: number) => {
  if (columns <= 2) return 96;
  if (columns === 3) return 84;
  if (columns === 4) return 72;
  return 60;
};

const getObjectSize = ({
  columns,
  rows,
  boardWidth,
  boardHeight,
}: {
  columns: number;
  rows: number;
  boardWidth: number;
  boardHeight: number;
}) => {
  const baseSize = getBaseObjectSize(columns);

  if (!boardWidth || !boardHeight) {
    return baseSize;
  }

  const horizontalPadding = 16;
  const verticalPadding = 24;

  const horizontalGap = 8;
  const verticalGap = 8;

  const availableWidth =
    boardWidth - horizontalPadding - horizontalGap * (columns - 1);

  const availableHeight =
    boardHeight - verticalPadding - verticalGap * (rows - 1);

  const widthBasedSize = availableWidth / columns - 12;

  const heightBasedSize = availableHeight / rows - 12;

  return Math.max(48, Math.min(baseSize, widthBasedSize, heightBasedSize));
};

// ============================================================
// Component
// ============================================================
const DRAG_EDGE_OVERFLOW = 10;
export default function ColorSortingObjectBoard({
  objects,
  selectedObjectId,
  placedObjectIds,
  onObjectPress,
  footerRef,
  getTargetRects,
  onCorrectDrop,
  onWrongDrop,
  tutorialRef,
  onObjectGrab,
}: ColorSortingObjectBoardProps) {
  // ==========================================================
  // Board 실제 크기
  // ==========================================================

  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const boardRef = useRef<any>(null);
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);

  // 💡 [핵심 수정] boardRef와 props로 넘어온 footerRef를 'as any'로 캐스팅하여 엄격한 타입 검사 우회
  const getDragBounds = (callback: (bounds: DragBounds) => void) => {
    const boardNode = boardRef.current as any;
    const footerNode = footerRef.current as any;

    if (boardNode && typeof boardNode.measureInWindow === "function") {
      boardNode.measureInWindow((bx: number, by: number, bw: number) => {
        if (footerNode && typeof footerNode.measureInWindow === "function") {
          footerNode.measureInWindow(
            (_fx: number, fy: number, _fw: number, fh: number) => {
              callback({
                left: bx - DRAG_EDGE_OVERFLOW,
                right: bx + bw + DRAG_EDGE_OVERFLOW,
                top: by - DRAG_EDGE_OVERFLOW,
                bottom: fy + fh,
              });
            },
          );
        }
      });
    }
  };

  // ==========================================================
  // Grid 계산
  // ==========================================================

  const objectColumns = getGridColumns(objects.length);

  const objectRows: ColorSortingObject[][] = [];

  for (let i = 0; i < objects.length; i += objectColumns) {
    objectRows.push(objects.slice(i, i + objectColumns));
  }

  const rowCount = objectRows.length;

  // ==========================================================
  // 실제 Board 크기에 맞춰 Object 크기 계산
  // ==========================================================

  const objectSize = getObjectSize({
    columns: objectColumns,
    rows: rowCount,
    boardWidth: boardSize.width,
    boardHeight: boardSize.height,
  });

  // ==========================================================
  // Board Layout
  // ==========================================================

  const handleBoardLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setBoardSize((prev) => {
      if (prev.width === width && prev.height === height) {
        return prev;
      }

      return {
        width,
        height,
      };
    });
  };

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <ObjectBoard
      ref={boardRef}
      collapsable={false}
      onLayout={handleBoardLayout}
      isDragging={draggingObjectId !== null}
    >
      {objectRows.map((row, rowIndex) => {
        const missing = objectColumns - row.length;
        const hasDragging = row.some((o) => o.id === draggingObjectId);

        return (
          <ObjectRow
            key={rowIndex}
            style={{
              zIndex: hasDragging ? 20 : 0,
              elevation: hasDragging ? 20 : 0,
            }}
          >
            {missing > 0 && <RowSpacer weight={missing / 2} />}

            {row.map((object) => (
              <ColorSortingObjectComponent
                key={object.id}
                object={object}
                objectSize={objectSize}
                isSelected={selectedObjectId === object.id}
                isPlaced={placedObjectIds.includes(object.id)}
                onPress={() => onObjectPress(object.id)}
                getDragBounds={getDragBounds}
                getTargetRects={getTargetRects}
                onDragStart={() => {
                  setDraggingObjectId(object.id);
                  onObjectGrab?.(object.id);
                }}
                onDragEnd={() => setDraggingObjectId(null)}
                onCorrectDrop={onCorrectDrop}
                onWrongDrop={onWrongDrop}
                isDragging={draggingObjectId === object.id}
                tutorialRef={tutorialRef}
              />
            ))}

            {missing > 0 && <RowSpacer weight={missing / 2} />}
          </ObjectRow>
        );
      })}
    </ObjectBoard>
  );
}

// ============================================================
// Styled Components
// ============================================================

const ObjectBoard = styled.View<{
  isDragging?: boolean;
}>`
  flex: 1.2;

  margin-top: 12px;
  margin-bottom: 14px;

  padding: 0px 8px;

  background-color: rgba(255, 255, 255, 0.85);

  border-radius: 26px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.95);

  justify-content: space-evenly;

  z-index: ${(p) => (p.isDragging ? 100 : 1)};

  elevation: ${(p) => (p.isDragging ? 10 : 0)};
  shadow-color: transparent;
`;

const ObjectRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpacer = styled.View<{
  weight: number;
}>`
  flex: ${(p) => p.weight};
`;
