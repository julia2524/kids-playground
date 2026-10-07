import React, { useRef, useState } from "react";

import { LayoutChangeEvent, View } from "react-native";

import styled from "styled-components/native";

import { ColorSortingObject } from "../../types/colorSotringTypes";

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

  // 아직 Board 크기를 측정하지 못한 첫 렌더링
  // 기존 디자인 크기를 그대로 사용
  if (!boardWidth || !boardHeight) {
    return baseSize;
  }

  // ==========================================================
  // Board 내부에서 사용할 수 있는 공간
  // ==========================================================

  const horizontalPadding = 16;
  const verticalPadding = 24;

  const horizontalGap = 8;
  const verticalGap = 8;

  const availableWidth =
    boardWidth - horizontalPadding - horizontalGap * (columns - 1);

  const availableHeight =
    boardHeight - verticalPadding - verticalGap * (rows - 1);

  // Bubble이 SVG보다 12px 크기 때문에
  // SVG가 들어갈 수 있는 실제 공간에서 12px 여유를 뺀다.
  const widthBasedSize = availableWidth / columns - 12;

  const heightBasedSize = availableHeight / rows - 12;

  // ----------------------------------------------------------
  // 평소에는 기존 크기 유지
  // 공간이 부족할 때만 자동으로 작아짐
  // ----------------------------------------------------------

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
}: ColorSortingObjectBoardProps) {
  // ==========================================================
  // Board 실제 크기
  // ==========================================================

  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const boardRef = useRef<View>(null);
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);

  // 좌/우/상: Board 기준, 하단: Footer 바닥까지
  const getDragBounds = (callback: (bounds: DragBounds) => void) => {
    boardRef.current?.measureInWindow((bx, by, bw) => {
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
                onDragStart={() => setDraggingObjectId(object.id)}
                onDragEnd={() => setDraggingObjectId(null)}
                onCorrectDrop={onCorrectDrop}
                onWrongDrop={onWrongDrop}
                isDragging={draggingObjectId === object.id} // 추가
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

  /* Android: elevation이 zIndex보다 우선하므로 드래그 중에만 올린다 */
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
