// import * as React from "react";
// import Svg, { Circle, G, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 900 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(0.266666666666667)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const TWFlagArtwork = React.memo(function TWFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={900} height={600} fill="#FE0000" />

//       {/* 왼쪽 위의 사각 영역 */}
//       <Rect x={0} y={0} width={450} height={300} fill="#000095" />

//       {/* 열두 광선이 있는 하얀 태양 */}
//       <G>
//         <Polygon
//           points="225,37.5 240.07214,93.75 281.25,52.57214 266.17786,108.82214 322.42786,93.75 281.25,134.92786 337.5,150 281.25,165.07214 322.42786,206.25 266.17786,191.17786 281.25,247.42786 240.07214,206.25 225,262.5 209.92786,206.25 168.75,247.42786 183.82214,191.17786 127.57214,206.25 168.75,165.07214 112.5,150 168.75,134.92786 127.57214,93.75 183.82214,108.82214 168.75,52.57214 209.92786,93.75"
//           fill="#FFFFFF"
//         />
//         <Circle cx={225} cy={150} r={63.75} fill="#000095" />
//         <Circle cx={225} cy={150} r={56.25} fill="#FFFFFF" />
//       </G>
//     </G>
//   );
// });

// export default function TWFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <TWFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, G, Polygon, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const TWFlagArtwork = React.memo(function TWFlagArtwork() {
  return (
    <>
      {/* 빨간색 바탕을 퍼즐판 전체에 채웁니다. */}
      <Rect x={0} y={0} width={240} height={180} fill="#FE0000" />

      {/* 왼쪽 위 파란색 영역: 전체 너비와 높이의 절반 */}
      <Rect x={0} y={0} width={120} height={90} fill="#000095" />

      {/* 흰색 태양: 기존 비율과 원형 유지 */}
      <G transform="translate(-6 0) scale(0.3)">
        <Polygon
          points="225,37.5 240.07214,93.75 281.25,52.57214 266.17786,108.82214 322.42786,93.75 281.25,134.92786 337.5,150 281.25,165.07214 322.42786,206.25 266.17786,191.17786 281.25,247.42786 240.07214,206.25 225,262.5 209.92786,206.25 168.75,247.42786 183.82214,191.17786 127.57214,206.25 168.75,165.07214 112.5,150 168.75,134.92786 127.57214,93.75 183.82214,108.82214 168.75,52.57214 209.92786,93.75"
          fill="#FFFFFF"
        />
        <Circle cx={225} cy={150} r={63.75} fill="#000095" />
        <Circle cx={225} cy={150} r={56.25} fill="#FFFFFF" />
      </G>
    </>
  );
});

export default function TWFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <TWFlagArtwork />
    </Svg>
  );
}
