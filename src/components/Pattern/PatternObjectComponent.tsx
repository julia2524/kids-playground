// components/Pattern/PatternObjectComponent.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";

import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { triggerHaptic } from "../../utils/haptic";
import { playSound } from "../../utils/sound";
import type { PatternElement } from "../../types/Pattern/patternTypes";
import { areSameElement } from "../../hooks/usePatternGame";

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
  element: PatternElement;
  objectId: string;
  objectSize: number;

  answer: PatternElement;
  isSelected: boolean;
  isWrong: boolean; // 오답 처리됨 → 사라짐 (다른 오브젝트는 absolute라 안 움직임)
  onPress: () => void;
  getDragBounds: (callback: (bounds: DragBounds) => void) => void;
  getTargetRects: (callback: (rects: TargetRects) => void) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onCorrectDrop: (element: PatternElement) => void;
  onWrongDrop: (objectId: string) => void;
};

// ============================================================
// Constants
// ============================================================

export const BUBBLE_EXTRA_SIZE = 16;
const DRAG_THRESHOLD = 4;
const TARGET_HIT_PADDING = 12;
const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

const COLOR_MAP: Record<string, string> = {
  red: "#FF6464",
  yellow: "#F6D45B",
  green: "#6EBF8B",
  blue: "#68A7EE",
  black: "#3D4856",
  purple: "#B39AE8",
  white: "#FFFFFF",
  orange: "#F4A866",
  pink: "#F1A3C4",
  brown: "#A78369",
  natural: "#69A98A",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// ============================================================
// Artwork
// ============================================================

function PatternArtwork({
  element,
  size,
}: {
  element: PatternElement;
  size: number;
}) {
  if (element.kind === "color") {
    return (
      <View
        style={{
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size * 0.36,
          backgroundColor: COLOR_MAP[element.colorId] ?? "#C7CDD6",
          borderWidth: 2,
          borderColor:
            element.colorId === "white" ? "#D9DEE7" : "rgba(0,0,0,0.04)",
        }}
      />
    );
  }

  if (element.kind === "shape") {
    return (
      <RenderClassificationObjectSvg
        object={{ kind: "simple_shape", shapeId: element.shape } as any}
        primary={COLOR_MAP[element.colorId] ?? "#68A7EE"}
        size={size}
      />
    );
  }

  const variant = element.item.variants?.[0];
  return (
    <RenderClassificationObjectSvg
      object={{ kind: "item", itemId: element.item.id } as any}
      primary={variant?.primary ?? "#69A98A"}
      secondary={variant?.secondary}
      accent={variant?.accent}
      size={size}
    />
  );
}

function getPrimaryColor(element: PatternElement): string {
  if (element.kind === "color") return COLOR_MAP[element.colorId] ?? "#7C5CFF";
  if (element.kind === "shape") return COLOR_MAP[element.colorId] ?? "#68A7EE";
  return element.item.variants?.[0]?.primary ?? "#69A98A";
}

// ============================================================
// Component
// ============================================================

export default function PatternObjectComponent({
  element,
  objectId,
  objectSize,

  answer,
  isSelected,
  isWrong,
  onPress,
  getDragBounds,
  getTargetRects,
  onDragStart,
  onDragEnd,
  onCorrectDrop,
  onWrongDrop,
}: Props) {
  const bubbleSize = objectSize + BUBBLE_EXTRA_SIZE;
  const primaryColor = getPrimaryColor(element);

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const position = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef<any>(null);
  const originRef = useRef<DragOrigin | null>(null);
  const busyRef = useRef(false);
  const doneRef = useRef(false); // 정답 처리 끝남 (투명하지만 자리는 유지)

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

  // PanResponder는 한 번만 만들어지므로 최신 props는 ref로 읽는다
  const latest = useRef({
    objectId,
    element,
    answer,
    getDragBounds,
    getTargetRects,
    onDragStart,
    onDragEnd,
    onCorrectDrop,
    onWrongDrop,
  });

  latest.current = {
    objectId,
    element,
    answer,
    getDragBounds,
    getTargetRects,
    onDragStart,
    onDragEnd,
    onCorrectDrop,
    onWrongDrop,
  };

  useEffect(() => {
    const id = pan.addListener((v) => {
      position.current = { x: v.x, y: v.y };
    });
    return () => pan.removeListener(id);
  }, [pan]);

  // ※ 리셋 effect 없음: 새 라운드는 부모 key 변경으로 새로 마운트된다

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

  // ---------- 정답: 팝 → 줄어들며 버스트 → 부모에 알림 ----------
  const playCorrect = () => {
    if (busyRef.current) return;
    busyRef.current = true;

    triggerHaptic("success");
    playSound("correct_sound");

    scale.setValue(1);
    fade.setValue(1);
    burst.setValue(0);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.25,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.35,
          duration: 200,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        doneRef.current = true;
        latest.current.onCorrectDrop(latest.current.element);
      }
      busyRef.current = false;
      latest.current.onDragEnd();
    });

    Animated.timing(burst, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  // ---------- 오답: 위로 튕김 → 회전하며 낙하 → 사라짐 ----------
  const playWrong = () => {
    if (busyRef.current) return;
    busyRef.current = true;

    triggerHaptic("error");
    playSound("wrong_sound");

    rotateAnim.setValue(0);
    const currentX = position.current.x;
    const currentY = position.current.y;

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 450,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(pan, {
        toValue: { x: currentX, y: currentY - 40 },
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(pan, {
          toValue: { x: currentX, y: currentY + 700 },
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
        latest.current.onWrongDrop(latest.current.objectId);
      }
      busyRef.current = false;
      latest.current.onDragEnd();
    });
  };

  const handleRelease = () => {
    const origin = originRef.current;
    if (!origin) {
      returnToOrigin();
      return;
    }

    latest.current.getTargetRects((rects) => {
      const centerX = origin.x + position.current.x + origin.width / 2;
      const centerY = origin.y + position.current.y + origin.height / 2;

      const blank = rects["blank"];
      let hitBlank = false;

      if (blank) {
        const left = blank.x - TARGET_HIT_PADDING;
        const right = blank.x + blank.width + TARGET_HIT_PADDING;
        const top = blank.y - TARGET_HIT_PADDING;
        const bottom = blank.y + blank.height + TARGET_HIT_PADDING;
        hitBlank =
          centerX >= left &&
          centerX <= right &&
          centerY >= top &&
          centerY <= bottom;
      }

      if (!hitBlank) {
        returnToOrigin();
        return;
      }

      // 빈칸에 떨어짐 → 정답 여부 판정
      if (areSameElement(latest.current.element, latest.current.answer)) {
        playCorrect();
      } else {
        playWrong();
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (_, g) =>
        !doneRef.current &&
        !busyRef.current &&
        (Math.abs(g.dx) > DRAG_THRESHOLD || Math.abs(g.dy) > DRAG_THRESHOLD),
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        triggerHaptic("light");
        pan.stopAnimation();
        dragRef.current = { start: { ...position.current }, range: null };

        if (
          bubbleRef.current &&
          typeof bubbleRef.current.measureInWindow === "function"
        ) {
          bubbleRef.current.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              const originX = x - position.current.x;
              const originY = y - position.current.y;
              originRef.current = { x: originX, y: originY, width, height };

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

      onPanResponderRelease: handleRelease,
      onPanResponderTerminate: returnToOrigin,
    }),
  ).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-35deg"],
  });

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

  // 오답으로 사라진 오브젝트: absolute 배치라 다른 오브젝트는 그대로 있다
  if (isWrong) {
    return null;
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        width: bubbleSize,
        height: bubbleSize,
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
          activeOpacity={0.85}
          disabled={doneRef.current}
          onPress={onPress}
        >
          <ObjectBubble
            ref={(node: any) => {
              bubbleRef.current = node;
            }}
            collapsable={false}
            size={bubbleSize}
            isSelected={isSelected}
          >
            <PatternArtwork element={element} size={objectSize} />
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
// Styled
// ============================================================

const ObjectCell = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ObjectBubble = styled.View<{ size: number; isSelected: boolean }>`
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

const Ring = styled(Animated.View)<{ size: number; color: string }>`
  position: absolute;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: ${(p) => p.size / 2}px;
  border-width: 3px;
  border-color: ${(p) => p.color};
`;

const Particle = styled(Animated.View)<{ color: string }>`
  position: absolute;
  background-color: ${(p) => p.color};
`;
