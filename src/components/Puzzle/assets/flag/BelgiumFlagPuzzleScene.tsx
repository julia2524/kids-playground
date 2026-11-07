import React from "react";
import { Rect } from "react-native-svg";

export function BelgiumFlagPuzzleScene() {
  return (
    <>
      {/* 전체 배경을 노란색(중앙 바)으로 잡고 양옆을 채우기 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FDDA24" />

      {/* 검은색 세로 바 (좌측) */}
      <Rect x="-2" y="-2" width="82" height="184" fill="#000000" />

      {/* 빨간색 세로 바 (우측) */}
      <Rect x="160" y="-2" width="86" height="184" fill="#EF3340" />
    </>
  );
}
