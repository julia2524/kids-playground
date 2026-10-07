import React from "react";
import styled from "styled-components/native";

import { ColorSortingProblem } from "../../types/colorSotringTypes";
import ColorSortingTargetBasket from "./ColorSortingTargetBasket";

type ColorSortingTargetAreaProps = {
  targets: ColorSortingProblem["targets"];
  objects: ColorSortingProblem["objects"];
  placedObjects: Record<string, string[]>;

  onTargetPress: (targetColorId: string) => void;
  onRemoveObject: (targetColorId: string, objectId: string) => void;
};

export default function ColorSortingTargetArea({
  targets,
  objects,
  placedObjects,
  onTargetPress,
  onRemoveObject,
}: ColorSortingTargetAreaProps) {
  return (
    <TargetGridContainer>
      {targets.map((target) => (
        <ColorSortingTargetBasket
          key={target.id}
          target={target}
          objects={objects}
          placedObjectIds={placedObjects[target.colorId] ?? []}
          onPress={() => onTargetPress(target.colorId)}
          onRemoveObject={(objectId) =>
            onRemoveObject(target.colorId, objectId)
          }
        />
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
