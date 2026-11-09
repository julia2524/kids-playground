// import React from "react";
// import { Rect, Path, G } from "react-native-svg";

// export function SpainFlagPuzzleScene() {
//   return (
//     <>
//       {/* 상단 빨강 */}
//       <Rect x="-2" y="-2" width="244" height="47" fill="#AA151B" />
//       {/* 중앙 넓은 노랑 */}
//       <Rect x="-2" y="43" width="244" height="96" fill="#F1BF00" />
//       {/* 하단 빨강 */}
//       <Rect x="-2" y="135" width="244" height="47" fill="#AA151B" />

//       {/* 왼쪽 편의 스페인 왕실 문장 심볼 (간소화된 방패 실루엣) */}
//       <G transform="translate(60, 90)">
//         <Path
//           d="M-10,-14 L10,-14 L10,10 C10,18 0,22 0,22 C0,22 -10,18 -10,10 Z"
//           fill="#BB0000"
//         />
//         <Rect x="-6" y="-10" width="12" height="12" fill="#FFCC00" />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { ESFlagArtwork } from "./countries/es";

export function SpainFlagPuzzleScene() {
  return (
    <>
      <ESFlagArtwork />
    </>
  );
}
