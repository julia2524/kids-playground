// import * as React from "react";
// import Svg, { G, Path, Rect } from "react-native-svg";
// import type { SvgProps } from "react-native-svg";

// // 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
// export const FLAG_VIEW_BOX = "0 0 240 180";

// // 원본 좌표(0 0 9600 4800)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
// const ARTWORK_TRANSFORM = "translate(0 30) scale(0.025)";

// type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// // 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
// export const CAFlagArtwork = React.memo(function CAFlagArtwork() {
//   return (
//     <G transform={ARTWORK_TRANSFORM}>
//       {/* 바탕과 색띠 */}
//       <Rect x={0} y={0} width={9600} height={4800} fill="#D52B1E" />

//       {/* center-band */}
//       <Rect x={2400} y={0} width={4800} height={4800} fill="#FFFFFF" />

//       {/* 단풍잎 */}
//       <Path
//         d="M4890 4430l-45-863a95 95 0 01111-98l859 151-116-320a65 65 0 0120-73l941-762-212-99a65 65 0 01-34-79l186-572-542 115a65 65 0 01-73-38l-105-247-423 454a65 65 0 01-111-57l204-1052-327 189a65 65 0 01-91-27l-332-652-332 652a65 65 0 01-91 27l-327-189 204 1052a65 65 0 01-111 57l-423-454-105 247a65 65 0 01-73 38l-542-115 186 572a65 65 0 01-34 79l-212 99 941 762a65 65 0 0120 73l-116 320 859-151a95 95 0 01111 98l-45 863z"
//         fill="#D52B1E"
//       />
//     </G>
//   );
// });

// export default function CAFlag(props: FlagProps) {
//   return (
//     <Svg width={240} height={180} {...props} viewBox={FLAG_VIEW_BOX} preserveAspectRatio="xMidYMid meet">
//       <CAFlagArtwork />
//     </Svg>
//   );
// }

import * as React from "react";

import Svg, { G, Path, Rect } from "react-native-svg";

import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

// 단풍잎은 원본 좌표계의 크기와 위치를 유지
// 원본 9600 × 4800 → 가로 240px, 세로 120px
// 상하 30px씩 확장
const ARTWORK_TRANSFORM = "translate(0 30) scale(0.025)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

export const CAFlagArtwork = React.memo(function CAFlagArtwork() {
  return (
    <>
      {/* 왼쪽 빨간색 영역: 전체 높이 */}
      <Rect x={0} y={0} width={60} height={180} fill="#D52B1E" />

      {/* 중앙 흰색 영역: 전체 높이 */}
      <Rect x={60} y={0} width={120} height={180} fill="#FFFFFF" />

      {/* 오른쪽 빨간색 영역: 전체 높이 */}
      <Rect x={180} y={0} width={60} height={180} fill="#D52B1E" />

      {/* 단풍잎: 기존 원본 좌표와 크기 유지 */}
      <G transform={ARTWORK_TRANSFORM}>
        <Path
          d="M4890 4430l-45-863a95 95 0 01111-98l859 151-116-320a65 65 0 0120-73l941-762-212-99a65 65 0 01-34-79l186-572-542 115a65 65 0 01-73-38l-105-247-423 454a65 65 0 01-111-57l204-1052-327 189a65 65 0 01-91-27l-332-652-332 652a65 65 0 01-91 27l-327-189 204 1052a65 65 0 01-111 57l-423-454-105 247a65 65 0 01-73 38l-542-115 186 572a65 65 0 01-34 79l-212 99 941 762a65 65 0 0120 73l-116 320 859-151a95 95 0 01111 98l-45 863z"
          fill="#D52B1E"
        />
      </G>
    </>
  );
});

export default function CAFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <CAFlagArtwork />
    </Svg>
  );
}
