import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import ShapeSortingTargetBasket from "./ShapeSortingTargetBasket";

import type {
  ShapeSortingTarget,
  ShapeSortingObject,
} from "../../generators/classification/generateShapeSortingProblem";

type ShapeSortingTargetAreaProps = {
  targets: ShapeSortingTarget[];
  objects: ShapeSortingObject[];
  placedObjects: Record<string, string[]>;
  basketRefs: React.MutableRefObject<Record<string, View | null>>;
  onTargetPress: (targetId: string) => void;
  onRemoveObject: (targetId: string, objectId: string) => void;
};

export default function ShapeSortingTargetArea({
  targets,
  objects,
  placedObjects,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: ShapeSortingTargetAreaProps) {
  return (
    <TargetAreaContainer>
      <TargetRow>
        {targets.map((target) => (
          <BasketSlot
            key={target.id}
            collapsable={false}
            ref={(node: any) => {
              basketRefs.current[target.id] = node;
            }}
          >
            <ShapeSortingTargetBasket
              target={target}
              objects={objects}
              placedObjectIds={placedObjects[target.id] ?? []}
              onPress={() => onTargetPress(target.id)}
              onRemoveObject={(objectId) => onRemoveObject(target.id, objectId)}
            />
          </BasketSlot>
        ))}
      </TargetRow>
    </TargetAreaContainer>
  );
}

const TargetAreaContainer = styled.View`
  flex: 0.8;
  justify-content: flex-start; /* 세로 중앙 */
  margin-bottom: 10px;
  padding-top: 20px;
`;

const TargetRow = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const BasketSlot = styled.View`
  flex: 1;
  min-width: 0;
  max-width: 200px;
`;
