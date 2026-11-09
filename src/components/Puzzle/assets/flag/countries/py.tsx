// import * as React from "react";
// import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 1200 660)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 24) scale(0.2)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const PYFlagArtwork = React.memo(function PYFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <G>
//         <Rect x={0} y={0} width={1200} height={660} fill="#0038A8" />
//         <Rect x={0} y={0} width={1200} height={440} fill="#FFFFFF" />
//         <Rect x={0} y={0} width={1200} height={220} fill="#D52B1E" />
//       </G>

//       {/* 앞면의 국장 */}
//       <G transform="translate(600 330) scale(1.48)">
//         <Circle cx={0} cy={0} r={54} fill="#FFFFFF" stroke="#171717" strokeWidth={2.8} />
//         <Circle cx={0} cy={0} r={43} fill="#FFFFFF" stroke="#171717" strokeWidth={1.4} />
//         <G transform="scale(.61)">
//           <G>
//             <G>
//               <Path
//                 d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#2C7546"
//                 strokeWidth={2.4}
//               />
//               <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-24 -35 17)" />
//               <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-32 -40 7)" />
//               <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-47 -41 -4)" />
//               <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-56 -40 -15)" />
//               <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-66 -36 -25)" />
//               <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-74 -31 -34)" />
//               <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-83 -24 -41)" />
//             </G>
//             <G transform="scale(-1 1)">
//               <Path
//                 d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40" fill="none" stroke="#2C7546"
//                 strokeWidth={2.4}
//               />
//               <Ellipse cx={-35} cy={17} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-24 -35 17)" />
//               <Ellipse cx={-40} cy={7} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-32 -40 7)" />
//               <Ellipse cx={-41} cy={-4} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-47 -41 -4)" />
//               <Ellipse cx={-40} cy={-15} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-56 -40 -15)" />
//               <Ellipse cx={-36} cy={-25} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-66 -36 -25)" />
//               <Ellipse cx={-31} cy={-34} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-74 -31 -34)" />
//               <Ellipse cx={-24} cy={-41} rx={2.6} ry={6.5} fill="#2C7546" transform="rotate(-83 -24 -41)" />
//             </G>
//           </G>
//         </G>
//         <G>
//           <Polygon
//             points="0,-15 3.1432,-5.32624 13.31479,-5.32624 5.0858,0.65248 8.22899,10.32624 0,4.34752 -8.22899,10.32624 -5.0858,0.65248 -13.31479,-5.32624 -3.1432,-5.32624"
//             fill="#EAB928"
//           />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function PYFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <PYFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";
import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 배경 원본 1200×660을 240×180 전체에 맞춥니다.
const BACKGROUND_TRANSFORM = "scale(0.2 0.272727272727273)";

// 국장은 원형과 원본 크기를 유지하면서 중앙에 배치합니다.
// 기존 국장 크기: 1.48 × 0.2 = 0.296
const EMBLEM_TRANSFORM = "translate(120 90) scale(0.296)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const PYFlagArtwork = React.memo(function PYFlagArtwork() {
  return (
    <>
      {/* 배경: 가로 1:1:1 비율 */}
      <G transform={BACKGROUND_TRANSFORM}>
        <Rect x={0} y={0} width={1200} height={660} fill="#0038A8" />
        <Rect x={0} y={0} width={1200} height={440} fill="#FFFFFF" />
        <Rect x={0} y={0} width={1200} height={220} fill="#D52B1E" />
      </G>

      {/* 앞면의 국장: 원형 비율과 원본 크기 유지 */}
      <G transform={EMBLEM_TRANSFORM}>
        <Circle
          cx={0}
          cy={0}
          r={54}
          fill="#FFFFFF"
          stroke="#171717"
          strokeWidth={2.8}
        />
        <Circle
          cx={0}
          cy={0}
          r={43}
          fill="#FFFFFF"
          stroke="#171717"
          strokeWidth={1.4}
        />

        <G transform="scale(.61)">
          <G>
            <G>
              <Path
                d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
                fill="none"
                stroke="#2C7546"
                strokeWidth={2.4}
              />
              <Ellipse
                cx={-35}
                cy={17}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-24 -35 17)"
              />
              <Ellipse
                cx={-40}
                cy={7}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-32 -40 7)"
              />
              <Ellipse
                cx={-41}
                cy={-4}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-47 -41 -4)"
              />
              <Ellipse
                cx={-40}
                cy={-15}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-56 -40 -15)"
              />
              <Ellipse
                cx={-36}
                cy={-25}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-66 -36 -25)"
              />
              <Ellipse
                cx={-31}
                cy={-34}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-74 -31 -34)"
              />
              <Ellipse
                cx={-24}
                cy={-41}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-83 -24 -41)"
              />
            </G>

            <G transform="scale(-1 1)">
              <Path
                d="M 0 39 Q -47 35 -40 -12 Q -38 -26 -25 -40"
                fill="none"
                stroke="#2C7546"
                strokeWidth={2.4}
              />
              <Ellipse
                cx={-35}
                cy={17}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-24 -35 17)"
              />
              <Ellipse
                cx={-40}
                cy={7}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-32 -40 7)"
              />
              <Ellipse
                cx={-41}
                cy={-4}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-47 -41 -4)"
              />
              <Ellipse
                cx={-40}
                cy={-15}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-56 -40 -15)"
              />
              <Ellipse
                cx={-36}
                cy={-25}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-66 -36 -25)"
              />
              <Ellipse
                cx={-31}
                cy={-34}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-74 -31 -34)"
              />
              <Ellipse
                cx={-24}
                cy={-41}
                rx={2.6}
                ry={6.5}
                fill="#2C7546"
                transform="rotate(-83 -24 -41)"
              />
            </G>
          </G>
        </G>

        <G>
          <Polygon
            points="0,-15 3.1432,-5.32624 13.31479,-5.32624 5.0858,0.65248 8.22899,10.32624 0,4.34752 -8.22899,10.32624 -5.0858,0.65248 -13.31479,-5.32624 -3.1432,-5.32624"
            fill="#EAB928"
          />
        </G>
      </G>
    </>
  );
});

export default function PYFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <PYFlagArtwork />
    </Svg>
  );
}
