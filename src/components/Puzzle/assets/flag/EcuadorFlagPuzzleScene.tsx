import React from "react";
import { Rect, Circle, Path } from "react-native-svg";

export function EcuadorFlagPuzzleScene() {
  return (
    <>
      {/* 상단 넓은 노랑 (전체의 절반) */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#FFDD00" />
      {/* 중단 파랑 */}
      <Rect x="-2" y="90" width="244" height="48" fill="#0033A0" />
      {/* 하단 빨강 */}
      <Rect x="-2" y="136" width="244" height="48" fill="#ED1C24" />

      {/* 중앙 국장 심볼 실루엣 */}
      <Circle
        cx="120"
        cy="90"
        r="15"
        fill="#9C27B0"
        stroke="#FFDD00"
        strokeWidth="2"
      />
      <Path
        d="M-6,0 L6,0 L0,-10 Z"
        fill="#FFFFFF"
        transform="translate(120, 90)"
      />
    </>
  );
}
