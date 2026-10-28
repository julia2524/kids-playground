import React from "react";
import { Rect, G, Polygon } from "react-native-svg";

export function ChinaFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 붉은 바탕 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#DE2910" />

      {/* 큰 오성홍기 별 (중앙 기준 좌측 상단) */}
      <G fill="#FFDE00">
        {/* 큰 별 */}
        <Polygon points={starPoints} transform="translate(20, 20) scale(4)" />
        {/* 작은 별 4개 */}
        <Polygon
          points={starPoints}
          transform="translate(72, 10) scale(1.2) rotate(15)"
        />
        <Polygon
          points={starPoints}
          transform="translate(90, 25) scale(1.2) rotate(45)"
        />
        <Polygon
          points={starPoints}
          transform="translate(83, 50) scale(1.2) rotate(-10)"
        />
        <Polygon
          points={starPoints}
          transform="translate(72, 65) scale(1.2) rotate(15)"
        />
      </G>
    </>
  );
}
