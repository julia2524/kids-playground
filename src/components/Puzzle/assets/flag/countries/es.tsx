// import * as React from "react";
// import Svg, { Ellipse, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 750 500)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(0.32)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const ESFlagArtwork = React.memo(function ESFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={750} height={500} fill="#C60B1E" />
//         <Rect x={0} y={0} width={750} height={375} fill="#FFC400" />
//         <Rect x={0} y={0} width={750} height={125} fill="#C60B1E" />
//       </G>

//       {/* 퍼즐용으로 단순화한 국장 */}
//       <G transform="translate(250 250) scale(1.6)">
//         <G transform="translate(-36 0)">
//           <Rect x={-2.5} y={-8} width={5} height={37} fill="#F1E7CE" />
//           <Rect x={-4.5} y={-9} width={9} height={4} fill="#DAA51B" />
//           <Rect x={-4.5} y={27} width={9} height={4} fill="#DAA51B" />
//           <Path d="M -7 5 Q 2 0 7 6 V 11 Q 2 6 -7 11 Z" fill="#A91935" />
//           <Path d="M -6 34 Q -3 31 0 34 T 6 34" fill="none" stroke="#1765A7" strokeWidth={2} />
//         </G>
//         <G transform="translate(36 0)">
//           <Rect x={-2.5} y={-8} width={5} height={37} fill="#F1E7CE" />
//           <Rect x={-4.5} y={-9} width={9} height={4} fill="#DAA51B" />
//           <Rect x={-4.5} y={27} width={9} height={4} fill="#DAA51B" />
//           <Path d="M -7 5 Q 2 0 7 6 V 11 Q 2 6 -7 11 Z" fill="#A91935" />
//           <Path d="M -6 34 Q -3 31 0 34 T 6 34" fill="none" stroke="#1765A7" strokeWidth={2} />
//         </G>
//         <G>
//           <Path d="M -25 -18 H 25 V 23 Q 23 38 0 40 Q -23 38 -25 23 Z" fill="#A91935" />
//           <Rect x={0} y={-16} width={23} height={22} fill="#F3EBDD" />
//           <Path d="M -23 7 H 0 V 38 Q -17 35 -23 25 Z" fill="#F4CB35" />
//           <Path d="M -18 7 V 31 M -12 7 V 34 M -6 7 V 36" fill="none" stroke="#A91935" strokeWidth={2.8} />
//           <Path d="M -19 1 H -5 V -7 H -8 V -13 H -12 V -9 H -15 V -13 H -19 Z" fill="#F4CB35" />
//           <Path
//             d="M 7 -12 L 13 -11 L 15 -6 L 20 -8 L 19 -4 L 16 -3 L 19 1 L 16 4 L 11 -1 L 7 3 L 4 0 L 9 -4 Z"
//             fill="#A53773"
//           />
//           <Path
//             d="M 5 9 H 20 V 25 L 5 32 Z M 5 9 L 20 25 M 20 9 L 5 32" fill="#A91935" stroke="#F4CB35"
//             strokeWidth={1.6}
//           />
//           <Ellipse cx={0} cy={6} rx={5.3} ry={7.2} fill="#174D9D" stroke="#EDC34D" strokeWidth={1.6} />
//         </G>
//         <G>
//           <Path
//             d="M -22 -22 L -25 -37 L -14 -31 L -9 -40 L 0 -33 L 9 -40 L 14 -31 L 25 -37 L 22 -22 Z"
//             fill="#EEB720"
//           />
//           <Ellipse cx={0} cy={-24} rx={22} ry={3.5} fill="#A91935" />
//           <Path d="M 0 -40 V -48 M -4 -45 H 4" fill="none" stroke="#B78307" strokeWidth={2.4} />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function ESFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <ESFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Ellipse, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

