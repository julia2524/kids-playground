import React, { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";

import { SizeSortingObject } from "../../generators/classification/generateSizeSortingProblem";

import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
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
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TargetRects = Record<string, Rect>;

type Props = {
  object: SizeSortingObject;
  objectSize: number;
  isSelected: boolean;
  isPlaced: boolean;
  isDragging: boolean;
  onPress: () => void;
  getDragBounds: (callback: (bounds: DragBounds) => void) => void;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onCorrectDrop: (objectId: string, targetId: string) => void;
  onWrongDrop?: (objectId: string) => void;
  tutorialRef?: (objectId: string, node: View | null) => void;
};

// ============================================================
// Constants
// ============================================================

const BUBBLE_EXTRA_SIZE = 12;
const DRAG_THRESHOLD = 4;
const TARGET_HIT_PADDING = 8;
const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ============================================================
// SVG Preview
// ============================================================

function ObjectPreview({
  object,
  size = 84,
}: {
  object: SizeSortingObject;
  size?: number;
}) {
  const variant = object.variant;

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          transform: [{ scale: object.scale }],
          marginBottom: (1 - object.scale) * 20,
        }}
      >
        <RenderClassificationItemSvg
          itemId={object.itemId}
          primary={variant?.primary}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={size}
        />
      </View>
    </View>
  );
}

// ============================================================
// Component
// ============================================================

export default function SizeSortingObjectComponent({
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
  tutorialRef,
}: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
  }>({
    start: { x: 0, y: 0 },
    range: null,
  });

  const latest = useRef({
    objectId: object.id,
    targetId: object.targetId,
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
    targetId: object.targetId,
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

  useEffect(() => {
    if (!isPlaced) {
      pan.stopAnimation();
      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);
      fade.setValue(1);
      burst.setValue(0);
      rotateAnim.setValue(0);
      busyRef.current = false;
    }
  }, [isPlaced, object.id, pan, scale, fade, burst, rotateAnim]);

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

  // 정답: 팡! 터지고 대상 영역으로 이동 처리
  const settleIntoTarget = () => {
    busyRef.current = true;
    triggerHaptic("success");
    playSound("correct_sound");

    burst.setValue(0);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 110,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.4,
          duration: 220,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      latest.current.onCorrectDrop(
        latest.current.objectId,
        latest.current.targetId,
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

  // 오답: 튕겨 나가며 사라짐
  const fadeAway = () => {
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
      scale.setValue(1);
      fade.setValue(1);
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
          hitTarget = [targetId, rect];
          break;
        }
      }

      if (!hitTarget) {
        returnToOrigin();
        return;
      }

      const [targetId] = hitTarget;

      if (targetId === latest.current.targetId) {
        settleIntoTarget();
      } else {
        fadeAway();
      }
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
        };

        if (
          bubbleRef.current &&
          typeof bubbleRef.current.measureInWindow === "function"
        ) {
          bubbleRef.current?.measureInWindow(
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
    const distance =
      (objectSize + BUBBLE_EXTRA_SIZE) * (index % 2 === 0 ? 0.95 : 0.7);
    const particleSize = index % 2 === 0 ? 9 : 6;

    return (
      <Particle
        key={index}
        color={PARTICLE_COLORS[index % PARTICLE_COLORS.length]}
        style={{
          width: particleSize,
          height: particleSize,
          borderRadius: particleSize / 2,
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

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          flex: 1,
          transform: [...pan.getTranslateTransform(), { rotate: spin }],
        },
        isDragging ? { zIndex: 30, elevation: 30 } : null,
      ]}
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
              tutorialRef?.(object.id, node);
            }}
            collapsable={false}
            size={objectSize + BUBBLE_EXTRA_SIZE}
            isSelected={isSelected}
          >
            <ObjectPreview object={object} size={objectSize} />
          </ObjectBubble>
        </ObjectCell>
      </Animated.View>

      <BurstLayer pointerEvents="none">
        <Ring
          size={objectSize + BUBBLE_EXTRA_SIZE}
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
}>`
  position: absolute;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: ${(p) => p.size / 2}px;
  border-width: 3px;
  border-color: #7c5cff;
`;

const Particle = styled(Animated.View)<{ color: string }>`
  position: absolute;
  background-color: ${(p) => p.color};
`;
