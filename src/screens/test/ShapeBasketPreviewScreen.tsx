import React, { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";

import ShapeSortingTargetArea from "../../components/ShapeSorting/ShapeSortingTargetArea";
import type { ShapeId } from "../../components/ShapeSorting/ShapeSortingTargetBasket";

const previewTargets = [
  { id: "circle", shapeId: "circle", label: "동그라미", color: "#F6C94A" },
  { id: "triangle", shapeId: "triangle", label: "세모", color: "#55B879" },
  { id: "square", shapeId: "square", label: "네모", color: "#55A9F5" },
  { id: "heart", shapeId: "heart", label: "하트", color: "#F28BAA" },
  { id: "star", shapeId: "star", label: "별", color: "#A28AF5" },
] satisfies {
  id: string;
  shapeId: ShapeId;
  label: string;
  color: string;
}[];

export default function ShapeBasketPreviewScreen() {
  const basketRefs = useRef<Record<string, View | null>>({});

  return (
    <Screen>
      <Heading>모양 바구니 미리보기</Heading>

      <ShapeSortingTargetArea
        targets={previewTargets}
        objects={[]}
        placedObjects={{}}
        basketRefs={basketRefs}
        onTargetPress={(shapeId) => {
          console.log("선택한 바구니:", shapeId);
        }}
        onRemoveObject={() => {}}
      />
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #eef0fe;
  padding: 12px;
`;

const Heading = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: #514b59;
  text-align: center;
  margin: 20px 0;
`;
