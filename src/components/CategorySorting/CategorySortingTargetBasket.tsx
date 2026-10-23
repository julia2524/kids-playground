// import React, { useState } from "react";
// import { LayoutChangeEvent } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import styled from "styled-components/native";

// import { AppText } from "../../utils/AppText";
// import { ObjectArtwork } from "./CategorySortingObjectComponent";

// import type {
//   CategorySortingObject,
//   CategorySortingTarget,
// } from "../../generators/classification/generateCategorySortingProblem";
// import CategorySortingBackground from "./CategorySortingBackground";

// type CategorySortingTargetBasketProps = {
//   target: CategorySortingTarget;
//   objects: CategorySortingObject[];
//   placedObjectIds: string[];
//   onPress: () => void;
//   onRemoveObject: (objectId: string) => void;
// };

// // ============================================================
// // Constants
// // ============================================================

// const ITEM_PADDING = 4;
// const MIN_ITEM_SIZE = 16;
// const MAX_ITEM_SIZE = 44;

// // 담긴 개수에 따른 열 수: 1개 1열 / 2~4개 2열 / 5개 이상 3열
// const getColumns = (count: number) => (count <= 1 ? 1 : count <= 4 ? 2 : 3);

// // 바구니 본문 크기(가로/세로)에 맞춰 담긴 사물 크기를 계산
// const getPlacedItemSize = (
//   count: number,
//   bodyWidth: number,
//   bodyHeight: number,
// ) => {
//   if (count === 0 || bodyWidth === 0 || bodyHeight === 0) {
//     return MAX_ITEM_SIZE;
//   }

//   const columns = getColumns(count);
//   const rows = Math.ceil(count / columns);

//   const fitByWidth = Math.floor(bodyWidth / columns) - ITEM_PADDING;
//   const fitByHeight = Math.floor(bodyHeight / rows) - ITEM_PADDING;

//   return Math.max(
//     MIN_ITEM_SIZE,
//     Math.min(MAX_ITEM_SIZE, fitByWidth, fitByHeight),
//   );
// };

// // ============================================================
// // Component
// // ============================================================

// export default function CategorySortingTargetBasket({
//   target,
//   objects,
//   placedObjectIds,
//   onPress,
//   onRemoveObject,
// }: CategorySortingTargetBasketProps) {
//   const [bodySize, setBodySize] = useState({ width: 0, height: 0 });

//   const handleBodyLayout = (event: LayoutChangeEvent) => {
//     const { width, height } = event.nativeEvent.layout;
//     setBodySize((prev) =>
//       prev.width === width && prev.height === height ? prev : { width, height },
//     );
//   };

//   const columns = getColumns(placedObjectIds.length);
//   const placedSize = getPlacedItemSize(
//     placedObjectIds.length,
//     bodySize.width,
//     bodySize.height,
//   );
//   console.log(target);

//   return (
//     <BasketButton activeOpacity={0.9} onPress={onPress}>
//       {/* 배경: 아직 미확정. 확정되면 이 자리를 ImageBackground 등으로 교체 */}
//       <BasketBackground pointerEvents="none">
//         <CategorySortingBackground
//           topCategory={target.topCategory} // 문제 객체에 담긴 대분류 정보
//           subCategory={target.subCategory} // 세부 카테고리 또는 shapeId 등 판별 키
//           targetLabel={target.label}
//           width="100%"
//           height="100%"
//         />
//       </BasketBackground>

//       {/* 카테고리명은 여기에만 표시 */}

//       <BasketHeader>
//         <TitlePill>
//           <BasketTitle numberOfLines={2}>{target.label}</BasketTitle>
//         </TitlePill>
//       </BasketHeader>

//       <BasketBody onLayout={handleBodyLayout}>
//         {placedObjectIds.length === 0 ? (
//           <PlusCircle>
//             <Ionicons name="add" size={26} color="#FFFFFF" />
//           </PlusCircle>
//         ) : (
//           <BasketItems style={{ width: columns * (placedSize + ITEM_PADDING) }}>
//             {placedObjectIds.map((objectId) => {
//               const object = objects.find(
//                 (candidate) => candidate.instanceId === objectId,
//               );

//               if (!object) return null;

