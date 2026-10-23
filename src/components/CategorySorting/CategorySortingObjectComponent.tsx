// import React, { useEffect, useRef } from "react";
// import { Animated, Easing, PanResponder, View } from "react-native";
// import styled from "styled-components/native";

// import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
// import { triggerHaptic } from "../../utils/haptic";
// import { playSound } from "../../utils/sound";

// import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";
// import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";

// // ============================================================
// // Types
// // ============================================================

// export type DragBounds = {
//   left: number;
//   right: number;
//   top: number;
//   bottom: number;
// };

// export type DragOrigin = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// export type TargetRects = Record<string, DragOrigin>;

// type Props = {
//   object: CategorySortingObject;
//   objectSize: number;

//   isSelected: boolean;
//   isPlaced: boolean;
//   isDragging: boolean;

//   onPress: () => void;

//   getDragBounds: (callback: (bounds: DragBounds) => void) => void;
//   getTargetRects: (callback: (rects: TargetRects) => void) => void;

//   onDragStart: () => void;
//   onDragEnd: () => void;

//   onCorrectDrop: (objectId: string, targetId: string) => void;
//   onWrongDrop?: (objectId: string) => void;

//   tutorialRef?: (objectId: string, node: View | null) => void;
// };

// // ============================================================
// // Constants
// // ============================================================

// const BUBBLE_EXTRA_SIZE = 12;
// const DRAG_THRESHOLD = 4;
// const TARGET_HIT_PADDING = 8;

// const PARTICLE_COUNT = 10;
// const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

// // ============================================================
// // Utils
// // ============================================================

// const clamp = (value: number, min: number, max: number) =>
//   Math.min(Math.max(value, min), max);

// // ============================================================
// // Object artwork
// // generator에서 itemId에 item.svgKey를 담아 주므로 svgKey로도 그대로 사용
// // ============================================================

// export function ObjectArtwork({
//   object,
//   size,
// }: {
//   object: CategorySortingObject;
//   size: number;
// }) {
//   // 렌더러(SortingObjectTypes = ColorSortingObject)에 맞춘 어댑터.
//   // shape는 itemId가 "simple-"로 시작하는 단순 도형에만 쓰이므로
//   // 사물 렌더링에는 영향이 없다.
//   const classificationObject: ColorSortingObject = {
//     id: object.instanceId,
//     itemId: object.itemId,
//     label: object.itemName,
//     colorId: object.colorId as ColorSortingObject["colorId"],
//     svgKey: object.itemId,
//     shape: "",
//   };

//   return (
//     <RenderClassificationObjectSvg
//       object={classificationObject}
//       primary={object.primary}
//       secondary={object.secondary}
//       accent={object.accent}
//       size={size}
//     />
//   );
// }

// // ============================================================
// // Component
// // ============================================================

// export default function CategorySortingObjectComponent({
//   object,
//   objectSize,
//   isSelected,
//   isPlaced,
//   isDragging,
//   onPress,
//   getDragBounds,
//   getTargetRects,
//   onDragStart,
//   onDragEnd,
//   onCorrectDrop,
//   onWrongDrop,
//   tutorialRef,
// }: Props) {
//   const objectId = object.instanceId;

//   // ==========================================================
//   // Object appearance
//   // ==========================================================

//   const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;
//   const primaryColor = object.primary;

//   // ==========================================================
//   // Animated values
//   // ==========================================================

//   const pan = useRef(new Animated.ValueXY()).current;
//   const scale = useRef(new Animated.Value(1)).current;
//   const fade = useRef(new Animated.Value(1)).current;
//   const burst = useRef(new Animated.Value(0)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   // ==========================================================
//   // Refs
//   // ==========================================================

//   const position = useRef({ x: 0, y: 0 });
//   const bubbleRef = useRef<any>(null);
//   const originRef = useRef<DragOrigin | null>(null);
//   const busyRef = useRef(false);

//   const dragRef = useRef<{
//     start: { x: number; y: number };
//     range: {
//       minX: number;
//       maxX: number;
//       minY: number;
//       maxY: number;
//     } | null;
//   }>({
//     start: { x: 0, y: 0 },
//     range: null,
//   });

//   // ==========================================================
//   // Latest props
//   // PanResponder는 한 번만 만들어지므로 최신 props는 ref로 읽는다
//   // ==========================================================

