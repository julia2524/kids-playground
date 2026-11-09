// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 5 3)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 18) scale(48)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const DEFlagArtwork = React.memo(function DEFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={5} height={3} fill="#FFCE00" />
//         <Rect x={0} y={0} width={5} height={2} fill="#DD0000" />
//         <Rect x={0} y={0} width={5} height={1} fill="#000000" />
//       </G>
//     </G>
//   );
// });

// export default function DEFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <DEFlagArtwork />
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
export const DEFlagArtwork = React.memo(function DEFlagArtwork() {
  return (
    <G>
      {/* 상단 검정 */}
      <Rect x={0} y={0} width={240} height={60} fill="#000000" />

      {/* 중앙 빨강 */}
      <Rect x={0} y={60} width={240} height={60} fill="#DD0000" />

      {/* 하단 노랑 */}
      <Rect x={0} y={120} width={240} height={60} fill="#FFCE00" />
    </G>
  );
});

export default function DEFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <DEFlagArtwork />
    </Svg>
  );
}
