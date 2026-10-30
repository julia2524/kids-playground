import React, { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import Svg, { Circle, Path, Polygon, Rect } from "react-native-svg";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { AppText } from "../../utils/AppText";
import {
  ShapeItemObject,
  ShapeSortingObject,
  ShapeSortingTarget,
  SimpleShapeObject,
} from "../../generators/classification/generateShapeSortingProblem";
import { useLanguage } from "../../context/LangaugeContext";
import i18n from "../../i18n";
import { ObjectArtwork, StickerPlacement } from "./ShapeSortingObjectComponent";

export type ShapeId = "circle" | "triangle" | "square" | "heart" | "star";

type ShapeSortingTargetBasketProps = {
  target: ShapeSortingTarget;
  objects: ShapeSortingObject[];
  placedObjectIds: string[];
  stickerPlacements: Record<string, StickerPlacement>;
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

const SHAPE_COLORS: Record<ShapeId, string> = {
  circle: "#F6C94A",
  triangle: "#55B879",
  square: "#55A9F5",
  heart: "#F28BAA",
  star: "#A28AF5",
};

const SHAPE_I18N_KEYS: Record<ShapeId, string> = {
  circle: "shape_circle",
  triangle: "shape_triangle",
  square: "shape_square",
  heart: "shape_heart",
  star: "shape_star",
};

// 영어 기본값 매핑 (Fallback)
const SHAPE_ENGLISH_DEFAULTS: Record<ShapeId, string> = {
  circle: "Circle",
  triangle: "Triangle",
  square: "Square",
  heart: "Heart",
  star: "Star",
};

// ShapeOverlay의 좌우 padding 비율
const OVERLAY_PADDING_RATIO = 0.18;

function isShapeId(shapeId: string): shapeId is ShapeId {
  return (
    shapeId === "circle" ||
    shapeId === "triangle" ||
    shapeId === "square" ||
    shapeId === "heart" ||
    shapeId === "star"
  );
}

// 공용으로 모양 이름을 안전하게 가져오는 헬퍼 함수
function getShapeLabel(shapeId: string): string {
  if (!isShapeId(shapeId)) return "Shape";
  const translationKey = SHAPE_I18N_KEYS[shapeId];
  return i18n.t(translationKey, {
    defaultValue: SHAPE_ENGLISH_DEFAULTS[shapeId] ?? shapeId,
  });
}

const getPlacedLayout = (count: number, innerWidth: number) => {
  const columns = count <= 1 ? 1 : count <= 4 ? 2 : 3;
  const baseSize = count <= 1 ? 40 : count <= 4 ? 28 : 20;

  const fitSize =
    innerWidth > 0 ? Math.floor(innerWidth / columns) - 4 : baseSize;

  return {
    columns,
    size: Math.max(12, Math.min(baseSize, fitSize)),
  };
};

function ShapeOutline({
  shapeId,
  color,
  filled = false,
}: {
  shapeId: ShapeId;
  color: string;
  filled?: boolean;
}) {
  const fill = filled ? color : "#FFFFFF";
  const stroke = filled ? "rgba(0,0,0,0.12)" : color;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {shapeId === "circle" && (
        <Circle
          cx="50"
          cy="50"
          r="44"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
        />
      )}

      {shapeId === "triangle" && (
        <Polygon
          points="50,7 94,88 6,88"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}

      {shapeId === "square" && (
        <Rect
          x="7"
          y="7"
          width="86"
          height="86"
          rx="13"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
        />
      )}

      {shapeId === "heart" && (
        <Path
          d="
            M50 89
            C42 81 7 57 7 32
            C7 14 29 3 43 17
            L50 25
            L57 17
            C71 3 93 14 93 32
            C93 57 58 81 50 89 Z
          "
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}

      {shapeId === "star" && (
        <Polygon
          points="
            50,5 62,35 94,37
            69,58 77,90 50,73
            23,90 31,58 6,37 38,35
          "
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

function SimpleShapeView({
  object,
  size,
}: {
  object: SimpleShapeObject;
  size: number;
}) {
  if (!isShapeId(object.shapeId)) {
    return null;
  }

  const color = COLOR_SORTING_COLORS[object.colorId];

  return (
    <ViewBox size={size}>
      <ShapeOutline shapeId={object.shapeId} color={color} filled />
    </ViewBox>
  );
}

function ItemView({ object, size }: { object: ShapeItemObject; size: number }) {
  const item = classificationItems.find(
    (candidate) => candidate.id === object.itemId,
  );

  const variant =
    object.variant ??
    item?.variants.find((candidate) => candidate.colorId === "natural");

  const primary = variant?.primary ?? COLOR_SORTING_COLORS.natural;

  return (
    <ViewBox size={size}>
      <RenderClassificationObjectSvg
        object={{
          id: object.id,
          itemId: object.itemId,
          label: object.name,
          colorId: variant?.colorId ?? "natural",
          svgKey: object.svgKey,
          shape: object.shapeId,
        }}
        primary={primary}
        secondary={variant?.secondary}
        accent={variant?.accent}
        size={size}
      />
    </ViewBox>
  );
}

function PlacedShapeObject({
  object,
  size,
  onPress,
}: {
  object: ShapeSortingObject;
  size: number;
  onPress: () => void;
}) {
  // 번역 함수를 이용해 레이블 생성
  const label =
    object.kind === "item"
      ? object.name
      : isShapeId(object.shapeId)
        ? getShapeLabel(object.shapeId)
        : "Shape";

  return (
    <PlacedItem
      size={size + 4}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${label} remove`}
    >
      {object.kind === "simple_shape" ? (
        <SimpleShapeView object={object} size={size} />
      ) : (
        <ItemView object={object} size={size} />
      )}
    </PlacedItem>
  );
}

export default function ShapeSortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  stickerPlacements,
  onPress,
  onRemoveObject,
}: ShapeSortingTargetBasketProps) {
  useLanguage(); // 언어 변경 감지 리렌더링
  const [overlayWidth, setOverlayWidth] = useState(0);

  if (!isShapeId(target.shapeId)) {
    return null;
  }

  const targetColor = SHAPE_COLORS[target.shapeId];
  const targetLabel = getShapeLabel(target.shapeId);

  // 드래그로 놓은 자리에 붙는 스티커 / 탭으로 넣어 자동 배치되는 오브젝트 분리
  const stickerIds = placedObjectIds.filter((id) => stickerPlacements[id]);
  const gridIds = placedObjectIds.filter((id) => !stickerPlacements[id]);

  const innerWidth = overlayWidth * (1 - OVERLAY_PADDING_RATIO * 2);
  const { columns, size: placedSize } = getPlacedLayout(
    gridIds.length,
    innerWidth,
  );

  const handleOverlayLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setOverlayWidth((prev) => (prev === width ? prev : width));
  };

  return (
    <BasketButton
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={targetLabel}
    >
      <BasketTop>
        <ShapeBackground>
          <ShapeOutline shapeId={target.shapeId} color={targetColor} />
        </ShapeBackground>

        <ShapeOverlay pointerEvents="box-none" onLayout={handleOverlayLayout}>
          {placedObjectIds.length === 0 ? (
            <EmptyCircle color={targetColor}>
              <Ionicons name="add" size={25} color={targetColor} />
            </EmptyCircle>
          ) : gridIds.length > 0 ? (
            <BasketItems style={{ width: columns * (placedSize + 4) }}>
              {gridIds.map((objectId) => {
                const object = objects.find(
                  (candidate) => candidate.id === objectId,
                );

                if (!object) {
                  return null;
                }

                return (
                  <PlacedShapeObject
                    key={objectId}
                    object={object}
                    size={placedSize}
                    onPress={() => onRemoveObject(objectId)}
                  />
                );
              })}
            </BasketItems>
          ) : null}
        </ShapeOverlay>

        <ShapeHeader color={targetColor}>
          <ShapeHeaderText>{targetLabel}</ShapeHeaderText>
        </ShapeHeader>
      </BasketTop>

      {/* 드래그로 정답 처리된 오브젝트: 놓은 자리, 놓은 크기 그대로 */}
      <StickerLayer pointerEvents="box-none">
        {stickerIds.map((objectId) => {
          const object = objects.find((candidate) => candidate.id === objectId);
          const placement = stickerPlacements[objectId];

          if (!object || !placement) {
            return null;
          }

          return (
            <StickerButton
              key={objectId}
              activeOpacity={0.7}
              onPress={() => onRemoveObject(objectId)}
              accessibilityRole="button"
              style={{
                left: placement.x,
                top: placement.y,
                width: placement.size,
                height: placement.size,
              }}
            >
              <ObjectArtwork object={object} size={placement.artSize} />
            </StickerButton>
          );
        })}
      </StickerLayer>
    </BasketButton>
  );
}

const BasketButton = styled.TouchableOpacity`
  min-width: 0;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const BasketTop = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

const ShapeBackground = styled.View`
  width: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const ShapeOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1;
  padding: 18%;

  align-items: center;
  justify-content: center;
`;

const ShapeHeader = styled.View<{ color: string }>`
  width: 100%;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.color};
  border-radius: 12px;
  padding: 4px 2px;
`;

const ShapeHeaderText = styled(AppText)`
  font-size: 12px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

const EmptyCircle = styled.View<{ color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 17px;

  align-items: center;
  justify-content: center;

  background-color: ${(p) => `${p.color}22`};
`;

const BasketItems = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PlacedItem = styled.TouchableOpacity<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  align-items: center;
  justify-content: center;
`;

const ViewBox = styled.View<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  align-items: center;
  justify-content: center;
`;

const StickerLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StickerButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
`;
