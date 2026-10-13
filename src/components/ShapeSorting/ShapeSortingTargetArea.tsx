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
    <TargetGridContainer>
      {targets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          ref={(node: View | null) => {
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
    </TargetGridContainer>
  );
}

const TargetGridContainer = styled.View`
  flex: 0.8;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;

  gap: 4px;
  margin-bottom: 10px;
`;

const BasketSlot = styled.View`
  flex: 1;
  min-width: 0;
  align-items: stretch;
  justify-content: center;
`;
