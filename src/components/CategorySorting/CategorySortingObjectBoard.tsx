// import React, { useRef, useState } from "react";
// import { LayoutChangeEvent, View } from "react-native";
// import styled from "styled-components/native";

// import CategorySortingObjectComponent, {
//   DragBounds,
//   TargetRects,
// } from "./CategorySortingObjectComponent";
// import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";

// type Props = {
//   objects: CategorySortingObject[];
//   selectedObjectId: string | null;
//   placedObjectIds: string[];
//   onObjectPress: (objectId: string) => void;
//   footerRef: React.RefObject<View | null>;
//   getTargetRects: (callback: (rects: TargetRects) => void) => void;
//   onCorrectDrop: (objectId: string, targetId: string) => void;
//   onWrongDrop?: (objectId: string) => void;
//   tutorialRef?: (objectId: string, node: View | null) => void;
//   onObjectGrab?: (objectId: string) => void;
// };

// const DRAG_EDGE_OVERFLOW = 10;

// // 사물 개수별 열 수
// const getGridColumns = (count: number) => {
//   if (count <= 4) return 2;
//   if (count <= 9) return 3;
//   if (count === 10) return 5;
//   if (count <= 12) return 4;
//   return 5;
// };

// const getBaseObjectSize = (columns: number) => {
//   if (columns <= 2) return 96;
//   if (columns === 3) return 84;
//   if (columns === 4) return 72;
//   return 60;
// };

// export default function CategorySortingObjectBoard({
//   objects,
//   selectedObjectId,
//   placedObjectIds,
//   onObjectPress,
//   footerRef,
//   getTargetRects,
//   onCorrectDrop,
//   onWrongDrop,
//   tutorialRef,
//   onObjectGrab,
// }: Props) {
//   const boardRef = useRef<View>(null);
//   const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
//   const [boardSize, setBoardSize] = useState({
//     width: 0,
//     height: 0,
//   });

//   const getDragBounds = (callback: (bounds: DragBounds) => void) => {
//     boardRef.current?.measureInWindow((bx, by, bw, bh) => {
//       footerRef.current?.measureInWindow((_fx, fy, _fw, fh) => {
//         callback({
//           left: bx - DRAG_EDGE_OVERFLOW,
//           right: bx + bw + DRAG_EDGE_OVERFLOW,
//           top: by - DRAG_EDGE_OVERFLOW,
//           bottom: fy + fh,
//         });
//       });
//     });
//   };

//   const columns = getGridColumns(objects.length);
//   const rows: CategorySortingObject[][] = [];

//   for (let i = 0; i < objects.length; i += columns) {
//     rows.push(objects.slice(i, i + columns));
//   }

//   const baseSize = getBaseObjectSize(columns);
//   const horizontalGap = 8;
//   const verticalGap = 8;
//   const availableWidth = boardSize.width - 16 - horizontalGap * (columns - 1);
//   const availableHeight =
//     boardSize.height - 24 - verticalGap * (rows.length - 1);

//   const objectSize =
//     boardSize.width && boardSize.height
//       ? Math.max(
//           48,
//           Math.min(
//             baseSize,
//             availableWidth / columns - 12,
//             availableHeight / Math.max(rows.length, 1) - 12,
//           ),
//         )
//       : baseSize;

//   const handleBoardLayout = (event: LayoutChangeEvent) => {
//     const { width, height } = event.nativeEvent.layout;
//     setBoardSize((prev) =>
//       prev.width === width && prev.height === height ? prev : { width, height },
//     );
//   };

//   return (
//     <ObjectBoard
//       ref={boardRef}
//       collapsable={false}
//       onLayout={handleBoardLayout}
//       isDragging={draggingObjectId !== null}
//     >
//       {rows.map((row, rowIndex) => {
//         const missing = columns - row.length;
//         const hasDragging = row.some(
//           (object) => object.instanceId === draggingObjectId,
//         );

