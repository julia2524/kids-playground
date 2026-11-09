// import React from "react";
// import { Rect } from "react-native-svg";

// export function PolandFlagPuzzleScene() {
//   return (
//     <>
//       {/* 상단 흰색 */}
//       <Rect x="-2" y="-2" width="244" height="94" fill="#FFFFFF" />
//       {/* 하단 빨간색 */}
//       <Rect x="-2" y="90" width="244" height="94" fill="#DC143C" />
//     </>
//   );
// }

import React from "react";
import { PLFlagArtwork } from "./countries/pl";

export function PolandFlagPuzzleScene() {
  return <PLFlagArtwork />;
}
