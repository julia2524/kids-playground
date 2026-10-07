import React from "react";
import styled from "styled-components/native";

import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

import { ColorSortingObject } from "../../types/colorSotringTypes";

type ColorSortingObjectProps = {
  object: ColorSortingObject;
  objectSize: number;
  isSelected: boolean;
  isPlaced: boolean;
  onPress: () => void;
};

export default function ColorSortingObjectComponent({
  object,
  objectSize,
  isSelected,
  isPlaced,
  onPress,
}: ColorSortingObjectProps) {
  const item = classificationItems.find((item) => item.id === object.itemId);

  const variant = item?.variants.find(
    (variant) => variant.colorId === object.colorId,
  );

  const basicColor = COLOR_SORTING_COLORS[object.colorId];

  return (
    <ObjectCell
      activeOpacity={0.8}
      disabled={isPlaced}
      onPress={onPress}
      style={{
        opacity: isPlaced ? 0 : 1,
      }}
    >
      <ObjectBubble size={objectSize + 12} isSelected={isSelected}>
        <RenderColorSortingObjectSvg
          object={object}
          primary={variant?.primary ?? basicColor}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={objectSize}
        />
      </ObjectBubble>
    </ObjectCell>
  );
}

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
