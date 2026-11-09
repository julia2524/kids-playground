// import React from "react";
// import { Rect, Path } from "react-native-svg";

// export function TanzaniaFlagPuzzleScene() {
//   return (
//     <>
//       {/* 전체 배경 초록색 (좌상단 삼각형 영역 기준) */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#1EB53A" />

//       {/* 우하단 파란색 삼각형 영역 */}
//       <Path d="M246,-2 L246,186 L-2,186 Z" fill="#00A3DD" />

//       {/* 노란색 테두리 대각선 띠 */}
//       <Path d="M-2,186 L246,-2" stroke="#FCD116" strokeWidth="48" />

//       {/* 중앙 검은색 대각선 띠 */}
//       <Path d="M-2,186 L246,-2" stroke="#000000" strokeWidth="30" />
//     </>
//   );
// }

import React from "react";
import { TZFlagArtwork } from "./countries/tz";

export function TanzaniaFlagPuzzleScene() {
  return <TZFlagArtwork />;
}
