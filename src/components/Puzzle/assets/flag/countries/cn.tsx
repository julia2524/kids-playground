// import * as React from "react";
// import Svg, { G, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 30 20)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(8)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const CNFlagArtwork = React.memo(function CNFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={30} height={20} fill="#EE1C25" />

//       {/* 별 5개 · 큰 별을 향하는 작은 별 네 개 */}
//       <G>
//         <Polygon
//           points="5,2 5.67354,4.07295 7.85317,4.07295 6.08981,5.3541 6.76336,7.42705 5,6.1459 3.23664,7.42705 3.91019,5.3541 2.14683,4.07295 4.32646,4.07295"
//           fill="#FFFF00"
//         />
//         <Polygon
//           points="9.14251,2.5145 9.61951,1.96647 9.24571,1.34346 9.91431,1.62777 10.39131,1.07974 10.32753,1.80348 10.99614,2.08779 10.28811,2.25077 10.22433,2.97451 9.85053,2.35151"
//           fill="#FFFF00"
//         />
//         <Polygon
//           points="11.01005,4.14142 11.66234,3.82144 11.55959,3.1022 12.06547,3.62369 12.71776,3.30371 12.37813,3.94598 12.88401,4.46747 12.16822,4.34293 11.82859,4.9852 11.72584,4.26596"
//           fill="#FFFF00"
//         />
//         <Polygon
//           points="11.03848,6.72528 11.76455,6.69923 11.96415,6.00064 12.21329,6.68313 12.93937,6.65708 12.36727,7.10493 12.61641,7.78742 12.01369,7.38172 11.4416,7.82957 11.64119,7.13098"
//           fill="#FFFF00"
//         />
//         <Polygon
//           points="9.21913,8.3753 9.89895,8.63164 10.35282,8.06431 10.3191,8.79007 10.99892,9.04641 10.29827,9.23861 10.26455,9.96437 9.86524,9.3574 9.16458,9.54961 9.61845,8.98227"
//           fill="#FFFF00"
//         />
//       </G>
//     </G>
//   );
// });

// export default function CNFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <CNFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";
import Svg, { G, Polygon, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 원본 30×20을 가로 240px에 맞춰 비율 유지
// 세로 160px, 남는 20px은 위아래 10px씩 빨간색으로 확장
const ARTWORK_TRANSFORM = "translate(0 10) scale(8)";

export const CNFlagArtwork = React.memo(function CNFlagArtwork() {
  return (
    <G>
      {/* 전체 빨간색 배경: 여백까지 확장 */}
      <Rect x={0} y={0} width={240} height={180} fill="#EE1C25" />

      {/* 원본 국기 디자인과 별 배치 유지 */}
      <G transform={ARTWORK_TRANSFORM}>
        {/* 별 5개 · 큰 별을 향하는 작은 별 네 개 */}
        <G>
          <Polygon
            points="5,2 5.67354,4.07295 7.85317,4.07295 6.08981,5.3541 6.76336,7.42705 5,6.1459 3.23664,7.42705 3.91019,5.3541 2.14683,4.07295 4.32646,4.07295"
            fill="#FFFF00"
          />

          <Polygon
            points="9.14251,2.5145 9.61951,1.96647 9.24571,1.34346 9.91431,1.62777 10.39131,1.07974 10.32753,1.80348 10.99614,2.08779 10.28811,2.25077 10.22433,2.97451 9.85053,2.35151"
            fill="#FFFF00"
          />

          <Polygon
            points="11.01005,4.14142 11.66234,3.82144 11.55959,3.1022 12.06547,3.62369 12.71776,3.30371 12.37813,3.94598 12.88401,4.46747 12.16822,4.34293 11.82859,4.9852 11.72584,4.26596"
            fill="#FFFF00"
          />

          <Polygon
            points="11.03848,6.72528 11.76455,6.69923 11.96415,6.00064 12.21329,6.68313 12.93937,6.65708 12.36727,7.10493 12.61641,7.78742 12.01369,7.38172 11.4416,7.82957 11.64119,7.13098"
            fill="#FFFF00"
          />

          <Polygon
            points="9.21913,8.3753 9.89895,8.63164 10.35282,8.06431 10.3191,8.79007 10.99892,9.04641 10.29827,9.23861 10.26455,9.96437 9.86524,9.3574 9.16458,9.54961 9.61845,8.98227"
            fill="#FFFF00"
          />
        </G>
      </G>
    </G>
  );
});

export default function CNFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <CNFlagArtwork />
    </Svg>
  );
}
