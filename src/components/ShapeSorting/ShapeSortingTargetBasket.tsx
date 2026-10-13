// import React from "react";
// import Svg, { Circle, Path, Polygon, Rect } from "react-native-svg";
// import styled from "styled-components/native";
// import { Ionicons } from "@expo/vector-icons";

// import { classificationItems } from "../../data/classification/classificationItems";
// import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";
// import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
// import { AppText } from "../../utils/AppText";
// import {
//   ShapeItemObject,
//   ShapeSortingObject,
//   ShapeSortingTarget,
//   SimpleShapeObject,
// } from "../../generators/classification/generateShapeSortingProblem";

// export type ShapeId = "circle" | "triangle" | "square" | "heart" | "star";

// type ShapeSortingTargetBasketProps = {
//   target: ShapeSortingTarget;
//   objects: ShapeSortingObject[];
//   placedObjectIds: string[];
//   onPress: () => void;
//   onRemoveObject: (objectId: string) => void;
// };

// const SHAPE_COLORS: Record<ShapeId, string> = {
//   circle: "#F6C94A",
//   triangle: "#55B879",
//   square: "#55A9F5",
//   heart: "#F28BAA",
//   star: "#A28AF5",
// };

// const SHAPE_LABELS: Record<ShapeId, string> = {
//   circle: "동그라미",
//   triangle: "세모",
//   square: "네모",
//   heart: "하트",
//   star: "별",
// };

// function isShapeId(shapeId: string): shapeId is ShapeId {
//   return (
//     shapeId === "circle" ||
//     shapeId === "triangle" ||
//     shapeId === "square" ||
//     shapeId === "heart" ||
//     shapeId === "star"
//   );
// }

// function ShapeOutline({
//   shapeId,
//   color,
//   filled = false,
// }: {
//   shapeId: ShapeId;
//   color: string;
//   filled?: boolean;
// }) {
//   const fill = filled ? color : "#FFFFFF";
//   const stroke = filled ? "rgba(0,0,0,0.12)" : color;

//   return (
//     <Svg
//       width="100%"
//       height="100%"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       {shapeId === "circle" && (
//         <Circle
//           cx="50"
//           cy="50"
//           r="44"
//           fill={fill}
//           stroke={stroke}
//           strokeWidth="5"
//         />
//       )}

//       {shapeId === "triangle" && (
//         <Polygon
//           points="50,7 94,88 6,88"
//           fill={fill}
//           stroke={stroke}
//           strokeWidth="5"
//           strokeLinejoin="round"
//         />
//       )}

//       {shapeId === "square" && (
//         <Rect
//           x="7"
//           y="7"
//           width="86"
//           height="86"
//           rx="13"
//           fill={fill}
//           stroke={stroke}
//           strokeWidth="5"
//         />
//       )}

//       {shapeId === "heart" && (
//         <Path
//           d="
//             M50 89
//             C42 81 7 57 7 32
//             C7 14 29 3 43 17
//             L50 25
//             L57 17
//             C71 3 93 14 93 32
//             C93 57 58 81 50 89 Z
//           "
//           fill={fill}
//           stroke={stroke}
//           strokeWidth="5"
//           strokeLinejoin="round"
//         />
//       )}

//       {shapeId === "star" && (
//         <Polygon
//           points="
//             50,5 62,35 94,37
//             69,58 77,90 50,73
//             23,90 31,58 6,37 38,35
//           "
//           fill={fill}
//           stroke={stroke}
//           strokeWidth="5"
//           strokeLinejoin="round"
//         />
//       )}
//     </Svg>
//   );
// }

// function SimpleShapeView({ object }: { object: SimpleShapeObject }) {
//   if (!isShapeId(object.shapeId)) {
//     return null;
//   }

//   const color = COLOR_SORTING_COLORS[object.colorId];

//   return (
//     <ViewBox>
//       <ShapeOutline shapeId={object.shapeId} color={color} filled />
//     </ViewBox>
//   );
// }

