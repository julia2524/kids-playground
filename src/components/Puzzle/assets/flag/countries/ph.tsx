import * as React from "react";

import Svg, { Circle, G, Path, Polygon, Rect, Use } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const PHFlagArtwork = React.memo(function PHFlagArtwork() {
  const prefix = "ph-" + React.useId().replace(/:/g, "");

  return (
    <>
      {/* 배경 */}
      <Rect x={0} y={0} width={240} height={90} fill="#0038A8" />
      <Rect x={0} y={90} width={240} height={90} fill="#CE1126" />

      {/* 흰색 이등변삼각형 */}
      <Polygon points="0,0 120,90 0,180" fill="#FFFFFF" />

      {/* 태양: 삼각형 안쪽 중앙 */}
      <G transform="translate(42 90) scale(1.2)" fill="#FCD116">
        <Circle r={9} />

        {/* 태양 광선 */}
        <G id={`${prefix}-d`}>
          <G id={`${prefix}-c`}>
            <G id={`${prefix}-b`}>
              <Path d="M-1 0l.062.062L0 0l-.938-.062z" transform="scale(19)" />

              <Path
                id={`${prefix}-a`}
                d="M-.884.116l.05.05L0 0z"
                transform="scale(19.2381)"
              />

              <Use transform="scale(1 -1)" href={`#${prefix}-a`} />
            </G>

            <Use transform="rotate(45)" href={`#${prefix}-b`} />
          </G>

          <Use transform="rotate(90)" href={`#${prefix}-c`} />
        </G>

        <Use transform="rotate(180)" href={`#${prefix}-d`} />
      </G>

      {/* 별 모양을 개별 배치 */}
      {/* 왼쪽 위 */}
      <G transform="translate(13 20) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z" />
        <Path
          d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z"
          transform="scale(1 -1)"
        />
      </G>

      {/* 왼쪽 아래 */}
      <G transform="translate(13 160) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176-.073 4.756l-2.163-2.854-3.427 1.037L-2 0z" />
        <Path
          d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z"
          transform="scale(1 -1)"
        />
      </G>

      {/* 오른쪽 꼭짓점 */}
      <G transform="translate(103 90) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z" />
        <Path
          d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z"
          transform="scale(1 -1)"
        />
      </G>
    </>
  );
});

export default function PHFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <PHFlagArtwork />
    </Svg>
  );
}
