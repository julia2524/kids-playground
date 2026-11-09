// import * as React from "react";
// import Svg, { Circle, G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 20 12)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 18) scale(12)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const BDFlagArtwork = React.memo(function BDFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={20} height={12} fill="#006A4E" />

//       {/* 태양 */}
//       <Circle cx={9} cy={6} r={4} fill="#F42A41" />
//     </G>
//   );
// });

// export default function BDFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <BDFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, G, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const BDFlagArtwork = React.memo(function BDFlagArtwork() {
  return (
    <>
      {/* 초록색 바탕을 퍼즐판 전체에 채웁니다. */}
      <Rect x={0} y={0} width={240} height={180} fill="#006A4E" />

      {/* 빨간 원: 원본 비율과 크기 유지 */}
      <Circle cx={108} cy={90} r={48} fill="#F42A41" />
    </>
  );
});

export default function BDFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <BDFlagArtwork />
    </Svg>
  );
}