// function ItemView({ object }: { object: ShapeItemObject }) {
//   const item = classificationItems.find(
//     (candidate) => candidate.id === object.itemId,
//   );

//   const variant =
//     object.variant ??
//     item?.variants.find((candidate) => candidate.colorId === "natural");

//   const primary = variant?.primary ?? COLOR_SORTING_COLORS.natural;

//   return (
//     <ViewBox>
//       <RenderColorSortingObjectSvg
//         object={{
//           id: object.id,
//           itemId: object.itemId,
//           label: object.name,
//           colorId: variant?.colorId ?? "natural",
//           svgKey: object.svgKey,
//           shape: object.shapeId,
//         }}
//         primary={primary}
//         secondary={variant?.secondary}
//         accent={variant?.accent}
//         size={30}
//       />
//     </ViewBox>
//   );
// }

// function PlacedShapeObject({
//   object,
//   onPress,
// }: {
//   object: ShapeSortingObject;
//   onPress: () => void;
// }) {
//   const label =
//     object.kind === "item"
//       ? object.name
//       : isShapeId(object.shapeId)
//         ? SHAPE_LABELS[object.shapeId]
//         : "도형";

//   return (
//     <PlacedItem
//       onPress={onPress}
//       activeOpacity={0.7}
//       accessibilityRole="button"
//       accessibilityLabel={`${label} 제거`}
//     >
//       {object.kind === "simple_shape" ? (
//         <SimpleShapeView object={object} />
//       ) : (
//         <ItemView object={object} />
//       )}
//     </PlacedItem>
//   );
// }

// export default function ShapeSortingTargetBasket({
//   target,
//   objects,
//   placedObjectIds,
//   onPress,
//   onRemoveObject,
// }: ShapeSortingTargetBasketProps) {
//   if (!isShapeId(target.shapeId)) {
//     return null;
//   }

//   const targetColor = SHAPE_COLORS[target.shapeId];
//   const targetLabel = SHAPE_LABELS[target.shapeId];

//   return (
//     <BasketButton
//       activeOpacity={0.85}
//       onPress={onPress}
//       accessibilityRole="button"
//       accessibilityLabel={targetLabel}
//     >
//       <ShapeBackground>
//         <ShapeOutline shapeId={target.shapeId} color={targetColor} />
//       </ShapeBackground>

//       <ShapeHeader color={targetColor}>
//         <ShapeHeaderText>{targetLabel}</ShapeHeaderText>
//       </ShapeHeader>

//       <BasketContent>
//         {placedObjectIds.length === 0 ? (
//           <EmptyCircle color={targetColor}>
//             <Ionicons name="add" size={25} color={targetColor} />
//           </EmptyCircle>
//         ) : (
//           <BasketItems>
//             {placedObjectIds.map((objectId) => {
//               const object = objects.find(
//                 (candidate) => candidate.id === objectId,
//               );

//               if (!object) {
//                 return null;
//               }

//               return (
//                 <PlacedShapeObject
//                   key={objectId}
//                   object={object}
//                   onPress={() => onRemoveObject(objectId)}
//                 />
//               );
//             })}
//           </BasketItems>
//         )}
//       </BasketContent>
//     </BasketButton>
//   );
// }

// const BasketButton = styled.TouchableOpacity`
//   flex: 1;
//   min-height: 130px;
//   align-items: center;
//   justify-content: center;
//   position: relative;
// `;

// const ShapeBackground = styled.View`
//   position: absolute;
//   width: 100%;
//   aspect-ratio: 1;
//   top: 0;
//   align-self: center;
// `;

// const ShapeHeader = styled.View<{ color: string }>`
//   min-height: 34px;
//   align-self: stretch;
//   align-items: center;
//   justify-content: center;
//   background-color: ${(p) => p.color};
//   border-radius: 12px;
//   margin: 4px 2px 6px;
//   padding: 4px;
// `;

