// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 1000 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 18) scale(0.24)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const CRFlagArtwork = React.memo(function CRFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={1000} height={600} fill="#002B7F" />
//         <Rect x={0} y={0} width={1000} height={500} fill="#FFFFFF" />
//         <Rect x={0} y={0} width={1000} height={400} fill="#CE1126" />
//         <Rect x={0} y={0} width={1000} height={200} fill="#FFFFFF" />
//         <Rect x={0} y={0} width={1000} height={100} fill="#002B7F" />
//       </G>
//     </G>
//   );
// });

// export default function CRFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <CRFlagArtwork />
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
export const CRFlagArtwork = React.memo(function CRFlagArtwork() {
  return (
    <G>
      {/* 위쪽 파랑: 1 */}
      <Rect x={0} y={0} width={240} height={30} fill="#002B7F" />

      {/* 위쪽 흰색: 1 */}
      <Rect x={0} y={30} width={240} height={30} fill="#FFFFFF" />

      {/* 중앙 빨강: 2 */}
      <Rect x={0} y={60} width={240} height={60} fill="#CE1126" />

      {/* 아래쪽 흰색: 1 */}
      <Rect x={0} y={120} width={240} height={30} fill="#FFFFFF" />

      {/* 아래쪽 파랑: 1 */}
      <Rect x={0} y={150} width={240} height={30} fill="#002B7F" />
    </G>
  );
});

export default function CRFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <CRFlagArtwork />
    </Svg>
  );
}
