import styled from "styled-components/native";

import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";

import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";
import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import HandPointer from "../../design-system/ui/HandPointer";
import { ShapeSortingObject } from "../../generators/classification/generateShapeSortingProblem";
import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";
import { ObjectArtwork } from "../CategorySorting/CategorySortingObjectComponent";
import { SizeSortingObject } from "../../generators/classification/generateSizeSortingProblem";

type Point = {
  x: number;
  y: number;
};

// 모든 정렬 객체를 아우르는 통합 타입 정의
type SortingObject =
  | ColorSortingObject
  | ShapeSortingObject
  | CategorySortingObject
  | SizeSortingObject;

// Category 오브젝트만 instanceId를 가진다
const isCategoryObject = (
  object: SortingObject | null,
): object is CategorySortingObject => !!object && "instanceId" in object;

type TutorialOverlayProps = {
  visible: boolean;
  object: SortingObject | null;
  fromRef: React.RefObject<View | null>;
  toRef: React.RefObject<View | null>;
  onComplete: () => void;
  onGrab: () => void;
};

export default function TutorialOverlay({
  visible,
  object,
  fromRef,
  toRef,
  onComplete,
  onGrab,
}: TutorialOverlayProps) {
  const overlayRef = useRef<View>(null);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [objectSize, setObjectSize] = useState(72);
  const TUTORIAL_EXTRA_SCALE = 0.85;
  const objectScale =
    object && "scale" in object && typeof object.scale === "number"
      ? object.scale
      : 1;

  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const sessionRef = useRef(0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const session = ++sessionRef.current;

    progress.stopAnimation();
    opacity.stopAnimation();
    progress.setValue(0);
    opacity.setValue(0);

    setStartPoint(null);
    setEndPoint(null);

    if (!visible || !object) return;

    const timer = setTimeout(() => {
      const overlay = overlayRef.current;
      const from = fromRef.current;
      const to = toRef.current;

      if (!overlay || !from || !to) return;

      overlay.measureInWindow((ox, oy) => {
        if (sessionRef.current !== session) return;

        from.measureInWindow((fx, fy, fw, fh) => {
          if (sessionRef.current !== session) return;

          to.measureInWindow((tx, ty, tw, th) => {
            if (sessionRef.current !== session) return;
            if (fw <= 0 || fh <= 0 || tw <= 0 || th <= 0) return;

            const start = {
              x: fx - ox + fw / 2,
              y: fy - oy + fh / 2,
            };

            const end = {
              x: tx - ox + tw / 2,
              y: ty - oy + th / 2,
            };

            setStartPoint(start);
            setEndPoint(end);
            setObjectSize(Math.max(40, Math.min(fw - 12, fh - 12)));
          });
        });
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      sessionRef.current++;
      progress.stopAnimation();
      opacity.stopAnimation();
    };
  }, [visible, object, fromRef, toRef, progress, opacity]);

  useEffect(() => {
    if (!visible || !object || !startPoint || !endPoint) return;

    const session = sessionRef.current;

    const animation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(350),
      Animated.timing(progress, {
        toValue: 1,
        duration: 1300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished && sessionRef.current === session) {
        onCompleteRef.current(); // ← onComplete() 대신
      }
    });

    return () => animation.stop();
  }, [visible, object, startPoint, endPoint, progress, opacity]);

  // ==========================================================
  // 색상 계산 (Color / Shape 오브젝트용)
  // Category 오브젝트는 primary/secondary/accent를 직접 갖고 있어서
  // 아래 조회를 거치지 않는다.
  // ==========================================================

  const itemId = object && "itemId" in object ? object.itemId : undefined;
  const colorId = object && "colorId" in object ? object.colorId : undefined;

  // Size 오브젝트처럼 variant를 직접 가진 경우 우선 사용
  const ownVariant = object && "variant" in object ? object.variant : undefined;

  const item = itemId
    ? classificationItems.find((entry) => entry.id === itemId)
    : undefined;

  const variant =
    ownVariant ??
    item?.variants.find((entry) => colorId && entry.colorId === colorId);

  const primaryColor = object
    ? (variant?.primary ??
      (colorId
        ? COLOR_SORTING_COLORS[colorId as keyof typeof COLOR_SORTING_COLORS]
        : undefined))
    : undefined;
  // const item = itemId
  //   ? classificationItems.find((entry) => entry.id === itemId)
  //   : undefined;

  // const variant = item?.variants.find(
  //   (entry) => colorId && entry.colorId === colorId,
  // );

  // const primaryColor = object
  //   ? (variant?.primary ??
  //     (colorId
  //       ? COLOR_SORTING_COLORS[colorId as keyof typeof COLOR_SORTING_COLORS]
  //       : undefined))
  //   : undefined;

  const translateX =
    startPoint && endPoint
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, endPoint.x - startPoint.x],
        })
      : 0;

  const translateY =
    startPoint && endPoint
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, endPoint.y - startPoint.y],
        })
      : 0;

  return (
    <Overlay ref={overlayRef} collapsable={false} pointerEvents="none">
      {visible && object && startPoint && endPoint && (
        <MovingGroup
          style={{
            left: startPoint.x - objectSize / 2,
            top: startPoint.y - objectSize / 2,
            opacity: 1,
            transform: [{ translateX }, { translateY }],
          }}
        >
          <ObjectContainer
            style={{
              width: objectSize,
              height: objectSize,
              transform: [{ scale: objectScale }],
            }}
          >
            {isCategoryObject(object) ? (
              <ObjectArtwork object={object} size={objectSize} />
            ) : (
              <RenderClassificationObjectSvg
                object={object}
                primary={primaryColor!}
                secondary={variant?.secondary}
                accent={variant?.accent}
                size={objectSize}
              />
            )}
          </ObjectContainer>

          <HandContainer>
            <HandPointer size={54} tapping={false} />
          </HandContainer>
        </MovingGroup>
      )}
    </Overlay>
  );
}

const AnimatedView = Animated.View;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  elevation: 9999;
`;

const MovingGroup = styled(AnimatedView)`
  position: absolute;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  elevation: 9999;
`;

const ObjectContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const HandContainer = styled.View`
  position: absolute;
  right: -8px;
  bottom: -18px;
`;