//   const latest = useRef({
//     objectId,
//     targetId: object.targetId,
//     isPlaced,
//     getDragBounds,
//     getTargetRects,
//     onDragStart,
//     onDragEnd,
//     onCorrectDrop,
//     onWrongDrop,
//   });

//   latest.current = {
//     objectId,
//     targetId: object.targetId,
//     isPlaced,
//     getDragBounds,
//     getTargetRects,
//     onDragStart,
//     onDragEnd,
//     onCorrectDrop,
//     onWrongDrop,
//   };

//   // ==========================================================
//   // Track pan position
//   // ==========================================================

//   useEffect(() => {
//     const listenerId = pan.addListener((value) => {
//       position.current = {
//         x: value.x,
//         y: value.y,
//       };
//     });

//     return () => {
//       pan.removeListener(listenerId);
//     };
//   }, [pan]);

//   // ==========================================================
//   // Reset when object becomes available
//   // ==========================================================

//   useEffect(() => {
//     if (!isPlaced) {
//       pan.stopAnimation();
//       pan.setValue({ x: 0, y: 0 });
//       position.current = { x: 0, y: 0 };

//       scale.stopAnimation();
//       scale.setValue(1);

//       fade.stopAnimation();
//       fade.setValue(1);

//       burst.stopAnimation();
//       burst.setValue(0);

//       rotateAnim.stopAnimation();
//       rotateAnim.setValue(0);

//       busyRef.current = false;
//     }
//   }, [isPlaced, objectId, pan, scale, fade, burst, rotateAnim]);

//   // ==========================================================
//   // Return to original position
//   // ==========================================================

//   const returnToOrigin = () => {
//     Animated.spring(pan, {
//       toValue: { x: 0, y: 0 },
//       friction: 6,
//       tension: 80,
//       useNativeDriver: true,
//     }).start(() => {
//       latest.current.onDragEnd();
//     });
//   };

//   // ==========================================================
//   // Correct answer animation
//   // Pop -> shrink/fade -> burst
//   // ==========================================================

//   const settleIntoBasket = (targetId: string) => {
//     if (busyRef.current) return;

//     busyRef.current = true;

//     triggerHaptic("success");
//     playSound("correct_sound");

//     scale.setValue(1);
//     fade.setValue(1);
//     burst.setValue(0);
//     rotateAnim.setValue(0);

//     Animated.sequence([
//       // Stage 1: pop
//       Animated.timing(scale, {
//         toValue: 1.3,
//         duration: 110,
//         easing: Easing.out(Easing.quad),
//         useNativeDriver: true,
//       }),

//       // Stage 2: shrink and fade out
//       Animated.parallel([
//         Animated.timing(scale, {
//           toValue: 0.4,
//           duration: 220,
//           easing: Easing.in(Easing.quad),
//           useNativeDriver: true,
//         }),
//         Animated.timing(fade, {
//           toValue: 0,
//           duration: 220,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start(({ finished }) => {
//       if (finished) {
//         latest.current.onCorrectDrop(latest.current.objectId, targetId);
//       }

//       busyRef.current = false;
//       latest.current.onDragEnd();
//     });

//     // Burst runs concurrently with the object animation
//     Animated.timing(burst, {
//       toValue: 1,
//       duration: 520,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: true,
//     }).start();
//   };

//   // ==========================================================
//   // Wrong answer animation
//   // Bounce up -> rotate and fall -> fade out
//   // ==========================================================

//   const fadeAway = () => {
//     if (busyRef.current) return;

//     busyRef.current = true;

//     triggerHaptic("error");
//     playSound("wrong_sound");

//     rotateAnim.setValue(0);

//     const currentX = position.current.x;
//     const currentY = position.current.y;

//     // Rotation runs concurrently with the falling animation
//     Animated.timing(rotateAnim, {
//       toValue: 1,
//       duration: 450,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start();

//     Animated.sequence([
//       // Stage 1: bounce upward
//       Animated.timing(pan, {
//         toValue: {
//           x: currentX,
//           y: currentY - 40,
//         },
//         duration: 120,
//         easing: Easing.out(Easing.quad),
//         useNativeDriver: true,
//       }),

//       // Stage 2: fall down and fade
//       Animated.parallel([
//         Animated.timing(pan, {
//           toValue: {
//             x: currentX,
//             y: currentY + 700,
//           },
//           duration: 350,
//           easing: Easing.in(Easing.quad),
//           useNativeDriver: true,
//         }),
//         Animated.timing(fade, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start(({ finished }) => {
//       if (finished) {
//         pan.setValue({ x: 0, y: 0 });
//         position.current = { x: 0, y: 0 };

