// import * as React from "react";
// import Svg, { G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 291.042 198.438)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(2.666827926102863 10) scale(0.806297180983481)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const BOFlagArtwork = React.memo(function BOFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={291.042} height={198.438} fill="#00702D" />
//         <Rect x={0} y={0} width={291.042} height={132.292} fill="#F0E53C" />
//         <Rect x={0} y={0} width={291.042} height={66.146} fill="#D32011" />
//       </G>
//     </G>
//   );
// });

// export default function BOFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <BOFlagArtwork />
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
export const BOFlagArtwork = React.memo(function BOFlagArtwork() {
  return (
    <G>
      {/* 위쪽 빨강 */}
      <Rect x={0} y={0} width={240} height={60} fill="#D32011" />

      {/* 가운데 노랑 */}
      <Rect x={0} y={60} width={240} height={60} fill="#F0E53C" />

      {/* 아래쪽 초록 */}
      <Rect x={0} y={120} width={240} height={60} fill="#00702D" />
    </G>
  );
});

export default function BOFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <BOFlagArtwork />
    </Svg>
  );
}
