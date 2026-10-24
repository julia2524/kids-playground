// import React from "react";
// import { View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import styled from "styled-components/native";

// import {
//   SizeSortingObject,
//   SizeSortingTarget,
// } from "../../generators/classification/generateSizeSortingProblem";

// import { AppText } from "../../utils/AppText";
// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
// import i18n from "../../i18n";

// type SizeKey = "large" | "medium" | "small";

// type Props = {
//   target: SizeSortingTarget;
//   objects: SizeSortingObject[];
//   placedObjectIds: string[];
//   onPress: () => void;
//   onRemoveObject: (objectId: string) => void;
// };

// const SIZE_COLORS: Record<SizeKey, string> = {
//   large: "#FF9A76",
//   medium: "#7C9FF5",
//   small: "#69B99A",
// };

// const BASKET_DIMENSIONS: Record<SizeKey, { width: string; height: string }> = {
//   large: { width: "100%", height: "100%" },
//   medium: { width: "88%", height: "78%" },
//   small: { width: "74%", height: "60%" },
// };

// const HEADER_HEIGHTS: Record<SizeKey, number> = {
//   large: 40,
//   medium: 34,
//   small: 28,
// };

// function PlacedObjectPreview({ object }: { object: SizeSortingObject }) {
//   const variant = object.variant;

//   return (
//     <ViewCenter>
//       <View
//         style={{
//           transform: [{ scale: object.scale }],
//         }}
//       >
//         <RenderClassificationItemSvg
//           itemId={object.itemId}
//           primary={variant?.primary}
//           secondary={variant?.secondary}
//           accent={variant?.accent}
//           size={30}
//         />
//       </View>
//     </ViewCenter>
//   );
// }

// export default function SizeSortingTargetBasket({
//   target,
//   objects,
//   placedObjectIds,
//   onPress,
//   onRemoveObject,
// }: Props) {
//   const sizeKey = (
//     target.sizeKey in BASKET_DIMENSIONS ? target.sizeKey : "medium"
//   ) as SizeKey;

//   const targetColor = SIZE_COLORS[sizeKey];
//   const dimensions = BASKET_DIMENSIONS[sizeKey];

//   return (
//     <BasketSizer
//       targetSize={sizeKey}
//       basketWidth={dimensions.width}
//       basketHeight={dimensions.height}
//     >
//       <TargetBasket
//         targetColor={targetColor}
//         activeOpacity={0.9}
//         onPress={onPress}
//         accessibilityRole="button"
//         accessibilityLabel={i18n.t(`size_${sizeKey}`)}
//       >
//         <BasketHeader
//           style={{
//             backgroundColor: targetColor,
//             minHeight: HEADER_HEIGHTS[sizeKey],
//           }}
//         >
//           <BasketTitle targetSize={sizeKey}>
//             {i18n.t(`size_${sizeKey}`)}
//           </BasketTitle>
//         </BasketHeader>

//         <BasketBody targetSize={sizeKey}>
//           <DashedBox targetColor={targetColor}>
//             {placedObjectIds.length === 0 ? (
//               <PlusCircle color={targetColor} targetSize={sizeKey}>
//                 <Ionicons
//                   name="add"
//                   size={sizeKey === "large" ? 28 : 22}
//                   color="#FFFFFF"
//                 />
//               </PlusCircle>
//             ) : (
//               <BasketItemsRow>
//                 {placedObjectIds.map((objectId) => {
//                   const object = objects.find((item) => item.id === objectId);

//                   if (!object) return null;

//                   return (
//                     <PlacedItemChip
//                       key={objectId}
//                       onPress={() => onRemoveObject(objectId)}
//                       accessibilityRole="button"
//                       accessibilityLabel="물건 꺼내기"
//                     >
//                       <PlacedObjectPreview object={object} />
//                     </PlacedItemChip>
//                   );
//                 })}
//               </BasketItemsRow>
//             )}
//           </DashedBox>
//         </BasketBody>
//       </TargetBasket>
//     </BasketSizer>
//   );
// }

// const BasketSizer = styled.View<{
//   targetSize: SizeKey;
//   basketWidth: string;
//   basketHeight: string;
// }>`
//   width: ${(p) => p.basketWidth};
//   height: ${(p) => p.basketHeight};
// `;

