// import React from "react";
// import { Rect } from "react-native-svg";

// export function ThailandFlagPuzzleScene() {
//   return (
//     <>
//       {/* 상단 빨강 */}
//       <Rect x="-2" y="-2" width="244" height="32" fill="#a51931" />
//       {/* 상단 하양 */}
//       <Rect x="-2" y="30" width="244" height="32" fill="#FFFFFF" />
//       {/* 중앙 넓은 파랑 (두 배 높이) */}
//       <Rect x="-2" y="60" width="244" height="60" fill="#2d2a4a" />
//       {/* 하단 하양 */}
//       <Rect x="-2" y="118" width="244" height="32" fill="#FFFFFF" />
//       {/* 하단 빨강 */}
//       <Rect x="-2" y="148" width="244" height="38" fill="#a51931" />
//     </>
//   );
// }

import React from "react";
import { THFlagArtwork } from "./countries/th";

export function ThailandFlagPuzzleScene() {
  return <THFlagArtwork />;
}
