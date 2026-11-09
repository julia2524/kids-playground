// import * as React from "react";
// import Svg, { Circle, G, Path, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(-5 -5 945 630)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(1.26984126984127 11.26984126984127) scale(0.253968253968254)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const UYFlagArtwork = React.memo(function UYFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={-5} y={-5} width={945} height={630} fill="#FFFFFF" />
//         <Rect x={345} y={65} width={595} height={70} fill="#0038A8" />
//         <Rect x={345} y={205} width={595} height={70} fill="#0038A8" />
//         <Rect x={-5} y={345} width={945} height={70} fill="#0038A8" />
//         <Rect x={-5} y={485} width={945} height={70} fill="#0038A8" />
//       </G>

//       {/* 왼쪽 위의 5월의 태양 */}
//       <G transform="translate(170 170) scale(2.78)">
//         <G>
//           <Polygon
//             points="0,-48 5.26744,-26.4812 18.3688,-44.34622 15.0004,-22.44968 33.94113,-33.94113 22.44968,-15.0004 44.34622,-18.3688 26.4812,-5.26744 48,0 26.4812,5.26744 44.34622,18.3688 22.44968,15.0004 33.94113,33.94113 15.0004,22.44968 18.3688,44.34622 5.26744,26.4812 0,48 -5.26744,26.4812 -18.3688,44.34622 -15.0004,22.44968 -33.94113,33.94113 -22.44968,15.0004 -44.34622,18.3688 -26.4812,5.26744 -48,0 -26.4812,-5.26744 -44.34622,-18.3688 -22.44968,-15.0004 -33.94113,-33.94113 -15.0004,-22.44968 -18.3688,-44.34622 -5.26744,-26.4812"
//             fill="#EAB72C"
//           />
//           <Circle cx={0} cy={0} r={26} fill="#F6C44B" stroke="#9D6728" strokeWidth={1.7} />
//           <Path
//             d="M -16 -4 Q -10 -10 -5 -4 M 5 -4 Q 10 -10 16 -4 M 0 -2 L -2 5 H 2 M -8 10 Q 0 16 8 10"
//             fill="none" stroke="#9D6728" strokeWidth={2.1} strokeLinecap="round"
//           />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function UYFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <UYFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, G, Path, Polygon, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(-5 -5 945 630)를 240×180으로 변환합니다.
// 배경은 X/Y 독립 배율을 적용해 퍼즐판 전체를 채웁니다.
const ARTWORK_TRANSFORM =
  "translate(1.26984126984127 1.42857142857143) scale(0.253968253968254 0.285714285714286)";

// 태양 중심은 원본 (170,170)에서 변환된 (44.444,50)에 배치합니다.
// 태양 자체에는 균일 배율을 적용해 원형과 얼굴 비율을 유지합니다.
const SUN_TRANSFORM = "translate(44.4444444444444 50) scale(0.253968253968254)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const UYFlagArtwork = React.memo(function UYFlagArtwork() {
  return (
    <>
      {/* 배경과 9개의 가로 색띠 */}
      <G transform={ARTWORK_TRANSFORM}>
        <G>
          <Rect x={-5} y={-5} width={945} height={630} fill="#FFFFFF" />

          {/* 원본의 왼쪽 위 칸톤 영역을 고려한 파란색 띠 */}
          <Rect x={345} y={65} width={595} height={70} fill="#0038A8" />
          <Rect x={345} y={205} width={595} height={70} fill="#0038A8" />
          <Rect x={-5} y={345} width={945} height={70} fill="#0038A8" />
          <Rect x={-5} y={485} width={945} height={70} fill="#0038A8" />
        </G>
      </G>

      {/* 왼쪽 위의 5월의 태양: 원형 비율 유지 */}
      <G transform={SUN_TRANSFORM}>
        <G transform="scale(2.78)">
          <Polygon
            points="0,-48 5.26744,-26.4812 18.3688,-44.34622 15.0004,-22.44968 33.94113,-33.94113 22.44968,-15.0004 44.34622,-18.3688 26.4812,-5.26744 48,0 26.4812,5.26744 44.34622,18.3688 22.44968,15.0004 33.94113,33.94113 15.0004,22.44968 18.3688,44.34622 5.26744,26.4812 0,48 -5.26744,26.4812 -18.3688,44.34622 -15.0004,22.44968 -33.94113,33.94113 -22.44968,15.0004 -44.34622,18.3688 -26.4812,5.26744 -48,0 -26.4812,-5.26744 -44.34622,-18.3688 -22.44968,-15.0004 -33.94113,-33.94113 -15.0004,-22.44968 -18.3688,-44.34622 -5.26744,-26.4812"
            fill="#EAB72C"
          />

          <Circle
            cx={0}
            cy={0}
            r={26}
            fill="#F6C44B"
            stroke="#9D6728"
            strokeWidth={1.7}
          />

          <Path
            d="M -16 -4 Q -10 -10 -5 -4 M 5 -4 Q 10 -10 16 -4 M 0 -2 L -2 5 H 2 M -8 10 Q 0 16 8 10"
            fill="none"
            stroke="#9D6728"
            strokeWidth={2.1}
            strokeLinecap="round"
          />
        </G>
      </G>
    </>
  );
});

export default function UYFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <UYFlagArtwork />
    </Svg>
  );
}