// const TargetBasket = styled.TouchableOpacity<{
//   targetColor: string;
// }>`
//   flex: 1;
//   background-color: #ffffff;
//   border-radius: 20px;
//   border-width: 3px;
//   border-color: ${(p) => p.targetColor};
//   overflow: hidden;
//   elevation: 3;
//   shadow-color: #6f63a8;
//   shadow-offset: 0px 3px;
//   shadow-opacity: 0.1;
//   shadow-radius: 6px;
// `;

// const BasketHeader = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding-horizontal: 2px;
// `;

// const BasketTitle = styled(AppText)<{
//   targetSize: SizeKey;
// }>`
//   font-size: ${(p) =>
//     p.targetSize === "large" ? 14 : p.targetSize === "medium" ? 12 : 10}px;
//   font-weight: 900;
//   color: #ffffff;
//   text-align: center;
// `;

// const BasketBody = styled.View<{
//   targetSize: SizeKey;
// }>`
//   flex: 1;
//   padding: ${(p) => (p.targetSize === "small" ? 4 : 7)}px;
// `;

// const DashedBox = styled.View<{ targetColor: string }>`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   border-radius: 12px;
//   border-width: 1.5px;
//   border-style: dashed;
//   border-color: ${(p) => `${p.targetColor}88`};
//   background-color: ${(p) => `${p.targetColor}12`};
// `;

// const PlusCircle = styled.View<{
//   color: string;
//   targetSize: SizeKey;
// }>`
//   width: ${(p) => (p.targetSize === "large" ? 42 : 32)}px;
//   height: ${(p) => (p.targetSize === "large" ? 42 : 32)}px;
//   border-radius: ${(p) => (p.targetSize === "large" ? 21 : 16)}px;
//   background-color: ${(p) => p.color};
//   align-items: center;
//   justify-content: center;
//   opacity: 0.45;
// `;

// const BasketItemsRow = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   gap: 1px;
// `;

// const PlacedItemChip = styled.TouchableOpacity`
//   min-width: 32px;
//   min-height: 32px;
//   align-items: center;
//   justify-content: center;
// `;

// const ViewCenter = styled.View`
//   align-items: center;
//   justify-content: center;
// `;

import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import {
  SizeSortingObject,
  SizeSortingTarget,
} from "../../generators/classification/generateSizeSortingProblem";

import { AppText } from "../../utils/AppText";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import { ObjectPreview, StickerPlacement } from "./SizeSortingObjectComponent";
import i18n from "../../i18n";

type SizeKey = "large" | "medium" | "small";

