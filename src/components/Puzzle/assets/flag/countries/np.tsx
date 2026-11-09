// import * as React from "react";
// import Svg, { Circle, ClipPath, Defs, G, Path, Polygon, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(-2.582 -4.664 71.571 87.246)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(59.108268573917429 18.553286110538019) scale(1.833894963665956)";

// // 테두리와 붉은 바탕이 같은 외곽선을 공유합니다.
// const PENNANT_OUTLINE = "M 0 0 L 60 37.57359 H 17.57359 L 60 80 H 0 Z";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const NPFlagArtwork = React.memo(function NPFlagArtwork() {
//   const sourceClipId = "np-source-bounds-" + React.useId().replace(/:/g, "");

//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 원본 SVG의 외곽에서 넘치는 획을 잘라냅니다. */}
//       <Defs>
//         <ClipPath id={sourceClipId}>
//           <Rect x={-2.582} y={-4.664} width={71.571} height={87.246} />
//         </ClipPath>
//       </Defs>
//       <G clipPath={`url(#${sourceClipId})`}>
//         {/* 두 삼각형을 두르는 파란 테두리 */}
//         <Path
//           d={PENNANT_OUTLINE} fill="#003893" stroke="#003893"
//           strokeWidth={5.16468}
//         />

//         {/* 두 삼각형의 붉은 바탕 */}
//         <Path d={PENNANT_OUTLINE} fill="#DC143C" />

//         {/* 달 */}
//         <G>
//           <Path
//             d="M 3.04972 23.4835 A 12.8401 12.8401 0 0 0 26.95028 23.4835 A 11.95028 11.95028 0 0 1 3.04972 23.4835 Z"
//             fill="#FFFFFF"
//           />
//           <Circle cx={15} cy={29.04456} r={5.56106} fill="#FFFFFF" />
//           <Polygon points="9.43894,29.04456 7.42528,27.53785 9.86225,26.91643" fill="#FFFFFF" />
//           <Polygon points="9.86225,26.91643 8.57846,24.75382 11.06774,25.1123" fill="#FFFFFF" />
//           <Polygon points="11.06774,25.1123 10.70926,22.62302 12.87187,23.90681" fill="#FFFFFF" />
//           <Polygon points="12.87187,23.90681 13.49329,21.46984 15,23.4835" fill="#FFFFFF" />
//           <Polygon points="15,23.4835 16.50671,21.46984 17.12813,23.90681" fill="#FFFFFF" />
//           <Polygon points="17.12813,23.90681 19.29074,22.62302 18.93226,25.1123" fill="#FFFFFF" />
//           <Polygon points="18.93226,25.1123 21.42154,24.75382 20.13775,26.91643" fill="#FFFFFF" />
//           <Polygon points="20.13775,26.91643 22.57472,27.53785 20.56106,29.04456" fill="#FFFFFF" />
//         </G>

//         {/* 태양 */}
//         <G>
//           <Circle cx={15} cy={58.7868} r={8.1434} fill="#FFFFFF" />
//           <Polygon
//             points="15,45.94751 17.10767,50.92088 21.41965,47.66765 20.75825,53.02855 26.11915,52.36715 22.86592,56.67913 27.83929,58.7868 22.86592,60.89447 26.11915,65.20645 20.75825,64.54505 21.41965,69.90595 17.10767,66.65272 15,71.62609 12.89233,66.65272 8.58036,69.90595 9.24175,64.54505 3.88085,65.20645 7.13408,60.89447 2.16071,58.7868 7.13408,56.67913 3.88085,52.36715 9.24175,53.02855 8.58035,47.66765 12.89233,50.92088"
//             fill="#FFFFFF"
//           />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function NPFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <NPFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Polygon,
  Rect,
} from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 국기 외곽을 왼쪽에 붙이고, 세로로 조금 더 크게 배치합니다.
// 원본 비율을 유지하기 위해 X/Y 동일 배율을 사용합니다.
const ARTWORK_TRANSFORM = "translate(11 13.16468) scale(1.95)";

