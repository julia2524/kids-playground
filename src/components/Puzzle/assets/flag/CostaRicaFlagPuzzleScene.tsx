import React from "react";
import { Rect } from "react-native-svg";

export function CostaRicaFlagPuzzleScene() {
  return (
    <>
      {/* 상단 파랑 */}
      <Rect x="-2" y="-2" width="244" height="32" fill="#002B49" />
      {/* 상단 흰색 */}
      <Rect x="-2" y="30" width="244" height="32" fill="#FFFFFF" />
      {/* 중앙 넓은 빨강 (두 배 높이) */}
      <Rect x="-2" y="60" width="244" height="60" fill="#CE1126" />
      {/* 하단 흰색 */}
      <Rect x="-2" y="118" width="244" height="32" fill="#FFFFFF" />
      {/* 하단 파랑 */}
      <Rect x="-2" y="148" width="244" height="38" fill="#002B49" />
    </>
  );
}
