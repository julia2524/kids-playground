// import * as React from "react";
// import Svg, { G, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 30 20)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(8)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const VNFlagArtwork = React.memo(function VNFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={30} height={20} fill="#DA251D" />

//       {/* star */}
//       <G>
//         <Polygon
//           points="15,4 16.34708,8.1459 20.70634,8.1459 17.17963,10.7082 18.52671,14.8541 15,12.2918 11.47329,14.8541 12.82037,10.7082 9.29366,8.1459 13.65292,8.1459"
//           fill="#FFFF00"
//         />
//       </G>
//     </G>
//   );
// });

// export default function VNFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <VNFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { G, Polygon, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

const STAR_TRANSFORM = "translate(0 10) scale(8)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const VNFlagArtwork = React.memo(function VNFlagArtwork() {
  return (
    <G>
      {/* 빨간색 배경: 위아래 여백 없이 확장 */}
      <Rect x={0} y={0} width={240} height={180} fill="#DA251D" />

      {/* 노란색 별: 기존 위치와 크기 유지 */}
      <G transform={STAR_TRANSFORM}>
        <Polygon
          points="15,4 16.34708,8.1459 20.70634,8.1459 17.17963,10.7082 18.52671,14.8541 15,12.2918 11.47329,14.8541 12.82037,10.7082 9.29366,8.1459 13.65292,8.1459"
          fill="#FFFF00"
        />
      </G>
    </G>
  );
});

export default function VNFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <VNFlagArtwork />
    </Svg>
  );
}
