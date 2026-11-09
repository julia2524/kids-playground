// import React from "react";
// import { Rect, Circle, Path, G } from "react-native-svg";

// export function UruguayFlagPuzzleScene() {
//   const stripeHeight = 180 / 9; // 9개의 가로 구역 (하양/파랑 교대)

//   return (
//     <>
//       {/* 전체 흰색 바탕 영역 확장 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

//       {/* 4개의 파란색 가로 스트라이프 (2, 4, 6, 8번째 줄) */}
//       {[1, 3, 5, 7].map((i) => (
//         <Rect
//           key={i}
//           x="-2"
//           y={stripeHeight * i}
//           width="244"
//           height={stripeHeight}
//           fill="#0038A8"
//         />
//       ))}

//       {/* 좌상단 캔톤 영역 (가로 5줄 높이, 세로 5구역 너비) */}
//       <Rect
//         x="-2"
//         y="-2"
//         width={stripeHeight * 5.2}
//         height={stripeHeight * 5}
//         fill="#FFFFFF"
//       />

//       {/* 캔톤 중앙의 '오이의 태양' 심볼 */}
//       <G transform="translate(47, 50)">
//         <Circle cx="0" cy="0" r="14" fill="#FCD116" />
//         <Path
//           d="M0,-20 L0,-14 M0,14 L0,20 M-20,0 L-14,0 M14,0 L20,0 M-14,-14 L-10,-10 M10,10 L14,14 M-14,14 L-10,10 M10,-10 L14,-14"
//           stroke="#FCD116"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//         />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { UYFlagArtwork } from "./countries/uy";

export function UruguayFlagPuzzleScene() {
  return (
    <>
      <UYFlagArtwork />
    </>
  );
}
