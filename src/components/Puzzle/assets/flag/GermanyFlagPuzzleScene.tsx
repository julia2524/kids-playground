import React from "react";
import { Rect } from "react-native-svg";

export function GermanyFlagPuzzleScene() {
  return (
    <>
      {/* 상단 검정 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#000000" />
      {/* 중단 빨강 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#dd0000" />
      {/* 하단 금색(노랑) */}
      <Rect x="-2" y="120" width="244" height="64" fill="#ffcc00" />
    </>
  );
}
