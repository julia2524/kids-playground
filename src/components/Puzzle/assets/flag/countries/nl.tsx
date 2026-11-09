// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 9 6)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(26.666666666666667)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const NLFlagArtwork = React.memo(function NLFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={9} height={6} fill="#21468B" />
//         <Rect x={0} y={0} width={9} height={4} fill="#FFFFFF" />
//         <Rect x={0} y={0} width={9} height={2} fill="#AE1C28" />
//       </G>
//     </G>
//   );
// });

// export default function NLFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <NLFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { G, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const NLFlagArtwork = React.memo(function NLFlagArtwork() {
  return (
    <G>
      {/* 상단 빨간색 */}
      <Rect x={0} y={0} width={240} height={60} fill="#AE1C28" />

      {/* 중앙 흰색 */}
      <Rect x={0} y={60} width={240} height={60} fill="#FFFFFF" />

      {/* 하단 파란색 */}
      <Rect x={0} y={120} width={240} height={60} fill="#21468B" />
    </G>
  );
});

export default function NLFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <NLFlagArtwork />
    </Svg>
  );
}
