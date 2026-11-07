import React from "react";
import { Rect, Path, Polygon, G } from "react-native-svg";

export function DRCongoFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 하늘색 배경 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#007FFF" />

      {/* 대각선 노란색 테두리 밑줄 */}
      <Path d="M-2,186 L246,-2" stroke="#FCD116" strokeWidth="32" />

      {/* 대각선 빨간색 중앙 띠 */}
      <Path d="M-2,186 L246,-2" stroke="#CE1126" strokeWidth="20" />

      {/* 좌상단의 노란색 5각별 */}
      <G transform="scale(2.5) translate(-45, -35)">
        <Polygon
          points={starPoints}
          fill="#FCD116"
          transform="translate(60, 45) scale(2.5)"
        />
      </G>
    </>
  );
}
