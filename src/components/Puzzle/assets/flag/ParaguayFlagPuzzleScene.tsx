// import React from "react";
// import { Rect, Circle, Polygon, G } from "react-native-svg";

// export function ParaguayFlagPuzzleScene() {
//   const starPoints =
//     "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

//   return (
//     <>
//       {/* 상단 빨강 */}
//       <Rect x="-2" y="-2" width="244" height="62" fill="#D52B1E" />
//       {/* 중단 흰색 */}
//       <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
//       {/* 하단 파랑 */}
//       <Rect x="-2" y="120" width="244" height="64" fill="#0038A8" />

//       {/* 중앙 국장 원 및 별 심볼 */}
//       <G transform="translate(120, 90)">
//         <Circle
//           cx="0"
//           cy="0"
//           r="18"
//           stroke="#0038A8"
//           strokeWidth="2.5"
//           fill="none"
//         />
//         <Polygon
//           points={starPoints}
//           fill="#D52B1E"
//           transform="translate(0, -5) scale(1.1)"
//         />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { PYFlagArtwork } from "./countries/py";

export function ParaguayFlagPuzzleScene() {
  return (
    <>
      <PYFlagArtwork />
    </>
  );
}
