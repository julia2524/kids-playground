import React from "react";
import { Rect, Circle, Path, G } from "react-native-svg";

export function ElSalvadorFlagPuzzleScene() {
  return (
    <>
      {/* 상단 파랑 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#0047AB" />
      {/* 중단 흰색 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      {/* 하단 파랑 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#0047AB" />

      {/* 중앙 국장 심볼 (노란빛 원형 방패 실루엣) */}
      <G transform="translate(120, 90)">
        <Circle
          cx="0"
          cy="0"
          r="16"
          fill="#FCD116"
          stroke="#0047AB"
          strokeWidth="2"
        />
        <Path d="M-6,-6 L6,-6 L0,8 Z" fill="#006A4E" />
      </G>
    </>
  );
}
