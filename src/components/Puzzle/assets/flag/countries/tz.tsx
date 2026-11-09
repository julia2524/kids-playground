import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Polygon, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(0 0 72 48)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(0 10) scale(3.333333333333333)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const TZFlagArtwork = React.memo(function TZFlagArtwork() {
  const sourceClipId = "tz-source-bounds-" + React.useId().replace(/:/g, "");

  return (
    <G transform={ARTWORK_TRANSFORM}>
      {/* 원본 SVG의 외곽에서 넘치는 획을 잘라냅니다. */}
      <Defs>
        <ClipPath id={sourceClipId}>
          <Rect x={0} y={0} width={72} height={48} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${sourceClipId})`}>
        {/* 바탕과 색띠 */}
        <Rect x={0} y={0} width={72} height={48} fill="#1EB53A" />

        {/* blue-field */}
        <Polygon points="0,48 72,0 72,48" fill="#00A3DD" />

        {/* diagonal-band */}
        <G>
          <Path d="M 0 48 L 72 0" fill="none" stroke="#FCD116" strokeWidth={19} />
          <Path d="M 0 48 L 72 0" fill="none" stroke="#000000" strokeWidth={13} />
        </G>
      </G>
    </G>
  );
});

export default function TZFlag(props: FlagProps) {
  return (
    <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
      <TZFlagArtwork />
    </Svg>
  );
}