//         return (
//           <ObjectRow
//             key={rowIndex}
//             style={{
//               zIndex: hasDragging ? 20 : 0,
//               elevation: hasDragging ? 20 : 0,
//             }}
//           >
//             {missing > 0 && <RowSpacer weight={missing / 2} />}

//             {row.map((object) => (
//               <CategorySortingObjectComponent
//                 key={object.instanceId}
//                 object={object}
//                 objectSize={objectSize}
//                 isSelected={selectedObjectId === object.instanceId}
//                 isPlaced={placedObjectIds.includes(object.instanceId)}
//                 isDragging={draggingObjectId === object.instanceId}
//                 onPress={() => onObjectPress(object.instanceId)}
//                 getDragBounds={getDragBounds}
//                 getTargetRects={getTargetRects}
//                 onDragStart={() => {
//                   setDraggingObjectId(object.instanceId);
//                   onObjectGrab?.(object.instanceId);
//                 }}
//                 onDragEnd={() => setDraggingObjectId(null)}
//                 onCorrectDrop={onCorrectDrop}
//                 onWrongDrop={onWrongDrop}
//                 tutorialRef={tutorialRef}
//               />
//             ))}

//             {missing > 0 && <RowSpacer weight={missing / 2} />}
//           </ObjectRow>
//         );
//       })}
//     </ObjectBoard>
//   );
// }

// const ObjectBoard = styled.View<{ isDragging: boolean }>`
//   flex: 1.2;
//   margin-top: 12px;
//   margin-bottom: 14px;
//   padding: 0px 8px;
//   background-color: rgba(255, 255, 255, 0.85);
//   border-radius: 26px;
//   border-width: 2px;
//   border-color: rgba(255, 255, 255, 0.95);
//   justify-content: space-evenly;
//   z-index: ${(p) => (p.isDragging ? 100 : 1)};
//   /* elevation은 Android에서 그리는 순서(바구니 위로 드래그)를 위해 유지하되,
//      반투명 배경에 비쳐 색이 변해 보이는 그림자는 투명하게 한다 */
//   elevation: ${(p) => (p.isDragging ? 10 : 0)};
//   shadow-color: transparent;
// `;

// const ObjectRow = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;

// const RowSpacer = styled.View<{ weight: number }>`
//   flex: ${(p) => p.weight};
// `;

import React, { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import styled from "styled-components/native";

import CategorySortingObjectComponent, {
  DragBounds,
  TargetRects,
} from "./CategorySortingObjectComponent";
import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";

type Props = {
  objects: CategorySortingObject[];
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

// 사물 개수별 열 수
const getGridColumns = (count: number) => {
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  if (count === 10) return 5;
  if (count <= 12) return 4;
  return 5;
};

const getBaseObjectSize = (columns: number) => {
  if (columns <= 2) return 96;
  if (columns === 3) return 84;
  if (columns === 4) return 72;
  return 60;
};

export default function CategorySortingObjectBoard({
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
  // 💡 [수정 포인트 1] ref 타입을 any로 열어주어 styled-components와의 타입 충돌 방지
  const boardRef = useRef<any>(null);
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  // 💡 [수정 포인트 2] boardRef와 footerRef를 as any로 캐스팅 및 measureInWindow 안전 검사 추가
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
  const rows: CategorySortingObject[][] = [];

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
          (object) => object.instanceId === draggingObjectId,
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
              <CategorySortingObjectComponent
                key={object.instanceId}
                object={object}
                objectSize={objectSize}
                isSelected={selectedObjectId === object.instanceId}
                isPlaced={placedObjectIds.includes(object.instanceId)}
                isDragging={draggingObjectId === object.instanceId}
                onPress={() => onObjectPress(object.instanceId)}
                getDragBounds={getDragBounds}
                getTargetRects={getTargetRects}
                onDragStart={() => {
                  setDraggingObjectId(object.instanceId);
                  onObjectGrab?.(object.instanceId);
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
  shadow-color: transparent;
`;

const ObjectRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpacer = styled.View<{ weight: number }>`
  flex: ${(p) => p.weight};
`;
