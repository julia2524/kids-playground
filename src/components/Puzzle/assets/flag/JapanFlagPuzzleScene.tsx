// import React from "react";
// import { Circle, Rect } from "react-native-svg";

// export function JapanFlagPuzzleScene() {
//   return (
//     <>
//       {/* 바탕 흰색 영역을 살짝 여유 있게(244x184) 잡아 조각 모서리 깎임 방지 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

//       {/* 붉은색 원 (중앙 120, 90 / 반지름 50) */}
//       <Circle cx="120" cy="90" r="50" fill="#BC002D" />
//     </>
//   );
// }

// import React from "react";
// import { Rect, G } from "react-native-svg";

// import { JPFlagArtwork } from "./countries/jp";

// export function JapanFlagPuzzleScene() {
//   return (
//     <>
//       {/* 퍼즐판 전체 흰색 배경 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

//       {/* 일본 국기 artwork */}
//       <G transform="matrix(0.26666667 0 0 0.26666667 0 10)">
//         <JPFlagArtwork />
//       </G>
//     </>
//   );
// }

import React from "react";
import { JPFlagArtwork } from "./countries/jp";

export function JapanFlagPuzzleScene() {
  return <JPFlagArtwork />;
}
