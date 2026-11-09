// import * as React from "react";
// import Svg, { Circle, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 1000 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 18) scale(0.24)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const NIFlagArtwork = React.memo(function NIFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={1000} height={600} fill="#0067C6" />
//         <Rect x={0} y={200} width={1000} height={200} fill="#FFFFFF" />
//       </G>

//       {/* 퍼즐용으로 단순화한 국장 */}
//       <G transform="translate(500 300) scale(1.53)">
//         <Circle cx={0} cy={0} r={50} fill="none" stroke="#C5A24A" strokeWidth={1.7} />
//         <G>
//           <Path d="M 0 -31 L 33 24 H -33 Z" fill="#BCE7F4" stroke="#C5A24A" strokeWidth={2} />
//           <Path d="M -15 -1 Q 0 -16 15 -1" fill="none" stroke="#D2704C" strokeWidth={2} />
//           <Path d="M -13 0 Q 0 -12 13 0" fill="none" stroke="#EBC34E" strokeWidth={2} />
//           <Path
//             d="M -29 21 L -23 9 L -17 19 L -11 7 L -5 18 L 1 4 L 7 18 L 13 7 L 19 19 L 23 11 L 29 21 Z"
//             fill="#5D9845"
//           />
//           <Path d="M -29 21 H 29 L 31 23 H -31 Z" fill="#449FC7" />
//           <Path d="M -3 -7 Q 0 -11 4 -7 L 3 -3 H -3 Z" fill="#D74739" />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function NIFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <NIFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 배경 원본 1000×600을 240×180 전체에 맞춥니다.
const BACKGROUND_TRANSFORM = "scale(0.24 0.3)";

// 국장은 원형 비율과 기존 크기를 유지하면서 중앙에 배치합니다.
// 기존 전체 배율: 0.24 × 1.53 = 0.3672
const EMBLEM_TRANSFORM = "translate(120 90) scale(0.3672)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const NIFlagArtwork = React.memo(function NIFlagArtwork() {
  return (
    <>
      {/* 배경: 파랑·흰색·파랑 가로 1:1:1 */}
      <G transform={BACKGROUND_TRANSFORM}>
        <Rect x={0} y={0} width={1000} height={600} fill="#0067C6" />

        <Rect x={0} y={200} width={1000} height={200} fill="#FFFFFF" />
      </G>

      {/* 국장: 원형 비율과 기존 크기 유지 */}
      <G transform={EMBLEM_TRANSFORM}>
        <Circle
          cx={0}
          cy={0}
          r={50}
          fill="none"
          stroke="#C5A24A"
          strokeWidth={1.7}
        />

        <G>
          <Path
            d="M 0 -31 L 33 24 H -33 Z"
            fill="#BCE7F4"
            stroke="#C5A24A"
            strokeWidth={2}
          />

          <Path
            d="M -15 -1 Q 0 -16 15 -1"
            fill="none"
            stroke="#D2704C"
            strokeWidth={2}
          />

          <Path
            d="M -13 0 Q 0 -12 13 0"
            fill="none"
            stroke="#EBC34E"
            strokeWidth={2}
          />

          <Path
            d="M -29 21 L -23 9 L -17 19 L -11 7 L -5 18 L 1 4 L 7 18 L 13 7 L 19 19 L 23 11 L 29 21 Z"
            fill="#5D9845"
          />

          <Path d="M -29 21 H 29 L 31 23 H -31 Z" fill="#449FC7" />

          <Path d="M -3 -7 Q 0 -11 4 -7 L 3 -3 H -3 Z" fill="#D74739" />
        </G>
      </G>
    </>
  );
});

export default function NIFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <NIFlagArtwork />
    </Svg>
  );
}
