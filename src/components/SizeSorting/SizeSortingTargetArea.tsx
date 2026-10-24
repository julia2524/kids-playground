// import React from "react";
// import { View } from "react-native";
// import styled from "styled-components/native";

// import {
//   SizeSortingObject,
//   SizeSortingTarget,
// } from "../../generators/classification/generateSizeSortingProblem";
// import SizeSortingTargetBasket from "./SizeSortingTargetBasket";

// type Props = {
//   targets: SizeSortingTarget[];
//   objects: SizeSortingObject[];
//   placedObjects: Record<string, string[]>;
//   basketRefs: React.RefObject<Record<string, View | null>>;
//   onTargetPress: (targetId: string) => void;
//   onRemoveObject: (targetId: string, objectId: string) => void;
// };

// export default function SizeSortingTargetArea({
//   targets,
//   objects,
//   placedObjects,
//   basketRefs,
//   onTargetPress,
//   onRemoveObject,
// }: Props) {
//   return (
//     <TargetGridContainer>
//       {targets.map((target) => (
//         <BasketSlot
//           key={target.id}
//           collapsable={false}
//           ref={(node: any) => {
//             basketRefs.current[target.id] = node;
//           }}
//         >
//           <SizeSortingTargetBasket
//             target={target}
//             objects={objects}
//             placedObjectIds={placedObjects[target.id] ?? []}
//             onPress={() => onTargetPress(target.id)}
//             onRemoveObject={(objectId) => onRemoveObject(target.id, objectId)}
//           />
//         </BasketSlot>
//       ))}
//     </TargetGridContainer>
//   );
// }

// const TargetGridContainer = styled.View`
//   flex: 0.8;
//   flex-direction: row;
//   align-items: stretch;
//   justify-content: center;
//   gap: 8px;
//   margin-bottom: 10px;
// `;

// const BasketSlot = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: flex-end;
// `;

import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import {
  SizeSortingObject,
  SizeSortingTarget,
} from "../../generators/classification/generateSizeSortingProblem";
import SizeSortingTargetBasket from "./SizeSortingTargetBasket";
import type { StickerPlacement } from "./SizeSortingObjectComponent";

type Props = {
  targets: SizeSortingTarget[];
  objects: SizeSortingObject[];
  placedObjects: Record<string, string[]>;
  stickerPlacements?: Record<string, StickerPlacement>;
  basketRefs: React.RefObject<Record<string, View | null>>;
  onTargetPress: (targetId: string) => void;
  onRemoveObject: (targetId: string, objectId: string) => void;
};

const EMPTY_PLACEMENTS: Record<string, StickerPlacement> = {};

export default function SizeSortingTargetArea({
  targets,
  objects,
  placedObjects,
  stickerPlacements = EMPTY_PLACEMENTS,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: Props) {
  return (
    <TargetGridContainer>
      {targets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          ref={(node: any) => {
            basketRefs.current[target.id] = node;
          }}
        >
          <SizeSortingTargetBasket
            target={target}
            objects={objects}
            placedObjectIds={placedObjects[target.id] ?? []}
            stickerPlacements={stickerPlacements}
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
  align-items: center;
  justify-content: flex-end;
`;