//         scale.setValue(1);
//         rotateAnim.setValue(0);

//         latest.current.onWrongDrop?.(latest.current.objectId);
//       }

//       busyRef.current = false;
//       latest.current.onDragEnd();
//     });
//   };

//   // ==========================================================
//   // Release and target detection
//   // 놓은 위치가 어떤 목적지 안인지 찾고,
//   // 그 목적지가 object.targetId와 같으면 정답
//   // ==========================================================

//   const handleRelease = () => {
//     const origin = originRef.current;

//     if (!origin) {
//       returnToOrigin();
//       return;
//     }

//     latest.current.getTargetRects((rects) => {
//       const centerX = origin.x + position.current.x + origin.width / 2;
//       const centerY = origin.y + position.current.y + origin.height / 2;

//       let hitTargetId: string | null = null;

//       for (const [targetId, rect] of Object.entries(rects)) {
//         const left = rect.x - TARGET_HIT_PADDING;
//         const right = rect.x + rect.width + TARGET_HIT_PADDING;
//         const top = rect.y - TARGET_HIT_PADDING;
//         const bottom = rect.y + rect.height + TARGET_HIT_PADDING;

//         if (
//           centerX >= left &&
//           centerX <= right &&
//           centerY >= top &&
//           centerY <= bottom
//         ) {
//           hitTargetId = targetId;
//           break;
//         }
//       }

//       if (!hitTargetId) {
//         returnToOrigin();
//         return;
//       }

//       if (hitTargetId === latest.current.targetId) {
//         settleIntoBasket(hitTargetId);
//       } else {
//         fadeAway();
//       }
//     });
//   };

//   // ==========================================================
//   // PanResponder
//   // ==========================================================

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => false,

//       onMoveShouldSetPanResponderCapture: (_, gesture) =>
//         !latest.current.isPlaced &&
//         !busyRef.current &&
//         (Math.abs(gesture.dx) > DRAG_THRESHOLD ||
//           Math.abs(gesture.dy) > DRAG_THRESHOLD),

//       onPanResponderTerminationRequest: () => false,

//       onPanResponderGrant: () => {
//         triggerHaptic("light");
//         pan.stopAnimation();

//         dragRef.current = {
//           start: { ...position.current },
//           range: null,
//         };

//         if (
//           bubbleRef.current &&
//           typeof bubbleRef.current.measureInWindow === "function"
//         ) {
//           bubbleRef.current?.measureInWindow(
//             (x: number, y: number, width: number, height: number) => {
//               const originX = x - position.current.x;
//               const originY = y - position.current.y;

//               originRef.current = {
//                 x: originX,
//                 y: originY,
//                 width,
//                 height,
//               };

//               latest.current.getDragBounds((bounds) => {
//                 dragRef.current.range = {
//                   minX: bounds.left - originX,
//                   maxX: bounds.right - (originX + width),
//                   minY: bounds.top - originY,
//                   maxY: bounds.bottom - (originY + height),
//                 };
//               });
//             },
//           );
//         }

//         latest.current.onDragStart();
//       },

//       onPanResponderMove: (_, gesture) => {
//         const { start, range } = dragRef.current;

//         let x = start.x + gesture.dx;
//         let y = start.y + gesture.dy;

//         if (range) {
//           x = clamp(x, range.minX, range.maxX);
//           y = clamp(y, range.minY, range.maxY);
//         }

//         pan.setValue({ x, y });
//       },

//       onPanResponderRelease: handleRelease,
//       onPanResponderTerminate: returnToOrigin,
//     }),
//   ).current;

//   // ==========================================================
//   // Rotation interpolation
//   // ==========================================================

//   const spin = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "-35deg"],
//   });

//   // ==========================================================
//   // Burst particles
//   // ==========================================================

//   const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
//     const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
//     const distance = bubbleSize * (index % 2 === 0 ? 0.95 : 0.7);
//     const size = index % 2 === 0 ? 9 : 6;

//     const particleColor =
//       index % 3 === 0
//         ? primaryColor
//         : PARTICLE_COLORS[index % PARTICLE_COLORS.length];

//     return (
//       <Particle
//         key={index}
//         color={particleColor}
//         style={{
//           width: size,
//           height: size,
//           borderRadius: size / 2,

