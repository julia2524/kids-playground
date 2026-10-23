// import React, { useMemo } from "react";
// import { View } from "react-native";
// import styled from "styled-components/native";

// import CategorySortingTargetBasket from "./CategorySortingTargetBasket";

// import type {
//   CategorySortingObject,
//   CategorySortingTarget,
// } from "../../generators/classification/generateCategorySortingProblem";
// import { useLanguage } from "../../context/LangaugeContext";
// import i18n from "../../i18n";

// type CategorySortingTargetAreaProps = {
//   targets: CategorySortingTarget[];
//   objects: CategorySortingObject[];
//   // key: target.id / value: 담긴 object.instanceId 배열
//   placedObjects: Record<string, string[]>;
//   basketRefs: React.MutableRefObject<Record<string, View | null>>;
//   onTargetPress: (targetId: string) => void;
//   onRemoveObject: (targetId: string, objectId: string) => void;
// };

// // 번역 키: classification.item.heartChocolate / classification.category.snack
// const getLabelKey = (target: CategorySortingTarget) =>
//   `classification.${target.labelType}.${target.label}`;

// export default function CategorySortingTargetArea({
//   targets,
//   objects,
//   placedObjects,
//   basketRefs,
//   onTargetPress,
//   onRemoveObject,
// }: CategorySortingTargetAreaProps) {
//   useLanguage();

//   const localizedTargets = useMemo(
//     () =>
//       targets.map((target) => ({
//         ...target,
//         // 번역이 없으면 영어 키가 그대로 보임
//         label: i18n.t(getLabelKey(target), { defaultValue: target.label }),
//       })),
//     [targets, i18n.locale],
//   );
//   return (
//     <TargetGridContainer>
//       {localizedTargets.map((target) => (
//         <BasketSlot
//           key={target.id}
//           collapsable={false}
//           // 드래그 앤 드롭 충돌 판정용: target.id로 위치를 측정한다
//           ref={(node: any) => {
//             basketRefs.current[target.id] = node;
//           }}
//         >
//           <CategorySortingTargetBasket
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
//   min-width: 0;
// `;

import React, { useMemo } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import CategorySortingTargetBasket from "./CategorySortingTargetBasket";
import type { StickerPlacement } from "./CategorySortingObjectComponent";

import type {
  CategorySortingObject,
  CategorySortingTarget,
} from "../../generators/classification/generateCategorySortingProblem";
import { useLanguage } from "../../context/LangaugeContext";
import i18n from "../../i18n";

type CategorySortingTargetAreaProps = {
  targets: CategorySortingTarget[];
  objects: CategorySortingObject[];
  // key: target.id / value: 담긴 object.instanceId 배열
  placedObjects: Record<string, string[]>;
  // key: object.instanceId / 드래그로 놓은 자리에 붙는 스티커 위치
  stickerPlacements?: Record<string, StickerPlacement>;
  basketRefs: React.MutableRefObject<Record<string, View | null>>;
  onTargetPress: (targetId: string) => void;
  onRemoveObject: (targetId: string, objectId: string) => void;
};

const EMPTY_PLACEMENTS: Record<string, StickerPlacement> = {};

// 번역 키: classification.item.heartChocolate / classification.category.snack
const getLabelKey = (target: CategorySortingTarget) =>
  `classification.${target.labelType}.${target.label}`;

export default function CategorySortingTargetArea({
  targets,
  objects,
  placedObjects,
  stickerPlacements = EMPTY_PLACEMENTS,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: CategorySortingTargetAreaProps) {
  useLanguage();

  const localizedTargets = useMemo(
    () =>
      targets.map((target) => ({
        ...target,
        // 번역이 없으면 영어 키가 그대로 보임
        label: i18n.t(getLabelKey(target), { defaultValue: target.label }),
      })),
    [targets, i18n.locale],
  );
  return (
    <TargetGridContainer>
      {localizedTargets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          // 드래그 앤 드롭 충돌 판정용: target.id로 위치를 측정한다
          ref={(node: any) => {
            basketRefs.current[target.id] = node;
          }}
        >
          <CategorySortingTargetBasket
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
  min-width: 0;
`;
