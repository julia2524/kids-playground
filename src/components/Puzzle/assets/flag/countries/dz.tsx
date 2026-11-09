// import * as React from "react";
// import Svg, { G, Path, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 900 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(0.266666666666667)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const DZFlagArtwork = React.memo(function DZFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={900} height={600} fill="#FFFFFF" />

//       {/* green-field */}
//       <Rect x={0} y={0} width={450} height={600} fill="#006233" />

//       {/* crescent */}
//       <Path d="M 579.904 225 A 150 150 0 1 0 579.904 375 A 120 120 0 1 1 579.904 225 Z" fill="#D21034" />

//       {/* star */}
//       <Polygon points="585,300 450,256 534,371 534,229 450,344" fill="#D21034" />
//     </G>
//   );
// });

// export default function DZFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <DZFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { G, Path, Polygon, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 900×600을 가로 240px에 맞춰 비율 유지
// 표시 높이 160px, 남는 20px은 위아래 10px씩 확장
const ARTWORK_TRANSFORM = "translate(0 10) scale(0.266666666666667)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const DZFlagArtwork = React.memo(function DZFlagArtwork() {
  return (
    <G>
      {/* 전체 배경: 위아래 여백까지 초록색과 흰색으로 반반 분할 */}
      <Rect x={0} y={0} width={120} height={180} fill="#006233" />

      <Rect x={120} y={0} width={120} height={180} fill="#FFFFFF" />

      {/* 원본 좌표계의 초승달과 별 */}
      <G transform={ARTWORK_TRANSFORM}>
        {/* 초승달 */}
        <Path
          d="M 579.904 225 A 150 150 0 1 0 579.904 375 A 120 120 0 1 1 579.904 225 Z"
          fill="#D21034"
        />

        {/* 별 */}
        <Polygon
          points="585,300 450,256 534,371 534,229 450,344"
          fill="#D21034"
        />
      </G>
    </G>
  );
});

export default function DZFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <DZFlagArtwork />
    </Svg>
  );
}
