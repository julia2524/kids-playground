import React from "react";
import { Rect, Path, Polygon } from "react-native-svg";

export function PakistanFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 초록색 전체 바탕 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#01411C" />

      {/* 좌측 하얀색 수직 바 (전체 폭의 약 1/4) */}
      <Rect x="-2" y="-2" width="62" height="184" fill="#FFFFFF" />

      {/* 중앙의 하얀색 초승달과 별 */}
      <Path
        d="M 145, 65 A 42, 42 0 1, 0 145, 125 A 34, 34 0 1, 1 145, 65 Z"
        fill="#FFFFFF"
      />
      <Polygon
        points={starPoints}
        fill="#FFFFFF"
        transform="translate(160, 95) scale(2.8) rotate(15)"
      />
    </>
  );
}