//           opacity: burst.interpolate({
//             inputRange: [0, 0.1, 0.65, 1],
//             outputRange: [0, 1, 1, 0],
//           }),

//           transform: [
//             {
//               translateX: burst.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, Math.cos(angle) * distance],
//               }),
//             },
//             {
//               translateY: burst.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, Math.sin(angle) * distance],
//               }),
//             },
//             {
//               scale: burst.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [1, 0.3],
//               }),
//             },
//           ],
//         }}
//       />
//     );
//   });

//   // ==========================================================
//   // Render
//   // ==========================================================

//   return (
//     <Animated.View
//       {...panResponder.panHandlers}
//       style={[
//         {
//           flex: 1,
//           transform: [...pan.getTranslateTransform(), { rotate: spin }],
//         },
//         isDragging ? { zIndex: 30, elevation: 30 } : null,
//       ]}
//     >
//       <Animated.View
//         style={{
//           flex: 1,
//           opacity: fade,
//           transform: [{ scale }],
//         }}
//       >
//         <ObjectCell
//           activeOpacity={0.8}
//           disabled={isPlaced}
//           onPress={onPress}
//           style={{ opacity: isPlaced ? 0 : 1 }}
//         >
//           <ObjectBubble
//             ref={(node: any) => {
//               bubbleRef.current = node;
//               tutorialRef?.(objectId, node);
//             }}
//             collapsable={false}
//             size={bubbleSize}
//             isSelected={isSelected}
//           >
//             <ObjectArtwork object={object} size={objectSize} />
//           </ObjectBubble>
//         </ObjectCell>
//       </Animated.View>

//       <BurstLayer pointerEvents="none">
//         <Ring
//           size={bubbleSize}
//           color={primaryColor}
//           style={{
//             opacity: burst.interpolate({
//               inputRange: [0, 0.1, 1],
//               outputRange: [0, 0.8, 0],
//             }),
//             transform: [
//               {
//                 scale: burst.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.6, 1.9],
//                 }),
//               },
//             ],
//           }}
//         />

//         {particles}
//       </BurstLayer>
//     </Animated.View>
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
//   isSelected: boolean;
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
// `;

// const BurstLayer = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;

//   align-items: center;
//   justify-content: center;
// `;

// const Ring = styled(Animated.View)<{
//   size: number;
//   color: string;
// }>`
//   position: absolute;

//   width: ${(p) => p.size}px;
//   height: ${(p) => p.size}px;

//   border-radius: ${(p) => p.size / 2}px;
//   border-width: 3px;
//   border-color: ${(p) => p.color};
// `;

// const Particle = styled(Animated.View)<{
//   color: string;
// }>`
//   position: absolute;
//   background-color: ${(p) => p.color};
// `;

import React, { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";

import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { triggerHaptic } from "../../utils/haptic";
import { playSound } from "../../utils/sound";

import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";
import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";

// ============================================================
// Types
// ============================================================

export type DragBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  // 오브젝트가 "놓일 수 있는" 보드 영역 (window 좌표)
  board: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
};

export type DragOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TargetRects = Record<string, DragOrigin>;

// 바구니 안에 스티커처럼 붙을 위치 / 크기 (바구니 좌상단 기준)
export type StickerPlacement = {
  x: number;
  y: number;
  size: number; // 버블 크기
  artSize: number; // SVG 크기
};

type Props = {
  object: CategorySortingObject;
  objectSize: number;

  // 보드 안에서의 기본 슬롯 위치 (absolute)
  slotLeft: number;
  slotTop: number;
  zIndex?: number;

  isSelected: boolean;
  isPlaced: boolean;

  onPress: () => void;

  getDragBounds: (callback: (bounds: DragBounds) => void) => void;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;

  onDragStart: () => void;
  onDragEnd: () => void;

  onCorrectDrop: (
    objectId: string,
    targetId: string,
    placement: StickerPlacement,
  ) => void;
  onWrongDrop?: (objectId: string) => void;

  tutorialRef?: (objectId: string, node: View | null) => void;
};

// ============================================================
// Constants
// ============================================================

export const BUBBLE_EXTRA_SIZE = 12;
const DRAG_THRESHOLD = 4;
const TARGET_HIT_PADDING = 8;
const BOARD_SETTLE_PADDING = 4;

const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

