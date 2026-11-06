import React from "react";
import { Rect, Polygon } from "react-native-svg";

export function ChileFlagArtwork() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 상단 흰색 및 하단 빨간색 바탕 */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#FFFFFF" />
      <Rect x="-2" y="90" width="244" height="94" fill="#D52B1E" />

      {/* 좌상단 파란색 캔톤 영역 */}
      <Rect x="-2" y="-2" width="96" height="94" fill="#0039A6" />

      {/* 파란 캔톤 중앙의 하얀색 5각별 */}
      <Polygon
        points={starPoints}
        fill="#FFFFFF"
        transform="translate(48, 45) scale(2.2)"
      />
    </>
  );
}
