// import * as React from "react";
// import Svg, { Circle, G, Path, Polygon, Rect, Use } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 180 90)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 30) scale(1.333333333333333)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const PHFlagArtwork = React.memo(function PHFlagArtwork() {
//   const prefix = "ph-" + React.useId().replace(/:/g, "");

//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={180} height={90} fill="#0038A8" />
//         <Rect x={0} y={45} width={180} height={45} fill="#CE1126" />
//         <Polygon points="0,0 77.942,45 0,90" fill="#FFFFFF" />
//       </G>

//       {/* 태양과 별 3개 */}
//       <G>
//         <G transform="translate(28 45)" fill="#fcd116">
//           <Circle r={9} />
//           <G id={`${prefix}-d`}>
//             <G id={`${prefix}-c`}>
//               <G id={`${prefix}-b`}>
//                 <Path
//                   d="M-1 0l.062.062L0 0l-.938-.062z"
//                   transform="scale(19)"
//                 />
//                 <Path
//                   id={`${prefix}-a`}
//                   d="M-.884.116l.05.05L0 0z"
//                   transform="scale(19.2381)"
//                 />
//                 <Use transform="scale(1 -1)" href={`#${prefix}-a`} />
//               </G>
//               <Use transform="rotate(45)" href={`#${prefix}-b`} />
//             </G>
//             <Use transform="rotate(90)" href={`#${prefix}-c`} />
//           </G>
//           <Use transform="rotate(180)" href={`#${prefix}-d`} />
//           <G transform="translate(-2.02)">
//             <G id={`${prefix}-f`} transform="translate(37.962)">
//               <Path
//                 id={`${prefix}-e`}
//                 d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z"
//               />
//               <Use transform="scale(1 -1)" href={`#${prefix}-e`} />
//             </G>
//             <Use transform="rotate(120)" href={`#${prefix}-f`} />
//             <Use transform="rotate(-120)" href={`#${prefix}-f`} />
//           </G>
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function PHFlag(props: FlagProps) {
//   return (
//     <Svg
//       width={240}
//       height={180}
//       {...props}
//       viewBox={FLAG_VIEW_BOX}
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <PHFlagArtwork />
//     </Svg>
//   );
// }

// // import * as React from "react";

// // import Svg, { Circle, G, Path, Polygon, Rect, Use } from "react-native-svg";

// // import type { SvgProps } from "react-native-svg";

// // // 기존 퍼즐판과 조각이 공유하는 좌표계
// // export const FLAG_VIEW_BOX = "0 0 240 180";

// // // 태양과 별은 원본 좌표를 기준으로 2배 확대
// // const SYMBOL_TRANSFORM = "scale(2)";

// // type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // export const PHFlagArtwork = React.memo(function PHFlagArtwork() {
// //   const prefix = "ph-" + React.useId().replace(/:/g, "");

// //   return (
// //     <>
// //       {/* 배경: 파랑과 빨강을 정확히 1:1로 유지 */}

// //       {/* 위쪽 파란색 */}
// //       <Rect x={0} y={0} width={240} height={90} fill="#0038A8" />

// //       {/* 아래쪽 빨간색 */}
// //       <Rect x={0} y={90} width={240} height={90} fill="#CE1126" />

// //       {/* 흰색 삼각형: 원본 기울기를 유지하며 높이에 맞게 확장 */}
// //       <Polygon points="0,0 155.884,90 0,180" fill="#FFFFFF" />

// //       {/* 태양과 별 3개: 원본 좌표 기준 2배 확대 */}
// //       <G transform={SYMBOL_TRANSFORM}>
// //         <G transform="translate(28 45)" fill="#FCD116">
// //           {/* 태양 */}
// //           <Circle r={9} />

// //           {/* 태양의 광선 */}
// //           <G id={`${prefix}-d`}>
// //             <G id={`${prefix}-c`}>
// //               <G id={`${prefix}-b`}>
// //                 <Path
// //                   d="M-1 0l.062.062L0 0l-.938-.062z"
// //                   transform="scale(19)"
// //                 />

// //                 <Path
// //                   id={`${prefix}-a`}
// //                   d="M-.884.116l.05.05L0 0z"
// //                   transform="scale(19.2381)"
// //                 />

// //                 <Use transform="scale(1 -1)" href={`#${prefix}-a`} />
// //               </G>

// //               <Use transform="rotate(45)" href={`#${prefix}-b`} />
// //             </G>

// //             <Use transform="rotate(90)" href={`#${prefix}-c`} />
// //           </G>

// //           <Use transform="rotate(180)" href={`#${prefix}-d`} />

// //           {/* 별 3개 */}
// //           <G transform="translate(-2.02)">
// //             <G id={`${prefix}-f`} transform="translate(37.962)">
// //               <Path
// //                 id={`${prefix}-e`}
// //                 d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z"
// //               />

// //               <Use transform="scale(1 -1)" href={`#${prefix}-e`} />
// //             </G>

// //             <Use transform="rotate(120)" href={`#${prefix}-f`} />

// //             <Use transform="rotate(-120)" href={`#${prefix}-f`} />
// //           </G>
// //         </G>
// //       </G>
// //     </>
// //   );
// // });

// // export default function PHFlag(props: FlagProps) {
// //   return (
// //     <Svg
// //       width={240}
// //       height={180}
// //       {...props}
// //       viewBox={FLAG_VIEW_BOX}
// //       preserveAspectRatio="xMidYMid meet"
// //     >
// //       <PHFlagArtwork />
// //     </Svg>
// //   );
// // }

import * as React from "react";

import Svg, { Circle, G, Path, Polygon, Rect, Use } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const PHFlagArtwork = React.memo(function PHFlagArtwork() {
  const prefix = "ph-" + React.useId().replace(/:/g, "");

  return (
    <>
      {/* 배경 */}
      <Rect x={0} y={0} width={240} height={90} fill="#0038A8" />
      <Rect x={0} y={90} width={240} height={90} fill="#CE1126" />

      {/* 흰색 이등변삼각형 */}
      <Polygon points="0,0 120,90 0,180" fill="#FFFFFF" />

      {/* 태양: 삼각형 안쪽 중앙 */}
      <G transform="translate(42 90) scale(1.2)" fill="#FCD116">
        <Circle r={9} />

        {/* 태양 광선 */}
        <G id={`${prefix}-d`}>
          <G id={`${prefix}-c`}>
            <G id={`${prefix}-b`}>
              <Path d="M-1 0l.062.062L0 0l-.938-.062z" transform="scale(19)" />

              <Path
                id={`${prefix}-a`}
                d="M-.884.116l.05.05L0 0z"
                transform="scale(19.2381)"
              />

              <Use transform="scale(1 -1)" href={`#${prefix}-a`} />
            </G>

            <Use transform="rotate(45)" href={`#${prefix}-b`} />
          </G>

          <Use transform="rotate(90)" href={`#${prefix}-c`} />
        </G>

        <Use transform="rotate(180)" href={`#${prefix}-d`} />
      </G>

      {/* 별 모양을 개별 배치 */}
      {/* 왼쪽 위 */}
      <G transform="translate(13 20) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z" />
        <Path
          d="M5 0L1.618 1.176l-.073 3.58-2.163-2.854-3.427 1.037L-2 0z"
          transform="scale(1 -1)"
        />
      </G>

      {/* 왼쪽 아래 */}
      <G transform="translate(13 160) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176-.073 4.756l-2.163-2.854-3.427 1.037L-2 0z" />
        <Path
          d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z"
          transform="scale(1 -1)"
        />
      </G>

      {/* 오른쪽 꼭짓점 */}
      <G transform="translate(103 90) scale(1.5)" fill="#FCD116">
        <Path d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z" />
        <Path
          d="M5 0L1.618 1.176-.073 4.756-2.236 1.902-5.663 2.939-2 0z"
          transform="scale(1 -1)"
        />
      </G>
    </>
  );
});

export default function PHFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <PHFlagArtwork />
    </Svg>
  );
}
