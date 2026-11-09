// import * as React from "react";
// import Svg, { Ellipse, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 1005 567)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 22.298507462686567) scale(0.238805970149254)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const SVFlagArtwork = React.memo(function SVFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={1005} height={567} fill="#0047AB" />
//         <Rect x={0} y={189} width={1005} height={189} fill="#FFFFFF" />
//       </G>

//       {/* 퍼즐용으로 단순화한 국장 */}
//       <G transform="translate(502.5 283.5) scale(1.65)">
//         <G>
//           <G>
//             <Path
//               d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#377C3B"
//               strokeWidth={2.4}
//             />
//             <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-24 -35 17)" />
//             <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-32 -40 7)" />
//             <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-47 -41 -4)" />
//             <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-56 -40 -15)" />
//             <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-66 -36 -25)" />
//             <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-74 -31 -34)" />
//             <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-83 -24 -41)" />
//           </G>
//           <G transform="scale(-1 1)">
//             <Path
//               d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#377C3B"
//               strokeWidth={2.4}
//             />
//             <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-24 -35 17)" />
//             <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-32 -40 7)" />
//             <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-47 -41 -4)" />
//             <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-56 -40 -15)" />
//             <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-66 -36 -25)" />
//             <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-74 -31 -34)" />
//             <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#377C3B" transform="rotate(-83 -24 -41)" />
//           </G>
//         </G>
//         <G transform="scale(-1 1)">
//           <Path d="M 14 34 L 33 -26 M 9 34 L 20 -28" fill="none" stroke="#AE8C3D" strokeWidth={1.9} />
//           <Path
//             d="M 33 -24 L 27 2 L 41 -6 L 43 -17 Z M 20 -26 L 16 -8 L 27 -13 L 29 -22 Z" fill="#155BA8"
//           />
//           <Path d="M 32 -13 L 42 -12 M 20 -18 L 28 -18" fill="none" stroke="#FFFFFF" strokeWidth={2} />
//         </G>
//         <G transform="scale(1 1)">
//           <Path d="M 14 34 L 33 -26 M 9 34 L 20 -28" fill="none" stroke="#AE8C3D" strokeWidth={1.9} />
//           <Path
//             d="M 33 -24 L 27 2 L 41 -6 L 43 -17 Z M 20 -26 L 16 -8 L 27 -13 L 29 -22 Z" fill="#155BA8"
//           />
//           <Path d="M 32 -13 L 42 -12 M 20 -18 L 28 -18" fill="none" stroke="#FFFFFF" strokeWidth={2} />
//         </G>
//         <G>
//           <Path d="M 0 -31 L 33 24 H -33 Z" fill="#BCE7F4" stroke="#C5A24A" strokeWidth={2} />
//           <Path d="M -15 -1 Q 0 -16 15 -1" fill="none" stroke="#D2704C" strokeWidth={2} />
//           <Path d="M -13 0 Q 0 -12 13 0" fill="none" stroke="#EBC34E" strokeWidth={2} />
//           <Path
//             d="M -29 21 L -23 9 L -17 19 L -11 7 L -5 18 L 1 4 L 7 18 L 13 7 L 19 19 L 23 11 L 29 21 Z"
//             fill="#5D9845"
//           />
//           <Path d="M -29 21 H 29 L 31 23 H -31 Z" fill="#449FC7" />
//           <Path d="M -3 -7 Q 0 -11 4 -7 L 3 -3 H -3 Z" fill="#D74739" />
//         </G>
//         <Path d="M -13 31 Q 0 37 13 31 L 9 39 Q 0 42 -9 39 Z" fill="#216CB0" />
//       </G>
//     </G>
//   );
// });

// export default function SVFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <SVFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Ellipse, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 배경 원본 1005×567을 240×180 전체에 맞춥니다.
const BACKGROUND_TRANSFORM = "scale(0.238805970149254 0.317460317460317)";

