// import React from "react";
// import { Rect } from "react-native-svg";

// export function NetherlandsFlagPuzzleScene() {
//   return (
//     <>
//       {/* 상단 빨강 */}
//       <Rect x="-2" y="-2" width="244" height="62" fill="#ae1c28" />
//       {/* 중단 하양 */}
//       <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
//       {/* 하단 파랑 */}
//       <Rect x="-2" y="120" width="244" height="64" fill="#21468b" />
//     </>
//   );
// }

import React from "react";
import { NLFlagArtwork } from "./countries/nl";

export function NetherlandsFlagPuzzleScene() {
  return <NLFlagArtwork />;
}
