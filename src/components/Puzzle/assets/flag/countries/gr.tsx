// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 27 18)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(8.888888888888889)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const GRFlagArtwork = React.memo(function GRFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={27} height={18} fill="#0D5EAF" />

//       {/* 흰색 줄무늬 */}
//       <G>
//         <Rect x={0} y={2} width={27} height={2} fill="#FFFFFF" />
//         <Rect x={0} y={6} width={27} height={2} fill="#FFFFFF" />
//         <Rect x={0} y={10} width={27} height={2} fill="#FFFFFF" />
//         <Rect x={0} y={14} width={27} height={2} fill="#FFFFFF" />
//       </G>

//       {/* 왼쪽 위의 사각 영역 */}
//       <G>
//         <Rect x={0} y={0} width={10} height={10} fill="#0D5EAF" />
//         <Rect x={4} y={0} width={2} height={10} fill="#FFFFFF" />
//         <Rect x={0} y={4} width={10} height={2} fill="#FFFFFF" />
//       </G>
//     </G>
//   );
// });

// export default function GRFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <GRFlagArtwork />
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
export const GRFlagArtwork = React.memo(function GRFlagArtwork() {
  return (
    <G>
      {/* 파란색 바탕 */}
      <Rect x={0} y={0} width={240} height={180} fill="#0D5EAF" />

      {/* 흰색 가로 줄무늬: 총 9줄 중 4줄 */}
      <G>
        <Rect x={0} y={20} width={240} height={20} fill="#FFFFFF" />
        <Rect x={0} y={60} width={240} height={20} fill="#FFFFFF" />
        <Rect x={0} y={100} width={240} height={20} fill="#FFFFFF" />
        <Rect x={0} y={140} width={240} height={20} fill="#FFFFFF" />
      </G>

      {/* 왼쪽 위 파란색 정사각형 */}
      <Rect x={0} y={0} width={100} height={100} fill="#0D5EAF" />

      {/* 흰색 십자 */}
      <G>
        <Rect x={40} y={0} width={20} height={100} fill="#FFFFFF" />
        <Rect x={0} y={40} width={100} height={20} fill="#FFFFFF" />
      </G>
    </G>
  );
});

export default function GRFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <GRFlagArtwork />
    </Svg>
  );
}
