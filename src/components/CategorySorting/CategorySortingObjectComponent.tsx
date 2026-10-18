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
};

export type DragOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TargetRects = Record<string, DragOrigin>;

type Props = {
  object: CategorySortingObject;
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
  const bubbleRef = useRef<View>(null);
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
  }>({
    start: { x: 0, y: 0 },
    range: null,
  });

  // ==========================================================
  // Latest props
  // PanResponder는 한 번만 만들어지므로 최신 props는 ref로 읽는다
  // ==========================================================

  const latest = useRef({
    objectId,
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
    objectId,
    targetId: object.targetId,
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
  // Return to original position
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
  // Correct answer animation
  // Pop -> shrink/fade -> burst
  // ==========================================================

  const settleIntoBasket = (targetId: string) => {
    if (busyRef.current) return;

    busyRef.current = true;

    triggerHaptic("success");
    playSound("correct_sound");

    scale.setValue(1);
    fade.setValue(1);
    burst.setValue(0);
    rotateAnim.setValue(0);

    Animated.sequence([
      // Stage 1: pop
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 110,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),

      // Stage 2: shrink and fade out
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
    ]).start(({ finished }) => {
      if (finished) {
        latest.current.onCorrectDrop(latest.current.objectId, targetId);
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

      if (!hitTargetId) {
        returnToOrigin();
        return;
      }

      if (hitTargetId === latest.current.targetId) {
        settleIntoBasket(hitTargetId);
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
        };

        bubbleRef.current?.measureInWindow((x, y, width, height) => {
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
          });
        });

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
            ref={(node: View | null) => {
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
