import React from "react";
import { Rect, Path } from "react-native-svg";

export function MalaysiaFlagPuzzleScene() {
  return (
    <>
      {/* 전체 빨간 바탕 및 14개 스트라이프 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#CC0000" />
      {[1, 3, 5, 7, 9, 11, 13].map((i) => (
        <Rect
          key={i}
          x="-2"
          y={(180 / 14) * i}
          width="244"
          height={180 / 14}
          fill="#FFFFFF"
        />
      ))}

      {/* 좌상단 파란색 캔톤 영역 */}
      <Rect
        x="-2"
        y="-2"
        width="120"
        height={(180 / 14) * 7 + 2}
        fill="#000066"
      />

      {/* 노란색 초승달과 14각별 상징 그래픽 */}
      <Path
        d="M 60, 50 A 25, 25 0 1, 0 60, 100 A 20, 20 0 1, 1 60, 50 Z"
        fill="#FFCC00"
        transform="translate(10, -5) scale(10)"
      />
    </>
  );
}
