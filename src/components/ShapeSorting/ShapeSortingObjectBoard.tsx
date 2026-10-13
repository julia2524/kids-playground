import React, { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import styled from "styled-components/native";

import ShapeSortingObjectComponent, {
  DragBounds,
  TargetRects,
} from "./ShapeSortingObjectComponent";
import { ShapeSortingObject } from "../../generators/classification/generateShapeSortingProblem";

type Props = {
  objects: ShapeSortingObject[];
  selectedObjectId: string | null;
  placedObjectIds: string[];
  onObjectPress: (objectId: string) => void;
  footerRef: React.RefObject<View | null>;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;
  onCorrectDrop: (objectId: string, targetId: string) => void;
  onWrongDrop?: (objectId: string) => void;
  tutorialRef?: (objectId: string, node: View | null) => void;
  onObjectGrab?: (objectId: string) => void;
};

const DRAG_EDGE_OVERFLOW = 10;

const getGridColumns = (count: number) => {
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  if (count === 10) return 5;
  return 4;
};

const getBaseObjectSize = (columns: number) => {
  if (columns <= 2) return 96;
  if (columns === 3) return 84;
  if (columns === 4) return 72;
  return 60;
};

export default function ShapeSortingObjectBoard({
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
}: Props) {
  const boardRef = useRef<View>(null);
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const getDragBounds = (callback: (bounds: DragBounds) => void) => {
    boardRef.current?.measureInWindow((bx, by, bw, bh) => {
      footerRef.current?.measureInWindow((_fx, fy, _fw, fh) => {
        callback({
          left: bx - DRAG_EDGE_OVERFLOW,
          right: bx + bw + DRAG_EDGE_OVERFLOW,
          top: by - DRAG_EDGE_OVERFLOW,
          bottom: fy + fh,
        });
      });
    });
  };

  const columns = getGridColumns(objects.length);
  const rows: ShapeSortingObject[][] = [];

  for (let i = 0; i < objects.length; i += columns) {
    rows.push(objects.slice(i, i + columns));
  }

  const baseSize = getBaseObjectSize(columns);
  const horizontalGap = 8;
  const verticalGap = 8;
  const availableWidth = boardSize.width - 16 - horizontalGap * (columns - 1);
  const availableHeight =
    boardSize.height - 24 - verticalGap * (rows.length - 1);

  const objectSize =
    boardSize.width && boardSize.height
      ? Math.max(
          48,
          Math.min(
            baseSize,
            availableWidth / columns - 12,
            availableHeight / Math.max(rows.length, 1) - 12,
          ),
        )
      : baseSize;

  const handleBoardLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBoardSize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height },
    );
  };

  return (
    <ObjectBoard
      ref={boardRef}
      collapsable={false}
      onLayout={handleBoardLayout}
      isDragging={draggingObjectId !== null}
    >
      {rows.map((row, rowIndex) => {
        const missing = columns - row.length;
        const hasDragging = row.some(
          (object) => object.id === draggingObjectId,
        );

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
              <ShapeSortingObjectComponent
                key={object.id}
                object={object}
                objectSize={objectSize}
                isSelected={selectedObjectId === object.id}
                isPlaced={placedObjectIds.includes(object.id)}
                isDragging={draggingObjectId === object.id}
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

const ObjectBoard = styled.View<{ isDragging: boolean }>`
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
`;

const ObjectRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpacer = styled.View<{ weight: number }>`
  flex: ${(p) => p.weight};
`;
