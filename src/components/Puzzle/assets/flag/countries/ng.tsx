import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(0 0 6 3)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(0 30) scale(40)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const NGFlagArtwork = React.memo(function NGFlagArtwork() {
  return (
    <G transform={ARTWORK_TRANSFORM}>
      {/* 바탕과 색띠 */}
      <Rect x={0} y={0} width={6} height={3} fill="#008751" />

      {/* center-band */}
      <Rect x={2} y={0} width={2} height={3} fill="#FFFFFF" />
    </G>
  );
});

export default function NGFlag(props: FlagProps) {
  return (
    <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
      <NGFlagArtwork />
    </Svg>
  );
}
