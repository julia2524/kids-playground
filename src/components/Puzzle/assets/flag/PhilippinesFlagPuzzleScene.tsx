import React from "react";
import { Rect, Path, Circle, Polygon } from "react-native-svg";

export function PhilippinesFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 상단 블루 스트라이프 영역 */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#0038A8" />
      {/* 하단 레드 스트라이프 영역 */}
      <Rect x="-2" y="90" width="244" height="94" fill="#CE1126" />

      {/* 좌측 하얀색 삼각형 (가로 100, 높이 184 기준) */}
      <Path d="M-2,-2 L120,90 L-2,182 Z" fill="#FFFFFF" />

      {/* 삼각형 중앙의 태양 (노란색) */}
      <Circle cx="45" cy="90" r="18" fill="#FCD116" />

      {/* 태양 주변의 3개의 별 (꼭짓점에 배치) */}
      <Polygon
        points={starPoints}
        fill="#FCD116"
        transform="translate(18, 50) scale(1.1)"
      />
      <Polygon
        points={starPoints}
        fill="#FCD116"
        transform="translate(18, 120) scale(1.1)"
      />
      <Polygon
        points={starPoints}
        fill="#FCD116"
        transform="translate(80, 90) scale(1.1)"
      />
    </>
  );
}
