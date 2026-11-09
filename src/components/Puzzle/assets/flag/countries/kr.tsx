import * as React from "react";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(-36 -24 72 48)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = `translate(120 90) scale(${240 / 72})`;

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const KRFlagArtwork = React.memo(function KRFlagArtwork() {
  return (
    <>
      <Rect x={0} y={0} width={240} height={180} fill="#FFFFFF" />
      <G transform={ARTWORK_TRANSFORM}>
        {/* 바탕과 색띠 */}
        <Rect x={-36} y={-24} width={72} height={48} fill="#FFFFFF" />

        {/* 태극 문양 */}
        <G transform="rotate(-56.30993)">
          <Circle cx={0} cy={0} r={12} fill="#CD2E3A" />
          <Path
            d="M 0 -12 A 6 6 0 0 0 0 0 A 6 6 0 0 1 0 12 A 12 12 0 0 1 0 -12 Z"
            fill="#0047A0"
          />
        </G>

        {/* 건괘 · 왼쪽 위 */}
        <G transform="translate(-18.30511 -12.2034) rotate(-56.30993)">
          <Rect x={-6} y={-4} width={12} height={2} fill="#000000" />
          <Rect x={-6} y={-1} width={12} height={2} fill="#000000" />
          <Rect x={-6} y={2} width={12} height={2} fill="#000000" />
        </G>

        {/* 감괘 · 오른쪽 위 */}
        <G transform="translate(18.30511 -12.2034) rotate(56.30993)">
          <Rect x={-6} y={-4} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={-4} width={5.5} height={2} fill="#000000" />
          <Rect x={-6} y={-1} width={12} height={2} fill="#000000" />
          <Rect x={-6} y={2} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={2} width={5.5} height={2} fill="#000000" />
        </G>

        {/* 리괘 · 왼쪽 아래 */}
        <G transform="translate(-18.30511 12.2034) rotate(56.30993)">
          <Rect x={-6} y={-4} width={12} height={2} fill="#000000" />
          <Rect x={-6} y={-1} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={-1} width={5.5} height={2} fill="#000000" />
          <Rect x={-6} y={2} width={12} height={2} fill="#000000" />
        </G>

        {/* 곤괘 · 오른쪽 아래 */}
        <G transform="translate(18.30511 12.2034) rotate(-56.30993)">
          <Rect x={-6} y={-4} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={-4} width={5.5} height={2} fill="#000000" />
          <Rect x={-6} y={-1} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={-1} width={5.5} height={2} fill="#000000" />
          <Rect x={-6} y={2} width={5.5} height={2} fill="#000000" />
          <Rect x={0.5} y={2} width={5.5} height={2} fill="#000000" />
        </G>
      </G>
    </>
  );
});

export default function KRFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <KRFlagArtwork />
    </Svg>
  );
}
