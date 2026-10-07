// // import React from "react";
// // import styled from "styled-components/native";

// // import { classificationItems } from "../../data/classification/classificationItems";
// // import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

// // import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

// // import { ColorSortingObject } from "../../types/colorSotringTypes";

// // type ColorSortingObjectProps = {
// //   object: ColorSortingObject;
// //   objectSize: number;
// //   isSelected: boolean;
// //   isPlaced: boolean;
// //   onPress: () => void;
// // };

// // export default function ColorSortingObjectComponent({
// //   object,
// //   objectSize,
// //   isSelected,
// //   isPlaced,
// //   onPress,
// // }: ColorSortingObjectProps) {
// //   const item = classificationItems.find((item) => item.id === object.itemId);

// //   const variant = item?.variants.find(
// //     (variant) => variant.colorId === object.colorId,
// //   );

// //   const basicColor = COLOR_SORTING_COLORS[object.colorId];

// //   return (
// //     <ObjectCell
// //       activeOpacity={0.8}
// //       disabled={isPlaced}
// //       onPress={onPress}
// //       style={{
// //         opacity: isPlaced ? 0 : 1,
// //       }}
// //     >
// //       <ObjectBubble size={objectSize + 12} isSelected={isSelected}>
// //         <RenderColorSortingObjectSvg
// //           object={object}
// //           primary={variant?.primary ?? basicColor}
// //           secondary={variant?.secondary}
// //           accent={variant?.accent}
// //           size={objectSize}
// //         />
// //       </ObjectBubble>
// //     </ObjectCell>
// //   );
// // }

// // const ObjectCell = styled.TouchableOpacity`
// //   flex: 1;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const ObjectBubble = styled.View<{
// //   size: number;
// //   isSelected?: boolean;
// // }>`
// //   width: ${(p) => p.size}px;
// //   height: ${(p) => p.size}px;

// //   align-items: center;
// //   justify-content: center;

// //   border-radius: ${(p) => p.size / 2}px;

// //   border-width: 3px;

// //   border-color: ${(p) => (p.isSelected ? "#7c5cff" : "transparent")};

// //   background-color: ${(p) =>
// //     p.isSelected ? "rgba(124, 92, 255, 0.08)" : "transparent"};

// //   transform: ${(p) => (p.isSelected ? "scale(1.06)" : "scale(1)")};
// // `;

// import React from "react";

// import styled from "styled-components/native";

// import { classificationItems } from "../../data/classification/classificationItems";

// import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

// import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

// import { ColorSortingObject } from "../../types/colorSotringTypes";

// type ColorSortingObjectProps = {
//   object: ColorSortingObject;

//   objectSize: number;

//   isSelected: boolean;

//   isPlaced: boolean;

//   onPress: () => void;
// };

// // ============================================================
// // Constants
// // ============================================================

// const BUBBLE_EXTRA_SIZE = 12;

// // ============================================================
// // Component
// // ============================================================

// export default function ColorSortingObjectComponent({
//   object,
//   objectSize,
//   isSelected,
//   isPlaced,
//   onPress,
// }: ColorSortingObjectProps) {
//   // ==========================================================
//   // Classification Item
//   // ==========================================================

//   const item = classificationItems.find((item) => item.id === object.itemId);

//   const variant = item?.variants.find(
//     (variant) => variant.colorId === object.colorId,
//   );

//   // ==========================================================
//   // Color
//   // ==========================================================

//   const basicColor = COLOR_SORTING_COLORS[object.colorId];

//   // ==========================================================
//   // Bubble Size
//   // ==========================================================

//   const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;

//   // ==========================================================
//   // Render
//   // ==========================================================

//   return (
//     <ObjectCell
//       activeOpacity={0.8}
//       disabled={isPlaced}
//       onPress={onPress}
//       style={{
//         opacity: isPlaced ? 0 : 1,
//       }}
//     >
//       <ObjectBubble size={bubbleSize} isSelected={isSelected}>
//         <RenderColorSortingObjectSvg
//           object={object}
//           primary={variant?.primary ?? basicColor}
//           secondary={variant?.secondary}
//           accent={variant?.accent}
//           size={objectSize}
//         />
//       </ObjectBubble>
//     </ObjectCell>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const ObjectCell = styled.TouchableOpacity`
//   flex: 1;

//   align-items: center;
//   justify-content: center;
// `;

// const ObjectBubble = styled.View<{
//   size: number;
//   isSelected?: boolean;
// }>`
//   width: ${(p) => p.size}px;
//   height: ${(p) => p.size}px;

//   align-items: center;
//   justify-content: center;

//   border-radius: ${(p) => p.size / 2}px;

//   border-width: 3px;

//   border-color: ${(p) => (p.isSelected ? "#7c5cff" : "transparent")};

//   background-color: ${(p) =>
//     p.isSelected ? "rgba(124, 92, 255, 0.08)" : "transparent"};

//   transform: ${(p) => (p.isSelected ? "scale(1.06)" : "scale(1)")};
// `;