// 테두리와 붉은 바탕이 같은 외곽선을 공유합니다.
const PENNANT_OUTLINE = "M 0 0 L 60 37.57359 H 17.57359 L 60 80 H 0 Z";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const NPFlagArtwork = React.memo(function NPFlagArtwork() {
  const sourceClipId = "np-source-bounds-" + React.useId().replace(/:/g, "");

  return (
    <>
      {/* 퍼즐판 전체 배경을 불투명한 흰색으로 채웁니다. */}
      <Rect x={0} y={0} width={240} height={180} fill="#FFFFFF" />

      <G transform={ARTWORK_TRANSFORM}>
        {/* 원본 SVG의 외곽에서 넘치는 획을 잘라냅니다. */}
        <Defs>
          <ClipPath id={sourceClipId}>
            <Rect x={-2.582} y={-4.664} width={71.571} height={87.246} />
          </ClipPath>
        </Defs>

        <G clipPath={`url(#${sourceClipId})`}>
          {/* 두 삼각형을 두르는 파란 테두리 */}
          <Path
            d={PENNANT_OUTLINE}
            fill="#003893"
            stroke="#003893"
            strokeWidth={5.16468}
          />

          {/* 두 삼각형의 붉은 바탕 */}
          <Path d={PENNANT_OUTLINE} fill="#DC143C" />

          {/* 달 */}
          <G>
            <Path
              d="M 3.04972 23.4835 A 12.8401 12.8401 0 0 0 26.95028 23.4835 A 11.95028 11.95028 0 0 1 3.04972 23.4835 Z"
              fill="#FFFFFF"
            />
            <Circle cx={15} cy={29.04456} r={5.56106} fill="#FFFFFF" />
            <Polygon
              points="9.43894,29.04456 7.42528,27.53785 9.86225,26.91643"
              fill="#FFFFFF"
            />
            <Polygon
              points="9.86225,26.91643 8.57846,24.75382 11.06774,25.1123"
              fill="#FFFFFF"
            />
            <Polygon
              points="11.06774,25.1123 10.70926,22.62302 12.87187,23.90681"
              fill="#FFFFFF"
            />
            <Polygon
              points="12.87187,23.90681 13.49329,21.46984 15,23.4835"
              fill="#FFFFFF"
            />
            <Polygon
              points="15,23.4835 16.50671,21.46984 17.12813,23.90681"
              fill="#FFFFFF"
            />
            <Polygon
              points="17.12813,23.90681 19.29074,22.62302 18.93226,25.1123"
              fill="#FFFFFF"
            />
            <Polygon
              points="18.93226,25.1123 21.42154,24.75382 20.13775,26.91643"
              fill="#FFFFFF"
            />
            <Polygon
              points="20.13775,26.91643 22.57472,27.53785 20.56106,29.04456"
              fill="#FFFFFF"
            />
          </G>

          {/* 태양 */}
          <G>
            <Circle cx={15} cy={58.7868} r={8.1434} fill="#FFFFFF" />
            <Polygon
              points="15,45.94751 17.10767,50.92088 21.41965,47.66765 20.75825,53.02855 26.11915,52.36715 22.86592,56.67913 27.83929,58.7868 22.86592,60.89447 26.11915,65.20645 20.75825,64.54505 21.41965,69.90595 17.10767,66.65272 15,71.62609 12.89233,66.65272 8.58036,69.90595 9.24175,64.54505 3.88085,65.20645 7.13408,60.89447 2.16071,58.7868 7.13408,56.67913 3.88085,52.36715 9.24175,53.02855 8.58035,47.66765 12.89233,50.92088"
              fill="#FFFFFF"
            />
          </G>
        </G>
      </G>
    </>
  );
});

export default function NPFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <NPFlagArtwork />
    </Svg>
  );
}
