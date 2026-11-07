import React from "react";
import { Rect, Polygon, G } from "react-native-svg";

export function PanamaFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 전체 바탕 흰색 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 좌상단 영역 (흰색 바탕 + 파란색 별) */}
      <Rect x="-2" y="-2" width="124" height="94" fill="#FFFFFF" />
      <G transform="scale(2) translate(-40,-30)">
        <Polygon
          points={starPoints}
          fill="#0032A0"
          transform="translate(60, 45) scale(2.2)"
        />
      </G>

      {/* 우상단 영역 (빨간색) */}
      <Rect x="120" y="-2" width="124" height="94" fill="#DA121A" />

      {/* 좌하단 영역 (파란색) */}
      <Rect x="-2" y="90" width="124" height="94" fill="#0032A0" />

      {/* 우하단 영역 (흰색 바탕 + 빨간색 별) */}
      <Rect x="120" y="90" width="124" height="94" fill="#FFFFFF" />
      <G transform="scale(2) translate(-100,-80)">
        <Polygon
          points={starPoints}
          fill="#DA121A"
          transform="translate(180, 135) scale(2.2)"
        />
      </G>
    </>
  );
}
