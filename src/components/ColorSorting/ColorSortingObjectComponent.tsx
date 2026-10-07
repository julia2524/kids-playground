import React, { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";

import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { ColorSortingObject } from "../../types/colorSotringTypes";

// ============================================================
// Types
// ============================================================

export type DragBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TargetRects = Record<string, Rect>;

type ColorSortingObjectProps = {
  object: ColorSortingObject;
  objectSize: number;

  isSelected: boolean;
  isPlaced: boolean;
  isDragging: boolean;

  onPress: () => void;

  getDragBounds: (callback: (bounds: DragBounds) => void) => void;

  getTargetRects: (callback: (rects: TargetRects) => void) => void;

  onDragStart: () => void;
  onDragEnd: () => void;

  onCorrectDrop: (objectId: string, targetColorId: string) => void;

  onWrongDrop?: (objectId: string) => void;
};

// ============================================================
// Constants
// ============================================================

const BUBBLE_EXTRA_SIZE = 12;
const DRAG_THRESHOLD = 4;

const REAPPEAR_DELAY = 300;

const PARTICLE_COUNT = 10;

// 바구니 판정 영역을 살짝 넓혀줌
const TARGET_HIT_PADDING = 8;

// ============================================================
// Utils
// ============================================================

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ============================================================
// Component
// ============================================================

export default function ColorSortingObjectComponent({
  object,
  objectSize,
  isSelected,
  isPlaced,
  isDragging,

  onPress,

  getDragBounds,
  getTargetRects,

  onDragStart,
  onDragEnd,

  onCorrectDrop,
  onWrongDrop,
}: ColorSortingObjectProps) {
  // ==========================================================
  // Item / Color
  // ==========================================================

  const item = classificationItems.find((item) => item.id === object.itemId);

  const variant = item?.variants.find(
    (variant) => variant.colorId === object.colorId,
  );

  const basicColor = COLOR_SORTING_COLORS[object.colorId];

  const primaryColor = variant?.primary ?? basicColor;

  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;

  // ==========================================================
  // Animated Values
  // ==========================================================

  const pan = useRef(new Animated.ValueXY()).current;

  const scale = useRef(new Animated.Value(1)).current;

  const fade = useRef(new Animated.Value(1)).current;

  // 오답 폭발
  const burst = useRef(new Animated.Value(0)).current;

  // ==========================================================
  // Refs
  // ==========================================================

  const posRef = useRef({
    x: 0,
    y: 0,
  });

  const bubbleRef = useRef<View>(null);

  const busyRef = useRef(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 드래그 시작 당시 Bubble의 화면 좌표
  const originRectRef = useRef<Rect | null>(null);

  const dragRef = useRef<{
    start: {
      x: number;
      y: number;
    };

    range: {
      minX: number;
      maxX: number;
      minY: number;
      maxY: number;
    } | null;
  }>({
    start: {
      x: 0,
      y: 0,
    },
    range: null,
  });

  // ==========================================================
  // 최신 callback 유지
  // ==========================================================

  const latest = useRef({
    objectId: object.id,
    colorId: object.colorId as string,
    isPlaced,

    getDragBounds,
    getTargetRects,

    onDragStart,
    onDragEnd,

    onCorrectDrop,
    onWrongDrop,
  });

  latest.current = {
    objectId: object.id,
    colorId: object.colorId as string,
    isPlaced,

    getDragBounds,
    getTargetRects,

    onDragStart,
    onDragEnd,

    onCorrectDrop,
    onWrongDrop,
  };

  // ==========================================================
  // pan 위치 추적
  // ==========================================================

  useEffect(() => {
    const listenerId = pan.addListener((value) => {
      posRef.current = value;
    });

    return () => {
      pan.removeListener(listenerId);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pan]);

  // ==========================================================
  // Target에서 다시 꺼냈을 때
  // ==========================================================

  useEffect(() => {
    if (!isPlaced) {
      pan.setValue({
        x: 0,
        y: 0,
      });

      scale.setValue(1);
      fade.setValue(1);
      burst.setValue(0);
    }
  }, [isPlaced, pan, scale, fade, burst]);

  // ==========================================================
  // 원래 자리로 돌아가기
  // ==========================================================

  const returnToOrigin = () => {
    Animated.spring(pan, {
      toValue: {
        x: 0,
        y: 0,
      },

      friction: 6,
      tension: 80,

      useNativeDriver: true,
    }).start(() => {
      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // 정답
  // ==========================================================

  const settleIntoBasket = (rect: Rect) => {
    const origin = originRectRef.current;

    if (!origin) {
      returnToOrigin();
      return;
    }

    busyRef.current = true;

    // 현재 Bubble의 실제 중심
    const currentX = origin.x + posRef.current.x;

    const currentY = origin.y + posRef.current.y;

    const currentCenterX = currentX + origin.width / 2;

    const currentCenterY = currentY + origin.height / 2;

    // 바구니 중심
    const targetCenterX = rect.x + rect.width / 2;

    const targetCenterY = rect.y + rect.height / 2;

    const toX = posRef.current.x + (targetCenterX - currentCenterX);

    const toY = posRef.current.y + (targetCenterY - currentCenterY);

    Animated.parallel([
      Animated.spring(pan, {
        toValue: {
          x: toX,
          y: toY,
        },

        friction: 7,
        tension: 90,

        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 0.55,

        friction: 7,

        useNativeDriver: true,
      }),
    ]).start(() => {
      // 원본을 먼저 숨김
      fade.setValue(0);

      // 원래 좌표로 초기화
      pan.setValue({
        x: 0,
        y: 0,
      });

      scale.setValue(1);

      // 실제 게임 상태에 등록
      latest.current.onCorrectDrop(
        latest.current.objectId,
        latest.current.colorId,
      );

      busyRef.current = false;

      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // 오답 → 펑!
  // ==========================================================
  const popAway = () => {
    busyRef.current = true;
    burst.setValue(0);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.45,
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(burst, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      latest.current.onWrongDrop?.(latest.current.objectId);

      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);

      busyRef.current = false;
      latest.current.onDragEnd();
    });
  };

  // ==========================================================
  // Drop 판정
  // ==========================================================

  const handleRelease = () => {
    const origin = originRectRef.current;

    if (!origin) {
      returnToOrigin();
      return;
    }

    latest.current.getTargetRects((rects) => {
      // 현재 Bubble의 화면상 위치
      const currentX = origin.x + posRef.current.x;

      const currentY = origin.y + posRef.current.y;

      const centerX = currentX + origin.width / 2;

      const centerY = currentY + origin.height / 2;

      // ======================================================
      // 중심점이 들어간 Target 찾기
      // ======================================================
      let hitTarget: [string, Rect] | null = null;

      for (const [colorId, rect] of Object.entries(rects)) {
        const left = rect.x - TARGET_HIT_PADDING;
        const right = rect.x + rect.width + TARGET_HIT_PADDING;
        const top = rect.y - TARGET_HIT_PADDING;
        const bottom = rect.y + rect.height + TARGET_HIT_PADDING;

        const isInside =
          centerX >= left &&
          centerX <= right &&
          centerY >= top &&
          centerY <= bottom;

        if (isInside) {
          hitTarget = [colorId, rect];
          break;
        }
      }
      if (__DEV__) {
        console.log("[DROP]", {
          object: latest.current.objectId,
          color: latest.current.colorId,

          center: {
            x: Math.round(centerX),
            y: Math.round(centerY),
          },

          targets: rects,

          hitTarget,
        });
      }

      // ======================================================
      // 바구니 밖
      // ======================================================

      if (!hitTarget) {
        returnToOrigin();
        return;
      }

      const [targetColorId, targetRect] = hitTarget;

      // ======================================================
      // 정답
      // ======================================================

      if (targetColorId === latest.current.colorId) {
        settleIntoBasket(targetRect);

        return;
      }

      // ======================================================
      // 오답
      // ======================================================

      popAway();
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

      // ======================================================
      // Drag Start
      // ======================================================

      onPanResponderGrant: () => {
        pan.stopAnimation();

        dragRef.current = {
          start: {
            ...posRef.current,
          },

          range: null,
        };

        // 드래그 시작 시 원본 위치 측정
        bubbleRef.current?.measureInWindow((x, y, width, height) => {
          originRectRef.current = {
            x,
            y,
            width,
            height,
          };

          latest.current.getDragBounds((bounds) => {
            const originX = x - posRef.current.x;

            const originY = y - posRef.current.y;

            dragRef.current.range = {
              minX: bounds.left - originX,

              maxX: bounds.right - (originX + width),

              minY: bounds.top - originY,

              maxY: bounds.bottom - (originY + height),
            };
          });
        });

        latest.current.onDragStart();
      },

      // ======================================================
      // Drag Move
      // ======================================================

      onPanResponderMove: (_, gesture) => {
        const { start, range } = dragRef.current;

        let x = start.x + gesture.dx;

        let y = start.y + gesture.dy;

        if (range) {
          x = clamp(x, range.minX, range.maxX);

          y = clamp(y, range.minY, range.maxY);
        }

        pan.setValue({
          x,
          y,
        });
      },

      // ======================================================
      // Release
      // ======================================================

      onPanResponderRelease: handleRelease,

      onPanResponderTerminate: returnToOrigin,
    }),
  ).current;

  // ==========================================================
  // Burst Particles
  // ==========================================================

  const particles = Array.from({
    length: PARTICLE_COUNT,
  }).map((_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2;

    const distance = bubbleSize * 0.85;

    return (
      <Particle
        key={index}
        color={primaryColor}
        style={{
          opacity: burst.interpolate({
            inputRange: [0, 0.65, 1],

            outputRange: [1, 1, 0],
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

                outputRange: [1, 0.25],
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
      style={[
        {
          flex: 1,

          transform: pan.getTranslateTransform(),
        },

        isDragging
          ? {
              zIndex: 30,
              elevation: 30,
            }
          : null,
      ]}
    >
      <Animated.View
        style={{
          flex: 1,

          opacity: fade,

          transform: [
            {
              scale,
            },
          ],
        }}
      >
        <ObjectCell
          activeOpacity={0.8}
          disabled={isPlaced}
          onPress={onPress}
          style={{
            opacity: isPlaced ? 0 : 1,
          }}
        >
          <ObjectBubble
            ref={bubbleRef}
            collapsable={false}
            size={bubbleSize}
            isSelected={isSelected}
          >
            <RenderColorSortingObjectSvg
              object={object}
              primary={primaryColor}
              secondary={variant?.secondary}
              accent={variant?.accent}
              size={objectSize}
            />
          </ObjectBubble>
        </ObjectCell>
      </Animated.View>

      {/* 펑! 파티클 */}
      <BurstLayer pointerEvents="none">{particles}</BurstLayer>
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

const BurstLayer = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;
`;

const Particle = styled(Animated.View)<{
  color: string;
}>`
  position: absolute;

  width: 9px;
  height: 9px;

  border-radius: 5px;

  background-color: ${(p) => p.color};
`;
