// import React from "react";
// import { Rect, Path, G } from "react-native-svg";

// export function GuatemalaFlagPuzzleScene() {
//   return (
//     <>
//       {/* 전체 배경 흰색 (중앙 바 역할 겸용) */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

//       {/* 하늘색 세로 바 (좌측) */}
//       <Rect x="-2" y="-2" width="82" height="184" fill="#4997D0" />

//       {/* 하늘색 세로 바 (우측) */}
//       <Rect x="160" y="-2" width="86" height="184" fill="#4997D0" />

//       {/* 중앙 과테말라 국장 심볼 실루엣 */}
//       <G transform="translate(120, 90)">
//         <Path d="M-8,-10 L8,-10 L8,10 L-8,10 Z" fill="#43B02A" />
//       </G>
//     </>
//   );
// }

import React from "react";
import { GTFlagArtwork } from "./countries/gt";

export function GuatemalaFlagPuzzleScene() {
  return <GTFlagArtwork />;
}
