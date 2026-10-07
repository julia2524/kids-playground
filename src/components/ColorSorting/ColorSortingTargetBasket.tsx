import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { classificationItems } from "../../data/classification/classificationItems";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

import {
  ColorSortingObject,
  ColorSortingTarget,
} from "../../types/colorSotringTypes";

type ColorSortingTargetBasketProps = {
  target: ColorSortingTarget;
  objects: ColorSortingObject[];
  placedObjectIds: string[];
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

const getLuminance = (hex: string) => {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) return 0;

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const getBasketColor = (hex: string) =>
  getLuminance(hex) > 0.95 ? "#CFC9E4" : hex;

const getHeaderTextColor = (hex: string) =>
  getLuminance(hex) > 0.75 ? "#4B4453" : "#FFFFFF";

export default function ColorSortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  onPress,
  onRemoveObject,
}: ColorSortingTargetBasketProps) {
  const targetColorHex = COLOR_SORTING_COLORS[target.colorId] ?? "#7C5CFF";

  const basketColor = getBasketColor(targetColorHex);
  const headerTextColor = getHeaderTextColor(basketColor);

  return (
    <TargetBasket
      targetColor={targetColorHex}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <BasketHeader style={{ backgroundColor: targetColorHex }}>
        <BasketTitle textColor={headerTextColor}>{target.label}</BasketTitle>
      </BasketHeader>

      <BasketBody>
        <DashedBox targetColor={basketColor}>
          {placedObjectIds.length === 0 ? (
            <PlusCircle color={basketColor}>
              <Ionicons name="add" size={26} color="#FFFFFF" />
            </PlusCircle>
          ) : (
            <BasketItemsRow>
              {placedObjectIds.map((objectId) => {
                const object = objects.find((item) => item.id === objectId);

                if (!object) return null;

                const item = classificationItems.find(
                  (item) => item.id === object.itemId,
                );

                const variant = item?.variants.find(
                  (variant) => variant.colorId === object.colorId,
                );

                const basicColor = COLOR_SORTING_COLORS[object.colorId];

                return (
                  <PlacedItemChip
                    key={objectId}
                    onPress={() => onRemoveObject(objectId)}
                  >
                    <RenderColorSortingObjectSvg
                      object={object}
                      primary={variant?.primary ?? basicColor}
                      secondary={variant?.secondary}
                      accent={variant?.accent}
                      size={40}
                    />
                  </PlacedItemChip>
                );
              })}
            </BasketItemsRow>
          )}
        </DashedBox>
      </BasketBody>
    </TargetBasket>
  );
}
const TargetBasket = styled.TouchableOpacity<{
  targetColor: string;
}>`
  flex: 1;
  background-color: #ffffff;

  border-radius: 22px;
  border-width: 3px;
  border-color: ${(p) => p.targetColor};

  overflow: hidden;

  elevation: 3;
  shadow-color: #6f63a8;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

const BasketHeader = styled.View`
  height: 34px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding-left: 6px;
  padding-right: 6px;
`;

const BasketTitle = styled.Text<{
  textColor: string;
}>`
  font-size: 13px;
  font-weight: 900;
  color: ${(p) => p.textColor};
`;

const BasketBody = styled.View`
  flex: 1;
  padding: 8px;
`;

const DashedBox = styled.View<{
  targetColor: string;
}>`
  flex: 1;

  align-items: center;
  justify-content: center;

  border-radius: 14px;
  border-width: 1.5px;
  border-style: dashed;

  border-color: ${(p) => p.targetColor}66;
  background-color: ${(p) => p.targetColor}12;
`;

const PlusCircle = styled.View<{
  color: string;
}>`
  width: 38px;
  height: 38px;

  border-radius: 19px;

  background-color: ${(p) => p.color};

  align-items: center;
  justify-content: center;

  opacity: 0.35;
`;

const BasketItemsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  gap: 2px;
`;

const PlacedItemChip = styled.TouchableOpacity`
  width: 44px;
  height: 44px;

  align-items: center;
  justify-content: center;
`;