//               return (
//                 <PlacedItemChip
//                   key={objectId}
//                   size={placedSize + ITEM_PADDING}
//                   activeOpacity={0.7}
//                   onPress={() => onRemoveObject(objectId)}
//                   accessibilityRole="button"
//                   accessibilityLabel={`${object.itemName} 제거`}
//                 >
//                   <ObjectArtwork object={object} size={placedSize} />
//                 </PlacedItemChip>
//               );
//             })}
//           </BasketItems>
//         )}
//       </BasketBody>
//     </BasketButton>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const BasketButton = styled.TouchableOpacity`
//   flex: 1;
//   background-color: #ffffff;

//   border-radius: 22px;
//   border-width: 3px;
//   border-color: #c9bdf5;

//   overflow: hidden;

//   elevation: 3;
//   shadow-color: #6f63a8;
//   shadow-offset: 0px 3px;
//   shadow-opacity: 0.1;
//   shadow-radius: 6px;
// `;

// // 배경 자리 (임시 단색)
// const BasketBackground = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;

//   background-color: #f1ecff;
// `;

// const BasketHeader = styled.View`
//   align-items: center;
//   padding: 6px 6px 0px 6px;
// `;

// // 배경 위에서도 읽히도록 반투명 흰색 알약. 한 줄/두 줄 모두 높이를 맞춤
// const TitlePill = styled.View`
//   max-width: 100%;
//   min-height: 40px;
//   padding: 3px 10px;

//   align-items: center;
//   justify-content: center;

//   border-radius: 12px;
//   background-color: rgba(255, 255, 255, 0.85);
// `;

// const BasketTitle = styled(AppText)`
//   font-size: 12px;
//   line-height: 15px;
//   font-weight: 900;
//   color: #29263d;
//   text-align: center;
// `;
// const BasketBody = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   padding: 6px;
// `;

// const PlusCircle = styled.View`
//   width: 38px;
//   height: 38px;
//   border-radius: 19px;

//   align-items: center;
//   justify-content: center;

//   background-color: #7c5cff;
//   opacity: 0.35;
// `;

// const BasketItems = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
// `;

// const PlacedItemChip = styled.TouchableOpacity<{ size: number }>`
//   width: ${(p) => p.size}px;
//   height: ${(p) => p.size}px;
//   align-items: center;
//   justify-content: center;
// `;

