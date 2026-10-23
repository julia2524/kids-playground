import React, { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import styled from "styled-components/native";

import { SizeSortingObject } from "../../generators/classification/generateSizeSortingProblem";
import SizeSortingObjectComponent, {
  DragBounds,
  TargetRects,
} from "./SizeSortingObjectComponent";

type Props = {
  objects: SizeSortingObject[];
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

  if (!boardWidth || !boardHeight) return baseSize;

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

export default function SizeSortingObjectBoard({
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
  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);

  // 💡 [수정 포인트 1] ref 타입을 any로 열어주어 styled-components와의 타입 충돌 방지
  const boardRef = useRef<any>(null);

  // 💡 [수정 포인트 2] boardRef와 footerRef를 as any로 캐스팅하고 measureInWindow 안전 검사 추가
  const getDragBounds = (callback: (bounds: DragBounds) => void) => {
    const boardNode = boardRef.current as any;
    const footerNode = footerRef.current as any;

    if (boardNode && typeof boardNode.measureInWindow === "function") {
      boardNode.measureInWindow(
        (bx: number, by: number, bw: number, bh: number) => {
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
        },
      );
    }
  };

  const columns = getGridColumns(objects.length);
  const rows: SizeSortingObject[][] = [];

  for (let i = 0; i < objects.length; i += columns) {
    rows.push(objects.slice(i, i + columns));
  }

  const objectSize = getObjectSize({
    columns,
    rows: rows.length,
    boardWidth: boardSize.width,
    boardHeight: boardSize.height,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setBoardSize((previous) =>
      previous.width === width && previous.height === height
        ? previous
        : { width, height },
    );
  };

  return (
    <ObjectBoard
      ref={boardRef}
      collapsable={false}
      onLayout={handleLayout}
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
              <SizeSortingObjectComponent
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

const ObjectBoard = styled.View<{ isDragging?: boolean }>`
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

const RowSpacer = styled.View<{ weight: number }>`
  flex: ${(p) => p.weight};
`;
