// import React from "react";
// import { Rect, Circle, Path, G } from "react-native-svg";

// export function PortugalFlagPuzzleScene() {
//   return (
//     <>
//       {/* 전체 빨간 배경 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#DA291C" />
//       {/* 좌측 초록색 영역 (약 40% 너비) */}
//       <Rect x="-2" y="-2" width="98" height="184" fill="#006600" />

//       {/* 중앙 혼천의 및 방패 국장 심볼 */}
//       <G transform="translate(90, 90)">
//         <Circle
//           cx="0"
//           cy="0"
//           r="22"
//           stroke="#FFCC00"
//           strokeWidth="3"
//           fill="none"
//         />
//         <Rect x="-10" y="-14" width="20" height="24" rx="3" fill="#FFFFFF" />
//         <Path d="M-10,-14 L0,-20 L10,-14 Z" fill="#DA291C" />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { PTFlagArtwork } from "./countries/pt";

export function PortugalFlagPuzzleScene() {
  return (
    <>
      <PTFlagArtwork />
    </>
  );
}
