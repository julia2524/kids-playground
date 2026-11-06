import React from "react";
import { Rect } from "react-native-svg";

export function IndonesiaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 빨강 */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#DE2910" />
      {/* 하단 흰색 */}
      <Rect x="-2" y="90" width="244" height="94" fill="#FFFFFF" />
    </>
  );
}
