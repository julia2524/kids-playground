import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import CategorySortingTargetBasket from "./CategorySortingTargetBasket";

import type {
  CategorySortingObject,
  CategorySortingTarget,
} from "../../generators/classification/generateCategorySortingProblem";

type CategorySortingTargetAreaProps = {
  targets: CategorySortingTarget[];
  objects: CategorySortingObject[];
  // key: target.id / value: 담긴 object.instanceId 배열
  placedObjects: Record<string, string[]>;
  basketRefs: React.MutableRefObject<Record<string, View | null>>;
  onTargetPress: (targetId: string) => void;
  onRemoveObject: (targetId: string, objectId: string) => void;
};

export default function CategorySortingTargetArea({
  targets,
  objects,
  placedObjects,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: CategorySortingTargetAreaProps) {
  return (
    <TargetGridContainer>
      {targets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          // 드래그 앤 드롭 충돌 판정용: target.id로 위치를 측정한다
          ref={(node: View | null) => {
            basketRefs.current[target.id] = node;
          }}
        >
          <CategorySortingTargetBasket
            target={target}
            objects={objects}
            placedObjectIds={placedObjects[target.id] ?? []}
            onPress={() => onTargetPress(target.id)}
            onRemoveObject={(objectId) => onRemoveObject(target.id, objectId)}
          />
        </BasketSlot>
      ))}
    </TargetGridContainer>
  );
}

const TargetGridContainer = styled.View`
  flex: 0.8;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const BasketSlot = styled.View`
  flex: 1;
  min-width: 0;
`;
