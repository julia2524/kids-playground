import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import {
  SizeSortingObject,
  SizeSortingTarget,
} from "../../generators/classification/generateSizeSortingProblem";

import { AppText } from "../../utils/AppText";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import { View } from "react-native";
import i18n from "../../i18n";

type Props = {
  target: SizeSortingTarget;
  objects: SizeSortingObject[];
  placedObjectIds: string[];
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

const SIZE_COLORS: Record<string, string> = {
  large: "#FF9A76",
  medium: "#7C9FF5",
  small: "#69B99A",
};

function PlacedObjectPreview({ object }: { object: SizeSortingObject }) {
  const variant = object.variant;

  return (
    <ViewCenter>
      <View
        style={{
          transform: [{ scale: object.scale }],
        }}
      >
        <RenderClassificationItemSvg
          itemId={object.itemId}
          primary={variant?.primary}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={30}
        />
      </View>
    </ViewCenter>
  );
}

export default function SizeSortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  onPress,
  onRemoveObject,
}: Props) {
  const targetColor = SIZE_COLORS[target.sizeKey] ?? "#7C5CFF";

  return (
    <TargetBasket
      targetColor={targetColor}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <BasketHeader style={{ backgroundColor: targetColor }}>
        {/* <BasketTitle>{target.label}</BasketTitle> */}

        <BasketTitle> {i18n.t(`size_${target.sizeKey}`)}</BasketTitle>
      </BasketHeader>

      <BasketBody>
        <DashedBox targetColor={targetColor}>
          {placedObjectIds.length === 0 ? (
            <PlusCircle color={targetColor}>
              <Ionicons name="add" size={26} color="#FFFFFF" />
            </PlusCircle>
          ) : (
            <BasketItemsRow>
              {placedObjectIds.map((objectId) => {
                const object = objects.find((item) => item.id === objectId);

                if (!object) return null;

                return (
                  <PlacedItemChip
                    key={objectId}
                    onPress={() => onRemoveObject(objectId)}
                  >
                    <PlacedObjectPreview object={object} />
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
  min-height: 34px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 4px;
`;

const BasketTitle = styled(AppText)`
  font-size: 13px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

const BasketBody = styled.View`
  flex: 1;
  padding: 8px;
`;

const DashedBox = styled.View<{ targetColor: string }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border-width: 1.5px;
  border-style: dashed;
  border-color: ${(p) => `${p.targetColor}66`};
  background-color: ${(p) => `${p.targetColor}12`};
`;

const PlusCircle = styled.View<{ color: string }>`
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
  min-width: 40px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
`;

const ViewCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

const ViewScale = styled.View<{ scale: number }>`
  transform: ${(p) => `scale(${p.scale})`};
`;
