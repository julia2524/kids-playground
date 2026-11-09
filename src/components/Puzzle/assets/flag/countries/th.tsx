import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(0 0 9 6)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(0 10) scale(26.666666666666667)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const THFlagArtwork = React.memo(function THFlagArtwork() {
  return (
    <G transform={ARTWORK_TRANSFORM}>
      {/* 바탕과 색띠 */}
      <G>
        <Rect x={0} y={0} width={9} height={6} fill="#A51931" />
        <Rect x={0} y={0} width={9} height={5} fill="#F4F5F8" />
        <Rect x={0} y={0} width={9} height={4} fill="#2D2A4A" />
        <Rect x={0} y={0} width={9} height={2} fill="#F4F5F8" />
        <Rect x={0} y={0} width={9} height={1} fill="#A51931" />
      </G>
    </G>
  );
});

export default function THFlag(props: FlagProps) {
  return (
    <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
      <THFlagArtwork />
    </Svg>
  );
}