// 국장은 기존 원본 비율과 크기를 유지
const ARTWORK_TRANSFORM = "translate(0 10) scale(0.32)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const ESFlagArtwork = React.memo(function ESFlagArtwork() {
  return (
    <>
      {/* 국기 색띠: 1:2:1 비율로 180px 전체 채우기 */}

      {/* 위쪽 빨간색: 45px */}
      <Rect x={0} y={0} width={240} height={45} fill="#C60B1E" />

      {/* 중앙 노란색: 90px */}
      <Rect x={0} y={45} width={240} height={90} fill="#FFC400" />

      {/* 아래쪽 빨간색: 45px */}
      <Rect x={0} y={135} width={240} height={45} fill="#C60B1E" />

      {/* 국장: 기존 좌표와 크기 유지 */}
      <G transform={ARTWORK_TRANSFORM}>
        <G transform="translate(250 250) scale(1.9)">
          <G transform="translate(-36 0)">
            <Rect x={-2.5} y={-8} width={5} height={37} fill="#F1E7CE" />
            <Rect x={-4.5} y={-9} width={9} height={4} fill="#DAA51B" />
            <Rect x={-4.5} y={27} width={9} height={4} fill="#DAA51B" />
            <Path d="M -7 5 Q 2 0 7 6 V 11 Q 2 6 -7 11 Z" fill="#A91935" />
            <Path
              d="M -6 34 Q -3 31 0 34 T 6 34"
              fill="none"
              stroke="#1765A7"
              strokeWidth={2}
            />
          </G>

          <G transform="translate(36 0)">
            <Rect x={-2.5} y={-8} width={5} height={37} fill="#F1E7CE" />
            <Rect x={-4.5} y={-9} width={9} height={4} fill="#DAA51B" />
            <Rect x={-4.5} y={27} width={9} height={4} fill="#DAA51B" />
            <Path d="M -7 5 Q 2 0 7 6 V 11 Q 2 6 -7 11 Z" fill="#A91935" />
            <Path
              d="M -6 34 Q -3 31 0 34 T 6 34"
              fill="none"
              stroke="#1765A7"
              strokeWidth={2}
            />
          </G>

          <G>
            <Path
              d="M -25 -18 H 25 V 23 Q 23 38 0 40 Q -23 38 -25 23 Z"
              fill="#A91935"
            />
            <Rect x={0} y={-16} width={23} height={22} fill="#F3EBDD" />
            <Path d="M -23 7 H 0 V 38 Q -17 35 -23 25 Z" fill="#F4CB35" />
            <Path
              d="M -18 7 V 31 M -12 7 V 34 M -6 7 V 36"
              fill="none"
              stroke="#A91935"
              strokeWidth={2.8}
            />
            <Path
              d="M -19 1 H -5 V -7 H -8 V -13 H -12 V -9 H -15 V -13 H -19 Z"
              fill="#F4CB35"
            />
            <Path
              d="M 7 -12 L 13 -11 L 15 -6 L 20 -8 L 19 -4 L 16 -3 L 19 1 L 16 4 L 11 -1 L 7 3 L 4 0 L 9 -4 Z"
              fill="#A53773"
            />
            <Path
              d="M 5 9 H 20 V 25 L 5 32 Z M 5 9 L 20 25 M 20 9 L 5 32"
              fill="#A91935"
              stroke="#F4CB35"
              strokeWidth={1.6}
            />
            <Ellipse
              cx={0}
              cy={6}
              rx={5.3}
              ry={7.2}
              fill="#174D9D"
              stroke="#EDC34D"
              strokeWidth={1.6}
            />
          </G>

          <G>
            <Path
              d="M -22 -22 L -25 -37 L -14 -31 L -9 -40 L 0 -33 L 9 -40 L 14 -31 L 25 -37 L 22 -22 Z"
              fill="#EEB720"
            />
            <Ellipse cx={0} cy={-24} rx={22} ry={3.5} fill="#A91935" />
            <Path
              d="M 0 -40 V -48 M -4 -45 H 4"
              fill="none"
              stroke="#B78307"
              strokeWidth={2.4}
            />
          </G>
        </G>
      </G>
    </>
  );
});

export default function ESFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <ESFlagArtwork />
    </Svg>
  );
}
