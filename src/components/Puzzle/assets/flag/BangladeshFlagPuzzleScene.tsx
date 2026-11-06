import React from "react";
import { Rect, Circle } from "react-native-svg";

export function BangladeshFlagPuzzleScene() {
  return (
    <>
      {/* 초록색 배경 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#006a4e" />

      {/* 붉은색 원 (중앙에서 약간 왼쪽으로 치우친 규격: cx=105, cy=90, r=48) */}
      <Circle cx="105" cy="90" r="48" fill="#f42a41" />
    </>
  );
}