// 국장은 원형 비율과 기존 크기를 유지하면서 중앙에 배치합니다.
const EMBLEM_TRANSFORM = "translate(120 90) scale(0.394029850746269)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const SVFlagArtwork = React.memo(function SVFlagArtwork() {
  return (
    <>
      {/* 배경: 파랑·흰색·파랑 가로 1:1:1 */}
      <G transform={BACKGROUND_TRANSFORM}>
        <Rect x={0} y={0} width={1005} height={567} fill="#0047AB" />

        <Rect x={0} y={189} width={1005} height={189} fill="#FFFFFF" />
      </G>

      {/* 국장: 기존 도형과 비율 유지 */}
      <G transform={EMBLEM_TRANSFORM}>
        <G>
          <G>
            <Path
              d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
              fill="none"
              stroke="#377C3B"
              strokeWidth={2.4}
            />

            <Ellipse
              cx={-35}
              cy={17}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-24 -35 17)"
            />

            <Ellipse
              cx={-40}
              cy={7}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-32 -40 7)"
            />

            <Ellipse
              cx={-41}
              cy={-4}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-47 -41 -4)"
            />

            <Ellipse
              cx={-40}
              cy={-15}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-56 -40 -15)"
            />

            <Ellipse
              cx={-36}
              cy={-25}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-66 -36 -25)"
            />

            <Ellipse
              cx={-31}
              cy={-34}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-74 -31 -34)"
            />

            <Ellipse
              cx={-24}
              cy={-41}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-83 -24 -41)"
            />
          </G>

          <G transform="scale(-1 1)">
            <Path
              d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
              fill="none"
              stroke="#377C3B"
              strokeWidth={2.4}
            />

            <Ellipse
              cx={-35}
              cy={17}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-24 -35 17)"
            />

            <Ellipse
              cx={-40}
              cy={7}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-32 -40 7)"
            />

            <Ellipse
              cx={-41}
              cy={-4}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-47 -41 -4)"
            />

            <Ellipse
              cx={-40}
              cy={-15}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-56 -40 -15)"
            />

            <Ellipse
              cx={-36}
              cy={-25}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-66 -36 -25)"
            />

            <Ellipse
              cx={-31}
              cy={-34}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-74 -31 -34)"
            />

            <Ellipse
              cx={-24}
              cy={-41}
              rx={2.6}
              ry={6.5}
              fill="#377C3B"
              transform="rotate(-83 -24 -41)"
            />
          </G>
        </G>

        <G transform="scale(-1 1)">
          <Path
            d="M 14 34 L 33 -26 M 9 34 L 20 -28"
            fill="none"
            stroke="#AE8C3D"
            strokeWidth={1.9}
          />

          <Path
            d="M 33 -24 L 27 2 L 41 -6 L 43 -17 Z M 20 -26 L 16 -8 L 27 -13 L 29 -22 Z"
            fill="#155BA8"
          />

          <Path
            d="M 32 -13 L 42 -12 M 20 -18 L 28 -18"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        </G>

        <G transform="scale(1 1)">
          <Path
            d="M 14 34 L 33 -26 M 9 34 L 20 -28"
            fill="none"
            stroke="#AE8C3D"
            strokeWidth={1.9}
          />

          <Path
            d="M 33 -24 L 27 2 L 41 -6 L 43 -17 Z M 20 -26 L 16 -8 L 27 -13 L 29 -22 Z"
            fill="#155BA8"
          />

          <Path
            d="M 32 -13 L 42 -12 M 20 -18 L 28 -18"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        </G>

        <G>
          <Path
            d="M 0 -31 L 33 24 H -33 Z"
            fill="#BCE7F4"
            stroke="#C5A24A"
            strokeWidth={2}
          />

          <Path
            d="M -15 -1 Q 0 -16 15 -1"
            fill="none"
            stroke="#D2704C"
            strokeWidth={2}
          />

          <Path
            d="M -13 0 Q 0 -12 13 0"
            fill="none"
            stroke="#EBC34E"
            strokeWidth={2}
          />

          <Path
            d="M -29 21 L -23 9 L -17 19 L -11 7 L -5 18 L 1 4 L 7 18 L 13 7 L 19 19 L 23 11 L 29 21 Z"
            fill="#5D9845"
          />

          <Path d="M -29 21 H 29 L 31 23 H -31 Z" fill="#449FC7" />

          <Path d="M -3 -7 Q 0 -11 4 -7 L 3 -3 H -3 Z" fill="#D74739" />
        </G>

        <Path d="M -13 31 Q 0 37 13 31 L 9 39 Q 0 42 -9 39 Z" fill="#216CB0" />
      </G>
    </>
  );
});

export default function SVFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <SVFlagArtwork />
    </Svg>
  );
}
