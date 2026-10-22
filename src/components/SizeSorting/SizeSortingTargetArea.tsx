import React, { useMemo } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";

import {
  SizeSortingObject,
  SizeSortingTarget,
} from "../../generators/classification/generateSizeSortingProblem";
import SizeSortingTargetBasket from "./SizeSortingTargetBasket";

type Props = {
  targets: SizeSortingTarget[];
  objects: SizeSortingObject[];
  placedObjects: Record<string, string[]>;
  basketRefs: React.RefObject<Record<string, View | null>>;
  onTargetPress: (targetId: string) => void;
  onRemoveObject: (targetId: string, objectId: string) => void;
};

const SIZE_LABEL_KEYS: Record<string, string> = {
  large: "classification.size.large",
  medium: "classification.size.medium",
  small: "classification.size.small",
};

export default function SizeSortingTargetArea({
  targets,
  objects,
  placedObjects,
  basketRefs,
  onTargetPress,
  onRemoveObject,
}: Props) {
  useLanguage();

  //   const localizedTargets = useMemo(
  //     () =>
  //       targets.map((target) => {
  //         const key = SIZE_LABEL_KEYS[target.sizeKey];

  //         return {
  //           ...target,
  //           label: key
  //             ? i18n.t(key, { defaultValue: target.label })
  //             : target.label,
  //         };
  //       }),
  //     [targets, i18n.locale],
  //   );

  const localizedTargets = useMemo(
    () =>
      targets.map((target) => ({
        ...target,
        label: i18n.t(`size_${target.sizeKey}`),
      })),
    [targets, i18n.locale],
  );

  return (
    <TargetGridContainer>
      {localizedTargets.map((target) => (
        <BasketSlot
          key={target.id}
          collapsable={false}
          ref={(node: View | null) => {
            basketRefs.current[target.id] = node;
          }}
        >
          <SizeSortingTargetBasket
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
`;
