import React from "react";
import styled from "styled-components/native";

import { ColorSortingObject } from "../../types/colorSotringTypes";
import ColorSortingObjectComponent from "./ColorSortingObjectComponent";

type ColorSortingObjectBoardProps = {
  objects: ColorSortingObject[];
  selectedObjectId: string | null;
  placedObjectIds: string[];
  onObjectPress: (objectId: string) => void;
};

const getGridColumns = (count: number) => {
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  if (count <= 8) return 3;
  if (count === 9) return 3;
  if (count === 10) return 5;

  return 4;
};

const getObjectSize = (columns: number) => {
  if (columns <= 2) return 96;
  if (columns === 3) return 84;
  if (columns === 4) return 72;

  return 60;
};

export default function ColorSortingObjectBoard({
  objects,
  selectedObjectId,
  placedObjectIds,
  onObjectPress,
}: ColorSortingObjectBoardProps) {
  const objectColumns = getGridColumns(objects.length);
  const objectSize = getObjectSize(objectColumns);

  const objectRows: ColorSortingObject[][] = [];

  for (let i = 0; i < objects.length; i += objectColumns) {
    objectRows.push(objects.slice(i, i + objectColumns));
  }

  return (
    <ObjectBoard>
      {objectRows.map((row, rowIndex) => {
        const missing = objectColumns - row.length;

        return (
          <ObjectRow key={rowIndex}>
            {missing > 0 && <RowSpacer weight={missing / 2} />}

            {row.map((object) => (
              <ColorSortingObjectComponent
                key={object.id}
                object={object}
                objectSize={objectSize}
                isSelected={selectedObjectId === object.id}
                isPlaced={placedObjectIds.includes(object.id)}
                onPress={() => onObjectPress(object.id)}
              />
            ))}

            {missing > 0 && <RowSpacer weight={missing / 2} />}
          </ObjectRow>
        );
      })}
    </ObjectBoard>
  );
}

const ObjectBoard = styled.View`
  flex: 1;
  margin-top: 12px;
  margin-bottom: 14px;
  padding: 12px 8px;

  background-color: rgba(255, 255, 255, 0.85);

  border-radius: 26px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.95);

  justify-content: space-evenly;
`;

const ObjectRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpacer = styled.View<{
  weight: number;
}>`
  flex: ${(p) => p.weight};
`;
