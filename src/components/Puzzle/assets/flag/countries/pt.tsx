// import * as React from "react";
// import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 600 400)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 10) scale(0.4)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const PTFlagArtwork = React.memo(function PTFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={600} height={400} fill="#FF0000" />
//         <Rect x={0} y={0} width={240} height={400} fill="#006600" />
//       </G>

//       {/* 퍼즐용으로 단순화한 국장 */}
//       <G transform="translate(240 200) scale(1.7)">
//         <G>
//           <Circle cx={0} cy={0} r={48} fill="none" stroke="#F4D02D" strokeWidth={5} />
//           <Ellipse
//             cx={0} cy={0} rx={47} ry={20} fill="none" stroke="#F4D02D" strokeWidth={4}
//             transform="rotate(29)"
//           />
//           <Ellipse cx={0} cy={0} rx={25} ry={47} fill="none" stroke="#F4D02D" strokeWidth={3} />
//           <Path d="M -46 0 H 46 M 0 -46 V 46" fill="none" stroke="#F4D02D" strokeWidth={3} />
//         </G>
//         <G>
//           <Path
//             d="M -28 -34 H 28 V 11 Q 25 38 0 40 Q -25 38 -28 11 Z" fill="#DB1C28" stroke="#FFFFFF"
//             strokeWidth={2}
//           />
//           <Path d="M -17 -24 H 17 V 11 Q 15 26 0 29 Q -15 26 -17 11 Z" fill="#FFFFFF" />
//           <G transform="translate(0 -13)">
//             <Path d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z" fill="#175092" />
//             <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
//             <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
//           </G>
//           <G transform="translate(-8 -3)">
//             <Path d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z" fill="#175092" />
//             <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
//             <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
//           </G>
//           <G transform="translate(0 -3)">
//             <Path d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z" fill="#175092" />
//             <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
//             <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
//           </G>
//           <G transform="translate(8 -3)">
//             <Path d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z" fill="#175092" />
//             <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
//             <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
//           </G>
//           <G transform="translate(0 8)">
//             <Path d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z" fill="#175092" />
//             <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
//             <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
//             <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
//             <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
//           </G>
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(-22 -27)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(0 -29)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(22 -27)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(-23 -8)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(23 -8)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(-17 23)"
//           />
//           <Path
//             d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z" fill="#F6CF31"
//             transform="translate(17 23)"
//           />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function PTFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <PTFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

// 국장 원본 좌표를 유지하기 위한 변환
const ARTWORK_TRANSFORM = "translate(0 10) scale(0.4)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const PTFlagArtwork = React.memo(function PTFlagArtwork() {
  return (
    <>
      {/* 배경: 세로 색띠 비율 2:3 유지 */}
      {/* 초록색: 전체 너비의 40% */}
      <Rect x={0} y={0} width={96} height={180} fill="#006600" />

      {/* 빨간색: 전체 너비의 60% */}
      <Rect x={96} y={0} width={144} height={180} fill="#FF0000" />

      {/* 국장: 원본 위치와 크기 유지 */}
      <G transform={ARTWORK_TRANSFORM}>
        <G transform="translate(240 200) scale(1.7)">
          <G>
            <Circle
              cx={0}
              cy={0}
              r={48}
              fill="none"
              stroke="#F4D02D"
              strokeWidth={5}
            />

            <Ellipse
              cx={0}
              cy={0}
              rx={47}
              ry={20}
              fill="none"
              stroke="#F4D02D"
              strokeWidth={4}
              transform="rotate(29)"
            />

            <Ellipse
              cx={0}
              cy={0}
              rx={25}
              ry={47}
              fill="none"
              stroke="#F4D02D"
              strokeWidth={3}
            />

            <Path
              d="M -46 0 H 46 M 0 -46 V 46"
              fill="none"
              stroke="#F4D02D"
              strokeWidth={3}
            />
          </G>

          <G>
            <Path
              d="M -28 -34 H 28 V 11 Q 25 38 0 40 Q -25 38 -28 11 Z"
              fill="#DB1C28"
              stroke="#FFFFFF"
              strokeWidth={2}
            />

            <Path
              d="M -17 -24 H 17 V 11 Q 15 26 0 29 Q -15 26 -17 11 Z"
              fill="#FFFFFF"
            />

            <G transform="translate(0 -13)">
              <Path
                d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z"
                fill="#175092"
              />

              <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
              <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
            </G>

            <G transform="translate(-8 -3)">
              <Path
                d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z"
                fill="#175092"
              />

              <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
              <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
            </G>

            <G transform="translate(0 -3)">
              <Path
                d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z"
                fill="#175092"
              />

              <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
              <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
            </G>

            <G transform="translate(8 -3)">
              <Path
                d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z"
                fill="#175092"
              />

              <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
              <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
            </G>

            <G transform="translate(0 8)">
              <Path
                d="M -3 -3 H 3 V 1 Q 2 4 0 5 Q -2 4 -3 1 Z"
                fill="#175092"
              />

              <Circle cx={-1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={-1} r={0.46} fill="#FFFFFF" />
              <Circle cx={0} cy={0.5} r={0.46} fill="#FFFFFF" />
              <Circle cx={-1} cy={2} r={0.46} fill="#FFFFFF" />
              <Circle cx={1} cy={2} r={0.46} fill="#FFFFFF" />
            </G>

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(-22 -27)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(0 -29)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(22 -27)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(-23 -8)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(23 -8)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(-17 23)"
            />

            <Path
              d="M -3 3 H 3 V -1 H 2 V -3 H 0 V -1 H -1 V -3 H -3 Z"
              fill="#F6CF31"
              transform="translate(17 23)"
            />
          </G>
        </G>
      </G>
    </>
  );
});

export default function PTFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <PTFlagArtwork />
    </Svg>
  );
}
