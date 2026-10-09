import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import { ColorSortingProblem } from "../../types/colorSotringTypes";
import ColorSortingTargetBasket from "./ColorSortingTargetBasket";

type ColorSortingTargetAreaProps = {
  targets: ColorSortingProblem["targets"];
  objects: ColorSortingProblem["objects"];
  placedObjects: Record<string, string[]>;
  basketRefs: React.RefObject<Record<string, View | null>>; // 추가

  onTargetPress: (targetColorId: string) => void;
  onRemoveObject: (targetColorId: string, objectId: string) => void;
};

export default function ColorSortingTargetArea({
  targets,
  objects,
  placedObjects,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: ColorSortingTargetAreaProps) {
  return (
    <TargetGridContainer>
      {targets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          ref={(node: View | null) => {
            basketRefs.current[target.colorId] = node;
          }}
        >
          <ColorSortingTargetBasket
            target={target}
            objects={objects}
            placedObjectIds={placedObjects[target.colorId] ?? []}
            onPress={() => onTargetPress(target.colorId)}
            onRemoveObject={(objectId) =>
              onRemoveObject(target.colorId, objectId)
            }
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
`;
