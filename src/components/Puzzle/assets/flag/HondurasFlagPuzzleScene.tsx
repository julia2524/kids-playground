import React from "react";
import { Rect, Polygon, G } from "react-native-svg";

export function HondurasFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 상단 파랑 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#0073CF" />
      {/* 중단 흰색 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      {/* 하단 파랑 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#0073CF" />

      {/* 중앙의 5개 파란색 별 (중앙 1개, 네 모서리 4개) */}
      <G transform="translate(-7,-8)">
        <Polygon
          points={starPoints}
          fill="#0073CF"
          transform="translate(120, 90) scale(1.2)"
        />
        <Polygon
          points={starPoints}
          fill="#0073CF"
          transform="translate(100, 78) scale(1.1)"
        />
        <Polygon
          points={starPoints}
          fill="#0073CF"
          transform="translate(140, 78) scale(1.1)"
        />
        <Polygon
          points={starPoints}
          fill="#0073CF"
          transform="translate(100, 102) scale(1.1)"
        />
        <Polygon
          points={starPoints}
          fill="#0073CF"
          transform="translate(140, 102) scale(1.1)"
        />
      </G>
    </>
  );
}
