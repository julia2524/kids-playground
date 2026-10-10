import React, { useMemo } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import i18n from "../../i18n"; // 상대 경로 확인 필요

import ColorSortingTargetBasket from "./ColorSortingTargetBasket";
import { ColorSortingProblem } from "../../types/colorSotringTypes";
import { COLOR_LABELS } from "../../generators/generateColorSortingProblem";
import { useLanguage } from "../../context/LangaugeContext";

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
  useLanguage();
  // 💡 targets 배열의 label을 현재 언어로 즉시 변환
  const localizedTargets = useMemo(() => {
    return targets.map((target) => {
      const translationKey = COLOR_LABELS[target.colorId];

      return {
        ...target,
        // 번역 키가 존재하면 i18n.t 호출, 아니면 기존 label 유지
        label: translationKey
          ? i18n.t(translationKey, { defaultValue: target.label || "색상" })
          : target.label,
      };
    });
  }, [targets, i18n.locale]); // 언어가 바뀌면 label도 즉시 재계산!

  return (
    <TargetGridContainer>
      {localizedTargets.map((target) => (
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
