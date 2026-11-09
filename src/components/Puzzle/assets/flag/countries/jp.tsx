// import * as React from "react";
// import Svg, { Circle, G, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 900 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(0.266666666666667)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const JPFlagArtwork = React.memo(function JPFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={900} height={600} fill="#FFFFFF" />

//       {/* 태양 */}
//       <Circle cx={450} cy={300} r={180} fill="#BC002D" />
//     </G>
//   );
// });

// export default function JPFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <JPFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";
import Svg, { Circle, G, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 퍼즐판 전체를 채우는 일본 국기 배경
const FLAG_WIDTH = 240;
const FLAG_HEIGHT = 180;

// 일본 국기 원의 지름은 국기 높이의 3/5
const SUN_RADIUS = (FLAG_HEIGHT * 3) / 10;

export const JPFlagArtwork = React.memo(function JPFlagArtwork() {
  return (
    <G>
      {/* 흰색 배경 */}
      <Rect
        x={0}
        y={0}
        width={FLAG_WIDTH}
        height={FLAG_HEIGHT}
        fill="#FFFFFF"
      />

      {/* 중앙의 빨간 원: 정원 유지 */}
      <Circle
        cx={FLAG_WIDTH / 2}
        cy={FLAG_HEIGHT / 2}
        r={SUN_RADIUS}
        fill="#BC002D"
      />
    </G>
  );
});

export default function JPFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <JPFlagArtwork />
    </Svg>
  );
}