import React, { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import {
  ObjectArtwork,
  StickerPlacement,
} from "./CategorySortingObjectComponent";

import type {
  CategorySortingObject,
  CategorySortingTarget,
} from "../../generators/classification/generateCategorySortingProblem";
import CategorySortingBackground from "./CategorySortingBackground";

type CategorySortingTargetBasketProps = {
  target: CategorySortingTarget;
  objects: CategorySortingObject[];
  placedObjectIds: string[];
  stickerPlacements: Record<string, StickerPlacement>;
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

// ============================================================
// Constants
// ============================================================

const ITEM_PADDING = 4;
const MIN_ITEM_SIZE = 16;
const MAX_ITEM_SIZE = 44;

// 담긴 개수에 따른 열 수: 1개 1열 / 2~4개 2열 / 5개 이상 3열
const getColumns = (count: number) => (count <= 1 ? 1 : count <= 4 ? 2 : 3);

// 바구니 본문 크기(가로/세로)에 맞춰 담긴 사물 크기를 계산
const getPlacedItemSize = (
  count: number,
  bodyWidth: number,
  bodyHeight: number,
) => {
  if (count === 0 || bodyWidth === 0 || bodyHeight === 0) {
    return MAX_ITEM_SIZE;
  }

  const columns = getColumns(count);
  const rows = Math.ceil(count / columns);

  const fitByWidth = Math.floor(bodyWidth / columns) - ITEM_PADDING;
  const fitByHeight = Math.floor(bodyHeight / rows) - ITEM_PADDING;

  return Math.max(
    MIN_ITEM_SIZE,
    Math.min(MAX_ITEM_SIZE, fitByWidth, fitByHeight),
  );
};

// ============================================================
// Component
// ============================================================

export default function CategorySortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  stickerPlacements,
  onPress,
  onRemoveObject,
}: CategorySortingTargetBasketProps) {
  const [bodySize, setBodySize] = useState({ width: 0, height: 0 });

  const handleBodyLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBodySize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height },
    );
  };

  // 드래그로 놓은 자리에 붙는 스티커 / 탭으로 넣어 자동 배치되는 오브젝트 분리
  const stickerIds = placedObjectIds.filter((id) => stickerPlacements[id]);
  const gridIds = placedObjectIds.filter((id) => !stickerPlacements[id]);

  const columns = getColumns(gridIds.length);
  const placedSize = getPlacedItemSize(
    gridIds.length,
    bodySize.width,
    bodySize.height,
  );

  return (
    <BasketWrapper>
      <BasketButton activeOpacity={0.9} onPress={onPress}>
        {/* 배경: 아직 미확정. 확정되면 이 자리를 ImageBackground 등으로 교체 */}
        <BasketBackground pointerEvents="none">
          <CategorySortingBackground
            topCategory={target.topCategory} // 문제 객체에 담긴 대분류 정보
            subCategory={target.subCategory} // 세부 카테고리 또는 shapeId 등 판별 키
            targetLabel={target.label}
            width="100%"
            height="100%"
          />
        </BasketBackground>

        {/* 카테고리명은 여기에만 표시 */}

        <BasketHeader>
          <TitlePill>
            <BasketTitle numberOfLines={2}>{target.label}</BasketTitle>
          </TitlePill>
        </BasketHeader>

        <BasketBody onLayout={handleBodyLayout}>
          {placedObjectIds.length === 0 ? (
            <PlusCircle>
              <Ionicons name="add" size={26} color="#FFFFFF" />
            </PlusCircle>
          ) : gridIds.length > 0 ? (
            <BasketItems
              style={{ width: columns * (placedSize + ITEM_PADDING) }}
            >
              {gridIds.map((objectId) => {
                const object = objects.find(
                  (candidate) => candidate.instanceId === objectId,
                );

                if (!object) return null;

                return (
                  <PlacedItemChip
                    key={objectId}
                    size={placedSize + ITEM_PADDING}
                    activeOpacity={0.7}
                    onPress={() => onRemoveObject(objectId)}
                    accessibilityRole="button"
                    accessibilityLabel={`${object.itemName} 제거`}
                  >
                    <ObjectArtwork object={object} size={placedSize} />
                  </PlacedItemChip>
                );
              })}
            </BasketItems>
          ) : null}
        </BasketBody>
      </BasketButton>

      {/* 드래그로 정답 처리된 오브젝트: 놓은 자리, 놓은 크기 그대로
          (BasketButton은 overflow: hidden 이라 바깥 레이어로 둔다) */}
      <StickerLayer pointerEvents="box-none">
        {stickerIds.map((objectId) => {
          const object = objects.find(
            (candidate) => candidate.instanceId === objectId,
          );
          const placement = stickerPlacements[objectId];

          if (!object || !placement) return null;

          return (
            <StickerButton
              key={objectId}
              activeOpacity={0.7}
              onPress={() => onRemoveObject(objectId)}
              accessibilityRole="button"
              accessibilityLabel={`${object.itemName} 제거`}
              style={{
                left: placement.x,
                top: placement.y,
                width: placement.size,
                height: placement.size,
              }}
            >
              <ObjectArtwork object={object} size={placement.artSize} />
            </StickerButton>
          );
        })}
      </StickerLayer>
    </BasketWrapper>
  );
}

// ============================================================
// Styled Components
// ============================================================

const BasketWrapper = styled.View`
  flex: 1;
`;

const BasketButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #ffffff;

  border-radius: 22px;
  border-width: 3px;
  border-color: #c9bdf5;

  overflow: hidden;

  elevation: 3;
  shadow-color: #6f63a8;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

// 배경 자리 (임시 단색)
const BasketBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #f1ecff;
`;

const BasketHeader = styled.View`
  align-items: center;
  padding: 6px 6px 0px 6px;
`;

// 배경 위에서도 읽히도록 반투명 흰색 알약. 한 줄/두 줄 모두 높이를 맞춤
const TitlePill = styled.View`
  max-width: 100%;
  min-height: 40px;
  padding: 3px 10px;

  align-items: center;
  justify-content: center;

  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.85);
`;

const BasketTitle = styled(AppText)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 900;
  color: #29263d;
  text-align: center;
`;
const BasketBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const PlusCircle = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 19px;

  align-items: center;
  justify-content: center;

  background-color: #7c5cff;
  opacity: 0.35;
`;

const BasketItems = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PlacedItemChip = styled.TouchableOpacity<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
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
