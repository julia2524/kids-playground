// import React from "react";
// import { Rect, Path, Circle, G } from "react-native-svg";

// export function BrazilFlagPuzzleScene() {
//   return (
//     <>
//       {/* 초록색 배경 영역 확장 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#009c3b" />

//       {/* 노란색 마름모 (정확한 좌표 비율) */}
//       <Path d="M 120, 16 L 226, 90 L 120, 164 L 14, 90 Z" fill="#ffdf00" />

//       {/* 파란색 중앙 원 */}
//       <Circle cx="120" cy="90" r="46" fill="#002776" />

//       {/* 흰색 띠 (질서와 진보 문구 라인) */}
//       <Path
//         d="M 78, 105 Q 120, 75 162, 75"
//         stroke="#FFFFFF"
//         strokeWidth="7"
//         fill="none"
//         strokeLinecap="round"
//       />
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";
import { BRFlagArtwork } from "./countries/br";

export function BrazilFlagPuzzleScene() {
  return <BRFlagArtwork />;
}
