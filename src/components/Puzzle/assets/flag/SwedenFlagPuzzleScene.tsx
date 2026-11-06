import React from "react";
import { Rect } from "react-native-svg";

export function SwedenFlagPuzzleScene() {
  return (
    <>
      {/* 파란색 바탕 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#006aa7" />

      {/* 노란색 수평 십자 바 */}
      <Rect x="-2" y="75" width="244" height="30" fill="#fecc00" />

      {/* 노란색 수직 십자 바 (왼쪽으로 치우친 위치: x=80) */}
      <Rect x="80" y="-2" width="30" height="184" fill="#fecc00" />
    </>
  );
}
