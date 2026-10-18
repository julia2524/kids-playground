import React, { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import { ObjectArtwork } from "./CategorySortingObjectComponent";

import type {
  CategorySortingObject,
  CategorySortingTarget,
} from "../../generators/classification/generateCategorySortingProblem";

type CategorySortingTargetBasketProps = {
  target: CategorySortingTarget;
  objects: CategorySortingObject[];
  placedObjectIds: string[];
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

// ============================================================
// Constants
// ============================================================

const ITEM_PADDING = 4;
const MIN_ITEM_SIZE = 16;
const MAX_ITEM_SIZE = 44;

// 담긴 개수에 따른 열 수: 1개 1열 / 2~4개 2열 / 5개 이상 3열
const getColumns = (count: number) => (count <= 1 ? 1 : count <= 4 ? 2 : 3);

// 바구니 본문 크기(가로/세로)에 맞춰 담긴 사물 크기를 계산
const getPlacedItemSize = (
  count: number,
  bodyWidth: number,
  bodyHeight: number,
) => {
  if (count === 0 || bodyWidth === 0 || bodyHeight === 0) {
    return MAX_ITEM_SIZE;
  }

  const columns = getColumns(count);
  const rows = Math.ceil(count / columns);

  const fitByWidth = Math.floor(bodyWidth / columns) - ITEM_PADDING;
  const fitByHeight = Math.floor(bodyHeight / rows) - ITEM_PADDING;

  return Math.max(
    MIN_ITEM_SIZE,
    Math.min(MAX_ITEM_SIZE, fitByWidth, fitByHeight),
  );
};

// ============================================================
// Component
// ============================================================

export default function CategorySortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  onPress,
  onRemoveObject,
}: CategorySortingTargetBasketProps) {
  const [bodySize, setBodySize] = useState({ width: 0, height: 0 });

  const handleBodyLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBodySize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height },
    );
  };

  const columns = getColumns(placedObjectIds.length);
  const placedSize = getPlacedItemSize(
    placedObjectIds.length,
    bodySize.width,
    bodySize.height,
  );

  return (
    <BasketButton activeOpacity={0.9} onPress={onPress}>
      {/* 배경: 아직 미확정. 확정되면 이 자리를 ImageBackground 등으로 교체 */}
      <BasketBackground pointerEvents="none" />

      {/* 카테고리명은 여기에만 표시 */}
      <BasketHeader>
        <BasketTitle numberOfLines={1}>{target.label}</BasketTitle>
      </BasketHeader>

      <BasketBody onLayout={handleBodyLayout}>
        {placedObjectIds.length === 0 ? (
          <PlusCircle>
            <Ionicons name="add" size={26} color="#FFFFFF" />
          </PlusCircle>
        ) : (
          <BasketItems style={{ width: columns * (placedSize + ITEM_PADDING) }}>
            {placedObjectIds.map((objectId) => {
              const object = objects.find(
                (candidate) => candidate.instanceId === objectId,
              );

              if (!object) return null;

              return (
                <PlacedItemChip
                  key={objectId}
                  size={placedSize + ITEM_PADDING}
                  activeOpacity={0.7}
                  onPress={() => onRemoveObject(objectId)}
                  accessibilityRole="button"
                  accessibilityLabel={`${object.itemName} 제거`}
                >
                  <ObjectArtwork object={object} size={placedSize} />
                </PlacedItemChip>
              );
            })}
          </BasketItems>
        )}
      </BasketBody>
    </BasketButton>
  );
}

// ============================================================
// Styled Components
// ============================================================

const BasketButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #ffffff;

  border-radius: 22px;
  border-width: 3px;
  border-color: #c9bdf5;

  overflow: hidden;

  elevation: 3;
  shadow-color: #6f63a8;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

// 배경 자리 (임시 단색)
const BasketBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #f1ecff;
`;

const BasketHeader = styled.View`
  align-items: center;
  padding: 6px 6px 0px 6px;
`;

// 배경 위에서도 읽히도록 반투명 흰색 알약 위에 글자를 올림
const BasketTitle = styled(AppText)`
  font-size: 13px;
  font-weight: 900;
  color: #29263d;
  text-align: center;

  padding: 3px 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.85);
`;

const BasketBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const PlusCircle = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 19px;

  align-items: center;
  justify-content: center;

  background-color: #7c5cff;
  opacity: 0.35;
`;

const BasketItems = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PlacedItemChip = styled.TouchableOpacity<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  align-items: center;
  justify-content: center;
`;
