import React from "react";
import { Rect } from "react-native-svg";

export function UkraineFlagPuzzleScene() {
  return (
    <>
      {/* 상단 파란색 */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#005BBB" />
      {/* 하단 노란색 */}
      <Rect x="-2" y="90" width="244" height="94" fill="#FFD500" />
    </>
  );
}
