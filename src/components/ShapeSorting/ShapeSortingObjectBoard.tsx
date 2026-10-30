import React, { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import styled from "styled-components/native";

import ShapeSortingObjectComponent, {
  BUBBLE_EXTRA_SIZE,
  DragBounds,
  StickerPlacement,
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
  onCorrectDrop: (
    objectId: string,
    targetId: string,
    placement: StickerPlacement,
  ) => void;
  onWrongDrop?: (objectId: string) => void;
  tutorialRef?: (objectId: string, node: View | null) => void;
  onObjectGrab?: (objectId: string) => void;
};

const DRAG_EDGE_OVERFLOW = 10;

// ObjectBoard 스타일과 맞춰야 하는 값
const BOARD_BORDER = 2;
const BOARD_PADDING_X = 8;

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
  const boardRef = useRef<any>(null);
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  // "마지막에 잡은 오브젝트가 위"가 되도록 쌓임 순서를 기억한다
  const zCounter = useRef(0);
  const [zOrder, setZOrder] = useState<Record<string, number>>({});

  // 새 문제가 들어오면 쌓임 순서 초기화
  useEffect(() => {
    zCounter.current = 0;
    setZOrder({});
  }, [objects]);

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
                  board: {
                    left: bx,
                    right: bx + bw,
                    top: by,
                    bottom: by + bh,
                  },
                });
              },
            );
          }
        },
      );
    }
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

  // ----------------------------------------------------------
  // 슬롯 위치 계산 (기존 row + space-evenly 레이아웃과 같은 배치)
  // 오브젝트는 모두 보드의 직계 자식으로 absolute 배치한다.
  // -> 다른 행으로 옮겨도 보드 영역 안에 있으므로 다시 잡을 수 있다.
  // ----------------------------------------------------------
  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;
  const innerWidth = Math.max(0, boardSize.width - BOARD_BORDER * 2);
  const innerHeight = Math.max(0, boardSize.height - BOARD_BORDER * 2);
  const cellWidth = (innerWidth - BOARD_PADDING_X * 2) / columns;
  const rowGap = Math.max(
    0,
    (innerHeight - rows.length * bubbleSize) / (rows.length + 1),
  );
  const isReady = boardSize.width > 0 && boardSize.height > 0;

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
      {isReady &&
        rows.map((row, rowIndex) => {
          const missing = columns - row.length;

          return row.map((object, colIndex) => {
            const cellLeft =
              BOARD_PADDING_X +
              (missing * cellWidth) / 2 +
              colIndex * cellWidth;
            const slotLeft = cellLeft + (cellWidth - bubbleSize) / 2;
            const slotTop = rowGap * (rowIndex + 1) + rowIndex * bubbleSize;

            return (
              <ShapeSortingObjectComponent
                key={object.id}
                object={object}
                objectSize={objectSize}
                slotLeft={slotLeft}
                slotTop={slotTop}
                zIndex={zOrder[object.id] ?? 0}
                isSelected={selectedObjectId === object.id}
                isPlaced={placedObjectIds.includes(object.id)}
                onPress={() => onObjectPress(object.id)}
                getDragBounds={getDragBounds}
                getTargetRects={getTargetRects}
                onDragStart={() => {
                  const next = ++zCounter.current;
                  setZOrder((prev) => ({ ...prev, [object.id]: next }));
                  setDraggingObjectId(object.id);
                  onObjectGrab?.(object.id);
                }}
                onDragEnd={() => setDraggingObjectId(null)}
                onCorrectDrop={onCorrectDrop}
                onWrongDrop={onWrongDrop}
                tutorialRef={tutorialRef}
              />
            );
          });
        })}
    </ObjectBoard>
  );
}

// elevation은 Android에서 반투명 배경 + border-radius를 따라 회색 그림자선을 만들기 때문에 쓰지 않는다.
const ObjectBoard = styled.View<{ isDragging: boolean }>`
  flex: 1.2;
  margin-top: 12px;
  margin-bottom: 14px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 26px;
  border-width: ${BOARD_BORDER}px;
  border-color: rgba(255, 255, 255, 0.95);
  z-index: ${(p) => (p.isDragging ? 100 : 1)};
`;
