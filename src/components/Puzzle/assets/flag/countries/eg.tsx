import * as React from "react";

import Svg, { G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 독수리 원본 크기를 유지하면서 중앙에 배치
// 기존 배율: 0.2666667 × 1.48 = 0.3946667
const EAGLE_TRANSFORM = "translate(120 90) scale(0.394666666666667)";

export const EGFlagArtwork = React.memo(function EGFlagArtwork() {
  return (
    <G>
      {/* 상단 빨간색: 전체 높이의 1/3 */}
      <Rect x={0} y={0} width={240} height={60} fill="#CE1126" />

      {/* 중앙 흰색: 전체 높이의 1/3 */}
      <Rect x={0} y={60} width={240} height={60} fill="#FFFFFF" />

      {/* 하단 검정색: 전체 높이의 1/3 */}
      <Rect x={0} y={120} width={240} height={60} fill="#000000" />

      {/* 살라딘의 독수리: 중앙 배치 */}
      <G transform={EAGLE_TRANSFORM}>
        {/* 왼쪽 날개 */}
        <G>
          <Path
            d="M -8 -22 Q -22 -23 -39 -32 L -45 -28 L -44 39 L -13 18 Z"
            fill="#C58D08"
          />

          <Path
            d="M -39 -23 L -39 31"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -33 -23 L -33 27"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -27 -23 L -27 22"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -21 -23 L -21 17"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />
        </G>

        {/* 오른쪽 날개 */}
        <G transform="scale(-1 1)">
          <Path
            d="M -8 -22 Q -22 -23 -39 -32 L -45 -28 L -44 39 L -13 18 Z"
            fill="#C58D08"
          />

          <Path
            d="M -39 -23 L -39 31"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -33 -23 L -33 27"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -27 -23 L -27 22"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />

          <Path
            d="M -21 -23 L -21 17"
            fill="none"
            stroke="#FFF3C7"
            strokeWidth={2.2}
          />
        </G>

        {/* 꼬리 */}
        <Path
          d="M -16 20 L -26 36 L -11 31 L -8 39 L 0 30 L 8 39 L 11 31 L 26 36 L 16 20 Z"
          fill="#C58D08"
        />

        {/* 머리 */}
        <Path
          d="M -13 -21 Q -7 -29 -7 -42 L -16 -45 L -10 -49 L 5 -49 Q 12 -45 10 -38 L 14 -21 Z"
          fill="#C58D08"
        />

        {/* 몸통 */}
        <Path
          d="M -16 -21 L 0 -17 L 16 -21 L 13 13 Q 9 22 0 27 Q -9 22 -13 13 Z"
          fill="#FFF7D5"
          stroke="#C58D08"
          strokeWidth={2}
        />

        {/* 몸통 중앙 문양 */}
        <Path d="M -5 -18 L 5 -18 L 4 19 L 0 23 L -4 19 Z" fill="#C58D08" />

        {/* 하단 장식 */}
        <Path
          d="M -30 42 Q 0 51 30 42 L 26 53 Q 0 61 -26 53 Z"
          fill="#C58D08"
        />
      </G>
    </G>
  );
});

export default function EGFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <EGFlagArtwork />
    </Svg>
  );
}
