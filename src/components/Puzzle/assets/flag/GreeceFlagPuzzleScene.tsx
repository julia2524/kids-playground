// import React from "react";
// import { Rect, Path } from "react-native-svg";

// export function GreeceFlagPuzzleScene() {
//   // 9개의 가로 스트라이프 높이 계산 (180 / 9 = 20)
//   const stripeHeight = 180 / 9;

//   return (
//     <>
//       {/* 전체 파란색 바탕 영역 확장 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#0d5eaf" />

//       {/* 하얀색 가로 스트라이프 (2, 4, 6, 8번째 줄) */}
//       {[1, 3, 5, 7].map((i) => (
//         <Rect
//           key={i}
//           x="-2"
//           y={stripeHeight * i}
//           width="244"
//           height={stripeHeight}
//           fill="#FFFFFF"
//         />
//       ))}

//       {/* 좌상단 파란색 캔톤 영역 (가로 5줄 높이, 세로 줄무늬 반 정도 너비) */}
//       <Rect
//         x="-2"
//         y="-2"
//         width={stripeHeight * 5}
//         height={stripeHeight * 5}
//         fill="#0d5eaf"
//       />

//       {/* 캔톤 안의 하얀색 십자가 */}
//       {/* 가로 바 */}
//       <Rect
//         x="-2"
//         y={stripeHeight * 2}
//         width={stripeHeight * 5}
//         height={stripeHeight}
//         fill="#FFFFFF"
//       />
//       {/* 세로 바 */}
//       <Rect
//         x={stripeHeight * 2}
//         y="-2"
//         width={stripeHeight}
//         height={stripeHeight * 5}
//         fill="#FFFFFF"
//       />
//     </>
//   );
// }

import React from "react";
import { GRFlagArtwork } from "./countries/gr";

export function GreeceFlagPuzzleScene() {
  return <GRFlagArtwork />;
}
