import * as React from "react";

import Svg, { G, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const THFlagArtwork = React.memo(function THFlagArtwork() {
  return (
    <G>
      {/* 상단 빨간색 */}
      <Rect x={0} y={0} width={240} height={30} fill="#A51931" />

      {/* 흰색 */}
      <Rect x={0} y={30} width={240} height={30} fill="#F4F5F8" />

      {/* 중앙 남색: 두 배 높이 */}
      <Rect x={0} y={60} width={240} height={60} fill="#2D2A4A" />

      {/* 흰색 */}
      <Rect x={0} y={120} width={240} height={30} fill="#F4F5F8" />

      {/* 하단 빨간색 */}
      <Rect x={0} y={150} width={240} height={30} fill="#A51931" />
    </G>
  );
});

export default function THFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <THFlagArtwork />
    </Svg>
  );
}
