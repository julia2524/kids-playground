// import React from "react";
// import { Rect, Circle, Path, G } from "react-native-svg";

// export function ArgentinaFlagPuzzleScene() {
//   return (
//     <>
//       {/* 상단 하늘색 */}
//       <Rect x="-2" y="-2" width="244" height="52" fill="#74ACDF" />
//       {/* 중앙 흰색 */}
//       <Rect x="-2" y="48" width="244" height="88" fill="#FFFFFF" />
//       {/* 하단 하늘색 */}
//       <Rect x="-2" y="132" width="244" height="52" fill="#74ACDF" />

//       {/* 중앙 '오이의 태양' (Sun of May) 심볼 */}
//       <G transform="translate(120, 90)">
//         {/* 태양 얼굴 및 광채 배경 원 */}
//         <Circle cx="0" cy="0" r="18" fill="#F6B40E" />
//         {/* 태양의 빛살 (사방으로 뻗는 라인 심볼) */}
//         <Path
//           d="M0,-24 L0,-18 M0,18 L0,24 M-24,0 L-18,0 M18,0 L24,0 M-17,-17 L-13,-13 M13,13 L17,17 M-17,17 L-13,13 M13,-13 L17,-17"
//           stroke="#F6B40E"
//           strokeWidth="3"
//           strokeLinecap="round"
//         />
//         {/* 온화한 얼굴 표현을 위한 미니멀 점과 곡선 */}
//         <Circle cx="-5" cy="-2" r="1.5" fill="#57380E" />
//         <Circle cx="5" cy="-2" r="1.5" fill="#57380E" />
//         <Path
//           d="M-4,5 Q0,8 4,5"
//           stroke="#57380E"
//           strokeWidth="1.5"
//           fill="none"
//           strokeLinecap="round"
//         />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { ARFlagArtwork } from "./countries/ar";

export function ArgentinaFlagPuzzleScene() {
  return (
    <>
      <ARFlagArtwork />
    </>
  );
}
