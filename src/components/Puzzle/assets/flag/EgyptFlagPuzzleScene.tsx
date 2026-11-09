// import React from "react";
// import { Rect, Path, G } from "react-native-svg";

// export function EgyptFlagPuzzleScene() {
//   return (
//     <>
//       <Rect x="-2" y="-2" width="244" height="62" fill="#CE1126" />
//       <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
//       <Rect x="-2" y="120" width="244" height="62" fill="#000000" />

//       <G transform="translate(120, 90) scale(1.2)">
//         <Rect x="-8" y="-12" width="16" height="20" rx="3" fill="#C09300" />
//         <Path d="M-8,-12 L0,-22 L8,-12 Z" fill="#C09300" />

//         <Rect x="-6" y="-10" width="12" height="5" fill="#CE1126" />
//         <Rect x="-6" y="-5" width="12" height="5" fill="#FFFFFF" />
//         <Rect x="-6" y="0" width="12" height="5" fill="#000000" />
//       </G>
//     </>
//   );
// }

import React from "react";
import { G } from "react-native-svg";

import { EGFlagArtwork } from "./countries/eg";

export function EgyptFlagPuzzleScene() {
  return (
    <>
      <EGFlagArtwork />
    </>
  );
}
