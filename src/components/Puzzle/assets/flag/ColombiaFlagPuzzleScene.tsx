import React from "react";
import { Rect } from "react-native-svg";

export function ColombiaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 넓은 노랑 (전체의 절반) */}
      <Rect x="-2" y="-2" width="244" height="94" fill="#FCD116" />
      {/* 중단 파랑 */}
      <Rect x="-2" y="90" width="244" height="48" fill="#003893" />
      {/* 하단 빨강 */}
      <Rect x="-2" y="136" width="244" height="48" fill="#CE1126" />
    </>
  );
}
