import React, { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";
import { triggerHaptic } from "../../utils/haptic";
import { playSound } from "../../utils/sound";

// ============================================================
// Types
// ============================================================
export type DragBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  board: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TargetRects = Record<string, Rect>;

export type StickerPlacement = {
  x: number;
  y: number;
  size: number;
  artSize: number;
};

type ColorSortingObjectProps = {
  object: ColorSortingObject;
  objectSize: number;
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
    targetColorId: string,
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
const BOARD_SETTLE_PADDING = 4;
const TARGET_HIT_PADDING = 8;
const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

// ============================================================
// Utils
// ============================================================
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ============================================================
// Object artwork
// ============================================================
export function ObjectArtwork({
  object,
  size,
}: {
  object: ColorSortingObject;
  size: number;
}) {
  const item = classificationItems.find((item) => item.id === object.itemId);
  const variant = item?.variants.find(
    (variant) => variant.colorId === object.colorId,
  );
  const primary = variant?.primary ?? COLOR_SORTING_COLORS[object.colorId];
  return (
    <RenderClassificationObjectSvg
      object={object}
      primary={primary}
      secondary={variant?.secondary}
      accent={variant?.accent}
      size={size}
    />
  );
}

// ============================================================
// Component
// ============================================================
export default function ColorSortingObjectComponent({
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
}: ColorSortingObjectProps) {
  const item = classificationItems.find((item) => item.id === object.itemId);
  const variant = item?.variants.find(
    (variant) => variant.colorId === object.colorId,
  );
  const basicColor = COLOR_SORTING_COLORS[object.colorId];
  const primaryColor = variant?.primary ?? basicColor;
  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;

  // Animated Values
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 등장 애니메이션
  const entranceScale = useRef(new Animated.Value(0)).current;
  const entranceOpacity = useRef(new Animated.Value(0)).current;

  const posRef = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef<any>(null);
  const busyRef = useRef(false);
  const originRectRef = useRef<Rect | null>(null);
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

  const latest = useRef({
    objectId: object.id,
    colorId: object.colorId as string,
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
    objectId: object.id,
    colorId: object.colorId as string,
    objectSize,
    isPlaced,
    getDragBounds,
    getTargetRects,
    onDragStart,
    onDragEnd,
    onCorrectDrop,
    onWrongDrop,
  };

  useEffect(() => {
    const listenerId = pan.addListener((value) => {
      posRef.current = value;
    });
    return () => {
      pan.removeListener(listenerId);
    };
  }, [pan]);

  // isPlaced가 false일 때 (새 라운드 등장) → 완전 초기화 + 동시 팝업
  useEffect(() => {
    if (isPlaced) return;

    // 모든 애니메이션 강제 정지 + 초기화
    pan.stopAnimation();
    pan.setValue({ x: 0, y: 0 });
    posRef.current = { x: 0, y: 0 };

    scale.stopAnimation();
    scale.setValue(1);

    fade.stopAnimation();
    fade.setValue(1);

    burst.stopAnimation();
    burst.setValue(0);

    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);

    busyRef.current = false;
    originRectRef.current = null;

    // 등장 애니메이션 (모든 오브젝트가 동시에 시작)
    entranceScale.setValue(0.3);
    entranceOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(entranceScale, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(entranceOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isPlaced, object.id]);

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

  const settleInBoard = () => {
    triggerHaptic("light");
    const origin = originRectRef.current;
    const board = dragRef.current.board;
    if (!origin || !board) {
      returnToOrigin();
      return;
    }
    const { x: px, y: py } = posRef.current;
    const minX = board.left + BOARD_SETTLE_PADDING - origin.x;
    const maxX = board.right - BOARD_SETTLE_PADDING - (origin.x + origin.width);
    const minY = board.top + BOARD_SETTLE_PADDING - origin.y;
    const maxY =
      board.bottom - BOARD_SETTLE_PADDING - (origin.y + origin.height);
    const x = clamp(px, minX, Math.max(minX, maxX));
    const y = clamp(py, minY, Math.max(minY, maxY));

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
      posRef.current = { x, y };
      latest.current.onDragEnd();
    });
  };

  const settleIntoBasket = (rect: Rect) => {
    if (busyRef.current) return;
    const origin = originRectRef.current;
    if (!origin) return;

    busyRef.current = true;

    const placement: StickerPlacement = {
      x: origin.x + posRef.current.x - rect.x,
      y: origin.y + posRef.current.y - rect.y,
      size: latest.current.objectSize + BUBBLE_EXTRA_SIZE,
      artSize: latest.current.objectSize,
    };

    triggerHaptic("success");
    playSound("correct_sound");

    scale.setValue(1);
    fade.setValue(1);
    burst.setValue(0);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.15,
        duration: 90,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 140,
        useNativeDriver: true,
      }),
    ]).start(() => {
      latest.current.onCorrectDrop(
        latest.current.objectId,
        latest.current.colorId,
        placement,
      );
      busyRef.current = false;
      latest.current.onDragEnd();
    });

    Animated.timing(burst, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const fadeAway = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    triggerHaptic("error");
    playSound("wrong_sound");
    rotateAnim.setValue(0);
    const currentX = posRef.current.x;
    const currentY = posRef.current.y;

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 450,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(pan, {
        toValue: {
          x: currentX,
          y: currentY - 40,
        },
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
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
    ]).start(() => {
      pan.setValue({ x: 0, y: 0 });
      posRef.current = { x: 0, y: 0 };
      scale.setValue(1);
      rotateAnim.setValue(0);
      latest.current.onWrongDrop?.(latest.current.objectId);
      busyRef.current = false;
      latest.current.onDragEnd();
    });
  };

  const handleRelease = () => {
    const origin = originRectRef.current;
    if (!origin) {
      returnToOrigin();
      return;
    }

    latest.current.getTargetRects((rects) => {
      const centerX = origin.x + posRef.current.x + origin.width / 2;
      const centerY = origin.y + posRef.current.y + origin.height / 2;

      let hitTarget: [string, Rect] | null = null;
      for (const [colorId, rect] of Object.entries(rects)) {
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
          hitTarget = [colorId, rect];
          break;
        }
      }

      if (!hitTarget) {
        settleInBoard();
        return;
      }

      const [targetColorId, targetRect] = hitTarget;
      if (targetColorId === latest.current.colorId) {
        settleIntoBasket(targetRect);
        return;
      }

      fadeAway();
    });
  };

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
          start: { ...posRef.current },
          range: null,
          board: null,
        };

        if (
          bubbleRef.current &&
          typeof bubbleRef.current.measureInWindow === "function"
        ) {
          bubbleRef.current.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              const originX = x - posRef.current.x;
              const originY = y - posRef.current.y;
              originRectRef.current = {
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

  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
    const distance = bubbleSize * (index % 2 === 0 ? 0.95 : 0.7);
    const size = index % 2 === 0 ? 9 : 6;
    return (
      <Particle
        key={index}
        color={
          index % 3 === 0
            ? primaryColor
            : PARTICLE_COLORS[index % PARTICLE_COLORS.length]
        }
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

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-35deg"],
  });

  // 바구니에 들어간 뒤에는 아예 렌더링하지 않음 → 잔상 완전 제거
  if (isPlaced) {
    return null;
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      pointerEvents="auto"
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
          opacity: Animated.multiply(fade, entranceOpacity),
          transform: [{ scale: Animated.multiply(scale, entranceScale) }],
        }}
      >
        <ObjectCell activeOpacity={0.8} onPress={onPress}>
          <ObjectBubble
            ref={(node: any) => {
              bubbleRef.current = node;
              tutorialRef?.(object.id, node);
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
