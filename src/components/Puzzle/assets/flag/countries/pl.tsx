// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 16 10)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 15) scale(15)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const PLFlagArtwork = React.memo(function PLFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={16} height={10} fill="#DC143C" />
//         <Rect x={0} y={0} width={16} height={5} fill="#FFFFFF" />
//       </G>
//     </G>
//   );
// });

// export default function PLFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <PLFlagArtwork />
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
export const PLFlagArtwork = React.memo(function PLFlagArtwork() {
  return (
    <G>
      {/* 상단 흰색 */}
      <Rect x={0} y={0} width={240} height={90} fill="#FFFFFF" />

      {/* 하단 빨강 */}
      <Rect x={0} y={90} width={240} height={90} fill="#DC143C" />
    </G>
  );
});

export default function PLFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <PLFlagArtwork />
    </Svg>
  );
}
