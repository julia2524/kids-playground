// import * as React from "react";
// import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 60 30)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 30) scale(4)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const GBFlagArtwork = React.memo(function GBFlagArtwork() {
//   const prefix = "gb-" + React.useId().replace(/:/g, "");
//   const sourceClipId = `${prefix}-source-bounds`;

//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 원본 SVG의 외곽에서 넘치는 획을 잘라냅니다. */}
//       <Defs>
//         <ClipPath id={sourceClipId}>
//           <Rect x={0} y={0} width={60} height={30} />
//         </ClipPath>
//       </Defs>
//       <G clipPath={`url(#${sourceClipId})`}>
//         {/* 바탕과 색띠 */}
//         <Rect x={0} y={0} width={60} height={30} fill="#012169" />

//         {/* 세인트앤드루 흰색 사선 */}
//         <G>
//           <Path d="M 0 0 L 60 30 M 60 0 L 0 30" fill="none" stroke="#FFFFFF" strokeWidth={6} />
//         </G>

//         {/* 이 기에서 재사용하는 도형, 클립 또는 그라디언트 */}
//         <Defs>
//           <ClipPath id={`${prefix}-saltire-halves`}>
//             <Path d="M 30 15 H 60 V 30 Z M 30 15 V 30 H 0 Z M 30 15 H 0 V 0 Z M 30 15 V 0 H 60 Z" />
//           </ClipPath>
//         </Defs>

//         {/* 세인트패트릭 붉은 사선 · 클립으로 비대칭 폭 유지 */}
//         <G>
//           <Path
//             d="M 0 0 L 60 30 M 60 0 L 0 30" fill="none" stroke="#C8102E" strokeWidth={4}
//             clipPath={`url(#${prefix}-saltire-halves)`}
//           />
//         </G>

//         {/* 세인트조지 십자 */}
//         <G>
//           <Rect x={0} y={10} width={60} height={10} fill="#FFFFFF" />
//           <Rect x={25} y={0} width={10} height={30} fill="#FFFFFF" />
//           <Rect x={0} y={12} width={60} height={6} fill="#C8102E" />
//           <Rect x={27} y={0} width={6} height={30} fill="#C8102E" />
//         </G>
//       </G>
//     </G>
//   );
// });

// export default function GBFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <GBFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 60×30을 240×180으로 변환
// 가로 4배, 세로 6배
// 중앙 좌표 (30, 15) → (120, 90)
const ARTWORK_TRANSFORM = "scale(4 6)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const GBFlagArtwork = React.memo(function GBFlagArtwork() {
  const prefix = "gb-" + React.useId().replace(/:/g, "");

  const sourceClipId = `${prefix}-source-bounds`;
  const saltireClipId = `${prefix}-saltire-halves`;

  return (
    <G transform={ARTWORK_TRANSFORM}>
      <Defs>
        {/* 원본 국기 영역 밖으로 나가는 도형 방지 */}
        <ClipPath id={sourceClipId}>
          <Rect x={0} y={0} width={60} height={30} />
        </ClipPath>

        {/* 대각선 빨간색 사선의 비대칭 배치를 위한 영역 */}
        <ClipPath id={saltireClipId}>
          <Path
            d="
            M 30 15 H 60 V 30 Z
            M 30 15 V 30 H 0 Z
            M 30 15 H 0 V 0 Z
            M 30 15 V 0 H 60 Z
          "
          />
        </ClipPath>
      </Defs>

      <G clipPath={`url(#${sourceClipId})`}>
        {/* 전체 파란색 배경 */}
        <Rect x={0} y={0} width={60} height={30} fill="#012169" />

        {/* 세인트앤드루 흰색 대각선 */}
        <Path
          d="M 0 0 L 60 30 M 60 0 L 0 30"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={6}
        />

        {/* 세인트패트릭 붉은색 대각선 */}
        <Path
          d="M 0 0 L 60 30 M 60 0 L 0 30"
          fill="none"
          stroke="#C8102E"
          strokeWidth={4}
          clipPath={`url(#${saltireClipId})`}
        />

        {/* 세인트조지 흰색 중앙 십자가 */}
        <Rect x={0} y={10} width={60} height={10} fill="#FFFFFF" />

        <Rect x={25} y={0} width={10} height={30} fill="#FFFFFF" />

        {/* 세인트조지 붉은색 중앙 십자가 */}
        <Rect x={0} y={12} width={60} height={6} fill="#C8102E" />

        <Rect x={27} y={0} width={6} height={30} fill="#C8102E" />
      </G>
    </G>
  );
});

export default function GBFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <GBFlagArtwork />
    </Svg>
  );
}