// ============================================================
// Utils
// ============================================================

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ============================================================
// Object artwork
// generator에서 itemId에 item.svgKey를 담아 주므로 svgKey로도 그대로 사용
// ============================================================

export function ObjectArtwork({
  object,
  size,
}: {
  object: CategorySortingObject;
  size: number;
}) {
  // 렌더러(SortingObjectTypes = ColorSortingObject)에 맞춘 어댑터.
  // shape는 itemId가 "simple-"로 시작하는 단순 도형에만 쓰이므로
  // 사물 렌더링에는 영향이 없다.
  const classificationObject: ColorSortingObject = {
    id: object.instanceId,
    itemId: object.itemId,
    label: object.itemName,
    colorId: object.colorId as ColorSortingObject["colorId"],
    svgKey: object.itemId,
    shape: "",
  };

  return (
    <RenderClassificationObjectSvg
      object={classificationObject}
      primary={object.primary}
      secondary={object.secondary}
      accent={object.accent}
      size={size}
    />
  );
}

// ============================================================
// Component
// ============================================================

export default function CategorySortingObjectComponent({
  object,
  objectSize,
  slotLeft,
  slotTop,
  zIndex = 0,
  isSelected,
  isPlaced,
  onPress,
  getDragBounds,
  getTargetRects,
  onDragStart,
  onDragEnd,
  onCorrectDrop,
  onWrongDrop,
  tutorialRef,
}: Props) {
  const objectId = object.instanceId;

  // ==========================================================
  // Object appearance
  // ==========================================================

  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;
  const primaryColor = object.primary;

  // ==========================================================
  // Animated values
  // ==========================================================

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // ==========================================================
  // Refs
  // ==========================================================

  const position = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef<any>(null);
  const originRef = useRef<DragOrigin | null>(null);
  const busyRef = useRef(false);

  const dragRef = useRef<{
    start: { x: number; y: number };
    range: {
      minX: number;
      maxX: number;
      minY: number;
      maxY: number;
    } | null;
    board: DragBounds["board"] | null;
  }>({
    start: { x: 0, y: 0 },
    range: null,
    board: null,
  });

  // ==========================================================
  // Latest props
  // PanResponder는 한 번만 만들어지므로 최신 props는 ref로 읽는다
  // ==========================================================

  const latest = useRef({
    objectId,
    targetId: object.targetId,
    objectSize,
    isPlaced,
    getDragBounds,
    getTargetRects,
    onDragStart,
    onDragEnd,
    onCorrectDrop,
    onWrongDrop,
  });

  latest.current = {
    objectId,
    targetId: object.targetId,
    objectSize,
    isPlaced,
    getDragBounds,
    getTargetRects,
    onDragStart,
    onDragEnd,
    onCorrectDrop,
    onWrongDrop,
  };

  // ==========================================================
  // Track pan position
  // ==========================================================

  useEffect(() => {
    const listenerId = pan.addListener((value) => {
      position.current = {
        x: value.x,
        y: value.y,
      };
    });

    return () => {
      pan.removeListener(listenerId);
    };
  }, [pan]);

  // ==========================================================
  // Reset when object becomes available
  // ==========================================================

  useEffect(() => {
    if (!isPlaced) {
      pan.stopAnimation();
      pan.setValue({ x: 0, y: 0 });
      position.current = { x: 0, y: 0 };

      scale.stopAnimation();
      scale.setValue(1);

      fade.stopAnimation();
      fade.setValue(1);

      burst.stopAnimation();
      burst.setValue(0);

      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);

      busyRef.current = false;
    }
  }, [isPlaced, objectId, pan, scale, fade, burst, rotateAnim]);

  // ==========================================================
  // Return to original position (터치 중단 시)
  // ==========================================================

  const returnToOrigin = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start(() => {
      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // 보드 안에서 놓았을 때: 놓은 자리에 그대로 둔다
  // (보드 밖이면 가장 가까운 보드 안쪽으로 보정)
  // ==========================================================

  const settleInBoard = () => {
    const origin = originRef.current;
    const board = dragRef.current.board;

    if (!origin || !board) {
      returnToOrigin();
      return;
    }

    const { x: px, y: py } = position.current;

    const minX = board.left + BOARD_SETTLE_PADDING - origin.x;
    const maxX = board.right - BOARD_SETTLE_PADDING - (origin.x + origin.width);
    const minY = board.top + BOARD_SETTLE_PADDING - origin.y;
    const maxY =
      board.bottom - BOARD_SETTLE_PADDING - (origin.y + origin.height);

    const x = clamp(px, minX, Math.max(minX, maxX));
    const y = clamp(py, minY, Math.max(minY, maxY));

    // 이미 보드 안이면 그대로 둔다
    if (x === px && y === py) {
      latest.current.onDragEnd();
      return;
    }

    Animated.spring(pan, {
      toValue: { x, y },
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start(() => {
      position.current = { x, y };
      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // Correct answer animation
  // 놓은 자리/크기 그대로 "탁" 붙는 느낌 -> 바구니에 스티커로 인계
  // ==========================================================

  const settleIntoBasket = (targetId: string, rect: DragOrigin) => {
    if (busyRef.current) return;

    const origin = originRef.current;
    if (!origin) return;

    busyRef.current = true;

    // 바구니(BasketSlot) 좌상단 기준 좌표
    const placement: StickerPlacement = {
      x: origin.x + position.current.x - rect.x,
      y: origin.y + position.current.y - rect.y,
      size: latest.current.objectSize + BUBBLE_EXTRA_SIZE,
      artSize: latest.current.objectSize,
    };

    triggerHaptic("success");
    playSound("correct_sound");

    scale.setValue(1);
    fade.setValue(1);
    burst.setValue(0);
    rotateAnim.setValue(0);

    Animated.sequence([
      // 살짝 커졌다가
      Animated.timing(scale, {
        toValue: 1.15,
        duration: 90,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // 제 크기로 안착
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 140,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        latest.current.onCorrectDrop(
          latest.current.objectId,
          targetId,
          placement,
        );
      }

      busyRef.current = false;
      latest.current.onDragEnd();
    });

    // Burst runs concurrently with the object animation
    Animated.timing(burst, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  // ==========================================================
  // Wrong answer animation
  // Bounce up -> rotate and fall -> fade out
  // ==========================================================

  const fadeAway = () => {
    if (busyRef.current) return;

    busyRef.current = true;

    triggerHaptic("error");
    playSound("wrong_sound");

    rotateAnim.setValue(0);

    const currentX = position.current.x;
    const currentY = position.current.y;

    // Rotation runs concurrently with the falling animation
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 450,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      // Stage 1: bounce upward
      Animated.timing(pan, {
        toValue: {
          x: currentX,
          y: currentY - 40,
        },
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      // Stage 2: fall down and fade
      Animated.parallel([
        Animated.timing(pan, {
          toValue: {
            x: currentX,
            y: currentY + 700,
          },
          duration: 350,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        pan.setValue({ x: 0, y: 0 });
        position.current = { x: 0, y: 0 };

        scale.setValue(1);
        rotateAnim.setValue(0);

        latest.current.onWrongDrop?.(latest.current.objectId);
      }

      busyRef.current = false;
      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // Release and target detection
  // 놓은 위치가 어떤 목적지 안인지 찾고,
  // 그 목적지가 object.targetId와 같으면 정답
  // ==========================================================

  const handleRelease = () => {
    const origin = originRef.current;

    if (!origin) {
      returnToOrigin();
      return;
    }

    latest.current.getTargetRects((rects) => {
      const centerX = origin.x + position.current.x + origin.width / 2;
      const centerY = origin.y + position.current.y + origin.height / 2;

      let hitTargetId: string | null = null;

      for (const [targetId, rect] of Object.entries(rects)) {
        const left = rect.x - TARGET_HIT_PADDING;
        const right = rect.x + rect.width + TARGET_HIT_PADDING;
        const top = rect.y - TARGET_HIT_PADDING;
        const bottom = rect.y + rect.height + TARGET_HIT_PADDING;

        if (
          centerX >= left &&
          centerX <= right &&
          centerY >= top &&
          centerY <= bottom
        ) {
          hitTargetId = targetId;
          break;
        }
      }

      // 바구니가 아닌 곳 -> 놓은 자리에 그대로
      if (!hitTargetId) {
        settleInBoard();
        return;
      }

      if (hitTargetId === latest.current.targetId) {
        settleIntoBasket(hitTargetId, rects[hitTargetId]);
      } else {
        fadeAway();
      }
    });
  };

  // ==========================================================
  // PanResponder
  // ==========================================================

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        !latest.current.isPlaced &&
        !busyRef.current &&
        (Math.abs(gesture.dx) > DRAG_THRESHOLD ||
          Math.abs(gesture.dy) > DRAG_THRESHOLD),

      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        triggerHaptic("light");
        pan.stopAnimation();

        dragRef.current = {
          start: { ...position.current },
          range: null,
          board: null,
        };

        if (
          bubbleRef.current &&
          typeof bubbleRef.current.measureInWindow === "function"
        ) {
          bubbleRef.current?.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              const originX = x - position.current.x;
              const originY = y - position.current.y;

              originRef.current = {
                x: originX,
                y: originY,
                width,
                height,
              };

              latest.current.getDragBounds((bounds) => {
                dragRef.current.range = {
                  minX: bounds.left - originX,
                  maxX: bounds.right - (originX + width),
                  minY: bounds.top - originY,
                  maxY: bounds.bottom - (originY + height),
                };
                dragRef.current.board = bounds.board;
              });
            },
          );
        }

        latest.current.onDragStart();
      },

      onPanResponderMove: (_, gesture) => {
        const { start, range } = dragRef.current;

        let x = start.x + gesture.dx;
        let y = start.y + gesture.dy;

        if (range) {
          x = clamp(x, range.minX, range.maxX);
          y = clamp(y, range.minY, range.maxY);
        }

        pan.setValue({ x, y });
      },

      onPanResponderRelease: handleRelease,
      onPanResponderTerminate: returnToOrigin,
    }),
  ).current;

  // ==========================================================
  // Rotation interpolation
  // ==========================================================

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-35deg"],
  });

  // ==========================================================
  // Burst particles
  // ==========================================================

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
    const distance = bubbleSize * (index % 2 === 0 ? 0.95 : 0.7);
    const size = index % 2 === 0 ? 9 : 6;

    const particleColor =
      index % 3 === 0
        ? primaryColor
        : PARTICLE_COLORS[index % PARTICLE_COLORS.length];

    return (
      <Particle
        key={index}
        color={particleColor}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,

          opacity: burst.interpolate({
            inputRange: [0, 0.1, 0.65, 1],
            outputRange: [0, 1, 1, 0],
          }),

          transform: [
            {
              translateX: burst.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.cos(angle) * distance],
              }),
            },
            {
              translateY: burst.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.sin(angle) * distance],
              }),
            },
            {
              scale: burst.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.3],
              }),
            },
          ],
        }}
      />
    );
  });

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <Animated.View
      {...panResponder.panHandlers}
      // 바구니에 들어간 뒤에는 (투명하게 남아 있어도) 터치를 막지 않도록
      pointerEvents={isPlaced ? "none" : "auto"}
      style={{
        position: "absolute",
        left: slotLeft,
        top: slotTop,
        width: bubbleSize,
        height: bubbleSize,
        zIndex,
        transform: [...pan.getTranslateTransform(), { rotate: spin }],
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: fade,
          transform: [{ scale }],
        }}
      >
        <ObjectCell
          activeOpacity={0.8}
          disabled={isPlaced}
          onPress={onPress}
          style={{ opacity: isPlaced ? 0 : 1 }}
        >
          <ObjectBubble
            ref={(node: any) => {
              bubbleRef.current = node;
              tutorialRef?.(objectId, node);
            }}
            collapsable={false}
            size={bubbleSize}
            isSelected={isSelected}
          >
            <ObjectArtwork object={object} size={objectSize} />
          </ObjectBubble>
        </ObjectCell>
      </Animated.View>

      <BurstLayer pointerEvents="none">
        <Ring
          size={bubbleSize}
          color={primaryColor}
          style={{
            opacity: burst.interpolate({
              inputRange: [0, 0.1, 1],
              outputRange: [0, 0.8, 0],
            }),
            transform: [
              {
                scale: burst.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1.9],
                }),
              },
            ],
          }}
        />

        {particles}
      </BurstLayer>
    </Animated.View>
  );
}

// ============================================================
// Styled Components
// ============================================================

const ObjectCell = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ObjectBubble = styled.View<{
  size: number;
  isSelected: boolean;
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
`;

const BurstLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;
`;

const Ring = styled(Animated.View)<{
  size: number;
  color: string;
}>`
  position: absolute;

  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  border-radius: ${(p) => p.size / 2}px;
  border-width: 3px;
  border-color: ${(p) => p.color};
`;

const Particle = styled(Animated.View)<{
  color: string;
}>`
  position: absolute;
  background-color: ${(p) => p.color};
`;