// const ShapeHeaderText = styled(AppText)`
//   font-size: 12px;
//   font-weight: 900;
//   color: #ffffff;
//   text-align: center;
// `;

// const BasketContent = styled.View`
//   width: 90%;
//   min-height: 48px;
//   align-items: center;
//   justify-content: center;
//   margin-top: 4px;
//   margin-bottom: 18px;
// `;

// const EmptyCircle = styled.View<{ color: string }>`
//   width: 34px;
//   height: 34px;
//   border-radius: 17px;
//   background-color: ${(p) => `${p.color}22`};
//   align-items: center;
//   justify-content: center;
// `;

// const BasketItems = styled.View`
//   width: 100%;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   gap: 0px;
// `;

// const PlacedItem = styled.TouchableOpacity`
//   width: 34px;
//   height: 34px;
//   align-items: center;
//   justify-content: center;
// `;

// const ViewBox = styled.View`
//   width: 30px;
//   height: 30px;
//   align-items: center;
//   justify-content: center;
// `;

import React from "react";
import Svg, { Circle, Path, Polygon, Rect } from "react-native-svg";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { classificationItems } from "../../data/classification/classificationItems";
import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { AppText } from "../../utils/AppText";
import {
  ShapeItemObject,
  ShapeSortingObject,
  ShapeSortingTarget,
  SimpleShapeObject,
} from "../../generators/classification/generateShapeSortingProblem";

export type ShapeId = "circle" | "triangle" | "square" | "heart" | "star";

type ShapeSortingTargetBasketProps = {
  target: ShapeSortingTarget;
  objects: ShapeSortingObject[];
  placedObjectIds: string[];
  onPress: () => void;
  onRemoveObject: (objectId: string) => void;
};

const SHAPE_COLORS: Record<ShapeId, string> = {
  circle: "#F6C94A",
  triangle: "#55B879",
  square: "#55A9F5",
  heart: "#F28BAA",
  star: "#A28AF5",
};

const SHAPE_LABELS: Record<ShapeId, string> = {
  circle: "동그라미",
  triangle: "세모",
  square: "네모",
  heart: "하트",
  star: "별",
};

function isShapeId(shapeId: string): shapeId is ShapeId {
  return (
    shapeId === "circle" ||
    shapeId === "triangle" ||
    shapeId === "square" ||
    shapeId === "heart" ||
    shapeId === "star"
  );
}

