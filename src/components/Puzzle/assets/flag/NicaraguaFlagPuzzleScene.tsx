import React from "react";
import { Rect, Path, G } from "react-native-svg";

export function NicaraguaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 파랑 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#1B365D" />
      {/* 중단 흰색 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      {/* 하단 파랑 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#1B365D" />

      {/* 중앙 삼각형 국장 심볼 */}
      <G transform="translate(120, 90)">
        <Path
          d="M-16,10 L16,10 L0,-14 Z"
          fill="none"
          stroke="#006747"
          strokeWidth="3"
        />
      </G>
    </>
  );
}
