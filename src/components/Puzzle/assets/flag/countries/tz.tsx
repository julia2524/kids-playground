import * as React from "react";

import Svg, { G, Polygon, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const TZFlagArtwork = React.memo(function TZFlagArtwork() {
  return (
    <G>
      {/* 전체 초록색 배경 */}
      <Rect x={0} y={0} width={240} height={180} fill="#1EB53A" />

      {/* 오른쪽 아래 하늘색 영역 */}
      <Polygon points="0,180 240,0 240,180" fill="#00A3DD" />

      {/* 노란색 바깥 대각선 띠 */}
      <Polygon points="-10,157 240,-23 250,23 0,203" fill="#FCD116" />

      {/* 검정색 중앙 대각선 띠 */}
      <Polygon points="-10,166 240,-14 250,14 0,194" fill="#000000" />
    </G>
  );
});

export default function TZFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <TZFlagArtwork />
    </Svg>
  );
}
