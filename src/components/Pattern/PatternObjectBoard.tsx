// components/Pattern/PatternObjectBoard.tsx
import React, { useMemo, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

import PatternObjectComponent, {
  BUBBLE_EXTRA_SIZE,
  DragBounds,
  TargetRects,
} from "./PatternObjectComponent";
import type { PatternElement } from "../../types/Pattern/patternTypes";

type Props = {
  roundKey: string;
  choices: PatternElement[];
  answer: PatternElement;
  selectedObjectId: string | null;
  wrongObjectIds: string[];
  onObjectPress: (id: string) => void;
  footerRef: React.RefObject<View | null>;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;
  onCorrectDrop: (element: PatternElement) => void;
  onWrongDrop: (objectId: string) => void;
  onObjectGrab?: () => void;
};

const DRAG_EDGE_OVERFLOW = 16;

// 화면 Container의 좌우 padding (PatternPlayScreen의 Container와 맞출 것)
const SCREEN_PADDING_X = 16;
// ObjectBoard 스타일과 맞춰야 하는 값
const BOARD_BORDER = 2;
const BOARD_PADDING_X = 12;
const CHOICE_GAP = 10;
const MAX_BUBBLE = 80;
const MIN_BUBBLE = 60;
const ABS_MIN_BUBBLE = 44;

export function getChoiceId(element: PatternElement, index: number): string {
  if (element.kind === "item") return `item-${element.item.id}-${index}`;
  if (element.kind === "shape")
    return `shape-${element.shape}-${element.colorId}-${index}`;
  return `color-${element.colorId}-${index}`;
}

// 가로 크기만으로 버블 크기와 한 줄 개수를 정한다 (측정 없이 첫 렌더에서 확정)
function computeSizing(count: number, boardWidth: number) {
  const innerW = boardWidth - BOARD_BORDER * 2 - BOARD_PADDING_X * 2;
  const bubbleFor = (perRow: number) =>
    (innerW - CHOICE_GAP * (perRow - 1)) / perRow;

  let perRow = Math.max(count, 1);
  if (count > 1 && bubbleFor(perRow) < MIN_BUBBLE) {
    perRow = Math.ceil(count / 2);
  }

  const bubble = Math.floor(
    Math.max(ABS_MIN_BUBBLE, Math.min(MAX_BUBBLE, bubbleFor(perRow))),
  );
  const rowWidth = perRow * bubble + CHOICE_GAP * (perRow - 1);

  return { bubble, rowWidth };
}

export default function PatternObjectBoard({
  roundKey,
  choices,
  answer,
  selectedObjectId,
  wrongObjectIds,
  onObjectPress,
  footerRef,
  getTargetRects,
  onCorrectDrop,
  onWrongDrop,
  onObjectGrab,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const boardRef = useRef<any>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const boardWidth = windowWidth - SCREEN_PADDING_X * 2;

  const { bubble, rowWidth } = useMemo(
    () => computeSizing(choices.length, boardWidth),
    [choices.length, boardWidth],
  );

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
                  top: by - DRAG_EDGE_OVERFLOW - 200, // 위로 빈칸까지 드래그 허용
                  bottom: fy + fh,
                });
              },
            );
          } else {
            callback({
              left: bx - DRAG_EDGE_OVERFLOW,
              right: bx + bw + DRAG_EDGE_OVERFLOW,
              top: by - 240,
              bottom: by + bh + 40,
            });
          }
        },
      );
    }
  };

  return (
    <ObjectBoard
      ref={boardRef}
      collapsable={false}
      isDragging={draggingId !== null}
    >
      <ChoicesWrap style={{ width: rowWidth }}>
        {choices.map((choice, index) => {
          const id = getChoiceId(choice, index);
          return (
            // 슬롯은 항상 같은 크기로 남는다 → 오답으로 사라져도 나머지는 안 움직임
            <SlotBox
              key={`${roundKey}-${id}`}
              style={{
                width: bubble,
                height: bubble,
                zIndex: draggingId === id ? 50 : 1,
              }}
            >
              <PatternObjectComponent
                element={choice}
                objectId={id}
                objectSize={bubble - BUBBLE_EXTRA_SIZE}
                answer={answer}
                isSelected={selectedObjectId === id}
                isWrong={wrongObjectIds.includes(id)}
                onPress={() => onObjectPress(id)}
                getDragBounds={getDragBounds}
                getTargetRects={getTargetRects}
                onDragStart={() => {
                  setDraggingId(id);
                  onObjectGrab?.();
                }}
                onDragEnd={() => setDraggingId(null)}
                onCorrectDrop={onCorrectDrop}
                onWrongDrop={onWrongDrop}
              />
            </SlotBox>
          );
        })}
      </ChoicesWrap>
    </ObjectBoard>
  );
}

const ObjectBoard = styled.View<{ isDragging: boolean }>`
  flex: 1.1;
  margin-top: 8px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 26px;
  border-width: ${BOARD_BORDER}px;
  border-color: rgba(255, 255, 255, 0.95);
  align-items: center;
  justify-content: center;
  z-index: ${(p) => (p.isDragging ? 100 : 1)};
`;

const ChoicesWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${CHOICE_GAP}px;
`;

const SlotBox = styled.View``;