type Props = {
  target: SizeSortingTarget;
  objects: SizeSortingObject[];
  placedObjectIds: string[];
  stickerPlacements: Record<string, StickerPlacement>;
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

const SIZE_COLORS: Record<SizeKey, string> = {
  large: "#FF9A76",
  medium: "#7C9FF5",
  small: "#69B99A",
};

const BASKET_DIMENSIONS: Record<SizeKey, { width: string; height: string }> = {
  large: { width: "100%", height: "100%" },
  medium: { width: "88%", height: "78%" },
  small: { width: "74%", height: "60%" },
};

const HEADER_HEIGHTS: Record<SizeKey, number> = {
  large: 40,
  medium: 34,
  small: 28,
};

function PlacedObjectPreview({ object }: { object: SizeSortingObject }) {
  const variant = object.variant;

  return (
    <ViewCenter>
      <View
        style={{
          transform: [{ scale: object.scale }],
        }}
      >
        <RenderClassificationItemSvg
          itemId={object.itemId}
          primary={variant?.primary}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={30}
        />
      </View>
    </ViewCenter>
  );
}

export default function SizeSortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  stickerPlacements,
  onPress,
  onRemoveObject,
}: Props) {
  const sizeKey = (
    target.sizeKey in BASKET_DIMENSIONS ? target.sizeKey : "medium"
  ) as SizeKey;

  const targetColor = SIZE_COLORS[sizeKey];
  const dimensions = BASKET_DIMENSIONS[sizeKey];

  // 드래그로 놓은 자리에 붙는 스티커 / 탭으로 넣어 자동 배치되는 오브젝트 분리
  const stickerIds = placedObjectIds.filter((id) => stickerPlacements[id]);
  const gridIds = placedObjectIds.filter((id) => !stickerPlacements[id]);

  return (
    <BasketFrame>
      <BasketSizer
        targetSize={sizeKey}
        basketWidth={dimensions.width}
        basketHeight={dimensions.height}
      >
        <TargetBasket
          targetColor={targetColor}
          activeOpacity={0.9}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={i18n.t(`size_${sizeKey}`)}
        >
          <BasketHeader
            style={{
              backgroundColor: targetColor,
              minHeight: HEADER_HEIGHTS[sizeKey],
            }}
          >
            <BasketTitle targetSize={sizeKey}>
              {i18n.t(`size_${sizeKey}`)}
            </BasketTitle>
          </BasketHeader>

          <BasketBody targetSize={sizeKey}>
            <DashedBox targetColor={targetColor}>
              {placedObjectIds.length === 0 ? (
                <PlusCircle color={targetColor} targetSize={sizeKey}>
                  <Ionicons
                    name="add"
                    size={sizeKey === "large" ? 28 : 22}
                    color="#FFFFFF"
                  />
                </PlusCircle>
              ) : gridIds.length > 0 ? (
                <BasketItemsRow>
                  {gridIds.map((objectId) => {
                    const object = objects.find((item) => item.id === objectId);

                    if (!object) return null;

                    return (
                      <PlacedItemChip
                        key={objectId}
                        onPress={() => onRemoveObject(objectId)}
                        accessibilityRole="button"
                        accessibilityLabel="물건 꺼내기"
                      >
                        <PlacedObjectPreview object={object} />
                      </PlacedItemChip>
                    );
                  })}
                </BasketItemsRow>
              ) : null}
            </DashedBox>
          </BasketBody>
        </TargetBasket>
      </BasketSizer>

      {/* 드래그로 정답 처리된 오브젝트: 놓은 자리, 놓은 크기 그대로
          (좌표 기준이 바구니 슬롯 전체이므로 BasketSizer 바깥, BasketFrame 위에 둔다) */}
      <StickerLayer pointerEvents="box-none">
        {stickerIds.map((objectId) => {
          const object = objects.find((item) => item.id === objectId);
          const placement = stickerPlacements[objectId];

          if (!object || !placement) return null;

          return (
            <StickerButton
              key={objectId}
              activeOpacity={0.7}
              onPress={() => onRemoveObject(objectId)}
              accessibilityRole="button"
              accessibilityLabel="물건 꺼내기"
              style={{
                left: placement.x,
                top: placement.y,
                width: placement.size,
                height: placement.size,
              }}
            >
              <ObjectPreview object={object} size={placement.artSize} />
            </StickerButton>
          );
        })}
      </StickerLayer>
    </BasketFrame>
  );
}

// BasketSlot 전체 영역을 채우는 프레임 (바구니 + 스티커 레이어)
const BasketFrame = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const BasketSizer = styled.View<{
  targetSize: SizeKey;
  basketWidth: string;
  basketHeight: string;
}>`
  width: ${(p) => p.basketWidth};
  height: ${(p) => p.basketHeight};
`;

const TargetBasket = styled.TouchableOpacity<{
  targetColor: string;
}>`
  flex: 1;
  background-color: #ffffff;
  border-radius: 20px;
  border-width: 3px;
  border-color: ${(p) => p.targetColor};
  overflow: hidden;
  elevation: 3;
  shadow-color: #6f63a8;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

const BasketHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 2px;
`;

const BasketTitle = styled(AppText)<{
  targetSize: SizeKey;
}>`
  font-size: ${(p) =>
    p.targetSize === "large" ? 14 : p.targetSize === "medium" ? 12 : 10}px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

const BasketBody = styled.View<{
  targetSize: SizeKey;
}>`
  flex: 1;
  padding: ${(p) => (p.targetSize === "small" ? 4 : 7)}px;
`;

const DashedBox = styled.View<{ targetColor: string }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border-width: 1.5px;
  border-style: dashed;
  border-color: ${(p) => `${p.targetColor}88`};
  background-color: ${(p) => `${p.targetColor}12`};
`;

const PlusCircle = styled.View<{
  color: string;
  targetSize: SizeKey;
}>`
  width: ${(p) => (p.targetSize === "large" ? 42 : 32)}px;
  height: ${(p) => (p.targetSize === "large" ? 42 : 32)}px;
  border-radius: ${(p) => (p.targetSize === "large" ? 21 : 16)}px;
  background-color: ${(p) => p.color};
  align-items: center;
  justify-content: center;
  opacity: 0.45;
`;

const BasketItemsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1px;
`;

const PlacedItemChip = styled.TouchableOpacity`
  min-width: 32px;
  min-height: 32px;
  align-items: center;
  justify-content: center;
`;

const ViewCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

const StickerLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StickerButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
`;