import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";

import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { ColorSortingObject } from "../../types/colorSotringTypes";

export type DragBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type ColorSortingObjectProps = {
  object: ColorSortingObject;
  objectSize: number;
  isSelected: boolean;
  isPlaced: boolean;
  isDragging: boolean;
  onPress: () => void;
  getDragBounds: (callback: (bounds: DragBounds) => void) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
};

const BUBBLE_EXTRA_SIZE = 12;
const DRAG_THRESHOLD = 4; // 이 거리 이상 움직여야 드래그로 인식 (탭과 구분)

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ColorSortingObjectComponent({
  object,
  objectSize,
  isSelected,
  isPlaced,
  isDragging,
  onPress,
  getDragBounds,
  onDragStart,
  onDragEnd,
}: ColorSortingObjectProps) {
  const item = classificationItems.find((item) => item.id === object.itemId);
  const variant = item?.variants.find(
    (variant) => variant.colorId === object.colorId,
  );
  const basicColor = COLOR_SORTING_COLORS[object.colorId];
  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;

  // ==========================================================
  // Drag
  // ==========================================================

  const pan = useRef(new Animated.ValueXY()).current;
  const posRef = useRef({ x: 0, y: 0 }); // 현재 translate 값
  const bubbleRef = useRef<View>(null);

  const dragRef = useRef<{
    start: { x: number; y: number };
    range: { minX: number; maxX: number; minY: number; maxY: number } | null;
  }>({ start: { x: 0, y: 0 }, range: null });

  // PanResponder는 한 번만 만들어지므로 최신 props는 ref로 읽는다
  const latest = useRef({ isPlaced, getDragBounds, onDragStart, onDragEnd });
  latest.current = { isPlaced, getDragBounds, onDragStart, onDragEnd };

  useEffect(() => {
    const id = pan.addListener((v) => {
      posRef.current = v;
    });
    return () => pan.removeListener(id);
  }, [pan]);

  const returnToOrigin = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start(() => latest.current.onDragEnd());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      // 자식(TouchableOpacity)보다 먼저 "드래그면 내가 가져갈게" 하고 가로챈다
      onMoveShouldSetPanResponderCapture: (_, g) =>
        !latest.current.isPlaced &&
        (Math.abs(g.dx) > DRAG_THRESHOLD || Math.abs(g.dy) > DRAG_THRESHOLD),

      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        pan.stopAnimation();

        dragRef.current = { start: { ...posRef.current }, range: null };
        latest.current.onDragStart();

        // 오브젝트의 화면상 위치 측정 → 이동 가능한 범위 계산
        bubbleRef.current?.measureInWindow((x, y, w, h) => {
          latest.current.getDragBounds((bounds) => {
            // 측정값에는 현재 translate가 포함돼 있으므로 빼서 "원래 자리"를 구한다
            const originX = x - posRef.current.x;
            const originY = y - posRef.current.y;

            dragRef.current.range = {
              minX: bounds.left - originX,
              maxX: bounds.right - (originX + w),
              minY: bounds.top - originY,
              maxY: bounds.bottom - (originY + h),
            };
          });
        });
      },

      onPanResponderMove: (_, g) => {
        const { start, range } = dragRef.current;

        let x = start.x + g.dx;
        let y = start.y + g.dy;

        if (range) {
          x = clamp(x, range.minX, range.maxX);
          y = clamp(y, range.minY, range.maxY);
        }

        pan.setValue({ x, y });
      },

      onPanResponderRelease: returnToOrigin,
      onPanResponderTerminate: returnToOrigin,
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        flex: 1,
        zIndex: isDragging ? 30 : 0,
        elevation: isDragging ? 20 : 0,
        transform: pan.getTranslateTransform(),
      }}
    >
      <ObjectCell
        activeOpacity={0.8}
        disabled={isPlaced}
        onPress={onPress}
        style={{ opacity: isPlaced ? 0 : 1 }}
      >
        <ObjectBubble
          ref={bubbleRef}
          collapsable={false}
          size={bubbleSize}
          isSelected={isSelected}
        >
          <RenderColorSortingObjectSvg
            object={object}
            primary={variant?.primary ?? basicColor}
            secondary={variant?.secondary}
            accent={variant?.accent}
            size={objectSize}
          />
        </ObjectBubble>
      </ObjectCell>
    </Animated.View>
  );
}

const ObjectCell = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ObjectBubble = styled.View<{
  size: number;
  isSelected?: boolean;
}>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  align-items: center;
  justify-content: center;

  border-radius: ${(p) => p.size / 2}px;
  border-width: 3px;
  border-color: ${(p) => (p.isSelected ? "#7c5cff" : "transparent")};
  background-color: ${(p) =>
    p.isSelected ? "rgba(124, 92, 255, 0.08)" : "transparent"};

  transform: ${(p) => (p.isSelected ? "scale(1.06)" : "scale(1)")};
`;
