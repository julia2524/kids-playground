// import React from "react";
// import { Rect, Polygon } from "react-native-svg";

// export function VietnamFlagPuzzleScene() {
//   // 5각별 좌표 생성
//   const starPoints =
//     "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

//   return (
//     <>
//       {/* 붉은색 배경 영역 확장 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#da251d" />

//       {/* 중앙의 큰 노란색 5각별 */}
//       <Polygon
//         points={starPoints}
//         fill="#ff0"
//         transform="translate(84, 45) scale(7.2)"
//       />
//     </>
//   );
// }

import React from "react";
import { VNFlagArtwork } from "./countries/vn";

export function VietnamFlagPuzzleScene() {
  return <VNFlagArtwork />;
}
