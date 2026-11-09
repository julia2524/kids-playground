import * as React from "react";
import Svg, { Circle, G, Polygon, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(0 0 12 8)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(0 10) scale(20)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const TRFlagArtwork = React.memo(function TRFlagArtwork() {
  return (
    <G transform={ARTWORK_TRANSFORM}>
      {/* 바탕과 색띠 */}
      <Rect x={0} y={0} width={12} height={8} fill="#E30A17" />

      {/* crescent */}
      <G>
        <Circle cx={4.25} cy={4} r={2} fill="#FFFFFF" />
        <Circle cx={4.75} cy={4} r={1.6} fill="#E30A17" />
      </G>

      {/* star */}
      <G>
        <Polygon
          points="5.83333,4 6.52431,3.77549 6.52431,3.04894 6.95136,3.63673 7.64235,3.41221 7.2153,4 7.64235,4.58779 6.95136,4.36327 6.52431,4.95106 6.52431,4.22451"
          fill="#FFFFFF"
        />
      </G>
    </G>
  );
});

export default function TRFlag(props: FlagProps) {
  return (
    <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
      <TRFlagArtwork />
    </Svg>
  );
}
