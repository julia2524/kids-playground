import React from "react";
import { Rect, Path, G } from "react-native-svg";

export function CanadaFlagPuzzleScene() {
  return (
    <>
      {/* 전체 배경 흰색 (중앙 사각형 겸용) */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 좌측 빨간색 세로 바 */}
      <Rect x="-2" y="-2" width="62" height="184" fill="#FF0000" />

      {/* 우측 빨간색 세로 바 */}
      <Rect x="180" y="-2" width="66" height="184" fill="#FF0000" />

      {/* 중앙의 단풍잎 (Maple Leaf) 심볼 그래픽 */}
      <G fill="#FF0000" transform="translate(120, 95) scale(3.5)">
        <Path d="M0,-18 L3,-10 L10,-12 L7,-4 L15,0 L9,5 L12,13 L4,9 L2,17 L-2,17 L-4,9 L-12,13 L-9,5 L-15,0 L-7,-4 L-10,-12 L-3,-10 Z" />
      </G>
    </>
  );
}
