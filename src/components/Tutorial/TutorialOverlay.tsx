import React, { useEffect, useRef, useState } from "react";

import { Animated, Easing, StyleSheet, Text, View } from "react-native";

import { ColorSortingObject } from "../../types/colorSotringTypes";

import { classificationItems } from "../../data/classification/classificationItems";

import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

import HandPointer from "../../design-system/ui/HandPointer";

import styled from "styled-components/native";
import { AppText } from "../../utils/AppText";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";

type Point = {
  x: number;
  y: number;
};

type TutorialOverlayProps = {
  visible: boolean;
  object: ColorSortingObject | null;
  fromRef: React.RefObject<View | null>;
  toRef: React.RefObject<View | null>;
  onComplete: () => void;
  onGrab: () => void;
};

// colorId(red, blue ...)에 맞는 번역된 색상 이름을 가져온다.
function getColorName(colorId: string) {
  return i18n.t(`color_${colorId}`, { defaultValue: colorId });
}
// 배경색이 밝으면 어두운 글자, 어두우면 흰 글자
function getReadableTextColor(color?: string) {
  if (!color || !color.startsWith("#")) return "#59451a";
  let hex = color.slice(1);
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#4A3A12" : "#FFFFFF";
}

export default function TutorialOverlay({
  visible,
  object,
  fromRef,
  toRef,
  onComplete,
  onGrab,
}: TutorialOverlayProps) {
  useLanguage(); // 언어가 바뀌면 다시 렌더링
  const overlayRef = useRef<View>(null);

  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [objectSize, setObjectSize] = useState(72);
  // const [isPointing, setIsPointing] = useState(true);

  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const labelScale = useRef(new Animated.Value(0.4)).current;
  const sessionRef = useRef(0);

  // 좌표 측정용 View는 좌표가 없어도 항상 렌더링한다.
  useEffect(() => {
    const session = ++sessionRef.current;

    progress.stopAnimation();
    opacity.stopAnimation();
    progress.setValue(0);
    opacity.setValue(0);

    setStartPoint(null);
    setEndPoint(null);
    //  setIsPointing(true);

    if (!visible || !object) return;

    const timer = setTimeout(() => {
      const overlay = overlayRef.current;
      const from = fromRef.current;
      const to = toRef.current;

      console.log("[튜토리얼 참조 확인]", {
        overlay: !!overlay,
        from: !!from,
        to: !!to,
      });

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

            console.log("[튜토리얼 좌표]", { start, end });

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

  // 1. 색상 이름과 손가락을 먼저 보여준다.
  // 2. 잠깐 기다린 뒤 기존 드래그 시범을 실행한다.
  useEffect(() => {
    if (!visible || !object || !startPoint || !endPoint) return;

    const session = sessionRef.current;

    //  setIsPointing(true);

    // 말풍선 팝 애니메이션 (말풍선이 실제로 나타나는 시점에 실행)
    labelScale.setValue(0.85);
    const labelAnimation = Animated.sequence([
      // 1) 살짝 작은 상태에서 부드럽게 제 크기로 (튀지 않음)
      Animated.timing(labelScale, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // 2) 읽는 동안 천천히 한 번 숨 쉬듯 커졌다 작아짐
      Animated.timing(labelScale, {
        toValue: 1.06,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(labelScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
    labelAnimation.start();

    // const pointingTimer = setTimeout(() => {
    //   if (sessionRef.current === session) {
    //     setIsPointing(false);
    //   }
    // }, 1800);

    const animation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(1550),
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
        onComplete();
      }
    });

    return () => {
      // clearTimeout(pointingTimer);
      animation.stop();
      labelAnimation.stop();
    };
  }, [
    visible,
    object,
    startPoint,
    endPoint,
    progress,
    opacity,
    labelScale,
    onComplete,
  ]);
  const item = object
    ? classificationItems.find((entry) => entry.id === object.itemId)
    : undefined;

  const variant = item?.variants.find(
    (entry) => entry.colorId === object?.colorId,
  );

  const primaryColor = object
    ? (variant?.primary ?? COLOR_SORTING_COLORS[object.colorId])
    : undefined;

  const colorName = object ? getColorName(object.colorId) : "";

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
        <>
          {/* {isPointing && (
            <LabelContainer
              style={{ opacity, transform: [{ scale: labelScale }] }}
            >
              <LabelText
                bgColor={primaryColor ?? "#fff5c7"}
                textColor={getReadableTextColor(primaryColor)}
              >
                {colorName}
              </LabelText>
            </LabelContainer>
          )} */}

          <LabelContainer
            style={{ opacity, transform: [{ scale: labelScale }] }}
          >
            <LabelText
              bgColor={primaryColor ?? "#fff5c7"}
              textColor={getReadableTextColor(primaryColor)}
            >
              {colorName}
            </LabelText>
          </LabelContainer>

          <MovingGroup
            style={{
              left: startPoint.x - objectSize / 2,
              top: startPoint.y - objectSize / 2,
              opacity,
              transform: [{ translateX }, { translateY }],
            }}
          >
            <ObjectContainer size={objectSize}>
              <RenderColorSortingObjectSvg
                object={object}
                primary={primaryColor!}
                secondary={variant?.secondary}
                accent={variant?.accent}
                size={objectSize}
              />
            </ObjectContainer>

            <HandContainer>
              <HandPointer size={54} tapping={false} />
            </HandContainer>
          </MovingGroup>
        </>
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

const LabelContainer = styled(AnimatedView)`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 10000;
  elevation: 10000;
`;

const LabelText = styled(AppText)<{ bgColor: string; textColor: string }>`
  overflow: hidden;
  padding: 10px 28px;
  border-radius: 22px;
  border-width: 4px;
  border-color: rgba(255, 255, 255, 0.9);
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  font-size: 30px;
  font-weight: 800;
  text-align: center;
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

const ObjectContainer = styled.View<{
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  align-items: center;
  justify-content: center;
`;

const HandContainer = styled.View`
  position: absolute;
  right: -8px;
  bottom: -18px;
`;
