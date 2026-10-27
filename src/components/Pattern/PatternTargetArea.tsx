// components/Pattern/PatternTargetArea.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import type {
  PatternElement,
  PatternRule,
} from "../../types/Pattern/patternTypes";
import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { playPatternXylophone } from "../../utils/sound";

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

type Props = {
  sequence: (PatternElement | null)[];
  blankIndex: number;
  placedElement: PatternElement | null;
  rule: PatternRule;
  blankSlotRef:
    | React.RefObject<View | null>
    | React.MutableRefObject<View | null>;
  playIntroAnimation?: boolean;
};

/**
 * 패턴 규칙에 따라 각 칸의 음 번호를 결정한다.
 * 0 = 도, 1 = 레, 2 = 미
 */
function getPatternNoteIndex(rule: PatternRule, index: number): number {
  switch (rule) {
    case "AB":
      return index % 2;

    case "AAB":
      return [0, 0, 1][index % 3];

    case "ABB":
      return [0, 1, 1][index % 3];

    case "ABC":
      return index % 3;

    default:
      return 0;
  }
}
function renderElement(
  element: PatternElement | null,
  size: number,
): React.ReactNode {
  if (!element) {
    return <QuestionMark>?</QuestionMark>;
  }

  if (element.kind === "color") {
    return (
      <View
        style={[
          styles.colorDot,
          {
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: size * 0.36,
            backgroundColor: COLOR_MAP[element.colorId] ?? "#C7CDD6",
            borderColor:
              element.colorId === "white" ? "#D9DEE7" : "rgba(0,0,0,0.04)",
          },
        ]}
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

export default function PatternTargetArea({
  sequence,
  blankIndex,
  placedElement,
  rule,
  blankSlotRef,
  playIntroAnimation = true,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(windowWidth - 40, 560);
  const slotGap = 8;
  const slotCount = Math.max(sequence.length, 1);
  const slotWidth = Math.max(
    44,
    Math.min(76, (contentWidth - slotGap * (slotCount - 1)) / slotCount),
  );
  const slotHeight = Math.max(56, slotWidth * 1.2);

  // 부모에서 key로 새로 마운트되므로 첫 렌더부터 0 → 이전 문제가 깜빡이지 않음
  const [visibleCount, setVisibleCount] = useState(
    playIntroAnimation ? 0 : sequence.length,
  );
  const bounceValues = useRef<Animated.Value[]>([]);
  const runId = useRef(0);

  useEffect(() => {
    if (!playIntroAnimation) {
      setVisibleCount(sequence.length);
      return;
    }

    runId.current += 1;
    const currentRun = runId.current;
    const values = sequence.map(() => new Animated.Value(0));
    bounceValues.current = values;
    setVisibleCount(0);

    const revealNext = (index: number) => {
      if (currentRun !== runId.current) return;
      if (index >= sequence.length) return;

      setVisibleCount(index + 1);

      // ? 칸에서는 소리를 재생하지 않는다.
      if (index !== blankIndex) {
        const noteIndex = getPatternNoteIndex(rule, index);
        void playPatternXylophone(noteIndex);
      }

      //   const noteIndex = getPatternNoteIndex(rule, index);
      //   // 패턴 칸이 등장하는 순간 실로폰 재생
      //   void playPatternXylophone(noteIndex);

      Animated.sequence([
        Animated.timing(values[index], {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: false,
        }),
        Animated.timing(values[index], {
          toValue: 0,
          duration: 180,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
        Animated.delay(160),
      ]).start(({ finished }) => {
        if (!finished || currentRun !== runId.current) return;
        revealNext(index + 1);
      });
    };

    revealNext(0);

    return () => {
      runId.current += 1;
      values.forEach((v) => v.stopAnimation());
    };
  }, [sequence, playIntroAnimation]);

  return (
    <Wrapper>
      <PatternRow style={{ gap: slotGap }}>
        {sequence.map((element, index) => {
          const isBlank = index === blankIndex;
          const isVisible = index < visibleCount;
          const bounceAnim = bounceValues.current[index];

          const translateY = bounceAnim
            ? bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -24],
              })
            : 0;

          const scale = bounceAnim
            ? bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              })
            : 1;

          const showContent: PatternElement | null = isBlank
            ? placedElement
            : element;

          const slotInner = isVisible ? (
            <Animated.View
              style={{
                transform: [{ translateY }, { scale }],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderElement(showContent, slotWidth * 0.72)}
            </Animated.View>
          ) : (
            <HiddenPlaceholder />
          );

          if (isBlank) {
            return (
              <View
                key={`slot-${index}`}
                collapsable={false}
                style={{ width: slotWidth, height: slotHeight }}
                ref={(node) => {
                  if (blankSlotRef && "current" in blankSlotRef) {
                    (blankSlotRef as any).current = node;
                  }
                }}
              >
                <Slot isBlank style={StyleSheet.absoluteFill}>
                  {slotInner}
                </Slot>
              </View>
            );
          }

          return (
            <Slot
              key={`slot-${index}`}
              style={{ width: slotWidth, height: slotHeight }}
              isBlank={false}
            >
              {slotInner}
            </Slot>
          );
        })}
      </PatternRow>
    </Wrapper>
  );
}

// ============================================================
// Styled
// ============================================================

const Wrapper = styled.View`
  flex: 0.9;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const PatternRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Slot = styled.View<{ isBlank: boolean }>`
  border-radius: 16px;
  background-color: ${(p) => (p.isBlank ? "#FFFAE9" : "#F1F4F8")};
  border-width: ${(p) => (p.isBlank ? 2.5 : 1.5)}px;
  border-color: ${(p) => (p.isBlank ? "#E9BD59" : "#E6EAF1")};
  border-style: ${(p) => (p.isBlank ? "dashed" : "solid")};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const QuestionMark = styled.Text`
  color: #d4a43d;
  font-size: 30px;
  font-weight: 900;
`;

const HiddenPlaceholder = styled.View`
  width: 10px;
  height: 10px;
`;

const styles = StyleSheet.create({
  colorDot: {
    borderWidth: 2,
  },
});
