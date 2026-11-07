import React from "react";
import { Rect, Circle } from "react-native-svg";

export function BoliviaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 빨강 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#CE1126" />
      {/* 중단 노랑 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#F4BB44" />
      {/* 하단 초록 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#007A3D" />

      {/* 중앙 국장 심볼 원형 포인트 */}
      <Circle
        cx="120"
        cy="90"
        r="16"
        fill="#122543"
        stroke="#F4BB44"
        strokeWidth="2"
      />
    </>
  );
}
