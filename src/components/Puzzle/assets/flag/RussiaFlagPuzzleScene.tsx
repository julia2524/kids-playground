import React from "react";
import { Rect } from "react-native-svg";

export function RussiaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 흰색 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#FFFFFF" />
      {/* 중단 파란색 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#0033A0" />
      {/* 하단 빨간색 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#DA291C" />
    </>
  );
}