function ShapeOutline({
  shapeId,
  color,
  filled = false,
}: {
  shapeId: ShapeId;
  color: string;
  filled?: boolean;
}) {
  const fill = filled ? color : "#FFFFFF";
  const stroke = filled ? "rgba(0,0,0,0.12)" : color;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {shapeId === "circle" && (
        <Circle
          cx="50"
          cy="50"
          r="44"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
        />
      )}

      {shapeId === "triangle" && (
        <Polygon
          points="50,7 94,88 6,88"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}

      {shapeId === "square" && (
        <Rect
          x="7"
          y="7"
          width="86"
          height="86"
          rx="13"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
        />
      )}

      {shapeId === "heart" && (
        <Path
          d="
            M50 89
            C42 81 7 57 7 32
            C7 14 29 3 43 17
            L50 25
            L57 17
            C71 3 93 14 93 32
            C93 57 58 81 50 89 Z
          "
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}

      {shapeId === "star" && (
        <Polygon
          points="
            50,5 62,35 94,37
            69,58 77,90 50,73
            23,90 31,58 6,37 38,35
          "
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

function SimpleShapeView({ object }: { object: SimpleShapeObject }) {
  if (!isShapeId(object.shapeId)) {
    return null;
  }

  const color = COLOR_SORTING_COLORS[object.colorId];

  return (
    <ViewBox>
      <ShapeOutline shapeId={object.shapeId} color={color} filled />
    </ViewBox>
  );
}

function ItemView({ object }: { object: ShapeItemObject }) {
  const item = classificationItems.find(
    (candidate) => candidate.id === object.itemId,
  );

  const variant =
    object.variant ??
    item?.variants.find((candidate) => candidate.colorId === "natural");

  const primary = variant?.primary ?? COLOR_SORTING_COLORS.natural;

  return (
    <ViewBox>
      <RenderColorSortingObjectSvg
        object={{
          id: object.id,
          itemId: object.itemId,
          label: object.name,
          colorId: variant?.colorId ?? "natural",
          svgKey: object.svgKey,
          shape: object.shapeId,
        }}
        primary={primary}
        secondary={variant?.secondary}
        accent={variant?.accent}
        size={30}
      />
    </ViewBox>
  );
}

function PlacedShapeObject({
  object,
  onPress,
}: {
  object: ShapeSortingObject;
  onPress: () => void;
}) {
  const label =
    object.kind === "item"
      ? object.name
      : isShapeId(object.shapeId)
        ? SHAPE_LABELS[object.shapeId]
        : "도형";

  return (
    <PlacedItem
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${label} 제거`}
    >
      {object.kind === "simple_shape" ? (
        <SimpleShapeView object={object} />
      ) : (
        <ItemView object={object} />
      )}
    </PlacedItem>
  );
}

export default function ShapeSortingTargetBasket({
  target,
  objects,
  placedObjectIds,
  onPress,
  onRemoveObject,
}: ShapeSortingTargetBasketProps) {
  if (!isShapeId(target.shapeId)) {
    return null;
  }

  const targetColor = SHAPE_COLORS[target.shapeId];
  const targetLabel = SHAPE_LABELS[target.shapeId];

  return (
    <BasketButton
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={targetLabel}
    >
      {/* SVG와 헤더를 하나의 상단 영역으로 고정 */}
      <BasketTop>
        <ShapeBackground>
          <ShapeOutline shapeId={target.shapeId} color={targetColor} />
        </ShapeBackground>

        {placedObjectIds.length === 0 && (
          <PlusOverlay>
            <EmptyCircle color={targetColor}>
              <Ionicons name="add" size={25} color={targetColor} />
            </EmptyCircle>
          </PlusOverlay>
        )}

        <ShapeHeader color={targetColor}>
          <ShapeHeaderText>{targetLabel}</ShapeHeaderText>
        </ShapeHeader>
      </BasketTop>

      {/* 아이템 영역은 상단 영역과 분리 */}
      <BasketContent>
        {placedObjectIds.length === 0 && (
          <BasketItems>
            {placedObjectIds.map((objectId) => {
              const object = objects.find(
                (candidate) => candidate.id === objectId,
              );

              if (!object) {
                return null;
              }

              return (
                <PlacedShapeObject
                  key={objectId}
                  object={object}
                  onPress={() => onRemoveObject(objectId)}
                />
              );
            })}
          </BasketItems>
        )}
      </BasketContent>
    </BasketButton>
  );
}

const BasketButton = styled.TouchableOpacity`
  flex: 1;
  min-width: 0;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const BasketTop = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

const ShapeBackground = styled.View`
  width: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const ShapeHeader = styled.View<{ color: string }>`
  width: 100%;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.color};
  border-radius: 12px;
  margin-top: 0px;
  padding: 4px 2px;
`;

const ShapeHeaderText = styled(AppText)`
  font-size: 12px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

const BasketContent = styled.View`
  width: 100%;
  flex: 1;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 0px;
  position: relative;
`;
const EmptyCircle = styled.View<{ color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 17px;

  align-items: center;
  justify-content: center;

  background-color: ${(p) => `${p.color}22`};
`;
const BasketItems = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0px;
`;

const PlacedItem = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
`;

const ViewBox = styled.View`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;
const PlusOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1;

  align-items: center;
  justify-content: center;
`;
