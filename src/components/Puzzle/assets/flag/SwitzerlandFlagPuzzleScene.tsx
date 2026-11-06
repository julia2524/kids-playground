import React from "react";
import { Rect } from "react-native-svg";

export function SwitzerlandFlagPuzzleScene() {
  return (
    <>
      {/* 붉은색 바탕 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FF0000" />

      {/* 하얀색 십자가 가로 바 */}
      <Rect x="52" y="76" width="136" height="32" fill="#FFFFFF" />

      {/* 하얀색 십자가 세로 바 */}
      <Rect x="104" y="24" width="32" height="136" fill="#FFFFFF" />
    </>
  );
}
