import React from "react";
import { Circle, Rect } from "react-native-svg";

export function JapanFlagPuzzleScene() {
  return (
    <>
      {/* 바탕 흰색 영역을 살짝 여유 있게(244x184) 잡아 조각 모서리 깎임 방지 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 붉은색 원 (중앙 120, 90 / 반지름 50) */}
      <Circle cx="120" cy="90" r="50" fill="#BC002D" />
    </>
  );
}
