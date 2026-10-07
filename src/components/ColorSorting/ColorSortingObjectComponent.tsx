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

// 바구니 판정 영역을 살짝 넓혀줌
const TARGET_HIT_PADDING = 8;

// 정답 폭죽
const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

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

  // 정답 폭죽 (0 → 1)
  const burst = useRef(new Animated.Value(0)).current;

  const rotateAnim = useRef(new Animated.Value(0)).current;

  // ==========================================================
  // Refs
  // ==========================================================

  const posRef = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef<View>(null);
  const busyRef = useRef(false);

  // 드래그 시작 시 "원래 자리"의 화면 좌표 (translate 제외)
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

  // ==========================================================
  // 최신 props 유지
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
    };
  }, [pan]);

  // ==========================================================
  // 원상복구
  // - 바구니에서 꺼냈을 때
  // - 다음 라운드 / 레벨로 넘어가서 isPlaced가 false로 돌아왔을 때
  // - 같은 컴포넌트가 다른 object로 재사용될 때
  // ==========================================================

  useEffect(() => {
    if (!isPlaced) {
      pan.stopAnimation();
      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);
      fade.setValue(1);
      burst.setValue(0);

      busyRef.current = false;
    }
  }, [isPlaced, object.id, pan, scale, fade, burst]);

  // ==========================================================
  // 원래 자리로 돌아가기
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
  // 정답: 팡! 터지고 → 바구니로 예쁘게 안착
  // ==========================================================

  const settleIntoBasket = () => {
    busyRef.current = true;
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
      // 다음 문제는 빨리 생성
      latest.current.onCorrectDrop(
        latest.current.objectId,
        latest.current.colorId,
      );
      busyRef.current = false;
      latest.current.onDragEnd();
    });
    // burst는 따로 실행
    Animated.timing(burst, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  // ==========================================================
  // 오답: 톡! 펑! 비눗방울 터지듯 순식간에 팝업 삭제
  // ==========================================================
  // ==========================================================
  // 오답: 화면 밖으로 팅~! 튕겨 나가며 떨어지기
  // ==========================================================
  const fadeAway = () => {
    busyRef.current = true;
    rotateAnim.setValue(0);

    const currentX = posRef.current.x;
    const currentY = posRef.current.y;

    // 1. 회전 애니메이션 동시 진행 (살짝 갸우뚱하며 튕김)
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 450,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // 2. 통~ 튀었다가 화면 밑으로 떨어지기
    Animated.sequence([
      // [1단계] 살짝 위로 튀어 오름 (Bounce Up)
      Animated.timing(pan, {
        toValue: {
          x: currentX,
          y: currentY - 40, // 현재 위치보다 40px 위로 팅!
        },
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // [2단계] 화면 아래로 빠르게 하강 (Drop Down)
      Animated.parallel([
        Animated.timing(pan, {
          toValue: {
            x: currentX, // 필요 시 약간 옆으로 비스듬히(currentX + 30) 튕기게 할 수도 있습니다.
            y: currentY + 700, // 화면 밑으로 완전히 튕겨 나감
          },
          duration: 350,
          easing: Easing.in(Easing.quad), // 가속도 붙으며 떨어짐
          useNativeDriver: true,
        }),
        // 떨어진 후 스르륵 페이드
        Animated.timing(fade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // 애니메이션 완료 후 원상복구 및 오답 콜백 실행
      pan.setValue({ x: 0, y: 0 });
      scale.setValue(1);
      rotateAnim.setValue(0);

      latest.current.onWrongDrop?.(latest.current.objectId);

      busyRef.current = false;
      latest.current.onDragEnd();
    });
  };
  // const fadeAway = () => {
  //   busyRef.current = true;
  //   Animated.sequence([
  //     // 1. 깜짝 놀라듯 아주 짧게 살짝 커짐 (약 0.08초)
  //     Animated.timing(scale, {
  //       toValue: 1.2,
  //       duration: 90,
  //       easing: Easing.out(Easing.ease),
  //       useNativeDriver: true,
  //     }),
  //     // 2. 쏙 오므라들며 삭제
  //     Animated.parallel([
  //       Animated.timing(scale, {
  //         toValue: 0.1,
  //         duration: 110,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(fade, {
  //         toValue: 0,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //   ]).start(() => {
  //     // 애니메이션 종료 후 상태값 초기화 및 콜백
  //     pan.setValue({ x: 0, y: 0 });
  //     scale.setValue(1);

  //     latest.current.onWrongDrop?.(latest.current.objectId);

  //     busyRef.current = false;
  //     latest.current.onDragEnd();
  //   });
  // };

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
        returnToOrigin();
        return;
      }

      const [targetColorId] = hitTarget;

      if (targetColorId === latest.current.colorId) {
        settleIntoBasket(); // targetRect 제거
        return;
      }

      fadeAway();
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
        pan.stopAnimation();

        dragRef.current = {
          start: { ...posRef.current },
          range: null,
        };

        bubbleRef.current?.measureInWindow((x, y, width, height) => {
          // 현재 translate를 빼서 "원래 자리"의 좌표로 저장
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
  // 정답 폭죽 파티클
  // ==========================================================

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

          // burst = 0 일 때는 보이지 않는다
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

  // rotate interpolate 설정
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-35deg"], // 왼쪽으로 살짝 돌면서 튕겨나감
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

        // 드래그 중인 오브젝트만 zIndex + elevation을 "같이" 올린다
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

      <BurstLayer pointerEvents="none">
        {/* 퍼져 나가는 링 */}
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
