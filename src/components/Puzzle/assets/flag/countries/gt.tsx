// import * as React from "react";
// import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 960 600)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 15) scale(0.25)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const GTFlagArtwork = React.memo(function GTFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={960} height={600} fill="#4997D0" />
//         <Rect x={320} y={0} width={320} height={600} fill="#FFFFFF" />
//       </G>

//       {/* 퍼즐용으로 단순화한 국장 */}
//       <G transform="translate(480 300) scale(1.77)">
//         <G>
//           <G>
//             <Path
//               d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#497833"
//               strokeWidth={2.4}
//             />
//             <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-24 -35 17)" />
//             <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-32 -40 7)" />
//             <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-47 -41 -4)" />
//             <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-56 -40 -15)" />
//             <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-66 -36 -25)" />
//             <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-74 -31 -34)" />
//             <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-83 -24 -41)" />
//           </G>
//           <G transform="scale(-1 1)">
//             <Path
//               d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#497833"
//               strokeWidth={2.4}
//             />
//             <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-24 -35 17)" />
//             <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-32 -40 7)" />
//             <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-47 -41 -4)" />
//             <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-56 -40 -15)" />
//             <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-66 -36 -25)" />
//             <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-74 -31 -34)" />
//             <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#497833" transform="rotate(-83 -24 -41)" />
//           </G>
//         </G>
//         <G>
//           <Path d="M -31 33 L 27 -20 M 31 33 L -27 -20" fill="none" stroke="#77807B" strokeWidth={3} />
//           <Path d="M -31 33 L -24 27 M 31 33 L 24 27" fill="none" stroke="#98653A" strokeWidth={5} />
//         </G>
//         <G>
//           <Path
//             d="M -19 -26 Q -23 -30 -25 -24 L -20 -18 L -14 19 H 16 L 12 -17 Q 14 -24 9 -26 Z"
//             fill="#F0DE98"
//           />
//           <Path d="M -17 16 H 12 Q 19 17 19 22 H -15 Z" fill="#D8BC68" />
//         </G>
//         <G>
//           <Path d="M 10 -31 Q 31 -15 22 5 Q 16 23 5 36 Q 30 18 32 -1 Q 34 -18 19 -28 Z" fill="#267B52" />
//           <Ellipse cx={8} cy={-30} rx={12} ry={5.3} fill="#379B65" transform="rotate(22 8 -30)" />
//           <Circle cx={0} cy={-35} r={4.2} fill="#306F36" />
//           <Path d="M -5 -35 L -10 -33 L -5 -31 Z" fill="#A77824" />
//           <Path d="M 4 -26 Q 9 -22 16 -24 L 12 -27 Z" fill="#AC503E" />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function GTFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <GTFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 배경 원본 960×600을 240×180 전체에 맞춥니다.
const BACKGROUND_TRANSFORM = "scale(0.25 0.3)";

// 국장은 기존 크기와 비율을 유지하면서 중앙에 배치합니다.
// 기존 전체 배율: 0.25 × 1.77 = 0.4425
const EMBLEM_TRANSFORM = "translate(120 90) scale(0.4425)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const GTFlagArtwork = React.memo(function GTFlagArtwork() {
  return (
    <>
      {/* 배경: 파랑·흰색·파랑 세로 1:1:1 */}
      <G transform={BACKGROUND_TRANSFORM}>
        <Rect x={0} y={0} width={960} height={600} fill="#4997D0" />

        <Rect x={320} y={0} width={320} height={600} fill="#FFFFFF" />
      </G>

      {/* 국장: 기존 도형과 비율 유지 */}
      <G transform={EMBLEM_TRANSFORM}>
        <G>
          <G>
            <Path
              d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
              fill="none"
              stroke="#497833"
              strokeWidth={2.4}
            />

            <Ellipse
              cx={-35}
              cy={17}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-24 -35 17)"
            />

            <Ellipse
              cx={-40}
              cy={7}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-32 -40 7)"
            />

            <Ellipse
              cx={-41}
              cy={-4}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-47 -41 -4)"
            />

            <Ellipse
              cx={-40}
              cy={-15}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-56 -40 -15)"
            />

            <Ellipse
              cx={-36}
              cy={-25}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-66 -36 -25)"
            />

            <Ellipse
              cx={-31}
              cy={-34}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-74 -31 -34)"
            />

            <Ellipse
              cx={-24}
              cy={-41}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-83 -24 -41)"
            />
          </G>

          <G transform="scale(-1 1)">
            <Path
              d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
              fill="none"
              stroke="#497833"
              strokeWidth={2.4}
            />

            <Ellipse
              cx={-35}
              cy={17}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-24 -35 17)"
            />

            <Ellipse
              cx={-40}
              cy={7}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-32 -40 7)"
            />

            <Ellipse
              cx={-41}
              cy={-4}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-47 -41 -4)"
            />

            <Ellipse
              cx={-40}
              cy={-15}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-56 -40 -15)"
            />

            <Ellipse
              cx={-36}
              cy={-25}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-66 -36 -25)"
            />

            <Ellipse
              cx={-31}
              cy={-34}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-74 -31 -34)"
            />

            <Ellipse
              cx={-24}
              cy={-41}
              rx={2.6}
              ry={6.5}
              fill="#497833"
              transform="rotate(-83 -24 -41)"
            />
          </G>
        </G>

        <G>
          <Path
            d="M -31 33 L 27 -20 M 31 33 L -27 -20"
            fill="none"
            stroke="#77807B"
            strokeWidth={3}
          />

          <Path
            d="M -31 33 L -24 27 M 31 33 L 24 27"
            fill="none"
            stroke="#98653A"
            strokeWidth={5}
          />
        </G>

        <G>
          <Path
            d="M -19 -26 Q -23 -30 -25 -24 L -20 -18 L -14 19 H 16 L 12 -17 Q 14 -24 9 -26 Z"
            fill="#F0DE98"
          />

          <Path d="M -17 16 H 12 Q 19 17 19 22 H -15 Z" fill="#D8BC68" />
        </G>

        <G>
          <Path
            d="M 10 -31 Q 31 -15 22 5 Q 16 23 5 36 Q 30 18 32 -1 Q 34 -18 19 -28 Z"
            fill="#267B52"
          />

          <Ellipse
            cx={8}
            cy={-30}
            rx={12}
            ry={5.3}
            fill="#379B65"
            transform="rotate(22 8 -30)"
          />

          <Circle cx={0} cy={-35} r={4.2} fill="#306F36" />

          <Path d="M -5 -35 L -10 -33 L -5 -31 Z" fill="#A77824" />

          <Path d="M 4 -26 Q 9 -22 16 -24 L 12 -27 Z" fill="#AC503E" />
        </G>
      </G>
    </>
  );
});

export default function GTFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <GTFlagArtwork />
    </Svg>
  );
}
