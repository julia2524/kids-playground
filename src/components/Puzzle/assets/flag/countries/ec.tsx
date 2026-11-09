import * as React from "react";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(0 0 1440 960)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(0 10) scale(0.166666666666667)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const ECFlagArtwork = React.memo(function ECFlagArtwork() {
  return (
    <>
      {/* 위쪽 여백: 국기 최상단 색상인 노란색 연장 */}
      <Rect x={0} y={0} width={240} height={10} fill="#FFDD00" />

      {/* 아래쪽 여백: 국기 최하단 색상인 빨간색 연장 */}
      <Rect x={0} y={170} width={240} height={10} fill="#ED1C24" />
      <G transform={ARTWORK_TRANSFORM}>
        {/* 바탕과 색띠 */}
        <G>
          <Rect x={0} y={0} width={1440} height={960} fill="#ED1C24" />
          <Rect x={0} y={0} width={1440} height={720} fill="#034EA2" />
          <Rect x={0} y={0} width={1440} height={480} fill="#FFDD00" />
        </G>

        {/* 퍼즐용으로 단순화한 국장 */}
        <G transform="translate(720 475) scale(2.65)">
          <G>
            <Path
              d="M -40 -42 Q -66 13 -34 53 Q -20 65 0 53 Q 20 65 34 53 Q 66 13 40 -42 L 32 -34 Q 47 13 24 42 Q 0 59 -24 42 Q -47 13 -32 -34 Z"
              fill="#FFD830"
            />
            <Path
              d="M -34 -32 Q -58 18 -28 53 Q -10 63 0 51 Q 10 63 28 53 Q 58 18 34 -32 L 28 -26 Q 40 12 19 42 Q 0 53 -19 42 Q -40 12 -28 -26 Z"
              fill="#13519A"
            />
            <Path
              d="M -28 -23 Q -43 19 -22 49 Q 0 65 22 49 Q 43 19 28 -23 L 24 -16 Q 28 26 16 42 Q 0 56 -16 42 Q -28 26 -24 -16 Z"
              fill="#CB1D2C"
            />
          </G>
          <G>
            <Ellipse
              cx={0}
              cy={3}
              rx={27}
              ry={40}
              fill="#9DDBF1"
              stroke="#B88427"
              strokeWidth={2.6}
            />
            <Circle cx={0} cy={-25} r={4.6} fill="#F8CA35" />
            <Path
              d="M -25 1 L -10 -14 L -2 -8 L 4 -13 L 24 2 L 26 12 H -26 Z"
              fill="#627A86"
            />
            <Path
              d="M -16 -8 L -10 -14 L -2 -8 L 4 -13 L 13 -5 L 5 -7 L -2 -4 Z"
              fill="#FFFFFF"
            />
            <Path
              d="M -26 12 Q -10 4 5 10 Q 18 10 26 12 Q 20 42 0 42 Q -20 42 -26 12 Z"
              fill="#6CA148"
            />
            <Path
              d="M -3 13 Q -13 20 0 24 Q 13 28 2 35 L -4 41 H 10 Q 20 31 8 26 Q -3 22 2 13 Z"
              fill="#278FB8"
            />
          </G>
          <G>
            <Path
              d="M 0 -47 Q -18 -68 -59 -50 L -44 -46 L -36 -47 L -29 -41 L -21 -43 L -15 -35 L -7 -38 L 0 -31 L 7 -38 L 15 -35 L 21 -43 L 29 -41 L 36 -47 L 44 -46 L 59 -50 Q 18 -68 0 -47 Z"
              fill="#402A24"
            />
            <Circle cx={-2} cy={-47} r={5} fill="#F2DDB2" />
            <Path d="M -6 -47 L -11 -45 L -5 -44 Z" fill="#DDA63E" />
          </G>
        </G>
      </G>
    </>
  );
});

export default function ECFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <ECFlagArtwork />
    </Svg>
  );
}
